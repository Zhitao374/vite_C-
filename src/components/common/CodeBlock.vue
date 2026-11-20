<template>
  <div class="code-block">
    <div class="code-header">
      <div class="code-dots"><span></span><span></span><span></span></div>
      <div v-if="title || fileName" class="code-header-title">
        <span v-if="title" class="code-title">{{ title }}</span>
        <span v-if="title && fileName" class="code-sep">·</span>
        <span v-if="fileName" class="code-filename">{{ fileName }}</span>
      </div>
      
      <div class="code-header-actions">
        <!-- 在沙盒中运行 -->
        <button class="run-btn" v-no-flip @click="openInSandbox" title="在沙盒中打开此代码">
          <Play :size="14" /> 演示运行
        </button>
        <!-- 复制按钮 -->
        <button class="copy-btn" :class="{ 'copy-success': copied }" v-no-flip @click="handleCopy" title="复制代码">
          <Check v-if="copied" :size="16" />
          <Copy v-else :size="16" />
        </button>
      </div>
    </div>

    <pre :class="densityClass"><code>
      <span v-for="item in renderedLines" :key="item.key" class="code-line" :class="{
        'is-highlighted': !item.isPlaceholder && isLineHighlighted(item.num),
        'is-placeholder': item.isPlaceholder
      }">
        <span class="code-num">{{ item.num }}</span>
        <span class="code-text" v-html="item.isPlaceholder ? escapeHtml(item.text) : safeHighlight(item.text)"></span>
      </span>
    </code></pre>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { Play, Copy, Check } from 'lucide-vue-next';
import { useCodeLoader } from "@/composables/useCodeLoader";
import { useHighlight } from "@/composables/useHighlight";
import { useCopy } from "@/composables/useCopy";
import { useSandbox } from "@/composables/useSandbox";

const props = defineProps({
  code: { type: String, default: "" },
  codeFile: { type: String, default: "" },
  snippet: { type: String, default: "" },
  density: { type: String, default: "" },
  title: { type: String, default: "" },
  highlightLines: { type: Array, default: () => [] },
  hiddenLines: { type: Array, default: () => [] },
  placeholder: { type: String, default: "" },
});

const { load } = useCodeLoader();
const { highlightLine: syntaxHighlight, escapeHtml } = useHighlight();
const { copyText, copied } = useCopy();
const sandbox = useSandbox();

const rawCode = ref("");

// 防竞态：快速切换 slide 时，保证最后加载的才生效
let loadToken = 0;
watchEffect(async () => {
  const token = ++loadToken;
  let content = "";
  if (props.code) content = props.code;
  else if (props.codeFile) content = await load(props.codeFile);
  
  if (token === loadToken) {
    rawCode.value = content;
  }
});

// 修复 computed 内的副作用：把 snippet 提取逻辑提出来
const snippetData = computed(() => {
  const raw = String(rawCode.value || "").replace(/\n+$/, "");
  if (!props.snippet) return { code: raw, startLine: 1 };
  return extractSnippet(raw, props.snippet);
});

const lines = computed(() => snippetData.value.code.split("\n"));
const startLine = computed(() => snippetData.value.startLine);

const renderedLines = computed(() => {
  const hiddenSet = new Set(props.hiddenLines);
  const result = [];
  let placeholderInserted = false;

  lines.value.forEach((line, i) => {
    const lineNumber = i + startLine.value;

    if (hiddenSet.has(lineNumber)) {
      if (!placeholderInserted && props.placeholder) {
        result.push({
          num: "",
          text: props.placeholder,
          isPlaceholder: true,
          key: `ph-${lineNumber}`,
        });
        placeholderInserted = true;
      }
      return;
    }

    result.push({
      num: lineNumber,
      text: line,
      isPlaceholder: false,
      key: `l-${lineNumber}`,
    });
  });

  return result;
});

function extractSnippet(code, name) {
  const startTag = `// @snippet-start ${name}`;
  const endTag = `// @snippet-end ${name}`;
  const codeLines = code.split("\n");

  const startIdx = codeLines.findIndex((l) => l.trim() === startTag);
  const endIdx = codeLines.findIndex((l) => l.trim() === endTag);

  if (startIdx < 0 || endIdx < 0 || endIdx <= startIdx) {
    console.warn(`[CodeBlock] 未找到 snippet "${name}"，显示完整代码`);
    return { code, startLine: 1 };
  }

  return {
    code: codeLines.slice(startIdx + 1, endIdx).join("\n"),
    startLine: startIdx + 2,
  };
}

function isLineHighlighted(lineNumber) {
  if (!lineNumber) return false;
  if (!Array.isArray(props.highlightLines) || props.highlightLines.length === 0) {
    return false;
  }
  return props.highlightLines.includes(lineNumber);
}

const fileName = computed(() => {
  if (!props.codeFile) return "";
  const parts = props.codeFile.split("/");
  return parts[parts.length - 1];
});

function openInSandbox() {
  if (!rawCode.value) return;
  sandbox.open(rawCode.value);
}

const densityClass = computed(() => {
  if (props.density) return `code-${props.density}`;
  const n = lines.value.length;
  if (n <= 15) return "";
  if (n <= 30) return "code-md";
  if (n <= 50) return "code-sm";
  return "code-xs";
});

function safeHighlight(line) {
  return syntaxHighlight(escapeHtml(line));
}

async function handleCopy() {
  await copyText(lines.value.join("\n"));
}
</script>

<style scoped>
/* ============================================ */
/* 代码块容器                                    */
/* ============================================ */
.code-block {
  position: relative;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  max-height: 75vh; /* 默认最大高度，防止无限撑高 */
  overflow: hidden;
}

/* ============================================ */
/* 代码块头部                                    */
/* ============================================ */
.code-header {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 36px;
  padding: 6px 14px;
  background: var(--code-header-bg);
  border-bottom: 1px solid var(--code-border);
}

.code-dots {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.code-dots span {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.code-dots span:nth-child(1) { background: #ff5f57; }
.code-dots span:nth-child(2) { background: #febc2e; }
.code-dots span:nth-child(3) { background: #28c840; }

.code-header-title {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: calc(16px * var(--font-scale));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.code-title {
  color: var(--code-title);
  font-size: calc(16px * var(--font-scale));
  font-weight: 600;
}

.code-filename {
  color: var(--code-filename);
  font-family: var(--font-code);
  font-size: calc(15px * var(--font-scale));
}

.code-sep {
  color: rgba(230, 241, 255, 0.4);
  margin: 0 2px;
}

.code-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

/* ============================================ */
/* 代码主体                                      */
/* ============================================ */
pre {
  padding: 12px 0;
  font-family: var(--font-code);
  font-size: var(--fs-code);
  line-height: 1.4;
  color: var(--code-text);
  overflow-x: auto;
  overflow-y: auto;
  flex: 1;
  min-height: 120px; 
  white-space: normal;
  tab-size: 4;
  margin: 0;
}

pre.code-md { font-size: calc(var(--fs-code) * 0.95); line-height: 1.55; }
pre.code-sm { font-size: calc(var(--fs-code) * 0.9); line-height: 1.5; }
pre.code-xs { font-size: calc(var(--fs-code) * 0.85); line-height: 1.45; }
pre code { display: block; }

/* ============================================ */
/* 代码行                                        */
/* ============================================ */
.code-line {
  display: flex;
  align-items: flex-start;
  padding: 0 20px 0 8px;
  margin-left: -8px;
  border-left: 3px solid transparent;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.code-line:hover:not(.is-highlighted) {
  background: rgba(255, 255, 255, 0.05);
}

.code-line:hover:not(.is-highlighted) .code-num {
  color: var(--accent);
  font-weight: 700;
}

.code-line.is-highlighted {
  background: rgba(255, 122, 0, 0.15);
  border-left-color: var(--accent);
}

.code-line.is-highlighted .code-num {
  color: var(--accent);
  font-weight: 700;
}

.code-num {
  flex: 0 0 3.2em;
  text-align: right;
  padding-right: 1em;
  color: var(--code-comment);
  font-size: calc(17px * var(--font-scale));
  user-select: none;
  pointer-events: none;
  transition: color 0.15s ease;
}

.code-text {
  flex: 1;
  min-width: 0;
  white-space: pre;
}

.code-line.is-placeholder .code-text {
  color: var(--code-comment);
  font-style: italic;
}

/* ============================================ */
/* 按钮与图标                                     */
/* ============================================ */
.copy-btn {
  width: 28px;
  height: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: rgba(230, 241, 255, 0.5);
  transition: all 0.2s;
}
.code-block:hover .copy-btn { color: rgba(230, 241, 255, 0.9); }
.copy-btn:hover { background: rgba(255, 255, 255, 0.1); }
.copy-btn.copy-success { color: #67e8a0; }
.copy-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.run-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(0, 180, 42, 0.15);
  border: 1px solid rgba(0, 180, 42, 0.4);
  border-radius: 6px;
  color: #67e8a0;
  font-size: calc(13px * var(--font-scale));
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.run-btn:hover:not(:disabled) { background: rgba(0, 180, 42, 0.3); }
.run-btn:disabled { opacity: 0.7; cursor: not-allowed; }
</style>
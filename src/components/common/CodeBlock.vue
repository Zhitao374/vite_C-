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
        <!-- 运行按钮 -->
        <button class="run-btn" data-no-flip :disabled="isRunning" @click.stop="handleRun">
          <Loader2 v-if="isRunning" :size="14" class="spin-icon" />
          <Play v-else :size="14" />
          <span>{{ isRunning ? '运行中...' : '运行' }}</span>
        </button>
        
        <!-- 复制按钮 -->
        <button class="copy-btn" data-no-flip :class="{ 'copy-success': copied }" @click="handleCopy" title="复制代码">
          <Check v-if="copied" :size="16" />
          <Copy v-else :size="16" />
        </button>
      </div>
    </div>

    <pre :class="densityClass"><code>
      <span
        v-for="item in renderedLines"
        :key="item.key"
        class="code-line"
        :class="{
          'is-highlighted': !item.isPlaceholder && isLineHighlighted(item.num),
          'is-placeholder': item.isPlaceholder
        }"
      >
        <span class="code-num">{{ item.num }}</span>
        <span
          class="code-text"
          v-html="item.isPlaceholder ? escapeHtml(item.text) : safeHighlight(item.text)"
        ></span>
      </span>
    </code></pre>
    
    <!-- 终端输出区 -->
    <div v-if="showTerminal" class="code-terminal" data-no-flip>
      <div class="terminal-header">
        <span class="terminal-title">
          <Terminal :size="14" /> 终端输出
        </span>
        <button class="terminal-close" @click.stop="showTerminal = false">
          <X :size="16" />
        </button>
      </div>
      
      <!-- 标准输入框 -->
      <div class="terminal-input-wrap">
        <span class="terminal-prompt">输入数据 (stdin):</span>
        <input v-model="stdinText" class="terminal-input" placeholder="如果代码有 cin，请在这里填写数据（如：3 5）" />
      </div>

      <pre class="terminal-output">{{ runOutput }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { Play, Copy, Check, Terminal, Loader2, X } from 'lucide-vue-next';
import { useCodeLoader } from "@/composables/useCodeLoader";
import { useHighlight } from "@/composables/useHighlight";
import { useCopy } from "@/composables/useCopy";

const runOutput = ref('');
const showTerminal = ref(false);
const isRunning = ref(false);
const stdinText = ref(''); // 绑定输入框内容

async function handleRun() {
  if (isRunning.value) return;
  isRunning.value = true;
  showTerminal.value = true;
  runOutput.value = '⏳ 本地编译运行中...';

  const codeToRun = rawCode.value; 

  try {
    if (window.electronAPI && window.electronAPI.runCode) {
      const res = await window.electronAPI.runCode(codeToRun, stdinText.value);
      runOutput.value = res.output || '（程序无输出）';
    } else {
      runOutput.value = '❌ 请在 Electron 桌面端运行此功能\n浏览器环境无法直接调用本地 C++ 编译器。';
    }
  } catch (error) {
    runOutput.value = '❌ 运行出错：' + error.message;
  } finally {
    isRunning.value = false;
  }
}

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

// ============================================
// 原始代码加载
// ============================================
const rawCode = ref("");

watchEffect(async () => {
  if (props.code) {
    rawCode.value = props.code;
  } else if (props.codeFile) {
    rawCode.value = await load(props.codeFile);
  } else {
    rawCode.value = "";
  }
});

// ============================================
// 行号起点 + 行内容
// ============================================
const startLine = ref(1);

const lines = computed(() => {
  let code = String(rawCode.value || "").replace(/\n+$/, "");

  if (props.snippet) {
    const result = extractSnippet(code, props.snippet);
    code = result.code;
    startLine.value = result.startLine;
  } else {
    startLine.value = 1;
  }

  return code.split("\n");
});

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
  /* 用 flex 垂直排列 header / pre / terminal */
  display: flex;
  flex-direction: column;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  max-height: 75vh; /* 避免无限撑高 */
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
  flex: 1; /* 自动填充剩余高度 */
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

/* 旋转加载动画 */
.spin-icon {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ============================================ */
/* 终端输出区域                                    */
/* ============================================ */
.code-terminal {
  flex-shrink: 0;
  border-top: 1px solid var(--code-border);
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  max-height: 40vh; /* 终端最高占屏幕 40% */
}

/* 终端输入框 */
.terminal-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(230, 241, 255, 0.2);
  flex-shrink: 0;
}

/* 终端内容 */
.code-terminal pre.terminal-output {
  padding: 0;
  margin: 0;
  font-family: var(--font-code);
  font-size: calc(14px * var(--font-scale));
  line-height: 1.5;
  color: #e6f1ff;
  background: transparent;
  white-space: pre-wrap;
  word-break: break-all;
  flex: 1; /* 自动撑满剩余空间 */
  min-height: 80px;
  overflow-y: auto;
}

/* ⚡ 让终端滚动条更明显 */
.code-terminal pre.terminal-output::-webkit-scrollbar {
  width: 8px;
}
.code-terminal pre.terminal-output::-webkit-scrollbar-thumb {
  background: rgba(103, 232, 160, 0.4); /* 绿色滚动条 */
  border-radius: 4px;
}
.code-terminal pre.terminal-output::-webkit-scrollbar-thumb:hover {
  background: rgba(103, 232, 160, 0.8);
}
.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  color: rgba(230, 241, 255, 0.6);
  font-size: calc(13px * var(--font-scale));
}
.terminal-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  letter-spacing: 0.5px;
}
.terminal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: rgba(230, 241, 255, 0.6);
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  transition: all 0.2s;
}
.terminal-close:hover { 
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.terminal-prompt {
  font-size: calc(13px * var(--font-scale));
  color: #67e8a0;
  flex-shrink: 0;
}
.terminal-input {
  flex: 1;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(230, 241, 255, 0.3);
  border-radius: 4px;
  color: #fff;
  font-family: var(--font-code);
  font-size: calc(13px * var(--font-scale));
  padding: 4px 8px;
  outline: none;
}
.terminal-input:focus {
  border-color: #67e8a0;
}
</style>
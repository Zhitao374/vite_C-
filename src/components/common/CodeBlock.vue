<template>
  <div class="code-block">
    <div class="code-header">
      <div class="code-dots">
        <span></span><span></span><span></span>
      </div>
      <div v-if="title || fileName" class="code-header-title">
        <span v-if="title" class="code-title">{{ title }}</span>
        <span v-if="title && fileName" class="code-sep">·</span>
        <span v-if="fileName" class="code-filename">{{ fileName }}</span>
      </div>
      <button
        class="copy-btn"
        data-no-flip
        :class="{ 'copy-success': copied }"
        @click="handleCopy"
        title="复制代码"
      >
        <svg viewBox="0 0 24 24" width="15" height="15">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </button>
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
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useCodeLoader } from '@/composables/useCodeLoader';
import { useHighlight } from '@/composables/useHighlight';
import { useCopy } from '@/composables/useCopy';

const props = defineProps({
  code: { type: String, default: '' },
  codeFile: { type: String, default: '' },
  snippet: { type: String, default: '' },
  density: { type: String, default: '' },
  title: { type: String, default: '' },
  highlightLines: { type: Array, default: () => [] },
  hiddenLines: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' }
});

const { load } = useCodeLoader();
const { highlightLine: syntaxHighlight, escapeHtml } = useHighlight();
const { copyText, copied } = useCopy();

// ============================================
// 原始代码加载
// ============================================
const rawCode = ref('');

watchEffect(async () => {
  if (props.code) {
    rawCode.value = props.code;
  } else if (props.codeFile) {
    rawCode.value = await load(props.codeFile);
  } else {
    rawCode.value = '';
  }
});

// ============================================
// 行号起点 + 行内容
// ============================================
const startLine = ref(1);

const lines = computed(() => {
  let code = String(rawCode.value || '').replace(/\n+$/, '');

  if (props.snippet) {
    const result = extractSnippet(code, props.snippet);
    code = result.code;
    startLine.value = result.startLine;
  } else {
    startLine.value = 1;
  }

  return code.split('\n');
});

/**
 * 渲染行列表：
 * - 跳过 hiddenLines 中的行
 * - 在第一个隐藏行位置插入 placeholder（如果配置了）
 */
const renderedLines = computed(() => {
  const hiddenSet = new Set(props.hiddenLines);
  const result = [];
  let placeholderInserted = false;

  lines.value.forEach((line, i) => {
    const lineNumber = i + startLine.value;

    // 隐藏行：跳过，但第一个隐藏位置插入占位符
    if (hiddenSet.has(lineNumber)) {
      if (!placeholderInserted && props.placeholder) {
        result.push({
          num: '',
          text: props.placeholder,
          isPlaceholder: true,
          key: `ph-${lineNumber}`
        });
        placeholderInserted = true;
      }
      return;
    }

    // 正常行
    result.push({
      num: lineNumber,
      text: line,
      isPlaceholder: false,
      key: `l-${lineNumber}`
    });
  });

  return result;
});

// ============================================
// snippet 提取
// ============================================
function extractSnippet(code, name) {
  const startTag = `// @snippet-start ${name}`;
  const endTag = `// @snippet-end ${name}`;
  const codeLines = code.split('\n');

  const startIdx = codeLines.findIndex(l => l.trim() === startTag);
  const endIdx = codeLines.findIndex(l => l.trim() === endTag);

  if (startIdx < 0 || endIdx < 0 || endIdx <= startIdx) {
    console.warn(`[CodeBlock] 未找到 snippet "${name}"，显示完整代码`);
    return { code, startLine: 1 };
  }

  return {
    code: codeLines.slice(startIdx + 1, endIdx).join('\n'),
    startLine: startIdx + 2  // 内容从 startIdx+1 行开始（0-based），显示行号 = startIdx + 2
  };
}

// ============================================
// 判断某行是否应该高亮
// ============================================
function isLineHighlighted(lineNumber) {
  if (!lineNumber) return false;
  if (!Array.isArray(props.highlightLines) || props.highlightLines.length === 0) {
    return false;
  }
  return props.highlightLines.includes(lineNumber);
}

// ============================================
// 文件名 / 密度
// ============================================
const fileName = computed(() => {
  if (!props.codeFile) return '';
  const parts = props.codeFile.split('/');
  return parts[parts.length - 1];
});

const densityClass = computed(() => {
  if (props.density) return `code-${props.density}`;
  const n = lines.value.length;
  if (n <= 15) return '';
  if (n <= 30) return 'code-md';
  if (n <= 50) return 'code-sm';
  return 'code-xs';
});

// ============================================
// 语法高亮 + 复制
// ============================================
function safeHighlight(line) {
  return syntaxHighlight(escapeHtml(line));
}

async function handleCopy() {
  await copyText(lines.value.join('\n'));
}
</script>

<style scoped>/* ============================================ */
/* 代码块容器                                    */
/* ============================================ */
.code-block {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* ============================================ */
/* 代码块头部                                    */
/* ============================================ */
.code-header {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 36px;
  padding: 6px 48px 6px 14px;
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

/* ============================================ */
/* 代码主体                                      */
/* ============================================ */
pre {
  padding: 16px 0;
  font-family: var(--font-code);
  font-size: var(--fs-code);
  line-height: 1.6;
  color: var(--code-text);
  overflow-x: auto;
  overflow-y: auto;
  max-height: 72vh;
  white-space: normal;
  tab-size: 4;
  margin: 0;
}
pre.code-md {
  font-size: calc(var(--fs-code) * 0.95);
  line-height: 1.55;
}
pre.code-sm {
  font-size: calc(var(--fs-code) * 0.9);
  line-height: 1.5;
}
pre.code-xs {
  font-size: calc(var(--fs-code) * 0.85);
  line-height: 1.45;
}
pre code {
  display: block;
}

/* ============================================ */
/* 代码行 —— hover 高亮                          */
/* ============================================ */
.code-line {
  display: flex;
  align-items: flex-start;
  min-height: 1.4em;
  /* 左侧预留 8px 出血区（背景可从行号左侧开始） */
  padding: 0 20px 0 8px;
  margin-left: -8px;
  /* 预留 border-left 占位，避免 highlighted 切换时抖动 */
  border-left: 3px solid transparent;
  transition: background 0.15s ease, border-color 0.15s ease;
}

/* hover 高亮 —— 比 is-highlighted 更弱 */
.code-line:hover:not(.is-highlighted) {
  background: rgba(255, 255, 255, 0.05);
}

.code-line:hover:not(.is-highlighted) .code-num {
  color: var(--accent);
  font-weight: 700;
}

/* 高亮行（由 highlightLines prop 控制） */
.code-line.is-highlighted {
  background: rgba(255, 122, 0, 0.15);
  border-left-color: var(--accent);
}

.code-line.is-highlighted .code-num {
  color: var(--accent);
  font-weight: 700;
}

/* ============================================ */
/* 行号                                          */
/* ============================================ */
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

/* ============================================ */
/* 代码文本                                      */
/* ============================================ */
.code-text {
  flex: 1;
  min-width: 0;
  white-space: pre;
}

/* ============================================ */
/* 复制按钮                                      */
/* ============================================ */
.copy-btn {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
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
  z-index: 2;
}
.code-block:hover .copy-btn {
  color: rgba(230, 241, 255, 0.9);
}
.copy-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.copy-btn.copy-success {
  color: #00B42A;
}

/* ============================================ */
/* 占位行                                        */
/* ============================================ */
.code-line.is-placeholder .code-text {
  color: var(--code-comment);
  font-style: italic;
}

/* ============================================ */
/* 复制按钮无障碍 + data-no-flip                  */
/* ============================================ */
.copy-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
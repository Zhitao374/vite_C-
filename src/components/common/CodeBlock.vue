<template>
  <div class="code-block">
    <div class="code-header">
      <div class="code-dots"><span></span><span></span><span></span></div>
      <div v-if="title || fileName" class="code-header-title">
        <span v-if="title" class="code-title">{{ title }}</span>
        <span v-if="title && fileName" class="code-sep">·</span>
        <span v-if="fileName" class="code-filename">{{ fileName }}</span>
      </div>
      <button class="copy-btn" :class="{ 'copy-success': copied }" @click="handleCopy" title="复制代码">
        <svg viewBox="0 0 24 24" width="15" height="15">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"
                fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </button>
    </div>
    <pre :class="densityClass"><code>
      <span v-for="(line, i) in lines" :key="i" class="code-line">
        <span class="code-num">{{ i + startLine }}</span>
        <span class="code-text" v-html="safeHighlight(line)"></span>
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
  code:     { type: String, default: '' },
  codeFile: { type: String, default: '' },
  snippet:  { type: String, default: '' },   // ← 新增
  density:  { type: String, default: '' },
  title:    { type: String, default: '' }
});

const { load } = useCodeLoader();
const { highlightLine, escapeHtml } = useHighlight();
const { copyText, copied } = useCopy();

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
 * 从代码中提取 snippet 标记之间的内容
 * 标记格式：
 *   // @snippet-start name
 *   ...内容...
 *   // @snippet-end name
 *
 * 找不到标记时，返回完整代码（容错）
 */
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
    startLine: startIdx + 2   // 内容从 startIdx+1 行开始，行号 = startIdx+2（1-based）
  };
}

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

function safeHighlight(line) {
  return highlightLine(escapeHtml(line));
}

async function handleCopy() {
  await copyText(lines.value.join('\n'));
}
</script>

<style scoped>
/* 原样式不变，省略 */
.code-block {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.code-block {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

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
pre.code-md { font-size: calc(var(--fs-code) * 0.95); line-height: 1.55; }
pre.code-sm { font-size: calc(var(--fs-code) * 0.9); line-height: 1.5; }
pre.code-xs { font-size: calc(var(--fs-code) * 0.85); line-height: 1.45; }

pre code { display: block; }

.code-line {
  display: flex;
  align-items: flex-start;
  min-height: 1.4em;
  padding-right: 20px;
}
.code-num {
  flex: 0 0 3.2em;
  text-align: right;
  padding-right: 1em;
  color: var(--code-comment);
  font-size: calc(17px * var(--font-scale));
  user-select: none;
  pointer-events: none;
}
.code-text {
  flex: 1;
  min-width: 0;
  white-space: pre;
}

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
.code-block:hover .copy-btn { color: rgba(230, 241, 255, 0.9); }
.copy-btn:hover { background: rgba(255, 255, 255, 0.1); }
.copy-btn.copy-success { color: #00B42A; }
</style>
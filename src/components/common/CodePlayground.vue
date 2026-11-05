<template>
  <div class="playground" ref="playgroundRef">
    <!-- 顶部工具栏 -->
    <div class="pg-header">
      <div class="pg-title">
        <Terminal :size="18" /> 代码编辑区
      </div>
      
      <div class="pg-actions">
        <div class="font-scaler">
          <button @click="decreaseFont" title="缩小字号">A-</button>
          <span class="font-value">{{ fontSize }}px</span>
          <button @click="increaseFont" title="放大字号">A+</button>
        </div>
        
        <button class="reset-btn" @click="resetCode">
          <RotateCcw :size="16" /> 重置代码
        </button>
      </div>
    </div>

    <!-- 编辑器主体（自动填满剩余高度） -->
    <div class="editor-wrapper" :style="{ '--code-font-size': fontSize + 'px' }">
      <Codemirror
        v-model="code"
        :style="{ height: '100%' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="4"
        :extensions="extensions"
      />
    </div>

    <!-- 拖拽条：核心改动，绑定 pointerdown -->
    <div class="resizer" ref="resizerRef" @pointerdown="startResize" title="上下拖动调整大小">
      <div class="resizer-line"></div>
    </div>

    <!-- 底部终端（高度由拖拽控制） -->
    <div class="terminal-wrapper" :style="{ height: terminalHeight + 'px' }">
      <CodeTerminal :code="code" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onUnmounted } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import { Terminal, RotateCcw } from 'lucide-vue-next';
import CodeTerminal from './CodeTerminal.vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  initialCode: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue']);

const code = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const extensions = [cpp(), oneDark];
const playgroundRef = ref(null);
const resizerRef = ref(null);

// --- 字号设置 ---
const fontSize = ref(16);
function decreaseFont() { if (fontSize.value > 12) fontSize.value -= 2; }
function increaseFont() { if (fontSize.value < 36) fontSize.value += 2; }
function resetCode() {
  if (confirm('确定要重置代码吗？')) emit('update:modelValue', props.initialCode || '');
}

// ================= 核心拖拽逻辑（指针捕获版） =================
const terminalHeight = ref(200); // 默认高度
let startY = 0;
let startHeight = 0;
let isDragging = false;

function startResize(e) {
  e.preventDefault(); // 阻止默认行为，防止选中文字
  isDragging = true;
  
  const el = resizerRef.value;
  if (el) {
    // 核心：捕获指针，无论鼠标移动到哪，事件都发给它
    el.setPointerCapture(e.pointerId);
    el.addEventListener('pointermove', onDragging);
    el.addEventListener('pointerup', stopDrag);
    el.addEventListener('pointercancel', stopDrag); // 防止系统中断
  }

  startY = e.clientY;
  startHeight = terminalHeight.value;
  
  document.body.style.cursor = 'ns-resize';
  document.body.style.userSelect = 'none';
}

function onDragging(e) {
  if (!isDragging) return;
  
  const deltaY = startY - e.clientY;
  let newHeight = startHeight + deltaY;

  const maxAvailableHeight = playgroundRef.value ? playgroundRef.value.clientHeight - 100 : 600;

  if (newHeight < 80) newHeight = 80; 
  if (newHeight > maxAvailableHeight) newHeight = maxAvailableHeight;

  terminalHeight.value = newHeight;
}

function stopDrag(e) {
  if (!isDragging) return;
  isDragging = false;

  const el = resizerRef.value;
  if (el) {
    if (el.hasPointerCapture && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    el.removeEventListener('pointermove', onDragging);
    el.removeEventListener('pointerup', stopDrag);
    el.removeEventListener('pointercancel', stopDrag);
  }
  
  document.body.style.cursor = '';
  document.body.style.userSelect = '';
}

// 组件销毁时清理事件
onUnmounted(() => {
  stopDrag({ pointerId: 1 }); // 兜底清理
});
</script>

<style scoped>
.playground {
  display: flex; 
  flex-direction: column; 
  height: 100%;
  background: #1e1e1e; 
  border-radius: 12px; 
  overflow: hidden;
  position: relative;
}

/* 顶部工具栏 */
.pg-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 16px; background: #2d2d2d; border-bottom: 1px solid #444; color: #e6f1ff;
  flex: 0 0 42px;
  box-sizing: border-box;
}
.pg-title { font-weight: 600; display: flex; align-items: center; gap: 8px; color: #a0aec0; }
.pg-actions { display: flex; align-items: center; gap: 16px; }

.font-scaler {
  display: flex; align-items: center; background: #1e1e1e; border-radius: 6px; overflow: hidden; border: 1px solid #444;
}
.font-scaler button {
  background: transparent; border: none; color: #888; padding: 4px 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.font-scaler button:hover { background: #333; color: #ccc; }
.font-value {
  font-size: 12px; color: #67e8a0; font-family: var(--font-code);
  min-width: 40px; text-align: center; border-left: 1px solid #444; border-right: 1px solid #444; padding: 0 8px;
}
.reset-btn { 
  background: #444; color: #ccc; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px;
}
.reset-btn:hover { background: #555; color: #fff; }

/* ========================================= */
/* 修复版：编辑器与行号对齐 CSS */
/* ========================================= */
.editor-wrapper { 
  flex: 1; 
  min-height: 0; 
  overflow: hidden; 
  /* 在父容器统一字号，让子元素继承 */
  font-size: var(--code-font-size); 
}

:deep(.cm-editor) { 
  height: 100%; 
  font-size: inherit; /* 继承父级字号 */
}

:deep(.cm-scroller) {
  font-size: inherit;
  line-height: 1.5 !important; /* 统一行高倍数 */
}

/* 清理所有的 padding 强制覆盖，让 CodeMirror 自己去算 */
:deep(.cm-line),
:deep(.cm-gutterElement) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

/* 如果左侧行号还是没有对齐，加上这句强制重置 */
:deep(.cm-gutter) {
  line-height: 1.5 !important;
}

/* 拖拽条 */
.resizer {
  height: 12px;
  background: #2d2d2d;
  cursor: ns-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #444;
  border-bottom: 1px solid #222;
  flex: 0 0 12px;
  z-index: 10;
  position: relative;
  touch-action: none;
}
.resizer:hover { background: #3e3e3e; }
.resizer-line {
  width: 50px; height: 4px; background: #666; border-radius: 2px;
}

/* 底部终端 */
.terminal-wrapper { 
  flex: 0 0 auto; 
  overflow: hidden; 
  display: flex; 
  flex-direction: column;
}
</style>
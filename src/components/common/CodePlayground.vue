<template>
  <div class="playground">
    <!-- 顶部工具栏：去掉冗长文字，加入字号调整 -->
    <div class="pg-header">
      <div class="pg-title">
        <Terminal :size="18" /> 代码编辑区
      </div>
      
      <div class="pg-actions">
        <!-- 新增：字号调整 -->
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

    <!-- 编辑器主体 -->
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

    <!-- 底部终端 -->
    <CodeTerminal :code="code" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
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

// 默认字号 16
const fontSize = ref(16);

function decreaseFont() {
  if (fontSize.value > 12) fontSize.value -= 2;
}

function increaseFont() {
  if (fontSize.value < 36) fontSize.value += 2;
}

function resetCode() {
  if (confirm('确定要重置代码吗？')) {
    emit('update:modelValue', props.initialCode || '');
  }
}
</script>

<style scoped>
.playground {
  display: flex; flex-direction: column; height: 100%;
  background: #1e1e1e; border-radius: 12px; overflow: hidden;
}

/* 顶部工具栏 */
.pg-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 16px; background: #2d2d2d; border-bottom: 1px solid #444; color: #e6f1ff;
}
.pg-title { 
  font-weight: 600; display: flex; align-items: center; gap: 8px; color: #a0aec0;
}
.pg-actions {
  display: flex; align-items: center; gap: 16px;
}
/* 字号调节按钮组 */
.font-scaler {
  display: flex; align-items: center; background: #1e1e1e; border-radius: 6px; overflow: hidden; border: 1px solid #444;
}
.font-scaler button {
  background: transparent; border: none; color: #888;
  padding: 4px 10px; font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all 0.2s;
}
.font-scaler button:hover { background: #333; color: #ccc; }
.font-value {
  font-size: 12px; color: #67e8a0; font-family: var(--font-code);
  min-width: 40px; text-align: center; border-left: 1px solid #444; border-right: 1px solid #444;
  padding: 0 8px;
}
.font-scaler button:last-child { border-right: none; }
.font-scaler button.active { background: #165dff; color: #fff; }

/* 重置按钮 */
.reset-btn { 
  background: #444; color: #ccc; border: none; padding: 4px 12px; border-radius: 6px; 
  cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px;
}
.reset-btn:hover { background: #555; color: #fff; }

.editor-wrapper { flex: 1; min-height: 0; overflow: hidden; }

/* 关键：应用动态字号 */
:deep(.cm-editor) { 
  height: 100%; 
  font-size: var(--code-font-size); 
}
</style>
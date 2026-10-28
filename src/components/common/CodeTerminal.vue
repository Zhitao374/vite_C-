<template>
  <div class="code-terminal">
    <div class="terminal-header">
      <div class="term-title">Terminal</div>
      <div class="term-actions">
        <button class="run-btn" :disabled="isRunning" @click="handleRun">
          {{ isRunning ? '运行中...' : '▶️ 运行' }}
        </button>
        <button class="close-btn" v-if="showClose" @click="$emit('close')">✕</button>
      </div>
    </div>
    <div class="stdin-row">
      <span class="prompt">stdin:</span>
      <textarea 
        v-model="stdinText" 
        placeholder="如果代码有 cin，请先在这里填写数据（如：3 5，可多行）" 
        rows="1"
      ></textarea>
    </div>

    <div class="terminal-body" v-show="showBody">
      <pre class="output-box">{{ runOutput }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  code: { type: String, required: true },
  showClose: { type: Boolean, default: false }
});
defineEmits(['close']);

const isRunning = ref(false);
const runOutput = ref('');
const stdinText = ref('');
const showBody = ref(false);

async function handleRun() {
  if (isRunning.value) return;
  
  // ⚡ 智能提示：如果代码有 cin 且没填输入，提醒用户
  if (props.code.includes('cin') && !stdinText.value.trim()) {
    const confirmRun = confirm('检测到代码中包含 cin 输入，但下方输入框为空。\n\n点击【确定】继续运行（程序可能读取不到数据直接结束）\n点击【取消】先去填写输入数据');
    if (!confirmRun) return;
  }

  isRunning.value = true;
  showBody.value = true;
  runOutput.value = '⏳ 本地编译运行中...';

  try {
    if (window.electronAPI && window.electronAPI.runCode) {
      const res = await window.electronAPI.runCode(props.code, stdinText.value);
      runOutput.value = res.output || '（程序无输出）';
    } else {
      runOutput.value = '❌ 请在 Electron 桌面端运行此功能。';
    }
  } catch (error) {
    runOutput.value = '❌ 运行出错：' + error.message;
  } finally {
    isRunning.value = false;
  }
}
defineExpose({ handleRun });
</script>

<style scoped>
.code-terminal { border-top: 1px solid #444; background: #111; display: flex; flex-direction: column; }
.terminal-header {
  display: flex; justify-content: space-between; padding: 6px 14px;
  background: #222; border-bottom: 1px solid #333; color: #888; font-size: 13px;
}
.term-actions { display: flex; gap: 10px; align-items: center; }
.run-btn {
  background: rgba(0, 180, 42, 0.15); border: 1px solid rgba(0, 180, 42, 0.4);
  color: #67e8a0; padding: 2px 8px; border-radius: 4px; cursor: pointer;
}
.run-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.close-btn { background: none; border: none; color: #888; cursor: pointer; }
.terminal-body { padding: 8px 14px; display: flex; flex-direction: column; }
.stdin-row { display: flex; gap: 8px; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #333; }
.stdin-row input { flex: 1; background: #111; border: 1px solid #333; color: #fff; padding: 4px; outline: none; }
.output-box { margin: 0; color: #e6f1ff; font-family: monospace; white-space: pre-wrap; max-height: 200px; overflow-y: auto; }
.stdin-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px dashed #333;
}
.prompt {
  font-size: calc(13px * var(--font-scale));
  color: #67e8a0;
  font-family: var(--font-code);
  margin-top: 4px;
}
.stdin-row textarea {
  flex: 1;
  background: #111;
  border: 1px solid #333;
  border-radius: 4px;
  color: #fff;
  font-family: var(--font-code);
  font-size: calc(13px * var(--font-scale));
  padding: 6px 8px;
  outline: none;
  resize: vertical;
  min-height: 28px;
  max-height: 100px;
}
.stdin-row textarea:focus { border-color: #67e8a0; }
</style>
<template>
  <div class="error-boundary-root">
    <!-- 有错误 -->
    <div v-if="hasError" class="error-boundary">
      <div class="error-box">
        <div class="error-icon">⚠️</div>
        <h2 class="error-title">页面渲染出错</h2>
        <p class="error-msg">{{ errorMessage }}</p>

        <div class="error-actions">
          <button class="btn-primary" @click="retry">重试</button>
          <button class="btn-secondary" @click="goHome">返回目录</button>
        </div>

        <details v-if="isDev && errorStack" class="error-details">
          <summary>错误堆栈（仅开发模式）</summary>
          <pre>{{ errorStack }}</pre>
        </details>
      </div>
    </div>

    <!-- 无错误：渲染 slot -->
    <slot v-else />
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const hasError = ref(false);
const errorMessage = ref('');
const errorStack = ref('');
const isDev = import.meta.env.DEV;

onErrorCaptured((err, instance, info) => {
  hasError.value = true;
  errorMessage.value = err?.message || String(err);
  errorStack.value = err?.stack || '';
  console.error('[ErrorBoundary] 捕获到错误：', err, info);
  return false;
});

function retry() {
  hasError.value = false;
  errorMessage.value = '';
  errorStack.value = '';
}

function goHome() {
  hasError.value = false;
  router.push('/');
}
</script>

<style scoped>
/* 根容器——无样式，仅作为单根占位 */
.error-boundary-root {
  display: contents;
}

.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 40px;
}

.error-box {
  max-width: 640px;
  width: 100%;
  padding: 40px;
  background: var(--bg-card);
  border: 2px solid var(--error);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 40px rgba(245, 63, 63, 0.15);
  text-align: center;
}

.error-icon {
  font-size: 64px;
  line-height: 1;
  margin-bottom: 16px;
}

.error-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--error);
  margin-bottom: 12px;
}

.error-msg {
  font-size: 16px;
  color: var(--text-sub);
  line-height: 1.6;
  margin-bottom: 24px;
  word-break: break-word;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
}

.btn-primary,
.btn-secondary {
  padding: 10px 24px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
}
.btn-primary:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--bg-soft);
  color: var(--text-sub);
}
.btn-secondary:hover {
  background: var(--gray-200);
}

.error-details {
  text-align: left;
  margin-top: 20px;
  padding: 12px 16px;
  background: var(--gray-50);
  border-radius: var(--radius-sm);
  font-size: 13px;
}

.error-details summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--text-sub);
}

.error-details pre {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-dim);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
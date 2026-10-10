// src/store/ui.js
import { reactive, watch } from 'vue';

const STORAGE_KEY = 'cpp-course-ui';

// 从 localStorage 恢复
const saved = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
})();

export const uiState = reactive({
  fontScale: saved.fontScale ?? 1,
  markerEnabled: saved.markerEnabled ?? false,
  markerColor: saved.markerColor ?? '#FF3B30',
});

// 副作用：字号变化 → 更新 CSS 变量
watch(
  () => uiState.fontScale,
  (v) => document.documentElement.style.setProperty('--font-scale', v),
  { immediate: true }
);

// 副作用：持久化
watch(uiState, (s) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
  catch {}
}, { deep: true });
<template>
  <div class="font-scaler" v-no-flip @click="cycle">
    <span class="fs-icon">Aa</span>
    <span class="fs-level">{{ scaleLabel }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { uiState } from '@/store/ui';
const SCALES = [{ value: 0.9, label: '小' }, { value: 1.0, label: '中' }, { value: 1.15, label: '大' }, { value: 1.3, label: '特大' }];
const scaleLabel = computed(() => SCALES.find(s => Math.abs(s.value - uiState.fontScale) < 0.001)?.label || '中');
function cycle() {
  const idx = SCALES.findIndex(s => Math.abs(s.value - uiState.fontScale) < 0.001);
  uiState.fontScale = SCALES[(idx + 1) % SCALES.length].value;
}
</script>

<style scoped>
.font-scaler { position: fixed; top: 16px; right: 76px; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 44px; height: 44px; background: linear-gradient(145deg, #ffffff, #e8f1ff); border-radius: 50%; box-shadow: 0 4px 16px rgba(22,93,255,0.22); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; user-select: none; z-index: 1002; }
.font-scaler:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(22,93,255,0.35); }
.fs-icon { font-size: 16px; font-weight: 800; color: #165dff; line-height: 1; }
.fs-level { font-size: 10px; color: #6b84a3; line-height: 1; margin-top: 1px; }
</style>
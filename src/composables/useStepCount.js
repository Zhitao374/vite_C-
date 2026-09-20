/**
 * useStepCount.js · 组件向父组件声明步数
 * 用法（子组件）：
 *   const emit = defineEmits(['step-count']);
 *   useStepCount(emit, () => 步数);
 */
import { watch, onMounted } from 'vue';

export function useStepCount(emit, getter) {
  function report() {
    const v = typeof getter === 'function' ? getter() : getter;
    emit('step-count', Math.max(1, v || 1));
  }

  onMounted(report);
  watch(getter, report);
}
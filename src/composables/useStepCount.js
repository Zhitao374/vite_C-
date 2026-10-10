/**
 * useStepCount.js · 组件向父组件声明步数
 *
 * 用法（子组件）：
 *   useStepCount(() => 步数);
 *
 * 说明：
 *   - 自动从 useStep() 拿 setMax，不再需要 emit 中转
 *   - 只增不减——多组件上报时不会互相覆盖
 */
import { watch, onMounted } from 'vue';
import { useStep } from './useStep';

export function useStepCount(getter) {
  const { max, setMax } = useStep();

  function report() {
    const v = typeof getter === 'function' ? getter() : getter;
    const n = Math.max(1, v || 1);
    if (n > max.value) setMax(n);
  }

  onMounted(report);
  watch(getter, report);
}
import { ref, provide, inject, isRef } from 'vue';

const STEP_KEY = Symbol('step');

export function provideStep(initialMax = 1) {
  const current = ref(1);
  const max = isRef(initialMax) ? initialMax : ref(initialMax);

  function next() {
    if (current.value < max.value) {
      current.value++;
      return true;
    }
    return false;
  }

  function prev() {
    if (current.value > 1) {
      current.value--;
      return true;
    }
    return false;
  }

  function setMax(n) {
    max.value = n;
    if (current.value > max.value) current.value = max.value;
  }

  function reset() {
    current.value = 1;
  }

  const ctx = { current, max, next, prev, setMax, reset };
  provide(STEP_KEY, ctx);
  return ctx;
}

export function useStep() {
  const ctx = inject(STEP_KEY);
  if (!ctx) throw new Error('useStep 必须在 provideStep 之后使用');
  return ctx;
}
import { ref, provide, inject, isRef, watch, nextTick } from 'vue';

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

  // ============================================
  // 【优化】统一滚动 —— current 变化时自动滚动到当前步
  // ============================================
  watch(current, async () => {
    await nextTick();
    scrollToCurrentStep();
  });

  function scrollToCurrentStep() {
    // 精确匹配：当前步 + 已 visible + 在 .slide-body 内
    const el = document.querySelector(
      `.slide-body .step-wrapper.visible[data-step="${current.value}"]`
    );
    if (!el) return;

    const scrollParent = findScrollParent(el);
    if (!scrollParent) return;

    const parentRect = scrollParent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    if (elRect.bottom > parentRect.bottom) {
      scrollParent.scrollTo({
        top: scrollParent.scrollTop + (elRect.bottom - parentRect.bottom) + 20,
        behavior: 'smooth'
      });
    } else if (elRect.top < parentRect.top) {
      scrollParent.scrollTo({
        top: scrollParent.scrollTop + (elRect.top - parentRect.top) - 20,
        behavior: 'smooth'
      });
    }
  }

  function findScrollParent(el) {
    let parent = el.parentElement;
    while (parent) {
      const style = window.getComputedStyle(parent);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        return parent;
      }
      parent = parent.parentElement;
    }
    return document.querySelector('.slide-body');
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
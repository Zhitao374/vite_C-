<template>
  <component
    :is="tag"
    ref="rootRef"
    class="step-wrapper"
    :class="{ visible }"
    :data-step="step"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  step: { type: Number, required: true },
  tag: { type: String, default: 'div' }
});

const { current } = useStep();
const visible = computed(() => props.step <= current.value);

const rootRef = ref(null);

// 当 visible 从 false → true 时，自动滚动到元素
watch(visible, async (now, before) => {
  if (now && !before) {
    await nextTick();
    scrollIntoView(rootRef.value);
  }
});

// 首次出现（初始 current 已包含此步）时不滚动，避免页面加载就乱滚
// 只处理"用户点击推进"的场景

/**
 * 滚动到指定元素，让它出现在最近的滚动父容器可视区域内
 */
function scrollIntoView(el) {
  if (!el) return;

  // 向上找最近的滚动父容器
  const scrollParent = findScrollParent(el);
  if (!scrollParent) return;

  const parentRect = scrollParent.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  // 元素底边低于可视区底边 → 向下滚
  if (elRect.bottom > parentRect.bottom) {
    scrollParent.scrollTo({
      top: scrollParent.scrollTop + (elRect.bottom - parentRect.bottom) + 20,
      behavior: 'smooth'
    });
  }
  // 元素顶边高于可视区顶边 → 向上滚
  else if (elRect.top < parentRect.top) {
    scrollParent.scrollTo({
      top: scrollParent.scrollTop + (elRect.top - parentRect.top) - 20,
      behavior: 'smooth'
    });
  }
}

/**
 * 向上找最近的 overflow-y 为 auto/scroll 的父元素
 * 找不到时回退到 .slide-body
 */
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
</script>

<style scoped>
.step-wrapper:not(.visible) {
  display: none;
}
.step-wrapper.visible {
  animation: fadeInUp 0.35s ease;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
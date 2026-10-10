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
import { computed, ref } from 'vue';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  step: { type: Number, required: true },
  tag: { type: String, default: 'div' }
});

const { current } = useStep();
const visible = computed(() => props.step <= current.value);

// rootRef 保留 —— 部分版式组件可能需要通过 DOM 查询步进元素
const rootRef = ref(null);

// 【移除】所有 watch + 滚动逻辑，交给 useStep 统一处理
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
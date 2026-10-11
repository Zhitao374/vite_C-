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
import { computed, ref } from "vue";
import { useStep } from "@/composables/useStep";

const props = defineProps({
  step: { type: Number, required: true },
  tag: { type: String, default: "div" },
});

const { current } = useStep();
const visible = computed(() => props.step <= current.value);

const rootRef = ref(null);
</script>

<style scoped>
/* ============================================ */
/* 未出现：完全隐藏                              */
/* ============================================ */
.step-wrapper:not(.visible) {
  display: none;
}

/* ============================================ */
/* 出现：子元素 cascade 淡入                     */
/* —— 一步里有多个直接子元素时依次出现           */
/* ============================================ */
.step-wrapper.visible > * {
  animation: fadeInUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* 50ms → 80ms —— 大屏上"逐张出现"更明显 */
.step-wrapper.visible > *:nth-child(2) {
  animation-delay: 80ms;
}
.step-wrapper.visible > *:nth-child(3) {
  animation-delay: 160ms;
}
.step-wrapper.visible > *:nth-child(4) {
  animation-delay: 240ms;
}
.step-wrapper.visible > *:nth-child(5) {
  animation-delay: 320ms;
}
.step-wrapper.visible > *:nth-child(n + 6) {
  animation-delay: 400ms;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<template>
  <div
    ref="rootRef"
    class="step-wrapper"
    :class="{ visible }"
    :data-step="step"
    v-show="visible"
  >
    <slot />
  </div>
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
.step-wrapper.visible > * {
  animation: fadeInUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.step-wrapper.visible > *:nth-child(2) { animation-delay: 80ms; }
.step-wrapper.visible > *:nth-child(3) { animation-delay: 160ms; }
.step-wrapper.visible > *:nth-child(4) { animation-delay: 240ms; }
.step-wrapper.visible > *:nth-child(5) { animation-delay: 320ms; }
.step-wrapper.visible > *:nth-child(n + 6) { animation-delay: 400ms; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
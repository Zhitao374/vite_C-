<template>
  <SlideShell :slide="slide">
    <CodeStepPanel
      :code-file="slide.data.codeFile"
      :snippet="slide.data.snippet"
      :steps="steps"
      start-offset="1"
    />
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import CodeStepPanel from '@/components/common/CodeStepPanel.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';

const props = defineProps({ slide: { type: Object, required: true } });
const steps = computed(() => props.slide.data?.steps || []);
useSlideSteps(props, () => steps.value.length);
</script>

<style scoped>
.h-full { height: 100%; min-height: 0; display: flex; flex-direction: column; }
.evo-code-wrap { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.evo-code-wrap :deep(.code-block) { flex: 1; height: 100%; }
.step-card { flex: 1; background: var(--bg-card); border: 1px solid var(--card-border); padding: 24px; border-radius: var(--radius-md); overflow-y: auto; margin-bottom: 16px; }
.step-expression { font-size: 24px; font-weight: 700; color: var(--primary); margin-bottom: 16px; }
.step-note { font-size: var(--fs-card-desc); color: var(--text-sub); line-height: 1.7; }
.step-progress { text-align: center; }
.progress-num { font-family: var(--font-code); font-size: calc(16px * var(--font-scale)); color: var(--text-dim); }
</style>
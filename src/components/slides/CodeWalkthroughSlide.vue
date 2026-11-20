<template>
  <SlideShell :slide="slide">
    <CodeStepPanel
      :code-file="d.codeFile"
      :code="d.code"
      :snippet="d.snippet"
      :density="d.density"
      :steps="steps"
      :base-offset="1"
    />
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import CodeStepPanel from '@/components/common/CodeStepPanel.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';

const props = defineProps({ slide: { type: Object, required: true } });
const d = computed(() => props.slide.data || {});
const steps = computed(() => d.value.steps || []);

// 步数：代码(1) + 步骤(n) + extra(如果有)
useSlideSteps(props, () => 1 + steps.value.length);
</script>
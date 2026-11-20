<template>
  <SlideShell :slide="slide">
    <FlexLayout scrollable>
      <StepWrapper v-if="problem" :step="1">
        <div class="origin-problem">
          <div class="problem-head"><span class="problem-icon">⚠️</span><span class="problem-title">{{ problem.title }}</span></div>
          <ul v-if="problem.points?.length" class="problem-points"><li v-for="(p, i) in problem.points" :key="i" v-html="p"></li></ul>
          <pre v-if="problem.visual" class="problem-visual"><code>{{ problem.visual }}</code></pre>
        </div>
      </StepWrapper>
      <div v-if="evolution.length" class="origin-evolution">
        <StepWrapper v-for="(item, i) in evolution" :key="i" :step="evolutionBase + i">
          <div class="evolution-node">
            <div class="node-icon">{{ item.icon || '▶️' }}</div>
            <div class="node-content">
              <div class="node-head"><span v-if="item.era" class="node-era">{{ item.era }}</span><span class="node-title">{{ item.title }}</span></div>
              <div v-if="item.desc" class="node-desc" v-html="item.desc"></div>
            </div>
          </div>
        </StepWrapper>
      </div>
      <StepWrapper v-if="summary" :step="summaryStep">
        <div class="origin-summary">
          <div class="summary-head"><span class="summary-icon">✅</span><span class="summary-title">{{ summary.title }}</span></div>
          <div v-if="summary.desc" class="summary-desc" v-html="summary.desc"></div>
          <pre v-if="summary.code" class="summary-code"><code>{{ summary.code }}</code></pre>
        </div>
      </StepWrapper>
    </FlexLayout>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import FlexLayout from '@/components/layouts/FlexLayout.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';
const props = defineProps({ slide: { type: Object, required: true } });
const d = computed(() => props.slide.data || {});
const problem = computed(() => d.value.problem);
const evolution = computed(() => d.value.evolution || []);
const summary = computed(() => d.value.summary);
const evolutionBase = computed(() => (problem.value ? 2 : 1));
const summaryStep = computed(() => evolutionBase.value + evolution.value.length);
useSlideSteps(props, () => {
  let n = 0;
  if (problem.value) n += 1;
  n += evolution.value.length;
  if (summary.value) n += 1;
  return Math.max(1, n);
});
</script>

<style scoped>
.origin-problem { background: linear-gradient(145deg, #fff5f5, #ffffff); border: 2px solid rgba(245,63,63,0.25); border-radius: var(--radius-md); padding: calc(24px * var(--font-scale)); margin-bottom: 16px; }
.problem-head { display: flex; align-items: center; gap: 12px; font-size: var(--fs-card-title); font-weight: 800; color: var(--text-main); margin-bottom: 16px; }
.problem-points li { position: relative; padding-left: 28px; font-size: var(--fs-card-desc); line-height: 1.7; color: var(--text-sub); margin-bottom: 8px; }
.origin-evolution { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.evolution-node { display: flex; gap: 16px; padding: 16px 20px; background: var(--bg-card); border: 1px solid var(--card-border); border-radius: var(--radius-md); }
.node-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; font-size: 24px; background: var(--primary-soft); border-radius: 50%; }
.node-title { font-size: var(--fs-card-title); font-weight: 700; }
.origin-summary { background: linear-gradient(145deg, #ffffff, #f0fff4); border: 2px solid rgba(0,180,42,0.3); border-radius: var(--radius-md); padding: 24px; }
</style>
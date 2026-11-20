<template>
  <SlideShell :slide="slide">
    <div v-for="(g, i) in groups" :key="i" v-show="current >= stepOf(i, 'left')" class="compare" :class="{ 'compare-neutral': isNeutral }">
      <div class="compare-col">
        <StepWrapper :step="stepOf(i, 'left')" class="compare-col-inner">
          <div class="compare-box compare-wrong">
            <div class="compare-label">{{ g.leftLabel || leftLabel || '❌ 错误' }}</div>
            <div v-html="g.wrong"></div>
          </div>
        </StepWrapper>
      </div>
      <StepWrapper :step="stepOf(i, 'right')" class="compare-arrow"><div>{{ arrow }}</div></StepWrapper>
      <div class="compare-col">
        <StepWrapper :step="stepOf(i, 'right')" class="compare-col-inner">
          <div class="compare-box compare-right">
            <div class="compare-label">{{ g.rightLabel || rightLabel || '✅ 正确' }}</div>
            <div v-html="g.right"></div>
          </div>
        </StepWrapper>
      </div>
    </div>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';
import { useStep } from '@/composables/useStep';
const props = defineProps({ slide: { type: Object, required: true } });
const { current } = useStep();
const groups = computed(() => props.slide.data?.groups || []);
const leftLabel = computed(() => props.slide.data?.leftLabel);
const rightLabel = computed(() => props.slide.data?.rightLabel);
const isNeutral = computed(() => !!props.slide.data?.neutral);
const arrow = computed(() => props.slide.data?.arrow || '→');
const splitStep = computed(() => props.slide.data?.splitStep === true);
const stepOf = (gi, side) => splitStep.value ? gi * 2 + (side === 'left' ? 1 : 2) : gi + 1;
useSlideSteps(props, () => splitStep.value ? groups.value.length * 2 : groups.value.length);
</script>

<style scoped>
.compare { display: grid; grid-template-columns: 1fr 50px 1fr; align-items: stretch; margin-bottom: 8px; }
.compare-col { display: flex; flex-direction: column; min-width: 0; height: 100%; }
.compare-col-inner { flex: 1; display: flex; flex-direction: column; }
.compare-box { padding: 22px 28px; border-radius: 14px; font-family: var(--font-code); font-size: calc(20px * var(--font-scale)); line-height: 1.75; display: flex; flex-direction: column; justify-content: center; height: 100%; box-sizing: border-box; }
.compare-wrong { background: var(--error-soft); border: 2px solid rgba(245,63,63,0.35); color: #8a1f1f; }
.compare-right { background: var(--success-soft); border: 2px solid rgba(0,180,42,0.35); color: #0d5f24; }
.compare-arrow { display: flex; align-items: center; justify-content: center; font-size: 32px; color: var(--accent); font-weight: 700; }
.compare-label { font-family: var(--font-base); font-size: calc(16px * var(--font-scale)); font-weight: 700; letter-spacing: 1px; margin-bottom: 8px; opacity: 0.75; }
.compare-neutral .compare-wrong { background: linear-gradient(145deg, #EFF6FF, #F5F9FF); border: 2px solid rgba(22,93,255,0.25); color: var(--text-main); }
.compare-neutral .compare-right { background: linear-gradient(145deg, #F5F3FF, #FAF8FF); border: 2px solid rgba(139,92,246,0.25); color: var(--text-main); }
.compare-neutral .compare-arrow { color: var(--text-dim); }
.compare-neutral .compare-label { opacity: 1; color: var(--primary); }
.compare-neutral .compare-right .compare-label { color: #8B5CF6; }
@media (max-width: 900px) { .compare { grid-template-columns: 1fr; gap: 8px; } .compare-arrow { transform: rotate(90deg); } }
</style>
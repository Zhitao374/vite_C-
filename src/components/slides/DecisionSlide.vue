<template>
  <SlideShell :slide="slide">
    <FlexLayout scrollable>
      <div class="signal-grid">
        <StepWrapper v-for="(sig, i) in signals" :key="i" :step="i + 1">
          <div class="signal-card">
            <div class="signal-head"><span class="signal-icon">{{ sig.icon || '🔔' }}</span><span class="signal-keyword">{{ sig.keyword }}</span></div>
            <div v-if="sig.desc" class="signal-desc" v-html="sig.desc"></div>
          </div>
        </StepWrapper>
      </div>
      <StepWrapper v-if="conclusion" :step="signals.length + 1">
        <div class="decision-conclusion" style="margin-top: 16px;">
          <div class="conclusion-head"><span class="conclusion-icon">💡</span><span class="conclusion-title">{{ conclusion.title }}</span></div>
          <div class="conclusion-desc" v-html="conclusion.desc"></div>
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
const signals = computed(() => props.slide.data?.signals || []);
const conclusion = computed(() => props.slide.data?.conclusion);
useSlideSteps(props, () => signals.value.length + (conclusion.value ? 1 : 0));
</script>

<style scoped>
.signal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
.signal-card { background: linear-gradient(145deg, #fffbeb, #ffffff); border: 2px solid rgba(255,122,0,0.25); border-radius: var(--radius-md); padding: 18px; }
.signal-keyword { font-size: var(--fs-card-title); font-weight: 800; color: var(--accent); }
.decision-conclusion { background: linear-gradient(145deg, #ffffff, #f0fff4); border: 2px solid rgba(0,180,42,0.3); border-radius: var(--radius-md); padding: 22px; }
</style>
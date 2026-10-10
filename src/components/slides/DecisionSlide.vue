<template>
  <SlideShell :slide="slide">
    <StepWrapper v-if="intro" :step="1">
      <IntroCard :html="intro" />
    </StepWrapper>

    <div class="signal-grid">
      <StepWrapper
        v-for="(sig, i) in signals"
        :key="i"
        :step="signalBase + i"
      >
        <div class="signal-card">
          <div class="signal-head">
            <span class="signal-icon">{{ sig.icon || '🔔' }}</span>
            <span class="signal-keyword">{{ sig.keyword }}</span>
          </div>
          <div v-if="sig.desc" class="signal-desc" v-html="sig.desc"></div>
        </div>
      </StepWrapper>
    </div>

    <StepWrapper v-if="conclusion" :step="conclusionStep">
      <div class="decision-conclusion">
        <div class="conclusion-head">
          <span class="conclusion-icon">💡</span>
          <span class="conclusion-title">{{ conclusion.title }}</span>
        </div>
        <div class="conclusion-desc" v-html="conclusion.desc"></div>
      </div>
    </StepWrapper>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import IntroCard from '@/components/common/IntroCard.vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const d = computed(() => props.slide.data || {});
const intro = computed(() => d.value.intro);
const signals = computed(() => d.value.signals || []);
const conclusion = computed(() => d.value.conclusion);
const extra = computed(() => d.value.extra);

const signalBase = computed(() => (intro.value ? 2 : 1));
const conclusionStep = computed(() => signalBase.value + signals.value.length);

useStepCount(() => {
  let n = 0;
  if (intro.value) n += 1;
  n += signals.value.length;
  if (conclusion.value) n += 1;
  if (extra.value) n += 1;
  return Math.max(1, n);
});
</script>

<style scoped>
.signal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: calc(14px * var(--font-scale));
}

.signal-card {
  background: linear-gradient(145deg, #FFFBEB, #FFFFFF);
  border: 2px solid rgba(255, 122, 0, 0.25);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 16px rgba(255, 122, 0, 0.08);
  padding: calc(18px * var(--font-scale)) calc(22px * var(--font-scale));
  transition: transform 0.2s, box-shadow 0.2s;
}
.signal-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 122, 0, 0.15);
}

.signal-head {
  display: flex;
  align-items: center;
  gap: calc(10px * var(--font-scale));
  margin-bottom: calc(8px * var(--font-scale));
}

.signal-icon {
  font-size: calc(24px * var(--font-scale));
  line-height: 1;
  flex-shrink: 0;
}

.signal-keyword {
  font-size: var(--fs-card-title);
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 0.5px;
}

.signal-desc {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.6;
}

.signal-desc :deep(code) {
  background: var(--accent-soft);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-code);
  color: var(--accent);
  font-weight: 600;
}

.decision-conclusion {
  background: linear-gradient(145deg, #FFFFFF, #F0FFF4);
  border: 2px solid rgba(0, 180, 42, 0.3);
  border-radius: var(--radius-md);
  box-shadow: 0 6px 24px rgba(0, 180, 42, 0.1);
  padding: calc(22px * var(--font-scale)) calc(28px * var(--font-scale));
  position: relative;
  overflow: hidden;
}
.decision-conclusion::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 4px;
  background: linear-gradient(90deg, var(--success), #67E8A0);
}

.conclusion-head {
  display: flex;
  align-items: center;
  gap: calc(10px * var(--font-scale));
  margin-bottom: calc(10px * var(--font-scale));
}

.conclusion-icon {
  font-size: calc(28px * var(--font-scale));
  line-height: 1;
}

.conclusion-title {
  font-size: var(--fs-card-title);
  font-weight: 800;
  color: var(--text-main);
}

.conclusion-desc {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.7;
}
</style>
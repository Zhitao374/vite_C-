<template>
  <SlideShell :slide="slide">
    <StepWrapper
      v-for="(g, i) in groups"
      :key="i"
      :step="i + 1"
    >
      <div class="compare">
        <div class="compare-box compare-wrong">
          <div class="compare-label">❌ 错误</div>
          <div v-html="g.wrong"></div>
        </div>
        <div class="compare-arrow">→</div>
        <div class="compare-box compare-right">
          <div class="compare-label">✅ 正确</div>
          <div v-html="g.right"></div>
        </div>
      </div>
    </StepWrapper>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const groups = computed(() => props.slide.data?.groups || []);
const extra = computed(() => props.slide.data?.extra);

useStepCount(() => groups.value.length + (extra.value ? 1 : 0));
</script>

<style scoped>
.compare {
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
  align-items: stretch;
}
.compare + .compare { margin-top: 8px; }
.compare-box {
  padding: 22px 28px;
  border-radius: 14px;
  font-family: var(--font-code);
  font-size: calc(20px * var(--font-scale));
  line-height: 1.75;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.compare-wrong {
  background: var(--error-soft);
  border: 2px solid rgba(245, 63, 63, 0.35);
  color: #8a1f1f;
}
.compare-right {
  background: var(--success-soft);
  border: 2px solid rgba(0, 180, 42, 0.35);
  color: #0d5f24;
}
.compare-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: var(--accent);
  font-weight: 700;
}
.compare-label {
  font-family: var(--font-base);
  font-size: calc(16px * var(--font-scale));
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 8px;
  opacity: 0.75;
}

@media (max-width: 900px) {
  .compare { grid-template-columns: 1fr; gap: 8px; }
  .compare-arrow { transform: rotate(90deg); }
}
</style>
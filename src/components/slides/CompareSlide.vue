<template>
  <div class="slide">
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body">
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

      <StepWrapper v-if="extra" :step="maxStep">
        <ExtraCard
          :title="extra.title"
          :desc="extra.desc"
          :variant="extra.variant || 'card-primary'"
        />
      </StepWrapper>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import ExtraCard from '@/components/common/ExtraCard.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const groups = computed(() => props.slide.data?.groups || []);
const extra = computed(() => props.slide.data?.extra);

// 步数：每组一步 + extra
useStepCount(emit, () => groups.value.length + (extra.value ? 1 : 0));

const { max: maxStep } = useStep();
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
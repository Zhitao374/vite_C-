<template>
  <div class="slide">
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body">
      <div class="split-wide">
        <StepWrapper :step="1">
          <div class="big-number-wrap">
            <div class="big-number">
              {{ number }}<span v-if="unit" class="unit">{{ unit }}</span>
            </div>
          </div>
        </StepWrapper>

        <StepWrapper v-if="card" :step="2">
          <div class="card">
            <div v-if="card.title" class="card-title">{{ card.title }}</div>
            <div v-if="card.desc" class="card-desc" v-html="card.desc"></div>
          </div>
        </StepWrapper>
      </div>

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
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';
import ExtraCard from '@/components/common/ExtraCard.vue';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});
const number = computed(() => d.value.number || '');
const unit = computed(() => d.value.unit || '');
const card = computed(() => d.value.card);
const extra = computed(() => d.value.extra);

// 步数：数字 → 卡片 → extra
useStepCount(emit, () => 1 + (card.value ? 1 : 0) + (extra.value ? 1 : 0));

const { max: maxStep } = useStep();
</script>

<style scoped>
.split-wide {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 22px;
  align-items: center;
}
.big-number-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
.big-number-wrap :deep(.big-number) {
  font-size: clamp(100px, 14vw, 180px);
  letter-spacing: -4px;
}
.big-number-wrap :deep(.big-number .unit) {
  font-size: clamp(32px, 5vw, 52px);
  margin-left: 10px;
}

@media (max-width: 900px) {
  .split-wide { grid-template-columns: 1fr; }
}
</style>
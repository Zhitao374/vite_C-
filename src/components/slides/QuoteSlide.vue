<template>
  <div class="slide">
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body">
      <div class="quote-split">
        <StepWrapper :step="1">
          <div class="quote-panel">
            <div class="quote-mark">"</div>
            <div class="quote-text" v-html="text"></div>
            <div v-if="author" class="quote-author">{{ author }}</div>
          </div>
        </StepWrapper>

        <div class="quote-right">
          <ul class="list">
            <StepWrapper
              v-for="(p, i) in points"
              :key="i"
              :step="i + 2"
              tag="li"
            >
              <span v-html="p"></span>
            </StepWrapper>
          </ul>

          <StepWrapper v-if="highlight" :step="points.length + 2">
            <div class="card card-glow">
              <div v-if="highlight.title" class="card-title">{{ highlight.title }}</div>
              <div v-if="highlight.desc" class="card-desc" v-html="highlight.desc"></div>
            </div>
          </StepWrapper>
        </div>
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
import ExtraCard from '@/components/common/ExtraCard.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});
const text = computed(() => d.value.text || '');
const author = computed(() => d.value.author || '');
const points = computed(() => d.value.points || []);
const highlight = computed(() => d.value.highlight);
const extra = computed(() => d.value.extra);

useStepCount(emit, () =>
  1 + points.value.length + (highlight.value ? 1 : 0) + (extra.value ? 1 : 0)
);

const { max: maxStep } = useStep();
</script>

<style scoped>
.quote-split {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 22px;
  align-items: stretch;
}
.quote-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px 22px;
  background: linear-gradient(145deg, #f4f8ff 0%, #eef4ff 100%);
  border-left: 5px solid var(--accent);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
.quote-mark {
  font-size: 88px;
  font-weight: 900;
  color: var(--accent);
  opacity: 0.35;
  line-height: 0.8;
  margin-bottom: 4px;
}
.quote-text {
  font-size: var(--fs-quote-text);
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.6;
}
.quote-author {
  margin-top: 14px;
  font-size: calc(18px * var(--font-scale));
  color: var(--text-dim);
  text-align: right;
  font-style: italic;
}
.quote-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 1100px) {
  .quote-split { grid-template-columns: 1fr; }
}
</style>
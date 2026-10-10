<template>
  <SlideShell :slide="slide">
    <div :class="gridClass">
      <StepWrapper
        v-for="(card, i) in cards"
        :key="i"
        :step="i + 1"
      >
        <div :class="['card','card-compact',cards.length === 1 ? 'card-hero' : '']">
          <div v-if="card.icon" class="big-icon">
            <IconMap :emoji="card.icon" :size="56" />
          </div>
          <div v-if="card.number" class="big-number">{{ card.number }}</div>
          <div class="card-title">
            <component
              v-if="card.link"
              :is="'a'"
              :href="card.link"
              target="_blank"
              rel="noopener"
            >{{ card.title }}</component>
            <template v-else>{{ card.title }}</template>
          </div>
          <div v-if="card.desc" class="card-desc" v-html="card.desc"></div>
        </div>
      </StepWrapper>
    </div>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import IconMap from '@/components/common/IconMap.vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const d = computed(() => props.slide.data || {});
const cards = computed(() => d.value.cards || []);
const extra = computed(() => d.value.extra);

useStepCount(() => cards.value.length + (extra.value ? 1 : 0));

const gridClass = computed(() => {
  const n = cards.value.length;
  if (n === 1) return 'grid grid-cols-1';
  if (n === 2) return 'grid grid-cols-2';
  if (n === 3) return 'grid grid-cols-3';
  return 'grid grid-cols-4';
});
</script>

<style scoped>
.grid {
  display: grid;
  gap: 14px;
  padding: 6px;
}
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid :deep(.big-icon) {
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grid :deep(.big-icon svg) {
  width: 56px;
  height: 56px;
  color: var(--primary);
}
.grid :deep(.big-number) { font-size: 52px; }
.grid :deep(.card-title) { font-size: var(--fs-card-title); }
.grid :deep(.card-desc)  { font-size: var(--fs-card-desc); }
.grid-cols-4 :deep(.card-compact) {
  justify-content: flex-start;
  min-height: 150px;
}
.grid :deep(.step-wrapper) {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.grid :deep(.step-wrapper > *) {
  flex: 1;
  height: 100%;
}

@media (max-width: 1400px) {
  .grid-cols-4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 { grid-template-columns: 1fr; }
}
</style>
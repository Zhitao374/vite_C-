<template>
  <SlideShell :slide="slide">
    <FlexLayout scrollable>
      <div :class="gridClass">
        <StepWrapper v-for="(card, i) in cards" :key="i" :step="i + 1">
          <div class="card card-compact" :class="{ 'card-hero': cards.length === 1 }">
            <div v-if="card.icon" class="big-icon"><IconMap :emoji="card.icon" :size="56" /></div>
            <div v-if="card.number" class="big-number">{{ card.number }}</div>
            <div class="card-title"><a v-if="card.link" :href="card.link" target="_blank" rel="noopener">{{ card.title }}</a><template v-else>{{ card.title }}</template></div>
            <div v-if="card.desc" class="card-desc" v-html="card.desc"></div>
          </div>
        </StepWrapper>
      </div>
    </FlexLayout>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import FlexLayout from '@/components/layouts/FlexLayout.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import IconMap from '@/components/common/IconMap.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';

const props = defineProps({ slide: { type: Object, required: true } });
const cards = computed(() => props.slide.data?.cards || []);
useSlideSteps(props, () => cards.value.length);

const gridClass = computed(() => {
  const n = cards.value.length;
  if (n === 1) return 'grid grid-cols-1';
  if (n % 4 === 0) return 'grid grid-cols-4';
  if (n % 3 === 0) return 'grid grid-cols-3';
  if (n === 2) return 'grid grid-cols-2';
  return n >= 8 ? 'grid grid-cols-4' : 'grid grid-cols-3';
});
</script>

<style scoped>
.grid { display: grid; gap: 14px; padding: 6px; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid :deep(.big-icon) { margin-bottom: 8px; display: flex; justify-content: center; }
.grid :deep(.big-number) { font-size: 52px; }
.grid :deep(.step-wrapper) { display: flex; flex-direction: column; height: 100%; }
.grid :deep(.step-wrapper > *) { flex: 1; height: 100%; }
@media (max-width: 1400px) { .grid-cols-4 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 1024px) { .grid-cols-3 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 900px) { .grid-cols-2, .grid-cols-3, .grid-cols-4 { grid-template-columns: 1fr; } }
</style>
<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>

    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="subtitle" class="slide-subtitle">{{ subtitle }}</span>
    </h1>

    <div class="slide-body" :class="bodyClass">
      <slot />

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
import StepWrapper from './StepWrapper.vue';
import ExtraCard from './ExtraCard.vue';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true },
  /** slide-body 的额外 class（如 code-split-body） */
  bodyClass: { type: [String, Array, Object], default: '' }
});

const chapterTag = computed(() => props.slide.chapterTag);
const subtitle = computed(() => props.slide.subtitle);
const extra = computed(() => props.slide.data?.extra);

const { max: maxStep } = useStep();
</script>

<style scoped>
/* 复用 layout.css 的 .slide / .slide-title / .slide-body 样式，不重复定义 */
</style>
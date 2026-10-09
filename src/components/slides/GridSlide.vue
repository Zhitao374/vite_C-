<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body">
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
import IconMap from '@/components/common/IconMap.vue';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});
const cards = computed(() => d.value.cards || []);
const extra = computed(() => d.value.extra);
const chapterTag = computed(() => props.slide.chapterTag);

// 步数：每张卡片一步 + extra
useStepCount(emit, () => cards.value.length + (extra.value ? 1 : 0));

const { max: maxStep } = useStep();

const gridClass = computed(() => {
  const n = cards.value.length;
  if (n === 1) return 'grid grid-cols-1';   // ← 新增
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
  color: var(--primary);  /* 跟随主题色 */
}
.grid :deep(.big-number) {
  font-size: 52px;
}
.grid :deep(.card-title) {
  font-size: var(--fs-card-title);
}
.grid :deep(.card-desc) {
  font-size: var(--fs-card-desc);
}
.grid-cols-4 :deep(.card-compact) {
  justify-content: flex-start;
  min-height: 150px;
}
/* 让每个 StepWrapper 成为 flex 容器，撑满 grid 单元 */
.grid :deep(.step-wrapper) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 让 StepWrapper 内的卡片撑满 */
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
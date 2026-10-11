<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>

    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="subtitle" class="slide-subtitle">{{ subtitle }}</span>
    </h1>

    <div class="slide-body" :class="bodyClass">
      <slot />

      <!-- 关键：autoExtra 为 false 时不渲染 -->
      <StepWrapper v-if="autoExtra && extra" :step="maxStep">
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
import { computed } from "vue";
import StepWrapper from "./StepWrapper.vue";
import ExtraCard from "./ExtraCard.vue";
import { useStep } from "@/composables/useStep";

const props = defineProps({
  slide: { type: Object, required: true },
  bodyClass: { type: [String, Array, Object], default: "" },
  autoExtra: { type: Boolean, default: true }, // ← 新增
});

const chapterTag = computed(() => props.slide.chapterTag);
const subtitle = computed(() => props.slide.subtitle);

// 关键：autoExtra 为 false 时返回 null
const extra = computed(() =>
  props.autoExtra ? props.slide.data?.extra : null,
);

const { max: maxStep } = useStep();
</script>

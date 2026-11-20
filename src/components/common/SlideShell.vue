<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>

    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="subtitle" class="slide-subtitle">{{ subtitle }}</span>
      <button v-if="intro && current > 1" class="intro-toggle-btn" v-no-flip @click.stop="showIntro = true">
        💡 课堂导入
      </button>
    </h1>

    <div v-show="intro && current === 1" class="intro-card-shell" v-html="intro"></div>

    <div class="slide-body" :class="bodyClass">
      <slot />
      <StepWrapper v-if="extra" :step="maxStep">
        <ExtraCard v-bind="extra" />
      </StepWrapper>
    </div>

    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showIntro" class="header-modal-overlay" v-nav-lock @click.stop="showIntro = false">
          <div class="header-modal-content" @click.stop>
            <div class="modal-header">
              <span>📖 课堂导入</span>
              <button class="close-btn" v-no-flip @click.stop="showIntro = false">✕</button>
            </div>
            <div class="modal-body" v-html="intro"></div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import StepWrapper from './StepWrapper.vue';
import ExtraCard from './ExtraCard.vue';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true },
  bodyClass: { type: [String, Array, Object], default: '' },
});
const { current, max: maxStep } = useStep();

const chapterTag = computed(() => props.slide.chapterTag);
const subtitle = computed(() => props.slide.subtitle);
const intro = computed(() => props.slide.data?.intro);
const extra = computed(() => props.slide.data?.extra);
const showIntro = ref(false);
</script>

<style scoped>
.slide-title { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; font-size: calc(42px * var(--font-scale)); font-weight: 800; color: var(--text-main); margin-bottom: 4px; flex-shrink: 0; }
.slide-subtitle { font-size: calc(20px * var(--font-scale)); color: var(--text-dim); font-weight: 500; padding-left: 14px; border-left: 2px solid var(--primary-soft); }
.intro-toggle-btn { display: inline-flex; align-items: center; gap: 6px; font-size: calc(15px * var(--font-scale)); font-weight: 600; color: var(--primary); background: var(--primary-soft); border: 1px solid rgba(22,93,255,0.2); padding: 4px 14px; border-radius: 999px; cursor: pointer; transition: all 0.2s; transform: translateY(2px); }
.intro-toggle-btn:hover { background: #fff; box-shadow: 0 4px 12px rgba(22,93,255,0.15); border-color: var(--primary); }
.intro-card-shell { padding: calc(12px * var(--font-scale)) calc(16px * var(--font-scale)); background: var(--primary-soft); border-left: 4px solid var(--primary); border-radius: var(--radius-sm); font-size: var(--fs-card-desc); line-height: 1.6; color: var(--text-sub); margin-bottom: 12px; flex-shrink: 0; max-height: 18vh; overflow-y: auto; }
</style>
<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body evolution-body">
      <!-- 顶部引入（可选） -->
      <StepWrapper v-if="intro" :step="1">
        <div class="intro-card" v-html="intro"></div>
      </StepWrapper>

      <div class="split">
        <!-- 左：代码（静态 + 高亮跟随） -->
        <div class="split-left scroll-pane">
          <StepWrapper :step="intro ? 2 : 1">
            <CodeBlock
              :code="d.code"
              :code-file="d.codeFile"
              :snippet="d.snippet"
              :density="d.density"
              :highlight-line="currentLine"
            />
          </StepWrapper>
        </div>

        <!-- 右：演化区（内容替换 + 过渡动画） -->
        <div class="split-right scroll-pane">
          <StepWrapper :step="intro ? 3 : 2">
            <div class="evolution-card">
              <transition name="evo-fade" mode="out-in">
                <div :key="currentIndex" class="evolution-content">
                  <div class="evolution-expression" v-html="currentExpression"></div>
                  <div v-if="currentNote" class="evolution-note" v-html="currentNote"></div>
                </div>
              </transition>

              <div class="evolution-progress">
                <span class="evo-current">{{ currentIndex + 1 }}</span>
                <span class="evo-sep">/</span>
                <span class="evo-total">{{ steps.length }}</span>
              </div>
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
import CodeBlock from '@/components/common/CodeBlock.vue';
import ExtraCard from '@/components/common/ExtraCard.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const props = defineProps({ slide: { type: Object, required: true } });
const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});
const intro = computed(() => d.value.intro || '');
const steps = computed(() => d.value.steps || []);
const extra = computed(() => d.value.extra);
const chapterTag = computed(() => props.slide.chapterTag);

const { current, max: maxStep } = useStep();

// 当前 step 对应的演化索引
const currentIndex = computed(() => {
  const baseOffset = intro.value ? 3 : 2;
  const idx = current.value - baseOffset;
  return Math.max(0, Math.min(idx, steps.value.length - 1));
});

const currentExpression = computed(() => steps.value[currentIndex.value]?.expression || '');
const currentNote = computed(() => steps.value[currentIndex.value]?.note || '');
const currentLine = computed(() => steps.value[currentIndex.value]?.line || 0);

// 步数：intro（如有）+ 代码 + 演化区 + extra
useStepCount(emit, () =>
  (intro.value ? 1 : 0) +       // intro
  1 +                            // 代码区
  steps.value.length +           // 每个演化步骤占 1 步
  (extra.value ? 1 : 0)          // extra
);
</script>

<style scoped>
.evolution-body {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

/* 顶部引入 */
.intro-card {
  padding: 12px 18px;
  background: linear-gradient(135deg, var(--primary-soft), #fff);
  border-left: 4px solid var(--primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-size: var(--fs-card-desc);
  line-height: 1.7;
  color: var(--text-sub);
  margin-bottom: 12px;
}
.intro-card :deep(code) {
  background: rgba(22, 93, 255, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--primary);
  font-weight: 600;
}

/* 两栏布局 */
.split {
  display: grid;
  grid-template-columns: 50fr 50fr;
  gap: 18px;
  flex: 1;
  min-height: 0;
}

.scroll-pane {
  min-height: 0;
  overflow-y: auto;
  padding-right: 6px;
}

.scroll-pane::-webkit-scrollbar { width: 8px; }
.scroll-pane::-webkit-scrollbar-thumb {
  background: rgba(22, 93, 255, 0.25);
  border-radius: 4px;
}
.scroll-pane::-webkit-scrollbar-thumb:hover {
  background: rgba(22, 93, 255, 0.45);
}
.scroll-pane::-webkit-scrollbar-track { background: transparent; }

/* 演化卡片 */
.evolution-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 320px;
  padding: 32px 28px 48px;
  background: linear-gradient(135deg, #fff, var(--bg-soft));
  border: 2px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

.evolution-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.evolution-expression {
  font-family: var(--font-code);
  font-size: calc(28px * var(--font-scale));
  font-weight: 700;
  color: var(--primary);
  line-height: 1.8;
  letter-spacing: 0.5px;
  word-break: break-all;
}

.evolution-expression :deep(code) {
  background: rgba(22, 93, 255, 0.08);
  padding: 2px 8px;
  border-radius: 6px;
}

.evolution-note {
  font-size: calc(16px * var(--font-scale));
  color: var(--text-dim);
  line-height: 1.7;
  padding-left: 12px;
  border-left: 3px solid var(--accent-soft);
}

.evolution-note :deep(code) {
  background: var(--primary-soft);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--primary);
  font-family: var(--font-code);
  font-weight: 600;
}

.evolution-progress {
  position: absolute;
  bottom: 14px;
  right: 20px;
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-family: var(--font-code);
  letter-spacing: 1px;
}

.evo-current {
  font-size: calc(20px * var(--font-scale));
  font-weight: 800;
  color: var(--accent);
}
.evo-sep {
  font-size: calc(14px * var(--font-scale));
  color: var(--text-light);
}
.evo-total {
  font-size: calc(14px * var(--font-scale));
  color: var(--text-light);
}

/* 过渡动画：替换时淡入淡出 */
.evo-fade-enter-active,
.evo-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.evo-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.evo-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* 窄屏适配 */
@media (max-width: 1100px) {
  .split { grid-template-columns: 1fr; }
}
</style>
<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="level-map-layout">
      <aside class="level-map-side">
        <div class="level-map">
          <template v-for="(lv, i) in levels" :key="i">
            <LevelNode :icon="lv.icon" :label="lv.label" :active="i === 0 || (i > 0 && i < levels.length - 1)"
              :done="i === levels.length - 1" :step="getNodeStep(i)"
              :progress="i === 1 ? `${hintShown}/${hints.length}` : ''" />
            <StepWrapper v-if="i < levels.length - 1" :step="getNodeStep(i + 1)" class="level-arrow-wrap">
              <div class="level-arrow">↓</div>
            </StepWrapper>
          </template>
        </div>
      </aside>

      <div class="slide-body">
        <div class="level-map-top">
          <StepWrapper v-if="question" :step="1">
            <div class="card card-primary question-card">
              <!-- 左栏：竖排"题干" -->
              <div class="question-label">
                <span class="label-icon">🎯</span>
                <span class="label-text">题干</span>
              </div>

              <!-- 右侧区域 -->
              <div class="question-main">
                <!-- 顶部横向：考察点 / 限时 -->
                <div v-if="question.timer" class="question-meta">
                  <span class="meta-text" v-html="question.timer"></span>
                </div>

                <!-- 内容 -->
                <div class="question-content">
                  <div class="card-desc" v-html="question.desc"></div>
                </div>
              </div>
            </div>
          </StepWrapper>

          <HintRow v-if="hints.length" :hints="hints" :base-step="2" />
        </div>

        <StepWrapper v-if="answer" :step="answerStep">
          <div class="answer-wrapper">
            <CodeBlock v-if="!Array.isArray(answer)" :code="answer.code" :code-file="answer.codeFile"
              :density="answer.density" title="✅ 参考代码" />
            <div v-else class="answer-array" :class="`cols-${Math.min(answer.length, 4)}`">
              <CodeBlock v-for="(item, i) in answer" :key="i" :code="item.code" :code-file="item.codeFile"
                :density="item.density" :title="item.title || ''" />
            </div>
          </div>
        </StepWrapper>

        <StepWrapper v-if="analysis" :step="analysisStep">
          <div class="card card-glow">
            <div class="card-title">{{ analysis.title || '📖 解析' }}</div>
            <div class="card-desc" v-html="analysis.desc"></div>
          </div>
        </StepWrapper>

        <StepWrapper v-if="extra" :step="maxStep">
          <ExtraCard :title="extra.title" :desc="extra.desc" :variant="extra.variant || 'card-primary'" />
        </StepWrapper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import CodeBlock from '@/components/common/CodeBlock.vue';
import ExtraCard from '@/components/common/ExtraCard.vue';
import HintRow from '@/components/level-map/HintRow.vue';
import LevelNode from '@/components/level-map/LevelNode.vue';
import { useStep } from '@/composables/useStep';
import { useStepCount } from '@/composables/useStepCount';
import { DEFAULT_LEVELS } from '@/config/defaults';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});
const levels = computed(() => d.value.levels || DEFAULT_LEVELS);
const question = computed(() => d.value.question);
const hints = computed(() => d.value.hints || []);
const answer = computed(() => d.value.answer);
const analysis = computed(() => d.value.analysis);
const extra = computed(() => d.value.extra);
const chapterTag = computed(() => props.slide.chapterTag);

// 步数规则
useStepCount(emit, () => {
  const data = d.value;
  let n = 1;
  n += (data.hints?.length || 0);
  n += data.answer ? 1 : 0;
  n += data.analysis ? 1 : 0;
  n += data.extra ? 1 : 0;
  return n;
});

const { current, max: maxStep } = useStep();

// 关键 step 位置
const answerStep = computed(() => hints.value.length + 2);
const analysisStep = computed(() => answerStep.value + 1);

// 提示进度
const hintShown = computed(() => {
  const n = current.value - 1;
  return Math.max(0, Math.min(n, hints.value.length));
});

function getNodeStep(i) {
  if (i === 0) return 1;
  if (i === levels.value.length - 1) return answerStep.value;
  return 2;
}

// 拆分 timer 的 emoji 和文字
const timerData = computed(() => {
  const t = question.value?.timer;
  if (!t) return null;
  // 匹配 "⏱ 限时 5 分钟" → icon="⏱", text="限时 5 分钟"
  const m = String(t).match(/^(\S+)\s+(.+)$/);
  if (m) return { icon: m[1], text: m[2] };
  return { icon: '', text: String(t) };
});
</script>

<style scoped>
.level-map-layout {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 18px;
  margin-top: 18px;
  flex: 1;
  min-height: 0;
  align-items: stretch;
}

.level-map-side {
  display: flex;
  justify-content: center;
  align-items: center;
}

.level-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.level-arrow {
  font-size: 16px;
  color: var(--text-light);
}

.slide-body {
  margin-top: 0;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
}
.level-map-layout .level-map-top :deep(.hint-inline) {
  padding: 8px 14px;
  font-size: var(--fs-hint);
}

/* ============================================
   题干卡片：左竖排标签 + 右上顶部横条 + 内容
   ============================================ */
.question-card {
  display: flex !important;
  flex-direction: row !important;
  align-items: stretch !important;
  padding: 0 !important;
  gap: 0 !important;
  overflow: hidden;
  min-height: 0;
}

/* 左栏：竖排"题干" */
.question-label {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 10px;
  background: linear-gradient(180deg, rgba(255, 122, 0, 0.15), rgba(255, 122, 0, 0.05));
  border-right: 1px solid rgba(255, 122, 0, 0.2);
  color: var(--accent);
  font-weight: 700;
}

.question-label .label-icon {
  font-size: 28px;
  line-height: 1;
}

.question-label .label-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 8px;
  font-size: calc(16px * var(--font-scale));
  line-height: 1;
}

/* 右侧区域：上下结构 */
.question-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* 顶部横向：考察点 / 限时 */
.question-meta {
  padding: 10px 22px;
  background: linear-gradient(90deg, rgba(245, 63, 63, 0.10), rgba(245, 63, 63, 0.03));
  border-bottom: 1px solid rgba(245, 63, 63, 0.18);
  color: var(--error);
  font-weight: 600;
  font-size: calc(18px * var(--font-scale));
  line-height: 1.6;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.question-meta .meta-text {
  flex: 1;
  min-width: 0;
}

.question-meta .meta-text code,
.question-meta .meta-text b {
  color: var(--error);
}

/* 内容 */
.question-content {
  flex: 1;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.question-content .card-desc {
  font-size: var(--fs-card-desc);
  line-height: 1.8;
  color: var(--text-sub);
}

/* ============================================
   level-map 顶部：题干 + 提示左右并排
   ============================================ */
.level-map-layout .level-map-top {
  display: grid !important;
  grid-template-columns: 1.2fr 1fr !important;
  gap: 14px;
  align-items: start;
}

/* 提示竖排 */
.level-map-layout .level-map-top :deep(.hint-row) {
  display: flex !important;
  flex-direction: column !important;
  gap: 6px;
}

/* 提示卡片紧凑 */
.level-map-layout .level-map-top :deep(.hint-inline) {
  flex: 0 0 auto !important;
  min-width: 0 !important;
  width: 100%;
  padding: 8px 14px;
  font-size: var(--fs-hint);
}

.answer-array {
  display: grid;
  gap: 14px;
}

.answer-array.cols-2 {
  grid-template-columns: 1fr 1fr;
}

.answer-array.cols-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.answer-array.cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* 箭头包裹层：让 StepWrapper 在竖排 flex 里正确显示 */
.level-arrow-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.level-arrow-wrap:not(.visible) {
  display: none;
}

@media (max-width: 900px) {
  .level-map-layout {
    grid-template-columns: 100px 1fr;
    gap: 12px;
  }

  .level-map-top {
    grid-template-columns: 1fr;
  }
}
</style>
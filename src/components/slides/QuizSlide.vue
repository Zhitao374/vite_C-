<template>
  <SlideShell :slide="slide">
    <div
      v-for="(q, qi) in questions"
      :key="qi"
      class="quiz-item"
    >
      <!-- 第 1 步：题干 + 选项 -->
      <StepWrapper :step="2 * qi + 1">
        <div class="quiz-head">
          <span class="quiz-index">第 {{ qi + 1 }} 题</span>
          <span class="quiz-difficulty">{{ starsOf(q.difficulty) }}</span>
          <span v-if="q.source" class="quiz-source">📖 {{ q.source }}</span>
        </div>

        <div v-if="q.question" class="quiz-question" v-html="q.question"></div>

        <div v-if="q.questionCode" class="quiz-question-code">
          <CodeBlock :code="q.questionCode" density="sm" />
        </div>

        <div
          v-if="q.questionNote"
          class="quiz-question-note"
          v-html="q.questionNote"
        ></div>

        <ul class="quiz-options" :class="`layout-${layoutOf(q)}`">
          <li
            v-for="(opt, oi) in q.options"
            :key="oi"
            class="quiz-option"
            :class="{ 'is-correct': answerShown(qi) && opt.correct }"
          >
            <span class="option-label">{{ opt.label }}</span>

            <span v-if="opt.text" class="option-text" v-html="opt.text"></span>

            <div v-if="opt.code" class="option-code">
              <CodeBlock :code="opt.code" density="xs" />
            </div>

            <span
              v-if="answerShown(qi) && opt.correct"
              class="option-mark"
            >✅</span>
          </li>
        </ul>
      </StepWrapper>

      <!-- 第 2 步：解析 -->
      <StepWrapper v-if="q.analysis" :step="2 * qi + 2">
        <div class="card card-glow quiz-analysis">
          <div class="card-title">📖 解析</div>
          <div class="card-desc" v-html="q.analysis"></div>
        </div>
      </StepWrapper>
    </div>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import CodeBlock from '@/components/common/CodeBlock.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true }
});

const questions = computed(() => props.slide.data?.questions || []);
const extra = computed(() => props.slide.data?.extra);

// 每题 2 步（题干 + 解析）+ extra
useStepCount(() => questions.value.length * 2 + (extra.value ? 1 : 0));

// answerShown 需要 current
const { current } = useStep();

function answerShown(qi) {
  return current.value >= 2 * qi + 2;
}

function starsOf(n) {
  return '⭐'.repeat(n || 2);
}

/**
 * 自动检测选项布局
 * - 有 code 选项 → code
 * - 判断题（2 项）→ two-cols
 * - 短文本（≤10 字）→ horizontal
 * - 中等文本（≤30 字）→ two-cols
 * - 长文本（>30 字）→ vertical
 */
function layoutOf(q) {
  if (q.optionLayout && q.optionLayout !== 'auto') {
    return q.optionLayout;
  }
  const opts = q.options || [];
  if (opts.length === 0) return 'vertical';
  if (opts.some(o => o.code)) return 'code';
  if (opts.length === 2) return 'two-cols';

  const hasHtml = opts.some(o => /<[^>]+>/.test(o.text || ''));
  if (hasHtml) return 'two-cols';

  const maxLen = Math.max(...opts.map(o => stripHtml(o.text || '').length));

  if (maxLen <= 8) return 'horizontal';
  if (maxLen <= 30) return 'two-cols';
  return 'vertical';
}

function stripHtml(s) {
  return String(s).replace(/<[^>]+>/g, '');
}
</script>

<style scoped>
/* ============================================
   题组容器
   ============================================ */
.quiz-item + .quiz-item {
  margin-top: 22px;
}
.quiz-item + .quiz-item .quiz-head {
  padding-top: 18px;
  border-top: 1px dashed var(--card-border);
}

/* ============================================
   题头
   ============================================ */
.quiz-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.quiz-index {
  font-size: var(--fs-quiz-index);
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 1px;
}
.quiz-difficulty {
  font-size: var(--fs-quiz-difficulty);
  color: var(--accent);
  letter-spacing: 1px;
}
.quiz-source {
  font-size: var(--fs-quiz-source);
  color: var(--text-dim);
  font-style: italic;
  margin-left: auto;
}

/* ============================================
   题干
   ============================================ */
.quiz-question {
  font-size: var(--fs-quiz-question);
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.65;
  padding: 12px 20px;
  background: var(--bg-soft);
  border-left: 4px solid var(--primary);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}
.quiz-question-code {
  margin-top: 10px;
  max-width: 100%;
}
.quiz-question-note {
  margin-top: 8px;
  font-size: var(--fs-sm);
  color: var(--text-dim);
  line-height: 1.7;
  padding-left: 20px;
  border-left: 3px solid var(--accent-soft);
}

/* ============================================
   选项
   ============================================ */
.quiz-options {
  list-style: none;
  margin-top: 12px;
  padding: 0;
}
.quiz-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  background: var(--bg-card);
  border: 2px solid var(--card-border);
  border-radius: var(--radius-md);
  font-size: var(--fs-quiz-option);
  color: var(--text-sub);
  transition: all 0.3s;
  min-width: 0;
}
.option-label {
  flex: 0 0 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--primary-soft);
  color: var(--primary);
  font-weight: 700;
  font-size: var(--fs-quiz-label);
}
.option-text {
  flex: 1;
  line-height: 1.6;
  min-width: 0;
}
.option-code {
  flex: 1;
  min-width: 0;
}
.option-mark {
  font-size: var(--fs-quiz-option);
  flex-shrink: 0;
}

/* 正确答案高亮 */
.quiz-option.is-correct {
  font-weight: 600;
}
.quiz-option.is-correct .option-label {
  background: var(--success);
  color: #fff;
}

/* ============================================
   布局
   ============================================ */
.quiz-options.layout-vertical {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quiz-options.layout-horizontal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.quiz-options.layout-horizontal .quiz-option {
  padding: 12px 14px;
  justify-content: center;
}

.quiz-options.layout-two-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.quiz-options.layout-two-cols .quiz-option {
  padding: 12px 16px;
}

.quiz-options.layout-code {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.quiz-options.layout-code .quiz-option {
  align-items: flex-start;
  padding: 10px 14px;
}
.quiz-options.layout-code .option-label {
  margin-top: 10px;
}

/* ============================================
   解析卡片
   ============================================ */
.quiz-analysis {
  margin-top: 10px;
}
.quiz-analysis .card-desc {
  font-size: var(--fs-quiz-analysis);
  line-height: 1.75;
}

/* ============================================
   响应式
   ============================================ */
@media (max-width: 1100px) {
  .quiz-options.layout-horizontal {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .quiz-options.layout-horizontal,
  .quiz-options.layout-two-cols {
    grid-template-columns: 1fr;
  }
}
</style>
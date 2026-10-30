<template>
  <SlideShell :slide="slide" :auto-extra="false">
    <div class="level-map-layout">
      <!-- 左侧：极简进度指示（垂直居中） -->
      <aside class="level-map-side">
        <div class="level-map">
          <template v-for="(lv, i) in levels" :key="i">
            <LevelNode
              :icon="lv.icon"
              :label="lv.label"
              :active="i === 0 || (i > 0 && i < levels.length - 1)"
              :done="i === levels.length - 1"
              :step="getNodeStep(i)"
              :progress="i === 1 ? `${hintShown}/${hints.length}` : ''"
            />
            <StepWrapper
              v-if="i < levels.length - 1"
              :step="getNodeStep(i + 1)"
              class="level-arrow-wrap"
            >
              <div class="level-arrow">↓</div>
            </StepWrapper>
          </template>
        </div>
      </aside>

      <!-- 主体内容 -->
      <div class="level-map-main">
        
        <!-- 上半部分：题干 + 提示 -->
        <div class="top-section">
          <!-- 题干：固定高度，不滚动 -->
          <div class="question-pane">
            <StepWrapper v-if="question" :step="1">
              <div class="card card-primary question-card">
                <div class="question-label">
                  <span class="label-icon">🎯</span>
                  <span class="label-text">题干</span>
                </div>
                <div class="question-main">
                  <div v-if="question.timer" class="question-meta">
                    <span class="meta-text" v-html="question.timer"></span>
                  </div>
                  <div class="question-content">
                    <div class="card-desc" v-html="question.desc"></div>
                  </div>
                </div>
              </div>
            </StepWrapper>
          </div>
          
          <!-- 提示：同行优先，放不下折行，内部独立滚动防溢出 -->
          <div class="hint-pane scroll-pane">
            <HintRow v-if="hints.length" :hints="hints" :base-step="2" />
          </div>
        </div>

        <!-- 下半部分：代码 + 解析 -->
        <div class="bottom-section">
          <!-- 代码区：独立滚动 -->
          <div class="code-pane scroll-pane">
            <StepWrapper v-if="answer" :step="answerStep">
              <div class="answer-wrapper">
                <CodeBlock
                  v-if="!Array.isArray(answer)"
                  :code="answer.code"
                  :code-file="answer.codeFile"
                  :snippet="answer.snippet"
                  :density="answer.density"
                  title="✅ 参考代码"
                />
                <div v-else class="answer-array" :class="`cols-${Math.min(answer.length, 4)}`">
                  <CodeBlock
                    v-for="(item, i) in answer"
                    :key="i"
                    :code="item.code"
                    :code-file="item.codeFile"
                    :density="item.density"
                    :title="item.title || ''"
                  />
                </div>
              </div>
            </StepWrapper>
          </div>

          <!-- 解析区：独立滚动 -->
          <div class="analysis-pane scroll-pane">
            <StepWrapper v-if="analysis" :step="analysisStep">
              <div class="card card-glow">
                <div class="card-title">{{ analysis.title || "📖 解析" }}</div>
                <div class="card-desc" v-html="analysis.desc"></div>
              </div>
            </StepWrapper>
            
            <StepWrapper v-if="footer" :step="footerStep">
              <SlideFooter :html="footer" />
            </StepWrapper>
            
            <StepWrapper v-if="extra" :step="extraStep">
              <ExtraCard v-bind="extra" />
            </StepWrapper>
          </div>
        </div>

      </div>
    </div>
  </SlideShell>
</template>

<script setup>
import { computed } from "vue";
import SlideShell from "@/components/common/SlideShell.vue";
import StepWrapper from "@/components/common/StepWrapper.vue";
import CodeBlock from "@/components/common/CodeBlock.vue";
import ExtraCard from "@/components/common/ExtraCard.vue";
import SlideFooter from "@/components/common/SlideFooter.vue";
import HintRow from "@/components/level-map/HintRow.vue";
import LevelNode from "@/components/level-map/LevelNode.vue";
import { useStep } from "@/composables/useStep";
import { useStepCount } from "@/composables/useStepCount";
import { DEFAULT_LEVELS } from "@/config/defaults";

const props = defineProps({
  slide: { type: Object, required: true },
});

const d = computed(() => props.slide?.data || {});
const levels = computed(() => d.value.levels || DEFAULT_LEVELS);
const question = computed(() => d.value.question);
const hints = computed(() => d.value.hints || []);
const answer = computed(() => d.value.answer);
const analysis = computed(() => d.value.analysis);
const extra = computed(() => d.value.extra);
const footer = computed(() => d.value.footer);

useStepCount(() => {
  const data = d.value;
  let n = 1;
  n += data.hints?.length || 0;
  n += data.answer ? 1 : 0;
  n += data.analysis ? 1 : 0;
  n += data.footer ? 1 : 0;
  n += data.extra ? 1 : 0;
  return n;
});

const { current, max: maxStep } = useStep();

const answerStep = computed(() => hints.value.length + 2);
const analysisStep = computed(() => answerStep.value + (answer.value ? 1 : 0));
const footerStep = computed(() => analysisStep.value + (analysis.value ? 1 : 0));
const extraStep = computed(() => footerStep.value + (footer.value ? 1 : 0));

const hintShown = computed(() => {
  const n = current.value - 1;
  return Math.max(0, Math.min(n, hints.value.length));
});

function getNodeStep(i) {
  if (i === 0) return 1;
  if (i === levels.value.length - 1) return answerStep.value;
  return 2;
}
</script>

<style scoped>
/* ============================================ */
/* 整体布局（水平居中，高度锁死）                 */
/* ============================================ */
.level-map-layout {
  display: flex;
  height: 100%;
  min-height: 0;
  gap: 24px;
  width: 100%;
  margin: 0 auto;
}

/* ============================================ */
/* 左侧：垂直居中                               */
/* ============================================ */
.level-map-side {
  flex: 0 0 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 核心：垂直居中 */
  padding-bottom: 20px;    /* 视觉微调，略偏上 */
}

.level-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.level-arrow-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.level-arrow {
  font-size: 14px;
  color: var(--text-light);
}

/* ============================================ */
/* 右侧主体                                     */
/* ============================================ */
.level-map-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  min-width: 0;
}

/* 上下分块布局 */
.top-section {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 16px;
  flex-shrink: 0;
}

.bottom-section {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

/* 题干区 */
.question-pane { min-width: 0; }

.question-card {
  display: flex;
  flex-direction: row;
  padding: 0 !important;
  gap: 0 !important;
  overflow: hidden;
  border-radius: var(--radius-md);
}

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

.question-label .label-icon { font-size: 28px; line-height: 1; }
.question-label .label-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 8px;
  font-size: calc(16px * var(--font-scale));
}

.question-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.question-meta {
  padding: 10px 22px;
  background: linear-gradient(90deg, rgba(245, 63, 63, 0.10), rgba(245, 63, 63, 0.03));
  border-bottom: 1px solid rgba(245, 63, 63, 0.18);
  color: var(--error);
  font-weight: 600;
  font-size: calc(18px * var(--font-scale));
}
.question-content { flex: 1; padding: 14px 18px; }

/* 提示区：独立滚动 */
.hint-pane {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 250px; /* 防止提示过多撑破布局 */
  overflow-y: auto;
}

/* 强制提示行垂直排列 */
:deep(.hint-row) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
:deep(.hint-inline) {
  width: 100%;
  flex: none;
  min-width: auto;
}

/* ============================================ */
/* 底部：代码与解析（各自独立滚动）                 */
/* ============================================ */
.code-pane {
  min-height: 200px;
  overflow-y: auto;
}
.analysis-pane {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

/* ============================================ */
/* 响应式适配（极窄屏才降维，大字模式保持原样）      */
/* ============================================ */
@media (max-width: 1024px) {
  .top-section, .bottom-section {
    grid-template-columns: 1fr;
  }
  .level-map-side {
    display: none;
  }
}
</style>
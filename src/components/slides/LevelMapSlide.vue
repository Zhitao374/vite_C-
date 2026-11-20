<template>
  <SlideShell :slide="slide">
    <div class="level-map-layout">
      <!-- 左侧：进度指示 -->
      <aside class="level-map-side">
        <div class="level-map">
          <template v-for="(lv, i) in levels" :key="i">
            <LevelNode
              :icon="lv.icon" :label="lv.label"
              :active="i === 0 || (i > 0 && i < levels.length - 1)"
              :done="i === levels.length - 1"
              :step="getNodeStep(i)"
              :progress="i === 1 && hints.length ? `${hintShown}/${hints.length}` : ''"
            />
            <StepWrapper v-if="i < levels.length - 1" :step="getNodeStep(i + 1)" class="level-arrow-wrap">
              <div class="level-arrow">↓</div>
            </StepWrapper>
          </template>
        </div>
      </aside>

      <!-- 右侧主体 -->
      <div class="level-map-main">
        <!-- 上半部分：题干 + 提示区 -->
        <div class="top-section">
          <div class="question-pane">
            <StepWrapper v-if="question" :step="1">
              <div class="card card-primary question-card">
                <div class="question-label"><span class="label-icon">🎯</span><span class="label-text">题干</span></div>
                <div class="question-main">
                  <div v-if="question.timer" class="question-meta"><span class="meta-text" v-html="question.timer"></span></div>
                  <div class="question-content"><div class="card-desc" v-html="question.desc"></div></div>
                </div>
              </div>
            </StepWrapper>
          </div>
          
          <!-- 只要有 hints，就优先显示提示 -->
          <div class="hint-pane scroll-pane" v-if="hints.length">
            <HintRow :hints="hints" :base-step="2" />
          </div>
          <div v-else-if="hasSteps" class="hint-pane" style="justify-content: flex-start; padding-top: 10px;">
            <div class="card card-glow" style="border-color: var(--accent);">
              <div class="card-title" style="color: var(--accent);">💡 分步思考</div>
              <div class="card-desc">请按翻页键，跟随左侧代码的高亮，一步步推导解题逻辑。</div>
            </div>
          </div>
          <div v-else class="hint-pane"></div>
        </div>

        <!-- 下半部分：动态切换组件 -->
        <div class="bottom-section" :class="{ 'has-steps-panel': hasSteps }">
          
          <!-- 模式 A：分步代码演示模式 -->
          <CodeStepPanel
            v-if="hasSteps"
            :code-file="answerObj?.codeFile"
            :code="answerObj?.code"
            :snippet="answerObj?.snippet"
            :density="answerObj?.density"
            :steps="steps"
            :start-offset="stepsStartOffset"
          >
            <template #steps-footer>
              <StepWrapper v-if="analysis" :step="analysisStep">
                <div class="card card-glow" style="border-color: var(--success);">
                  <div class="card-title" style="color: var(--success);">{{ analysis.title || '📖 最终解析' }}</div>
                  <div class="card-desc" v-html="analysis.desc"></div>
                </div>
              </StepWrapper>
            </template>
          </CodeStepPanel>

          <!-- 模式 B：传统代码+解析模式 -->
          <template v-else>
            <div class="code-pane scroll-pane">
              <StepWrapper v-if="answer" :step="answerStep">
                <div class="answer-wrapper">
                  <CodeBlock
                    v-if="!Array.isArray(answer)"
                    :code="answer.code" :code-file="answer.codeFile" :snippet="answer.snippet" :density="answer.density" title="✅ 参考代码"
                  />
                  <div v-else class="answer-array" :class="`cols-${Math.min(answer.length, 4)}`">
                    <CodeBlock
                      v-for="(item, i) in answer" :key="i"
                      :code="item.code" :code-file="item.codeFile" :density="item.density" :title="item.title || ''"
                    />
                  </div>
                </div>
              </StepWrapper>
            </div>

            <div class="analysis-pane scroll-pane">
              <StepWrapper v-if="analysis" :step="analysisStep">
                <div class="card card-glow">
                  <div class="card-title">{{ analysis.title || '📖 解析' }}</div>
                  <div class="card-desc" v-html="analysis.desc"></div>
                </div>
              </StepWrapper>
            </div>
          </template>
        </div>
      </div>
    </div>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import CodeBlock from '@/components/common/CodeBlock.vue';
import CodeStepPanel from '@/components/common/CodeStepPanel.vue';
import HintRow from '@/components/level-map/HintRow.vue';
import LevelNode from '@/components/level-map/LevelNode.vue';
import { useStep } from '@/composables/useStep';
import { useSlideSteps } from '@/composables/useSlideSteps';
import { DEFAULT_LEVELS } from '@/config/defaults';

const props = defineProps({ slide: { type: Object, required: true } });
const d = computed(() => props.slide?.data || {});
const levels = computed(() => d.value.levels || DEFAULT_LEVELS);
const question = computed(() => d.value.question);
const hints = computed(() => d.value.hints || []);
const steps = computed(() => d.value.steps || []);
const answer = computed(() => d.value.answer);
const analysis = computed(() => d.value.analysis);

// 判断是否开启分步模式
const hasSteps = computed(() => steps.value.length > 0);

// 分步模式下，answer 必须是单对象，方便传给面板
const answerObj = computed(() => {
  if (Array.isArray(answer.value)) return answer.value[0] || {};
  return answer.value || {};
});

// 核心时间轴：
// 步数 1 = 题干
// 步数 2 到 1+H = 提示
// 步数 2+H 开始 = 代码框与步骤
const stepsStartOffset = computed(() => hints.value.length + 2);

// ============================================
// 统一步数协议
// ============================================
useSlideSteps(props, () => {
  let n = 1; // 题干
  n += hints.value.length; // 提示步数
  
  if (hasSteps.value) {
    n += steps.value.length; // 分步思考步数
    // 只要有 answer，分步面板自然就包含了代码展示
    // 如果没有写 steps 但有 answer，那算传统的一步展示
  } else if (answer.value) {
    n += 1;
  }
  
  if (analysis.value) n += 1; // 解析
  return n;
});

const { current } = useStep();

// 计算游标
const answerStep = computed(() => {
  return hasSteps.value 
    ? stepsStartOffset.value + steps.value.length // 分步看完了
    : hints.value.length + 2;                     // 传统模式代码展示
});
const analysisStep = computed(() => answerStep.value + (hasSteps.value ? 0 : (answer.value ? 1 : 0)));
const hintShown = computed(() => Math.max(0, Math.min(current.value - 1, hints.value.length)));

function getNodeStep(i) {
  if (i === 0) return 1;
  if (i === levels.value.length - 1) return answerStep.value;
  return 2;
}
</script>

<style scoped>
.level-map-layout { display: flex; height: 100%; min-height: 0; gap: 24px; width: 100%; margin: 0 auto; }
.level-map-side { flex: 0 0 56px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-bottom: 20px; }
.level-map { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.level-arrow-wrap { display: flex; justify-content: center; align-items: center; }
.level-arrow { font-size: 14px; color: var(--text-light); }
.level-map-main { flex: 1; display: flex; flex-direction: column; gap: 16px; min-height: 0; min-width: 0; }
.top-section { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; flex-shrink: 0; }
.bottom-section { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; }
.bottom-section:not(.has-steps-panel) { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; overflow: visible; }

.question-pane { min-width: 0; }
.question-card { display: flex; flex-direction: row; padding: 0 !important; gap: 0 !important; overflow: hidden; border-radius: var(--radius-md); }
.question-label { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 14px 10px; background: linear-gradient(180deg, rgba(255,122,0,0.15), rgba(255,122,0,0.05)); border-right: 1px solid rgba(255,122,0,0.2); color: var(--accent); font-weight: 700; }
.question-label .label-icon { font-size: 28px; line-height: 1; }
.question-label .label-text { writing-mode: vertical-rl; text-orientation: upright; letter-spacing: 8px; font-size: calc(16px * var(--font-scale)); }
.question-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.question-meta { padding: 10px 22px; background: linear-gradient(90deg, rgba(245,63,63,0.10), rgba(245,63,63,0.03)); border-bottom: 1px solid rgba(245,63,63,0.18); color: var(--error); font-weight: 600; font-size: calc(18px * var(--font-scale)); }
.question-content { flex: 1; padding: 14px 18px; }

.hint-pane { min-width: 0; display: flex; flex-direction: column; gap: 10px; max-height: 250px; overflow-y: auto; }
:deep(.hint-row) { display: flex; flex-direction: column; gap: 10px; }
:deep(.hint-inline) { width: 100%; flex: none; min-width: auto; }

.code-pane { min-height: 200px; overflow-y: auto; }
.analysis-pane { min-height: 200px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; }

@media (max-width: 1024px) { 
  .top-section, .bottom-section:not(.has-steps-panel) { grid-template-columns: 1fr; } 
  .level-map-side { display: none; } 
}
</style>
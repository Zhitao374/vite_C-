<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body code-walkthrough-body">
      <!-- 顶部引入（可选） -->
      <StepWrapper v-if="intro" :step="1">
        <div class="intro-card" v-html="intro"></div>
      </StepWrapper>

      <div class="split">
        <!-- 左栏：代码（静态 + 高亮） -->
        <div class="split-left scroll-pane">
          <StepWrapper :step="intro ? 2 : 1">
            <CodeBlock
              :code="d.code"
              :code-file="d.codeFile"
              :snippet="d.snippet"
              :density="d.density"
              :highlight-line="currentHighlightLine"
            />
          </StepWrapper>
        </div>

        <!-- 右栏：状态栈（动态） -->
        <div class="split-right scroll-pane">
          <StepWrapper
            v-for="(step, i) in steps"
            :key="i"
            :step="(intro ? 2 : 1) + i"
          >
            <div class="state-card">
              <div v-if="step.title" class="state-title">{{ step.title }}</div>

              <!-- 栈式展示 -->
              <div v-if="step.stack && step.stack.length" class="stack-view">
                <div
                  v-for="(frame, fi) in step.stack"
                  :key="fi"
                  class="stack-frame"
                  :class="{
                    'is-current': fi === step.stack.length - 1 && !frame.done,
                    'is-done': frame.done
                  }"
                >
                  <span class="frame-label" v-html="frame.label"></span>
                  <span class="frame-eq">=</span>
                  <span class="frame-value" v-html="frame.value"></span>
                </div>
              </div>

              <!-- 变量表展示 -->
              <div v-if="step.vars && Object.keys(step.vars).length" class="vars-view">
                <span
                  v-for="(val, key) in step.vars"
                  :key="key"
                  class="var-chip"
                >
                  <b>{{ key }}</b> = <span v-html="val"></span>
                </span>
              </div>

              <!-- 通用行展示 -->
              <div v-if="step.lines && step.lines.length" class="lines-view">
                <div
                  v-for="(line, li) in step.lines"
                  :key="li"
                  class="line-item"
                  :class="{ 'is-highlight': line.highlight }"
                  v-html="line.text"
                ></div>
              </div>

              <!-- 说明文字 -->
              <div v-if="step.note" class="step-note" v-html="step.note"></div>
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

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});
const intro = computed(() => d.value.intro || '');
const steps = computed(() => d.value.steps || []);
const extra = computed(() => d.value.extra);
const chapterTag = computed(() => props.slide.chapterTag);

const { current, max: maxStep } = useStep();

// 当前 step 对应的 step 索引
const currentStepIndex = computed(() => {
  const baseOffset = intro.value ? 2 : 1;   // intro 占 1 步，代码占 1 步
  const idx = current.value - baseOffset - 1;
  return Math.max(0, Math.min(idx, steps.value.length - 1));
});

// 当前要高亮的代码行
const currentHighlightLine = computed(() => {
  const step = steps.value[currentStepIndex.value];
  return step && step.line ? step.line : 0;
});

// 步数：intro（如有）+ 代码 + 每个 step + extra
useStepCount(emit, () =>
  (intro.value ? 1 : 0) +
  1 +
  steps.value.length +
  (extra.value ? 1 : 0)
);
</script>

<style scoped>
.code-walkthrough-body {
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
  grid-template-columns: 55fr 45fr;
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
.scroll-pane::-webkit-scrollbar-track {
  background: transparent;
}

/* ---------- 状态卡片 ---------- */
.state-card {
  padding: 16px 18px;
  background: var(--bg-card);
  border: 2px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  transition: box-shadow 0.3s;
}
.state-card:hover {
  box-shadow: var(--card-shadow-hover);
}

.state-title {
  font-size: calc(18px * var(--font-scale));
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ---------- 栈视图 ---------- */
.stack-view {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  background: var(--bg-soft);
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
}

.stack-frame {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #fff;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  font-family: var(--font-code);
  font-size: calc(18px * var(--font-scale));
  color: var(--text-sub);
  transition: all 0.3s ease;
}

.stack-frame.is-current {
  border-color: var(--accent);
  background: linear-gradient(90deg, var(--accent-soft), #fff);
  box-shadow: 0 3px 10px rgba(255, 122, 0, 0.2);
  transform: translateX(4px);
}

.stack-frame.is-done {
  border-color: var(--success);
  background: linear-gradient(90deg, var(--success-soft), #fff);
  color: #0d5f24;
  font-weight: 600;
}

.frame-label {
  font-weight: 700;
  color: var(--primary);
  flex-shrink: 0;
}
.stack-frame.is-done .frame-label {
  color: var(--success);
}

.frame-eq {
  color: var(--text-dim);
  flex-shrink: 0;
}

.frame-value {
  flex: 1;
  min-width: 0;
}

/* ---------- 变量表 ---------- */
.vars-view {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 12px;
  background: var(--bg-soft);
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
}

.var-chip {
  padding: 4px 12px;
  background: #fff;
  border: 1px solid var(--card-border);
  border-radius: 999px;
  font-family: var(--font-code);
  font-size: calc(16px * var(--font-scale));
  color: var(--text-sub);
}
.var-chip b {
  color: var(--primary);
}

/* ---------- 通用行展示 ---------- */
.lines-view {
  padding: 10px 12px;
  background: var(--bg-soft);
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
  font-family: var(--font-code);
  font-size: calc(18px * var(--font-scale));
}

.line-item {
  padding: 4px 8px;
  color: var(--text-sub);
  border-radius: 4px;
  line-height: 1.6;
}

.line-item.is-highlight {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

/* ---------- 说明文字 ---------- */
.step-note {
  font-size: calc(16px * var(--font-scale));
  color: var(--text-dim);
  line-height: 1.7;
  padding-left: 12px;
  border-left: 3px solid var(--accent-soft);
}

.step-note :deep(code) {
  background: var(--primary-soft);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--primary);
  font-family: var(--font-code);
  font-weight: 600;
}

/* 窄屏适配 */
@media (max-width: 1100px) {
  .split { grid-template-columns: 1fr; }
}
</style>
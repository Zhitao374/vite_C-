<template>
  <SlideShell :slide="slide" body-class="code-walkthrough-body">
    <StepWrapper v-if="intro" :step="1">
      <div class="intro-card" v-html="intro"></div>
    </StepWrapper>

    <div class="split">
      <div class="split-left scroll-pane">
        <StepWrapper :step="intro ? 2 : 1">
          <CodeBlock
            :code="d.code"
            :code-file="d.codeFile"
            :snippet="d.snippet"
            :density="d.density"
            :highlight-lines="currentHighlightLine ? [currentHighlightLine] : []"
          />
        </StepWrapper>
      </div>

      <div class="split-right scroll-pane">
        <StepWrapper
          v-for="(step, i) in steps"
          :key="i"
          :step="(intro ? 2 : 1) + i"
        >
          <div class="state-card">
            <div v-if="step.title" class="state-title">{{ step.title }}</div>

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

            <div v-if="step.vars && Object.keys(step.vars).length" class="vars-view">
              <span
                v-for="(val, key) in step.vars"
                :key="key"
                class="var-chip"
              >
                <b>{{ key }}</b> = <span v-html="val"></span>
              </span>
            </div>

            <div v-if="step.lines && step.lines.length" class="lines-view">
              <div
                v-for="(line, li) in step.lines"
                :key="li"
                class="line-item"
                :class="{ 'is-highlight': line.highlight }"
                v-html="line.text"
              ></div>
            </div>

            <div v-if="step.note" class="step-note" v-html="step.note"></div>
          </div>
        </StepWrapper>
      </div>
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

const d = computed(() => props.slide.data || {});
const intro = computed(() => d.value.intro || '');
const steps = computed(() => d.value.steps || []);
const extra = computed(() => d.value.extra);

const { current } = useStep();

const currentStepIndex = computed(() => {
  const baseOffset = intro.value ? 2 : 1;
  const idx = current.value - baseOffset - 1;
  return Math.max(0, Math.min(idx, steps.value.length - 1));
});

const currentHighlightLine = computed(() => {
  const step = steps.value[currentStepIndex.value];
  return step && step.line ? step.line : 0;
});

useStepCount(() =>
  (intro.value ? 1 : 0) +
  1 +
  steps.value.length +
  (extra.value ? 1 : 0)
);
</script>

<style scoped>
/* ============================================ */
/* 顶部引入                                      */
/* ============================================ */
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

/* ============================================ */
/* 两栏布局                                      */
/* ============================================ */
.split {
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: 18px;
  flex: 1;
  min-height: 0;
}

/* ============================================ */
/* 状态卡片                                      */
/* ============================================ */
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

/* 栈视图 */
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

/* 变量表 */
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
.var-chip b { color: var(--primary); }

/* 通用行 */
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

/* 说明文字 */
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

@media (max-width: 1100px) {
  .split { grid-template-columns: 1fr; }
}
</style>
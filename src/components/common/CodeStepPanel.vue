<template>
  <div class="code-step-panel">
    <!-- 左侧：代码区 -->
    <div class="panel-left">
      <StepWrapper :step="startOffset" class="h-full">
        <CodeBlock
          :code-file="codeFile"
          :code="code"
          :snippet="snippet"
          :density="density"
          :highlight-lines="currentHighlightLines"
          :hidden-lines="currentHiddenLines"
          :placeholder="placeholder || currentPlaceholder"
        />
      </StepWrapper>
    </div>

    <!-- 右侧：步骤状态区 -->
    <div class="panel-right scroll-pane">
      <StepWrapper v-for="(step, i) in steps" :key="i" :step="startOffset + i">
        <div class="state-card">
          <!-- 1. 表达式 (用于 Evolution) -->
          <div v-if="step.expression" class="step-expression" v-html="step.expression"></div>

          <div v-if="step.title" class="state-title">{{ step.title }}</div>
          
          <!-- 2. 变量展示 (用于 CodeWalkthrough) -->
          <div v-if="step.vars && Object.keys(step.vars).length" class="vars-view">
            <span v-for="(val, key) in step.vars" :key="key" class="var-chip">
              <b>{{ key }}</b> = <span v-html="val"></span>
            </span>
          </div>

          <!-- 3. 栈展示 (用于 CodeWalkthrough) -->
          <div v-if="step.stack?.length" class="stack-view">
            <div v-for="(frame, fi) in step.stack" :key="fi" class="stack-frame"
              :class="{ 'is-current': fi === step.stack.length - 1 && !frame.done, 'is-done': frame.done }">
              <span class="frame-label" v-html="frame.label"></span> = <span class="frame-value" v-html="frame.value"></span>
            </div>
          </div>

          <!-- 4. 文字推导 (用于 LevelMap / Evolution) -->
          <div v-if="step.desc || step.note" class="desc-view" v-html="step.desc || step.note"></div>
          
          <!-- 5. 额外代码行提取展示 (用于 CodeWalkthrough) -->
          <div v-if="step.lines?.length" class="lines-view">
            <div v-for="(line, li) in step.lines" :key="li" class="line-item" :class="{ 'is-highlight': line.highlight }" v-html="line.text"></div>
          </div>
        </div>
      </StepWrapper>
      
      <slot name="steps-footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import StepWrapper from './StepWrapper.vue';
import CodeBlock from './CodeBlock.vue';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  codeFile: String,
  code: String,
  snippet: String,
  density: { type: String, default: 'sm' },
  steps: { type: Array, default: () => [] },
  startOffset: { type: Number, default: 1 },
  placeholder: { type: String, default: '' }
});

const { current } = useStep();

const currentStep = computed(() => {
  const idx = current.value - props.startOffset;
  if (idx >= 0 && idx < props.steps.length) return props.steps[idx];
  return null;
});

// 自动计算高亮行（兼容单行和多行）
const currentHighlightLines = computed(() => {
  const step = currentStep.value;
  if (!step) return [];
  if (step.highlightLines) return step.highlightLines;
  if (step.focusLines) return step.focusLines; // 兼容 EvolutionSlide 的字段
  if (step.line) return [step.line];
  return [];
});

// 自动计算隐藏行
const currentHiddenLines = computed(() => currentStep.value?.hiddenLines || []);

// 自动计算占位符（优先用步骤级的，其次用组件级的）
const currentPlaceholder = computed(() => currentStep.value?.placeholder || '');
</script>

<style scoped>
.code-step-panel { display: grid; grid-template-columns: 1.1fr 1fr; gap: 16px; height: 100%; min-height: 0; }
.panel-left { display: flex; flex-direction: column; height: 100%; min-height: 0; overflow: hidden; }
.h-full { height: 100%; display: flex; flex-direction: column; min-height: 0; }
.h-full :deep(.code-block) { flex: 1; height: 100%; max-height: 100%; }
.h-full :deep(pre) { max-height: none; }

.panel-right { display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow-y: auto; padding-right: 4px; }
.state-card { padding: 16px 18px; background: var(--bg-card); border: 2px solid var(--card-border); border-radius: var(--radius-md); box-shadow: var(--card-shadow); }
.step-expression { font-size: 24px; font-weight: 700; color: var(--primary); margin-bottom: 12px; }
.state-title { font-size: calc(18px * var(--font-scale)); font-weight: 700; color: var(--text-main); margin-bottom: 10px; }
.desc-view { font-size: calc(16px * var(--font-scale)); color: var(--text-sub); line-height: 1.7; }
.desc-view :deep(code) { background: rgba(22,93,255,0.08); padding: 2px 6px; border-radius: 4px; color: var(--primary); font-weight: 600; }

.vars-view { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.var-chip { padding: 4px 12px; background: #fff; border: 1px solid var(--card-border); border-radius: 999px; font-family: var(--font-code); font-size: calc(16px * var(--font-scale)); }
.var-chip b { color: var(--primary); }
.stack-view { display: flex; flex-direction: column; gap: 6px; padding: 10px; background: var(--bg-soft); border-radius: var(--radius-sm); margin-bottom: 10px; }
.stack-frame { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: #fff; border: 1px solid var(--card-border); border-radius: 8px; font-family: var(--font-code); font-size: calc(18px * var(--font-scale)); transition: all 0.3s ease; }
.stack-frame.is-current { border-color: var(--accent); background: var(--accent-soft); transform: translateX(4px); }
.stack-frame.is-done { border-color: var(--success); background: var(--success-soft); color: #0d5f24; }
.lines-view { padding: 10px 12px; background: var(--bg-soft); border-radius: var(--radius-sm); font-family: var(--font-code); font-size: calc(18px * var(--font-scale)); }
.line-item { padding: 4px 8px; color: var(--text-sub); border-radius: 4px; line-height: 1.6; }
.line-item.is-highlight { background: var(--accent-soft); color: var(--accent); font-weight: 600; }
</style>
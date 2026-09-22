<template>
  <div class="slide">
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body code-split-body">
      <!-- 顶部引入（可选，占第 1 步） -->
      <StepWrapper v-if="d.intro" :step="1">
        <IntroCard :html="d.intro" />
      </StepWrapper>

      <div class="split">
        <div class="split-left scroll-pane">
          <StepWrapper :step="baseOffset">
            <CodeBlock :code="d.code" :code-file="d.codeFile" :snippet="d.snippet" :density="d.density" />
          </StepWrapper>
        </div>
        <div class="split-right scroll-pane">
          <StepWrapper
            v-for="(a, i) in annotations"
            :key="i"
            :step="baseOffset + i"
          >
            <div class="card annotation-card">
              <div class="card-title">
                <span class="badge badge-primary">第 {{ a.line }} 行</span>
                <span v-html="a.title"></span>
              </div>
              <div v-if="a.desc" class="card-desc" v-html="a.desc"></div>
            </div>
          </StepWrapper>
        </div>
      </div>

      <div v-if="d.output || extra" class="bottom-row">
        <StepWrapper
          v-if="d.output"
          :step="baseOffset + annotations.length"
          class="bottom-col"
        >
          <div class="card output-card">
            <div class="output-title">🖥️ 运行结果</div>
            <pre><code>{{ d.output }}</code></pre>
          </div>
        </StepWrapper>

        <StepWrapper v-if="extra" :step="maxStep" class="bottom-col">
          <ExtraCard
            :title="extra.title"
            :desc="extra.desc"
            :variant="extra.variant || 'card-primary'"
          />
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
import IntroCard from '@/components/common/IntroCard.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});
const annotations = computed(() => d.value.annotations || []);
const extra = computed(() => d.value.extra);

// 代码块起始 step：有 intro 时是 2（intro 占 1），否则是 1
const baseOffset = computed(() => (d.value.intro ? 2 : 1));

// 步数：intro（可选）+ 代码块 + 注释 + output（可选）+ extra（可选）
useStepCount(emit, () =>
  (d.value.intro ? 1 : 0) +
  1 +
  annotations.value.length +
  (d.value.output ? 1 : 0) +
  (extra.value ? 1 : 0)
);

const { max: maxStep } = useStep();
</script>

<style scoped>
/* 外层：撑满 slide-body 剩余空间，不滚动 */
.code-split-body {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

/* 顶部两栏区：撑满剩余高度 */
.split {
  display: grid;
  grid-template-columns: 45fr 55fr;
  gap: 18px;
  flex: 1;
  min-height: 0;
}

/* 注释栏：内部卡片纵向排列 */
.split-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.split pre {
  background: #1e2a44;
  color: #e6f1ff;
  border-radius: var(--radius-sm);
  padding: 14px 18px;
  font-family: var(--font-code);
  font-size: calc(18px * var(--font-scale));
  line-height: 1.55;
  overflow-x: auto;
  margin: 0;
}

.split .card-title {
  font-size: var(--fs-card-title);
}

.split .card-desc {
  font-size: var(--fs-card-desc);
}

/* 注释卡片紧凑版 */
.annotation-card {
  padding: 12px 16px;
  gap: 6px;
}
.annotation-card .card-title {
  font-size: calc(20px * var(--font-scale));
  line-height: 1.4;
  gap: 8px;
}
.annotation-card .card-desc {
  font-size: calc(18px * var(--font-scale));
  line-height: 1.55;
}

/* 运行结果卡片：紧凑版 */
.output-card {
  padding: 10px 14px;
  gap: 4px;
}

.output-title {
  font-size: calc(16px * var(--font-scale));
  font-weight: 700;
  color: var(--text-sub);
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.output-card pre {
  background: var(--code-bg);
  color: var(--code-text);
  border-radius: var(--radius-sm);
  padding: 8px 14px;
  font-family: var(--font-code);
  font-size: calc(16px * var(--font-scale));
  line-height: 1.5;
  margin: 0;
  overflow-x: auto;
}

.output-card pre code {
  font-family: inherit;
  color: inherit;
}
/* 底部区域：运行结果 + Extra 并排 */
.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 12px;
  align-items: stretch;
}

.bottom-col {
  display: flex;
  flex-direction: column;
}

.bottom-col > * {
  flex: 1;
}

/* 只有一块时，占满宽度 */
.bottom-row:has(> :only-child) {
  grid-template-columns: 1fr;
}

/* 防止 extra 内容撑破布局 */
.bottom-row {
  min-width: 0;
  max-height: 320px;          /* 限高 */
  overflow: hidden;
}

.bottom-col {
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.bottom-col > * {
  flex: 1;
  min-height: 0;
  overflow-y: auto;            /* 超出时内部滚动 */
}

/* extra 内的 pre 保护 */
.bottom-row :deep(pre) {
  max-width: 100%;
  overflow-x: auto;
}

/* 窄屏改单列 */
@media (max-width: 1100px) {
  .bottom-row {
    grid-template-columns: 1fr;
  }
}

/* 窄屏：取消独立滚动，恢复单列 */
@media (max-width: 900px) {
  .split {
    grid-template-columns: 1fr;
  }
  .scroll-pane {
    overflow-y: visible;
    max-height: none;
  }
}
</style>
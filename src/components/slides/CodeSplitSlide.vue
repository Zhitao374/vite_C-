<template>
  <SlideShell :slide="slide" body-class="code-split-body" :auto-extra="false">
    <StepWrapper v-if="d.intro" :step="1">
      <IntroCard :html="d.intro" />
    </StepWrapper>

    <div class="split">
      <div class="split-left scroll-pane">
        <StepWrapper :step="baseOffset">
          <CodeBlock
            :code="d.code"
            :code-file="d.codeFile"
            :snippet="d.snippet"
            :density="d.density"
          />
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
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import CodeBlock from '@/components/common/CodeBlock.vue';
import ExtraCard from '@/components/common/ExtraCard.vue';
import IntroCard from '@/components/common/IntroCard.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true }
});

const d = computed(() => props.slide.data || {});
const annotations = computed(() => d.value.annotations || []);
const extra = computed(() => d.value.extra);

const baseOffset = computed(() => (d.value.intro ? 2 : 1));

useStepCount(() =>
  (d.value.intro ? 1 : 0) +
  1 +
  annotations.value.length +
  (d.value.output ? 1 : 0) +
  (extra.value ? 1 : 0)
);

const { max: maxStep } = useStep();
</script>

<style scoped>
.split {
  display: grid;
  grid-template-columns: 45fr 55fr;
  gap: 18px;
  flex: 1;
  min-height: 0;
}

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

.split .card-title { font-size: var(--fs-card-title); }
.split .card-desc  { font-size: var(--fs-card-desc); }

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

.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 12px;
  align-items: stretch;
  min-width: 0;
  max-height: 320px;
  overflow: hidden;
}

.bottom-col {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.bottom-col > * {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.bottom-row:has(> :only-child) {
  grid-template-columns: 1fr;
}

.bottom-row :deep(pre) {
  max-width: 100%;
  overflow-x: auto;
}

@media (max-width: 1100px) {
  .bottom-row { grid-template-columns: 1fr; }
}

@media (max-width: 900px) {
  .split { grid-template-columns: 1fr; }
  .scroll-pane {
    overflow-y: visible;
    max-height: none;
  }
}
</style>
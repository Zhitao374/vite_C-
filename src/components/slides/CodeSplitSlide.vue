<template>
  <SlideShell :slide="slide">
    <SplitLayout :cols="2" ratio="1.1:1">
      <div class="h-full">
        <StepWrapper :step="1" class="h-full">
          <CodeBlock v-if="d.codes?.length" class="code-block">
            <CodeBlock v-for="(c, i) in d.codes" :key="i" v-bind="c" />
          </CodeBlock>
          <CodeBlock v-else :code-file="d.codeFile" :code="d.code" :snippet="d.snippet" :density="d.density" />
        </StepWrapper>
      </div>
      <div class="h-full info-pane">
        <StepWrapper v-if="d.output" :step="outputStep">
          <div class="card output-card"><div class="card-title">🖥️ 运行结果</div><pre><code>{{ d.output }}</code></pre></div>
        </StepWrapper>
        <div class="scroll-pane annotations-list">
          <StepWrapper v-for="(a, i) in d.annotations || []" :key="i" :step="1 + i + 1">
            <div class="card annotation-card">
              <span class="badge badge-primary">第 {{ a.line }} 行</span>
              <span class="annotation-title" v-html="a.title"></span>
              <div v-if="a.desc" class="annotation-desc" v-html="a.desc"></div>
            </div>
          </StepWrapper>
        </div>
      </div>
    </SplitLayout>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import SplitLayout from '@/components/layouts/SplitLayout.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import CodeBlock from '@/components/common/CodeBlock.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';
const props = defineProps({ slide: { type: Object, required: true } });
const d = computed(() => props.slide?.data || {});
useSlideSteps(props, () => 1 + (d.value.annotations?.length || 0) + (d.value.output ? 1 : 0));
const outputStep = computed(() => 1 + (d.value.annotations?.length || 0) + 1);
</script>

<style scoped>
.h-full { height: 100%; min-height: 0; display: flex; flex-direction: column; }
.code-block { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.info-pane { gap: 12px; }
.output-card { padding: 10px 14px; flex-shrink: 0; }
.output-card pre { margin: 0; background: var(--code-bg); color: var(--code-text); border-radius: var(--radius-sm); padding: 10px 14px; font-family: var(--font-code); font-size: calc(15px * var(--font-scale)); overflow-x: auto; }
.annotations-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
.annotation-card { padding: 10px 14px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; }
.annotation-title { font-size: calc(18px * var(--font-scale)); font-weight: 700; color: var(--text-main); }
.annotation-desc { flex: 1; min-width: 200px; font-size: calc(16px * var(--font-scale)); color: var(--text-sub); line-height: 1.5; }
</style>
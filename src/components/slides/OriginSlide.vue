<template>
  <SlideShell :slide="slide">
    <!-- ① 问题场景 -->
    <StepWrapper v-if="problem" :step="1">
      <div class="origin-problem">
        <div class="problem-head">
          <span class="problem-icon">⚠️</span>
          <span class="problem-title">{{ problem.title }}</span>
        </div>
        <ul v-if="problem.points?.length" class="problem-points">
          <li v-for="(p, i) in problem.points" :key="i" v-html="p"></li>
        </ul>
        <pre v-if="problem.visual" class="problem-visual"><code>{{ problem.visual }}</code></pre>
      </div>
    </StepWrapper>

    <!-- ② 演进过程 -->
    <div v-if="evolution.length" class="origin-evolution">
      <StepWrapper
        v-for="(item, i) in evolution"
        :key="i"
        :step="evolutionBase + i"
      >
        <div class="evolution-node">
          <div class="node-icon">{{ item.icon || '▶️' }}</div>
          <div class="node-content">
            <div class="node-head">
              <span v-if="item.era" class="node-era">{{ item.era }}</span>
              <span class="node-title">{{ item.title }}</span>
            </div>
            <div v-if="item.desc" class="node-desc" v-html="item.desc"></div>
          </div>
        </div>
      </StepWrapper>
    </div>

    <!-- ③ 今天的方案 -->
    <StepWrapper v-if="summary" :step="summaryStep">
      <div class="origin-summary">
        <div class="summary-head">
          <span class="summary-icon">✅</span>
          <span class="summary-title">{{ summary.title }}</span>
        </div>
        <div v-if="summary.desc" class="summary-desc" v-html="summary.desc"></div>
        <pre v-if="summary.code" class="summary-code"><code>{{ summary.code }}</code></pre>
      </div>
    </StepWrapper>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const d = computed(() => props.slide.data || {});
const problem = computed(() => d.value.problem);
const evolution = computed(() => d.value.evolution || []);
const summary = computed(() => d.value.summary);
const extra = computed(() => d.value.extra);

const evolutionBase = computed(() => (problem.value ? 2 : 1));
const summaryStep = computed(() => evolutionBase.value + evolution.value.length);

useStepCount(() => {
  let n = 0;
  if (problem.value) n += 1;
  n += evolution.value.length;
  if (summary.value) n += 1;
  if (extra.value) n += 1;
  return Math.max(1, n);
});
</script>

<style scoped>
/* ============================================ */
/* ① 问题场景                                    */
/* ============================================ */
.origin-problem {
  background: linear-gradient(145deg, #FFF5F5, #FFFFFF);
  border: 2px solid rgba(245, 63, 63, 0.25);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 16px rgba(245, 63, 63, 0.08);
  padding: calc(24px * var(--font-scale)) calc(28px * var(--font-scale));
  position: relative;
  overflow: hidden;
}
.origin-problem::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 4px;
  background: linear-gradient(90deg, var(--error), #FFA07A);
}
.problem-head {
  display: flex;
  align-items: center;
  gap: calc(12px * var(--font-scale));
  font-size: var(--fs-card-title);
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: calc(16px * var(--font-scale));
}
.problem-icon {
  font-size: calc(32px * var(--font-scale));
  line-height: 1;
}
.problem-points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: calc(8px * var(--font-scale));
}
.problem-points li {
  position: relative;
  padding-left: calc(28px * var(--font-scale));
  font-size: var(--fs-card-desc);
  line-height: 1.7;
  color: var(--text-sub);
}
.problem-points li::before {
  content: '▸';
  position: absolute;
  left: calc(8px * var(--font-scale));
  color: var(--error);
  font-weight: 700;
}
.problem-points :deep(code) {
  background: rgba(245, 63, 63, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-code);
  color: var(--error);
  font-weight: 600;
}
.problem-visual {
  margin-top: calc(16px * var(--font-scale));
  margin-bottom: 0;
  background: var(--code-bg);
  color: var(--code-text);
  border-radius: var(--radius-sm);
  padding: calc(14px * var(--font-scale)) calc(18px * var(--font-scale));
  font-family: var(--font-code);
  font-size: calc(18px * var(--font-scale));
  line-height: 1.55;
  overflow-x: auto;
}

/* ============================================ */
/* ② 演进过程                                    */
/* ============================================ */
.origin-evolution {
  display: flex;
  flex-direction: column;
  gap: calc(12px * var(--font-scale));
}
.evolution-node {
  display: flex;
  align-items: flex-start;
  gap: calc(16px * var(--font-scale));
  padding: calc(16px * var(--font-scale)) calc(20px * var(--font-scale));
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  transition: box-shadow 0.3s, transform 0.3s;
}
.evolution-node:hover {
  box-shadow: var(--card-shadow-hover);
  transform: translateX(4px);
}
.node-icon {
  flex-shrink: 0;
  width: calc(44px * var(--font-scale));
  height: calc(44px * var(--font-scale));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(24px * var(--font-scale));
  line-height: 1;
  background: var(--primary-soft);
  border-radius: 50%;
}
.node-content {
  flex: 1;
  min-width: 0;
}
.node-head {
  display: flex;
  align-items: center;
  gap: calc(12px * var(--font-scale));
  margin-bottom: calc(6px * var(--font-scale));
  flex-wrap: wrap;
}
.node-era {
  font-family: var(--font-code);
  font-size: calc(14px * var(--font-scale));
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.5px;
  padding: 2px 10px;
  background: var(--accent-soft);
  border-radius: 999px;
}
.node-title {
  font-size: var(--fs-card-title);
  font-weight: 700;
  color: var(--text-main);
}
.node-desc {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.65;
}
.node-desc :deep(code) {
  background: var(--primary-soft);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-code);
  color: var(--primary);
  font-weight: 600;
}

/* ============================================ */
/* ③ 今天的方案                                  */
/* ============================================ */
.origin-summary {
  background: linear-gradient(145deg, #FFFFFF, #F0FFF4);
  border: 2px solid rgba(0, 180, 42, 0.3);
  border-radius: var(--radius-md);
  box-shadow: 0 6px 24px rgba(0, 180, 42, 0.1);
  padding: calc(24px * var(--font-scale)) calc(28px * var(--font-scale));
  position: relative;
  overflow: hidden;
}
.origin-summary::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 4px;
  background: linear-gradient(90deg, var(--success), #67E8A0);
}
.summary-head {
  display: flex;
  align-items: center;
  gap: calc(12px * var(--font-scale));
  font-size: var(--fs-card-title);
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: calc(12px * var(--font-scale));
}
.summary-icon {
  font-size: calc(32px * var(--font-scale));
  line-height: 1;
}
.summary-desc {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.7;
  margin-bottom: calc(14px * var(--font-scale));
}
.summary-desc :deep(code) {
  background: var(--success-soft);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-code);
  color: #0d5f24;
  font-weight: 600;
}
.summary-code {
  background: var(--code-bg);
  color: var(--code-text);
  border-radius: var(--radius-sm);
  padding: calc(14px * var(--font-scale)) calc(18px * var(--font-scale));
  font-family: var(--font-code);
  font-size: calc(18px * var(--font-scale));
  line-height: 1.55;
  overflow-x: auto;
  margin: 0;
}
</style>
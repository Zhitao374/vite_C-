<template>
  <SlideShell :slide="slide">
    <StepWrapper
      v-for="(c, i) in cases"
      :key="i"
      :step="i + 1"
    >
      <div class="pitfall-case">
        <div class="case-head">
          <span class="case-icon">{{ c.icon || '❌' }}</span>
          <span class="case-scene">{{ c.scene }}</span>
        </div>
        <div class="case-body">
          <div v-if="c.what" class="case-row">
            <span class="row-label">现象</span>
            <span class="row-text" v-html="c.what"></span>
          </div>
          <div v-if="c.why" class="case-row">
            <span class="row-label">原因</span>
            <span class="row-text" v-html="c.why"></span>
          </div>
          <div v-if="c.fix" class="case-row case-fix">
            <span class="row-label">应对</span>
            <span class="row-text" v-html="c.fix"></span>
          </div>
        </div>
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

const cases = computed(() => props.slide.data?.cases || []);
const extra = computed(() => props.slide.data?.extra);

useStepCount(() => cases.value.length + (extra.value ? 1 : 0));
</script>

<style scoped>
.pitfall-case {
  background: linear-gradient(145deg, #FFF5F5, #FFFFFF);
  border: 2px solid rgba(245, 63, 63, 0.25);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 16px rgba(245, 63, 63, 0.08);
  padding: calc(20px * var(--font-scale)) calc(26px * var(--font-scale));
  position: relative;
  overflow: hidden;
}
.pitfall-case::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 4px; height: 100%;
  background: var(--error);
}
.case-head {
  display: flex;
  align-items: center;
  gap: calc(12px * var(--font-scale));
  margin-bottom: calc(14px * var(--font-scale));
  padding-bottom: calc(10px * var(--font-scale));
  border-bottom: 1px dashed rgba(245, 63, 63, 0.2);
}
.case-icon {
  font-size: calc(28px * var(--font-scale));
  line-height: 1;
}
.case-scene {
  font-size: var(--fs-card-title);
  font-weight: 700;
  color: var(--text-main);
}
.case-body {
  display: flex;
  flex-direction: column;
  gap: calc(8px * var(--font-scale));
}
.case-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: calc(14px * var(--font-scale));
  align-items: baseline;
}
.row-label {
  font-size: calc(16px * var(--font-scale));
  font-weight: 700;
  color: var(--error);
  text-align: right;
  letter-spacing: 1px;
}
.row-text {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.65;
}
.row-text :deep(code) {
  background: rgba(245, 63, 63, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-code);
  color: var(--error);
  font-weight: 600;
}
.case-fix {
  margin-top: calc(6px * var(--font-scale));
  padding-top: calc(10px * var(--font-scale));
  border-top: 1px dashed rgba(0, 180, 42, 0.25);
}
.case-fix .row-label { color: var(--success); }
.case-fix .row-text :deep(code) {
  background: var(--success-soft);
  color: #0d5f24;
}
</style>
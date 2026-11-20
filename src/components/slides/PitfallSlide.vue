<template>
  <SlideShell :slide="slide">
    <FlexLayout scrollable>
      <StepWrapper v-for="(c, i) in cases" :key="i" :step="i + 1">
        <div class="pitfall-case" style="margin-bottom: 16px;">
          <div class="case-head"><span class="case-icon">{{ c.icon || '❌' }}</span><span class="case-scene">{{ c.scene }}</span></div>
          <div class="case-body">
            <div v-if="c.what" class="case-row"><span class="row-label">现象</span><span class="row-text" v-html="c.what"></span></div>
            <div v-if="c.why" class="case-row"><span class="row-label">原因</span><span class="row-text" v-html="c.why"></span></div>
            <div v-if="c.fix" class="case-row case-fix"><span class="row-label">应对</span><span class="row-text" v-html="c.fix"></span></div>
          </div>
        </div>
      </StepWrapper>
    </FlexLayout>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import FlexLayout from '@/components/layouts/FlexLayout.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';
const props = defineProps({ slide: { type: Object, required: true } });
const cases = computed(() => props.slide.data?.cases || []);
useSlideSteps(props, () => cases.value.length);
</script>

<style scoped>
.pitfall-case { background: linear-gradient(145deg, #fff5f5, #ffffff); border: 2px solid rgba(245,63,63,0.25); border-radius: var(--radius-md); padding: 20px; }
.case-head { display: flex; gap: 12px; margin-bottom: 14px; border-bottom: 1px dashed rgba(245,63,63,0.2); padding-bottom: 10px; }
.case-scene { font-size: var(--fs-card-title); font-weight: 700; }
.case-row { display: grid; grid-template-columns: 60px 1fr; gap: 14px; margin-bottom: 8px; }
.row-label { color: var(--error); font-weight: 700; text-align: right; }
.case-fix .row-label { color: var(--success); }
</style>
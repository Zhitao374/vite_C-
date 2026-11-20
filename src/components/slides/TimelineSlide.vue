<template>
  <SlideShell :slide="slide">
    <FlexLayout scrollable>
      <div class="timeline" :class="timelineClass">
        <StepWrapper v-for="(it, i) in items" :key="i" :step="i + 1">
          <div class="timeline-item">
            <div class="timeline-card" :class="{ 'timeline-card-highlight': it.highlight }">
              <div class="timeline-card-head">
                <span class="timeline-index">{{ String(i + 1).padStart(2, '0') }}</span>
                <span v-if="it.icon" class="timeline-icon"><IconMap :emoji="it.icon" :size="26" /></span>
                <span class="timeline-title">{{ it.title }}</span>
                <span v-if="it.badge" class="badge badge-accent">{{ it.badge }}</span>
              </div>
              <div v-if="it.desc" class="timeline-desc" v-html="it.desc"></div>
              <ul v-if="it.points?.length" class="timeline-points"><li v-for="(p, j) in it.points" :key="j" v-html="p"></li></ul>
            </div>
          </div>
        </StepWrapper>
      </div>
    </FlexLayout>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import FlexLayout from '@/components/layouts/FlexLayout.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import IconMap from '@/components/common/IconMap.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';
const props = defineProps({ slide: { type: Object, required: true } });
const items = computed(() => props.slide.data?.items || []);
const timelineClass = computed(() => ({
  'timeline-cols': items.value.length >= 5,
  [`timeline-${props.slide.variant}`]: !!props.slide.variant,
}));
useSlideSteps(props, () => items.value.length);
</script>

<style scoped>
.timeline { position: relative; padding-left: 46px; padding-top: 4px; padding-bottom: 4px; }
.timeline::before { content: ""; position: absolute; left: 18px; top: 10px; bottom: 10px; width: 3px; background: linear-gradient(180deg, var(--primary), var(--accent)); border-radius: 2px; }
.timeline-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 22px; }
.timeline-cols::before { display: none; }
.timeline-item { position: relative; padding-bottom: 10px; }
.timeline-cols .timeline-item { padding-bottom: 0; }
.timeline-item::before { content: ""; position: absolute; left: -34px; top: 22px; width: 17px; height: 17px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 5px rgba(255,122,0,0.18); z-index: 2; }
.timeline-card { background: var(--bg-card); border: 1px solid var(--card-border); border-radius: var(--radius-md); padding: 20px 26px; box-shadow: var(--card-shadow); }
.timeline-card-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px; }
.timeline-index { font-family: var(--font-code); font-size: calc(26px * var(--font-scale)); font-weight: 900; color: var(--primary); opacity: 0.35; letter-spacing: -1px; }
.timeline-title { font-size: var(--fs-timeline-title); font-weight: 700; color: var(--text-main); flex: 1; }
.timeline-desc { font-size: var(--fs-timeline-desc); color: var(--text-sub); line-height: 1.75; }
.timeline-points { list-style: none; display: flex; flex-wrap: wrap; gap: 4px 16px; margin-top: 4px; }
.timeline-points li { font-size: calc(20px * var(--font-scale)); color: var(--text-dim); padding-left: 20px; position: relative; }
.timeline-points li::before { content: "▸"; position: absolute; left: 0; color: var(--accent); }
.timeline-card-highlight { border: 2px solid var(--accent); background: linear-gradient(145deg, #fff7ed, #ffffff); }
@media (max-width: 1100px) { .timeline-cols { grid-template-columns: 1fr; } }
</style>
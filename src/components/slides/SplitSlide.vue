<template>
  <SlideShell :slide="slide">
    <SplitLayout :cols="cols" :ratio="cols === 2 ? '1.1:1' : '1:1'">
      <div v-for="(pane, idx) in panes" :key="idx" class="split-col">
        <component :is="stepped ? StepWrapper : 'div'" :step="stepped ? idx + 1 : undefined" class="split-pane-wrap">
          <div class="split-pane">
            <h3 v-if="pane.title" class="pane-title"><span v-if="pane.icon">{{ pane.icon }}</span> {{ pane.title }}</h3>
            <ImageCard v-if="pane.image" v-bind="pane" />
            <div v-else-if="pane.codeFile" class="pane-code"><CodeBlock :code-file="pane.codeFile" :snippet="pane.snippet" density="sm" /></div>
            <div v-else class="pane-items">
              <div v-for="(item, i) in pane.items || []" :key="i" class="pane-item">
                <div v-if="item.title" class="item-title">{{ item.title }}</div>
                <div v-if="item.desc" class="item-desc" v-html="item.desc"></div>
                <ul v-if="item.items" class="item-list"><li v-for="(p, j) in item.items" :key="j" v-html="p"></li></ul>
              </div>
            </div>
          </div>
        </component>
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
import ImageCard from '@/components/common/ImageCard.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';
const props = defineProps({ slide: { type: Object, required: true } });
const panes = computed(() => props.slide.data?.panes || []);
const stepped = computed(() => !!props.slide.data?.stepped);
const cols = computed(() => {
  const c = props.slide.data?.cols;
  return (Number.isInteger(c) && c >= 1 && c <= 4) ? c : Math.min(panes.value.length, 4);
});
useSlideSteps(props, () => stepped.value ? panes.value.length : 1);
</script>

<style scoped>
.split-pane-wrap { height: 100%; flex: 1; min-height: 0; display: flex; flex-direction: column; }
.split-pane { background: var(--bg-card); border: 1px solid var(--card-border); border-radius: var(--radius-md); box-shadow: var(--card-shadow); padding: 16px 20px; flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.pane-title { display: flex; align-items: center; gap: 8px; font-size: var(--fs-card-title); font-weight: 800; color: var(--primary); margin: 0; border-bottom: 2px solid var(--primary-soft); padding-bottom: 8px; }
.pane-code { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.item-title { font-size: var(--fs-card-title); font-weight: 700; color: var(--text-main); }
.item-desc { font-size: var(--fs-card-desc); color: var(--text-sub); line-height: 1.5; }
.item-list { margin: 0; padding-left: 20px; font-size: var(--fs-card-desc); line-height: 1.6; }
</style>
<template>
  <SlideShell :slide="slide">
    <FlexLayout scrollable>
      <div v-for="(group, cat) in grouped" :key="cat" class="word-group" style="margin-bottom: 16px;">
        <h3 class="group-title"><span class="group-icon">{{ categoryIcon(cat) }}</span><span class="group-name">{{ cat }}</span></h3>
        <div class="word-list">
          <div v-for="w in group" :key="w.word" class="word-item">
            <div class="word-main"><code class="word">{{ w.word }}</code><span v-if="w.pron" class="pron">{{ w.pron }}</span></div>
            <div class="word-cn">{{ w.cn }}</div>
            <div v-if="w.origin" class="word-origin">{{ w.origin }}</div>
          </div>
        </div>
      </div>
    </FlexLayout>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import FlexLayout from '@/components/layouts/FlexLayout.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';
const props = defineProps({ slide: { type: Object, required: true } });
const grouped = computed(() => {
  const groups = {};
  (props.slide.data?.words || []).forEach((w) => {
    const c = w.category || '概念';
    if (!groups[c]) groups[c] = [];
    groups[c].push(w);
  });
  return groups;
});
useSlideSteps(props, () => 1);
function categoryIcon(cat) {
  const map = { 关键字: '🔑', 类型: '📦', 函数: '🔧', 运算符: '➕', 语句: '📝', 概念: '💡' };
  return map[cat] || '📌';
}
</script>

<style scoped>
.word-group { background: var(--bg-card); border: 1px solid var(--card-border); border-radius: var(--radius-md); padding: 20px; }
.group-title { display: flex; gap: 10px; font-size: var(--fs-card-title); font-weight: 800; margin-bottom: 12px; color: var(--primary); }
.word-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
.word-item { background: var(--primary-soft); border-radius: var(--radius-sm); padding: 14px; }
.word { font-family: var(--font-code); font-size: var(--fs-card-title); font-weight: 800; color: var(--primary); }
</style>
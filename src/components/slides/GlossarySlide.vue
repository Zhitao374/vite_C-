<template>
  <div class="slide">
    <h1 class="slide-title">
      {{ slide.title }}
      <p v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</p>
    </h1>

    <div class="slide-body">
      <div v-for="(group, cat) in grouped" :key="cat" class="word-group">
        <h3 class="group-title">
          <span class="group-icon">{{ categoryIcon(cat) }}</span>
          <span class="group-name">{{ cat }}</span>
        </h3>
        <div class="word-list">
          <div v-for="w in group" :key="w.word" class="word-item">
            <div class="word-main">
              <code class="word">{{ w.word }}</code>
              <span v-if="w.pron" class="pron">{{ w.pron }}</span>
            </div>
            <div class="word-cn">{{ w.cn }}</div>
            <div v-if="w.origin" class="word-origin">{{ w.origin }}</div>
          </div>
        </div>
      </div>

      <ExtraCard v-if="slide.data?.extra" v-bind="slide.data.extra" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ExtraCard from '@/components/common/ExtraCard.vue';

const props = defineProps({
  slide: { type: Object, required: true }
});

const grouped = computed(() => {
  const groups = {};
  (props.slide.data?.words || []).forEach(w => {
    const c = w.category || '概念';
    if (!groups[c]) groups[c] = [];
    groups[c].push(w);
  });
  return groups;
});

function categoryIcon(cat) {
  const map = {
    '关键字': '🔑',
    '类型': '📦',
    '函数': '🔧',
    '运算符': '➕',
    '语句': '📝',
    '概念': '💡'
  };
  return map[cat] || '📌';
}
</script>

<style scoped>
/* ============================================
   顶层容器
   ============================================ */
.glossary-slide {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-lg);
}

/* ============================================
   标题区
   ============================================ */
.slide-header {
  margin-bottom: var(--space-gap-md);
}

.slide-header h1 {
  font-size: var(--fs-slide-title);
  color: var(--text-main);
  font-weight: 900;
  margin: 0;
  line-height: 1.2;
}

.slide-header .subtitle {
  font-size: var(--fs-slide-subtitle);
  color: var(--text-sub);
  margin-top: calc(6px * var(--font-scale));
  font-weight: 400;
}

/* ============================================
   内容区
   ============================================ */
.slide-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-lg);
}

/* ============================================
   分组卡片
   ============================================ */
.word-group {
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  padding: var(--space-card-padding-y) var(--space-card-padding-x);
}

.group-title {
  display: flex;
  align-items: center;
  gap: calc(10px * var(--font-scale));
  font-size: var(--fs-card-title);
  font-weight: 800;
  color: var(--primary);
  margin: 0 0 var(--space-gap-md) 0;
  line-height: 1.3;
}

.group-icon {
  font-size: var(--fs-card-title);
  line-height: 1;
}

/* ============================================
   词条网格（auto-fit 避免空列占位）
   ============================================ */
.word-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 260px));
  gap: var(--space-gap-md);
}

/* ============================================
   词条卡片
   ============================================ */
.word-item {
  padding: calc(14px * var(--font-scale)) calc(16px * var(--font-scale));
  border-radius: var(--radius-sm);
  background: var(--primary-soft);
  display: flex;
  flex-direction: column;
  gap: calc(4px * var(--font-scale));
  min-height: calc(86px * var(--font-scale));
  box-sizing: border-box;
}

.word-main {
  display: flex;
  align-items: baseline;
  gap: calc(8px * var(--font-scale));
  flex-wrap: wrap;
}

.word {
  font-family: var(--font-code);
  font-size: var(--fs-card-title);
  font-weight: 800;
  color: var(--primary);
  line-height: 1.2;
}

.pron {
  font-size: var(--fs-badge);
  color: var(--text-dim);
  font-style: italic;
}

.word-cn {
  font-size: var(--fs-card-desc);
  color: var(--text-main);
  font-weight: 600;
  line-height: 1.3;
}

.word-origin {
  font-size: var(--fs-badge);
  color: var(--text-dim);
  line-height: 1.4;
}
</style>
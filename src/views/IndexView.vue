<template>
  <div class="index-page">
    <div class="index-container">
      <h1>C++ 竞赛课程体系</h1>
      <p class="subtitle">从 0 基础到 CSP-J/S · 两年 80 周 · 每周 3 小时</p>

      <!-- 统计 -->
      <div class="home-stats">
        <div class="stat-card">
          <div class="stat-num">{{ lessonList.length }}</div>
          <div class="stat-label">已完成讲次</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">{{ totalSlides }}</div>
          <div class="stat-label">已完成页数</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">80</div>
          <div class="stat-label">计划总讲次</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">{{ progress }}%</div>
          <div class="stat-label">完成进度</div>
        </div>
      </div>

      <!-- 按分类分组 -->
      <div
        v-for="group in groupedLessons"
        :key="group.category"
        class="lesson-group"
      >
        <h2 class="group-title">
          <span class="group-dot"></span>
          {{ group.category }}
          <span class="group-count">({{ group.items.length }} 讲)</span>
        </h2>

        <div class="lesson-grid">
          <router-link
            v-for="l in group.items"
            :key="l.key"
            :to="`/lesson/${l.id}`"
            class="lesson-card"
          >
            <div class="lesson-num">第 {{ l.id }} 讲</div>
            <div class="lesson-title">{{ l.title }}</div>
            <div class="lesson-subtitle">{{ l.subtitle }}</div>
            <div class="lesson-meta">{{ l.total }} 页</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { lessonList, CATEGORY_ORDER } from '@/data';

// ============================================
// 按分类分组
// ============================================
const groupedLessons = computed(() => {
  const groups = {};

  lessonList.forEach(l => {
    const cat = l.category || '未分类';
    if (!groups[cat]) groups[cat] = { category: cat, items: [] };
    groups[cat].items.push(l);
  });

  // 按 CATEGORY_ORDER 排序
  const ordered = [];
  CATEGORY_ORDER.forEach(cat => {
    if (groups[cat]) {
      ordered.push(groups[cat]);
      delete groups[cat];
    }
  });
  // 未在 CATEGORY_ORDER 里的放最后
  Object.values(groups).forEach(g => ordered.push(g));

  return ordered;
});

const totalSlides = computed(() =>
  lessonList.reduce((sum, l) => sum + l.total, 0)
);

const progress = computed(() =>
  Math.round((lessonList.length / 80) * 100)
);
</script>

<style scoped>
/* ============================================
   统计卡片
   ============================================ */
.home-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}
.stat-card {
  padding: 20px 24px;
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  text-align: center;
}
.stat-num {
  font-size: 40px;
  font-weight: 900;
  color: var(--primary);
  line-height: 1.2;
  letter-spacing: -1px;
}
.stat-label {
  font-size: 15px;
  color: var(--text-dim);
  margin-top: 4px;
}

/* ============================================
   分类分组
   ============================================ */
.lesson-group {
  margin-bottom: 40px;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--primary-soft);
}

.group-dot {
  display: inline-block;
  width: 8px;
  height: 24px;
  background: linear-gradient(180deg, var(--primary), var(--accent));
  border-radius: 4px;
}

.group-count {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-dim);
}

/* ============================================
   响应式
   ============================================ */
@media (max-width: 900px) {
  .home-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .group-title {
    font-size: 20px;
  }
}
</style>
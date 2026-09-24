<template>
  <div class="index-page">
    <div class="index-container">
      <h1>C++ 竞赛课程体系</h1>
      <div class="quick-links">
        <router-link to="/glossary" class="quick-link">
          📖 术语表
        </router-link>
      </div>
      <p class="subtitle">从 0 基础到 CSP-J/S · 一周一课 · 从零到竞赛</p>

      <!-- 统计卡片 --> 
      <div class="home-stats">
        <div class="stat-card">
          <div class="stat-num">{{ publishedCount }}</div>
          <div class="stat-label">已发布讲次</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">{{ progress }}%</div>
          <div class="stat-label">课程进度</div>
        </div>
      </div>

      <!-- 按阶段分组 -->
      <div v-for="group in groupedPlan" :key="group.stage" class="lesson-group">
        <h2 class="group-title">
          <span class="group-dot"></span>
          {{ group.stage }}
          <span class="group-count">（{{ group.items.length }} 讲）</span>
        </h2>

        <div class="lesson-grid">
          <template v-for="lesson in group.items" :key="lesson.id">
            <!-- 已生成：可点击 -->
            <router-link
              v-if="isGenerated(lesson.id)"
              :to="`/lesson/${lesson.id}`"
              class="lesson-card"
              :class="{ 'is-current': isCurrent(lesson.id) }"
            >
              <div class="lesson-num">
                <span>第 {{ lesson.id }} 讲</span>
                <span v-if="isCurrent(lesson.id)" class="lesson-badge current">🟡 进行中</span>
                <span v-else class="lesson-badge done">✅ 已发布</span>
              </div>
              <div class="lesson-title">{{ lesson.title }}</div>
              <div class="lesson-subtitle">{{ lesson.subtitle }}</div>
            </router-link>

            <!-- 未生成：不可点击 -->
            <div v-else class="lesson-card is-locked">
              <div class="lesson-num">
                <span>第 {{ lesson.id }} 讲</span>
                <span class="lesson-badge locked">🔒 待生成</span>
              </div>
              <div class="lesson-title">{{ lesson.title }}</div>
              <div class="lesson-subtitle">{{ lesson.subtitle }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { fullPlan, STAGE_ORDER, isGenerated } from '@/data';

const CURRENT_LESSON = '02';   // 当前正在开发的讲次

function isCurrent(id) { return id === CURRENT_LESSON; }

// 按阶段分组
const groupedPlan = computed(() => {
  const groups = {};
  fullPlan.forEach(l => {
    const stage = l.stage || '未分类';
    if (!groups[stage]) groups[stage] = { stage, items: [] };
    groups[stage].items.push(l);
  });

  const ordered = [];
  STAGE_ORDER.forEach(stage => {
    if (groups[stage]) {
      ordered.push(groups[stage]);
      delete groups[stage];
    }
  });
  Object.values(groups).forEach(g => ordered.push(g));

  return ordered;
});

// 统计
const publishedCount = computed(() =>
  fullPlan.filter(l => isGenerated(l.id)).length
);

const progress = computed(() =>
  Math.round((publishedCount.value / fullPlan.length) * 100)
);
</script>

<style scoped>
/* ============================================
   滚动容器
   ============================================ */
.index-page {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 24px 60px;
}

.index-container {
  max-width: 1440px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  font-weight: 900;
  color: var(--text-main);
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: var(--text-dim);
  margin-bottom: 32px;
}

/* ============================================
   统计卡片（2 张）
   ============================================ */
.home-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 40px;
  max-width: 520px;
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
   阶段分组
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
   课程卡片网格
   ============================================ */
.lesson-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.lesson-card {
  display: block;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.lesson-card:not(.is-locked):hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--primary);
}

.lesson-card.is-current {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.lesson-card.is-locked {
  opacity: 0.55;
  cursor: not-allowed;
}

.lesson-num {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 8px;
}

.lesson-badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
}

.lesson-badge.done {
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}

.lesson-badge.current {
  background: rgba(234, 179, 8, 0.16);
  color: #ca8a04;
}

.lesson-badge.locked {
  background: rgba(148, 163, 184, 0.18);
  color: #64748b;
}

.lesson-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 4px;
}

.lesson-subtitle {
  font-size: 14px;
  color: var(--text-sub);
  line-height: 1.5;
}

.quick-links {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.quick-link {
  padding: 8px 16px;
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-main);
  font-weight: 600;
  transition: all 0.15s;
}

.quick-link:hover {
  border-color: var(--primary);
  color: var(--primary);
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

  .index-page {
    padding: 24px 16px 40px;
  }

  h1 {
    font-size: 24px;
  }
}
</style>
<template>
  <div class="glossary-page">
    <div class="glossary-container">
      <div class="page-header">
        <h1>📖 术语表</h1>
        <p class="subtitle">共 {{ stats.total }} 个单词，来自 {{ lessonCount }} 讲</p>
      </div>

      <div class="filters">
        <input
          v-model="query"
          type="text"
          placeholder="搜索单词、中文、词源..."
          class="search-input"
        />
        <div class="filter-chips">
          <button
            :class="{ active: activeCat === '' }"
            @click="activeCat = ''"
            class="chip"
          >
            全部（{{ stats.total }}）
          </button>
          <button
            v-for="cat in GLOSSARY_CATEGORIES"
            :key="cat"
            :class="{ active: activeCat === cat }"
            @click="activeCat = cat"
            class="chip"
          >
            {{ cat }}（{{ stats.byCategory[cat] || 0 }}）
          </button>
        </div>
      </div>

      <div class="word-grid">
        <div v-for="w in filtered" :key="w.word" class="word-card">
          <div class="word-top">
            <code class="word">{{ w.word }}</code>
            <span v-if="w.pron" class="pron">{{ w.pron }}</span>
          </div>
          <div class="word-cn">{{ w.cn }}</div>
          <div v-if="w.origin" class="word-origin">{{ w.origin }}</div>
          <div class="word-meta">
            <span class="category-tag">{{ w.category }}</span>
            <router-link :to="`/lesson/${w.firstLesson}`" class="lesson-link">
              第 {{ w.firstLesson }} 讲
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="filtered.length === 0" class="empty">
        没有找到匹配的词条
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  GLOSSARY_CATEGORIES,
  glossaryStats,
  searchWords,
  wordsByLesson
} from '@/data/glossary.js';

const query = ref('');
const activeCat = ref('');
const stats = glossaryStats;
const lessonCount = computed(() => Object.keys(wordsByLesson).length);

const filtered = computed(() => {
  let list = searchWords(query.value);
  if (activeCat.value) {
    list = list.filter(w => w.category === activeCat.value);
  }
  return list;
});
</script>

<style scoped>
.glossary-page {
  height: 100%;
  overflow-y: auto;
  padding: 40px 24px 60px;
}

.glossary-container { max-width: 1200px; margin: 0 auto; }

.page-header { margin-bottom: 24px; }
.page-header h1 { font-size: 32px; font-weight: 900; color: var(--text-main); }
.subtitle { font-size: 16px; color: var(--text-dim); margin-top: 6px; }

.filters { margin-bottom: 24px; }

.search-input {
  width: 100%;
  max-width: 480px;
  padding: 12px 16px;
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  font-size: 15px;
  margin-bottom: 16px;
  font-family: inherit;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 6px 14px;
  border: 1px solid var(--card-border);
  border-radius: 999px;
  background: var(--bg-card);
  font-size: 14px;
  color: var(--text-sub);
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.chip:hover { border-color: var(--primary); color: var(--primary); }
.chip.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.word-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

.word-card {
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  transition: transform 0.2s, border-color 0.2s;
}

.word-card:hover { transform: translateY(-2px); border-color: var(--primary); }

.word-top { display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px; }
.word { font-family: var(--font-code); font-size: 20px; font-weight: 900; color: var(--primary); }
.pron { font-size: 12px; color: var(--text-dim); font-style: italic; }
.word-cn { font-size: 15px; font-weight: 700; color: var(--text-main); margin-bottom: 4px; }
.word-origin { font-size: 13px; color: var(--text-sub); margin-bottom: 10px; line-height: 1.5; }
.word-meta { display: flex; justify-content: space-between; align-items: center; font-size: 12px; }
.category-tag {
  padding: 2px 8px;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 999px;
}
.lesson-link { color: var(--text-dim); text-decoration: none; }
.lesson-link:hover { color: var(--primary); text-decoration: underline; }

.empty { padding: 60px 20px; text-align: center; color: var(--text-dim); }
</style>
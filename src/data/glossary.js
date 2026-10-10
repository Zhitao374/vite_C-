/**
 * glossary.js · 全局术语聚合
 *
 * 数据源：glossary-data.js（自动生成）
 * 不再依赖 lessons 完整对象 —— 支持 lazy 加载
 */

import { glossaryWords } from './glossary-data.js';

export const GLOSSARY_CATEGORIES = [
  '关键字', '类型', '函数', '运算符', '语句', '概念'
];

// ============================================
// 聚合（按 word 去重，记录多讲出现）
// ============================================
export const allWords = (() => {
  const words = [];
  const seen = new Map();

  // 按 lessonId 排序，保证"第一讲"是最早出现的
  const sorted = [...glossaryWords].sort((a, b) =>
    a.lessonId.localeCompare(b.lessonId)
  );

  sorted.forEach(w => {
    const key = (w.word || '').toLowerCase();
    if (!key) return;

    if (!seen.has(key)) {
      seen.set(key, w);
      words.push({
        ...w,
        word: key,
        firstLesson: w.lessonId,
        allLessons: [w.lessonId]
      });
    } else {
      const existing = words.find(x => x.word === key);
      if (existing && !existing.allLessons.includes(w.lessonId)) {
        existing.allLessons.push(w.lessonId);
      }
    }
  });

  return words;
})();

// ============================================
// 按分类分组
// ============================================
export const wordsByCategory = (() => {
  const groups = {};
  GLOSSARY_CATEGORIES.forEach(c => groups[c] = []);
  allWords.forEach(w => {
    const c = w.category || '概念';
    if (!groups[c]) groups[c] = [];
    groups[c].push(w);
  });
  return groups;
})();

// ============================================
// 按讲次分组
// ============================================
export const wordsByLesson = (() => {
  const groups = {};
  allWords.forEach(w => {
    const id = w.firstLesson;
    if (!groups[id]) groups[id] = [];
    groups[id].push(w);
  });
  return groups;
})();

// ============================================
// 搜索
// ============================================
export function searchWords(query) {
  if (!query || !query.trim()) return allWords;
  const q = query.trim().toLowerCase();
  return allWords.filter(w =>
    w.word.includes(q) ||
    (w.cn && w.cn.includes(q)) ||
    (w.origin && w.origin.toLowerCase().includes(q))
  );
}

// ============================================
// 统计
// ============================================
export const glossaryStats = {
  total: allWords.length,
  byCategory: Object.fromEntries(
    GLOSSARY_CATEGORIES.map(c => [c, (wordsByCategory[c] || []).length])
  ),
  multiLessonCount: allWords.filter(w => w.allLessons.length > 1).length
};
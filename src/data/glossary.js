/**
 * glossary.js · 全局术语聚合
 * 数据源：每讲的 glossary 页（type: 'glossary'）里的 data.words
 */

import { lessons } from './index.js';

export const GLOSSARY_CATEGORIES = [
  '关键字', '类型', '函数', '运算符', '语句', '概念'
];

// 从 lesson.slides 里提取 glossary 页
function extractFromLesson(lesson) {
  if (!Array.isArray(lesson.slides)) return [];
  const page = lesson.slides.find(s => s.type === 'glossary');
  return page?.data?.words || [];
}

// 聚合所有词条（按 word 去重）
export const allWords = (() => {
  const words = [];
  const seen = new Map();

  Object.keys(lessons).sort().forEach(key => {
    const lessonId = key.replace('lesson-', '');
    const list = extractFromLesson(lessons[key]);

    list.forEach(item => {
      const w = (item.word || '').toLowerCase();
      if (!w) return;

      if (!seen.has(w)) {
        seen.set(w, lessonId);
        words.push({
          ...item,
          word: w,
          firstLesson: lessonId,
          allLessons: [lessonId]
        });
      } else {
        const existing = words.find(x => x.word === w);
        if (existing && !existing.allLessons.includes(lessonId)) {
          existing.allLessons.push(lessonId);
        }
      }
    });
  });

  return words;
})();

// 按分类分组
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

// 按讲次分组
export const wordsByLesson = (() => {
  const groups = {};
  allWords.forEach(w => {
    const id = w.firstLesson;
    if (!groups[id]) groups[id] = [];
    groups[id].push(w);
  });
  return groups;
})();

// 搜索
export function searchWords(query) {
  if (!query || !query.trim()) return allWords;
  const q = query.trim().toLowerCase();
  return allWords.filter(w =>
    w.word.includes(q) ||
    (w.cn && w.cn.includes(q)) ||
    (w.origin && w.origin.toLowerCase().includes(q))
  );
}

// 统计
export const glossaryStats = {
  total: allWords.length,
  byCategory: Object.fromEntries(
    GLOSSARY_CATEGORIES.map(c => [c, (wordsByCategory[c] || []).length])
  )
};
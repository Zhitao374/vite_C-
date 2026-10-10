/**
 * data/index.js · 数据入口
 *
 * 数据流：
 *   lesson-XX.js  ──(generate-lesson-index.js)──▶  lesson-index.js（元数据）
 *   lesson-XX.js  ──(generate-glossary-data.js)──▶  glossary-data.js（术语）
 *   lesson-XX.js  ──(lazy import)──▶  按需加载详情
 *
 * 注意：
 *   修改讲次的 title / subtitle / total / category 后，
 *   运行 `npm run index:lessons` 重新生成 lesson-index.js
 */

import { lessonIndex } from './lesson-index.js';
import coursePlan, { PREVIEW_LESSON, STAGE_ORDER } from './course-plan.js';

// ============================================
// 懒加载器（Vite 会为每讲生成独立 chunk）
// ============================================
const lessonLoaders = import.meta.glob('./lesson-[0-9]*.js');

const detailCache = new Map();   // 已加载的讲次
const pendingLoads = new Map();  // 正在加载的 promise

/**
 * 异步加载某讲数据（带缓存 + 并发去重）
 * @param {string} key - 'lesson-01' 或 '01'
 * @returns {Promise<object|null>}
 */
export async function loadLesson(key) {
  if (!key) return null;
  const fullKey = key.startsWith('lesson-') ? key : `lesson-${key}`;

  // 命中缓存
  if (detailCache.has(fullKey)) return detailCache.get(fullKey);

  // 命中正在加载 —— 复用 promise
  if (pendingLoads.has(fullKey)) return pendingLoads.get(fullKey);

  const loader = lessonLoaders[`./${fullKey}.js`];
  if (!loader) return null;

  const promise = loader().then(mod => {
    detailCache.set(fullKey, mod.default);
    pendingLoads.delete(fullKey);
    return mod.default;
  }).catch(err => {
    console.error(`[data] 加载 ${fullKey} 失败：`, err);
    pendingLoads.delete(fullKey);
    return null;
  });

  pendingLoads.set(fullKey, promise);
  return promise;
}

/**
 * 同步获取已缓存的讲次（不触发加载）
 * @returns {object|null}
 */
export function getCachedLesson(key) {
  if (!key) return null;
  const fullKey = key.startsWith('lesson-') ? key : `lesson-${key}`;
  return detailCache.get(fullKey) || null;
}

// ============================================
// 元数据（同步可用）
// ============================================
export const lessons = lessonIndex;

export const lessonList = Object.keys(lessonIndex)
  .sort()
  .map(id => ({
    key:      `lesson-${id}`,
    id,
    title:    lessonIndex[id].title,
    subtitle: lessonIndex[id].subtitle,
    total:    lessonIndex[id].total,
    category: lessonIndex[id].category
  }));

// ============================================
// 兼容 API（同步 —— 仅返回已缓存的）
// ============================================
export function getLesson(key) {
  return getCachedLesson(key);
}

export function getSlide(lessonKey, slideId) {
  const lesson = getCachedLesson(lessonKey);
  if (!lesson) return null;
  return lesson.slides.find(s => s.id === slideId) || null;
}

// ============================================
// 分类配置
// ============================================
export const CATEGORY_ORDER = [
  '语法与基础算法',
  '数据结构与搜索',
  'DP 与图论进阶',
  '数学与字符串',
  '竞赛冲刺'
];

// ============================================
// 课程蓝图
// ============================================
export { coursePlan, PREVIEW_LESSON, STAGE_ORDER };
export { lessonIndex };

export const fullPlan = [PREVIEW_LESSON, ...coursePlan];

export function isGenerated(id) {
  return !!lessonIndex[id];
}

// ============================================
// dev 模式数据校验
// ============================================
if (import.meta.env.DEV) {
  import('@/config/schemas').then(({ validateLesson }) => {
    let errorCount = 0;
    const warn = (msg) => { console.warn(msg); errorCount++; };

    // 用元数据校验（详情按需加载时再校验）
    Object.entries(lessonIndex).forEach(([id, meta]) => {
      if (!meta.title) warn(`[schema] lesson-${id} 缺少 title`);
      if (!meta.total) warn(`[schema] lesson-${id} 缺少 total`);
    });

    if (errorCount > 0) {
      console.group(`⚠️  数据校验发现 ${errorCount} 个问题`);
      console.groupEnd();
    } else {
      console.log(`✅ 元数据校验通过（${Object.keys(lessonIndex).length} 讲）`);
    }
  });
}

console.log(`✅ 元数据已加载：${Object.keys(lessonIndex).length} 讲`);
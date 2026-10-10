/**
 * data/index.js · 数据入口
 *
 * 数据流：
 *   lesson-XX.js  ──(generate-lesson-index.js)──▶  lesson-index.js（元数据索引）
 *   lesson-XX.js  ──(import.meta.glob eager)──▶  lessons（完整数据）
 *
 *   lessonList 从 lessonIndex 派生（单一数据源）
 *
 * 注意：
 *   修改讲次的 title / subtitle / total / category 后，
 *   运行 `npm run index:lessons` 重新生成 lesson-index.js
 */

import { lessonIndex } from './lesson-index.js';
import coursePlan, { PREVIEW_LESSON, STAGE_ORDER } from './course-plan.js';

// ============================================
// 完整讲次数据（eager 加载）
// ============================================
// ⚠️ 用 [0-9]* 而不是 *，避免把 lesson-index.js 也匹配进来
const modules = import.meta.glob('./lesson-[0-9]*.js', { eager: true });

export const lessons = {};

Object.entries(modules).forEach(([path, mod]) => {
  // 双保险：正则不匹配就跳过
  const m = path.match(/\.\/(lesson-\d+)\.js$/);
  if (!m) return;

  const key = m[1];
  lessons[key] = mod.default;
});

// ============================================
// 目录列表（从 lessonIndex 派生，单一数据源）
// ============================================
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
// 工具函数
// ============================================
export function getLesson(key) {
  if (!key) return null;
  const fullKey = key.startsWith('lesson-') ? key : `lesson-${key}`;
  return lessons[fullKey] || null;
}

export function getSlide(lessonKey, slideId) {
  const lesson = getLesson(lessonKey);
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
// 课程蓝图（含未生成讲次）
// ============================================
export { coursePlan, PREVIEW_LESSON, STAGE_ORDER };
export { lessonIndex };

export const fullPlan = [PREVIEW_LESSON, ...coursePlan];

export function isGenerated(id) {
  return !!lessons[`lesson-${id}`];
}

// ============================================
// 加载日志
// ============================================
console.log(
  `✅ 已加载 ${Object.keys(lessons).length} 讲：`,
  Object.keys(lessons)
);

// ============================================
// 【新增】dev 模式数据校验
// ============================================
if (import.meta.env.DEV) {
  import('@/config/schemas').then(({ validateLesson }) => {
    let errorCount = 0;
    const warn = (msg) => {
      console.warn(msg);
      errorCount++;
    };

    Object.entries(lessons).forEach(([key, lesson]) => {
      validateLesson(key, lesson, warn);
    });

    if (errorCount > 0) {
      console.group(`⚠️  数据校验发现 ${errorCount} 个问题`);
      console.info('修复建议：见 scripts/check-lessons.js');
      console.groupEnd();
    } else {
      console.log('✅ 数据校验全部通过');
    }
  });
}
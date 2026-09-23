/**
 * data/index.js · 自动导入所有讲次
 */
import coursePlan, { PREVIEW_LESSON, STAGE_ORDER } from './course-plan.js';

const modules = import.meta.glob('./lesson-*.js', { eager: true });

export const lessons = {};

Object.entries(modules).forEach(([path, mod]) => {
  const key = path.match(/\.\/(lesson-\d+)\.js$/)[1];
  lessons[key] = mod.default;
});

// ============================================
// 自动生成目录列表
// ============================================
export const lessonList = Object.keys(lessons)
  .sort()
  .map(key => {
    const lesson = lessons[key];
    const id = key.replace('lesson-', '');
    return {
      key,
      id,
      title: lesson.title || '',
      subtitle: lesson.subtitle || '',
      total: lesson.total || 0,
      category: lesson.category || '未分类'
    };
  });

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
// 分类配置（用于分组显示）
// ============================================

export const CATEGORY_ORDER = [
  '语法与基础算法',
  '数据结构与搜索',
  'DP 与图论进阶',
  '数学与字符串',
  '竞赛冲刺'
];

console.log(
  `✅ 已加载 ${Object.keys(lessons).length} 讲：`,
  Object.keys(lessons)
);

// ============================================
// 课程蓝图（含未生成讲次）
// ============================================

export { coursePlan, PREVIEW_LESSON, STAGE_ORDER };

// 合并后的完整列表（含预览课）
export const fullPlan = [PREVIEW_LESSON, ...coursePlan];

// 判断某讲是否已生成
export function isGenerated(id) {
  return !!lessons[`lesson-${id}`];
}
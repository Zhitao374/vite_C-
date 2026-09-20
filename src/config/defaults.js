/**
 * 通用默认值
 */

// 关卡地图默认 levels
export const DEFAULT_LEVELS = [
  { icon: '🎯', label: '题干' },
  { icon: '💡', label: '提示' },
  { icon: '✅', label: '答案' }
];

// 代码块默认标题
export const CODE_TITLES = {
  answer: '✅ 参考代码',
  input: '📥 输入代码',
  output: '📤 输出代码'
};

// 章节标签映射
export const TYPE_LABELS = {
  cover: '封面',
  transition: '过渡页',
  ending: '结束页',
  'level-map': '实战演练',
  dialog: '概念理解',
  'code-split': '代码拆解',
  flow: '流程演示',
  compare: '易错点',
  timeline: '学习地图',
  grid: '知识总览',
  split: '知识讲解',
  quote: '今日总结',
  radial: '下节预告',
  'big-number': '数据展示'
};

// 章节标签格式
export function formatChapterTag(lessonNum, label) {
  return `第 ${lessonNum} 讲 · ${label}`;
}
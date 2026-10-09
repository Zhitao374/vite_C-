/**
 * useSlideTheme.js · 根据 slide.type 动态设置页面背景
 */
import { computed } from 'vue';

// slide.type → 氛围色变量名
const TYPE_THEME_MAP = {
  // 封面 / 过渡 / 结束
  'cover':      '--bg-cover',
  'transition': '--bg-cover',
  'ending':     '--bg-cover',

  // 概念讲解
  'dialog':     '--bg-concept',
  'grid':       '--bg-concept',
  'timeline':   '--bg-concept',

  // 代码演示
  'code-split': '--bg-code',
  'evolution':  '--bg-code',

  // 实战练习
  'level-map':  '--bg-practice',

  // 课堂小测
  'quiz':       '--bg-quiz',

  // 收束总结
  'quote':      '--bg-summary',
  'radial':     '--bg-summary',
  'glossary':   '--bg-summary',

  // 分析对比
  'compare':    '--bg-analysis',
  'flow':       '--bg-analysis',
  'split':      '--bg-analysis',
};

export function useSlideTheme(slide) {
  const bgVar = computed(() => {
    const type = slide.value?.type;
    return TYPE_THEME_MAP[type] || '--bg-default';
  });

  return { bgVar };
}
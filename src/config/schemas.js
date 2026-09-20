/**
 * 数据 schema 校验（dev 模式下使用）
 */
const RULES = {
  cover:       { required: [] },
  transition:  { required: [] },
  ending:      { required: [] },
  grid:        { required: ['cards'], checks: [
    (d) => d.cards.length >= 2 || 'cards 至少 2 张',
    (d) => d.cards.length <= 8 || 'cards 建议 2-8 张'
  ]},
  split:       { required: [] },
  'big-number':{ required: ['number'] },
  compare:     { required: ['groups'] },
  flow:        { required: [], checks: [
    (d) => d.nodes || d.rows || '需要 nodes 或 rows'
  ]},
  timeline:    { required: ['items'] },
  dialog:      { required: ['lines'], checks: [
    (d) => d.lines.length >= 4 || '对话建议 4 轮以上'
  ]},
  'code-split':{ required: ['code'] },
  'level-map': { required: ['question', 'hints', 'answer'], checks: [
    (d) => d.hints.length <= 6 || '提示建议不超过 6 条'
  ]},
  quote:       { required: ['text'] },
  radial:      { required: ['center', 'items'], checks: [
    (d) => d.items.length >= 2 && d.items.length <= 6 || '分支建议 2-6 个'
  ]}
};

export function validateSlide(slide, warn = console.warn) {
  const rule = RULES[slide.type];
  if (!rule) {
    warn(`[schema] 未知的 type: ${slide.type}`);
    return;
  }

  const d = slide.data || {};
  rule.required?.forEach(k => {
    if (d[k] == null) warn(`[schema] slide-${slide.id} 缺少 ${k}`);
  });

  rule.checks?.forEach(check => {
    const result = check(d);
    if (result !== true) warn(`[schema] slide-${slide.id}: ${result}`);
  });
}

export function validateLesson(lessonKey, lesson, warn = console.warn) {
  if (!lesson.title) warn(`[schema] ${lessonKey} 缺少 title`);
  if (!lesson.total) warn(`[schema] ${lessonKey} 缺少 total`);
  if (lesson.total !== lesson.slides?.length) {
    warn(`[schema] ${lessonKey}: total=${lesson.total} 与实际 ${lesson.slides?.length} 不符`);
  }
  lesson.slides?.forEach(s => validateSlide(s, warn));
}
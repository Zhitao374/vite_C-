#!/usr/bin/env node
/**
 * generate-index.js · 生成"课程设计总表"
 *
 * 输出：docs/COURSE-INDEX.md
 * 内容：
 *   ① 全局总览：57 讲蓝图 + 状态
 *   ② 已完成讲次：详细到每页
 *   ③ 未完成讲次：按蓝图展示
 *   ④ 课程规则速查（章节、章节 tag、组件分布）
 *
 * 用法：
 *   node scripts/generate-index.js              # 生成到 docs/COURSE-INDEX.md
 *   node scripts/generate-index.js --stdout     # 打印到控制台
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');
const DOCS_DIR = path.join(ROOT, 'docs');
const OUT_FILE = path.join(DOCS_DIR, 'COURSE-INDEX.md');

// ============================================
// 加载讲次数据
// ============================================
async function loadLessons() {
  const files = fs.readdirSync(DATA_DIR)
    .filter(f => /^lesson-\d+\.js$/.test(f))
    .sort();

  const lessons = {};
  for (const file of files) {
    const url = pathToFileURL(path.join(DATA_DIR, file)).href;
    const mod = await import(url);
    const id = file.replace('lesson-', '').replace('.js', '');
    lessons[id] = { id, data: mod.default };
  }
  return lessons;
}

async function loadCoursePlan() {
  const url = pathToFileURL(path.join(DATA_DIR, 'course-plan.js')).href;
  const mod = await import(url);
  return {
    plan: mod.default || [],
    preview: mod.PREVIEW_LESSON,
    stageOrder: mod.STAGE_ORDER
  };
}

// ============================================
// 类型 → 标记
// ============================================
const TYPE_ICON = {
  'cover': '🖼️',
  'grid': '📊',
  'dialog': '💬',
  'code-split': '💻',
  'compare': '⚖️',
  'flow': '🔀',
  'timeline': '📍',
  'split': '⬜',
  'big-number': '🔢',
  'level-map': '🎯',
  'quote': '💬',
  'radial': '🎯',
  'transition': '↘️',
  'ending': '🏁',
  'quiz': '❓',
  'evolution': '📈',
  'glossary': '📖'
};

const ANIM_ICON = {
  'sort-animation': '🎬排序',
  'stack-animation': '🎬栈',
  'queue-animation': '🎬队列',
  'linked-list-animation': '🎬链表',
  'tree-animation': '🎬树',
  'graph-animation': '🎬图',
  'hanoi-animation': '🎬汉诺塔',
  'binary-search-animation': '🎬二分',
  'dp-table-animation': '🎬DP',
  'function-call-animation': '🎬调用'
};

function typeTag(type) {
  if (ANIM_ICON[type]) return ANIM_ICON[type];
  if (type === 'glossary') return '📖';
  if (type === 'quiz') return '❓';
  if (type === 'level-map') return '🎯';
  if (type === 'evolution') return '📈';
  return TYPE_ICON[type] || '';
}

// ============================================
// 从 slide 提取"关键内容"
// ============================================
function extractKeyContent(slide) {
  const d = slide.data || {};

  // 动画
  if (slide.type.endsWith('-animation')) {
    return `${d.steps?.length || 0} 步`;
  }

  // evolution
  if (slide.type === 'evolution') {
    return `${d.steps?.length || 0} 步`;
  }

  // level-map
  if (slide.type === 'level-map') {
    const hintN = d.hints?.length || 0;
    const answer = d.answer?.codeFile ? '有答案' : '';
    return `提示 ×${hintN} ${answer}`;
  }

  // glossary
  if (slide.type === 'glossary') {
    return `${d.words?.length || 0} 词条`;
  }

  // quiz
  if (slide.type === 'quiz') {
    return `${d.questions?.length || 0} 题`;
  }

  // cover
  if (slide.type === 'cover') {
    return d.accentWord ? `高亮：${d.accentWord}` : '';
  }

  // grid — 提取卡片标题
  if (slide.type === 'grid' && d.cards?.length) {
    return d.cards.map(c => c.title).filter(Boolean).slice(0, 4).join(' / ') +
      (d.cards.length > 4 ? ` …+${d.cards.length - 4}` : '');
  }

  // timeline
  if (slide.type === 'timeline' && d.items?.length) {
    return d.items.map(i => i.title).filter(Boolean).slice(0, 3).join(' / ') +
      (d.items.length > 3 ? ` …+${d.items.length - 3}` : '');
  }

  // dialog
  if (slide.type === 'dialog' && d.lines?.length) {
    return `${d.lines.length} 轮对话`;
  }

  // compare
  if (slide.type === 'compare' && d.groups?.length) {
    return `${d.groups.length} 组对比`;
  }

  // code-split
  if (slide.type === 'code-split') {
    const f = d.codeFile?.split('/').pop() || '';
    return f ? `📄 ${f}` : '';
  }

  // flow
  if (slide.type === 'flow') {
    if (d.rows) return `${d.rows.flat().length} 节点`;
    if (d.nodes) return `${d.nodes.length} 节点`;
  }

  // radial
  if (slide.type === 'radial') {
    return d.center ? `中心：${d.center}` : '';
  }

  // quote
  if (slide.type === 'quote') {
    return `${d.points?.length || 0} 要点`;
  }

  return '';
}

// ============================================
// 提取该讲的伏笔与回收
// ============================================
function extractForeshadow(lesson) {
  const bury = [];   // 埋
  const recover = []; // 收
  const seen = new Set();

  for (const slide of lesson.slides || []) {
    const texts = [];

    if (slide.title) texts.push(slide.title);
    if (slide.subtitle) texts.push(slide.subtitle);

    const d = slide.data || {};
    if (d.note) texts.push(d.note);
    if (d.extra?.desc) texts.push(d.extra.desc);
    if (d.extra?.title) texts.push(d.extra.title);
    if (d.lines) d.lines.forEach(l => texts.push(l.text || ''));
    if (d.cards) d.cards.forEach(c => texts.push(c.desc || ''));

    for (const text of texts) {
      // 🔮 **伏笔**：xxx → 第 N 讲
      const buryRegex = /🔮\s*\*{0,2}伏笔\*{0,2}[\s：:]*([^<。]{0,60}?)第\s*(\d+)\s*讲/g;
      let m;
      while ((m = buryRegex.exec(text)) !== null) {
        const key = `b-${slide.id}-${m[2]}`;
        if (!seen.has(key)) {
          seen.add(key);
          bury.push({ slideId: slide.id, content: m[1].trim(), target: m[2] });
        }
      }
      // 回收
      const recoverRegex = /🔮\s*\*{0,2}回收伏笔\*{0,2}[\s：:]*([^<。]{0,60}?)(第\s*\d+\s*讲)?/g;
      while ((m = recoverRegex.exec(text)) !== null) {
        const key = `r-${slide.id}`;
        if (!seen.has(key)) {
          seen.add(key);
          recover.push({ slideId: slide.id, content: m[1].trim(), source: m[2] });
        }
      }
    }
  }

  return { bury, recover };
}

// ============================================
// 渲染总览表
// ============================================
function renderOverview(plan, lessons, preview) {
  const lines = [];
  lines.push('## 一、课程总览');
  lines.push('');
  lines.push('| 讲次 | 阶段 | 标题 | 副标题 | 状态 | 页数 | 动画 | 术语 | 练习 |');
  lines.push('|---|---|---|---|---|---|---|---|---|');

  // 预备课
  if (preview) {
    const p = lessons[preview.id];
    const status = p ? '✅ 已完成' : '⏳ 待生成';
    const pageN = p?.data?.slides?.length || 0;
    const animN = p?.data?.slides?.filter(s => s.type.endsWith('-animation')).length || 0;
    const glosN = p?.data?.slides?.find(s => s.type === 'glossary')?.data?.words?.length || 0;
    const pracN = p?.data?.slides?.filter(s => s.type === 'level-map').length || 0;
    lines.push(`| ${preview.id} | 预备 | ${preview.title} | ${preview.subtitle || ''} | ${status} | ${pageN || '—'} | ${animN || '—'} | ${glosN || '—'} | ${pracN || '—'} |`);
  }

  // 主计划
  for (const item of plan) {
    const l = lessons[item.id];
    const status = l ? '✅ 已完成' : '⏳ 待生成';
    const pageN = l?.data?.slides?.length || 0;
    const animN = l?.data?.slides?.filter(s => s.type.endsWith('-animation')).length || 0;
    const glosN = l?.data?.slides?.find(s => s.type === 'glossary')?.data?.words?.length || 0;
    const pracN = l?.data?.slides?.filter(s => s.type === 'level-map').length || 0;
    lines.push(`| ${item.id} | ${item.stage} | ${item.title} | ${item.subtitle || ''} | ${status} | ${pageN || '—'} | ${animN || '—'} | ${glosN || '—'} | ${pracN || '—'} |`);
  }

  lines.push('');
  lines.push('**图例**：✅ 已完成 · ⏳ 待生成');
  lines.push('');
  return lines.join('\n');
}

// ============================================
// 渲染单讲详情（已完成）
// ============================================
function renderLessonDetail({ id, data }) {
  const lines = [];
  const slides = data.slides || [];
  const cleanTitle = (data.title || '').replace(/^第\s*\d+\s*讲\s*/, '');

  lines.push(`### 第 ${id} 讲 · ${cleanTitle}`);
  lines.push('');
  lines.push(`> **副标题**：${data.subtitle || '—'}`);
  lines.push(`> **分类**：${data.category || '—'}　**页数**：${slides.length}`);
  lines.push('');

  // 页表
  lines.push('| # | 类型 | 标题 | 关键内容 |');
  lines.push('|---|---|---|---|');
  for (const s of slides) {
    const tag = typeTag(s.type);
    const title = (s.title || '').replace(/\|/g, '\\|');
    const key = extractKeyContent(s).replace(/\|/g, '\\|');
    lines.push(`| ${s.id} | ${tag} \`${s.type}\` | ${title} | ${key} |`);
  }
  lines.push('');

  // 伏笔
  const { bury, recover } = extractForeshadow(data);
  if (bury.length) {
    lines.push('**本讲埋伏笔**：');
    lines.push('');
    for (const f of bury) {
      lines.push(`- slide-${f.slideId}：${f.content}（→第 ${f.target} 讲）`);
    }
    lines.push('');
  }
  if (recover.length) {
    lines.push('**本讲回收**：');
    lines.push('');
    for (const f of recover) {
      lines.push(`- slide-${f.slideId}：${f.content}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

// ============================================
// 渲染单讲蓝图（未完成）
// ============================================
function renderLessonBlueprint(item) {
  const lines = [];
  lines.push(`### 第 ${item.id} 讲 · ${item.title}（待生成）`);
  lines.push('');
  lines.push(`> **阶段**：${item.stage}`);
  lines.push(`> **副标题**：${item.subtitle || '—'}`);
  lines.push('');

  if (item.core) lines.push(`- **核心概念**：${item.core}`);
  if (item.points) lines.push(`- **子知识点**：${item.points.join(' · ')}`);
  if (item.difficulty) lines.push(`- **难度**：${item.difficulty}`);
  if (item.anim) lines.push(`- **动画选型**：${item.anim}`);
  if (item.fore) lines.push(`- **伏笔**：${item.fore}`);
  lines.push('');

  return lines.join('\n');
}

// ============================================
// 生成 Markdown
// ============================================
function renderMarkdown(plan, lessons, preview, stageOrder) {
  const now = new Date().toISOString().slice(0, 10);
  const lines = [];

  // ── 文档头
  lines.push('# 课程详细设计表（COURSE-INDEX.md）');
  lines.push('');
  lines.push('> **用途**：**上下文缺失时，读这一份即可恢复对整个课程的认知**。');
  lines.push('> **自动生成**：`node scripts/generate-index.js`（勿手工修改）');
  lines.push(`> **最后生成**：${now}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // ── 总览
  lines.push(renderOverview(plan, lessons, preview));
  lines.push('---');
  lines.push('');

  // ── 按阶段分组
  lines.push('## 二、按阶段逐讲');
  lines.push('');

  const stages = stageOrder || ['编程基础', '算法入门', '数据结构', '竞赛进阶', '冲刺实战'];
  const grouped = {};
  if (preview) {
    grouped['预备'] = [preview];
  }
  for (const item of plan) {
    if (!grouped[item.stage]) grouped[item.stage] = [];
    grouped[item.stage].push(item);
  }

  for (const stage of ['预备', ...stages]) {
    if (!grouped[stage]) continue;

    lines.push(`## ${stage}`);
    lines.push('');

    for (const item of grouped[stage]) {
      const l = lessons[item.id];
      if (l) {
        lines.push(renderLessonDetail(l));
      } else {
        lines.push(renderLessonBlueprint(item));
      }
      lines.push('---');
      lines.push('');
    }
  }

  // ── 页尾
  lines.push('**COURSE-INDEX.md 结束。**');
  lines.push('');
  lines.push('> 数据源：`src/data/course-plan.js`（蓝图）+ `src/data/lesson-XX.js`（详情）');
  lines.push('> 生成命令：`npm run index`');
  lines.push('');

  return lines.join('\n');
}

// ============================================
// 主入口
// ============================================
async function main() {
  const stdout = process.argv.includes('--stdout');

  console.log('📖 加载讲次数据…');
  const lessons = await loadLessons();
  console.log(`   ✅ 已生成讲次：${Object.keys(lessons).length} 讲`);

  console.log('📋 加载课程蓝图…');
  const { plan, preview, stageOrder } = await loadCoursePlan();
  console.log(`   ✅ 蓝图讲次：${plan.length} 讲`);

  console.log('🔨 生成 Markdown…');
  const md = renderMarkdown(plan, lessons, preview, stageOrder);

  if (stdout) {
    console.log(md);
    return;
  }

  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }
  fs.writeFileSync(OUT_FILE, md, 'utf-8');

  const lineCount = md.split('\n').length;
  const sizeKB = (md.length / 1024).toFixed(1);
  console.log(`✅ 已生成：${path.relative(ROOT, OUT_FILE)}`);
  console.log(`   ${lineCount} 行，约 ${sizeKB} KB`);
}

main().catch(err => {
  console.error('❌ 生成失败：', err);
  process.exit(1);
});
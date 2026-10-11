#!/usr/bin/env node
/**
 * audit-extra.js · 审计所有 extra 卡片
 *
 * 按内容特征分类：
 *   · STORY  疑似"讲故事"——建议留
 *   · TIP    疑似"技巧/方法"——建议删（搬正文）
 *   · INFO   疑似"信息/介绍"——建议删（搬正文或 glossary）
 *   · OTHER  待定——人工判断
 *
 * 用法：
 *   node scripts/audit-extra.js              # 全部讲次
 *   node scripts/audit-extra.js lesson-01    # 单讲
 *   node scripts/audit-extra.js --csv        # 导出 CSV
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');

const args = process.argv.slice(2);
const only = args.find(a => /^lesson-\d+$/.test(a));
const asCsv = args.includes('--csv');

// ============================================
// 分类规则（关键词 + 结构）
// ============================================
const STORY_KEYWORDS = [
  '来历', '由来', '起源', '名字', '命名', '历史',
  '发明', '设计者', '创造', '最初', '第一次',
  '年', '世纪', '诞生', '故事'
];

const STORY_PEOPLE = [
  '阿达', 'Ada', '洛芙莱斯', '图灵', 'Turing',
  '冯·诺依曼', '冯诺依曼', '拜伦', '拜伦',
  '里奇', '克尼汉', '巴克斯', '斯特劳斯特鲁普',
  '斐波那契', '帕斯卡', '杨辉', '贾宪'
];

const TIP_KEYWORDS = [
  '技巧', '铁律', '注意', '建议', '方法', '口决', '口诀',
  '三条', '四大', '规则', '规范', '步骤', '别忘', '千万别'
];

const INFO_KEYWORDS = [
  '平台', '工具', '介绍', '关于', '含义', '缩写',
  '简称', '全称', '概念', '定义'
];

function classify(title, desc) {
  const text = (title + ' ' + desc).toLowerCase();

  // 排除 TIP（技巧优先判断）
  if (TIP_KEYWORDS.some(k => text.includes(k))) {
    return 'TIP';
  }

  // 人名 → STORY
  if (STORY_PEOPLE.some(k => text.includes(k.toLowerCase()))) {
    return 'STORY';
  }

  // 有"故事"关键词 + 有年份 → STORY
  const hasStoryKw = STORY_KEYWORDS.some(k => text.includes(k));
  const hasYear = /\d{4}\s*年/.test(text);
  if (hasStoryKw && hasYear) {
    return 'STORY';
  }

  // INFO
  if (INFO_KEYWORDS.some(k => text.includes(k))) {
    return 'INFO';
  }

  // 有故事关键词但没年份 → OTHER（可能留可能删）
  if (hasStoryKw) {
    return 'OTHER';
  }

  return 'OTHER';
}

// ============================================
// 提取每页的 extra
// ============================================
async function scanLesson(file) {
  const url = pathToFileURL(path.join(DATA_DIR, file)).href;
  const mod = await import(url);
  const lesson = mod.default;
  const lessonId = file.replace('lesson-', '').replace('.js', '');

  const items = [];
  (lesson.slides || []).forEach(slide => {
    const extra = slide.data?.extra;
    if (!extra || !extra.title) return;

    const cat = classify(extra.title, extra.desc || '');
    const title = extra.title.replace(/^[📖💡🔗⚠️✅❌]\s*/, '').trim();

    items.push({
      lessonId,
      slideId: slide.id,
      slideType: slide.type,
      category: cat,
      title: extra.title,
      descPreview: (extra.desc || '').replace(/<[^>]+>/g, '').slice(0, 60),
      descLength: (extra.desc || '').length
    });
  });

  return items;
}

// ============================================
// 主流程
// ============================================
const files = fs.readdirSync(DATA_DIR)
  .filter(f => /^lesson-\d+\.js$/.test(f))
  .filter(f => !only || f === `${only}.js`)
  .sort();

const all = [];
for (const f of files) {
  const items = await scanLesson(f);
  all.push(...items);
}

// CSV 输出
if (asCsv) {
  const header = ['讲次', '页码', '类型', '分类', '标题', '摘要'];
  const rows = all.map(i => [
    i.lessonId,
    i.slideId,
    i.slideType,
    i.category,
    i.title,
    i.descPreview
  ]);
  const csv = [header, ...rows]
    .map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const out = path.join(ROOT, 'extra-audit.csv');
  fs.writeFileSync(out, '\uFEFF' + csv, 'utf-8');
  console.log(`✅ 已导出：${path.relative(ROOT, out)}`);
  process.exit(0);
}

// 普通输出
console.log('\n════════════════════════════════════════');
console.log('  Extra 审计报告');
console.log('════════════════════════════════════════\n');

const byCat = { STORY: [], TIP: [], INFO: [], OTHER: [] };
all.forEach(i => byCat[i.category].push(i));

const LABELS = {
  STORY: '✅ STORY 疑似故事 —— 建议留',
  TIP:   '❌ TIP 疑似技巧 —— 建议删/搬正文',
  INFO:  '❌ INFO 疑似信息 —— 建议删/搬正文',
  OTHER: '⚠️  OTHER 待定 —— 人工判断'
};

Object.entries(LABELS).forEach(([cat, label]) => {
  const items = byCat[cat];
  console.log(`\n${label}（${items.length} 条）\n`);
  items.forEach(i => {
    console.log(`   ${i.lessonId} / slide-${String(i.slideId).padStart(2)}  ${i.title}`);
    console.log(`       ${i.descPreview}…`);
  });
});

console.log('\n────────────────────────────────────────');
console.log(`  总计：${all.length} 条`);
console.log(`  ✅ 建议留：${byCat.STORY.length}`);
console.log(`  ❌ 建议删：${byCat.TIP.length + byCat.INFO.length}`);
console.log(`  ⚠️  待定：${byCat.OTHER.length}`);
console.log('────────────────────────────────────────\n');
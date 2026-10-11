#!/usr/bin/env node
/**
 * apply-extra-decisions.js · 按决策表批量处理 extra
 *
 * 用法：
 *   node scripts/apply-extra-decisions.js extra-decisions.csv --dry
 *   node scripts/apply-extra-decisions.js extra-decisions.csv
 *   node scripts/apply-extra-decisions.js extra-decisions.csv --dry lesson-01
 *
 * CSV 格式：
 *   lesson,slide,decision,note
 *   01,2,keep,C++ 名字由来
 *   01,4,delete,积分规则→正文
 *
 * 支持 decision：
 *   keep    —— 不动
 *   delete  —— 删除该页的 extra 字段
 *   (其他)  —— 跳过并警告（合并类需手工）
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');

const args = process.argv.slice(2);
const csvPath = args.find(a => a.endsWith('.csv'));
const DRY = args.includes('--dry');
const only = args.find(a => /^lesson-\d+$/.test(a));

if (!csvPath) {
  console.error('❌ 请指定决策表 CSV 路径');
  console.error('   用法：node scripts/apply-extra-decisions.js extra-decisions.csv');
  process.exit(1);
}

// ============================================
// 解析 CSV
// ============================================
function parseCsv(text) {
  const lines = text.split('\n').filter(l => l.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {   // 跳过表头
    const cells = lines[i].split(',').map(c => c.trim());
    if (cells.length < 3) continue;
    rows.push({
      lesson: cells[0].padStart(2, '0'),
      slide: parseInt(cells[1], 10),
      decision: cells[2].toLowerCase(),
      note: cells[3] || ''
    });
  }
  return rows;
}

// ============================================
// 找 slides 数组里每个顶层对象的范围
// ============================================
function findSlideRanges(content) {
  const slidesMatch = content.match(/slides\s*:\s*\[/);
  if (!slidesMatch) return null;

  const arrayStart = slidesMatch.index + slidesMatch[0].length;
  const ranges = [];
  let depth = 0;
  let slideStart = -1;
  let inString = false;
  let stringChar = '';
  let inLineComment = false;
  let inBlockComment = false;
  let escaped = false;

  for (let i = arrayStart; i < content.length; i++) {
    const ch = content[i];
    const next = content[i + 1];

    if (escaped) { escaped = false; continue; }
    if (ch === '\\' && inString) { escaped = true; continue; }

    if (!inString && !inLineComment && !inBlockComment) {
      if (ch === "'" || ch === '"' || ch === '`') {
        inString = true; stringChar = ch; continue;
      }
      if (ch === '/' && next === '/') { inLineComment = true; continue; }
      if (ch === '/' && next === '*') { inBlockComment = true; i++; continue; }
    } else if (inString) {
      if (ch === stringChar) { inString = false; stringChar = ''; }
      continue;
    } else if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      continue;
    } else if (inBlockComment) {
      if (ch === '*' && next === '/') { inBlockComment = false; i++; }
      continue;
    }

    if (ch === '{') {
      if (depth === 0) slideStart = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && slideStart >= 0) {
        ranges.push({ start: slideStart, end: i + 1 });
        slideStart = -1;
      }
    } else if (ch === ']' && depth === 0) {
      break;
    }
  }
  return { arrayStart, ranges };
}

// ============================================
// 从 slide 对象里找 id
// ============================================
function extractId(content, range) {
  const block = content.slice(range.start, range.end);
  const m = block.match(/\bid\s*:\s*(\d+)\s*,/);
  return m ? parseInt(m[1], 10) : null;
}

// ============================================
// 在 slide 范围里找到 extra: {...} 并返回删除范围
// ============================================
function findExtraRange(content, slideRange) {
  const block = content.slice(slideRange.start, slideRange.end);

  // 找 `extra:` 关键字
  const extraMatch = block.match(/\bextra\s*:\s*/);
  if (!extraMatch) return null;

  const extraStartInBlock = extraMatch.index;
  let i = extraStartInBlock + extraMatch[0].length;

  // 跳过空白
  while (i < block.length && /\s/.test(block[i])) i++;

  // 期待 `{`
  if (block[i] !== '{') return null;

  // 括号配对
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escaped = false;
  const start = i;

  for (; i < block.length; i++) {
    const ch = block[i];
    const next = block[i + 1];

    if (escaped) { escaped = false; continue; }
    if (ch === '\\' && inString) { escaped = true; continue; }

    if (!inString) {
      if (ch === "'" || ch === '"' || ch === '`') {
        inString = true; stringChar = ch; continue;
      }
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) break;
      }
    } else {
      if (ch === stringChar) { inString = false; stringChar = ''; }
    }
  }

  const end = i + 1;   // 指向 `}` 之后

  // 检查后面是否有 `,`（extra 不是最后一个字段）
  let after = end;
  while (after < block.length && /\s/.test(block[after])) after++;
  const hasComma = block[after] === ',';

  // 计算在源码里的绝对位置
  const absoluteStart = slideRange.start + extraStartInBlock;
  const absoluteEnd = slideRange.start + end + (hasComma ? after - end + 1 : 0);

  // 向前吃掉前面的空白（美化格式）
  let realStart = absoluteStart;
  while (realStart > slideRange.start && /[ \t]/.test(content[realStart - 1])) {
    realStart--;
  }
  // 如果前面有换行，也吃掉
  if (content[realStart - 1] === '\n') {
    // 检查是否只有这一个换行
    realStart--;
  }

  return { start: realStart, end: absoluteEnd };
}

// ============================================
// 处理单个 lesson
// ============================================
function processLesson(lessonId, decisions) {
  const file = `lesson-${lessonId}.js`;
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) {
    return { file, error: '文件不存在', changes: [] };
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const ranges = findSlideRanges(content);
  if (!ranges) {
    return { file, error: '找不到 slides 数组', changes: [] };
  }

  // 建立 id → range 映射
  const idMap = new Map();
  for (const r of ranges.ranges) {
    const id = extractId(content, r);
    if (id !== null) idMap.set(id, r);
  }

  const changes = [];
  const toDelete = decisions.filter(d => d.lesson === lessonId && d.decision === 'delete');

  // 从后往前删，避免索引失效
  const ops = [];
  for (const d of toDelete) {
    const range = idMap.get(d.slide);
    if (!range) {
      changes.push({ slide: d.slide, error: '找不到该 slide' });
      continue;
    }
    const extraRange = findExtraRange(content, range);
    if (!extraRange) {
      changes.push({ slide: d.slide, error: '该 slide 无 extra' });
      continue;
    }
    ops.push({ slide: d.slide, range: extraRange });
  }

  ops.sort((a, b) => b.range.start - a.range.start);

  for (const op of ops) {
    content = content.slice(0, op.range.start) + content.slice(op.range.end);
    changes.push({ slide: op.slide, status: 'deleted' });
  }

  if (!DRY && changes.some(c => c.status === 'deleted')) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return { file, changes };
}

// ============================================
// 主流程
// ============================================
const csv = fs.readFileSync(csvPath, 'utf-8');
const decisions = parseCsv(csv);

const targetLessons = only
  ? [only.replace('lesson-', '')]
  : [...new Set(decisions.map(d => d.lesson))];

console.log('\n════════════════════════════════════════');
console.log(`  Extra 决策执行${DRY ? '（预览模式）' : ''}`);
console.log('════════════════════════════════════════\n');

let totalDeleted = 0;
let totalErrors = 0;

for (const lessonId of targetLessons) {
  const result = processLesson(lessonId, decisions);

  if (result.error) {
    console.log(`❌ ${result.file}：${result.error}`);
    totalErrors++;
    continue;
  }

  const deleted = result.changes.filter(c => c.status === 'deleted');
  const errors = result.changes.filter(c => c.error);

  if (deleted.length === 0 && errors.length === 0) continue;

  console.log(`${DRY ? '[DRY] ' : '✅ '}${result.file}`);
  deleted.forEach(c => console.log(`   · slide-${c.slide} 删 extra`));
  errors.forEach(c => console.log(`   ⚠️  slide-${c.slide}：${c.error}`));

  totalDeleted += deleted.length;
  totalErrors += errors.length;
}

console.log('\n────────────────────────────────────────');
console.log(`  删除：${totalDeleted} 条`);
if (totalErrors > 0) console.log(`  错误：${totalErrors} 条`);
console.log('────────────────────────────────────────\n');

if (DRY) {
  console.log('💡 这是预览模式。确认后去掉 --dry 再跑一次。\n');
} else {
  console.log('🚀 下一步：npm run dev 目视验证\n');
}
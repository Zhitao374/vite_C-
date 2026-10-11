#!/usr/bin/env node
/**
 * renumber-comments.js · 重排 lesson-XX.js 里的注释编号
 *
 * 背景：
 *   删除 slide 后，id 会自动重排（check:fix），
 *   但 slide 前面的注释 /* ===== 05 标题 ===== * / 编号不会跟着变。
 *   本脚本把注释里的数字改成和 slide.id 一致。
 *
 * 支持的注释格式：
 *   /* ===== 05 为什么需要变量 ===== * /
 *   /* ===== 14 - long long 类型 ===== * /
 *   /* ===== 11.5 陷阱页 ===== * /
 *   /* ===== 17 过渡页：第三站 → 第四站 ===== * /
 *
 * 用法：
 *   node scripts/renumber-comments.js lesson-02 --dry
 *   node scripts/renumber-comments.js lesson-02
 *   node scripts/renumber-comments.js --all --dry
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const ALL = args.includes('--all');
const lessonArg = args.find(a => /^lesson-\d+$/.test(a));

// ============================================
// 扫描 slides 数组里每个顶层 slide
// ============================================
function scanSlides(content) {
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
        const block = content.slice(slideStart, i + 1);
        const idMatch = block.match(/\bid\s*:\s*(\d+)\s*,/);
        ranges.push({
          start: slideStart,
          end: i + 1,
          id: idMatch ? parseInt(idMatch[1], 10) : null
        });
        slideStart = -1;
      }
    } else if (ch === ']' && depth === 0) {
      break;
    }
  }

  return { arrayStart, ranges };
}

// ============================================
// 处理单个文件
// ============================================
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const slides = scanSlides(content);
  if (!slides) return { error: '找不到 slides 数组', changes: [], skipped: [] };

  const replacements = [];
  const skipped = [];

  // 匹配 /* ===== 数字 标题 ===== */
  const commentRe = /\/\*\s*=+\s*(\d+(?:\.\d+)?)\s+(.*?)\s*=+\s*\*\//;

  for (let i = 0; i < slides.ranges.length; i++) {
    const slide = slides.ranges[i];
    if (slide.id === null) continue;

    // 搜索范围：前一个 slide 的 end → 当前 slide 的 start
    const searchStart = i > 0 ? slides.ranges[i - 1].end : slides.arrayStart;
    const searchEnd = slide.start;
    const segment = content.slice(searchStart, searchEnd);

    // 找 segment 里最后一个 /* ... */
    const lastOpen = segment.lastIndexOf('/*');
    if (lastOpen < 0) {
      skipped.push({ id: slide.id, reason: '无注释' });
      continue;
    }

    const lastClose = segment.indexOf('*/', lastOpen);
    if (lastClose < 0) {
      skipped.push({ id: slide.id, reason: '注释未闭合' });
      continue;
    }

    const commentText = segment.slice(lastOpen, lastClose + 2);
    const m = commentText.match(commentRe);
    if (!m) {
      skipped.push({ id: slide.id, reason: '注释格式不匹配', text: commentText.slice(0, 40) });
      continue;
    }

    const oldNum = m[1];
    const newNum = String(slide.id);
    if (oldNum === newNum) continue;

    // 数字在 segment 里的绝对位置
    const numIdxInComment = commentText.indexOf(m[0]) + m[0].indexOf(oldNum);
    const numAbs = searchStart + lastOpen + numIdxInComment;

    replacements.push({
      start: numAbs,
      end: numAbs + oldNum.length,
      oldNum,
      newNum,
      title: m[2],
      id: slide.id
    });
  }

  // 从后往前替换
  let out = content;
  replacements.sort((a, b) => b.start - a.start);
  for (const r of replacements) {
    out = out.slice(0, r.start) + r.newNum + out.slice(r.end);
  }

  return { content: out, changes: replacements, skipped };
}

// ============================================
// 主流程
// ============================================
let files;
if (ALL) {
  files = fs.readdirSync(DATA_DIR)
    .filter(f => /^lesson-\d+\.js$/.test(f))
    .map(f => path.join(DATA_DIR, f));
} else if (lessonArg) {
  files = [path.join(DATA_DIR, `${lessonArg}.js`)];
} else {
  console.error('❌ 用法：');
  console.error('   node scripts/renumber-comments.js lesson-02 [--dry]');
  console.error('   node scripts/renumber-comments.js --all [--dry]');
  process.exit(1);
}

console.log('\n════════════════════════════════════════');
console.log(`  注释编号重排${DRY ? '（预览模式）' : ''}`);
console.log('════════════════════════════════════════\n');

let totalChanged = 0;
let totalSkipped = 0;

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log(`❌ 文件不存在：${file}`);
    continue;
  }

  const result = processFile(file);
  if (result.error) {
    console.log(`❌ ${path.basename(file)}：${result.error}`);
    continue;
  }

  const rel = path.relative(ROOT, file).replace(/\\/g, '/');

  if (result.changes.length === 0 && result.skipped.length === 0) {
    console.log(`✅ ${rel} —— 无需修改`);
    continue;
  }

  console.log(`${DRY ? '[DRY] ' : '✅ '}${rel}`);

  if (result.changes.length > 0) {
    console.log(`   改动 ${result.changes.length} 处：`);
    result.changes.forEach(c => {
      console.log(`      ${c.oldNum} → ${c.newNum}   ${c.title}`);
    });
    totalChanged += result.changes.length;
  }

  if (result.skipped.length > 0) {
    console.log(`   跳过 ${result.skipped.length} 处（无法识别）：`);
    result.skipped.forEach(s => {
      const extra = s.text ? `  ${s.text}` : '';
      console.log(`      id=${s.id}  ${s.reason}${extra}`);
    });
    totalSkipped += result.skipped.length;
  }

  console.log('');

  if (!DRY && result.changes.length > 0) {
    fs.writeFileSync(file, result.content, 'utf-8');
  }
}

console.log('────────────────────────────────────────');
console.log(`  改动：${totalChanged} 处`);
console.log(`  跳过：${totalSkipped} 处`);
console.log('────────────────────────────────────────\n');

if (DRY) {
  console.log('💡 这是预览模式。确认后去掉 --dry 再跑一次。\n');
}
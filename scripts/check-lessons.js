#!/usr/bin/env node
/**
 * check-lessons.js · 检查（并修复）lesson-XX.js 的 id 连续性和 total
 *
 * 用法：
 *   node scripts/check-lessons.js                    # 检查全部
 *   node scripts/check-lessons.js lesson-13          # 只检查某一讲
 *   node scripts/check-lessons.js --fix              # 检查并修复
 *   node scripts/check-lessons.js lesson-13 --fix    # 只修复某一讲
 *   node scripts/check-lessons.js --check            # 只检查（CI 用，有错退出码非 0）
 *
 * 检查项：
 *   ① 每个 slide 的 id 从 1 开始连续（1, 2, 3, ...）
 *   ② total 字段 = slides.length
 *
 * 修复：
 *   --fix 时自动重写 id 和 total，保留原文件的注释和格式
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');

// ============================================
// 扫描器：找到 slides 数组里每个顶层对象的字符范围
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

    // 字符串
    if (!inString && !inLineComment && !inBlockComment) {
      if (ch === "'" || ch === '"' || ch === '`') {
        inString = true;
        stringChar = ch;
        continue;
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

    // 深度追踪
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
// 提取每个 slide 的 id
// ============================================
function extractIds(content, ranges) {
  const items = [];
  for (const range of ranges) {
    const block = content.slice(range.start, range.end);
    const match = block.match(/\bid\s*:\s*(\d+)\s*,/);
    if (match) {
      items.push({
        id: parseInt(match[1], 10),
        numberStart: range.start + match.index + match[0].indexOf(match[1]),
        numberLength: match[1].length
      });
    } else {
      items.push({
        id: null,
        numberStart: -1,
        numberLength: 0
      });
    }
  }
  return items;
}

// ============================================
// 提取顶层 total
// ============================================
function extractTotal(content) {
  // 跳过 slides 数组，只找前面的 total
  const totalMatch = content.match(/\btotal\s*:\s*(\d+)\s*,/);
  if (!totalMatch) return null;
  return {
    value: parseInt(totalMatch[1], 10),
    numberStart: totalMatch.index + totalMatch[0].indexOf(totalMatch[1]),
    numberLength: totalMatch[1].length
  };
}

// ============================================
// 检查一个 lesson
// ============================================
function checkLesson(file) {
  const filePath = path.join(DATA_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lessonId = file.replace('lesson-', '').replace('.js', '');

  const result = {
    lessonId, file, content,
    issues: [],
    needsFix: false
  };

  const slideRanges = findSlideRanges(content);
  if (!slideRanges) {
    result.issues.push('未找到 slides 数组');
    return result;
  }

  const slides = extractIds(content, slideRanges.ranges);
  result.slideCount = slides.length;
  result.slides = slides;

  // 检查 id 连续
  slides.forEach((s, i) => {
    const expected = i + 1;
    if (s.id === null) {
      result.issues.push(`第 ${i + 1} 个 slide：缺少 id`);
      result.needsFix = true;
    } else if (s.id !== expected) {
      result.issues.push(`第 ${i + 1} 个 slide：id=${s.id}，期望 ${expected}`);
      result.needsFix = true;
    }
  });

  // 检查 total
  const total = extractTotal(content);
  result.total = total;
  if (!total) {
    result.issues.push('未找到 total');
    result.needsFix = true;
  } else if (total.value !== slides.length) {
    result.issues.push(`total=${total.value}，应为 ${slides.length}`);
    result.needsFix = true;
  }

  return result;
}

// ============================================
// 修复 lesson
// ============================================
function fixLesson(result) {
  let content = result.content;
  const replacements = [];

  // 收集需要替换的 id
  result.slides.forEach((s, i) => {
    const expected = i + 1;
    if (s.numberStart >= 0 && s.id !== expected) {
      replacements.push({
        start: s.numberStart,
        end: s.numberStart + s.numberLength,
        text: String(expected)
      });
    }
  });

  // 修复 total
  if (result.total && result.total.value !== result.slideCount) {
    replacements.push({
      start: result.total.numberStart,
      end: result.total.numberStart + result.total.numberLength,
      text: String(result.slideCount)
    });
  }

  // 从后往前替换，避免索引偏移
  replacements.sort((a, b) => b.start - a.start);
  for (const r of replacements) {
    content = content.slice(0, r.start) + r.text + content.slice(r.end);
  }

  return content;
}

// ============================================
// 主入口
// ============================================
function main() {
  const args = process.argv.slice(2);
  const fix = args.includes('--fix');
  const filter = args.find(a => /^lesson-\d+$/.test(a)) || null;

  const files = fs.readdirSync(DATA_DIR)
    .filter(f => /^lesson-\d+\.js$/.test(f))
    .filter(f => !filter || f.startsWith(filter))
    .sort();

  if (files.length === 0) {
    console.log(`❌ 未找到匹配的 lesson 文件${filter ? `（${filter}）` : ''}`);
    process.exit(1);
  }

  console.log('\n════════════════════════════════════════');
  console.log('  lesson 数据检查 · id 连续性 + total');
  console.log('════════════════════════════════════════\n');

  let totalIssues = 0;
  let fixedCount = 0;

  for (const file of files) {
    const result = checkLesson(file);

    if (result.issues.length === 0) {
      console.log(`✅ ${file}（${result.slideCount} 页）`);
      continue;
    }

    console.log(`⚠️  ${file}（${result.slideCount} 页，${result.issues.length} 个问题）`);
    result.issues.forEach(i => console.log(`    · ${i}`));

    if (fix && result.needsFix) {
      const newContent = fixLesson(result);
      fs.writeFileSync(path.join(DATA_DIR, file), newContent, 'utf-8');
      console.log(`    🔧 已修复`);
      fixedCount++;
    }

    totalIssues += result.issues.length;
  }

  console.log('\n════════════════════════════════════════');
  if (totalIssues === 0) {
    console.log('✅ 全部通过');
  } else {
    console.log(`共 ${totalIssues} 个问题`);
    if (fix) {
      console.log(`已修复 ${fixedCount} 个文件`);
    } else {
      console.log('提示：加 --fix 自动修复');
    }
  }
  console.log('════════════════════════════════════════\n');

  if (totalIssues > 0 && !fix) {
    process.exit(1);
  }
}

main();
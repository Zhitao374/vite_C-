#!/usr/bin/env node
/**
 * fix-html-balance.js · 修复数据里的 HTML div 配对
 *
 * 破损分两种模式：
 *   A. 开1/闭2、开2/闭3（多闭，有中间段 </div><div>）
 *      作者想分段但忘补开头 → 补 <div> 开头
 *
 *   B. 开0/闭1（只多一个闭，无中间段）
 *      作者手滑多打了末尾 </div> → 删末尾 </div>
 *
 * 用法：
 *   node scripts/fix-html-balance.js --dry
 *   node scripts/fix-html-balance.js
 *   node scripts/fix-html-balance.js lesson-18
 *   node scripts/fix-html-balance.js --dry lesson-18
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const only = args.find(a => /^lesson-\d+$/.test(a));

// ============================================
// 状态机：扫描源码，找到所有字符串字面量
// ============================================
function scanAndFix(src) {
  let out = '';
  let i = 0;
  const fixes = [];

  while (i < src.length) {
    const ch = src[i];
    const next = src[i + 1];

    // 行注释
    if (ch === '/' && next === '/') {
      const end = src.indexOf('\n', i);
      if (end === -1) { out += src.slice(i); break; }
      out += src.slice(i, end + 1);
      i = end + 1;
      continue;
    }
    // 块注释
    if (ch === '/' && next === '*') {
      const end = src.indexOf('*/', i + 2);
      if (end === -1) { out += src.slice(i); break; }
      out += src.slice(i, end + 2);
      i = end + 2;
      continue;
    }

    // 字符串
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch;
      const stringStart = i;
      i++;
      let content = '';

      while (i < src.length) {
        if (src[i] === '\\') {
          content += src[i] + (src[i + 1] || '');
          i += 2;
          continue;
        }
        if (src[i] === quote) break;
        content += src[i];
        i++;
      }

      // ── 判断修复 ──
      const opens = (content.match(/<div\b/g) || []).length;
      const closes = (content.match(/<\/div>/g) || []).length;
      const diff = opens - closes;

      const startsWithDiv      = /^\s*<div\b/.test(content);
      const startsWithCloseDiv = /^\s*<\/div>/.test(content);
      const hasMiddleSegment   = /<\/div>\s*<div>/.test(content);
      const endsWithCloseDiv   = /<\/div>\s*$/.test(content);

      // 模式 A：补 <div> 开头
      const needsPrependDiv =
        diff === -1 &&
        !startsWithDiv &&
        !startsWithCloseDiv &&
        hasMiddleSegment;

      // 模式 B：删末尾 </div>
      const needsRemoveTrailing =
        opens === 0 &&
        closes === 1 &&
        endsWithCloseDiv &&
        !hasMiddleSegment;

      const lineNo = src.slice(0, stringStart).split('\n').length;

      if (needsPrependDiv) {
        const newContent = '<div>' + content;
        out += quote + newContent + quote;
        fixes.push({
          line: lineNo,
          type: 'A · +<div>开头',
          preview: content.slice(0, 80).replace(/\n/g, '\\n')
        });
      } else if (needsRemoveTrailing) {
        // 删末尾 </div>，保留前面的内容
        const idx = content.lastIndexOf('</div>');
        const newContent = content.slice(0, idx) + content.slice(idx + 6);
        out += quote + newContent + quote;
        fixes.push({
          line: lineNo,
          type: 'B · -</div>末尾',
          preview: content.slice(0, 80).replace(/\n/g, '\\n')
        });
      } else {
        out += quote + content + quote;
      }

      i++;
      continue;
    }

    out += ch;
    i++;
  }

  return { out, fixes };
}

// ============================================
// 主流程
// ============================================
const files = fs.readdirSync(DATA_DIR)
  .filter(f => /^lesson-\d+\.js$/.test(f))
  .filter(f => !only || f === `${only}.js`)
  .sort();

if (files.length === 0) {
  console.log(`⚠️  未找到匹配的 lesson 文件${only ? `（${only}）` : ''}`);
  process.exit(1);
}

console.log('\n════════════════════════════════════════');
console.log(`  HTML div 配对修复${DRY ? '（预览模式，不写文件）' : ''}`);
console.log('════════════════════════════════════════\n');

let totalFixes = 0;
let countA = 0;
let countB = 0;
let affectedFiles = 0;

for (const f of files) {
  const fullPath = path.join(DATA_DIR, f);
  const src = fs.readFileSync(fullPath, 'utf8');
  const { out, fixes } = scanAndFix(src);

  if (fixes.length === 0) continue;

  affectedFiles++;
  totalFixes += fixes.length;
  fixes.forEach(fx => {
    if (fx.type.startsWith('A')) countA++;
    else countB++;
  });

  console.log(`${DRY ? '[DRY] ' : '✅ '}${f}（${fixes.length} 处）`);
  fixes.forEach(fx => {
    console.log(`   · L${fx.line}  ${fx.type}  ${fx.preview}…`);
  });
  console.log('');

  if (!DRY) {
    fs.writeFileSync(fullPath, out, 'utf8');
  }
}

console.log('────────────────────────────────────────');
console.log(`  文件：${affectedFiles} 个`);
console.log(`  修复：${totalFixes} 处${DRY ? '（未写入）' : ''}`);
console.log(`     模式 A（+<div> 开头）：${countA} 处`);
console.log(`     模式 B（-</div> 末尾）：${countB} 处`);
console.log('────────────────────────────────────────');

if (DRY) {
  console.log('\n💡 这是预览模式。确认无误后去掉 --dry 再跑一次。\n');
} else if (totalFixes > 0) {
  console.log('\n🚀 下一步：');
  console.log('   node scripts/help.js check:html    ← 验证');
  console.log('   npm run dev                        ← 目视检查');
  console.log('');
}
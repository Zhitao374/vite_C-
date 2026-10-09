/**
 * fix-extra-desc.js · 修复 extra.desc 的多栏排版问题（v2）
 *
 * 与 v1 的区别：
 *   v1 匹配所有含 <br> 的单引号字符串 → 误伤 147 处
 *   v2 只匹配 extra: { ... desc: '...' } 结构 → 精准命中
 *
 * 用法：
 *   node scripts/fix-extra-desc.js lesson-01 --dry
 *   node scripts/fix-extra-desc.js lesson-01
 *   node scripts/fix-extra-desc.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data');

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const only = args.find(a => /^lesson-\d+$/.test(a));

// ---------- 核心：把顶层 <br> 转成 </div><div> ----------
function convertTopLevelBr(text) {
  let out = '';
  let depth = 0;
  let i = 0;
  let topBrCount = 0;

  while (i < text.length) {
    if (text.startsWith('<div', i)) {
      const close = text.indexOf('>', i);
      if (close === -1) { out += text[i]; i++; continue; }
      out += text.slice(i, close + 1);
      i = close + 1;
      depth++;
      continue;
    }
    if (text.startsWith('</div>', i)) {
      out += '</div>';
      i += 6;
      depth = Math.max(0, depth - 1);
      continue;
    }
    if (text.startsWith('<br>', i) && depth === 0) {
      out += '</div><div>';
      i += 4;
      topBrCount++;
      continue;
    }
    out += text[i];
    i++;
  }

  if (topBrCount === 0) return { result: text, changed: false, count: 0 };
  return { result: `<div>${out}</div>`, changed: true, count: topBrCount };
}

/**
 * 定位所有 extra: { ... desc: '...' } 中的 desc 字符串
 * 返回 [{ start, end, text }]  —— start/end 是字面量在源码里的位置（不含引号）
 */
function findExtraDescRanges(src) {
  const ranges = [];
  const extraRe = /extra\s*:\s*\{/g;
  let m;

  while ((m = extraRe.exec(src)) !== null) {
    const objStart = m.index + m[0].length - 1; // 指向 '{'
    // 用深度匹配找对象结束位置
    let depth = 0;
    let i = objStart;
    let objEnd = -1;
    while (i < src.length) {
      const ch = src[i];
      // 跳过字符串（引号包裹的内容）
      if (ch === "'" || ch === '"' || ch === '`') {
        const quote = ch;
        i++;
        while (i < src.length) {
          if (src[i] === '\\') { i += 2; continue; }
          if (src[i] === quote) { i++; break; }
          i++;
        }
        continue;
      }
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { objEnd = i; break; }
      }
      i++;
    }
    if (objEnd === -1) continue;

    // 在 [objStart, objEnd] 范围内找 desc: '...'
    const objText = src.slice(objStart, objEnd + 1);
    const descRe = /desc\s*:\s*'/g;
    let dm;
    while ((dm = descRe.exec(objText)) !== null) {
      const quoteStart = dm.index + dm[0].length - 1; // 指向开引号
      let k = quoteStart + 1;
      while (k < objText.length) {
        if (objText[k] === '\\') { k += 2; continue; }
        if (objText[k] === "'") break;
        k++;
      }
      const quoteEnd = k;
      ranges.push({
        start: objStart + quoteStart + 1,
        end: objStart + quoteEnd,
        text: objText.slice(quoteStart + 1, quoteEnd)
      });
    }
  }

  return ranges;
}

function processSource(src) {
  const ranges = findExtraDescRanges(src);
  let changed = 0;
  let out = src;

  // 从后往前替换，避免偏移
  for (let i = ranges.length - 1; i >= 0; i--) {
    const { start, end, text } = ranges[i];
    const { result, changed: didChange, count } = convertTopLevelBr(text);
    if (!didChange) continue;
    out = out.slice(0, start) + result + out.slice(end);
    changed += count;
  }

  return { out, changed };
}

// ---------- 主流程 ----------
const files = fs.readdirSync(DATA_DIR)
  .filter(f => /^lesson-\d+\.js$/.test(f))
  .filter(f => !only || f === `${only}.js`)
  .map(f => path.join(DATA_DIR, f));

if (files.length === 0) {
  console.log(`⚠️  没找到匹配的文件（lesson-XX.js）`);
  process.exit(1);
}

let totalFiles = 0;
let totalChanges = 0;

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const { out, changed } = processSource(src);
  const rel = path.relative(process.cwd(), file);

  if (changed > 0) {
    totalFiles++;
    totalChanges += changed;
    console.log(`${DRY ? '[DRY] ' : '✅ '}${rel}：修改 ${changed} 处顶层 <br>`);
    if (!DRY) fs.writeFileSync(file, out, 'utf8');
  } else {
    console.log(`⏭️  ${rel}：无需修改`);
  }
}

console.log('');
console.log(`共 ${totalFiles} 个文件，${totalChanges} 处修改${DRY ? '（未写入）' : ''}`);
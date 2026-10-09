/**
 * add-timeline-variant.js · 给 timeline 页批量加 variant 字段
 *
 * 规则：
 *   title 含"上节课回顾" → variant: 'review'
 *   title 含"本讲学习地图" → variant: 'map'
 *   title 含"编程语言...史"/"编程语言 70 年" → variant: 'history'
 *
 * 用法：
 *   node scripts/add-timeline-variant.js --dry
 *   node scripts/add-timeline-variant.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data');

const args = process.argv.slice(2);
const DRY = args.includes('--dry');

// 匹配 type: 'timeline', title: 'XXX' 这种固定顺序
const RULES = [
  {
    match: /type:\s*'timeline',\s*title:\s*'上节课回顾'/g,
    replace: "type: 'timeline', variant: 'review', title: '上节课回顾'",
    tag: 'review'
  },
  {
    match: /type:\s*'timeline',\s*title:\s*'本讲学习地图'/g,
    replace: "type: 'timeline', variant: 'map', title: '本讲学习地图'",
    tag: 'map'
  },
  {
    match: /type:\s*'timeline',\s*title:\s*'编程语言 70 年'/g,
    replace: "type: 'timeline', variant: 'history', title: '编程语言 70 年'",
    tag: 'history'
  },
  {
    match: /type:\s*'timeline',\s*title:\s*'编程语言发展史 · 早期'/g,
    replace: "type: 'timeline', variant: 'history', title: '编程语言发展史 · 早期'",
    tag: 'history'
  }
];

const files = fs.readdirSync(DATA_DIR)
  .filter(f => /^lesson-\d+\.js$/.test(f))
  .map(f => path.join(DATA_DIR, f));

let totalFiles = 0;
let totalChanges = 0;

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  let out = src;
  const counts = {};

  for (const rule of RULES) {
    const matches = out.match(rule.match);
    if (matches) {
      out = out.replace(rule.match, rule.replace);
      counts[rule.tag] = (counts[rule.tag] || 0) + matches.length;
    }
  }

  const totalInFile = Object.values(counts).reduce((a, b) => a + b, 0);
  if (totalInFile > 0) {
    totalFiles++;
    totalChanges += totalInFile;
    const rel = path.relative(process.cwd(), file);
    const detail = Object.entries(counts).map(([k, v]) => `${k}×${v}`).join(', ');
    console.log(`${DRY ? '[DRY] ' : '✅ '}${rel}：${totalInFile} 处（${detail}）`);
    if (!DRY) fs.writeFileSync(file, out, 'utf8');
  }
}

console.log('');
console.log(`共 ${totalFiles} 个文件，${totalChanges} 处修改${DRY ? '（未写入）' : ''}`);
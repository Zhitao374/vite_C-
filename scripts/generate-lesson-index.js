#!/usr/bin/env node
/**
 * generate-lesson-index.js · 生成 src/data/lesson-index.js
 *
 * 背景：
 *   src/data/index.js 需要引入 lesson-index.js 来获取所有讲次的元数据。
 *   这个脚本扫描 src/data/lesson-*.js，提取 title/subtitle/total/category，
 *   生成一份轻量级的索引文件。
 *
 * 用法：
 *   node scripts/generate-lesson-index.js
 *
 * 何时重新运行：
 *   - 新增讲次（lesson-XX.js）后
 *   - 修改了 title/subtitle/total/category 后
 *   - 删除讲次后
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');
const OUT_FILE = path.join(DATA_DIR, 'lesson-index.js');

const files = fs.readdirSync(DATA_DIR)
  .filter(f => /^lesson-\d+\.js$/.test(f))
  .sort();

if (files.length === 0) {
  console.error('❌ 未找到 lesson-XX.js 文件');
  process.exit(1);
}

const entries = [];

for (const f of files) {
  const url = pathToFileURL(path.join(DATA_DIR, f)).href;
  const mod = await import(url);
  const l = mod.default;
  const id = f.replace('lesson-', '').replace('.js', '');

  entries.push({
    id,
    title: l.title || '',
    subtitle: l.subtitle || '',
    total: l.total || (l.slides?.length || 0),
    category: l.category || '未分类'
  });
}

// ============================================
// 生成 JS 文件
// ============================================
const lines = [
  '// 自动生成，勿手工编辑',
  '// 重新生成：node scripts/generate-lesson-index.js',
  '',
  'export const lessonIndex = {'
];

for (const e of entries) {
  lines.push(`  ${JSON.stringify(e.id)}: {`);
  lines.push(`    title:    ${JSON.stringify(e.title)},`);
  lines.push(`    subtitle: ${JSON.stringify(e.subtitle)},`);
  lines.push(`    total:    ${e.total},`);
  lines.push(`    category: ${JSON.stringify(e.category)}`);
  lines.push(`  },`);
}

lines.push('};');
lines.push('');

fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf8');

console.log(`✅ 已生成：${path.relative(ROOT, OUT_FILE)}`);
console.log(`   共 ${entries.length} 讲`);
entries.forEach(e => {
  console.log(`   · ${e.id}  ${e.title}（${e.total} 页）`);
});
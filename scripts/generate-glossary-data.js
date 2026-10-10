#!/usr/bin/env node
/**
 * generate-glossary-data.js · 生成 src/data/glossary-data.js
 *
 * 从所有 lesson-XX.js 里抽取 glossary 页的 words，输出为独立文件。
 * 这样 /glossary 页不需要加载全部讲次数据。
 *
 * 用法：
 *   node scripts/generate-glossary-data.js
 *
 * 何时重新运行：
 *   - 新增/修改/删除讲次的 glossary 页后
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');
const OUT_FILE = path.join(DATA_DIR, 'glossary-data.js');

const files = fs.readdirSync(DATA_DIR)
  .filter(f => /^lesson-\d+\.js$/.test(f))
  .sort();

const allWords = [];

for (const f of files) {
  const url = pathToFileURL(path.join(DATA_DIR, f)).href;
  const mod = await import(url);
  const lesson = mod.default;
  const lessonId = f.replace('lesson-', '').replace('.js', '');

  const glossarySlide = (lesson.slides || []).find(s => s.type === 'glossary');
  const words = glossarySlide?.data?.words || [];

  words.forEach(w => {
    allWords.push({
      word: w.word,
      cn: w.cn,
      pron: w.pron || '',
      origin: w.origin || '',
      category: w.category || '概念',
      lessonId
    });
  });
}

// ============================================
// 生成文件
// ============================================
const lines = [
  '// 自动生成，勿手工编辑',
  '// 重新生成：node scripts/generate-glossary-data.js',
  '',
  'export const glossaryWords = ['
];

for (const w of allWords) {
  const parts = [
    `word: ${JSON.stringify(w.word)}`,
    `cn: ${JSON.stringify(w.cn)}`,
    `category: ${JSON.stringify(w.category)}`,
    `lessonId: ${JSON.stringify(w.lessonId)}`
  ];
  if (w.pron)   parts.push(`pron: ${JSON.stringify(w.pron)}`);
  if (w.origin) parts.push(`origin: ${JSON.stringify(w.origin)}`);
  lines.push(`  { ${parts.join(', ')} },`);
}

lines.push('];');
lines.push('');

fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf8');

console.log(`✅ 已生成：${path.relative(ROOT, OUT_FILE)}`);
console.log(`   共 ${allWords.length} 个词条，来自 ${files.length} 讲`);
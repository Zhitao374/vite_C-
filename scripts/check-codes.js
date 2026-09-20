#!/usr/bin/env node
/**
 * check-codes.js · 检查所有 codeFile 是否存在
 * 用法：node scripts/check-codes.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const PUBLIC_DIR = path.join(ROOT, 'public');

const missing = [];

function extractCodeFiles(obj, lessonKey, slideId) {
  if (!obj || typeof obj !== 'object') return;

  if (Array.isArray(obj)) {
    obj.forEach(item => extractCodeFiles(item, lessonKey, slideId));
    return;
  }

  // 找到 codeFile 字段
  if (typeof obj.codeFile === 'string') {
    const full = path.join(PUBLIC_DIR, obj.codeFile);
    if (!fs.existsSync(full)) {
      missing.push({
        lesson: lessonKey,
        slide: slideId,
        file: obj.codeFile
      });
    }
  }

  // 递归子对象
  Object.values(obj).forEach(v => extractCodeFiles(v, lessonKey, slideId));
}

// 扫描所有 lesson
const files = fs.readdirSync(DATA_DIR).filter(f => /^lesson-\d+\.js$/.test(f));

files.forEach(file => {
  const code = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
  const match = code.match(/export default ([\s\S]+);?\s*$/);
  if (!match) return;

  let lesson;
  try {
    lesson = new Function('return ' + match[1].trim().replace(/;$/, ''))();
  } catch (e) {
    console.error(`❌ ${file} 解析失败`);
    return;
  }

  const key = file.replace('.js', '');
  lesson.slides?.forEach(slide => {
    extractCodeFiles(slide.data, key, slide.id);
  });
});

if (missing.length === 0) {
  console.log('✅ 所有 codeFile 都存在');
} else {
  console.log(`❌ 缺失 ${missing.length} 个文件：\n`);
  missing.forEach(m => {
    console.log(`  [${m.lesson}] slide-${m.id}`);
    console.log(`    缺少：public/${m.file}\n`);
  });
  process.exit(1);
}
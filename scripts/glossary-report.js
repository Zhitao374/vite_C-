#!/usr/bin/env node
/**
 * glossary-report.js · 英文单词表检查与导出工具
 *
 * 用法：
 *   node scripts/glossary-report.js               # 完整报告
 *   node scripts/glossary-report.js --stats       # 只统计
 *   node scripts/glossary-report.js --check       # 只检查
 *   node scripts/glossary-report.js --export      # 导出 JSON
 *   node scripts/glossary-report.js --csv         # 导出 CSV
 *   node scripts/glossary-report.js lesson-01    # 只处理某一讲
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');
const OUT_DIR = path.join(ROOT, 'scripts/output');

const VALID_CATEGORIES = ['关键字', '类型', '函数', '运算符', '语句', '概念'];

function extractGlossary(lesson) {
  if (!Array.isArray(lesson.slides)) return [];
  const page = lesson.slides.find(s => s.type === 'glossary');
  return page?.data?.words || [];
}

async function scanLessons(filter = null) {
  const files = fs.readdirSync(DATA_DIR)
    .filter(f => /^lesson-\d+\.js$/.test(f))
    .filter(f => !filter || f.startsWith(filter))
    .sort();

  const results = [];
  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const fileUrl = pathToFileURL(filePath).href;
    const mod = await import(fileUrl);
    const lesson = mod.default;
    const lessonId = file.replace('lesson-', '').replace('.js', '');
    results.push({
      lessonId,
      file,
      title: lesson.title || '(未知)',
      glossary: extractGlossary(lesson)
    });
  }
  return results;
}

function reportFull(results) {
  console.log('\n════════════════════════════════════════');
  console.log('  英文单词表完整报告');
  console.log('════════════════════════════════════════\n');

  let total = 0;
  results.forEach(r => {
    console.log(`📘 第 ${r.lessonId} 讲 · ${r.title}`);
    if (r.glossary.length === 0) {
      console.log('  ⚠️  无 glossary 页\n');
      return;
    }
    r.glossary.forEach(w => {
      const pron = w.pron ? ` ${w.pron}` : '';
      const origin = w.origin ? `  // ${w.origin}` : '';
      console.log(`  ${(w.word || '').padEnd(14)}${(w.cn || '').padEnd(10)}${pron}${origin}`);
    });
    console.log(`  —— 共 ${r.glossary.length} 个\n`);
    total += r.glossary.length;
  });
  console.log(`总计：${total} 个词条\n`);
}

function reportStats(results) {
  const allWords = new Map();
  const byCategory = {};
  const byLesson = {};
  VALID_CATEGORIES.forEach(c => byCategory[c] = 0);

  results.forEach(r => {
    byLesson[r.lessonId] = r.glossary.length;
    r.glossary.forEach(w => {
      const word = (w.word || '').toLowerCase();
      if (!word) return;
      if (!allWords.has(word)) {
        allWords.set(word, { ...w, firstLesson: r.lessonId });
      }
      const cat = w.category || '未分类';
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    });
  });

  console.log('\n════════════════════════════════════════');
  console.log('  统计');
  console.log('════════════════════════════════════════\n');

  console.log('📊 按讲次：');
  Object.entries(byLesson).forEach(([id, count]) => {
    console.log(`  第 ${id} 讲：${count} 个`);
  });

  console.log('\n📊 按分类：');
  Object.entries(byCategory).forEach(([cat, count]) => {
    console.log(`  ${cat}：${count} 个`);
  });

  console.log(`\n📊 词条总计（去重后）：${allWords.size} 个\n`);
}

function reportCheck(results) {
  const issues = [];
  const allWords = new Map();

  results.forEach(r => {
    r.glossary.forEach(w => {
      const word = (w.word || '').toLowerCase();
      if (!w.word) issues.push(`[${r.lessonId}] 缺少 word 字段`);
      if (!w.cn) issues.push(`[${r.lessonId}] "${w.word}" 缺少 cn 字段`);
      if (!w.category) issues.push(`[${r.lessonId}] "${w.word}" 缺少 category 字段`);
      if (w.category && !VALID_CATEGORIES.includes(w.category)) {
        issues.push(`[${r.lessonId}] "${w.word}" 分类非法：${w.category}`);
      }
      if (word !== w.word && w.category === '关键字') {
        issues.push(`[${r.lessonId}] "${w.word}" 关键字应小写`);
      }
      if (allWords.has(word)) {
        const prev = allWords.get(word);
        if (prev.lessonId !== r.lessonId) {
          issues.push(`[${r.lessonId}] "${w.word}" 与第 ${prev.lessonId} 讲重复`);
        }
      } else {
        allWords.set(word, { ...w, lessonId: r.lessonId });
      }
    });
    if (r.glossary.length > 0 && r.glossary.length < 4) {
      issues.push(`[${r.lessonId}] 单词数量偏少（${r.glossary.length} 个）`);
    }
    if (r.glossary.length > 8) {
      issues.push(`[${r.lessonId}] 单词数量偏多（${r.glossary.length} 个）`);
    }
  });

  console.log('\n════════════════════════════════════════');
  console.log('  检查结果');
  console.log('════════════════════════════════════════');

  if (issues.length === 0) {
    console.log('\n✅ 未发现问题\n');
  } else {
    console.log('');
    issues.forEach(i => console.log(`  ⚠️  ${i}`));
    console.log(`\n共 ${issues.length} 项需要确认\n`);
  }
}

function exportJSON(results) {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const output = results.map(r => ({
    lessonId: r.lessonId,
    title: r.title,
    words: r.glossary
  }));
  const file = path.join(OUT_DIR, 'glossary-all.json');
  fs.writeFileSync(file, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`✅ 已导出：${path.relative(ROOT, file)}`);
}

function exportCSV(results) {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const rows = [['讲次', '单词', '中文', '音标', '词源', '分类']];
  results.forEach(r => {
    r.glossary.forEach(w => {
      rows.push([r.lessonId, w.word || '', w.cn || '', w.pron || '', w.origin || '', w.category || '']);
    });
  });
  const csv = rows.map(row =>
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  ).join('\n');
  const file = path.join(OUT_DIR, 'glossary-all.csv');
  fs.writeFileSync(file, '\uFEFF' + csv, 'utf-8');
  console.log(`✅ 已导出：${path.relative(ROOT, file)}`);
}

async function main() {
  const args = process.argv.slice(2);
  const filter = args.find(a => /^lesson-\d+$/.test(a)) || null;
  const results = await scanLessons(filter);

  if (results.length === 0) {
    console.log(`❌ 未找到匹配的 lesson 文件${filter ? `（${filter}）` : ''}`);
    process.exit(1);
  }

  if (args.length === 0 || filter) {
    reportFull(results);
    reportStats(results);
    reportCheck(results);
    return;
  }

  if (args.includes('--stats')) reportStats(results);
  if (args.includes('--check')) reportCheck(results);
  if (args.includes('--export')) exportJSON(results);
  if (args.includes('--csv')) exportCSV(results);
  if (args.includes('--full')) reportFull(results);
}

main().catch(err => {
  console.error('❌ 脚本出错：', err);
  process.exit(1);
});
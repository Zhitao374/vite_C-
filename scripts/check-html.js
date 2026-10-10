#!/usr/bin/env node
/**
 * check-html.js · 数据里的 HTML 片段一致性检查
 *
 * 检查项：
 *   - div 标签配对
 *   - 常见错误（孤立 </div>、未闭合 <div>）
 *
 * 用法：
 *   node scripts/check-html.js                  # 全部检查
 *   node scripts/check-html.js lesson-01        # 只检查一讲
 *   node scripts/check-html.js --fix            # 尝试自动修复（保守）
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');

const args = process.argv.slice(2);
const only = args.find(a => /^lesson-\d+$/.test(a));
const FIX = args.includes('--fix');

// ============================================
// 检查单个字符串的 div 配对
// ============================================
function checkDivBalance(html) {
  const opens = (html.match(/<div\b/g) || []).length;
  const closes = (html.match(/<\/div>/g) || []).length;
  return {
    balanced: opens === closes,
    opens,
    closes,
    diff: opens - closes
  };
}

// ============================================
// 递归遍历对象，收集所有含 div 的字符串
// ============================================
function findHtmlFields(obj, path = '', results = []) {
  if (typeof obj === 'string') {
    if (/<\/?div\b/.test(obj)) {
      results.push({ path, text: obj });
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => findHtmlFields(item, `${path}[${i}]`, results));
  } else if (obj && typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) =>
      findHtmlFields(v, path ? `${path}.${k}` : k, results)
    );
  }
  return results;
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
console.log('  HTML div 配对检查');
console.log('════════════════════════════════════════\n');

let totalIssues = 0;
let affectedFiles = 0;

for (const f of files) {
  const url = pathToFileURL(path.join(DATA_DIR, f)).href;
  const mod = await import(url);
  const lesson = mod.default;
  const lessonIssues = [];

  lesson.slides?.forEach((slide) => {
    const fields = findHtmlFields(slide.data, 'data');

    fields.forEach(({ path: fieldPath, text }) => {
      const balance = checkDivBalance(text);
      if (!balance.balanced) {
        lessonIssues.push({
          slideId: slide.id,
          slideType: slide.type,
          fieldPath,
          balance,
          preview: text.slice(0, 120)
        });
      }
    });
  });

  if (lessonIssues.length > 0) {
    affectedFiles++;
    console.log(`📄 ${f}（${lessonIssues.length} 处）`);
    lessonIssues.forEach(issue => {
      totalIssues++;
      console.log(`   ⚠️  slide-${issue.slideId} (${issue.slideType})`);
      console.log(`      字段：${issue.fieldPath}`);
      console.log(`      div：开 ${issue.balance.opens} / 闭 ${issue.balance.closes}（差 ${issue.balance.diff}）`);
      console.log(`      预览：${issue.preview.replace(/\n/g, ' ')}…`);
      console.log('');
    });
  } else {
    console.log(`✅ ${f}`);
  }
}

console.log('────────────────────────────────────────');
console.log(`  文件：${files.length} 个`);
console.log(`  含问题：${affectedFiles} 个`);
console.log(`  问题总数：${totalIssues} 处`);
console.log('────────────────────────────────────────\n');

process.exit(totalIssues > 0 ? 1 : 0);
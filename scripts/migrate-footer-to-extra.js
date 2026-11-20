#!/usr/bin/env node
/**
 * migrate-footer-to-extra.js · footer 概念下线迁移脚本
 * 
 * 用法：
 *   node scripts/migrate-footer-to-extra.js            # dry-run（只报告，不修改）
 *   node scripts/migrate-footer-to-extra.js --write    # 实际写入
 *
 * 逻辑：
 *   1. 用 import() 精确解析每个 lesson-XX.js，找出 slide.data.footer
 *   2. 用字符扫描定位源码中的 footer: '...' 位置
 *   3. 数量对比，不一致则跳过（防误伤）
 *   4. 同 slide 同时有 extra + footer 的，标记为冲突并跳过（需手工处理）
 *   5. 其余 footer → extra: { desc: '...', variant: 'flat' }
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../src/data');

const WRITE = process.argv.includes('--write');

// ────────────────────────────────────────────────────────────
// 扫描源码中的 footer: 字段
// ────────────────────────────────────────────────────────────
function scanFooterOccurrences(code) {
  const results = [];
  const needle = 'footer:';
  let i = 0;
  while ((i = code.indexOf(needle, i)) !== -1) {
    // 前一个非空白字符必须是 { 或 ,（排除 myFooter:、字符串里的 footer:）
    let p = i - 1;
    while (p >= 0 && /\s/.test(code[p])) p--;
    if (p < 0 || (code[p] !== '{' && code[p] !== ',')) {
      i += needle.length;
      continue;
    }
    // 跳到引号
    let j = i + needle.length;
    while (j < code.length && /\s/.test(code[j])) j++;
    const quote = code[j];
    if (quote !== "'" && quote !== '"' && quote !== '`') {
      i = j;
      continue;
    }
    // 找闭引号（处理转义）
    let k = j + 1;
    let escaped = false;
    while (k < code.length) {
      const ch = code[k];
      if (escaped) { escaped = false; k++; continue; }
      if (ch === '\\') { escaped = true; k++; continue; }
      if (ch === quote) break;
      k++;
    }
    if (k >= code.length) { i = j; continue; }
    results.push({
      fullStart: i,
      fullEnd: k + 1,
      quote,
      content: code.slice(j + 1, k),
    });
    i = k + 1;
  }
  return results;
}

// ────────────────────────────────────────────────────────────
// 主流程
// ────────────────────────────────────────────────────────────
async function main() {
  const files = fs.readdirSync(dataDir)
    .filter(f => /^lesson-\d+\.js$/.test(f))
    .sort();

  if (!files.length) {
    console.log('⚠️  没找到 lesson-*.js');
    return;
  }

  console.log(`📁 扫描 ${files.length} 个文件…\n`);

  let statTotalFooter = 0;
  let statConflict = 0;
  let statReplaced = 0;
  const conflicts = [];

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const code = fs.readFileSync(filePath, 'utf8');
    const occurrences = scanFooterOccurrences(code);

    let lesson;
    try {
      const url = pathToFileURL(filePath).href + '?t=' + Date.now();
      lesson = (await import(url)).default;
    } catch (e) {
      console.log(`❌ ${file}: import 失败 — ${e.message}`);
      continue;
    }

    const slidesWithFooter = lesson.slides.filter(s => s.data && s.data.footer);
    const slidesWithBoth = lesson.slides.filter(s => s.data && s.data.footer && s.data.extra);

    if (slidesWithFooter.length === 0 && occurrences.length === 0) continue;

    // ── 数量校验 ──
    if (slidesWithFooter.length !== occurrences.length) {
      console.log(`⚠️  ${file}: import 检测 ${slidesWithFooter.length} 个，文本扫描 ${occurrences.length} 个 → 数量不一致，跳过`);
      continue;
    }

    statTotalFooter += slidesWithFooter.length;

    // ── 冲突检测 ──
    if (slidesWithBoth.length > 0) {
      statConflict += slidesWithBoth.length;
      slidesWithBoth.forEach(s => conflicts.push({ file, slideId: s.id, type: s.type }));
    }

    // ── dry-run：逐条报告 ──
    if (!WRITE) {
      console.log(`📄 ${file}（${slidesWithFooter.length} 处）`);
      slidesWithFooter.forEach((s) => {
        const occ = occurrences[lesson.slides.findIndex(x => x.id === s.id && x.type === s.type)];
        const snippet = occ.content.slice(0, 40).replace(/\n/g, ' ');
        const mark = s.data.extra ? '⚠️ 冲突' : '✅';
        console.log(`   ${mark} slide ${s.id} (${s.type})  "${snippet}…"`);
      });
      continue;
    }

    // ── 写入：反向替换避免索引错位 ──
    let newCode = code;
    let replaced = 0;
    for (let idx = occurrences.length - 1; idx >= 0; idx--) {
      const slide = slidesWithFooter[idx];
      if (slide.data.extra) continue; // 冲突跳过
      const occ = occurrences[idx];
      const replacement = `extra: { desc: ${occ.quote}${occ.content}${occ.quote}, variant: 'flat' }`;
      newCode = newCode.slice(0, occ.fullStart) + replacement + newCode.slice(occ.fullEnd);
      replaced++;
    }

    if (replaced > 0) {
      fs.writeFileSync(filePath, newCode, 'utf8');
      statReplaced += replaced;
      console.log(`✅ ${file}: 替换 ${replaced} 处`);
    }
  }

  // ── 汇总 ──
  console.log('\n═══════════════════════════');
  console.log(`📋 文件总数：${files.length}`);
  console.log(`📋 发现 footer：${statTotalFooter} 处`);
  console.log(`📋 冲突（同时有 extra）：${statConflict} 处`);
  if (conflicts.length) {
    console.log('\n⚠️  需手工处理：');
    conflicts.forEach(c => console.log(`   - ${c.file} · slide ${c.slideId} (${c.type})`));
  }
  if (WRITE) {
    console.log(`\n✅ 已替换：${statReplaced} 处`);
    console.log(`\n下一步：`);
    console.log(`   1. 检查 git diff：git diff src/data/`);
    console.log(`   2. 验证语法：node -c src/data/lesson-02.js`);
    console.log(`   3. 启动验证：npm run dev`);
  } else {
    console.log(`\n🔍 DRY RUN — 未修改文件`);
    console.log(`   确认无误后执行：node scripts/migrate-footer-to-extra.js --write`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
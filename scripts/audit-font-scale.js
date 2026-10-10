#!/usr/bin/env node
/**
 * audit-font-scale.js · 审计样式里未跟随 --font-scale 的硬编码 px
 *
 * 用法：
 *   node scripts/audit-font-scale.js              # 报告
 *   node scripts/audit-font-scale.js --fix        # 自动修复（只处理安全项）
 *   node scripts/audit-font-scale.js --fix --dry  # 预览
 *   node scripts/audit-font-scale.js GridSlide.vue
 *
 * 规则：
 *   【自动修复】以下属性的 px 值 → calc(px * var(--font-scale))
 *     - padding / padding-*       (内容尺寸)
 *     - margin / margin-*         (内容尺寸)
 *     - gap / row-gap / column-gap
 *     - min-height / max-height   (仅当值 < 500px)
 *     - min-width / max-width     (仅当值 < 500px)
 *     - border-radius             (仅当值 < 30px)
 *
 *   【只报告，不自动改】以下属性不确定：
 *     - width / height            (可能是 UI 控件)
 *     - font-size                 (通常应该用 --fs-*)
 *     - line-height               (通常应该用倍数)
 *     - top / left / right / bottom
 *     - transform: translate*     (定位)
 *
 *   【忽略】以下情况：
 *     - 值已经在 calc(... * var(--font-scale)) 里
 *     - 值为 0px / 1px 等极小值
 *     - 注释里
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const FIX = args.includes('--fix');
const DRY = args.includes('--dry');
const onlyFile = args.find(a => a.endsWith('.vue') || a.endsWith('.css'));

const TARGET_DIRS = ['src/components', 'src/styles', 'src/views'];

// ============================================
// 属性规则
// ============================================
const AUTO_FIX_PROPS = [
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'gap', 'row-gap', 'column-gap',
];

const CONDITIONAL_PROPS = [
  { name: 'min-height', maxValue: 500 },
  { name: 'max-height', maxValue: 500 },
  { name: 'min-width', maxValue: 500 },
  { name: 'max-width', maxValue: 500 },
  { name: 'border-radius', maxValue: 30 },
];

const REPORT_ONLY_PROPS = ['width', 'height', 'top', 'left', 'right', 'bottom'];

// ============================================
// 扫描文件
// ============================================
function findFiles(dir) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  const out = [];
  for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
    const entryPath = path.join(full, entry.name);
    if (entry.isDirectory()) {
      out.push(...findFiles(path.relative(ROOT, entryPath)));
    } else if (entry.name.endsWith('.vue') || entry.name.endsWith('.css')) {
      if (!onlyFile || entry.name === onlyFile) {
        out.push(entryPath);
      }
    }
  }
  return out;
}

// ============================================
// 检查某行是否在 calc(var(--font-scale)) 里
// ============================================
function hasFontScale(content) {
  return /calc\([^)]*var\(--font-scale\)/.test(content);
}

// ============================================
// 判断某个属性是否需要处理
// ============================================
function classifyProp(prop) {
  if (AUTO_FIX_PROPS.includes(prop)) return 'auto';
  const cond = CONDITIONAL_PROPS.find(c => c.name === prop);
  if (cond) return { type: 'conditional', ...cond };
  if (REPORT_ONLY_PROPS.includes(prop)) return 'report';
  return null;
}

// ============================================
// 处理单个文件
// ============================================
function processFile(file) {
  const src = fs.readFileSync(file, 'utf-8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');

  const issues = { auto: [], conditional: [], report: [] };
  let out = src;

  // 匹配 `prop: value;` 里的 px 值
  // 支持：
  //   padding: 12px;
  //   padding: 12px 18px;
  //   padding: 12px 18px 14px 20px;
  //   margin-top: 8px;
  const propRegex = /([a-z-]+)\s*:\s*([^;{}]+);/g;

  const lines = src.split('\n');

  lines.forEach((line, i) => {
    // 跳过注释行
    if (/^\s*(\/\*|\*|\/\/)/.test(line)) return;
    // 跳过已有 font-scale 的行
    if (hasFontScale(line)) return;

    let match;
    const re = new RegExp(propRegex.source, 'g');
    while ((match = re.exec(line)) !== null) {
      const prop = match[1].trim();
      const value = match[2].trim();

      const rule = classifyProp(prop);
      if (!rule) continue;

      // 找 px 值
      const pxMatches = [...value.matchAll(/(\d+(?:\.\d+)?)px/g)];
      if (pxMatches.length === 0) continue;

      // 跳过 0px / 1px
      const significantPx = pxMatches.filter(m => parseFloat(m[1]) > 1);
      if (significantPx.length === 0) continue;

      const issue = {
        line: i + 1,
        prop,
        value,
        pxCount: significantPx.length,
        raw: line.trim()
      };

      if (rule === 'auto') {
        issues.auto.push(issue);
      } else if (rule === 'report') {
        issues.report.push(issue);
      } else {
        // conditional —— 判断数值
        const maxPx = Math.max(...significantPx.map(m => parseFloat(m[1])));
        if (maxPx <= rule.maxValue) {
          issues.conditional.push(issue);
        }
      }
    }
  });

  // ============================================
  // 自动修复
  // ============================================
  if (FIX && (issues.auto.length > 0 || issues.conditional.length > 0)) {
    const allFixable = [...issues.auto, ...issues.conditional];
    for (const issue of allFixable) {
      const oldValue = issue.value;
      const newValue = oldValue.replace(
        /(\d+(?:\.\d+)?)px/g,
        (m, num) => parseFloat(num) > 1 ? `calc(${m} * var(--font-scale))` : m
      );
      const oldLine = `${issue.prop}: ${oldValue};`;
      const newLine = `${issue.prop}: ${newValue};`;
      out = out.replace(oldLine, newLine);
    }
    if (!DRY) fs.writeFileSync(file, out, 'utf-8');
  }

  return { rel, issues };
}

// ============================================
// 主流程
// ============================================
const files = TARGET_DIRS.flatMap(findFiles);

if (files.length === 0) {
  console.log('⚠️  没有找到目标文件');
  process.exit(0);
}

console.log('\n════════════════════════════════════════');
console.log(`  --font-scale 审计${FIX ? (DRY ? '（预览）' : '（自动修复）') : ''}`);
console.log('════════════════════════════════════════\n');

let totalAuto = 0;
let totalConditional = 0;
let totalReport = 0;
let affectedFiles = 0;

for (const file of files) {
  const { rel, issues } = processFile(file);

  const total = issues.auto.length + issues.conditional.length + issues.report.length;
  if (total === 0) continue;

  affectedFiles++;
  totalAuto += issues.auto.length;
  totalConditional += issues.conditional.length;
  totalReport += issues.report.length;

  console.log(`📄 ${rel}`);

  if (issues.auto.length > 0) {
    console.log(`   ✅ 可自动修复（内容尺寸）：${issues.auto.length} 处`);
    issues.auto.slice(0, 5).forEach(i => {
      console.log(`      L${i.line}  ${i.raw}`);
    });
    if (issues.auto.length > 5) {
      console.log(`      ...还有 ${issues.auto.length - 5} 处`);
    }
  }

  if (issues.conditional.length > 0) {
    console.log(`   ⚠️  有条件修复（值较小）：${issues.conditional.length} 处`);
    issues.conditional.slice(0, 3).forEach(i => {
      console.log(`      L${i.line}  ${i.raw}`);
    });
  }

  if (issues.report.length > 0) {
    console.log(`   📋 需人工判断（可能是 UI 控件）：${issues.report.length} 处`);
    issues.report.slice(0, 3).forEach(i => {
      console.log(`      L${i.line}  ${i.raw}`);
    });
  }

  console.log('');
}

console.log('────────────────────────────────────────');
console.log(`  受影响文件：${affectedFiles} 个`);
console.log(`  ✅ 可自动修复：${totalAuto} 处`);
console.log(`  ⚠️  有条件修复：${totalConditional} 处`);
console.log(`  📋 需人工判断：${totalReport} 处`);
console.log('────────────────────────────────────────\n');

if (!FIX) {
  console.log('💡 加 --fix 自动修复"可自动修复"和"有条件修复"的部分；');
  console.log('   加 --dry 与 --fix 一起用，只预览不改。\n');
} else if (DRY) {
  console.log('💡 这是预览模式。确认无误后去掉 --dry 再跑一次。\n');
} else {
  console.log('🚀 已修复。请手工检查"需人工判断"的项。\n');
}
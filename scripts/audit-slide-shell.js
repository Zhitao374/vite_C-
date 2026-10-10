#!/usr/bin/env node
/**
 * audit-slide-shell.js · 审计哪些版式组件已迁移到 SlideShell
 *
 * 用法：
 *   node scripts/audit-slide-shell.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SLIDES_DIR = path.join(ROOT, 'src/components/slides');

const files = fs.readdirSync(SLIDES_DIR)
  .filter(f => f.endsWith('.vue'))
  .sort();

console.log('\n════════════════════════════════════════');
console.log('  SlideShell 迁移审计');
console.log('════════════════════════════════════════\n');

const migrated = [];
const pending = [];

for (const f of files) {
  const src = fs.readFileSync(path.join(SLIDES_DIR, f), 'utf-8');
  const hasShell = /<SlideShell\b/.test(src);
  const hasOwnShell = /<div class="slide["\s]/.test(src);

  if (hasShell) {
    migrated.push(f);
  } else if (hasOwnShell) {
    pending.push(f);
  }
}

console.log(`✅ 已迁移：${migrated.length} 个\n`);
migrated.forEach(f => console.log(`   · ${f}`));

console.log(`\n⏳ 待迁移：${pending.length} 个\n`);
pending.forEach(f => console.log(`   · ${f}`));

console.log(`\n────────────────────────────────────────`);
console.log(`  已迁移 ${migrated.length} / ${migrated.length + pending.length}`);
console.log(`────────────────────────────────────────\n`);

// 特殊结构组件（不适用 SlideShell）
const SPECIAL = ['CoverSlide.vue', 'TransitionSlide.vue', 'EndingSlide.vue'];
const applicable = files.filter(f => !SPECIAL.includes(f));
console.log(`💡 注意：以下组件结构特殊，不适用 SlideShell：`);
SPECIAL.forEach(f => console.log(`   · ${f}`));
console.log(`   适用组件：${applicable.length} 个\n`);
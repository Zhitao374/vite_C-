#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CHECKS = {
  code: { name: '📦 代码编译（.cpp）', cmd: 'node', args: ['verify-codes.js', '--check'] },
  ids: { name: '🔢 数据 id 连续性', cmd: 'node', args: ['scripts/check-lessons.js'] },
  glossary: { name: '📖 术语表', cmd: 'node', args: ['scripts/glossary-report.js', '--check'] },
  html: { name: '🏷️ HTML 标签配对', cmd: 'node', args: ['scripts/check-html.js'] }
};

function run(cmd, args, label) {
  return new Promise((resolve) => {
    console.log(`\n${'─'.repeat(50)}\n▶  ${label}\n${'─'.repeat(50)}`);
    const child = spawn(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: false });
    child.on('close', (code) => resolve({ code, label }));
    child.on('error', (err) => { console.error(`❌ 启动失败：${err.message}`); resolve({ code: 1, label }); });
  });
}

async function runChecks(keys, filter, fix = false) {
  const results = [];
  for (const key of keys) {
    const check = CHECKS[key];
    if (!check) continue;
    let args = [...check.args];
    if (fix && key === 'ids') args.push('--fix');
    if (filter) args.push(filter);
    results.push(await run(check.cmd, args, check.name));
  }
  return results;
}

function printSummary(results) {
  console.log(`\n${'═'.repeat(50)}\n  检查结果汇总\n${'═'.repeat(50)}`);
  let failed = 0;
  for (const r of results) {
    if (r.code === 0) console.log(`  ✅ ${r.label}`);
    else { console.log(`  ❌ ${r.label}（退出码 ${r.code}）`); failed++; }
  }
  console.log(`${'═'.repeat(50)}`);
  if (failed === 0) console.log(`  🎉 全部通过\n`);
  else { console.log(`  ⚠️  ${failed} 项未通过\n`); process.exit(1); }
}

async function main() {
  const args = process.argv.slice(2);
  const filter = args.find(a => /^lesson-\d+$/.test(a)) || null;

  const commands = {
    code: { keys: ['code'], fix: false },
    ids: { keys: ['ids'], fix: false },
    html: { keys: ['html'], fix: false },
    glossary: { keys: ['glossary'], fix: false },
    all: { keys: ['code', 'ids', 'html', 'glossary'], fix: false },
    fix: { keys: ['code', 'ids', 'html', 'glossary'], fix: true },
    'fix:ids': { keys: ['ids'], fix: true }
  };

  const cmd = args.find(a => commands[a]);
  if (cmd) {
    // 严格只执行指定的检查
    const { keys, fix } = commands[cmd];
    const results = await runChecks(keys, filter, fix);
    printSummary(results);
    return;
  }

  console.log(`❌ 未知命令：${args.join(' ')}\n可用命令：code, ids, html, glossary, all, fix, fix:ids`);
  process.exit(1);
}

main().catch(err => { console.error('❌ 检查异常：', err); process.exit(1); });
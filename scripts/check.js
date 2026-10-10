#!/usr/bin/env node
/**
 * check.js · 项目统一检查入口
 *
 * 用法：
 *   node scripts/check.js              # 交互式菜单
 *   node scripts/check.js code         # 只编译 .cpp
 *   node scripts/check.js ids          # 只检查 id/total
 *   node scripts/check.js glossary     # 只检查术语表
 *   node scripts/check.js all          # 全部检查
 *   node scripts/check.js fix          # 全部 + 修复 id
 *   node scripts/check.js lesson-13    # 指定讲次
 */

import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ============================================
// 检查项定义
// ============================================
const CHECKS = {
  code: {
    name: '📦 代码编译（.cpp）',
    desc: '编译所有 .cpp 文件 + 引用完整性',
    cmd: 'node',
    args: ['verify-codes.js'],
    argsWithCheck: ['verify-codes.js', '--check']
  },
  ids: {
    name: '🔢 数据 id 连续性',
    desc: '检查每个 slide 的 id 从 1 连续 + total 一致',
    cmd: 'node',
    args: ['scripts/check-lessons.js']
  },
  glossary: {
    name: '📖 术语表',
    desc: '检查 glossary 词条规范 + 统计',
    cmd: 'node',
    args: ['scripts/glossary-report.js', '--check']
  },
  html: {
    name: '🏷️ HTML 标签配对',
    desc: '检查所有 lesson 数据里的 div 是否配对',
    cmd: 'node',
    args: ['scripts/check-html.js']
  }
};

// ============================================
// 执行子命令
// ============================================
function run(cmd, args, label) {
  return new Promise((resolve) => {
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`▶  ${label}`);
    console.log(`${'─'.repeat(50)}`);

    const child = spawn(cmd, args, {
      cwd: ROOT,
      stdio: 'inherit',
      shell: false
    });

    child.on('close', (code) => {
      resolve({ code, label });
    });

    child.on('error', (err) => {
      console.error(`❌ 启动失败：${err.message}`);
      resolve({ code: 1, label });
    });
  });
}

// ============================================
// 执行一组检查
// ============================================
async function runChecks(keys, filter, fix = false) {
  const results = [];

  for (const key of keys) {
    const check = CHECKS[key];
    if (!check) continue;

    let args = [...check.args];
    if (fix && key === 'ids') args.push('--fix');
    if (filter) args.push(filter);

    const result = await run(check.cmd, args, check.name);
    results.push(result);
  }

  return results;
}

// ============================================
// 输出汇总
// ============================================
function printSummary(results) {
  console.log(`\n${'═'.repeat(50)}`);
  console.log('  检查结果汇总');
  console.log(`${'═'.repeat(50)}`);

  let failed = 0;
  for (const r of results) {
    if (r.code === 0) {
      console.log(`  ✅ ${r.label}`);
    } else {
      console.log(`  ❌ ${r.label}（退出码 ${r.code}）`);
      failed++;
    }
  }

  console.log(`${'═'.repeat(50)}`);
  if (failed === 0) {
    console.log(`  🎉 全部通过\n`);
  } else {
    console.log(`  ⚠️  ${failed} 项未通过\n`);
    process.exit(1);
  }
}

// ============================================
// 交互式菜单
// ============================================
async function showMenu() {
  return new Promise((resolve) => {
    console.log(`\n${'═'.repeat(50)}`);
    console.log('  项目检查 · 请选择');
    console.log(`${'═'.repeat(50)}\n`);
    console.log('  1. 📦 只检查代码编译');
    console.log('  2. 🔧 检查 + 修复 id 连续性');
    console.log('  3. 📖 只检查术语表');
    console.log('  4. 🚀 全部检查（推荐）');
    console.log('  5. 🔧 全部检查 + 修复 id');
    console.log('  0. 退出\n');

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('  请输入选项 [0-5]（默认 4）：', (answer) => {
      rl.close();
      const choice = answer.trim() || '4';

      const map = {
        '1': { keys: ['code'], fix: false },
        '2': { keys: ['ids'], fix: true },
        '3': { keys: ['glossary'], fix: false },
        '4': { keys: ['code', 'ids', 'glossary'], fix: false },
        '5': { keys: ['code', 'ids', 'glossary'], fix: true },
        '0': { keys: [], fix: false, exit: true }
      };

      resolve(map[choice] || map['4']);
    });
  });
}

// ============================================
// 主入口
// ============================================
async function main() {
  const args = process.argv.slice(2);
  const filter = args.find(a => /^lesson-\d+$/.test(a)) || null;

  // 命令映射
  const commands = {
    code: { keys: ['code'] },
    ids: { keys: ['ids'] },
    glossary: { keys: ['glossary'] },
    all: { keys: ['code', 'ids', 'glossary'] },
    fix: { keys: ['code', 'ids', 'glossary'], fix: true }
  };

  // 有参数：直接执行
  const cmd = args.find(a => commands[a]);
  if (cmd) {
    const { keys, fix = false } = commands[cmd];
    const results = await runChecks(keys, filter, fix);
    printSummary(results);
    return;
  }

  // 无参数：显示菜单
  if (args.length === 0) {
    const choice = await showMenu();
    if (choice.exit) {
      console.log('  已退出\n');
      return;
    }
    const results = await runChecks(choice.keys, null, choice.fix);
    printSummary(results);
    return;
  }

  // 未知参数
  console.log(`❌ 未知命令：${args.join(' ')}`);
  console.log('\n用法：');
  console.log('  node scripts/check.js              # 交互式菜单');
  console.log('  node scripts/check.js code         # 只编译 .cpp');
  console.log('  node scripts/check.js ids          # 只检查 id');
  console.log('  node scripts/check.js glossary     # 只检查术语');
  console.log('  node scripts/check.js all          # 全部');
  console.log('  node scripts/check.js fix          # 全部 + 修复');
  console.log('  node scripts/check.js lesson-13    # 指定讲次\n');
  process.exit(1);
}

main().catch(err => {
  console.error('❌ 检查脚本异常：', err);
  process.exit(1);
});
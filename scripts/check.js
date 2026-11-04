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
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`▶  ${label}`);
    console.log(`${'─'.repeat(50)}`);

    // 修复：去掉 shell: true，消除安全警告，直接使用 node 的可执行文件路径
    const child = spawn(process.execPath, args.map(a => a.replace('node', process.execPath)), {
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

async function runChecks(keys, filter, fix = false) {
  const results = [];
  for (const key of keys) {
    const check = CHECKS[key];
    if (!check) continue;

    let args = [...check.args];
    if (fix && key === 'ids') args.push('--fix');
    if (filter) args.push(filter);

    // 这里的 args[0] 是 'verify-codes.js' 或 'scripts/xxx.js'，args[1] 是参数
    // 为了配合上面的 process.execPath 处理，我们需要改造一下
    const finalArgs = [args[0], ...args.slice(1)];
    
    // 如果指定了 node，则直接用 process.execPath
    let execCmd = check.cmd;
    if (check.cmd === 'node') {
      execCmd = process.execPath;
    }

    const child = spawn(execCmd, finalArgs, {
      cwd: ROOT,
      stdio: 'inherit',
      shell: false
    });

    const result = await new Promise((resolve) => {
      child.on('close', (code) => resolve({ code, label: check.name }));
      child.on('error', (err) => {
        console.error(`❌ 启动失败：${err.message}`);
        resolve({ code: 1, label: check.name });
      });
    });

    results.push(result);
  }
  return results;
}

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
// 恢复：交互式菜单
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
        '4': { keys: ['code', 'ids', 'html', 'glossary'], fix: false },
        '5': { keys: ['code', 'ids', 'html', 'glossary'], fix: true },
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

  const commands = {
    code:     { keys: ['code'], fix: false },
    ids:      { keys: ['ids'], fix: false },
    html:     { keys: ['html'], fix: false },
    glossary: { keys: ['glossary'], fix: false },
    all:      { keys: ['code', 'ids', 'html', 'glossary'], fix: false },
    fix:      { keys: ['code', 'ids', 'html', 'glossary'], fix: true },
    'fix:ids': { keys: ['ids'], fix: true }
  };

  const cmd = args.find(a => commands[a]);
  if (cmd) {
    const { keys, fix } = commands[cmd];
    const results = await runChecks(keys, filter, fix);
    printSummary(results);
    return;
  }

  // 恢复：无参数时走菜单
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

  console.log(`❌ 未知命令：${args.join(' ')}`);
  console.log('\n可用命令：code, ids, html, glossary, all, fix, fix:ids');
  process.exit(1);
}

main().catch(err => {
  console.error('❌ 检查脚本异常：', err);
  process.exit(1);
});
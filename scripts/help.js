#!/usr/bin/env node
/**
 * help.js · 项目命令中心（交互式）
 *
 * 用法：
 *   node scripts/help.js              交互菜单（推荐）
 *   node scripts/help.js --list       只列菜单，不交互
 *   node scripts/help.js check:all    直接执行某命令
 *   node scripts/help.js 7            直接执行编号 7
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import readline from 'node:readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ============================================
// 命令清单（唯一维护点）
// ============================================
const COMMANDS = {
    '🚀 开发': {
        'dev': { run: 'npm run dev', desc: '启动开发服务器' },
        'build': { run: 'npm run build', desc: '打包生产版本' },
        'preview': { run: 'npm run preview', desc: '预览生产版本' },
        'lint': { run: 'npm run lint', desc: 'ESLint 检查' },
        'format': { run: 'npm run format', desc: 'Prettier 格式化' },
    },

    '✅ 检查': {
        'check': { run: 'node scripts/check.js', desc: '检查（默认 all）' },
        'check:code': { run: 'node scripts/check.js code', desc: '代码编译 + 引用检查' },
        'check:ids': { run: 'node scripts/check.js ids', desc: 'slide id 连续性检查' },
        'check:glossary': { run: 'node scripts/check.js glossary', desc: '术语表检查' },
        'check:html': { run: 'node scripts/check-html.js', desc: 'HTML div 配对检查' },   // ← 新增
        'check:all': { run: 'node scripts/check.js all', desc: '运行全部检查' },
        'check:fix': { run: 'node scripts/check.js fix', desc: '检查并自动修复' },
    },

    '🔧 修复 / 重构': {
        'fix:extra': { run: 'node scripts/fix-extra-desc.js', desc: '修复 Extra 多栏分段' },
        'fix:extra:dry': { run: 'node scripts/fix-extra-desc.js --dry', desc: '预览（不写文件）' },
        'fix:html': { run: 'node scripts/fix-html-balance.js', desc: '修复 HTML div 配对' },  // ← 新增
        'fix:html:dry': { run: 'node scripts/fix-html-balance.js --dry', desc: '预览（不写文件）' },  // ← 新增
    },

    '📊 索引与生成': {
        'index': { run: 'node scripts/generate-index.js', desc: '生成 COURSE-INDEX.md' },
        'index:lessons': { run: 'node scripts/generate-lesson-index.js', desc: '生成 lesson-index.js（元数据索引）' },
        'index:glossary': { run: 'node scripts/generate-glossary-data.js', desc: '生成 glossary-data.js（术语）' }, 
    },

    '🔬 审计': {
        'audit:shell': { run: 'node scripts/audit-slide-shell.js', desc: 'SlideShell 迁移审计' },
        'audit:font': { run: 'node scripts/audit-font-scale.js', desc: '--font-scale 硬编码审计' },
        'audit:font:fix': { run: 'node scripts/audit-font-scale.js --fix --dry', desc: '审计 + 预览修复' },
    },

    '📦 打包（给新对话）': {
        'pack': { run: 'node scripts/bundle-for-context.js --slim', desc: '打包（精简版）' },
        'pack:full': { run: 'node scripts/bundle-for-context.js', desc: '打包（完整版）' },
    },

    '🛠️  单独工具': {
        'verify': { run: 'node verify-codes.js', desc: '编译所有 .cpp' },
        'glossary': { run: 'node scripts/glossary-report.js --check', desc: '术语检查' },
        'glossary:csv': { run: 'node scripts/glossary-report.js --csv', desc: '导出术语 CSV' },
    },
};

// ============================================
// 颜色
// ============================================
const C = {
    cyan: s => `\x1b[36m${s}\x1b[0m`,
    green: s => `\x1b[32m${s}\x1b[0m`,
    yellow: s => `\x1b[33m${s}\x1b[0m`,
    gray: s => `\x1b[90m${s}\x1b[0m`,
    bold: s => `\x1b[1m${s}\x1b[0m`,
    red: s => `\x1b[31m${s}\x1b[0m`,
};

// ============================================
// 把所有命令拍平成带编号的列表
// ============================================
function flattenCommands() {
    const list = [];
    let idx = 1;
    Object.entries(COMMANDS).forEach(([groupName, group]) => {
        Object.entries(group).forEach(([name, info]) => {
            list.push({ no: idx++, group: groupName, name, run: info.run, desc: info.desc });
        });
    });
    return list;
}

// ============================================
// 打印菜单
// ============================================
function printMenu(list) {
    console.clear();
    console.log('');
    console.log(C.bold('  📖 C++ 课程项目 · 命令中心'));
    console.log(C.gray('  输入编号直接执行；或输入命令名；q 退出'));
    console.log('');

    let lastGroup = '';
    list.forEach(item => {
        if (item.group !== lastGroup) {
            console.log('');
            console.log(C.cyan(`  ${item.group}`));
            lastGroup = item.group;
        }
        const no = C.yellow(`[${String(item.no).padStart(2)}]`);
        const name = C.green(item.name.padEnd(20));
        console.log(`   ${no}  ${name} ${item.desc}`);
    });
    console.log('');
}

// ============================================
// 单次提问（每次创建新的 rl，避免和子进程抢 stdin）
// ============================================
function prompt(question) {
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

// ============================================
// 执行命令
// ============================================
function runCommand(runStr) {
    const parts = runStr.split(' ');
    console.log('');
    console.log(C.gray(`  ▶ 执行：${runStr}`));
    console.log('');

    return new Promise(resolve => {
        const proc = spawn(parts[0], parts.slice(1), {
            cwd: ROOT,
            stdio: 'inherit',
            shell: process.platform === 'win32'
        });
        proc.on('exit', code => resolve(code || 0));
        proc.on('error', err => {
            console.error(C.red(`  ❌ ${err.message}`));
            resolve(1);
        });
    });
}

// ============================================
// 交互主循环
// ============================================
async function interactive() {
    const list = flattenCommands();
    const byNo = new Map(list.map(c => [String(c.no), c]));
    const byName = new Map(list.map(c => [c.name, c]));

    printMenu(list);

    while (true) {
        const answer = await prompt(C.bold('  请选择 > '));
        const key = answer.trim();

        // 退出
        if (!key || ['q', 'quit', 'exit'].includes(key.toLowerCase())) {
            console.log(C.gray('\n  👋 再见\n'));
            return;
        }

        // 匹配命令
        const cmd = byNo.get(key) || byName.get(key);
        if (!cmd) {
            console.log(C.red(`\n  ❌ 未找到："${key}"`));
            console.log(C.gray('     请输入编号（如 7）或命令名（如 check:all）\n'));
            continue;
        }

        // 执行
        await runCommand(cmd.run);

        // 执行完等一个回车，再重画菜单
        await prompt(C.gray('\n  按 Enter 返回菜单...'));
        printMenu(list);
    }
}

// ============================================
// 主流程
// ============================================
const args = process.argv.slice(2);

if (args.length === 0) {
    interactive();
} else {
    const [target, ...rest] = args;

    // --list / -l → 只列菜单
    if (target === '--list' || target === '-l') {
        const list = flattenCommands();
        printMenu(list);
        process.exit(0);
    }

    // 直接执行
    const list = flattenCommands();
    const cmd = list.find(c => c.name === target || String(c.no) === target);

    if (!cmd) {
        console.log(C.red(`\n  ❌ 未找到："${target}"`));
        console.log(C.gray('     运行 node scripts/help.js --list 查看所有命令\n'));
        process.exit(1);
    }

    runCommand(cmd.run + (rest.length ? ' ' + rest.join(' ') : ''))
        .then(code => process.exit(code));
}
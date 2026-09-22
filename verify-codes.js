#!/usr/bin/env node
/**
 * verify-codes.js v3
 *
 * 功能：
 *   1. 编译验证所有 .cpp 文件
 *   2. 检查 lesson-XX.js 里引用的 .cpp 是否存在（缺失检查）
 *   3. 检查 lesson-XX/ 目录里多余的 .cpp（多余检查）
 *   4. 发现多余文件时，自动询问是否删除（只处理 lesson-XX 目录）
 *
 * 用法：
 *   node verify-codes.js                      # 只编译验证
 *   node verify-codes.js --check              # 编译 + 检查 + 询问删除
 *   node verify-codes.js --check --yes        # 编译 + 检查 + 不问直接删
 *   node verify-codes.js --check --dry        # 编译 + 检查 + 只显示
 *   node verify-codes.js lesson-06 --check    # 只处理 lesson-06
 *
 * 退出码：
 *   0 - 全部通过
 *   1 - 编译失败 / 有缺失引用
 *   2 - 环境错误（g++ 未安装）
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

// ============ ESM 里构造 __dirname ============
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;
const CODES_DIR = path.join(ROOT, 'public', 'codes');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const TMP_DIR = path.join(os.tmpdir(), 'cpp-verify');

// ============ 参数解析 ============
const args = process.argv.slice(2);
const flags = {
  check: args.includes('--check'),
  yes: args.includes('--yes'),
  dry: args.includes('--dry'),
  help: args.includes('--help') || args.includes('-h'),
  lesson: args.find(a => /^lesson-\d+$/.test(a))
};

// 是否只做编译验证
const compileOnly = args.length === 0 ||
                    (!flags.check && !flags.help);

// ============ 颜色 ============
const c = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  dim: '\x1b[2m',
  bold: '\x1b[1m'
};

const log = (m) => console.log(m);
const ok = (m) => console.log(`${c.green}✅${c.reset} ${m}`);
const err = (m) => console.log(`${c.red}❌${c.reset} ${m}`);
const info = (m) => console.log(`${c.cyan}ℹ${c.reset} ${m}`);
const warn = (m) => console.log(`${c.yellow}⚠${c.reset} ${m}`);
const del = (m) => console.log(`${c.red}🗑${c.reset} ${m}`);
const title = (m) => {
  log('');
  log(`${c.cyan}═══════════════════════════════════════${c.reset}`);
  log(`${c.cyan}   ${m}${c.reset}`);
  log(`${c.cyan}═══════════════════════════════════════${c.reset}`);
};

// ============ 帮助 ============
function showHelp() {
  log('');
  log(`${c.bold}C++ 课程代码验证工具 v3${c.reset}`);
  log('');
  log(`${c.bold}用法：${c.reset}`);
  log('  node verify-codes.js                   只编译验证');
  log('  node verify-codes.js --check           编译 + 检查 + 询问删除');
  log('  node verify-codes.js --check --yes     编译 + 检查 + 不问直接删');
  log('  node verify-codes.js --check --dry     编译 + 检查 + 只显示');
  log('  node verify-codes.js lesson-06 --check 只处理某一讲');
  log('');
  log(`${c.bold}安全说明：${c.reset}`);
  log('  · 只处理 lesson-XX 格式的目录');
  log('  · 其他目录（如经典题收集）一律不动');
  log('  · 默认先询问，输入 y 才删除');
  log('');
}

// ============ g++ 检查 ============
function checkGpp() {
  const result = spawnSync('g++', ['--version'], { encoding: 'utf-8' });
  if (result.error || result.status !== 0) {
    err('未找到 g++ 命令');
    log('');
    log('请先安装 MinGW（Windows）或 Xcode Command Line Tools（Mac），');
    log('并确保 g++ 已加入系统 PATH。');
    process.exit(2);
  }
  const version = (result.stdout || '').split('\n')[0].trim();
  info(`编译器：${version}`);
}

// ============ 临时目录 ============
function cleanTmp() {
  if (fs.existsSync(TMP_DIR)) {
    try { fs.rmSync(TMP_DIR, { recursive: true, force: true }); } catch (_) {}
  }
}
function ensureTmp() {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
}

// ============ 递归查找文件 ============
function walkFiles(dir, ext, result = []) {
  if (!fs.existsSync(dir)) return result;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walkFiles(full, ext, result);
    } else if (entry.endsWith(ext)) {
      result.push(full);
    }
  }
  return result;
}

// ============ 从 lesson-XX.js 提取 codeFile 引用 ============
function extractCodeFileRefs(lessonFile) {
  const content = fs.readFileSync(lessonFile, 'utf-8');
  const refs = new Set();
  const regex = /codeFile\s*:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    refs.add(m[1]);
  }
  return refs;
}

// ============ 分析引用 ============
function analyzeRefs() {
  const result = {
    lessons: {},
    totalMissing: 0,
    totalExtra: 0
  };

  const lessonFiles = fs.readdirSync(DATA_DIR)
    .filter(f => /^lesson-\d+\.js$/.test(f))
    .map(f => ({
      name: f.replace('.js', ''),
      path: path.join(DATA_DIR, f)
    }));

  const targets = flags.lesson
    ? lessonFiles.filter(l => l.name === flags.lesson)
    : lessonFiles;

  if (targets.length === 0) {
    warn(`未找到${flags.lesson ? '指定的' : ''} lesson-XX.js 文件`);
    return result;
  }

  for (const lesson of targets) {
    const lessonKey = lesson.name;
    const refs = extractCodeFileRefs(lesson.path);

    const referencedAbs = new Set();
    for (const ref of refs) {
      if (ref.startsWith(`codes/${lessonKey}/`)) {
        referencedAbs.add(path.join(ROOT, 'public', ref));
      }
    }

    const lessonDir = path.join(CODES_DIR, lessonKey);
    const existingCpp = walkFiles(lessonDir, '.cpp');
    const existingAbs = new Set(existingCpp);

    const missing = [];
    for (const ref of referencedAbs) {
      if (!existingAbs.has(ref)) {
        missing.push(path.relative(ROOT, ref).replace(/\\/g, '/'));
      }
    }

    const extra = [];
    for (const existing of existingAbs) {
      if (!referencedAbs.has(existing)) {
        extra.push(path.relative(ROOT, existing).replace(/\\/g, '/'));
      }
    }

    result.lessons[lessonKey] = {
      referenced: referencedAbs,
      existing: existingAbs,
      missing,
      extra
    };

    result.totalMissing += missing.length;
    result.totalExtra += extra.length;
  }

  return result;
}

// ============ 编译 ============
function compile(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const baseName = path.basename(file, '.cpp');
  const outName = baseName + (process.platform === 'win32' ? '.exe' : '');
  const out = path.join(TMP_DIR, outName);

  const result = spawnSync('g++', [
    '-std=c++11', '-Wall', '-O2', file, '-o', out
  ], {
    encoding: 'utf-8',
    timeout: 15000,
    shell: false
  });

  return {
    file: rel,
    ok: result.status === 0,
    stderr: (result.stderr || '').trim()
  };
}

// ============ 任务 1：编译验证 ============
function runCompile() {
  title('编译验证');

  checkGpp();

  const searchDir = flags.lesson
    ? path.join(CODES_DIR, flags.lesson)
    : CODES_DIR;

  if (flags.lesson && !fs.existsSync(searchDir)) {
    err(`目录不存在：${searchDir}`);
    process.exit(1);
  }

  const files = walkFiles(searchDir, '.cpp');
  if (files.length === 0) {
    warn('未找到任何 .cpp 文件');
    return { pass: 0, fail: 0 };
  }

  log(`扫描目录：${path.relative(ROOT, searchDir).replace(/\\/g, '/')}`);
  log(`文件数量：${files.length}`);
  log('');

  ensureTmp();

  const results = [];
  let pass = 0, failCount = 0;

  for (const file of files) {
    const r = compile(file);
    results.push(r);
    if (r.ok) {
      pass++;
      ok(r.file);
    } else {
      failCount++;
      err(r.file);
    }
  }

  log('');
  log(`${c.cyan}───────────────────────────────────${c.reset}`);
  log(`   总文件数：${files.length}`);
  log(`   ${c.green}通过：${pass}${c.reset}`);
  if (failCount > 0) log(`   ${c.red}失败：${failCount}${c.reset}`);
  log(`${c.cyan}───────────────────────────────────${c.reset}`);

  if (failCount > 0) {
    log('');
    log(`${c.red}失败详情：${c.reset}`);
    for (const r of results) {
      if (!r.ok) {
        log('');
        log(`${c.red}▶ ${r.file}${c.reset}`);
        if (r.stderr) {
          log(r.stderr.split('\n').map(l => `  ${l}`).join('\n'));
        }
      }
    }
  }

  cleanTmp();
  return { pass, fail: failCount };
}

// ============ 任务 2：引用检查 ============
function runCheck() {
  title('引用检查');

  const analysis = analyzeRefs();
  const lessons = Object.keys(analysis.lessons);

  if (lessons.length === 0) return analysis;

  for (const lessonKey of lessons) {
    const lessonInfo = analysis.lessons[lessonKey];
    log('');
    log(`${c.bold}${lessonKey}${c.reset}`);

    if (lessonInfo.missing.length === 0 && lessonInfo.extra.length === 0) {
      ok('全部匹配');
      continue;
    }

    if (lessonInfo.missing.length > 0) {
      log(`${c.red}  缺失（JS 引用但文件不存在）：${c.reset}`);
      for (const m of lessonInfo.missing) {
        log(`    ${c.red}✗${c.reset} ${m}`);
      }
    }

    if (lessonInfo.extra.length > 0) {
      log(`${c.yellow}  多余（文件存在但未被引用）：${c.reset}`);
      for (const e of lessonInfo.extra) {
        log(`    ${c.yellow}⚠${c.reset} ${e}`);
      }
    }
  }

  log('');
  log(`${c.cyan}───────────────────────────────────${c.reset}`);
  log(`   检查讲次：${lessons.length}`);
  log(`   ${analysis.totalMissing > 0 ? c.red : c.green}缺失：${analysis.totalMissing}${c.reset}`);
  log(`   ${analysis.totalExtra > 0 ? c.yellow : c.green}多余：${analysis.totalExtra}${c.reset}`);
  log(`${c.cyan}───────────────────────────────────${c.reset}`);

  return analysis;
}

// ============ 任务 3：询问并删除多余文件 ============
async function promptDelete(analysis) {
  if (analysis.totalExtra === 0) return 0;

  // 收集待删文件（安全校验）
  const toDelete = [];
  for (const lessonKey of Object.keys(analysis.lessons)) {
    const lessonInfo = analysis.lessons[lessonKey];
    for (const e of lessonInfo.extra) {
      if (e.startsWith(`public/codes/${lessonKey}/`)) {
        toDelete.push(e);
      } else {
        warn(`跳过（不在课程目录内）：${e}`);
      }
    }
  }

  if (toDelete.length === 0) {
    ok('没有可安全删除的文件');
    return 0;
  }

  log('');
  log(`${c.bold}以下 ${toDelete.length} 个文件是多余的：${c.reset}`);
  log('');
  for (const f of toDelete) {
    del(f);
  }
  log('');

  // --dry 模式
  if (flags.dry) {
    warn('--dry 模式，未实际删除');
    return 0;
  }

  // 询问（除非 --yes）
  if (!flags.yes) {
    const confirmed = await askConfirm(`是否删除这 ${toDelete.length} 个文件？(y/N) `);
    if (!confirmed) {
      info('已跳过删除');
      return 0;
    }
  }

  // 执行删除
  let deleted = 0;
  for (const f of toDelete) {
    const full = path.join(ROOT, f);
    try {
      fs.unlinkSync(full);
      deleted++;
      ok(`已删除 ${f}`);
    } catch (e) {
      err(`删除失败 ${f}: ${e.message}`);
    }
  }

  log('');
  log(`${c.green}共删除 ${deleted} 个文件${c.reset}`);
  return deleted;
}

// ============ 询问确认 ============
function askConfirm(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer) => {
      rl.close();
      const a = answer.trim().toLowerCase();
      resolve(a === 'y' || a === 'yes');
    });
  });
}

// ============ 主流程 ============
async function main() {
  if (flags.help) {
    showHelp();
    return;
  }

  log('');
  log(`${c.bold}${c.cyan}╔═══════════════════════════════════════╗${c.reset}`);
  log(`${c.bold}${c.cyan}║   C++ 课程代码验证工具 v3${c.reset}`);
  log(`${c.bold}${c.cyan}╚═══════════════════════════════════════╝${c.reset}`);
  if (flags.lesson) info(`只处理：${flags.lesson}`);

  let compileResult = { pass: 0, fail: 0 };
  let analysis = { lessons: {}, totalMissing: 0, totalExtra: 0 };

  // 任务 1：编译
  if (compileOnly) {
    compileResult = runCompile();
  }

  // 任务 2 + 3：检查 + 询问删除
  if (flags.check) {
    // 先编译
    compileResult = runCompile();
    // 再检查
    analysis = runCheck();
    // 发现多余 → 询问删除
    if (analysis.totalExtra > 0) {
      await promptDelete(analysis);
    } else if (analysis.totalMissing === 0) {
      log('');
      ok('引用完整，无多余文件');
    }
  }

  // 退出码
  const hasError = compileResult.fail > 0 || analysis.totalMissing > 0;
  log('');
  if (hasError) {
    log(`${c.red}${c.bold}构建未通过${c.reset}`);
    process.exit(1);
  } else {
    log(`${c.green}${c.bold}全部通过${c.reset}`);
    process.exit(0);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚡ 智能判断项目根目录（兼容放在根目录或 scripts 目录下）
const isInScripts = __dirname.endsWith('scripts') || __dirname.endsWith('scripts\\');
const ROOT = isInScripts ? path.dirname(__dirname) : __dirname;

const CODES_DIR = path.join(ROOT, 'public', 'codes');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const TMP_DIR = path.join(os.tmpdir(), 'cpp-verify');

const args = process.argv.slice(2);
const flags = {
  check: args.includes('--check'),
  yes: args.includes('--yes'),
  dry: args.includes('--dry'),
  help: args.includes('--help') || args.includes('-h'),
  lesson: args.find(a => /^lesson-\d+$/.test(a))
};

const compileOnly = args.length === 0 || (!flags.check && !flags.help);

const c = {
  reset: '\x1b[0m', green: '\x1b[32m', red: '\x1b[31m', yellow: '\x1b[33m',
  cyan: '\x1b[36m', magenta: '\x1b[35m', dim: '\x1b[2m', bold: '\x1b[1m'
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

// ============ 基础工具 ============
function checkGpp() {
  const result = spawnSync('g++', ['--version'], { encoding: 'utf-8' });
  if (result.error || result.status !== 0) {
    err('未找到 g++ 命令');
    process.exit(2);
  }
  const version = (result.stdout || '').split('\n')[0].trim();
  info(`编译器：${version}`);
}

function cleanTmp() {
  if (fs.existsSync(TMP_DIR)) {
    try { fs.rmSync(TMP_DIR, { recursive: true, force: true }); } catch (_) {}
  }
}
function ensureTmp() {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
}

// ============ 查找文件（编译时跳过 _error-） ============
function walkFiles(dir, ext, result = []) {
  if (!fs.existsSync(dir)) return result;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry.startsWith('_error-') || entry.startsWith('error-')) continue;
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

// ============ 提取 JS 中的引用 ============
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

// ============ 分析引用完整性 ============
function analyzeRefs() {
  const result = { lessons: {}, totalMissing: 0, totalExtra: 0 };

  const lessonFiles = fs.readdirSync(DATA_DIR)
    .filter(f => /^lesson-\d+\.js$/.test(f))
    .map(f => ({ name: f.replace('.js', ''), path: path.join(DATA_DIR, f) }));

  const targets = flags.lesson ? lessonFiles.filter(l => l.name === flags.lesson) : lessonFiles;

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
    
    // 物理存在的所有文件（包含 _error-）
    const allFiles = [];
    const collectAll = (d) => {
      if (!fs.existsSync(d)) return;
      fs.readdirSync(d).forEach(entry => {
        const full = path.join(d, entry);
        if (fs.statSync(full).isDirectory()) collectAll(full);
        else if (entry.endsWith('.cpp')) allFiles.push(full);
      });
    };
    collectAll(lessonDir);
    const existingAbs = new Set(allFiles);

    const missing = [];
    for (const ref of referencedAbs) {
      if (!existingAbs.has(ref)) missing.push(path.relative(ROOT, ref).replace(/\\/g, '/'));
    }

    const extra = [];
    for (const existing of existingAbs) {
      // 如果物理存在，但 JS 没引用，且不是 _error-，则报多余
      if (!referencedAbs.has(existing) && !path.basename(existing).startsWith('_error-')) {
        extra.push(path.relative(ROOT, existing).replace(/\\/g, '/'));
      }
    }

    result.lessons[lessonKey] = { missing, extra };
    result.totalMissing += missing.length;
    result.totalExtra += extra.length;
  }
  return result;
}

// ============ 编译逻辑 ============
function compile(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const baseName = path.basename(file, '.cpp');
  const outName = baseName + (process.platform === 'win32' ? '.exe' : '');
  const out = path.join(TMP_DIR, outName);

  const result = spawnSync('g++', ['-std=c++11', '-Wall', '-O2', file, '-o', out], {
    encoding: 'utf-8', timeout: 15000, shell: false
  });

  return { file: rel, ok: result.status === 0, stderr: (result.stderr || '').trim() };
}

function runCompile() {
  title('编译验证');
  checkGpp();

  const searchDir = flags.lesson ? path.join(CODES_DIR, flags.lesson) : CODES_DIR;
  if (flags.lesson && !fs.existsSync(searchDir)) {
    err(`目录不存在：${searchDir}`);
    process.exit(1);
  }

  const files = walkFiles(searchDir, '.cpp');
  
  if (files.length === 0) {
    warn(`未找到任何需要编译的 .cpp 文件（已忽略 _error-）！`);
    return { pass: 0, fail: 0 };
  }

  log(`扫描目录：${path.relative(ROOT, searchDir).replace(/\\/g, '/')}`);
  log(`文件数量：${files.length}（已忽略 _error- 演示文件）`);
  log('');

  ensureTmp();
  let pass = 0, failCount = 0;
  const results = [];

  for (const file of files) {
    const r = compile(file);
    results.push(r);
    if (r.ok) { pass++; ok(r.file); } 
    else { failCount++; err(r.file); }
  }

  log('');
  log(`${c.cyan}───────────────────────────────────${c.reset}`);
  log(`   总文件数：${files.length}   ${c.green}通过：${pass}${c.reset}   ${failCount > 0 ? c.red : ''}失败：${failCount}${c.reset}`);
  log(`${c.cyan}───────────────────────────────────${c.reset}`);

  if (failCount > 0) {
    for (const r of results) {
      if (!r.ok) {
        log(`\n${c.red}▶ ${r.file}${c.reset}`);
        if (r.stderr) log(r.stderr.split('\n').map(l => `  ${l}`).join('\n'));
      }
    }
  }

  cleanTmp();
  return { pass, fail: failCount };
}

// ============ 引用检查逻辑 ============
function runCheck() {
  title('引用检查');
  const analysis = analyzeRefs();
  const lessons = Object.keys(analysis.lessons);

  if (lessons.length === 0) return analysis;

  for (const lessonKey of lessons) {
    const { missing, extra } = analysis.lessons[lessonKey];
    log(`\n${c.bold}${lessonKey}${c.reset}`);

    if (missing.length === 0 && extra.length === 0) {
      ok('全部匹配');
      continue;
    }

    if (missing.length > 0) {
      log(`${c.red}  缺失（JS 引用但文件不存在）：${c.reset}`);
      for (const m of missing) log(`    ${c.red}✗${c.reset} ${m}`);
    }

    if (extra.length > 0) {
      log(`${c.yellow}  多余（文件存在但未被引用）：${c.reset}`);
      for (const e of extra) log(`    ${c.yellow}⚠${c.reset} ${e}`);
    }
  }

  log(`\n${c.cyan}───────────────────────────────────${c.reset}`);
  log(`   缺失：${analysis.totalMissing}   多余：${analysis.totalExtra}`);
  log(`${c.cyan}───────────────────────────────────${c.reset}`);

  return analysis;
}

// ============ 清理多余文件 ============
async function promptDelete(analysis) {
  if (analysis.totalExtra === 0) return 0;

  const toDelete = [];
  for (const lessonKey of Object.keys(analysis.lessons)) {
    for (const e of analysis.lessons[lessonKey].extra) {
      if (e.startsWith(`public/codes/${lessonKey}/`)) toDelete.push(e);
      else warn(`跳过（不在课程目录内）：${e}`);
    }
  }

  if (toDelete.length === 0) return ok('没有可安全删除的文件');

  log(`\n${c.bold}以下 ${toDelete.length} 个文件是多余的：${c.reset}`);
  for (const f of toDelete) del(f);

  if (flags.dry) return warn('--dry 模式，未实际删除');

  if (!flags.yes) {
    const confirmed = await new Promise((resolve) => {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question(`\n是否删除这 ${toDelete.length} 个文件？(y/N) `, (ans) => {
        rl.close();
        resolve(ans.trim().toLowerCase() === 'y' || ans.trim().toLowerCase() === 'yes');
      });
    });
    if (!confirmed) return info('已跳过删除');
  }

  let deleted = 0;
  for (const f of toDelete) {
    try {
      fs.unlinkSync(path.join(ROOT, f));
      deleted++;
      ok(`已删除 ${f}`);
    } catch (e) { err(`删除失败 ${f}: ${e.message}`); }
  }
  log(`${c.green}共删除 ${deleted} 个文件${c.reset}`);
  return deleted;
}

// ============ 主流程 ============
async function main() {
  if (flags.help) {
    log('\n用法：node verify-codes.js [--check] [--yes] [--dry] [lesson-XX]');
    return;
  }

  log(`\n${c.bold}${c.cyan}╔═══════════════════════════════════════╗${c.reset}`);
  log(`${c.bold}${c.cyan}║   C++ 课程代码验证工具 v4.0 (All-in)  ║${c.reset}`);
  log(`${c.bold}${c.cyan}╚═══════════════════════════════════════╝${c.reset}`);

  let compileResult = { pass: 0, fail: 0 };
  let analysis = { lessons: {}, totalMissing: 0, totalExtra: 0 };

  // 任务 1：编译
  compileResult = runCompile();

  // 任务 2：引用检查
  if (flags.check) {
    analysis = runCheck();
    if (analysis.totalExtra > 0) {
      await promptDelete(analysis);
    } else if (analysis.totalMissing === 0) {
      log('');
      ok('引用完整，无多余文件');
    }
  }

  // 退出状态
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
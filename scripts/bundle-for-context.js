/**
 * bundle-for-context.js · 打包项目供新对话使用
 *
 * 用法：
 *   node scripts/bundle-for-context.js
 *   node scripts/bundle-for-context.js --slim    # 精简版（只保留关键文件）
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, '_context');

const args = process.argv.slice(2);
const SLIM = args.includes('--slim');
const ESSENTIAL_SLIDES = [
    // 框架页
    'CoverSlide.vue', 'TransitionSlide.vue', 'EndingSlide.vue',
    // 信息展示
    'GridSlide.vue', 'SplitSlide.vue', 'BigNumberSlide.vue', 'FlowSlide.vue',
    // 代码讲解
    'CodeSplitSlide.vue', 'CodeWalkthroughSlide.vue', 'EvolutionSlide.vue',
    // 互动教学
    'DialogSlide.vue', 'TimelineSlide.vue', 'QuizSlide.vue', 'LevelMapSlide.vue',
    // 概念对比
    'CompareSlide.vue', 'OriginSlide.vue', 'PitfallSlide.vue', 'DecisionSlide.vue',
    // 总结复习
    'QuoteSlide.vue', 'RadialSlide.vue', 'GlossarySlide.vue'
];

// ============================================
// 工具函数
// ============================================

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readFile(relPath) {
    const fullPath = path.join(ROOT, relPath);
    if (!fs.existsSync(fullPath)) {
        return `// ⚠️ 文件不存在：${relPath}`;
    }
    return fs.readFileSync(fullPath, 'utf8');
}

function listDir(relPath, ext = null) {
    const fullPath = path.join(ROOT, relPath);
    if (!fs.existsSync(fullPath)) return [];
    return fs.readdirSync(fullPath)
        .filter(f => !ext || f.endsWith(ext))
        .sort();
}

function wrap(relPath, content, lang = '') {
    const ext = path.extname(relPath).slice(1);
    const langMap = { js: 'javascript', vue: 'vue', css: 'css', md: 'markdown', json: 'json', html: 'html' };
    const finalLang = lang || langMap[ext] || '';
    return `\n### \`${relPath}\`\n\n\`\`\`\`${finalLang}\n${content}\n\`\`\`\`\n`;
}

function tree(relPath, prefix = '', depth = 0, maxDepth = 3) {
    if (depth > maxDepth) return '';
    const fullPath = path.join(ROOT, relPath);
    if (!fs.existsSync(fullPath)) return '';

    const stat = fs.statSync(fullPath);
    if (!stat.isDirectory()) return '';

    const items = fs.readdirSync(fullPath)
        .filter(f => !['node_modules', '.git', 'dist', '_context'].includes(f))
        .sort();

    let out = '';
    items.forEach((item, i) => {
        const isLast = i === items.length - 1;
        const branch = isLast ? '└── ' : '├── ';
        const subPrefix = isLast ? prefix + '    ' : prefix + '│   ';
        const itemPath = path.join(relPath, item);
        const itemFull = path.join(ROOT, itemPath);

        out += `${prefix}${branch}${item}\n`;

        if (fs.statSync(itemFull).isDirectory() && depth < maxDepth) {
            out += tree(itemPath, subPrefix, depth + 1, maxDepth);
        }
    });
    return out;
}

// ============================================
// 生成 01-架构与进度.md
// ============================================

// ============================================
// 生成 01-架构与进度.md（v2 实时抽取版）
// ============================================

function build01() {
    const parts = [];
    const now = new Date().toISOString().slice(0, 10);

    parts.push(`# 项目打包文档 01 · 架构与进度\n`);
    parts.push(`> 本文件由 \`scripts/bundle-for-context.js\` 于 **${now}** 自动生成\n`);
    parts.push(`> **信息源**：代码目录（实时），不是旧的 MD 文档\n`);

    // ─────────────────────────────────────
    // 一、目录树
    // ─────────────────────────────────────
    parts.push('\n## 一、目录树（深度 3）\n');
    parts.push('```\nC_Vite/\n');
    parts.push(tree('.', '', 0, 3));
    parts.push('```\n');

    // ─────────────────────────────────────
    // 二、技术栈（从 package.json 抽取）
    // ─────────────────────────────────────
    parts.push('\n## 二、技术栈（从 package.json 实时读取）\n');
    try {
        const pkg = JSON.parse(readFile('package.json'));
        parts.push('| 项 | 值 |\n|---|---|\n');
        parts.push(`| 项目名 | ${pkg.name || '—'} |\n`);
        parts.push(`| 版本 | ${pkg.version || '—'} |\n`);
        parts.push(`| 模块类型 | ${pkg.type || 'commonjs'} |\n`);
        parts.push('\n**依赖**：\n\n');
        parts.push('| 包 | 版本 |\n|---|---|\n');
        Object.entries(pkg.dependencies || {}).forEach(([k, v]) => {
            parts.push(`| ${k} | ${v} |\n`);
        });
        parts.push('\n**开发依赖**：\n\n');
        parts.push('| 包 | 版本 |\n|---|---|\n');
        Object.entries(pkg.devDependencies || {}).forEach(([k, v]) => {
            parts.push(`| ${k} | ${v} |\n`);
        });
        parts.push('\n**脚本**：\n\n');
        parts.push('```bash\n');
        Object.entries(pkg.scripts || {}).forEach(([k, v]) => {
            parts.push(`${k.padEnd(12)} → ${v}\n`);
        });
        parts.push('```\n');
    } catch (e) {
        parts.push('⚠️ package.json 解析失败\n');
    }

    // ─────────────────────────────────────
    // 三、组件清单（从文件目录实时扫描）
    // ─────────────────────────────────────
    parts.push('\n## 三、组件清单（实时扫描）\n');

    // slides 组件
    parts.push('\n### 3.1 slides 组件（版式）\n');
    const slideFiles = listDir('src/components/slides', '.vue');
    parts.push(`**共 ${slideFiles.length} 个**\n\n`);
    parts.push('| 文件名 | type |\n|---|---|\n');
    slideFiles.forEach(f => {
        const name = f.replace(/Slide\.vue$/, '');
        const type = name
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()
            .replace(/^-/, '');
        parts.push(`| ${f} | \`${type}\` |\n`);
    });

    // animations 组件
    parts.push('\n### 3.2 animations 组件\n');
    const animFiles = listDir('src/components/animations', '.vue');
    parts.push(`**共 ${animFiles.length} 个**\n\n`);
    parts.push('```\n');
    animFiles.forEach(f => {
        const stat = fs.statSync(path.join(ROOT, 'src/components/animations', f));
        parts.push(`${f.padEnd(40)} ${(stat.size / 1024).toFixed(1)} KB\n`);
    });
    parts.push('```\n');

    // common 组件
    parts.push('\n### 3.3 common 公共组件\n');
    const commonFiles = listDir('src/components/common', '.vue');
    parts.push(`**共 ${commonFiles.length} 个**\n\n`);
    parts.push('```\n');
    commonFiles.forEach(f => parts.push(`${f}\n`));
    parts.push('```\n');

    // level-map 子组件
    parts.push('\n### 3.4 level-map 子组件\n');
    const lmFiles = listDir('src/components/level-map', '.vue');
    parts.push('```\n');
    lmFiles.forEach(f => parts.push(`${f}\n`));
    parts.push('```\n');

    // ─────────────────────────────────────
    // 四、已完成讲次（从数据文件实时扫描）
    // ─────────────────────────────────────
    parts.push('\n## 四、已完成讲次（实时扫描）\n');
    const lessonFiles = listDir('src/data', '.js').filter(f => f.startsWith('lesson-'));
    parts.push(`**共 ${lessonFiles.length} 讲**\n\n`);
    parts.push('| 讲次 | 标题 | 副标题 | 页数 |\n|---|---|---|---|\n');

    lessonFiles.sort().forEach(f => {
        try {
            const content = readFile(`src/data/${f}`);
            // 提取 title / subtitle / total
            const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
            const subMatch = content.match(/subtitle:\s*['"]([^'"]+)['"]/);
            const totalMatch = content.match(/total:\s*(\d+)/);

            const id = f.replace('lesson-', '').replace('.js', '');
            const title = titleMatch ? titleMatch[1] : '—';
            const subtitle = subMatch ? subMatch[1] : '—';
            const total = totalMatch ? totalMatch[1] : '—';

            parts.push(`| ${id} | ${title} | ${subtitle} | ${total} |\n`);
        } catch (e) {
            parts.push(`| ${f} | 读取失败 | — | — |\n`);
        }
    });

    // ─────────────────────────────────────
    // 五、术语统计（从各讲 glossary 页抽取）
    // ─────────────────────────────────────
    parts.push('\n## 五、术语统计（实时抽取）\n');
    let totalWords = 0;
    const wordsByCat = {};
    const wordsByLesson = {};

    lessonFiles.sort().forEach(f => {
        try {
            const content = readFile(`src/data/${f}`);
            const id = f.replace('lesson-', '').replace('.js', '');
            // 匹配 category: 'xxx'
            const cats = content.match(/category:\s*['"]([^'"]+)['"]/g) || [];
            const words = content.match(/word:\s*['"]([^'"]+)['"]/g) || [];

            if (words.length > 0) {
                wordsByLesson[id] = words.length;
                totalWords += words.length;
                cats.forEach(c => {
                    const cat = c.match(/['"]([^'"]+)['"]/)[1];
                    wordsByCat[cat] = (wordsByCat[cat] || 0) + 1;
                });
            }
        } catch (e) { /* skip */ }
    });

    parts.push(`**总词条数**：${totalWords}\n\n`);
    parts.push('**按分类**：\n\n');
    parts.push('| 分类 | 数量 |\n|---|---|\n');
    Object.entries(wordsByCat).sort((a, b) => b[1] - a[1]).forEach(([c, n]) => {
        parts.push(`| ${c} | ${n} |\n`);
    });
    parts.push('\n**按讲次**：\n\n');
    parts.push('| 讲次 | 词条数 |\n|---|---|\n');
    Object.entries(wordsByLesson).forEach(([id, n]) => {
        parts.push(`| ${id} | ${n} |\n`);
    });

    // ─────────────────────────────────────
    // 六、代码文件清单
    // ─────────────────────────────────────
    parts.push('\n## 六、代码文件清单\n');
    const codesDir = path.join(ROOT, 'public/codes');
    if (fs.existsSync(codesDir)) {
        fs.readdirSync(codesDir).sort().forEach(lessonDir => {
            const lessonPath = path.join(codesDir, lessonDir);
            if (fs.statSync(lessonPath).isDirectory()) {
                const files = fs.readdirSync(lessonPath).sort();
                parts.push(`**${lessonDir}/** (${files.length} 个)\n\n`);
                parts.push('```\n');
                files.forEach(f => parts.push(`  ${f}\n`));
                parts.push('```\n\n');
            }
        });
    } else {
        parts.push('⚠️ public/codes 目录不存在\n');
    }

    // ─────────────────────────────────────
    // 七、CSS 变量清单
    // ─────────────────────────────────────
    parts.push('\n## 七、CSS 变量清单（从 theme.css 抽取）\n');
    try {
        const themeCss = readFile('src/styles/theme.css');
        const vars = themeCss.match(/--[a-zA-Z0-9-]+/g) || [];
        const uniqueVars = [...new Set(vars)].sort();
        parts.push(`**共 ${uniqueVars.length} 个变量**\n\n`);
        parts.push('```\n');
        uniqueVars.forEach(v => parts.push(`${v}\n`));
        parts.push('```\n');
    } catch (e) {
        parts.push('⚠️ theme.css 读取失败\n');
    }

    // ─────────────────────────────────────
    // 八、路由清单
    // ─────────────────────────────────────
    parts.push('\n## 八、路由清单\n');
    try {
        const routerContent = readFile('src/router/index.js');
        const routeMatches = routerContent.match(/path:\s*['"]([^'"]+)['"]/g) || [];
        parts.push('```\n');
        routeMatches.forEach(m => {
            const p = m.match(/['"]([^'"]+)['"]/)[1];
            parts.push(`${p}\n`);
        });
        parts.push('```\n');
    } catch (e) {
        parts.push('⚠️ router/index.js 读取失败\n');
    }

    // ─────────────────────────────────────
    // 九、脚本清单
    // ─────────────────────────────────────
    parts.push('\n## 九、脚本清单\n');
    parts.push('**scripts/**\n\n```\n');
    listDir('scripts', '.js').forEach(f => {
        const stat = fs.statSync(path.join(ROOT, 'scripts', f));
        parts.push(`${f.padEnd(35)} ${(stat.size / 1024).toFixed(1)} KB\n`);
    });
    parts.push('```\n\n');
    parts.push('**根目录脚本**\n\n```\n');
    ['verify-codes.js'].forEach(f => {
        if (fs.existsSync(path.join(ROOT, f))) {
            const stat = fs.statSync(path.join(ROOT, f));
            parts.push(`${f.padEnd(35)} ${(stat.size / 1024).toFixed(1)} KB\n`);
        }
    });
    parts.push('```\n');

    // ─────────────────────────────────────
    // 十、旧 MD 文档（附录）
    // ─────────────────────────────────────
    parts.push('\n---\n');
    parts.push('\n## 附录：项目里的旧 MD 文档\n');
    parts.push('\n> ⚠️ **以下文档可能已过期**——真实状态以本文档上半部分为准。\n');

    const docs = ['GUIDE.md', 'COURSE-DESIGN.md', 'ARCHITECTURE.md', 'CHANGELOG.md'];
    docs.forEach(doc => {
        const fullPath = path.join(ROOT, doc);
        if (!fs.existsSync(fullPath)) return;
        const stat = fs.statSync(fullPath);
        const mtime = stat.mtime.toISOString().slice(0, 10);
        const content = readFile(doc);
        parts.push(`\n### \`${doc}\`（最后修改 ${mtime}）\n`);
        parts.push(`\n<details>\n<summary>展开查看（可能过期）</summary>\n\n`);
        parts.push('````markdown\n');
        parts.push(content);
        parts.push('\n````\n\n</details>\n');
    });

    return parts.join('');
}

// ============================================
// 生成 02-组件代码.md
// ============================================

function build02() {
    const parts = [];
    parts.push('# 项目打包文档 02 · 组件代码\n');
    parts.push('> 所有 .vue 组件源码\n');

    // slides 组件
    parts.push('\n## 一、slides 组件（版式）\n');
    const slideFiles = listDir('src/components/slides', '.vue');
    const slimSlides = SLIM ? ESSENTIAL_SLIDES : slideFiles;

    if (SLIM) {
        const missing = ESSENTIAL_SLIDES.filter(f => !slideFiles.includes(f));
        if (missing.length) {
            console.warn('⚠️ 白名单里的组件在项目中不存在：', missing);
        }
        const extra = slideFiles.filter(f => !ESSENTIAL_SLIDES.includes(f));
        if (extra.length) {
            console.warn('💡 项目里有新组件不在白名单：', extra);
        }
    }
    slimSlides.forEach(f => {
        if (slideFiles.includes(f)) {
            parts.push(wrap(`src/components/slides/${f}`, readFile(`src/components/slides/${f}`), 'vue'));
        }
    });

    // 自动注册入口
    parts.push('\n### `src/components/slides/index.js`\n');
    parts.push(wrap('src/components/slides/index.js', readFile('src/components/slides/index.js'), 'javascript'));

    // common 组件
    parts.push('\n## 二、common 公共组件\n');
    const commonFiles = listDir('src/components/common', '.vue');
    const slimCommon = SLIM
        ? ['CodeBlock.vue', 'ExtraCard.vue', 'StepWrapper.vue', 'IntroCard.vue',
            'FontScaler.vue', 'MarkerTool.vue', 'SlideCard.vue', 'Badge.vue', 'IconMap.vue']
        : commonFiles;

    slimCommon.forEach(f => {
        if (commonFiles.includes(f)) {
            parts.push(wrap(`src/components/common/${f}`, readFile(`src/components/common/${f}`), 'vue'));
        }
    });

    // animations 组件（只列清单，不贴代码——太长）
    parts.push('\n## 三、animations 组件清单\n');
    parts.push('```\n');
    listDir('src/components/animations', '.vue').forEach(f => {
        const stat = fs.statSync(path.join(ROOT, 'src/components/animations', f));
        parts.push(`${f}  (${(stat.size / 1024).toFixed(1)} KB)\n`);
    });
    parts.push('```\n');
    parts.push('\n> 动画组件代码较长，如需查看请单独提供。\n');

    // level-map 子组件
    parts.push('\n## 四、level-map 子组件\n');
    listDir('src/components/level-map', '.vue').forEach(f => {
        parts.push(wrap(`src/components/level-map/${f}`, readFile(`src/components/level-map/${f}`), 'vue'));
    });

    return parts.join('');
}

// ============================================
// 生成 03-数据样本.md
// ============================================

function build03() {
    const parts = [];
    parts.push('# 项目打包文档 03 · 数据样本\n');
    parts.push('> 课程数据样本，用于理解数据格式\n');

    // 课程蓝图
    parts.push('\n## 一、课程蓝图\n');
    parts.push(wrap('src/data/course-plan.js', readFile('src/data/course-plan.js'), 'javascript'));

    // 数据入口
    parts.push('\n## 二、数据入口\n');
    parts.push(wrap('src/data/index.js', readFile('src/data/index.js'), 'javascript'));

    // 术语聚合
    parts.push('\n## 三、术语聚合\n');
    parts.push(wrap('src/data/glossary.js', readFile('src/data/glossary.js'), 'javascript'));

    // 完整讲次样本
    const lessons = SLIM
        ? ['lesson-02.js']
        : ['lesson-01.js', 'lesson-02.js', 'lesson-17.js'];

    lessons.forEach(l => {
        parts.push(`\n## 四、完整讲次：${l}\n`);
        parts.push(wrap(`src/data/${l}`, readFile(`src/data/${l}`), 'javascript'));
    });

    // 其他讲次清单
    parts.push('\n## 五、所有讲次文件清单\n');
    parts.push('```\n');
    listDir('src/data', '.js').forEach(f => {
        if (f.startsWith('lesson-')) {
            const stat = fs.statSync(path.join(ROOT, 'src/data', f));
            parts.push(`${f}  (${(stat.size / 1024).toFixed(1)} KB)\n`);
        }
    });
    parts.push('```\n');

    // 代码文件清单
    parts.push('\n## 六、.cpp 代码文件清单\n');
    parts.push('```\n');
    const codesDir = path.join(ROOT, 'public/codes');
    if (fs.existsSync(codesDir)) {
        fs.readdirSync(codesDir).sort().forEach(lessonDir => {
            const lessonPath = path.join(codesDir, lessonDir);
            if (fs.statSync(lessonPath).isDirectory()) {
                parts.push(`${lessonDir}/\n`);
                fs.readdirSync(lessonPath).sort().forEach(f => {
                    parts.push(`  ${f}\n`);
                });
            }
        });
    }
    parts.push('```\n');

    return parts.join('');
}

// ============================================
// 生成 04-样式与配置.md
// ============================================

function build04() {
    const parts = [];
    parts.push('# 项目打包文档 04 · 样式与配置\n');

    // styles
    parts.push('\n## 一、样式文件\n');
    listDir('src/styles', '.css').forEach(f => {
        parts.push(wrap(`src/styles/${f}`, readFile(`src/styles/${f}`), 'css'));
    });

    // config
    parts.push('\n## 二、配置文件\n');
    listDir('src/config', '.js').forEach(f => {
        parts.push(wrap(`src/config/${f}`, readFile(`src/config/${f}`), 'javascript'));
    });

    // composables
    parts.push('\n## 三、组合式函数\n');
    listDir('src/composables', '.js').forEach(f => {
        parts.push(wrap(`src/composables/${f}`, readFile(`src/composables/${f}`), 'javascript'));
    });

    // router
    parts.push('\n## 四、路由\n');
    parts.push(wrap('src/router/index.js', readFile('src/router/index.js'), 'javascript'));

    // views
    parts.push('\n## 五、页面视图\n');
    listDir('src/views', '.vue').forEach(f => {
        parts.push(wrap(`src/views/${f}`, readFile(`src/views/${f}`), 'vue'));
    });

    // 入口
    parts.push('\n## 六、入口文件\n');
    parts.push(wrap('src/main.js', readFile('src/main.js'), 'javascript'));
    parts.push(wrap('src/App.vue', readFile('src/App.vue'), 'vue'));

    // 项目配置
    parts.push('\n## 七、项目配置\n');
    parts.push(wrap('package.json', readFile('package.json'), 'json'));
    parts.push(wrap('vite.config.js', readFile('vite.config.js'), 'javascript'));

    return parts.join('');
}

// ============================================
// 生成 05-脚本与待办.md
// ============================================

function build05() {
  const parts = [];
  parts.push('# 项目打包文档 05 · 脚本与待办\n');

  // 脚本
  parts.push('\n## 一、脚本文件\n');
  listDir('scripts', '.js').forEach(f => {
    parts.push(wrap(`scripts/${f}`, readFile(`scripts/${f}`), 'javascript'));
  });

  // 根目录脚本
  parts.push('\n## 二、根目录脚本\n');
  ['verify-codes.js'].forEach(f => {
    if (fs.existsSync(path.join(ROOT, f))) {
      parts.push(wrap(f, readFile(f), 'javascript'));
    }
  });

  // ============================================
  // 【改动】待办从 docs/TODO.md 读取，不再硬编码
  // ============================================
  parts.push('\n---\n');
  parts.push('\n## 三、当前待办与已知问题\n');
  parts.push('\n> 数据源：`docs/TODO.md`（人工维护）\n\n');
  parts.push(readFile('docs/TODO.md'));

  // ============================================
  // 【新增】变更日志
  // ============================================
  parts.push('\n---\n');
  parts.push('\n## 四、变更日志\n');
  parts.push('\n> 数据源：`docs/CHANGELOG.md`（人工维护）\n\n');
  parts.push(readFile('docs/CHANGELOG.md'));

  return parts.join('');
}

// ============================================
// 主流程
// ============================================

ensureDir(OUT);

const tasks = [
    { name: '01-架构与进度.md', fn: build01 },
    { name: '02-组件代码.md', fn: build02 },
    { name: '03-数据样本.md', fn: build03 },
    { name: '04-样式与配置.md', fn: build04 },
    { name: '05-脚本与待办.md', fn: build05 }
];

console.log(`\n${SLIM ? '📦 精简版打包' : '📦 完整版打包'}\n`);
console.log('输出目录：', path.relative(process.cwd(), OUT));
console.log('');

let totalSize = 0;
for (const task of tasks) {
    const content = task.fn();
    const outPath = path.join(OUT, task.name);
    fs.writeFileSync(outPath, content, 'utf8');
    const size = (content.length / 1024).toFixed(1);
    totalSize += parseFloat(size);
    console.log(`✅ ${task.name}  (${size} KB)`);
}

console.log('');
console.log(`📊 总计：${totalSize.toFixed(1)} KB`);
console.log('');

if (totalSize > 200) {
    console.log('⚠️  总大小超过 200KB——建议分批给新对话：');
    console.log('   第一批：01 + 04 + 05');
    console.log('   第二批：02 + 03');
} else if (totalSize > 100) {
    console.log('💡 总大小适中——可以一次性给新对话');
}

console.log('\n🚀 下一步：把 _context/ 目录里的文件发给新对话\n');
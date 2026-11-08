import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const CODES_DIR = path.join(ROOT, 'public', 'codes');

const input = process.argv[2];
if (!input) {
  console.error('\n❌ 错误：请指定从哪一讲开始顺延。用法: node scripts/shift-lessons.js 05\n');
  process.exit(1);
}

const START_OLD = parseInt(input, 10);
if (isNaN(START_OLD)) {
  console.error(`\n❌ 错误："${input}" 不是合法的数字。\n`);
  process.exit(1);
}

const files = fs.readdirSync(DATA_DIR).filter(f => /^lesson-\d+\.js$/.test(f));
const ids = files.map(f => parseInt(f.replace('lesson-', '').replace('.js', ''), 10));
const END_OLD = Math.max(...ids);

if (START_OLD > END_OLD) {
  console.error(`\n❌ 错误：起始讲次 ${START_OLD} 大于当前最大讲次 ${END_OLD}。\n`);
  process.exit(1);
}

console.log(`\n🚀 开始顺延课程 (范围: ${START_OLD} 到 ${END_OLD})...\n`);

// ============================================
// 1. 倒序处理文件夹和文件名
// ============================================
for (let i = END_OLD; i >= START_OLD; i--) {
  const oldId = String(i).padStart(2, '0');
  const newId = String(i + 1).padStart(2, '0');

  const oldJsPath = path.join(DATA_DIR, `lesson-${oldId}.js`);
  const newJsPath = path.join(DATA_DIR, `lesson-${newId}.js`);
  if (fs.existsSync(oldJsPath)) {
    fs.renameSync(oldJsPath, newJsPath);
    console.log(`✅ 数据重命名: lesson-${oldId}.js -> lesson-${newId}.js`);
  }

  const oldCodeDir = path.join(CODES_DIR, `lesson-${oldId}`);
  const newCodeDir = path.join(CODES_DIR, `lesson-${newId}`);
  if (fs.existsSync(oldCodeDir)) {
    fs.renameSync(oldCodeDir, newCodeDir);
    console.log(`✅ 文件夹重命名: codes/lesson-${oldId} -> codes/lesson-${newId}`);
  }
}

// ============================================
// 2. 批量替换内容里的引用路径和标题
// ============================================
console.log('\n🔄 正在更新代码引用与标题文本...\n');

function replaceLessonsInContent(content) {
  let changed = false;
  
  // 倒序替换，防止 "第 5 讲" 替换成 "第 6 讲" 后，又被当作 "第 6 讲" 替换成 "第 7 讲"
  for (let i = END_OLD; i >= START_OLD; i--) {
    const oldId = String(i).padStart(2, '0');
    const newId = String(i + 1).padStart(2, '0');

    // 1. 替换代码引用路径
    const oldCodeStr = `codes/lesson-${oldId}/`;
    const newCodeStr = `codes/lesson-${newId}/`;
    if (content.includes(oldCodeStr)) {
      content = content.replace(new RegExp(oldCodeStr, 'g'), newCodeStr);
      changed = true;
    }

    // 2. 替换标题和章节标签里的文本 (如 "第 5 讲" -> "第 6 讲")
    const textRegex = new RegExp(`第\\s*${i}\\s*讲`, 'g');
    if (textRegex.test(content)) {
      content = content.replace(textRegex, `第 ${i + 1} 讲`);
      changed = true;
    }

    // 3. 替换带 0 补全的文本 (如 "第 05 讲" -> "第 06 讲")
    const textRegexPadded = new RegExp(`第\\s*${oldId}\\s*讲`, 'g');
    if (textRegexPadded.test(content)) {
      content = content.replace(textRegexPadded, `第 ${newId} 讲`);
      changed = true;
    }
  }
  return { content, changed };
}

// 扫描所有 lesson-XX.js
const updatedFiles = fs.readdirSync(DATA_DIR).filter(f => f.startsWith('lesson-') && f.endsWith('.js'));
updatedFiles.forEach(file => {
  const filePath = path.join(DATA_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const { content: newContent, changed } = replaceLessonsInContent(content);
  
  if (changed) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ 内容更新完成: ${file}`);
  }
});

// ============================================
// 3. 更新 course-plan.js
// ============================================
console.log('\n🔄 正在更新课程蓝图 (course-plan.js)...\n');
const planPath = path.join(DATA_DIR, 'course-plan.js');
if (fs.existsSync(planPath)) {
  let planContent = fs.readFileSync(planPath, 'utf-8');
  
  // 替换 id 字段
  for (let i = END_OLD; i >= START_OLD; i--) {
    const oldId = String(i).padStart(2, '0');
    const newId = String(i + 1).padStart(2, '0');
    const regex = new RegExp(`id:\\s*["']${oldId}["']`, 'g');
    if (regex.test(planContent)) {
      planContent = planContent.replace(regex, `id: "${newId}"`);
    }
  }

  // 替换蓝图里的文字
  const { content: newPlanContent } = replaceLessonsInContent(planContent);
  planContent = newPlanContent;

  fs.writeFileSync(planPath, planContent, 'utf-8');
  console.log(`✅ course-plan.js 更新完成。`);
}

// ============================================
// 4. 更新 IndexView.vue 的当前进度
// ============================================
const indexViewPath = path.join(ROOT, 'src', 'views', 'IndexView.vue');
if (fs.existsSync(indexViewPath)) {
  let viewContent = fs.readFileSync(indexViewPath, 'utf-8');
  const regex = /(const\s+CURRENT_LESSON\s*=\s*["'])(\d+)(["'])/;
  const match = viewContent.match(regex);
  if (match && parseInt(match[2]) >= START_OLD) {
    const newCurrent = String(parseInt(match[2]) + 1).padStart(2, '0');
    viewContent = viewContent.replace(regex, `$1${newCurrent}$3`);
    fs.writeFileSync(indexViewPath, viewContent, 'utf-8');
    console.log(`✅ IndexView.vue 当前进度已顺延: ${match[2]} -> ${newCurrent}`);
  }
}

console.log('\n🎉 顺延完毕！请执行以下收尾工作：');
console.log('   1. 运行 npm run index:lessons 重新生成索引。');
console.log('   2. 运行 npm run check:fix 修复 slide 内部 id。\n');
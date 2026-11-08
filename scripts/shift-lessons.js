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

// 1. 倒序处理文件夹和文件名
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

// 2. 替换 lesson-XX.js 里的代码引用路径
console.log('\n🔄 正在更新代码引用路径...\n');
const updatedFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.js'));

updatedFiles.forEach(file => {
  const filePath = path.join(DATA_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  for (let i = END_OLD; i >= START_OLD; i--) {
    const oldId = String(i).padStart(2, '0');
    const newId = String(i + 1).padStart(2, '0');
    const oldStr = `codes/lesson-${oldId}/`;
    const newStr = `codes/lesson-${newId}/`;

    if (content.includes(oldStr)) {
      content = content.replace(new RegExp(oldStr, 'g'), newStr);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ 引用更新完成: ${file}`);
  }
});

// 3. 顺延 course-plan.js 的 ID
console.log('\n🔄 正在更新课程蓝图 (course-plan.js)...\n');
const planPath = path.join(DATA_DIR, 'course-plan.js');
if (fs.existsSync(planPath)) {
  let planContent = fs.readFileSync(planPath, 'utf-8');
  for (let i = END_OLD; i >= START_OLD; i--) {
    const oldId = String(i).padStart(2, '0');
    const newId = String(i + 1).padStart(2, '0');
    // 只匹配 id: "XX" 格式
    const regex = new RegExp(`id:\\s*["']${oldId}["']`, 'g');
    if (regex.test(planContent)) {
      planContent = planContent.replace(regex, `id: "${newId}"`);
    }
  }
  fs.writeFileSync(planPath, planContent, 'utf-8');
  console.log(`✅ course-plan.js 中的 id 已自动顺延。`);
}

// 4. 更新 IndexView.vue 的当前进度高亮
const indexViewPath = path.join(ROOT, 'src', 'views', 'IndexView.vue');
if (fs.existsSync(indexViewPath)) {
  let viewContent = fs.readFileSync(indexViewPath, 'utf-8');
  // 匹配 const CURRENT_LESSON = "05";
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
console.log('   1. 手动检查新插入讲次的 lesson-XX.js 里的 title 和 chapterTag 文本。');
console.log('   2. 运行 npm run index:lessons 重新生成索引。');
console.log('   3. 运行 npm run check:fix 修复 slide id 和 total。\n');
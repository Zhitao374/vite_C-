# 开发指南

> 面向"要动这个项目的人" —— 怎么加内容、加组件、加脚本。

---

## 一、环境准备

```bash
node --version    # 需要 18+
npm install
npm run dev
```

---

## 二、写一讲（最常见）

### 2.1 新建数据文件

**在 `src/data/` 新建 `lesson-XX.js`**：

```js
export default {
  title: '第 XX 讲 讲次标题',
  subtitle: '一句话描述',
  total: 30,
  category: '语法与基础算法',
  slides: [
    { id: 1, type: 'cover', title: '...', subtitle: '...', data: {...} },
    { id: 2, type: 'timeline', variant: 'review', ... },
    // ...
  ]
};
```

### 2.2 常用版式的数据格式

**grid** —— 卡片矩阵：
```js
{
  id: X, type: 'grid',
  title: '...',
  data: {
    cards: [
      { icon: '🎯', title: '...', desc: '...' },
      // ...
    ],
    footer: '...'   // 可选
  }
}
```

**code-split** —— 代码 + 注释：
```js
{
  id: X, type: 'code-split',
  title: '...',
  data: {
    intro: '...',
    codeFile: 'codes/lesson-XX/xxx.cpp',
    snippet: 'main',
    annotations: [
      { line: 6, title: '...', desc: '...' },
      // ...
    ],
    output: '...',
    footer: '...'   // 可选
  }
}
```

**level-map** —— 练习题：
```js
{
  id: X, type: 'level-map',
  title: '...',
  data: {
    question: { title: '题干', desc: '...', timer: '⏱ 限时 X 分钟' },
    hints: ['...', '...'],
    answer: { codeFile: 'codes/lesson-XX/xxx.cpp' },
    analysis: { title: '📖 解析', desc: '...' },
    footer: '...'   // 可选
  }
}
```

**完整版式清单** → `docs/PATTERNS.md`

### 2.3 放 .cpp 文件

**`public/codes/lesson-XX/xxx.cpp`** —— 每个代码块一个文件。

**代码里可以用 snippet 标记**：

```cpp
// @snippet-start main
int main() {
    // ...
}
// @snippet-end main
```

**数据里用 `snippet: 'main'` 引用** —— 只展示片段。

### 2.4 预览

```bash
npm run dev
# 打开 /#/lesson/XX
```

### 2.5 检查

```bash
node scripts/help.js check:all
```

**检查项**：
- 代码编译
- id 连续
- HTML 配对
- 术语表

---

## 三、加一个新版式（组件）

### 3.1 命名约定

**新建 `src/components/slides/XxxSlide.vue`** —— **自动注册**为 `xxx` type。

| 文件名 | 注册的 type |
|---|---|
| `CoverSlide.vue` | `cover` |
| `CodeSplitSlide.vue` | `code-split` |
| `BigNumberSlide.vue` | `big-number` |

### 3.2 组件模板

```vue
<template>
  <SlideShell :slide="slide">
    <!-- 内容 -->
    <StepWrapper v-for="(item, i) in items" :key="i" :step="i + 1">
      <div>{{ item }}</div>
    </StepWrapper>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const d = computed(() => props.slide.data || {});
const items = computed(() => d.value.items || []);

useStepCount(() => items.value.length);
</script>
```

### 3.3 用 SlideShell 的好处

- **自动处理**：标题 / 副标题 / 章节标签 / extra
- **自动追加**：`extra` 折叠卡（可通过 `:auto-extra="false"` 关闭）
- **统一样式**：`.slide` / `.slide-title` / `.slide-body`

### 3.4 支持 footer

**参考 `GridSlide.vue`**：

```vue
<StepWrapper v-if="footer" :step="footerStep">
  <SlideFooter :html="footer" />
</StepWrapper>
```

**脚本**：
```js
const footer = computed(() => d.value.footer);
const footerStep = computed(() => items.value.length + 1);
useStepCount(() => items.value.length + (footer.value ? 1 : 0));
```

---

## 四、加一个脚本

**在 `scripts/` 新建 `xxx.js`** —— 用 ESM 格式。

**模板**：

```js
#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// 你的逻辑
```

**加入 `help.js`** —— 在 `COMMANDS` 里加一项。

---

## 五、常见任务速查

| 任务 | 命令 |
|---|---|
| 开发 | `npm run dev` |
| 构建 | `npm run build` |
| 检查全部 | `node scripts/help.js check:all` |
| 修 id | `node scripts/help.js fix:ids` |
| 修注释编号 | `node scripts/help.js fix:comments` |
| 修 HTML | `node scripts/help.js fix:html` |
| 编译 .cpp | `node scripts/help.js verify` |
| 生成索引 | `node scripts/help.js index` |
| 打包给 AI | `node scripts/help.js pack` |
| 交互菜单 | `npm run help` |

---

## 六、CSS 变量速查

**最常用的**：

| 变量 | 用途 |
|---|---|
| `--font-scale` | 字号缩放（1/0.9/1.15/1.3）|
| `--primary` | 主色（蓝）|
| `--accent` | 强调色（橙）|
| `--fs-card-title` | 卡片标题字号 |
| `--fs-card-desc` | 卡片描述字号 |
| `--space-gap-md` | 标准间距 |

**完整清单** → `src/styles/theme.css`

---

## 七、常见坑

| 坑 | 解法 |
|---|---|
| 组件多根节点，`<transition>` 空白 | 包一层 `<div>` |
| extra 双渲染 | 组件的 `<SlideShell>` 加 `:auto-extra="false"` |
| `**` 显示原文 | 用 `<b>` 替代 |
| 图片不显示 | 检查 `public/static/` 路径 |
| id 不连续 | 跑 `fix:ids` |
| 注释编号错 | 跑 `fix:comments` |
| HTML `</div>` 孤儿 | 跑 `fix:html` |

---

## 八、文档导航

| 想了解 | 看 |
|---|---|
| 架构 | `docs/ARCHITECTURE.md` |
| 版式选择 | `docs/PATTERNS.md` |
| 内容优化 | `docs/LESSON-SOP.md` |
| 课程设计 | `docs/COURSE-DESIGN.md` |
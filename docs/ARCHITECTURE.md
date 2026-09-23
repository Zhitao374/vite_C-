# 项目架构（ARCHITECTURE.md）

> **用途**：项目维护、组件开发、样式调整的**技术参考**。
> **读者**：开发者、维护者。
> **不包含**：数据格式、课程内容规则（见 GUIDE.md / COURSE-DESIGN.md）。
> **最后更新**：2026-09（v3.0 阶段一完成）

---

## 目录

1. [技术栈](#一技术栈)
2. [目录结构](#二目录结构)
3. [渲染流程](#三渲染流程)
4. [组件体系](#四组件体系)
5. [动画系统](#五动画系统)
6. [术语表系统](#六术语表系统) ← 新增
7. [样式约定](#七样式约定)
8. [配置](#八配置)
9. [脚本](#九脚本)
10. [架构常见错误](#十架构常见错误)

---

## 一、技术栈

| 项 | 技术 |
|---|---|
| 框架 | Vue 3（Composition API） |
| 构建 | Vite |
| 路由 | Vue Router（Hash 模式） |
| 样式 | 原生 CSS + CSS 变量主题 |
| 数据 | JS 模块（`src/data/lesson-XX.js`） |
| 代码 | 外部 `.cpp` 文件（`public/codes/lesson-XX/`） |
| 动画 | Vue 组件（`src/components/animations/`） |
| 术语 | 页内 glossary 页 + 全局 `/glossary`（自动聚合） |

---

## 二、目录结构

```
C_Vite/
├── public/
│   ├── codes/lesson-XX/       # 外部 .cpp 文件
│   └── static/                # 图片、SVG
├── scripts/
│   ├── check-codes.js
│   └── glossary-report.js     # ← 术语检查脚本
├── src/
│   ├── components/
│   │   ├── common/            # 公共 UI
│   │   ├── level-map/         # 练习页子组件
│   │   ├── animations/        # 动画组件（10 个）
│   │   └── slides/            # 版式组件（自动注册，17 种）
│   ├── composables/           # 组合式函数
│   ├── config/                # 配置
│   ├── data/
│   │   ├── index.js           # 自动导入所有讲次
│   │   ├── course-plan.js     # ← 课程蓝图（57 讲）
│   │   ├── glossary.js        # ← 全局术语聚合
│   │   └── lesson-XX.js
│   ├── lib/                   # 工具函数
│   ├── router/
│   ├── styles/                # 10 个 CSS 文件
│   └── views/
│       ├── SlideView.vue
│       ├── IndexView.vue
│       ├── LessonView.vue
│       └── GlossaryView.vue   # ← 全局术语表
├── verify-codes.js
├── package.json
├── vite.config.js
└── ...
```

---

## 三、渲染流程

```
URL: /slide/:lesson/:slide
  ↓
useSlide.js → 加载 lesson-XX.js → 提取 slide 数据
  ↓
SlideView.vue → 按 slide.type 匹配组件
  ↓
组件读取 slide.data → 渲染
  ↓
（如有 codeFile）CodeBlock → useCodeLoader → fetch .cpp → snippet 提取 → 渲染
  ↓
（如为动画）AnimationFrame → 缩放 → 动画组件渲染
  ↓
（如为 glossary）GlossarySlide → 按 category 分组 → 渲染
  ↓
useStepCount → provideStep → StepWrapper 控制分步
```

**新增 `glossary` 类型**：从 `slide.data.words` 读取，按 `category` 分组渲染。

**术语表路由 `/glossary`**：
```
URL: /glossary
  ↓
GlossaryView.vue → import { allWords } from '@/data/glossary.js'
  ↓
glossary.js → 遍历所有 lesson.slides，找 type='glossary' 页 → 聚合 words
  ↓
渲染：搜索 + 分类筛选 + 词条网格
```

---

## 四、组件体系

### 4.0 Slide 组件的三层结构（强制约定）

所有 slide 组件共享统一的三层结构，样式由 `layout.css` 统一提供：

```
.slide（外层容器，layout.css 提供 padding + flex）
├── .slide-title + .slide-subtitle（标题区）
└── .slide-body（内容区，自带滚动 + 子元素间距）
```

**新组件开发流程**：

1. 先打开一个现有组件（如 `GridSlide.vue`）看结构
2. **原样复制**这三层骨架
3. 只改 `.slide-body` 里的内容
4. **不要**自造 `.xxx-slide` / `.slide-header` / `.slide-content`

**反例**（错误做法）：
- ❌ 自造 `.split-slide` 外层
- ❌ 自造 `.slide-header` 包标题
- ❌ 自造 `.slide-content` 加 padding

### 4.1 slides/index.js 自动注册

```js
const modules = import.meta.glob([
  './*Slide.vue',
  '../animations/*Slide.vue'
], { eager: true });

Object.entries(modules).forEach(([path, mod]) => {
  const name = path.match(/\/([^/]+)\.vue$/)[1];
  const type = name
    .replace(/Slide$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
  slideComponents[type] = mod.default;
});
```

**规则**：
- 组件文件名必须以 `Slide.vue` 结尾
- `XxxSlide.vue` → `type: 'xxx'`
- `XxxYyySlide.vue` → `type: 'xxx-yyy'`
- 支持子目录（`animations/`）
- 加新组件**只需建文件**，无需改注册

**当前 17 种组件**：

| 组件 | type |
|---|---|
| CoverSlide | `cover` |
| GridSlide | `grid` |
| DialogSlide | `dialog` |
| CodeSplitSlide | `code-split` |
| CompareSlide | `compare` |
| FlowSlide | `flow` |
| TimelineSlide | `timeline` |
| SplitSlide | `split` |
| BigNumberSlide | `big-number` |
| LevelMapSlide | `level-map` |
| QuoteSlide | `quote` |
| RadialSlide | `radial` |
| TransitionSlide | `transition` |
| EndingSlide | `ending` |
| QuizSlide | `quiz` |
| EvolutionSlide | `evolution` |
| **GlossarySlide** | **`glossary`** ← 新增 |

### 4.2 公共组件

```
src/components/common/
├── Badge.vue           # 徽章
├── CodeBlock.vue       # 代码块（支持 snippet + highlightLine）
├── ExtraCard.vue       # 知识扩展卡片
├── FontScaler.vue      # 字体缩放工具
├── IntroCard.vue       # 引入卡片（蓝色竖线风格）
├── MarkerTool.vue      # 画笔工具
├── SlideCard.vue       # 通用卡片容器
└── StepWrapper.vue     # 分步显隐包装器
```

**关键组件**：

| 组件 | 关键 prop / 行为 |
|---|---|
| `CodeBlock` | `code` / `codeFile` / `snippet` / `highlightLine` / `density` / `title` |
| `ExtraCard` | `title` / `desc` / `variant` / `defaultExpanded` |
| `StepWrapper` | `step` / `tag`；显示时自动滚动到最近滚动父容器 |
| `IntroCard` | `html`（v-html 渲染） |
| `FontScaler` | 修改 `--font-scale`（4 档），所有用该变量的字号自动缩放 |

### 4.3 level-map 子组件

```
src/components/level-map/
├── HintRow.vue         # 提示行
└── LevelNode.vue       # 关卡节点
```

### 4.4 composables

```
src/composables/
├── useStep.js          # 步数状态（current / max / next / prev）
├── useStepCount.js     # 步数上报
├── useSlide.js         # slide 加载
├── useSlideNav.js      # 导航（键盘/点击）
├── useCodeLoader.js    # .cpp 文件加载
├── useHighlight.js     # 语法高亮
└── useCopy.js          # 复制
```

**关键约定**：

| 项 | 值 |
|---|---|
| `current` 起始 | 1（不是 0） |
| `useStepCount` 上报 | `emit('step-count', n)` |
| `step <= current` | 显示 |

---

## 五、动画系统

### 5.1 架构

```
src/components/animations/
├── AnimationFrame.vue                 # 共用骨架
├── HanoiAnimationSlide.vue
├── StackAnimationSlide.vue
├── QueueAnimationSlide.vue
├── SortAnimationSlide.vue
├── LinkedListAnimationSlide.vue
├── TreeAnimationSlide.vue
├── BinarySearchAnimationSlide.vue
├── GraphAnimationSlide.vue
├── DPTableAnimationSlide.vue
└── FunctionCallAnimationSlide.vue    # 函数调用栈

src/lib/
└── tree-layout.js                     # 树布局算法
```

### 5.2 三种动画实现模式

| 模式 | 适用场景 | 动画机制 |
|---|---|---|
| **FLIP** | 一维序列（栈、队列、排序、链表） | `flex` / `grid` + `<TransitionGroup>` 自动 FLIP |
| **绝对定位** | 二维结构（汉诺塔、树、图） | 绝对定位 + CSS `transition` |
| **表格** | 二维网格（DP） | CSS Grid + 逐个格子过渡 |

**选择原则**：
- 元素**顺序**变化 → FLIP（零坐标计算）
- 元素**二维位置**变化 → 绝对定位
- **静态网格** + 格子填充 → Grid

### 5.3 AnimationFrame 双层缩放

**问题**：不同屏幕尺寸下，舞台需要自适应。

**方案**：双层结构

```
.stage-wrap（可视边框，宽度 100%，比例 620:400）
└── .stage（固定 620×400，transform: scale 缩放）
```

**实现**：

```js
const LOGICAL_W = 620;
const LOGICAL_H = 400;

// ResizeObserver 监听容器宽度，动态设置 scale
scale = containerWidth / LOGICAL_W;
stageEl.style.transform = `scale(${scale})`;
```

**收益**：动画组件**无需处理响应式**——坐标始终基于 620×400。

### 5.4 动画组件的通用结构

```vue
<template>
  <AnimationFrame :slide="slide">
    <template #stage="{ currentStep }">
      <div class="xxx-stage">
        <!-- 具体动画渲染 -->
      </div>
    </template>
  </AnimationFrame>
</template>

<script setup>
import AnimationFrame from './AnimationFrame.vue';
defineProps({ slide: { type: Object, required: true } });
</script>

<style scoped>
/* 组件专属样式 */
</style>
```

**每个动画 80—250 行。**

---

## 六、术语表系统

### 6.1 架构总览

```
┌─────────────────────────────────────────┐
│ 数据层：每讲 lesson-XX.js 里的 glossary 页 │
│        （type: 'glossary'）              │
│        一处编写，自动聚合                   │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌───────────────┐  ┌──────────────────┐
│ 页内单词页     │  │ 全局术语表        │
│ GlossarySlide │  │ GlossaryView     │
│ （第 17 种）  │  │ （/glossary 路由）│
└───────────────┘  └──────────────────┘
```

### 6.2 数据层

**数据只存一处**——在 `lesson-XX.js` 的 `slides` 里，找 `type: 'glossary'` 的页：

```js
{
  id: 28, type: 'glossary', title: '本讲英文单词',
  data: {
    words: [
      { word: 'if', cn: '如果', pron: '/ɪf/', origin: '英文原意"如果"', category: '关键字' }
    ],
    extra: { ... }
  }
}
```

**顶层不再有 `glossary` 字段**——避免两处数据源。

### 6.3 聚合层：`src/data/glossary.js`

```js
import { lessons } from './index.js';

export const GLOSSARY_CATEGORIES = [
  '关键字', '类型', '函数', '运算符', '语句', '概念'
];

// 从 lesson.slides 提取 glossary 页
function extractFromLesson(lesson) {
  if (!Array.isArray(lesson.slides)) return [];
  const page = lesson.slides.find(s => s.type === 'glossary');
  return page?.data?.words || [];
}

// 聚合所有词条（按 word 去重）
export const allWords = (() => {
  const words = [];
  const seen = new Map();

  Object.keys(lessons).sort().forEach(key => {
    const lessonId = key.replace('lesson-', '');
    const list = extractFromLesson(lessons[key]);

    list.forEach(item => {
      const w = (item.word || '').toLowerCase();
      if (!w) return;

      if (!seen.has(w)) {
        seen.set(w, lessonId);
        words.push({
          ...item, word: w, firstLesson: lessonId, allLessons: [lessonId]
        });
      } else {
        const existing = words.find(x => x.word === w);
        if (existing && !existing.allLessons.includes(lessonId)) {
          existing.allLessons.push(lessonId);
        }
      }
    });
  });

  return words;
})();

// 按分类分组
export const wordsByCategory = (() => { /* ... */ })();

// 按讲次分组
export const wordsByLesson = (() => { /* ... */ })();

// 搜索
export function searchWords(query) { /* ... */ }

// 统计
export const glossaryStats = { /* ... */ };
```

**关键设计**：

| 项 | 决策 |
|---|---|
| 读取方式 | 从 `lessons` 对象**同步读取**（`eager: true`） |
| 聚合时机 | 模块加载时计算一次 |
| 去重 | 按 `word` 去重，记录 `firstLesson` 和 `allLessons` |
| 分类顺序 | `GLOSSARY_CATEGORIES` 固定 6 类 |

### 6.4 展示层 1：`GlossarySlide.vue`

- 位置：`src/components/slides/GlossarySlide.vue`
- 数据源：`slide.data.words`
- 按 `category` 分组渲染
- **所有字号必须用 `var(--fs-xxx)` 或 `calc(XXpx * var(--font-scale))`**，否则 FontScaler 失效
- 词条卡片用 `min-height` 保证一致高度

### 6.5 展示层 2：`GlossaryView.vue`

- 位置：`src/views/GlossaryView.vue`
- 路由：`/glossary`
- 数据源：`@/data/glossary.js`
- 功能：搜索、分类筛选、跳转到首现讲次
- 入口：`IndexView.vue` 顶部"📖 术语表"按钮

### 6.6 检查脚本：`scripts/glossary-report.js`

**用途**：手动读取所有课程的 glossary，生成报告、检测问题、导出数据。

**用法**：

```bash
node scripts/glossary-report.js               # 完整报告
node scripts/glossary-report.js --stats       # 只统计
node scripts/glossary-report.js --check       # 只检查
node scripts/glossary-report.js --export      # 导出 JSON
node scripts/glossary-report.js --csv         # 导出 CSV
node scripts/glossary-report.js lesson-01    # 只处理某一讲
```

**技术方案**：用 `pathToFileURL` + 动态 `import()` 加载 `.js` 数据，不用正则解析。

**检查项**：

- 必填字段（`word` / `cn` / `category`）
- 分类是否合法（6 类之一）
- 关键字是否全小写
- 词条是否与之前讲次重复
- 数量是否在 4—8 之间

---

## 七、样式约定

### 7.1 目录

```
src/styles/
├── main.css            # 入口
├── theme.css           # 变量
├── reset.css           # 重置
├── layout.css          # 布局
├── components.css      # 通用组件
├── animation.css       # 动画
├── syntax.css          # 代码高亮
├── pages.css           # 页面级
├── responsive.css      # 响应式
└── print.css           # 打印
```

### 7.2 关键 CSS 变量

**字号**（全部含 `calc(XXpx * var(--font-scale))`）：

| 变量 | 用途 |
|---|---|
| `--fs-slide-title` | 页标题 |
| `--fs-slide-subtitle` | 页副标题 |
| `--fs-card-title` | 卡片标题 |
| `--fs-card-desc` | 卡片正文 |
| `--fs-code` | 代码字号 |
| `--fs-quiz-*` | 小测 |
| `--fs-bubble` | 对话气泡 |

**颜色**：

| 变量 | 用途 |
|---|---|
| `--primary` / `--accent` | 主色 / 强调色 |
| `--success` / `--error` | 成功 / 错误 |
| `--text-main` / `--text-sub` / `--text-dim` | 文字层级 |
| `--card-border` / `--card-shadow` | 卡片 |

**间距**：

| 变量 | 用途 |
|---|---|
| `--space-slide-padding` | 页面内边距 |
| `--space-card-padding-y / x` | 卡片内边距 |
| `--space-gap-md / lg` | 间距 |

**字号缩放**：所有 `calc(XXpx * var(--font-scale))`，4 档缩放。

### 7.3 chapterTag 绝对定位

```css
.chapter-tag {
  position: absolute;
  top: 18px;
  right: 140px;
  z-index: 10;
  padding: 5px 16px;
  background: var(--primary-soft);
  border-radius: 999px;
  ...
}
```

**v1.5 变更**：从"独占一行"改为"绝对定位到右上角"，节省 44px 垂直空间。

### 7.4 滚动策略

| 组件 | 滚动方式 |
|---|---|
| CodeSplitSlide | 左右独立滚动（`.scroll-pane`） |
| AnimationFrame | 舞台固定 + extra 独立滚动（`max-height: 40vh`） |
| IndexView | 整页滚动（`.index-page` 设 `overflow-y: auto`） |
| GlossaryView | 整页滚动 |
| 其他 | 整体滚动（`.slide-body`） |

---

## 八、配置

```
src/config/
├── index.js
├── characters.js      # 角色
├── colors.js          # 画笔颜色
├── defaults.js        # DEFAULT_LEVELS / TYPE_LABELS / DEFAULT_STAGE_SIZE
├── labels.js          # UI 文案
└── schemas.js         # 数据校验
```

**角色定义**：

| key | avatar | speaker |
|---|---|---|
| `student` | 🧑 | 同学 |
| `robot` | 🤖 | 小 C |
| `teacher` | 👨‍🏫 | 老师 |
| `xiaoma` | 🧑‍💻 | 小码 |

---

## 九、脚本

### 9.1 `verify-codes.js`

**用途**：批量验证 `.cpp` 文件编译 + 检查引用完整性。

**用法**：

```bash
node verify-codes.js                      # 只编译
node verify-codes.js --check              # 编译 + 引用检查 + 询问删除多余
node verify-codes.js --check --yes        # 不问直接删
node verify-codes.js --check --dry        # 只显示
node verify-codes.js lesson-08            # 只处理某一讲
```

**功能**：

1. 编译所有 `.cpp` 文件
2. 检查 lesson-XX.js 引用的 `.cpp` 是否存在
3. 检查 lesson-XX/ 目录下多余的 `.cpp`
4. 发现多余文件时自动询问是否删除（只删课程目录，不动其他）

### 9.2 `scripts/glossary-report.js`

**用途**：术语表检查、统计、导出。

**用法**：

```bash
node scripts/glossary-report.js               # 完整报告
node scripts/glossary-report.js --stats       # 只统计
node scripts/glossary-report.js --check       # 只检查
node scripts/glossary-report.js --export      # 导出 JSON
node scripts/glossary-report.js --csv         # 导出 CSV
node scripts/glossary-report.js lesson-01    # 只处理某一讲
```

**输出目录**：`scripts/output/`（建议加入 `.gitignore`）

### 9.3 `scripts/check-codes.js`

待补充。

---

## 十、架构常见错误

### 10.1 组件注册失败

**症状**："未注册的版式：xxx"

**排查**：
- 文件名是否 `XxxSlide.vue`？
- 是否在 `src/components/slides/` 或 `src/components/animations/` 下？
- 重启 Vite（glob 变化需重启）

### 10.2 Grid 卡片高度不一

**修复**：GridSlide 里给 `.step-wrapper` 加 `height: 100%`

### 10.3 MarkerTool 拖动后跟随鼠标

**修复**：
- 用 `setPointerCapture` 把指针锁定到触发按钮
- 事件挂到按钮上
- 加 `window.blur` 兜底

### 10.4 舞台缩放不生效

**排查**：
- `.stage-wrap` 有 `aspect-ratio: 620 / 400`？
- `.stage` 有 `transform-origin: top left`？
- `ResizeObserver` 是否正确初始化？

### 10.5 动画组件样式溢出

**排查**：
- 元素用 `position: absolute` 时，父容器是否有 `overflow: hidden`？
- 是否用了 `transform: scale` 但没设 `transform-origin`？

### 10.6 `<TransitionGroup>` 进入/离开不生效

**排查**：
- 是否用 `<TransitionGroup>` 而不是 `<Transition>`？
- `name` 和 CSS 类名是否匹配（如 `name="stack"` → `.stack-enter-from`）？
- scoped 样式需 `:deep(.stack-enter-from)`？

### 10.7 元素 transition 冲突

**症状**：FLIP 交换时元素抖动或跳变

**原因**：元素同时有 `transition: all` 和 `<TransitionGroup>` 的 `transform`

**修复**：明确指定属性（如 `transition: left, bottom, box-shadow`），不用 `all`

### 10.8 IndexView 页面无法滚动

**症状**：课程目录内容超出，但无法滚动

**原因**：外层容器有 `overflow: hidden` 或高度固定

**修复**：
```css
.index-page {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 24px 60px;
}
```

### 10.9 GlossarySlide 字号按钮失效

**症状**：FontScaler 点击后单词页字号不变

**原因**：组件内字号写死 `px`，没接入 `--font-scale`

**修复**：
```css
/* ❌ 错误 */
.word { font-size: 16px; }

/* ✅ 正确 */
.word { font-size: var(--fs-card-title); }
/* 或 */
.word { font-size: calc(16px * var(--font-scale)); }
```

**注意**：项目 `theme.css` 里的所有 `--fs-xxx` 变量**已经内置 `calc(XXpx * var(--font-scale))`**，直接引用即可。

### 10.10 GlossarySlide 词条高矮不一

**症状**：同一分组内，词条卡片高度不同

**原因**：词条内容行数不同，没设 `min-height`

**修复**：
```css
.word-item {
  min-height: calc(72px * var(--font-scale));
  box-sizing: border-box;
}
```

### 10.11 GlossarySlide 词条左右留白不均

**症状**：同一分组内，词条宽度不一致

**原因**：用了 `auto-fill`，产生"空列占位"

**修复**：
```css
/* ❌ auto-fill 会创建空列 */
grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));

/* ✅ auto-fit 不占空列 */
grid-template-columns: repeat(auto-fit, minmax(220px, 260px));
```

### 10.12 全局术语表数据不更新

**症状**：新增讲次后 `/glossary` 没有新词条

**原因**：`src/data/index.js` 用了 `import.meta.glob('./lesson-*.js', { eager: true })`，**新增 lesson 文件时需要重启 Vite**

**修复**：重启 dev server（Ctrl+C → npm run dev）

### 10.13 术语聚合去重错误

**症状**：同一个词在不同讲次出现，但全局表只显示一次且 `allLessons` 不完整

**原因**：`glossary.js` 的去重逻辑有 bug

**修复**：检查 `seen` Map 的 key 是否用了 `word.toLowerCase()`，并确保 `existing.allLessons.push` 逻辑正确。

---

**ARCHITECTURE.md 结束。数据格式见 GUIDE.md，课程结构见 COURSE-DESIGN.md，历史记录见 CHANGELOG.md。**
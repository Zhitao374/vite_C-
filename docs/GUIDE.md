# C++ 课程生成指南（GUIDE.md）

> **用途**：AI 生成讲次数据、教师编写讲次内容的**唯一参考**。
> **读者**：AI 模型、写讲次的教师、新加入的内容创作者。
> **不包含**：项目架构、组件实现、历史记录（见 ARCHITECTURE.md / CHANGELOG.md）。
> **最后更新**：2026-09（v3.0 阶段一完成，17 种组件）

---

## 目录

1. [项目背景](#一项目背景)
2. [生成一讲的流程](#二生成一讲的流程)
3. [数据格式](#三数据格式)
4. [17 种组件字段](#四17-种组件字段)
5. [动画数据格式](#五动画数据格式)
6. [内容设计规则](#六内容设计规则)
7. [课程结构参考](#七课程结构参考)
8. [伏笔方法](#八伏笔方法)
9. [难度曲线](#九难度曲线)
10. [自检清单](#十自检清单)
11. [数据格式常见错误](#十一数据格式常见错误)

---

## 一、项目背景

### 1.1 课程目标

| 项 | 内容 |
|---|---|
| 课程名 | 《小C的C++冒险》 |
| 对象 | 6年级—初二，学过 Scratch，零 C++ 基础 |
| 目标 | 零基础 → CSP-J 一等奖 → CSP-S 入门 → NOIP 长线 |
| 总讲次 | 约 57 讲（详见 COURSE-DESIGN.md） |
| 每讲时长 | **120 分钟** |
| 每讲页数 | **28—30 页** |
| 角色 | 小C（机器人）、同学（学习者）、老师、小码 |

### 1.2 底层目的（4 条，不可妥协）

1. **为只学过图形化的学生教学 C++**
2. **使之具备参加比赛的能力**
3. **课堂知识点覆盖竞赛知识**
4. **内容丰富有趣，知识面扩展**

**判断一讲好不好的最终依据是这 4 条**，不是任何固定清单。

### 1.3 每讲核心理念

**每讲 1 个核心抽象概念 + 2—4 个子知识点 + 伏笔链。**

例（第 6 讲数组）：
- 核心抽象概念：数组 = 储物柜
- 子知识点：定义、访问、遍历、越界
- 伏笔：连续内存（为第 27 讲指针铺垫）

---

## 二、生成一讲的流程

```
① 查 COURSE-DESIGN.md → 确定本讲主题、核心概念、子知识点、难度
② 查本文档第四章 → 确定数据格式、组件字段
③ **【新增】打开一个现有同类型组件，看它的三层结构**
④ 查上一讲 radial 页 → 确定衔接点
⑤ 按 COURSE-DESIGN 5.1 页面结构 → 列出页面大纲
⑥ 逐页填数据（本文档第四章字段规范）
⑦ 检查难度负荷（COURSE-DESIGN 第三章）
⑧ 应用伏笔（埋 1 收 1，见本文档第八章）
⑨ 自检（本文档第十章 + COURSE-DESIGN 第八章）
⑩ 验证：node verify-codes.js lesson-XX
⑪ 检查术语：node scripts/glossary-report.js lesson-XX --check
```

**关键提醒**：

- **不要一次生成 28 页**——先生成 4 页大纲，确认后再填
- **每讲先想"核心抽象概念 + 生活类比"**，再考虑代码
- **超纲内容用"初赛渗透 + 伏笔"处理**，不要硬塞

---

## 三、数据格式

### 3.1 讲次顶层结构

```js
export default {
  title: '第 N 讲 主题',           // 必填
  subtitle: '副标题',              // 必填
  total: 30,                       // 必填，等于 slides.length
  category: '语法与基础算法',      // 必填
  slides: [ /* ... */ ]
};
```

**category 取值**（与 COURSE-DESIGN 一致）：

| 阶段 | 讲次 | category |
|---|---|---|
| 一、编程基础 | 1—10 | `语法与基础算法` |
| 二、算法入门 | 11—24 | `语法与基础算法` |
| 三、数据结构 | 25—35 | `数据结构与搜索` |
| 四、竞赛进阶 | 36—50 | `DP 与图论进阶` |
| 五、冲刺实战 | 51+ | `竞赛冲刺` |

### 3.2 slide 通用结构

```js
{
  id: N,                           // 必填，从 1 开始，连续
  type: 'xxx',                     // 必填
  title: '标题',                   // 必填
  subtitle: '副标题',              // 可选
  chapterTag: '第 N 讲 · xxx',     // 可选
  data: { /* 各类型专属 */ }
}
```

### 3.3 chapterTag 规则

| 值 | 效果 |
|---|---|
| 省略 / `false` | 不显示 |
| 字符串（`'第 1 讲 · 概念理解'`） | 显示为**右上角绝对定位标签** |

**常用值**：
`概念理解` / `代码拆解` / `实战演练` / `OJ 实战` / `输入输出` / `概念铺垫` / `易错点` / `知识讲解` / `初赛渗透` / `答疑` / `复习` / `课堂小测` / `下节预告` / `过程演示` / `选讲`

### 3.4 可选字段默认值

**数组类**（缺省为 `[]`）：
`annotations` / `groups` / `cards` / `items` / `lines` / `points` / `hints` / `questions` / `options` / `words`

**对象类**：

| 字段 | 默认 |
|---|---|
| `extra.variant` | `'card-primary'` |
| `answer.title` | `'✅ 参考代码'` |

### 3.5 HTML 与字符串

#### 3.5.1 HTML 渲染规则

| 字段 | 渲染方式 | HTML |
|---|---|---|
| `title`（各组件内） | 纯文本 | ❌ |
| `desc`（各组件内） | `v-html` | ✅ |
| `extra.desc` | `v-html` | ✅ |
| `lines[].text` | `v-html` | ✅ |
| `groups[].wrong/right` | `v-html` | ✅ |
| `cards[].desc` | `v-html` | ✅ |
| `points[]` | `v-html` | ✅ |
| `annotations[].title / desc` | `v-html` | ✅ |
| `words[].word / cn / origin` | 纯文本 | ❌ |

**统一规则**：`<` 用 `&lt;`、`>` 用 `&gt;`、`&` 用 `&amp;`。

**wiki 链接**：

```html
<a href="https://baike.baidu.com/item/词条" target="_blank" class="wiki-link">显示文字</a>
```

**每段最多 5 个链接。**

#### 3.5.2 字符串转义

| 想显示 | 应写 |
|---|---|
| `\n` | `'\\n'` |
| `\t` | `'\\t'` |
| `\` | `'\\\\'` |

**引号风格**：外层单引号，内部单引号 `\'` 转义，双引号不转义。

### 3.6 代码文件引用

**核心规则**：**所有可独立编译的代码都用 `codeFile`**，数据里不写内联 `code`。

```js
codeFile: 'codes/lesson-XX/xxx.cpp'
```

**路径规则**：

- 不加 `public/` 前缀
- 不以 `/` 开头
- 相对 `public/` 目录

**迁移判断（三档）**：

| 档 | 特征 | 处理 |
|---|---|---|
| A | 已有 `#include` + `main` | ✅ 直接迁移 |
| B | 缺头部但逻辑完整 | ✅ 迁移 + 补头部 + snippet 标记 |
| C | 纯片段（无 I/O 逻辑） | ❌ 保持内联（如 evolution 的表达式演示） |

**口诀**：有输入输出逻辑 → 迁；只有表达式 → 留。

### 3.7 snippet 使用规则（更新）

**核心规则**：
- 代码 ≤ 20 行 → 不用 snippet，显示整个文件
- 代码 > 20 行 → 用一段 snippet 覆盖关键区域
- 关键区域不连续 → 用一段 snippet 覆盖从起点到终点的区域，中间用 `// ...` 表示省略
- 必须显示两段 → 拆成两页，或改用 split 组件

**禁止**：
- ❌ 一个 .cpp 里写多个同名 snippet（只显示第一段）
- ❌ 为了显示两段代码而滥用 snippet

**判断口诀**：
「短代码整段显，长代码一段包，不连续用省略，必须两段拆两页」

**用途**：`.cpp` 文件完整可编译，页面上只显示教学片段。

**标记格式**：

```cpp
#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int score;
    cin >> score;

    if (score >= 60) {
        cout << "及格" << endl;
    }
    // @snippet-end main
    return 0;
}
```

**三条规则**：独占一行、成对出现、标记行不显示。

**JS 引用**：

```js
{
  type: 'code-split',
  data: {
    codeFile: 'codes/lesson-04/if-single.cpp',
    snippet: 'main',
    annotations: [...]
  }
}
```

**判断哪些页面需要 snippet**：

| slide.type | 需要 snippet |
|---|---|
| `code-split` | ✅ |
| `level-map` 的 answer | ❌ |
| `split`（用法 A） | ✅ |
| `quiz` 的 questionCode | ❌ |
| `evolution` | ✅ |

**口诀**：语法演示用 snippet，练习答案不用。

### 3.8 annotations 行号规则

**`annotations[].line` = 文件的实际行号（从 1 开始数）。**

**页面左侧代码块行号也保留文件实际行号**（不从 1 重新计数）。

**规则**：

- `@snippet-start` / `@snippet-end` 标记行**算行号**
- 空行、注释行**也算行号**

**示例**（`if-single.cpp`）：

```cpp
1   #include <iostream>
2   using namespace std;
3
4   int main() {
5       // @snippet-start main
6       int score;
7       cin >> score;
8
9       if (score >= 60) {
10          cout << "及格" << endl;
11      }
12      cout << "程序结束" << endl;
13      // @snippet-end main
14      return 0;
15  }
```

annotations 与之对应：

```js
annotations: [
  { line: 6, title: 'int score;', desc: '...' },
  { line: 7, title: 'cin &gt;&gt; score;', desc: '...' },
  { line: 9, title: 'if (条件)', desc: '...' },
  { line: 10, title: 'cout', desc: '...' },
  { line: 12, title: 'cout', desc: '...' }
]
```

---

### 4.0 所有 Slide 组件的统一结构（强制）

**所有 `src/components/slides/*.vue` 组件必须使用以下骨架**：

<template>
  <div class="slide">
    <h1 class="slide-title">
      {{ slide.title }}
      <p v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</p>
    </h1>

    <div class="slide-body">
      <!-- 组件特有的内容 -->
    </div>
  </div>
</template>

**强制规则**：

| # | 规则 |
|---|---|
| 1 | 最外层必须是 `.slide`，不能自造 `.xxx-slide` |
| 2 | 标题用 `.slide-title`，副标题用 `.slide-subtitle`（嵌在 h1 里） |
| 3 | 内容区必须是 `.slide-body` |
| 4 | **不要**在组件内重复定义 padding / 标题字号 / 滚动容器 |
| 5 | **不要**自造 `.slide-header`、`.slide-content` 等结构 |

**这三个 class 的样式已在 `src/styles/layout.css` 中统一提供**：

- `.slide` 提供 padding + flex 布局 + `overflow: hidden`
- `.slide-title` / `.slide-subtitle` 提供字号（含 `--font-scale`）
- `.slide-body` 提供 `flex: 1; overflow-y: auto` + 子元素自动间距

**组件只负责**：

- 内容区域的布局（如 `.split-container` 两栏网格）
- 卡片内部样式（如 `.split-pane` 的内边距）
- 组件特有样式（如 `.split-intro` 的蓝色竖线）

**判断口诀**：「**三层结构进，组件只管内容**」。

### 4.1 组件清单

| # | 组件 | type | 用途 | 推荐页数 |
|---|---|---|---|---|
| 1 | CoverSlide | `cover` | 封面 | 1 |
| 2 | GridSlide | `grid` | 网格卡片 | 2—4 |
| 3 | DialogSlide | `dialog` | 角色对话 | 4—6 |
| 4 | CodeSplitSlide | `code-split` | 代码 + 标注 | 3—5 |
| 5 | CompareSlide | `compare` | 错误 vs 正确 | 1—2 |
| 6 | FlowSlide | `flow` | 流程图 | 1—2 |
| 7 | TimelineSlide | `timeline` | 时间线 | 2—3 |
| 8 | SplitSlide | `split` | 左右分栏 | 1—2 |
| 9 | BigNumberSlide | `big-number` | 大数字强调 | 0—1 |
| 10 | LevelMapSlide | `level-map` | 编程练习 | 2—3 |
| 11 | QuoteSlide | `quote` | 金句总结 | 1 |
| 12 | RadialSlide | `radial` | 径向展开 | 1 |
| 13 | TransitionSlide | `transition` | 过渡页 | 1 |
| 14 | EndingSlide | `ending` | 结束页 | 1 |
| 15 | QuizSlide | `quiz` | 选择题/判断题 | 1—2 |
| 16 | EvolutionSlide | `evolution` | 表达式演化 | 0—2 |
| **17** | **GlossarySlide** | **`glossary`** | **英文单词页** | **1** |
| — | 动画组件 ×10 | `xxx-animation` | 算法动画 | 0—2 |

### 4.2 各组件数据字段

#### cover

```js
{
  type: 'cover',
  title: '主题', subtitle: '副标题', chapterTag: false,
  data: {
    accentWord: '高亮词',        // 必须是 title 的子串
    meta: ['第一行', '第二行']   // 建议 1—3 行
  }
}
```
步数：1

#### grid

```js
{
  type: 'grid',
  data: {
    cards: [
      { icon: '🏆', title: '标题', desc: 'HTML' },
      { number: '01', title: '标题', desc: 'HTML' }
    ],
    extra: { title, desc, variant }
  }
}
```
**card 字段**：`icon` 与 `number` 二选一；`title` 必填；`desc` / `link` 可选。
**约束**：cards 2—8 张；同页内 icon 与 number 不混用。
**步数**：`cards.length + (extra ? 1 : 0)`

#### dialog

```js
{
  type: 'dialog',
  chapterTag: '第 N 讲 · 概念理解',
  data: {
    lines: [
      { who: 'student', text: 'HTML' },
      { who: 'robot', text: 'HTML' }
    ],
    extra: { ... }
  }
}
```
**角色**：`student` / `robot` / `teacher` / `xiaoma`
**约束**：建议 4 轮以上；每 3—5 页至少 1 页 dialog
**步数**：`lines.length + (extra ? 1 : 0)`

#### code-split

```js
{
  type: 'code-split',
  data: {
    intro: 'HTML',                     // 可选，顶部引入
    codeFile: 'codes/lesson-XX/x.cpp', // 必填（所有代码用 codeFile）
    snippet: 'main',                    // 可选
    density: 'sm',
    annotations: [
      { line: 6, title: 'HTML', desc: 'HTML' }
    ],
    output: '输出',
    extra: { ... }
  }
}
```
**约束**：annotations 建议 3—5 条
**步数**：`(intro?1:0) + 1 + annotations.length + (output?1:0) + (extra?1:0)`

#### compare

```js
{
  type: 'compare',
  data: {
    groups: [{ wrong: 'HTML', right: 'HTML' }],
    extra: { ... }
  }
}
```
**约束**：groups 建议 3—5 组
**步数**：`groups.length + (extra ? 1 : 0)`

#### flow

```js
{
  type: 'flow',
  data: {
    nodes: [
      { icon: '📝', label: '标签', sub: '副标题', glow: true }
    ],
    // 或 rows: [[...], [...]]
    extra: { ... }
  }
}
```
**优先级**：`rows` > `nodes`
**步数**：`Σ(row.length × 2 - 1) + (extra ? 1 : 0)`

#### timeline

```js
{
  type: 'timeline',
  data: {
    items: [
      { icon: '🧠', badge: '基础', title: '标题', desc: 'HTML', points: ['HTML'] }
    ],
    extra: { ... }
  }
}
```
**约束**：items 建议 4—6 项
**步数**：`items.length + (extra ? 1 : 0)`

#### split

**用法 A**（代码 + 注释）：`{ codeFile, snippet, annotations }`
**用法 B**（左右分栏）：`{ left: { icon/items }, right: { icon/items } }`

#### big-number

```js
{
  type: 'big-number',
  data: {
    number: '21', unit: '亿',
    card: { title, desc },
    extra: { ... }
  }
}
```

#### level-map

```js
{
  type: 'level-map',
  chapterTag: '第 N 讲 · 实战演练',
  data: {
    question: { title: '题干', desc: 'HTML', timer: '⏱ 限时 5 分钟' },
    hints: ['HTML 1', 'HTML 2'],
    answer: { codeFile: '...', title },
    analysis: { title: '📖 解析', desc: 'HTML' },
    extra: { ... }
  }
}
```
**可选**：answer / analysis 可省略；hints 可为空数组
**约束**：answer 用 `codeFile`，不用内联 code
**步数**：`1 + hints.length + (answer?1:0) + (analysis?1:0) + (extra?1:0)`

#### quote

```js
{
  type: 'quote',
  data: {
    text: '金句', author: '—— 出处',
    points: ['HTML'],
    highlight: { title, desc },
    extra: { ... }
  }
}
```

#### radial

```js
{
  type: 'radial',
  data: {
    center: '中心词',               // 下一讲的核心词
    items: [{ text: '分支', pos: 'top-left' }],
    extra: { ... }
  }
}
```
**约束**：items 2—6 个

#### transition / ending

```js
{ type: 'transition', title, subtitle, data: { note } }
{ type: 'ending', title, subtitle, chapterTag: false, data: { slogan, extra } }
```

#### quiz

```js
{
  type: 'quiz',
  chapterTag: '第 N 讲 · 课堂小测',
  data: {
    questions: [
      {
        id: 1,
        type: 'single',            // single / judge / multi(预留)
        difficulty: 3,
        source: '出处',
        question: 'HTML',
        questionCode: '题干代码',
        questionNote: '附加说明',
        optionLayout: 'auto',
        options: [
          { label: 'A', text: 'HTML' },
          { label: 'B', text: 'HTML', correct: true },
          { label: 'C', code: '代码片段' },
          { label: 'D', text: 'HTML' }
        ],
        analysis: 'HTML'
      }
    ],
    extra: { ... }
  }
}
```
**布局自动检测**：有 code → code；2 选项 → two-cols；含 HTML → two-cols；≤8 字 → horizontal；≤30 字 → two-cols；>30 字 → vertical
**步数**：`questions.length × 2 + (extra ? 1 : 0)`

#### evolution

```js
{
  type: 'evolution',
  data: {
    intro: 'HTML',                  // 可选
    codeFile: 'codes/lesson-XX/x.cpp',
    snippet: 'main',
    steps: [
      {
        line: 5,                    // 高亮行号
        expression: '5! = 5 × 4!',  // 当前表达式
        note: 'HTML 说明'
      }
    ],
    extra: { ... }
  }
}
```
**步数**：`(intro?1:0) + 2 + (extra?1:0)`

#### glossary（新增）

**用途**：展示本讲的英文单词表。

```js
{
  type: 'glossary',
  title: '本讲英文单词',
  subtitle: '记牢拼写，理解原意',
  chapterTag: '第 N 讲 · 复习',
  data: {
    words: [
      {
        word: 'if',        // 必填，单词（关键字全小写）
        cn: '如果',        // 必填，中文含义
        pron: '/ɪf/',      // 可选，国际音标
        origin: '英文原意"如果"',  // 可选，词源/英文原意
        category: '关键字'  // 必填，6 类之一
      }
    ],
    extra: { title: '💡 记忆法', desc: 'HTML' }
  }
}
```

**分类（固定 6 类）**：

| 分类 | 说明 | 示例 |
|---|---|---|
| `关键字` | C++ 保留字 | `if`、`else`、`for`、`int` |
| `类型` | 数据类型 | `int`、`double`、`char`、`bool` |
| `函数` | 标准库函数 | `cout`、`cin`、`sqrt`、`sort` |
| `运算符` | 运算符 | `+`、`&&`、`\|\|`、`!` |
| `语句` | 语句/结构 | `main`、`return`、`break` |
| `概念` | 编程概念 | `array`、`recursion`、`pointer` |

**规则**：

- 每讲词条 4—8 个
- 只写本讲新词（不重复上一讲）
- 位置：**答疑时间之后、知识清单之前**
- 页数 +1，`total` 同步 +1
- 全局术语表 `/glossary` 自动从此页聚合，**无需额外字段**

**步数**：`1 + (extra ? 1 : 0)`

---

## 五、动画数据格式

### 5.1 通用格式

```js
{
  type: 'xxx-animation',
  title: '...',
  subtitle: '...',
  chapterTag: '第 X 讲 · 过程演示',
  data: {
    config: { /* 布局参数（可选）*/ },
    steps: [
      {
        state: { /* 当前状态 */ },
        op: '操作名（显示在面板）',    // 可选
        note: 'HTML 说明文字'
      }
    ],
    extra: { /* 可选 */ }
  }
}
```

**关键约定**：

- `steps` 每个 step 占 1 步
- `extra` 占最后 1 步
- 总步数 = `steps.length + (extra ? 1 : 0)`

### 5.2 各动画的 state 字段

| 动画 type | state 字段 |
|---|---|
| `hanoi-animation` | `{ A: [3,2,1], B: [], C: [] }` + `move: { from, to, disk }` |
| `stack-animation` | `{ items: [{id, value}, ...] }` + `op: 'push(10)'` |
| `queue-animation` | 同上 |
| `sort-animation` | `{ items: [{id, value}, ...], highlight: [id], done: [id] }` |
| `linked-list-animation` | `{ nodes: [{id, value}, ...], highlight: [id], inserted: id }` |
| `tree-animation` | `{ visit: nodeId, visited: [id], path: [id] }` + 独立的 `tree: {...}` |
| `binary-search-animation` | `{ left, right, mid }` + 独立的 `items: [...]` |
| `graph-animation` | `{ visit: nodeId, visited: [id], queue: [id] }` + 独立的 `nodes/edges` |
| `dp-table-animation` | `{ row, col, filled: [{row, col, value}], deps: [...] }` |
| `function-call-animation` | `{ stack: [{id, name, vars, status}, ...], line, code }` |

### 5.3 使用场景

| 场景 | 推荐动画 |
|---|---|
| 递归、汉诺塔 | `hanoi-animation` |
| 栈 push/pop | `stack-animation` |
| 队列 enqueue/dequeue、BFS | `queue-animation` |
| 排序、数组交换 | `sort-animation` |
| 链表插入/删除 | `linked-list-animation` |
| 树遍历 | `tree-animation` |
| 二分查找 | `binary-search-animation` |
| 图的 DFS/BFS | `graph-animation` |
| DP 填表 | `dp-table-animation` |
| 函数调用/递归栈 | `function-call-animation` |
| 表达式展开（递归/递推） | `evolution` |

---

## 六、内容设计规则

### 6.1 页面结构（以 COURSE-DESIGN 5.1 为准）

**固定开头 · 5 页**：

```
01 cover / 02 timeline（回顾）/ 03 grid（目标）
04 timeline（地图）/ 05 dialog（引入）
```

**灵活主体 · 14—17 页**：概念 + 代码 + 对话 + 动画 + 对比

**固定练习 · 3 页**：level-map ⭐ / ⭐⭐ / ⭐⭐⭐

**可选 · 0—1 页**：趣味扩展

**固定收尾 · 8 页**：

```
quiz → quote → grid（作业） → radial → dialog（答疑） → glossary → grid（清单） → ending
```

**页数 28—30**（不含趣味扩展）。

### 6.2 对话规则

| 规则 | 值 |
|---|---|
| 对话间隔 | 每 3—5 页至少 1 页 |
| 每讲 dialog 数 | ≥ 4 页 |
| 对话轮数 | 4—8 轮 |

**注**：`transition` 和 `evolution` 可视作"半对话页"（COURSE-DESIGN 5.4 例外 3）。

### 6.3 Extra 4 要素

每条 Extra 必须包含：

| 要素 | 说明 |
|---|---|
| 具体细节 | 说清"是什么" |
| 具体数字 | 年份之外的具体数字 |
| 故事情节 | 有冲突、转折 |
| 跨学科金句 | 与其他学科连接 |

**反例**（只有 1—2 句）：
> ❌ "编译器就是把代码翻译成机器码的工具。"

**正例**（4 要素齐全）：
> ✅ 1950 年代，程序员用打孔卡写程序，一张卡只能写 80 字符。一位叫格蕾丝·霍珀的女程序员想：能不能让计算机自己翻译？她带头开发了早期编译器。**编译器，就是程序员和机器之间的翻译官。**

### 6.4 wiki 链接

每段最多 5 个，格式：

```html
<a href="https://baike.baidu.com/item/词条" target="_blank" class="wiki-link">文字</a>
```

### 6.5 禁止事项

1. ❌ 一页塞多个核心抽象概念
2. ❌ 只讲语法不讲应用
3. ❌ 知识扩展只有 1—2 句
4. ❌ 连续 3 页同一 type（4 条例外除外）
5. ❌ 练习题改成 dialog
6. ❌ 核心抽象概念不给类比
7. ❌ 页与页之间无衔接
8. ❌ 引入超纲知识点

### 6.6 练习题/作业规范

| 类型 | 数量 |
|---|---|
| 课堂练习 | 3 道（level-map，⭐/⭐⭐/⭐⭐⭐） |
| 课后作业 | 0—3 道（洛谷题，2 必做 + 1 选做） |
| 课堂小测 | 3—5 道（quiz） |

**课后作业选题原则**：

- 统一用洛谷题
- 题目所需知识点必须在本讲或之前讲过
- 难度依次提升（⭐/⭐⭐/⭐⭐⭐）
- 没找到合适题 → 宁可 0 道，不硬塞

### 6.6.1 hints 三原则

**hints 是脚手架，不是谜题。** 要让学生"能动手"，同时"知道为什么"。

| 原则 | 反例 | 正例 |
|---|---|---|
| **给具体值** | "初始值要小" | "初始值用 -1e9" |
| **给方向** | "用 -1e9"（魔法数字） | "比所有输入都小，用 -1e9" |
| **加注释** | "-1e9" | "-1e9（-10 亿）" |

**三种模板**：
- 简单情况：`初始值为 0`
- 需要理由：`初始值为 1（不能是 0）`
- 有魔法数字：`初始值用 -1e9（-10 亿）`

### 6.7 动画使用规范

#### 6.7.1 核心原则

> **动画只在"过程看不见"时才加。**
> **静态页能讲清 → 不加动画。**

**三条铁律**：

| # | 原则 | 说明 |
|---|---|---|
| 1 | **"看不见"才加** | 过程在代码里"看不清中间状态"→ 加动画 |
| 2 | **"重复 3 次"才建组件** | 同一场景出现 3 次以上 → 才值得新建组件 |
| 3 | **"静态能讲清"不加** | 代码+注释+图能讲明白 → **不要为了好看加动画** |

#### 6.7.2 组件选择决策表

| 内容类型 | 推荐组件 | 判断标准 |
|---|---|---|
| 表达式逐层展开 | `evolution` | 有 `a = b + c` 形式 |
| 函数调用/递归栈 | `function-call-animation` | 有"调用链"或"栈帧" |
| 一维序列操作 | `stack` / `queue` / `linked-list` | 顺序变化 |
| 二维结构 | `hanoi` / `tree` / `graph` | 位置变化 |
| 静态网格填充 | `dp-table` | 二维填表 |
| 区间减半 | `binary-search` | 有"左中右"指针 |
| 相邻交换 | `sort-animation` | 两两比较 |
| **纯文本/公式** | **不用动画** | 概念说明 |
| **静态流程** | `flow` | 线性步骤 |
| **代码逐行讲解** | `code-split` | 静态高亮 |

#### 6.7.3 每讲动画页配额

| 项 | 建议 |
|---|---|
| 每讲动画页 | 0—2 页 |
| 上限 | 3 页 |
| 动画页位置 | 概念讲完后、练习之前 |

---

## 七、课程结构参考

**完整课程结构以 `COURSE-DESIGN.md` 第四章为准。**

本文档不再重复课程大纲。生成新讲次时，**必须查 COURSE-DESIGN.md** 确定：

- 本讲主题、核心概念、子知识点
- 综合难度、负荷值
- 伏笔埋点、回收点
- 动画选型

---

## 八、伏笔方法

### 8.1 设计原则

| 原则 | 说明 |
|---|---|
| 只埋不教 | 伏笔只提一句，不展开 |
| 引发好奇 | 用悬念、反常识来埋 |
| 有回收点 | 后续讲次明确回收 |
| 不超 1 页 | 一句话呈现 |
| 不打断主线 | 只出现在 dialog / Extra / radial |

### 8.2 三种呈现方式

| 方式 | 位置 | 格式 |
|---|---|---|
| 对话伏笔 | dialog 页 | 小C说"这个问题，第 X 讲揭晓" |
| Extra 伏笔 | Extra 末尾 | 加一行"🔮 伏笔：..." |
| 预告伏笔 | radial 页 | "远期彩蛋：..." |

### 8.3 三条核心伏笔链

**以 `COURSE-DESIGN.md` 9.4 为准。**

### 8.4 每讲自检

- 至少埋 1 个新伏笔
- 至少回收 1 个旧伏笔

---

## 九、难度曲线

**以 `COURSE-DESIGN.md` 第三章为准。**

### 9.1 难度比例要求

| 难度 | 建议占比 |
|---|---|
| ⭐⭐ 简单 | 40% |
| ⭐⭐⭐ 中等 | 45% |
| ⭐⭐⭐⭐ 较难 | 15% |
| ⭐⭐⭐⭐⭐ 难 | 0%（单讲不超过 1 个） |

### 9.2 后续指导

- 每讲 ⭐⭐ 至少 40%
- 每讲 ⭐⭐⭐⭐ 不超过 15%
- 超纲内容用"初赛渗透 + 伏笔"处理
- 单讲不出现两个 ⭐⭐⭐⭐⭐

---

## 十、自检清单

### 10.0 本章定位

本章清单是**辅助工具**，不是硬性标准。

判断一讲好不好的最终依据是 **4 条底层目的**（见 1.2 节）。

**若清单条目与 4 条目的冲突，以目的为准。**

### 10.1 结构维度

- [ ] 页数 28—30（不含趣味扩展）或 29—31（含趣味扩展）？
- [ ] dialog ≥ 4 页，间隔 ≤ 5（transition/evolution 算半页）？
- [ ] 无连续 3 页同 type（4 条例外除外）？
- [ ] 动画页 ≤ 3，位置在概念后、练习前？
- [ ] 有上节回顾、目标、地图、总结、作业、预告、词汇、清单？
- [ ] glossary 页位置在"答疑后、知识清单前"？

### 10.2 难度维度

- [ ] 总负荷在 12—18 之间？
- [ ] 单讲不超过 2 个 ⭐⭐⭐⭐？
- [ ] 无 ⭐⭐⭐⭐⭐ 与 ⭐⭐⭐⭐ 同讲？
- [ ] 难点后有缓冲？

### 10.3 内容维度（**新增必查**）

- [ ] **知识点覆盖**：对照 COURSE-DESIGN 子知识点，逐一核对
- [ ] **核心概念贯穿**：核心比喻是否在全讲反复出现
- [ ] **难点展开**：⭐⭐⭐⭐ 知识点是否有 ≥ 2 页讲解
- [ ] **易错点**：compare 页是否给出**具体错误例子**
- [ ] **实战梯度**：3 道练习是否 ⭐→⭐⭐→⭐⭐⭐ 递进
- [ ] **无超纲**：所有知识点在本讲或之前讲过
- [ ] **教学简化说明**：地址示例、特殊语法是否有清晰标注
- [ ] **实操可行性**：学生能否独立完成课后作业

### 10.4 格式一致性

- [ ] **同一页内**同组件的多个条目，格式是否统一？
- [ ] **同一讲内**同类型页面，格式是否统一？
- [ ] 引入新结构时，是否归一化到已有模板？
- [ ] 课后作业卡片"题目名 + 考察 + 难度 + 目标"四行一致？

### 10.5 无重复页

- [ ] 任意两页内容是否不重复？
- [ ] 重点检查：相邻页、同主题页、动画页与静态页

### 10.6 题目维度

- [ ] level-map 3 道，分 ⭐/⭐⭐/⭐⭐⭐？
- [ ] 课后作业 0—3 道，统一洛谷题？
- [ ] 课后作业题所需知识点在本讲或之前讲过？
- [ ] quiz 3—5 题，含初赛真题？
- [ ] 知识清单含挑战题单？

### 10.7 伏笔维度

- [ ] 埋至少 1 个新伏笔？
- [ ] 回收至少 1 个旧伏笔？
- [ ] 伏笔在 dialog / Extra / radial 中呈现？

### 10.8 词汇维度

- [ ] glossary 页有 4—8 个词条？
- [ ] 只写本讲新词（不重复上一讲）？
- [ ] 分类从 6 类中选？
- [ ] 运行 `node scripts/glossary-report.js --check` 无警告？

### 10.9 数据格式

- [ ] `total` 与 `slides.length` 一致？
- [ ] slide `id` 从 1 连续？
- [ ] `title` 纯文本，`desc` 用 HTML？
- [ ] `<` 写成 `&lt;`、`>` 写成 `&gt;`？
- [ ] 字符串里 `\n` 写成 `\\n`？
- [ ] `codeFile` 路径不带 `public/`、不以 `/` 开头？
- [ ] snippet 标记成对出现？
- [ ] `annotations[].line` 是文件实际行号？
- [ ] quiz 每题至少 1 个 `correct: true`？
- [ ] wiki 链接用 `class="wiki-link"`？
- [ ] 动画的 `steps` 字段完整（state / note）？

### 10.10 教学节奏

- [ ] 概念页后紧跟例子？
- [ ] 例子后紧跟练习？
- [ ] 抽象概念前有生活类比？
- [ ] 结尾有悬念（下节预告）？

### 10.11 一条底线

**不要为了"过清单"而写课程。**

清单是**鞋带**，不是**脚**。目的是**走路**。

**永远以目的为准，不以清单为准。**

---

## 十一、数据格式常见错误

### 11.1 HTML 实体显示错误

**症状**：`&lt;` 显示为字面文本
**原因**：字段用 `{{ }}` 而不是 `v-html`
**修复**：`desc` / `text` / `cards[].desc` 等字段必须用 HTML 实体

### 11.2 字符串里 `\n` 变真换行

**症状**：`points: ['\\n 更快']` 显示为换行
**原因**：写成了 `'\n 更快'`
**修复**：改写为 `'\\n 更快'`

### 11.3 codeFile 加载失败

**症状**：代码块显示"⚠️ 无法加载代码文件"
**排查**：
- 文件真的存在？`public/codes/lesson-XX/xxx.cpp`
- 路径从 `codes/` 开始？
- 不以 `/` 开头？
- 控制台 404？

### 11.4 snippet 未生效

**症状**：显示完整文件（含 `#include` 和 `main`）
**排查**：
- `.cpp` 有 `@snippet-start` / `@snippet-end`？
- JS 有 `snippet: 'main'`？
- 标记名一致？

### 11.5 annotations 行号不一致

**症状**：注释卡片标"第 2 行"，但页面上第 2 行不对应
**原因**：用了相对片段行号，而不是文件实际行号
**修复**：从文件第一行开始数，含标记行、空行

### 11.6 total 与 slides.length 不符

**症状**：控制台警告
**修复**：改 `total` 或增删 slide

### 11.7 动画组件注册失败

**症状**："未注册的版式：xxx-animation"
**排查**：
- 组件文件名是否 `XxxAnimationSlide.vue`？
- 是否在 `src/components/animations/` 下？
- 重启 Vite（glob 变化需重启）

### 11.8 动画元素瞬间移动

**原因**：元素组件缺少 `transition: left, bottom` 等；或用了 `transition: all`
**修复**：明确指定属性，不用 `all`

### 11.9 动画进入/离开无效果

**排查**：
- 是否用 `<TransitionGroup>` 包裹 `<component v-for>`？
- scoped 样式需 `:deep(.vis-el-enter-from)`

### 11.10 extra 内容撑破布局

**症状**：extra 长内容遮挡舞台或代码
**修复**：
- 把长内容拆到独立页
- 或限制 extra 高度（`max-height: 40vh`）+ 内部滚动

### 11.11 GlossarySlide 字号按钮失效

**症状**：FontScaler 点击后单词页字号不变
**原因**：组件内字号写死 `px`，没接入 `--font-scale`
**修复**：所有字号用 `var(--fs-xxx)` 或 `calc(XXpx * var(--font-scale))`

### 11.12 glossary 词条格式不统一

**症状**：同一页内词条有的高有的矮
**原因**：词条内容行数不同，没设 `min-height`
**修复**：`.word-item { min-height: calc(72px * var(--font-scale)); }`

---

## 附录：给 AI 模型的生成提示

生成新讲次数据时，请遵循：

1. **严格按组件数据字段生成**（第四章，17 种组件）
2. **严格按 COURSE-DESIGN 5.1 页面结构**
3. **每讲 1 个核心抽象概念**（查 COURSE-DESIGN 第四章）
4. **埋 1 个伏笔，回收 1 个伏笔**（第八章）
5. **每 3—5 页有 dialog**（6.2）
6. **Extra 四要素齐全**（6.3）
7. **chapterTag 用常用值清单**（3.3）
8. **HTML 转义正确**（3.5.1）；**字符串里 `\n` 写 `\\n`**（3.5.2）
9. **所有代码用 `codeFile`**（3.6），不写内联 code
10. **snippet 行号** = 文件实际行号（3.8）
11. **动画数据**：用 `xxx-animation` 类型（第五章）
12. **glossary 页**：每讲 4—8 个词条，位置在答疑后、清单前（4.2）
13. **课后作业**：统一洛谷题，0—3 道，没合适就减（6.6）
14. **生成后对照自检清单**（第十章）

**核心原则**：面向 6 年级—初二学生，抽象概念必须有生活类比，难度不能超标，故事性优先。

**特别注意**：

- `answer`、`analysis`、`card` 等是可选字段
- `chapterTag` 可以省略
- `cover.accentWord` 必须是 `title` 的子串
- `grid` 同页内 `icon` 与 `number` 不混用
- `radial.center` 是下一讲的核心词
- `questionCode` / `options[].code` 用原始代码
- `desc` / `text` 里的 `<` `>` 必须转义为 `&lt;` `&gt;`
- `codeFile` 路径不带 `public/`、不以 `/` 开头
- **`annotations[].line` 用文件实际行号**
- **所有代码用 `codeFile`**，不用内联 `code`
- **glossary 词条**：4—8 个，分类从 6 类选

---

**GUIDE.md 结束。项目架构见 ARCHITECTURE.md，课程结构见 COURSE-DESIGN.md，历史记录见 CHANGELOG.md。**
# C++ 课程生成指南（GUIDE.md）

> **用途**：AI 生成讲次数据、教师编写讲次内容的**唯一参考**。
> **读者**：AI 模型、写讲次的教师、新加入的内容创作者。
> **不包含**：项目架构、组件实现、历史记录（见 ARCHITECTURE.md / CHANGELOG.md）。
> **最后更新**：2025-06（v1.5）

---

## 目录

1. [项目背景](#一项目背景)
2. [生成一讲的流程](#二生成一讲的流程)
3. [数据格式](#三数据格式)
4. [16 种组件字段](#四16-种组件字段)
5. [动画数据格式](#五动画数据格式)
6. [内容设计规则](#六内容设计规则)
7. [48 讲课程大纲](#七48-讲课程大纲)
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
| 总讲次 | 48 讲（6 模块 × 8 讲） |
| 每讲时长 | 150 分钟 |
| 每讲页数 | **24—30 页** |
| 角色 | 小C（机器人）、同学（学习者）、老师、小码 |

### 1.2 底层目的（4 条，不可妥协）

1. **为只学过图形化的学生教学 C++**
2. **使之具备参加比赛的能力**
3. **课堂知识点覆盖竞赛知识**
4. **内容丰富有趣，知识面扩展**

**判断一讲好不好的最终依据是这 4 条**，不是任何固定清单。

### 1.3 每讲核心理念

**每讲 1 个核心抽象概念 + 2—4 个子知识点 + 伏笔链。**

例（第 5 讲数组）：
- 核心抽象概念：数组 = 储物柜
- 子知识点：定义、访问、遍历、越界
- 伏笔：连续内存（为第 16 讲指针铺垫）

---

## 二、生成一讲的流程

```
① 看大纲（第七章）→ 确定本讲主题与子知识点
② 看上一讲的下节预告 → 确定衔接点
③ 按 28 页模板（6.1 节）→ 列出页面大纲
④ 逐页填数据（第四章字段规范）
⑤ 应用伏笔（第八章）
⑥ 自检（第十章）
⑦ 验证：node verify-codes.js lesson-XX
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
  total: 28,                       // 必填，等于 slides.length
  category: '语法与基础算法',      // 必填
  slides: [ /* ... */ ]
};
```

**category 取值**：

| 模块 | 讲次 | category |
|---|---|---|
| 一、C++ 语法核心 | 1—8 | `语法与基础算法` |
| 二、数组与函数 | 9—16 | `语法与基础算法` |
| 三、基础算法 | 17—24 | `语法与基础算法` |
| 四、数据结构 | 25—32 | `数据结构与搜索` |
| 五、数学与进阶 | 33—40 | `数学与字符串` |
| 六、竞赛冲刺 | 41—48 | `竞赛冲刺` |

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
`概念理解` / `代码拆解` / `实战演练` / `OJ 实战` / `输入输出` / `概念铺垫` / `易错点` / `知识讲解` / `初赛渗透` / `答疑` / `复习` / `课堂小测` / `下节预告` / `过程演示`

### 3.4 可选字段默认值

**数组类**（缺省为 `[]`）：
`annotations` / `groups` / `cards` / `items` / `lines` / `points` / `hints` / `questions` / `options`

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

```js
codeFile: 'codes/lesson-01/hello-world.cpp'
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
| C | 纯片段（无 I/O 逻辑） | ❌ 保持内联 |

**口诀**：有输入输出逻辑 → 迁；只有表达式 → 留。

### 3.7 snippet 规范

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
    codeFile: 'codes/lesson-03/if-single.cpp',
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

## 四、16 种组件字段

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
    intro: 'HTML',                    // 可选，顶部引入
    code: `...`,                       // 内联（片段）
    codeFile: 'codes/lesson-XX/x.cpp', // 或外部文件
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
**约束**：annotations 建议 3—5 条；`code` 与 `codeFile` 二选一
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

**用法 A**（代码 + 注释）：`{ code / codeFile, snippet, annotations }`
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
    answer: { code / codeFile, title },
    analysis: { title: '📖 解析', desc: 'HTML' },
    extra: { ... }
  }
}
```
**可选**：answer / analysis 可省略；hints 可为空数组
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

---

## 五、动画数据格式

### 5.1 通用格式

```js
{
  type: 'xxx-animation',           // hanoi / stack / queue / sort / ...
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
| 表达式展开（递归/递推） | `evolution` |

---

## 六、内容设计规则

### 6.1 每讲标准结构（28 页模板）

| 页 | type | 内容 |
|---|---|---|
| 1 | cover | 封面 |
| 2 | timeline | 上节回顾 + 未解决问题 |
| 3 | grid | 本节目标 |
| 4 | timeline | 学习地图 |
| 5 | dialog | 核心概念引入 |
| 6—8 | code-split / grid / compare | 概念页 |
| 9 | dialog | 角色互动 |
| 10 | transition | 第二站 |
| 11—13 | code-split / flow | 示例页 |
| 14 | dialog | 初赛渗透或拓展 |
| 15—16 | level-map | 课堂练习 2 道 |
| 17 | dialog | 答疑 |
| 18 | timeline | 知识发展史 |
| 19 | level-map | 挑战题 |
| 20 | quote | 今日总结 |
| 21 | grid | 课后作业 3 道 |
| 22 | radial | 下节预告 |
| 23 | dialog | 答疑 |
| 24 | grid | 知识清单 |
| 25—26 | quiz | 课堂小测 3—5 题 |
| 27 | ending | 结束页 |
| 28 | （保留） | 灵活性预留 |

**允许调整**，但必须满足：
- 页数 24—30
- dialog ≥ 4 页，间隔 ≤ 5
- 无连续 3 页同 type

### 6.2 对话规则

| 规则 | 值 |
|---|---|
| 对话间隔 | 每 3—5 页至少 1 页 |
| 每讲 dialog 数 | ≥ 4 页 |
| 对话轮数 | 4—8 轮 |

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
4. ❌ 连续 3 页同一 type
5. ❌ 练习题改成 dialog
6. ❌ 核心抽象概念不给类比
7. ❌ 页与页之间无衔接
8. ❌ 引入超纲知识点

### 6.6 练习题/作业规范

| 类型 | 数量 |
|---|---|
| 课堂练习 | 2 道（level-map） |
| 课后作业 | 3 道（2 基础 + 1 挑战） |
| 课堂小测 | 3—5 道（quiz） |

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

| 内容类型 | 推荐组件 | 判断标准 | 示例 |
|---|---|---|---|
| 表达式逐层展开 | `evolution` | 有 `a = b + c` 形式 | `sum = sum + a[i]`、`n! = n × (n-1)!` |
| 函数调用/递归栈 | `function-call-animation` | 有"调用链"或"栈帧" | 递归、函数调用 |
| 一维序列操作 | `stack` / `queue` / `linked-list` | 顺序变化 | 栈 push/pop、队列 enqueue |
| 二维结构 | `hanoi` / `tree` / `graph` | 位置变化 | 汉诺塔、树遍历、图 BFS |
| 静态网格填充 | `dp-table` | 二维填表 | 01 背包 DP |
| 区间减半 | `binary-search` | 有"左中右"指针 | 二分查找 |
| 相邻交换 | `sort-animation` | 两两比较 | 冒泡、选择 |
| **纯文本/公式** | **不用动画** | 概念说明 | 变量定义、类型总览 |
| **静态流程** | `flow` | 线性步骤 | 编译 4 步、OJ 提交 7 步 |
| **代码逐行讲解** | `code-split` | 静态高亮 | Hello World 逐行拆解 |

#### 6.7.3 反例清单

**以下场景不要加动画**：

| 反例 | 问题 | 正确做法 |
|---|---|---|
| 变量赋值 `int a = 5;` | 太简单，学生一眼看懂 | 静态 `code-split` |
| 类型总览（int/double/char） | 是"罗列"不是"过程" | 静态 `grid` |
| 运算符总览（+ - * / %） | 同上 | 静态 `grid` |
| 概念引入（什么是程序） | 概念没过程 | 静态 `dialog` |
| 编译流程（4 步） | 线性、无状态变化 | 静态 `flow` |
| 开发环境介绍 | 说明性内容 | 静态 `grid` |

#### 6.7.4 判断三问

对每个候选页，问自己：

1. **学生看不到"中间步骤"吗？** 是 → 加；否 → 不加
2. **过程有"多层状态"要跟踪吗？** 是 → 加；否 → 不加
3. **静态代码 + 注释讲不清吗？** 是 → 加；否 → 不加

**三问都答"是" → 加；任一个答"否" → 不加。**

#### 6.7.5 每讲动画页配额

| 项 | 建议 |
|---|---|
| 每讲动画页 | 0—2 页 |
| 上限 | 3 页（超过就拆讲或分讲） |
| 动画页位置 | 概念讲完后、练习之前 |

**理由**：动画页比静态页慢（学生要看过程），太多会拖节奏。

#### 6.7.6 已用组件的复用优先级

**当新场景出现时，按以下顺序尝试**：

1. **能套用现有组件？** → 直接复用（改数据）
2. **现有组件稍改能套用？** → 加个可选 prop（如 `mode: 'search' / 'two-pointer'`）
3. **确实需要新组件？** → 先评估"未来 3 讲内还会用几次"
   - ≥ 3 次 → 新建
   - < 3 次 → 暂时不加动画

#### 6.7.7 未来 40 讲动画组件需求预测

| 讲次 | 内容 | 组件 | 状态 |
|---|---|---|---|
| 09 排序基础 | 冒泡/选择/插入 | `sort-animation` | ✅ 已有 |
| 13 函数 | 函数调用 | `function-call` | ✅ 已有 |
| 14 递归 | 递归全套 | `function-call` + `evolution` | ✅ 已有 |
| 17 排序进阶 | sort/cmp | `sort-animation` | ✅ 已有 |
| 19 查找与二分 | 二分 | `binary-search` | ✅ 已有 |
| 21 递推 | f(n) = f(n-1) + f(n-2) | `evolution` | ✅ 已有 |
| 22 贪心 | 区间调度 | 需新 `greedy-timeline` | ⏳ 待评估 |
| 23 前缀和 | 累计过程 | `evolution` | ✅ 已有 |
| 24 简单 DP | 01 背包 | `dp-table` | ✅ 已有 |
| 25 栈 | push/pop | `stack` | ✅ 已有 |
| 26 队列 | enqueue/dequeue | `queue` | ✅ 已有 |
| 27 链表 | 插入/删除 | `linked-list` | ✅ 已有 |
| 28 二叉树 | 遍历 | `tree` | ✅ 已有 |
| 29 堆 | push/pop | 需新 `heap` | ⏳ 待评估 |
| 30 图基础 | 邻接矩阵 | `graph` | ✅ 已有 |
| 31 图遍历 | DFS/BFS | `graph` | ✅ 已有 |
| 32 并查集 | 合并 | 需新 `union-find` | ⏳ 待评估 |
| 33 数论 | 质数筛 | 需新 `sieve` | ⏳ 待评估 |
| 35 位运算 | 二进制 | 需新 `binary-view` | ⏳ 待评估 |
| 36 高精度 | 大数加法 | 需新 `big-number-op` | ⏳ 待评估 |
| 39 双指针 | 滑动窗口 | 需新 `two-pointer` | ⏳ 待评估 |
| 43 最短路 | Dijkstra | `graph` 扩展 | ⏳ 待评估 |
| 45-46 DP 进阶 | 区间/树形 | `dp-table` 扩展 | ⏳ 待评估 |

**关键**：**待评估**的组件，等该讲生成时**先尝试复用**，实在不行再建新组件。

#### 6.7.8 本节自检

生成新讲次时，对照以下问题：

- [ ] 本讲的动画页都在"过程看不见"的场景吗？
- [ ] 有没有"为动画而动画"的页面？
- [ ] 现有组件能覆盖吗？有没有硬套？
- [ ] 每讲动画页 ≤ 3 页？
- [ ] 动画页位置合理（概念后、练习前）？

---

## 七、48 讲课程大纲

### 7.1 模块一：C++ 语法核心（1—8）

| 讲 | 主题 | 核心抽象概念 | 子知识点 |
|---|---|---|---|
| 1 | 初识 C++ | 程序 = 指令 + 数据 | cout、Hello World、编译、OJ |
| 2 | 变量与输入 | 变量 = 盒子 | 定义、赋值、cin、命名规则 |
| 3 | 数据类型 | 类型 = 盒子大小 | int/long long/double/char/bool、const、类型转换 |
| 4 | 运算符与表达式 | 运算符 = 工具 | 算术、赋值、自增、优先级（4 级） |
| 5 | 分支结构 | 分支 = 岔路口 | if、if-else、关系运算 |
| 6 | 多分支与逻辑 | 多岔路 | else if、switch、&&、\|\|、! |
| 7 | 循环结构 | 循环 = 转圈 | while、for、break、continue |
| 8 | 循环嵌套与图案 | 嵌套 = 时钟 | 双重循环、图案打印 |

### 7.2 模块二：数组与函数（9—16）

| 讲 | 主题 | 核心抽象概念 |
|---|---|---|
| 9 | 一维数组 | 数组 = 储物柜 |
| 10 | 二维数组 | 表格 |
| 11 | 字符串基础 | 字符串 = 文字项链 |
| 12 | 字符串进阶 | 无 |
| 13 | 函数 | 函数 = 料理机 |
| 14 | 递归 | 递归 = 套娃 |
| 15 | 文件操作与调试 | 无 |
| 16 | 结构体与指针初步 | 结构体 = 名片 |

### 7.3 模块三：基础算法（17—24）

| 讲 | 主题 | 核心抽象概念 |
|---|---|---|
| 17 | 排序基础 | 排序 = 排队 |
| 18 | 排序进阶与 STL | 容器 = 工具盒 |
| 19 | 查找与二分 | 二分 = 翻字典 |
| 20 | 枚举与模拟 | 枚举 = 逐个试 |
| 21 | 递推 | 递推 = 多米诺 |
| 22 | 贪心入门 | 贪心 = 每次选最好 |
| 23 | 前缀和与差分 | 前缀和 = 账本 |
| 24 | 简单动态规划 | DP = 记笔记 |

### 7.4 模块四：数据结构（25—32）

| 讲 | 主题 |
|---|---|
| 25 | 栈 |
| 26 | 队列 |
| 27 | 链表 |
| 28 | 二叉树 |
| 29 | 堆与优先队列 |
| 30 | 图的基础 |
| 31 | 图的遍历 |
| 32 | 并查集 |

### 7.5 模块五：数学与进阶（33—40）

| 讲 | 主题 |
|---|---|
| 33 | 数论基础 |
| 34 | 质数筛与快速幂 |
| 35 | 位运算与进制 |
| 36 | 高精度 |
| 37 | 排列组合 |
| 38 | 概率与期望入门 |
| 39 | 双指针与滑动窗口 |
| 40 | 复杂度分析 |

### 7.6 模块六：竞赛冲刺（41—48）

| 讲 | 主题 |
|---|---|
| 41 | 搜索进阶 |
| 42 | 分治与归并排序 |
| 43 | 最短路 |
| 44 | 最小生成树与拓扑排序 |
| 45 | DP 进阶（一） |
| 46 | DP 进阶（二） |
| 47 | CSP-J/S 真题精讲 |
| 48 | 模拟赛与赛前冲刺 |

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

#### 链 1：进制与位运算

```
第 1 讲  计算机只认识 0 和 1                【埋】
第 2 讲  变量存在内存里，全是 0 和 1        【埋】
第 3 讲  int 21亿、char ASCII、类型转换    【埋】
第 4 讲  位运算未讲                        【埋】
第 5 讲  条件本质是 0 和 1                 【埋】
第 15 讲 文件里存的也是 0 和 1              【埋】
第 16 讲 指针存的是地址，地址是数字         【埋】
第 34 讲 快速幂用到了二进制                 【埋】
第 35 讲 位运算与进制：正式揭晓             【收】
第 45 讲 状态压缩 DP：位运算的进阶应用      【再收】
```

#### 链 2：递归 → 栈 → DP

```
第 13 讲 函数调用时计算机怎么记住位置？      【埋】
第 14 讲 递归的底层是什么？                 【埋】
第 14 讲 递归太慢怎么办？                   【埋】
第 21 讲 递推和递归什么关系？               【埋】
第 24 讲 简单 DP：记忆化就是"存下来"        【收一半】
第 25 讲 栈：递归的底层就是栈               【收】
第 45 讲 DP 进阶：状态怎么设计               【再收】
```

#### 链 3：数组 → 内存 → 指针 → 链表

```
第 9 讲  数组为什么访问快？因为连续内存      【埋】
第 9 讲  数组是连续内存，能不能不连续？      【埋】
第 10 讲 二维数组本质是"数组的数组"          【埋】
第 11 讲 字符串本质是字符数组               【埋】
第 16 讲 指针初步：地址、取地址              【收一半】
第 27 讲 链表：不连续的"数组"               【收】
```

### 8.4 每讲自检

- 至少埋 1 个新伏笔
- 至少回收 1 个旧伏笔

---

## 九、难度曲线

### 9.1 难度比例要求

| 难度 | 建议占比 |
|---|---|
| ⭐⭐ 简单 | 40% |
| ⭐⭐⭐ 中等 | 45% |
| ⭐⭐⭐⭐ 较难 | 15% |
| ⭐⭐⭐⭐⭐ 难 | 0% |

### 9.2 已发现的问题（lesson-01～04）

| 讲次 | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | 问题 |
|---|---|---|---|---|
| 01 | 43% | 18% | 39% | ⭐⭐⭐ 不足 |
| 02 | 16% | 47% | 37% | ⭐⭐ 不足 |
| 03 | 11% | 64% | 18% | ⭐⭐ 不足 |
| 04 | 21% | 57% | 7% | ⭐⭐ 偏少 |

### 9.3 后续指导

- 每讲 ⭐⭐ 至少 40%
- 每讲 ⭐⭐⭐⭐ 不超过 15%
- 超纲内容用"初赛渗透 + 伏笔"处理

---

## 十、自检清单

### 10.0 本章定位

本章清单是**辅助工具**，不是硬性标准。

判断一讲好不好的最终依据是 **4 条底层目的**（见 1.2 节）。

**若清单条目与 4 条目的冲突，以目的为准。**

---

### 10.1 四问（对应四条目的）

#### 问 1：贴不贴合认知起点？

- [ ] 只学过 Scratch 的学生，看得懂这一讲吗？
- [ ] 抽象概念有没有生活类比？
- [ ] 有没有在"文本编程"和"图形化"之间架桥？
- [ ] 有没有使用学生已熟悉的词汇？

> **学生看得懂，才学得会。**

#### 问 2：竞赛指向明确吗？

- [ ] 学完这一讲，能解对应的竞赛题吗？
- [ ] 里程碑题目选得对吗？
- [ ] 有没有明确"这一讲对应哪个考点"？
- [ ] 学生能不能说出"我今天会做什么类型的题了"？

> **能解题，才叫会。**

#### 问 3：考点覆盖完整吗？

- [ ] 对照大纲（第七章），本讲的子知识点都讲到了吗？
- [ ] 每个子知识点有 1 个核心概念 + 1 个例子 + 1 个练习？
- [ ] 有没有超纲内容？
- [ ] 有没有遗漏的高频考点？

> **考点不漏，才敢上考场。**

#### 问 4：内容有趣吗？

- [ ] 有没有故事、类比、反常识？
- [ ] Extra 四要素齐吗？
- [ ] 每 3—5 页有对话吗？
- [ ] 有没有埋新伏笔、回收旧伏笔？
- [ ] 有没有跨学科连接？
- [ ] 有没有合适的动画演示？

> **有趣，才有下一次。**

---

### 10.2 结构与节奏

- [ ] 页数在 24—30 页？
- [ ] 有上节回顾、本节目标、学习地图、总结、作业、预告吗？
- [ ] 有没有连续 3 页同一 type？
- [ ] 70 分钟处的休息点安排了吗？

### 10.3 难度分布

- [ ] ⭐⭐ 大约 40%？
- [ ] ⭐⭐⭐ 大约 45%？
- [ ] ⭐⭐⭐⭐ 不超过 15%？

### 10.4 数据格式

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

### 10.5 教学节奏

- [ ] 概念页后紧跟例子？
- [ ] 例子后紧跟练习？
- [ ] 抽象概念前有生活类比？
- [ ] 结尾有悬念（下节预告）？

---

### 10.6 一条底线

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

---

## 附录：给 AI 模型的生成提示

生成新讲次数据时，请遵循：

1. **严格按组件数据字段生成**（第四章）
2. **遵循每讲 28 页模板**（6.1）
3. **每讲 1 个核心抽象概念**（第七章）
4. **埋 1 个伏笔，回收 1 个伏笔**（第八章）
5. **每 3—5 页有 dialog**（6.2）
6. **Extra 四要素齐全**（6.3）
7. **chapterTag 用常用值清单**（3.3）
8. **HTML 转义正确**（3.5.1）；**字符串里 `\n` 写 `\\n`**（3.5.2）
9. **代码迁移**：`code-split` 用 snippet，`level-map` answer 不用（3.6）
10. **snippet 行号** = 文件实际行号（3.8）
11. **动画数据**：用 `xxx-animation` 类型（第五章）
12. **生成后对照自检清单**（第十章）

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

---

**GUIDE.md 结束。项目架构见 ARCHITECTURE.md，历史记录见 CHANGELOG.md。**
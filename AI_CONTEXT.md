# 《小C的C++冒险》课程设计文档 v1.4

> **用途**：本项目唯一真实来源（Single Source of Truth）
> **维护**：每次课程设计变更后更新本文档
> **适用**：人、AI 模型、后续维护者
> **最后更新**：2025-06（lesson-01～05 已完成）
> **优先级原则**：**用户需求 > lesson 数据 > 文档**。当文档与 lesson 冲突时，默认以 lesson 为准，同时完善文档。
>
> **版本变更摘要**：
> - v1.0：初版
> - v1.1：chapterTag 规则、quiz 类型说明、可选字段默认值等
> - v1.2：可选字段默认值、字符串转义、quote author 格式
> - v1.3：snippet 规范、代码文件迁移规范
> - **v1.4**：snippet 行号改为"保留文件实际行号"；自检清单重构为"目的导向"；lesson-05 完成

---

## 一、项目概览

### 1.1 底层目的（4 条，不可妥协）

1. **为只学过图形化的学生教学 C++**
2. **使之具备参加比赛的能力**
3. **课堂知识点覆盖竞赛知识**
4. **内容丰富有趣，知识面扩展**

### 1.2 项目信息

| 项 | 内容 |
|---|---|
| 课程名 | 《小C的C++冒险》 |
| 对象 | 6年级—初二，学过 Scratch，零 C++ 基础 |
| 总讲次 | 48 讲（6 模块 × 8 讲） |
| 每讲时长 | 150 分钟 |
| 每讲页数 | 24—30 页 |
| 角色 | 小C（机器人）、同学（学习者）、老师、小码 |
| 核心理念 | 每讲 1 个核心抽象概念 + 2—4 子知识点 + 伏笔链 |

---

## 二、技术架构

### 2.1 技术栈

| 项 | 技术 |
|---|---|
| 框架 | Vue 3（Composition API） |
| 构建 | Vite |
| 路由 | Vue Router（Hash 模式） |
| 样式 | 原生 CSS + CSS 变量主题 |
| 数据 | JS 模块（`src/data/lesson-XX.js`） |
| 代码 | 外部 `.cpp` 文件（`public/codes/lesson-XX/`） |

### 2.2 目录结构

```
C_Vite/
├── public/codes/lesson-XX/    # 外部 .cpp 文件
├── src/
│   ├── components/
│   │   ├── common/            # 公共 UI
│   │   ├── level-map/         # 练习页子组件
│   │   └── slides/            # 15 个版式组件
│   ├── composables/
│   ├── config/
│   ├── data/                  # 课程数据
│   ├── router/
│   ├── styles/                # 10 个 CSS 文件
│   └── views/
└── ...
```

### 2.3 渲染流程

```
URL → useSlide → lesson-XX.js → slide 数据
  ↓
SlideView → 按 type 匹配组件
  ↓
组件读取 slide.data 渲染
  ↓
（如有 codeFile）CodeBlock → useCodeLoader → fetch .cpp → snippet 提取 → 渲染
  ↓
useStepCount → provideStep → StepWrapper 控制分步
```

### 2.4 关键约束

| 约束 | 值 |
|---|---|
| 步数起始 | `current` 从 1 开始 |
| 步数上报 | `useStepCount(emit, () => n)` |
| 步数显示 | `step <= current` 时显示 |
| 类型命名 | 组件名自动转 kebab-case |

---

## 三、数据格式规范

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

#### chapterTag 规则

| 值 | 效果 |
|---|---|
| 省略 / `false` | 不显示 |
| 字符串（`'第 1 讲 · 概念理解'`） | 显示 |

格式：`第 N 讲 · 类别`，N 是**阿拉伯数字**。

### 3.2.1 可选字段默认值

**数组类**（缺省为 `[]`）：
`annotations` / `groups` / `cards` / `items` / `lines` / `points` / `hints` / `questions` / `options`

**对象类**：

| 字段 | 默认 |
|---|---|
| `extra.variant` | `'card-primary'` |
| `answer.title` | `'✅ 参考代码'` |

### 3.3 HTML 与字符串

#### 3.3.1 HTML 渲染规则

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

#### 3.3.2 字符串转义

| 想显示 | 应写 |
|---|---|
| `\n` | `'\\n'` |
| `\t` | `'\\t'` |
| `\` | `'\\\\'` |

### 3.4 样式变量

**字号**：`--fs-slide-title` / `--fs-card-title` / `--fs-code` / `--fs-quiz-*` 等
**颜色**：`--primary` / `--accent` / `--success` / `--error` / `--text-*` / `--card-*`

**字号缩放**：`calc(XXpx * var(--font-scale))`，4 档缩放。

### 3.5 snippet 规范（v1.4 更新）

#### 背景

`.cpp` 文件完整可编译，页面上只显示教学片段。用 `// @snippet-start` / `// @snippet-end` 标记"显示区"。

#### 标记格式

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

#### JS 引用

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

**无 snippet 时**：显示完整文件。

#### 判断哪些页面需要 snippet

| slide.type | 页面应显示 | 需要 snippet |
|---|---|---|
| `code-split`（语法演示） | 片段 | ✅ |
| `level-map` 的 answer | 完整程序 | ❌ |
| `split`（用法 A） | 片段 | ✅ |
| `quiz` 的 questionCode | 片段 | ❌（不支持 codeFile） |

**口诀**：**语法演示用 snippet，练习答案不用。**

#### annotations 行号规则（v1.4 更新）

**`annotations[].line` = 文件的实际行号（从 1 开始数）。**

**页面左侧代码块行号也保留文件实际行号**（不从 1 重新计数）。

**规则**：
- `@snippet-start` / `@snippet-end` 标记行**算行号**
- 空行、注释行**也算行号**
- 同一行可以被多个注释引用

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

页面显示行号 **6, 7, 8, 9, 10, 11, 12**（保留原值）。

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

**收益**：改代码时只需看文件行号，一一对应，无需换算。

#### CodeBlock 的容错

若 snippet 标记不存在，**打印 warning 并显示完整代码**。

#### 未来分栏（暂缓）

多段 snippet 用数组：

```js
snippet: ['part1', 'part2'],
layout: 'two-cols'
```

**现在只实现单段 snippet**，数据格式预留数组接口。

### 3.6 代码文件迁移规范

#### 目录结构

```
public/codes/lesson-XX/
```

#### 命名规范

- **不加序号前缀**
- **语义化**：`hello-world.cpp`、`leap-year.cpp`
- **小写 + 短横线**
- **同名加后缀**：`ab-demo.cpp` / `ab-practice.cpp`
- **相同代码复用**

#### JS 引用

```js
codeFile: 'codes/lesson-01/hello-world.cpp'
```

**路径规则**：
- 不加 `public/` 前缀
- 不以 `/` 开头
- 相对 `public/` 目录

#### 迁移判断（三档）

| 档 | 特征 | 处理 |
|---|---|---|
| A | 已有 `#include` + `main` | ✅ 直接迁移 |
| B | 缺头部但逻辑完整 | ✅ 迁移 + 补头部 + snippet 标记 |
| C | 纯片段（无 I/O 逻辑） | ❌ 保持内联 |

**口诀**：**有输入输出逻辑 → 迁；只有表达式 → 留。**

---

## 四、15 种组件详解

### 4.1 组件清单

| # | 组件 | type | 用途 |
|---|---|---|---|
| 1 | CoverSlide | `cover` | 封面 |
| 2 | GridSlide | `grid` | 网格卡片 |
| 3 | DialogSlide | `dialog` | 角色对话 |
| 4 | CodeSplitSlide | `code-split` | 代码 + 标注 |
| 5 | CompareSlide | `compare` | 错误 vs 正确 |
| 6 | FlowSlide | `flow` | 流程图 |
| 7 | TimelineSlide | `timeline` | 时间线 |
| 8 | SplitSlide | `split` | 左右分栏 |
| 9 | BigNumberSlide | `big-number` | 大数字强调 |
| 10 | LevelMapSlide | `level-map` | 编程练习 |
| 11 | QuoteSlide | `quote` | 金句总结 |
| 12 | RadialSlide | `radial` | 径向展开 |
| 13 | TransitionSlide | `transition` | 过渡页 |
| 14 | EndingSlide | `ending` | 结束页 |
| 15 | QuizSlide | `quiz` | 选择题/判断题 |

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
**约束**：annotations 建议 3—5 条；`code` 与 `codeFile` 二选一，`code` 优先
**步数**：`1 + annotations.length + (output ? 1 : 0) + (extra ? 1 : 0)`

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
**节点字段**：icon（可选）/ label（必填）/ sub（可选）/ glow（可选）
**步数**：`Σ(row.length × 2 - 1) + (extra ? 1 : 0)`

#### timeline

```js
{
  type: 'timeline',
  data: {
    items: [
      {
        icon: '🧠', badge: '基础', title: '标题',
        desc: 'HTML', points: ['HTML']
      }
    ],
    extra: { ... }
  }
}
```
**item 字段**：icon / badge 可选；title 必填；desc / points 可选
**约束**：items 建议 4—6 项
**步数**：`items.length + (extra ? 1 : 0)`

#### split

**用法 A**（代码 + 注释）：`{ code / codeFile, snippet, annotations }`
**用法 B**（左右分栏）：`{ left: { icon/items }, right: { icon/items } }`

**步数**：A：`1 + annotations.length + (output ? 1 : 0) + (extra ? 1 : 0)`；B：`leftCount + rightCount + (extra ? 1 : 0)`

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
步数：`1 + (card ? 1 : 0) + (extra ? 1 : 0)`

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
**约束**：hints 0—6 条；answer 单对象或数组
**步数**：`1 + hints.length + (answer ? 1 : 0) + (analysis ? 1 : 0) + (extra ? 1 : 0)`

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
步数：`1 + points.length + (highlight ? 1 : 0) + (extra ? 1 : 0)`

#### radial

```js
{
  type: 'radial',
  data: {
    center: '中心词',                 // 下一讲的核心词
    items: [{ text: '分支', pos: 'top-left' }],
    extra: { ... }
  }
}
```
**约束**：items 2—6 个
**步数**：`1 + items.length + (extra ? 1 : 0)`

#### transition / ending

```js
{ type: 'transition', title, subtitle, data: { note } }
{ type: 'ending', title, subtitle, chapterTag: false, data: { slogan, extra } }
```
步数：1

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
        optionLayout: 'auto',      // auto/vertical/horizontal/two-cols/code
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
**约束**：一页 1—5 题
**步数**：`questions.length × 2 + (extra ? 1 : 0)`

---

## 五、内容设计规则

### 5.1 每讲标准结构（28 页模板）

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

### 5.2 每种 type 分布表

| type | 推荐 | 上下限 |
|---|---|---|
| cover / ending / quote / radial | 1 | 固定 |
| timeline | 2—3 | 1—4 |
| grid | 2—4 | 1—5 |
| dialog | **4—6** | 3—7 |
| code-split | 3—5 | 2—7 |
| level-map | 2—3 | 1—4 |
| compare / flow / split | 1—2 | 0—3 |
| transition | 1 | 0—2 |
| big-number | 0—1 | 0—2 |
| **quiz** | **1—2** | 1—3 |

### 5.3 对话规则

| 规则 | 值 |
|---|---|
| 对话间隔 | 每 3—5 页至少 1 页 |
| 每讲 dialog 数 | ≥ 4 页 |
| 对话轮数 | 4—8 轮 |

### 5.4 Extra 4 要素

| 要素 | 说明 |
|---|---|
| 具体细节 | 说清"是什么" |
| 具体数字 | 年份之外的具体数字 |
| 故事情节 | 有冲突、转折 |
| 跨学科金句 | 与其他学科连接 |

### 5.5 章节标签常用值

`概念理解` / `代码拆解` / `实战演练` / `OJ 实战` / `输入输出` / `概念铺垫` / `易错点` / `知识讲解` / `初赛渗透` / `答疑` / `复习` / `课堂小测` / `下节预告`

### 5.6 wiki 链接

每段最多 5 个，格式：

```html
<a href="https://baike.baidu.com/item/词条" target="_blank" class="wiki-link">文字</a>
```

### 5.7 禁止事项

1. ❌ 一页塞多个核心抽象概念
2. ❌ 只讲语法不讲应用
3. ❌ 知识扩展只有 1—2 句
4. ❌ 连续 3 页同一 type
5. ❌ 练习题改成 dialog
6. ❌ 核心抽象概念不给类比
7. ❌ 页与页之间无衔接
8. ❌ 引入超纲知识点

### 5.8 练习题/作业规范

| 类型 | 数量 |
|---|---|
| 课堂练习 | 2 道（level-map） |
| 课后作业 | 3 道（2 基础 + 1 挑战） |
| 课堂小测 | 3—5 道（quiz） |

---

## 六、48 讲课程大纲

### 6.1 category 与模块对齐

| 模块 | 讲次 | category |
|---|---|---|
| 一、C++ 语法核心 | 1—8 | 语法与基础算法 |
| 二、数组与函数 | 9—16 | 语法与基础算法 |
| 三、基础算法 | 17—24 | 语法与基础算法 |
| 四、数据结构 | 25—32 | 数据结构与搜索 |
| 五、数学与进阶 | 33—40 | 数学与字符串 |
| 六、竞赛冲刺 | 41—48 | 竞赛冲刺 |

### 6.2 模块一：C++ 语法核心（1—8）

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

### 6.3 模块二：数组与函数（9—16）

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

### 6.4 模块三：基础算法（17—24）

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

### 6.5 模块四：数据结构（25—32）

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

### 6.6 模块五：数学与进阶（33—40）

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

### 6.7 模块六：竞赛冲刺（41—48）

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

### 6.8 已完成进度

| 讲次 | 状态 |
|---|---|
| lesson-01～05 | ✅ 已完成 |
| lesson-06～48 | ⏳ 待生成 |

---

## 七、伏笔链系统

### 7.1 设计原则

| 原则 | 说明 |
|---|---|
| 只埋不教 | 伏笔只提一句，不展开 |
| 引发好奇 | 用悬念、反常识来埋 |
| 有回收点 | 后续讲次明确回收 |
| 不超 1 页 | 一句话呈现 |
| 不打断主线 | 只出现在 dialog / Extra / radial |

### 7.2 三种呈现方式

| 方式 | 位置 | 格式 |
|---|---|---|
| 对话伏笔 | dialog 页 | 小C说"这个问题，第 X 讲揭晓" |
| Extra 伏笔 | Extra 末尾 | 加一行"🔮 伏笔：..." |
| 预告伏笔 | radial 页 | "远期彩蛋：..." |

### 7.3 三条核心伏笔链

#### 伏笔链 1：进制与位运算

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

#### 伏笔链 2：递归 → 栈 → DP

```
第 13 讲 函数调用时计算机怎么记住位置？      【埋】
第 14 讲 递归的底层是什么？                 【埋】
第 14 讲 递归太慢怎么办？                   【埋】
第 21 讲 递推和递归什么关系？               【埋】
第 24 讲 简单 DP：记忆化就是"存下来"        【收一半】
第 25 讲 栈：递归的底层就是栈               【收】
第 45 讲 DP 进阶：状态怎么设计               【再收】
```

#### 伏笔链 3：数组 → 内存 → 指针 → 链表

```
第 5 讲  数组为什么访问快？因为连续内存      【埋】
第 5 讲  数组是连续内存，能不能不连续？      【埋】
第 10 讲 二维数组本质是"数组的数组"          【埋】
第 11 讲 字符串本质是字符数组               【埋】
第 16 讲 指针初步：地址、取地址              【收一半】
第 27 讲 链表：不连续的"数组"               【收】
```

### 7.4 已应用伏笔清单（lesson-01～05）

| # | 讲次-slide | 埋伏笔 | 回收讲次 |
|---|---|---|---|
| 1-1 | 01-05 | 0 和 1 | 35 |
| 1-2 | 01-07 | 内存 | 16 |
| 1-3 | 01-10 | ASCII | 35 |
| 1-4 | 01-13 | endl/二进制 | 35 |
| 1-5 | 01-23 | 变量 | 02 |
| 1-6 | 01-25 | int 21亿/浮点 | 35 |
| 2-1 | 02-05 | 地址二进制 | 35 |
| 2-2 | 02-05 | 地址二进制 | 35 |
| 2-3 | 02-08 | int 21亿 | 35 |
| 2-4 | 02-10 | ASCII | 35 |
| 2-5 | 02-11 | 布尔代数/电路 | 35 |
| 2-6 | 02-21 | 浮点精度 | 35、38 |
| 2-7 | 02-27 | 数组 | 09→05 |
| 2-8 | 02-29 | 位运算 | 35 |
| 3-1 | 03-02 | 回收 bool/布尔 | — |
| 3-2 | 03-05 | 位运算 | 35 |
| 3-3 | 03-08 | 条件本质 0/1 | 35 |
| 3-4 | 03-09 | 布尔代数/电路 | 35 |
| 3-5 | 03-26 | 循环 | 04 |
| 3-6 | 03-28 | 循环效率 | 40 |
| 4-1 | 04-02 | 回收分支只能走一次 | — |
| 4-2 | 04-08 | 数组/范围 for | 05、09 |
| 4-3 | 04-24、26 | 数组 | 05 |
| 5-1 | 05-02 | 回收第 4 讲"数据存哪" | — |
| 5-2 | 05-08 | 链表、指针 | 16、27 |
| 5-3 | 05-08 | 引用地址 | 16 |
| 5-4 | 05-23 | vector | STL 讲次 |
| 5-5 | 05-24 | 链表 | 27 |
| 5-6 | 05-26 | 字符串本质 | 06 |

---

## 八、难度曲线设计

### 8.1 难度比例要求

| 难度 | 建议占比 |
|---|---|
| ⭐⭐ 简单 | 40% |
| ⭐⭐⭐ 中等 | 45% |
| ⭐⭐⭐⭐ 较难 | 15% |
| ⭐⭐⭐⭐⭐ 难 | 0% |

### 8.2 已发现的问题（lesson-01～04）

| 讲次 | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | 问题 |
|---|---|---|---|---|
| 01 | 43% | 18% | 39% | ⭐⭐⭐ 不足 |
| 02 | 16% | 47% | 37% | ⭐⭐ 不足 |
| 03 | 11% | 64% | 18% | ⭐⭐ 不足 |
| 04 | 21% | 57% | 7% | ⭐⭐ 偏少 |

### 8.3 后续指导

- 每讲 ⭐⭐ 至少 40%
- 每讲 ⭐⭐⭐⭐ 不超过 15%
- 超纲内容用"初赛渗透 + 伏笔"处理

---

## 九、QuizSlide 使用指南

### 9.1 何时使用

| 场景 | 推荐 |
|---|---|
| 概念讲完后的小测 | ✅ |
| 初赛渗透题 | ✅ |
| 编程题 | ❌ 用 level-map |
| 代码错误对比 | ❌ 用 compare |

### 9.2 题目来源优先级

1. CSP-J 历年真题（标注年份和题号）
2. CSP-J 模拟题
3. 信息学奥赛总复习题
4. 自编题（标注"自编"）

### 9.3 六种题型模板

1. **纯文本概念题**
2. **读程序写结果**（`questionCode` + 纯文字选项）
3. **程序填空**（`questionCode` 含空）
4. **代码选项**（`optionLayout: 'code'` + `options[].code`）
5. **判断题**（`type: 'judge'` + 2 选项）
6. **长文本辨析**（选项长，自动 two-cols）

### 9.4 每讲题目数量建议

| 讲次类型 | 建议题目数 |
|---|---|
| 概念型 | 5 题（3 选择 + 2 判断） |
| 代码型 | 4 题（2 概念 + 2 代码） |
| 算法型 | 3 题（2 概念 + 1 代码） |
| 竞赛冲刺 | 2 题（真题） |

---

## 十、配置补丁

### 10.1 `config/defaults.js`

```js
export const TYPE_LABELS = {
  // ...原有
  quiz: '课堂小测'
};
```

### 10.2 `config/schemas.js`

```js
quiz: {
  required: ['questions'],
  checks: [
    (d) => d.questions.length >= 1 && d.questions.length <= 5 || '题目建议 1—5 道',
    (d) => d.questions.every(q => q.options?.length >= 2) || '每题至少 2 个选项',
    (d) => d.questions.every(q => q.options.some(o => o.correct)) || '每题至少 1 个正确答案'
  ]
}
```

### 10.3 `config/characters.js`

主用：`student`（同学）、`robot`（小C）
可选：`teacher`（老师）、`xiaoma`（小码）

### 10.4 `data/index.js`

```js
export const CATEGORY_ORDER = [
  '语法与基础算法',      // 1—24 讲
  '数据结构与搜索',      // 25—32 讲
  'DP 与图论进阶',       // 预留
  '数学与字符串',        // 33—40 讲
  '竞赛冲刺'             // 41—48 讲
];
```

---

## 十一、自检清单（目的导向）

### 11.0 本章定位

本章清单是**辅助工具**，不是硬性标准。

判断一讲好不好的最终依据是 **4 条底层目的**（见 1.1 节）：

1. **为只学过图形化的学生教学 C++**
2. **使之具备参加比赛的能力**
3. **课堂知识点覆盖竞赛知识**
4. **内容丰富有趣，知识面扩展**

清单的作用：
- ✅ **提醒**：别漏掉某个维度
- ✅ **兜底**：防止严重偏离
- ❌ **不是及格线**：不用机械打勾
- ❌ **不是评分表**：不打分

**若清单条目与 4 条目的冲突，以目的为准。**

清单本身**可迭代**：每讲、每轮都可以增删条目。

---

### 11.1 四问（对应四条目的）

每讲生成后，先问自己这四个问题：

#### 问 1：贴不贴合认知起点？

- [ ] 只学过 Scratch 的学生，看得懂这一讲吗？
- [ ] 抽象概念有没有生活类比？
- [ ] 有没有在"文本编程"和"图形化"之间架桥？
- [ ] 有没有使用学生已熟悉的词汇（如"盒子""岔路口"）？

> 目的 1 的检验：**学生看得懂，才学得会。**

#### 问 2：竞赛指向明确吗？

- [ ] 学完这一讲，能解对应的竞赛题吗？
- [ ] 里程碑题目选得对吗？（如洛谷难度、CSP-J 真题）
- [ ] 有没有明确"这一讲对应哪个考点"？
- [ ] 学生能不能说出"我今天会做什么类型的题了"？

> 目的 2 的检验：**能解题，才叫会。**

#### 问 3：考点覆盖完整吗？

- [ ] 对照大纲（第六章），本讲的子知识点都讲到了吗？
- [ ] 每个子知识点有 1 个核心概念 + 1 个例子 + 1 个练习？
- [ ] 有没有超纲内容？（超纲的用"初赛渗透 + 伏笔"处理）
- [ ] 有没有遗漏的高频考点？

> 目的 3 的检验：**考点不漏，才敢上考场。**

#### 问 4：内容有趣吗？

- [ ] 有没有故事、类比、反常识？
- [ ] Extra 四要素（细节 + 数字 + 故事 + 金句）齐吗？
- [ ] 每 3—5 页有对话吗？
- [ ] 有没有埋新伏笔、回收旧伏笔？
- [ ] 有没有跨学科连接（数学、物理、历史）？

> 目的 4 的检验：**有趣，才有下一次。**

---

### 11.2 内容层面自问

以下不是"必须全过"，而是"值得检查"。

#### 结构与节奏

- [ ] 页数在合理范围吗？（24—30 页）
- [ ] 有上节回顾、本节目标、学习地图、总结、作业、预告吗？
- [ ] 有没有连续 3 页同一 type？
- [ ] 70 分钟处的休息点安排了吗？

#### 难度分布

- [ ] ⭐⭐ 大约 40%？
- [ ] ⭐⭐⭐ 大约 45%？
- [ ] ⭐⭐⭐⭐ 不超过 15%？
- [ ] 有没有 ⭐⭐⭐⭐⭐（本阶段不该出现的）？

#### 对话与角色

- [ ] dialog 页 ≥ 4 页？
- [ ] 最大 dialog 间隔 ≤ 5 页？
- [ ] 小C和同学的对话自然吗？

#### 练习与作业

- [ ] 课堂练习 2 道？
- [ ] 课后作业 3 道（2 基础 + 1 挑战）？
- [ ] 课堂小测 3—5 题？
- [ ] 练习难度适中或稍难？

---

### 11.3 数据格式自问

**这一部分比较硬，因为格式错误会导致渲染问题。**

- [ ] `total` 与 `slides.length` 一致？
- [ ] slide `id` 从 1 连续？
- [ ] `title` 是纯文本，`desc` 用 HTML？
- [ ] HTML 里 `<` 写成 `&lt;`、`>` 写成 `&gt;`？
- [ ] 字符串里 `\n` 写成 `\\n`？
- [ ] `codeFile` 路径不带 `public/`、不以 `/` 开头？
- [ ] snippet 标记成对出现？
- [ ] `annotations[].line` 是**文件实际行号**（从 1 数，含标记行、空行、注释行）？
- [ ] quiz 每题至少 1 个 `correct: true`？
- [ ] wiki 链接用 `class="wiki-link"`？

---

### 11.4 教学节奏自问

- [ ] 概念页后紧跟例子？
- [ ] 例子后紧跟练习？
- [ ] 抽象概念前有生活类比？
- [ ] 结尾有悬念（下节预告）？
- [ ] 有"未解决的问题"引出本节？

---

### 11.5 迭代记录

**清单不固定。** 每轮课程迭代后，记录本轮的调整。

| 日期 | 调整内容 | 触发原因 |
|---|---|---|
| 2025-06 | 新增 quiz 相关自问 | QuizSlide 上线 |
| 2025-06 | 新增 snippet 相关自问 | 代码迁移实施 |
| 2025-06 | snippet 行号改为"保留文件实际行号" | 维护方便 |
| — | （持续记录） | — |

**调整原则**：
- 若某个条目**从未发现问题** → 可删（减少噪音）
- 若某个问题**反复出现** → 新增条目
- 若条目与目的**冲突** → 删条目，保目的

---

### 11.6 一条底线

**不要为了"过清单"而写课程。**

清单是**鞋带**，不是**脚**。目的是**走路**。

如果一讲内容很好，但有 2 条清单没过——
**先判断内容是否真的服务于 4 条目的。**
如果服务，那清单该改；如果内容偏了，那内容该改。

**永远以目的为准，不以清单为准。**

---

## 十二、常见错误与修复

### 12.1 HTML 实体显示错误

**症状**：`&lt;` 显示为字面文本
**原因**：字段用 `{{ }}` 而不是 `v-html`
**修复**：确认组件字段用 `v-html` 渲染

### 12.2 QuizSlide 虚线提前显示

**修复**：把虚线移到 `.quiz-head`

### 12.3 选项布局拥挤

**修复**：自动布局检测加"含 HTML → two-cols"

### 12.4 步数不匹配

**修复**：对照组件规范重新计算

### 12.5 total 与 slides.length 不符

**修复**：改 `total` 或增删 slide

### 12.6 路由 404

**修复**：确认 `data/lesson-XX.js` 存在，`slides[0].id === 1`

### 12.7 chapterTag 显示异常

**修复**：`chapterTag` 设为 `false` 或省略

### 12.8 字符串里 `\n` 变真换行

**修复**：改写为 `'\\n'`

### 12.9 codeFile 加载失败

**排查**：文件存在？路径从 `codes/` 开始？不以 `/` 开头？控制台 404？

### 12.10 snippet 未生效

**排查**：有 `@snippet-start` / `@snippet-end` 标记？JS 有 `snippet: 'main'`？名称一致？控制台 warning？

### 12.11 annotations 行号与代码块不一致

**症状**：注释卡片标"第 2 行"，但页面上第 2 行不是对应代码

**原因**：`annotations[].line` 用了相对片段行号，但页面显示文件实际行号

**修复**：改为文件实际行号（从 1 数，含标记行、空行、注释行）

### 12.12 Grid 卡片高度不一

**修复**：GridSlide 里给 `.step-wrapper` 加 `height: 100%`；`.step-wrapper > *` 加 `flex: 1; height: 100%`

### 12.13 MarkerTool 拖动后跟随鼠标

**原因**：`pointerdown` 时监听挂到 `document`，鼠标飞出窗口/落在 canvas 上时 `pointerup` 丢失

**修复**：用 `setPointerCapture` 把指针锁定到触发按钮；事件挂到按钮上；加 `window.blur` 兜底

### 12.14 CodeSplitSlide 左右长度差异大

**修复**：左右栏改为独立滚动（`.scroll-pane`）+ `.code-split-body` 外层不滚动

---

## 十三、附录：文件清单

### 13.1 组件文件

```
src/components/
├── common/
│   ├── Badge.vue
│   ├── CodeBlock.vue           # 支持 snippet（保留文件行号）
│   ├── ExtraCard.vue
│   ├── FontScaler.vue
│   ├── MarkerTool.vue          # 已修复拖动 bug
│   ├── SlideCard.vue
│   └── StepWrapper.vue         # 支持找最近滚动父容器
├── level-map/
│   ├── HintRow.vue
│   └── LevelNode.vue
└── slides/
    ├── index.js
    ├── CoverSlide.vue
    ├── GridSlide.vue           # 卡片等高
    ├── DialogSlide.vue
    ├── CodeSplitSlide.vue      # 左右独立滚动
    ├── CompareSlide.vue
    ├── FlowSlide.vue
    ├── TimelineSlide.vue
    ├── SplitSlide.vue
    ├── BigNumberSlide.vue
    ├── LevelMapSlide.vue
    ├── QuoteSlide.vue
    ├── RadialSlide.vue
    ├── TransitionSlide.vue
    ├── EndingSlide.vue
    └── QuizSlide.vue
```

### 13.2 配置文件

```
src/config/
├── index.js
├── characters.js
├── colors.js
├── defaults.js
├── labels.js
└── schemas.js
```

### 13.3 数据文件

```
src/data/
├── index.js
├── lesson-01.js ~ lesson-05.js  (已完成)
└── lesson-06.js ~ lesson-48.js  (待生成)
```

### 13.4 代码文件

```
public/codes/
├── lesson-01/
├── lesson-02/
├── lesson-03/
├── lesson-04/
└── lesson-05/
```

### 13.5 样式文件

```
src/styles/
├── main.css
├── theme.css
├── reset.css
├── layout.css
├── components.css
├── animation.css
├── syntax.css
├── pages.css
├── responsive.css
└── print.css
```

### 13.6 composables

```
src/composables/
├── useStep.js
├── useStepCount.js
├── useSlide.js
├── useSlideNav.js
├── useCodeLoader.js
├── useHighlight.js
└── useCopy.js
```

---

## 十四、版本记录

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.0 | 2025-06 | 初版 |
| v1.1 | 2025-06 | chapterTag 规则、quiz 类型、可选字段默认值 |
| v1.2 | 2025-06 | 可选字段默认值、字符串转义、quote author |
| v1.3 | 2025-06 | snippet 规范、代码迁移规范 |
| **v1.4** | 2025-06 | snippet 行号改为"保留文件实际行号"；自检清单重构为"目的导向"；lesson-05 完成；加入 GridSlide 等高、MarkerTool 修复、CodeSplitSlide 独立滚动等 |

---

## 附录：给 AI 模型的生成提示

生成新讲次数据时，请遵循：

1. **严格按组件数据字段生成**（见第四章）
2. **遵循每讲 28 页模板**（见 5.1）
3. **每种 type 数量在推荐范围内**（见 5.2）
4. **每讲 1 个核心抽象概念**（见第六章大纲）
5. **埋 1 个伏笔，回收 1 个伏笔**（见第七章）
6. **每 3—5 页有 dialog**（见 5.3）
7. **Extra 四要素齐全**（见 5.4）
8. **chapterTag 用常用值清单**（见 5.5）
9. **HTML 转义正确**（见 3.3.1）；**字符串里 `\n` 写 `\\n`**（见 3.3.2）
10. **代码迁移**（见 3.6）：`code-split` 用 snippet，`level-map` answer 不用
11. **snippet 行号**：`annotations[].line` = 文件实际行号（从 1 数，含标记行、空行）
12. **生成后对照自检清单**（见第十一章）

**优先级原则**：
> **用户需求 > lesson 数据 > 文档**。当文档与 lesson 冲突时，默认以 lesson 为准，同时完善文档。

**核心原则**：
> 面向 6 年级—初二学生，抽象概念必须有生活类比，难度不能超标，故事性优先。

**特别注意**：
- `answer`、`analysis`、`card` 等是可选字段
- `chapterTag` 可以省略
- `cover.accentWord` 必须是 `title` 的子串
- `grid` 同页内 `icon` 与 `number` 不混用
- `radial.center` 是下一讲的核心词
- `questionCode` / `options[].code` 用原始代码
- `desc` / `text` 里的 `<` `>` 必须转义为 `&lt;` `&gt;`
- `codeFile` 路径不带 `public/`、不以 `/` 开头
- **`annotations[].line` 用文件实际行号，不用相对片段行号**

---

**文档结束。新版本请更新"版本记录"。**
# 项目历史与进度（CHANGELOG.md）

> **用途**：版本记录、已应用伏笔清单、已完成讲次进度。
> **读者**：回查历史、了解进度的人。
> **最后更新**：2025-06（v1.5）

---

## 一、版本记录

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.0 | 2025-06 | 初版：项目概览、技术架构、数据格式、组件详解、内容规则、48 讲大纲、伏笔链、难度曲线、QuizSlide 指南、配置补丁、自检清单、常见错误、文件清单 |
| v1.1 | 2025-06 | chapterTag 规则、quiz 类型说明、可选字段默认值汇总 |
| v1.2 | 2025-06 | 可选字段默认值、字符串转义、quote author 格式 |
| v1.3 | 2025-06 | snippet 规范、代码文件迁移规范 |
| v1.4 | 2025-06 | snippet 行号保留文件实际行号；自检清单重构为"目的导向" |
| **v1.5** | 2025-06 | 新增动画演示系统；动画组件独立为 `animations/`；AnimationFrame 用双层缩放；删除旧架构（visual-layouts / visual-elements / VisualStepSlide）；新增 IntroCard 抽取；chapterTag 绝对定位；lesson-00 动画合集预览；**文档拆分为 GUIDE.md / ARCHITECTURE.md / CHANGELOG.md 三份** |

---

## 二、已完成讲次

| 讲次 | 主题 | 状态 | 页数 |
|---|---|---|---|
| lesson-00 | 动画合集预览 | ✅ 已完成 | 12 |
| lesson-01 | 初识 C++ | ✅ 已完成 | 30 |
| lesson-02 | 数据类型 | ✅ 已完成 | 30 |
| lesson-03 | 分支结构 | ✅ 已完成 | 30 |
| lesson-04 | 循环结构 | ✅ 已完成 | 30 |
| lesson-05 | 一维数组 | ✅ 已完成 | 29 |
| lesson-06 | 字符串基础 | ✅ 已完成 | 30 |
| lesson-07 | 函数 | ✅ 已完成 | 30 |
| lesson-08 | 递归 | ✅ 已完成 | 30 |
| lesson-09～48 | — | ⏳ 待生成 | — |

---

## 三、已应用伏笔清单

### 3.1 三条核心伏笔链（已完成部分）

#### 链 1：进制与位运算（埋到第 8 讲）

```
第 1 讲  计算机只认识 0 和 1                【埋 ✅】
第 2 讲  变量存在内存里，全是 0 和 1        【埋 ✅】
第 3 讲  int 21亿、char ASCII、类型转换    【埋 ✅】
第 4 讲  位运算未讲                        【埋 ✅】
第 5 讲  条件本质是 0 和 1                 【埋 ✅】
第 15 讲 文件里存的也是 0 和 1              【待埋】
第 16 讲 指针存的是地址，地址是数字         【待埋】
第 34 讲 快速幂用到了二进制                 【待埋】
第 35 讲 位运算与进制：正式揭晓             【待收】
第 45 讲 状态压缩 DP：位运算的进阶应用      【待再收】
```

#### 链 2：递归 → 栈 → DP（埋到第 8 讲）

```
第 13 讲 函数调用时计算机怎么记住位置？      【待埋】
第 14 讲 递归的底层是什么？                 【待埋】
第 14 讲 递归太慢怎么办？                   【待埋】
第 21 讲 递推和递归什么关系？               【待埋】
第 24 讲 简单 DP：记忆化就是"存下来"        【待收一半】
第 25 讲 栈：递归的底层就是栈               【待收】
第 45 讲 DP 进阶：状态怎么设计               【待再收】
```

#### 链 3：数组 → 内存 → 指针 → 链表（埋到第 8 讲）

```
第 9 讲  数组为什么访问快？因为连续内存      【待埋】
第 9 讲  数组是连续内存，能不能不连续？      【待埋】
第 10 讲 二维数组本质是"数组的数组"          【待埋】
第 11 讲 字符串本质是字符数组               【待埋】
第 16 讲 指针初步：地址、取地址              【待收一半】
第 27 讲 链表：不连续的"数组"               【待收】
```

### 3.2 已应用伏笔清单（lesson-01～08）

| # | 讲次-slide | 埋伏笔 | 回收讲次 | 呈现方式 |
|---|---|---|---|---|
| 1-1 | 01-05 | 0 和 1 | 35 | dialog |
| 1-2 | 01-07 | 内存 | 16 | Extra |
| 1-3 | 01-10 | ASCII | 35 | Extra |
| 1-4 | 01-13 | endl/二进制 | 35 | Extra |
| 1-5 | 01-23 | 变量 | 02 | Extra |
| 1-6 | 01-25 | int 21亿/浮点 | 35 | radial |
| 2-1 | 02-05 | 地址二进制 | 35 | dialog |
| 2-2 | 02-05 | 地址二进制 | 35 | Extra |
| 2-3 | 02-08 | int 21亿 | 35 | Extra |
| 2-4 | 02-10 | ASCII | 35 | Extra |
| 2-5 | 02-11 | 布尔代数/电路 | 35 | Extra |
| 2-6 | 02-21 | 浮点精度 | 35、38 | Extra |
| 2-7 | 02-27 | 数组 | 09→05 | Extra |
| 2-8 | 02-29 | 位运算 | 35 | radial |
| 3-1 | 03-02 | 回收 bool/布尔 | — | Extra |
| 3-2 | 03-05 | 位运算 | 35 | Extra |
| 3-3 | 03-08 | 条件本质 0/1 | 35 | Extra |
| 3-4 | 03-09 | 布尔代数/电路 | 35 | Extra |
| 3-5 | 03-26 | 循环 | 04 | Extra |
| 3-6 | 03-28 | 循环效率 | 40 | radial |
| 4-1 | 04-02 | 回收分支只能走一次 | — | Extra |
| 4-2 | 04-08 | 数组/范围 for | 05、09 | Extra |
| 4-3 | 04-24、26 | 数组 | 05 | Extra |
| 5-1 | 05-02 | 回收第 4 讲"数据存哪" | — | Extra |
| 5-2 | 05-08 | 链表、指针 | 16、27 | Extra |
| 5-3 | 05-08 | 引用地址 | 16 | Extra |
| 5-4 | 05-23 | vector | STL 讲次 | Extra |
| 5-5 | 05-24 | 链表 | 27 | Extra |
| 5-6 | 05-26 | 字符串本质 | 06 | radial |
| 6-1 | 06-22 | ASCII | 35 | dialog |
| 7-1 | 07-14 | 函数调用栈 | 25 | Extra |
| 8-1 | 08-10 | 栈溢出 | 25 | dialog |
| 8-2 | 08-15 | DP 记忆化 | 24 | Extra |
| 8-3 | 08-18 | 复杂度 | 40 | dialog |

### 3.3 待回查伏笔

**已埋未收**（截至 lesson-08）：

| 讲次-slide | 埋伏笔 | 回收讲次 |
|---|---|---|
| 01-05 | 0 和 1 | 35 |
| 01-07 | 内存 | 16 |
| 01-10 | ASCII | 35 |
| 01-13 | endl/二进制 | 35 |
| 01-25 | int 21亿 | 35 |
| 02-05 | 地址二进制 | 35 |
| 02-08 | int 21亿 | 35 |
| 02-10 | ASCII | 35 |
| 02-11 | 布尔代数 | 35 |
| 02-21 | 浮点精度 | 35、38 |
| 02-29 | 位运算 | 35 |
| 03-05 | 位运算 | 35 |
| 03-08 | 条件本质 0/1 | 35 |
| 03-09 | 布尔代数 | 35 |
| 03-28 | 循环效率 | 40 |
| 04-08 | 数组/范围 for | 05 ✅ 已收 |
| 05-02 | 数据存哪 | ✅ 已收 |
| 05-08 | 链表、指针 | 16、27 |
| 05-08 | 引用地址 | 16 |
| 05-23 | vector | STL |
| 05-24 | 链表 | 27 |
| 05-26 | 字符串本质 | ✅ 已收（06） |
| 06-22 | ASCII | 35 |
| 07-14 | 函数调用栈 | 25 |
| 08-10 | 栈溢出 | 25 |
| 08-15 | DP 记忆化 | 24 |
| 08-18 | 复杂度 | 40 |

**第 35 讲是"回收重镇"**——需集中回收 9 个伏笔。

---

## 四、项目文件清单（快照）

### 4.1 组件文件

```
src/components/
├── common/
│   ├── Badge.vue
│   ├── CodeBlock.vue
│   ├── ExtraCard.vue
│   ├── FontScaler.vue
│   ├── IntroCard.vue
│   ├── MarkerTool.vue
│   ├── SlideCard.vue
│   └── StepWrapper.vue
├── level-map/
│   ├── HintRow.vue
│   └── LevelNode.vue
├── animations/
│   ├── AnimationFrame.vue
│   ├── HanoiAnimationSlide.vue
│   ├── StackAnimationSlide.vue
│   ├── QueueAnimationSlide.vue
│   ├── SortAnimationSlide.vue
│   ├── LinkedListAnimationSlide.vue
│   ├── TreeAnimationSlide.vue
│   ├── BinarySearchAnimationSlide.vue
│   ├── GraphAnimationSlide.vue
│   └── DPTableAnimationSlide.vue
└── slides/
    ├── index.js
    ├── CoverSlide.vue
    ├── GridSlide.vue
    ├── DialogSlide.vue
    ├── CodeSplitSlide.vue
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
    ├── QuizSlide.vue
    └── EvolutionSlide.vue
```

### 4.2 配置文件

```
src/config/
├── index.js
├── characters.js
├── colors.js
├── defaults.js
├── labels.js
└── schemas.js
```

### 4.3 数据文件

```
src/data/
├── index.js
├── lesson-00.js
└── lesson-01.js ~ lesson-08.js
```

### 4.4 代码文件

```
public/codes/
├── lesson-01/ ~ lesson-08/
```

### 4.5 composables

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

### 4.6 样式文件

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

### 4.7 lib

```
src/lib/
└── tree-layout.js
```

### 4.8 脚本

```
根目录/
└── verify-codes.js
```

---

## 五、已删除的旧架构

**v1.5 删除**：

- ❌ `src/components/slides/VisualStepSlide.vue`
- ❌ `src/lib/visual-layouts/`（整个目录）
- ❌ `src/components/visual-elements/`（整个目录）
- ❌ `src/data/animations/hanoi-*.js`

**替换为**：

- ✅ `src/components/animations/*`（10 个独立动画组件）
- ✅ `src/lib/tree-layout.js`（仅树的布局算法）

**原因**：旧架构把"引擎 + 布局 + 元素 + 数据"四层分开，加新动画要改多处；新架构每个动画**独立 1 个文件**，简单清晰。

---

**CHANGELOG.md 结束。数据格式见 GUIDE.md，架构见 ARCHITECTURE.md。**
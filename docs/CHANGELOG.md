# 项目历史与进度（CHANGELOG.md）

> **用途**：版本记录、已应用伏笔清单、已完成讲次进度。
> **读者**：回查历史、了解进度的人。
> **最后更新**：2026-09（v3.0 阶段一完成）

---

## 一、版本记录

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.0 | 2025-06 | 初版：项目概览、技术架构、数据格式、组件详解、内容规则、48 讲大纲、伏笔链、难度曲线、QuizSlide 指南、配置补丁、自检清单、常见错误、文件清单 |
| v1.1 | 2025-06 | chapterTag 规则、quiz 类型说明、可选字段默认值汇总 |
| v1.2 | 2025-06 | 可选字段默认值、字符串转义、quote author 格式 |
| v1.3 | 2025-06 | snippet 规范、代码文件迁移规范 |
| v1.4 | 2025-06 | snippet 行号保留文件实际行号；自检清单重构为"目的导向" |
| v1.5 | 2025-06 | 新增动画演示系统；动画组件独立为 `animations/`；AnimationFrame 用双层缩放；删除旧架构（visual-layouts / visual-elements / VisualStepSlide）；新增 IntroCard 抽取；chapterTag 绝对定位；lesson-00 动画合集预览；**文档拆分为 GUIDE.md / ARCHITECTURE.md / CHANGELOG.md 三份** |
| v2.0 | 2026-09 | **课程重构**：48 讲 → 五阶段新结构；前 8 讲重组；引入"难度 × 数量"评估框架；新增英文单词汇总系统（页内 glossary + 全局 `/glossary`）；新增课程蓝图 `course-plan.js`；新增 `scripts/glossary-report.js`；文档新增 `COURSE-DESIGN.md` |
| **v3.0** | 2026-09 | **阶段一完成**：lesson-01～08 全部按新结构重新生成；17 种组件（新增 GlossarySlide）；所有代码统一用 `codeFile`；自检清单扩充为 11 大类（含内容维度、格式一致性、无重复页、词汇维度）；课后作业统一洛谷题（0—3 道）；内容质量红线扩充到 13 条 |

---

## 二、已完成讲次

### 2.1 阶段一：编程基础（第 1—8 讲）✅

| 讲次 | 主题 | 核心概念 | 状态 | 页数 | 动画页 |
|---|---|---|---|---|---|
| 01 | 初识 C++ | 程序 = 指令 + 数据 | ✅ | 30 | 0 |
| 02 | 变量与整数类型 | 变量 = 有类型的盒子 | ✅ | 30 | 0 |
| 03 | 小数、字符、布尔与类型转换 | 不同类型住不同的家 | ✅ | 30 | 0 |
| 04 | 运算符与分支 | 运算符 = 工具，分支 = 岔路口 | ✅ | 30 | 0 |
| 05 | 循环结构 | 循环 = 转圈 | ✅ | 30 | 1 evolution |
| 06 | 一维数组 | 数组 = 储物柜 | ✅ | 29 | 1 evolution |
| 07 | 字符串基础 | 字符串 = 文字项链 | ✅ | 30 | 0 |
| 08 | 函数 | 函数 = 料理机 | ✅ | 30 | 1 function-call + 1 evolution |
| 09 | 递归 | 递归 = 套娃 | ✅ | 30 | 1 function-call + 1 evolution |
| 10 | 阶段实战 | 综合运用 | ✅ | 15 | 1 function-call |

**阶段一完成**：10 讲，共 284 页，4 个动画页。

### 2.2 阶段二至五（待生成）

| 阶段 | 讲次 | 状态 |
|---|---|---|
| 一、编程基础 | 09—10 | ⏳ 待生成 |
| 二、算法入门 | 11—24 | ⏳ 待生成 |
| 三、数据结构 | 25—35 | ⏳ 待生成 |
| 四、竞赛进阶 | 36—50 | ⏳ 待生成 |
| 五、冲刺实战 | 51+ | ⏳ 待生成 |

**下一讲**：lesson-09 递归

---

## 三、已应用伏笔清单（阶段一）

### 3.1 三条核心伏笔链（埋到第 9 讲）

#### 链 1：进制与位运算

```
第 1 讲  计算机只认识 0 和 1                【埋 ✅】（slide-05）
第 2 讲  int 21 亿、内存、ASCII            【埋 ✅】（slide-05/13）
第 3 讲  ASCII 码、浮点精度                【埋 ✅】（slide-09/12）
第 4 讲  位运算、条件本质 0/1              【埋 ✅】（slide-06/08）
第 22 讲 进制与编码：正式揭晓              【待收】
第 51 讲 状态压缩 DP：位运算的进阶应用      【待再收】
```

#### 链 2：递归 → 栈 → DP

```
第 8 讲  函数调用栈（function-call-animation）  【埋 ✅】（slide-13）
第 9 讲  递归、栈溢出                          【待埋/待收】
第 20 讲 简单 DP：记忆化就是"存下来"           【待收一半】
第 25 讲 栈：递归的底层就是栈                  【待收】
第 49 讲 树形 DP：状态怎么设计                  【待再收】
```

#### 链 3：数组 → 内存 → 指针 → 链表

```
第 6 讲  数组连续内存                        【埋 ✅】（slide-05/08）
第 6 讲  不连续呢？                         【埋 ✅】（slide-08）
第 7 讲  字符串 = 字符数组                  【回收 ✅】（slide-05）
第 27 讲 链表：不连续的"数组"               【待收】
第 27 讲 指针初步：地址、取地址              【待收一半】
```

### 3.2 已应用伏笔清单（lesson-01～08 详细）

| # | 讲次-slide | 埋伏笔 | 回收讲次 | 呈现方式 |
|---|---|---|---|---|
| 1-1 | 01-05 | 0 和 1 | 22 | dialog |
| 1-2 | 01-05 | 内存 | 27 | Extra |
| 1-3 | 01-13 | endl/二进制 | 22 | Extra |
| 2-1 | 02-05 | 地址二进制 | 22 | dialog + Extra |
| 2-2 | 02-13 | int 21 亿 | 22 | Extra |
| 2-3 | 02-14 | long long 范围 | — | Extra |
| 3-1 | 03-07 | 浮点精度 0.1+0.2 | 20、41 | Extra |
| 3-2 | 03-09 | ASCII 表 | 22 | Extra |
| 3-3 | 03-10 | 布尔代数/电路 | 22 | Extra |
| 3-4 | 03-12 | 强制转换、截断 | — | Extra |
| 4-1 | 04-06 | 位运算（第五类运算符） | 21 | Extra |
| 4-2 | 04-08 | 真=1、假=0 | 22 | Extra |
| 4-3 | 04-09 | 逻辑与电路门 | 22 | Extra |
| 4-4 | 04-16 | break 穿透多层 | 25 | Extra |
| 5-1 | 05-05 | 循环 vs 复制粘贴 | — | Extra |
| 5-2 | 05-06 | TLE、复杂度 | 36 | Extra |
| 5-3 | 05-13 | 嵌套循环总次数 | — | Extra |
| 5-4 | 05-16 | 边界差一次 | — | Extra |
| 6-1 | 06-05 | 连续内存 / 不连续 | 27 | Extra + dialog |
| 6-2 | 06-08 | 地址差值 = 元素大小 | 27 | Extra |
| 6-3 | 06-15 | 累加 vs 累乘初始值 | 09（阶乘） | Extra |
| 6-4 | 06-18 | sizeof vs strlen | 27 | Extra |
| 7-1 | 07-05 | ASCII 表 | 22 | Extra |
| 7-2 | 07-08 | \0 结束符 | — | Extra |
| 7-3 | 07-15 | sizeof vs strlen | 27 | Extra |
| 7-4 | 07-22 | ASCII 码规律 | 22 | Extra |
| 8-1 | 08-05 | 函数历史、名字由来 | — | Extra |
| 8-2 | 08-06 | DRY 原则 | — | Extra |
| 8-3 | 08-10 | 数组传参不复制 | 27 | Extra |
| 8-4 | 08-13 | 调用栈 / 栈帧 | 25 | Extra + 动画 |
| 8-5 | 08-14 | 值传递 vs 引用传递 | 12 | Extra |
| 8-6 | 08-15 | 全局变量与栈空间 | 25 | Extra |
| 8-7 | 08-21 | 递归 | 09 | Extra |

### 3.3 待回查伏笔

**已埋未收**（截至 lesson-08）：

| 讲次-slide | 埋伏笔 | 回收讲次 |
|---|---|---|
| 01-05 | 0 和 1 | 22 |
| 02-05 | 地址二进制 | 22 |
| 02-13 | int 21 亿 | 22 |
| 03-07 | 浮点精度 | 20、41 |
| 03-09 | ASCII 表 | 22 |
| 03-10 | 布尔代数 | 22 |
| 04-06 | 位运算 | 21 |
| 04-08 | 真=1、假=0 | 22 |
| 04-09 | 逻辑与电路门 | 22 |
| 04-16 | break 穿透多层 | 25 |
| 05-02 | TLE、复杂度 | 36 |
| 06-05 | 连续内存 / 不连续 | 27 |
| 06-08 | 地址差值 | 27 |
| 06-15 | 累加/累乘初始值 | 09 |
| 06-18 | sizeof vs strlen | 27 |
| 07-05 | ASCII 表 | 22 |
| 07-15 | sizeof vs strlen | 27 |
| 07-22 | ASCII 码规律 | 22 |
| 08-10 | 数组传参不复制 | 27 |
| 08-13 | 调用栈 / 栈帧 | 25 |
| 08-14 | 值传递 vs 引用传递 | 12 |
| 08-15 | 全局变量与栈空间 | 25 |
| 08-21 | 递归 | 09 |

**已回收**（截至 lesson-08）：

| 讲次-slide | 回收伏笔 | 来源讲次 |
|---|---|---|
| 05-02 | 分支只能走一次 | 04 |
| 06-02 | 数据存哪 | 05 |
| 07-02 | 字符串 = 字符数组 | 06 |

### 3.4 关键回收重镇

| 讲次 | 需回收伏笔数 | 说明 |
|---|---|---|
| **第 22 讲 进制与编码** | **7 个** | 0/1、int 21 亿、ASCII×2、布尔代数、真=1、逻辑与电路门 |
| 第 25 讲 栈 | 3 个 | break 穿透、调用栈、全局变量与栈空间 |
| 第 27 讲 链表 | 4 个 | 内存、连续/不连续、地址差值、sizeof vs strlen |
| 第 09 讲 递归 | 1 个 | 累加/累乘初始值 |
| 第 12 讲 字符串进阶 | 1 个 | 值传递 vs 引用传递 |
| 第 21 讲 位运算入门 | 1 个 | 位运算 |
| 第 36 讲 复杂度 | 1 个 | TLE |

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
│   ├── DPTableAnimationSlide.vue
│   └── FunctionCallAnimationSlide.vue
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
    ├── EvolutionSlide.vue
    └── GlossarySlide.vue      ← 新增（第 17 种）
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
├── index.js               # 自动导入所有讲次
├── course-plan.js         ← 新增（57 讲课程蓝图）
├── glossary.js            ← 新增（全局术语聚合）
├── lesson-00.js
└── lesson-01.js ~ lesson-08.js
```

### 4.4 代码文件

```
public/codes/
├── lesson-01/
│   ├── hello-world.cpp
│   ├── pattern.cpp
│   └── ...
├── lesson-02/
│   ├── var-basic.cpp
│   ├── cin-cout.cpp
│   ├── int-type.cpp
│   ├── longlong-type.cpp
│   ├── double.cpp
│   ├── swap.cpp
│   └── big-sum.cpp
├── lesson-03/
│   ├── double-type.cpp
│   ├── char-type.cpp
│   ├── bool-type.cpp
│   ├── auto-convert.cpp
│   ├── force-convert.cpp
│   ├── circle.cpp
│   ├── temperature.cpp
│   └── divide.cpp
├── lesson-04/
│   ├── operators.cpp
│   ├── relations.cpp
│   ├── if-single.cpp
│   ├── if-else.cpp
│   ├── if-else-if.cpp
│   ├── switch-day.cpp
│   ├── even-odd.cpp
│   ├── score-level.cpp
│   └── leap-year.cpp
├── lesson-05/
│   ├── while-loop.cpp
│   ├── for-loop.cpp
│   ├── nested-loop.cpp
│   ├── multiplication-table.cpp
│   ├── sum.cpp
│   ├── factorial.cpp
│   └── max.cpp
├── lesson-06/
│   ├── array-def.cpp
│   ├── array-traverse.cpp
│   ├── array-sum.cpp
│   ├── count.cpp
│   ├── sum.cpp
│   ├── max.cpp
│   └── reverse.cpp
├── lesson-07/
│   ├── char-vs-string.cpp
│   ├── char-array.cpp
│   ├── string-type.cpp
│   ├── string-input.cpp
│   ├── string-length.cpp
│   ├── string-traverse.cpp
│   ├── char-count.cpp
│   ├── palindrome.cpp
│   └── string-reverse.cpp
└── lesson-08/
    ├── func-basic.cpp
    ├── func-params.cpp
    ├── func-return.cpp
    ├── func-scope.cpp
    ├── func-prime.cpp
    ├── func-gcd.cpp
    └── func-distance.cpp
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

### 4.7 views

```
src/views/
├── SlideView.vue
├── IndexView.vue
├── LessonView.vue
└── GlossaryView.vue     ← 新增（全局术语表）
```

### 4.8 lib

```
src/lib/
└── tree-layout.js
```

### 4.9 router

```
src/router/
└── index.js
```

**路由清单**：

| 路径 | 组件 | 说明 |
|---|---|---|
| `/` | IndexView | 课程目录 |
| `/lesson/:id` | LessonView | 讲次页 |
| `/slide/:lesson/:slide` | SlideView | 单页 |
| `/glossary` | GlossaryView | 全局术语表 ← 新增 |

### 4.10 脚本

```
scripts/
├── check-codes.js
└── glossary-report.js    ← 新增（术语检查）
根目录/
└── verify-codes.js
```

---

## 五、已删除的旧架构

### v1.5 删除

- ❌ `src/components/slides/VisualStepSlide.vue`
- ❌ `src/lib/visual-layouts/`（整个目录）
- ❌ `src/components/visual-elements/`（整个目录）
- ❌ `src/data/animations/hanoi-*.js`

**替换为**：

- ✅ `src/components/animations/*`（10 个独立动画组件）
- ✅ `src/lib/tree-layout.js`（仅树的布局算法）

### v2.0 删除

- ❌ 旧 48 讲大纲（被新五阶段结构替代）
- ❌ 旧讲次编号规则（新规则以 COURSE-DESIGN 为准）
- ❌ 旧伏笔清单（重新梳理）

### v3.0 删除

- ❌ 内联 `code` 支持（统一改为 `codeFile`）
- ❌ `lesson-01～08` 旧版本数据（全部重新生成）
- ❌ 旧自检清单（扩展为 11 大类）

---

## 六、文档清单

| 文档 | 用途 | 版本 |
|---|---|---|
| `GUIDE.md` | 数据格式、17 种组件、自检清单 | v3.0 |
| `ARCHITECTURE.md` | 项目架构、组件实现 | v3.0 |
| `CHANGELOG.md`（本文档） | 版本记录、伏笔清单、进度 | v3.0 |
| `COURSE-DESIGN.md` | 课程结构、每讲规格、难度分布 | v3.0 |

**四份文档配合使用**：

- 课程结构 → `COURSE-DESIGN.md`
- 数据格式 → `GUIDE.md`
- 项目架构 → `ARCHITECTURE.md`
- 进度记录 → `CHANGELOG.md`

---

## 七、下一步工作

### 7.1 立即可做

| # | 任务 | 说明 |
|---|---|---|
| 1 | **生成 lesson-09 递归** | 阶段一最后一讲（不含实战） |
| 2 | **生成 lesson-10 阶段实战** | 模拟赛 + 错题精讲 |
| 3 | **检查 5 个新文件** | GlossarySlide / glossary.js / GlossaryView / glossary-report.js / course-plan.js |

### 7.2 后续安排

| 阶段 | 讲次 | 预计工作 |
|---|---|---|
| 二 | 11—24 | 14 讲 |
| 三 | 25—35 | 11 讲 |
| 四 | 36—50 | 15 讲 |
| 五 | 51+ | 按需 |

### 7.3 文档维护

- **每完成 1 讲**：更新本文档"已完成讲次"表
- **每完成 1 个伏笔回收**：更新"已回收"表
- **每新增文件**：更新"项目文件清单"
- **每改规则**：更新对应文档

---

**CHANGELOG.md 结束。数据格式见 GUIDE.md，架构见 ARCHITECTURE.md，课程设计见 COURSE-DESIGN.md。**
# 内容优化 SOP

> 两套流程：
> **写新课（0→1）** —— 从零开始建一讲
> **改造旧课（1→N）** —— 优化已有讲次
>
> 两者的**最终质量标准相同** —— 但**执行路径不同**。

---

# 一、写新课（0 → 1）

## 适用场景

- **新建一讲**（如 lesson-07、lesson-08）
- **从零开始** —— 没有旧内容可"删"

## 核心原则

**一次做对** —— **不留"以后再优化"的债**。

## 流程（7 步）

### Step 1 · 读课程蓝图

**打开 `src/data/course-plan.js`** —— 找当前讲的条目：

```js
{
  id: '07',
  stage: '编程基础',
  title: '字符串基础',
  subtitle: '一串字符的容器',
  core: '字符串 = 文字项链',
  points: ['char vs string', 'cin vs getline', '遍历', '统计 / 回文 / 逆序'],
  difficulty: '⭐⭐⭐',
  anim: '—',
  fore: '常用函数 → 第 12 讲'
}
```

**从蓝图提取**：
- **标题 / 副标题** —— 直接用
- **核心概念**（core）—— 作为概念主体
- **子知识点**（points）—— 每一轮内容
- **伏笔**（fore）—— 埋到相关页
- **动画选型**（anim）—— 决定用不用 `animations/`

### Step 2 · 设计"骨架"（一页一句话）

**在纸上 / 文档里先列** —— **每页的"一句话目的"**：

```
1  cover           —— 开场
2  timeline(review) —— 上节回顾
3  grid            —— 本节目标
4  timeline(map)   —— 学习地图
5  origin          —— 为什么需要字符串
6  grid            —— 字符串的 3 个特点
7  code-split      —— char 数组演示
8  code-split      —— string 类型演示
9  compare         —— char[] vs string（neutral）
10 pitfall         —— cin 读入的坑
11 level-map       —— 练习1
12 ...
```

**这一步决定"用哪些版式"** —— **不要堆 dialog**。

### Step 3 · 挑版式（对着 PATTERNS.md）

**每个场景对照 `docs/PATTERNS.md`**：

| 场景 | 用什么 |
|---|---|
| 概念引入 | `origin` 或 `dialog`（≤ 4 轮）|
| 概念对比 | `compare`（无对错时加 `neutral`）|
| 代码演示 | `code-split` |
| 执行过程 | `evolution` |
| 常见错误 | `pitfall` |
| 决策判断 | `decision` |
| 练习题 | `level-map` |
| 总结 | `quote` |

**检查骨架**：
- dialog ≤ 3 个？
- 没有连续 2 个同类型页？
- 5 个阶段（概念 / 代码 / 练习 / 小测 / 总结）都覆盖？

### Step 4 · 写数据

**在 `src/data/lesson-XX.js` 写 slides** —— **一次写完整**。

**关键原则**：
- **extra 只放"故事"**（能讲 30 秒的）
- **短提示放 footer**（≤ 3 行）
- **不需要的页不放**（不要为了"充实"堆内容）
- **每页步数 ≤ 10 步**

**写数据时同步做的事**：
- 埋伏笔（`🔮 伏笔` 标记）
- 写 glossary 页
- 写 quiz 题目

### Step 5 · 写 .cpp 文件

**在 `public/codes/lesson-XX/` 放代码** —— 每个代码块一个文件。

**用 snippet 标记可引用片段**：
```cpp
// @snippet-start main
int main() { ... }
// @snippet-end main
```

### Step 6 · 预览 + 微调

```bash
npm run dev
```

**逐页翻**：
- 步进顺畅？
- 一屏装得下？
- 视觉节奏有张有弛？
- 没有"太满"或"太空"的页？

**发现问题直接改** —— 不要留到"以后优化"。

### Step 7 · 检查 + 定稿

```bash
node scripts/help.js check:all
```

**检查项**：
- 代码编译
- id 连续
- HTML 配对
- 术语表规范

**通过 → 定稿**。

---

## 写新课的质量标准

**做对了**：

- ✅ **每讲 dialog ≤ 3 个**，每个 ≤ 4 轮
- ✅ **extra 覆盖率 15-25%** —— 只放"能讲 30 秒的故事"
- ✅ **footer 用得合理** —— 短提示进 footer
- ✅ **5 个阶段覆盖** —— 概念 / 代码 / 练习 / 小测 / 总结
- ✅ **每页步数 ≤ 10**
- ✅ **伏笔有回收** —— `🔮` 标记成对
- ✅ **图片适度** —— 只在"人物 / 事件 / 概念"加图
- ✅ **无重复** —— 同一知识点只在一处讲

**避免**：

- ❌ dialog 堆砌（8 轮以上）
- ❌ extra 全覆盖（90%+）
- ❌ 页数多但内容空（35 页讲不完 10 个知识点）
- ❌ 为"填满"加 extra
- ❌ 同一件事讲 2-3 遍

---

# 二、改造旧课（1 → N）

## 适用场景

- **优化已生成的讲次**（如 lesson-01 到 lesson-06）
- **从"能用"到"好用"**

## 和"写新课"的区别

| 维度 | 写新课 | 改造旧课 |
|---|---|---|
| **起点** | 空白 | 已有内容 |
| **工作** | 建 | 删 / 改 / 搬 |
| **主要操作** | 写数据 | **删 extra + 改版式** |
| **可用工具** | 无 | `audit-extra` / `apply-decisions` |

## 流程（5 步）

### Step 1 · 审计 extra

```bash
node scripts/audit-extra.js lesson-XX
node scripts/audit-extra.js lesson-XX --csv
```

**产出**：`extra-audit.csv` —— 每条 extra 分类为 STORY / TIP / INFO / OTHER。

### Step 2 · 生成决策表

**打开 CSV** —— 加 `decision` 列：

| 值 | 含义 |
|---|---|
| `keep` | 保留 |
| `delete` | 删除 |
| `merge` | 搬到正文 |

**判断标准**：**"能讲 30 秒的故事"** —— 4/5 条满足：

- ✅ 有人物 / 事件
- ✅ 有反转 / 惊讶
- ✅ 和当页强关联
- ✅ 独立成篇
- ✅ 独家性

### Step 3 · 批量删 extra

```bash
node scripts/apply-extra-decisions.js extra-decisions-XX.csv --dry
node scripts/apply-extra-decisions.js extra-decisions-XX.csv
```

**产出**：extra 从 90% → 15-25%。

### Step 4 · 结构改造

**扫描 dialog** —— 找出 ≥ 6 轮的：

| 现状 | 改法 |
|---|---|
| dialog 讲"清单/规则" | → `grid` |
| dialog 讲"演进/由来" | → `origin` |
| dialog 讲"对比/选择" | → `decision` |
| dialog 讲"陷阱/错误" | → `pitfall` |
| dialog 讲"两栏并列" | → `split` |
| compare 讲"选项 A vs B" | 加 `neutral: true` |

### Step 5 · 搬正文 + 验证

**删了 extra 后，"重要但不独立"的内容搬进正文**：

| 组件 | 搬法 |
|---|---|
| grid | 加 `footer` |
| code-split | 加 `footer` |
| compare | 加 `footer` 或补 `right` 列 |
| level-map | 加到 `analysis.desc` 或 `footer` |
| dialog | 加到 `lines[]` 最后 1-2 轮 |

**验证**：

```bash
node scripts/help.js check:all
node scripts/help.js fix:ids
node scripts/help.js fix:comments
```

**逐页目视**。

---

## 三、两套流程共享的"质量标准"

**无论新旧** —— **最终标准一致**：

| 指标 | 标准 |
|---|---|
| dialog 数量 | ≤ 3 个 / 讲 |
| dialog 轮数 | ≤ 4 轮 / 个 |
| extra 覆盖率 | 15-25% |
| footer 数量 | 4-6 处 / 讲 |
| 页数 | 25-35 页 |
| 每页步数 | ≤ 10 |
| 连续性 | 无连续 2 个同类型页 |
| 伏笔回收 | `🔮` 标记成对 |

---

## 四、常见重复检查

**扫描方法**：

| 重复类型 | 检查 |
|---|---|
| 同讲内 | 搜相同关键词，看是否 2+ 页 |
| 跨讲 | 用 `COURSE-INDEX.md` 对比 |
| 和 extra 重复 | audit-extra 会标出 |

**处理**：**只在最早的出处保留** —— 其他引用。

---

## 五、图片引入

### 5.1 判断需不需要图

| 类型 | 加图 |
|---|---|
| 历史人物 | ✅ 肖像 |
| 历史事件 | ✅ 照片 |
| 抽象概念 | ✅ 示意图 |
| 纯装饰 | ❌ |

### 5.2 图片来源

- **国内**：百度百科（最快）
- **Bing 图片搜索**
- **Public Domain**（Wikimedia Commons —— 但可能打不开）

### 5.3 用 ImageCard

```js
extra: {
  title: '📖 ...',
  image: {
    src: 'static/images/people/xxx.jpg',
    alt: '...',
    caption: '...',
    source: '...',
    layout: 'float-right',
    size: 'sm'
  },
  desc: '...'
}
```

**layout**：`float-right` / `float-left` / `block` / `inline`
**size**：`sm`（160px）/ `md`（280px）/ `lg`（480px）/ `full`

### 5.4 图片路径

```
public/static/images/
  people/        人物
  events/        事件
  concepts/      概念图
```

---

## 六、扩展页（人物 / 事件专页）

### 6.1 什么内容值得独立成页

- 有"人物 + 事件 + 反差"
- 够 1 页（不只 1 段）
- 和当前讲主题强相关

### 6.2 推荐做的讲次（12 个）

| 讲次 | 主题 |
|---|---|
| 01 | ENIAC |
| 02 | FORTRAN 与打孔卡 |
| 03 | 乔治·布尔 |
| 09 | 斐波那契与兔子 |
| 22 | 图灵与二进制 |
| 22 | 莱布尼茨与二进制 |
| 25 | 汉诺塔传说 |
| 27 | 链表的诞生 |
| 37 | 欧几里得与 GCD |
| 40 | 杨辉 / 帕斯卡 |
| 46 | 归并排序的二战起源 |
| 52 | 线段树的发明 |

### 6.3 用什么组件

| 类型 | 组件 |
|---|---|
| 人 / 事件 | `split`（左图右文）|
| 问题 | `origin` |
| 时间线 | `timeline` |

### 6.4 插入扩展页后必做

```bash
node scripts/help.js fix:ids
node scripts/help.js fix:comments
```

**手工核对**：
- quiz / analysis 里的 "slide-XX" 引用
- 上节回顾 / 下节预告 是否要更新

---

## 七、已完成的参考数据

| 讲次 | 页数 | extra 原 | extra 精简 | 主要改造 |
|---|---|---|---|---|
| lesson-01 | 31 | 28 | 7 | origin 重构、timeline 扩到 10 项、ENIAC 扩展页 |
| lesson-02 | 33 | 25 | 6 | origin / pitfall / decision 全面启用 |
| lesson-03 | 31 | 28 | 3 | compare neutral、footer 试点 |
| lesson-04 | 30 | 27 | 3 | dialog → grid / decision / pitfall / split |
| lesson-05 | 30 | 27 | 4 | origin / grid / split 改造 |
| lesson-06 | 29 | 27 | 4 | origin / decision / split / grid FAQ |

**共同成果**：
- 每讲 dialog ≤ 3 个
- 每讲 extra 覆盖率 10-25%
- 每讲 footer 平均 4-6 处
- 组件能力扩展 6 项

---

## 八、速查：什么任务用什么流程

| 任务 | 用哪套流程 |
|---|---|
| 新建 lesson-07 | **写新课** |
| 优化 lesson-01 | **改造旧课** |
| 给 lesson-05 加图片 | **改造旧课**的"图片引入"部分 |
| 给 lesson-01 加扩展页 | **改造旧课**的"扩展页"部分 |
| 写"阶段实战"（lesson-10）| **写新课**（特殊：以题为主）|

---

## 九、核心区别一句话

- **写新课**：**从"场景"到"版式"** —— 一次做对
- **改造旧课**：**从"已有内容"倒推"该删什么"** —— 精简 + 重塑

**两者不冲突** —— **写新课时用 Standards，改造时用 SOP**。
# 项目架构（ARCHITECTURE.md）

> **用途**：项目维护、组件开发、样式调整的**技术参考**。
> **读者**：开发者、维护者。
> **不包含**：数据格式、课程内容规则（见 GUIDE.md）。
> **最后更新**：2025-06（v1.5）

---

## 目录

1. [技术栈](#一技术栈)
2. [目录结构](#二目录结构)
3. [渲染流程](#三渲染流程)
4. [组件体系](#四组件体系)
5. [动画系统](#五动画系统)
6. [样式约定](#六样式约定)
7. [配置](#七配置)
8. [脚本](#八脚本)
9. [架构常见错误](#九架构常见错误)

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

---

## 二、目录结构

```
C_Vite/
├── public/
│   ├── codes/lesson-XX/       # 外部 .cpp 文件
│   └── static/
├── scripts/
│   └── check-codes.js
├── src/
│   ├── components/
│   │   ├── common/            # 公共 UI
│   │   ├── level-map/         # 练习页子组件
│   │   ├── animations/        # 动画组件
│   │   └── slides/            # 版式组件（自动注册）
│   ├── composables/           # 组合式函数
│   ├── config/                # 配置
│   ├── data/                  # 课程数据
│   ├── lib/                   # 工具函数
│   ├── router/
│   ├── styles/                # 10 个 CSS 文件
│   └── views/
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
useStepCount → provideStep → StepWrapper 控制分步
```

---

## 四、组件体系

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
| `IntroCard` | `html`（v-html 渲染）|

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
└── DPTableAnimationSlide.vue

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

## 六、样式约定

### 6.1 目录

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

### 6.2 关键 CSS 变量

**字号**：

| 变量 | 用途 |
|---|---|
| `--fs-slide-title` | 页标题 |
| `--fs-card-title` | 卡片标题 |
| `--fs-card-desc` | 卡片正文 |
| `--fs-code` | 代码字号 |
| `--fs-quiz-*` | 小测 |

**颜色**：

| 变量 | 用途 |
|---|---|
| `--primary` / `--accent` | 主色 / 强调色 |
| `--success` / `--error` | 成功 / 错误 |
| `--text-main` / `--text-sub` / `--text-dim` | 文字层级 |
| `--card-border` / `--card-shadow` | 卡片 |

**字号缩放**：所有 `calc(XXpx * var(--font-scale))`，4 档缩放。

### 6.3 chapterTag 绝对定位

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

### 6.4 滚动策略

| 组件 | 滚动方式 |
|---|---|
| CodeSplitSlide | 左右独立滚动（`.scroll-pane`） |
| AnimationFrame | 舞台固定 + extra 独立滚动（`max-height: 40vh`） |
| 其他 | 整体滚动（`.slide-body`） |

---

## 七、配置

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

## 八、脚本

### 8.1 `verify-codes.js`

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

### 8.2 `scripts/check-codes.js`

待补充。

---

## 九、架构常见错误

### 9.1 组件注册失败

**症状**："未注册的版式：xxx"

**排查**：
- 文件名是否 `XxxSlide.vue`？
- 是否在 `src/components/slides/` 或 `src/components/animations/` 下？
- 重启 Vite（glob 变化需重启）

### 9.2 Grid 卡片高度不一

**修复**：GridSlide 里给 `.step-wrapper` 加 `height: 100%`

### 9.3 MarkerTool 拖动后跟随鼠标

**修复**：
- 用 `setPointerCapture` 把指针锁定到触发按钮
- 事件挂到按钮上
- 加 `window.blur` 兜底

### 9.4 舞台缩放不生效

**排查**：
- `.stage-wrap` 有 `aspect-ratio: 620 / 400`？
- `.stage` 有 `transform-origin: top left`？
- `ResizeObserver` 是否正确初始化？

### 9.5 动画组件样式溢出

**排查**：
- 元素用 `position: absolute` 时，父容器是否有 `overflow: hidden`？
- 是否用了 `transform: scale` 但没设 `transform-origin`？

### 9.6 `<TransitionGroup>` 进入/离开不生效

**排查**：
- 是否用 `<TransitionGroup>` 而不是 `<Transition>`？
- `name` 和 CSS 类名是否匹配（如 `name="stack"` → `.stack-enter-from`）？
- scoped 样式需 `:deep(.stack-enter-from)`？

### 9.7 元素 transition 冲突

**症状**：FLIP 交换时元素抖动或跳变

**原因**：元素同时有 `transition: all` 和 `<TransitionGroup>` 的 `transform`

**修复**：明确指定属性（如 `transition: left, bottom, box-shadow`），不用 `all`

---

**ARCHITECTURE.md 结束。数据格式见 GUIDE.md，历史记录见 CHANGELOG.md。**
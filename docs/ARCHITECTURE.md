# 项目架构

> 一页看懂：项目怎么组织、数据怎么流、组件怎么分层。

---

## 一、目录结构

```
C_Vite/
├── src/                    源码
│   ├── data/               课程数据
│   │   ├── lesson-XX.js        每讲内容
│   │   ├── course-plan.js      57 讲蓝图
│   │   ├── lesson-index.js    元数据索引（自动生成）
│   │   ├── glossary-data.js   术语数据（自动生成）
│   │   └── index.js           数据入口
│   ├── components/
│   │   ├── slides/         21 种版式组件
│   │   ├── common/         公共组件
│   │   ├── animations/     动画组件
│   │   └── level-map/      level-map 子组件
│   ├── composables/        组合式函数
│   ├── config/             静态配置
│   ├── views/              页面
│   ├── styles/             CSS
│   ├── router/             路由
│   └── main.js             入口
├── public/
│   ├── codes/              .cpp 文件（按讲次）
│   └── static/             图片 / ASCII 艺术
├── scripts/                工具脚本
└── docs/                   文档
```

---

## 二、数据流

```
lesson-XX.js（数据）
      ↓
data/index.js（加载 + 索引）
      ↓
useSlide.js（组件状态）
      ↓
SlideView.vue（页面）
      ↓
slides/*.vue（版式渲染）
      ↓
最终页面
```

**关键**：
- **数据层** —— 只放内容（纯 JS 对象）
- **组件层** —— 只负责渲染
- **样式层** —— CSS 变量统一控制

---

## 三、分层职责

### data/ —— 数据

**只放内容** —— 不含逻辑。

```js
// lesson-XX.js
export default {
  title: '第 X 讲 ...',
  total: 30,
  slides: [
    { id: 1, type: 'cover', title: '...', data: {...} },
    // ...
  ]
}
```

### config/ —— 配置

**静态配置** —— 角色、标签、颜色、默认值。

```js
// characters.js
export const characters = {
  student: { avatar: '🧑', speaker: '同学' },
  robot: { avatar: '🤖', speaker: '小 C' }
};
```

### composables/ —— 逻辑

**可复用逻辑** —— 分步、加载代码、语法高亮。

| 函数 | 作用 |
|---|---|
| `useStep` | 分步状态管理（provide/inject）|
| `useSlide` | 页面数据 + 导航 |
| `useSlideNav` | 键盘/鼠标翻页 |
| `useSlideTheme` | 按 type 切背景 |
| `useStepCount` | 组件上报步数 |
| `useCodeLoader` | 加载 .cpp 文件 |
| `useHighlight` | C++ 语法高亮 |
| `useCopy` | 复制到剪贴板 |

### components/ —— 组件

| 目录 | 说明 |
|---|---|
| `slides/` | **21 种版式** —— 一页一种视觉 |
| `common/` | **公共组件** —— CodeBlock / ImageCard / ExtraCard / SlideFooter... |
| `animations/` | **动画** —— 排序 / 栈 / 队列 / 树 / 图... |
| `level-map/` | **level-map 子组件** —— HintRow / LevelNode |

### views/ —— 页面

| 页面 | 路由 | 作用 |
|---|---|---|
| `IndexView` | `/` | 课程总目录 |
| `LessonView` | `/lesson/:id` | 单讲页码目录 |
| `SlideView` | `/slide/:id/:n` | 单页幻灯片（核心）|
| `GlossaryView` | `/glossary` | 术语表 |

### styles/ —— CSS

| 文件 | 作用 |
|---|---|
| `theme.css` | **设计令牌** —— 所有 CSS 变量 |
| `reset.css` | 重置 + 全局样式 |
| `layout.css` | 幻灯片布局 |
| `components.css` | 通用组件样式 |
| `animation.css` | 动画 |
| `responsive.css` | 响应式 |
| `print.css` | 打印样式 |
| `syntax.css` | 代码高亮 |

---

## 四、核心机制

### 4.1 分步展示

```
SlideView（父）
  ↓ provideStep(1) —— 创建 step 上下文
  ↓
子组件（版式）
  ↓ useStepCount(() => 步数)
  ↓ 直调 stepCtx.setMax(n)
  ↓
StepWrapper（子）
  ↓ 显示当前 step 及之前的内容
```

**数据流**：
- **往下** —— `current` / `max`（provide）
- **往上** —— `setMax(n)`（子组件调用）

### 4.2 数据懒加载

```
首次进入某讲 → 异步 import('./lesson-XX.js') → 缓存
再次进入 → 从缓存拿
```

**效果**：首屏从 900KB → 130KB。

### 4.3 版式自动注册

```js
// slides/index.js
const modules = import.meta.glob(['./*Slide.vue', '../animations/*Slide.vue']);
// BigNumberSlide.vue → 'big-number'
```

**新增版式** —— 只要新建文件 —— 不用改注册表。

### 4.4 氛围背景

```js
// useSlideTheme.js
const TYPE_THEME_MAP = {
  'cover': '--bg-cover',
  'code-split': '--bg-code',
  // ...
};
```

**每个 type 有专属背景色** —— 配合 `theme.css` 的 8 种氛围。

---

## 五、组件能力矩阵

| 组件 | 支持 extra | 支持 footer |
|---|---|---|
| **SlideShell**（壳） | ✅（autoExtra） | — |
| GridSlide | ✅ | ✅ |
| LevelMapSlide | ✅ | ✅ |
| CodeSplitSlide | ✅ | ✅ |
| CompareSlide | ✅ | ✅ |
| SplitSlide | ✅ | ✅ |
| FlowSlide | ✅ | ✅ |
| 其他 14 种 | ✅ | ❌ |

**说明**：`extra` 通过 SlideShell 自动追加 —— `footer` 需要组件自己实现。

---

## 六、脚本工具

| 脚本 | 作用 |
|---|---|
| `check.js` | 统一检查入口 |
| `check-lessons.js` | id 连续性 + total |
| `check-html.js` | HTML div 配对 |
| `verify-codes.js` | 编译 .cpp + 引用检查 |
| `generate-index.js` | 生成 COURSE-INDEX.md |
| `generate-lesson-index.js` | 生成 lesson-index.js |
| `generate-glossary-data.js` | 生成 glossary-data.js |
| `bundle-for-context.js` | 打包给 AI |
| `glossary-report.js` | 术语统计 |
| `audit-extra.js` | extra 审计 |
| `audit-slide-shell.js` | SlideShell 迁移审计 |
| `audit-font-scale.js` | px 硬编码审计 |

**用法** → `npm run help`

---

## 七、技术栈

| 项 | 版本 |
|---|---|
| Vue | 3.4+ |
| Vite | 5.0+ |
| vue-router | 4.3+ |
| lucide-vue-next | 1.0+（图标）|
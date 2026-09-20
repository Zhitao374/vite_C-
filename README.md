# C++ 课程演示项目

这是一个基于 Vue 3 + Vite 的课程演示型前端项目，用于展示 C++ 学习内容，并以“讲义/演示页”方式呈现知识点、代码示例、案例分析和扩展内容。

项目特点包括：

- 以讲次为单位组织课程内容
- 每一页都是一个独立的 slide 版式
- 支持代码展示、知识扩展、对比、时间线、流程图等多种教学内容形式
- 数据驱动渲染：课程内容统一放在 `src/data` 中
- 组件化结构：公共 UI、版式组件、视图层分离清晰
- 适合课堂教学、汇报演示和教学内容复用

---

## 技术栈

- Vue 3
- Vite
- Vue Router
- JavaScript / ES Modules
- CSS 变量主题系统

---

## 项目目标

该项目的核心目标不是做通用业务系统，而是构建一套“C++ 教学 PPT / 课件展示平台”，用来实现以下功能：

1. 按章节展开课程内容
2. 组织每一讲的教学 slide
3. 在同一页面中展示代码与讲解
4. 提供扩展知识卡片和学习提示
5. 保持页面结构统一、适合投影展示

---

## 目录结构

```text
C_Vite/
├── public/
│   ├── codes/
│   │   ├── lesson-01/
│   │   ├── lesson-02/
│   │   ├── lesson-03/
│   │   └── lesson-04/
│   └── static/
├── scripts/
│   └── check-codes.js
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── level-map/
│   │   └── slides/
│   ├── composables/
│   ├── config/
│   ├── data/
│   ├── router/
│   ├── styles/
│   ├── views/
│   ├── App.vue
│   └── main.js
├── docs/
├── AI_CONTEXT.md
├── DEVELOPER_GUIDE.md
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── ...
```

---

## 目录职责说明

### public

用于存放静态资源，尤其是课程中需要展示的代码文件。

- `public/codes/`：保存各讲次的代码示例、题解和演示源码
- `public/static/`：存放图片、图标、静态资源等额外素材

### scripts

放置可执行脚本，用于检查和维护项目内容。

- `scripts/check-codes.js`：用于校验代码目录中的示例文件或内容完整性

### src

这是项目的核心源码目录。

#### src/data

课程内容定义区，通常用于按讲次创建教学结构。

- `lesson-01.js`、`lesson-02.js` 等文件存储每一讲的教学内容
- 这些数据文件通常描述：
  - 课程标题和副标题
  - 当前讲的总页数
  - 每一页 slide 的类型
  - slide 中要展示的题目、代码、说明与扩展信息

#### src/components/slides

这是版式组件目录，负责不同展示样式的页面渲染。

常见 slide 类型包括：

- `CoverSlide.vue`：封面页
- `DialogSlide.vue`：对话式讲解页
- `CompareSlide.vue`：对比页
- `FlowSlide.vue`：流程图页
- `TimelineSlide.vue`：时间线页
- `GridSlide.vue`：网格布局页
- `SplitSlide.vue`：分栏页
- `CodeSplitSlide.vue`：代码与说明分栏页
- `BigNumberSlide.vue`：强调数字页
- `LevelMapSlide.vue`：关卡地图页
- `QuoteSlide.vue`：引用页
- `TransitionSlide.vue`：过渡页
- `EndingSlide.vue`：结尾页

`src/components/slides/index.js` 会自动扫描并注册这些组件，使数据文件中的 `type` 能直接映射到对应的 slide 组件。

#### src/components/common

公共组件目录，放置跨多个页面复用的基础 UI。

- `CodeBlock.vue`：代码展示组件
- `ExtraCard.vue`：知识扩展卡片
- `Badge.vue`：标签徽章
- `SlideCard.vue`：通用卡片容器
- `FontScaler.vue`：字体缩放工具
- `MarkerTool.vue`：讲解标注工具

#### src/views

页面级容器，负责组织具体访问入口对应的界面。

- `HomeView.vue`：首页/总览页
- `IndexView.vue`：某一讲的目录页
- `LessonView.vue`：讲次页
- `SlideView.vue`：单页 slide 视图
- `NotFoundView.vue`：404 页面

#### src/router

用于定义路由规则，把页面和讲次/页码连接起来。

#### src/styles

样式目录，统一控制颜色、字重、字号、布局和响应式表现。

- `theme.css`：全局主题变量
- `layout.css`：页面布局和通用结构样式
- `components.css`：公共组件样式
- `responsive.css`：响应式样式
- `animation.css`：动画效果
- `pages.css`：页面级特殊样式
- `syntax.css`：代码高亮样式

#### src/composables

组合式函数目录，负责状态和交互逻辑抽离。

- `useSlide.js`：控制当前 slide 的状态
- `useSlideNav.js`：处理上一页/下一页/快捷键导航
- `useStep.js`：控制分步展示逻辑
- `useStepCount.js`：统计当前 slide 的步骤数
- `useCodeLoader.js`：读取代码文件
- `useHighlight.js`：代码高亮
- `useCopy.js`：复制代码

#### src/config

用于统一存放项目配置项和静态数据。

- 例如颜色编码、标签文本、默认参数、角色设置等

---

## 开发与运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产包

```bash
npm run build
```

### 预览构建产物

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

### 代码校验脚本

```bash
npm run check-codes
```

---

## 课程内容组织方式

该项目采用“数据驱动 + 组件渲染”的模式：

- 数据文件定义课程内容
- 路由确定要访问哪一讲、哪一页
- 对应的 slide 组件负责视觉呈现

例如：

- `src/data/lesson-01.js` 中定义第 1 讲的内容
- `SlideView.vue` 根据当前 slide 的 `type` 找到对应组件
- 如果 `type` 是 `code-split`，则自动加载 `CodeSplitSlide.vue`

这使得课程内容扩展非常方便：只需要补充 lesson 数据与对应版式即可。

---

## 约定与扩展建议

为了保持项目结构稳定、方便维护，推荐遵守以下规范：

1. 每一讲新增内容时，优先在 `src/data/` 中扩展对应 `lesson-*.js`
2. 如果新增讲解版式，建议在 `src/components/slides/` 中新增 `*Slide.vue`
3. 公共展示内容尽量抽离到 `src/components/common/`
4. 样式统一使用 `src/styles/` 中的主题变量和全局规则
5. 代码示例尽量存放到 `public/codes/` 目录中，便于动态加载与展示

---

## 适合的使用场景

- C++ 课程教学
- 编程基础讲解演示
- 学习路线展示
- 为教学内容准备投影版展示页
- 教学资源的卡片化和模块化组织

---

## 备注

这个项目更偏“教学展示型应用”，因此它的结构设计和常规业务 Web 项目有些不同：

- 入口核心不在后台接口，而在内容编排和可视化展示
- 设计目标是“课堂可读性”和“投影展示效果”
- 大量内容依赖 `slide` 组件和数据文件进行组合

这类设计非常适合编程课程、演示型资料和知识体系展示场景。

---

## 维护者说明

如果需要继续扩展课程内容，优先关注以下几个位置：

- `src/data/`：新增或更新讲次内容
- `src/components/slides/`：新增页面版式
- `src/styles/`：统一调整全局排版和主题
- `public/codes/`：补充示例代码

---

## 结语

本项目是一套面向 C++ 教学内容的演示型前端工程，整体架构清晰、扩展性较强，适合持续补充讲次、样式与教学案例。

如果要长期维护和扩展课程内容，最关键的是坚持“内容数据化 + 页面组件化 + 样式主题化”的设计思路。

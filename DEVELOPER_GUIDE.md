# DEVELOPER_GUIDE.md · 开发者接口文档

> 面向新加入的开发者。从 0 开始，30 分钟看懂整个项目。

---

## 一、项目是什么

**C++ 竞赛课程课件系统**（CSP-J/S 方向）。

- **数据驱动**：每页幻灯片用一条 JavaScript 对象描述
- **Vue 3 组件化**：14 种版式组件 + 通用小组件
- **Vite 构建**：秒级热更新
- **零后端**：纯前端，静态部署

**核心思想**：数据描述"有什么内容"，组件负责"怎么渲染"。

---

## 二、快速开始

### 2.1 环境要求

- Node.js ≥ 16
- 任意现代浏览器

### 2.2 安装与运行

```bash
npm install
npm run dev
```

浏览器自动打开 `http://localhost:8080/`。

### 2.3 常用命令

| 命令 | 作用 |
|---|---|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建产物 |
| `npm run validate` | 校验数据格式 |
| `npm run check-codes` | 检查代码文件是否存在 |

---

## 三、项目结构

```
cpp-course/
├── public/
│   └── codes/                 # 外部代码文件（.cpp）
│       ├── lesson-01/
│       └── lesson-04/
│
├── src/
│   ├── main.js                # 应用入口
│   ├── App.vue                # 根组件
│   ├── router/
│   │   └── index.js           # 路由配置
│   │
│   ├── config/                # 全局配置
│   │   ├── characters.js      # 对话角色
│   │   ├── defaults.js        # 默认值（levels / 章节标签）
│   │   ├── labels.js          # UI 文案
│   │   ├── colors.js          # 画笔颜色
│   │   └── schemas.js         # 数据校验规则
│   │
│   ├── composables/           # 组合式函数
│   │   ├── useStep.js         # 分步上下文
│   │   ├── useSlide.js        # 幻灯片核心逻辑
│   │   ├── useStepCount.js    # 组件上报步数
│   │   ├── useSlideNav.js     # 键盘/鼠标导航
│   │   ├── useCodeLoader.js   # 代码文件加载
│   │   ├── useHighlight.js    # 语法高亮
│   │   └── useCopy.js         # 复制到剪贴板
│   │
│   ├── components/
│   │   ├── common/            # 通用组件
│   │   │   ├── SlideCard.vue
│   │   │   ├── Badge.vue
│   │   │   ├── CodeBlock.vue
│   │   │   ├── StepWrapper.vue
│   │   │   └── MarkerTool.vue
│   │   ├── level-map/         # 关卡练习专属
│   │   │   ├── HintRow.vue
│   │   │   └── LevelNode.vue
│   │   └── slides/            # 14 种版式
│   │       ├── index.js       # 自动注册
│   │       ├── CoverSlide.vue
│   │       ├── GridSlide.vue
│   │       ├── LevelMapSlide.vue
│   │       └── ...（共 14 个）
│   │
│   ├── views/
│   │   ├── IndexView.vue      # 系列总目录
│   │   ├── LessonView.vue     # 每讲目录
│   │   ├── SlideView.vue      # 幻灯片页
│   │   └── NotFoundView.vue   # 404
│   │
│   ├── data/
│   │   ├── index.js           # 自动导入 + 工具函数
│   │   ├── lesson-01.js
│   │   ├── lesson-02.js
│   │   ├── lesson-03.js
│   │   └── lesson-04.js
│   │
│   └── styles/
│       ├── main.css           # 样式入口
│       ├── theme.css          # 主题变量
│       ├── reset.css          # 重置 + 禁用选中
│       ├── layout.css         # 幻灯片核心布局
│       ├── components.css     # 通用组件样式
│       ├── animation.css      # 关键帧
│       ├── syntax.css         # 语法高亮
│       ├── pages.css          # 目录页
│       ├── responsive.css     # 响应式
│       └── print.css          # 打印样式
│
├── scripts/
│   ├── validate.js            # 数据校验脚本
│   └── check-codes.js         # 代码文件检查
│
└── package.json
```

---

## 四、核心数据流

```
用户访问 /#/slide/01/7
      ↓
SlideView.vue 解析 URL 参数
      ↓
useSlide.js 读取 src/data/lesson-01.js 里 id=7 的页面
      ↓
根据 page.type 找到对应组件（slideComponents['flow']）
      ↓
渲染 FlowSlide.vue
      ↓
FlowSlide 内部通过 useStepCount 上报步数
      ↓
SlideView 收到步数 → 更新 maxStep
      ↓
用户点击 → useSlide.next() → 推进一步 或 翻页
```

---

## 五、如何添加新讲

### 5.1 新建数据文件

创建 `src/data/lesson-05.js`：

```javascript
export default {
  title: '第 5 讲 一维数组',
  subtitle: '批量存储数据',
  total: 36,
  slides: [
    // 每页一个对象
  ]
};
```

**完成**。`src/data/index.js` 用 `import.meta.glob` 自动导入，**不用改任何其他文件**。

### 5.2 页面对象结构

```javascript
{
  id: 1,                          // 页码（必填，从 1 开始）
  type: 'cover',                  // 版式（必填，14 种之一）
  title: '一维数组',               // 主标题
  subtitle: '批量存储数据',        // 副标题
  chapterTag: '第 5 讲 · 概念',    // 章节标签（可选）
  data: { /* 版式专属数据 */ }
}
```

---

## 六、14 种版式速查

| type | 组件 | 用途 |
|---|---|---|
| cover | CoverSlide | 封面 |
| transition | TransitionSlide | 过渡页 |
| ending | EndingSlide | 结束页 |
| grid | GridSlide | 网格卡片（2-8 张） |
| split | SplitSlide | 左右分栏 |
| big-number | BigNumberSlide | 大数字 |
| compare | CompareSlide | 错误对比 |
| flow | FlowSlide | 横向流程 |
| timeline | TimelineSlide | 时间轴 |
| dialog | DialogSlide | 对话场景 |
| code-split | CodeSplitSlide | 代码拆解 |
| quote | QuoteSlide | 引用金句 |
| radial | RadialSlide | 中心辐射 |
| level-map | LevelMapSlide | 关卡练习 |

---

## 七、常用数据结构

### 7.1 grid（网格卡片）

```javascript
{
  type: 'grid',
  title: '为什么要学 C++？',
  data: {
    cards: [
      { icon: '🏆', title: '竞赛官方语言', desc: '...' },
      { icon: '⚡', title: '运行速度快', desc: '...' },
      { icon: '🧰', title: 'STL 强大', desc: '...' },
      { icon: '🎓', title: '升学助力', desc: '...' }
    ],
    extra: { title: '💡 冷知识', desc: '...' }
  }
}
```

### 7.2 level-map（练习题）

```javascript
{
  type: 'level-map',
  title: '课堂练习1：Hello World',
  data: {
    question: {
      title: '题干',
      desc: '输出 <code>Hello, World!</code>。',
      timer: '⏱ 限时 5 分钟'
    },
    hints: ['用 <code>cout</code>', '双引号', '末尾分号'],
    answer: { codeFile: 'codes/lesson-01/hello-answer.cpp' },
    analysis: { title: '📖 解析', desc: '...' },
    extra: { title: '📖 知识扩展', desc: '...' }
  }
}
```

### 7.3 code-split（代码拆解）

```javascript
{
  type: 'code-split',
  title: '第一个程序',
  data: {
    codeFile: 'codes/lesson-01/hello-world.cpp',   // 或 code: '...'
    annotations: [
      { line: 1, title: '#include', desc: '引入库' }
    ],
    output: 'Hello, World!',
    extra: { title: '💡 ...', desc: '...' }
  }
}
```

**代码数组**：`answer` 支持数组，长度决定布局（1 单栏 / 2 两栏 / 3 三栏 / 4 四栏）。

### 7.4 dialog（对话）

```javascript
{
  type: 'dialog',
  data: {
    lines: [
      { who: 'student', text: '...' },   // 自动补头像和名字
      { who: 'robot',   text: '...' }
    ],
    extra: { title: '📖 ...', desc: '...' }
  }
}
```

**who 对应角色**：`student` / `robot` / `teacher` / `xiaoma`（见 `config/characters.js`）。

---

## 八、如何添加新 type

### 8.1 新建组件

`src/components/slides/NewTypeSlide.vue`：

```vue
<template>
  <div class="slide">
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body">
      <!-- 你的布局 -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});

// 上报步数（组件自声明）
useStepCount(emit, () => 1);
</script>

<style scoped>
/* 组件独有样式 */
</style>
```

### 8.2 命名规则

| 文件名 | 自动注册的 type |
|---|---|
| `CoverSlide.vue` | `cover` |
| `NewTypeSlide.vue` | `new-type` |
| `MyAwesomeSlide.vue` | `my-awesome` |

**规则**：去掉 `Slide` 后缀，大驼峰转短横线小写。

### 8.3 完成

`src/components/slides/index.js` 用 `import.meta.glob` 自动注册。

**不用改任何其他文件**。

---

## 九、如何添加代码文件

### 9.1 目录规范

```
public/codes/lesson-XX/
├── hello-world.cpp
├── sum-answer.cpp
└── sort-p1.cpp
```

### 9.2 命名规范

| 场景 | 命名 |
|---|---|
| 普通代码 | `{英文短名}.cpp` |
| 分步骤 | `{短名}-p{步骤}.cpp` |
| 练习答案 | `{短名}-answer.cpp` |

**规则**：
- 小写字母 + 连字符
- ≤ 3 个词
- 不加页码
- 不用中文、空格、大写

### 9.3 数据里引用

```javascript
answer: {
  codeFile: 'codes/lesson-01/hello-answer.cpp'
}
```

**路径规则**：相对于 `public/` 目录。

### 9.4 代码文件内容规范

**正确**：

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

**规则**：
1. 只放代码本身，不加元信息注释（文件名、页码、标题）
2. **代码逻辑注释保留**，如 `// 累加 1 到 n`
3. 统一用 **4 空格缩进**，不用 Tab
4. 文件本身在 Dev-C++ 中能直接编译运行

---

## 十、常用开发任务

### 10.1 修改数据

**只改** `src/data/lesson-XX.js`。不要改组件。

### 10.2 修改某个版式的样式

**只改** 对应组件的 `<style scoped>`。

### 10.3 修改全局样式

**改** `src/styles/components.css`（如卡片、徽章）。

### 10.4 修改角色名字

**只改** `src/config/characters.js`：

```javascript
export const characters = {
  robot: { avatar: '🤖', speaker: '小 C' },   // ← 改这里
  ...
};
```

### 10.5 修改章节标签

**只改** `src/config/defaults.js` 的 `TYPE_LABELS`。

---

## 十一、核心约定（不能改）

| 约定 | 说明 |
|---|---|
| 数据里不写 HTML | 除少量内联标签 `<b>` `<code>` `<br>` |
| 不手动写 data-step | 由 StepWrapper 自动控制 |
| 代码块不写 layout / density | 组件自动判断 |
| OJ 题目用 `link` 字段 | 不写 `<a>` 标签 |
| dialog 不写 avatar / speaker | 从 config 自动补 |
| 练习题固定用 level-map | 不改 dialog |
| 不能连续 3 页同 type | 保持节奏 |
| 全局禁用选中 | 只有输入框例外 |

---

## 十二、常见问题

### 12.1 页面空白

**检查**：
1. Console 有无报错
2. `page.type` 是否是 14 种之一
3. 数据里是否有 `data` 字段

### 12.2 代码块显示 HTML

**原因**：`codeFile` 指向的文件不存在，Vite 返回 `index.html`。

**解决**：
1. 检查文件是否存在于 `public/codes/...`
2. 运行 `npm run check-codes`

### 12.3 分步不生效

**检查**：
1. 组件是否调用了 `useStepCount(emit, ...)`
2. 内容是否用 `<StepWrapper :step="N">` 包裹

### 12.4 图片/图标 404

**解决**：把图片放到 `public/static/`，用 `/static/xxx.png` 引用。

---

## 十三、技术栈

- Vue 3（组合式 API）
- Vue Router 4（hash 模式）
- Vite 5
- 纯 JS（无 TypeScript）
- 无 UI 框架

---

## 十四、扩展阅读

- `AI_CONTEXT.md` — AI 上下文恢复文档
- `RULES.md` — 数据格式完整规范
- `AI_PROMPT.md` — 生成数据的 AI 提示词

---

**开始工作吧！**
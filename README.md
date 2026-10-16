# C++ 竞赛课程幻灯片系统

> 基于 Vue 3 + Vite 的交互式教学演示项目。
> 一套 C++ 竞赛入门课程，从零基础到 CSP-J/S。

---

## 这是什么

**不是普通网站** —— 是"逐页展示 + 分步动画 + 可画笔记"的**课堂演示工具**。

- 57 讲完整课程蓝图（已完成 19 讲）
- 21 种幻灯片版式
- 支持分步展示、字号缩放、画笔批注
- 数据驱动 —— 内容在 `src/data/lesson-XX.js`，渲染在 `src/components/slides/`

---

## 快速开始

```bash
# 安装
npm install

# 开发
npm run dev
# 打开 http://localhost:5173

# 构建
npm run build

# 命令中心（推荐）
npm run help
```

---

## 项目结构（简化）

```
src/
  data/          课程数据（lesson-XX.js）
  components/
    slides/      21 种版式组件
    common/      公共组件（CodeBlock / ImageCard / ExtraCard...）
  composables/   组合式函数（useStep / useSlide...）
  views/         页面（Index / Lesson / Slide / Glossary）
  styles/        CSS（theme / layout / components...）
  router/        路由

public/
  codes/         .cpp 代码文件（按讲次分目录）
  static/        静态资源（images / ascii-art）

scripts/         工具脚本（检查 / 生成 / 打包）
docs/            项目文档
```

---

## 核心概念

| 概念 | 说明 |
|---|---|
| **slide** | 一页幻灯片 —— `{ id, type, title, data }` |
| **type** | 版式 —— `cover` / `grid` / `dialog` / `code-split`... |
| **step** | 分步 —— 点一次显示一步 |
| **extra** | 折叠的"知识扩展"卡 |
| **footer** | 页面底部的"补充说明" |

---

## 写一讲的大致流程

1. 在 `src/data/` 新建 `lesson-XX.js`
2. 按数据格式填 slides
3. 放 `.cpp` 文件到 `public/codes/lesson-XX/`
4. 跑 `npm run dev` 预览
5. 跑 `npm run help` → `check:all` 检查

**详细流程** → 见 `docs/GUIDE.md`

---

## 文档导航

| 想了解 | 看 |
|---|---|
| 项目架构 | `docs/ARCHITECTURE.md` |
| 怎么开发 | `docs/GUIDE.md` |
| 什么场景用什么组件 | `docs/PATTERNS.md` |
| 内容优化流程 | `docs/LESSON-SOP.md` |
| 课程设计 | `docs/COURSE-DESIGN.md` |
| 每讲逐页清单 | `docs/COURSE-INDEX.md` |
| 当前待办 | `docs/TODO.md` |

---

## 常用命令

```bash
npm run dev              # 开发
npm run help             # 交互式命令中心
node scripts/help.js check:all    # 全部检查
node scripts/help.js fix:ids      # 修 id
node scripts/help.js pack         # 打包给 AI
```
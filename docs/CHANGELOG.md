# 变更日志

> 记录项目的**重大变更** —— 不是每次 commit。
> 格式参考 [Keep a Changelog](https://keepachangelog.com/)。

---

## [未发布]

### 新增

- `ImageCard` 组件 —— 统一的图片展示（图 + 说明 + 图源）
- `SlideFooter` 组件 —— 页面底部的补充说明
- ENIAC 扩展页（lesson-01 slide-07）
- `CompareSlide` 支持 `neutral` 模式（蓝紫配色，不暗示对错）
- `SplitSlide` 支持 `pane.image`（左图右文）
- `GridSlide` / `LevelMapSlide` / `CodeSplitSlide` / `CompareSlide` / `SplitSlide` / `FlowSlide` 支持 `footer` 字段

### 优化

- `useHighlight` 预编译正则 —— 代码高亮速度提升 3-5 倍
- 数据懒加载 —— 首屏从 900KB 降到 130KB
- 每讲 extra 精简到 10-25% 覆盖率
- 统一 dialog ≤ 3 个 / 讲，每个 ≤ 4 轮
- 组件能力统一 —— `v-bind="extra"` 传参

### 修复

- 修复 21 处 HTML div 破损（dialog 长段落）
- 修复 `MarkerTool` resize 清空画布
- 修复 `useSlideNav` 交互元素白名单（点按钮不再触发翻页）
- 修复 `SlideShell` 的 `auto-extra` 双渲染问题
- 修复多根组件导致 `<transition>` 空白
- 移除重复的 `.float` / `.glow` / `.scroll-pane` 定义

---

## [3.0.0] — 重构版本

### 新增

- **SlideShell** —— 统一版式壳（标题 / 副标题 / 章节标签 / extra）
- **Design Token 三层** —— primitives → semantic → component
- **`--font-scale` 4 档字号缩放**
- **8 种氛围背景** —— 按 `slide.type` 差异化
- **`useSlideTheme`** —— 页面氛围自动切换
- **`OriginSlide` / `PitfallSlide` / `DecisionSlide`** —— 新概念版式
- **`ImageCard`** —— 图片统一封装

### 优化

- **SlideShell 迁移** —— 17/21 个版式统一
- **`useStepCount` 直调 `setMax`** —— 消除 emit 中转
- **`useStep` 统一滚动** —— 移除 21 个 StepWrapper 的 watcher
- **`IconMap` 从 `import *` 改显式** —— lucide 树摇优化

### 修复

- 删除死样式 / 死变量
- 统一 `.slide-body` 变体命名

---

## [2.0.0] — 内容扩充

### 新增

- 新增 6 讲内容（lesson-13 到 lesson-18）
- Timeline 支持 `variant`（review / map / history）
- 页面氛围色差异化

### 优化

- 课程数据分层（lesson-index.js）
- 术语表独立数据源

---

## [1.0.0] — 首个可用版本

### 新增

- 项目初始化
- 12 讲内容
- 15 种基础版式
- 路由 / 数据 / 组件分层
- 分步展示机制

---

## 版本规则

- **主版本**（X.0.0）—— 架构级重构
- **次版本**（0.X.0）—— 新功能 / 新讲次
- **修订**（0.0.X）—— Bug 修复 / 小优化

---

## 未来规划

### 近期

- 内容优化推进到 lesson-07 ~ lesson-18
- 逐步加图片（人物 / 事件）
- 扩展页计划（12 个）

### 中期

- 学生端（练习 / 下载）
- 跨设备同步（localStorage + 导出）
- PDF 导出

### 长期

- 暗色模式
- 搜索功能
- 知识地图
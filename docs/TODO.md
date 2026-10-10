# 当前待办与已知问题

> 这个文件由人维护。`bundle-for-context.js` 会把它原样打包进 `05-脚本与待办.md`。

## 已完成

- ✅ 图标从 emoji 换 SVG（IconMap 组件）
- ✅ 背景按页类型差异化（useSlideTheme）
- ✅ 卡片分级（card-hero / card-subtle）
- ✅ timeline variant 支持（review / map / history）
- ✅ useStepCount 直调 setMax（消除 emit 中转）

## 进行中

- 🟡 lesson-02 内容优化（4 处：三条边界、PitfallSlide、DecisionSlide、初赛标记）
- 🟡 新组件 OriginSlide（知识点由来）——已试点 lesson-02

## 待办

- ⏳ 快速回顾小测（每讲 slide-02 后加 3 题 quiz）
- ⏳ 伏笔角标（foreshadow 字段）
- ⏳ 知识地图页面（/knowledge-map）
- ⏳ CodeWalkthroughSlide 的 highlightLine bug 修复
- ⏳ 平板断点补充（1024px）

## 已知问题

- Extra 展开后仍可能溢出（待加 max-height 跟随 font-scale）
- quiz 一屏只装 1.5 题（待紧凑排版）
- dialog 超过 5 轮会溢出（待数据侧控制）
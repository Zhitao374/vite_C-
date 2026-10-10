# 版式选择指南

> 写新讲次时对着这份文档选版式——避免"该用 split 却用 dialog"。

## 一、快速对照表

| 教学场景 | 推荐版式 | 避免 |
|---|---|---|
| 课程开场 / 章节切换 | `cover` / `transition` | `dialog` |
| 概念对比 | `compare` / `split` | `dialog` |
| 概念引入（对话式） | `dialog` | **连续 2+ dialog** |
| 概念来龙去脉 | `origin` | — |
| 代码逐行讲解 | `code-split` | — |
| 代码执行过程（多步） | `evolution` / `code-walkthrough` | — |
| 常见错误演示 | `pitfall` / `compare` | — |
| 决策判断（"看到 X 就用 Y"） | `decision` | — |
| 数据展示（一个数字/图标） | `big-number` / `grid` | — |
| 流程步骤（流程图式） | `flow` | — |
| 时间线 / 学习地图 | `timeline` | — |
| 练习题 | `level-map` | — |
| 课堂小测 | `quiz` | — |
| 知识回顾 | `timeline` (`variant: review`) / `quote` | — |
| 术语表 | `glossary` | — |
| 结论 / 收束 | `quote` / `ending` | — |
| 下节预告 | `radial` | — |

## 二、每讲节奏模板（30 页左右）
```
cover ← 开场

timeline (review) ← 上节回顾（非第 1 讲才有）

grid ← 本节课目标

timeline (map) ← 学习地图
5-10. 概念主体 ← dialog ≤ 3，其余用 origin / compare / split
11-15. 代码 / 演示 ← code-split / evolution
16-18. level-map × 3 ← 练习（基础 / 进阶 / 挑战）
dialog ← 初赛渗透
quiz ← 课堂小测
quote ← 今日总结
grid ← 课后作业
radial ← 下节预告
dialog ← 答疑时间
glossary ← 英文单词
grid ← 知识清单
ending ← 结束页
```

实际页数按内容灵活调整——这是"骨架"，不是"死模板"。

## 三、对话框（dialog）的使用上限

- **每讲 ≤ 3 个 dialog**——多了会审美疲劳
- **不允许连续 2 个 dialog**
- **不允许连续 2 个 timeline**
- **不允许连续 2 个 grid**

## 四、检查清单（写完一讲后过一遍）

- [ ] dialog ≤ 3 个
- [ ] 没有连续 2 个同类型页
- [ ] 5 个阶段都覆盖：概念 / 代码 / 练习 / 小测 / 总结
- [ ] 每道题都有 answer（不能只有题干）
- [ ] 伏笔都有对应的"回收"（🔮 标记）
- [ ] glossary 词条 6-12 个
- [ ] 跑 `node scripts/help.js check:html` → 0 处
- [ ] 跑 `node scripts/help.js check:ids` → 全部通过
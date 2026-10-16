# 版式选择指南

> 写新讲次时对着这份文档选版式。
> 核心原则：**什么教学场景，用什么组件**。

---

## 一、快速对照表

| 教学场景 | 推荐版式 | 避免 |
|---|---|---|
| 课程开场 | `cover` | `dialog` |
| 上节回顾 | `timeline (review)` | `grid` |
| 本节目标 | `grid` | `dialog` |
| 学习地图 | `timeline (map)` | `radial` |
| 概念引入（对话）| `dialog`（≤ 4 轮）| 8 轮对话 |
| 概念由来 | `origin` | — |
| 概念对比 | `compare` | — |
| 选项并列（无对错）| `compare + neutral` | 红绿配色 |
| 代码演示 | `code-split` | — |
| 代码执行过程 | `evolution` | — |
| 常见错误 | `pitfall` | `compare` |
| 决策判断 | `decision` | — |
| 流程步骤 | `flow` | — |
| 练习题 | `level-map` | — |
| 课堂小测 | `quiz` | — |
| 今日总结 | `quote` | `dialog` |
| 课后作业 | `grid` | — |
| 下节预告 | `radial` | — |
| 答疑时间 | `grid FAQ`（6 卡）| `dialog` |
| 术语表 | `glossary` | — |
| 人物 / 事件扩展 | `split` + `ImageCard` | — |

---

## 二、dialog 使用上限

- **每讲 ≤ 3 个 dialog**
- **每个 dialog ≤ 4 轮**
- **不允许连续 2 个 dialog**
- **不允许连续 2 个 timeline**

---

## 三、grid 卡片数量

**推荐**：**1 / 2 / 3 / 4 / 6 / 8 / 9 / 12**（对称）
**避免**：**5 / 7 / 10 / 11**（无论几列都不对称）

**GridSlide 自动布局规则**：
```js
if (n === 1) return 'grid-cols-1';
if (n === 2) return 'grid-cols-2';
if (n % 4 === 0) return 'grid-cols-4';
if (n % 3 === 0) return 'grid-cols-3';
return n >= 8 ? 'grid-cols-4' : 'grid-cols-3';
```

---

## 四、extra vs footer

| 工具 | 用途 | 展示 | 例子 |
|---|---|---|---|
| **extra** | 长故事 / 跨学科 | **折叠** | Ada Lovelace、阿丽亚娜火箭 |
| **footer** | 短提示 / 口诀 | **直接显示** | "两个等号"、"要小数先转 double" |

**判断**：
- **内容 ≤ 3 行** → footer
- **> 3 行 或 有故事性** → extra
- **不确定** → 用 footer（简化页面）

---

## 五、图片使用

### 5.1 什么时候加图

| 场景 | 加图 |
|---|---|
| 历史人物 | ✅ 肖像 |
| 历史事件 | ✅ 照片 |
| 抽象概念 | ✅ 示意图 |
| 纯装饰 | ❌ 不加 |

### 5.2 用 ImageCard 组件

```js
extra: {
  title: '📖 冯·诺依曼结构',
  image: {
    src: 'static/images/people/von-neumann.jpg',
    alt: '约翰·冯·诺依曼',
    caption: '约翰·冯·诺依曼（1903—1957）',
    source: '美国能源部 / Public Domain',
    layout: 'float-right',
    size: 'sm'
  },
  desc: '...'
}
```

**layout**：`float-right` / `float-left` / `block` / `inline`
**size**：`sm`（160px）/ `md`（280px）/ `lg`（480px）/ `full`

### 5.3 图片路径

**统一放 `public/static/images/`** —— 按类别分：
- `people/` —— 人物
- `events/` —— 事件
- `concepts/` —— 概念图

---

## 六、扩展页（人物 / 事件专页）

**什么时候做扩展页**：
- 有"人物 + 事件 + 反差"
- 内容够 1 页（不只 1 段）
- 和当前讲主题强相关

**用什么组件**：
- **人 / 事件** → `split`（左图右文）
- **问题** → `origin`
- **时间线** → `timeline`

**示例**（ENIAC 页）：
```js
{
  type: 'split',
  data: {
    intro: '...',
    panes: [
      {
        image: 'static/images/events/eniac-1946.webp',
        imageCaption: 'ENIAC（1946）',
        imageSource: '美国陆军 / Public Domain',
        imageSize: 'lg'
      },
      {
        title: '关键数据',
        items: [
          { title: '📊 规模', desc: '...' },
          // ...
        ]
      }
    ]
  }
}
```

---

## 七、每讲节奏模板（30 页左右）

```
1.  cover                     ← 开场
2.  timeline (review)         ← 上节回顾
3.  grid                      ← 本节课目标
4.  timeline (map)            ← 学习地图
5-10. 概念主体               ← origin / dialog / grid
11-15. 代码 / 演示           ← code-split / evolution
16-18. level-map × 3         ← 练习
19. dialog / split            ← 初赛渗透
20. quiz                      ← 课堂小测
21. quote                     ← 今日总结
22. grid                      ← 课后作业
23. radial                    ← 下节预告
24. grid FAQ                  ← 答疑
25. glossary                  ← 术语表
26. grid                      ← 知识清单
27. ending                    ← 结束页
```

---

## 八、内容质量检查清单

### 结构检查
- [ ] 有 cover / review / 目标 / 地图
- [ ] 有 3+ 道 level-map
- [ ] 有 quiz / quote / 作业 / 预告 / glossary / 清单 / ending

### 内容检查
- [ ] dialog ≤ 3 个
- [ ] 每个 dialog ≤ 4 轮
- [ ] 没有连续 2 个同类型页
- [ ] 每页步数合理（≤ 10 步）
- [ ] 每道练习题有 answer

### 数据检查
- [ ] `total` = `slides.length`
- [ ] `id` 从 1 连续
- [ ] 无 `**` 未渲染
- [ ] 无 `</div>` 孤儿

### 视觉检查
- [ ] 一屏装得下
- [ ] 底部空白 ≤ 40%
- [ ] footer / extra 出现正确
- [ ] 图片显示正常
# 课程内容优化方向指南

> 本文档总结 lesson-01 ~ lesson-04 的优化经验，形成一套可复用的"课程内容优化 SOP"。
> 适用于后续 lesson-05 ~ lesson-57 的内容审核与改造。

---

## 一、优化流程 SOP（5 步走）

每一讲的标准优化流程：

### Step 1 · 审计 extra

```bash
node scripts/audit-extra.js lesson-XX
node scripts/audit-extra.js lesson-XX --csv
```

**产出**：`extra-audit.csv` —— 每条 extra 被分类为 `STORY / TIP / INFO / OTHER`。

### Step 2 · 生成决策表

**人工标注**每条 extra 的 `decision`：
- `keep` —— 保留（有故事、有反差、有跨学科）
- `delete` —— 删除（纯技巧、纯总结、纯抒情）
- `merge` —— 合并到正文（重要但不够独立）

**产出**：`extra-decisions-XX.csv`

### Step 3 · 批量删 extra

```bash
node scripts/apply-extra-decisions.js extra-decisions-XX.csv --dry
node scripts/apply-extra-decisions.js extra-decisions-XX.csv
```

### Step 4 · 结构改造（dialog → 结构化组件）

**判断规则**：

| 现状 | 改法 | 原因 |
|---|---|---|
| dialog ≥ 6 轮 + 讲"清单/规则" | → **grid** | 结构化并列，一眼扫完 |
| dialog ≥ 6 轮 + 讲"演进/由来" | → **origin** | 三层递进有画面感 |
| dialog ≥ 6 轮 + 讲"对比/选择" | → **decision** | 信号 + 结论 |
| dialog ≥ 6 轮 + 讲"陷阱/错误" | → **pitfall** | 现象 + 原因 + 应对 |
| dialog ≥ 6 轮 + 讲"两栏并列" | → **split** | 左→右直接对比 |
| compare 讲"错误 vs 正确" | → **pitfall** | 更适合"避坑"语义 |
| compare 讲"选项 A vs B"（无对错） | **加 `neutral: true`** | 避免红绿暗示对错 |

### Step 5 · 搬正文 + 验证

```bash
node scripts/help.js check:all
node scripts/help.js check:html
node scripts/help.js check:ids
npm run dev
```

**逐页目视验证**，特别关注：
- 步进是否顺畅（每步 1 个焦点）
- footer/extra 是否出现
- 无滚动溢出
- 无 emoji 显示成方框

---

## 二、Extra 精简标准

### 2.1 保留（`keep`）

**判据**：**能讲 30 秒的故事** —— 满足以下 4/5 条：

- ✅ 有人物/事件（Ada Lovelace、阿丽亚娜火箭）
- ✅ 有反转/惊讶（C++ 是"C 加一"）
- ✅ 和当页强关联（讲"变量"聊"名字代替地址"）
- ✅ 独立成篇（不依赖前文）
- ✅ 独家性（不是人人皆知的常识）

**典型保留案例**：
- Ada Lovelace（lesson-01）
- 冯·诺依曼结构（lesson-01 / lesson-02）
- 阿丽亚娜 5 号火箭（lesson-02）
- 布尔代数的历史（lesson-03）
- 闰年的由来（lesson-04）

### 2.2 删除（`delete`）

**判据**：**不是故事，是"信息/技巧/总结"**

- ❌ 纯技巧（"取余的妙用"、"快捷键"）
- ❌ 纯信息（"常见 OJ 平台"、"类型大小表"）
- ❌ 纯总结（"核心要点回顾"、"今天你学会了"）
- ❌ 纯抒情（"你已经让程序学会了思考"）
- ❌ 和别处重复（同一讲里出现 2 次）

### 2.3 搬正文（`merge`）

**判据**：**重要但不够独立** —— 删了会"内容缺口"

**搬到哪**（按组件类型）：

| 组件 | 搬法 |
|---|---|
| **grid** | 加 `footer` |
| **code-split** | 加 `footer` |
| **compare** | 加 `footer` 或补 `right` 列 |
| **level-map** | 加到 `analysis.desc` 或 `footer` |
| **dialog** | 加到 `lines[]` 最后 1-2 轮 |

### 2.4 精简目标

| 讲次 | 原 extra | 精简后 | 降幅 |
|---|---|---|---|
| lesson-01 | 28 | 7 | 75% |
| lesson-02 | 25 | 6 | 76% |
| lesson-03 | 28 | 3 | 89% |
| lesson-04 | 27 | 3 | 89% |

**目标区间**：**3-7 条/讲**（覆盖率 10-25%）。

---

## 三、组件选择指南

### 3.1 版式对照表

| 教学场景 | 推荐版式 | 避免 |
|---|---|---|
| 课程开场 | `cover` | `dialog` |
| 上节回顾 | `timeline (review)` | `grid` |
| 本节目标 | `grid` | `dialog` |
| 学习地图 | `timeline (map)` | `radial` |
| 概念引入（对话） | `dialog`（≤ 4 轮） | 8 轮对话 |
| 概念由来 | `origin` | — |
| 概念对比 | `compare` | — |
| 选项并列（无对错） | `compare + neutral: true` | 红绿配色 |
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
| 答疑时间 | `grid FAQ`（6 卡） | `dialog` |
| 术语表 | `glossary` | — |

### 3.2 dialog 使用上限

- **每讲 ≤ 3 个 dialog**
- **每个 dialog ≤ 4 轮**
- **不允许连续 2 个 dialog**
- **不允许连续 2 个 timeline**

### 3.3 Grid 卡片数量

**推荐**：**1 / 2 / 3 / 4 / 6 / 8 / 9 / 12**（对称）

**避免**：**5 / 7 / 10 / 11**（无论几列都不对称）

**组件的自动布局规则**（`GridSlide.vue`）：

```js
if (n === 1) return 'grid-cols-1';
if (n === 2) return 'grid-cols-2';
if (n % 4 === 0) return 'grid-cols-4';
if (n % 3 === 0) return 'grid-cols-3';
return n >= 8 ? 'grid-cols-4' : 'grid-cols-3';
```

---

## 四、内容质量检查清单（每讲必过）

### 4.1 结构检查

- [ ] 有 `cover` 开场
- [ ] 有 `timeline(review)` 回顾（非第 1 讲）
- [ ] 有 `grid` 目标
- [ ] 有 `timeline(map)` 地图
- [ ] 有 `transition` 章节过渡（1-4 个）
- [ ] 有 `level-map` 练习（≥ 3 道）
- [ ] 有 `quiz` 小测（≥ 3 题）
- [ ] 有 `quote` 总结
- [ ] 有 `grid` 作业
- [ ] 有 `radial` 预告
- [ ] 有 `glossary` 术语
- [ ] 有 `ending` 结束页

### 4.2 内容检查

- [ ] dialog ≤ 3 个
- [ ] 每个 dialog ≤ 4 轮
- [ ] 没有连续 2 个同类型页
- [ ] 每页步数合理（≤ 10 步）
- [ ] 每道练习题有 `answer`
- [ ] 每道 quiz 有 `analysis`
- [ ] 伏笔有对应的"回收"（`🔮` 标记）
- [ ] glossary 词条 6-12 个

### 4.3 数据检查

- [ ] `total` = `slides.length`
- [ ] `id` 从 1 连续
- [ ] 无重复 `id`
- [ ] 无多余 `extra`（决策表执行后）
- [ ] 无 `**` 未渲染（用 `<b>` 替代）
- [ ] 无 `</div>` 孤儿（跑 `check:html`）
- [ ] 无引用错位（"对应 slide-XX"）
- [ ] 无 emoji 显示成方框（换 IconMap 支持的）

### 4.4 视觉检查

- [ ] 一屏装得下（无滚动溢出）
- [ ] 每页底部不过分空白（≤ 40%）
- [ ] footer/extra 出现正确
- [ ] 6/9 卡自动 3 列（对称）
- [ ] 代码块行距清晰
- [ ] `<b>` 加粗醒目（1.12 倍）

---

## 五、常见 Bug 修复

### Bug 1 · HTML div 破损

**症状**：dialog 长段落出现"孤儿 `</div>`"或"未闭合 `<div>`"

**检查**：
```bash
node scripts/help.js check:html
```

**修复**：
```bash
node scripts/help.js fix:html:dry    # 预览
node scripts/help.js fix:html        # 执行
```

### Bug 2 · 组件双渲染 extra

**症状**：同一个 extra 出现两次（一次在底部折叠，一次在中间）

**原因**：`CodeSplitSlide` / `QuoteSlide` 有自己的 extra 位置，但 `SlideShell` 又自动追加一次。

**修复**：给这两个组件的 `<SlideShell>` 加 `:auto-extra="false"`。

### Bug 3 · Multi-root 组件无法过渡

**症状**：页面空白，控制台警告 `Component inside <Transition> renders non-element root node`

**原因**：组件有多个根元素，`<transition>` 无法渲染。

**修复**：包一层 `<div>` 作为唯一根。

### Bug 4 · slide 引用错位

**症状**：analysis 里写"对应 slide-17"，但实际内容是 slide-20

**原因**：删页后 id 变了，但文字引用没更新。

**修复**：全文搜索 `slide-\d+`——人工核对。

### Bug 5 · `**` 未渲染

**症状**：页面显示 `**类型大小**` 而不是加粗

**原因**：`v-html` 只认 HTML，不认 Markdown

**修复**：把 `**文字**` 改为 `<b>文字</b>`

### Bug 6 · LevelMap 步数不准

**症状**：footer 或 extra 不出现

**原因**：`useStepCount` 少了 `data.footer` 或 `data.extra` 的判断

**修复**：
```js
useStepCount(emit, () => {
  let n = 1;
  n += data.hints?.length || 0;
  n += data.answer ? 1 : 0;
  n += data.analysis ? 1 : 0;
  n += data.footer ? 1 : 0;
  n += data.extra ? 1 : 0;    // ← 不能删
  return n;
});
```

---

## 六、每讲的"套路"模板

### 6.1 标准结构（30 页左右）

```text
1.  cover                     ← 开场
2.  timeline (review)         ← 上节回顾
3.  grid                      ← 本节课目标
4.  timeline (map)            ← 学习地图
5-10. 概念主体                ← origin / dialog / grid
11-15. 代码 / 演示            ← code-split / evolution
16-18. level-map × 3          ← 练习
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

### 6.2 每讲的"叙事弧"

- **外部动机**（第 1 讲）→ "为什么学编程"
- **问题驱动**（第 2-9 讲）→ "为什么需要这个概念"
- **体系梳理**（第 10 讲）→ 阶段复习
- **能力跃迁**（第 11+ 讲）→ 组合应用

---

## 七、组件能力扩展史

| 组件 | 已支持 | 用途 |
|---|---|---|
| **SlideShell** | `autoExtra` | 自动追加 extra（默认 true，可关） |
| **GridSlide** | `footer` | 卡片下方补充说明 |
| **CompareSlide** | `neutral` / `leftLabel` / `rightLabel` | 中性配色 + 自定义标签 |
| **LevelMapSlide** | `footer` | 练习页底部补充说明 |
| **SlideShell** | `bodyClass` | 自定义 slide-body 的 class |

**扩展原则**：**一次投资，处处可用** —— 组件加字段，所有讲次受益。

---

## 八、脚本工具速查

### 8.1 检查类

```bash
node scripts/help.js check             # 交互式
node scripts/help.js check:all         # 全部检查
node scripts/help.js check:code        # 代码编译
node scripts/help.js check:ids         # id 连续性
node scripts/help.js check:html        # HTML div 配对
node scripts/help.js check:glossary    # 术语表
```

### 8.2 修复类

```bash
node scripts/help.js fix:ids           # 只修 id（不编译）
node scripts/help.js fix:html          # 修 HTML 破损
node scripts/help.js fix:comments      # 重排注释编号
node scripts/help.js fix:extra         # 修 Extra 多栏分段
```

### 8.3 生成类

```bash
node scripts/help.js index             # COURSE-INDEX.md
node scripts/help.js index:lessons     # lesson-index.js
node scripts/help.js index:glossary    # glossary-data.js
```

### 8.4 审计类

```bash
node scripts/audit-extra.js lesson-XX  # extra 审计
node scripts/audit-slide-shell.js      # SlideShell 迁移审计
node scripts/audit-font-scale.js       # px 硬编码审计
```

### 8.5 打包类

```bash
node scripts/help.js pack              # 精简版（给新对话）
node scripts/help.js pack:full         # 完整版
```

---

## 九、常见问题 FAQ

### Q1：extra 和 footer 有什么区别？

| 工具 | 用途 | 展示 | 例子 |
|---|---|---|---|
| **extra** | 长故事 / 跨学科 | 折叠（学生自选看）| Ada Lovelace、冯·诺依曼 |
| **footer** | 短提示 / 口诀 | 直接显示（学生必看）| "两个等号"、"要小数先转 double" |

**判断**：内容 ≤ 3 行 → footer；> 3 行或有故事 → extra。

### Q2：什么时候用 origin，什么时候用 dialog？

- **有"演进/由来"** → origin（三层递进）
- **有"问答互动"** → dialog（≤ 4 轮）
- **不确定** → 优先 origin（信息密度高，学生爱看）

### Q3：删 extra 后，页面显得空怎么办？

**三级处理**：
1. **优先保持** —— 空白是"呼吸"，不是"缺内容"
2. **加 footer** —— 补充"关键提示"（1-3 行）
3. **调卡片内容** —— 把删掉的 extra 合并到某张卡的 `desc`

### Q4：修改组件还是修改数据？

**判断**：
- **通用需求**（如 footer、neutral）→ **改组件**（一次投资）
- **单页需求**（如某页要特殊样式）→ **改数据**（避免组件膨胀）

### Q5：删页后 id 会乱吗？

**会自动修** —— 跑：
```bash
node scripts/help.js fix:ids
```

**注意**：注释编号不会自动修 —— 跑：
```bash
node scripts/help.js fix:comments
```

---

## 十、下一步优化方向（Roadmap）

### 10.1 已完成（lesson-01 ~ lesson-04）

- ✅ extra 精简（10-25% 覆盖率）
- ✅ dialog 压缩（≤ 4 轮）
- ✅ 组件能力扩展（footer / neutral / autoExtra）
- ✅ 数据校验（HTML / id / 注释）
- ✅ 性能优化（lazy 加载、预编译正则）
- ✅ 无障碍（reduced-motion / focus）
- ✅ 视觉层级（三级字阶 / 行距校准）

### 10.2 待推进（lesson-05 ~ lesson-57）

**每讲按 SOP 走**：
1. 跑 `audit-extra.js`
2. 生成决策表 CSV
3. 批量删 extra
4. 结构改造（dialog → 结构化组件）
5. 搬正文 + 验证

**预计每讲 1-1.5 小时**。

### 10.3 长期方向

| 项目 | 说明 |
|---|---|
| **数据 lazy 加载** | 首屏从 962KB → 130KB（已完成） |
| **PDF 导出** | 学生可离线打印 |
| **学生端** | 练习模式 + 资源下载（暂搁置） |
| **暗色模式** | 夜间学习 / 深色系统适配 |
| **跨设备同步** | localStorage + 导出/导入 JSON |
| **搜索功能** | 全文检索课程内容 |
| **知识地图** | 可视化讲次关系 |

### 10.4 判断新优化是否值得做

**三问**：

1. **影响面**：影响几讲？还是单讲？
2. **投资回报**：改 1 次 vs 用 N 次？
3. **是否阻塞**：不做会影响后续吗？

**优先做**：
- **通用能力**（组件扩展）
- **数据一致性**（check 脚本）
- **学生体验**（视觉 / 性能）

**不做**：
- **过度抽象**（21 个组件的共性抽取）
- **功能堆砌**（没验证需求的学生端）
- **样式炫技**（无教学价值的动画）

---

## 附录：lesson-01 ~ lesson-04 优化数据

| 讲次 | 页数 | extra 原 | extra 精简 | 主要改造 |
|---|---|---|---|---|
| lesson-01 | 30 | 28 | 7 | origin 重构、timeline 扩到 10 项 |
| lesson-02 | 33 | 25 | 6 | origin/pitfall/decision 全面启用 |
| lesson-03 | 31 | 28 | 3 | compare neutral、footer 试点 |
| lesson-04 | 30 | 27 | 3 | dialog → grid/decision/pitfall/split |

**共同成果**：
- 每讲 dialog ≤ 3 个
- 每讲 extra 覆盖率 10-25%
- 每讲 footer 平均 4-6 处
- 组件能力扩展 5 项

---

*文档版本：v1.0*
*适用：lesson-05 ~ lesson-57*
*维护：每完成 3-4 讲后更新*
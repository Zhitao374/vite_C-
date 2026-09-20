# RULES.md · 数据格式完整规范（字段级）

> 本文件用于统一项目中的课程内容数据结构，确保所有讲次、页码和 slide 版式都能被正确解析、渲染和校验。

---

## 1. 总则

本项目采用“数据驱动 + 组件渲染”的方式：

- `src/data/lesson-*.js` 负责定义课程内容
- `src/components/slides/` 负责渲染对应版式
- `src/views/SlideView.vue` 通过 `slide.type` 匹配对应组件

因此，所有 lesson 文件都必须遵循统一的数据结构。任何字段缺失、类型错误或命名不一致，都会导致页面无法正确渲染或渲染异常。

---

## 2. 课程文件整体结构

### 2.1 lesson 文件的导出格式

每个讲次文件都必须默认导出一个对象，格式如下：

```js
export default {
  title: '第 1 讲 初识 C++',
  subtitle: '第一个程序与 OJ 提交',
  total: 28,
  category: '语法与基础算法',
  slides: [
    {
      id: 1,
      type: 'cover',
      title: '初识 C++',
      subtitle: '第一个程序与 OJ 提交',
      chapterTag: false,
      data: {
        accentWord: 'C++',
        meta: ['青少年信息学竞赛 C++ 入门课程']
      }
    }
  ]
};
```

### 2.2 字段说明

#### `title`：string，必填
- 讲次名称
- 例如：`'第 1 讲 初识 C++'`
- 用于课程总目录和讲次页展示

#### `subtitle`：string，必填
- 讲次副标题
- 例如：`'第一个程序与 OJ 提交'`

#### `total`：number，必填
- 当前讲的总页数
- 必须与 `slides.length` 一致
- 例如：`total: 28` 且 `slides.length === 28`

#### `category`：string，必填
- 讲次所属分类
- 例如：`'语法与基础算法'`
- 需符合项目中现有分类规范，默认建议使用：
  - `语法与基础算法`
  - `数据结构与搜索`
  - `DP 与图论进阶`
  - `数学与字符串`
  - `竞赛冲刺`

#### `slides`：array，必填
- 存放当前讲的所有 slide 对象
- 数组元素顺序必须从第 1 页开始连续编号

---

## 3. Slide 对象字段级规范

每一页 slide 都必须遵循如下结构：

```js
{
  id: 1,
  type: 'cover',
  title: '封面标题',
  subtitle: '副标题',
  chapterTag: '第 1 讲 · 基础',
  data: {
    // 版式专属字段
  }
}
```

### 3.1 `id`：number，必填
- 页码编号，必须从 1 开始连续递增
- 不能重复
- 必须与 URL 中的 `slideId` 对应

示例：

```js
{ id: 10, type: 'code-split', ... }
```

### 3.2 `type`：string，必填
- slide 版式类型
- 用于映射到 `src/components/slides/index.js` 中注册的组件
- 当前项目允许的标准类型如下：

```text
cover
transition
ending
grid
split
big-number
compare
flow
timeline
dialog
code-split
quote
radial
level-map
```

#### 规范要求：
- 必须使用小写短横线命名
- `code-split`、`level-map` 等复合词必须使用中划线
- 不允许出现 `CodeSplit`、`GridSlide` 这类组件名写法

### 3.3 `title`：string，必填
- 页面的主标题
- 用于展示在 slide 顶部或主内容区
- 例如：`'什么是 C++？'`

### 3.4 `subtitle`：string，可选但推荐填写
- 页面的副标题或说明语句
- 若无副标题，可设为 `''` 或省略

### 3.5 `chapterTag`：string | boolean，可选
- 可用于页内显示章节标签
- 允许值包括：
  - `false`：不显示章节标签
  - `'第 1 讲 · 概念理解'`：显示文本章节标签

#### 规范：
- 若是章节页，可使用字符串形式
- 若不需要展示章节标签，可写 `false`
- 不要写成 `null` 或空字符串，除非是强制不展示

### 3.6 `data`：object，必填
- 版式专属参数容器
- 不同 `type` 的结构完全不同
- 必须保证 `data` 是一个对象，而不是数组、字符串或 `null`

---

## 4. 版式字段规范（按 type）

下面是按项目当前实际结构整理的字段级规范。

---

### 4.1 `cover`

用于封面页。

```js
{
  id: 1,
  type: 'cover',
  title: '初识 C++',
  subtitle: '第一个程序与 OJ 提交',
  chapterTag: false,
  data: {
    accentWord: 'C++',
    meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 1 讲']
  }
}
```

#### 字段要求：
- `data.accentWord`：string，必填
  - 需要重点强调的词，如 `C++`、`数组`、`循环`
- `data.meta`：string[]，可选
  - 用于展示主题信息、课程说明或标签列表

---

### 4.2 `transition`

用于过渡页。

```js
{
  id: 9,
  type: 'transition',
  title: '第二站 · 开始写代码',
  subtitle: '从 Hello World 到输入输出',
  data: {
    note: '接下来你将写出人生第一个 C++ 程序，并学会让程序与用户对话'
  }
}
```

#### 字段要求：
- `data.note`：string，必填
  - 用于说明本页后续内容方向

---

### 4.3 `ending`

用于结尾页。

```js
{
  id: 28,
  type: 'ending',
  title: '本讲回顾',
  subtitle: '你已经掌握了基础语法',
  data: {
    summary: ['变量', '输入输出', '分支结构'],
    next: '下一讲：循环与数组'
  }
}
```

#### 字段要求：
- `data.summary`：string[]，可选
  - 展示本讲重点内容
- `data.next`：string，可选
  - 展示下一步学习方向

---

### 4.4 `grid`

用于网格卡片页。

```js
{
  id: 2,
  type: 'grid',
  title: '为什么要学 C++？',
  subtitle: '竞赛官方语言，高手的第一选择',
  data: {
    cards: [
      { icon: '🏆', title: '竞赛官方语言', desc: 'CSP-J/S、NOIP、NOI 均支持' },
      { icon: '⚡', title: '运行速度快', desc: '适合大规模计算' }
    ],
    extra: {
      title: '💡 知识扩展 · C++ 为什么叫 C++',
      desc: '这里是说明文字 ...'
    }
  }
}
```

#### 字段要求：
- `data.cards`：array，必填
  - 每项为对象
- `card.icon`：string，可选
  - emoji 或图标符号
- `card.title`：string，必填
- `card.desc`：string，必填
- `card.number`：string，可选
  - 某些卡片用于编号展示

#### `extra`：object，可选
- `extra.title`：string，必填
- `extra.desc`：string，必填
- `extra.variant`：string，可选
  - 例如：`'card-primary'`

---

### 4.5 `split`

左右分栏结构。

```js
{
  id: 13,
  type: 'split',
  title: '变量与常量',
  subtitle: '理解程序中的存储单元',
  data: {
    left: {
      title: '变量',
      desc: '用于存储数据'
    },
    right: {
      title: '常量',
      desc: '不允许修改的值'
    },
    extra: {
      title: '拓展说明',
      desc: '...' 
    }
  }
}
```

#### 字段要求：
- `data.left`：object，必填
- `data.right`：object，必填
- `data.left.title` / `data.right.title`：string
- `data.left.desc` / `data.right.desc`：string
- `extra`：object，可选

---

### 4.6 `big-number`

用于大数字强调页。

```js
{
  id: 16,
  type: 'big-number',
  title: '高性能的关键',
  subtitle: '看一眼就能记住',
  data: {
    number: 'O(1)',
    label: '平均时间复杂度',
    desc: '哈希表查找几乎常数级'
  }
}
```

#### 字段要求：
- `data.number`：string，必填
- `data.label`：string，必填
- `data.desc`：string，可选

---

### 4.7 `compare`

用于“错误 / 正确”对照页。

```js
{
  id: 12,
  type: 'compare',
  title: '常见错误大盘点',
  subtitle: '4 个新手必踩的坑',
  data: {
    groups: [
      { wrong: 'cout << “Hello”；', right: 'cout << "Hello";' },
      { wrong: 'cin << a;', right: 'cin >> a;' }
    ],
    extra: {
      title: '💡 四大错误的原因',
      desc: '...'
    }
  }
}
```

#### 字段要求：
- `data.groups`：array，必填
- `groups[].wrong`：string，必填
- `groups[].right`：string，必填
- `extra`：object，可选

---

### 4.8 `flow`

用于流程图/步骤展示。

```js
{
  id: 11,
  type: 'flow',
  title: '编译运行演示',
  subtitle: '让代码变成程序',
  data: {
    nodes: [
      { icon: '📝', label: '新建 .cpp' },
      { icon: '⌨️', label: '输入代码' }
    ],
    extra: {
      title: '⌨️ 常用快捷键',
      desc: '...' 
    }
  }
}
```

#### 字段要求：
- `data.nodes`：array，必填
- `nodes[].icon`：string，可选
- `nodes[].label`：string，必填
- `nodes[].glow`：boolean，可选

---

### 4.9 `timeline`

用于时间线/学习路线页。

```js
{
  id: 4,
  type: 'timeline',
  title: '本讲学习地图',
  subtitle: '四站闯关，从零到提交',
  data: {
    items: [
      {
        icon: '🧠',
        badge: '基础',
        title: '第一站 · 概念理解',
        desc: '程序、C++、编译过程',
        points: ['程序 = 指令 + 数据', 'C++ 是编译型语言']
      }
    ],
    extra: {
      title: '🏆 积分规则',
      desc: '...'
    }
  }
}
```

#### 字段要求：
- `data.items`：array，必填
- `items[].icon`：string，可选
- `items[].badge`：string，可选
- `items[].title`：string，必填
- `items[].desc`：string，必填
- `items[].points`：string[]，可选

---

### 4.10 `dialog`

用于对话演示页。

```js
{
  id: 5,
  type: 'dialog',
  title: '什么是程序？',
  subtitle: '程序 = 指令 + 数据',
  chapterTag: '第 1 讲 · 概念理解',
  data: {
    lines: [
      { who: 'student', text: '小 C，我按了电源键...' },
      { who: 'robot', text: '这个问题问得好...' }
    ],
    extra: {
      title: '📖 知识扩展 · 冯·诺依曼结构',
      desc: '...',
      variant: 'card-primary'
    }
  }
}
```

#### 字段要求：
- `data.lines`：array，必填
- `lines[].who`：string，必填
  - 例如：`'student'`、`'robot'`
- `lines[].text`：string，必填
- `extra`：object，可选
- `extra.variant`：string，可选

---

### 4.11 `code-split`

用于代码 + 注释 + 输出展示。

```js
{
  id: 10,
  type: 'code-split',
  title: '第一个程序：Hello, World!',
  subtitle: '逐行拆解，理解每一行的使命',
  data: {
    code: '#include <iostream>\n...',
    annotations: [
      { line: 1, title: '#include', desc: '引入输入输出库' }
    ],
    output: 'Hello, World!',
    extra: {
      title: '💡 为什么 main 是入口',
      desc: '...'
    }
  }
}
```

#### 字段要求：
- `data.code`：string，必填
  - 代码内容，推荐保留换行符
- `data.annotations`：array，可选
  - 每项为 `{ line: number, title: string, desc: string }`
- `data.output`：string，可选
  - 终端输出内容
- `extra`：object，可选

---

### 4.12 `quote`

用于引用式展示。

```js
{
  id: 20,
  type: 'quote',
  title: '编程的本质',
  subtitle: '把问题翻译成机器能执行的步骤',
  data: {
    quote: '先学会做事，再学会让机器做事。',
    author: '课程讲师'
  }
}
```

#### 字段要求：
- `data.quote`：string，必填
- `data.author`：string，可选

---

### 4.13 `radial`

用于中心辐射结构。

```js
{
  id: 24,
  type: 'radial',
  title: '程序结构',
  data: {
    center: 'main',
    items: ['输入', '处理', '输出']
  }
}
```

#### 字段要求：
- `data.center`：string，必填
- `data.items`：string[]，必填

---

### 4.14 `level-map`

用于关卡地图/任务路线展示。

```js
{
  id: 25,
  type: 'level-map',
  title: '关卡地图',
  data: {
    levels: [
      { id: 1, label: '基础', status: 'done' },
      { id: 2, label: '进阶', status: 'active' }
    ]
  }
}
```

#### 字段要求：
- `data.levels`：array，必填
- `levels[].id`：number，必填
- `levels[].label`：string，必填
- `levels[].status`：string，可选
  - 常见值：`'done'`、`'active'`、`'locked'`

---

## 5. 通用通用字段规范

### 5.1 `extra` 结构

大量 slide 中都使用了统一的扩展块：

```js
extra: {
  title: '📖 知识扩展 · Hello World 的起源',
  desc: '这里是扩展说明文字 ...',
  variant: 'card-primary'
}
```

#### 规范：
- `extra.title`：string，必填
- `extra.desc`：string，必填
- `extra.variant`：string，可选
  - 建议仅使用项目已有的变体名，如：`card-primary`

### 5.2 允许的富文本内容

`title`、`desc` 等字段允许使用部分 HTML，以便展示链接、强调和代码标签：

- `<b>`：加粗
- `<i>`：斜体
- `<code>`：行内代码
- `<br>`：换行
- `<a>`：超链接
- `target="_blank"`
- `class="wiki-link"`

示例：

```js
desc: '1972 年，<a href="https://baike.baidu.com/item/Unix" target="_blank" class="wiki-link">Unix</a> ...'
```

#### 规范：
- 不要写全量 HTML 页面结构，只允许用于内容强调
- 允许超链接，但必须确保 URL 合法
- 代码禁止混入未闭合标签

### 5.3 语言规范

- 所有文本优先使用中文说明，必要时使用英文术语
- 竞赛术语需要统一：`AC`、`WA`、`TLE`、`CE`
- 代码字段应保持原样，不做额外转义

---

## 6. 数据校验规则

在新增 lesson 数据时，应遵循以下校验要求：

### 6.1 必填字段检查

- `lesson.title` 必填
- `lesson.subtitle` 必填
- `lesson.total` 必填
- `lesson.category` 必填
- `lesson.slides` 必填
- 每个 `slide.id` 必填
- 每个 `slide.type` 必填
- 每个 `slide.data` 必填

### 6.2 类型检查

- `total` 必须是 `number`
- `id` 必须是 `number`
- `type` 必须是 `string`
- `slides` 必须是 `array`
- `data` 必须是 `object`
- `card.title`、`card.desc` 等必须是 `string`
- `points` 与 `meta` 等必须是 `string[]`

### 6.3 逻辑检查

- `slides.length` 应等于 `lesson.total`
- `slide.id` 应从 `1` 开始连续递增
- `slide.id` 不能重复
- `slide.type` 必须在允许列表中
- `slide.data` 中的关键字段必须完整
- 若 `type` 为 `grid`，则 `data.cards` 必须存在
- 若 `type` 为 `dialog`，则 `data.lines` 必须存在
- 若 `type` 为 `code-split`，则 `data.code` 必须存在

---

## 7. 编写规范（推荐）

### 7.1 优先使用稳定结构

新增内容时，请优先遵循已有讲次的写法，而不是自行发明字段名。

示例：

```js
extra: {
  title: '📖 知识扩展 · 例子',
  desc: '说明内容'
}
```

不要写：

```js
expand: '...' 
addon: '...' 
```

### 7.2 尽量保持语义一致

如果页面是对比类，就用 `groups`；
如果页面是列表类，就用 `cards` 或 `items`；
如果页面是代码类，就用 `code` 和 `annotations`。

### 7.3 文字保持简洁、有层次

- 标题短而明确
- 副标题概括主线
- 扩展说明尽量 1–3 段，不要过长
- 代码和注释要对应清晰，便于讲解

### 7.4 不要用脆弱字段命名

例如不要出现：

- `contentText`
- `detailInfo`
- `someList`

这类命名比较模糊，后续维护成本高。

优先使用项目中已约定的字段：

- `title`
- `subtitle`
- `desc`
- `cards`
- `items`
- `nodes`
- `code`
- `output`
- `extra`

---

## 8. 最佳实践示例

```js
{
  id: 7,
  type: 'code-split',
  title: '第一个程序：Hello, World!',
  subtitle: '逐行拆解，理解每一行的使命',
  chapterTag: '第 1 讲 · 基础',
  data: {
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    annotations: [
      { line: 1, title: '#include', desc: '引入输入输出库' },
      { line: 4, title: 'int main()', desc: '程序入口' },
      { line: 5, title: 'cout <<', desc: '输出结果' }
    ],
    output: 'Hello, World!',
    extra: {
      title: '💡 说明',
      desc: '程序从 main 开始执行。'
    }
  }
}
```

这个结构符合项目的现有用法，稳定、可扩展、便于调试。

---

## 9. 一句话总结

本项目的数据规范核心原则是：

- 讲次文件统一导出对象
- slide 必须有稳定的 `id`、`type`、`title`、`data`
- `data` 的字段必须按版式类型固定，不得随意扩展
- 扩展说明统一放在 `extra` 中
- 所有新增内容都应保持字段语义一致、结构清晰、可校验

---

## 10. 维护建议

在新增或修改 lesson 数据时，请按顺序检查：

1. lesson 基本字段是否齐全
2. total 是否与 slides 数量一致
3. slide id 是否连续且唯一
4. type 是否属于合法版式
5. data 是否包含该版式必需字段
6. 文字内容是否符合项目风格
7. extra 是否使用统一结构

如果严格遵守本规范，后续新增课程、扩展内容和维护迭代会大大降低出错概率。

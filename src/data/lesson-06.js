export default {
  title: '第 6 讲 一维数组',
  subtitle: '一排储物柜，批量装数据',
  total: 29,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '一维数组', subtitle: '一排储物柜，批量装数据', chapterTag: false,
      data: { accentWord: '数组', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 6 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '循环结构，让程序学会重复',
      data: {
        items: [
          { icon: '🔁', badge: '基础', title: 'while 循环', desc: '条件为真就重复执行', points: ['循环三要素', '防止死循环'] },
          { icon: '🔂', badge: '核心', title: 'for 循环', desc: '三要素写在一行，计数首选', points: ['初始; 条件; 更新', '分号分隔'] },
          { icon: '🔄', badge: '嵌套', title: '循环嵌套', desc: '外层走一步，内层走一圈', points: ['总次数 = 外 × 内', '九九乘法表'] },
          { icon: '⚡', badge: '控制', title: 'break / continue', desc: '跳出整圈 vs 跳过本次', points: ['break 跳出', 'continue 跳过'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '循环能处理海量数据，但输入 100 个数，难道要定义 100 个变量吗？<br>显然不行。今天我们就学习能"一次存很多数据"的工具——数组。<br><br>🔮 <b>回收伏笔</b>：第 5 讲讲循环时说过"数据存哪"，今天揭晓。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握批量数据存储',
      data: {
        cards: [
          { number: '01', title: '理解数组', desc: '为什么需要数组、一排储物柜的比喻' },
          { number: '02', title: '定义与访问', desc: '定义语法、下标访问、初始化' },
          { number: '03', title: '数组与循环', desc: '遍历、求和、找最大值、逆序' },
          { number: '04', title: '常见错误', desc: '越界、初始化、数组大小' }
        ],
        extra: { title: '📖 知识扩展 · 数组的重要性', desc: '数组是第一个真正的"数据结构"。<br>没有数组，竞赛题几乎做不了。<br>后续要学的字符串、栈、队列、二叉树，底层都依赖数组。<br><b>数组是数据结构的地基。</b>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从一格到一排',
      data: {
        items: [
          { icon: '🧠', badge: '基础', title: '第一站 · 数组概念', desc: '为什么需要数组、一排储物柜', points: ['一次存多个数据', '同类型连续存储', '下标从 0 开始'] },
          { icon: '🔢', badge: '核心', title: '第二站 · 定义与访问', desc: '定义语法、下标访问、初始化', points: ['int a[100];', 'a[0] 到 a[99]', '数组宁开大一点'] },
          { icon: '🔄', badge: '关键', title: '第三站 · 数组与循环', desc: '遍历、求和、最大值、逆序', points: ['for 遍历数组', '边读边处理', '逆序输出技巧'] },
          { icon: '⚠️', badge: '易错', title: '第四站 · 常见错误', desc: '越界、未初始化、数组太小', points: ['下标 < 长度', 'sum = 0;', '按范围开大点'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"数组大师"徽章。' }
      }
    },

    /* ===== 05 为什么要数组 ===== */
    {
      id: 5, type: 'dialog', title: '为什么要数组？', subtitle: '一百个数据，一百个变量？', chapterTag: '第 6 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果我要存 100 个同学的成绩，难道要定义 100 个变量？' },
          { who: 'robot', text: '不用。用数组，一次就能定义 100 个格子。' },
          { who: 'student', text: '数组是什么？' },
          { who: 'robot', text: '数组就像一排储物柜。柜子有编号，你可以按编号存东西、取东西。' },
          { who: 'student', text: '那每个柜子可以存不同类型的东西吗？' },
          { who: 'robot', text: '不行，同一排柜子只能存同一种类型。<br>整型数组就存整数，不能混装小数。' },
          { who: 'student', text: '为什么？' },
          { who: 'robot', text: '因为每个柜子大小一样，计算机按固定大小找位置。<br><b>类型统一，查找才快</b>。这也是数组最大的特点。' }
        ],
        extra: {
          title: '📖 知识扩展 · 从"变量"到"数组"',
          desc: '变量是"一个盒子"，数组是"一排盒子"。<br>盒子多了，就能存更多数据。<br><br>数组的英文是 <b>array</b>，意思是"排列、阵列"。<br>它的核心思想是：<b>把相同类型的数据连续放在内存里，用下标快速访问</b>。<br><br>这个思想是后来<b>所有数据结构</b>的基础——栈、队列、树、图，底层都是数组。<br><br>🔮 <b>伏笔</b>：数组为什么访问快？因为它是连续内存。<br>如果不连续呢？第 27 讲"链表"会告诉你另一种可能。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 数组三大特点 ===== */
    {
      id: 6, type: 'grid', title: '一维数组的三大特点', subtitle: '同类型、连续存储、下标访问',
      data: {
        cards: [
          { icon: '🔢', title: '同类型', desc: '一排柜子只能放同一种数据<br>整型数组全是 int<br>字符数组全是 char<br><b>不能混装</b>' },
          { icon: '📏', title: '长度固定', desc: '定义时就要写死长度<br>运行中不能改<br>如 <code>int a[100];</code><br><b>长度就是 100 个格子</b>' },
          { icon: '📍', title: '下标访问', desc: '用 <code>a[i]</code> 取第 i 个元素<br>下标从 <b>0</b> 开始<br>长度 100 的数组<br>合法下标是 0 到 99' }
        ],
        extra: {
          title: '💡 为什么数组访问这么快？',
          desc: '因为数组在内存里是<b>连续存放</b>的。<br>想访问 <code>a[i]</code>，计算机直接算：<b>地址 = 起点 + i × 类型大小</b>，一步定位。<br><br>这种"按下标直接跳"的能力，叫 <b>随机访问</b>。<br>不管数组多大，访问任意元素都一样快。这是数组最大的优势。<br><br><b>对比</b>：<br>· 数组：a[500] 和 a[0] 一样快<br>· 链表：找第 500 个元素要一路数过去（第 27 讲讲）<br><br>这就是"连续内存"的威力。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 定义与访问 ===== */
    {
      id: 7, type: 'code-split', title: '一维数组 · 定义与访问', subtitle: '语法：类型 数组名[长度];',
      data: {
        intro: '📖 <b>定义</b>：<code>int a[5];</code> 表示"5 个整数的数组"。<br><b>访问</b>：用下标 <code>a[i]</code>，下标从 <b>0</b> 开始。',
        codeFile: 'codes/lesson-06/array-def.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int a[5];', desc: '定义长度 5 的整型数组，能存 5 个整数' },
          { line: 8, title: 'a[0] = 10;', desc: '下标从 0 开始！第一个元素是 a[0]' },
          { line: 18, title: 'int b[5] = {...}', desc: '定义时直接初始化，推荐写法' },
          { line: 19, title: 'b[0]', desc: '访问下标 0 的元素，值是 1' }
        ],
        output: '10\n50\n1',
        extra: {
          title: '💡 数组的三个关键点',
          desc: '① <b>长度固定</b>：定义时就要写死，运行中不能改。<br>② <b>下标从 0 开始</b>：<code>a[5]</code> 的合法下标是 0、1、2、3、4。<br>③ <b>越界危险</b>：访问 <code>a[5]</code> 或 <code>a[-1]</code> 是越界，可能崩溃或输出垃圾值。<br><br><b>为什么从 0 开始？</b><br>因为下标本质是"偏移量"。<code>a[0]</code> 表示从数组起点偏移 0 个位置，<code>a[1]</code> 偏移 1 个位置。<br>这是 C 语言的设计，C++ 沿用至今。<br><br>下一屏用内存图详细讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 内存布局 ===== */
    {
      id: 8, type: 'flow', title: '数组在内存中的样子', subtitle: '一排连续的格子',
      data: {
        nodes: [
          { icon: '📦', label: 'a[0]', sub: '地址 1000' },
          { icon: '📦', label: 'a[1]', sub: '地址 1004' },
          { icon: '📦', label: 'a[2]', sub: '地址 1008' },
          { icon: '📦', label: 'a[3]', sub: '地址 1012' },
          { icon: '📦', label: 'a[4]', sub: '地址 1016', glow: true }
        ],
        extra: {
          title: '💡 为什么 int 数组元素差 4 个地址？',
          desc: '每个 <code>int</code> 占 <b>4 个字节</b>。<br><code>a[0]</code> 占 1000—1003，<code>a[1]</code> 就从 1004 开始。<br>如果是 <code>double</code> 数组，每个元素占 8 字节，地址会差 8。<br><br><b>地址差值 = 元素类型的大小</b>。<br>这个规律是理解指针的关键（第 27 讲）。<br><br><b>为什么连续存储能"提速"？</b><br>因为计算机知道起点，也知道每个元素的大小。<br>想访问 a[i]，直接算：<code>起点 + i × 4</code>，一步到位。<br>不用像链表那样"一个个跳"。<br><br>🔮 <b>伏笔</b>：数组为什么要连续存放？如果不连续呢？第 27 讲"链表"会告诉你答案。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 为什么下标从 0 开始 ===== */
    {
      id: 9, type: 'dialog', title: '为什么下标从 0 开始？', subtitle: '这是最容易搞错的细节', chapterTag: '第 6 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，为什么数组下标要从 0 开始？从 1 开始不是更自然吗？' },
          { who: 'robot', text: '这是个好问题。你想想，如果 a 是数组起点，那"第 0 个元素"是什么意思？' },
          { who: 'student', text: '嗯……从起点开始偏移 0 个位置？' },
          { who: 'robot', text: '对！下标本质是"<b>偏移量</b>"。<br>a[0] 表示偏移 0 个位置，a[1] 偏移 1 个位置。' },
          { who: 'student', text: '所以 a[5] 是第 6 个元素？' },
          { who: 'robot', text: '对。长度 5 的数组，合法下标是 0 到 4，不是 1 到 5。<br>这是初学者最容易搞错的地方。' },
          { who: 'student', text: '怎么避免搞错？' },
          { who: 'robot', text: '一句话记牢：<b>下标 &lt; 长度</b>。<br>循环写 <code>i &lt; n</code>，而不是 <code>i &lt;= n</code>。' }
        ],
        extra: {
          title: '💡 下标是偏移量，不是序号',
          desc: '很多人以为 <code>a[1]</code> 是"第一个元素"，其实它是"从起点偏移 1 个位置的元素"。<br>所以 <b><code>a[0]</code> 才是第一个</b>。<br><br>这个设计来自 C 语言，本质是"指针运算"的语法糖。<br>写成 <code>a[i]</code> 相当于 <code>*(a + i)</code>——"从 a 出发，走 i 步，取那个位置的值"。<br><br><b>历史原因</b>：<br>1972 年，C 语言之父丹尼斯·里奇设计数组时，选择了"0 开始"——因为他要让 <code>a[i]</code> 直接对应"偏移 i 步"。<br>这个设计被 C++、Java、Python 全部沿用。<br><b>50 多年过去，还在用。</b><br><br><b>记忆</b>：下标 0 就是起点。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 从 0 开始的常见错误 ===== */
    {
      id: 10, type: 'compare', title: '下标从 0 开始', subtitle: '最容易搞错的细节',
      data: {
        groups: [
          { wrong: 'int a[5]; 认为下标是 1 到 5', right: 'int a[5]; 下标是 0 到 4' },
          { wrong: 'a[5] = 10; 越界！', right: 'a[4] = 10; 最后一个元素' },
          { wrong: 'for (i=1; i&lt;=5; i++)', right: 'for (i=0; i&lt;5; i++)' },
          { wrong: '访问 a[0] 时以为是"第零个"', right: 'a[0] 就是第一个，习惯它' }
        ],
        extra: {
          title: '💡 一句话记住',
          desc: '<b>下标 &lt; 长度</b>。<br>长度 5 的数组，循环写 <code>i &lt; 5</code> 或 <code>i &lt;= 4</code>。<br>写成 <code>i &lt;= 5</code> 就是越界。<br><br><b>记忆口诀</b>：宁可少一次，不要越一次。<br><br><b>为什么会搞错？</b><br>因为生活中我们习惯"从 1 开始"——<br>一栋楼有 5 层，1 楼到 5 楼。<br>但数组的"楼层号"是从 0 开始的：0 楼到 4 楼。<br><br>养成习惯的方法：<br>每次看到 <code>int a[N]</code>，心里默念"下标 0 到 N-1"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 过渡页 ===== */
    {
      id: 11, type: 'transition', title: '第二站 · 数组实战', subtitle: '用数组解决三大经典问题',
      data: { note: '接下来你将用数组和循环解决求和、找最大值、逆序输出三个经典问题' }
    },

    /* ===== 12 数组遍历 ===== */
    {
      id: 12, type: 'code-split', title: '数组与循环：黄金组合', subtitle: '用 for 遍历数组',
      data: {
        intro: '📖 <b>数组 + 循环 = 竞赛解题模板</b>。<br>用循环变量当数组下标，逐个读入、逐个处理。',
        codeFile: 'codes/lesson-06/array-traverse.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'for (i = 0; i &lt; 5; i++)', desc: '下标从 0 到 4，正好覆盖 5 个元素' },
          { line: 7, title: 'cin &gt;&gt; a[i]', desc: '用循环变量当数组下标，逐个读入' },
          { line: 10, title: 'cout &lt;&lt; a[i]', desc: '遍历输出所有元素' }
        ],
        output: '（输入 1 2 3 4 5）\n1 2 3 4 5',
        extra: {
          title: '💡 数组 + 循环 = 竞赛解题模板',
          desc: '<b>读入模板</b>：<br><code>for (int i = 0; i &lt; n; i++) cin &gt;&gt; a[i];</code><br><br><b>遍历模板</b>：<br><code>for (int i = 0; i &lt; n; i++) { /* 处理 a[i] */ }</code><br><br>几乎所有数组题都是这个套路。<br>把这两个模板记熟，一半的数组题就稳了。<br><br><b>注意</b>：循环条件写 <code>i &lt; n</code>，不是 <code>i &lt;= n</code>，否则越界。<br>这是新手最容易犯的错误。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 数组求和累加 ===== */
    {
      id: 13, type: 'evolution', title: '数组求和：累加器怎么变', subtitle: 'sum 一步步变大', chapterTag: '第 6 讲 · 过程演示',
      data: {
        intro: '📖 数组求和的核心是"<b>累加器</b>"——它像一个存钱罐，每次把新元素加进去。<br>看 sum 怎么从 0 一步步长大。',
        codeFile: 'codes/lesson-06/array-sum.cpp',
        snippet: 'main',
        steps: [
          {
            line: 6,
            expression: 'sum = 0',
            note: '循环开始前，累加器 <code>sum</code> 初始化为 0。<br>就像空的存钱罐，还没放钱。'
          },
          {
            line: 9,
            expression: 'sum = sum + a[0] = 0 + 1 = 1',
            note: '第 1 次循环（i=0）：<br>取出 <code>a[0] = 1</code>，加进 sum。<br>存钱罐里现在有 <b>1</b>。'
          },
          {
            line: 9,
            expression: 'sum = sum + a[1] = 1 + 2 = 3',
            note: '第 2 次循环（i=1）：<br>取出 <code>a[1] = 2</code>，加进 sum。<br>存钱罐里现在有 <b>3</b>。'
          },
          {
            line: 9,
            expression: 'sum = sum + a[2] = 3 + 3 = 6',
            note: '第 3 次循环（i=2）：<br>取出 <code>a[2] = 3</code>，加进 sum。<br>存钱罐里现在有 <b>6</b>。'
          },
          {
            line: 9,
            expression: 'sum = sum + a[3] = 6 + 4 = 10',
            note: '第 4 次循环（i=3）：<br>取出 <code>a[3] = 4</code>，加进 sum。<br>存钱罐里现在有 <b>10</b>。'
          },
          {
            line: 9,
            expression: 'sum = sum + a[4] = 10 + 5 = 15',
            note: '第 5 次循环（i=4）：<br>取出 <code>a[4] = 5</code>，加进 sum。<br>存钱罐里现在有 <b>15</b>。<br>循环结束。'
          },
          {
            line: 11,
            expression: 'sum = 15',
            note: '✅ 输出 <b>15</b>。<br><b>5 个元素，5 次累加</b>——这就是数组求和的全过程。<br><br>🔮 关键：<code>sum</code> 必须初始化为 <b>0</b>，否则第一次加法就错了。'
          }
        ],
        extra: {
          title: '💡 累加 vs 累乘',
          desc: '<b>累加</b>：<code>sum = 0;  sum += a[i];</code><br>初始值为 0（加法的"起点"）<br><br><b>累乘</b>：<code>fact = 1;  fact *= a[i];</code><br>初始值为 1（乘法的"起点"）<br><br><b>为什么初始值不同？</b><br>· 加 0 不影响结果 → 用 0 初始化<br>· 乘 1 不影响结果 → 用 1 初始化<br>· 如果累乘用 0 初始化 → 结果永远是 0<br><br>🔮 <b>伏笔</b>：这个"初始值"思想，在第 9 讲阶乘递归里会再次出现。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 数组实战答疑 ===== */
    {
      id: 14, type: 'dialog', title: '数组实战答疑', subtitle: '小C与同学聊遍历技巧', chapterTag: '第 6 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，遍历数组一定要用 for 吗？' },
          { who: 'robot', text: '大多数时候是。因为数组长度已知，for 最适合计数循环。' },
          { who: 'student', text: '那什么时候用 while？' },
          { who: 'robot', text: '比如"一直读直到输入 0"，长度未知，就用 while。' },
          { who: 'student', text: '读入的时候能不能直接处理，不存数组？' },
          { who: 'robot', text: '能！如果只用一次，比如求和、找最大值，可以边读边算。<br>这样处理 100 万个数也不占内存。' },
          { who: 'student', text: '那什么时候一定要用数组？' },
          { who: 'robot', text: '需要"<b>回头看</b>"的时候。<br>比如逆序输出、排序、找第 k 大——必须存下来才能处理。' }
        ],
        extra: {
          title: '💡 存不存数组？判断标准',
          desc: '<b>边读边处理</b>（不用数组）：<br>· 求和<br>· 找最大值 / 最小值<br>· 计数<br><br><b>必须用数组</b>：<br>· 逆序输出<br>· 排序<br>· 找第 k 大<br><br><b>口诀</b>：用到一次不用存，用到多次先存下。<br><br><b>竞赛经验</b>：<br>能用"边读边处理"就不用数组——省内存、代码短。<br>但有些题"必须回头"，那就老实用数组。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 练习1：求和 ===== */
    {
      id: 15, type: 'level-map', title: '课堂练习1：求和', subtitle: '用数组读入 n 个数，输出它们的和', chapterTag: '第 6 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '第一行输入整数 <code>n</code>，第二行输入 <code>n</code> 个整数，输出它们的和。<br>输入样例：<code>5</code> 然后 <code>1 2 3 4 5</code>　输出样例：<code>15</code>', timer: '⏱ 限时 6 分钟' },
        hints: [
          '定义数组 <code>int a[1005];</code>',
          '用 <code>for (int i = 0; i &lt; n; i++)</code> 读入',
          '用累加器 <code>sum</code> 求和，初始为 0'
        ],
        answer: { codeFile: 'codes/lesson-06/sum.cpp' },
        analysis: { title: '📖 解析', desc: '典型的"读入 + 遍历"模板。<br>数组长度开 1005，比题目最大范围多留几个空位。<br>循环条件写 <code>i &lt; n</code> 而不是 <code>i &lt;= n</code>，避免越界。' },
        extra: { title: '📖 知识扩展 · 高斯的算法 vs 计算机的循环', desc: '<a href="https://baike.baidu.com/item/高斯" target="_blank" class="wiki-link">高斯</a>用公式 <code>n(n+1)/2</code> 秒算 1 到 100。<br>计算机用循环逐个数加起来，也能得到同样结果。<br><br>公式更快，但循环更通用——任何数列求和，循环都能算。<br><b>这就是计算机的哲学</b>：不追求最聪明，只追求最通用。<br><br><b>数组的价值</b>：<br>如果数列不是等差数列（如 <code>3 7 2 9 5</code>），公式就不管用了。<br>数组 + 循环能处理任何数列。', variant: 'card-primary' }
      }
    },

    /* ===== 16 练习2：找最大值 ===== */
    {
      id: 16, type: 'level-map', title: '课堂练习2：找最大值', subtitle: '读入 n 个数，找出最大的那个', chapterTag: '第 6 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '第一行输入整数 <code>n</code>，第二行输入 <code>n</code> 个整数，输出其中的最大值。<br>输入样例：<code>5</code> 然后 <code>3 7 2 9 5</code>　输出样例：<code>9</code>', timer: '⏱ 限时 8 分钟' },
        hints: [
          '先把所有数读入数组',
          '用变量 <code>maxVal</code> 记录当前最大值',
          '初始值用 <code>a[0]</code>，从 <code>i = 1</code> 开始比较'
        ],
        answer: { codeFile: 'codes/lesson-06/max.cpp' },
        analysis: { title: '📖 解析', desc: '用数组的写法：<br>① 先读入所有数到 a[]<br>② maxVal 初始值为 a[0]<br>③ 从 a[1] 开始遍历，逐个比较<br><br><b>为什么 maxVal 初始为 a[0]？</b><br>因为 a[0] 是数组里的有效元素，一定 ≥ 自己，不会被"跳过"。<br><br><b>另一种写法</b>：初始为 <code>-1e9</code>（-10 亿），更通用，但要注意"极小数"的选择。' },
        extra: { title: '💡 这道题的两种写法', desc: '<b>写法 1：用数组（本讲练的）</b><br>先读完所有数到 a[]，再遍历找最大值。<br>优点：能看到"完整数据"；缺点：多用内存。<br><br><b>写法 2：不用数组（第 5 讲学的）</b><br>边读边比较，<code>cin &gt;&gt; x</code> 后立即和 maxVal 比。<br>优点：省内存、更快；缺点：数据存不下来。<br><br><b>什么时候用哪个？</b><br>· 只需要"最大值" → 不用数组<br>· 还要"逆序输出"或"找第二大" → 用数组<br><br><b>口诀</b>：用到一次不用存，用到多次先存下。<br><br><b>竞赛建议</b>：能不用数组就不用——省内存、代码短。<br>但本讲练数组，所以用数组写一遍，熟悉套路。', variant: 'card-primary' }
      }
    },

    /* ===== 17 练习3：逆序输出 ===== */
    {
      id: 17, type: 'level-map', title: '课堂练习3：逆序输出', subtitle: '把 n 个数倒着输出', chapterTag: '第 6 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入 <code>n</code> 个整数，按相反顺序输出。<br>输入样例：<code>5</code> 然后 <code>1 2 3 4 5</code>　输出样例：<code>5 4 3 2 1</code>', timer: '⏱ 限时 8 分钟' },
        hints: [
          '先全部读入数组',
          '再从 <code>i = n-1</code> 遍历到 <code>i = 0</code>',
          '循环条件 <code>i &gt;= 0</code>，不是 <code>i &gt; 0</code>'
        ],
        answer: { codeFile: 'codes/lesson-06/reverse.cpp' },
        analysis: { title: '📖 解析', desc: '关键在于<b>倒着遍历</b>。<br><code>for (int i = n-1; i &gt;= 0; i--)</code><br>从最后一个下标 <code>n-1</code> 一直递减到 0。<br><br>注意 <code>i &gt;= 0</code> 用 <code>&gt;=</code>，不是 <code>&gt;</code>，否则会漏掉 <code>a[0]</code>。' },
        extra: { title: '📖 知识扩展 · 洛谷 P1427 小鱼的数字游戏', desc: '这道题在洛谷的编号是 <a href="https://www.luogu.com.cn/problem/P1427" target="_blank" class="wiki-link">P1427</a>，是数组入门经典题。<br>题目说小鱼在玩数字游戏，你要帮它把数字倒过来读。<br>这道题的核心就是今天学的"逆序输出"。<br><br><b>建议</b>：课后作业就做这道题，巩固逆序技巧。<br><br><b>延伸思考</b>：如果不用数组，能直接逆序输出吗？<br>答：可以，但要用到"栈"或"递归"——第 9、25 讲讲。', variant: 'card-primary' }
      }
    },

    /* ===== 18 初赛渗透 ===== */
    {
      id: 18, type: 'dialog', title: '初赛小知识：数组内存', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 6 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考数组吗？' },
          { who: 'robot', text: '会。常考的是：数组占多少内存、下标范围、能不能越界。' },
          { who: 'student', text: '比如 int a[100] 占多少内存？' },
          { who: 'robot', text: 'int 占 4 字节，100 个就是 <b>400 字节</b>。<br>如果是 long long，每个占 8 字节，100 个就是 800 字节。' },
          { who: 'student', text: '二维数组呢？' },
          { who: 'robot', text: '<code>int a[10][10]</code> 是 100 个 int，占 400 字节。<br>算内存就把所有维度乘起来，再乘每个类型的字节数。' },
          { who: 'student', text: '还有什么考点？' },
          { who: 'robot', text: '常考数组下标范围。<br>长度 100 的数组，合法下标是 0 到 99。<br>考卷经常出"下面哪个访问是越界的"这种题。' }
        ],
        extra: {
          title: '📖 数组内存速算',
          desc: '<b>一维数组</b>：<code>int a[100];</code> → 100 × 4 = 400 字节<br><b>二维数组</b>：<code>int a[10][10];</code> → 10 × 10 × 4 = 400 字节<br><b>三维数组</b>：<code>int a[5][5][5];</code> → 5 × 5 × 5 × 4 = 500 字节<br><br><b>规律</b>：所有维度相乘，再乘每个元素的字节数。<br><br><b>常用类型字节数</b>（必背）：<br>· int = 4<br>· long long = 8<br>· double = 8<br>· char = 1<br>· bool = 1<br><br>这些数字是初赛必背。<br>考试时可能直接问"某个数组占多少字节"，也可能间接考。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 数组常见错误 ===== */
    {
      id: 19, type: 'compare', title: '数组常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '数组越界：a[5] 访问长度 5 的数组', right: '合法下标 0 到 4，循环用 i &lt; n' },
          { wrong: '数组太小：int a[100] 存 1000 个数', right: '按数据范围开大一点，如 a[1005]' },
          { wrong: '忘记初始化：int sum; 就用 sum +=', right: 'int sum = 0; 先初始化' },
          { wrong: '下标从 1 开始：for (i=1; i&lt;=n; i++)', right: '下标从 0 开始：for (i=0; i&lt;n; i++)' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>越界</b>：C++ 不检查下标，越界不报错但结果错。<br>② <b>数组太小</b>：数据范围看错，答案全错。<br>③ <b>未初始化</b>：垃圾值参与运算，结果不可预测。<br>④ <b>下标从 1 开始</b>：C++ 下标从 0 起，写成 1 到 n 会越界。<br><br><b>用"储物柜"理解越界</b>：<br>数组就像一排储物柜，编号从 0 到 N-1。<br>· 打开 0 号柜 → 第一个元素<br>· 打开 N-1 号柜 → 最后一个元素<br>· 打开 N 号柜 → <b>柜子不存在</b>，打开它可能拿到别人的东西（垃圾值）或撞坏柜子（崩溃）<br><br><b>口诀</b>：<b>数组开大点，循环写 n，累加先清零，下标从 0 起</b>。<br><br><b>竞赛经验</b>：<br>· 数组多开 5—10 个空位，几乎不占内存但能避免越界<br>· "下标从 1 开始"是新手高频错误——习惯 C++ 的 0 起点<br>· 一个"忘了初始化"的 bug 可能让你调试半天',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 计数数组 ===== */
    {
      id: 20, type: 'code-split', title: '数组的典型应用 · 计数数组', subtitle: '统计每个数出现的次数',
      data: {
        intro: '📖 <b>计数数组</b>是数组最常用的技巧之一。<br>让<b>下标 = 数值</b>，<b>元素 = 出现次数</b>。',
        codeFile: 'codes/lesson-06/count.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int cnt[105] = {0};', desc: '计数数组，全部初始化为 0' },
          { line: 11, title: 'cnt[x]++;', desc: '读入 x，计数数组对应位置加 1' },
          { line: 15, title: 'if (cnt[i] &gt; maxCnt)', desc: '遍历计数数组，找出现次数最多的' }
        ],
        output: '（输入 5 / 3 1 3 2 3）\n3 出现 3 次',
        extra: {
          title: '💡 计数数组：竞赛技巧',
          desc: '<b>计数数组</b>的核心思想是"用下标当数值"。<br><br><b>思路</b>：<br>· 开一个大数组 <code>cnt[N]</code><br>· 读到一个数 x，就执行 <code>cnt[x]++</code><br>· 最后 <code>cnt[k]</code> 表示"数值 k 出现了几次"<br><br><b>应用场景</b>：<br>· 统计频次<br>· 去重（<code>cnt[x] &gt; 0</code> 就是出现过）<br>· 桶排序的基础<br><br>竞赛里非常常见，一定要掌握。<br><br><b>注意</b>：数组大小要开得比"最大数值"更大。<br>比如数据范围是 0—100，就开 <code>cnt[105]</code>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 数组方法总结 ===== */
    {
      id: 21, type: 'dialog', title: '数组方法总结', subtitle: '小C带同学复盘', chapterTag: '第 6 讲 · 概念理解',
      data: {
        lines: [
          { who: 'robot', text: '同学，我们来回看一下今天学的数组。' },
          { who: 'student', text: '好！' },
          { who: 'robot', text: '数组定义用什么语法？' },
          { who: 'student', text: '<code>int a[100];</code>——类型 名字[长度];' },
          { who: 'robot', text: '下标从几开始？合法范围？' },
          { who: 'student', text: '从 0 开始，长度 100 的数组，合法下标是 0 到 99。' },
          { who: 'robot', text: '遍历数组用什么？' },
          { who: 'student', text: '<code>for (int i = 0; i &lt; n; i++)</code> 遍历。' },
          { who: 'robot', text: '数组最常见的错误？' },
          { who: 'student', text: '越界！所以数组宁可开大一点。' },
          { who: 'robot', text: '非常好。你已经掌握了数组的核心了。' }
        ],
        extra: {
          title: '💡 四个核心要点',
          desc: '① <b>定义</b>：<code>类型 名字[长度];</code><br>② <b>访问</b>：<code>a[i]</code>，下标从 0 开始<br>③ <b>遍历</b>：<code>for (i = 0; i &lt; n; i++)</code><br>④ <b>防越界</b>：数组宁开大一点<br><br>这四条是数组的地基。<br><br><b>从今天起，你写的代码会越来越像"真正的程序"</b>——<br>从"处理一个数"，到"处理一批数"，这是编程能力的跃迁。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 课堂小测 ===== */
    {
      id: 22, type: 'quiz', title: '课堂小测', subtitle: '数组定义、访问与内存',
      chapterTag: '第 6 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第四章',
            question: '定义 <code>int a[10];</code> 后，合法下标范围是？',
            options: [
              { label: 'A', text: '1 到 10' },
              { label: 'B', text: '0 到 10' },
              { label: 'C', text: '0 到 9', correct: true },
              { label: 'D', text: '1 到 9' }
            ],
            analysis: 'C++ 数组下标从 <b>0</b> 开始，长度 10 的数组，合法下标是 <b>0 到 9</b>。<br>口诀：<b>下标 &lt; 长度</b>。<br>访问 <code>a[10]</code> 是越界，可能崩溃或输出垃圾值。<br>这是本讲 slide-09、slide-10 的核心内容。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 数组',
            question: '在常见编译器中，<code>int a[100];</code> 占用多少字节内存？',
            options: [
              { label: 'A', text: '100 字节' },
              { label: 'B', text: '200 字节' },
              { label: 'C', text: '400 字节', correct: true },
              { label: 'D', text: '800 字节' }
            ],
            analysis: 'int 占 4 字节，数组有 100 个元素。<br>总内存 = 100 × 4 = <b>400 字节</b>。<br><br><b>规律</b>：数组内存 = 元素个数 × 每个元素的字节数。<br>int = 4、long long = 8、double = 8、char = 1。<br>这是本讲 slide-18"初赛渗透：数组内存"的核心知识点。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: '2020 CSP-J 初赛模拟题 · 数组',
            question: '下面代码的输出是什么？',
            questionCode: `int a[5] = {10, 20, 30, 40, 50};
cout << a[2] + a[4] << endl;`,
            options: [
              { label: 'A', text: '50' },
              { label: 'B', text: '70' },
              { label: 'C', text: '80', correct: true },
              { label: 'D', text: '编译错误' }
            ],
            analysis: '<code>a[2]</code> 是第三个元素 30，<code>a[4]</code> 是第五个元素 50。<br>30 + 50 = <b>80</b>。<br><br><b>关键</b>：<code>a[0]</code> 是第一个元素，不要数错。<br>a[0]=10，a[1]=20，a[2]=30，a[3]=40，a[4]=50。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第四章',
            question: '在 C++ 中，访问数组越界元素时，程序一定会报错。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: 'C++ <b>不做下标检查</b>，越界访问不会报错。<br><br>可能的结果：<br>· 读到垃圾值（不崩溃但结果错）<br>· 修改了其他变量的值<br>· 程序崩溃（Segmentation Fault）<br><br>所以越界问题很隐蔽，要主动避免。<br>这是 C++ 追求速度的代价。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 数组',
            question: '数组的长度在定义时可以不确定，运行时再决定。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: 'C 风格数组的长度在<b>定义时必须确定</b>，不能运行时改变。<br><br>例如 <code>int a[n];</code> 这种写法在标准 C++ 中<b>不允许</b>（n 是变量）。<br>要动态长度，用 <code>vector</code>（C++ STL 容器）。<br><br>竞赛中，通常按题目最大数据范围定义一个够大的数组。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 数组 vs vector',
          desc: 'C++ 有两种"数组"：<br><br>① <b>C 风格数组</b>：<code>int a[100];</code> 长度固定，速度快。<br>② <b>vector</b>：<code>vector&lt;int&gt; a;</code> 长度可变，更安全。<br><br>竞赛中主要用 C 风格数组，因为速度更快、兼容性更好。<br>vector 适合长度不确定的场景。<br><br>详细的 vector 用法在"STL"讲次介绍。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 今日总结 ===== */
    {
      id: 23, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '一个变量存一个数，一个数组存一排数。',
        author: '—— 数组第一课',
        points: [
          '数组是一排连续存储的同类型数据',
          '定义：类型 数组名[长度];',
          '下标从 0 开始，合法范围 0 到 长度-1',
          '数组 + 循环 = 竞赛解题黄金组合',
          '遍历模板：for (int i = 0; i < n; i++)',
          '越界不报错，数组宁开大一点'
        ],
        highlight: { title: '📌 关键口诀', desc: '数组一排柜，类型要统一；下标从 0 起，长度别忘记；循环遍历它，求和找最大；防越界开大点，累加先清零。' },
        extra: {
          title: '💡 数组是数据结构的地基',
          desc: '数组是第一个真正的数据结构。<br>后面要学的字符串、栈、队列、树、图，底层都依赖数组。<br>把数组学好，后面一马平川。<br><br>🔮 <b>伏笔</b>：<br>· 数组为什么访问快？因为它连续存放。<br>· 那如果不连续呢？第 27 讲"链表"会告诉你另一种可能。<br>· 数组是连续内存，那计算机怎么区分"数组"和"字符串"？第 7 讲揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 课后作业 ===== */
    {
      id: 24, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P1046', link: 'https://www.luogu.com.cn/problem/P1046', desc: '<b>陶陶摘苹果</b><br>考察：数组读入、遍历<br>难度：★<br>目标：读入 10 个高度，统计能摘到的苹果数' },
          { icon: '🟢', title: '基础 2 · P1427', link: 'https://www.luogu.com.cn/problem/P1427', desc: '<b>小鱼的数字游戏</b><br>考察：逆序输出<br>难度：★<br>目标：倒着输出一串数字' },
          { icon: '🔴', title: '挑战 · P2911', link: 'https://www.luogu.com.cn/problem/P2911', desc: '<b>牛式</b><br>考察：一维数组 + 三重循环<br>难度：★★★<br>目标：统计三个骰子点数之和的频次' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 下节预告 ===== */
    {
      id: 25, type: 'radial', title: '下节预告', subtitle: '第 7 讲 · 字符串基础',
      data: {
        center: '字符串',
        items: [
          { text: 'char vs string' },
          { text: '读入与遍历' },
          { text: '统计与回文' },
          { text: '常见函数' }
        ],
        extra: {
          title: '💡 文字的存储',
          desc: '数组能存整数，那文字呢？<br>"Hello" 这 5 个字母，怎么存？<br>下一讲，我们学习能存一串文字的"字符串"。<br>字符串是数组思想的延伸，也是竞赛中处理文本问题的核心。<br><br>🔮 <b>远期彩蛋</b>：为什么 \'A\' 是 65、\'a\' 是 97？<br>这张"字符身份证"就是 ASCII 表——第 22 讲专门讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 答疑时间 ===== */
    {
      id: 26, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 6 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '数组长度可以运行时确定吗？' },
          { who: 'robot', text: 'C 风格数组不行，长度必须是编译期常量。<br>如果长度要动态确定，后面会学 vector。' },
          { who: 'student', text: '为什么数组从 0 开始编号？' },
          { who: 'robot', text: '因为下标本质是"偏移量"。a[0] 偏移 0，a[1] 偏移 1。<br>习惯就好，竞赛里所有数组都从 0 开始。' },
          { who: 'student', text: '数组开多大合适？' },
          { who: 'robot', text: '看题目数据范围，在此基础上多开 5 到 10 个空位。<br>宁可浪费几字节，也别越界。' },
          { who: 'student', text: '什么时候用数组？' },
          { who: 'robot', text: '需要"回头看"的时候。<br>逆序、排序、找第 k 大，都要先存下来。' },
          { who: 'student', text: '数组内存不够怎么办？' },
          { who: 'robot', text: '一般不会有问题——竞赛题会控制数据范围。<br>如果真遇到"必须开很大数组"的题，考虑优化（后续讲）。<br>初学阶段，数组够用就行。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '数组是编程的基本功。<br>初学者至少要写 <b>30 道数组题</b>才能熟练。<br><br>从"读入 - 遍历 - 处理 - 输出"这个模板开始，反复练。<br>练到"看到题就知道怎么写循环"，数组就过关了。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 本讲英文单词 ===== */
    {
      id: 27, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 6 讲 · 复习',
      data: {
        words: [
          { word: 'array',  cn: '数组',   pron: '/əˈreɪ/',      origin: '英文原意"排列、阵列"',   category: '概念' },
          { word: 'index',  cn: '下标',   pron: '/ˈɪndeks/',    origin: '英文原意"索引、指针"',   category: '概念' },
          { word: 'element', cn: '元素',  pron: '/ˈelɪmənt/',   origin: '英文原意"元素、成分"',   category: '概念' },
          { word: 'length', cn: '长度',   pron: '/leŋθ/',       origin: '英文原意"长度"',         category: '概念' },
          { word: 'count',  cn: '计数',   pron: '/kaʊnt/',      origin: '英文原意"计数"',         category: '函数' },
          { word: 'size',   cn: '大小',   pron: '/saɪz/',       origin: '英文原意"大小、尺寸"',   category: '概念' }
        ],
        extra: {
          title: '💡 记忆法 · 数组相关词汇',
          desc: '<b>核心概念</b>：<br><code>array</code> = 数组（排列）<br><code>index</code> = 下标（索引）<br><code>element</code> = 元素（成分）<br><code>length</code> = 长度<br><code>size</code> = 大小、尺寸<br><br><b>容易混淆</b>：<br>· <code>length</code> 和 <code>size</code> 都表示"长度"<br>· 但 C++ 里 <code>string</code> 用 <code>.size()</code>，<code>vector</code> 也用 <code>.size()</code><br>· <code>strlen()</code> 用于字符数组<br><br><b>易错拼写</b>：<br>· <code>array</code> 两个 r<br>· <code>index</code> 复数形式是 <code>indexes</code> 或 <code>indices</code><br>· <code>length</code> 不是 <code>lenght</code><br><br><b>发音</b>：<code>array</code> 读 "a-ray"，重音在第二音节。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 知识清单 ===== */
    {
      id: 28, type: 'grid', title: '第 6 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 6 讲 · 复习',
      data: {
        cards: [
          { icon: '📦', title: '一维数组', desc: '<b>定义</b>：int a[100];<br><b>下标</b>：0 到 99<br><b>访问</b>：a[i]<br><b>初始化</b>：int a[5] = {1,2,3,4,5};' },
          { icon: '🔄', title: '数组与循环', desc: '<b>读入</b>：for (i=0; i&lt;n; i++) cin &gt;&gt; a[i];<br><b>遍历</b>：for (i=0; i&lt;n; i++) {...}<br><b>求和</b>：sum += a[i];<br><b>逆序</b>：for (i=n-1; i&gt;=0; i--)' },
          { icon: '📏', title: '数组内存', desc: '<b>元素大小</b>：int 4 / double 8 / char 1<br><b>总内存</b>：个数 × 元素大小<br><b>例</b>：int a[100]; 占 400 字节' },
          { icon: '⚠️', title: '常见错误', desc: '<b>越界</b>：下标 ≥ 长度<br><b>数组太小</b>：按数据范围开大<br><b>未初始化</b>：sum = 0;<br><b>二维语法</b>：a[i][j] 不是 a[i,j]' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<b>口诀</b>：数组一排柜，类型要统一；下标从 0 起，长度别忘记；循环遍历它，求和找最大；防越界开大点，累加先清零。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P1046 陶陶摘苹果<br><b>⭐⭐ 进阶</b>：P1427 小鱼的数字游戏<br><b>⭐⭐⭐ 挑战</b>：P5728 旗鼓相当的对手<br><b>🔗 延伸</b>：洛谷搜索"入门 4"，挑 3 道数组题练手。<br><br><b>小 C 彩蛋</b>：数组是计算机最基础的数据结构。<br>你手机里的联系人列表、微信聊天记录、游戏背包，底层都是数组。<br>学会数组，你就理解了计算机"批量处理数据"的核心秘密。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 29 结束页 ===== */
    {
      id: 29, type: 'ending', title: '第六讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你已经掌握了批量数据的工具',
          desc: '数组是数据结构的地基。<br>从下一讲开始，我们用它来处理文字——字符串。<br><br>数组 + 字符串 + 循环 + 分支，你就能解决绝大多数基础题了。<br>编程的世界，正在向你展开。',
          variant: 'card-glow'
        }
      }
    }

  ]
};
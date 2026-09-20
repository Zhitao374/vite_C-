export default {
  title: '第 5 讲 一维数组',
  subtitle: '一排储物柜，批量装数据',
  total: 29,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '一维数组', subtitle: '一排储物柜，批量装数据', chapterTag: false,
      data: { accentWord: '数组', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 5 讲'] }
    },

    /* ===== 02 上节回顾（回收"数组"伏笔） ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '循环结构，让程序学会重复',
      data: {
        items: [
          { icon: '🔁', badge: '基础', title: 'while 循环', desc: '条件为真就重复执行', points: ['循环三要素', '防止死循环'] },
          { icon: '🔂', badge: '核心', title: 'for 循环', desc: '三要素写在一行，计数首选', points: ['初始; 条件; 更新', '分号分隔'] },
          { icon: '🔄', badge: '嵌套', title: '循环嵌套', desc: '外层走一步，内层走一圈', points: ['总次数 = 外 × 内', '九九乘法表'] },
          { icon: '⚡', badge: '控制', title: 'break / continue', desc: '跳出整圈 vs 跳过本次', points: ['break 跳出', 'continue 跳过'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '循环能处理海量数据，但输入 100 个数，难道要定义 100 个变量吗？<br>显然不行。今天我们就学习能"一次存很多数据"的工具——数组。<br><br>🔮 <b>回收伏笔</b>：第 4 讲讲循环时说过"数据存哪"，今天揭晓。' }
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
          { icon: '🧠', badge: '基础', title: '第一站 · 数组概念', desc: '为什么需要数组、一排储物柜的比喻', points: ['一次存多个数据', '同类型连续存储', '下标从 0 开始'] },
          { icon: '🔢', badge: '核心', title: '第二站 · 定义与访问', desc: '定义语法、下标访问、初始化', points: ['int a[100];', 'a[0] 到 a[99]', '数组宁开大一点'] },
          { icon: '🔄', badge: '关键', title: '第三站 · 数组与循环', desc: '遍历、求和、最大值、逆序', points: ['for 遍历数组', '边读边处理', '逆序输出技巧'] },
          { icon: '⚠️', badge: '易错', title: '第四站 · 常见错误', desc: '越界、未初始化、数组太小', points: ['下标 < 长度', 'sum = 0;', '按范围开大点'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"数组大师"徽章。' }
      }
    },

    /* ===== 05 为什么要数组（dialog） ===== */
    {
      id: 5, type: 'dialog', title: '为什么要数组？', subtitle: '一百个数据，一百个变量？', chapterTag: '第 5 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果我要存 100 个同学的成绩，难道要定义 100 个变量？' },
          { who: 'robot', text: '不用。用数组，一次就能定义 100 个格子。' },
          { who: 'student', text: '数组是什么？' },
          { who: 'robot', text: '数组就像一排储物柜。柜子有编号，你可以按编号存东西、取东西。' },
          { who: 'student', text: '那每个柜子可以存不同类型的东西吗？' },
          { who: 'robot', text: '不行，同一排柜子只能存同一种类型。整型数组就存整数，不能混装小数。' },
          { who: 'student', text: '为什么？' },
          { who: 'robot', text: '因为每个柜子大小一样，计算机按固定大小找位置。<br>类型统一，查找才快。这也是数组最大的特点。' }
        ],
        extra: {
          title: '📖 知识扩展 · 从"变量"到"数组"',
          desc: '变量是"一个盒子"，数组是"一排盒子"。<br>盒子多了，就能存更多数据。<br>数组的英文是 <b>array</b>，意思是"排列、阵列"。<br>它的核心思想是：<b>把相同类型的数据连续放在内存里，用下标快速访问</b>。<br>这个思想是后来所有数据结构的基础。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 一维数组特性总览 ===== */
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
          desc: '因为数组在内存里是<b>连续存放</b>的。<br>想访问 a[i]，计算机直接算：<b>地址 = 起点 + i × 类型大小</b>，一步定位。<br>这种"按下标直接跳"的能力，叫<b>随机访问</b>。<br>不管数组多大，访问任意元素都一样快。这是数组最大的优势。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 一维数组定义与访问（code-split） ===== */
    {
      id: 7, type: 'code-split', title: '一维数组 · 定义与访问', subtitle: '语法：类型 数组名[长度];',
      data: {
        codeFile: 'codes/lesson-05/array-def.cpp',
        snippet: 'main',
        annotations: [
          { line: 7,  title: 'int a[5];', desc: '定义长度 5 的整型数组，能存 5 个整数' },
          { line: 10, title: 'a[0] = 10;', desc: '下标从 0 开始！第一个元素是 a[0]' },
          { line: 17, title: 'int b[5] = {...}', desc: '定义时直接初始化，推荐写法' },
          { line: 20, title: 'a[0]', desc: '访问下标 0 的元素，值是 10' }
        ],
        output: '10\n3',
        extra: {
          title: '💡 数组的三个关键点',
          desc: '① <b>长度固定</b>：定义时就要写死，运行中不能改。<br>② <b>下标从 0 开始</b>：a[5] 的合法下标是 0、1、2、3、4。<br>③ <b>越界危险</b>：访问 a[5] 或 a[-1] 是越界，可能崩溃或输出垃圾值。<br><b>为什么从 0 开始？</b> 因为下标本质是"偏移量"。a[0] 表示从数组起点偏移 0 个位置，a[1] 偏移 1 个位置。<br>这是 C 语言的设计，C++ 沿用至今。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 内存布局 flow ===== */
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
          desc: '每个 <code>int</code> 占 4 个字节。<br>a[0] 占 1000—1003，a[1] 就从 1004 开始。<br>如果是 <code>double</code> 数组，每个元素占 8 字节，地址会差 8。<br><b>地址差值 = 元素类型的大小</b>。<br>这个规律是理解指针的关键（第 16 讲）。<br><br>🔮 <b>伏笔</b>：数组为什么要连续存放？如果不连续呢？第 27 讲"链表"会告诉你答案。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 下标从 0 开始（dialog） ===== */
    {
      id: 9, type: 'dialog', title: '为什么下标从 0 开始？', subtitle: '这是最容易搞错的细节', chapterTag: '第 5 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，为什么数组下标要从 0 开始？从 1 开始不是更自然吗？' },
          { who: 'robot', text: '这是个好问题。你想想，如果 a 是数组起点，那"第 0 个元素"是什么意思？' },
          { who: 'student', text: '嗯……从起点开始偏移 0 个位置？' },
          { who: 'robot', text: '对！下标本质是"<b>偏移量</b>"。<br>a[0] 表示偏移 0 个位置，a[1] 偏移 1 个位置。' },
          { who: 'student', text: '所以 a[5] 是第 6 个元素？' },
          { who: 'robot', text: '对。长度 5 的数组，合法下标是 0 到 4，不是 1 到 5。<br>这是初学者最容易搞错的地方。' },
          { who: 'student', text: '怎么避免搞错？' },
          { who: 'robot', text: '一句话记牢：<b>下标 < 长度</b>。<br>循环写 <code>i &lt; n</code>，而不是 <code>i &lt;= n</code>。' }
        ],
        extra: {
          title: '💡 下标是偏移量，不是序号',
          desc: '很多人以为 a[1] 是"第一个元素"，其实它是"从起点偏移 1 个位置的元素"。<br>所以 <b>a[0] 才是第一个</b>。<br>这个设计来自 C 语言，本质是"指针运算"的语法糖。<br>写成 <code>a[i]</code> 相当于 <code>*(a + i)</code>——"从 a 出发，走 i 步，取那个位置的值"。<br><b>记住：下标 0 就是起点</b>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 compare：从 0 开始 vs 从 1 开始 ===== */
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
          desc: '<b>下标 < 长度</b>。<br>长度 5 的数组，循环写 <code>i &lt; 5</code> 或 <code>i &lt;= 4</code>。<br>写成 <code>i &lt;= 5</code> 就是越界。<br><b>记忆口诀</b>：宁可少一次，不要越一次。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 数组越界（dialog） ===== */
    {
      id: 11, type: 'dialog', title: '数组越界：看不见的炸弹', subtitle: '越界可能崩溃，也可能静悄悄出错', chapterTag: '第 5 讲 · 易错点',
      data: {
        lines: [
          { who: 'student', text: '小 C，访问 a[5] 会怎样？明明只定义了 5 个格子。' },
          { who: 'robot', text: '这是越界。C++ 不会报错，但程序可能崩溃，也可能读到别处的垃圾值。' },
          { who: 'student', text: '为什么不报错？' },
          { who: 'robot', text: '因为 C++ 追求速度，不做下标检查。检查是要花时间的，程序员要自己保证正确。' },
          { who: 'student', text: '那不是很危险？' },
          { who: 'robot', text: '对。竞赛中，越界是 WA 和 RE 的高频原因。<br>所以数组定义时，宁可开大一点，也不要刚好。' },
          { who: 'student', text: '开多大比较安全？' },
          { who: 'robot', text: '例如题目说 n ≤ 1000，就开 1005 或 1010。<br>多留几个空位，防止循环边界写错。' }
        ],
        extra: {
          title: '📖 竞赛中的数组大小',
          desc: '常见数据范围与建议数组大小：<br>n ≤ 100 → 开 105<br>n ≤ 1000 → 开 1005<br>n ≤ 10⁵ → 开 100005<br>n ≤ 10⁶ → 开 1000005<br><b>原则</b>：在数据范围基础上多开 5—10 个空位。<br>为什么多开？因为题目可能有隐藏边界。<br>多开几个格子，几乎不占内存，但能避免悲剧。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 过渡页 ===== */
    {
      id: 12, type: 'transition', title: '第二站 · 数组实战', subtitle: '用数组解决三大经典问题',
      data: { note: '接下来你将用数组和循环解决求和、找最大值、逆序输出三个经典问题' }
    },

    /* ===== 13 数组遍历（code-split） ===== */
    {
      id: 13, type: 'code-split', title: '数组与循环：黄金组合', subtitle: '用 for 遍历数组',
      data: {
        codeFile: 'codes/lesson-05/array-traverse.cpp',
        snippet: 'main',
        annotations: [
          { line: 8, title: 'i = 0; i &lt; 5', desc: '下标从 0 到 4，正好覆盖 5 个元素' },
          { line: 9, title: 'cin &gt;&gt; a[i]', desc: '用循环变量当数组下标，逐个读入' },
          { line: 14, title: 'cout &lt;&lt; a[i]', desc: '遍历输出所有元素' }
        ],
        output: '1 2 3 4 5',
        extra: {
          title: '💡 数组 + 循环 = 竞赛解题模板',
          desc: '<b>读入模板</b>：<br><code>for (int i = 0; i &lt; n; i++) cin &gt;&gt; a[i];</code><br><b>遍历模板</b>：<br><code>for (int i = 0; i &lt; n; i++) { /* 处理 a[i] */ }</code><br>几乎所有数组题都是这个套路。<br>把这两个模板记熟，一半的数组题就稳了。<br><b>注意</b>：循环条件写 <code>i &lt; n</code>，不是 <code>i &lt;= n</code>，否则越界。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 数组实战答疑（dialog） ===== */
    {
      id: 14, type: 'dialog', title: '数组实战答疑', subtitle: '小C与同学聊遍历技巧', chapterTag: '第 5 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，遍历数组一定要用 for 吗？' },
          { who: 'robot', text: '大多数时候是。因为数组长度已知，for 最适合计数循环。' },
          { who: 'student', text: '那什么时候用 while？' },
          { who: 'robot', text: '比如"一直读直到输入 0"，长度未知，就用 while。' },
          { who: 'student', text: '读入的时候能不能直接处理，不存数组？' },
          { who: 'robot', text: '能！如果只用一次，比如求和、找最大值，可以边读边算。<br>这样处理 100 万个数也不占内存。' },
          { who: 'student', text: '那什么时候一定要用数组？' },
          { who: 'robot', text: '需要"回头看"的时候。比如逆序输出、排序、找第 k 大——必须存下来才能处理。' }
        ],
        extra: {
          title: '💡 存不存数组？判断标准',
          desc: '<b>边读边处理</b>（不用数组）：<br>· 求和<br>· 找最大值 / 最小值<br>· 计数<br><b>必须用数组</b>：<br>· 逆序输出<br>· 排序<br>· 找第 k 大<br><b>口诀</b>：用到一次不用存，用到多次先存下。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 数组求和（code-split） ===== */
    {
      id: 15, type: 'code-split', title: '实战：数组求和', subtitle: '累加器 + 遍历模板',
      data: {
        codeFile: 'codes/lesson-05/array-sum.cpp',
        snippet: 'main',
        annotations: [
          { line: 8, title: 'int a[1005]', desc: '多开几个位置，防止越界' },
          { line: 9, title: '读入循环', desc: 'i 从 0 到 n-1，逐个读入' },
          { line: 12, title: 'sum = 0', desc: '累加器初始化为 0' },
          { line: 14, title: 'sum += a[i]', desc: '把每个元素加到 sum 里' }
        ],
        output: '输入：5\n1 2 3 4 5\n输出：15',
        extra: {
          title: '💡 为什么 sum 要初始化为 0？',
          desc: '因为 sum 是累加器，初始值必须是"加法单位元"0。<br>就像空钱包，第一次放钱就是第一笔存款。<br>如果不初始化，sum 里是垃圾值，结果就错了。<br><b>对比</b>：累乘的初始值是 1，因为 1 是乘法单位元。<br>这是第 4 讲阶乘练习里讲过的知识点。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 练习1：求和（level-map） ===== */
    {
      id: 16, type: 'level-map', title: '课堂练习1：求和', subtitle: '用数组读入 n 个数，输出它们的和', chapterTag: '第 5 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '第一行输入整数 <code>n</code>，第二行输入 <code>n</code> 个整数，输出它们的和。<br>输入样例：<code>5</code> 然后 <code>1 2 3 4 5</code>　输出样例：<code>15</code>', timer: '⏱ 限时 6 分钟' },
        hints: ['定义数组 <code>int a[1005];</code>', '用 <code>for (int i = 0; i &lt; n; i++)</code> 读入', '用累加器 <code>sum</code> 求和，初始为 0'],
        answer: { codeFile: 'codes/lesson-05/sum.cpp' },
        analysis: { title: '📖 解析', desc: '典型的"读入 + 遍历"模板。<br>数组长度开 1005，比题目最大范围多留几个空位。<br>循环条件写 <code>i &lt; n</code> 而不是 <code>i &lt;= n</code>，避免越界。' },
        extra: { title: '📖 知识扩展 · 高斯的算法 vs 计算机的循环', desc: '<a href="https://baike.baidu.com/item/高斯" target="_blank" class="wiki-link">高斯</a>用公式 <code>n(n+1)/2</code> 秒算 1 到 100。<br>计算机用循环逐个数加起来，也能得到同样结果。<br>公式更快，但循环更通用——任何数列求和，循环都能算。<br><b>这就是计算机的哲学</b>：不追求最聪明，只追求最通用。', variant: 'card-primary' }
      }
    },

    /* ===== 17 练习2：找最大值 ===== */
    {
      id: 17, type: 'level-map', title: '课堂练习2：找最大值', subtitle: '读入 n 个数，找出最大的那个', chapterTag: '第 5 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '第一行输入整数 <code>n</code>，第二行输入 <code>n</code> 个整数，输出其中的最大值。<br>输入样例：<code>5</code> 然后 <code>3 7 2 9 5</code>　输出样例：<code>9</code>', timer: '⏱ 限时 8 分钟' },
        hints: ['定义 <code>maxVal</code> 记录当前最大值', '初始值设为 <code>-1e9</code>', '每次读入新数后与 maxVal 比较'],
        answer: { codeFile: 'codes/lesson-05/max.cpp' },
        analysis: { title: '📖 解析', desc: 'maxVal 初始值必须是"极小值"，才能保证第一个数一定更大。<br>常见坑：初始化为 0，遇到全负数输入就错了。' },
        extra: { title: '💡 更省内存的写法', desc: '其实可以不存数组，边读边比较：<br><code>for (int i = 0; i &lt; n; i++) { int x; cin &gt;&gt; x; if (x &gt; maxVal) maxVal = x; }</code><br>这样处理 100 万个数也不占内存。<br><b>竞赛经验</b>：只用到一次的数据，不必存数组。', variant: 'card-primary' }
      }
    },

    /* ===== 18 练习3：逆序输出 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习3：逆序输出', subtitle: '把 n 个数倒着输出', chapterTag: '第 5 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入 <code>n</code> 个整数，按相反顺序输出。<br>输入样例：<code>5</code> 然后 <code>1 2 3 4 5</code>　输出样例：<code>5 4 3 2 1</code>', timer: '⏱ 限时 8 分钟' },
        hints: ['先全部读入数组', '再从 <code>i = n-1</code> 遍历到 <code>i = 0</code>', '循环条件 <code>i &gt;= 0</code>'],
        answer: { codeFile: 'codes/lesson-05/reverse.cpp' },
        analysis: { title: '📖 解析', desc: '关键在于倒着遍历。<br><code>for (int i = n-1; i &gt;= 0; i--)</code><br>从最后一个下标 n-1 一直递减到 0。<br>注意 <code>i &gt;= 0</code> 用 <code>&gt;=</code>，不是 <code>&gt;</code>，否则会漏掉 a[0]。' },
        extra: { title: '📖 知识扩展 · 洛谷 P1427 小鱼的数字游戏', desc: '这道题在洛谷的编号是 <a href="https://www.luogu.com.cn/problem/P1427" target="_blank" class="wiki-link">P1427</a>，是数组入门经典题。<br>题目说小鱼在玩数字游戏，你要帮它把数字倒过来读。<br>这道题的核心就是今天学的"逆序输出"。<br><b>建议</b>：课后作业就做这道题，巩固逆序技巧。', variant: 'card-primary' }
      }
    },

    /* ===== 19 初赛小知识：数组内存（dialog） ===== */
    {
      id: 19, type: 'dialog', title: '初赛小知识：数组内存', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 5 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考数组吗？' },
          { who: 'robot', text: '会。常考的是：数组占多少内存、下标范围、能不能越界。' },
          { who: 'student', text: '比如 int a[100] 占多少内存？' },
          { who: 'robot', text: 'int 占 4 字节，100 个就是 400 字节。<br>如果是 long long，每个占 8 字节，100 个就是 800 字节。' },
          { who: 'student', text: '二维数组呢？' },
          { who: 'robot', text: 'int a[10][10] 是 100 个 int，占 400 字节。<br>算内存就把所有维度乘起来，再乘每个类型的字节数。' },
          { who: 'student', text: '还有什么考点？' },
          { who: 'robot', text: '常考数组下标范围。长度 100 的数组，合法下标是 0 到 99。<br>考卷经常出"下面哪个访问是越界的"这种题。' }
        ],
        extra: {
          title: '📖 数组内存速算',
          desc: '<b>一维数组</b>：<code>int a[100];</code> → 100 × 4 = 400 字节<br><b>二维数组</b>：<code>int a[10][10];</code> → 10 × 10 × 4 = 400 字节<br><b>三维数组</b>：<code>int a[5][5][5];</code> → 5 × 5 × 5 × 4 = 500 字节<br><b>规律</b>：所有维度相乘，再乘每个元素的字节数。<br><b>常用类型字节数</b>：int 4、long long 8、double 8、char 1、bool 1。<br>这些数字是初赛必背。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 compare：数组常见错误 ===== */
    {
      id: 20, type: 'compare', title: '数组常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '数组越界：a[5] 访问长度 5 的数组', right: '合法下标 0 到 4，循环用 i &lt; n' },
          { wrong: '数组太小：int a[100] 存 1000 个数', right: '按数据范围开大一点，如 a[1005]' },
          { wrong: '忘记初始化：int sum; 就用 sum +=', right: 'int sum = 0; 先初始化' },
          { wrong: '二维数组写错：a[i, j]', right: '用两个中括号 a[i][j]' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>越界</b>：C++ 不检查下标，越界不报错但结果错。<br>② <b>数组太小</b>：数据范围看错，答案全错。<br>③ <b>未初始化</b>：垃圾值参与运算，结果不可预测。<br>④ <b>二维语法</b>：C++ 用 a[i][j]，不是 a[i, j]。<br><b>口诀</b>：数组开大点，循环写 n，累加先清零，二维两括号。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 数组的典型应用（code-split） ===== */
    {
      id: 21, type: 'code-split', title: '数组的典型应用', subtitle: '统计、查找、累积',
      data: {
        codeFile: 'codes/lesson-05/array-application.cpp',
        snippet: 'main',
        annotations: [
          { line: 8, title: 'count 数组', desc: '用数组统计每个数字出现的次数' },
          { line: 12, title: 'cnt[x]++', desc: '读入 x，计数数组对应位置加 1' },
          { line: 14, title: 'maxCnt', desc: '遍历计数数组，找出现次数最多的' }
        ],
        output: '输入：5\n3 1 3 2 3\n输出：3 出现 3 次',
        extra: {
          title: '💡 计数数组：竞赛技巧',
          desc: '<b>计数数组</b>是数组最常用的技巧之一。<br>思路：让数组下标 = 数值，数组元素 = 该数值出现的次数。<br>例如统计 100 以内每个数出现几次，就开 <code>int cnt[105]</code>。<br><b>应用场景</b>：<br>· 统计频次<br>· 去重（cnt[x] > 0 就是出现过）<br>· 桶排序的基础<br>竞赛里非常常见，一定要掌握。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 数组和方法总结（dialog） ===== */
    {
      id: 22, type: 'dialog', title: '数组方法总结', subtitle: '小C带同学复盘', chapterTag: '第 5 讲 · 概念理解',
      data: {
        lines: [
          { who: 'robot', text: '同学，我们来回看一下今天学的数组。' },
          { who: 'student', text: '好！' },
          { who: 'robot', text: '数组定义用什么语法？' },
          { who: 'student', text: 'int a[100]; 类型 名字[长度];' },
          { who: 'robot', text: '下标从几开始？合法范围？' },
          { who: 'student', text: '从 0 开始，长度 100 的数组合法下标是 0 到 99。' },
          { who: 'robot', text: '遍历数组用什么？' },
          { who: 'student', text: 'for (int i = 0; i &lt; n; i++) 遍历。' },
          { who: 'robot', text: '数组最常见的错误？' },
          { who: 'student', text: '越界！所以数组宁可开大一点。' },
          { who: 'robot', text: '非常好。你已经掌握了数组的核心了。' }
        ],
        extra: {
          title: '💡 四个核心要点',
          desc: '① <b>定义</b>：类型 名字[长度];<br>② <b>访问</b>：a[i]，下标从 0 开始<br>③ <b>遍历</b>：for (i=0; i&lt;n; i++)<br>④ <b>防越界</b>：数组宁开大一点<br>这四条是数组的地基。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 课堂小测 ===== */
    {
      id: 23, type: 'quiz', title: '课堂小测', subtitle: '数组定义、访问与内存',
      chapterTag: '第 5 讲 · 课堂小测',
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
            analysis: 'C++ 数组下标从 <b>0</b> 开始，长度 10 的数组，合法下标是 <b>0 到 9</b>。<br>口诀：<b>下标 &lt; 长度</b>。<br>访问 a[10] 是越界，可能崩溃或输出垃圾值。'
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
            analysis: 'int 占 4 字节，数组有 100 个元素。<br>总内存 = 100 × 4 = <b>400 字节</b>。<br><b>规律</b>：数组内存 = 元素个数 × 每个元素的字节数。<br>int = 4、long long = 8、double = 8、char = 1。'
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
            analysis: 'a[2] 是第三个元素 30，a[4] 是第五个元素 50。<br>30 + 50 = <b>80</b>。<br>关键：<b>a[0] 是第一个元素</b>，不要数错。<br>a[0]=10，a[1]=20，a[2]=30，a[3]=40，a[4]=50。'
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
            analysis: 'C++ <b>不做下标检查</b>，越界访问不会报错。<br>可能的结果：<br>· 读到垃圾值（不崩溃但结果错）<br>· 修改了其他变量的值<br>· 程序崩溃（Segmentation Fault）<br>所以越界问题很隐蔽，要主动避免。<br>这是 C++ 追求速度的代价。'
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
            analysis: 'C 风格数组的长度在<b>定义时必须确定</b>，不能运行时改变。<br>例如 <code>int a[n];</code> 这种写法在标准 C++ 中<b>不允许</b>（n 是变量）。<br>要动态长度，用 <code>vector</code>（C++ STL 容器）。<br>竞赛中，通常按题目最大数据范围定义一个够大的数组。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 数组 vs vector',
          desc: 'C++ 有两种"数组"：<br>① <b>C 风格数组</b>：<code>int a[100];</code> 长度固定，速度快。<br>② <b>vector</b>：<code>vector&lt;int&gt; a;</code> 长度可变，更安全。<br>竞赛中主要用 C 风格数组，因为速度更快、兼容性更好。<br>vector 适合长度不确定的场景。<br>详细的 vector 用法在"STL"讲次介绍。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 今日总结 ===== */
    {
      id: 24, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
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
          desc: '数组是第一个真正的数据结构。<br>后面要学的字符串、栈、队列、树、图，底层都依赖数组。<br>把数组学好，后面一马平川。<br><br>🔮 <b>伏笔</b>：数组为什么访问快？因为它连续存放。<br>那如果不连续呢？第 27 讲"链表"会告诉你另一种可能。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课后作业 ===== */
    {
      id: 25, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P1046', link: 'https://www.luogu.com.cn/problem/P1046', desc: '<b>陶陶摘苹果</b><br>考察：数组读入、遍历<br>难度：★<br>目标：读入 10 个高度，统计能摘到的苹果数' },
          { icon: '🟢', title: '基础 2 · P1427', link: 'https://www.luogu.com.cn/problem/P1427', desc: '<b>小鱼的数字游戏</b><br>考察：逆序输出<br>难度：★<br>目标：倒着输出一串数字' },
          { icon: '🔴', title: '挑战 · P5728', link: 'https://www.luogu.com.cn/problem/P5728', desc: '<b>旗鼓相当的对手</b><br>考察：二维数组、双重循环<br>难度：★★★<br>目标：用二维数组存多科成绩，两两比较' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 下节预告 ===== */
    {
      id: 26, type: 'radial', title: '下节预告', subtitle: '第 6 讲 · 字符串',
      data: {
        center: '字符串',
        items: [
          { text: '字符数组' },
          { text: 'string 类型' },
          { text: '常用函数' },
          { text: '回文判断' }
        ],
        extra: {
          title: '💡 文字的存储',
          desc: '数组能存整数，那文字呢？<br>"Hello" 这 5 个字母，怎么存？<br>下一讲，我们学习能存一串文字的"字符串"。<br>字符串是数组思想的延伸，也是竞赛中处理文本问题的核心。<br><br>🔮 <b>远期彩蛋</b>：数组是连续内存，那计算机怎么区分"数组"和"字符串"？第 6 讲揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 答疑时间 ===== */
    {
      id: 27, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 5 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '数组长度可以运行时确定吗？' },
          { who: 'robot', text: 'C 风格数组不行，长度必须是编译期常量。<br>如果长度要动态确定，后面会学 vector。' },
          { who: 'student', text: '为什么数组从 0 开始编号？' },
          { who: 'robot', text: '因为下标本质是"偏移量"。a[0] 偏移 0，a[1] 偏移 1。<br>习惯就好，竞赛里所有数组都从 0 开始。' },
          { who: 'student', text: '数组开多大合适？' },
          { who: 'robot', text: '看题目数据范围，在此基础上多开 5 到 10 个空位。<br>宁可浪费几字节，也别越界。' },
          { who: 'student', text: '什么时候用数组？' },
          { who: 'robot', text: '需要"回头看"的时候。逆序、排序、找第 k 大，都要先存下来。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '数组是编程的基本功。<br>初学者至少要写 <b>30 道数组题</b>才能熟练。<br>从"读入 - 遍历 - 处理 - 输出"这个模板开始，反复练。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 知识清单 ===== */
    {
      id: 28, type: 'grid', title: '第 5 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 5 讲 · 复习',
      data: {
        cards: [
          { icon: '📦', title: '一维数组', desc: '<b>定义</b>：int a[100];<br><b>下标</b>：0 到 99<br><b>访问</b>：a[i]<br><b>初始化</b>：int a[5] = {1,2,3,4,5};' },
          { icon: '🔄', title: '数组与循环', desc: '<b>读入</b>：for (i=0; i&lt;n; i++) cin &gt;&gt; a[i];<br><b>遍历</b>：for (i=0; i&lt;n; i++) {...}<br><b>求和</b>：sum += a[i];<br><b>逆序</b>：for (i=n-1; i&gt;=0; i--)' },
          { icon: '📏', title: '数组内存', desc: '<b>元素大小</b>：int 4 / double 8 / char 1<br><b>总内存</b>：个数 × 元素大小<br><b>例</b>：int a[100]; 占 400 字节' },
          { icon: '⚠️', title: '常见错误', desc: '<b>越界</b>：下标 ≥ 长度<br><b>数组太小</b>：按数据范围开大<br><b>未初始化</b>：sum = 0;<br><b>二维语法</b>：a[i][j] 不是 a[i,j]' }
        ],
        extra: {
          title: '📌 关键口诀 + 小 C 彩蛋',
          desc: '<b>口诀</b>：数组一排柜，类型要统一；下标从 0 起，长度别忘记；循环遍历它，求和找最大；防越界开大点，累加先清零。<br><b>小 C 彩蛋</b>：数组是计算机最基础的数据结构。<br>你手机里的联系人列表、微信聊天记录、游戏背包，底层都是数组。<br>学会数组，你就理解了计算机"批量处理数据"的核心秘密。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 29 结束页 ===== */
    {
      id: 29, type: 'ending', title: '第五讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: { title: '🌟 你已经掌握了批量数据的工具', desc: '数组是数据结构的地基。<br>从下一讲开始，我们用它来处理文字——字符串。<br>数组 + 字符串 + 循环 + 分支，你就能解决绝大多数基础题了。', variant: 'card-glow' }
      }
    }

  ]
};
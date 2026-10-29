export default {
  title: "第 6 讲 一维数组",
  subtitle: "一排储物柜，批量装数据",
  total: 25,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1,
      type: "cover",
      title: "一维数组",
      subtitle: "一排储物柜，批量装数据",
      chapterTag: false,
      data: {
        accentWord: "数组",
        meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 6 讲"],
      },
    },

    /* ===== 2 上节回顾 ===== */
    {
      id: 2,
      type: "timeline",
      variant: "review",
      title: "上节课回顾",
      subtitle: "循环结构，让程序学会重复",
      data: {
        items: [
          { icon: "🔁", badge: "基础", title: "while 循环", desc: "条件为真就重复执行", points: ["循环三要素", "防止死循环"] },
          { icon: "🔂", badge: "核心", title: "for 循环", desc: "三要素写在一行，计数首选", points: ["初始; 条件; 更新", "分号分隔"] },
          { icon: "🔄", badge: "嵌套", title: "循环嵌套", desc: "外层走一步，内层走一圈", points: ["总次数 = 外 × 内", "九九乘法表"] },
          { icon: "⚡", badge: "控制", title: "break / continue", desc: "跳出整圈 vs 跳过本次", points: ["break 跳出", "continue 跳过"] },
        ],
      },
    },

    /* ===== 3 本节课目标 ===== */
    {
      id: 3,
      type: "grid",
      title: "本节课目标",
      subtitle: "从单兵作战到批量处理",
      data: {
        cards: [
          { number: "01", title: "理解数组", desc: "为什么需要数组、一排储物柜的比喻" },
          { number: "02", title: "定义与访问", desc: "定义语法、下标访问、初始化" },
          { number: "03", title: "数组与循环", desc: "遍历、求和、找最大值、逆序" },
          { number: "04", title: "进阶技巧", desc: "计数数组、避免越界灾难" },
        ],
        footer: '<b>📌 灵魂拷问</b>：如果让你统计全班 50 个人的成绩，并找出最高分，难道你要定义 50 个变量 s1, s2, s3... 吗？<br>今天，我们要造一个“超级大柜子”。'
      },
    },

    /* ===== 4 为什么要数组 ===== */
    {
      id: 4, type: "origin", title: '为什么要数组？', subtitle: '一百个数据，一百个变量？', chapterTag: '第 6 讲 · 概念理解',
      data: {
        problem: {
          title: '存 100 个同学的成绩，难道定义 100 个变量？',
          points: [
            '写 100 行 <code>int s1, s2, s3, ...</code> —— <b>又长又乱</b>',
            '想求和？—— 要写 100 次加法 —— <b>累死</b>',
            '想找最大值？—— 要写 100 次比较 —— <b>不可能</b>'
          ]
        },
        evolution: [
          { icon: '📦', era: '变量', title: '一个盒子', desc: '一个变量只能存一个数据 —— <b>存 100 个要 100 个变量</b>' },
          { icon: '🗄️', era: '数组', title: '一排柜子', desc: '一次定义，批量存 —— <b>3 行搞定 100 个</b>' },
          { icon: '🚀', era: '能力', title: '批量处理', desc: '数组 + 循环 = <b>处理海量数据的黄金组合</b>' }
        ],
        summary: {
          title: '数组 = 一排连续的储物柜',
          desc: '每个柜子有编号（下标），可以按编号快速存取。<br><b>同类型、连续存放、下标访问</b> —— 这是数组的三大特点。<br><br>数组是第一个真正的"数据结构"——<br>后续的字符串、栈、队列、二叉树，底层都依赖数组。',
          // 只需修改下面这一行
          code: '// 不用数组（100 行）\nint s1, s2, s3, ...;\n\n// 用数组（3 行）\nint a[100];\nfor (int i = 0; i < 100; i++)\n    cin >> a[i];'
        },
        extra: {
          title: '📖 知识扩展 · 数组的英文含义',
          desc: '数组的英文是 <b>array</b>，意思是"排列、阵列"。<br>它的核心思想是：<b>把相同类型的数据连续放在内存里，用下标快速访问</b>。<br><br>这个思想是后来<b>所有数据结构</b>的基础——栈、队列、树、图，底层都是数组。<br><br>🔮 <b>伏笔</b>：数组为什么访问快？因为它是连续内存。<br>如果不连续呢？第 27 讲"链表"会告诉你另一种可能。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 5 定义与访问 ===== */
    {
      id: 5, type: "code-split", title: "一维数组 · 定义与访问", subtitle: "语法：类型 数组名[长度];",
      data: {
        intro:
          '📖 <b>定义</b>：<code>int a[5];</code> 表示"5 个整数的数组"。<br><b>访问</b>：用下标 <code>a[i]</code>，下标从 <b>0</b> 开始。',
        codeFile: "codes/lesson-06/array-def.cpp", snippet: "main",
        annotations: [
          { line: 6, title: "int a[5];", desc: "定义长度 5 的整型数组，能存 5 个整数" },
          { line: 8, title: "a[0] = 10;", desc: "下标从 0 开始！第一个元素是 a[0]" },
          { line: 18, title: "int b[5] = {...}", desc: "定义时直接初始化，推荐写法" },
          { line: 19, title: "b[0]", desc: "访问下标 0 的元素，值是 1" },
        ],
        output: "10\n50\n1",
        footer: '<b>💡 数组的三个关键点</b><br>① <b>长度固定</b>：定义时写死，运行中不能改<br>② <b>下标从 0 开始</b>：<code>a[5]</code> 的合法下标是 0—4<br>③ <b>越界危险</b>：<code>a[5]</code> / <code>a[-1]</code> 可能崩溃或输出垃圾值'
      },
    },

    /* ===== 6 为什么下标从 0 开始 ===== */
    {
      id: 6, type: "origin", title: '为什么下标从 0 开始？', subtitle: '这是最容易搞错的细节', chapterTag: '第 6 讲 · 概念理解',
      data: {
        problem: {
          title: '生活中从 1 开始，为什么数组从 0 开始？',
          points: [
            '一栋楼有 5 层 —— 1 楼到 5 楼',
            '一个班级 30 人 —— 1 号到 30 号',
            '为什么数组偏偏要从 <b>0</b> 开始？'
          ]
        },
        evolution: [
          { icon: '🤔', era: '疑问', title: '为什么不是 1 到 5？', desc: '从 1 开始更符合直觉 —— <b>但设计者不这么想</b>' },
          { icon: '💡', era: '关键', title: '下标本质是"偏移量"', desc: '<code>a[0]</code> = 偏移 0 步<br><code>a[1]</code> = 偏移 1 步<br><b>从起点算的"距离"</b>' },
          { icon: '⚙️', era: '实现', title: '计算机一步定位', desc: '地址 = <b>起点 + i × 类型大小</b><br>i 就是"偏移几个元素"<br><b>0 是自然的起点</b>' }
        ],
        summary: {
          title: '下标是"距离"，不是"序号"',
          desc: '<code>a[0]</code> 是<b>第一个元素</b> —— 因为它距起点 <b>0 步</b>。<br><code>a[5]</code> 是<b>第六个元素</b> —— 距起点 5 步。<br><br>长度 5 的数组，合法下标是 <b>0 到 4</b>。<br><b>口诀</b>：下标 &lt; 长度 —— 循环写 <code>i &lt; n</code>，不是 <code>i &lt;= n</code>。',
          code: 'int a[5];   // 合法下标 0, 1, 2, 3, 4\na[0] = 10;  // 第一个元素\na[4] = 50;  // 最后一个元素\na[5] = 60;  // ❌ 越界！'
        }
      }
    },

    /* ===== 7 数组在内存中的样子 ===== */
    {
      id: 7, type: "flow", title: "数组在内存中的样子", subtitle: "一排连续的格子",
      data: {
        nodes: [
          { icon: "📦", label: "a[0]", sub: "地址 1000" },
          { icon: "📦", label: "a[1]", sub: "地址 1004" },
          { icon: "📦", label: "a[2]", sub: "地址 1008" },
          { icon: "📦", label: "a[3]", sub: "地址 1012" },
          { icon: "📦", label: "a[4]", sub: "地址 1016", glow: true },
        ],
        footer: '<b>💡 为什么 int 数组元素差 4 个地址？</b><br>每个 <code>int</code> 占 <b>4 字节</b>。<br><code>a[0]</code> 占 1000—1003，<code>a[1]</code> 就从 1004 开始。<br><br><b>地址差值 = 元素类型的大小</b>。<br>double 数组差 8，char 数组差 1。<br><br><b>🔮 伏笔</b>：如果内存不连续呢？第 27 讲"链表"告诉你答案。'
      },
    },

        /* ===== 8 眼见为实：数组越界 ===== */
    {
      id: 8, type: "code-walkthrough", title: "眼见为实：越界到底多可怕？", subtitle: "C++ 的静默杀手", chapterTag: "第 6 讲 · 概念理解",
      data: {
        intro: "我们一再强调：长度为 5 的数组，下标是 0 到 4。<br>如果我非要访问 <code>a[5]</code>，编译器会报错吗？看代码：",
        code: "int a[5] = {1, 2, 3, 4, 5};\nint b = 100;\n\ncout << a[5];",
        steps: [
          { title: "分配内存", line: 1, vars: { a: "{1, 2, 3, 4, 5}", b: "100" }, note: "系统给数组 a 分配了 5 个格子，旁边正好是变量 b。" },
          { title: "危险操作", line: 4, vars: { a: "{1, 2, 3, 4, 5}", b: "100" }, note: "a[5] 实际上是数组外面的那块内存！" },
          { title: "灾难结局", line: 4, vars: { a: "{1, 2, 3, 4, 5}", b: "100" }, note: "屏幕上居然输出了 <b>100</b>。<br>你读到了别人的数据！如果对 a[5] 赋值，甚至会把变量 b 改掉！" }
        ],
        extra: {
          title: "💡 为什么没报错？越界就是黑客的入口！",
          desc: "C++ 为了追求极致的速度，<b>根本不会检查数组下标越界</b>。<br>这就像你买了一排 5 个柜子，但你拿着第 6 个柜子的钥匙去开，结果打开的是隔壁邻居的柜子。<br><br><b>🚨 硬核真相</b>：世界上著名的网络安全漏洞（如“缓冲区溢出”），大多是因为程序员没管好数组越界！黑客故意输入超长的字符串，让数组越界，从而覆盖掉系统的关键数据，甚至获取管理员权限。<br><br><b>📌 致命警告</b>：这就是为什么我们强调：<b>数组宁可开大一点，循环条件千万写对！</b>",
          variant: "card-primary"
        }
      }
    },

    /* ===== 9 过渡页 ===== */
    {
      id: 9, type: "transition", title: "第二站 · 数组实战", subtitle: "用数组解决三大经典问题",
      data: { note: "接下来你将用数组和循环解决求和、找最大值、逆序输出三个经典问题" },
    },

    /* ===== 10 数组遍历 ===== */
    {
      id: 10, type: "code-split", title: "数组与循环：黄金组合", subtitle: "用 for 遍历数组",
      data: {
        intro: "📖 <b>数组 + 循环 = 竞赛解题模板</b>。<br>用循环变量当数组下标，逐个读入、逐个处理。",
        codeFile: "codes/lesson-06/array-traverse.cpp", snippet: "main",
        annotations: [
          { line: 6, title: "for (i = 0; i &lt; 5; i++)", desc: "下标从 0 到 4，正好覆盖 5 个元素" },
          { line: 7, title: "cin &gt;&gt; a[i]", desc: "用循环变量当数组下标，逐个读入" },
          { line: 10, title: "cout &lt;&lt; a[i]", desc: "遍历输出所有元素" },
        ],
        output: "（输入 1 2 3 4 5）\n1 2 3 4 5",
        footer: '<b>📌 数组 + 循环 = 竞赛解题模板</b><br><b>读入模板</b>：<br><code>for (int i = 0; i &lt; n; i++) cin &gt;&gt; a[i];</code><br><br><b>遍历模板</b>：<br><code>for (int i = 0; i &lt; n; i++) { /* 处理 a[i] */ }</code><br><br>把这两个模板练到条件反射——一半的数组题就稳了。<br><b>注意</b>：循环条件写 <code>i &lt; n</code>，不是 <code>i &lt;= n</code>——否则越界。'
      },
    },

    /* ===== 11 练习1：求和 ===== */
    {
      id: 11, type: "level-map", title: "课堂练习1：求和", subtitle: "用数组读入 n 个数，输出它们的和", chapterTag: "第 6 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "第一行输入整数 <code>n</code>，第二行输入 <code>n</code> 个整数，输出它们的和。<br>输入样例：<code>5</code> 然后 <code>1 2 3 4 5</code>　输出样例：<code>15</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["定义数组 <code>int a[1005];</code>", "用 <code>for (int i = 0; i &lt; n; i++)</code> 读入", "用累加器 <code>sum</code> 求和，初始为 0"],
        answer: { codeFile: "codes/lesson-06/sum.cpp" },
        analysis: { title: "📖 解析", desc: '典型的"读入 + 遍历"模板。<br>数组长度开 1005，比题目最大范围多留几个空位。<br>循环条件写 <code>i &lt; n</code> 而不是 <code>i &lt;= n</code>，避免越界。' },
        extra: { title: "📖 知识扩展 · 高斯的算法 vs 计算机的循环", desc: '<a href="https://baike.baidu.com/item/高斯" target="_blank" class="wiki-link">高斯</a>用公式 <code>n(n+1)/2</code> 秒算 1 到 100。<br>计算机用循环逐个数加起来，也能得到同样结果。<br><br>公式更快，但循环更通用——任何数列求和，循环都能算。<br><b>这就是计算机的哲学</b>：不追求最聪明，只追求最通用。<br><br><b>数组的价值</b>：<br>如果数列不是等差数列（如 <code>3 7 2 9 5</code>），公式就不管用了。<br>数组 + 循环能处理任何数列。', variant: "card-primary" },
      },
    },

    /* ===== 12 眼见为实：累加器怎么变 ===== */
    {
      id: 12, type: "evolution", title: "数组求和：累加器怎么变", subtitle: "sum 一步步变大", chapterTag: "第 6 讲 · 过程演示",
      data: {
        intro: '📖 数组求和的核心是"<b>累加器</b>"——它像一个存钱罐，每次把新元素加进去。<br>看 sum 怎么从 0 一步步长大。',
        codeFile: "codes/lesson-06/array-sum.cpp", snippet: "main",
        steps: [
          { focusLines: [6], expression: "sum = 0", note: "循环开始前，累加器 <code>sum</code> 初始化为 0。<br>就像空的存钱罐，还没放钱。" },
          { focusLines: [9], expression: "sum = sum + a[0] = 0 + 1 = 1", note: "第 1 次循环（i=0）：<br>取出 <code>a[0] = 1</code>，加进 sum。<br>存钱罐里现在有 <b>1</b>。" },
          { focusLines: [9], expression: "sum = sum + a[1] = 1 + 2 = 3", note: "第 2 次循环（i=1）：<br>取出 <code>a[1] = 2</code>，加进 sum。<br>存钱罐里现在有 <b>3</b>。" },
          { focusLines: [9], expression: "sum = sum + a[2] = 3 + 3 = 6", note: "第 3 次循环（i=2）：<br>取出 <code>a[2] = 3</code>，加进 sum。<br>存钱罐里现在有 <b>6</b>。" },
          { focusLines: [9], expression: "sum = sum + a[3] = 6 + 4 = 10", note: "第 4 次循环（i=3）：<br>取出 <code>a[3] = 4</code>，加进 sum。<br>存钱罐里现在有 <b>10</b>。" },
          { focusLines: [9], expression: "sum = sum + a[4] = 10 + 5 = 15", note: "第 5 次循环（i=4）：<br>取出 <code>a[4] = 5</code>，加进 sum。<br>存钱罐里现在有 <b>15</b>。<br>循环结束。" },
          { focusLines: [11], expression: "sum = 15", note: "✅ 输出 <b>15</b>。<br><b>5 个元素，5 次累加</b>——这就是数组求和的全过程。<br><br>🔮 关键：<code>sum</code> 必须初始化为 <b>0</b>，否则第一次加法就错了。" }
        ],
        footer: '<b>💡 累加 vs 累乘</b><br><b>累加</b>：<code>sum = 0; sum += a[i];</code> 初始值 0<br><b>累乘</b>：<code>fact = 1; fact *= a[i];</code> 初始值 1<br><br>🔮 <b>伏笔</b>：这个"初始值"思想，在第 9 讲阶乘递归里会再次出现。'
      },
    },

    /* ===== 13 练习2：找最大值 ===== */
    {
      id: 13, type: "level-map", title: "课堂练习2：找最大值", subtitle: "读入 n 个数，找出最大的那个", chapterTag: "第 6 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "第一行输入整数 <code>n</code>，第二行输入 <code>n</code> 个整数，输出其中的最大值。<br>输入样例：<code>5</code> 然后 <code>3 7 2 9 5</code>　输出样例：<code>9</code>", timer: "⏱ 限时 8 分钟" },
        hints: ["用变量 <code>maxVal</code> 记录当前最大值", '初始值用 <code>-1e9</code>（<b>-10 亿</b>）——保证第一个数一定能"打败"它', "<code>1e9</code> 是<b>科学计数法</b>：<code>1e9 = 1 × 10⁹ = 10 亿</code>", "每次读入新数，如果更大就更新"],
        answer: { codeFile: "codes/lesson-06/max.cpp" },
        analysis: { title: "📖 解析", desc: '<b>为什么 maxVal 初始值要小？</b><br>maxVal 是"当前最大值"，必须保证<b>第一个数一定能打败它</b>。<br>初始值太大，第一个数可能"打不败"，结果就错。<br><br><b>为什么用 -1e9？</b><br><code>1e9</code> 是<b>科学计数法</b>，表示 10 的 9 次方 = <b>10 亿</b>。<br>所以 <code>-1e9</code> = <b>-10 亿</b>。<br>竞赛数据范围通常在 ±10 亿以内，用 -10 亿一定安全。<br><br><b>口诀</b>：找最大值，初始值宁小勿大；找最小值，初始值宁大勿小。' },
      },
    },

    /* ===== 14 存不存数组？ ===== */
    {
      id: 14, type: "decision", title: '存不存数组？', subtitle: '什么时候用数组，什么时候不用', chapterTag: '第 6 讲 · 概念理解',
      data: {
        intro: '📖 有些题要"先存后处理"，有些题可以"边读边算"。<br>看下面的判断信号——',
        signals: [
          { icon: '➕', keyword: '求和 / 计数', desc: '读一个加一个<br><b>不用数组</b>' },
          { icon: '📈', keyword: '找最大值 / 最小值', desc: '边读边比较<br><b>不用数组</b>' },
          { icon: '🔄', keyword: '逆序输出', desc: '必须回头读<br><b>用数组</b>' },
          { icon: '📊', keyword: '排序 / 找第 k 大', desc: '需要比较全部数据<br><b>用数组</b>' },
          { icon: '🎯', keyword: '一次遍历完成', desc: '读完就丢<br><b>不用数组</b>' },
          { icon: '🔍', keyword: '回头查 / 回头比', desc: '需要多轮访问<br><b>用数组</b>' }
        ],
        conclusion: { title: '判断法则', desc: '<b>用到一次不用存，用到多次先存下</b>。<br><br>· 只需要一个数（求和、最大值）→ 边读边算，不用数组<br>· 需要"回头看"（逆序、排序、找第 k 大）→ 先存数组<br><br>📌 <b>竞赛经验</b>：能不用数组就不用——省内存、代码短。<br>但本讲练数组，所以每道题都用数组写一遍。' }
      }
    },

    /* ===== 15 练习3：逆序输出 ===== */
    {
      id: 15, type: "level-map", title: "课堂练习3：逆序输出", subtitle: "把 n 个数倒着输出", chapterTag: "第 6 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入 <code>n</code> 个整数，按相反顺序输出。<br>输入样例：<code>5</code> 然后 <code>1 2 3 4 5</code>　输出样例：<code>5 4 3 2 1</code>", timer: "⏱ 限时 8 分钟" },
        hints: ["先全部读入数组", "再从 <code>i = n-1</code> 遍历到 <code>i = 0</code>", "循环条件 <code>i &gt;= 0</code>，不是 <code>i &gt; 0</code>"],
        answer: { codeFile: "codes/lesson-06/reverse.cpp" },
        analysis: { title: "📖 解析", desc: "关键在于<b>倒着遍历</b>。<br><code>for (int i = n-1; i &gt;= 0; i--)</code><br>从最后一个下标 <code>n-1</code> 一直递减到 0。<br><br>注意 <code>i &gt;= 0</code> 用 <code>&gt;=</code>，不是 <code>&gt;</code>，否则会漏掉 <code>a[0]</code>。" },
      },
    },

    /* ===== 16 初赛渗透 ===== */
    {
      id: 16, type: "split", title: '初赛小知识：数组内存', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 6 讲 · 初赛渗透',
      data: {
        intro: '初赛常考——<b>数组占多少内存</b>、<b>下标范围</b>、<b>能不能越界</b>。都是送分题，必须拿下。',
        panes: [
          {
            title: '内存速算', icon: '💾',
            items: [
              { title: 'int a[100]', desc: '100 × 4 = <b>400 字节</b>' },
              { title: 'long long a[100]', desc: '100 × 8 = 800 字节' },
              { title: 'double a[100]', desc: '100 × 8 = 800 字节' },
              { title: 'char a[100]', desc: '100 × 1 = 100 字节' },
              { title: 'int a[10][10]', desc: '10 × 10 × 4 = 400 字节' },
              { title: '规律', desc: '所有维度相乘 × 元素大小' }
            ]
          },
          {
            title: '常见陷阱', icon: '⚠️',
            items: [
              { title: '下标范围', desc: '长度 100 → 0 到 99' },
              { title: '越界访问', desc: '不报错但结果错' },
              { title: 'sizeof(a)', desc: '得整个数组字节数' },
              { title: 'sizeof(a[0])', desc: '得单个元素字节数' },
              { title: '元素个数', desc: 'sizeof(a) / sizeof(a[0])' },
              { title: '类型大小', desc: 'int=4, ll=8, double=8, char=1' }
            ]
          }
        ],
        footer: '<b>📌 必背类型大小</b>：int = 4 / long long = 8 / double = 8 / char = 1 / bool = 1<br><br><b>💡 用 sizeof 查</b>：<br><code>sizeof(int)</code> → 4<br><code>sizeof(a)</code> → 整个数组字节数（不是元素个数！）<br><br><b>⚠️ 陷阱</b>：想知道元素个数，用 <code>sizeof(a) / sizeof(a[0])</code>——不能直接 <code>sizeof(a)</code>。<br><br><b>💡 单词拆解</b>：<code>sizeof</code> = size (大小) + of (……的) = 求大小。'
      }
    },

    /* ===== 17 计数数组 ===== */
    {
      id: 17, type: "code-split", title: "数组的典型应用 · 计数数组", subtitle: "统计每个数出现的次数",
      data: {
        intro: "📖 <b>计数数组</b>是数组最常用的技巧之一。<br>让<b>下标 = 数值</b>，<b>元素 = 出现次数</b>。",
        codeFile: "codes/lesson-06/count.cpp", snippet: "main",
        annotations: [
          { line: 6, title: "int cnt[105] = {0};", desc: "计数数组，全部初始化为 0" },
          { line: 11, title: "cnt[x]++;", desc: "读入 x，计数数组对应位置加 1" },
          { line: 15, title: "if (cnt[i] &gt; maxCnt)", desc: "遍历计数数组，找出现次数最多的" },
        ],
        output: "（输入 5 / 3 1 3 2 3）\n3 出现 3 次",
        footer: '<b>💡 计数数组 · 竞赛技巧</b><br>核心思想：<b>用下标当数值</b>。<br><br><b>思路</b>：<br>· 开大数组 <code>cnt[N]</code><br>· 读到 x → <code>cnt[x]++</code><br>· <code>cnt[k]</code> 表示"数值 k 出现了几次"<br><br><b>应用</b>：统计频次、去重、桶排序基础。<br><br><b>注意</b>：数组大小要比"最大数值"更大——0—100 的数据就开 <code>cnt[105]</code>。'
      },
    },

    /* ===== 18 课堂小测 ===== */
    {
      id: 18, type: "quiz", title: "课堂小测", subtitle: "数组定义、访问与内存", chapterTag: "第 6 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第四章", optionLayout: "horizontal", question: "定义 <code>int a[10];</code> 后，合法下标范围是？", options: [ { label: "A", text: "1 到 10" }, { label: "B", text: "0 到 10" }, { label: "C", text: "0 到 9", correct: true }, { label: "D", text: "1 到 9" } ], analysis: "C++ 数组下标从 <b>0</b> 开始，长度 10 的数组，合法下标是 <b>0 到 9</b>。<br>口诀：<b>下标 &lt; 长度</b>。<br>访问 <code>a[10]</code> 是越界，可能崩溃或输出垃圾值。" },
          { id: 2, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 数组", optionLayout: "horizontal", question: "在常见编译器中，<code>int a[100];</code> 占用多少字节内存？", options: [ { label: "A", text: "100 字节" }, { label: "B", text: "200 字节" }, { label: "C", text: "400 字节", correct: true }, { label: "D", text: "800 字节" } ], analysis: 'int 占 4 字节，数组有 100 个元素。<br>总内存 = 100 × 4 = <b>400 字节</b>。<br><br><b>规律</b>：数组内存 = 元素个数 × 每个元素的字节数。' },
          { id: 3, type: "single", difficulty: 3, source: "2020 CSP-J 初赛模拟题 · 数组", optionLayout: "two-cols", question: "下面代码的输出是什么？", questionCode: `int a[5] = {10, 20, 30, 40, 50};\ncout << a[2] + a[4] << endl;`, options: [ { label: "A", text: "50" }, { label: "B", text: "70" }, { label: "C", text: "80", correct: true }, { label: "D", text: "编译错误" } ], analysis: "<code>a[2]</code> 是第三个元素 30，<code>a[4]</code> 是第五个元素 50。<br>30 + 50 = <b>80</b>。<br><br><b>关键</b>：<code>a[0]</code> 是第一个元素，不要数错。" },
          { id: 4, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第四章", optionLayout: "two-cols", question: "在 C++ 中，访问数组越界元素时，程序一定会报错。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: "C++ <b>不做下标检查</b>，越界访问不会报错。<br><br>可能的结果：<br>· 读到垃圾值（不崩溃但结果错）<br>· 修改了其他变量的值<br>· 程序崩溃（Segmentation Fault）" },
          { id: 5, type: "judge", difficulty: 2, source: "CSP-J 初赛真题练习 · 数组", optionLayout: "two-cols", question: "数组的长度在定义时可以不确定，运行时再决定。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: "C 风格数组的长度在<b>定义时必须确定</b>，不能运行时改变。<br><br>例如 <code>int a[n];</code> 这种写法在标准 C++ 中<b>不允许</b>（n 是变量）。" },
        ],
      },
    },

    /* ===== 19 知识清单 ===== */
    {
      id: 19, type: "grid", title: "第 6 讲 · 知识清单", subtitle: "一页看完本讲所有重点", chapterTag: "第 6 讲 · 复习",
      data: {
        cards: [
          { icon: "📦", title: "一维数组", desc: "<b>定义</b>：int a[100];<br><b>下标</b>：0 到 99<br><b>访问</b>：a[i]<br><b>初始化</b>：int a[5] = {1,2,3,4,5};" },
          { icon: "🔄", title: "数组与循环", desc: "<b>读入</b>：for (i=0; i&lt;n; i++) cin &gt;&gt; a[i];<br><b>遍历</b>：for (i=0; i&lt;n; i++) {...}<br><b>求和</b>：sum += a[i];<br><b>逆序</b>：for (i=n-1; i&gt;=0; i--)" },
          { icon: "💾", title: "数组内存", desc: "<b>元素大小</b>：int 4 / double 8 / char 1<br><b>总内存</b>：个数 × 元素大小<br><b>例</b>：int a[100]; 占 400 字节" },
          { icon: "⚠️", title: "常见错误", desc: "<b>越界</b>：下标 ≥ 长度<br><b>数组太小</b>：按数据范围开大<br><b>未初始化</b>：sum = 0;" },
        ],
        footer: '<b>📌 关键口诀</b>：数组一排柜，类型要统一；下标从 0 起，长度别忘记；循环遍历它，求和找最大；防越界开大点，累加先清零。<br><br><b>📸 建议拍照保存，作为课后复习清单。</b>'
      },
    },

    /* ===== 20 今日总结 ===== */
    {
      id: 20, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "一个变量存一个数，一个数组存一排数。", author: "—— 数组第一课",
        points: [ "数组是一排连续存储的同类型数据", "定义：类型 数组名[长度];", "下标从 0 开始，合法范围 0 到 长度-1", "数组 + 循环 = 竞赛解题黄金组合", "遍历模板：for (int i = 0; i < n; i++)", "越界不报错，数组宁开大一点" ],
        highlight: { title: "📌 关键口诀", desc: "数组一排柜，类型要统一；下标从 0 起，长度别忘记；循环遍历它，求和找最大；防越界开大点，累加先清零。" },
      },
    },

    /* ===== 21 课后作业 ===== */
    {
      id: 21, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P1046", link: "https://www.luogu.com.cn/problem/P1046", desc: "<b>陶陶摘苹果</b><br>考察：数组读入、遍历<br>难度：★<br>目标：读入 10 个高度，统计能摘到的苹果数" },
          { icon: "🟢", title: "基础 2 · P1427", link: "https://www.luogu.com.cn/problem/P1427", desc: "<b>小鱼的数字游戏</b><br>考察：逆序输出<br>难度：★<br>目标：倒着输出一串数字" },
          { icon: "🔴", title: "挑战 · P2911", link: "https://www.luogu.com.cn/problem/P2911", desc: "<b>牛式</b><br>考察：一维数组 + 三重循环<br>难度：★★★<br>目标：统计三个骰子点数之和的频次" },
        ],
      },
    },

    /* ===== 22 下节预告 ===== */
    {
      id: 22, type: "radial", title: "下节预告", subtitle: "第 7 讲 · 字符串基础",
      data: { center: "字符串", items: [ { text: "char vs string" }, { text: "读入与遍历" }, { text: "统计与回文" }, { text: "常见函数" } ] },
    },

    /* ===== 23 答疑时间 ===== */
    {
      id: 23, type: "grid", title: '答疑时间', subtitle: '常见问题 FAQ', chapterTag: '第 6 讲 · 答疑',
      data: {
        cards: [
          { icon: '📏', title: '数组长度能变吗？', desc: 'C 风格数组<b>不行</b>——长度必须是编译期常量。<br>要动态长度，用 <code>vector</code>（第 14 讲）。' },
          { icon: '0️⃣', title: '为什么从 0 开始？', desc: '下标本质是"<b>偏移量</b>"。<br><code>a[0]</code> 偏移 0 步——就是起点。<br>习惯就好。' },
          { icon: '📐', title: '数组开多大合适？', desc: '按题目数据范围<b>多开 5—10 个空位</b>。<br>宁可浪费几字节，也别越界。' },
          { icon: '🚨', title: '越界了为什么没报错？', desc: 'C++ 追求速度，<b>不检查下标</b>。<br>结果是不可预测的，极易引发连环 Bug。<br>写循环时必须警惕条件。' }
        ]
      }
    },

    /* ===== 24 本讲英文单词 ===== */
    {
      id: 24, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 6 讲 · 复习",
      data: {
        words: [
          { word: "array", cn: "数组", pron: "/əˈreɪ/", origin: '英文原意"排列、阵列"', category: "概念" },
          { word: "index", cn: "下标", pron: "/ˈɪndeks/", origin: '英文原意"索引、指针"', category: "概念" },
          { word: "element", cn: "元素", pron: "/ˈelɪmənt/", origin: '英文原意"元素、成分"', category: "概念" },
          { word: "length", cn: "长度", pron: "/leŋθ/", origin: '英文原意"长度"', category: "概念" },
          { word: "count", cn: "计数", pron: "/kaʊnt/", origin: '英文原意"计数"', category: "函数" },
          { word: "size", cn: "大小", pron: "/saɪz/", origin: '英文原意"大小、尺寸"', category: "概念" },
        ],
      },
    },

    /* ===== 25 结束页 ===== */
    {
      id: 25, 
      type: "ending", 
      title: "第六讲结束", 
      subtitle: "你的程序，有了“批量处理”的能力", 
      chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 数据结构的大门已开启",
          desc: "今天，你学会了用数组把成百上千的数据“排排坐”。<br>从处理单个变量到处理数据集合，这是编程思维的巨大飞跃。<br><br>但你现在存的还都是数字。如果你要处理一整句话、一个人的名字呢？<br>下一讲，我们要处理计算机世界里最常用的东西——<b>字符串</b>。<br><br>📌 <b>行动号召</b>：去洛谷挑战“陶陶摘苹果”和“小鱼的数字游戏”，体会一下数组的威力！",
          variant: "card-glow"
        }
      },
    },
  ],
};
export default {
  title: "第 6 讲 一维数组",
  subtitle: "一排储物柜，批量装数据",
  total: 23,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "一维数组", subtitle: "一排储物柜，批量装数据", chapterTag: false,
      data: { accentWord: "数组", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 6 讲"] },
    },

    /* ===== 2 钩子：50 个变量的噩梦 ===== */
    {
      id: 2, type: "dialog", title: "50 个变量的噩梦", subtitle: "变量只能存一个，那一批数据怎么办？", chapterTag: "第 6 讲 · 开场",
      data: {
        lines: [
          { who: "student", text: "小 C，老师让我写个程序，输入全班 50 个人的成绩，然后倒序输出。" },
          { who: "robot", text: "那你就定义 50 个变量呗：<code>int a1, a2, a3... a50;</code>" },
          { who: "student", text: "这也太蠢了吧！如果是全校 1000 个人的成绩呢？" },
          { who: "robot", text: "这就是为什么我们需要新武器。变量，只能存<b>一个</b>数据。当数据成群结队时，变量就不够用了。" },
          { who: "student", text: "那用什么？" },
          { who: "robot", text: "在数学里，如果有一批数据，我们会怎么写？我们会设一个<b>数列</b>：\\( a_1, a_2, a_3 ... a_n \\)。<br>在 C++ 里，这种能一口气装下一批数据的连续空间，叫<b>「数组」</b>。" },
        ]
      }
    },

    /* ===== 3 本讲作战地图 ===== */
    {
      id: 3, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "四站闯关，搞定批量数据",
      data: {
        items: [
          { icon: "🧮", badge: "第一站", title: "数列与遍历", desc: "数组的语法", points: ["定义与访问", "配合 for 循环遍历", "避开越界陷阱"] },
          { icon: "🏆", badge: "第二站", title: "擂台算法", desc: "求最大值", points: ["经典打擂台", "边界处理", "初始化陷阱"] },
          { icon: "💥", badge: "第三站", title: "机房防崩", desc: "大数组急救", points: ["为什么闪退", "全局变量", "栈溢出（RE）"] },
          { icon: "💡", badge: "第四站", title: "思维拓展", desc: "计数数组", points: ["把值当下标", "桶的思想", "逆序实战"] },
        ],
      },
    },

    /* ===== 4 为什么需要数组 ===== */
    {
      id: 4, type: "origin", title: "为什么需要数组？", subtitle: "从离散变量到连续数列", chapterTag: "第 6 讲 · 概念理解",
      data: {
        problem: {
          title: "变量是“单间”，数组是“大平层”",
          points: ["定义 100 个变量是噩梦，而且无法配合循环。", "数学里的数列，用下标来区分每一项（如 \\(a_5\\)）。", "数组就是内存里连续排布的一段数列。"],
        },
        evolution: [
          { icon: "📦", era: "单间", title: "普通变量", desc: "<code>int a = 10;</code> 只能存一个数" },
          { icon: "🏢", era: "大平层", title: "数组", desc: "<code>int a[100];</code> 一口气申请 100 个连续座位" },
          { icon: "🔁", era: "自动处理", title: "循环 + 数组", desc: "用 <code>for</code> 循环控制下标，自动批量处理" }
        ],
        summary: {
          title: "数组 = 内存里的数学数列",
          desc: "数组名就是数列的名字，下标就是第几项。<br>有了它，程序才能处理“批量数据”。",
          code: "int a[5];  // 申请 5 个连续座位\n// 数学里的 a_1, a_2... \n// C++ 里的 a[0], a[1]..."
        }
      }
    },

    /* ===== 5 数组定义与访问 ===== */
    {
      id: 5, type: "code-split", title: "数组定义与访问", subtitle: "语法演示",
      data: {
        intro: "📖 <b>语法</b>：<code>类型 数组名[大小];</code><br>访问通过<b>下标</b>：<code>数组名[编号]</code>。",
        codeFile: "codes/lesson-06/array-basic.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "int a[5];", desc: "向内存申请 5 个连续的整数空间" },
          { line: 3, title: "a[0] = 10;", desc: "给第 0 号座位赋值 10" },
          { line: 4, title: "a[1] = 20;", desc: "给第 1 号座位赋值 20" },
          { line: 7, title: "cout << a[0]", desc: "通过下标把里面的值取出来" },
        ],
        output: "10 20 30",
      },
    },

    /* ===== 6 练习1：试错遍历（故意踩坑） ===== */
    {
      id: 6, type: "level-map", title: "课堂练习1：试错遍历", subtitle: "输入 5 个数，再原样输出", chapterTag: "第 6 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "定义大小为 5 的数组，用循环读入 5 个数，然后再用循环输出这 5 个数。<br>输入样例：<code>1 2 3 4 5</code>　输出样例：<code>1 2 3 4 5</code>", timer: "⏱ 限时 5 分钟" },
        hints: ["定义 <code>int a[5];</code>", "用 <code>for</code> 循环控制下标", "**注意下标从哪里开始，到哪里结束**"],
        answer: { codeFile: "codes/lesson-06/_error-bound.cpp", snippet: "main" },
        analysis: { title: "📖 解析 & 思考", desc: "如果按数学习惯写成 <code>for(i=1; i<=5; i++)</code>，会<b>发生严重的灾难！</b><br>去看看下一页的真相。" },
      },
    },

    /* ===== 7 冲突①：眼见为实：数组越界 ===== */
    {
      id: 7, type: "code-walkthrough", title: "眼见为实：数组越界", subtitle: "为什么多出了乱码？", chapterTag: "第 6 讲 · 概念理解",
      data: {
        intro: "如果你刚才把下标写成了 1 到 5，运行结果可能会多出一串乱码。<br>我们来看看为什么：",
        codeFile: "codes/lesson-06/_error-bound.cpp", snippet: "main",
        steps: [
          { title: "申请空间", line: 2, note: "你申请了 5 个空间。计算机给你的是：第 0、1、2、3、4 号房间。" },
          { title: "强行进入", line: 3, vars: { i: "1" }, note: "循环从 i=1 开始，读入 a[1]... 这没问题，1 号房间是合法的。" },
          { title: "越界惨案", line: 3, vars: { i: "5" }, note: "当 i=5 时，程序试图读入 <code>a[5]</code>。<b>但是，你的房间只到 4 号！</b><br>a[5] 是别人的地盘，你强行把数据塞进去，把墙挤破了。" },
          { title: "未知灾难", line: 3, vars: { i: "5" }, note: "它可能会覆盖别的变量，可能会输出乱码，甚至可能直接导致程序崩溃（RE）。" }
        ],
        extra: {
          title: "🚨 铁律",
          desc: "<div>在 C++ 中，如果数组大小是 \(n\)，那么合法的下标是 <b>\(0\) 到 \(n-1\)</b>。</div><div>开 <code>int a[5]</code>，只能用 <code>a[0]</code> 到 <code>a[4]</code>。<br>千万不要越界！</div>",
          variant: "card-primary"
        }
      }
    },

    /* ===== 8 为什么下标从 0 开始 ===== */
    {
      id: 8, type: "grid", title: "为什么下标从 0 开始", subtitle: "数学与程序的认知差异", chapterTag: "第 6 讲 · 概念理解",
      data: {
        cards: [
          { icon: "📏", title: "偏移量原理", desc: "数组的本质是内存地址的<b>偏移量</b>。<br>你找第 0 个，就是原地不动（偏移 0）。<br>找第 1 个，就是往后偏移 1 格。" },
          { icon: "🧮", title: "数学 vs C++", desc: "数学中的数列 \\(a_1, a_2\\) 从 1 开始。<br>C++ 为了追求极致的计算速度，选择了底层物理距离的 0 开始。" },
          { icon: "🛡️", title: "保命口诀", desc: "循环写 <code>for(i=0; i&lt;n; i++)</code>。<br><b>大小是 n，下标是 0 到 n-1。</b><br>多写一个 <code>=</code> 就会越界。" },
        ],
        extra: {
          title: "📖 历史趣闻 · C 语言之父的取舍",
          desc: '<div>1972 年，C 语言之父 <b>丹尼斯·里奇</b> 在设计数组时，做了一个决定：<b>下标从 0 开始</b>。</div><div>为什么？因为当时计算机内存极小，编译器要把代码翻译成机器码。<br>如果数组从 1 开始，每次计算元素位置，CPU 都要多执行一条 <code>减 1</code> 的指令。</div><div>为了让全世界每天运行的几十亿个程序快那么零点几秒，他选择了反人类直觉的 0。<br><b>这就是底层程序员的极致追求。</b></div>',
          variant: "card-primary",
        },
      }
    },

    /* ===== 9 打擂台求最大值 ===== */
    {
      id: 9, type: "code-split", title: "打擂台求最大值", subtitle: "数组 + 循环的黄金组合",
      data: {
        intro: "📖 读入一批数后，怎么找老大？<br><b>打擂台</b>：先让第一个人当擂主，后面的人依次来挑战，谁大谁当新擂主。",
        codeFile: "codes/lesson-06/max.cpp", snippet: "main",
        annotations: [
          { line: 4, title: "int a[100];", desc: "开一个足够大的数组" },
          { line: 5, title: "for (int i = 0; i &lt; n; i++)", desc: "从 0 到 n-1 读入数据" },
          { line: 9, title: "int max_val = a[0];", desc: "第 0 个人先站上擂台" },
          { line: 11, title: "if (a[i] &gt; max_val)", desc: "如果挑战者比擂主大，换擂主" },
        ],
        output: "（输入 5 个数：3 9 2 7 5）\n9",
      },
    },

    /* ===== 10 练习2：找最大值 ===== */
    {
      id: 10, type: "level-map", title: "课堂练习2：找最大值", subtitle: "打擂台算法", chapterTag: "第 6 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个整数 n，再输入 n 个整数，输出其中的最大值。", timer: "⏱ 限时 6 分钟" },
        hints: ["用变量 <code>max_val</code> 记录最大值", "初始值设为 <code>a[0]</code>，不要设为 0", "遍历后面的数，不断更新 max_val"],
        answer: { codeFile: "codes/lesson-06/max.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "为什么 <code>max_val</code> 初始化为 <code>a[0]</code>？<br>如果初始化为 0，当输入的数组全是负数（如 -5 -2 -9）时，最大值会错误地输出 0。" },
      },
    },

    /* ===== 11 冲突②：黑窗口一闪而过 ===== */
    {
      id: 11, type: "pitfall", title: "黑窗口一闪而过", subtitle: "机房最绝望的报错：RE", chapterTag: "第 6 讲 · 概念理解",
      data: {
        intro: "为什么在 <code>main</code> 里面开大数组会闪退？<br>因为 <code>main</code> 函数的内存（栈）很小，只有几兆。你一口气要了 10 万个座位，栈装不下，直接爆了（RE 运行错误）。",
        cases: [
          { icon: "💥", scene: "程序编译成功，但运行直接闪退", what: "黑窗口瞬间关闭，没有任何输出", why: "你在 <code>main</code> 里面开了太大的数组（比如 100 万），导致空间爆了（栈溢出）。", fix: "把大数组写在 <code>main</code> 的外面（变成全局变量）。" }
        ],
        extra: {
          title: "💀 知识扩展 · 缓冲区溢出攻击",
          desc: '<div>数组越界，仅仅是程序闪退这么简单吗？<br>不，它是网络世界最著名的漏洞——<b>缓冲区溢出</b>（Buffer Overflow）。</div><div>如果你在一个数组里塞入超长的数据，多出来的部分会<b>覆盖掉隔壁的内存</b>。如果隔壁刚好存着系统的控制指令，黑客就可以利用这一点，接管整台电脑。</div><div>1988 年的“莫里斯蠕虫”，就是利用这个漏洞，瘫痪了整个美国的互联网。</div>',
          variant: "card-primary",
        },
      }
    },

    /* ===== 12 全局变量的魔法 ===== */
    {
      id: 12, type: "compare", title: "局部 vs 全局", subtitle: "大数组到底放哪里？",
      data: {
        neutral: true, splitStep: true, leftLabel: "❌ 错误：开在 main 里", rightLabel: "✅ 正确：开在 main 外",
        groups: [
          { wrong: "<code>int main() {\n  int a[100000];\n}</code>", right: "<code>int a[100000];\nint main() {\n  // 直接使用\n}</code>" },
          { wrong: "空间太小（栈）", right: "空间巨大（数据段）" },
          { wrong: "数组过大直接闪退 (RE)", right: "轻松容纳上百万数据" }
        ],
        footer: '<b>📌 竞赛铁律</b>：<b>只要数组超过 1000 的大小，统统写在外面！</b>'
      }
    },

    /* ===== 13 练习3：逆序输出 ===== */
    {
      id: 13, type: "level-map", title: "课堂练习3：逆序输出", subtitle: "正着存，倒着取", chapterTag: "第 6 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入 n 个数，将它们逆序输出。<br>输入样例：<code>5\n1 2 3 4 5</code>　输出样例：<code>5 4 3 2 1</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["数组必须先定义在全局", "正序读入：<code>for(i=0; i&lt;n; i++)</code>", "逆序输出：<code>for(i=n-1; i&gt;=0; i--)</code>"],
        answer: { codeFile: "codes/lesson-06/reverse.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "正着存进去，倒着取出来。<br>这是数组最基础的应用，完美体现了“下标可以随意控制”的优势。" },
      },
    },

    /* ===== 14 思维拓展：计数数组 ===== */
    {
      id: 14, type: "code-split", title: "思维拓展：计数数组", subtitle: "把数值当成下标", 
      data: {
        intro: "📖 如果给你一堆 0~9 之间的数字，让你统计每个数字出现了几次，怎么做？<br>高级玩法：把数字本身当作<b>数组的下标</b>。",
        codeFile: "codes/lesson-06/count.cpp", snippet: "main",
        annotations: [
          { line: 3, title: "int count[10] = {0};", desc: "开一个大小为 10 的桶，并且全部清零" },
          { line: 5, title: "cin >> x;", desc: "读入一个数字，假设 x = 3" },
          { line: 6, title: "count[x]++;", desc: "把 3 当作下标，<code>count[3]</code> 的数量加 1" },
        ],
        output: "（输入：1 3 1 2 1）\n1出现了3次\n2出现了1次\n3出现了1次",
        extra: {
          title: "💡 知识扩展 · 热搜榜是怎么算出来的？",
          desc: '<div>你看微博或抖音的“热搜榜”，它是怎么知道“今天什么词被搜得最多”的？</div><div>本质上，它就是开了一个巨大的「计数数组」。</div><div>每当你搜索一次，程序就把那个词对应的计数 <code>+1</code>。<br>最后按计数值从大到小排个序，这就是热搜榜！<br><br>这也是后面学习排序算法（桶排序）的基石。</div>',
          variant: "card-primary",
        }
      }
    },

    /* ===== 15 初赛小知识 ===== */
    {
      id: 15, type: "grid", title: "初赛小知识：数组内存", subtitle: "CSP-J/S 初赛必考", chapterTag: "第 6 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "📦", title: "连续存储", desc: "数组元素在内存中是<b>连续</b>存放的。<br>这是数组能通过下标瞬间找到元素的原因。" },
          { icon: "💾", title: "计算占用", desc: "如果定义 <code>int a[100];</code><br>占用内存 = 100 × 4 = <b>400 字节</b>。<br>如果定义 <code>char a[100];</code> 则是 100 字节。" },
          { icon: "⚠️", title: "越界后果", desc: "C++ 不会自动检查是否越界。<br>越界可能会覆盖其他变量，或者导致运行错误（RE）。" }
        ]
      }
    },

    /* ===== 16 课堂小测 ===== */
    {
      id: 16, type: "quiz", title: "课堂小测", subtitle: "数组基础与越界", chapterTag: "第 6 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 数组", optionLayout: "horizontal", question: "定义 <code>int a[10];</code> 后，合法的下标范围是？", options: [ { label: "A", text: "1 到 10" }, { label: "B", text: "0 到 10" }, { label: "C", text: "0 到 9", correct: true }, { label: "D", text: "1 到 9" } ], analysis: '大小为 10 的数组，下标从 0 开始，最大下标是 10-1=9。' },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 数组遍历", optionLayout: "two-cols", question: "下面代码的输出是？", questionCode: `int a[3] = {1, 2, 3};\nfor(int i=0; i<3; i++) {\n    cout << a[i] << " ";\n}`, options: [ { label: "A", text: "1 2 3", correct: true }, { label: "B", text: "0 1 2" }, { label: "C", text: "1 2 3 0" }, { label: "D", text: "越界报错" } ], analysis: '循环变量 i 从 0 到 2，正好对应下标 0, 1, 2，输出 1 2 3。' },
          { id: 3, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 数组", optionLayout: "two-cols", question: "在 C++ 中，如果数组越界，编译器一定会报错。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: 'C++ 追求速度，<b>不会</b>做数组越界检查。越界常常不报错，而是导致不可预测的结果或崩溃（RE）。' },
          { id: 4, type: "judge", difficulty: 3, source: "CSP-J 初赛真题练习 · 内存", optionLayout: "two-cols", question: "为了避免大数组导致程序崩溃，通常把大数组定义在 main 函数外面。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: 'main 函数内的局部变量存放在栈区，空间很小。定义在外面的全局变量存放在数据段，空间大得多。' },
        ],
      },
    },

    /* ===== 17 今日总结 ===== */
    {
      id: 17, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "下标从 0 开始，大数组开在门外。", author: "—— 数组第一课口诀",
        points: [ "数组是内存中一段连续的空间", "下标从 0 开始，到 n-1 结束", "配合循环可以批量处理数据", "打擂台算法可以求最值", "大数组一定要开在 main 外面（全局变量）" ],
        highlight: { title: "📌 关键口诀", desc: "数组是个大平层，下标从 0 要记清；大小是 n 取到 n-1，越界崩盘两行泪；大数组，放门外，全局变量救你命。" },
      },
    },

    /* ===== 18 课后作业 ===== */
    {
      id: 18, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P1428", link: "https://www.luogu.com.cn/problem/P1428", desc: "<b>小鱼比可爱</b><br>考察：数组遍历<br>难度：★★" },
          { icon: "🟢", title: "基础 2 · P1046", link: "https://www.luogu.com.cn/problem/P1046", desc: "<b>陶陶摘苹果</b><br>考察：数组与循环<br>难度：★★" },
          { icon: "🔴", title: "挑战 · P2911", link: "https://www.luogu.com.cn/problem/P2911", desc: "<b>牛式</b><br>考察：计数数组思想<br>难度：★★★" },
        ],
      },
    },

    /* ===== 19 下节预告 ===== */
    {
      id: 19, type: "radial", title: "下节预告", subtitle: "第 7 讲 · 字符串基础",
      data: { center: "字符串", items: [ { text: "字符数组" }, { text: "读入与遍历" }, { text: "统计与回文" }, { text: "常用函数" } ] },
    },

    /* ===== 20 答疑时间 ===== */
    {
      id: 20, type: "grid", title: "答疑时间", subtitle: "常见问题 FAQ", chapterTag: "第 6 讲 · 答疑",
      data: {
        cards: [
          { icon: "❓", title: "为什么下标是 0？", desc: "底层原因是内存偏移量，计算机从 0 开始数最快。" },
          { icon: "💥", title: "闪退怎么办？", desc: "检查大数组是不是开在 main 里面了，移到外面即可。" },
          { icon: "🗑️", title: "没赋值时里面是啥？", desc: "如果是局部数组，里面是随机的垃圾值。一定要初始化！" }
        ]
      }
    },

    /* ===== 21 本讲英文单词 ===== */
    {
      id: 21, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 6 讲 · 复习",
      data: {
        words: [
          { word: "array", cn: "数组", pron: "/əˈreɪ/", origin: "英文原意“阵列”", category: "概念" },
          { word: "index", cn: "下标、索引", pron: "/ˈɪndeks/", origin: "英文原意“指示器”", category: "概念" },
          { word: "element", cn: "元素", pron: "/ˈelɪmənt/", origin: "英文原意“要素”", category: "概念" },
          { word: "out of bounds", cn: "越界", pron: "/aʊt əv baʊndz/", origin: "超出边界", category: "概念" },
        ]
      },
    },

    /* ===== 22 知识清单 ===== */
    {
      id: 22, type: "grid", title: "第 6 讲 · 知识清单", subtitle: "一页看完本讲所有重点", chapterTag: "第 6 讲 · 复习",
      data: {
        cards: [
          { icon: "📦", title: "定义与访问", desc: "<code>int a[100];</code> 开空间<br>通过 <code>a[i]</code> 访问<br><b>下标只能 0 到 99</b>" },
          { icon: "🏆", title: "擂台算法", desc: "找最大值/最小值<br>先设 <code>max_val = a[0]</code><br>遍历更新" },
          { icon: "💥", title: "大数组防崩", desc: "开在 <code>main</code> 里面会爆栈闪退。<br><b>必须写在 main 外面（全局）</b>" },
          { icon: "🪣", title: "计数数组", desc: "把数值当成下标<br><code>count[x]++</code><br>桶排序的雏形" },
        ],
      },
    },

    /* ===== 23 结束页 ===== */
    {
      id: 23, type: "ending", title: "第六讲结束", subtitle: "你的程序，从此能装下千军万马", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 批量的力量",
          desc: "从只能存一个数，到能存成千上万个数据，你的程序内存变大了。<br><br>但现在的数组只能装数字。<br>如果我们想存一句话、一个名字呢？<br><br>下一讲，我们将学习一种特殊的数组——<b>字符串</b>。看看计算机是如何处理人类语言的。<br><br>📌 <b>行动号召</b>：去洛谷刷完今天的 3 道题，重点体会“下标从 0 开始”。下节课见！",
          variant: "card-glow"
        }
      },
    },
  ],
};
export default {
  title: "第 7 讲 一维数组",
  subtitle: "一排储物柜，批量装数据",
  total: 23,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    { id: 1, type: "cover", title: "一维数组", subtitle: "一排储物柜，批量装数据", chapterTag: false, data: { accentWord: "数组", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 7 讲"] } },

    /* ===== 2 钩子 ===== */
    {
      id: 2, type: "dialog", title: "50 个变量的噩梦", subtitle: "变量只能存一个，那一批数据怎么办？", chapterTag: "第 7 讲 · 开场",
      data: { lines: [ { who: "student", text: "小 C，老师让我写个程序，输入全班 50 个人的成绩，然后倒序输出。" }, { who: "robot", text: "那你就定义 50 个变量呗：<code>int a1, a2, a3... a50;</code>" }, { who: "student", text: "这也太蠢了吧！如果是全校 1000 个人的成绩呢？" }, { who: "robot", text: "这就是为什么我们需要新武器。变量，只能存<b>一个</b>数据。当数据成群结队时，变量就不够用了。" }, { who: "student", text: "那用什么？" }, { who: "robot", text: "在数学里，如果有一批数据，我们会怎么写？我们会设一个<b>数列</b>：\\( a_1, a_2, a_3 ... a_n \\)。<br>在 C++ 里，这种能一口气装下一批数据的连续空间，叫<b>「数组」</b>。" } ] }
    },

    /* ===== 3 作战地图 ===== */
    {
      id: 3, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "四站闯关，搞定批量数据",
      data: { items: [ { icon: "🧮", badge: "第一站", title: "数列与遍历", desc: "数组的语法", points: ["定义与访问", "配合 for 循环遍历", "避开越界陷阱"] }, { icon: "🏆", badge: "第二站", title: "擂台算法", desc: "求最大值", points: ["经典打擂台", "边界处理", "初始化陷阱"] }, { icon: "💥", badge: "第三站", title: "机房防崩", desc: "大数组急救", points: ["为什么闪退", "全局变量", "栈溢出（RE）"] }, { icon: "💡", badge: "第四站", title: "思维拓展", desc: "计数数组", points: ["把值当下标", "桶的思想", "逆序实战"] } ] }
    },

    /* ===== 4 为什么需要数组 ===== */
    {
      id: 4, type: "origin", title: "为什么需要数组？", subtitle: "从离散变量到连续数列", chapterTag: "第 7 讲 · 概念理解",
      data: { problem: { title: "变量是“单间”，数组是“大平层”", points: ["定义 100 个变量是噩梦，而且无法配合循环。", "数学里的数列，用下标来区分每一项（如 \\(a_5\\)）。", "数组就是内存里连续排布的一段数列。"] }, evolution: [ { icon: "📦", era: "单间", title: "普通变量", desc: "<code>int a = 10;</code> 只能存一个数" }, { icon: "🏢", era: "大平层", title: "数组", desc: "<code>int a[100];</code> 一口气申请 100 个连续座位" }, { icon: "🔁", era: "自动处理", title: "循环 + 数组", desc: "用 <code>for</code> 循环控制下标，自动批量处理" } ], summary: { title: "数组 = 内存里的数学数列", desc: "数组名就是数列的名字，下标就是第几项。<br>有了它，程序才能处理“批量数据”。", code: "int a[5];  // 申请 5 个连续座位\n// 数学里的 a_1, a_2... \n// C++ 里的 a[0], a[1]..." } }
    },

    /* ===== 5 数组定义与访问 ===== */
    {
      id: 5, type: "code-split", title: "数组的定义与初始化", subtitle: "三种常见姿势",
      data: { 
        intro: "📖 <b>语法</b>：<code>类型 数组名[大小];</code><br>访问通过<b>下标</b>：<code>数组名[编号]</code>。<br>开完空间后，怎么往里面塞数据呢？通常有三种方式：", 
        codeFile: "codes/lesson-07/array-basic.cpp", 
        snippet: "main", 
        annotations: [ 
          { line: 6, title: "int a[5];", desc: "<b>方式一：只开空间</b>。如果不赋值，里面装的是随机的垃圾值，必须像下一行那样挨个赋值。" }, 
          { line: 9, title: "int b[3] = {1, 2, 3};", desc: "<b>方式二：大括号初始化</b>。按顺序把 1, 2, 3 塞进 b[0], b[1], b[2]。" }, 
          { line: 10, title: "int c[10] = {0};", desc: "<b>方式三：全部清零</b>。注意！只写一个 0，编译器会自动把剩下所有的位置都填满 0。" } 
        ], 
        output: "10 2 0",
        extra: { desc: '<b>🤔 灵魂拷问</b>：如果数组有 100 个元素，难道我们要写 100 行 <code>a[0]=...; a[1]=...</code> 吗？或者用大括号写 100 个 0？这也太蠢了。这就必须请出上节课学的「循环」了。但在那之前，必须先弄清楚数组的编号规律。', variant: 'flat' }
      }
    },

    /* ===== 6 为什么下标从 0 开始 ===== */
    {
      id: 6, type: "grid", title: "为什么下标从 0 开始", subtitle: "数学与程序的认知差异", chapterTag: "第 7 讲 · 概念理解",
      data: { cards: [ { icon: "📏", title: "偏移量原理", desc: "数组的本质是内存地址的<b>偏移量</b>。<br>你找第 0 个，就是原地不动（偏移 0）。<br>找第 1 个，就是往后偏移 1 格。" }, { icon: "🧮", title: "数学 vs C++", desc: "数学中的数列 \\(a_1, a_2\\) 从 1 开始。<br>C++ 为了追求极致的计算速度，选择了底层物理距离的 0 开始。" }, { icon: "🛡️", title: "保命口诀", desc: "循环写 <code>for(i=0; i&lt;n; i++)</code>。<br><b>大小是 n，下标是 0 到 n-1。</b><br>多写一个 <code>=</code> 就会越界。" } ], extra: { title: "📖 历史趣闻 · C 语言之父的取舍", desc: '<div>1972 年，C 语言之父 <b>丹尼斯·里奇</b> 在设计数组时，做了一个决定：<b>下标从 0 开始</b>。</div><div>为什么？因为当时计算机内存极小，编译器要把代码翻译成机器码。<br>如果数组从 1 开始，每次计算元素位置，CPU 都要多执行一条 <code>减 1</code> 的指令。</div><div>为了让全世界每天运行的几十亿个程序快那么零点几秒，他选择了反人类直觉的 0。<br><b>这就是底层程序员的极致追求。</b></div>', variant: "card-primary" } }
    },

    /* ===== 7 黄金搭档：循环 + 数组 ===== */
    {
      id: 7, type: "code-walkthrough", title: "黄金搭档：循环 + 数组", subtitle: "怎么把数据成批装进柜子？", chapterTag: "第 7 讲 · 概念理解",
      data: { 
        intro: "📖 <b>任务需求</b>：读入 5 个数字，原样输出。<br>怎么做？<b>用一个循环负责存，另一个循环负责取</b>。看程序是怎么一步步跑起来的：", 
        codeFile: "codes/lesson-07/array-loop.cpp", 
        snippet: "main", 
        steps: [ 
          { title: "1. 准备柜子", line: 7, vars: { n: "5", "a": "[ ]" }, note: "首先读入 <code>n=5</code>。<br>然后申请一个大小为 100 的数组（留足余量），准备装数据。" }, 
          { title: "2. 循环存数据", line: 11, vars: { i: "0", "a[0]": "1" }, note: "进入第一个 <code>for</code> 循环。<br>当 <code>i=0</code> 时，读入第一个数 <code>1</code>，存入 <code>a[0]</code>。" }, 
          { title: "3. 存满 5 个", line: 11, vars: { i: "4", "a": "[1, 2, 3, 4, 5]" }, note: "循环不断推进，直到 <code>i=4</code>，把第 5 个数 <code>5</code> 存入 <code>a[4]</code>。<br>此时，所有的数据都稳稳地装在柜子里了。" }, 
          { title: "4. 循环取数据", line: 15, vars: { i: "0", "输出": "1 " }, note: "进入第二个 <code>for</code> 循环。<br><code>i</code> 重新从 0 开始，把 <code>a[0]</code> 到 <code>a[4]</code> 里的数据依次拿出来打印。" } 
        ], 
        output: "（输入 5 个数：1 2 3 4 5）\n1 2 3 4 5",
        extra: { desc: '<b>📌 套路总结</b>：用数组配合循环时，通常都是“一个循环负责 <code>cin</code> 存数据，另一个循环负责 <code>cout</code> 取数据”。这就是批量处理数据的终极公式！', variant: 'flat' }
      }
    },

    /* ===== 8 练习1：遍历数组 ===== */
    {
      id: 8, type: "level-map", title: "课堂练习1：遍历数组", subtitle: "输入 5 个数，再原样输出", chapterTag: "第 7 讲 · 实战演练",
      data: { question: { title: "题干", desc: "定义大小为 5 的数组，用循环读入 5 个数，然后再用循环输出这 5 个数。<br>输入样例：<code>1 2 3 4 5</code>　输出样例：<code>1 2 3 4 5</code>", timer: "⏱ 限时 5 分钟" }, hints: ["定义 <code>int a[5];</code>", "用 <code>for</code> 循环控制下标", "注意下标从 0 开始"], answer: { codeFile: "codes/lesson-07/array-loop.cpp", snippet: "main" }, analysis: { title: "📖 解析", desc: "这题简直是刚才演示代码的翻版，只要记住 <code>i</code> 从 0 循环到 4 即可。" } }
    },

    /* ===== 9 冲突：越界的灾难（紧接练习1的反面） ===== */
    {
      id: 9, type: "code-walkthrough", title: "反面教材：数组越界", subtitle: "多写了等号会怎样？", chapterTag: "第 7 讲 · 概念理解",
      data: { 
        intro: "有的同学在做上一题时，按数学习惯写成了 <code>for(i=1; i<=5; i++)</code>。<br>结果运行时发现最后多出一个莫名其妙的乱码，甚至直接闪退。<br>这就是可怕的「数组越界」。看下面这段错误代码：", 
        codeFile: "codes/lesson-07/_error-bound.cpp", 
        snippet: "main", 
        steps: [ 
          { title: "申请空间", line: 6, note: "你申请了 5 个空间。计算机给你的是：第 0、1、2、3、4 号房间。" }, 
          { title: "强行进入", line: 7, vars: { i: "1" }, note: "循环从 i=1 开始，读入 a[1]... 这没问题，1 号房间是合法的。" }, 
          { title: "越界惨案", line: 7, vars: { i: "5" }, note: "当 i=5 时，程序试图读入 <code>a[5]</code>。<b>但是，你的房间只到 4 号！</b><br>a[5] 是别人的地盘，你强行把数据塞进去，把墙挤破了。" }, 
          { title: "未知灾难", line: 7, vars: { i: "5" }, note: "它可能会覆盖别的变量，可能会输出乱码，甚至可能直接导致程序崩溃（RE）。" } 
        ], 
        extra: { title: "🚨 铁律", desc: "<div>在 C++ 中，如果数组大小是 \(n\)，那么合法的下标是 <b>\(0\) 到 \(n-1\)</b>。</div><div>开 <code>int a[5]</code>，只能用 <code>a[0]</code> 到 <code>a[4]</code>。<br>千万不要越界！</div>", variant: "card-primary" } 
      }
    },

    /* ===== 10 打擂台求最大值 ===== */
    {
      id: 10, type: "code-split", title: "打擂台求最大值", subtitle: "数组 + 循环的黄金组合",
      data: { 
        intro: "📖 既然我们已经能熟练读写数组了，来挑战个经典算法：找最大值。<br><b>打擂台</b>：先让第一个人当擂主，后面的人依次来挑战，谁大谁当新擂主。", 
        codeFile: "codes/lesson-07/max.cpp", 
        snippet: "main", 
        annotations: [ 
          { line: 8, title: "int a[100];", desc: "开一个足够大的数组" }, 
          { line: 9, title: "for (int i = 0; i &lt; n; i++)", desc: "从 0 到 n-1 读入数据" }, 
          { line: 10, title: "int max_val = a[0];", desc: "第 0 个人先站上擂台" }, 
          { line: 11, title: "if (a[i] &gt; max_val)", desc: "如果挑战者比擂主大，换擂主" } 
        ], 
        output: "（输入 5 个数：3 9 2 7 5）\n9" 
      }
    },

    /* ===== 11 练习2：找最大值 ===== */
    {
      id: 11, type: "level-map", title: "课堂练习2：找最大值", subtitle: "打擂台算法", chapterTag: "第 7 讲 · 实战演练",
      data: { question: { title: "题干", desc: "输入一个整数 n，再输入 n 个整数，输出其中的最大值。", timer: "⏱ 限时 6 分钟" }, hints: ["用变量 <code>max_val</code> 记录最大值", "初始值设为 <code>a[0]</code>，不要设为 0", "遍历后面的数，不断更新 max_val"], answer: { codeFile: "codes/lesson-07/max.cpp", snippet: "main" }, analysis: { title: "📖 解析", desc: "为什么 <code>max_val</code> 初始化为 <code>a[0]</code>？<br>如果初始化为 0，当输入的数组全是负数（如 -5 -2 -9）时，最大值会错误地输出 0。" } }
    },

    /* ===== 12 冲突②：黑窗口一闪而过 ===== */
    {
      id: 12, type: "pitfall", title: "机房最绝望的报错：黑窗口一闪而过", subtitle: "为什么会栈溢出？", chapterTag: "第 7 讲 · 概念理解",
      data: {
        intro: "刚才打擂台时，我们开的是 <code>int a[100]</code>。但真实竞赛题里数据量往往很大。<br>比如题目要求输入 100000 个数据，你顺手在 <code>main</code> 函数里写了 <code>int a[100000];</code>。<br>结果按下运行键，<b>黑窗口竟然直接闪退，什么也不输出！</b>这是为什么？",
        cases: [
          { 
            icon: "💥", 
            scene: "在 main 里面开大数组：<br><code>int a[100000];</code>", 
            what: "程序编译成功，但运行直接闪退，没有任何输出，也没有报错提示。", 
            why: "因为 <code>main</code> 函数的内存（栈）很小，只有几兆。你一口气要了 10 万个座位，栈装不下，直接爆了（栈溢出）。", 
            fix: "把大数组写在 <code>main</code> 的外面（变成全局变量）。" 
          }
        ],
        extra: {
          title: "💀 知识扩展 · 瘫痪半个美国的“莫里斯蠕虫”",
          desc: '<div><b>1988 年</b>，康奈尔大学 23 岁的研究生罗伯特·莫里斯，写了一个只有 <b>99 行</b> 的小代码。</div><div>他利用了当时系统的一个漏洞（<b>缓冲区溢出</b>）：就像系统准备了一个小水桶（数组），他硬生生往里倒了一吨水。多出来的数据覆盖了系统的控制指令，导致程序完全失控，开始疯狂自我复制。</div><div>短短几小时内，全美 10% 的电脑（约 6000 台）瘫痪，损失数千万美元。他也成了美国历史上第一个因黑客行为被联邦定罪的人。</div><div><b>💡 极客反转</b>：但你知道吗？这位老哥后来成为了 <b>MIT（麻省理工学院）的教授</b>，还获得了计算机界的“麦克阿瑟天才奖”。<br><br><b>这就是底层程序的威力——它既能毁灭网络，也能造就天才。</b></div>',
          variant: "card-primary",
        },
      }
    },

    /* ===== 13 全局变量的魔法 ===== */
    {
      id: 13, type: "code-split", title: "全局 vs 局部：到底写在哪？", subtitle: "物理位置决定了内存大小", chapterTag: "第 7 讲 · 概念理解",
      data: { 
        intro: "📖 竞赛里经常说“把数组开到全局”。什么叫全局？其实很简单：<br><b>全局</b>：写在 <code>int main()</code> 的<b>大门外</b>。<br><b>局部</b>：写在 <code>int main()</code> 的<b>屋子里</b>。<br>看下面这段真实的代码结构：", 
        codeFile: "codes/lesson-07/global-vs-local.cpp", 
        snippet: "main", 
        annotations: [ 
          { line: 5, title: "int a[100000];", desc: "<b>全局变量</b>：写在最外面。空间极大，装 10 万个数据毫无压力。" }, 
          { line: 9, title: "int b[10];", desc: "<b>局部变量</b>：写在 main 里面。空间很小，只适合装小数据。" } 
        ], 
        output: "编译通过，顺利运行",
        extra: { desc: '<b>📌 竞赛保命肌肉记忆</b>：如果你记不住原理，就记住一句话——<b>数组统统写在 <code>int main()</code> 的上一行！</b>准没错。', variant: 'flat' }
      }
    },

    /* ===== 14 练习3：逆序输出 ===== */
    {
      id: 14, type: "level-map", title: "课堂练习3：逆序输出", subtitle: "正着存，倒着取", chapterTag: "第 7 讲 · 实战演练",
      data: { 
        question: { title: "题干", desc: "输入 n 个数，将它们逆序输出。<br>输入样例：<code>5\n1 2 3 4 5</code>　输出样例：<code>5 4 3 2 1</code>", timer: "⏱ 限时 6 分钟" }, 
        hints: ["数组必须定义在 main 外面的全局", "正序读入", "逆序输出"], 
        
        steps: [
          {
            title: "思路 1：正着存进去",
            desc: "用常规的 for 循环，从 0 循环到 n-1，把读入的数据挨个存进数组。",
            highlightLines: [11, 12, 13],
            hiddenLines: [16, 17, 18],
            placeholder: "    // 思考：接下来怎么倒着取？"
          },
          {
            title: "思路 2：倒着取出来",
            desc: "下标从 n-1 开始，一直减小到 0（注意条件是 i >= 0）。",
            highlightLines: [16, 17, 18],
            hiddenLines: []
          }
        ],
        
        answer: { codeFile: "codes/lesson-07/reverse.cpp", snippet: "main" }, 
        analysis: { title: "📖 解析", desc: "正着存进去，倒着取出来。<br>注意：数组定义在了 main 外面，防止 n 很大时导致程序崩溃。" } 
      }
    },

    /* ===== 15 思维拓展：计数数组 ===== */
    {
      id: 15, type: "code-split", title: "思维拓展：计数数组", subtitle: "把数值当成下标", 
      data: { 
        intro: "📖 如果给你一堆 0~9 之间的数字，让你统计每个数字出现了几次，怎么做？<br>高级玩法：把数字本身当作<b>数组的下标</b>。", 
        codeFile: "codes/lesson-07/count.cpp", 
        snippet: "main", 
        annotations: [ 
          { line: 6, title: "int count[10] = {0};", desc: "开一个大小为 10 的桶，并且全部清零" }, 
          { line: 9, title: "cin >> x;", desc: "读入一个数字，假设 x = 3" }, 
          { line: 10, title: "count[x]++;", desc: "把 3 当作下标，<code>count[3]</code> 的数量加 1" } 
        ], 
        output: "（输入：1 3 1 2 1）\n1出现了3次\n2出现了1次\n3出现了1次", 
        extra: { title: "💡 知识扩展 · 热搜榜是怎么算出来的？", desc: '<div>你看微博或抖音的“热搜榜”，它是怎么知道“今天什么词被搜得最多”的？</div><div>本质上，它就是开了一个巨大的「计数数组」。</div><div>每当你搜索一次，程序就把那个词对应的计数 <code>+1</code>。<br>最后按计数值从大到小排个序，这就是热搜榜！<br><br>这也是后面学习排序算法（桶排序）的基石。</div>', variant: "card-primary" } 
      }
    },

    /* ===== 16 初赛小知识 ===== */
    {
      id: 16, type: "grid", title: "初赛小知识：数组内存", subtitle: "CSP-J/S 初赛必考", chapterTag: "第 7 讲 · 初赛渗透",
      data: { cards: [ { icon: "📦", title: "连续存储", desc: "数组元素在内存中是<b>连续</b>存放的。<br>这是数组能通过下标瞬间找到元素的原因。" }, { icon: "💾", title: "计算占用", desc: "如果定义 <code>int a[100];</code><br>占用内存 = 100 × 4 = <b>400 字节</b>。<br>如果定义 <code>char a[100];</code> 则是 100 字节。" }, { icon: "⚠️", title: "越界后果", desc: "C++ 不会自动检查是否越界。<br>越界可能会覆盖其他变量，或者导致运行错误（RE）。" } ] }
    },

    /* ===== 17 课堂小测 ===== */
    {
      id: 17, type: "quiz", title: "课堂小测", subtitle: "数组基础与越界", chapterTag: "第 7 讲 · 课堂小测",
      data: { 
        questions: [ 
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 数组", optionLayout: "horizontal", question: "定义 <code>int a[10];</code> 后，合法的下标范围是？", options: [ { label: "A", text: "1 到 10" }, { label: "B", text: "0 到 10" }, { label: "C", text: "0 到 9", correct: true }, { label: "D", text: "1 到 9" } ], analysis: '大小为 10 的数组，下标从 0 开始，最大下标是 10-1=9。' }, 
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 数组遍历", optionLayout: "two-cols", question: "下面代码的输出是？", questionCode: `int a[3] = {1, 2, 3};\nfor(int i=0; i<3; i++) {\n    cout << a[i] << " ";\n}`, options: [ { label: "A", text: "1 2 3", correct: true }, { label: "B", text: "0 1 2" }, { label: "C", text: "1 2 3 0" }, { label: "D", text: "越界报错" } ], analysis: '循环变量 i 从 0 到 2，正好对应下标 0, 1, 2，输出 1 2 3。' }, 
          { id: 3, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 数组", optionLayout: "two-cols", question: "在 C++ 中，如果数组越界，编译器一定会报错。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: 'C++ 追求速度，<b>不会</b>做数组越界检查。越界常常不报错，而是导致不可预测的结果或崩溃（RE）。' }, 
          { id: 4, type: "judge", difficulty: 3, source: "CSP-J 初赛真题练习 · 内存", optionLayout: "two-cols", question: "为了避免大数组导致程序崩溃，通常把大数组定义在 main 函数外面。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: 'main 函数内的局部变量存放在栈区，空间很小。定义在外面的全局变量存放在数据段，空间大得多。' } 
        ] 
      }
    },

    /* ===== 18 今日总结 ===== */
    {
      id: 18, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: { text: "下标从 0 开始，大数组开在门外。", author: "—— 数组第一课口诀", points: [ "数组是内存中一段连续的空间", "下标从 0 开始，到 n-1 结束", "配合循环可以批量处理数据", "打擂台算法可以求最值", "大数组一定要开在 main 外面（全局变量）" ], highlight: { title: "📌 关键口诀", desc: "数组是个大平层，下标从 0 要记清；大小是 n 取到 n-1，越界崩盘两行泪；大数组，放门外，全局变量救你命。" } }
    },

    /* ===== 19 课后作业 ===== */
    {
      id: 19, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: { cards: [ { icon: "🟢", title: "基础 1 · P1428", link: "https://www.luogu.com.cn/problem/P1428", desc: "<b>小鱼比可爱</b><br>考察：数组遍历<br>难度：★★" }, { icon: "🟢", title: "基础 2 · P1046", link: "https://www.luogu.com.cn/problem/P1046", desc: "<b>陶陶摘苹果</b><br>考察：数组与循环<br>难度：★★" }, { icon: "🔴", title: "挑战 · P2911", link: "https://www.luogu.com.cn/problem/P2911", desc: "<b>牛式</b><br>考察：计数数组思想<br>难度：★★★" } ] }
    },

    /* ===== 20 下节预告 ===== */
    {
      id: 20, type: "radial", title: "下节预告", subtitle: "第 8 讲 · 字符串基础",
      data: { center: "字符串", items: [ { text: "字符数组" }, { text: "读入与遍历" }, { text: "统计与回文" }, { text: "常用函数" } ] }
    },

    /* ===== 21 答疑时间 ===== */
    {
      id: 21, type: "grid", title: "答疑时间", subtitle: "常见问题 FAQ", chapterTag: "第 7 讲 · 答疑",
      data: { cards: [ { icon: "❓", title: "为什么下标是 0？", desc: "底层原因是内存偏移量，计算机从 0 开始数最快。" }, { icon: "💥", title: "闪退怎么办？", desc: "检查大数组是不是开在 main 里面了，移到外面即可。" }, { icon: "🗑️", title: "没赋值时里面是啥？", desc: "如果是局部数组，里面是随机的垃圾值。一定要初始化！" } ] }
    },

    /* ===== 22 本讲英文单词 ===== */
    {
      id: 22, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 7 讲 · 复习",
      data: { words: [ { word: "array", cn: "数组", pron: "/əˈreɪ/", origin: "英文原意“阵列”", category: "概念" }, { word: "index", cn: "下标、索引", pron: "/ˈɪndeks/", origin: "英文原意“指示器”", category: "概念" }, { word: "element", cn: "元素", pron: "/ˈelɪmənt/", origin: "英文原意“要素”", category: "概念" }, { word: "out of bounds", cn: "越界", pron: "/aʊt əv baʊndz/", origin: "超出边界", category: "概念" } ] }
    },

    /* ===== 23 知识清单 & 结束页 ===== */
    {
      id: 23, type: "ending", title: "第七讲结束", subtitle: "你的程序，从此能装下千军万马", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 批量的力量",
          desc: "从只能存一个数，到能存成千上万个数据，你的程序内存变大了。<br><br>但现在的数组只能装数字。<br>如果我们想存一句话、一个名字呢？<br><br>下一讲，我们将学习一种特殊的数组——<b>字符串</b>。看看计算机是如何处理人类语言的。<br><br>📌 <b>行动号召</b>：去洛谷刷完今天的 3 道题，重点体会“下标从 0 开始”。下节课见！",
          variant: "card-glow"
        }
      }
    },
  ],
};
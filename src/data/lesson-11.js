export default {
  title: "第 11 讲 二维数组",
  subtitle: "数组的数组，表格的世界",
  total: 22,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "二维数组", subtitle: "数组的数组，表格的世界", chapterTag: false,
      data: { accentWord: "二维数组", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 11 讲"] },
    },

    /* ===== 2 钩子 ===== */
    {
      id: 2, type: "dialog", title: "棋盘与电影院", subtitle: "从一条线到一个面", chapterTag: "第 11 讲 · 开场",
      data: {
        lines: [
          { who: "student", text: "小 C，我想写个五子棋程序，或者像《我的世界》那样的沙盒游戏。棋盘是个 15x15 的方格，怎么用数组存啊？" },
          { who: "robot", text: "你之前学的一维数组，就像排队，是一条直线。你能用一排座位，装下整个电影院的座位吗？" },
          { who: "student", text: "肯定不行啊，电影院有排也有座。" },
          { who: "robot", text: "对，这就是今天要学的<b>二维数组</b>。它不仅能存一条线，还能存一个平面。<br>在游戏里，<b>整张地图、甚至你看到的屏幕像素</b>，在计算机底层全都是二维数组！" },
          { who: "student", text: "那怎么找某一个格子呢？" },
          { who: "robot", text: "就像电影票上写的‘第 3 排第 5 座’。二维数组用两个下标来精确定位：行和列。" },
        ]
      }
    },

    /* ===== 3 作战地图 ===== */
    {
      id: 3, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "四站闯关，踏入二维世界",
      data: {
        items: [
          { icon: "🧱", badge: "第一站", title: "圈地建库（基础）", desc: "从线到面", points: ["定义与访问双下标", "理解行与列的概念"] },
          { icon: "🚶", badge: "第二站", title: "检票巡逻（遍历）", desc: "双重循环", points: ["外行内列走遍全场", "避开循环颠倒迷魂阵"] },
          { icon: "🔪", badge: "第三站", title: "透视内存（底层）", desc: "降维打击", points: ["二维其实是假象", "按行展开的直线"] },
          { icon: "🏆", badge: "第四站", title: "矩阵风暴（实战）", desc: "复杂操作", points: ["矩阵求和与对角线", "转置覆盖惨案", "大数组防爆栈"] },
        ],
      },
    },

    /* ===== 4 从线到面的进化 ===== */
    {
      id: 4, type: "origin", title: "从线到面的进化", subtitle: "二维数组的本质", chapterTag: "第 11 讲 · 概念理解",
      data: {
        problem: {
          title: "一维数组装不下平面数据",
          points: [
            "一维数组：`a[5]` 只有一行。",
            "如果要表示 3 行 4 列的矩阵，一维数组就力不从心了。",
            "我们需要一个带有‘横纵坐标’的容器。",
          ],
        },
        evolution: [
          { icon: "➖", era: "一维", title: "排队", desc: "a[0], a[1], a[2]... 只有一个方向" },
          { icon: "➕", era: "二维", title: "表格", desc: "a[i][j]，i 代表行，j 代表列" },
          { icon: "🌐", era: "多维", title: "立体甚至更高", desc: "三维数组表示空间，四维用于复杂状态" },
        ],
        summary: {
          title: "数组的数组",
          desc: "你可以把二维数组看作：<b>每一行都是一个一维数组，而二维数组就是由这些行组成的数组。</b>",
          code: "// 3 行 4 列\nint a[3][4];\n// 访问第 1 行，第 2 列\na[1][2] = 99;"
        }
      }
    },

    /* ===== 5 定义与访问 ===== */
    {
      id: 5, type: "code-split", title: "定义与访问", subtitle: "圈地建库，先行后列", 
      data: {
        intro: "📖 <b>语法</b>：<code>类型 数组名[行数][列数];</code><br>比如 <code>int a[3][4];</code>，就像向内存申请了一栋 <b>3 层楼、每层 4 个房间</b> 的旅馆。一共有 3×4 = 12 个房间。",
        codeFile: "codes/lesson-11/matrix-def.cpp", snippet: "main",
        annotations: [
          { line: 7, title: "int a[3][4];", desc: "严格注意：<b>先行后列</b>。行数 3，列数 4。" },
          { line: 9, title: "a[1][2] = 99;", desc: "访问第 1 行第 2 列（从 0 开始数，所以合法行是 0~2，列是 0~3）。" },
          { line: 11, title: "cout << a[1][2];", desc: "取出该位置的值。" },
        ],
        output: "99",
        footer: '<b>📌 新手常见死穴</b>：千万不要写成 <code>a[3, 4]</code>。C++ 中必须用两个独立的方括号：<code>a[3][4]</code>。'
      }
    },

    /* ===== 6 二维数组的初始化 ===== */
    {
      id: 6, type: "code-walkthrough", title: "怎么把数据装进去？", subtitle: "二维数组的初始化", chapterTag: "第 11 讲 · 概念理解",
      data: {
        intro: "如果有一万个格子，挨个写 <code>a[0][0]=1</code> 手会断。C++ 允许我们在定义时，用大括号 <code>{}</code> 直接连着格子一起装进去。看代码：",
        codeFile: "codes/lesson-11/matrix-init.cpp", snippet: "main",
        steps: [
          { title: "逐个赋值", line: 6, vars: { "a[0][0]": "1", "a[0][1]": "2" }, note: "最原始的方法，适合通过 cin 动态读入数据。" },
          { title: "整体初始化", line: 9, vars: { "b[0][0]": "1", "b[1][2]": "6" }, note: "外层大括号代表整个矩阵，内层大括号代表每一行。一目了然。" },
          { title: "部分初始化", line: 12, vars: { "c[0][0]": "1", "c[1][1]": "0" }, note: "如果大括号里没写满，剩下的格子会自动被系统填成 <b>0</b>。" }
        ],
        footer: '<b>📌 必杀技</b>：如果数组很大（比如 1000×1000 的地图），千万别手写，直接写 <code>int a[1000][1000] = {0};</code>，一秒钟把所有格子全初始化为 0！'
      }
    },

    /* ===== 7 冲突①：迷魂阵 ===== */
    {
      id: 7, type: "code-walkthrough", title: "眼见为实：双重循环迷魂阵", subtitle: "为什么排成了一列？", chapterTag: "第 11 讲 · 概念理解",
      data: {
        intro: "我们想把一个 2行3列 的矩阵原样打印出来。<br>看这段代码，外层是 j（列），内层是 i（行）。跟着动画看它是怎么跑的：",
        codeFile: "codes/lesson-11/_error-loop-order.cpp", snippet: "main",
        steps: [
          { title: "第一圈开始", line: 9, vars: { j: "0", i: "0" }, note: "外层 j = 0。进入内层，i = 0。<br>打印 <code>a[0][0]</code>，也就是 1。" },
          { title: "内层跑第 2 次", line: 10, vars: { j: "0", i: "1" }, note: "内层 i 变成 1。外层 j 依然是 0！<br>打印 <code>a[1][0]</code>，也就是 4。" },
          { title: "内层跑完", line: 11, note: "内层 i 等于 2，退出内层循环。<br>目前屏幕输出：<code>1 4</code>。这其实是把第 0 列打印出来了。" },
          { title: "第二圈开始", line: 9, vars: { j: "1", i: "0" }, note: "外层 j 变成 1。<br>继续打印第 1 列：<code>a[0][1]</code> 和 <code>a[1][1]</code>，即 2 和 5。" },
          { title: "最终结果", line: 11, note: "屏幕输出：<code>1 4 2 5 3 6</code>。<br>你看，因为 j 在外面，它一列一列地往下走，所以打印出来全是一列列的！" }
        ],
        footer: '<b>📌 怎么改？</b>把外层改成 i（行），内层改成 j（列），这样 i 走一步，j 就横着把一整行跑完。'
      }
    },

    /* ===== 8 揭示①：电影院查票法 ===== */
    {
      id: 8, type: "grid", title: "电影院查票法", subtitle: "外行内列", chapterTag: "第 11 讲 · 概念理解",
      data: {
        cards: [
          { icon: "🎟️", title: "外层：排", desc: "外层循环 <code>i</code> 代表排数。<br>检票员先走到第 1 排。" },
          { icon: "💺", title: "内层：座", desc: "内层循环 <code>j</code> 代表座位号。<br>从第 1 座查到最后一排。" },
          { icon: "🔁", title: "外走一步，内跑一圈", desc: "外层 <code>i</code> 变一次，内层 <code>j</code> 就要从 0 跑到 <code>m-1</code>。" },
          { icon: "🛡️", title: "保命口诀", desc: "<b>外层控行 i，内层控列 j。</b><br>永远先写行循环，再写列循环。" },
        ],
        footer: '<b>📌 正确写法</b>：<br><code>for (int i = 0; i &lt; n; i++) {</code><br><code>&nbsp;&nbsp;for (int j = 0; j &lt; m; j++) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;cout &lt;&lt; a[i][j] &lt;&lt; " ";</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code>'
      }
    },

    /* ===== 9 揭示②：内存里的直线 ===== */
    {
      id: 9, type: "code-split", title: "内存里的直线与省略规则", subtitle: "二维数组是假的？", chapterTag: "第 11 讲 · 概念理解",
      data: {
        intro: "📖 物理内存是一条无限长的直线。二维数组在内存里，是像纸带一样<b>“按行展开”</b>的。<br>正因为如此，C++ 有一个非常奇葩的规定：<b>定义二维数组时，行数可以省，列数绝对不能省！</b>看代码：",
        codeFile: "codes/lesson-11/matrix-omit.cpp", snippet: "main",
        annotations: [
          { line: 4, title: "int a[][4] = {...}", desc: "省略了行数！编译器会自动数大括号里有几行。<br>（这里有两行数据，编译器自动算出是 2 行）" },
          { line: 5, title: "{1, 2, 3, 4},", desc: "第一行。" },
          { line: 6, title: "{5, 6, 7, 8}", desc: "第二行。" },
          { line: 9, title: "int b[2][] = {...};", desc: "❌ 绝对不行！省略列数会直接报错。" },
        ],
        extra: {
          title: "💡 为什么列数绝对不能省？",
          desc: "<div>想象你是一条贪吃蛇，只知道起点。现在要把 8 个苹果切成 2 行，但你不知道每行有几个。</div><div>如果你切了 3 个，那就不成矩阵了。</div><div>计算机在内存里读取二维数组时，必须利用“列数”来算偏移量：<code>偏移量 = i * 列数 + j</code>。<br><b>如果没有列数，计算机就不知道跨过一行需要跨多少步，所以列数是必须的。</b></div>",
          variant: "card-primary"
        },
        footer: '<b>📌 进阶警告</b>：上面这种“省略行数”的写法，初学阶段几乎用不到，它通常出现在给函数传递二维数组时。现在你只需要记住：<b>老老实实把行和列都写上！</b>'
      }
    },

    /* ===== 10 练习1：矩阵求和 ===== */
    {
      id: 10, type: "level-map", title: "课堂练习1：矩阵求和", subtitle: "双重循环遍历实战", chapterTag: "第 11 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入 n 行 m 列的矩阵，求所有元素的和。<br>输入样例：<br><code>2 3</code><br><code>1 2 3</code><br><code>4 5 6</code><br>输出样例：<code>21</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["先读入 n 和 m", "外层循环 i 从 0 到 n-1", "内层循环 j 从 0 到 m-1", "用 <code>sum += a[i][j]</code> 累加"],
        answer: { codeFile: "codes/lesson-11/matrix-sum.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "这是二维数组最基础的遍历。你可以把矩阵想象成一个网格，双重循环就是拿着手电筒，从第一行第一列开始，一个一个照亮所有的格子。" },
      },
    },

    /* ===== 11 冲突②：转置惨案 ===== */
    {
      id: 11, type: "evolution", title: "眼见为实：转置惨案", subtitle: "数据凭空消失？", chapterTag: "第 11 讲 · 概念理解",
      data: {
        intro: "📖 我们来做一个新任务：<b>矩阵转置</b>。就像把一张 Excel 表格的行和列对调。<br>这道题有一个非常苛刻的要求：<b>不能开新数组，必须在原数组上直接交换！</b><br>既然不能开新数组，那我们自然而然会想到：把第 i 行第 j 列的值，和第 j 行第 i 列的值互换，也就是 <code>a[i][j] = a[j][i];</code>。<br>跟着动画看，这会发生什么？",
        codeFile: "codes/lesson-11/_error-transpose.cpp", snippet: "main",
        steps: [
          { focusLines: [10], expression: "初始状态：a[0][1] = 2, a[1][0] = 4", note: "我们要把 2 和 4 换个位置。" },
          { focusLines: [11], expression: "i=0, j=1: a[0][1] = a[1][0]", note: "把 4 赋值给 a[0][1]。<br><b>惨案发生：</b>原来的 2 被 4 覆盖，永远消失了！" },
          { focusLines: [11], expression: "i=1, j=0: a[1][0] = a[0][1]", note: "轮到 i=1, j=0。此时 a[0][1] 已经是 4 了。<br>把 4 赋值给 a[1][0]，结果两个位置全变成了 4。" },
          { focusLines: [17], expression: "最终的矩阵：对称位置全变成了同一个数", note: "因为直接覆盖，原本对称的数据无法完成交换。这就是为什么交换两个变量时，必须引入第三个临时变量（或者只遍历矩阵的一半）。" }
        ],
        extra: {
          title: "💡 怎么正确转置？",
          desc: '<div><b>解法 1（开新数组）</b>：如果题目不限空间，直接用 <code>b[j][i] = a[i][j];</code> 最安全。</div><div><b>解法 2（原地半区遍历）</b>：如果必须原地，<code>for (int i = 0; i < n; i++)</code> 里的内层循环必须改成 <code>for (int j = i + 1; j < n; j++)</code>，只遍历右上半区，配合 <code>swap</code> 交换，就不会发生覆盖。</div>',
          variant: "card-primary"
        }
      }
    },

    /* ===== 12 练习2：对角线求和 ===== */
    {
      id: 12, type: "level-map", title: "课堂练习2：对角线求和", subtitle: "寻找下标的规律", chapterTag: "第 11 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个 n 阶方阵（n 行 n 列），求主对角线和副对角线的元素之和。", timer: "⏱ 限时 8 分钟" },
        hints: ["主对角线：行下标 == 列下标（<code>i == j</code>）", "副对角线：行下标 + 列下标 == n - 1", "可以只用一个双重循环，在循环里用 if 判断"],
        answer: { codeFile: "codes/lesson-11/matrix-diagonal.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "主对角线的规律：行等于列。<br>副对角线的规律：行加列等于边长减一。<br>这两个公式是竞赛中的常客。" },
      },
    },

    /* ===== 13 机房急救：矩阵爆栈 ===== */
    {
      id: 13, type: "pitfall", title: "机房急救：矩阵爆栈", subtitle: "为什么程序又闪退了？", chapterTag: "第 11 讲 · 实战演练",
      data: {
        intro: "一维数组开在 `main` 里可能没事。但如果二维数组开在 `main` 里，非常容易闪退。",
        cases: [
          { icon: "💥", scene: "地图题 / 矩阵题，编译成功但运行直接闪退 (RE)", what: "程序毫无输出，直接结束", why: "在 <code>main</code> 里开了 <code>int a[1005][1005];</code>。它占了 1000x1000x4 字节，约 4MB，直接撑爆了局部变量的栈空间。", fix: "把二维数组写在整个 <code>main</code> 函数的外面（变成全局变量）。" }
        ],
        footer: '<b>📌 铁律</b>：<b>只要数组大于一维，统统开在 main 外面！</b> 反正竞赛里内存不花钱，全局变量不要钱。'
      }
    },

    /* ===== 14 初赛小知识 ===== */
    {
      id: 14, type: "grid", title: "初赛小知识：矩阵内存", subtitle: "CSP-J/S 初赛必考", chapterTag: "第 11 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "💾", title: "计算占用空间", desc: "<code>int a[100][100];</code><br>共 100 x 100 = 10000 个元素。<br>每个 int 占 4 字节。<br>共 40000 字节（约 39 KB）。" },
          { icon: "📏", title: "按行展开计算", desc: "定义 <code>int a[5][6];</code>，那么 <code>a[2][3]</code> 前面有多少个元素？<br>答：2 * 6 + 3 = 15 个（它的下标是 15，是第 16 个元素）。" },
          { icon: "⚠️", title: "越界后果", desc: "二维数组越界同样不会报编译错。<br>可能会覆盖其他行/列的数据，导致难以排查的 Bug。" }
        ],
        footer: '<b>📌 怎么考？</b><br>给你一个二维数组 <code>a[i][j]</code>，问你它的绝对地址/偏移量。套公式 <code>i * 列数 + j</code> 即可。'
      }
    },

    /* ===== 15 课堂小测 ===== */
    {
      id: 15, type: "quiz", title: "课堂小测", subtitle: "二维数组与内存", chapterTag: "第 11 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 二维数组", optionLayout: "horizontal", question: "定义 <code>int a[3][4];</code>，合法的访问是？", options: [ { label: "A", text: "<code>a[3][4]</code>" }, { label: "B", text: "<code>a[2][3]</code>", correct: true }, { label: "C", text: "<code>a[0][4]</code>" }, { label: "D", text: "<code>a[3][0]</code>" } ], analysis: '3 行 4 列，行下标范围 0~2，列下标范围 0~3。A、C、D 都越界了。' },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 遍历", optionLayout: "vertical", question: "下面代码的输出是？", questionCode: `int a[2][2] = {{1, 2}, {3, 4}};\nfor(int i=0; i<2; i++) {\n    for(int j=0; j<2; j++) {\n        cout << a[j][i] << " ";\n    }\n}`, options: [ { label: "A", text: "1 2 3 4" }, { label: "B", text: "1 3 2 4", correct: true }, { label: "C", text: "3 4 1 2" }, { label: "D", text: "4 3 2 1" } ], analysis: '注意输出的是 <code>a[j][i]</code>，行列互换了。<br>当 i=0 时，j 遍历 0,1，输出 a[0][0]=1, a[1][0]=3。<br>当 i=1 时，输出 a[0][1]=2, a[1][1]=4。<br>所以是 1 3 2 4。这其实就是一次转置输出。' },
          { id: 3, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 内存", optionLayout: "two-cols", question: "二维数组在内存中是一维连续存放的（按行排列）。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: '物理内存没有二维结构。二维数组在内存中是按行展开放置的，这也是为什么通过 <code>i * 列数 + j</code> 可以算出它的线性偏移量。' },
        ],
      },
    },

    /* ===== 16 今日总结 ===== */
    {
      id: 16, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "外层控行，内层控列；二维数组，内存直线。", author: "—— 二维数组第一课",
        points: [ "二维数组用双下标访问 a[i][j]", "双重循环必须外层 i（行），内层 j（列）", "原地转置会覆盖数据，需用新数组或半区遍历", "主对角线 i==j，副对角线 i+j==n-1", "二维大数组必须开在 main 外面（全局）" ],
        highlight: { title: "📌 关键口诀", desc: "二维数组像表格，先行后列莫搞错；外行内列双重扣，转置覆盖惹大祸。" },
      },
    },

    /* ===== 17 课后作业 ===== */
    {
      id: 17, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5728", link: "https://www.luogu.com.cn/problem/P5728", desc: "<b>旗鼓相当的对手</b><br>考察：二维数组遍历<br>难度：★★" },
          { icon: "🟢", title: "基础 2 · B2106", link: "https://www.luogu.com.cn/problem/B2106", desc: "<b>矩阵转置</b><br>考察：行列反转<br>难度：★★" },
          { icon: "🔴", title: "挑战 · P2911", link: "https://www.luogu.com.cn/problem/P2911", desc: "<b>牛式</b><br>考察：二维数组、计数<br>难度：★★★" },
        ],
      },
    },

    /* ===== 18 下节预告 ===== */
    {
      id: 18, type: "radial", title: "下节预告", subtitle: "第 12 讲 · 字符串进阶",
      data: { center: "字符串进阶", items: [ { text: "字符串工具箱" }, { text: "substr / find" }, { text: "双指针" }, { text: "回文与匹配" } ] },
    },

    /* ===== 19 答疑时间 ===== */
    {
      id: 19, type: "grid", title: "答疑时间", subtitle: "常见问题 FAQ", chapterTag: "第 11 讲 · 答疑",
      data: {
        cards: [
          { icon: "🔄", title: "为什么 a[i][j] 不能写成 a[i,j]?", desc: "C++ 中中括号是下标运算符，只能放一个参数。如果要表示两个维度，必须用两个中括号分开。" },
          { icon: "💥", title: "为什么矩阵题总超时？", desc: "看看循环是不是套了太多层，或者数据范围是不是到了 \(10^5\) 以上。双重循环是 \(O(n^2)\) 复杂度。" },
          { icon: "🌐", title: "怎么动态开大小？", desc: "可以用 <code>vector<vector<int>></code>，但在信奥初级阶段，我们一般都把数组开得足够大（如 1005x1005）。" },
        ]
      }
    },

    /* ===== 20 本讲英文单词 ===== */
    {
      id: 20, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 11 讲 · 复习",
      data: {
        words: [
          { word: "matrix", cn: "矩阵", pron: "/ˈmeɪtrɪks/", origin: "源自拉丁语 mater（母亲），表示产生其他事物的基础", category: "概念" },
          { word: "row", cn: "行", pron: "/roʊ/", origin: "英文原意“一排”", category: "概念" },
          { word: "column", cn: "列", pron: "/ˈkɑːləm/", origin: "英文原意“柱子”", category: "概念" },
          { word: "transpose", cn: "转置", pron: "/trænˈspoʊz/", origin: "trans (跨越) + pose (放置) = 交叉放置", category: "概念" },
        ]
      },
    },

    /* ===== 21 知识清单 ===== */
    {
      id: 21, type: "grid", title: "第 11 讲 · 知识清单", subtitle: "一页看完本讲所有重点", chapterTag: "第 11 讲 · 复习",
      data: {
        cards: [
          { icon: "🎬", title: "定义与访问", desc: "<code>int a[行][列];</code><br>通过 <code>a[i][j]</code> 访问。<br>行在前，列在后。" },
          { icon: "🔁", title: "双重循环", desc: "外层控行 <code>i</code>，内层控列 <code>j</code>。<br>千万不能写反，否则变成竖排。" },
          { icon: "📏", title: "内存按行展开", desc: "物理内存是直线。<br>下标偏移量 = <code>i * 列数 + j</code>。" },
          { icon: "💥", title: "防崩铁律", desc: "二维大数组绝对不能开在 <code>main</code> 里。<br><b>必须写成全局变量。</b>" },
        ],
      },
    },

    /* ===== 22 结束页 ===== */
    {
      id: 22, type: "ending", title: "第十一讲结束", subtitle: "你的程序，终于有了二维的视野", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 从一维到二维，是思维的跃迁",
          desc: "今天，你掌握了二维数组。这不仅仅是多了一个中括号，而是你处理数据的方式从‘一条线’变成了‘一个面’。<br><br>从此，你可以在代码里画棋盘、画地图、处理图像矩阵。<br><br>下一讲，我们将重新回到字符串，探索字符串的‘工具箱’，看看那些让代码效率翻倍的字符串函数。<br><br>📌 <b>行动号召</b>：去洛谷把 P5728 和 B2106 刷掉。一定要体会‘按行展开’的感觉。",
          variant: "card-glow"
        }
      },
    },
  ],
};
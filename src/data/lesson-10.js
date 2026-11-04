export default {
  title: "第 10 讲 阶段实战",
  subtitle: "第一阶段模拟赛",
  total: 20,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "阶段实战", subtitle: "第一阶段模拟赛", chapterTag: false,
      data: { accentWord: "实战", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 10 讲"] },
    },

    /* ===== 2 作战地图 ===== */
    {
      id: 2, type: "timeline", variant: "map", title: "第一阶段毕业考", subtitle: "从积木到城堡的跨越",
      data: {
        items: [
          { icon: "🧠", badge: "第一站", title: "考场保命法则", desc: "审题与策略", points: ["数据范围预判", "拿部分分策略"] },
          { icon: "✍️", badge: "第二站", title: "限时实战", desc: "真刀真枪做题", points: ["基础题：数组与遍历", "进阶题：大数溢出", "压轴题：搜索与递归"] },
          { icon: "🔍", badge: "第三站", title: "错题复盘", desc: "隐藏测试点揭秘", points: ["当场演示 WA", "抓出代码漏洞"] },
          { icon: "🏆", badge: "第四站", title: "阶段毕业", desc: "迎接算法世界", points: ["知识图谱梳理"] },
        ],
      },
    },

    /* ===== 3 考场三铁律 ===== */
    {
      id: 3, type: "grid", title: "考场三铁律", subtitle: "价值 100 分的保命秘籍", chapterTag: "第 10 讲 · 考场策略",
      data: {
        cards: [
          { icon: "🚫", title: "绝对不交白卷", desc: "如果压轴题写不出最优解，就写个最暴力的 `for` 循环。哪怕只能过 30% 的测试点，也能拿 30 分。在信奥赛，<b>1 分压倒 1000 人</b>。" },
          { icon: "👀", title: "看数据范围预判", desc: "看到 \\(n \\le 10^9\\)，立刻放弃双重循环（必超时），求和必须开 `long long`。数据范围就是题目的‘承重限制’。" },
          { icon: "🧪", title: "样例过了没用", desc: "OJ 会用几万组隐藏数据来搞死你（比如输入 0、全负数、极大值）。写完代码，自己测一下边界数据。" },
        ],
      }
    },

    /* ===== 4 审题与范围预判 ===== */
    {
      id: 4, type: "grid", title: "审题与范围预判", subtitle: "做题前先做这三件事", chapterTag: "第 10 讲 · 考场策略",
      data: {
        cards: [
          { icon: "✂️", title: "提取输入输出", desc: "圈出题目要输入什么，输出什么格式。变量该用 `int` 还是 `string`？" },
          { icon: "📏", title: "看数据范围选类型", desc: "题目说数据 \\(\\le 10^9\\)，求和后可能达 \\(10^{18}\\)，果断用 `long long`。" },
          { icon: "⏱️", title: "算复杂度防超时", desc: "如果 \\(n=10^5\\)，只能写一层循环（\\(O(n)\\)）。双重循环必 TLE。" },
        ],
        footer: '<b>📌 检查清单</b>：读题 -> 看范围 -> 选类型 -> 想边界 -> 敲代码 -> 测样例 -> 测自己构造的极限数据。'
      }
    },

    /* ===== 5 模拟赛开始 ===== */
    {
      id: 5, type: "transition", title: "模拟赛开始", subtitle: "第一题：陶陶摘苹果（15 分钟）",
      data: { note: "请打开 OJ，找到 P1046。不许交头接耳，不许查资料。想象你现在就在 CSP-J 的考场上。" }
    },

    /* ===== 6 实战一：陶陶摘苹果 ===== */
    {
      id: 6, type: "level-map", title: "实战一：陶陶摘苹果", subtitle: "限时 15 分钟，AC 了再看解析", chapterTag: "第 10 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入 10 个苹果的高度，再输入陶陶的身高。陶陶能够到的高度是身高 + 30。求他能摘到几个苹果。<br>（OJ 题号：P1046）", timer: "⏱ 限时 15 分钟" },
        hints: ["遍历 10 个苹果", "判断条件：<code>apples[i] &lt;= height + 30</code>"],
        answer: { codeFile: "codes/lesson-10/practice-apple.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "这题考的是数组遍历和边界判断。<br>注意：如果你把判断写成了 <code>a[i] &lt; height+30</code>，漏了等号，样例可能能过，但提交上去就是 WA！" },
      },
    },

        /* ===== 7 冲突①：为什么样例过了会 WA ===== */
    {
      id: 7, type: "code-walkthrough", title: "为什么样例过了会 WA", subtitle: "评测机没有感情，只看数据", chapterTag: "第 10 讲 · 错题复盘",
      data: {
        intro: "刚才做题时，很多人自信满满交卷，结果 0 分。除了边界，数据范围也是个大坑。<br>我们来看看这段求两数之和的代码，交上去会怎样：",
        codeFile: "codes/lesson-10/_error-int-sum.cpp", snippet: "main",
        steps: [
          { 
            title: "样例测试", 
            line: 8, 
            vars: { a: "10", b: "20", sum: "30" }, 
            note: "假设题目样例是输入 10 和 20。<br>第 8 行执行 <code>sum = 10 + 20</code>，结果是 30。代码完美通过样例。" 
          },
          { 
            title: "隐藏测试点", 
            line: 6, 
            vars: { a: "1000000000", b: "1000000000", sum: "" }, 
            note: "但评测机在后台偷偷输入了两个 10 亿（10 的 9 次方）。变量 a 和 b 被成功读入。" 
          },
          { 
            title: "溢出惨案", 
            line: 8, 
            vars: { a: "1000000000", b: "1000000000", sum: "-294967296" }, 
            note: "执行第 8 行 <code>sum = 10亿 + 10亿</code>，等于 20 亿。<br>但是 int 最大只能存 21 亿多，等等，20 亿没超啊？<br>但如果输入是 <code>20亿 + 20亿</code>，结果就是 40 亿，直接超出 int 上限！<br>最高位的符号位被顶翻，结果变成了一个负数。" 
          },
          { 
            title: "最终结果", 
            line: 9, 
            vars: { sum: "-294967296" }, 
            note: "第 9 行把负数输出。评测机一对比标准答案，直接给你一个冷酷的 <b>WA</b>。" 
          }
        ],
        footer: '<b>📌 教训</b>：只要看到累加、乘积，或者数据大于 10 亿，无脑开 `long long`！'
      }
    },

    /* ===== 8 错题大盘点 ===== */
    {
      id: 8, type: "pitfall", title: "错题大盘点", subtitle: "考场三大杀手", chapterTag: "第 10 讲 · 错题复盘",
      data: {
        cases: [
          { icon: "❌", scene: "答案溢出", what: "用 int 存了超范围的累加和", why: "没看数据范围，或忘记开 long long", fix: "大数计算，全部换成 long long" },
          { icon: "❌", scene: "空格陷阱", what: "读入带空格的句子只读了一半", why: "用了 cin >>，遇到空格就停止", fix: "用 getline(cin, s) 读取一整行" },
          { icon: "❌", scene: "边界少 1", what: "答案总是差一点，或者最后一个测试点错", why: "for 循环里 < 和 <= 写反了", fix: "在草稿纸上代入 n=1 和 n=2，看循环执行几次" }
        ]
      }
    },

    /* ===== 9 实战二：大数求和 ===== */
    {
      id: 9, type: "level-map", title: "实战二：大数求和", subtitle: "限时 15 分钟，不许再犯溢出的错", chapterTag: "第 10 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入 n 个整数（每个可达 \\(10^{18}\\)），求它们的和。<br>输入样例：<code>3\n1000000000 2000000000 3000000000</code>", timer: "⏱ 限时 15 分钟" },
        hints: ["输入进来的数就要用 <code>long long</code> 存", "累加和 <code>sum</code> 也必须用 <code>long long</code>"],
        answer: { codeFile: "codes/lesson-10/practice-big-sum.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "这就是刚才讲的“看数据范围预判”。只要数据范围超过 10 亿，变量类型秒切 <code>long long</code>。" },
      },
    },

    /* ===== 10 实战三：压轴题 ===== */
    {
      id: 10, type: "level-map", title: "实战三：选数", subtitle: "限时 20 分钟，能拿部分分也行", chapterTag: "第 10 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "从 n 个数中挑出 k 个数，使它们的和为素数。求有多少种挑选方案。<br>（洛谷 P1036）", timer: "⏱ 限时 20 分钟" },
        hints: ["从 n 个数里挑，可以选，也可以不选", "这就是递归的搜索树", "准备一个 <code>isPrime</code> 函数"],
        answer: { codeFile: "codes/lesson-10/practice-recurse.cpp", snippet: "main" },
        analysis: { title: "📖 解析 & 思考", desc: "别慌，如果你没做出来，或者只写了一个多重循环，都很正常。<br>看看下一页，我们如何用第 9 讲的递归来解决它。" },
      },
    },

    /* ===== 11 压轴题解析：搜索树 ===== */
    {
      id: 11, type: "code-walkthrough", title: "压轴题解析：选数的搜索树", subtitle: "把选数问题变成二叉树", chapterTag: "第 10 讲 · 压轴精讲",
      data: {
        intro: "📖 题目要求：从 n 个数里挑出 k 个数。<br>怎么挑？我们画出这棵二叉搜索树：",
        code: "// 对于第 i 个数，只有两种选择：\n// 1. 选它，则目前的和 + a[i]，挑的数量 + 1\n// 2. 不选它，则目前的和不变，挑的数量不变",
        steps: [
          { title: "第一层：看第 0 个数", note: "你面临选择：选 a[0] 还是不选 a[0]？这就会产生两个分支。" },
          { title: "第二层：看第 1 个数", note: "无论你上一步怎么选，现在面对 a[1]，你依然面临选或不选。于是分支变成 4 个……" },
          { title: "触底：选够了 k 个", note: "当分支走到选够了 k 个数，我们就停下来，检查它们的和是不是素数。" }
        ],
        footer: '<b>📌 结论</b>：这不就是我们第 9 讲学的<b>递归</b>吗？把这个树用代码写出来，压轴题就秒杀了！'
      }
    },

    /* ===== 12 压轴题：选数代码 ===== */
    {
      id: 12, type: "code-split", title: "压轴题：选数代码", subtitle: "递归与质数判断的完美结合", chapterTag: "第 10 讲 · 压轴精讲",
      data: {
        intro: "📖 看这段代码，`dfs` 函数就是我们刚才画的搜索树。<br>注意它调用了我们第 8 讲写过的 `is_prime` 函数。",
        codeFile: "codes/lesson-10/practice-recurse.cpp", snippet: "main",
        annotations: [
          { line: 18, title: "void dfs(int idx, int cnt, int sum)", desc: "idx：看第几个数；cnt：选了几个；sum：当前的和" },
          { line: 19, title: "if (cnt == k)", desc: "边界条件：选够了 k 个" },
          { line: 26, title: "dfs(idx + 1, cnt + 1, sum + a[idx]);", desc: "分支 1：选当前的数，往下走" },
          { line: 28, title: "dfs(idx + 1, cnt, sum);", desc: "分支 2：不选当前的数，往下走" },
        ],
        output: "（输入：4 3\n3 7 12 19）\n1",
      },
    },

    /* ===== 13 第一阶段知识图谱 ===== */
    {
      id: 13, type: "grid", title: "第一阶段知识图谱", subtitle: "回头看，你已经走了这么远", chapterTag: "第 10 讲 · 复习",
      data: {
        cards: [
          { icon: "📦", title: "存储数据", desc: "变量（int, long long, double, char, bool）<br>数组（一维、二维）<br>字符串（string, getline）" },
          { icon: "🔀", title: "控制流程", desc: "分支（if-else, switch）<br>循环（for, while, break, continue）" },
          { icon: "⚙️", title: "代码复用", desc: "函数（参数、返回值、作用域）<br>递归（边界、调用栈）" },
          { icon: "🛠️", title: "算法思想", desc: "打擂台（求最值）<br>枚举（遍历所有可能）<br>搜索树（选或不选）" },
        ],
      }
    },

    /* ===== 14 课堂小测 ===== */
    {
      id: 14, type: "quiz", title: "课堂小测", subtitle: "综合逻辑分析", chapterTag: "第 10 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 3, source: "CSP-J 初赛模拟题 · 数据范围", optionLayout: "vertical", question: "题目要求输入 \\(n\\) (\\(n \\le 10^5\\)) 个数字，求它们的和。以下哪种做法最可能拿到满分？", options: [ { label: "A", text: "定义 int 数组，用双重循环求和" }, { label: "B", text: "定义 int 变量 sum 累加" }, { label: "C", text: "定义 long long 变量 sum 累加", correct: true }, { label: "D", text: "定义 double 变量 sum 累加" } ], analysis: '数据范围 \\(10^5\\)，且数字可能很大，累加和极可能超过 21 亿，所以必须用 <code>long long</code>。而且用一层循环累加即可，无需数组。' },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 初赛真题 · 递归边界", optionLayout: "vertical", question: "在压轴题的 dfs 递归中，为什么需要 `if (idx >= n) return;` 这个条件？", options: [ { label: "A", text: "为了防止 cnt 超过 k" }, { label: "B", text: "为了防止数组访问越界，导致 RE", correct: true }, { label: "C", text: "为了提高运行速度" }, { label: "D", text: "不加也能跑" } ], analysis: '如果没有这个条件，当 <code>idx</code> 走到 n 之后，还会继续访问 <code>a[n]</code>，导致数组越界或死循环。' },
          { id: 3, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 基础", optionLayout: "two-cols", question: "在考场上，如果实在想不出题目怎么做，放弃交白卷是最好的选择。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: '交白卷 0 分。如果写一个暴力枚举，可能拿 30 分。竞赛的每一分都很重要！' },
        ],
      },
    },

    /* ===== 15 阶段毕业总结 ===== */
    {
      id: 15, type: "quote", title: "阶段毕业总结", subtitle: "从代码小白，到算法门徒", 
      data: {
        text: "你们已经掌握了与计算机对话的所有基础词汇。", author: "—— 第一阶段毕业寄语",
        points: [ "从只会输出 Hello World 到能处理复杂逻辑", "从单打独斗的代码到封装函数与递归", "学会了在考场上怎么保命，怎么拿分" ],
        highlight: { title: "🔮 下一站：真正的算法世界", desc: "今天你发现了，暴力枚举有时候会超时（TLE）。<br>如果数据量是 10 万，双重循环跑一秒钟要一亿次操作，直接死机。<br>下一讲，我们将学习人类智慧的结晶：<b>排序</b>。让你知道什么是真正的算法降维打击。" },
      },
    },

    /* ===== 16 下节预告 ===== */
    {
      id: 16, type: "radial", title: "下节预告", subtitle: "第 11 讲 · 二维数组",
      data: { center: "二维数组", items: [ { text: "表格的世界" }, { text: "双重循环遍历" }, { text: "矩阵求和" }, { text: "转置与对角线" } ] },
    },

    /* ===== 17 答疑时间 ===== */
    {
      id: 17, type: "grid", title: "答疑时间", subtitle: "考后复盘 FAQ", chapterTag: "第 10 讲 · 互动",
      data: {
        cards: [
          { icon: "💥", title: "为什么总是 TLE？", desc: "算一下你的代码执行了多少次。如果超过 10 的 8 次方，大概率超时，必须换算法。" },
          { icon: "❓", title: "选数还能怎么优化？", desc: "今天讲的是最基础的 DFS。后面学了搜索剪枝，这题会跑得更快。" },
          { icon: "🔢", title: "怎么快速判素数？", desc: "今天用的 \\(O(\\sqrt{n})\\) 的方法。以后会学埃氏筛，能在 1 秒内筛出 1 亿以内的所有素数。" },
        ]
      }
    },

    /* ===== 18 本讲英文单词 ===== */
    {
      id: 18, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 10 讲 · 复习",
      data: {
        words: [
          { word: "WA", cn: "答案错误", pron: "/dʌbljuː eɪ/", origin: "Wrong Answer 的缩写", category: "概念" },
          { word: "TLE", cn: "运行超时", pron: "/tiː el iː/", origin: "Time Limit Exceeded 的缩写", category: "概念" },
          { word: "RE", cn: "运行错误", pron: "/ɑːr iː/", origin: "Runtime Error 的缩写", category: "概念" },
          { word: "DFS", cn: "深度优先搜索", pron: "/diː ef es/", origin: "Depth-First Search 的缩写", category: "概念" },
        ]
      },
    },

    /* ===== 19 知识清单 ===== */
    {
      id: 19, type: "grid", title: "第 10 讲 · 知识清单", subtitle: "考场必备常识", chapterTag: "第 10 讲 · 复习",
      data: {
        cards: [
          { icon: "📏", title: "看范围预判", desc: "数据 \\(\\le 10^9\\)，用 <code>long long</code>。<br>数据 \\(\\le 10^5\\)，只能单层循环。" },
          { icon: "🧪", title: "测边界", desc: "样例过了没用。<br>一定要测 0、负数、极大值。" },
          { icon: "🚫", title: "不交白卷", desc: "不会最优解，就写暴力枚举。<br>拿部分分也是胜利。" },
          { icon: "🌳", title: "搜索树建模", desc: "选数问题 = 递归。<br>选或不选 = 二叉树。" },
        ],
      }
    },

    /* ===== 20 结束页 ===== */
    {
      id: 20, type: "ending", title: "第十讲结束", subtitle: "新手村通关，真正的冒险即将开始", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 祝贺你，完成了第一阶段",
          desc: "回望第一讲，你连 `Hello World` 都敲得小心翼翼。<br>现在，你不仅掌握了变量、循环、数组、函数，甚至用递归解决了一道复杂的搜索题。<br><br>这十节课，你打下的是最坚实的地基。<br>下一阶段，我们正式进入‘算法入门’。你将学到让程序效率翻倍的魔法——排序与查找。<br><br>📌 <b>行动号召</b>：今天没有新作业，去把你做错的题，重新写一遍，写到全对为止！",
          variant: "card-glow"
        }
      },
    },
  ],
};
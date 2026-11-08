export default {
  title: "第 9 讲 递归",
  subtitle: "函数调用自己",
  total: 22,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "递归", subtitle: "函数调用自己", chapterTag: false,
      data: { accentWord: "递归", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 9 讲"] },
    },

    /* ===== 2 钩子 ===== */
    {
      id: 2, type: "dialog", title: "洗盘子的分身术", subtitle: "自己召唤自己", chapterTag: "第 9 讲 · 开场",
      data: {
        lines: [
          { who: "student", text: "小 C，老师让我一个人洗 100 个盘子，我会累死的。" },
          { who: "robot", text: "你可以用“分身术”啊。你洗 1 个，然后召唤另一个你，让他去洗剩下的 99 个。" },
          { who: "student", text: "那另一个我岂不是也要洗 99 个？" },
          { who: "robot", text: "他也可以洗 1 个，再召唤第三个你去洗剩下的 98 个呀。" },
          { who: "student", text: "那什么时候是个头？" },
          { who: "robot", text: "直到剩下最后 1 个盘子，最底层的你洗完，任务就结束了，然后接力棒一层层往回传。这就是今天的主角——<b>递归</b>：在函数内部，调用自己。" },
        ]
      }
    },

    /* ===== 3 本讲作战地图 ===== */
    {
      id: 3, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "四站闯关，掌握分身术",
      data: {
        items: [
          { icon: "🛑", badge: "第一站", title: "出口在哪", desc: "递归边界", points: ["没边界会闪退", "数学归纳法"] },
          { icon: "🔄", badge: "第二站", title: "顺序的背叛", desc: "执行流", points: ["前序与后序输出", "看清执行轨迹"] },
          { icon: "🗄️", badge: "第三站", title: "调用栈原理", desc: "底层机制", points: ["先进后出", "内存压栈与出栈"] },
          { icon: "🏆", badge: "第四站", title: "降维打击", desc: "综合应用", points: ["斐波那契", "汉诺塔"] },
        ],
      },
    },

    /* ===== 4 冲突①：无边界爆栈 ===== */
    {
      id: 4, type: "code-walkthrough", title: "眼见为实：无边界爆栈", subtitle: "为什么黑窗口闪退了？", chapterTag: "第 9 讲 · 概念理解",
      data: {
        intro: "我们来写一个阶乘的递归函数。规律是 <code>n * f(n-1)</code>。<br>敲一下这段代码，看看会发生什么：",
        codeFile: "codes/lesson-10/_error-no-boundary.cpp", snippet: "main",
        steps: [
          { title: "开始召唤", line: 2, note: "调用 f(5)。" },
          { title: "无限分身", line: 3, note: "f(5) 召唤 f(4)，f(4) 召唤 f(3)……" },
          { title: "机房惨案", line: 3, note: "因为没写什么时候停止，程序一直在召唤。最终把内存挤爆，黑窗口直接闪退（RE）。" }
        ],
        footer: '<b>📌 切记</b>：写递归，第一件事不是写公式，而是写<b>停止的条件（边界）</b>。'
      }
    },

    /* ===== 5 递归边界与归纳法 ===== */
    {
      id: 5, type: "grid", title: "递归边界与归纳法", subtitle: "没有出口就没有递归", chapterTag: "第 9 讲 · 概念理解",
      data: {
        cards: [
          { icon: "🚪", title: "边界（出口）", desc: "明确告诉函数什么时候停下。如阶乘里：<code>if (n == 1) return 1;</code>。这是递归的基石。" },
          { icon: "🧮", title: "数学归纳法", desc: "递归的逻辑同构。你要证明 \\(n=1\\) 成立（边界），还要证明能从 \\(n=k\\) 推到 \\(n=k+1\\) 成立（递归关系）。" },
          { icon: "🪆", title: "剥洋葱", desc: "边界就是洋葱的最中心。没有最中心，你只能一层层无限剥下去，永远停不下来。" },
        ],
      }
    },

    /* ===== 6 阶乘递归 ===== */
    {
      id: 6, type: "code-split", title: "阶乘的递归实现", subtitle: "标准框架：边界在前，公式在后", 
      data: {
        intro: "📖 这是正确的阶乘递归写法。注意两行核心代码的顺序，绝对不要颠倒。",
        codeFile: "codes/lesson-10/fact-recursive.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "if (n == 1) return 1;", desc: "第一步：写边界（出口）。" },
          { line: 3, title: "return n * f(n - 1);", desc: "第二步：写递归公式（分身）。" },
        ],
        output: "120",
      },
    },

    /* ===== 7 冲突②：顺序的背叛 ===== */
    {
      id: 7, type: "code-walkthrough", title: "眼见为实：顺序的背叛", subtitle: "为什么输出反了？", chapterTag: "第 9 讲 · 概念理解",
      data: {
        intro: "看这段代码，我在递归调用的前面和后面，都写了输出。输入 3，猜猜输出什么？",
        codeFile: "codes/lesson-10/_error-sequence.cpp", snippet: "main",
        steps: [
          { title: "执行前序", line: 3, vars: { n: "3" }, note: "递进时，先打印 3。" },
          { title: "深入底层", line: 4, vars: { n: "2" }, note: "调用 f(2)，打印 2，然后 f(1) 打印 1。" },
          { title: "回归反转", line: 5, vars: { n: "1" }, note: "碰到边界后开始回归。先执行后置输出，由于是出栈顺序，输出变成了 1 2 3。" },
          { title: "最终结果", line: 3, note: "屏幕输出：<code>3 2 1 1 2 3</code>。" }
        ],
        footer: '<b>📌 悬念</b>：为什么前面是倒序，后面是正序？我们需要透视它的执行流。'
      }
    },

    /* ===== 8 降维打击：函数调用栈动画 ===== */
    {
      id: 8, type: "function-call-animation", title: "透视：函数的调用栈", subtitle: "看着动画，理解先递后归", chapterTag: "第 9 讲 · 概念理解",
      data: {
        intro: "不要再死记硬背“V 字形”了。<br>看着右侧的调用栈动画，注意 f(3) 怎么一层层挂起，又怎么一层层带回结果。",
        steps: [
          {
            stack: [{ id: 1, name: "f(3)", vars: { n: 3 }, status: "calling" }],
            line: 6,
            code: "int res = f(3);",
            note: "程序开始，从 main 函数调用 f(3)。此时 f(3) 压入栈底。"
          },
          {
            stack: [
              { id: 1, name: "f(3)", vars: { n: 3 }, status: "idle" },
              { id: 2, name: "f(2)", vars: { n: 2 }, status: "calling" }
            ],
            line: 3,
            code: "return n * f(n - 1); // 3 * f(2)",
            note: "f(3) 执行到第 3 行，发现需要调用 f(2)。f(3) 暂停挂起，f(2) 入栈。"
          },
          {
            stack: [
              { id: 1, name: "f(3)", vars: { n: 3 }, status: "idle" },
              { id: 2, name: "f(2)", vars: { n: 2 }, status: "idle" },
              { id: 3, name: "f(1)", vars: { n: 1 }, status: "calling" }
            ],
            line: 3,
            code: "return n * f(n - 1); // 2 * f(1)",
            note: "f(2) 也需要调用 f(1)。f(2) 暂停，f(1) 入栈。栈越来越深。"
          },
          {
            stack: [
              { id: 1, name: "f(3)", vars: { n: 3 }, status: "idle" },
              { id: 2, name: "f(2)", vars: { n: 2 }, status: "idle" },
              { id: 3, name: "f(1)", vars: { n: 1 }, status: "done", returns: 1 }
            ],
            line: 2,
            code: "if (n == 1) return 1;",
            note: "触底！f(1) 命中边界条件，返回 1。此时 f(1) 准备出栈（绿色）。"
          },
          {
            stack: [
              { id: 1, name: "f(3)", vars: { n: 3 }, status: "idle" },
              { id: 2, name: "f(2)", vars: { n: 2 }, status: "done", returns: 2 }
            ],
            line: 3,
            code: "return n * f(n - 1); // 2 * 1 = 2",
            note: "f(1) 把 1 交给 f(2)。f(2) 算出 2*1=2，f(2) 准备出栈。"
          },
          {
            stack: [
              { id: 1, name: "f(3)", vars: { n: 3 }, status: "done", returns: 6 }
            ],
            line: 3,
            code: "return n * f(n - 1); // 3 * 2 = 6",
            note: "f(2) 把 2 交给 f(3)。f(3) 算出 3*2=6，准备出栈。"
          },
          {
            stack: [],
            line: 6,
            code: "int res = f(3); // res = 6",
            note: "f(3) 返回最终结果 6。栈已清空，程序结束。"
          }
        ],
        footer: '<b>📌 看图总结</b>：先进去的 f(3) 压在底下，后进去的 f(1) 在最上面。出栈时，上面的先出。这就是栈的“先进后出”。'
      }
    },

    /* ===== 9 调用栈原理 ===== */
    {
      id: 9, type: "grid", title: "调用栈原理", subtitle: "为什么会有先进后出", chapterTag: "第 9 讲 · 概念理解",
      data: {
        cards: [
          { icon: "🥞", title: "叠盘子", desc: "调用函数就像叠盘子。f(3) 在最底下，f(1) 在最上面。" },
          { icon: "🛑", title: "触底", desc: "碰到边界后，最上面的 f(1) 最先执行完毕（出栈）。" },
          { icon: "📤", title: "回溯", desc: "f(1) 把结果交给 f(2)，f(2) 把结果交给 f(3)，这叫“回溯”。" },
          { icon: "💥", title: "爆栈", desc: "如果不设边界，盘子一直往上叠，超过了内存限制，就会报错（Stack Overflow）。" },
        ],
      }
    },

    /* ===== 10 练习1：斐波那契 ===== */
    {
      id: 10, type: "level-map", title: "课堂练习1：斐波那契", subtitle: "体验分支递归的重复计算", chapterTag: "第 9 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "斐波那契数列：1, 1, 2, 3, 5, 8...<br>输入 n，求第 n 项。用递归实现。", timer: "⏱ 限时 8 分钟" },
        hints: ["边界：<code>if(n==1 || n==2) return 1;</code>", "公式：<code>return fib(n-1) + fib(n-2);</code>"],
        answer: { codeFile: "codes/lesson-10/fib-recursive.cpp", snippet: "main" },
        analysis: { title: "📖 思考", desc: "如果把 n 设为 40，运行会非常慢。<br>因为 f(3) 会被重复计算无数次。这就是递归的一大缺陷。下一讲《递推》我们会解决这个问题。" },
      },
    },

    /* ===== 11 降维打击：汉诺塔代码 ===== */
    {
      id: 11, type: "code-split", title: "降维打击：汉诺塔", subtitle: "递归最经典的实战", chapterTag: "第 9 讲 · 实战演练",
      data: {
        intro: "📖 汉诺塔的规则：A 柱上有 n 个盘子，要移到 C 柱。<br>用递归的三步走，代码竟然只有 4 行！",
        codeFile: "codes/lesson-10/hanoi.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "if (n == 0) return;", desc: "边界：没有盘子了，就结束。" },
          { line: 3, title: "hanoi(n-1, from, temp, to);", desc: "第一步：把上面 n-1 个盘子，从 A 移到 B（腾位置）。" },
          { line: 4, title: "cout << from << \" -> \" << to;", desc: "第二步：把最底下的大盘子，移到 C。" },
          { line: 5, title: "hanoi(n-1, temp, to, from);", desc: "第三步：把 B 上的 n-1 个盘子，移到 C。" },
        ],
        output: "A -> C\nA -> B\nC -> B\nA -> C\nB -> A\nB -> C\nA -> C",
      },
    },

    /* ===== 12 降维打击：汉诺塔动画 ===== */
    {
      id: 12, type: "hanoi-animation", title: "降维打击：汉诺塔动画", subtitle: "看着动画领悟递归思维", chapterTag: "第 9 讲 · 实战演练",
      data: {
        intro: "不要试图在脑子里模拟盘子怎么移，人类大脑算不过来。<br>看着动画，体会“把 n-1 个盘子当成一个整体交给分身去办”的递归思维。",
        config: { pegs: ["A", "B", "C"], maxDisks: 3 },
        phases: [
          { id: 1, name: "阶段 ①", desc: "把上面 2 个盘移到 B", range: [0, 4] },
          { id: 2, name: "阶段 ②", desc: "把最大盘移到 C", range: [4, 5] },
          { id: 3, name: "阶段 ③", desc: "把 B 上 2 个盘移到 C", range: [5, 8] }
        ],
        steps: [
          { state: { A: [3, 2, 1], B: [], C: [] }, note: "初始：3 个盘都在 A 柱。" },
          { state: { A: [3, 2], B: [], C: [1] }, move: { from: "A", to: "C", disk: 1 }, note: "盘 1：A → C" },
          { state: { A: [3], B: [2], C: [1] }, move: { from: "A", to: "B", disk: 2 }, note: "盘 2：A → B" },
          { state: { A: [3], B: [2, 1], C: [] }, move: { from: "C", to: "B", disk: 1 }, note: "盘 1：C → B（阶段 ① 完成：2 个盘腾到了 B）" },
          { state: { A: [], B: [2, 1], C: [3] }, move: { from: "A", to: "C", disk: 3 }, note: "盘 3：A → C（阶段 ②：最大盘一步到位）" },
          { state: { A: [1], B: [2], C: [3] }, move: { from: "B", to: "A", disk: 1 }, note: "盘 1：B → A（阶段 ③ 开始）" },
          { state: { A: [1], B: [], C: [3, 2] }, move: { from: "B", to: "C", disk: 2 }, note: "盘 2：B → C" },
          { state: { A: [], B: [], C: [3, 2, 1] }, move: { from: "A", to: "C", disk: 1 }, note: "盘 1：A → C（完成！）" }
        ],
        footer: '<b>📌 递归思维</b>：不要去想第一步怎么移，把 2 个盘子当成整体交给递归去办。代码只要 4 行！'
      }
    },

    /* ===== 13 趣味扩展：神话与科幻中的递归 ===== */
    {
      id: 13, type: "grid", title: "🎨 递归的浪漫与恐怖", subtitle: "神话与电影中的递归", chapterTag: "第 9 讲 · 知识讲解",
      data: {
        cards: [
          { icon: "🛕", title: "汉诺塔的终极传说", desc: "传说印度神庙里有三根柱子，神留下了 64 个纯金圆盘。<br>僧侣们日夜不停地移动，当 64 个盘子全部移到另一根柱子时，世界就会毁灭。<br>你知道移完需要多久吗？按一秒移一次算，需要 <b>5849 亿年</b>！比宇宙现在的寿命还要长。" },
          { icon: "🎬", title: "《盗梦空间》的梦中梦", desc: "电影里，主角进入第一层梦，为了偷机密，又进入了第二层梦、第三层梦……<br>这就像极了递归的“层层递进（压栈）”。<br>如果他们不能在底层醒来，就会永远迷失在“递归”里（爆栈）。" },
        ],
        footer: '<b>💡 思想碰撞</b>：递归看似简单，只需调用自己。但当层数变多时，它蕴含的能量和复杂度是呈指数级爆炸的。'
      }
    },

    /* ===== 14 初赛小知识：递归复杂度 ===== */
    {
      id: 14, type: "grid", title: "初赛小知识：递归与复杂度", subtitle: "CSP-J/S 初赛高频考点", chapterTag: "第 9 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "🕒", title: "时间复杂度", desc: "一次递归如果分成两个子问题（如斐波那契），总调用次数是 \\(2^n\\) 级别。<br>这种树形递归极慢，初赛常考计算节点数。" },
          { icon: "💾", title: "空间复杂度", desc: "每次递归都要“挂起”当前变量，占用内存栈。<br>递归深度为 \\(n\\)，空间复杂度就是 \\(O(n)\\)。" },
          { icon: "💥", title: "栈溢出 (Stack Overflow)", desc: "C++ 默认的栈空间只有几 MB。<br>如果递归几千层，内存就会挤爆，直接报错 RE。" },
        ],
        footer: '<b>📌 初赛口诀</b>：递归走 \\(n\\) 层，空间就是 \\(O(n)\\)。要想省空间，循环（递推）最安全。'
      }
    },

    /* ===== 15 课堂小测 ===== */
    {
      id: 15, type: "quiz", title: "课堂小测", subtitle: "递归边界与执行流", chapterTag: "第 9 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 递归", optionLayout: "horizontal", question: "写递归函数时，如果没有写边界条件（出口），会发生什么？", options: [ { label: "A", text: "编译错误" }, { label: "B", text: "无限循环，导致爆栈（RE）", correct: true }, { label: "C", text: "返回 0" }, { label: "D", text: "自动停止" } ], analysis: '没有边界，函数会无限地调用自己，直到把调用栈的内存耗尽，发生运行时错误（Runtime Error）。' },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 执行流", optionLayout: "vertical", question: "已知 <code>void f(int n) { if(n==0) return; f(n-1); cout << n; }</code>，执行 <code>f(3)</code> 输出什么？", options: [ { label: "A", text: "321" }, { label: "B", text: "123", correct: true }, { label: "C", text: "3" }, { label: "D", text: "1" } ], analysis: '输出语句写在递归调用后面。所以是触底（n=0）之后，在回溯的过程中打印的。所以先打印 1，再打印 2，最后打印 3。' },
          { id: 3, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 递归", optionLayout: "two-cols", question: "递归函数在调用自己时，会暂停当前层的执行，等下一层返回后才继续。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: '这就是“挂起”状态，也是调用栈存在的意义。程序必须记住当前执行到哪里，才能在一层层返回时继续往下执行。' },
        ],
      },
    },

    /* ===== 16 今日总结 ===== */
    {
      id: 16, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "先写边界再写公式，小心爆栈，注意回溯。", author: "—— 递归第一课",
        points: [ "递归 = 函数自己调用自己", "必须先写边界条件（出口），否则会爆栈 RE", "递归的执行流是先进后出（V 字形）", "调用栈：把变量压在内存里等待回溯" ],
        highlight: { title: "📌 关键口诀", desc: "递归先找出口，不找出口必爆栈；公式递进莫着急，回溯顺序要看清。" },
      },
    },

    /* ===== 17 课后作业 ===== */
    {
      id: 17, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5739", link: "https://www.luogu.com.cn/problem/P5739", desc: "<b>计算阶乘</b><br>考察：最基础的递归<br>难度：★" },
          { icon: "🟢", title: "基础 2 · P5737", link: "https://www.luogu.com.cn/problem/P5737", desc: "<b>斐波那契数列</b><br>考察：分支递归<br>难度：★★" },
          { icon: "🔴", title: "挑战 · P1036", link: "https://www.luogu.com.cn/problem/P1036", desc: "<b>选数</b><br>考察：递归与搜索（DFS）<br>难度：★★★" },
        ],
      },
    },

    /* ===== 18 下节预告 ===== */
    {
      id: 18, type: "radial", title: "下节预告", subtitle: "第 10 讲 · 阶段实战",
      data: { center: "实战", items: [ { text: "第一阶段模拟赛" }, { text: "综合应用" }, { text: "错题精讲" }, { text: "知识串讲" } ] },
    },

    /* ===== 19 答疑时间 ===== */
    {
      id: 19, type: "grid", title: "答疑时间", subtitle: "常见问题 FAQ", chapterTag: "第 9 讲 · 答疑",
      data: {
        cards: [
          { icon: "🚪", title: "怎么找边界？", desc: "找“最小、最基础”的情况。比如阶乘的 1，斐波那契的 1 和 2，汉诺塔的 0 个盘子。" },
          { icon: "💥", title: "程序闪退了？", desc: "检查是不是没写边界，或者边界永远达不到（比如参数写错方向）。" },
          { icon: "🔄", title: "能不能不用递归？", desc: "可以。有些递归可以用循环（递推）代替，效率还更高。下一讲会对比。" },
        ]
      }
    },

    /* ===== 20 本讲英文单词 ===== */
    {
      id: 20, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 9 讲 · 复习",
      data: {
        words: [
          { word: "recursion", cn: "递归", pron: "/rɪˈkɜːrʒn/", origin: "英文原意“跑回来”", category: "概念" },
          { word: "base case", cn: "基本情况（边界）", pron: "/beɪs keɪs/", origin: "base (基础) + case (情况)", category: "概念" },
          { word: "stack", cn: "栈", pron: "/stæk/", origin: "英文原意“草堆、堆叠”", category: "概念" },
          { word: "overflow", cn: "溢出", pron: "/ˌoʊvərˈfloʊ/", origin: "over (超过) + flow (流动)", category: "概念" },
        ],
      },
    },

    /* ===== 21 知识清单 ===== */
    {
      id: 21, type: "grid", title: "第 9 讲 · 知识清单", subtitle: "一页看完本讲所有重点", chapterTag: "第 9 讲 · 复习",
      data: {
        cards: [
          { icon: "🛑", title: "递归边界", desc: "必须写在最前面。<br>没有边界会导致<b>爆栈（RE）</b>。" },
          { icon: "🔄", title: "执行流", desc: "先递进（压栈），后回归（出栈）。<br>所以前后置代码的执行顺序是反的。" },
          { icon: "🥞", title: "调用栈", desc: "先进后出。底层的值没返回，上层的变量会被挂起保存。" },
          { icon: "🏆", title: "递归应用", desc: "斐波那契（树形递归）<br>汉诺塔（降维拆解）" },
        ],
      },
    },

    /* ===== 22 结束页 ===== */
    {
      id: 22, type: "ending", title: "第九讲结束", subtitle: "你的程序，拥有了降维打击的能力", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 第一阶段的最后一站",
          desc: "今天，你掌握了编程中最具魔法色彩的技能——递归。<br>它能用短短几行代码，解决循环极其难解的问题。<br><br>但是，递归也有它的软肋：重复计算。<br>比如斐波那契，稍微大一点的数字就会慢如蜗牛。<br><br>下一讲，我们将迎来第一阶段的模拟赛。用你学过的变量、分支、循环、数组、函数和递归，去解决真正的竞赛题。<br><br>📌 <b>行动号召</b>：去洛谷把 P5739 和 P5737 刷掉，感受递归的威力。",
          variant: "card-glow"
        }
      },
    },
  ],
};
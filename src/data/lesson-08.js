export default {
  title: "第 8 讲 函数",
  subtitle: "让代码可以复用",
  total: 21,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "函数", subtitle: "让代码可以复用", chapterTag: false,
      data: { accentWord: "函数", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 8 讲"] },
    },

    /* ===== 2 钩子 ===== */
    {
      id: 2, type: "dialog", title: "复制粘贴的灾难", subtitle: "程序员最痛恨的事", chapterTag: "第 8 讲 · 开场",
      data: {
        lines: [
          { who: "student", text: "小 C，老师让我算 3 个圆的面积，我直接复制粘贴公式，搞定了！" },
          { who: "robot", text: "那如果是算 100 个圆呢？" },
          { who: "student", text: "那就……复制 100 次？" },
          { who: "robot", text: "如果有一天，老师让你把 \(\pi\) 的精度从 3.14 改成 3.14159。你难道要把这 100 行代码一行一行全改一遍？" },
          { who: "student", text: "改漏一个就全完了！" },
          { who: "robot", text: "所以，真正的高手绝不做复制粘贴的苦力。我们要把这段计算逻辑“打包”起来，起个名字。这就是今天的主角——<b>函数</b>。" },
        ]
      }
    },

    /* ===== 3 上节回顾 ===== */
    {
      id: 3, type: "timeline", variant: "review", title: "上节课回顾", subtitle: "数组与字符串",
      data: {
        items: [
          { icon: "📦", badge: "数组", title: "批量数据", desc: "连续空间", points: ["0到n-1", "配合for循环"] },
          { icon: "🏆", badge: "算法", title: "打擂台", desc: "求最值", points: ["循环遍历"] },
          { icon: "📜", badge: "字符串", title: "文本处理", desc: "string", points: ["智能卷轴", "getline"] },
          { icon: "🕳️", badge: "急救", title: "输入坑", desc: "幽灵回车", points: ["cin.ignore()"] },
        ],
      },
    },

    /* ===== 4 本讲作战地图 ===== */
    {
      id: 4, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "四站闯关，掌握工程化思维",
      data: {
        items: [
          { icon: "⚙️", badge: "第一站", title: "黑盒加工机", desc: "基础语法", points: ["定义与调用顺序", "形参实参与返回"] },
          { icon: "💥", badge: "第二站", title: "交换惨案", desc: "值传递", points: ["为什么没交换", "复印件的比喻"] },
          { icon: "🛡️", badge: "第三站", title: "势力范围", desc: "作用域", points: ["局部变量", "出了门就销毁"] },
          { icon: "🏆", badge: "第四站", title: "综合实战", desc: "函数封装", points: ["判断质数", "最大公约数"] },
        ],
      },
    },

    /* ===== 5 冲突①：函数顺序报错 ===== */
    {
      id: 5, type: "code-walkthrough", title: "眼见为实：找不到标识符", subtitle: "函数写错位置的下场", chapterTag: "第 8 讲 · 概念理解",
      data: {
        intro: "大家试着写一个打印星号的函数 <code>printStar()</code>。通常我们会先写 <code>main</code>，然后在下面写函数。<br>敲一下这段代码，看看会发生什么：",
        codeFile: "codes/lesson-08/_error-order.cpp", snippet: "main",
        steps: [
          { title: "进入主函数", line: 2, note: "程序从 main 的第一行开始看。" },
          { title: "尝试调用", line: 3, note: "执行到 <code>printStar();</code>。" },
          { title: "编译器罢工", line: 3, note: "报错：<code>'printStar' was not declared in this scope</code>。<br>编译器从第一行往下读，读到此时，它还不知道 printStar 是个什么东西。" }
        ],
        footer: '<b>📌 铁律</b>：C++ 是自上而下编译的。函数<b>必须</b>在调用它的地方前面出现。'
      }
    },

    /* ===== 6 解药：声明与定义 ===== */
    {
      id: 6, type: "grid", title: "声明与定义", subtitle: "提前给编译器打个招呼", chapterTag: "第 8 讲 · 概念理解",
      data: {
        cards: [
          { icon: "🥇", title: "方法一：写最前面", desc: "把整个函数，直接剪贴到 <code>main</code> 函数的上方。<br>这是最常用、最不易出错的办法。" },
          { icon: "🥈", title: "方法二：提前声明", desc: "在 <code>main</code> 前面写一句 <code>void printStar();</code>（带分号）。<br>这叫作“函数声明”，也就是提前给编译器打招呼。" },
          { icon: "📄", title: "为什么要声明？", desc: "对于大工程，代码拆成几个文件时，必须靠头文件里的声明来沟通。" },
        ],
      }
    },

    /* ===== 7 核心揭示：数学映射与黑盒 ===== */
    {
      id: 7, type: "origin", title: "数学映射与黑盒", subtitle: "函数的本质", chapterTag: "第 8 讲 · 概念理解",
      data: {
        problem: {
          title: "函数到底是个什么东西？",
          points: ["数学里我们学过 \(y = f(x)\)，给一个 \(x\)，机器算出 \(y\)。", "C++ 的函数也是一台黑盒加工机。", "你投进去苹果（输入数据），机器吐出果汁（输出结果）。"]
        },
        evolution: [
          { icon: "📥", era: "入口", title: "参数", desc: "机器需要原材料。写 <code>int square(int x)</code> 里的 \(x\) 就是占位符。" },
          { icon: "⚙️", era: "加工", title: "函数体", desc: "大括号里的代码，负责把原材料加工成成品。" },
          { icon: "📤", era: "出口", title: "返回值", desc: "用 <code>return</code> 把成品吐出来。如果是 <code>void</code>，就不吐成品。" },
        ],
        summary: {
          title: "封装 = 一次编写，处处调用",
          desc: "我们不需要知道黑盒里面是怎么算的，只要知道塞进 5，它吐出 25 就行了。",
          code: "int square(int x) {\n    return x * x;\n}"
        }
      }
    },

    /* ===== 8 形参、实参与返回值 ===== */
    {
      id: 8, type: "code-split", title: "形参、实参与返回值", subtitle: "标准写法演示",
      data: {
        intro: "📖 看这段标准的函数代码。<br>定义时的括号里的变量叫<b>形参</b>，调用时传进去的真实数值叫<b>实参</b>。",
        codeFile: "codes/lesson-08/func-basic.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "int square(int x)", desc: "返回类型 int；形参 x" },
          { line: 3, title: "return x * x;", desc: "算出结果并返回。执行到这里，函数立刻结束。" },
          { line: 7, title: "square(a)", desc: "调用函数，a 是实参（真正的材料）。" },
        ],
        output: "25",
        footer: '<b>📌 注意</b>：函数返回类型如果是 <code>int</code>，就<b>必须</b>有 <code>return</code> 返回对应类型。如果是 <code>void</code>，则不需要。'
      },
    },

    /* ===== 9 练习1：判断质数 ===== */
    {
      id: 9, type: "level-map", title: "课堂练习1：判断质数", subtitle: "封装成独立函数", chapterTag: "第 8 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "编写一个函数 <code>bool isPrime(int n)</code>，判断 n 是否为质数。在 main 中读入 n，调用函数，是输出 Yes，否则输出 No。", timer: "⏱ 限时 8 分钟" },
        hints: ["函数返回类型是 <code>bool</code>", "如果是质数，<code>return true;</code>", "主函数里用 <code>if (isPrime(num))</code> 来接"],
        answer: { codeFile: "codes/lesson-08/practice-prime.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "判断质数的逻辑比较复杂，如果直接写在 main 里，会显得很乱。把它封装进 <code>isPrime</code> 后，主函数只要读代码像读英语一样：“如果它是质数，就输出 Yes”。这就是函数让逻辑清晰的作用。" },
      },
    },

    /* ===== 10 冲突②：交换惨案 ===== */
    {
      id: 10, type: "code-walkthrough", title: "眼见为实：交换惨案", subtitle: "为什么函数里改了，外面没变？", chapterTag: "第 8 讲 · 概念理解",
      data: {
        intro: "我们知道怎么交换两个数。现在我们把它封装进一个函数：<br><code>void swap(int a, int b)</code>。<br>大家敲一下看看，x 和 y 到底换了没有？",
        codeFile: "codes/lesson-08/_error-swap.cpp", snippet: "main",
        steps: [
          { title: "初始状态", line: 8, vars: { x: "1", y: "2" }, note: "main 里的 x 和 y。" },
          { title: "调用函数", line: 9, vars: { x: "1", y: "2" }, note: "把 x 和 y 传给 swap 函数。" },
          { title: "见证奇迹", line: 10, vars: { x: "1", y: "2" }, note: "<b>根本没交换！</b>输出依然是 1 2。函数里的交换全白费了。" }
        ],
        footer: '<b>📌 悬念</b>：明明在函数里 a 和 b 已经换了，为什么外面的 x 和 y 稳如泰山？下一页揭晓。'
      }
    },

    /* ===== 11 揭示：复印件的比喻 ===== */
    {
      id: 11, type: "dialog", title: "为什么没交换？", subtitle: "值是“复印件”，不是原件", chapterTag: "第 8 讲 · 概念理解",
      data: {
        lines: [
          { who: "student", text: "小 C，见鬼了！函数里明明换了，怎么外面没变？" },
          { who: "robot", text: "因为 C++ 有一个铁律：默认的参数传递叫<b>值传递</b>。" },
          { who: "student", text: "什么叫值传递？" },
          { who: "robot", text: "当你写 <code>swap(x, y)</code> 时，C++ 并不是把 x 和 y 送进函数，而是<b>复印了一份</b>送进去。函数里换的，是那两张复印件！" },
          { who: "student", text: "那原件呢？" },
          { who: "robot", text: "原件还在 <code>main</code> 里好好的。函数是个封闭的黑盒，它只能通过 <code>return</code> 把结果送出来，没法直接插手外面的变量。" },
          { who: "student", text: "原来如此，难怪平时听到大佬说“传地址”或者“传引用”，原来是为了把原件送进去！" },
        ],
        extra: {
          title: "🔮 超纲魔法：看清两个变量",
          desc: "<div>如果老师用 <code>cout &lt;&lt; &x;</code> 打印 x 的内存地址，你会发现 main 里的 x 和函数里的 a，它们的门牌号完全不同。</div><div>它们根本不在同一个房间！这就是为什么换不了。</div><div>怎么解决？学到指针和引用时，我们就能打破这个限制（第 27 讲会学）。现在只需要记住“传参传的是复印件”。</div>",
          variant: "card-primary"
        }
      }
    },

    /* ===== 12 作用域与局部变量 ===== */
    {
      id: 12, type: "code-split", title: "作用域与局部变量", subtitle: "出了门就销毁", chapterTag: "第 8 讲 · 概念理解",
      data: {
        intro: "📖 既然函数是黑盒，那在函数里定义的变量，出了函数还能用吗？<br>答案是：不能。函数里的变量叫<b>局部变量</b>，它只在函数内部存活。",
        codeFile: "codes/lesson-08/func-scope.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "int global_num = 100;", desc: "定义在所有函数外面，叫全局变量，谁都能用。" },
          { line: 5, title: "int local_num = 10;", desc: "定义在函数里，叫局部变量，出了函数就死掉。" },
          { line: 11, title: "testScope();", desc: "调用函数，里面能成功访问全局和局部的变量。" },
        ],
        output: "函数内： 10 100",
        footer: '<b>📌 机房急救</b>：如果在 main 里尝试打印 local_num，编译器会报错“未定义”。因为它在 testScope 的大括号结束时就已经被销毁了。'
      },
    },

    /* ===== 13 练习2：最大公约数 ===== */
    {
      id: 13, type: "level-map", title: "课堂练习2：最大公约数", subtitle: "GCD 封装实战", chapterTag: "第 8 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "编写一个函数 <code>int gcd(int a, int b)</code>，返回 a 和 b 的最大公约数。输入两个数，调用函数输出结果。", timer: "⏱ 限时 10 分钟" },
        hints: ["用辗转相除法：不断用除数除以余数", "函数返回类型是 <code>int</code>", "在 main 里写 <code>cout << gcd(x, y);</code>"],
        answer: { codeFile: "codes/lesson-08/func-gcd.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "辗转相除法是经典的数学算法。把它封装成 gcd 函数后，你在任何地方想要算最大公约数，只需喊一声 <code>gcd(a,b)</code> 即可。" },
      },
    },

    /* ===== 14 初赛小知识 ===== */
    {
      id: 14, type: "grid", title: "初赛小知识：函数与栈", subtitle: "CSP-J/S 初赛常考", chapterTag: "第 8 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "🆚", title: "声明 vs 定义", desc: "声明只有头，带分号（<code>int f(int a);</code>）。<br>定义有大括号实现的代码块。" },
          { icon: "📏", title: "返回类型", desc: "无返回值用 <code>void</code>。<br>有返回值的函数，执行到 <code>return</code> 立刻结束。" },
          { icon: "🧱", title: "变量作用域", desc: "局部变量在函数内生效，全局变量在整个程序生效。如果同名，局部优先。" },
          { icon: "🗄️", title: "调用栈（暗线）", desc: "函数调用本质是入栈和出栈。这就是为什么局部变量出了函数就被销毁。" },
        ],
      }
    },

    /* ===== 15 课堂小测 ===== */
    {
      id: 15, type: "quiz", title: "课堂小测", subtitle: "函数、传参与作用域", chapterTag: "第 8 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 函数", optionLayout: "horizontal", question: "函数定义在 main 函数之后，若要在 main 中调用，必须做什么？", options: [ { label: "A", text: "把函数移到 main 前面" }, { label: "B", text: "在 main 前进行函数声明", correct: true }, { label: "C", text: "不用管，直接调用" }, { label: "D", text: "在 main 里声明" } ], analysis: '或者在 main 前写声明，或者把整个函数定义写在 main 前。这是必修的工程规范。' },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 值传递", optionLayout: "vertical", question: "已知函数 <code>void func(int x) { x = 100; }</code>，执行 <code>int a = 1; func(a); cout << a;</code> 后输出什么？", options: [ { label: "A", text: "100" }, { label: "B", text: "1", correct: true }, { label: "C", text: "0" }, { label: "D", text: "编译错误" } ], analysis: '函数传入的是 a 的副本（值传递），函数内修改 x 不会影响外面的 a。所以 a 仍然是 1。' },
          { id: 3, type: "judge", difficulty: 3, source: "C++ 信息学奥赛总复习题 · 函数", optionLayout: "two-cols", question: "如果一个函数声明为 <code>int</code> 类型，但在所有执行路径上都没有 <code>return</code> 语句，编译器会直接报错。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: '非 void 函数如果没有 return 语句返回有效值，会引发未定义行为，现代编译器通常会给出警告或报错，这属于致命错误。' },
        ],
      },
    },

    /* ===== 16 今日总结 ===== */
    {
      id: 16, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "把重复的逻辑打包，让代码像搭积木一样。", author: "—— 函数第一课",
        points: [ "函数 = 数学映射 f(x)=y", "必须写在 main 前面（或提前声明）", "传参默认是值传递（传复印件）", "局部变量出了函数就销毁" ],
        highlight: { title: "📌 关键口诀", desc: "重复代码要封装，函数写在 main 上；参数只是复印件，要想改它得传址。" },
      },
    },

    /* ===== 17 课后作业 ===== */
    {
      id: 17, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5735", link: "https://www.luogu.com.cn/problem/P5735", desc: "<b>距离函数</b><br>考察：函数封装、double<br>难度：★" },
          { icon: "🟢", title: "基础 2 · P5737", link: "https://www.luogu.com.cn/problem/P5737", desc: "<b>闰年展示</b><br>考察：函数与判断<br>难度：★★" },
          { icon: "🔴", title: "挑战 · P5738", link: "https://www.luogu.com.cn/problem/P5738", desc: "<b>歌唱比赛</b><br>考察：排序与函数<br>难度：★★★" },
        ],
      },
    },

    /* ===== 18 下节预告 ===== */
    {
      id: 18, type: "radial", title: "下节预告", subtitle: "第 9 讲 · 递归",
      data: { center: "递归", items: [ { text: "函数调用自己" }, { text: "递归边界" }, { text: "汉诺塔" }, { text: "斐波那契" } ] },
    },

    /* ===== 19 答疑时间 ===== */
    {
      id: 19, type: "grid", title: "答疑时间", subtitle: "常见问题 FAQ", chapterTag: "第 8 讲 · 答疑",
      data: {
        cards: [
          { icon: "🔄", title: "为什么实参没变？", desc: "默认值传递。传的是复印件，改复印件不影响原件。" },
          { icon: "📝", title: "函数名能随便起吗？", desc: "不能跟关键字重名，最好见名知意，驼峰命名法（如 <code>getMax</code>）。" },
          { icon: "🌍", title: "全局变量好用吗？", desc: "如果在函数里改了全局变量，外面也会变。但竞赛中尽量少用，容易引发难以排查的 Bug。" },
        ]
      }
    },

    /* ===== 20 本讲英文单词 ===== */
    {
      id: 20, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 8 讲 · 复习",
      data: {
        words: [
          { word: "function", cn: "函数", pron: "/ˈfʌŋkʃn/", origin: "英文原意“功能”", category: "概念" },
          { word: "return", cn: "返回", pron: "/rɪˈtɜːrn/", origin: "英文原意“返回”", category: "关键字" },
          { word: "parameter", cn: "参数（形参）", pron: "/pəˈræmɪtər/", origin: "英文原意“界限、参数”", category: "概念" },
          { word: "argument", cn: "参数（实参）", pron: "/ˈɑːrɡjumənt/", origin: "英文原意“论点、参数”", category: "概念" },
          { word: "local", cn: "局部的", pron: "/ˈloʊkl/", origin: "英文原意“局部的”", category: "概念" },
        ],
      },
    },

    /* ===== 21 结束页 ===== */
    {
      id: 21, type: "ending", title: "第八讲结束", subtitle: "你的代码，从此有了骨架", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 从流水账到模块化",
          desc: "今天，你学会了把一段代码“打包”成函数。<br>不要小看这个动作，这是你从“写脚本”迈向“软件工程”的第一步。<br><br>但函数还有个最神奇的玩法：<b>一个函数，能不能调用它自己？</b><br>就像两面镜子对照，里面会出现无限个镜子。下一讲，我们就来见识这种如同魔法般的操作——<b>递归</b>。<br><br>📌 <b>行动号召</b>：去洛谷把 P5735 刷掉。体会一下把代码封装成函数的快感。",
          variant: "card-glow"
        }
      },
    },
  ],
};
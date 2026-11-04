export default {
  title: "第 8 讲 函数",
  subtitle: "让代码可以复用",
  total: 29,
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
          { who: "robot", text: "如果有一天，老师让你把 \\(\\pi\\) 的精度从 3.14 改成 3.14159。你难道要把这 100 行代码一行一行全改一遍？" },
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
          { icon: "📦", badge: "第一站", title: "代码打包术", desc: "基础语法", points: ["解决顺序报错", "函数的定义与调用"] },
          { icon: "⚙️", badge: "第二站", title: "黑盒加工机", desc: "数据传输", points: ["原材料（实参）", "成品（返回值）"] },
          { icon: "🛡️", badge: "第三站", title: "黑盒的结界", desc: "核心机制", points: ["复印件调包计（值传递）", "局部变量的生死（作用域）"] },
          { icon: "🏆", badge: "第四站", title: "模块化实战", desc: "综合应用", points: ["质数判断机", "最大公约数"] },
        ],
      },
    },

    /* ===== 5 认识最简单的函数 ===== */
    {
      id: 5, type: "code-split", title: "认识最简单的函数", subtitle: "无参无返回值的函数",
      data: {
        intro: "📖 今天我们要造一个‘黑盒加工机’。第一台机器最简单，它不需要你给原料（无参数），也不给你吐出成品（无返回值），它的任务只是单纯地干一件事。<br>看这段代码：",
        codeFile: "codes/lesson-08/func-basic-void.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "void printStar()", desc: "<code>void</code> 表示“空的”，意思是它不吐出任何结果。括号是空的，表示不需要参数。" },
          { line: 3, title: "{ ... }", desc: "大括号里叫“函数体”，就是这台机器要干的活。" },
          { line: 7, title: "printStar();", desc: "在 main 里喊一声它的名字加括号，机器就启动了！" },
        ],
        output: "*****",
        footer: '<b>📌 总结</b>：定义一个函数，就是给它起个名字，告诉它该干什么（写在大括号里）。'
      }
    },

    /* ===== 6 冲突①：放错位置的尴尬 ===== */
    {
      id: 6, type: "code-walkthrough", title: "眼见为实：放错位置的尴尬", subtitle: "为什么编译器不认识它？", chapterTag: "第 8 讲 · 概念理解",
      data: {
        intro: "刚才的代码跑得很完美，因为你把 <code>printStar()</code> 写在了 <code>main()</code> 的上面。<br>如果你习惯了写流水账，把它写在了 <code>main()</code> 的下面，会发生什么？敲一下看看：",
        codeFile: "codes/lesson-08/_error-order.cpp", snippet: "main",
        steps: [
          { title: "进入主函数", line: 2, note: "程序从 main 的第一行开始看。" },
          { title: "尝试调用", line: 3, note: "执行到 <code>printStar();</code>。" },
          { title: "编译器罢工", line: 3, note: "报错：<code>'printStar' was not declared in this scope</code>。<br>编译器从第一行往下读，读到此时，它还没看到下面有个 printStar 函数。" }
        ],
        footer: '<b>📌 铁律</b>：C++ 是自上而下编译的。函数<b>必须</b>在调用它的地方前面出现。'
      }
    },

    /* ===== 7 解药：声明与定义 ===== */
    {
      id: 7, type: "grid", title: "声明与定义", subtitle: "提前给编译器打个招呼", chapterTag: "第 8 讲 · 概念理解",
      data: {
        cards: [
          { icon: "🥇", title: "方法一：写最前面", desc: "把整个函数，直接剪贴到 <code>main</code> 函数的上方。<br>这是最常用、最不易出错的办法。" },
          { icon: "🥈", title: "方法二：提前声明", desc: "在 <code>main</code> 前面写一句 <code>void printStar();</code>（带分号）。<br>这叫作“函数声明”，也就是提前给编译器打招呼。" },
          { icon: "📄", title: "为什么要声明？", desc: "对于大工程，代码拆成几个文件时，必须靠头文件里的声明来沟通。" },
        ],
      }
    },

    /* ===== 8 核心揭示：数学映射与黑盒 ===== */
    {
      id: 8, type: "origin", title: "数学映射与黑盒", subtitle: "函数的本质", chapterTag: "第 8 讲 · 概念理解",
      data: {
        problem: {
          title: "函数到底是个什么东西？",
          points: ["数学里我们学过 \\(y = f(x)\\)，给一个 \\(x\\)，机器算出 \\(y\\)。", "C++ 的函数也是一台黑盒加工机。", "你投进去苹果（输入数据），机器吐出果汁（输出结果）。"]
        },
        evolution: [
          { icon: "📥", era: "入口", title: "参数", desc: "机器需要原材料。写 <code>int square(int x)</code> 里的 \\(x\\) 就是占位符。" },
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

    /* ===== 9 函数的进阶：带参无返回值 ===== */
    {
      id: 9, type: "code-split", title: "函数的进阶：带参无返回", subtitle: "把数据塞给黑盒", 
      data: {
        intro: "📖 如果我想打印 * 号，但要指定打印几个呢？<br>这就需要让函数接收数据，也就是“参数”。",
        codeFile: "codes/lesson-08/func-params-void.cpp", snippet: "main",
        annotations: [
          { line: 4, title: "void printStar(int n)", desc: "括号里的 <code>int n</code> 叫<b>形参</b>，它就像一个占位符，等待接收具体的数字。" },
          { line: 5, title: "for (int i = 0; i < n; i++)", desc: "在函数里，你可以直接把 <code>n</code> 当成普通变量用。" },
          { line: 10, title: "printStar(3);", desc: "这里的 <code>3</code> 叫<b>实参</b>（真正的材料），把它塞给形参 <code>n</code>。" },
        ],
        output: "***",
        footer: '<b>📌 总结</b>：有参数时，调用必须给括号里传值，且<b>类型要匹配</b>（形参是 int，实参也得是 int）。'
      },
    },

    /* ===== 10 形参、实参与返回值 ===== */
    {
      id: 10, type: "code-split", title: "形参、实参与返回值", subtitle: "标准写法演示",
      data: {
        intro: "📖 看这段标准的函数代码。<br>定义时的括号里的变量叫<b>形参</b>，调用时传进去的真实数值叫<b>实参</b>。",
        codeFile: "codes/lesson-08/func-basic.cpp", snippet: "main",
        annotations: [
          { line: 5, title: "int square(int x)", desc: "返回类型 int；形参 x" },
          { line: 6, title: "return x * x;", desc: "算出结果并返回。执行到这里，函数立刻结束。" },
          { line: 11, title: "square(a)", desc: "调用函数，a 是实参（真正的材料）。" },
        ],
        output: "25",
        footer: '<b>📌 注意</b>：函数返回类型如果是 <code>int</code>，就<b>必须</b>有 <code>return</code> 返回对应类型。如果是 <code>void</code>，则不需要。'
      },
    },

    /* ===== 11 动画：函数调用栈 ===== */
    {
      id: 11, type: "function-call-animation", title: "透视：函数是怎么调用的", subtitle: "看看 main 是如何挂起的", chapterTag: "第 8 讲 · 概念理解",
      data: {
        intro: "当我们在 main 里调用 square(5) 时，内存里到底发生了什么？<br>看右侧的调用栈，注意程序执行的行号变化：",
        steps: [
          {
            stack: [{ id: 1, name: "main()", status: "running" }],
            line: 6, // 👈 改这里
            code: "int result = square(5);",
            note: "main 函数正在运行，准备调用 square(5)。"
          },
          {
            stack: [
              { id: 1, name: "main()", status: "idle" },
              { id: 2, name: "square(5)", vars: { x: 5 }, status: "running" }
            ],
            line: 2,
            code: "return x * x;",
            note: "main 暂停（挂起），square(5) 带着参数 x=5 入栈运行。"
          },
          {
            stack: [
              { id: 1, name: "main()", status: "running" }
            ],
            line: 6, // 👈 改这里
            code: "int result = square(5); // result = 25",
            note: "square 执行完毕，返回 25，出栈。main 恢复运行并拿到了结果。"
          }
        ],
        footer: '<b>📌 结论</b>：函数调用本质就是“压栈”和“出栈”。被调用的函数在栈顶执行，调用者压在底下等待（挂起）。'
      }
    },
    
    /* ===== 12 深入拆解：返回值与 return ===== */
    {
      id: 12, type: "grid", title: "深入拆解：返回值", subtitle: "黑盒是怎么交货的？", chapterTag: "第 8 讲 · 概念理解",
      data: {
        cards: [
          { icon: "📤", title: "return 的作用", desc: "把计算结果从黑盒里扔出来，交给调用者。<br>只要执行到 <code>return</code>，函数立刻结束！" },
          { icon: "📦", title: "返回类型要匹配", desc: "函数名前面的 <code>int</code> 规定了它必须交出一个整数。<br>如果你写 <code>return 3.14;</code> 就会出错。" },
          { icon: "🔁", title: "能用变量接住", desc: "调用者可以用一个变量，把交出来的结果接住：<br><code>int ans = square(5);</code>" },
          { icon: "📢", title: "也能直接使用", desc: "也可以直接把它扔进 cout 里：<br><code>cout << square(5);</code>" },
        ],
      }
    },

    /* ===== 13 练习1：判断质数 ===== */
    {
      id: 13, type: "level-map", title: "课堂练习1：判断质数", subtitle: "封装成独立函数", chapterTag: "第 8 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "编写一个函数 <code>bool isPrime(int n)</code>，判断 n 是否为质数。在 main 中读入 n，调用函数，是输出 Yes，否则输出 No。", timer: "⏱ 限时 8 分钟" },
        hints: ["函数返回类型是 <code>bool</code>", "如果是质数，<code>return true;</code>", "主函数里用 <code>if (isPrime(num))</code> 来接"],
        answer: { codeFile: "codes/lesson-08/practice-prime.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "判断质数的逻辑比较复杂，如果直接写在 main 里，会显得很乱。把它封装进 <code>isPrime</code> 后，主函数只要读代码像读英语一样：“如果它是质数，就输出 Yes”。这就是函数让逻辑清晰的作用。" },
      },
    },

    /* ===== 14 冲突②：交换惨案 ===== */
    {
      id: 14, type: "code-walkthrough", title: "眼见为实：交换惨案", subtitle: "为什么函数里改了，外面没变？", chapterTag: "第 8 讲 · 概念理解",
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

    /* ===== 15 揭示：复印件的比喻 ===== */
    {
      id: 15, type: "dialog", title: "为什么没交换？", subtitle: "值是“复印件”，不是原件", chapterTag: "第 8 讲 · 概念理解",
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

    /* ===== 16 作用域与局部变量 ===== */
    {
      id: 16, type: "code-split", title: "作用域与局部变量", subtitle: "出了门就销毁", chapterTag: "第 8 讲 · 概念理解",
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

    /* ===== 17 揭示：为什么是铺地砖？ ===== */
    {
      id: 17, type: "origin", title: "揭秘：为什么是铺地砖？", subtitle: "把数字变成图形的魔法", chapterTag: "第 8 讲 · 算法揭秘",
      data: {
        problem: {
          title: "先别管代码，回归小学知识",
          points: [
            "求 18 和 12 的公约数，就是找既能整除 18，又能整除 12 的数。",
            "18 的因数：1, 2, 3, 6, 9, 18",
            "12 的因数：1, 2, 3, 4, 6, 12",
            "它们的公共因数（公约数）有：<b>1, 2, 3, 6</b>。最大的那个，就是 <b>6</b>。"
          ]
        },
        evolution: [
          { 
            icon: "📏", 
            era: "思维转换", 
            title: "如果把数字变成长度……", 
            desc: "18 是长，12 是宽。<br>如果边长是 <b>2</b>：18 能由 9 个 2 组成，12 能由 6 个 2 组成。<br>如果边长是 <b>3</b>：18 由 6 个 3，12 由 4 个 3。<br>如果边长是 <b>6</b>：18 由 3 个 6，12 由 2 个 6。" 
          },
          { 
            icon: "🧱", 
            era: "图形映射", 
            title: "这不就是铺地砖吗？", 
            desc: "我们拿一个长 18、宽 12 的长方形房间。<br>拿边长 2 的正方形能铺满（需要 54 块）；<br>拿边长 3 的也能铺满（需要 24 块）；<br>拿边长 6 的正方形也能铺满（只需要 6 块，最省砖！）。" 
          },
          { 
            icon: "🎯", 
            era: "问题等价", 
            title: "终极转化", 
            desc: "<b>求最大公约数，就等价于：要找多大的正方形地砖，能刚好把长 18、宽 12 的房间铺满，且地砖的数量最少（地砖最大）。</b>" 
          }
        ],
        summary: {
          title: "下一步：怎么切出最大的正方形？",
          desc: "既然要找最大的正方形，我们肯定是用房间里最短的边（宽 12）去切。<br>切掉一个 12×12 的大正方形后，剩下一个 12×6 的小长方形。<br>对于这块小长方形，继续切……",
          code: "// 18 % 12 = 6 (切掉 12×12 后，剩下的短边长 6)\n// 12 % 6 = 0  (12×6 的长方形刚好能切成两个 6×6)"
        }
      }
    },

        /* ===== 18 演算：GCD 代码运行轨迹 ===== */
    {
      id: 18, type: "code-walkthrough", title: "眼见为实：切砖轨迹", subtitle: "几何与代码的完美对应", chapterTag: "第 8 讲 · 实战演练",
      data: {
        intro: "把切地砖的过程翻译成代码，它就是一个 while 循环。我们看代码一步步怎么对应的：",
        codeFile: "codes/lesson-08/func-gcd.cpp", snippet: "main",
        steps: [
          { title: "长方形准备", line: 5, vars: { a: "18", b: "12" }, note: "长 18（a），宽 12（b）。程序进入 gcd 函数。" },
          { title: "切第一刀", line: 7, vars: { a: "18", b: "12", r: "6" }, note: "算余数 <code>r = 18 % 12 = 6</code>。<br>这个 6，就是切掉一个 12×12 正方形后，剩下的新长方形的<b>宽</b>。" },
          { title: "长方形旋转", line: 8, vars: { a: "12", b: "6" }, note: "<code>a = b</code>（长变成了原来的 12），<br><code>b = r</code>（宽变成了新剩下的 6）。<br>现在我们要切的，是 12×6 的长方形了！" },
          { title: "切第二刀", line: 7, vars: { a: "12", b: "6", r: "0" }, note: "回到 while 顶部，因为 b 不等于 0，继续切。<br>算余数 <code>r = 12 % 6 = 0</code>。" },
          { title: "循环结束", line: 8, vars: { a: "6", b: "0" }, note: "<code>a = 6</code>，<code>b = 0</code>。宽变成 0 了，循环条件不再满足。" },
          { title: "交出边长", line: 11, vars: { a: "6" }, note: "<code>return a;</code> 把最后那个完美正方形边长 6 交出去。" }
        ],
        footer: '<b>📌 算法之美</b>：古希腊数学家欧几里得在 2000 多年前就发现了这个几何规律。今天，你们用代码重演了这伟大的智慧。'
      }
    },

    /* ===== 19 脑力挑战：自己切一刀 ===== */
    {
      id: 19, type: "grid", title: "脑力挑战：自己切一刀", subtitle: "如果没有电脑，你会算吗？", chapterTag: "第 8 讲 · 实战演练",
      data: {
        cards: [
          { icon: "🧠", title: "挑战题目", desc: "现在，请你不要看代码。用刚才学的“切地砖”原理，在草稿纸上手动推导：<br><b>gcd(48, 18)</b> 的过程。" },
          { icon: "✂️", title: "第一步", desc: "48 和 18。切掉几个 18×18 的正方形？剩下多大的长方形？" },
          { icon: "✂️", title: "第二步", desc: "用剩下的短边继续切，直到刚好切完。最后那个完美正方形的边长是多少？" },
          { icon: "🏆", title: "终极法则", desc: "算完之后，你再去 OJ 上提交刚才的代码。你会发现，无论输入什么，它都在重复你刚才在草稿纸上切砖的动作。" },
        ],
        footer: '<b>📌 课后作业</b>：去洛谷完成 P5735（距离函数）和 P5737（闰年展示）。今天没有新语法，只有对黑盒的深刻理解。'
      }
    },
    /* ===== 20 函数设计法则：所以呢？ ===== */
    {
      id: 20, type: "grid", title: "函数设计法则：所以呢？", subtitle: "学完了坑，以后怎么写好函数？", chapterTag: "第 8 讲 · 概念总结",
      data: {
        cards: [
          { icon: "📦", title: "法则一：靠“参数”进货", desc: "函数要算数据，应该通过参数（实参）传进去，就像把材料塞进机器。" },
          { icon: "📤", title: "法则二：靠“return”出货", desc: "算出的结果，通过 <code>return</code> 交出来。因为传参传的是复印件，你在函数里乱改，外面根本不知道。" },
          { icon: "🛡️", title: "法则三：保护“原变量”", desc: "值传递的好处就是“保护”。你在函数里把参数算得面目全非，外面的原变量依然安好。" },
          { icon: "🧱", title: "法则四：局部变量别越界", desc: "每个函数内部都有自己的变量（局部变量），它们出了门就消失。这防止了不同函数间的变量名冲突（你叫你的 <code>sum</code>，我叫我的 <code>sum</code>，互不干扰）。" },
        ],
        footer: '<b>📌 黄金准则</b>：一个好函数，应该像一个干净的黑盒——<b>传参进去，返回结果出来，绝不在里面偷偷修改外面的大局</b>。'
      }
    },

    /* ===== 21 初赛小知识 ===== */
    {
      id: 21, type: "grid", title: "初赛小知识：函数与栈", subtitle: "CSP-J/S 初赛常考", chapterTag: "第 8 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "🆚", title: "声明 vs 定义", desc: "声明只有头，带分号（<code>int f(int a);</code>）。<br>定义有大括号实现的代码块。" },
          { icon: "📏", title: "返回类型", desc: "无返回值用 <code>void</code>。<br>有返回值的函数，执行到 <code>return</code> 立刻结束。" },
          { icon: "🧱", title: "变量作用域", desc: "局部变量在函数内生效，全局变量在整个程序生效。如果同名，局部优先。" },
          { icon: "🗄️", title: "调用栈（暗线）", desc: "函数调用本质是入栈和出栈。这就是为什么局部变量出了函数就被销毁。" },
        ],
      }
    },

    /* ===== 22 课堂小测 ===== */
    {
      id: 22, type: "quiz", title: "课堂小测", subtitle: "函数、传参与作用域", chapterTag: "第 8 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 函数", optionLayout: "horizontal", question: "函数定义在 main 函数之后，若要在 main 中调用，必须做什么？", options: [ { label: "A", text: "把函数移到 main 前面" }, { label: "B", text: "在 main 前进行函数声明", correct: true }, { label: "C", text: "不用管，直接调用" }, { label: "D", text: "在 main 里声明" } ], analysis: '或者在 main 前写声明，或者把整个函数定义写在 main 前。这是必修的工程规范。' },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 值传递", optionLayout: "vertical", question: "已知函数 <code>void func(int x) { x = 100; }</code>，执行 <code>int a = 1; func(a); cout << a;</code> 后输出什么？", options: [ { label: "A", text: "100" }, { label: "B", text: "1", correct: true }, { label: "C", text: "0" }, { label: "D", text: "编译错误" } ], analysis: '函数传入的是 a 的副本（值传递），函数内修改 x 不会影响外面的 a。所以 a 仍然是 1。' },
          { id: 3, type: "judge", difficulty: 3, source: "C++ 信息学奥赛总复习题 · 函数", optionLayout: "two-cols", question: "如果一个函数声明为 <code>int</code> 类型，但在所有执行路径上都没有 <code>return</code> 语句，编译器会直接报错。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: '非 void 函数如果没有 return 语句返回有效值，会引发未定义行为，现代编译器通常会给出警告或报错，这属于致命错误。' },
        ],
      },
    },

    /* ===== 23 今日总结 ===== */
    {
      id: 23, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "把重复的逻辑打包，让代码像搭积木一样。", author: "—— 函数第一课",
        points: [ "函数 = 数学映射 f(x)=y", "必须写在 main 前面（或提前声明）", "传参默认是值传递（传复印件）", "局部变量出了函数就销毁" ],
        highlight: { title: "📌 关键口诀", desc: "重复代码要封装，函数写在 main 上；参数只是复印件，要想改它得传址。" },
      },
    },

    /* ===== 24 课后作业 ===== */
    {
      id: 24, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5735", link: "https://www.luogu.com.cn/problem/P5735", desc: "<b>距离函数</b><br>考察：函数封装、double<br>难度：★" },
          { icon: "🟢", title: "基础 2 · P5737", link: "https://www.luogu.com.cn/problem/P5737", desc: "<b>闰年展示</b><br>考察：函数与判断<br>难度：★★" },
          { icon: "🔴", title: "挑战 · P5738", link: "https://www.luogu.com.cn/problem/P5738", desc: "<b>歌唱比赛</b><br>考察：排序与函数<br>难度：★★★" },
        ],
      },
    },

    /* ===== 25 下节预告 ===== */
    {
      id: 25, type: "radial", title: "下节预告", subtitle: "第 9 讲 · 递归",
      data: { center: "递归", items: [ { text: "函数调用自己" }, { text: "递归边界" }, { text: "汉诺塔" }, { text: "斐波那契" } ] },
    },

    /* ===== 26 答疑时间 ===== */
    {
      id: 26, type: "grid", title: "答疑时间", subtitle: "常见问题 FAQ", chapterTag: "第 8 讲 · 答疑",
      data: {
        cards: [
          { icon: "🔄", title: "为什么实参没变？", desc: "默认值传递。传的是复印件，改复印件不影响原件。" },
          { icon: "📝", title: "函数名能随便起吗？", desc: "不能跟关键字重名，最好见名知意，驼峰命名法（如 <code>getMax</code>）。" },
          { icon: "🌍", title: "全局变量好用吗？", desc: "如果在函数里改了全局变量，外面也会变。但竞赛中尽量少用，容易引发难以排查的 Bug。" },
        ],
        footer: '<b>🔮 预告</b>：既然值传递是复印件，那如果非要传原件怎么办？<br>后面我们会学「引用传参」（加个 <code>&</code> 符号），甚至「指针」。现在只需要记住值传递的规则即可。'
      }
    },

    /* ===== 27 本讲英文单词 ===== */
    {
      id: 27, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 8 讲 · 复习",
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

    /* ===== 28 知识清单 ===== */
    {
      id: 28, type: "grid", title: "第 8 讲 · 知识清单", subtitle: "一页看完本讲所有重点", chapterTag: "第 8 讲 · 复习",
      data: {
        cards: [
          { icon: "📦", title: "定义与调用", desc: "函数写在 main 前，或提前声明。<br>否则编译器找不到。" },
          { icon: "⚙️", title: "参数与返回", desc: "形参接收，实参传递。<br>返回用 <code>return</code>，碰到即结束。" },
          { icon: "🛡️", title: "值传递", desc: "默认传的是复印件。<br>在函数内修改不影响原变量。" },
          { icon: "🌍", title: "作用域", desc: "局部变量出了函数就销毁。<br>调用栈：先进后出。" },
        ],
      },
    },

    /* ===== 29 结束页 ===== */
    {
      id: 29, type: "ending", title: "第八讲结束", subtitle: "你的代码，从此有了骨架", chapterTag: false,
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
export default {
  title: "第 5 讲 循环结构",
  subtitle: "让程序学会重复",
  total: 24,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "循环结构", subtitle: "让程序学会重复", chapterTag: false,
      data: { accentWord: "循环", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 5 讲"] },
    },

    /* ===== 2 钩子：1 亿次加法怎么算 ===== */
    {
      id: 2, type: "dialog", title: "1 亿次加法怎么算？", subtitle: "人类的极限与机器的魔法", chapterTag: "第 5 讲 · 开场",
      data: {
        lines: [
          { who: "student", text: "小 C，数学课上学过高斯求和，1 加到 100 等于 5050。这有什么稀奇的？" },
          { who: "robot", text: "那如果让你写个程序，把 1 加到 <b>1 亿</b> 呢？" },
          { who: "student", text: "那我得写 1 亿行 <code>cout << 1 + 2 + 3...</code> 吗？手都要断了。" },
          { who: "robot", text: "如果不学今天的内容，你确实只能这样。哪怕你一秒写一行，不吃不喝也要写 3 年。" },
          { who: "student", text: "那计算机怎么算？" },
          { who: "robot", text: "用今天要学的<b>「循环」</b>。只需要 3 行代码，计算机在 <b>0.1 秒</b> 内就能算完。<br>这就是人类和机器的算力差距。" },
        ]
      }
    },

    /* ===== 3 上节课回顾 ===== */
    {
      id: 3, type: "timeline", variant: "review", title: "上节课回顾", subtitle: "从“做选择”到“做重复”",
      data: {
        items: [
          { icon: "🔀", badge: "分支", title: "if 家族", desc: "让程序学会选择", points: ["条件为真走一条路", "条件为假走另一条路"] },
          { icon: "⚖️", badge: "运算符", title: "关系与逻辑", desc: "组合条件", points: ["&& 与 ||", "短路求值"] },
          { icon: "📮", badge: "匹配", title: "switch", desc: "精准投递", points: ["匹配固定值", "break 防穿透"] },
          { icon: "🔁", badge: "新篇章", title: "循环", desc: "让程序学会重复", points: ["从 1 到 1 亿次", "自动化的核心"] },
        ],
      },
    },

    /* ===== 4 本讲作战地图 ===== */
    {
      id: 4, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "四站闯关，掌握自动化的魔法",
      data: {
        items: [
          { icon: "🏃", badge: "第一站", title: "跑步机", desc: "while 与 for", points: ["循环三要素", "机房急救：强杀死循环"] },
          { icon: "♟️", badge: "第二站", title: "钟表模型", desc: "嵌套循环", points: ["外圈走一步，内圈走一圈", "变量重置陷阱"] },
          { icon: "🛑", badge: "第三站", title: "紧急控制", desc: "break 与 continue", points: ["紧急停止", "跳过本次"] },
          { icon: "🏆", badge: "第四站", title: "实战演练", desc: "求和与乘法表", points: ["累加与累乘", "九九乘法表"] },
        ],
      },
    },

    /* ===== 5 为什么要循环 ===== */
    {
      id: 5, type: "origin", title: "为什么要循环？", subtitle: "开启自动驾驶的流水线", chapterTag: "第 5 讲 · 概念理解",
      data: {
        problem: {
          title: "没有循环，程序是个残废",
          points: [
            "要做 100 次判断，只能把 <code>if</code> 复制粘贴 100 次。",
            "计算 1 加到 1 亿，代码长度能绕地球一圈。",
            "程序必须能<b>自动重复</b>，才能发挥计算机的算力优势。",
          ],
        },
        evolution: [
          { icon: "🔁", era: "工具", title: "循环", desc: "写一次 + 让计算机重复执行" },
          { icon: "🚀", era: "能力", title: "批量处理", desc: "程序从此能处理海量数据" },
          { icon: "⚡", era: "极限", title: "一秒千万次", desc: "人类做不到的事，交给机器" }
        ],
        summary: {
          title: "循环 = 自动驾驶的流水线",
          desc: "你只需设定好起点、终点和步幅。<br>然后机器就会一直跑，直到完成任务。",
          code: "// 不用循环（写 1 亿行）\ncout << 1 + 2 + 3 + ... + 100000000;\n\n// 用循环（3 行）\nfor (int i = 1; i <= 100000000; i++)\n    sum += i;"
        }
      }
    },

    /* ===== 6 for 循环 ===== */
    {
      id: 6, type: "code-split", title: "for 循环", subtitle: "三要素写在一行",
      data: {
        intro: "📖 <b>语法</b>：<code>for (初始; 条件; 更新) { 循环体 }</code>。<br>把三要素全部塞进括号里，最适合<b>次数已知</b>的循环。",
        codeFile: "codes/lesson-05/for-loop.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "int i = 1", desc: "初始：起点" },
          { line: 2, title: "i &lt;= 5", desc: "条件：终点" },
          { line: 2, title: "i++", desc: "更新：步幅" },
          { line: 3, title: "cout", desc: "循环体" },
        ],
        output: "1 2 3 4 5",
      },
    },

    /* ===== 7 冲突①：眼见为实：死循环 ===== */
    {
      id: 7, type: "code-walkthrough", title: "眼见为实：死循环", subtitle: "忘记写 i++ 的灾难", chapterTag: "第 5 讲 · 概念理解",
      data: {
        intro: "如果跑步机的终点被卡住了，机器会怎样？<br>看下面这段代码（注意看括号里少了什么），猜猜按 F11 后会怎样：",
        codeFile: "codes/lesson-05/_error-deadloop.cpp", snippet: "main",
        steps: [
          { title: "启动", line: 2, vars: { i: "1" }, note: "准备从 1 开始跑。" },
          { title: "判断", line: 2, vars: { i: "1" }, note: "1 <= 5 为真，进入循环。" },
          { title: "输出", line: 3, vars: { i: "1" }, note: "输出 1。" },
          { title: "卡死", line: 2, vars: { i: "1" }, note: "因为括号里没写 i++，i 永远是 1。条件永远为真。<br>程序陷入<b>无限循环</b>，黑窗口会疯狂输出直到崩溃。" }
        ],
        extra: {
          title: "🚨 机房急救：死循环怎么停？",
          desc: "<div>如果你在机房写出了一个死循环，黑窗口会卡住不动。</div><div><b>千万不要直接拔电脑电源！</b><br>① 在黑色的命令行窗口里，按下 <code>Ctrl + C</code>，通常可以强行终止。<br>② 如果不行，直接点右上角的 <code>X</code> 把黑窗口关掉，再重新按 F11 即可。</div>",
          variant: "card-primary"
        }
      }
    },

    /* ===== 8 机房急救 ===== */
    {
      id: 8, type: "pitfall", title: "机房急救：死循环强杀", subtitle: "救命小贴士",
      data: {
        cases: [
          { icon: "❌", scene: "黑窗口疯狂滚屏，停不下来", what: "程序进入了死循环", why: "通常是忘写了 <code>i++</code>，或者条件写错了", fix: "按 <code>Ctrl + C</code> 强制终止，或者直接点右上角 <code>X</code> 关掉窗口" },
          { icon: "❌", scene: "Dev-C++ 卡死，按 F11 没反应", what: "软件被死循环卡住", why: "进程未结束", fix: "打开任务管理器，强制结束 Dev-C++ 进程" }
        ]
      }
    },

    /* ===== 9 while 循环 ===== */
    {
      id: 9, type: "code-split", title: "while 循环", subtitle: "条件满足就一直跑",
      data: {
        intro: "📖 <b>语法</b>：<code>while (条件) { 循环体 }</code>。<br>如果次数未知，只知道“什么时候停”（如：直到输入 0 为止），就用 while。",
        codeFile: "codes/lesson-05/while-loop.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "int i = 1;", desc: "起点：必须在循环外定义" },
          { line: 3, title: "while (i &lt;= 5)", desc: "终点：条件为真就继续" },
          { line: 4, title: "cout", desc: "循环体" },
          { line: 5, title: "i++;", desc: "步幅：必须在循环体内写，否则死循环" },
        ],
        output: "1 2 3 4 5",
      },
    },

    /* ===== 10 while vs for ===== */
    {
      id: 10, type: "compare", title: "while vs for", subtitle: "什么时候用哪个",
      data: {
        neutral: true, splitStep: true, leftLabel: "for 循环", rightLabel: "while 循环", arrow: "vs",
        groups: [
          { wrong: "循环次数<b>已知</b>", right: "循环次数<b>未知</b>" },
          { wrong: "例：1 到 100 求和", right: "例：直到输入 0 才停止" },
          { wrong: "三要素集中，一目了然", right: "只关心条件，更灵活" },
          { wrong: "竞赛中的主力", right: "处理未知长度的输入" }
        ],
        footer: '<b>📌 口诀</b>：<b>次数已知用 for，次数未知用 while</b>。'
      }
    },

    /* ===== 11 练习1：1~n 求和 ===== */
    {
      id: 11, type: "level-map", title: "课堂练习1：1~n求和", subtitle: "用循环计算 1 + 2 + ... + n", chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个正整数 <code>n</code>，计算 1 + 2 + ... + n 的和。<br>输入样例：<code>100</code>　输出样例：<code>5050</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["用一个变量 <code>sum</code> 累加", "sum 初始化为 0", "循环变量 i 从 1 到 n"],
        answer: { codeFile: "codes/lesson-05/sum.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "sum 就像一个<b>累加器</b>，每次循环把当前的 i 加进去。<br><br><b>为什么初始化为 0？</b><br>因为 0 加任何数都不变，是“加法的起点”。" },
      },
    },

    /* ===== 12 冲突②：眼见为实：累加器清零 ===== */
    {
      id: 12, type: "code-walkthrough", title: "眼见为实：累加器清零", subtitle: "嵌套循环的变量作用域", chapterTag: "第 5 讲 · 概念理解",
      data: {
        intro: "刚才的求和没问题。<br>但如果我们要处理一个矩阵，需要用到<b>嵌套循环</b>。<br>看下面这段代码，猜猜最后 sum 是多少？",
        codeFile: "codes/lesson-05/_error-nested.cpp", snippet: "main",
        steps: [
          { title: "外层第一圈", line: 2, vars: { i: "1" }, note: "外层 i = 1。" },
          { title: "内层重置", line: 3, vars: { i: "1", sum: "0" }, note: "进入内层前，定义了 sum = 0。" },
          { title: "累加", line: 4, vars: { i: "1", sum: "1" }, note: "sum 加上 1，变成 1。" },
          { title: "外层第二圈", line: 2, vars: { i: "2" }, note: "外层 i 变成 2。" },
          { title: "灾难发生", line: 3, vars: { i: "2", sum: "0" }, note: "再次执行到这一行，sum 又被<b>重新定义并清零了</b>！<br>之前的 1 灰飞烟灭。最终 sum 永远是最后一次循环的值。" }
        ],
        extra: {
          title: "💡 为什么会这样？",
          desc: "<div><code>{ }</code> 大括号不仅仅是划地盘，它还决定了<b>变量的生死（作用域）</b>。</div><div>写在循环内部的 <code>int sum = 0;</code>，每次进入循环都会创建一个全新的 sum。就像你每次进门都发一张新的白纸，之前的记录全没了。</div><div><b>正确做法</b>：把 <code>int sum = 0;</code> 写在外层循环的外面。</div>",
          variant: "card-primary"
        }
      }
    },

    /* ===== 13 嵌套循环的规则 ===== */
    {
      id: 13, type: "grid", title: "嵌套循环的规则", subtitle: "钟表模型", chapterTag: "第 5 讲 · 概念理解",
      data: {
        cards: [
          { icon: "🕰️", title: "外圈走一步", desc: "外层循环相当于<b>时针</b>，变化最慢。<br>外层循环执行 1 次，内层循环要完整执行 N 次。" },
          { icon: "⏱️", title: "内圈走一圈", desc: "内层循环相当于<b>分针</b>，变化最快。<br>内层循环的变量 j，通常跟外层变量 i 联动（如 <code>j &lt;= i</code>）。" },
          { icon: "🔢", title: "总执行次数", desc: "如果外层跑 3 次，内层跑 4 次。<br>总执行次数 = 3 × 4 = 12 次。<br>三层就是 <code>a × b × c</code>。" },
        ],
        footer: '<b>📌 口诀</b>：外层控行，内层控列；外圈走一步，内圈跑断腿。'
      }
    },

    /* ===== 14 九九乘法表 ===== */
    {
      id: 14, type: "code-split", title: "九九乘法表", subtitle: "嵌套循环的最强视觉展现",
      data: {
        intro: "📖 内层循环的边界可以<b>依赖外层变量</b>——<br>比如 <code>j &lt;= i</code>，让内层每行越来越长。",
        codeFile: "codes/lesson-05/multiplication-table.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "外层 i", desc: "代表行号" },
          { line: 3, title: "内层 j &lt;= i", desc: "j 从 1 到 i，所以每行越来越长" },
          { line: 4, title: "输出", desc: "格式：j*i=结果" },
          { line: 6, title: "换行", desc: "每行结束后换行" },
        ],
        output: "1*1=1\n1*2=2 2*2=4\n1*3=3 2*3=6 3*3=9",
      },
    },

    /* ===== 15 练习2：星号直角三角形 ===== */
    {
      id: 15, type: "level-map", title: "课堂练习2：星号三角形", subtitle: "用嵌套循环画图案", chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个正整数 <code>n</code>，输出一个 <code>n</code> 行的直角三角形：<br>第 1 行 1 个 <code>*</code>，第 2 行 2 个，……，第 n 行 n 个。<br><br><b>输入样例</b>：<code>4</code><br><b>输出样例</b>：<br><code>*</code><br><code>**</code><br><code>***</code><br><code>****</code>", timer: "⏱ 限时 10 分钟" },
        hints: [
          "外层循环 i 控制行号（1 到 n）",
          "内层循环 j 控制每行的 <code>*</code> 数（1 到 i）",
          "内层循环结束后输出 <code>endl</code> 换行",
          "关键：内层循环的<b>上界是 i</b>，不是 n"
        ],
        answer: { codeFile: "codes/lesson-05/triangle.cpp", snippet: "main" },
        analysis: { title: "📖 解析 & 急救卡片", desc: '<b>关键点</b>：内层循环的上界是 <code>i</code>，不是 <code>n</code>。<br><br><b style="color:red;">🚨 如果你运行出来全挤在一行：</b><br>检查一下 <code>cout << endl;</code> 是不是写在<b>内层循环的里面</b>了？<br><b>endl 必须写在两层循环之间</b>（外层里面，内层外面），才能实现换行。' },
      },
    },

    /* ===== 16 break 与 continue ===== */
    {
      id: 16, type: "code-split", title: "break 与 continue", subtitle: "紧急停止与跳过",
      data: {
        intro: "📖 <b>break</b>：拉下紧急停止闸，整个循环直接结束。<br><b>continue</b>：这件残次品扔掉，跳过本次循环剩下的代码，直接进入下一次。",
        codeFile: "codes/lesson-05/break-continue.cpp", snippet: "main",
        annotations: [
          { line: 3, title: "if (i == 3) continue;", desc: "遇到 3 直接跳过，后面的 cout 不执行" },
          { line: 4, title: "if (i == 6) break;", desc: "遇到 6 整个循环终止" },
          { line: 5, title: "cout &lt;&lt; i;", desc: "只有没被跳过的才会输出" },
        ],
        output: "1 2 4 5",
        footer: '<b>📌 口诀</b>：break 是"我不干了"（整个循环结束），continue 是"这次不算，继续下一次"。<br><b>⚠️ 陷阱</b>：break 只能跳出<b>一层</b>循环。'
      },
    },

    /* ===== 17 练习3：阶乘 ===== */
    {
      id: 17, type: "level-map", title: "课堂练习3：阶乘", subtitle: "计算 n! = 1 × 2 × ... × n", chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个正整数 <code>n</code>，输出 n 的阶乘 <code>n!</code>。<br>输入样例：<code>5</code>　输出样例：<code>120</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["用一个变量 <code>fact</code> 累乘", "fact 初始化为 1（不能是 0）", "循环变量 i 从 1 到 n", "n 可能会大，用 <code>long long</code>"],
        answer: { codeFile: "codes/lesson-05/factorial.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "累乘和累加思路一样，只是初始值不同。<br><b>累加</b>：初始 0，因为加 0 不影响。<br><b>累乘</b>：初始 1，因为乘 1 不影响。<br>如果 fact = 0，结果永远是 0。<br><br><b>为什么用 long long？</b><br>阶乘增长极快：13! 就超过 int 范围。" },
      },
    },

    /* ===== 18 初赛小知识 ===== */
    {
      id: 18, type: "grid", title: "初赛小知识：循环次数", subtitle: "CSP-J/S 初赛必考", chapterTag: "第 5 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "🔢", title: "循环次数速查", desc: "<code>for (i=0; i&lt;n; i++)</code> → <b>n 次</b><br><code>for (i=1; i&lt;=n; i++)</code> → <b>n 次</b><br><code>for (i=0; i&lt;=n; i++)</code> → <b>n+1 次</b>" },
          { icon: "📊", title: "嵌套循环次数", desc: "内层固定：外层 × 内层<br>内层变化（如 <code>j&lt;=i</code>）：<br>1 + 2 + 3 + ... + n" },
          { icon: "⚠️", title: "边界陷阱", desc: "<code>&lt;</code> 看差值，<code>&lt;=</code> 看差值加一。<br>注意 <code>break</code> 会减少总次数，<code>continue</code> 不会。" }
        ],
        footer: '<b>📌 解题技巧</b>：把每个变量写在纸上，逐行执行，判断条件结果。不要心算，容易错。'
      }
    },

    /* ===== 19 课堂小测 ===== */
    {
      id: 19, type: "quiz", title: "课堂小测", subtitle: "循环结构与次数", chapterTag: "第 5 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 循环结构", optionLayout: "horizontal", question: "下面代码的循环体会执行多少次？", questionCode: `int sum = 0;\nfor (int i = 1; i <= 100; i++) {\n    sum += i;\n}`, options: [ { label: "A", text: "99 次" }, { label: "B", text: "100 次", correct: true }, { label: "C", text: "101 次" }, { label: "D", text: "无限次" } ], analysis: 'i 从 1 开始，到 100 结束（包含 100），<b>共 100 次</b>。<br>计算公式：循环次数 = 结束值 - 起始值 + 1 = 100 - 1 + 1 = 100。<br>这是初赛最高频的题型之一。' },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 初赛真题练习 · while 循环", optionLayout: "horizontal", question: "下面代码的输出是什么？", questionCode: `int i = 0;\nwhile (i < 5) {\n    cout << i << " ";\n    i += 2;\n}`, options: [ { label: "A", text: "0 1 2 3 4" }, { label: "B", text: "0 2 4", correct: true }, { label: "C", text: "0 2 4 6" }, { label: "D", text: "0" } ], analysis: '每次循环 i 加 2，依次输出 0、2、4。<br>当 i = 6 时，<code>i &lt; 5</code> 为假，循环结束。<br><br><b>关键</b>：<code>i += 2</code> 不是 <code>i++</code>，步长是 2。' },
          { id: 3, type: "single", difficulty: 3, source: "CSP-J 2021 初赛模拟题 · 嵌套循环", optionLayout: "horizontal", question: "下面代码会输出多少个 <code>*</code>？", questionCode: `for (int i = 1; i <= 3; i++)\n    for (int j = 1; j <= 4; j++)\n        cout << "*";`, options: [ { label: "A", text: "7 个" }, { label: "B", text: "12 个", correct: true }, { label: "C", text: "3 个" }, { label: "D", text: "4 个" } ], analysis: "外层 3 次，内层 4 次，共 3 × 4 = <b>12 次</b>。<br><b>嵌套循环的总次数 = 外层 × 内层</b>（内层次数固定时）。" },
          { id: 4, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第三章", optionLayout: "two-cols", question: "在 C++ 中，<code>break</code> 和 <code>continue</code> 的效果完全一样。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: '两者完全不同：<br><b>break</b>：跳出<b>整个循环</b>。<br><b>continue</b>：跳过<b>本次循环</b>，继续下一次。<br><br>记忆口诀：break 是"我不干了"，continue 是"这次不算，继续"。' },
        ],
      },
    },

    /* ===== 20 今日总结 ===== */
    {
      id: 20, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "让程序重复做事，才是真正的自动化。", author: "—— 循环结构第一课",
        points: [ "while 循环：条件为真就重复", "for 循环：三要素写在一行，最常用", "循环三要素：初始、条件、更新", "循环嵌套：外层走一步，内层走一圈", "break：提前跳出循环", "continue：跳过本次循环" ],
        highlight: { title: "📌 关键口诀", desc: "while 看条件，for 三要素；初始、条件、更新，缺一不可；嵌套外乘内，break 跳整圈；continue 跳一次，记住别搞混。" },
      },
    },

    /* ===== 21 课后作业 ===== */
    {
      id: 21, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5722", link: "https://www.luogu.com.cn/problem/P5722", desc: "<b>数列求和</b><br>考察：for 循环、累加<br>难度：★<br>目标：读入 n 个数，输出和" },
          { icon: "🟢", title: "基础 2 · P5721", link: "https://www.luogu.com.cn/problem/P5721", desc: "<b>数字直角三角形</b><br>考察：循环嵌套、输出格式<br>难度：★★<br>目标：打印数字三角形" },
          { icon: "🔴", title: "挑战 · P5727", link: "https://www.luogu.com.cn/problem/P5727", desc: "<b>冰雹猜想</b><br>考察：while 循环、条件判断<br>难度：★★★<br>目标：反复迭代直到 1" },
        ],
      },
    },

    /* ===== 22 下节预告 ===== */
    {
      id: 22, type: "radial", title: "下节预告", subtitle: "第 6 讲 · 一维数组",
      data: { center: "数组", items: [ { text: "什么是数组" }, { text: "定义与访问" }, { text: "遍历与统计" }, { text: "常见错误" } ] },
    },

    /* ===== 23 本讲英文单词 ===== */
    {
      id: 23, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 5 讲 · 复习",
      data: {
        words: [
          { word: "while", cn: "当……时", pron: "/waɪl/", origin: '英文原意"当……时"', category: "关键字" },
          { word: "for", cn: "为了", pron: "/fɔːr/", origin: '英文原意"为了"', category: "关键字" },
          { word: "break", cn: "打断", pron: "/breɪk/", origin: '英文原意"打破"', category: "关键字" },
          { word: "continue", cn: "继续", pron: "/kənˈtɪnjuː/", origin: "con(一起) + tinue(保持) = 继续", category: "关键字" },
          { word: "loop", cn: "循环", pron: "/luːp/", origin: '英文原意"环、圈"', category: "概念" },
          { word: "iteration", cn: "迭代", pron: "/ˌɪtəˈreɪʃn/", origin: "iter (重复) + ation (名词后缀)", category: "概念" },
        ],
      },
    },

    /* ===== 24 结束页 ===== */
    {
      id: 24, type: "ending", title: "第五讲结束", subtitle: "你的程序，从此拥有了“超能力”", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 自动化的起点",
          desc: "今天，你学会了让电脑帮你干“枯燥的苦力活”。一秒钟执行一亿次，这就是循环的威力。<br><br>但现在的程序有个巨大的痛点：<b>它记不住东西。</b><br>算完一个数，马上就丢了；读了100个数，不知道放哪。<br><br>下一讲，我们将造一个“超级大柜子”，让程序能同时存下成千上万个数据。<br><br>📌 <b>行动号召</b>：去洛谷刷完今天的冰雹猜想。下节课，我们见见传说中的“数组”！",
          variant: "card-glow"
        }
      },
    },
  ],
};
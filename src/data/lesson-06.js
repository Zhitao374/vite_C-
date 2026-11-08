export default {
  title: "第 5 讲 循环结构",
  subtitle: "让程序学会重复",
  total: 25,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "循环结构", subtitle: "让程序学会重复", chapterTag: false,
      data: { accentWord: "循环", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 5 讲"] },
    },

    /* ===== 2 钩子 ===== */
    {
      id: 2, type: "dialog", title: "1 亿次加法怎么算？", subtitle: "人脑的极限，电脑的起点", chapterTag: "第 5 讲 · 开场",
      data: {
        lines: [
          { who: "student", text: "小 C，如果让你算 1+2+3 一直加到 1 亿，你脑子会烧掉吧？" },
          { who: "robot", text: "我当然不会硬算，我会用循环。<br>在 C++ 里，只需要写 4 行代码，1 秒钟就能算完。" },
          { who: "student", text: "4 行代码？怎么写？" },
          { who: "robot", text: "看好了。今天我们就来学习，如何指挥电脑一秒搬砖一亿次——<b>循环结构</b>。" },
        ]
      }
    },

    /* ===== 3 上节回顾 ===== */
    {
      id: 3, type: "timeline", variant: "review", title: "上节课回顾", subtitle: "运算符与分支",
      data: {
        items: [
          { icon: "🧮", badge: "运算符", title: "四类运算符", desc: "算术、赋值、关系、逻辑", points: ["整数除法陷阱", "= 和 == 的区别"] },
          { icon: "🚪", badge: "分支", title: "if 家族", desc: "单分支、双分支、多分支", points: ["else if 顺序", "悬挂 else"] },
          { icon: "⚡", badge: "短路", title: "短路求值", desc: "a && b, a || b", points: ["前面不满足，后面不执行"] },
          { icon: "📮", badge: "switch", title: "分拣机", desc: "等值匹配", points: ["case 穿透", "break 的重要性"] },
        ],
      },
    },

    /* ===== 4 作战地图 ===== */
    {
      id: 4, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "三站闯关，掌握程序的引擎",
      data: {
        items: [
          { icon: "🔁", badge: "第一站", title: "for 循环", desc: "明确次数", points: ["三要素", "执行轨迹", "累加器"] },
          { icon: "🔄", badge: "第二站", title: "while 循环", desc: "条件触发", points: ["未知次数", "死循环急救"] },
          { icon: "🏆", badge: "第三站", title: "嵌套与控制", desc: "组合技", points: ["双重循环", "break 与 continue"] },
        ],
      },
    },

    /* ===== 5 为什么需要循环 ===== */
    {
      id: 5, type: "split", title: "为什么需要循环？", subtitle: "复制粘贴的噩梦", chapterTag: "第 5 讲 · 概念理解",
      data: {
        intro: "如果让你输出 100 次 “Hello”，你会怎么写？",
        panes: [
          { title: "❌ 原始写法", icon: "😭", items: [ { desc: "<code>cout << \"Hello\" << endl;</code><br><code>cout << \"Hello\" << endl;</code><br><code>... (复制 100 行)</code><br><br>如果改成 1 万次呢？手废了。" } ] },
          { title: "✅ 循环写法", icon: "😎", items: [ { desc: "<code>for (int i = 1; i <= 100; i++) {</code><br>&nbsp;&nbsp;<code>cout << \"Hello\" << endl;</code><br><code>}</code><br><br>改成 1 万次？把 100 改成 10000 即可。" } ] }
        ],
        footer: '<b>📌 本质</b>：循环就是让电脑替我们做无聊的重复劳动。'
      }
    },

    /* ===== 6 for 循环基础 ===== */
    {
      id: 6, type: "code-split", title: "for 循环 · 计次循环", subtitle: "跑圈三要素",
      data: {
        intro: "📖 <b>语法</b>：<code>for (初始化; 条件; 步长)</code>。<br>它就像操场跑圈：从哪里起跑？跑到哪停？每步迈多大？",
        codeFile: "codes/lesson-06/for-loop.cpp", snippet: "main",
        annotations: [
          { line: 6, title: "int i = 1;", desc: "起点：从 1 开始跑" },
          { line: 6, title: "i <= 5;", desc: "终点：只要 i 小于等于 5，就继续跑" },
          { line: 6, title: "i++", desc: "步长：每跑一圈，i 增加 1" },
          { line: 7, title: "cout << i;", desc: "循环体：每跑一圈执行一次" },
        ],
        output: "1 2 3 4 5",
        footer: '<b>📌 口诀</b>：初始条件只跑一次；条件判断每次必看；跑完一圈必加步长。'
      },
    },

    /* ===== 7 for 循环执行轨迹（动画） ===== */
    {
      id: 7, type: "evolution", title: "眼见为实：for 的执行轨迹", subtitle: "变量 i 是怎么变的？", chapterTag: "第 5 讲 · 过程演示",
      data: {
        intro: "📖 循环最难理解的是“代码往回跳”。看右侧，i 每次是怎么变化的：",
        codeFile: "codes/lesson-06/for-loop.cpp", snippet: "main",
        steps: [
          { focusLines: [6], expression: "i = 1", note: "初始化：i 为 1。判断 i <= 5 成立，进入循环体。" },
          { focusLines: [7, 6], expression: "输出 1，i 变 2", note: "执行 cout，输出 1。然后跑完一圈，执行 i++，i 变成 2。<br>代码<b>跳回第 6 行</b>重新判断。" },
          { focusLines: [7, 6], expression: "输出 2，i 变 3", note: "判断 2 <= 5 成立，输出 2，i 变成 3。再跳回。" },
          { focusLines: [7, 6], expression: "...", note: "一直重复，直到 i 变成 6。" },
          { focusLines: [6], expression: "i = 6 判断失败", note: "6 <= 5 不成立！循环彻底结束。" }
        ]
      }
    },

    /* ===== 8 练习1：1~n求和 ===== */
    {
      id: 8, type: "level-map", title: "课堂练习1：1~n求和", subtitle: "循环的第一个经典应用", chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个整数 <code>n</code>，输出 1 + 2 + 3 + ... + n 的结果。<br>输入样例：<code>100</code>　输出样例：<code>5050</code>", timer: "⏱ 限时 5 分钟" },
        hints: ["需要一个变量 <code>sum</code> 来存累加结果，初始为 0", "在循环里写 <code>sum = sum + i</code>", "输出最后的 <code>sum</code>"],
        answer: { codeFile: "codes/lesson-06/sum.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "这叫“累加器”模型。<br>一定要把 <code>sum</code> 初始化为 0。如果不初始化，它会包含一个随机的垃圾值。" },
      },
    },

    /* ===== 9 边界陷阱：多跑一次 / 少跑一次 ===== */
    {
      id: 9, type: "code-walkthrough", title: "眼见为实：少算了一个人？", subtitle: "初学者的噩梦：差一错误 (Off-by-one)", chapterTag: "第 5 讲 · 概念理解",
      data: {
        intro: "体育老师让 1 到 5 号同学报数。<br>如果你把代码写成 <code>i < 5</code>，相当于老师喊“小于 5 的报数”，5 号同学（小明）直接被无视了。<br>这就是循环里最容易犯的错——<b>差一错误</b>。看代码：",
        codeFile: "codes/lesson-06/_error-bound.cpp", snippet: "main",
        steps: [
          { title: "正常情况：闭区间", line: 10, vars: { sum: "15" }, note: "如果写 <code>i <= 5</code>，相当于“包含 5”。<br>1+2+3+4+5 = 15。<br>大家都算进去了。" },
          { title: "少跑一次：半开区间", line: 15, vars: { sum: "10" }, note: "如果写 <code>i < 5</code>，相当于“不包含 5”。<br>5 号同学被漏掉了！<br>1+2+3+4 = 10，答案错了。" },
          { title: "多跑一次：越界", line: 20, vars: { sum: "21" }, note: "如果写成 <code>i <= 6</code>，相当于“多叫了 6 号”。<br>6 号都不存在，却也加进去了。<br>1+2+3+4+5+6 = 21，也错了。" }
        ],
        footer: '<b>📌 口诀</b>：写循环前先默念：“包不包含最后那个数？”<br>包含就用 <code><=</code>，不包含就用 <code><</code>。'
      }
    },

    /* ===== 10 while 循环 ===== */
    {
      id: 10, type: "code-split", title: "while 循环 · 条件循环", subtitle: "不到黄河心不死",
      data: {
        intro: "📖 <code>for</code> 适合<b>明确知道跑几圈</b>的情况。如果不知道跑几圈，只知道“跑到什么条件停下”，就用 <code>while</code>。",
        codeFile: "codes/lesson-06/while-loop.cpp", snippet: "main",
        annotations: [
          { line: 5, title: "int n = 1;", desc: "初始化放在循环外面" },
          { line: 6, title: "while (n <= 5)", desc: "只要条件为真，就一直循环" },
          { line: 7, title: "n++;", desc: "步长更新必须有，否则永远出不来！" },
        ],
        output: "1 2 3 4 5",
      },
    },

    /* ===== 11 for vs while ===== */
    {
      id: 11, type: "compare", title: "for vs while", subtitle: "什么时候用谁？",
      data: {
        neutral: true, splitStep: true,
        groups: [
          { leftLabel: "for 循环", rightLabel: "while 循环", wrong: "<b>明确次数</b>", right: "<b>未知次数，条件触发</b>" },
          { leftLabel: "场景", rightLabel: "场景", wrong: "跑 100 圈<br>遍历数组", right: "输入直到 0 为止<br>直到密码正确" },
          { leftLabel: "习惯", rightLabel: "习惯", wrong: "将三要素写在括号里，紧凑清晰。", right: "变量定义在外面，忘了更新步长就会死循环。" }
        ],
        footer: '<b>📌 建议</b>：初学阶段，能用 <code>for</code> 写就尽量用 <code>for</code>，不容易漏写条件导致死循环。'
      }
    },

    /* ===== 12 冲突：死循环急救 ===== */
    {
      id: 12, type: "pitfall", title: "机房急救：死循环", subtitle: "程序卡死了怎么办？", chapterTag: "第 5 讲 · 概念理解",
      data: {
        cases: [
          { icon: "💣", scene: "黑窗口里疯狂刷屏，按什么都没反应", what: "你写出了死循环。比如 <code>while (1)</code> 里面忘记写 <code>break;</code>", why: "条件永远为真，程序在里面疯狂转圈，出不来。", fix: "立刻按 <kbd>Ctrl + C</kbd> 强行掐断程序！<br>如果连 Ctrl+C 都没用，直接点窗口右上角 ✕ 关掉。" },
          { icon: "🛡️", scene: "如何预防？", what: "写循环时，灵魂三问：", why: "① 初始值是什么？<br>② 什么时候退出？<br>③ 循环里的变量有没有在变？", fix: "如果循环里的变量没变化，必然是死循环。" }
        ],
        footer: '<b>📌 救命绝招</b>：写 <code>while</code> 循环，先写里面的变量更新（如 <code>i++</code>），再写其他逻辑，防止自己忘了。'
      }
    },

    /* ===== 13 嵌套循环 ===== */
    {
      id: 13, type: "code-split", title: "嵌套循环", subtitle: "外圈走一步，内圈跑一圈",
      data: {
        intro: "📖 就像钟表：时针走 1 格，分针要走 60 格。<br>在代码里，我们把一个循环放进另一个循环里，就是嵌套。",
        codeFile: "codes/lesson-06/multiplication-table.cpp", snippet: "main",
        annotations: [
          { line: 6, title: "for (int i = 1; i <= 3; i++)", desc: "外层：控制行" },
          { line: 7, title: "for (int j = 1; j <= 3; j++)", desc: "内层：控制列，每次都要完整跑一圈" },
          { line: 8, title: "cout << i * j;", desc: "执行 3 × 3 = 9 次" },
        ],
        output: "1 2 3\n2 4 6\n3 6 9",
      },
    },

    /* ===== 14 嵌套执行轨迹 ===== */
    {
      id: 14, type: "evolution", title: "眼见为实：嵌套循环怎么跑的", subtitle: "为什么执行了 9 次？", chapterTag: "第 5 讲 · 过程演示",
      data: {
        intro: "📖 嵌套循环最容易把人绕晕。记住：<b>外层动一次，内层要跑一整个完整的循环。</b>",
        codeFile: "codes/lesson-06/multiplication-table.cpp", snippet: "main",
        steps: [
          { focusLines: [6], expression: "i = 1", note: "外层第 1 圈，i 为 1。" },
          { focusLines: [7], expression: "内层 j = 1, 2, 3", note: "内层完整跑 3 圈，输出 1*1, 1*2, 1*3（即 1, 2, 3）。" },
          { focusLines: [6], expression: "i = 2", note: "外层第 2 圈，i 变成 2。" },
          { focusLines: [7], expression: "内层 j = 1, 2, 3", note: "内层<b>重新从 1 开始</b>完整跑 3 圈，输出 2, 4, 6。" },
          { focusLines: [6], expression: "i = 3", note: "外层第 3 圈，i 变成 3，内层再完整跑 3 圈。" },
        ]
      }
    },

    /* ===== 15 练习2：星号三角形 ===== */
    {
      id: 15, type: "level-map", title: "课堂练习2：星号三角形", subtitle: "打印图形", chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入行数 <code>n</code>，输出直角三角形。<br>输入样例：<code>3</code>　输出样例：<br><code>*</code><br><code>**</code><br><code>***</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["外层循环控制行数", "内层循环控制每行的星号个数", "第 i 行就输出 i 个星号"],
        answer: { codeFile: "codes/lesson-06/triangle.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "外循环决定行数，内循环的界限取决于外层的变量 i。<br>这是图形打印最基础的模型。" },
      },
    },

    /* ===== 16 break 与 continue ===== */
    {
      id: 16, type: "code-split", title: "break 与 continue", subtitle: "紧急刹车与跳过本轮",
      data: {
        intro: "📖 在循环中，遇到特殊情况想提前退出？<br><b>break</b>：直接砸碎整个循环（彻底不跑了）。<br><b>continue</b>：跳过本次循环后面的代码，直接进入下一圈。",
        codeFile: "codes/lesson-06/break-continue.cpp", snippet: "main",
        annotations: [
          { line: 8, title: "if (i == 3) break;", desc: "当 i 是 3 时，整个循环直接毁灭" },
          { line: 15, title: "if (i == 3) continue;", desc: "当 i 是 3 时，跳过这一圈后面的输出，直接去执行 i++" },
        ],
        output: "1 2\n---\n1 2 4 5",
        footer: '<b>📌 区别</b>：<code>break</code> 是退学（以后都不用来了）；<code>continue</code> 是请假（这节课不上，下节课还来）。'
      },
    },

    /* ===== 17 练习3：找质数（或阶乘） ===== */
    {
      id: 17, type: "level-map", title: "课堂练习3：阶乘计算", subtitle: "累乘器", chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入整数 <code>n</code>，输出 <code>n!</code>（n 的阶乘）。<br>例如 5! = 1 × 2 × 3 × 4 × 5 = 120。<br>输入样例：<code>5</code>　输出样例：<code>120</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["乘法单位是 1，所以变量 <code>ans</code> 初始要设为 1", "每次用 <code>ans = ans * i</code>", "小心不要用 int 存，阶乘增长极快，容易溢出"],
        answer: { codeFile: "codes/lesson-06/factorial.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "这是“累乘器”模型。<br>注意 <code>ans</code> 初值必须是 1（如果是 0，怎么乘都是 0）。<br>而且要用 <code>long long</code> 存结果。" },
      },
    },

    /* ===== 18 初赛渗透 ===== */
    {
      id: 18, type: "grid", title: "初赛小知识：循环次数", subtitle: "CSP-J/S 初赛必考", chapterTag: "第 5 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "🔁", title: "单循环次数", desc: "<code>for (i=1; i<=n; i++)</code><br>执行 <b>n</b> 次。<br><code>for (i=1; i<n; i++)</code><br>执行 <b>n-1</b> 次。" },
          { icon: "📦", title: "嵌套循环次数", desc: "外层跑 <code>n</code> 次，内层跑 <code>m</code> 次。<br>总次数 = <b>n × m</b>。<br>如果是 <code>for (j=1; j<=i; j++)</code>，总次数是 1+2+...+n。" },
          { icon: "⚠️", title: "死循环条件", desc: "<code>for (i=1; i>=1; i++)</code><br>条件永远成立，无限循环。<br>初赛常让你找这种错误。" }
        ],
        footer: '<b>📌 怎么考？</b><br>给一段复杂的循环代码，问你循环体执行了几次，或者最后的变量值是多少。<b>画表法是最稳妥的解法。</b>'
      }
    },

    /* ===== 19 课堂小测 ===== */
    {
      id: 19, type: "quiz", title: "课堂小测", subtitle: "循环结构", chapterTag: "第 5 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 循环", optionLayout: "horizontal", question: "循环 <code>for (int i = 1; i <= 10; i++)</code> 的循环体执行了多少次？", options: [ { label: "A", text: "9" }, { label: "B", text: "10", correct: true }, { label: "C", text: "11" }, { label: "D", text: "死循环" } ], analysis: "从 1 开始，包含 10，每次加 1。分别是 1, 2, 3, 4, 5, 6, 7, 8, 9, 10。共 <b>10</b> 次。" },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 执行轨迹", optionLayout: "vertical", question: "下面代码的输出是？", questionCode: "int sum = 0;\nfor (int i = 1; i <= 3; i++)\n    for (int j = 1; j <= 3; j++)\n        sum++;\ncout << sum;", options: [ { label: "A", text: "3" }, { label: "B", text: "6" }, { label: "C", text: "9", correct: true }, { label: "D", text: "12" } ], analysis: "双重循环，外层执行 3 次，内层每次执行 3 次。<br>总执行次数 = 3 × 3 = <b>9</b> 次。<br>每次 sum 加 1，所以最后 sum 是 9。" },
          { id: 3, type: "single", difficulty: 3, source: "2021 CSP-J 初赛 · 第 12 题", optionLayout: "horizontal", question: "下面哪个循环是<b>死循环</b>？", options: [ { label: "A", text: "for(i=1; i<=10; i++)" }, { label: "B", text: "while(1) {...}" , correct: true }, { label: "C", text: "for(i=10; i>=1; i--)" }, { label: "D", text: "while(x != 0) { cin >> x; }" } ], analysis: "<code>while(1)</code> 的条件永远是 1（真），如果没有 <code>break</code>，就会永远循环下去。<br>其他选项都有正常的退出条件。" },
          { id: 4, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第三章", optionLayout: "two-cols", question: "在循环中，<code>break</code> 可以跳出当前所在的这一层循环。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: "<code>break</code> 的作用是跳出<b>最近的一层</b>循环或 switch。<br>如果是嵌套循环，它只能跳出内层，不能直接跳出外层。" },
          { id: 5, type: "judge", difficulty: 3, source: "CSP-J 初赛真题练习 · 循环边界", optionLayout: "two-cols", question: "如果写成 <code>for (int i = 0; i <= n; i++)</code>，循环体一共执行了 <code>n</code> 次。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: "从 0 开始到 n（包含 n），一共执行了 <b>n + 1</b> 次。<br>初学者最容易把左闭右开还是左闭右闭搞混。" },
        ],
      },
    },

    /* ===== 20 今日总结 ===== */
    {
      id: 20, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "让电脑替我们做无聊的重复劳动。", author: "—— 循环结构第一课",
        points: [ "for 适合已知次数的循环", "while 适合未知次数、条件触发的循环", "嵌套循环：外层走一步，内层跑一圈", "break 毁灭整个循环，continue 跳过本轮", "警惕死循环，Ctrl+C 强杀" ],
        highlight: { title: "📌 关键口诀", desc: "for 循环三要素：初值、条件、步长；while 循环防死锁，变量更新不能忘；嵌套外一内跑全；break 退学 continue 请假。" },
      },
    },

    /* ===== 21 课后作业 ===== */
    {
      id: 21, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5722", link: "https://www.luogu.com.cn/problem/P5722", desc: "<b>数列求和</b><br>考察：for 循环累加<br>难度：★<br>目标：读入 n，求 1~n 之和" },
          { icon: "🟢", title: "基础 2 · P5721", link: "https://www.luogu.com.cn/problem/P5721", desc: "<b>数字直角三角形</b><br>考察：嵌套循环<br>难度：★★<br>目标：输出一个数字递增的直角三角形" },
          { icon: "🔴", title: "挑战 · P5727", link: "https://www.luogu.com.cn/problem/P5727", desc: "<b>冰雹猜想</b><br>考察：while 循环<br>难度：★★<br>目标：模拟数字的奇特变化，不知道要跑几次" },
        ],
      },
    },

    /* ===== 22 下节预告 ===== */
    {
      id: 22, type: "radial", title: "下节预告", subtitle: "第 6 讲 · 一维数组",
      data: { center: "数组", items: [ { text: "批量存数据" }, { text: "下标与遍历" }, { text: "数组越界" }, { text: "最值问题" } ] },
    },

    /* ===== 23 答疑时间 ===== */
    {
      id: 23, type: "grid", title: "自由提问时间", subtitle: "把你不懂的问题，大声说出来", chapterTag: "第 5 讲 · 互动",
      data: {
        cards: [
          { icon: "🔁", title: "关于 for", desc: "i 能不能从 0 开始？<br>三要素可以空着不写吗？" },
          { icon: "🔄", title: "关于 while", desc: "什么时候用 while 比 for 好？<br>怎么判断会不会死循环？" },
          { icon: "📦", title: "关于嵌套", desc: "两层循环到底怎么跑的？<br>三层循环现实中有用吗？" },
          { icon: "🛑", title: "关于 break", desc: "break 能跳出多层循环吗？<br>continue 执行后 i 还会加一吗？" }
        ],
        footer: '<b>📌 提问的三个层次</b><br>① 问“是什么”：查资料能解决。<br>② 问“为什么”：理解原理的钥匙。<br>③ 问“怎么办”：代码报错卡住了。<br><br><b>大胆开口！</b>'
      }
    },

    /* ===== 24 本讲英文单词 ===== */
    {
      id: 24, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 5 讲 · 复习",
      data: {
        words: [
          { word: "loop", cn: "循环", pron: "/luːp/", origin: "英文原意“环、圈”", category: "概念" },
          { word: "break", cn: "打断", pron: "/breɪk/", origin: "英文原意“打破”", category: "关键字" },
          { word: "continue", cn: "继续", pron: "/kənˈtɪnjuː/", origin: "con(一起)+tinue(保持)", category: "关键字" },
          { word: "while", cn: "当...的时候", pron: "/waɪl/", origin: "英文原意“当...时”", category: "关键字" },
          { word: "initial", cn: "初始的", pron: "/ɪˈnɪʃl/", origin: "英文原意“开头的”", category: "概念" },
          { word: "condition", cn: "条件", pron: "/kənˈdɪʃn/", origin: "英文原意“条件”", category: "概念" },
        ]
      },
    },

    /* ===== 25 结束页 ===== */
    {
      id: 25, type: "ending", title: "第五讲结束", subtitle: "你的程序，从此拥有了无穷的力量", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 什么是真正的“计算”",
          desc: "今天，你只学了 4 行代码（for 循环），就能让电脑一秒算完 1 亿次加法。<br>这就是为什么计算机叫“电脑”——它是真正的重复劳动终结者。<br><br>但在编程世界里，如果存 1 个数据用变量，那存 100 个数据呢？<br>下一讲，我们将学习把数据排成一排的魔法——<b>数组</b>。",
          variant: "card-glow"
        }
      },
    },
  ],
};
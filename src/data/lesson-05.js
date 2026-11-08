export default {
  title: "第 5 讲 多分支与 switch",
  subtitle: "让程序的判断更丰富",
  total: 20,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "多分支与 switch", subtitle: "让程序的判断更丰富", chapterTag: false,
      data: { accentWord: "组合", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 5 讲"] },
    },

    /* ===== 2 上节回顾 ===== */
    {
      id: 2, type: "timeline", variant: "review", title: "上节课回顾", subtitle: "运算符与基础分支",
      data: {
        items: [
          { icon: "⚖️", badge: "测谎仪", title: "关系运算符", desc: "结果只有真假", points: ["== 和 != 的区别", "注意整数除法"] },
          { icon: "🚪", badge: "安检门", title: "if 单分支", desc: "条件为真就执行", points: ["为假直接跳过"] },
          { icon: "🔀", badge: "岔路口", title: "if-else 双分支", desc: "必走一条", points: ["没有中间态"] },
          { icon: "⚠️", badge: "大坑", title: "= 和 ==", desc: "编译器的静默杀手", points: ["单等号是赋值", "条件永远为真"] },
        ],
      },
    },

    /* ===== 3 学习地图 ===== */
    {
      id: 3, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "两站闯关，解锁复杂判断",
      data: {
        items: [
          { icon: "🪜", badge: "第一站", title: "多分支与逻辑", desc: "组合条件", points: ["if-else-if 的顺序", "&& 和 || 组合", "短路求值"] },
          { icon: "📮", badge: "第二站", title: "switch 分拣机", desc: "等值匹配", points: ["case 语法", "穿透陷阱", "实战：星期几"] },
        ],
      },
    },

    /* ===== 4 痛点引入：多分支 ===== */
    {
      id: 4, type: "dialog", title: "分数太高也是错？", subtitle: "多分支的痛点引入", chapterTag: "第 5 讲 · 概念理解",
      data: {
        lines: [
          { who: "student", text: "小 C，用上一讲学的 if-else，我写了个判断成绩的程序。" },
          { who: "student", text: "if (score >= 60) 输出及格；else 输出不及格。但是如果我要分 A、B、C、D 四档怎么办？" },
          { who: "robot", text: "你可以用嵌套，在 if 里面再写 if。但是嵌套太深容易乱。" },
          { who: "robot", text: "其实 C++ 提供了一个更清爽的语法，可以把多条岔路口排成一排，这就是 <code>if-else if</code>。" },
        ]
      }
    },

    /* ===== 5 if-else-if 语法 ===== */
    {
      id: 5, type: "code-split", title: "if-else if 多分支", subtitle: "多条路，只走一条",
      data: {
        intro: "📖 <b>语法</b>：链式多个 <code>else if</code>。<br>从上到下依次判断，<b>一旦某个条件成立，后面不再判断</b>。",
        codeFile: "codes/lesson-04/if-else-if.cpp", snippet: "main",
        annotations: [
          { line: 8, title: "score &gt;= 90", desc: "先判断最高档" },
          { line: 10, title: "else if", desc: "上一个条件不成立时，才判断这一个" },
          { line: 14, title: "else", desc: "兜底选项" },
        ],
        output: "（输入 85）\nB",
        footer: '<b>⚠️ 顺序很重要</b>：代码是从上往下执行的，一旦命中就不再往下走。'
      },
    },

    /* ===== 6 冲突：顺序颠倒 ===== */
    {
      id: 6, type: "code-walkthrough", title: "眼见为实：顺序颠倒的灾难", subtitle: "为什么 90 分变成了 C？", chapterTag: "第 5 讲 · 概念理解",
      data: {
        intro: "有个同学把条件顺序写反了，把 <code>score >= 60</code> 放到了最前面。<br>运行之后，输入 90 分，屏幕上竟然输出了 C！这是为什么？看代码：",
        codeFile: "codes/lesson-04/_error-order.cpp", snippet: "main",
        steps: [
          { title: "输入 90", line: 5, vars: { score: "90" }, note: "score 是 90。" },
          { title: "第一个条件", line: 7, vars: { score: "90" }, note: "先判断 <code>90 >= 60</code>，成立！<br>进入这层分支，输出 C。" },
          { title: "直接结束", line: 7, vars: { score: "90" }, note: "因为已经命中了，后面的 <code>else if</code> 根本没机会执行！<br>哪怕 90 分确实大于等于 90，也晚了。" }
        ],
        footer: '<b>📌 铁律</b>：范围窄的条件放前面，范围宽的条件放后面。<br>要么从大到小判断，要么从小到大判断，绝不能乱序。'
      }
    },

    /* ===== 7 练习1：成绩等级 ===== */
    {
      id: 7, type: "level-map", title: "课堂练习1：成绩等级", subtitle: "多分支判断", chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入分数 <code>score</code>：≥90 输出 A，≥80 输出 B，≥60 输出 C，否则输出 D。", timer: "⏱ 限时 6 分钟" },
        hints: ["用 <code>if-else if</code> 链", "从高分到低分判断", "不要忘了最后的 <code>else</code> 兜底"],
        answer: { codeFile: "codes/lesson-04/score-level.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "进入后面的分支时，系统就自动隐含了“小于上一档”的条件。" },
      },
    },

    /* ===== 8 逻辑运算符 ===== */
    {
      id: 8, type: "code-split", title: "逻辑运算符", subtitle: "组合多个条件",
      data: {
        intro: "📖 有时候一个条件不够用，我们需要组合多个条件。<br>比如“成绩大于 60 <b>并且</b> 小于 80”，就需要用到 <code>&&</code>（与）、<code>||</code>（或）、<code>!</code>（非）。",
        codeFile: "codes/lesson-04/logic-ops.cpp", snippet: "main",
        annotations: [
          { line: 7, title: "a > 0 && a < 10", desc: "两边都为真，结果才为真（范围判断）" },
          { line: 10, title: "a == 1 || a == 2", desc: "只要有一个为真，结果就为真（任一满足）" },
          { line: 13, title: "!(a > 0)", desc: "真变假，假变真（反向判断）" },
        ],
        output: "1\n1\n0",
        footer: '<b>📌 口诀</b>：与（&&）严——两边都要真；或（||）宽——一边真就行；非（!）反着来。'
      }
    },

    /* ===== 9 短路求值（初赛坑点） ===== */
    {
      id: 9, type: "code-walkthrough", title: "眼见为实：短路求值", subtitle: "初赛必考的底层逻辑", chapterTag: "第 5 讲 · 概念理解",
      data: {
        intro: "C++ 处理 <code>&&</code> 和 <code>||</code> 时，有一个非常聪明的“偷懒”机制。<br>看这段代码，体会一下程序是怎么执行 <code>||</code> 的：",
        codeFile: "codes/lesson-04/short-circuit.cpp", snippet: "main",
        steps: [
          { title: "初始状态", line: 6, vars: { a: "1", b: "1" }, note: "a 是 1，b 是 1。" },
          { title: "前半句为真", line: 9, vars: { a: "1", b: "1" }, note: "判断 <code>a > 0</code>，结果为 <b>true</b>。<br>因为是 <code>||</code>（或）运算，整个结果必定为真。" },
          { title: "后半句被跳过", line: 9, vars: { a: "1", b: "1" }, note: "所以，<b>程序根本没执行后面的 <code>b++</code>！</b><br>这就是短路求值。" },
          { title: "结果验证", line: 11, vars: { a: "1", b: "1" }, note: "最后输出 b 的值，依然是 1。<br>如果你以为 b 会变成 2，那就掉进坑里了。" }
        ],
        footer: '<b>📌 有什么用？</b>可以用来防止越界。<br><code>if (i < n && a[i] == 5)</code><br>如果 i 已经越界（前假），后面读数组的操作根本不会执行！'
      }
    },

    /* ===== 10 练习2：闰年判断 ===== */
    {
      id: 10, type: "level-map", title: "课堂练习2：闰年判断", subtitle: "用逻辑运算符组合条件", chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入年份 <code>year</code>，判断是否为闰年。<br>规则：能被 4 整除但不能被 100 整除，或者能被 400 整除。<br>输出 <code>yes</code> 或 <code>no</code>。", timer: "⏱ 限时 10 分钟" },
        hints: ["用 <code>&&</code> 和 <code>||</code> 组合条件", "能被 4 整除：<code>year % 4 == 0</code>", "注意“或者”的关系，括号千万别漏"],
        answer: { codeFile: "codes/lesson-04/leap-year.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: '条件分两部分：<br>① <code>year % 4 == 0 && year % 100 != 0</code>（普通闰年）<br>② <code>year % 400 == 0</code>（世纪闰年）<br>两者取"或"（<code>||</code>）关系。<br><b>括号不能漏</b>，否则优先级会出错。' },
      },
    },

    /* ===== 11 过渡页 ===== */
    {
      id: 11, type: "transition", title: "第二站 · switch 分拣机", subtitle: "精准投递",
      data: { note: '如果要判断 day 是 1 还是 2 还是 3……用 if 写下去，代码会变成灾难。' }
    },

    /* ===== 12 switch 多分支 ===== */
    {
      id: 12, type: "code-split", title: "switch 多分支", subtitle: "根据变量的值选择路径",
      data: {
        intro: "📖 判断具体的几个值，用 <code>switch</code> 更清爽。<br><b>语法</b>：<code>switch (变量) { case 值: ...; break; }</code>。",
        codeFile: "codes/lesson-04/switch-day.cpp", snippet: "main",
        annotations: [
          { line: 8, title: "switch (day)", desc: "根据 day 的值跳转" },
          { line: 9, title: "case 1:", desc: "当 day 等于 1 时执行" },
          { line: 9, title: "break;", desc: '跳出 switch，不写会"穿透"' },
        ],
        output: "（输入 3）\n周三",
        footer: '<b>⚠️ break 的作用</b>：不写 break，程序会继续执行下一个 case——这叫"<b>case 穿透</b>"。'
      },
    },

    /* ===== 13 switch 的坑 ===== */
    {
      id: 13, type: "pitfall", title: "switch 的穿透陷阱", subtitle: "忘写 break 的惨案",
      data: {
        cases: [
          { icon: "💣", scene: "输入 1，却输出了周一周二...", what: "全执行了一遍。", why: "匹配成功后，会一直顺延，直到遇到 break。", fix: "在每个 case 末尾加上 break。" },
          { icon: "🧠", scene: "灵魂拷问：这是 Bug 还是特性？", what: "是故意的特性。", why: "如果几个条件共用一段代码，利用穿透能少写。", fix: "新手期请无脑写上 break。" }
        ],
        footer: "<b>📌 机房自检</b>：写完 switch，向下扫一眼，确保每个 case 都有 break 兜底。"
      }
    },

    /* ===== 14 练习3：星期几查询 ===== */
    {
      id: 14, type: "level-map", title: "课堂练习3：星期几查询", subtitle: "switch 实战", chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入数字（1—7），输出对应的星期几。<br>输入样例：<code>3</code>　输出样例：<code>周三</code>", timer: "⏱ 限时 5 分钟" },
        hints: ["用 <code>switch</code> 语法", "不要忘记写 <code>break</code>", "用 <code>default</code> 处理无效输入"],
        answer: { codeFile: "codes/lesson-04/switch-day.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "每一个 case 后面必须跟上 break，防止穿透。" },
      },
    },

    /* ===== 15 初赛渗透 ===== */
    {
      id: 15, type: "grid", title: "初赛小知识：短路与穿透", subtitle: "CSP-J/S 初赛必考", chapterTag: "第 5 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "⚡", title: "短路求值", desc: "<code>a && b</code> 中 a 为假，b 不执行<br><code>a || b</code> 中 a 为真，b 不执行<br><b>常考：变量值变了没？</b>" },
          { icon: "💣", title: "switch 穿透", desc: "不写 break，会从匹配的 case 一直往下执行。<br><b>常考：最后输出了几行？</b>" },
          { icon: "🧩", title: "悬挂 else", desc: "不加大括号时，else 总是与<b>最近的未配对 if</b> 结合。<br><b>常考：else 属于谁？</b>" }
        ],
        footer: '<b>📌 怎么考？</b><br>给你一段复杂的代码，问你最后输出了什么，或者变量变成了几。'
      }
    },

    /* ===== 16 课堂小测 ===== */
    {
      id: 16, type: "quiz", title: "课堂小测", subtitle: "多分支与 switch", chapterTag: "第 5 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 分支结构", optionLayout: "horizontal", question: "下面代码的输出是？（注意看缩进）", questionCode: "int a = 5;\nif (a > 3)\n    if (a > 4)\n        cout << \"A\";\nelse\n    cout << \"B\";", options: [ { label: "A", text: "A", correct: true }, { label: "B", text: "B" }, { label: "C", text: "AB" }, { label: "D", text: "编译错误" } ], analysis: "经典的<b>“悬挂 else”</b>陷阱。<br>C++ 编译器无视缩进！<br>它属于内层 <code>if (a > 4)</code>。本题 a = 5，条件成立，输出 A。" },
          { id: 2, type: "single", difficulty: 3, source: "2020 CSP-J 初赛 · 第 5 题", optionLayout: "vertical", question: "以下关于 C++ 逻辑运算符的说法，正确的是？", options: [ { label: "A", text: "<code>a &amp;&amp; b</code> 中，若 a 为假，则 b 不会被求值", correct: true }, { label: "B", text: "<code>a || b</code> 中，两边都会求值" }, { label: "C", text: "<code>!</code> 的优先级低于 <code>&amp;&amp;</code>" }, { label: "D", text: "<code>&amp;&amp;</code> 和 <code>||</code> 优先级相同" } ], analysis: "C++ 逻辑运算符有<b>短路求值</b>特性。<br>A 正确；B 错误。<br>C 错误：<code>!</code> 优先级高于 <code>&amp;&amp;</code>。<br>D 错误：<code>&amp;&amp;</code> 优先级高于 <code>||</code>。" },
          { id: 3, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第二章", optionLayout: "two-cols", question: "在 switch 语句中，每个 case 后面必须写 break，否则程序会继续执行下一个 case。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: '不写 break 会导致"<b>case 穿透</b>"，直到遇到 break 或 switch 结束。' },
        ],
      },
    },

    /* ===== 17 今日总结 ===== */
    {
      id: 17, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "条件越多，越要理清顺序。", author: "—— 分支结构第二课",
        points: [ "if-else if 从上往下判断，命中即止", "&& 两边真才真，|| 一边真就真", "短路求值：前面决定了，后面就不执行了", "switch 适合等值判断，注意 break 防穿透" ],
        highlight: { title: "📌 关键口诀", desc: "多分支排好队，范围窄的放前位；与严或宽非反转，短路后面不计算；switch 分拣真方便，break 兜底防穿透。" },
      },
    },

    /* ===== 18 课后作业 ===== */
    {
      id: 18, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5711", link: "https://www.luogu.com.cn/problem/P5711", desc: "<b>闰年判断</b><br>考察：逻辑运算<br>难度：★★" },
          { icon: "🟢", title: "基础 2 · P5716", link: "https://www.luogu.com.cn/problem/P5716", desc: "<b>月份天数</b><br>考察：switch 穿透<br>难度：★★" },
          { icon: "🔴", title: "挑战 · P1085", link: "https://www.luogu.com.cn/problem/P1085", desc: "<b>不高兴的津津</b><br>考察：多分支、逻辑判断<br>难度：★★" },
        ],
      },
    },

    /* ===== 19 下节预告 ===== */
    {
      id: 19, type: "radial", title: "下节预告", subtitle: "第 6 讲 · 循环结构",
      data: { center: "循环结构", items: [ { text: "for 循环" }, { text: "while 循环" }, { text: "自增自减 i++" }, { text: "死循环急救" } ] },
    },

    /* ===== 20 结束页 ===== */
    {
      id: 20, type: "ending", title: "第五讲结束", subtitle: "你的程序，逻辑更加缜密了", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 下一站：重复的力量",
          desc: "今天你掌握了组合条件与分拣机，程序的判断力已经拉满。<br><br>但程序目前还是只能“执行一次”。如果让你算 1 加到 1 亿，你不可能写 1 亿行 if。<br>下一讲，我们将解锁编程中最核心的引擎——<b>循环</b>。<br>还有神秘的 `i++`，我们循环见！",
          variant: "card-glow"
        }
      },
    },
  ],
};
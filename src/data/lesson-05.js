export default {
  title: "第 5 讲 多分支与 switch",
  subtitle: "让判断更加精准",
  total: 22,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    { id: 1, type: "cover", title: "多分支与 switch", subtitle: "让判断更加精准", chapterTag: false, data: { accentWord: "分拣", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 5 讲"] } },

    /* ===== 2 上节回顾 ===== */
    {
      id: 2, type: "timeline", variant: "review", title: "上节课回顾", subtitle: "运算符与基础分支",
      data: { items: [ { icon: "⚖️", badge: "测谎仪", title: "关系运算符", desc: "结果只有真假", points: ["== 和 != 的区别"] }, { icon: "🚪", badge: "安检门", title: "if-else", desc: "单/双分支", points: ["为真怎么走，为假怎么走"] }, { icon: "🔗", badge: "组合", title: "逻辑运算符", desc: "多个条件怎么连", points: ["&& 与 || 的用法"] }, { icon: "⚡", badge: "短路", title: "短路求值", desc: "初赛必考", points: ["前面不满足，后面不执行"] } ] }
    },

    /* ===== 3 学习地图 ===== */
    {
      id: 3, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "两站闯关，解锁终极判断",
      data: { items: [ { icon: "🪜", badge: "第一站", title: "多分支与陷阱", desc: "多条岔路口", points: ["if-else-if 语法", "顺序陷阱", "悬挂 else"] }, { icon: "📮", badge: "第二站", title: "switch 分拣机", desc: "等值匹配", points: ["case 与穿透", "综合实战：计算器"] } ] }
    },

    /* ===== 4 痛点引入：多分支 ===== */
    {
      id: 4, type: "dialog", title: "只会分“赢”和“输”怎么行？", subtitle: "多分支的痛点引入", chapterTag: "第 5 讲 · 概念理解",
      data: { 
        lines: [ 
          { who: "student", text: "小 C，我用上一节课的 if-else 写了个判断游戏结果的程序。" }, 
          { who: "student", text: "如果赢了输出“胜利”，输了输出“失败”。" }, 
          { who: "robot", text: "那如果我要分得更细呢？比如：赢了 40 局是“王者”，30 局“黄金”，20 局“白银”，10 局“青铜”。你用 if-else 怎么写？" }, 
          { 
            who: "student", 
            text: "那我只能在 if 里面再套一个 if，再套一个 if…… 就像这样：<br><pre style='background:#1e2a44; padding:12px; border-radius:8px; color:#e6f1ff; font-family:var(--font-code); font-size:14px; line-height:1.5; overflow-x:auto;'><code>if (win &gt;= 40) {\n    cout &lt;&lt; \"王者\";\n} else {\n    if (win &gt;= 30) {\n        cout &lt;&lt; \"黄金\";\n    } else {\n        if (win &gt;= 20) {\n            cout &lt;&lt; \"白银\";\n        } else {\n            if (win &gt;= 10) {\n                cout &lt;&lt; \"青铜\";\n            }\n        }\n    }\n}</code></pre>代码简直变成了一个向右缩进的“箭头”，不仅看着累，如果段位再增加，我就要疯了！" 
          }, 
          { who: "robot", text: "这就叫“嵌套地狱”。遇到这种情况，其实 C++ 提供了一个专门把“多条岔路口”排成一排的语法，这就是 <code>if-else if</code>。" } 
        ] 
      }
    },

    /* ===== 5 if-else-if 语法 ===== */
    {
      id: 5, type: "code-split", title: "if-else if 多分支", subtitle: "多条路，只走一条",
      data: { 
        intro: "📖 <b>题目要求</b>：输入胜场数 <code>win</code>，输出对应的段位。<br>用 <code>if-else if</code> 改写，所有条件就排成了齐平的一排，清爽多了！<br><b>语法规则</b>：从上到下依次判断，<b>一旦某个条件成立，后面不再判断</b>。", 
        codeFile: "codes/lesson-04/if-else-if.cpp", 
        snippet: "main", 
        annotations: [ 
          { line: 8, title: "win &gt;= 40", desc: "先判断最高段位" }, 
          { line: 10, title: "else if", desc: "上一个条件不成立时，才判断这一个" }, 
          { line: 18, title: "else", desc: "兜底选项（低于 10 局的情况）" } 
        ], 
        output: "（输入 25）\n白银", 
        footer: '<b>⚠️ 顺序很重要</b>：代码是从上往下执行的，一旦命中就不再往下走。所以条件必须从大到小（或从小到大）有规律地排列。' 
      }
    },

    /* ===== 6 冲突：顺序颠倒 ===== */
    {
      id: 6, type: "code-walkthrough", title: "眼见为实：顺序颠倒的灾难", subtitle: "为什么 90 分变成了 C？", chapterTag: "第 5 讲 · 概念理解",
      data: { intro: "有个同学把条件顺序写反了，把 <code>score &gt;= 60</code> 放到了最前面。<br>运行之后，输入 90 分，屏幕上竟然输出了 C！这是为什么？看代码：", codeFile: "codes/lesson-04/_error-order.cpp", snippet: "main", steps: [ { title: "输入 90", line: 5, vars: { score: "90" }, note: "score 是 90。" }, { title: "第一个条件", line: 7, vars: { score: "90" }, note: "先判断 <code>90 &gt;= 60</code>，成立！<br>进入这层分支，输出 C。" }, { title: "直接结束", line: 7, vars: { score: "90" }, note: "因为已经命中了，后面的 <code>else if</code> 根本没机会执行！<br>哪怕 90 分确实大于等于 90，也晚了。" } ], footer: '<b>📌 铁律</b>：范围窄的条件放前面，范围宽的条件放后面。绝不能乱序。' }
    },

    /* ===== 7 练习1：成绩等级 ===== */
    {
      id: 7, type: "level-map", title: "课堂练习1：成绩等级", subtitle: "多分支判断", chapterTag: "第 5 讲 · 实战演练",
      data: { question: { title: "题干", desc: "输入分数 <code>score</code>：≥90 输出 A，≥80 输出 B，≥60 输出 C，否则输出 D。", timer: "⏱ 限时 6 分钟" }, hints: ["用 <code>if-else if</code> 链", "从高分到低分判断", "不要忘了最后的 <code>else</code> 兜底"], answer: { codeFile: "codes/lesson-04/score-level.cpp", snippet: "main" }, analysis: { title: "📖 解析", desc: "进入后面的分支时，系统就自动隐含了“小于上一档”的条件。" } }
    },

    /* ===== 8 悬挂 else（初赛大坑） ===== */
    {
      id: 8, type: "code-walkthrough", title: "初赛大坑：悬挂 else", subtitle: "凭空多出来的输出？", chapterTag: "第 5 讲 · 概念理解",
      data: {
        intro: "为了偷懒，我们经常在只有一行代码时省略大括号。<br>现在我们要判断：如果 a 大于 0，输出 A；否则输出 C。<br>看这段代码，本来挺正常的：",
        codeFile: "codes/lesson-04/dangling-else.cpp", 
        snippet: "main",
        steps: [
          { 
            title: "1. 初始逻辑", 
            line: 7, 
            hiddenLines: [9, 10, 11, 12], // 隐藏新增的内层 if 和 else
            placeholder: "        // 暂无其他逻辑", // 占位符
            vars: { a: "3" }, 
            note: "a 是 3。<code>a &gt; 0</code> 成立，输出 A。<br>因为没进 else，所以不输出 C。<b>结果：输出 A。</b>" 
          },
          { 
            title: "2. 插入新需求", 
            line: 9, 
            hiddenLines: [11, 12], // 只隐藏 else
            placeholder: "", 
            vars: { a: "3" }, 
            note: "现在需求变了：如果 a 大于 5，额外输出 B。<br>我们顺手在这个位置加了一个内层 <code>if</code>。<br>因为 3 不大于 5，没进内层。外层原本输出的 A 还在，所以<b>结果：输出 A。</b>" 
          },
          { 
            title: "3. 加入 else", 
            line: 11, 
            hiddenLines: [], // 全部显示
            vars: { a: "3" }, 
            note: "现在把原本想给外层兜底的 <code>else</code> 加上（注意缩进，它和外层是对齐的）。<br>按理说它还是不该执行。但你看屏幕……<b>它竟然输出了 C！</b>" 
          },
          { 
            title: "4. 真相大白", 
            line: 11, 
            hiddenLines: [],
            vars: { a: "3" }, 
            note: "为什么凭空多出了 C？<br>因为 <code>else</code> 被内层的 <code>if (a &gt; 5)</code> 抢走了！<br>编译器无视缩进，<b>谁离得近，else 就跟谁走。</b><br>3 不大于 5，条件不成立，于是执行了属于它的 else，输出了 C。" 
          }
        ],
        extra: {
          title: "💡 为什么编译器不报错？",
          desc: "因为这段代码在语法上<b>完全合法</b>！<br>C++ 编译器根本不在乎你怎么缩进，它只按“就近原则”强行把 else 塞给了内层 if。<br>这就是为什么它被称为“静默杀手”——语法没报错，但你的逻辑全毁了。<br><br><b>想要它按你的缩进工作？必须用大括号把内外层物理隔离！</b>",
          variant: "card-primary"
        },
        footer: '<b>📌 保命法则</b>：永远不要依赖缩进！只要写嵌套 if，<b>无论如何都要加上大括号 {}</b>，用物理边界锁死逻辑。'
      }
    },

    /* ===== 9 过渡页 ===== */
    {
      id: 9, type: "transition", title: "第二站 · switch 分拣机", subtitle: "精准投递", data: { note: 'if-else-if 处理“范围”很方便。但如果是像查表一样，精准匹配几个固定的值，还有更清爽的写法。' }
    },

    /* ===== 10 switch 多分支 ===== */
    {
      id: 10, type: "code-split", title: "switch 多分支", subtitle: "根据变量的值选择路径",
      data: { intro: "📖 判断具体的几个值，用 <code>switch</code> 更清爽。<br><b>语法</b>：<code>switch (变量) { case 值: ...; break; }</code>。", codeFile: "codes/lesson-04/switch-day.cpp", snippet: "main", annotations: [ { line: 8, title: "switch (day)", desc: "根据 day 的值跳转" }, { line: 9, title: "case 1:", desc: "当 day 等于 1 时执行" }, { line: 9, title: "break;", desc: '跳出 switch，不写会"穿透"' }, { line: 16, title: "default:", desc: "兜底选项，处理未匹配的情况" } ], output: "（输入 3）\n周三", footer: '<b>⚠️ break 的作用</b>：不写 break，程序会继续执行下一个 case——这叫"<b>case 穿透</b>"。' }
    },

    /* ===== 11 switch 的穿透陷阱 ===== */
    {
      id: 11, type: "pitfall", title: "switch 的穿透陷阱", subtitle: "忘写 break 的惨案",
      data: { cases: [ { icon: "💣", scene: "输入 1，却输出了周一周二...", what: "全执行了一遍。", why: "匹配成功后，会一直顺延，直到遇到 break。", fix: "在每个 case 末尾加上 break。" }, { icon: "🧠", scene: "灵魂拷问：这是 Bug 还是特性？", what: "是故意的特性。", why: "如果几个条件共用一段代码，利用穿透能少写。", fix: "新手期请无脑写上 break。" } ], footer: "<b>📌 机房自检</b>：写完 switch，向下扫一眼，确保每个 case 都有 break 兜底。" }
    },

    /* ===== 12 穿透的妙用 ===== */
    {
      id: 12, type: "code-split", title: "避坑：穿透的妙用", subtitle: "多个 case 共享代码",
      data: {
        intro: "既然不写 break 会穿透，那我们能不能<b>故意利用穿透</b>来简化代码？<br>比如判断工作日和休息日：1-5 是工作日，6-7 是休息日。不用写 7 个 case，只需要巧妙合并。",
        codeFile: "codes/lesson-04/switch-fallthrough.cpp", snippet: "main",
        annotations: [
          { line: 9, title: "case 1: case 2: ...", desc: "1 到 5 都不写 break，让它们顺延到同一处" },
          { line: 10, title: "cout << \"工作日\"", desc: "只要命中 1-5 任何一个，都会执行这里" },
          { line: 11, title: "break;", desc: "输出完工作日，必须退出，否则会继续执行休息日" },
        ],
        output: "（输入 6）\n休息日",
        footer: '<b>📌 经验</b>：连续的、处理逻辑相同的 case，故意省略 break 是一种非常优雅的写法。'
      }
    },

    /* ===== 13 练习2：星期几查询 ===== */
    {
      id: 13, type: "level-map", title: "课堂练习2：星期几查询", subtitle: "switch 实战", chapterTag: "第 5 讲 · 实战演练",
      data: { question: { title: "题干", desc: "输入数字（1—7），输出对应的星期几。<br>输入样例：<code>3</code>　输出样例：<code>周三</code>", timer: "⏱ 限时 5 分钟" }, hints: ["用 <code>switch</code> 语法", "不要忘记写 <code>break</code>", "用 <code>default</code> 处理无效输入"], answer: { codeFile: "codes/lesson-04/switch-day.cpp", snippet: "main" }, analysis: { title: "📖 解析", desc: "每一个 case 后面必须跟上 break，防止穿透。" } }
    },

    /* ===== 14 if vs switch ===== */
    {
      id: 14, type: "compare", title: "if vs switch", subtitle: "什么时候用谁？",
      data: {
        neutral: true, splitStep: true,
        groups: [
          { leftLabel: "if-else-if", rightLabel: "switch", wrong: "<b>擅长判断范围</b>", right: "<b>擅长匹配精准值</b>" },
          { leftLabel: "例子", rightLabel: "例子", wrong: "<code>if (score >= 60)</code><br><code>if (a > 0 && a < 10)</code>", right: "<code>case 1:</code><br><code>case \'A\':</code><br><code>case \'+\':</code>" },
          { leftLabel: "特点", rightLabel: "特点", wrong: "灵活，能处理各种复杂逻辑", right: "清爽，但只能判断整数或字符。" }
        ],
        footer: '<b>📌 选型口诀</b>：判断“范围”用 if，判断“等于几”用 switch。'
      }
    },

    /* ===== 15 练习3：综合实战 简易计算器 ===== */
    {
      id: 15, type: "level-map", title: "课堂练习3：简易计算器", subtitle: "综合运用 switch 和 if", chapterTag: "第 5 讲 · 实战演练",
      data: { 
        question: { title: "题干", desc: "输入一个简单算式（如 <code>3 + 5</code>），输出计算结果。<br>运算符包含 <code>+ - * /</code>。<br>如果除数为 0，输出 <code>Divided by zero!</code>。<br>输入样例：<code>10 / 2</code>　输出样例：<code>5</code>", timer: "⏱ 限时 8 分钟" }, 
        hints: ["读入格式是：<code>cin >> a >> op >> b;</code>，其中 op 是 char 类型", "对 <code>op</code> 进行 switch 判断", "在除号 <code>/</code> 的 case 里，还要嵌套一个 if 判断分母是否为 0", "不要忘记 break"], 
        answer: { codeFile: "codes/lesson-04/switch-calc.cpp", snippet: "main" }, 
        analysis: { title: "📖 解析", desc: "这道题完美结合了 char 输入、switch 选择、以及 switch 内部嵌套 if 判断。" } 
      }
    },

    /* ===== 16 初赛渗透 ===== */
    {
      id: 16, type: "grid", title: "初赛小知识：switch 考点", subtitle: "CSP-J/S 初赛必考", chapterTag: "第 5 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "⚠️", title: "参数限制", desc: "switch 括号里的变量，只能是<b>整数</b>或<b>字符</b>。<br>不能用 double 或 string。" },
          { icon: "💣", title: "穿透效应", desc: "某个 case 没写 break，下面的代码会全部执行。<br><b>常考：最后输出了几行？</b>" },
          { icon: "🪜", title: "嵌套 if", desc: "else 永远和最近的未配对 if 结合。<br><b>常考：缩进骗人，究竟属于谁？</b>" }
        ],
        footer: '<b>📌 怎么考？</b><br>给一段带穿透的 switch 代码，问你最终输出什么，或者问哪个 case 没有执行。'
      }
    },

    /* ===== 17 课堂小测 ===== */
    {
      id: 17, type: "quiz", title: "课堂小测", subtitle: "多分支与 switch", chapterTag: "第 5 讲 · 课堂小测",
      data: { 
        questions: [ 
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 真题", optionLayout: "horizontal", question: "在 if-else if 语句中，如果第一个条件成立，后面的 else if 还会进行判断吗？", options: [ { label: "A", text: "会" }, { label: "B", text: "不会", correct: true } ], analysis: "一旦前面命中，后面的条件会被直接跳过，不再判断。" },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 分支结构", optionLayout: "horizontal", question: "下面代码的输出是？（注意看缩进）", questionCode: "int a = 3;\nif (a > 0)\n    if (a > 5)\n        cout << \"A\";\nelse\n    cout << \"B\";", options: [ { label: "A", text: "A" }, { label: "B", text: "B", correct: true }, { label: "C", text: "什么都不输出" }, { label: "D", text: "编译错误" } ], analysis: "这是经典的“悬挂 else”陷阱。<br>else 永远跟最近的未配对 if 结合，所以它属于内层 <code>if (a &gt; 5)</code>。<br>a = 3，外层成立进入内层，内层不成立执行 else，输出 B。" },
          { id: 3, type: "single", difficulty: 3, source: "CSP-J 初赛真题练习 · switch", optionLayout: "vertical", question: "若 <code>int x = 2;</code>，以下代码输出什么？", questionCode: "switch(x) {\n    case 1: cout << \"1\";\n    case 2: cout << \"2\";\n    case 3: cout << \"3\";\n    default: cout << \"4\";\n}", options: [ { label: "A", text: "2" }, { label: "B", text: "23" }, { label: "C", text: "234", correct: true }, { label: "D", text: "4" } ], analysis: "经典的 case 穿透！<br>x = 2，匹配到 case 2，因为后面<b>没有 break</b>，所以程序会继续往下执行 case 3 和 default。最终输出 234。" },
          { id: 4, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第二章", optionLayout: "two-cols", question: "switch 语句的括号里可以放入一个 double 类型的变量。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: "错误。switch 只能匹配整数或字符，不能匹配浮点数或字符串。" } 
        ] 
      }
    },

    /* ===== 18 今日总结 ===== */
    {
      id: 18, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: { text: "条件越多，越要理清顺序。", author: "—— 分支结构第二课", points: [ "if-else if 从上往下判断，命中即止", "范围窄的条件放前面，范围宽放后面", "悬挂 else 永远是就近匹配，必须加括号", "switch 适合等值判断，注意 break 防穿透", "利用穿透可以合并相同的 case" ], highlight: { title: "📌 关键口诀", desc: "多分支排好队，范围窄的放前位；嵌套必加大括号，不被缩进骗；switch 分拣真方便，break 兜底防穿透。" } }
    },

    /* ===== 19 课后作业 ===== */
    {
      id: 19, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: { 
        cards: [ 
          { icon: "🟢", title: "基础 1 · P5711", link: "https://www.luogu.com.cn/problem/P5711", desc: "<b>闰年判断</b><br>考察：逻辑运算<br>难度：★★" }, 
          { icon: "🟢", title: "基础 2 · P5716", link: "https://www.luogu.com.cn/problem/P5716", desc: "<b>月份天数</b><br>考察：switch 穿透<br>难度：★★" }, 
          { icon: "🔴", title: "挑战 · P1422", link: "https://www.luogu.com.cn/problem/P1422", desc: "<b>小玉家的电费</b><br>考察：多分支阶梯计价<br>难度：★★" } 
        ] 
      }
    },

    /* ===== 20 下节预告 ===== */
    {
      id: 20, type: "radial", title: "下节预告", subtitle: "第 6 讲 · 循环结构",
      data: { center: "循环结构", items: [ { text: "for 循环" }, { text: "while 循环" }, { text: "自增自减 i++" }, { text: "死循环急救" } ] }
    },

    /* ===== 21 答疑与词汇 ===== */
    {
      id: 21, type: "grid", title: "答疑与单词", subtitle: "把你不懂的问题，大声说出来", chapterTag: "第 5 讲 · 互动",
      data: { cards: [ { icon: "📮", title: "关于 switch", desc: "switch 和 if 怎么选？<br>穿透到底有什么用？" }, { icon: "📖", title: "本讲单词", desc: "<b>switch</b>：开关 / 分拣<br><b>case</b>：情况<br><b>default</b>：默认<br><b>fall-through</b>：穿透" } ], footer: '提问的三个层次：① 是什么 ② 为什么 ③ 怎么办。' }
    },

    /* ===== 22 结束页 ===== */
    {
      id: 22, type: "ending", title: "第五讲结束", subtitle: "你的程序，逻辑更加缜密了", chapterTag: false,
      data: { slogan: "科学教育 · 创新课程", extra: { title: "🌟 下一站：重复的力量", desc: "今天你掌握了组合条件与分拣机，程序的判断力已经拉满。<br><br>但程序目前还是只能“执行一次”。如果让你算 1 加到 1 亿，你不可能写 1 亿行 if。<br>下一讲，我们将解锁编程中最核心的引擎——<b>循环</b>。<br>还有神秘的 `i++`，我们循环见！", variant: "card-glow" } }
    },
  ],
};
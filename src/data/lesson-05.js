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
        codeFile: "codes/lesson-05/if-else-if.cpp", 
        snippet: "main", 
        annotations: [ 
          { line: 8, title: "win &gt;= 40", desc: "先判断最高段位" }, 
          { line: 10, title: "else if", desc: "上一个条件不成立时，才判断这一个" }, 
          { line: 16, title: "else", desc: "兜底选项（低于 10 局的情况）" } 
        ], 
        output: "（输入 25）\n白银", 
        extra: { desc: '<b>⚠️ 顺序很重要</b>：代码是从上往下执行的，一旦命中就不再往下走。所以条件必须从大到小（或从小到大）有规律地排列。', variant: 'flat' } 
      }
    },

    /* ===== 6 冲突：顺序颠倒 ===== */
    {
      id: 6, type: "code-walkthrough", title: "眼见为实：顺序颠倒的灾难", subtitle: "为什么 90 分变成了 C？", chapterTag: "第 5 讲 · 概念理解",
      data: { intro: "有个同学把条件顺序写反了，把 <code>score &gt;= 60</code> 放到了最前面。<br>运行之后，输入 90 分，屏幕上竟然输出了 C！这是为什么？看代码：", codeFile: "codes/lesson-05/_error-order.cpp", snippet: "main", steps: [ { title: "输入 90", line: 5, vars: { score: "90" }, note: "score 是 90。" }, { title: "第一个条件", line: 7, vars: { score: "90" }, note: "先判断 <code>90 &gt;= 60</code>，成立！<br>进入这层分支，输出 C。" }, { title: "直接结束", line: 7, vars: { score: "90" }, note: "因为已经命中了，后面的 <code>else if</code> 根本没机会执行！<br>哪怕 90 分确实大于等于 90，也晚了。" } ], extra: { desc: '<b>📌 铁律</b>：范围窄的条件放前面，范围宽的条件放后面。绝不能乱序。', variant: 'flat' } }
    },

    /* ===== 7 练习1：成绩等级 ===== */
    {
      id: 7, type: "level-map", title: "课堂练习1：成绩等级", subtitle: "多分支判断", chapterTag: "第 5 讲 · 实战演练",
      data: { question: { title: "题干", desc: "输入分数 <code>score</code>：≥90 输出 A，≥80 输出 B，≥60 输出 C，否则输出 D。", timer: "⏱ 限时 6 分钟" }, hints: ["用 <code>if-else if</code> 链", "从高分到低分判断", "不要忘了最后的 <code>else</code> 兜底"], answer: { codeFile: "codes/lesson-05/score-level.cpp", snippet: "main" }, analysis: { title: "📖 解析", desc: "进入后面的分支时，系统就自动隐含了“小于上一档”的条件。" } }
    },

    /* ===== 8 悬挂 else（初赛大坑） ===== */
    {
      id: 8, type: "code-walkthrough", title: "初赛大坑：悬挂 else", subtitle: "凭空多出来的输出？", chapterTag: "第 5 讲 · 概念理解",
      data: {
        intro: "为了偷懒，我们经常在只有一行代码时省略大括号。<br>看这段代码，本来它能完美判断：输入 3 输出 A；输入 -3，走 else 输出 C。<br>运行完美。<br>但后来，需求变了……",
        codeFile: "codes/lesson-05/dangling-else.cpp", 
        snippet: "main",
        steps: [
          { 
            title: "1. 初始逻辑", 
            line: 7, 
            hiddenLines: [9, 10], // 隐藏新加的内层 if
            vars: { a: "3" }, 
            note: "此时输入 <b>3</b>，输出 A。<br>（如果输入 <b>-3</b>，走 else，输出 C）。<br>原本的逻辑毫无破绽。" 
          },
          { 
            title: "2. 插入新需求", 
            line: 9, 
            hiddenLines: [], // 全部显示
            vars: { a: "6" }, 
            note: "现在加个需求：大于 5 就额外输出 B。<br>我们顺手加了一个内层 <code>if</code>。<br>输入 <b>6</b>：外层输出 A，内层 6 > 5 输出 B。<br><b>结果：输出 AB。看起来一切正常。</b>" 
          },
          { 
            title: "3. 灾难降临", 
            line: 11, 
            hiddenLines: [],
            vars: { a: "3" }, 
            note: "现在再输入 <b>3</b> 试试。<br>外层输出 A。内层 3 > 5 不成立……<br><b>结果竟然输出了 C，变成了 AC！</b><br>为什么 C 突然跑出来了？" 
          },
          { 
            title: "4. 彻底崩盘", 
            line: 7, 
            hiddenLines: [],
            vars: { a: "-3" }, 
            note: "那输入 <b>-3</b> 呢？<br>外层 -3 > 0 不成立，跳过外层 <code>if</code>。<br><b>结果什么都没输出。</b><br>连原本该有的 C 都没了！" 
          }
        ],
        extra: {
          title: "💡 为什么逻辑全毁了？",
          desc: "因为 C++ 编译器有个“就近原则”：<code>else</code> 永远和离它最近、且未配对的 <code>if</code> 结合。<br>加了内层 <code>if</code> 后，那个 <code>else</code> 被内层抢走了！<br><br>当 a=3 时，内层 3>5 不成立，执行被抢走的 else，输出 C。<br>当 a=-3 时，外层不成立直接跳过，内层根本没机会执行，所以什么都没输出。<br><br>这就是可怕的“悬挂 else”陷阱：语法没报错，但逻辑全毁。<br><b>解法：写嵌套 if 时，必须加大括号隔离。</b>",
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
      id: 10, type: "split", title: "switch 分拣机", subtitle: "如何优雅地匹配多个固定值？",
      data: {
        intro: "📖 刚学了 <code>if-else if</code>，如果我们要判断星期一到星期日，得写 7 个 <code>else if</code>。<br>但其实，如果只是比对**固定的值**，用 <code>switch</code> 就像快递分拣机一样清爽：",
        panes: [
          {
            title: "代码骨架",
            icon: "💻",
            codeFile: "codes/lesson-05/switch-day.cpp",
            snippet: "main"
          },
          {
            title: "分拣机原理",
            icon: "📦",
            items: [
              { title: "1. switch (day)", desc: "把 <code>day</code> 这个包裹放上传送带。" },
              { title: "2. 逐层比对", desc: "包裹往下走，看看是不是 <code>case 1</code>？不是，继续走。是不是 <code>case 2</code>？不是……" },
              { title: "3. 匹配成功", desc: "走到 <code>case 3</code>，发现包裹标签也是 3，匹配成功！进入这个格子执行代码。" },
              { title: "4. 紧急刹车", desc: "执行完输出后，必须遇到 <code>break</code>，否则传送带不会停，会继续掉进下一个格子里（这就是穿透）。" }
            ]
          }
        ],
        extra: { desc: '<b>📌 核心对比</b>：<br>如果是判断 <b>范围</b>（如成绩 60~80），用 <code>if</code>；<br>如果是判断 <b>具体是几</b>（如星期几、选项 A/B/C），用 <code>switch</code>。', variant: 'flat' }
      }
    },

    /* ===== 11 switch 的穿透陷阱（动态代码演示） ===== */
    {
      id: 11, type: "code-walkthrough", title: "眼见为实：穿透的灾难", subtitle: "删掉 break 会发生什么？", chapterTag: "第 5 讲 · 概念理解",
      data: {
        intro: "刚才的代码写得好好的，每个 <code>case</code> 后面都有 <code>break</code>。<br>现在，<b>假设你忘了写 break</b>（或者自己把它删了），程序会怎么运行？我们来跑一下：",
        codeFile: "codes/lesson-05/switch-penetration.cpp", 
        snippet: "main",
        steps: [
          { 
            title: "1. 正常情况", 
            line: 9, // 高亮 cout << "周一"
            hiddenLines: [], 
            vars: { day: "1" }, 
            note: "day 是 1，匹配到 <code>case 1</code>。<br>输出“周一”，然后遇到 <code>break</code>，程序直接跳出 switch。<b>完美结束。</b>" 
          },
          { 
            title: "2. 致命手滑", 
            line: 8, // 高亮 case 1
            hiddenLines: [10, 13, 16], // 精确隐藏三个 break 行
            placeholder: "            // 不小心删掉了 break", 
            vars: { day: "1" }, 
            note: "现在我们把 3 个 <code>break</code> 全删了。<br>你觉得输出还会是“周一”吗？" 
          },
          { 
            title: "3. 失控的开始", 
            line: 11, // 高亮 case 2
            hiddenLines: [10, 13, 16], 
            placeholder: "            // 不小心删掉了 break", 
            vars: { day: "1" }, 
            note: "因为没了 <code>break</code>，执行完“周一”后，程序<b>根本停不下来</b>！<br>它像穿透了一样，顺延执行了 <code>case 2</code>，输出了“周二”。" 
          },
          { 
            title: "4. 穿透到底", 
            line: 14, // 高亮 case 3
            hiddenLines: [10, 13, 16], 
            placeholder: "            // 不小心删掉了 break", 
            vars: { day: "1" }, 
            note: "它继续往下掉，执行了 <code>case 3</code>，输出了“周三”。<br><b>最终屏幕输出：周一周二周三。</b><br>这就是可怕的 <b>case 穿透</b>。" 
          }
        ],
        extra: {
          title: "💡 进阶思考：穿透只有坏处吗？",
          desc: "其实，“穿透”是 C++ 故意设计的特性。<br>如果几个条件要执行完全一样的代码，利用穿透能大幅减少代码量。<br>比如判断工作日和休息日：<br><code>case 1: case 2: case 3: case 4: case 5:<br>    cout &lt;&lt; \"工作日\";<br>    break;</code><br>因为 1-5 都没写 break，所以只要命中其中任意一个，都会顺延到这一行。这就是高级程序员的优雅写法。",
          variant: "card-primary"
        },
        footer: '<b>📌 铁律</b>：新手期，把每个 case 都写上 break 最安全。等你完全掌握了，再去尝试利用穿透。'
      }
    },

    /* ===== 12 练习2：工作日与休息日 ===== */
    {
      id: 12, type: "level-map", title: "课堂练习2：工作日与休息日", subtitle: "巧用 switch 穿透与排版", chapterTag: "第 5 讲 · 实战演练",
      data: { 
        question: { 
          title: "题干", 
          desc: "输入数字（1—7），如果对应的是周一到周五，输出 <code>工作日</code>；如果是周六或周日，输出 <code>休息日</code>。<br>输入样例：<code>3</code>　输出样例：<code>工作日</code>", 
          timer: "⏱ 限时 5 分钟" 
        }, 
        hints: [
          "不要写 7 个 <code>cout</code>！利用刚刚学过的 <b>case 穿透</b>", 
          "连续的 case 可以共用一段代码和 break", 
          "注意观察连续 case 在同一行的排版技巧"
        ], 
        
        steps: [
          {
            title: "思路 1：基础穿透（6 和 7）",
            desc: "周六和周日都是休息日。<br>我们可以在 <code>case 6:</code> 的后面不写任何代码和 break，让它直接穿透到 <code>case 7:</code>，共用下面的输出。",
            highlightLines: [13, 14, 15, 16], // 高亮 6 和 7 的部分
            hiddenLines: [10, 11, 12], // 隐藏 1 到 5 的部分
            placeholder: "        // 1 到 5 的代码还没写..."
          },
          {
            title: "思路 2：优雅排版（1 到 5）",
            desc: "既然 1 到 5 都输出“工作日”，我们可以把 5 个 case 全挤在同一行。<br>只要不写 break，它们最终都会顺延执行第 11 行的输出语句。这样排版非常紧凑！",
            highlightLines: [10, 11, 12], // 高亮 1 到 5 的部分
            hiddenLines: [] // 全部显示
          }
        ],

        answer: { codeFile: "codes/lesson-05/switch-workday.cpp", snippet: "main" }, 
        analysis: { 
          title: "📖 解析", 
          desc: "如果不用穿透，你需要写 5 遍 <code>case 1: cout &lt;&lt; \"工作日\"; break;</code>。<br>利用穿透并排在同一行，代码瞬间瘦身。<br><b>注意</b>：虽然 <code>case 1:</code> 到 <code>case 5:</code> 写在一起，但它们最后只需要保留一个 <code>break;</code> 就够了。" 
        } 
      }
    },

    /* ===== 13 if vs switch ===== */
    {
      id: 13, type: "compare", title: "if vs switch", subtitle: "什么时候用谁？",
      data: {
        neutral: true, splitStep: true,
        leftLabel: "⚖️ if-else-if",
        rightLabel: "📮 switch",
        groups: [
          { wrong: "<b>擅长判断范围</b>", right: "<b>擅长匹配精准值</b>" },
          { wrong: "<code>if (score >= 60)</code><br><code>if (a > 0 && a < 10)</code>", right: "<code>case 1:</code><br><code>case \'A\':</code><br><code>case \'+\':</code>" },
          { wrong: "灵活，能处理各种复杂逻辑", right: "清爽，但只能判断整数或字符。" }
        ],
        extra: { desc: '<b>📌 选型口诀</b>：判断“范围”用 if，判断“等于几”用 switch。', variant: 'flat' }
      }
    },

    /* ===== 14 练习3：综合实战 简易计算器 ===== */
    {
      id: 14, type: "level-map", title: "课堂练习3：简易计算器", subtitle: "综合运用 switch 和 if", chapterTag: "第 5 讲 · 实战演练",
      data: { 
        question: { title: "题干", desc: "输入一个简单算式（如 <code>3 + 5</code>），输出计算结果。<br>运算符包含 <code>+ - * /</code>。<br>如果除数为 0，输出 <code>Divided by zero!</code>。<br>输入样例：<code>10 / 2</code>　输出样例：<code>5</code>", timer: "⏱ 限时 8 分钟" }, 
        hints: ["读入格式是：<code>cin >> a >> op >> b;</code>，其中 op 是 char 类型", "对 <code>op</code> 进行 switch 判断", "在除号 <code>/</code> 的 case 里，还要嵌套一个 if 判断分母是否为 0", "不要忘记 break"], 
        answer: { codeFile: "codes/lesson-05/switch-calc.cpp", snippet: "main" }, 
        analysis: { title: "📖 解析", desc: "这道题完美结合了 char 输入、switch 选择、以及 switch 内部嵌套 if 判断。" } 
      }
    },

    /* ===== 15 初赛渗透 ===== */
    {
      id: 15, type: "grid", title: "初赛小知识：switch 考点", subtitle: "CSP-J/S 初赛必考", chapterTag: "第 5 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "⚠️", title: "参数限制", desc: "switch 括号里的变量，只能是<b>整数</b>或<b>字符</b>。<br>不能用 double 或 string。" },
          { icon: "💣", title: "穿透效应", desc: "某个 case 没写 break，下面的代码会全部执行。<br><b>常考：最后输出了几行？</b>" },
          { icon: "🪜", title: "嵌套 if", desc: "else 永远和最近的未配对 if 结合。<br><b>常考：缩进骗人，究竟属于谁？</b>" }
        ],
        extra: { desc: '<b>📌 怎么考？</b><br>给一段带穿透的 switch 代码，问你最终输出什么，或者问哪个 case 没有执行。', variant: 'flat' }
      }
    },

    /* ===== 16 课堂小测 ===== */
    {
      id: 16, type: "quiz", title: "课堂小测", subtitle: "多分支与 switch", chapterTag: "第 5 讲 · 课堂小测",
      data: { 
        questions: [ 
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 真题", optionLayout: "horizontal", question: "在 if-else if 语句中，如果第一个条件成立，后面的 else if 还会进行判断吗？", options: [ { label: "A", text: "会" }, { label: "B", text: "不会", correct: true } ], analysis: "一旦前面命中，后面的条件会被直接跳过，不再判断。" },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 分支结构", optionLayout: "horizontal", question: "下面代码的输出是？（注意看缩进）", questionCode: "int a = 3;\nif (a > 0)\n    if (a > 5)\n        cout << \"A\";\nelse\n    cout << \"B\";", options: [ { label: "A", text: "A" }, { label: "B", text: "B", correct: true }, { label: "C", text: "什么都不输出" }, { label: "D", text: "编译错误" } ], analysis: "这是经典的“悬挂 else”陷阱。<br>else 永远跟最近的未配对 if 结合，所以它属于内层 <code>if (a &gt; 5)</code>。<br>a = 3，外层成立进入内层，内层不成立执行 else，输出 B。" },
          { id: 3, type: "single", difficulty: 3, source: "CSP-J 初赛真题练习 · switch", optionLayout: "vertical", question: "若 <code>int x = 2;</code>，以下代码输出什么？", questionCode: "switch(x) {\n    case 1: cout << \"1\";\n    case 2: cout << \"2\";\n    case 3: cout << \"3\";\n    default: cout << \"4\";\n}", options: [ { label: "A", text: "2" }, { label: "B", text: "23" }, { label: "C", text: "234", correct: true }, { label: "D", text: "4" } ], analysis: "经典的 case 穿透！<br>x = 2，匹配到 case 2，因为后面<b>没有 break</b>，所以程序会继续往下执行 case 3 和 default。最终输出 234。" },
          { id: 4, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第二章", optionLayout: "two-cols", question: "switch 语句的括号里可以放入一个 double 类型的变量。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: "错误。switch 只能匹配整数或字符，不能匹配浮点数或字符串。" } 
        ] 
      }
    },

    /* ===== 17 今日总结 ===== */
    {
      id: 17, type: "grid", title: "第 5 讲 · 今日总结", subtitle: "一页看完本讲所有重点", chapterTag: "第 5 讲 · 复习",
      data: {
        cards: [
          { icon: "🪜", title: "if-else if", desc: "<b>语法</b>：从上往下依次判断<br><b>特点</b>：一旦命中，后面全停<br><b>铁律</b>：范围窄的放前面<br><b>陷阱</b>：>= 60 写在 >= 90 前必错" },
          { icon: "💣", title: "悬挂 else", desc: "<b>规则</b>：就近匹配（离谁近属于谁）<br><b>破局</b>：嵌套 if 必须加 { }<br><b>初赛</b>：常考缩进骗人题<br><b>口诀</b>：不信缩进信括号" },
          { icon: "📮", title: "switch 语法", desc: "<b>适用</b>：精准匹配固定值<br><b>限制</b>：只能是整数或字符<br><b>兜底</b>：default 不能忘<br><b>格式</b>：case 值: ... break;" },
          { icon: "🩸", title: "穿透效应", desc: "<b>原因</b>：忘记写 break<br><b>后果</b>：会继续执行下面的 case<br><b>妙用</b>：连续相同的 case 可省略 break<br><b>自检</b>：写完扫一眼是不是每个都有" },
        ],
      },
    },

    /* ===== 18 课后作业 ===== */
    {
      id: 18, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题", chapterTag: "第 5 讲 · 实战",
      data: { 
        cards: [ 
          { icon: "🟢", title: "基础 1 · P5713", link: "https://www.luogu.com.cn/problem/P5713", desc: "<b>洛谷团队系统</b><br>考察：if-else 基础<br>难度：★" }, 
          { icon: "🟢", title: "基础 2 · P5716", link: "https://www.luogu.com.cn/problem/P5716", desc: "<b>月份天数</b><br>考察：switch 穿透<br>难度：★★" }, 
          { icon: "🔴", title: "挑战 · P1422", link: "https://www.luogu.com.cn/problem/P1422", desc: "<b>小玉家的电费</b><br>考察：多分支阶梯计价<br>难度：★★" } 
        ] 
      }
    },

    /* ===== 19 答疑时间 ===== */
    {
      id: 19, type: "grid", title: "答疑时间", subtitle: "常见问题 FAQ", chapterTag: "第 5 讲 · 答疑",
      data: { 
        cards: [ 
          { icon: "📮", title: "switch 和 if 怎么选？", desc: "判断<b>范围</b>（如分数段）用 <code>if</code>。<br>判断<b>固定值</b>（如星期几）用 <code>switch</code>。" }, 
          { icon: "💥", title: "如果 case 忘了写 break？", desc: "会发生<b>穿透</b>。如果只是想执行当前 case，忘记 break 会导致下面的代码全被执行。" }, 
          { icon: "🧠", title: "穿透到底有什么用？", desc: "多个 case 共用一段代码时，故意省略 break 能让代码变得非常简洁。" }, 
          { icon: "⚠️", title: "switch 里面能写 if 吗？", desc: "可以。在 switch 的某个 case 里面，完全可以嵌套 if 语句来处理更复杂的逻辑。" }
        ] 
      }
    },

    /* ===== 20 本讲英文单词 ===== */
    {
      id: 20, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 5 讲 · 复习",
      data: {
        words: [
          { word: "switch", cn: "开关 / 分拣", pron: "/swɪtʃ/", origin: '英文原意"开关"', category: "关键字" },
          { word: "case", cn: "情况", pron: "/keɪs/", origin: '英文原意"情况"', category: "关键字" },
          { word: "default", cn: "默认", pron: "/dɪˈfɔːlt/", origin: "de(去) + fault(错误) = 默认", category: "关键字" },
          { word: "fall-through", cn: "穿透", pron: "/fɔːl θruː/", origin: "fall(掉落) + through(穿过)", category: "概念" },
          { word: "nest", cn: "嵌套", pron: "/nest/", origin: "英文原意“鸟巢”", category: "概念" },
          { word: "branch", cn: "分支", pron: "/brɑːntʃ/", origin: "英文原意“树枝”", category: "概念" }
        ]
      }
    },

    /* ===== 21 下节预告 ===== */
    {
      id: 21, type: "radial", title: "下节预告", subtitle: "第 6 讲 · 循环结构",
      data: { center: "循环结构", items: [ { text: "for 循环" }, { text: "while 循环" }, { text: "自增自减 i++" }, { text: "死循环急救" } ] }
    },

    /* ===== 22 结束页 ===== */
    {
      id: 22, type: "ending", title: "第五讲结束", subtitle: "你的程序，逻辑更加缜密了", chapterTag: false,
      data: { slogan: "科学教育 · 创新课程", extra: { title: "🌟 下一站：重复的力量", desc: "今天你掌握了组合条件与分拣机，程序的判断力已经拉满。<br><br>但程序目前还是只能“执行一次”。如果让你算 1 加到 1 亿，你不可能写 1 亿行 if。<br>下一讲，我们将解锁编程中最核心的引擎——<b>循环</b>。<br>还有神秘的 `i++`，我们循环见！", variant: "card-glow" } }
    },
  ],
};
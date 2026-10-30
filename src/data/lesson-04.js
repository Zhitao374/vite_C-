export default {
  title: "第 4 讲 运算符与分支",
  subtitle: "让程序学会判断",
  total: 24,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "运算符与分支", subtitle: "让程序学会判断", chapterTag: false,
      data: { accentWord: "分支", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 4 讲"] },
    },

    /* ===== 2 钩子 ===== */
    {
      id: 2, type: "origin", title: "程序怎么“做判断”？", subtitle: "从一条路走到黑，到十字路口", chapterTag: "第 4 讲 · 开场",
      data: {
        problem: {
          title: "目前的程序只会“一条路走到黑”",
          points: [
            "从第一行执行到最后一行——<b>不会拐弯</b>",
            "不管输入什么，结果都一样——像流水账",
            "想让它“成绩及格就输出及格，否则输出不及格”——<b>做不到</b>"
          ]
        },
        evolution: [
          { icon: "➕", era: "第一步", title: "用运算符做比较", desc: "<code>score &gt;= 60</code> —— 得到 <b>true</b> 或 <b>false</b>" },
          { icon: "🔀", era: "第二步", title: "用分支选择路径", desc: "<code>if (score &gt;= 60) { ... }</code> —— 像到了十字路口" },
          { icon: "🧠", era: "第三步", title: "程序“活”了", desc: "能根据输入<b>做不同反应</b>，真正实现智能化" }
        ],
        summary: {
          title: "程序中的“闸门”",
          desc: "如果把程序比作流水线，<code>if</code> 就是<b>安检门</b>。<br>条件为真，放行；条件为假，拦截。<br>这就是程序“做决定”的基础。",
          code: 'if (条件) {\n    // 只有条件为真时，才会执行这里\n    cout << "放行";\n}'
        }
      }
    },

    /* ===== 3 上节回顾 ===== */
    {
      id: 3, type: "timeline", variant: "review", title: "上节课回顾", subtitle: "数据的多种面孔",
      data: {
        items: [
          { icon: "📐", badge: "小数", title: "double 与 float", desc: "小数的家", points: ["double 精度高", "float 精度低", "竞赛首选 double"] },
          { icon: "🔤", badge: "字符", title: "char 字符", desc: "单个字符", points: ["单引号 'A'", "本质是 ASCII", "可转整数"] },
          { icon: "💡", badge: "布尔", title: "bool 布尔", desc: "只有真和假", points: ["true = 1", "false = 0", "判断的基础"] },
          { icon: "🔄", badge: "转换", title: "类型转换", desc: "不同类型之间", points: ["自动转换", "强制转换", "整数除法陷阱"] },
        ],
      },
    },

    /* ===== 4 学习地图（融合目标） ===== */
    {
      id: 4, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "四站闯关，让你的程序学会思考",
      data: {
        items: [
          { icon: "⚖️", badge: "第一站", title: "测谎仪", desc: "掌握关系与逻辑", points: ["生成真假 (true/false)", "&& 与 || 电路组合", "初赛考点：短路求值"] },
          { icon: "🚪", badge: "第二站", title: "if 安检门", desc: "学会单/双/多分支", points: ["避坑：= 和 == 的区别", "掌握 else if 的顺序", "实战：奇偶与成绩"] },
          { icon: "📮", badge: "第三站", title: "switch 分拣机", desc: "精准投递", points: ["匹配固定值", "避坑：穿透现象", "实战：星期几查询"] },
          { icon: "🏆", badge: "第四站", title: "逻辑风暴", desc: "综合实战", points: ["用 && 和 || 组合条件", "完成闰年判断", "挑战多重逻辑嵌套"] },
        ],
      },
    },

    /* ===== 5 关系与逻辑运算符 ===== */
    {
      id: 5, type: "grid", title: "四类运算符", subtitle: "运算符：程序中的测谎仪", chapterTag: "第 4 讲 · 概念理解",
      data: {
        cards: [
          { icon: "➕", title: "算术运算符", desc: "+ 加 · - 减 · * 乘 · / 除 · % 取余<br>例：<code>10 % 3 = 1</code>" },
          { icon: "✏️", title: "赋值运算符", desc: "= 赋值 · += 加后赋值<br>例：<code>a += 3</code> 即 <code>a = a + 3</code>" },
          { icon: "⚖️", title: "关系运算符", desc: "&gt; 大于 · &lt; 小于 · &gt;= · &lt;=<br>== 等于 · != 不等于<br><b>结果只有 true / false</b>" },
          { icon: "🔗", title: "逻辑运算符", desc: "&amp;&amp; 与（两边真才真）<br>|| 或（一边真就真）<br>! 非（真假反转）" }
        ],
        footer: '<b>⚠️ 竞赛高频提醒</b>：关系运算符的 <code>==</code> 容易和赋值 <code>=</code> 混淆。<br><code>if (a = 5)</code> 是赋值（<b>永远成立</b>），<code>if (a == 5)</code> 才是判断。'
      },
    },

    /* ===== 6 关系运算符 ===== */
    {
      id: 6, type: "code-split", title: "关系运算符", subtitle: "结果只有真或假",
      data: {
        intro: "📖 关系运算符做<b>比较</b>，结果是 <code>bool</code>。<br>输出时 true 显示 1，false 显示 0。",
        codeFile: "codes/lesson-04/relations.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "(a &gt; b)", desc: "大于，5 &gt; 3 为真，输出 1" },
          { line: 3, title: "(a &lt; b)", desc: "小于，5 &lt; 3 为假，输出 0" },
          { line: 4, title: "(a == b)", desc: "等于，注意是两个等号" },
          { line: 5, title: "(a != b)", desc: "不等于" },
        ],
        output: "1\n0\n0\n1"
      },
    },

    /* ===== 7 逻辑运算符 ===== */
    {
      id: 7, type: "grid", title: "逻辑运算符与优先级", subtitle: "组合多个条件", chapterTag: "第 4 讲 · 概念理解",
      data: {
        cards: [
          { icon: "🔗", title: "&& 与 (AND)", desc: "全真才真<br>常用于“范围判断”<br><code>a &gt; 0 &amp;&amp; a &lt; 10</code><br>相当于串联电路" },
          { icon: "⚡", title: "|| 或 (OR)", desc: "一通就通<br>常用于“任一满足”<br><code>a == 1 || a == 2</code><br>相当于并联电路" },
          { icon: "🚫", title: "! 非 (NOT)", desc: "真变假，假变真<br><code>!true = false</code><br>常用于“反向判断”" },
          { icon: "📊", title: "优先级", desc: "不确定就加括号！<br>加括号不会错，少加容易错。" }
        ],
        footer: '<b>📌 口诀</b>：与（&&）严——两边都要真；或（||）宽——一边真就行；非（!）反着来。'
      }
    },

    /* ===== 8 if 单分支 ===== */
    {
      id: 8, type: "code-split", title: "if 单分支", subtitle: "条件为真就执行",
      data: {
        intro: "📖 <b>语法</b>：<code>if (条件) { 执行体 }</code>。<br>条件为真 → 开门放行；条件为假 → 直接跳过。",
        codeFile: "codes/lesson-04/if-single.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "int score;", desc: "定义变量存分数" },
          { line: 3, title: "cin &gt;&gt; score;", desc: "从键盘读入分数" },
          { line: 5, title: "if (score &gt;= 60)", desc: "条件为真时执行大括号内" },
          { line: 8, title: "cout", desc: "无论条件真假都会执行" },
        ],
        output: "（输入 75）\n及格\n程序结束",
      },
    },

    /* ===== 9 if-else 双分支 ===== */
    {
      id: 9, type: "code-split", title: "if-else 双分支", subtitle: "两条路，必走一条",
      data: {
        intro: "📖 <b>语法</b>：<code>if (条件) { ... } else { ... }</code>。<br>条件为真走 if，为假走 else——<b>必走一条，没有中间态</b>。",
        codeFile: "codes/lesson-04/if-else.cpp", snippet: "main",
        annotations: [
          { line: 5, title: "if", desc: "条件为真时执行这块" },
          { line: 7, title: "} else {", desc: "大括号后紧跟 else，条件为假时执行" },
          { line: 8, title: "cout", desc: "条件为假时才执行" },
        ],
        output: "（输入 45）\n不及格",
      },
    },

    /* ===== 10 练习1：判断奇偶 ===== */
    {
      id: 10, type: "level-map", title: "课堂练习1：判断奇偶", subtitle: "用取余判断一个数的奇偶性", chapterTag: "第 4 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个整数 <code>n</code>，如果 n 是偶数输出 <code>even</code>，如果是奇数输出 <code>odd</code>。<br>输入样例：<code>7</code>　输出样例：<code>odd</code>", timer: "⏱ 限时 5 分钟" },
        hints: ["用算术运算符 <code>%</code> 取余", "除以 2 余数为 0，说明是偶数", "用 <code>if-else</code> 走两条路"],
        answer: { codeFile: "codes/lesson-04/even-odd.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "<code>n % 2</code> 得到 n 除以 2 的余数，只有 0 和 1 两种结果。<br>余数为 0 就是偶数，余数为 1 就是奇数。<br>这是取余运算符最典型的应用。" },
      },
    },

    /* ===== 11 冲突：眼见为实：少写一个等号 ===== */
    {
      id: 11, type: "code-walkthrough", title: "眼见为实：少写一个等号会怎样？", subtitle: "编译器的静默杀手", chapterTag: "第 4 讲 · 概念理解",
      data: {
        intro: "我们刚才强调过：判断相等用 <code>==</code>，赋值用 <code>=</code>。<br>如果我不小心写错，把判断写成了赋值，会发生什么？看代码：",
        codeFile: "codes/lesson-04/_error-assignment.cpp", snippet: "main",
        steps: [
          { title: "初始状态", line: 2, vars: { a: "10" }, note: "a 原本是 10。接下来我们要判断它是不是 5。" },
          { title: "致命操作", line: 3, vars: { a: "5" }, note: "走到 if 这里，程序竟然把 5 <b>赋值</b>给了 a！<br>现在 a 变成了 5。" },
          { title: "奇怪的逻辑", line: 3, vars: { a: "5" }, note: "赋值表达式的值就是 5。在 C++ 里，非 0 即为 <b>true</b>。<br>所以 if 条件<b>永远成立</b>！" },
          { title: "灾难结局", line: 4, vars: { a: "5" }, note: "屏幕输出了“执行了”。<br>编译器<b>完全不会报错</b>，但你的逻辑已经全毁了！" }
        ],
        extra: {
          title: "💡 如何防范？",
          desc: "<b>经验法则</b>：把常量写在左边！<br>如果你写成 <code>if (5 = a)</code>，编译器就会报错，因为你不能给 5 赋值。这叫作“尤达条件式”（Yoda Conditions）。<br><br>当然，最好的办法是：<b>每次写完 if，检查一下是不是两个等号。</b>",
          variant: "card-primary"
        }
      }
    },

    /* ===== 12 = vs == 急救 ===== */
    {
      id: 12, type: "compare", title: "赋值 vs 判断", subtitle: "避开这个致命陷阱",
      data: {
        neutral: true, splitStep: true,
        groups: [
          { leftLabel: "❌ 错误", rightLabel: "✅ 正确", wrong: "<code>if (a = 5)</code>", right: "<code>if (a == 5)</code><br><br>单等号是赋值，双等号才是判断。" },
          { leftLabel: "后果", rightLabel: "防范", wrong: "a 被强行改成 5，条件永远为真。", right: "把常量写左边：<code>if (5 == a)</code>" }
        ],
        footer: '<b>📌 记忆口诀</b>：一个等号是<b>塞进去</b>，两个等号是<b>比一比</b>。'
      }
    },

    /* ===== 13 if-else if 多分支 ===== */
    {
      id: 13, type: "code-split", title: "if-else if 多分支", subtitle: "多条路，只走一条",
      data: {
        intro: "📖 <b>语法</b>：链式多个 <code>else if</code>。<br>从上到下依次判断，<b>一旦某个条件成立，后面不再判断</b>。",
        codeFile: "codes/lesson-04/if-else-if.cpp", snippet: "main",
        annotations: [
          { line: 5, title: "score &gt;= 90", desc: "先判断最高档" },
          { line: 7, title: "else if", desc: "上一个条件不成立时，判断这一个" },
          { line: 11, title: "else", desc: "所有条件都不成立时执行" },
        ],
        output: "（输入 85）\nB",
        footer: '<b>⚠️ 多分支的顺序很重要</b><br>程序从上往下依次判断——<b>一旦某个条件成立，后面不再判断</b>。<br><br>所以条件的顺序很重要！<br>如果把 <code>score &gt;= 60</code> 放在第一位——<br>那么 90 分也会被判成 "C"，因为它先匹配了。<br><br><b>原则</b>：范围窄的条件放前面，范围宽的条件放后面。'
      },
    },

    /* ===== 14 练习2：成绩等级 ===== */
    {
      id: 14, type: "level-map", title: "课堂练习2：成绩等级", subtitle: "用多分支判断分数等级", chapterTag: "第 4 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个分数 <code>score</code>（0—100），按下面规则输出等级：<br>≥90 → <code>A</code>　≥80 → <code>B</code>　≥60 → <code>C</code>　其他 → <code>D</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["用 <code>if-else if</code> 链", "注意条件的顺序，从高分到低分判断", "不要忘了最后的 <code>else</code> 兜底"],
        answer: { codeFile: "codes/lesson-04/score-level.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "按照从高到低（90、80、60）的顺序判断。<br>只要前面的不满足，进入后面的分支时，系统就自动隐含了“小于上一档”的条件。" },
      },
    },

    /* ===== 15 短路求值 ===== */
    {
      id: 15, type: "grid", title: "短路求值", subtitle: "初赛必考的底层逻辑", chapterTag: "第 4 讲 · 概念理解",
      data: {
        cards: [
          { icon: "🔗", title: "&& 的短路", desc: "<code>a && b</code><br>如果 a 为假，整个式子必定为假。<br>所以 <b>b 根本不会被执行</b>。" },
          { icon: "⚡", title: "|| 的短路", desc: "<code>a || b</code><br>如果 a 为真，整个式子必定为真。<br>所以 <b>b 根本不会被执行</b>。" },
          { icon: "🧠", title: "有什么用？", desc: "可以用来防止越界。<br><code>if (i < n && a[i] == 5)</code><br>如果 i 已经越界，后面就不会读了。" }
        ],
        footer: '<b>📌 初赛怎么考？</b><br>给你一个表达式：<code>(a > 0) || (b++)</code>，问执行完后 b 的值。<br>因为前面是真，所以 b++ 根本没执行，b 的值不变！'
      }
    },

    /* ===== 16 switch 多分支 ===== */
    {
      id: 16, type: "code-split", title: "switch 多分支", subtitle: "根据变量的值选择路径",
      data: {
        intro: "📖 <b>语法</b>：<code>switch (变量) { case 值: ...; break; ... default: ... }</code>。<br>变量等于哪个 case，就跳到哪个 case 执行。",
        codeFile: "codes/lesson-04/switch-day.cpp", snippet: "main",
        annotations: [
          { line: 5, title: "switch (day)", desc: "根据 day 的值跳转" },
          { line: 6, title: "case 1:", desc: "当 day 等于 1 时执行" },
          { line: 6, title: "break;", desc: '跳出 switch，不写会"穿透"' },
          { line: 13, title: "default:", desc: "所有 case 都不匹配时执行" },
        ],
        output: "（输入 3）\n周三",
        footer: '<b>⚠️ break 的作用</b>：<br>break 表示"跳出 switch"。<br>不写 break，程序会继续执行下一个 case——这叫"<b>case 穿透</b>"。<br><br><b>💡 单词拆解</b>：<code>default</code> = de(去) + fault(错误) = 默认（除了其他错误情况之外的情况）。'
      },
    },

    /* ===== 17 switch 的坑 ===== */
    {
      id: 17, type: "pitfall", title: "switch 的穿透陷阱", subtitle: "忘写 break 的惨案",
      data: {
        cases: [
          { icon: "❌", scene: "输入 1，却输出了 周一周二周三...", what: "程序继续执行下一个 case", why: "这叫\"case 穿透\"——switch 的特性<br>不写 break 会一直往下走", fix: "每个 case 后加 <code>break;</code>" }
        ],
        footer: '<b>📌 调试方法</b>：写完 switch 代码，用几组数据测试一遍。检查是不是每个 case 后面都有 break。'
      }
    },

    /* ===== 18 练习3：星期几查询 ===== */
    {
      id: 18, type: "level-map", title: "课堂练习3：星期几查询", subtitle: "switch 实战", chapterTag: "第 4 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个数字（1—7），输出对应的星期几。<br>输入样例：<code>3</code>　输出样例：<code>周三</code>", timer: "⏱ 限时 5 分钟" },
        hints: ["用 <code>switch</code> 语法", "不要忘记写 <code>break</code>", "最后的 <code>default</code> 可以处理无效输入"],
        answer: { codeFile: "codes/lesson-04/switch-day.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "典型的 switch 场景，固定值 1-7 匹配。<br>每一个 case 后面必须跟上 break，防止穿透。" },
      },
    },

    /* ===== 19 练习4：闰年判断 ===== */
    {
      id: 19, type: "level-map", title: "课堂练习4：闰年判断", subtitle: "用逻辑运算符组合条件", chapterTag: "第 4 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个年份 <code>year</code>，判断是否为闰年。<br>闰年规则：能被 4 整除但不能被 100 整除，或者能被 400 整除。<br>是闰年输出 <code>yes</code>，否则输出 <code>no</code>。", timer: "⏱ 限时 10 分钟" },
        hints: ["用 <code>&&</code> 和 <code>||</code> 组合条件", "能被 4 整除：<code>year % 4 == 0</code>", "注意“或者”的关系，括号千万别漏"],
        answer: { codeFile: "codes/lesson-04/leap-year.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: '条件分两部分：<br>① <code>year % 4 == 0 && year % 100 != 0</code>（普通闰年）<br>② <code>year % 400 == 0</code>（世纪闰年）<br>两者取"或"（<code>||</code>）关系。<br><b>括号不能漏</b>，否则优先级会出错。' },
      },
    },

    /* ===== 20 课堂小测 ===== */
    {
      id: 20, type: "quiz", title: "课堂小测", subtitle: "运算符与分支结构", chapterTag: "第 4 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 运算符", optionLayout: "horizontal", question: "表达式 <code>7 / 2 * 2</code> 的值是多少？", options: [ { label: "A", text: "7" }, { label: "B", text: "6", correct: true }, { label: "C", text: "7.0" }, { label: "D", text: "3" } ], analysis: "运算符优先级：乘除同级，从左到右计算。<br>先算 <code>7 / 2</code>，两个 int 相除，结果是 <code>3</code>（小数被丢弃）。<br>再算 <code>3 * 2 = 6</code>。<br>这是新手最容易忽略的陷阱：<b>整数除法会丢小数</b>。" },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 分支结构", optionLayout: "vertical", question: "下面代码的输出是？", questionCode: `int a = 5;\nif (a > 3)\n    if (a > 4)\n        cout << "A";\n    else\n        cout << "B";`, options: [ { label: "A", text: "A", correct: true }, { label: "B", text: "B" }, { label: "C", text: "AB" }, { label: "D", text: "编译错误" } ], analysis: '这是经典的"<b>else 悬挂问题</b>"。<br><code>else</code> 只跟<b>最近的、未配对的 if</b> 配对。<br>所以 <code>else</code> 属于内层 <code>if (a &gt; 4)</code>，而不是外层 <code>if (a &gt; 3)</code>。<br>a = 5，两个条件都成立，输出 A。<br><b>建议</b>：嵌套 if 一定要加<b>大括号</b>，避免歧义。' },
          { id: 3, type: "single", difficulty: 3, source: "2020 CSP-J 初赛 · 第 5 题", optionLayout: "vertical", question: "以下关于 C++ 逻辑运算符的说法，正确的是？", options: [ { label: "A", text: "<code>a &amp;&amp; b</code> 中，若 a 为假，则 b 不会被求值", correct: true }, { label: "B", text: "<code>a || b</code> 中，两边都会求值" }, { label: "C", text: "<code>!</code> 的优先级低于 <code>&amp;&amp;</code>" }, { label: "D", text: "<code>&amp;&amp;</code> 和 <code>||</code> 优先级相同" } ], analysis: 'C++ 逻辑运算符有<b>短路求值</b>特性：<br>· <code>a &amp;&amp; b</code>：若 a 为假，b <b>不执行</b><br>· <code>a || b</code>：若 a 为真，b <b>不执行</b><br><br>A 正确；B 错误。<br>C 错误：<code>!</code> 优先级<b>高于</b> <code>&amp;&amp;</code>。<br>D 错误：<code>&amp;&amp;</code> 优先级<b>高于</b> <code>||</code>。' },
          { id: 4, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第二章", optionLayout: "two-cols", question: "在 C++ 中，<code>if (a = 5)</code> 和 <code>if (a == 5)</code> 效果完全一样。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: "两者完全不同：<br>· <code>if (a == 5)</code>：判断 a 是否等于 5<br>· <code>if (a = 5)</code>：先把 5 赋给 a，然后判断表达式的值（5，非 0 为真），所以<b>永远成立</b><br><br>这是新手最容易犯的错误，而且编译器<b>不会报错</b>。" },
          { id: 5, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第二章", optionLayout: "two-cols", question: "在 switch 语句中，每个 case 后面必须写 break，否则程序会继续执行下一个 case。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: '不写 break 会导致"<b>case 穿透</b>"：<br>程序会从匹配的 case 开始，一直往下执行所有 case，直到遇到 break 或 switch 结束。<br><br>这是特性，有时被有意使用（如多个 case 共用一段代码），但更多时候是 bug 来源。' },
        ],
      },
    },

    /* ===== 21 知识清单与口诀 ===== */
    {
      id: 21, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "条件为真走一条路，为假走另一条路。", author: "—— 分支结构第一课",
        points: [ "四类运算符：算术、赋值、关系、逻辑", "算术：+ - * / %（注意整数除法）", "关系：&gt; &lt; == != 结果是 true / false", "逻辑：&amp;&amp; || !（短路求值）", "if 单分支、if-else 双分支、多分支", "switch 适合等值判断，注意 break" ],
        highlight: { title: "📌 关键口诀", desc: "算术算数，赋值存数；关系判真假，逻辑组合条件；if 走分支，else 兜底；switch 多分支，break 别忘记。" },
      },
    },

    /* ===== 22 课后作业 ===== */
    {
      id: 22, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5710", link: "https://www.luogu.com.cn/problem/P5710", desc: "<b>数的性质</b><br>考察：逻辑运算、if 判断<br>难度：★★<br>目标：用 &amp;&amp; || 组合多个条件" },
          { icon: "🟢", title: "基础 2 · P5711", link: "https://www.luogu.com.cn/problem/P5711", desc: "<b>闰年判断</b><br>考察：if-else、逻辑运算<br>难度：★★<br>目标：写出闰年的完整条件" },
          { icon: "🔴", title: "挑战 · P5716", link: "https://www.luogu.com.cn/problem/P5716", desc: "<b>月份天数</b><br>考察：switch / if-else<br>难度：★★<br>目标：判断每个月的天数，注意闰年" },
        ],
      },
    },

    /* ===== 23 下节预告 ===== */
    {
      id: 23, type: "radial", title: "下节预告", subtitle: "第 5 讲 · 循环结构",
      data: { center: "循环结构", items: [ { text: "while 循环" }, { text: "for 循环" }, { text: "循环嵌套" }, { text: "break 与 continue" } ] },
    },

    /* ===== 24 结束页 ===== */
    {
      id: 24, type: "ending", title: "第四讲结束", subtitle: "你的程序，从此学会了“选择”", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 走出新手村",
          desc: "今天，你避开了 `a = 5` 的致命坑，搞懂了 `switch` 的穿透与 `default`。<br>从只会“一条路走到黑”的流水账，到现在能根据条件分流，<b>你的程序真正“活”过来了。</b><br><br>但这只是决策的开始。<br>如果一个动作要执行 <b>1 亿次</b>怎么办？<br>下一讲，我们将掌握让计算机一秒做完这些事的魔法——<b>循环结构</b>。<br><br>📌 <b>行动号召</b>：去洛谷，把今天的两道 if/switch 题刷掉。我们下节课见！",
          variant: "card-glow"
        }
      },
    },
  ],
};
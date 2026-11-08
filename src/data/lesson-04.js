export default {
  title: "第 4 讲 运算符与基础分支",
  subtitle: "让程序学会判断",
  total: 20,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    { id: 1, type: "cover", title: "运算符与基础分支", subtitle: "让程序学会判断", chapterTag: false, data: { accentWord: "判断", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 4 讲"] } },

    /* ===== 2 钩子 ===== */
    {
      id: 2, type: "origin", title: "程序怎么“做判断”？", subtitle: "从一条路走到黑，到十字路口", chapterTag: "第 4 讲 · 开场",
      data: {
        problem: { title: "目前的程序只会“一条路走到黑”", points: ["从第一行执行到最后一行——不会拐弯", "想让它“成绩及格就输出及格”——做不到"] },
        evolution: [
          { icon: "➕", era: "第一步", title: "用运算符做比较", desc: "<code>score &gt;= 60</code> —— 得到真或假" },
          { icon: "🔀", era: "第二步", title: "用分支选择路径", desc: "<code>if (score &gt;= 60) { ... }</code>" },
          { icon: "🧠", era: "第三步", title: "程序“活”了", desc: "能根据输入做不同反应" }
        ],
        summary: { title: "程序中的“闸门”", desc: "<code>if</code> 就是安检门。<br>条件为真，放行；条件为假，拦截。", code: 'if (条件) {\n    // 执行\n}' }
      }
    },

    /* ===== 3 上节回顾 ===== */
    {
      id: 3, type: "timeline", variant: "review", title: "上节课回顾", subtitle: "数据的多种面孔",
      data: { items: [ { icon: "📐", badge: "小数", title: "double", desc: "小数的家", points: ["竞赛首选 double"] }, { icon: "🔤", badge: "字符", title: "char", desc: "单个字符", points: ["本质是 ASCII"] }, { icon: "💡", badge: "布尔", title: "bool", desc: "只有真和假", points: ["true=1, false=0"] }, { icon: "🔄", badge: "转换", title: "类型转换", desc: "不同类型之间", points: ["强制转换", "整数除法陷阱"] } ] }
    },

    /* ===== 4 学习地图 ===== */
    {
      id: 4, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "三站闯关，让你的程序学会思考",
      data: { items: [ { icon: "⚖️", badge: "第一站", title: "测谎仪", desc: "关系运算符", points: ["产生 bool 值", "判断真假"] }, { icon: "🚪", badge: "第二站", title: "if 安检门", desc: "学会单/双分支", points: ["避坑：= 和 == 的灾难", "实战：奇偶判断"] }, { icon: "🔗", badge: "第三站", title: "逻辑组合", desc: "多个条件怎么连", points: ["&&、||、!", "OJ实战：数的性质"] } ] }
    },

    /* ===== 5 关系运算符 ===== */
    {
      id: 5, type: "code-split", title: "关系运算符", subtitle: "结果只有真或假",
      data: { intro: "📖 关系运算符做<b>比较</b>，结果就是上一讲学过的 <code>bool</code>。<br>输出时 true 显示 1，false 显示 0。", codeFile: "codes/lesson-04/relations.cpp", snippet: "main", annotations: [ { line: 6, title: "(a &gt; b)", desc: "大于，5 &gt; 3 为真，输出 1" }, { line: 7, title: "(a &lt; b)", desc: "小于，5 &lt; 3 为假，输出 0" }, { line: 8, title: "(a == b)", desc: "等于，注意是两个等号" } ], output: "1\n0\n0" }
    },

    /* ===== 6 if 单分支 ===== */
    {
      id: 6, type: "code-split", title: "if 单分支", subtitle: "条件为真就执行",
      data: { intro: "📖 掌握了测谎仪，我们就可以造安检门了。<br><b>语法</b>：<code>if (条件) { 执行体 }</code>。<br>条件为真 → 开门放行；条件为假 → 直接跳过。", codeFile: "codes/lesson-04/if-single.cpp", snippet: "main", annotations: [ { line: 8, title: "if (score &gt;= 60)", desc: "条件为真时执行大括号内" } ], output: "（输入 75）\n及格\n程序结束", footer: '<b>⚠️ 灵魂拷问</b>：如果输入的是 45 呢？<br>程序什么都不会输出。用户会纳闷：“我是没及格，还是电脑坏了？”<br>单分支只能处理“真”的情况，那“假”的情况怎么办？' }
    },

    /* ===== 7 if-else 双分支 ===== */
    {
      id: 7, type: "code-split", title: "if-else 双分支", subtitle: "两条路，必走一条",
      data: { intro: "📖 为了给“假”的情况也安排出路，我们引入 <code>else</code>。<br>条件为真走 if，为假走 else——<b>必走一条，没有中间态</b>。", codeFile: "codes/lesson-04/if-else.cpp", snippet: "main", annotations: [ { line: 8, title: "if", desc: "条件为真时执行这块" }, { line: 10, title: "} else {", desc: "条件为假时执行" } ], output: "（输入 45）\n不及格" }
    },

    /* ===== 8 冲突：少写一个等号 ===== */
    {
      id: 8, type: "code-walkthrough", title: "眼见为实：少写一个等号会怎样？", subtitle: "编译器的静默杀手", chapterTag: "第 4 讲 · 概念理解",
      data: { intro: "现在大家都会用 <code>if (score &gt;= 60)</code> 来做判断了。<br>但有个同学今天写代码，想判断 a 是不是等于 5，手一抖少写了一个等号，写成了 <code>if (a = 5)</code>。<br>你猜怎么着？<b>编译器竟然没报错！</b>看代码：", codeFile: "codes/lesson-04/_error-assignment.cpp", snippet: "main", steps: [ { title: "初始状态", line: 6, vars: { a: "10" }, note: "a 原本是 10。接下来我们要判断它是不是 5。" }, { title: "致命操作", line: 7, vars: { a: "5" }, note: "走到 if 这里，程序竟然把 5 <b>赋值</b>给了 a！<br>现在 a 变成了 5。" }, { title: "灾难结局", line: 8, vars: { a: "5" }, note: "赋值表达式的值就是 5。在 C++ 里，非 0 即为 <b>true</b>。<br>所以 if 条件<b>永远成立</b>！<br>你的判断逻辑彻底毁了。" } ], extra: { title: "💡 如何防范？", desc: "<b>经验法则</b>：把常量写在左边！<br>如果你写成 <code>if (5 = a)</code>，编译器就会报错拦截。<br>当然，最好的办法是：<b>每次写完 if，检查一下是不是两个等号。</b>", variant: "card-primary" } }
    },

    /* ===== 9 练习1：判断奇偶 ===== */
    {
      id: 9, type: "level-map", title: "课堂练习1：判断奇偶", subtitle: "用取余判断", chapterTag: "第 4 讲 · 实战演练",
      data: { question: { title: "题干", desc: "输入整数 <code>n</code>，偶数输出 <code>even</code>，奇数输出 <code>odd</code>。<br>输入样例：<code>7</code>　输出样例：<code>odd</code>", timer: "⏱ 限时 5 分钟" }, hints: ["用算术运算符 <code>%</code> 取余", "除以 2 余数为 0 就是偶数", "用 <code>if-else</code> 走两条路"], answer: { codeFile: "codes/lesson-04/even-odd.cpp", snippet: "main" }, analysis: { title: "📖 解析", desc: "<code>n % 2</code> 得到余数，只有 0 和 1。余数为 0 是偶数，余数为 1 是奇数。" } }
    },

    /* ===== 10 逻辑运算符 ===== */
    {
      id: 10, type: "code-split", title: "逻辑运算符", subtitle: "组合多个条件",
      data: { intro: "📖 有时候一个条件不够用，我们需要组合多个条件。<br>比如“成绩大于 60 <b>并且</b> 小于 80”，就需要用到 <code>&&</code>（与）、<code>||</code>（或）、<code>!</code>（非）。", codeFile: "codes/lesson-04/logic-ops.cpp", snippet: "main", annotations: [ { line: 7, title: "a > 0 && a < 10", desc: "两边都为真，结果才为真（范围判断）" }, { line: 10, title: "a == 1 || a == 2", desc: "只要有一个为真，结果就为真（任一满足）" }, { line: 13, title: "!(a > 0)", desc: "真变假，假变真（反向判断）" } ], output: "1\n1\n0", footer: '<b>📌 口诀</b>：与（&&）严——两边都要真；或（||）宽——一边真就行；非（!）反着来。' }
    },

    /* ===== 11 短路求值 ===== */
    {
      id: 11, type: "code-walkthrough", title: "眼见为实：短路求值", subtitle: "初赛必考的底层逻辑", chapterTag: "第 4 讲 · 概念理解",
      data: { intro: "C++ 处理 <code>&&</code> 和 <code>||</code> 时，有一个非常聪明的“偷懒”机制。<br>看这段代码，体会一下程序是怎么执行 <code>||</code> 的：", codeFile: "codes/lesson-04/short-circuit.cpp", snippet: "main", steps: [ { title: "初始状态", line: 6, vars: { a: "1", b: "1" }, note: "a 是 1，b 是 1。" }, { title: "前半句为真", line: 9, vars: { a: "1", b: "1" }, note: "判断 <code>a > 0</code>，结果为 <b>true</b>。<br>因为是 <code>||</code>（或）运算，整个结果必定为真。" }, { title: "后半句被跳过", line: 9, vars: { a: "1", b: "1" }, note: "所以，<b>程序根本没执行后面的 <code>b++</code>！</b><br>这就是短路求值。" }, { title: "结果验证", line: 11, vars: { a: "1", b: "1" }, note: "最后输出 b 的值，依然是 1。<br>如果你以为 b 会变成 2，那就掉进坑里了。" } ], footer: '<b>📌 有什么用？</b>可以用来防止越界。<br><code>if (i < n && a[i] == 5)</code><br>如果 i 已经越界（前假），后面读数组的操作根本不会执行！' }
    },

    /* ===== 12 练习2：OJ实战 数的性质 ===== */
    {
      id: 12, type: "level-map", title: "课堂练习2：数的性质 (P5710)", subtitle: "洛谷 OJ 实战", chapterTag: "第 4 讲 · 实战演练",
      data: { question: { title: "题干", desc: "输入正整数 <code>x</code>。判断是否满足：<br>性质1：是偶数。<br>性质2：大于 4 且不大于 12。<br><br>输出四个 1/0，对应：<br>① 都满足？ ② 至少满足一个？ ③ 恰好满足一个？ ④ 都不满足？", timer: "⏱ 限时 8 分钟" }, hints: ["先把两个性质用变量存起来，比如 <code>bool p1 = (x % 2 == 0);</code>", "性质2：<code>bool p2 = (x > 4 && x <= 12);</code>", "“都满足”写 <code>if(p1 && p2)</code>", "“恰好满足一个”就是 <code>p1 != p2</code>"], answer: { codeFile: "codes/lesson-04/practice-property.cpp", snippet: "main" }, analysis: { title: "📖 解析", desc: "这道题是洛谷最经典的入门分支题。<br>核心在于把复杂的文字逻辑，翻译成简单的 <code>if</code> 和逻辑运算符。" } }
    },

    /* ===== 13 初赛渗透 ===== */
    {
      id: 13, type: "grid", title: "初赛小知识：优先级与陷阱", subtitle: "CSP-J/S 初赛常考", chapterTag: "第 4 讲 · 初赛渗透",
      data: { cards: [ { icon: "📊", title: "优先级", desc: "算数 > 关系 > 逻辑 > 赋值<br><code>a + b > c && d == e</code><br>先算加法，再算大于，最后算且。<br><b>不确定就加括号！</b>" }, { icon: "⚡", title: "短路求值", desc: "<code>a && b</code> 中 a 为假，b 不执行<br><code>a || b</code> 中 a 为真，b 不执行<br><b>常考：变量值变了没？</b>" }, { icon: "⚠️", title: "致命陷阱", desc: "<code>if (a = 5)</code><br>单等号是赋值，非 0 永远为真。<br>编译器不报错！" } ], footer: '<b>📌 怎么考？</b><br>给你一个复杂表达式，问 a 的值；或者给一段代码，问某个变量在短路后变没变。' }
    },

    /* ===== 14 课堂小测 ===== */
    {
      id: 14, type: "quiz", title: "课堂小测", subtitle: "运算符与分支结构", chapterTag: "第 4 讲 · 课堂小测",
      data: { questions: [ { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 运算符", optionLayout: "horizontal", question: "表达式 <code>7 / 2 * 2</code> 的值是多少？", options: [ { label: "A", text: "7" }, { label: "B", text: "6", correct: true }, { label: "C", text: "1" }, { label: "D", text: "3" } ], analysis: "<b>陷阱一：乘除同级</b>。从左到右算，不能先算 2*2。<br><b>陷阱二：整数除法</b>。7/2 截断为 3。最后 3*2=6。" }, { id: 2, type: "single", difficulty: 3, source: "2020 CSP-J 初赛 · 第 5 题", optionLayout: "vertical", question: "以下关于 C++ 逻辑运算符的说法，正确的是？", options: [ { label: "A", text: "<code>a &amp;&amp; b</code> 中，若 a 为假，则 b 不会被求值", correct: true }, { label: "B", text: "<code>a || b</code> 中，两边都会求值" }, { label: "C", text: "<code>!</code> 的优先级低于 <code>&amp;&amp;</code>" }, { label: "D", text: "<code>&amp;&amp;</code> 和 <code>||</code> 优先级相同" } ], analysis: "C++ 逻辑运算符有<b>短路求值</b>特性。<br>A 正确；B 错误。<br>C 错误：<code>!</code> 优先级高于 <code>&amp;&amp;</code>。<br>D 错误：<code>&amp;&amp;</code> 优先级高于 <code>||</code>。" }, { id: 3, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第二章", optionLayout: "two-cols", question: "在 C++ 中，<code>if (a = 5)</code> 和 <code>if (a == 5)</code> 效果完全一样。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: "单等号是赋值，表达式的值是 5（非 0 为真），所以永远成立。<b>编译器不会报错</b>。" } ] }
    },

    /* ===== 15 今日总结 ===== */
    {
      id: 15, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: { text: "条件为真走一条路，为假走另一条路。", author: "—— 分支结构第一课", points: [ "关系运算符结果只有 true / false", "if 单分支、if-else 双分支", "== 和 = 不一样，编译器不报错", "&& 两边真才真，|| 一边真就真", "短路求值：前面决定了，后面就不执行" ], highlight: { title: "📌 关键口诀", desc: "关系判真假，if 走分支，else 兜底；单等号是赋值，双等号是判断；与严或宽非反转，短路后面不计算。" } }
    },

    /* ===== 16 课后作业 ===== */
    {
      id: 16, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: { cards: [ { icon: "🟢", title: "基础 1 · P5710", link: "https://www.luogu.com.cn/problem/P5710", desc: "<b>数的性质</b><br>考察：if 判断、逻辑运算<br>难度：★★" }, { icon: "🟢", title: "基础 2 · P5711", link: "https://www.luogu.com.cn/problem/P5711", desc: "<b>闰年判断</b><br>考察：if-else、逻辑运算<br>难度：★★" }, { icon: "🔴", title: "挑战 · P5716", link: "https://www.luogu.com.cn/problem/P5716", desc: "<b>月份天数</b><br>考察：switch / if-else<br>难度：★★" } ] }
    },

    /* ===== 17 下节预告 ===== */
    {
      id: 17, type: "radial", title: "下节预告", subtitle: "第 5 讲 · 多分支与 switch",
      data: { center: "逻辑风暴", items: [ { text: "if-else-if 多分支" }, { text: "顺序陷阱" }, { text: "switch 穿透" }, { text: "综合实战" } ] }
    },

    /* ===== 18 答疑时间 ===== */
    {
      id: 18, type: "grid", title: "自由提问时间", subtitle: "把你不懂的问题，大声说出来", chapterTag: "第 4 讲 · 互动",
      data: { cards: [ { icon: "⚖️", title: "关于运算符", desc: "优先级记不住怎么办？<br>怎么避免整数除法？" }, { icon: "🚪", title: "关于 if", desc: "== 和 = 怎么区分？<br>短路求值有什么用？" } ], footer: '提问的三个层次：① 是什么 ② 为什么 ③ 怎么办。' }
    },

    /* ===== 19 英文单词 ===== */
    {
      id: 19, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 4 讲 · 复习",
      data: { words: [ { word: "operator", cn: "运算符", pron: "/ˈɒpəreɪtə(r)/", category: "概念" }, { word: "condition", cn: "条件", pron: "/kənˈdɪʃn/", category: "概念" }, { word: "logic", cn: "逻辑", pron: "/ˈlɒdʒɪk/", category: "概念" } ] }
    },

    /* ===== 20 结束页 ===== */
    {
      id: 20, type: "ending", title: "第四讲结束", subtitle: "你的程序，学会了组合判断", chapterTag: false,
      data: { slogan: "科学教育 · 创新课程", extra: { title: "🌟 走出新手村", desc: "今天你避开了 `a = 5` 的致命坑，还学会了用 `&&` 和 `||` 组合条件。<br><br>但这只是基础。下一讲，我们将解锁像分拣机一样的 `switch` 语法，以及多分支的终极奥义。<br>下节课见！", variant: "card-glow" } }
    },
  ],
};
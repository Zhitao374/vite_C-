export default {
  title: "第 4 讲 运算符与分支",
  subtitle: "让程序学会判断",
  total: 30,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1,
      type: "cover",
      title: "运算符与分支",
      subtitle: "让程序学会判断",
      chapterTag: false,
      data: {
        accentWord: "分支",
        meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 4 讲"],
      },
    },

    /* ===== 2 上节回顾 ===== */
    {
      id: 2,
      type: "timeline",
      variant: "review",
      title: "上节课回顾",
      subtitle: "数据的多种面孔",
      data: {
        items: [
          {
            icon: "📐",
            badge: "小数",
            title: "double 与 float",
            desc: "小数的家",
            points: ["double 精度高", "float 精度低", "竞赛首选 double"],
          },
          {
            icon: "🔤",
            badge: "字符",
            title: "char 字符",
            desc: "单个字符",
            points: ["单引号 'A'", "本质是 ASCII", "可转整数"],
          },
          {
            icon: "💡",
            badge: "布尔",
            title: "bool 布尔",
            desc: "只有真和假",
            points: ["true = 1", "false = 0", "判断的基础"],
          },
          {
            icon: "🔄",
            badge: "转换",
            title: "类型转换",
            desc: "不同类型之间",
            points: ["自动转换", "强制转换", "整数除法陷阱"],
          },
        ],
      },
    },

    /* ===== 3 本节课目标 ===== */
    {
      id: 3,
      type: "grid",
      title: "本节课目标",
      subtitle: "四步让程序学会判断",
      data: {
        cards: [
          {
            number: "01",
            title: "运算符",
            desc: "算术、赋值、关系、逻辑四类运算符",
          },
          {
            number: "02",
            title: "if 家族",
            desc: "if / if-else / if-else if 多路判断",
          },
          { number: "03", title: "switch", desc: "多分支的另一种写法" },
          {
            number: "04",
            title: "实战演练",
            desc: "用 if 解决奇偶、成绩、闰年问题",
          },
        ],
      },
    },

    /* ===== 4 学习地图 ===== */
    {
      id: 4,
      type: "timeline",
      variant: "map",
      title: "本讲学习地图",
      subtitle: "四站闯关，学会判断",
      data: {
        items: [
          {
            icon: "➕",
            badge: "基础",
            title: "第一站 · 运算符",
            desc: "算术、赋值、关系、逻辑四类",
            points: ["+ - * / %", "= += -= *= /=", "> < == !=", "&& || !"],
          },
          {
            icon: "🔀",
            badge: "核心",
            title: "第二站 · if 家族",
            desc: "单分支、双分支、多分支",
            points: ["if 单分支", "if-else 双分支", "if-else if 多分支"],
          },
          {
            icon: "🔢",
            badge: "进阶",
            title: "第三站 · switch",
            desc: "多分支的另一种写法",
            points: [
              "switch (变量)",
              "case 常量",
              "break 跳出",
              "default 兜底",
            ],
          },
          {
            icon: "🏆",
            badge: "实战",
            title: "第四站 · 综合练习",
            desc: "奇偶、成绩、闰年",
            points: [
              "% 判断奇偶",
              "if-else if 多级判断",
              "闰年条件：4、100、400",
            ],
          },
        ],
      },
    },

    /* ===== 5 运算符与分支引入 ===== */
    {
      id: 5, type: 'origin',
      title: '程序怎么"做判断"？',
      subtitle: '运算符与分支',
      chapterTag: '第 4 讲 · 概念理解',
      data: {
        problem: {
          title: '程序只会"一条路走到黑"',
          points: [
            '目前程序从第一行执行到最后一行——<b>不会拐弯</b>',
            '想让它"成绩及格就输出及格"——<b>做不到</b>',
            '怎么办？'
          ]
        },
        evolution: [
          {
            icon: '➕', era: '第一步',
            title: '用运算符做比较',
            desc: '<code>score &gt;= 60</code> —— 得到 <b>true</b> 或 <b>false</b>'
          },
          {
            icon: '🔀', era: '第二步',
            title: '用分支选择路径',
            desc: '<code>if (score &gt;= 60) { 输出及格 }</code> —— 条件为真才执行'
          },
          {
            icon: '🧠', era: '第三步',
            title: '程序"活"了',
            desc: '从此不再流水账——能根据输入<b>做不同反应</b>'
          }
        ],
        summary: {
          title: '1966 年 · 结构化程序定理',
          desc: '计算机科学家 <b>Böhm 和 Jacopini</b> 证明：<br>任何程序都可以用三种基本结构组合出来——<br><b>顺序、分支、循环</b>。<br>今天学的<b>分支</b>，是三大结构之一。',
          code: '// 顺序：从上到下\n// 分支：if / else / switch  ← 今天学\n// 循环：while / for      ← 第 5 讲'
        },
        extra: {
          title: '📖 知识扩展 · 结构化程序定理',
          desc: '1966 年，两位计算机科学家 <b>Böhm 和 Jacopini</b> 发表论文，证明了一个惊人的结论：<br><br><b>任何程序，都可以只用三种基本结构表达</b>——<br>顺序、分支、循环。<br><br>这个结论被称为"结构化程序定理"——它是现代编程的基石。<br>所有主流语言（C++、Python、Java）都遵循这个理论。<br><br><b>为什么重要？</b><br>它告诉我们：不需要"跳来跳去"的 goto 语句——<b>三种结构足够表达一切逻辑</b>。<br><br>🔮 <b>伏笔</b>：循环结构是第 5 讲的内容。学会分支 + 循环，程序就能解决任何问题。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 6 运算符总览 ===== */
    {
      id: 6,
      type: "grid",
      title: "C++ 四类常用运算符",
      subtitle: "4 大类，覆盖程序的所有判断",
      data: {
        cards: [
          {
            icon: "➕",
            title: "算术运算符",
            desc: "<b>+</b> 加 · <b>-</b> 减 · <b>*</b> 乘<br><b>/</b> 除（整数除法丢小数）<br><b>%</b> 取余（求余数）<br>例：<code>10 % 3 = 1</code>",
          },
          {
            icon: "✏️",
            title: "赋值运算符",
            desc: "<b>=</b> 赋值<br><b>+=</b> 加后赋值 · <b>-=</b> 减后赋值<br><b>*=</b> 乘后赋值 · <b>/=</b> 除后赋值<br>例：<code>a += 3</code> 即 <code>a = a + 3</code>",
          },
          {
            icon: "⚖️",
            title: "关系运算符",
            desc: "<b>&gt;</b> 大于 · <b>&lt;</b> 小于<br><b>&gt;=</b> 大于等于 · <b>&lt;=</b> 小于等于<br><b>==</b> 等于 · <b>!=</b> 不等于<br>结果只有 <b>true</b> 或 <b>false</b>",
          },
          {
            icon: "🔗",
            title: "逻辑运算符",
            desc: "<b>&amp;&amp;</b> 与（两边都真才真）<br><b>||</b> 或（一边真就真）<br><b>!</b> 非（真变假，假变真）<br>例：<code>a &gt; 0 &amp;&amp; a &lt; 10</code>",
          },
        ],
        footer: '<b>⚠️ 竞赛高频提醒</b>：关系运算符的 <code>==</code> 容易和赋值 <code>=</code> 混淆。<br><code>if (a = 5)</code> 是赋值（<b>永远成立</b>），<code>if (a == 5)</code> 才是判断。<br>写错会得到意想不到的结果，而且<b>编译器不报错</b>。<br><br><b>记忆口诀</b>：判断相等，两个等号。<br><br>🔮 <b>伏笔</b>：除了这四类，C++ 还有第五类——<b>位运算</b>。第 21 讲揭晓。'
      },
    },

    /* ===== 7 算术与赋值运算符 ===== */
    {
      id: 7,
      type: "code-split",
      title: "算术与赋值运算符",
      subtitle: "五大算术 + 复合赋值",
      data: {
        intro: "📖 <b>算术运算符</b>做加减乘除；<b>复合赋值</b>是简写形式。",
        codeFile: "codes/lesson-04/operators.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "int a = 10, b = 3;", desc: "定义两个变量" },
          { line: 10, title: "a / b", desc: "整数除法，10/3 = 3，小数被丢弃" },
          { line: 11, title: "a % b", desc: "取余，10 除以 3 的余数是 1" },
          { line: 14, title: "x += 3", desc: "简写，等价于 x = x + 3" },
        ],
        output: "13\n7\n30\n3\n1\n8",
        footer: '<b>💡 取余 % 的妙用</b><br>① <b>判断奇偶</b>：<code>n % 2 == 0</code> 是偶数<br>② <b>提取数位</b>：<code>n % 10</code> 得到个位数<br>③ <b>判断倍数</b>：<code>n % k == 0</code> 说明 n 是 k 的倍数<br><br><b>实际应用</b>：密码学、哈希函数、日期计算都用取余。'
      },
    },

    /* ===== 8 关系运算符 ===== */
    {
      id: 8,
      type: "code-split",
      title: "关系运算符 · 判断大小与相等",
      subtitle: "结果只有真或假",
      data: {
        intro:
          "📖 关系运算符做<b>比较</b>，结果是 <code>bool</code>（true / false）。<br>输出时 true 显示 1，false 显示 0。",
        codeFile: "codes/lesson-04/relations.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "(a &gt; b)", desc: "大于，5 &gt; 3 为真，输出 1" },
          { line: 7, title: "(a &lt; b)", desc: "小于，5 &lt; 3 为假，输出 0" },
          { line: 8, title: "(a == b)", desc: "相等，注意是两个等号" },
          { line: 9, title: "(a != b)", desc: "不相等" },
        ],
        output: "1\n0\n0\n1",
        extra: {
          title: "💡 为什么必须加括号？",
          desc: "写 <code>cout &lt;&lt; a &gt; b</code> 会出错——<br>因为 <code>&lt;&lt;</code> 的优先级<b>高于</b> <code>&gt;</code>。<br>程序会先算 <code>cout &lt;&lt; a</code>（输出 a），再比较 <code>&gt; b</code>。<br>结果错。<br><br><b>正确写法</b>：<code>cout &lt;&lt; (a &gt; b)</code><br><br><b>记忆</b>：关系运算放进 cout 时，<b>必须加括号</b>。<br><br>🔮 <b>伏笔</b>：为什么 <code>true</code> 输出 1，<code>false</code> 输出 0？<br>因为计算机里<b>真就是 1，假就是 0</b>。第 22 讲揭晓。",
          variant: "card-primary",
        },
      },
    },

    /* ===== 9 逻辑运算符与优先级 ===== */
    {
      id: 9, type: 'grid',
      title: '逻辑运算符与优先级',
      subtitle: '组合多个条件',
      chapterTag: '第 4 讲 · 概念理解',
      data: {
        cards: [
          {
            icon: '🔗',
            title: '&& 与',
            desc: '两边都真才真<br><b>true && true = true</b><br>true && false = false<br>常用于"范围判断"<br><code>a &gt; 0 &amp;&amp; a &lt; 10</code>'
          },
          {
            icon: '⚡',
            title: '|| 或',
            desc: '一边真就真<br>false || true = true<br>false || false = false<br>常用于"任一满足"<br><code>a == 1 || a == 2</code>'
          },
          {
            icon: '🚫',
            title: '! 非',
            desc: '真变假，假变真<br><code>!true = false</code><br><code>!false = true</code><br>常用于"反向判断"<br><code>if (!flag)</code>'
          },
          {
            icon: '📊',
            title: '优先级（常用 5 层）',
            desc: '① <code>( )</code> 括号<br>② <code>! ++ --</code><br>③ <code>* / %</code><br>④ <code>+ -</code><br>⑤ <code>&gt; &lt; == &amp;&amp; ||</code>'
          }
        ],
        footer: '<b>📌 口诀</b>：与（&&）严——两边都要真；或（||）宽——一边真就行；非（!）反过来。<br><br><b>不确定就加括号</b>——加括号不会错，少加括号容易错。竞赛代码多几个括号没人嫌，少一个可能就 WA。<br><br><b>🔮 伏笔</b>：逻辑运算符 <code>&amp;&amp; || !</code> 在电路里对应"与门、或门、非门"——第 22 讲从开关讲到计算机。'
      }
    },

    /* ===== 10 过渡页 ===== */
    {
      id: 10,
      type: "transition",
      title: "第二站 · 条件分支",
      subtitle: "让程序学会做判断",
      data: { note: '接下来你将学会用 if 语句让程序"走不同的路"' },
    },

    /* ===== 11 什么是分支 ===== */
    {
      id: 11, type: 'grid',
      title: '什么是分支结构？',
      subtitle: '让程序学会做判断',
      chapterTag: '第 4 讲 · 分支结构',
      data: {
        cards: [
          {
            icon: '➡️',
            title: '顺序结构',
            desc: '程序从上到下<br>一条条执行<br>像流水账<br><b>不会拐弯</b>'
          },
          {
            icon: '🔀',
            title: '分支结构',
            desc: '根据条件<br>选择执行路径<br>像十字路口<br><b>能随机应变</b>'
          },
          {
            icon: '💡',
            title: 'if 语句',
            desc: 'C++ 的分支语法<br><code>if (score &gt;= 60) { 输出及格 }</code><br>条件成立执行<br>不成立跳过'
          }
        ],
        footer: '<b>📖 从顺序到分支</b>：没有分支的程序，就像一个机器人只会做一件事——<b>不管输入什么，结果都一样</b>。有了分支，程序才能根据输入"做不同的反应"。<br><br><b>if 是几乎所有编程语言都有的语法</b>——从 1957 年的 FORTRAN 到今天的 Python、Java，全部都有 if。这是人类"做判断"思维的最自然表达。'
      }
    },

    /* ===== 12 if 单分支 ===== */
    {
      id: 12,
      type: "code-split",
      title: "if 单分支",
      subtitle: "条件为真就执行",
      data: {
        intro:
          "📖 <b>语法</b>：<code>if (条件) { 执行体 }</code>。<br>条件为真 → 执行；条件为假 → 跳过。",
        codeFile: "codes/lesson-04/if-single.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "int score;", desc: "定义变量存分数" },
          { line: 7, title: "cin &gt;&gt; score;", desc: "从键盘读入分数" },
          {
            line: 9,
            title: "if (score &gt;= 60)",
            desc: "条件为真时执行大括号内",
          },
          { line: 12, title: "cout", desc: "无论条件真假都会执行" },
        ],
        output: "（输入 75）\n及格\n程序结束",
      },
    },

    /* ===== 13 if-else 双分支 ===== */
    {
      id: 13,
      type: "code-split",
      title: "if-else 双分支",
      subtitle: "两条路，必走一条",
      data: {
        intro:
          "📖 <b>语法</b>：<code>if (条件) { ... } else { ... }</code>。<br>条件为真走 if，为假走 else——<b>必走一条</b>。",
        codeFile: "codes/lesson-04/if-else.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "int score;", desc: "定义变量存分数" },
          { line: 7, title: "cin &gt;&gt; score;", desc: "从键盘读入分数" },
          { line: 9, title: "if", desc: "条件为真时执行这块" },
          {
            line: 11,
            title: "} else {",
            desc: "大括号后紧跟 else，条件为假时执行",
          },
          { line: 12, title: "cout", desc: "条件为假时才执行" },
        ],
        output: "（输入 45）\n不及格",
      },
    },

    /* ===== 14 if-else if 多分支 ===== */
    {
      id: 14,
      type: "code-split",
      title: "if-else if-else 多分支",
      subtitle: "多条路，只走一条",
      data: {
        intro:
          "📖 <b>语法</b>：链式多个 <code>else if</code>。<br>从上到下依次判断，<b>一旦某个条件成立，后面不再判断</b>。",
        codeFile: "codes/lesson-04/if-else-if.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "int score;", desc: "定义变量存分数" },
          { line: 9, title: "score &gt;= 90", desc: "先判断最高档" },
          {
            line: 11,
            title: "else if",
            desc: "上一个条件不成立时，判断这一个",
          },
          { line: 15, title: "else", desc: "所有条件都不成立时执行" },
        ],
        output: "（输入 85）\nB",
        footer: '<b>⚠️ 多分支的顺序很重要</b><br>程序从上往下依次判断——<b>一旦某个条件成立，后面不再判断</b>。<br><br>所以条件的顺序很重要！<br>如果把 <code>score &gt;= 60</code> 放在第一位——<br>那么 90 分也会被判成 "C"，因为它先匹配了。<br><br><b>原则</b>：范围窄的条件放前面，范围宽的条件放后面。<br>通常"<b>从高到低</b>"或"<b>从小到大</b>"。<br><br><b>竞赛经验</b>：多分支题，先画个表格确定条件顺序，再写代码——能避免 90% 的顺序错误。'
      },
    },

    /* ===== 15 switch 引入 ===== */
    {
      id: 15, type: 'grid',
      title: 'switch 是什么？',
      subtitle: '多分支的另一种写法',
      chapterTag: '第 4 讲 · 分支结构',
      data: {
        cards: [
          {
            icon: '🔢',
            title: '① 判断什么？',
            desc: '专门判断一个变量<br>是否等于<b>某个固定值</b><br>如 <code>day == 1</code><br>（不能判断范围）'
          },
          {
            icon: '⚡',
            title: '② 什么时候用？',
            desc: '固定值判断用 switch<br>范围判断用 if-else<br><b>口诀</b>：区间用 if<br>等值用 switch'
          },
          {
            icon: '🚀',
            title: '③ 有什么好处？',
            desc: '代码更清晰<br>编译器生成<b>跳转表</b><br>一步到位——更快<br>比 if-else 链效率高'
          }
        ],
        footer: '<b>📖 switch 的由来</b>：1970 年代的 C 语言首次引入 switch——设计初衷是让"多路选择"写起来更清晰。<br><br><b>实现原理</b>：编译器把 switch 编译成一张"跳转表"，直接跳到对应的 case——效率比 if-else 链更高。<br><br><b>⚠️ 限制</b>：switch 只能判断<b>整数和字符</b>，不能判断小数、字符串。'
      }
    },

    /* ===== 16 switch 语法 ===== */
    {
      id: 16,
      type: "code-split",
      title: "switch 多分支",
      subtitle: "根据变量的值选择路径",
      data: {
        intro:
          "📖 <b>语法</b>：<code>switch (变量) { case 值: ...; break; ... default: ... }</code>。<br>变量等于哪个 case，就跳到哪个 case 执行。",
        codeFile: "codes/lesson-04/switch-day.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "int day;", desc: "定义变量存天数" },
          { line: 7, title: "cin &gt;&gt; day;", desc: "读入数字 1—7" },
          { line: 9, title: "switch (day)", desc: "根据 day 的值跳转" },
          { line: 10, title: "case 1:", desc: "当 day 等于 1 时执行" },
          { line: 10, title: "break;", desc: '跳出 switch，不写会"穿透"' },
          { line: 17, title: "default:", desc: "所有 case 都不匹配时执行" },
        ],
        output: "（输入 3）\n周三",
        footer: '<b>⚠️ break 的作用</b>：<br>break 表示"跳出 switch"。<br>不写 break，程序会继续执行下一个 case——这叫"<b>case 穿透</b>"。<br><br>有时候穿透是<b>有意为之</b>（多个 case 共用一段代码），<br>但新手常因忘记 break 而出错。<br><br><b>建议</b>：先都加上 break，等熟练后再考虑穿透。'
      },
    },

    /* ===== 17 switch vs if-else ===== */
    {
      id: 17, type: 'decision',
      title: 'switch vs if-else',
      subtitle: '什么时候用哪个',
      chapterTag: '第 4 讲 · 分支结构',
      data: {
        intro: '📖 两种语法都能做判断——<b>怎么选？</b><br>看下面的判断信号。',
        signals: [
          {
            icon: '📏',
            keyword: '判断范围',
            desc: '如 <code>score &gt;= 90</code><br><b>用 if-else</b>'
          },
          {
            icon: '🎯',
            keyword: '判断固定值',
            desc: '如 <code>day == 3</code><br><b>用 switch</b>'
          },
          {
            icon: '🔗',
            keyword: '复合条件',
            desc: '含 <code>&amp;&amp;</code> 或 <code>||</code><br><b>用 if-else</b>'
          },
          {
            icon: '🔤',
            keyword: '小数 / 字符串',
            desc: 'switch 不支持<br><b>用 if-else</b>'
          },
          {
            icon: '⚡',
            keyword: '追求效率',
            desc: 'case 数量多时<br><b>用 switch</b>'
          },
          {
            icon: '📝',
            keyword: '可读性优先',
            desc: '看代码清晰度<br><b>两者都行</b>'
          }
        ],
        conclusion: {
          title: '判断法则',
          desc: '<b>区间用 if，等值用 switch</b><br><br>· 涉及比较符号（&gt;、&lt;、&gt;=）→ if<br>· 涉及固定值匹配（月份、菜单）→ switch<br><br>📌 <b>代码清晰最重要</b>——不确定时，优先选"看起来更好读"的那个。'
        }
      }
    },

    /* ===== 18 练习1：判断奇偶 ===== */
    {
      id: 18,
      type: "level-map",
      title: "课堂练习1：判断奇偶",
      subtitle: "用取余判断一个数的奇偶性",
      chapterTag: "第 4 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入一个整数 <code>n</code>，如果 n 是偶数输出 <code>even</code>，如果是奇数输出 <code>odd</code>。<br>输入样例：<code>7</code>　输出样例：<code>odd</code>",
          timer: "⏱ 限时 5 分钟",
        },
        hints: [
          "用 <code>n % 2</code> 判断",
          "<code>n % 2 == 0</code> 是偶数",
          "用 <code>if-else</code> 走两条路",
        ],
        answer: { codeFile: "codes/lesson-04/even-odd.cpp" },
        analysis: {
          title: "📖 解析",
          desc: "<code>n % 2</code> 得到 n 除以 2 的余数，只有 0 和 1 两种结果。<br>余数为 0 就是偶数，余数为 1 就是奇数。<br>这是取余运算符最典型的应用。",
        },
        footer: '<b>💡 取余的经典用法</b>：<br>· <code>n % 3 == 0</code> → 能被 3 整除<br>· <code>n % 5 == 0</code> → 能被 5 整除<br>· <code>n % 10</code> → 得到个位数<br><br>竞赛中，取余几乎无处不在。'
      },
    },

    /* ===== 19 练习2：成绩等级 ===== */
    {
      id: 19,
      type: "level-map",
      title: "课堂练习2：成绩等级",
      subtitle: "用多分支判断分数等级",
      chapterTag: "第 4 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入一个分数 <code>score</code>（0—100），按下面规则输出等级：<br>≥90 → <code>A</code>　≥80 → <code>B</code>　≥60 → <code>C</code>　其他 → <code>D</code><br><br><b>要求</b>：把分数除以 10 得到整数部分，用 <code>switch</code> 判断等级。",
          timer: "⏱ 限时 8 分钟",
        },
        hints: [
          "先算 <code>int level = score / 10;</code>（整数除法）",
          "用 <code>switch (level)</code> 判断 level 的值",
          "case 10 和 9：A；case 8：B；case 7 和 6：C；default：D",
          '利用"case 穿透"——多个 case 共用一段代码',
        ],
        answer: { codeFile: "codes/lesson-04/score-level.cpp" },
        analysis: {
          title: "📖 解析",
          desc: '关键技巧是 <code>score / 10</code>——<br>把 0—100 分成 10 档，再用 switch 判断。<br><br><b>为什么用 case 穿透？</b><br><code>case 10:</code> 后面不写 <code>break</code>——<br>程序会继续执行到 <code>case 9:</code>——<br>所以 90—100 分都输出 A。<br><br>这是 <b>switch 的经典用法</b>——<br>多个 case 共用一段代码，用"穿透"实现。',
        },
      },
    },

    /* ===== 20 练习3：闰年判断 ===== */
    {
      id: 20,
      type: "level-map",
      title: "课堂练习3：闰年判断",
      subtitle: "用逻辑运算符组合条件",
      chapterTag: "第 4 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入一个年份 <code>year</code>，判断是否为闰年。<br>闰年规则：能被 4 整除但不能被 100 整除，或者能被 400 整除。<br>是闰年输出 <code>yes</code>，否则输出 <code>no</code>。",
          timer: "⏱ 限时 10 分钟",
        },
        hints: [
          "用 <code>&amp;&amp;</code> 和 <code>||</code> 组合条件",
          "能被 4 整除：<code>year % 4 == 0</code>",
          "完整条件：<code>(year % 4 == 0 &amp;&amp; year % 100 != 0) || year % 400 == 0</code>",
        ],
        answer: { codeFile: "codes/lesson-04/leap-year.cpp" },
        analysis: {
          title: "📖 解析",
          desc: '条件分两部分：<br>① <code>year % 4 == 0 &amp;&amp; year % 100 != 0</code>（普通闰年）<br>② <code>year % 400 == 0</code>（世纪闰年）<br>两者取"或"（<code>||</code>）关系。<br><b>括号不能漏</b>，否则优先级会出错。',
        },
        extra: {
          title: "📖 知识扩展 · 闰年的由来",
          desc: '地球绕太阳一圈约 365.2422 天，不是整数。<br>每 4 年多出约 1 天，所以设闰年加 1 天。<br>但 4 年多加了一点点，所以每 100 年要减 1 次闰年。<br>减了之后又少了一点点，所以每 400 年又补 1 次。<br>这就是"4、100、400"规则的由来。<br><br><b>冷知识</b>：2000 年是闰年，1900 年不是。',
          variant: "card-primary",
        },
      },
    },

    /* ===== 21 常见错误 ===== */
    {
      id: 21, type: 'pitfall',
      title: '分支与运算符常见错误',
      subtitle: '避开这些坑',
      data: {
        cases: [
          {
            icon: '❌',
            scene: 'if (a = 5) —— 少写了一个等号',
            what: '程序永远执行 if 内部代码',
            why: '= 是赋值，表达式的值是 5（非 0 = true）<br>编译器不报错',
            fix: '判断相等用 <code>==</code>——<code>if (a == 5)</code>'
          },
          {
            icon: '❌',
            scene: 'switch 里 case 后忘写 break',
            what: '程序继续执行下一个 case',
            why: '这叫"case 穿透"——switch 的特性<br>不写 break 会一直往下走',
            fix: '每个 case 后加 <code>break;</code>'
          },
          {
            icon: '❌',
            scene: '多分支条件顺序写反',
            what: '大分数被分到低等级',
            why: 'if 从上到下依次判断<br>一旦成立后面不再判断',
            fix: '范围窄的放前面——通常"从高到低"'
          },
          {
            icon: '❌',
            scene: 'cout << a > b —— 忘了加括号',
            what: '输出结果错乱',
            why: '<code>&lt;&lt;</code> 优先级<b>高于</b> <code>&gt;</code><br>先算输出，再比较',
            fix: '关系运算放进 cout，必须加括号——<code>cout &lt;&lt; (a &gt; b)</code>'
          }
        ],
        footer: '<b>📌 调试方法</b>：写完分支代码，用几组典型数据测试一遍——尤其测<b>边界情况</b>。<br>比如闰年判断，测 1900（不是）、2000（是）、2024（是）。<br>这个"测边界"的习惯，能帮你抓住 <b>80% 的逻辑错误</b>。'
      }
    },

    /* ===== 22 初赛渗透 ===== */
    {
      id: 22, type: 'split',
      title: '初赛小知识：运算符与分支',
      subtitle: 'CSP-J/S 初赛必考',
      chapterTag: '第 4 讲 · 初赛渗透',
      data: {
        intro: '初赛有两类高频考点——<b>运算符</b>和<b>分支结构</b>。都是送分题，必须拿下。',
        panes: [
          {
            title: '运算符考点',
            icon: '➕',
            items: [
              { title: '整数除法', desc: '<code>7 / 2 = 3</code>（不是 3.5）' },
              { title: '取余', desc: '<code>n % 2</code> 判奇偶' },
              { title: '短路求值', desc: '<code>a &amp;&amp; b</code>：a 假则 b 不执行' },
              { title: '优先级', desc: '<code>&amp;&amp;</code> 高于 <code>||</code>' },
              { title: '逻辑真值表', desc: '&amp;&amp; || ! 的结果' }
            ]
          },
          {
            title: '分支考点',
            icon: '🔀',
            items: [
              { title: 'else 悬挂', desc: 'else 跟最近的未配对 if' },
              { title: 'switch 穿透', desc: '不写 break 会继续执行' },
              { title: '<code>= vs ==</code>', desc: '赋值 vs 判断' },
              { title: '读程序写结果', desc: '画表格，逐行推' },
              { title: '边界情况', desc: '测 0、最大值、负数' }
            ]
          }
        ]
      }
    },

    /* ===== 23 课堂小测 ===== */
    {
      id: 23,
      type: "quiz",
      title: "课堂小测",
      subtitle: "运算符与分支结构",
      chapterTag: "第 4 讲 · 课堂小测",
      data: {
        questions: [
          {
            id: 1,
            type: "single",
            difficulty: 2,
            source: "CSP-J 初赛真题练习 · 运算符",
            question: "表达式 <code>7 / 2 * 2</code> 的值是多少？",
            options: [
              { label: "A", text: "7" },
              { label: "B", text: "6", correct: true },
              { label: "C", text: "7.0" },
              { label: "D", text: "3" },
            ],
            analysis:
              "运算符优先级：乘除同级，从左到右计算。<br>先算 <code>7 / 2</code>，两个 int 相除，结果是 <code>3</code>（小数被丢弃）。<br>再算 <code>3 * 2 = 6</code>。<br>这是新手最容易忽略的陷阱：<b>整数除法会丢小数</b>。",
          },
          {
            id: 2,
            type: "single",
            difficulty: 3,
            source: "CSP-J 2022 初赛模拟题 · 分支结构",
            question: "下面代码的输出是？",
            questionCode: `int a = 5;
if (a > 3)
    if (a > 4)
        cout << "A";
    else
        cout << "B";`,
            options: [
              { label: "A", text: "A", correct: true },
              { label: "B", text: "B" },
              { label: "C", text: "AB" },
              { label: "D", text: "编译错误" },
            ],
            analysis:
              '这是经典的"<b>else 悬挂问题</b>"。<br><code>else</code> 只跟<b>最近的、未配对的 if</b> 配对。<br>所以 <code>else</code> 属于内层 <code>if (a &gt; 4)</code>，而不是外层 <code>if (a &gt; 3)</code>。<br>a = 5，两个条件都成立，输出 A。<br><b>建议</b>：嵌套 if 一定要加<b>大括号</b>，避免歧义。',
          },
          {
            id: 3,
            type: "single",
            difficulty: 3,
            source: "2020 CSP-J 初赛 · 第 5 题",
            question: "以下关于 C++ 逻辑运算符的说法，正确的是？",
            options: [
              {
                label: "A",
                text: "<code>a &amp;&amp; b</code> 中，若 a 为假，则 b 不会被求值",
                correct: true,
              },
              { label: "B", text: "<code>a || b</code> 中，两边都会求值" },
              {
                label: "C",
                text: "<code>!</code> 的优先级低于 <code>&amp;&amp;</code>",
              },
              {
                label: "D",
                text: "<code>&amp;&amp;</code> 和 <code>||</code> 优先级相同",
              },
            ],
            analysis:
              'C++ 逻辑运算符有<b>短路求值</b>特性：<br>· <code>a &amp;&amp; b</code>：若 a 为假，b <b>不执行</b><br>· <code>a || b</code>：若 a 为真，b <b>不执行</b><br><br>A 正确；B 错误（应改为"或"的短路）。<br>C 错误：<code>!</code> 优先级<b>高于</b> <code>&amp;&amp;</code>。<br>D 错误：<code>&amp;&amp;</code> 优先级<b>高于</b> <code>||</code>。',
          },
          {
            id: 4,
            type: "judge",
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第二章",
            question:
              "在 C++ 中，<code>if (a = 5)</code> 和 <code>if (a == 5)</code> 效果完全一样。",
            options: [
              { label: "A", text: "正确" },
              { label: "B", text: "错误", correct: true },
            ],
            analysis:
              "两者完全不同：<br>· <code>if (a == 5)</code>：判断 a 是否等于 5<br>· <code>if (a = 5)</code>：先把 5 赋给 a，然后判断表达式的值（5，非 0 为真），所以<b>永远成立</b><br><br>这是 C++ 新手最容易犯的错误之一，而且编译器<b>不会报错</b>。<br>养成习惯：判断相等，永远用两个等号。",
          },
          {
            id: 5,
            type: "judge",
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第二章",
            question:
              "在 switch 语句中，每个 case 后面必须写 break，否则程序会继续执行下一个 case。",
            options: [
              { label: "A", text: "正确", correct: true },
              { label: "B", text: "错误" },
            ],
            analysis:
              '不写 break 会导致"<b>case 穿透</b>"：<br>程序会从匹配的 case 开始，一直往下执行所有 case，直到遇到 break 或 switch 结束。<br><br>这是特性，有时被有意使用（如多个 case 共用一段代码），但更多时候是 bug 来源。<br><b>建议</b>：写 switch 时先都加上 break，除非有明确理由不使用。',
          },
        ],
      },
    },

    /* ===== 24 今日总结 ===== */
    {
      id: 24,
      type: "quote",
      title: "今日总结",
      subtitle: "今天我们学会了",
      data: {
        text: "条件为真走一条路，为假走另一条路。",
        author: "—— 分支结构第一课",
        points: [
          "四类运算符：算术、赋值、关系、逻辑",
          "算术：+ - * / %（注意整数除法）",
          "关系：&gt; &lt; == != 结果是 true / false",
          "逻辑：&amp;&amp; || !（短路求值）",
          "if 单分支、if-else 双分支、多分支",
          "switch 适合等值判断，注意 break",
        ],
        highlight: {
          title: "📌 关键口诀",
          desc: "算术算数，赋值存数；关系判真假，逻辑组合条件；if 走分支，else 兜底；switch 多分支，break 别忘记。",
        },
      },
    },

    /* ===== 25 课后作业 ===== */
    {
      id: 25,
      type: "grid",
      title: "课后作业 · OJ 实战",
      subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          {
            icon: "🟢",
            title: "基础 1 · P5710",
            link: "https://www.luogu.com.cn/problem/P5710",
            desc: "<b>数的性质</b><br>考察：逻辑运算、if 判断<br>难度：★★<br>目标：用 &amp;&amp; || 组合多个条件",
          },
          {
            icon: "🟢",
            title: "基础 2 · P5711",
            link: "https://www.luogu.com.cn/problem/P5711",
            desc: "<b>闰年判断</b><br>考察：if-else、逻辑运算<br>难度：★★<br>目标：写出闰年的完整条件",
          },
          {
            icon: "🔴",
            title: "挑战 · P5716",
            link: "https://www.luogu.com.cn/problem/P5716",
            desc: "<b>月份天数</b><br>考察：switch / if-else<br>难度：★★<br>目标：判断每个月的天数，注意闰年",
          },
        ],
      },
    },

    /* ===== 26 下节预告 ===== */
    {
      id: 26,
      type: "radial",
      title: "下节预告",
      subtitle: "第 5 讲 · 循环结构",
      data: {
        center: "循环结构",
        items: [
          { text: "while 循环" },
          { text: "for 循环" },
          { text: "循环嵌套" },
          { text: "break 与 continue" },
        ],
      },
    },

    /* ===== 27 答疑时间 ===== */
    {
      id: 27, type: 'grid',
      title: '答疑时间',
      subtitle: '常见问题 FAQ',
      chapterTag: '第 4 讲 · 答疑',
      data: {
        cards: [
          {
            icon: '❓',
            title: '为什么 if (a = 5) 不报错？',
            desc: '<code>=</code> 是赋值——赋完值后表达式等于 5（非 0 = true）<br>所以 if <b>永远成立</b>。<br>编译器不报错，但逻辑错了。'
          },
          {
            icon: '📏',
            title: '多分支顺序怎么排？',
            desc: '从范围最窄的条件开始<br>通常"<b>从高到低</b>"或"<b>从小到大</b>"<br>否则大分数会被分到低等级。'
          },
          {
            icon: '🔀',
            title: 'switch 还是 if-else？',
            desc: '判断<b>固定值</b>（月份、星期）→ switch<br>判断<b>范围</b>（分数段）→ if-else<br><b>口诀</b>：区间用 if，等值用 switch。'
          },
          {
            icon: '⚡',
            title: '短路求值是什么？',
            desc: '<code>a &amp;&amp; b</code> 中 a 为假 → b <b>不执行</b><br>这就是短路求值。<br>注意：别在 b 里写"必须执行"的操作。'
          },
          {
            icon: '⚠️',
            title: '为什么要写 break？',
            desc: '不写 break，程序会"<b>穿透</b>"——<br>从匹配的 case 一直往下执行所有 case。<br>有时是特性，更多是 bug。'
          },
          {
            icon: '💡',
            title: '怎么避免分支错误？',
            desc: '写完后用<b>典型数据</b>测一遍<br>尤其测<b>边界情况</b>——<br>0、最大值、负数、闰年 1900/2000。'
          }
        ]
      }
    },

    /* ===== 28 本讲英文单词 ===== */
    {
      id: 28,
      type: "glossary",
      title: "本讲英文单词",
      subtitle: "记牢拼写，理解原意",
      chapterTag: "第 4 讲 · 复习",
      data: {
        words: [
          {
            word: "if",
            cn: "如果",
            pron: "/ɪf/",
            origin: '英文原意"如果"',
            category: "关键字",
          },
          {
            word: "else",
            cn: "否则",
            pron: "/els/",
            origin: '英文原意"否则"',
            category: "关键字",
          },
          {
            word: "switch",
            cn: "开关",
            pron: "/swɪtʃ/",
            origin: '英文原意"开关"',
            category: "关键字",
          },
          {
            word: "case",
            cn: "情况",
            pron: "/keɪs/",
            origin: '英文原意"情况"',
            category: "关键字",
          },
          {
            word: "break",
            cn: "打断",
            pron: "/breɪk/",
            origin: '英文原意"打破"',
            category: "关键字",
          },
          {
            word: "default",
            cn: "默认",
            pron: "/dɪˈfɔːlt/",
            origin: '英文原意"默认"',
            category: "关键字",
          },
          {
            word: "and",
            cn: "与",
            pron: "/ænd/",
            origin: "对应 C++ 的 &amp;&amp;",
            category: "运算符",
          },
          {
            word: "or",
            cn: "或",
            pron: "/ɔːr/",
            origin: "对应 C++ 的 ||",
            category: "运算符",
          },
        ],
      },
    },

    /* ===== 29 知识清单 ===== */
    {
      id: 29,
      type: "grid",
      title: "第 4 讲 · 知识清单",
      subtitle: "一页看完本讲所有重点",
      chapterTag: "第 4 讲 · 复习",
      data: {
        cards: [
          {
            icon: "➕",
            title: "四类运算符",
            desc: "<b>算术</b>：+ - * / %<br><b>赋值</b>：= += -=<br><b>关系</b>：&gt; &lt; == !=<br><b>逻辑</b>：&amp;&amp; || !",
          },
          {
            icon: "🔀",
            title: "if 家族",
            desc: "<b>单分支</b>：if (条件) { }<br><b>双分支</b>：if ... else ...<br><b>多分支</b>：if ... else if ... else<br><b>顺序</b>：从窄到宽判断",
          },
          {
            icon: "🔢",
            title: "switch",
            desc: "<b>语法</b>：switch (变量) { case 值: ... }<br><b>break</b>：跳出 switch，不写会穿透<br><b>default</b>：兜底分支<br><b>适用</b>：判断固定值",
          },
          {
            icon: "⚠️",
            title: "四大易错",
            desc: "<b>① = vs ==</b>：赋值 vs 判断<br><b>② 优先级</b>：不确定就加括号<br><b>③ break</b>：switch 里别忘<br><b>④ 顺序</b>：多分支从高到低",
          },
        ],
        footer: '<b>📌 关键口诀</b>：算术算数，赋值存数；关系判真假，逻辑组合条件；if 走分支，else 兜底；switch 多分支，break 别忘记。'
      },
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30,
      type: "ending",
      title: "第四讲结束",
      subtitle: "点击返回目录，复习本讲内容",
      chapterTag: false,
      data: {
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
      },
    },
  ],
};

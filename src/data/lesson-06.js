export default {
  title: "第 6 讲 循环结构",
  subtitle: "让程序学会重复",
  total: 24,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    { id: 1, type: "cover", title: "循环结构", subtitle: "让程序学会重复", chapterTag: false, data: { accentWord: "循环", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 6 讲"] } },

    /* ===== 2 钩子 ===== */
    {
      id: 2, type: "dialog", title: "怎么让电脑搬砖 1 亿次？", subtitle: "人脑的极限，电脑的起点", chapterTag: "第 6 讲 · 开场",
      data: { lines: [ { who: "student", text: "小 C，如果让你算 1+2+3 一直加到 1 亿，你脑子会烧掉吧？" }, { who: "robot", text: "我当然不会硬算，我会用循环。在 C++ 里，只需要写 4 行代码，1 秒钟就能算完。" }, { who: "student", text: "4 行代码？怎么写？" }, { who: "robot", text: "看好了。今天我们就来学习，如何指挥电脑一秒搬砖一亿次——<b>循环结构</b>。" } ] }
    },

    /* ===== 3 上节回顾 ===== */
    {
      id: 3, type: "timeline", variant: "review", title: "上节课回顾", subtitle: "多分支与 switch",
      data: { items: [ { icon: "🪜", badge: "多分支", title: "if-else if", desc: "排成一排", points: ["顺序陷阱"] }, { icon: "📮", badge: "switch", title: "等值匹配", desc: "分拣机", points: ["break 防穿透"] }, { icon: "⚠️", badge: "悬挂 else", title: "就近原则", desc: "缩进骗人", points: ["必须加括号"] }, { icon: "❓", badge: "三目", title: "问号表达式", desc: "if-else 简写", points: ["初赛考点"] } ] }
    },

    /* ===== 4 作战地图 ===== */
    {
      id: 4, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "四站闯关，掌握程序的引擎",
      data: { items: [ { icon: "🔁", badge: "第一站", title: "for 循环", desc: "明确次数", points: ["三要素", "执行轨迹", "i++ 与 ++i"] }, { icon: "🔄", badge: "第二站", title: "while 循环", desc: "条件触发", points: ["未知次数", "死循环急救"] }, { icon: "🛑", badge: "第三站", title: "控制流", desc: "紧急刹车", points: ["break 与 continue"] }, { icon: "🏆", badge: "第四站", title: "经典应用", desc: "数位分离与质数", points: ["提取每一位", "判断质数"] } ] }
    },

    /* ===== 5 痛点引入：为什么要循环？ ===== */
    {
      id: 5, type: "split", title: "为什么需要循环？", subtitle: "从复制粘贴的噩梦开始",
      data: {
        intro: "如果我们要输出 5 次 “Hello”，你会怎么写？",
        panes: [
          {
            title: "❌ 原始写法",
            icon: "😭",
            items: [
              { desc: "<code>cout &lt;&lt; \"Hello\";</code><br><code>cout &lt;&lt; \"Hello\";</code><br><code>cout &lt;&lt; \"Hello\";</code><br><code>cout &lt;&lt; \"Hello\";</code><br><code>cout &lt;&lt; \"Hello\";</code><br><br>如果改成 1 万次呢？<br>手敲断了都写不完。" }
            ]
          },
          {
            title: "✅ 循环写法",
            icon: "😎",
            items: [
              { desc: "<code>for (int i = 1; i &lt;= 5; i++) {</code><br>&nbsp;&nbsp;<code>cout &lt;&lt; \"Hello\";</code><br><code>}</code><br><br>改成 1 万次？<br>把 5 改成 10000 即可，轻松搞定。" }
            ]
          }
        ],
        extra: { desc: '<b>📌 本质</b>：循环就是让电脑替我们做无聊的重复劳动。', variant: 'flat' }
      }
    },

    /* ===== 6 for 循环基础 ===== */
    {
      id: 6, type: "code-split", title: "for 循环 · 跑圈三要素", subtitle: "计次循环的标准语法",
      data: { 
        intro: "📖 <b>语法</b>：<code>for (初始化; 条件; 步长)</code>。<br>它就像操场跑圈，括号里用分号隔开了三件必做的事。<br>注意看第一项：<b>为什么这里会有个 int？</b>", 
        codeFile: "codes/lesson-06/for-loop.cpp", 
        snippet: "main", 
        annotations: [ 
          { line: 6, title: "int i = 1;", desc: "起跑线：在这里临时创建一个叫 i 的变量作为“计步器”，从 1 开始" }, 
          { line: 7, title: "i <= 5;", desc: "终点线：每次跑之前都要问，i 超过 5 了吗？没超过就继续跑" }, 
          { line: 8, title: "i = i + 1", desc: "步长：每跑完一圈，让 i 自己加 1（也就是把 1 变成 2，2 变成 3）" }, 
          { line: 9, title: "cout << i;", desc: "循环体：每圈真正要干的活（在这里是输出 i）" } 
        ], 
        output: "1 2 3 4 5", 
        extra: {
          title: "💡 灵魂拷问：如果不写 int 会怎样？",
          desc: `<div><b>情况 1：直接不写 int（前面也没定义）</b><br><code>for (i = 1; i &lt;= 5; i = i + 1)</code><br>编译器直接报错：<code>'i' was not declared in this scope</code>（我不认识 i）。因为计算机不知道你要把 1 存到哪里去。</div><div><b>情况 2：在 for 外面先写 int，里面不写</b><br><code>int i;</code><br><code>for (i = 1; i &lt;= 5; i = i + 1)</code><br>这样<b>可以运行</b>。但缺点是：循环结束后，i 会变成 6 继续留在内存里，如果后面还有别的代码用到 i，就会发生灾难。</div><div><b>情况 3：标准的现代写法</b><br><code>for (int i = 1; i &lt;= 5; i = i + 1)</code><br>把变量直接声明在括号里。好处是：<b>循环一结束，i 就自动销毁了</b>，不占内存，也不会干扰后续代码。这叫“局部变量”。</div>`,
          variant: "card-primary"
        },
        footer: '<b>📌 避坑</b>：<code>int i = 1</code> 后面跟着的是<b>分号</b>，不是逗号！这三项之间必须用分号隔开。<br>另外，i 是 index（索引）的缩写，这是全世界的程序员都在用的习惯。' 
      }
    },

    /* ===== 7 for 循环执行轨迹（动画） ===== */
    {
      id: 7, type: "evolution", title: "眼见为实：for 的执行轨迹", subtitle: "变量 i 是怎么变的？", chapterTag: "第 6 讲 · 过程演示",
      data: { 
        intro: "📖 循环最难理解的是“代码往回跳”。看右侧，i 每次是怎么变化的。<br>注意：初始化（第 6 行）<b>永远只执行一次</b>。", 
        codeFile: "codes/lesson-06/for-loop.cpp", 
        snippet: "main", 
        steps: [ 
          { focusLines: [6], expression: "i = 1", note: "初始化：发计步器，i 设为 1。<br>这一步<b>整个循环只做一次</b>。" }, 
          { focusLines: [7], expression: "1 <= 5", note: "第一次判断：<code>1 <= 5</code> 成立。进入循环。" }, 
          { focusLines: [9], expression: "输出 1", note: "执行循环体：输出当前的 i（也就是 1）。" }, 
          { focusLines: [8], expression: "i++", note: "步长更新：一圈跑完，计步器 i 增加 1，变成 2。" }, 
          { focusLines: [7], expression: "2 <= 5", note: "第二次判断：<b>代码跳回第 7 行！</b><br><code>2 <= 5</code> 成立，继续循环。" }, 
          { focusLines: [8], expression: "...", note: "一直重复（输出、自增、判断），直到 i 变成 6。" },
          { focusLines: [7], expression: "6 <= 5 (假)", note: "最后一次判断：<code>6 <= 5</code> 不成立。<br>循环彻底结束。" }
        ] 
      }
    },

    /* ===== 8 坑王之王：i++ 与 ++i ===== */
    {
      id: 8, type: "code-walkthrough", title: "进阶与偷懒：i++ 与 ++i", subtitle: "谁是先加，谁是后用？", chapterTag: "第 6 讲 · 概念理解",
      data: {
        intro: "📖 刚才在循环里，我们写的是 <code>i = i + 1</code>。但程序员都很懒，为了少敲几个字，C++ 提供了<b>自增运算符</b> <code>i++</code>。<br>单独写一行 <code>i++;</code> 完全没问题，它就是 <code>i = i + 1</code> 的意思。<br>但如果把它和赋值放在一起，灾难就来了。看这段代码：",
        codeFile: "codes/lesson-06/increment-demo.cpp", 
        snippet: "main",
        steps: [
          { 
            title: "初始状态", 
            line: 6, 
            vars: { i: "5", j: "5", a: "未定义", b: "未定义" }, 
            note: "我们准备了两个变量 i 和 j，都是 5。<br>接下来要把它们自增，并赋值给 a 和 b。" 
          },
          { 
            title: "后置：先使用，后加 1", 
            line: 7, 
            vars: { i: "6", j: "5", a: "5", b: "未定义" }, 
            note: "<code>a = i++;</code><br>因为是后置（加号在后面），程序先把 i <b>原本的值（5）</b>赋给了 a。<br>然后 i 自己才偷偷加 1，变成了 6。<br><b>所以 a 是 5，i 是 6。</b>" 
          },
          { 
            title: "前置：先加 1，后使用", 
            line: 8, 
            vars: { i: "6", j: "6", a: "5", b: "6" }, 
            note: "<code>b = ++j;</code><br>因为是前置（加号在前面），j <b>先</b>自己加 1 变成了 6。<br>然后把新的值（6）赋给了 b。<br><b>所以 b 是 6，j 是 6。</b>" 
          },
          { 
            title: "运行验证", 
            line: 9, 
            vars: { i: "6", j: "6", a: "5", b: "6" }, 
            note: "通过 <code>cout</code> 打印出来，证实了我们的推演。<br>这就是自增运算符最反直觉的地方！" 
          }
        ],
        extra: {
          title: "⚠️ 初赛警告：未定义行为",
          desc: "千万不要在同一个表达式中，多次对同一个变量使用自增！<br>比如：<code>a = i++ + ++i;</code><br>这在 C++ 标准中属于<b>未定义行为（UB）</b>。不同的编译器（甚至同一个编译器的不同版本）算出来的结果可能完全不同。初赛遇到这种题，通常要么是坑，要么是错题。",
          variant: "card-primary"
        },
        footer: '<b>📌 记忆口诀</b>：<br><code>i++</code>（加号在后）是“先交旧朋友，再认识新朋友”。<br><code>++i</code>（加号在前）是“先认识新朋友，再交出去”。'
      }
    },

    /* ===== 9 练习1：1~n求和 ===== */
    {
      id: 9, type: "level-map", title: "课堂练习1：1~n求和", subtitle: "循环的第一个经典应用", chapterTag: "第 6 讲 · 实战演练",
      data: { question: { title: "题干", desc: "输入一个整数 <code>n</code>，输出 1 + 2 + 3 + ... + n 的结果。<br>输入样例：<code>100</code>　输出样例：<code>5050</code>", timer: "⏱ 限时 5 分钟" }, hints: ["需要一个变量 <code>sum</code> 来存累加结果，初始为 0", "在循环里写 <code>sum = sum + i</code>", "输出最后的 <code>sum</code>"], answer: { codeFile: "codes/lesson-06/sum.cpp", snippet: "main" }, analysis: { title: "📖 解析", desc: "这叫“累加器”模型。<br>一定要把 <code>sum</code> 初始化为 0。如果不初始化，它会包含一个随机的垃圾值。" } }
    },

    /* ===== 10 while 循环 ===== */
    {
      id: 10, type: "code-split", title: "while 循环 · 条件循环", subtitle: "不到黄河心不死",
      data: { 
        intro: "📖 刚才的 <code>for</code> 循环很好用，但它的前提是：<b>我们必须提前知道要跑几圈</b>。<br>如果程序根本不知道你要输入几个数呢？比如：一直读入数据，直到用户输入 0 为止。<br>这时候 <code>for</code> 循环就写不出来了，我们需要 <code>while</code> 循环。", 
        codeFile: "codes/lesson-06/while-loop.cpp", 
        snippet: "main", 
        annotations: [ 
          { line: 6, title: "int x;", desc: "先准备一个变量，用来接收数据" }, 
          { line: 7, title: "cin >> x;", desc: "读入第一个数，作为“投石问路”" }, 
          { line: 8, title: "while (x != 0)", desc: "核心：只要读入的数不是 0，就一直循环" }, 
          { line: 10, title: "cin >> x;", desc: "循环的最后，再读入下一个数。如果读了 0，下次判断就会失败，退出循环。" } 
        ], 
        output: "（输入：3 5 2 0）\n3 5 2", 
        extra: { desc: '<b>📌 与 for 的终极区别</b>：<code>for</code> 适合<b>已知次数</b>（如跑 100 圈）；<code>while</code> 适合<b>未知次数，条件触发</b>（如不知道要输入多少个数，直到输入 0）。', variant: 'flat' } 
      }
    },

    /* ===== 11 for vs while ===== */
    {
      id: 11, type: "compare", title: "for vs while", subtitle: "什么时候用谁？",
      data: { neutral: true, splitStep: true, groups: [ { leftLabel: "for 循环", rightLabel: "while 循环", wrong: "<b>明确次数</b>", right: "<b>未知次数，条件触发</b>" }, { leftLabel: "场景", rightLabel: "场景", wrong: "跑 100 圈<br>遍历数组", right: "输入直到 0 为止<br>直到密码正确" }, { leftLabel: "习惯", rightLabel: "习惯", wrong: "将三要素写在括号里，紧凑清晰。", right: "变量定义在外面，忘了更新步长就会死循环。" } ], extra: { desc: '<b>📌 建议</b>：初学阶段，能用 <code>for</code> 写就尽量用 <code>for</code>，不容易漏写条件导致死循环。', variant: 'flat' } }
    },

    /* ===== 12 冲突：死循环急救与浮点陷阱 ===== */
    {
      id: 12, type: "pitfall", title: "机房急救：死循环", subtitle: "程序卡死了怎么办？", chapterTag: "第 6 讲 · 概念理解",
      data: {
        cases: [
          { icon: "💣", scene: "黑窗口里疯狂刷屏，按什么都没反应", what: "写出了死循环。比如 <code>while (1)</code> 里面忘记写 <code>break;</code>", why: "条件永远为真，程序在里面疯狂转圈，出不来。", fix: "立刻按 <kbd>Ctrl + C</kbd> 强行掐断程序！" },
          { icon: "🪤", scene: "洛谷经典陷阱：浮点数死循环", what: "循环条件用了浮点数判断", why: "<code>for(double i=0; i!=1; i+=0.1)</code><br>因为小数精度不精确，i 可能永远不等于 1，导致死循环！", fix: "<b>绝对不要</b>用浮点数做循环的等号条件（!=）。" }
        ],
        extra: { desc: '<b>📌 救命绝招</b>：写 <code>while</code> 循环，先写里面的变量更新（如 <code>i++</code>），再写其他逻辑，防止自己忘了。', variant: 'flat' }
      }
    },

    /* ===== 13 break 与 continue ===== */
    {
      id: 13, type: "code-split", title: "break 与 continue", subtitle: "紧急刹车与跳过本轮",
      data: { 
        intro: "📖 在循环中，遇到特殊情况想提前干预？<br>比如你在 10 个抽屉里找钥匙，<b>找到就立刻停手</b>，这叫 <code>break</code>；<br>老师点名发奖品，<b>遇到没来的人直接跳过</b>，给下一个人发，这叫 <code>continue</code>。<br>它们都是循环里的「交通信号灯」：", 
        codeFile: "codes/lesson-06/break-continue.cpp", 
        snippet: "main", 
        annotations: [ 
          { line: 8, title: "if (i == 3) break;", desc: "紧急刹车：一旦满足条件，整个循环直接毁灭，剩下的圈都不跑了" }, 
          { line: 15, title: "if (i == 3) continue;", desc: "跳过本轮：满足条件时，本轮后面的代码不执行了，直接跑下一圈" } 
        ], 
        output: "1 2\n---\n1 2 4 5", 
        extra: { desc: '<b>📌 场景总结</b>：<code>break</code> 常用于“找到了/触发了警报就立刻停止”；<code>continue</code> 常用于“过滤掉不需要的无效数据，继续处理剩下的”。', variant: 'flat' } 
      }
    },

    /* ===== 14 练习2：筛选数字 ===== */
    {
      id: 14, type: "level-map", title: "课堂练习2：筛选数字", subtitle: "专练 break 与 continue", chapterTag: "第 6 讲 · 实战演练",
      data: { 
        question: { title: "题干", desc: "输出 1 到 10 之间的整数，但是：<br>① 遇到 3 的倍数就跳过（不输出）。<br>② 一旦遇到 9，直接停止输出。<br>输出样例：<code>1 2 4 5 7 8</code>", timer: "⏱ 限时 6 分钟" }, 
        hints: ["用 <code>for (int i = 1; i <= 10; i++)</code> 遍历", "“3的倍数跳过” 用 <code>if (i % 3 == 0) continue;</code>", "“遇到 9 停止” 用 <code>if (i == 9) break;</code>", "注意这两个 if 的先后顺序"], 
        answer: { codeFile: "codes/lesson-06/filter-numbers.cpp", snippet: "main" }, 
        analysis: { title: "📖 解析", desc: "当 i 是 3、6 时，被 continue 跳过；当 i 是 9 时，被 break 强行终止。<br>这道题完美考察了两种控制流的区别。" } 
      }
    },

    /* ===== 15 练习3：数位分离 ===== */
    {
      id: 15, type: "level-map", title: "课堂练习3：数位分离", subtitle: "洛谷经典模型（回文数基础）", chapterTag: "第 6 讲 · 实战演练",
      data: { 
        question: { title: "题干", desc: "输入一个正整数 <code>n</code>，请<b>倒序</b>输出它的每一位数字。<br>输入样例：<code>12345</code>　输出样例：<code>54321</code>", timer: "⏱ 限时 8 分钟" }, 
        hints: ["用 <code>% 10</code> 可以提取出个位数字", "用 <code>/ 10</code> 可以把个位砍掉", "因为不知道有几位数，所以用 <code>while (n > 0)</code> 循环", "每次提出个位后，别忘了 <code>n = n / 10;</code>"], 
        answer: { codeFile: "codes/lesson-06/digit-separation.cpp", snippet: "main" }, 
        analysis: { title: "📖 解析", desc: "这是算法竞赛中极其常用的基础模型！<br>提取个位：<code>n % 10</code><br>砍掉个位：<code>n / 10</code><br>回文数、数位求和、反转数字等题目，全都是这个套路。" } 
      }
    },

    /* ===== 16 嵌套循环 ===== */
    {
      id: 16, type: "evolution", title: "嵌套循环：时钟是怎么走的", subtitle: "外圈走一格，内圈跑一圈", chapterTag: "第 6 讲 · 过程演示",
      data: { 
        intro: "📖 嵌套循环最难理解的是执行顺序。<br>我们把这个过程想象成一个钟表：外层的 <code>h</code> 是时针，内层的 <code>m</code> 是分针。看右侧代码是怎么一步步“长”出来的：", 
        codeFile: "codes/lesson-06/clock-demo.cpp", 
        snippet: "main", 
        steps: [
          { 
            title: "1. 只有时针（单层循环）", 
            hiddenLines: [8, 9, 10], 
            placeholder: "        // 假设这里没有分针",
            focusLines: [6, 7, 11], 
            expression: "h = 1, h = 2", 
            note: "如果只有外层，程序会打印出当前的小时：<br><b>1点<br>2点</b><br>每走完一步，内层没有，直接换行。" 
          },
          { 
            title: "2. 塞入分针（长出来了！）", 
            hiddenLines: [],
            focusLines: [8, 9], 
            expression: "h = 1, m = 1,2,3", 
            note: "现在把内层循环塞进去。<br>当外层 <code>h=1</code> 时，内层 <code>m</code> 开始发力，连续打印：<br><b>1点 1分 2分 3分</b>" 
          },
          { 
            title: "3. 分针跑完，换行", 
            hiddenLines: [],
            focusLines: [11], 
            expression: "内层结束，执行 endl", 
            note: "内层 <code>m=3</code> 打印完后，内层循环结束。<br>此时程序执行第 11 行：<code>cout << endl;</code>，打出一个回车。" 
          },
          { 
            title: "4. 时针前进，分针归位", 
            hiddenLines: [],
            focusLines: [6, 8], 
            expression: "h = 2, m 重新从 1 开始", 
            note: "外层 <code>h</code> 变成 2。注意！内层的 <code>m</code> 会<b>重新从 1 开始</b>，再完整跑一圈。<br><br>最终屏幕上打出完整结果：<br><div style='background:#1e2a44; color:#e6f1ff; padding:10px 14px; border-radius:6px; font-family:var(--font-code); margin-top:8px; font-size:15px; line-height:1.5;'>1点 1分 2分 3分<br>2点 1分 2分 3分</div>" 
          }
        ],
        extra: {
          title: "💡 终极口诀",
          desc: "<b>外层动一次，内层跑全圈。</b><br>内层没有跑完，外层绝对不准动。<br>这就是嵌套循环的底层逻辑。",
          variant: "card-primary"
        }
      }
    },

    /* ===== 17 练习4：质数判断 ===== */
    {
      id: 17, type: "level-map", title: "课堂练习4：判断质数", subtitle: "综合运用循环与 break", chapterTag: "第 6 讲 · 实战演练",
      data: { 
        question: { title: "题干", desc: "输入一个整数 <code>n (n >= 2)</code>，如果是质数输出 <code>yes</code>，否则输出 <code>no</code>。<br>（质数：只能被 1 和它本身整除的数）", timer: "⏱ 限时 8 分钟" }, 
        hints: ["如果 n 能被 2 到 n-1 之间的任何一个数整除，它就不是质数", "用 <code>for (int i = 2; i < n; i++)</code> 挨个试", "如果发现 <code>n % i == 0</code>，直接 <code>break;</code> 退学（不是质数了）", "最后用 <code>if (i == n)</code> 判断是怎么退出的"], 
        answer: { codeFile: "codes/lesson-06/prime-check.cpp", snippet: "main" }, 
        analysis: { title: "📖 解析", desc: "这道题完美结合了 <code>for</code> 循环和 <code>break</code>。<br>如果一个数能被中间任何数整除，循环就会提前 <code>break</code>。如果一直没被整除，循环会正常结束，此时 <code>i</code> 刚好等于 <code>n</code>。" } 
      }
    },

    /* ===== 18 初赛渗透 ===== */
    {
      id: 18, type: "grid", title: "初赛小知识：循环与执行次数", subtitle: "CSP-J/S 初赛必考", chapterTag: "第 6 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "🔁", title: "单循环次数", desc: "<code>for (i=1; i<=n; i++)</code><br>执行 <b>n</b> 次。<br><code>for (i=1; i<n; i++)</code><br>执行 <b>n-1</b> 次。" },
          { icon: "📦", title: "嵌套循环次数", desc: "外层跑 <code>n</code> 次，内层跑 <code>m</code> 次。<br>总次数 = <b>n × m</b>。<br>如果是 <code>for (j=1; j<=i; j++)</code>，总次数是 1+2+...+n。" },
          { icon: "⚡", title: "break vs continue", desc: "<code>break</code> 结束整个循环。<br><code>continue</code> 只结束当前这一轮，进入下一轮。<br><b>常考：最后输出的结果是什么？</b>" }
        ],
        extra: { desc: '<b>📌 怎么考？</b><br>给一段循环代码，问你循环体执行了几次，或者最后的变量值是多少。<b>画表法是最稳妥的解法。</b>', variant: 'flat' }
      }
    },

    /* ===== 19 课堂小测 ===== */
    {
      id: 19, type: "quiz", title: "课堂小测", subtitle: "循环结构", chapterTag: "第 6 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 循环", optionLayout: "horizontal", question: "循环 <code>for (int i = 1; i <= 10; i++)</code> 的循环体执行了多少次？", options: [ { label: "A", text: "9" }, { label: "B", text: "10", correct: true }, { label: "C", text: "11" }, { label: "D", text: "死循环" } ], analysis: "从 1 开始，包含 10，每次加 1。共 <b>10</b> 次。" },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 执行轨迹", optionLayout: "vertical", question: "下面代码的输出是？", questionCode: "int sum = 0;\nfor (int i = 1; i <= 3; i++)\n    for (int j = 1; j <= 3; j++)\n        sum++;\ncout << sum;", options: [ { label: "A", text: "3" }, { label: "B", text: "6" }, { label: "C", text: "9", correct: true }, { label: "D", text: "12" } ], analysis: "双重循环，外层执行 3 次，内层每次执行 3 次。<br>总执行次数 = 3 × 3 = <b>9</b> 次。<br>每次 sum 加 1，所以最后 sum 是 9。" },
          { id: 3, type: "single", difficulty: 3, source: "2021 CSP-J 初赛 · 第 12 题", optionLayout: "horizontal", question: "下面哪个循环是<b>死循环</b>？", options: [ { label: "A", text: "for(i=1; i<=10; i++)" }, { label: "B", text: "while(1) {...}" , correct: true }, { label: "C", text: "for(i=10; i>=1; i--)" }, { label: "D", text: "while(x != 0) { cin >> x; }" } ], analysis: "<code>while(1)</code> 的条件永远是 1（真），如果没有 <code>break</code>，就会永远循环下去。" },
          { id: 4, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第三章", optionLayout: "two-cols", question: "在循环中，<code>break</code> 可以跳出当前所在的这一层循环。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: "<code>break</code> 的作用是跳出<b>最近的一层</b>循环或 switch。<br>如果是嵌套循环，它只能跳出内层，不能直接跳出外层。" },
          { id: 5, type: "judge", difficulty: 3, source: "CSP-J 初赛真题练习 · 循环边界", optionLayout: "two-cols", question: "如果写成 <code>for (int i = 0; i <= n; i++)</code>，循环体一共执行了 <code>n</code> 次。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: "从 0 开始到 n（包含 n），一共执行了 <b>n + 1</b> 次。<br>初学者最容易把左闭右开还是左闭右闭搞混。" },
        ],
      },
    },    
    
    /* ===== 20 总结：程序的三大基本结构 ===== */
    {
      id: 20, type: "grid", title: "宏观视角：程序的三大基本结构", subtitle: "你已经学完了编程的全部底层逻辑", chapterTag: "第 6 讲 · 复习",
      data: {
        cards: [
          { 
            icon: "📜", 
            title: "1. 顺序结构", 
            desc: "<b>像流水账，从上到下</b><br>代码按书写顺序一行行执行。<br><br><b>核心语法</b>：<br><code>语句1;</code><br><code>语句2;</code>" 
          },
          { 
            icon: "🔀", 
            title: "2. 分支结构", 
            desc: "<b>像十字路口，做选择</b><br>根据条件的真假，选择走哪条路。<br><br><b>核心语法</b>：<br><code>if (条件) { ... }</code><br><code>switch (变量) { ... }</code>" 
          },
          { 
            icon: "🔁", 
            title: "3. 循环结构", 
            desc: "<b>像操场跑圈，重复劳动</b><br>只要条件满足，代码就一圈圈跑。<br><br><b>核心语法</b>：<br><code>for (初值; 条件; 步长) { ... }</code><br><code>while (条件) { ... }</code>" 
          },
        ],
        extra: {
          title: "🌟 为什么说这是“全部”？",
          desc: "计算机科学家证明了：<b>全世界所有的复杂程序（包括操作系统、3A 游戏、AI 模型），底层都只由这三种结构组合而成。</b><br><br>从此以后，你看到任何复杂需求，只需要在脑海里拆解：<br>哪里需要<b>顺序</b>？哪里需要<b>判断</b>？哪里需要<b>循环</b>？<br>这就叫<b>算法思维</b>。",
          variant: "card-glow"
        },
        footer: "📌 <b>阶段小结</b>：到这里，你已经掌握了 C++ 的“骨架”。从下一讲开始，我们将引入“数组”，让程序拥有处理海量数据的肌肉！"
      }
    },

    /* ===== 21 今日总结 ===== */
    {
      id: 21, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: { text: "让电脑替我们做无聊的重复劳动。", author: "—— 循环结构第一课", points: [ "for 适合已知次数的循环", "while 适合未知次数、条件触发的循环", "i++ 先使用后加一，++i 先加一后使用", "break 毁灭整个循环，continue 跳过本轮", "数位分离：n % 10 和 n / 10", "警惕死循环，Ctrl+C 强杀" ], highlight: { title: "📌 关键口诀", desc: "for 循环三要素：初值、条件、步长；while 循环防死锁，变量更新不能忘；嵌套外一内跑全；break 退学 continue 请假。" } }
    },

    /* ===== 22 课后作业 ===== */
    {
      id: 22, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: { 
        cards: [ 
          { icon: "🟢", title: "基础 1 · P5722", link: "https://www.luogu.com.cn/problem/P5722", desc: "<b>数列求和</b><br>考察：for 循环累加<br>难度：★" }, 
          { icon: "🟢", title: "基础 2 · P5721", link: "https://www.luogu.com.cn/problem/P5721", desc: "<b>数字直角三角形</b><br>考察：嵌套循环<br>难度：★★" }, 
          { icon: "🔴", title: "挑战 · P5727", link: "https://www.luogu.com.cn/problem/P5727", desc: "<b>冰雹猜想</b><br>考察：while 循环<br>难度：★★" } 
        ] 
      }
    },

    /* ===== 23 下节预告 ===== */
    {
      id: 23, type: "radial", title: "下节预告", subtitle: "第 7 讲 · 一维数组",
      data: { center: "数组", items: [ { text: "批量存数据" }, { text: "下标与遍历" }, { text: "数组越界" }, { text: "最值问题" } ] }
    },

    /* ===== 24 结束页 ===== */
    {
      id: 24, type: "ending", title: "第六讲结束", subtitle: "你的程序，从此拥有了无穷的力量", chapterTag: false,
      data: { slogan: "科学教育 · 创新课程", extra: { title: "🌟 什么是真正的“计算”", desc: "今天，你只学了 4 行代码（for 循环），就能让电脑一秒算完 1 亿次加法。<br>这就是为什么计算机叫“电脑”——它是真正的重复劳动终结者。<br><br>但在编程世界里，如果存 1 个数据用变量，那存 100 个数据呢？<br>下一讲，我们将学习把数据排成一排的魔法——<b>数组</b>。", variant: "card-glow" } }
    },
  ],
};
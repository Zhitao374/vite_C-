export default {
  title: "第 5 讲 循环结构",
  subtitle: "让程序学会重复",
  total: 28,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1,
      type: "cover",
      title: "循环结构",
      subtitle: "让程序学会重复",
      chapterTag: false,
      data: {
        accentWord: "循环",
        meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 5 讲"],
      },
    },

    /* ===== 2 上节回顾 ===== */
    {
      id: 2,
      type: "timeline",
      variant: "review",
      title: "上节课回顾",
      subtitle: "运算符与分支，让程序学会判断",
      data: {
        items: [
          {
            icon: "➕",
            badge: "运算符",
            title: "四类运算符",
            desc: "算术、赋值、关系、逻辑",
            points: ["+ - * / %", "= += -=", "> < == !=", "&& || !"],
          },
          {
            icon: "🔀",
            badge: "分支",
            title: "if 家族",
            desc: "单分支、双分支、多分支",
            points: ["if (条件)", "if-else", "else if 多路"],
          },
          {
            icon: "🔢",
            badge: "进阶",
            title: "switch 语句",
            desc: "多分支的另一种写法",
            points: ["switch (变量)", "case 常量", "break 跳出"],
          },
          {
            icon: "⚠️",
            badge: "易错",
            title: "常见错误",
            desc: "= 和 ==、优先级、break",
            points: ["= 不是 ==", "括号不能漏", "别忘 break"],
          },
        ],
      },
    },

    /* ===== 3 本节课目标 ===== */
    /* ===== 3 本节目标（图文视觉版） ===== */
    {
      id: 3, type: "split",
      title: "本节课目标",
      subtitle: "赋予程序“重复”的超能力",
      data: {
        panes: [
          {
            // 如果你有齿轮或莫比乌斯环的图片，取消下面两行的注释并填入路径：
            // image: "static/images/concepts/loop-gear.png",
            // imageCaption: "循环 = 自动化重复",
            
            // 如果没有图片，用这个超帅的纯 CSS 动效占位
            title: "无限循环",
            icon: "♾️",
            items: [
              { title: "无休止的重复", desc: "这是计算机最擅长、人类最讨厌的事。" }
            ]
          },
          {
            title: "四大挑战",
            items: [
              { title: "01. 告别复制粘贴", desc: "用 <code>while</code> 和 <code>for</code> 自动重复一万次。" },
              { title: "02. 一秒算完加法", desc: "让电脑瞬间算出 1 加到 100 的和。" },
              { title: "03. 画出复杂图案", desc: "用<code>循环嵌套</code>打印金字塔和九九表。" },
              { title: "04. 精准掌控流程", desc: "用 <code>break</code> 和 <code>continue</code> 随时叫停。" }
            ]
          }
        ],
        footer: '<b>📌 有了循环，程序才真正拥有了“大规模处理”的能力。</b>'
      }
    },

    /* ===== 4 为什么需要循环 ===== */
    {
      id: 4,
      type: "origin",
      title: '为什么要循环？',
      subtitle: '让程序自动重复做事',
      chapterTag: '第 5 讲 · 概念理解',
      data: {
        problem: {
          title: '要计算 1 加到 100，难道写 100 行加法？',
          points: [
            '手动复制粘贴 100 次 <code>cout</code> —— <b>代码长、容易错</b>',
            '如果算 1 加到 10000 呢？—— <b>根本写不完</b>',
            '程序不能这样"笨"—— 需要新工具'
          ]
        },
        evolution: [
          {
            icon: '📋',
            era: '原始',
            title: '复制粘贴',
            desc: '每一行都手写 —— <b>100 行代码 = 100 次重复</b>'
          },
          {
            icon: '🔁',
            era: '工具',
            title: '循环',
            desc: '写一次 + 让计算机重复 —— <b>3 行搞定 100 次</b>'
          },
          {
            icon: '🚀',
            era: '能力',
            title: '批量处理',
            desc: '程序从此能处理海量数据 —— <b>一秒千万次</b>'
          }
        ],
        summary: {
          title: '循环 = 计算机的超能力',
          desc: '人类做重复工作会累，<b>计算机不会</b>。<br>人类每秒最多做 10 次计算，<b>计算机每秒能做上亿次</b>。<br><br>学会循环，就能把重复工作交给计算机——<br>这就是程序能处理海量数据的根本原因。',
          code: '// 不用循环（100 行）\ncout << 1; cout << 2; ... cout << 100;\n\n// 用循环（3 行）\nfor (int i = 1; i <= 100; i++)\n    cout << i;'
        },
        extra: {
          title: '📖 知识扩展 · 循环 vs 复制粘贴',
          desc: '如果没有循环，想打印 1 到 100 就要写 100 行 <code>cout</code>。<br>有了循环，<b>3 行代码就够了</b>。<br><br>循环是程序员最强大的工具之一。<br><b>计算机每秒能执行上亿次循环</b>，这是人类做不到的。<br><br>学会循环，就能把重复工作交给计算机。<br>程序从此不再是"一条条指令"，而是"批量生产"的工厂。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 5 while 循环 i 怎么变 ===== */
    {
      id: 5,
      type: "evolution",
      title: "while 循环：i 一步步长大",
      subtitle: "循环三要素：初始、条件、更新",
      chapterTag: "第 5 讲 · 过程演示",
      data: {
        intro:
          '📖 循环最难理解的是"<b>每次循环，i 都在变</b>"。<br>看 i 怎么从 1 慢慢走到 10，输出序列怎么一步步变长。',
        codeFile: "codes/lesson-05/while-loop.cpp",
        snippet: "main",
        steps: [
          {
            focusLines: [6],
            expression: "i = 1",
            note: '① <b>初始值</b>：循环开始前，i 设为 1。<br>这就是循环的"起点"。',
          },
          {
            focusLines: [7],
            expression: "i = 1<br>条件 i &lt;= 10 ? <b>✅ 真</b><br>输出：1",
            note: "② <b>循环条件</b>：i = 1 ≤ 10，为真，进入循环体。<br>③ 执行 <code>cout &lt;&lt; i</code>：输出 <b>1</b>。",
          },
          {
            focusLines: [9],
            expression: "i = 1<br>输出：1<br>→ i++ 后 i = 2",
            note: "④ <b>更新 i</b>：<code>i++</code> 让 i 从 1 变成 2。<br>然后回到条件判断。",
          },
          {
            focusLines: [7],
            expression: "i = 2<br>条件 i &lt;= 10 ? <b>✅ 真</b><br>输出：1 2",
            note: "i = 2 ≤ 10，继续循环。<br>输出 <b>2</b>，序列变成 <code>1 2</code>。",
          },
          {
            focusLines: [8],
            expression:
              "i = 3 → 4 → ... → 10<br>每次都输出<br>输出：1 2 3 4 5 6 7 8 9 10",
            note: "i 继续从 3 变到 10，每次输出当前 i。<br>序列慢慢变长：<code>1 2 3 4 5 6 7 8 9 10</code>。",
          },
          {
            focusLines: [7],
            expression:
              "i = 11<br>条件 i &lt;= 10 ? <b>❌ 假</b><br>→ 跳出循环",
            note: '🎯 <b>关键拐点</b>：<br>i 更新到 11，<code>11 &lt;= 10</code> 为假，<b>循环结束</b>。<br>这就是"条件决定何时停"。',
          },
          {
            focusLines: [11],
            expression: "输出结果：1 2 3 4 5 6 7 8 9 10",
            note: "✅ 最终输出：<code>1 2 3 4 5 6 7 8 9 10</code>。<br><br><b>循环三要素回顾</b>：<br>① 初始值 <code>i = 1</code><br>② 条件 <code>i &lt;= 10</code><br>③ 更新 <code>i++</code><br>缺一不可——忘了 i++ 就死循环。",
          },
        ],
        extra: {
          title: "💡 三要素缺一不可",
          desc: '<b>忘了初始值</b>：i 是"垃圾值"，循环从哪开始不确定。<br><b>忘了条件</b>：<code>while (true)</code> 会无限循环。<br><b>忘了更新</b>：i 永远是 1，条件永远为真，<b>死循环</b>。<br><br><b>常见错误</b>：<br><code>while (i &lt;= 10) { cout &lt;&lt; i; }</code><br>忘写 i++，程序会卡死。<br>竞赛里这叫 <b>TLE</b>（超时）。<br><br>📖 <b>提前剧透</b>：同样的循环，用 for 写更紧凑——<br><code>for (int i = 1; i &lt;= 10; i++) cout &lt;&lt; i;</code><br>一行搞定三要素。<br>下一屏我们看 for 的写法。<br><br>🔮 <b>伏笔</b>：为什么死循环会"超时"？因为 CPU 一直在跑，时间耗光了。<br>第 36 讲"复杂度"会讲"程序跑多久"。',
          variant: "card-primary",
        },
      },
    },

    /* ===== 6 for 循环 ===== */
    {
      id: 6,
      type: "code-split",
      title: "for 循环 · 三要素写在一行",
      subtitle: "最常用、最紧凑的循环",
      data: {
        intro:
          "📖 <b>语法</b>：<code>for (初始; 条件; 更新) { 循环体 }</code>。<br>三要素用<b>分号</b>分隔，写在同一行。",
        codeFile: "codes/lesson-05/for-loop.cpp",
        snippet: "main",
        annotations: [
          {
            line: 6,
            title: "for (三要素)",
            desc: "初始、条件、更新写在同一行",
          },
          { line: 6, title: "分号分隔", desc: "三部分用分号分隔，不是逗号" },
          { line: 6, title: "i++", desc: "每次循环 i 加 1" },
          { line: 7, title: "cout", desc: "循环体输出当前 i" },
        ],
        output: "1 2 3 4 5 6 7 8 9 10",
        footer: '<b>💡 for 的三个细节</b><br>① <b>变量作用域</b>：<code>for (int i = 0; ...)</code> 里的 i 只在循环内有效<br>② <b>空条件</b>：<code>for (;;)</code> 是死循环<br>③ <b>任意更新</b>：<code>i += 2</code> 也行（输出所有偶数）<br><br><b>竞赛惯例</b>：计数循环优先用 for——<b>三要素集中，一目了然</b>。'
      },
    },

    /* ===== 7 while vs for ===== */
    {
      id: 7,
      type: "compare",
      title: "while vs for",
      subtitle: "什么时候用哪个",
      data: {
        splitStep: true,
        neutral: true,
        leftLabel: 'for 循环',
        rightLabel: 'while 循环',
        arrow: 'vs',
        groups: [
          {
            wrong: '循环次数<b>已知</b>',
            right: '循环次数<b>未知</b>'
          },
          {
            wrong: '例：1 到 100 求和',
            right: '例：直到输入 0 才停止'
          },
          {
            wrong: '三要素集中，一目了然',
            right: '只关心条件，更灵活'
          },
          {
            wrong: '竞赛中的主力',
            right: '处理未知长度的输入'
          }
        ],
        footer: '<b>📌 口诀</b>：<b>次数已知用 for，次数未知用 while</b>。<br><br><b>📖 现代 C++ 范围 for</b>（C++11+）：<br><code>for (int x : arr) { ... }</code><br>自动遍历数组——不需要写下标。<br>这是"现代 C++"的写法——<b>等学数组时详细介绍</b>。<br><br>现在记住：<b>for 和 while 是基础，范围 for 是糖</b>。'
      }
    },

    /* ===== 8 for 循环答疑 ===== */
    {
      id: 8,
      type: "grid",
      title: 'for 循环的 4 个细节',
      subtitle: '答疑 & 常见疑问',
      chapterTag: '第 5 讲 · 概念理解',
      data: {
        cards: [
          {
            icon: '📦',
            title: '① for 里定义 i',
            desc: '可以在 for 里直接 <code>int i = 1</code><br><b>离开循环后 i 消失</b><br>这叫"变量的作用域"'
          },
          {
            icon: '🔄',
            title: '② i++ vs ++i',
            desc: '<b>单独用</b>：没区别，都是 +1<br><b>放进表达式</b>：<br><code>x = i++</code>：先赋值，后加 1<br><code>x = ++i</code>：先加 1，后赋值'
          },
          {
            icon: '⚡',
            title: '③ 用哪个？',
            desc: '<b>竞赛惯例</b>：用 <code>i++</code><br>历史原因：早期 C 语言教程约定<br>两者性能一样<br>选顺手的即可'
          },
          {
            icon: '🚫',
            title: '④ 空条件 = 死循环',
            desc: '<code>for (;;)</code> 是死循环<br>条件不写默认为真<br>竞赛中会触发 <b>TLE</b><br>（TLE = 超时）'
          }
        ],
        footer: '<b>📌 作用域的意义</b>：for 里定义的 i 只在循环内有效——循环外的代码访问 i 会报错"未定义"。<br>这防止了变量名的"污染"——同一个程序里可以有多个 for 循环，每个都有自己的 i。<br><br>🔮 <b>伏笔</b>：为什么死循环会"超时"？因为 CPU 一直在跑，时间耗光了。第 36 讲"复杂度"会讲"程序跑多久"。'
      }
    },

    /* ===== 9 练习1：求和 ===== */
    {
      id: 9,
      type: "level-map",
      title: "课堂练习1：求和",
      subtitle: "用循环计算 1 + 2 + ... + n",
      chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入一个正整数 <code>n</code>，计算 1 + 2 + ... + n 的和。<br>输入样例：<code>100</code>　输出样例：<code>5050</code>",
          timer: "⏱ 限时 6 分钟",
        },
        hints: [
          "用一个变量 <code>sum</code> 累加",
          "sum 初始化为 0",
          "循环变量 i 从 1 到 n",
        ],
        answer: { codeFile: "codes/lesson-05/sum.cpp" },
        analysis: {
          title: "📖 解析",
          desc: 'sum 就像一个<b>累加器</b>，每次循环把当前的 i 加进去。<br>初始 sum = 0，循环结束后 sum 就是 1+2+...+n。<br><br><b>为什么初始化为 0？</b><br>因为 0 加任何数都不变，是"加法的起点"。',
        },
        extra: {
          title: "📖 知识扩展 · 高斯的故事",
          desc: '200 多年前，数学家<a href="https://baike.baidu.com/item/高斯" target="_blank" class="wiki-link">高斯</a> 9 岁时，老师让算 1 加到 100。<br>其他孩子都在埋头苦算。小高斯发现 1+100 = 101，2+99 = 101……共 50 对，所以答案 = 50 × 101 = 5050。<br>这就是等差数列求和公式。<br><br><b>但计算机不用想捷径</b>——它直接循环 100 次，一样得出 5050。<br>计算机的优势不是聪明，而是<b>快</b>。<br><br><b>算法的价值</b>：<br>高斯的方法 1 步算出，O(1)；<br>循环的方法跑 100 步，O(n)。<br>数据越大，"聪明算法"越值钱。',
          variant: "card-primary",
        },
      },
    },

    /* ===== 10 练习2：阶乘 ===== */
    {
      id: 10,
      type: "level-map",
      title: "课堂练习2：阶乘",
      subtitle: "计算 n! = 1 × 2 × ... × n",
      chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入一个正整数 <code>n</code>，输出 n 的阶乘 <code>n!</code>。<br>输入样例：<code>5</code>　输出样例：<code>120</code>",
          timer: "⏱ 限时 6 分钟",
        },
        hints: [
          "用一个变量 <code>fact</code> 累乘",
          "fact 初始化为 1（不能是 0）",
          "循环变量 i 从 1 到 n",
          "n 可能会大，用 <code>long long</code>",
        ],
        answer: { codeFile: "codes/lesson-05/factorial.cpp" },
        analysis: {
          title: "📖 解析",
          desc: "累乘和累加思路一样，只是初始值不同。<br><b>累加</b>：初始 0，因为加 0 不影响。<br><b>累乘</b>：初始 1，因为乘 1 不影响。<br>如果 fact = 0，结果永远是 0。<br><br><b>为什么用 long long？</b><br>阶乘增长极快：13! 就超过 int 范围（21 亿）。<br>用 long long 能撑到 20!。<br><br><b>📈 阶乘的增长速度</b><br>· 5! = 120<br>· 10! = 362 万<br>· 13! = 62 亿（超过 int）<br>· 20! = 2.4 × 10¹⁸（long long 上限）<br>· 100! ≈ 9.3 × 10¹⁵⁷（天文数字）<br><br>n 很大时要用\"取模\"技巧——第 40 讲讲。",
        },
      },
    },

    /* ===== 11 过渡页 ===== */
    {
      id: 11,
      type: "transition",
      title: "第三站 · 循环进阶",
      subtitle: "嵌套、break、continue",
      data: {
        previous: "while 与 for 循环的基础语法",
        note: "接下来你将学会循环嵌套、break 与 continue，以及循环的实战应用"
      }
    },

    /* ===== 12 循环嵌套 ===== */
    {
      id: 12,
      type: "code-split",
      title: "循环嵌套 · 循环里还有循环",
      subtitle: "外层走一步，内层走完整圈",
      data: {
        intro:
          "📖 循环里再写一个循环，叫<b>嵌套循环</b>。<br>外层每走一步，内层走完整的一圈。",
        codeFile: "codes/lesson-05/nested-loop.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "外层循环 i", desc: "i 从 1 到 3，共 3 次" },
          { line: 7, title: "内层循环 j", desc: "j 从 1 到 4，共 4 次" },
          { line: 8, title: "循环体", desc: "输出 (i,j)" },
          { line: 10, title: "endl", desc: "内层结束后换行" },
        ],
        output: "(1,1) (1,2) (1,3) (1,4)\n(2,1) (2,2) (2,3) (2,4)\n(3,1) (3,2) (3,3) (3,4)",
        footer: '<b>💡 执行次数公式</b><br><b>总次数 = 外层次数 × 内层次数</b>（内层固定时）<br><br><b>例</b>：<br>· 两层 n 次 → n² 次<br>· 三层 n 次 → n³ 次<br>· 层数越深，增长越快<br><br><b>初赛必考</b>：数循环执行次数。<br>固定次数直接乘；可变次数要列公式求和。'
      },
    },

    /* ===== 13 九九乘法表 ===== */
    {
      id: 13,
      type: "code-split",
      title: "循环嵌套实例 · 九九乘法表",
      subtitle: "两个 for 画出三角形",
      data: {
        intro:
          "📖 内层循环的条件可以<b>依赖外层变量</b>——<br>比如 <code>j &lt;= i</code>，让内层每行越来越长。",
        codeFile: "codes/lesson-05/multiplication-table.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "外层 i", desc: "代表行号，从 1 到 9" },
          { line: 7, title: "内层 j", desc: "j 从 1 到 i，所以每行越来越长" },
          { line: 8, title: "输出", desc: "格式：j*i=结果" },
          { line: 10, title: "换行", desc: "每行结束后换行" },
        ],
        output: "1*1=1\n1*2=2 2*2=4\n1*3=3 2*3=6 3*3=9\n...",
      },
    },

    /* ===== 14 嵌套答疑 ===== */
    {
      id: 14,
      type: "grid",
      title: '循环嵌套 · 三种常见形态',
      subtitle: '外层走一步，内层走一圈',
      chapterTag: '第 5 讲 · 概念理解',
      data: {
        cards: [
          {
            icon: '🟦',
            title: '形态 1 · 矩形',
            desc: '外层 3 × 内层 4<br><b>内层固定次数</b><br>输出 3 行 4 列<br>总次数 = 3 × 4 = 12'
          },
          {
            icon: '🔺',
            title: '形态 2 · 三角形',
            desc: '内层 <code>j &lt;= i</code><br><b>内层次数随外层变化</b><br>总次数 = 1+2+...+n<br>如 n=9 → 45 次'
          },
          {
            icon: '🔻',
            title: '形态 3 · 倒三角',
            desc: '内层 <code>j &lt;= n - i + 1</code><br>每行越来越短<br>总次数同上（1+2+...+n）<br>常用于对称图案'
          }
        ],
        footer: '<b>📌 嵌套的本质</b>：处理"二维数据"—— 矩阵、棋盘、图案。<br>只要问题有"两层循环"的感觉，就用嵌套。<br><br><b>执行次数</b>：<br>· 内层次数<b>固定</b> → 外层 × 内层<br>· 内层次数<b>随外层变</b> → 逐层累加（如 1+2+...+n）<br><br><b>🏫 排队比喻</b>：外层 = 队伍，内层 = 队伍里的每个人。<br>换一支队伍（外层 +1），内层把每个人点一遍。'
      }
    },

    /* ===== 15 练习3：找最大值 ===== */
    {
      id: 15,
      type: "level-map",
      title: "课堂练习3：打印直角三角形",
      subtitle: "用嵌套循环画图案",
      chapterTag: "第 5 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入一个正整数 <code>n</code>，输出一个 <code>n</code> 行的直角三角形：<br>第 1 行 1 个 <code>*</code>，第 2 行 2 个，……，第 n 行 n 个。<br><br><b>输入样例</b>：<code>4</code><br><b>输出样例</b>：<br><code>*</code><br><code>**</code><br><code>***</code><br><code>****</code>",
          timer: "⏱ 限时 10 分钟",
        },
        hints: [
          "外层循环 i 控制行号（1 到 n）",
          "内层循环 j 控制每行的 <code>*</code> 数（1 到 i）",
          "内层循环结束后输出 <code>endl</code> 换行",
          "关键：内层循环的<b>上界是 i</b>，不是 n",
        ],
        answer: {
          codeFile: "codes/lesson-05/print_max.cpp",
        },
        analysis: {
          title: "📖 解析",
          desc: '关键点：<b>内层循环的上界是 <code>i</code>，不是 <code>n</code></b>。<br><br>· 第 1 行 i=1：内层循环 1 次 → 1 个 *<br>· 第 2 行 i=2：内层循环 2 次 → 2 个 *<br>· 第 3 行 i=3：内层循环 3 次 → 3 个 *<br>……<br><br>这种"内层次数随外层变化"的模式，是<b>图案打印的核心</b>。<br>改一个上界，就能画出各种图案。',
        },
        footer: '<b>💡 图案打印的三种模式</b><br>① <b>直角三角形</b>：内层 <code>j &lt;= i</code>（每行变长）<br>② <b>倒三角形</b>：内层 <code>j &lt;= n - i + 1</code>（每行变短）<br>③ <b>矩形</b>：内层 <code>j &lt;= m</code>（每行一样）<br><br><b>核心</b>：外层控制行，内层控制列。<br>改变内层的"上界"或"初始值"——就能画出不同图案。'
      },
    },

    /* ===== 16 break 与 continue ===== */
    {
      id: 16,
      type: "compare",
      title: "break 与 continue",
      subtitle: "跳出整圈 vs 跳过本次",
      data: {
        neutral: true,
        splitStep: true,
        leftLabel: 'break',
        rightLabel: 'continue',
        arrow: 'vs',
        groups: [
          {
            wrong: '跳出<b>整个循环</b>',
            right: '跳过<b>本次循环</b>'
          },
          {
            wrong: '后面的 i 都不执行了',
            right: '本次后面的代码跳过，下次继续'
          },
          {
            wrong: '例：找到 5 就停止',
            right: '例：遇偶数就跳过'
          },
          {
            wrong: '效果：循环提前结束',
            right: '效果：循环继续，但这次不做'
          }
        ],
        footer: '<b>📌 口诀</b>：break 是"我不干了"（整个循环结束），continue 是"这次不算，继续下一次"。<br><br><b>💡 break 的常见场景</b><br>① <b>查找</b>：找到目标就跳出<br>② <b>菜单</b>：用户输入"退出"就跳出主循环<br>③ <b>限时</b>：超时后终止循环<br><br><b>⚠️ 陷阱</b>：break 只能跳出<b>一层</b>循环。<br>嵌套循环里，break 只跳出<b>最内层</b>——外层继续走。'
      }
    },

    /* ===== 17 常见错误 ===== */
    {
      id: 17,
      type: "compare",
      title: "循环常见错误",
      subtitle: "避开这些坑",
      data: {
        splitStep: true,
        groups: [
          { wrong: "忘写 i++，死循环", right: "每次循环更新 i" },
          { wrong: "for 里用逗号分隔", right: "for 里用分号分隔" },
          { wrong: "while (i = 10) 少个等号", right: "while (i == 10)" },
          { wrong: "break 写在循环外", right: "break 必须在循环内" },
        ],
        footer: '<b>🛠️ 调试循环的三板斧</b><br>① <b>打印中间值</b>：<code>cout &lt;&lt; "i=" &lt;&lt; i &lt;&lt; endl;</code><br>② <b>检查边界</b>：i 从几到几，最后几次是否正常<br>③ <b>小数据测试</b>：n = 1、2、3 手动推一遍<br><br>养成这个习惯，能抓住 <b>80% 的循环 bug</b>。'
      },
    },

    /* ===== 18 初赛渗透 ===== */
    {
      id: 18,
      type: "split",
      title: '初赛小知识：循环次数',
      subtitle: 'CSP-J/S 初赛必考',
      chapterTag: '第 5 讲 · 初赛渗透',
      data: {
        intro: '初赛最常见的题型之一——<b>给代码，数执行次数</b>。都是送分题，必须拿下。',
        panes: [
          {
            title: '循环次数速查',
            icon: '🔢',
            items: [
              { title: 'for (i=0; i<n; i++)', desc: '<b>n 次</b>' },
              { title: 'for (i=1; i<=n; i++)', desc: '<b>n 次</b>' },
              { title: 'for (i=0; i<=n; i++)', desc: '<b>n+1 次</b>' },
              { title: 'for (i=1; i<n; i++)', desc: '<b>n-1 次</b>' },
              { title: '嵌套（内层固定）', desc: '<b>外层 × 内层</b>' },
              { title: '嵌套（内层变化）', desc: '逐层累加' }
            ]
          },
          {
            title: '常见陷阱',
            icon: '⚠️',
            items: [
              { title: '< vs <=', desc: '差一次' },
              { title: '起始 0 vs 1', desc: '差一次' },
              { title: '步长 > 1', desc: '次数减少' },
              { title: 'continue 不减少次数', desc: '只跳过执行' },
              { title: 'break 会减少总次数', desc: '提前跳出' },
              { title: '内层 j<=i', desc: '总次数 = 1+2+...+n' }
            ]
          }
        ],
        footer: '<b>📌 记忆口诀</b>：<code>&lt;</code> 看差值，<code>&lt;=</code> 看差值加一。<br><br><b>解题技巧</b>：<br>· 把每个变量写在纸上<br>· 逐行执行，判断条件结果<br>· 不要心算，容易错<br>· 边界情况（i=0、i=n）重点看'
      }
    },

    /* ===== 19 练习小结 ===== */
    {
      id: 19, type: "grid", title: "练习小结", subtitle: "循环的三大核心模式",
      data: {
        cards: [
          {
            icon: "➕",
            title: "模式 1：累加器",
            desc: "<b>求总和</b><br><code>sum = 0;</code><br><code>for (...) sum += x;</code><br><br><b>易错</b>：忘了初始化为 0。"
          },
          {
            icon: "✖️",
            title: "模式 2：累乘器",
            desc: "<b>求阶乘 / 乘积</b><br><code>fact = 1;</code><br><code>for (...) fact *= x;</code><br><br><b>易错</b>：初始值必须是 1。"
          },
          {
            icon: "🪜",
            title: "模式 3：嵌套循环",
            desc: "<b>打印图案 / 二维表</b><br>外层控行，内层控列<br><code>for(i...) { for(j<=i...) }</code><br><br><b>易错</b>：内层边界随外层变。"
          }
        ],
        footer: '<b>📌 万变不离其宗</b>：<br>不管循环题怎么变，底层都是这三个模式。把这三套代码练成肌肉记忆，以后遇到难题，先想“它是求和，还是求积，还是画图？”'
      }
    },

    /* ===== 20 趣味扩展 ===== */
    {
      id: 20,
      type: "grid",
      title: "🎨 难题后的放松 · 循环的真实应用",
      subtitle: "循环无处不在",
      chapterTag: "第 5 讲 · 知识讲解",
      data: {
        cards: [
          {
            icon: "🎮",
            title: "游戏主循环",
            desc: "游戏每秒运行 <b>60 次</b>画面刷新<br>每次刷新都在循环里更新<br>角色位置、血量、碰撞检测<br><b>没有循环，游戏无法运行</b>",
          },
          {
            icon: "📊",
            title: "数据处理",
            desc: '统计 <b>100 万条</b>记录<br>逐条读取、计算、汇总<br>循环让计算机"批量处理"<br><b>人做不到的事，计算机一秒完成</b>',
          },
          {
            icon: "🔬",
            title: "科学计算",
            desc: "物理模拟、天气预报、基因分析<br>用循环一步步逼近答案<br><b>数值计算</b>的核心是循环<br>模拟精度越高，循环次数越多",
          },
          {
            icon: "🤖",
            title: "人工智能",
            desc: "神经网络训练循环 <b>上万次</b><br>每次调整权重、计算误差<br><b>循环是 AI 训练的引擎</b><br>GPT 训练需要循环数月",
          },
        ],
        extra: {
          title: '💡 循环：计算机的"超能力"',
          desc: '人类做重复工作会累，计算机不会。<br><b>人类每秒最多做 10 次计算，计算机每秒能做上亿次</b>。<br><br>这就是为什么计算机能解决人类无法解决的复杂问题。<br><br><b>一个有趣的对比</b>：<br>1946 年，世界第一台电子计算机 <a href="https://baike.baidu.com/item/ENIAC" target="_blank" class="wiki-link">ENIAC</a> 每秒能算 5000 次。<br>今天的手机芯片，每秒能算几十亿次——<b>快了 100 万倍</b>。<br>但即使这么快，程序还得靠循环才能"批量工作"。<br><br><b>学会循环，你就掌握了计算机的超能力。</b>',
          variant: "card-primary",
        },
      },
    },

    /* ===== 21 课堂小测 ===== */
    {
      id: 21,
      type: "quiz",
      title: "课堂小测",
      subtitle: "循环结构与次数",
      chapterTag: "第 5 讲 · 课堂小测",
      data: {
        questions: [
          {
            id: 1,
            type: "single",
            difficulty: 2,
            source: "CSP-J 初赛真题练习 · 循环结构",
            question: "下面代码的循环体会执行多少次？",
            questionCode: `int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}`,
            options: [
              { label: "A", text: "99 次" },
              { label: "B", text: "100 次", correct: true },
              { label: "C", text: "101 次" },
              { label: "D", text: "无限次" },
            ],
            analysis:
              'i 从 1 开始，到 100 结束（包含 100），<b>共 100 次</b>。<br>计算公式：循环次数 = 结束值 - 起始值 + 1 = 100 - 1 + 1 = 100。<br>这是初赛最高频的题型之一。<br>对应本讲 slide-16"初赛渗透：循环次数"。',
          },
          {
            id: 2,
            type: "single",
            difficulty: 3,
            source: "CSP-J 初赛真题练习 · while 循环",
            question: "下面代码的输出是什么？",
            questionCode: `int i = 0;
while (i < 5) {
    cout << i << " ";
    i += 2;
}`,
            options: [
              { label: "A", text: "0 1 2 3 4" },
              { label: "B", text: "0 2 4", correct: true },
              { label: "C", text: "0 2 4 6" },
              { label: "D", text: "0" },
            ],
            analysis:
              '每次循环 i 加 2，依次输出 0、2、4。<br>当 i = 6 时，<code>i &lt; 5</code> 为假，循环结束。<br><br><b>关键</b>：<code>i += 2</code> 不是 <code>i++</code>，步长是 2。<br>所以输出 "0 2 4"，选 B。',
          },
          {
            id: 3,
            type: "single",
            difficulty: 3,
            source: "CSP-J 2021 初赛模拟题 · 嵌套循环",
            question: "下面代码会输出多少个 <code>*</code>？",
            questionCode: `for (int i = 1; i <= 3; i++)
    for (int j = 1; j <= 4; j++)
        cout << "*";`,
            options: [
              { label: "A", text: "7 个" },
              { label: "B", text: "12 个", correct: true },
              { label: "C", text: "3 个" },
              { label: "D", text: "4 个" },
            ],
            analysis:
              "外层 3 次，内层 4 次，共 3 × 4 = <b>12 次</b>。<br><b>嵌套循环的总次数 = 外层 × 内层</b>（内层次数固定时）。<br><br>如果内层次数随外层变化（如 <code>j &lt;= i</code>），要逐层累加，不一定是乘法。",
          },
          {
            id: 4,
            type: "judge",
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第三章",
            question:
              "在 C++ 中，<code>break</code> 和 <code>continue</code> 的效果完全一样。",
            options: [
              { label: "A", text: "正确" },
              { label: "B", text: "错误", correct: true },
            ],
            analysis:
              '两者完全不同：<br><b>break</b>：跳出<b>整个循环</b>，不再执行循环。<br><b>continue</b>：跳过<b>本次循环</b>，继续下一次循环。<br><br>记忆口诀：break 是"我不干了"，continue 是"这次不算，继续"。',
          },
          {
            id: 5,
            type: "judge",
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第三章",
            question:
              "在 C++ 中，<code>while (true) { }</code> 是一个死循环，程序会一直执行下去。",
            options: [
              { label: "A", text: "正确", correct: true },
              { label: "B", text: "错误" },
            ],
            analysis:
              '<code>while (true)</code> 的条件永远为真，所以循环体会一直执行，形成"死循环"。<br><br>在竞赛中，意外的死循环会触发 <b>TLE</b>（超时）。<br>但<b>故意的死循环</b>也有用武之地，比如服务器监听、游戏主循环。<br>关键是<b>循环体里要有跳出机制</b>（如 break、return）。',
          },
        ],
      },
    },

    /* ===== 22 今日总结 ===== */
    {
      id: 22,
      type: "quote",
      title: "今日总结",
      subtitle: "今天我们学会了",
      data: {
        text: "让程序重复做事，才是真正的自动化。",
        author: "—— 循环结构第一课",
        points: [
          "while 循环：条件为真就重复",
          "for 循环：三要素写在一行，最常用",
          "循环三要素：初始、条件、更新",
          "循环嵌套：外层走一步，内层走一圈",
          "break：提前跳出循环",
          "continue：跳过本次循环",
        ],
        highlight: {
          title: "📌 关键口诀",
          desc: "while 看条件，for 三要素；初始、条件、更新，缺一不可；嵌套外乘内，break 跳整圈；continue 跳一次，记住别搞混。",
        },
      },
    },

    /* ===== 23 课后作业 ===== */
    {
      id: 23,
      type: "grid",
      title: "课后作业 · OJ 实战",
      subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          {
            icon: "🟢",
            title: "基础 1 · P5722",
            link: "https://www.luogu.com.cn/problem/P5722",
            desc: "<b>数列求和</b><br>考察：for 循环、累加<br>难度：★<br>目标：读入 n 个数，输出和",
          },
          {
            icon: "🟢",
            title: "基础 2 · P5721",
            link: "https://www.luogu.com.cn/problem/P5721",
            desc: "<b>数字直角三角形</b><br>考察：循环嵌套、输出格式<br>难度：★★<br>目标：打印数字三角形",
          },
          {
            icon: "🔴",
            title: "挑战 · P5727",
            link: "https://www.luogu.com.cn/problem/P5727",
            desc: "<b>冰雹猜想</b><br>考察：while 循环、条件判断<br>难度：★★★<br>目标：反复迭代直到 1",
          },
        ],
      },
    },

    /* ===== 24 下节预告 ===== */
    {
      id: 24,
      type: "radial",
      title: "下节预告",
      subtitle: "第 6 讲 · 一维数组",
      data: {
        center: "数组",
        items: [
          { text: "什么是数组" },
          { text: "定义与访问" },
          { text: "遍历与统计" },
          { text: "常见错误" },
        ],
      },
    },

    /* ===== 25 答疑时间 ===== */
    {
      id: 25,
      type: "grid",
      title: '答疑时间',
      subtitle: '常见问题 FAQ',
      chapterTag: '第 5 讲 · 答疑',
      data: {
        cards: [
          {
            icon: '🔀',
            title: 'for 还是 while？',
            desc: '<b>次数确定</b> → for<br><b>次数不定</b> → while<br>两者可互换<br>选读起来更清晰的'
          },
          {
            icon: '⚠️',
            title: '为什么死循环？',
            desc: '检查三要素——<br>最常见的是<b>忘写 <code>i++</code></b><br>条件永远为真<br>CPU 一直跑 = TLE'
          },
          {
            icon: '⚡',
            title: 'break vs continue？',
            desc: '<b>break</b>：跳出整个循环（"不干了"）<br><b>continue</b>：跳过本次（"这次不算"）<br>画个图就懂'
          },
          {
            icon: '🔄',
            title: '嵌套怎么理解？',
            desc: '想象排队：<br>外层 = 队伍，内层 = 每个人<br>外层走一步，内层走一圈<br>多画几遍就懂'
          },
          {
            icon: '📊',
            title: '执行次数有什么用？',
            desc: '初赛必考<br>还能估算程序速度<br>n 次 vs n² 次，差很多<br>这是"复杂度"的雏形（第 36 讲）'
          },
          {
            icon: '💡',
            title: '怎么练习循环？',
            desc: '至少写 <b>50 道循环题</b><br>每道先想"循环几次"<br>再想"每次做什么"<br>最后想"结束输出什么"'
          }
        ]
      }
    },

    /* ===== 26 本讲英文单词 ===== */
    {
      id: 26,
      type: "glossary",
      title: "本讲英文单词",
      subtitle: "记牢拼写，理解原意",
      chapterTag: "第 5 讲 · 复习",
      data: {
        words: [
          {
            word: "while",
            cn: "当……时",
            pron: "/waɪl/",
            origin: '英文原意"当……时"',
            category: "关键字",
          },
          {
            word: "for",
            cn: "为了",
            pron: "/fɔːr/",
            origin: '英文原意"为了"',
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
            word: "continue",
            cn: "继续",
            pron: "/kənˈtɪnjuː/",
            origin: '英文原意"继续"',
            category: "关键字",
          },
          {
            word: "loop",
            cn: "循环",
            pron: "/luːp/",
            origin: '英文原意"环、圈"',
            category: "概念",
          },
          {
            word: "iteration",
            cn: "迭代",
            pron: "/ˌɪtəˈreɪʃn/",
            origin: '英文原意"重复"',
            category: "概念",
          },
        ],
      },
    },

    /* ===== 27 知识清单 ===== */
    {
      id: 27,
      type: "grid",
      title: "第 5 讲 · 知识清单",
      subtitle: "一页看完本讲所有重点",
      chapterTag: "第 5 讲 · 复习",
      data: {
        cards: [
          {
            icon: "🔁",
            title: "while 循环",
            desc: "<b>语法</b>：while (条件) { ... }<br><b>初始</b>：循环外定义<br><b>更新</b>：循环体内写<br><b>陷阱</b>：忘写 i++ 会死循环",
          },
          {
            icon: "🔂",
            title: "for 循环",
            desc: "<b>语法</b>：for (初始; 条件; 更新) { ... }<br><b>三要素</b>：初始、条件、更新<br><b>分号</b>：三部分用分号分隔<br><b>优势</b>：计数循环首选",
          },
          {
            icon: "🔄",
            title: "循环嵌套",
            desc: "<b>语法</b>：for 里套 for<br><b>执行</b>：外层 1 步，内层 1 圈<br><b>总次数</b>：外层 × 内层<br><b>应用</b>：九九乘法表、图案打印",
          },
          {
            icon: "⚡",
            title: "break 与 continue",
            desc: "<b>break</b>：跳出整个循环<br><b>continue</b>：跳过本次，下次继续<br><b>位置</b>：必须在循环内<br><b>区别</b>：全不干 vs 这次不算",
          },
        ],
        footer: '<b>📌 关键口诀</b>：while 看条件，for 三要素；初始、条件、更新，缺一不可；嵌套外乘内，break 跳整圈；continue 跳一次，记住别搞混。<br><br><b>📌 挑战题单</b><br>⭐ 基础：P5722 数列求和<br>⭐⭐ 进阶：P5721 数字直角三角形<br>⭐⭐⭐ 挑战：P5727 冰雹猜想<br><br><b>小 C 彩蛋</b>：世界第一台电子计算机 ENIAC 每秒只能算 5000 次。现在的电脑每秒能算几十亿次——你写的 for 循环，计算机 1 秒能跑上亿遍。'
      },
    },

    /* ===== 28 结束页 ===== */
    {
      id: 28,
      type: "ending",
      title: "第五讲结束",
      subtitle: "点击返回目录，复习本讲内容",
      chapterTag: false,
      data: {
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
      },
    },
  ],
};

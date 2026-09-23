export default {
  title: '第 4 讲 运算符与分支',
  subtitle: '让程序学会判断',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '运算符与分支', subtitle: '让程序学会判断', chapterTag: false,
      data: { accentWord: '分支', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 4 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '数据的多种面孔',
      data: {
        items: [
          { icon: '📐', badge: '小数', title: 'double 与 float', desc: '小数的家', points: ['double 精度高', 'float 精度低', '竞赛首选 double'] },
          { icon: '🔤', badge: '字符', title: 'char 字符', desc: '单个字符', points: ['单引号 \'A\'', '本质是 ASCII', '可转整数'] },
          { icon: '💡', badge: '布尔', title: 'bool 布尔', desc: '只有真和假', points: ['true = 1', 'false = 0', '判断的基础'] },
          { icon: '🔄', badge: '转换', title: '类型转换', desc: '不同类型之间', points: ['自动转换', '强制转换', '整数除法陷阱'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '目前程序只会从头到尾执行一遍，不会"做判断"。<br>比如"成绩及格就输出及格"——这在程序里怎么写？<br>答案：用<b>运算符</b>和<b>分支结构</b>。<br><br>🔮 <b>回收伏笔</b>：第 3 讲讲过 bool 是"判断的基础"，今天就让 bool 派上用场。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步让程序学会判断',
      data: {
        cards: [
          { number: '01', title: '运算符', desc: '算术、赋值、关系、逻辑四类运算符' },
          { number: '02', title: 'if 家族', desc: 'if / if-else / if-else if 多路判断' },
          { number: '03', title: 'switch', desc: '多分支的另一种写法' },
          { number: '04', title: '实战演练', desc: '用 if 解决奇偶、成绩、闰年问题' }
        ],
        extra: { title: '📖 知识扩展 · 程序的三大结构', desc: '顺序、分支、循环是程序的三大基本结构。<br>前面学的都是顺序结构，本讲开始学<b>分支结构</b>。<br>学会分支，程序才能根据输入"做不同的反应"，从流水账升级为智能判断。<br><b>这是程序从"死板"变"聪明"的关键一步。</b>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，学会判断',
      data: {
        items: [
          { icon: '➕', badge: '基础', title: '第一站 · 运算符', desc: '算术、赋值、关系、逻辑四类', points: ['+ - * / %', '= += -= *= /=', '> < == !=', '&& || !'] },
          { icon: '🔀', badge: '核心', title: '第二站 · if 家族', desc: '单分支、双分支、多分支', points: ['if 单分支', 'if-else 双分支', 'if-else if 多分支'] },
          { icon: '🔢', badge: '进阶', title: '第三站 · switch', desc: '多分支的另一种写法', points: ['switch (变量)', 'case 常量', 'break 跳出', 'default 兜底'] },
          { icon: '🏆', badge: '实战', title: '第四站 · 综合练习', desc: '奇偶、成绩、闰年', points: ['% 判断奇偶', 'if-else if 多级判断', '闰年条件：4、100、400'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"逻辑大师"徽章。' }
      }
    },

    /* ===== 05 运算符与分支引入 ===== */
    {
      id: 5, type: 'dialog', title: '程序怎么"做判断"？', subtitle: '运算符与分支', chapterTag: '第 4 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，我想让程序判断"成绩及格就输出及格"，怎么写？' },
          { who: 'robot', text: '需要两样东西：<b>运算符</b>做比较，<b>分支结构</b>做判断。' },
          { who: 'student', text: '运算符是什么？' },
          { who: 'robot', text: '运算符就是"工具"。<br>+ 是加法工具、&gt; 是比较工具、&amp;&amp; 是连接条件的工具。' },
          { who: 'student', text: '那分支结构呢？' },
          { who: 'robot', text: '分支就是"岔路口"。程序根据条件走不同的路——<br>条件成立走一条，不成立走另一条。' },
          { who: 'student', text: '哦，那先学运算符再学分支？' },
          { who: 'robot', text: '对。运算符是分支的基础——<br>没有运算符，就没有"条件"。<br>先学工具，再学"用工具判断"。' }
        ],
        extra: {
          title: '📖 知识扩展 · 三大基本结构',
          desc: '1966 年，计算机科学家 <b>Böhm 和 Jacopini</b> 证明了一个惊人的结论：<br>任何程序，都可以用<b>三种基本结构</b>组合出来——<br>① <b>顺序</b>：从上到下一条条执行<br>② <b>分支</b>：根据条件走不同的路<br>③ <b>循环</b>：重复执行一段代码<br><br>这个结论被称为"<b>结构化程序定理</b>"——它是现代编程的基石。<br>所有语言（C++、Python、Java）都遵循这个理论。<br>今天学的分支，就是三大结构之一。<br><br>🔮 <b>伏笔</b>：循环结构是第 5 讲的内容。学会分支+循环，程序就能解决任何问题。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 运算符总览 ===== */
    {
      id: 6, type: 'grid', title: 'C++ 四类常用运算符', subtitle: '4 大类，覆盖程序的所有判断',
      data: {
        cards: [
          { icon: '➕', title: '算术运算符', desc: '<b>+</b> 加 · <b>-</b> 减 · <b>*</b> 乘<br><b>/</b> 除（整数除法丢小数）<br><b>%</b> 取余（求余数）<br>例：<code>10 % 3 = 1</code>' },
          { icon: '✏️', title: '赋值运算符', desc: '<b>=</b> 赋值<br><b>+=</b> 加后赋值 · <b>-=</b> 减后赋值<br><b>*=</b> 乘后赋值 · <b>/=</b> 除后赋值<br>例：<code>a += 3</code> 即 <code>a = a + 3</code>' },
          { icon: '⚖️', title: '关系运算符', desc: '<b>&gt;</b> 大于 · <b>&lt;</b> 小于<br><b>&gt;=</b> 大于等于 · <b>&lt;=</b> 小于等于<br><b>==</b> 等于 · <b>!=</b> 不等于<br>结果只有 <b>true</b> 或 <b>false</b>' },
          { icon: '🔗', title: '逻辑运算符', desc: '<b>&amp;&amp;</b> 与（两边都真才真）<br><b>||</b> 或（一边真就真）<br><b>!</b> 非（真变假，假变真）<br>例：<code>a &gt; 0 &amp;&amp; a &lt; 10</code>' }
        ],
        extra: {
          title: '📌 竞赛高频提醒',
          desc: '关系运算符的 <code>==</code> 容易和赋值 <code>=</code> 混淆。<br><code>if (a = 5)</code> 是赋值（永远成立），<code>if (a == 5)</code> 才是判断。<br>写错会得到意想不到的结果，而且编译器不报错。<br><br><b>记忆口诀</b>：判断相等，两个等号。<br><br>🔮 <b>伏笔</b>：除了这四类，C++ 还有第五类运算符——<b>位运算</b>。它直接操作二进制。第 21 讲揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 算术与赋值运算符 ===== */
    {
      id: 7, type: 'code-split', title: '算术与赋值运算符', subtitle: '五大算术 + 复合赋值',
      data: {
        intro: '📖 <b>算术运算符</b>做加减乘除；<b>复合赋值</b>是简写形式。',
        codeFile: 'codes/lesson-04/operators.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int a = 10, b = 3;', desc: '定义两个变量' },
          { line: 10, title: 'a / b', desc: '整数除法，10/3 = 3，小数被丢弃' },
          { line: 11, title: 'a % b', desc: '取余，10 除以 3 的余数是 1' },
          { line: 14, title: 'x += 3', desc: '简写，等价于 x = x + 3' }
        ],
        output: '13\n7\n30\n3\n1\n8',
        extra: {
          title: '💡 取余 % 的妙用',
          desc: '① <b>判断奇偶</b>：<code>n % 2 == 0</code> 是偶数，<code>== 1</code> 是奇数<br>② <b>提取数位</b>：<code>n % 10</code> 得到个位数<br>③ <b>判断倍数</b>：<code>n % k == 0</code> 说明 n 是 k 的倍数<br><br>取余是竞赛中的高频运算符，一定要熟练掌握。<br><br><b>实际应用</b>：密码学、哈希函数、日期计算都用取余。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 关系运算符 ===== */
    {
      id: 8, type: 'code-split', title: '关系运算符 · 判断大小与相等', subtitle: '结果只有真或假',
      data: {
        intro: '📖 关系运算符做<b>比较</b>，结果是 <code>bool</code>（true / false）。<br>输出时 true 显示 1，false 显示 0。',
        codeFile: 'codes/lesson-04/relations.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: '(a &gt; b)', desc: '大于，5 &gt; 3 为真，输出 1' },
          { line: 7, title: '(a &lt; b)', desc: '小于，5 &lt; 3 为假，输出 0' },
          { line: 8, title: '(a == b)', desc: '相等，注意是两个等号' },
          { line: 9, title: '(a != b)', desc: '不相等' }
        ],
        output: '1\n0\n0\n1',
        extra: {
          title: '💡 为什么必须加括号？',
          desc: '写 <code>cout &lt;&lt; a &gt; b</code> 会出错——<br>因为 <code>&lt;&lt;</code> 的优先级<b>高于</b> <code>&gt;</code>。<br>程序会先算 <code>cout &lt;&lt; a</code>（输出 a），再比较 <code>&gt; b</code>。<br>结果错。<br><br><b>正确写法</b>：<code>cout &lt;&lt; (a &gt; b)</code><br><br><b>记忆</b>：关系运算放进 cout 时，<b>必须加括号</b>。<br><br>🔮 <b>伏笔</b>：为什么 <code>true</code> 输出 1，<code>false</code> 输出 0？<br>因为计算机里<b>真就是 1，假就是 0</b>。第 22 讲揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 逻辑运算符与优先级 ===== */
    {
      id: 9, type: 'dialog', title: '逻辑运算符与优先级', subtitle: '组合多个条件', chapterTag: '第 4 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果我要判断"a 在 0 和 10 之间"，怎么写？' },
          { who: 'robot', text: '用<b>逻辑运算符</b>：<code>a &gt; 0 &amp;&amp; a &lt; 10</code>。' },
          { who: 'student', text: '&amp;&amp; 是什么意思？' },
          { who: 'robot', text: '<b>与（and）</b>——两边都真才真。<br>还有 <b>|| 或（or）</b>——一边真就真。<br>还有 <b>! 非（not）</b>——真变假，假变真。' },
          { who: 'student', text: '那我如果写 a &gt; 0 &amp;&amp; a &lt; 10，会不会有优先级问题？' },
          { who: 'robot', text: '会有。<code>&gt;</code> 比 <code>&amp;&amp;</code> 优先级高，<br>所以 <code>a &gt; 0 &amp;&amp; a &lt; 10</code> 相当于 <code>(a &gt; 0) &amp;&amp; (a &lt; 10)</code>——正好对。' },
          { who: 'student', text: '那有没有可能出问题？' },
          { who: 'robot', text: '有。<code>a || b &amp;&amp; c</code> 因为 <code>&amp;&amp;</code> 比 <code>||</code> 优先级高，<br>实际等于 <code>a || (b &amp;&amp; c)</code>，不是你以为的 <code>(a || b) &amp;&amp; c</code>。<br><b>建议</b>：不确定就加括号。' }
        ],
        extra: {
          title: '💡 运算符优先级（简化版）',
          desc: 'C++ 有 18 个优先级级别，不用全背。记住常用的 5 层：<br>① <b>括号</b> <code>()</code><br>② <b>非、自增自减</b> <code>! ++ --</code><br>③ <b>乘除取余</b> <code>* / %</code><br>④ <b>加减</b> <code>+ -</code><br>⑤ <b>比较与逻辑</b> <code>&gt; &lt; == &amp;&amp; ||</code><br><br><b>实用建议</b>：<br>不确定就加括号——加括号不会错，少加括号容易错。<br>竞赛里的代码，多几个括号没人嫌，少一个括号可能就 WA。<br><br>🔮 <b>伏笔</b>：逻辑运算符 <code>&amp;&amp; || !</code>，在电路里对应的就是"与门、或门、非门"。第 22 讲从开关讲到计算机。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 过渡页 ===== */
    {
      id: 10, type: 'transition', title: '第二站 · 条件分支', subtitle: '让程序学会做判断',
      data: { note: '接下来你将学会用 if 语句让程序"走不同的路"' }
    },

    /* ===== 11 什么是分支 ===== */
    {
      id: 11, type: 'dialog', title: '什么是分支结构？', subtitle: '让程序学会做判断', chapterTag: '第 4 讲 · 分支结构',
      data: {
        lines: [
          { who: 'student', text: '小 C，程序能像人一样做判断吗？' },
          { who: 'robot', text: '能。用 <b>if 语句</b>，程序可以根据条件走不同的路。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '比如判断成绩是否及格：<br><code>if (score &gt;= 60) { 输出"及格"; }</code><br>条件成立就执行大括号里的内容，不成立就跳过。' },
          { who: 'student', text: '哦，那就像走岔路，根据条件选一条。' },
          { who: 'robot', text: '对。程序从此不再是流水账，而是可以"思考"了。<br>这就是分支结构的威力。' }
        ],
        extra: {
          title: '📖 知识扩展 · 顺序 vs 分支',
          desc: '<b>顺序结构</b>：程序从上到下一条条执行，像流水账。<br><b>分支结构</b>：根据条件选择执行路径，像十字路口。<br><br>分支让程序"活"了起来，可以处理各种不同的输入。<br>没有分支的程序，就像机器人只会做一件事——不管输入什么，结果都一样。<br>有了分支，程序才能"随机应变"。<br><br><b>if 语句</b>是几乎所有编程语言都有的语法——<br>从 1957 年的 FORTRAN 到今天的 Python、Java，全部都有 if。<br>这是人类"做判断"思维的最自然表达。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 if 单分支 ===== */
    {
      id: 12, type: 'code-split', title: 'if 单分支', subtitle: '条件为真就执行',
      data: {
        intro: '📖 <b>语法</b>：<code>if (条件) { 执行体 }</code>。<br>条件为真 → 执行；条件为假 → 跳过。',
        codeFile: 'codes/lesson-04/if-single.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int score;', desc: '定义变量存分数' },
          { line: 7, title: 'cin &gt;&gt; score;', desc: '从键盘读入分数' },
          { line: 9, title: 'if (score &gt;= 60)', desc: '条件为真时执行大括号内' },
          { line: 12, title: 'cout', desc: '无论条件真假都会执行' }
        ],
        output: '（输入 75）\n及格\n程序结束',
        extra: {
          title: '💡 单分支的特点',
          desc: '条件为真 → 执行 if 里的内容；条件为假 → 跳过 if，直接执行后面的代码。<br><br><b>执行体只有一条语句时</b>，大括号可以省略。但建议始终加，方便阅读，也避免出错。<br><br><b>易错</b>：<code>if (score &gt;= 60);</code> 多了分号，后面的代码变成无条件执行。<br>这个 bug 很隐蔽，编译器也不报错。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 if-else 双分支 ===== */
    {
      id: 13, type: 'code-split', title: 'if-else 双分支', subtitle: '两条路，必走一条',
      data: {
        intro: '📖 <b>语法</b>：<code>if (条件) { ... } else { ... }</code>。<br>条件为真走 if，为假走 else——<b>必走一条</b>。',
        codeFile: 'codes/lesson-04/if-else.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int score;', desc: '定义变量存分数' },
          { line: 7, title: 'cin &gt;&gt; score;', desc: '从键盘读入分数' },
          { line: 9, title: 'if', desc: '条件为真时执行这块' },
          { line: 11, title: '} else {', desc: '大括号后紧跟 else，条件为假时执行' },
          { line: 12, title: 'cout', desc: '条件为假时才执行' }
        ],
        output: '（输入 45）\n不及格',
        extra: {
          title: '💡 双分支的意义',
          desc: 'if-else 保证两条路必走一条，不可能两条都走，也不可能都不走。<br>这就像走到岔路口，向左或者向右，总有一条会被走。<br><br><b>常见错误</b>：在 <code>else</code> 后面误加分号 <code>else;</code>，导致 else 变成空语句，逻辑全乱。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 if-else if 多分支 ===== */
    {
      id: 14, type: 'code-split', title: 'if-else if-else 多分支', subtitle: '多条路，只走一条',
      data: {
        intro: '📖 <b>语法</b>：链式多个 <code>else if</code>。<br>从上到下依次判断，<b>一旦某个条件成立，后面不再判断</b>。',
        codeFile: 'codes/lesson-04/if-else-if.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int score;', desc: '定义变量存分数' },
          { line: 9, title: 'score &gt;= 90', desc: '先判断最高档' },
          { line: 11, title: 'else if', desc: '上一个条件不成立时，判断这一个' },
          { line: 15, title: 'else', desc: '所有条件都不成立时执行' }
        ],
        output: '（输入 85）\nB',
        extra: {
          title: '⚠️ 多分支的顺序很重要',
          desc: '从上往下依次判断，<b>一旦某个条件成立，后面不再判断</b>。<br><br>所以条件的顺序很重要！<br>如果把 <code>score &gt;= 60</code> 放在第一位，<br>那么 90 分也会被判成"C"，因为它先匹配了。<br><br><b>原则</b>：范围窄的条件放前面，范围宽的条件放后面。<br>通常是"<b>从高到低</b>"或"<b>从小到大</b>"。<br><br><b>竞赛经验</b>：多分支题，先画个表格，确定条件的先后顺序，再写代码。<br>这个习惯能避免 90% 的顺序错误。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 switch 引入 ===== */
    {
      id: 15, type: 'dialog', title: 'switch 是什么？', subtitle: '多分支的另一种写法', chapterTag: '第 4 讲 · 分支结构',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果我判断星期几，是不是要写 7 个 else if？' },
          { who: 'robot', text: '可以，但太啰嗦。C++ 有个专门的语法，叫 <b>switch</b>。' },
          { who: 'student', text: 'switch 和 if-else 有什么区别？' },
          { who: 'robot', text: 'switch 专门判断"一个变量是否等于某个固定值"，<br>比如 <code>day == 1</code>、<code>day == 2</code>。' },
          { who: 'student', text: '那什么时候用 switch，什么时候用 if？' },
          { who: 'robot', text: '判断固定值用 switch，判断范围（如分数段）用 if-else。' },
          { who: 'student', text: 'switch 有什么好处？' },
          { who: 'robot', text: '代码更清晰、更快。<br>编译器会把 switch 编译成一张"跳转表"——<br>直接跳到对应的 case，不用一个个比较。' }
        ],
        extra: {
          title: '📖 知识扩展 · switch 的由来',
          desc: '<b>switch</b> 最早出现在 1970 年代的 C 语言中。<br>设计初衷是让"多路选择"写起来更清晰。<br><br><b>编译器的实现很有意思</b>——<br>它会把 switch 编译成一张"跳转表"，直接跳到对应的 case，<br>效率比 if-else 链更高。<br><br>这就是为什么"判断固定值"时，switch 往往比 if-else 更快。<br><b>但要注意</b>：switch 只能判断整数和字符，不能判断小数、字符串。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 switch 语法 ===== */
    {
      id: 16, type: 'code-split', title: 'switch 多分支', subtitle: '根据变量的值选择路径',
      data: {
        intro: '📖 <b>语法</b>：<code>switch (变量) { case 值: ...; break; ... default: ... }</code>。<br>变量等于哪个 case，就跳到哪个 case 执行。',
        codeFile: 'codes/lesson-04/switch-day.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int day;', desc: '定义变量存天数' },
          { line: 7, title: 'cin &gt;&gt; day;', desc: '读入数字 1—7' },
          { line: 9, title: 'switch (day)', desc: '根据 day 的值跳转' },
          { line: 10, title: 'case 1:', desc: '当 day 等于 1 时执行' },
          { line: 10, title: 'break;', desc: '跳出 switch，不写会"穿透"' },
          { line: 17, title: 'default:', desc: '所有 case 都不匹配时执行' }
        ],
        output: '（输入 3）\n周三',
        extra: {
          title: '⚠️ break 的作用',
          desc: '<code>break</code> 表示"跳出 switch"。<br><br>如果不写 break，程序会继续执行下一个 case，这叫"<b>case 穿透</b>"。<br>有时候穿透是有意为之（多个 case 共用一段代码），<br>但新手常因忘记 break 而出错。<br><br><b>建议</b>：先都加上 break，等熟练后再考虑穿透。<br><br><b>记忆</b>：写 switch，先假设每个 case 都要 break，别漏。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 switch vs if-else ===== */
    {
      id: 17, type: 'dialog', title: 'switch vs if-else', subtitle: '什么时候用哪个', chapterTag: '第 4 讲 · 分支结构',
      data: {
        lines: [
          { who: 'student', text: '小 C，既然两种都能做判断，怎么选？' },
          { who: 'robot', text: '看判断的是"范围"还是"等值"：<br>· 判断<b>范围</b>（如 <code>score &gt;= 90</code>）→ 用 if<br>· 判断<b>固定值</b>（如 <code>day == 3</code>）→ 用 switch' },
          { who: 'student', text: '还有别的区别吗？' },
          { who: 'robot', text: 'switch 只能判断<b>整数或字符</b>，<br>if 可以判断任何条件（包括小数、字符串）。' },
          { who: 'student', text: '效率上呢？' },
          { who: 'robot', text: 'switch 通常更快——编译器会生成跳转表，一步到位。<br>if-else 要一个个比较。<br>但对小规模判断，差异可以忽略。' },
          { who: 'student', text: '总结一下？' },
          { who: 'robot', text: '<b>口诀</b>：区间用 if，等值用 switch。<br>代码清晰最重要。' }
        ],
        extra: {
          title: '📖 选择建议',
          desc: '<b>用 if-else</b>：<br>· 条件涉及范围（&gt;、&lt;、&gt;=）<br>· 复合条件（&amp;&amp;、||）<br>· 非整数的判断<br><br><b>用 switch</b>：<br>· 判断一个整数或字符是否等于几个固定值<br>· 例：判断月份、星期、菜单选项<br><br><b>口诀</b>：区间用 if，等值用 switch。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 练习1：判断奇偶 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习1：判断奇偶', subtitle: '用取余判断一个数的奇偶性', chapterTag: '第 4 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个整数 <code>n</code>，如果 n 是偶数输出 <code>even</code>，如果是奇数输出 <code>odd</code>。<br>输入样例：<code>7</code>　输出样例：<code>odd</code>', timer: '⏱ 限时 5 分钟' },
        hints: [
          '用 <code>n % 2</code> 判断',
          '<code>n % 2 == 0</code> 是偶数',
          '用 <code>if-else</code> 走两条路'
        ],
        answer: { codeFile: 'codes/lesson-04/even-odd.cpp' },
        analysis: { title: '📖 解析', desc: '<code>n % 2</code> 得到 n 除以 2 的余数，只有 0 和 1 两种结果。<br>余数为 0 就是偶数，余数为 1 就是奇数。<br>这是取余运算符最典型的应用。' },
        extra: { title: '💡 取余的经典用法', desc: '判断奇偶是取余最典型的应用。<br>同理：<br>· <code>n % 3 == 0</code> → 能被 3 整除<br>· <code>n % 5 == 0</code> → 能被 5 整除<br>· <code>n % 10</code> → 得到个位数<br>竞赛中，取余几乎无处不在。', variant: 'card-primary' }
      }
    },

    /* ===== 19 练习2：成绩等级 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习2：成绩等级', subtitle: '用多分支判断分数等级', chapterTag: '第 4 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个分数 <code>score</code>（0—100），按下面规则输出等级：<br>≥90 → <code>A</code>　≥80 → <code>B</code>　≥60 → <code>C</code>　其他 → <code>D</code>', timer: '⏱ 限时 8 分钟' },
        hints: [
          '用 <code>if-else if-else</code> 多分支',
          '从高到低依次判断',
          '条件是 <code>score &gt;= 90</code> 这种写法'
        ],
        answer: { codeFile: 'codes/lesson-04/score-level.cpp' },
        analysis: { title: '📖 解析', desc: '多分支判断必须<b>从高到低</b>排。<br>如果先判断 <code>score &gt;= 60</code>，那 95 分也会被判为 C，因为它先匹配了。<br>这是多分支题的经典陷阱。' },
        extra: { title: '💡 多分支的顺序', desc: '在多个条件里，哪个先判断决定了结果。<br>原则：<b>范围窄的、优先级高的先判断</b>。<br>例：先判断 90 以上，再判断 80 以上，以此类推。<br>这是新手最容易忽略的细节。', variant: 'card-primary' }
      }
    },

    /* ===== 20 练习3：闰年判断 ===== */
    {
      id: 20, type: 'level-map', title: '课堂练习3：闰年判断', subtitle: '用逻辑运算符组合条件', chapterTag: '第 4 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个年份 <code>year</code>，判断是否为闰年。<br>闰年规则：能被 4 整除但不能被 100 整除，或者能被 400 整除。<br>是闰年输出 <code>yes</code>，否则输出 <code>no</code>。', timer: '⏱ 限时 10 分钟' },
        hints: [
          '用 <code>&amp;&amp;</code> 和 <code>||</code> 组合条件',
          '能被 4 整除：<code>year % 4 == 0</code>',
          '完整条件：<code>(year % 4 == 0 &amp;&amp; year % 100 != 0) || year % 400 == 0</code>'
        ],
        answer: { codeFile: 'codes/lesson-04/leap-year.cpp' },
        analysis: { title: '📖 解析', desc: '条件分两部分：<br>① <code>year % 4 == 0 &amp;&amp; year % 100 != 0</code>（普通闰年）<br>② <code>year % 400 == 0</code>（世纪闰年）<br>两者取"或"（<code>||</code>）关系。<br><b>括号不能漏</b>，否则优先级会出错。' },
        extra: { title: '📖 知识扩展 · 闰年的由来', desc: '地球绕太阳一圈约 365.2422 天，不是整数。<br>每 4 年多出约 1 天，所以设闰年加 1 天。<br>但 4 年多加了一点点，所以每 100 年要减 1 次闰年。<br>减了之后又少了一点点，所以每 400 年又补 1 次。<br>这就是"4、100、400"规则的由来。<br><br><b>冷知识</b>：2000 年是闰年，1900 年不是。', variant: 'card-primary' }
      }
    },

    /* ===== 21 常见错误 ===== */
    {
      id: 21, type: 'compare', title: '分支与运算符常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: 'if (a = 5) 赋值不是判断', right: 'if (a == 5) 两个等号判断' },
          { wrong: 'if (a &gt; 0 &amp;&amp; a &lt; 10) 漏括号', right: 'if ((a &gt; 0) &amp;&amp; (a &lt; 10)) 加括号' },
          { wrong: 'switch 里忘记 break', right: '每个 case 后加 break' },
          { wrong: '多分支顺序从低到高', right: '从高到低依次判断' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>= 和 ==</b>：一个是赋值，一个是判断。编译器不报错，但结果错。<br>② <b>优先级</b>：逻辑运算符优先级低，容易搞错。<br>③ <b>break</b>：switch 里不写 break 会穿透。<br>④ <b>顺序</b>：多分支条件顺序决定结果。<br><br><b>调试方法</b>：写完分支代码，用几组典型数据测试一遍，尤其测边界情况。<br>例如闰年判断，测 1900（不是）、2000（是）、2024（是）。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 初赛渗透 ===== */
    {
      id: 22, type: 'dialog', title: '初赛小知识：运算符与分支', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 4 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考今天的运算符和分支吗？' },
          { who: 'robot', text: '会，而且是<b>高频考点</b>。最常见的题型是"读程序写结果"。' },
          { who: 'student', text: '能举个例子吗？' },
          { who: 'robot', text: '比如给一段 if-else 代码，问"输入 5 会输出什么"。<br>要你顺着条件一步步判断。' },
          { who: 'student', text: '有什么技巧吗？' },
          { who: 'robot', text: '三个字：<b>画表格</b>。<br>把每个变量、每个条件的值写在纸上，一步步推。<br>不要心算，容易错。' },
          { who: 'student', text: '还有别的考点吗？' },
          { who: 'robot', text: '还有：<br>· 逻辑运算真值表（&amp;&amp; || ! 的结果）<br>· 短路求值（&amp;&amp; 左边为假不执行右边）<br>· 优先级判断<br>· switch 穿透<br>这些都是送分题，一定要拿下。' }
        ],
        extra: {
          title: '📖 逻辑运算真值表',
          desc: '<b>&amp;&amp; 与</b>：两边都真才真<br>· true &amp;&amp; true = true<br>· true &amp;&amp; false = false<br>· false &amp;&amp; true = false<br>· false &amp;&amp; false = false<br><br><b>|| 或</b>：一边真就真<br>· true || false = true<br>· false || true = true<br>· false || false = false<br><br><b>! 非</b>：真变假，假变真<br>· !true = false<br>· !false = true<br><br><b>短路求值</b>（重要）：<br>· <code>a &amp;&amp; b</code>：a 为假时，b <b>不执行</b><br>· <code>a || b</code>：a 为真时，b <b>不执行</b><br>这是初赛的高频考点，务必掌握。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 课堂小测 ===== */
    {
      id: 23, type: 'quiz', title: '课堂小测', subtitle: '运算符与分支结构',
      chapterTag: '第 4 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 运算符',
            question: '表达式 <code>7 / 2 * 2</code> 的值是多少？',
            options: [
              { label: 'A', text: '7' },
              { label: 'B', text: '6', correct: true },
              { label: 'C', text: '7.0' },
              { label: 'D', text: '3' }
            ],
            analysis: '运算符优先级：乘除同级，从左到右计算。<br>先算 <code>7 / 2</code>，两个 int 相除，结果是 <code>3</code>（小数被丢弃）。<br>再算 <code>3 * 2 = 6</code>。<br>这是新手最容易忽略的陷阱：<b>整数除法会丢小数</b>。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2022 初赛模拟题 · 分支结构',
            question: '下面代码的输出是？',
            questionCode: `int a = 5;
if (a > 3)
    if (a > 4)
        cout << "A";
    else
        cout << "B";`,
            options: [
              { label: 'A', text: 'A', correct: true },
              { label: 'B', text: 'B' },
              { label: 'C', text: 'AB' },
              { label: 'D', text: '编译错误' }
            ],
            analysis: '这是经典的"<b>else 悬挂问题</b>"。<br><code>else</code> 只跟<b>最近的、未配对的 if</b> 配对。<br>所以 <code>else</code> 属于内层 <code>if (a &gt; 4)</code>，而不是外层 <code>if (a &gt; 3)</code>。<br>a = 5，两个条件都成立，输出 A。<br><b>建议</b>：嵌套 if 一定要加<b>大括号</b>，避免歧义。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: '2020 CSP-J 初赛 · 第 5 题',
            question: '以下关于 C++ 逻辑运算符的说法，正确的是？',
            options: [
              { label: 'A', text: '<code>a &amp;&amp; b</code> 中，若 a 为假，则 b 不会被求值', correct: true },
              { label: 'B', text: '<code>a || b</code> 中，两边都会求值' },
              { label: 'C', text: '<code>!</code> 的优先级低于 <code>&amp;&amp;</code>' },
              { label: 'D', text: '<code>&amp;&amp;</code> 和 <code>||</code> 优先级相同' }
            ],
            analysis: 'C++ 逻辑运算符有<b>短路求值</b>特性：<br>· <code>a &amp;&amp; b</code>：若 a 为假，b <b>不执行</b><br>· <code>a || b</code>：若 a 为真，b <b>不执行</b><br><br>A 正确；B 错误（应改为"或"的短路）。<br>C 错误：<code>!</code> 优先级<b>高于</b> <code>&amp;&amp;</code>。<br>D 错误：<code>&amp;&amp;</code> 优先级<b>高于</b> <code>||</code>。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第二章',
            question: '在 C++ 中，<code>if (a = 5)</code> 和 <code>if (a == 5)</code> 效果完全一样。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '两者完全不同：<br>· <code>if (a == 5)</code>：判断 a 是否等于 5<br>· <code>if (a = 5)</code>：先把 5 赋给 a，然后判断表达式的值（5，非 0 为真），所以<b>永远成立</b><br><br>这是 C++ 新手最容易犯的错误之一，而且编译器<b>不会报错</b>。<br>养成习惯：判断相等，永远用两个等号。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第二章',
            question: '在 switch 语句中，每个 case 后面必须写 break，否则程序会继续执行下一个 case。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '不写 break 会导致"<b>case 穿透</b>"：<br>程序会从匹配的 case 开始，一直往下执行所有 case，直到遇到 break 或 switch 结束。<br><br>这是特性，有时被有意使用（如多个 case 共用一段代码），但更多时候是 bug 来源。<br><b>建议</b>：写 switch 时先都加上 break，除非有明确理由不使用。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛分支与运算符三大考点',
          desc: '<b>① 整数除法</b>：两个 int 相除，结果还是 int<br><b>② else 悬挂</b>：else 跟最近的未配对 if 配对<br><b>③ 短路求值</b>：&amp;&amp; 左边为假则不执行右边<br><br><b>解题技巧</b>：<br>· 读程序题，把每个变量写在纸上<br>· 逐行执行，判断条件结果<br>· 不要心算，容易错<br><br>这三类占初赛分支题的 80%。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 今日总结 ===== */
    {
      id: 24, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '条件为真走一条路，为假走另一条路。',
        author: '—— 分支结构第一课',
        points: [
          '四类运算符：算术、赋值、关系、逻辑',
          '算术：+ - * / %（注意整数除法）',
          '关系：&gt; &lt; == != 结果是 true / false',
          '逻辑：&amp;&amp; || !（短路求值）',
          'if 单分支、if-else 双分支、多分支',
          'switch 适合等值判断，注意 break'
        ],
        highlight: { title: '📌 关键口诀', desc: '算术算数，赋值存数；关系判真假，逻辑组合条件；if 走分支，else 兜底；switch 多分支，break 别忘记。' },
        extra: {
          title: '💡 分支让程序活了',
          desc: '到目前为止，程序已经能计算、能存储、能做判断了。<br>下一讲，我们让程序学会"重复执行"——循环结构。<br>有了循环，程序才能处理成千上万的数据。<br><br>🔮 <b>伏笔</b>：分支只能"走一次"。如果要让程序重复做事呢？<br>第 5 讲教你循环。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课后作业 ===== */
    {
      id: 25, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P5710', link: 'https://www.luogu.com.cn/problem/P5710', desc: '<b>数的性质</b><br>考察：逻辑运算、if 判断<br>难度：★★<br>目标：用 &amp;&amp; || 组合多个条件' },
          { icon: '🟢', title: '基础 2 · P5711', link: 'https://www.luogu.com.cn/problem/P5711', desc: '<b>闰年判断</b><br>考察：if-else、逻辑运算<br>难度：★★<br>目标：写出闰年的完整条件' },
          { icon: '🔴', title: '挑战 · P5716', link: 'https://www.luogu.com.cn/problem/P5716', desc: '<b>月份天数</b><br>考察：switch / if-else<br>难度：★★<br>目标：判断每个月的天数，注意闰年' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 下节预告 ===== */
    {
      id: 26, type: 'radial', title: '下节预告', subtitle: '第 5 讲 · 循环结构',
      data: {
        center: '循环结构',
        items: [
          { text: 'while 循环' },
          { text: 'for 循环' },
          { text: '循环嵌套' },
          { text: 'break 与 continue' }
        ],
        extra: {
          title: '💡 让程序学会重复',
          desc: '目前程序只能"从头到尾走一遍"。<br>如果要算 1 加到 100 呢？难道要写 100 行？<br>下一讲，程序将学会"重复"——循环结构。<br><br>🔮 <b>远期彩蛋</b>：为什么有些循环很快，有些很慢？第 36 讲教你算程序跑多久。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 答疑时间 ===== */
    {
      id: 27, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 4 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '为什么 if (a = 5) 不报错？' },
          { who: 'robot', text: '因为 = 是赋值，赋完值后整个表达式等于 5，非 0 视为真，所以 if 一定成立。<br>编译器不报错，但逻辑错了。' },
          { who: 'student', text: '多分支条件的顺序怎么排？' },
          { who: 'robot', text: '从范围最窄的条件开始，通常是"从高到低"或"从小到大"。' },
          { who: 'student', text: 'switch 和 if-else 用哪个更好？' },
          { who: 'robot', text: '判断固定值（如月份、星期）用 switch，判断范围（如分数段）用 if-else。<br>口诀：<b>区间用 if，等值用 switch</b>。' },
          { who: 'student', text: '短路求值是什么？' },
          { who: 'robot', text: '<code>a &amp;&amp; b</code> 中，如果 a 为假，b <b>不会执行</b>。<br>这就是短路求值。<br>它有时是优化，有时是陷阱——注意别在 b 里写"必须执行"的操作。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '分支结构的错误往往很隐蔽，编译器不会报错，但结果不对。<br>建议：写完代码后，用几个典型数据测一遍，尤其测边界情况。<br>比如判断闰年，测 1900（不是）、2000（是）、2024（是）。<br><br>这个"测边界"的习惯，能帮你抓住 80% 的逻辑错误。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 本讲英文单词 ===== */
    {
      id: 28, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 4 讲 · 复习',
      data: {
        words: [
          { word: 'if',      cn: '如果', pron: '/ɪf/',       origin: '英文原意"如果"',   category: '关键字' },
          { word: 'else',    cn: '否则', pron: '/els/',      origin: '英文原意"否则"',   category: '关键字' },
          { word: 'switch',  cn: '开关', pron: '/swɪtʃ/',    origin: '英文原意"开关"',   category: '关键字' },
          { word: 'case',    cn: '情况', pron: '/keɪs/',     origin: '英文原意"情况"',   category: '关键字' },
          { word: 'break',   cn: '打断', pron: '/breɪk/',    origin: '英文原意"打破"',   category: '关键字' },
          { word: 'default', cn: '默认', pron: '/dɪˈfɔːlt/', origin: '英文原意"默认"',   category: '关键字' },
          { word: 'and',     cn: '与',   pron: '/ænd/',      origin: '对应 C++ 的 &amp;&amp;', category: '运算符' },
          { word: 'or',      cn: '或',   pron: '/ɔːr/',      origin: '对应 C++ 的 ||',   category: '运算符' }
        ],
        extra: {
          title: '💡 记忆法 · 英文直译',
          desc: '<b>直接对应类</b>（英文原意就是中文意思）：<br><code>if</code> = 如果<br><code>else</code> = 否则<br><code>switch</code> = 开关<br><code>case</code> = 情况<br><code>break</code> = 打断<br><code>default</code> = 默认<br><br><b>概念对应类</b>：<br><code>and</code> → <code>&amp;&amp;</code>（与）<br><code>or</code> → <code>||</code>（或）<br><code>not</code> → <code>!</code>（非）<br>C++ 用符号表示，其他语言（如 Python）直接用单词。<br><br><b>易错拼写</b>：<br>· <code>else</code> 不是 <code>els</code><br>· <code>default</code> 不要写成 <code>defult</code><br>· <code>switch</code> 不要写成 <code>swich</code>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 知识清单 ===== */
    {
      id: 29, type: 'grid', title: '第 4 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 4 讲 · 复习',
      data: {
        cards: [
          { icon: '➕', title: '四类运算符', desc: '<b>算术</b>：+ - * / %<br><b>赋值</b>：= += -=<br><b>关系</b>：&gt; &lt; == !=<br><b>逻辑</b>：&amp;&amp; || !' },
          { icon: '🔀', title: 'if 家族', desc: '<b>单分支</b>：if (条件) { }<br><b>双分支</b>：if ... else ...<br><b>多分支</b>：if ... else if ... else<br><b>顺序</b>：从窄到宽判断' },
          { icon: '🔢', title: 'switch', desc: '<b>语法</b>：switch (变量) { case 值: ... }<br><b>break</b>：跳出 switch，不写会穿透<br><b>default</b>：兜底分支<br><b>适用</b>：判断固定值' },
          { icon: '⚠️', title: '四大易错', desc: '<b>① = vs ==</b>：赋值 vs 判断<br><b>② 优先级</b>：不确定就加括号<br><b>③ break</b>：switch 里别忘<br><b>④ 顺序</b>：多分支从高到低' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<b>口诀</b>：算术算数，赋值存数；关系判真假，逻辑组合条件；if 走分支，else 兜底；switch 多分支，break 别忘记。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P5710 数的性质<br><b>⭐⭐ 进阶</b>：P5711 闰年判断<br><b>⭐⭐⭐ 挑战</b>：P5716 月份天数<br><b>🔗 延伸</b>：洛谷搜索"入门 2"，挑 3 道分支题练手。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第四讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你已经让程序学会了思考',
          desc: '程序从此不是流水账，而是能根据条件做判断的"智能体"。<br>下一讲，我们让程序学会重复——循环结构。<br>三大结构，你已经掌握了两个。<br>顺序、分支、循环——掌握全部，程序无所不能。',
          variant: 'card-glow'
        }
      }
    }

  ]
};
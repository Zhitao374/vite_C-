export default {
  title: '第 3 讲 分支结构',
  subtitle: '让程序学会判断',
  total: 31,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '分支结构', subtitle: '让程序学会判断', chapterTag: false,
      data: { accentWord: '分支', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 3 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '数据类型，给数据找个家',
      data: {
        items: [
          { icon: '🔢', badge: '整数', title: '整数类型', desc: 'int 和 long long 的区别', points: ['int ±21 亿', 'long long ±9×10¹⁸', '大数用 long long'] },
          { icon: '📐', badge: '小数', title: '浮点与字符', desc: 'double、char、bool', points: ['double 精度 15 位', 'char 单字符', 'bool 真 / 假'] },
          { icon: '✏️', badge: '变量', title: '变量定义与赋值', desc: '语法、命名、初始化', points: ['类型 名字 = 初值;', '未初始化会踩坑', '见名知意'] },
          { icon: '🔄', badge: '转换', title: '类型转换', desc: '自动与强制转换', points: ['int → double 自动升级', '5/2 = 2 不是 2.5', '(double)a / b'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '程序目前只会从头到尾执行一遍。如果想让它"做判断"，比如"成绩及格就输出及格"，需要新的语法——这就是今天要学的分支结构。<br><br>🔮 <b>回收伏笔</b>：还记得第 2 讲讲过的 <code>bool</code> 吗？它的名字来自数学家乔治·布尔。今天的分支结构，基础就是布尔值。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步让程序学会判断',
      data: {
        cards: [
          { number: '01', title: '运算符', desc: '算术、赋值、关系、逻辑四类运算符' },
          { number: '02', title: '条件分支', desc: 'if / else / else if 多路判断' },
          { number: '03', title: 'switch', desc: '多分支的另一种写法' },
          { number: '04', title: '实战演练', desc: '用 if 解决奇偶、成绩、闰年问题' }
        ],
        extra: { title: '📖 知识扩展 · 程序的三大结构', desc: '顺序、分支、循环是程序的三大基本结构。上一讲学的都是顺序结构，本讲开始学分支结构。<br>学会分支，程序才能根据输入"做不同的反应"，从流水账升级为智能判断。' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，学会判断',
      data: {
        items: [
          { icon: '➕', badge: '基础', title: '第一站 · 运算符', desc: '算术、赋值、关系、逻辑四类', points: ['+ - * / %', '= += -= *= /=', '> < == !=', '&& || !'] },
          { icon: '🔀', badge: '核心', title: '第二站 · 条件分支', desc: 'if 单分支、双分支、多分支', points: ['if (条件)', '条件为真执行', 'else 走另一条路', 'else if 多路判断'] },
          { icon: '🔢', badge: '进阶', title: '第三站 · switch', desc: '多路分支的另一种写法', points: ['switch (变量)', 'case 常量', 'break 跳出', 'default 兜底'] },
          { icon: '🏆', badge: '实战', title: '第四站 · 综合练习', desc: '奇偶判断、成绩等级、闰年判断', points: ['% 取余判断奇偶', 'if-else if 多级判断', '闰年条件：4、100、400'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"逻辑大师"徽章。' }
      }
    },

    /* ===== 05 运算符总览（伏笔：位运算） ===== */
    {
      id: 5, type: 'grid', title: 'C++ 四类常用运算符', subtitle: '4 大类 · 覆盖程序的所有判断',
      data: {
        cards: [
          { icon: '➕', title: '算术运算符', desc: '<b>+</b> 加 · <b>-</b> 减 · <b>*</b> 乘<br><b>/</b> 除（整数除法丢小数）<br><b>%</b> 取余（求余数）<br>例：10 % 3 = 1' },
          { icon: '✏️', title: '赋值运算符', desc: '<b>=</b> 赋值<br><b>+=</b> 加后赋值 · <b>-=</b> 减后赋值<br><b>*=</b> 乘后赋值 · <b>/=</b> 除后赋值<br>例：a += 3 相当于 a = a + 3' },
          { icon: '⚖️', title: '关系运算符', desc: '<b>&gt;</b> 大于 · <b>&lt;</b> 小于<br><b>&gt;=</b> 大于等于 · <b>&lt;=</b> 小于等于<br><b>==</b> 等于 · <b>!=</b> 不等于<br>结果只有 true 或 false' },
          { icon: '🔗', title: '逻辑运算符', desc: '<b>&amp;&amp;</b> 与（两边都真才真）<br><b>||</b> 或（一边真就真）<br><b>!</b> 非（真变假，假变真）<br>例：a &gt; 0 &amp;&amp; a &lt; 10' }
        ],
        extra: {
          title: '📌 竞赛高频提醒',
          desc: '关系运算符的 <code>==</code> 容易和赋值 <code>=</code> 混淆。<br><code>if (a = 5)</code> 是赋值（永远成立），<code>if (a == 5)</code> 才是判断。<br>写错会得到意想不到的结果，而且编译器不报错。<br><b>记住：判断相等，两个等号。</b><br><br>🔮 <b>伏笔</b>：除了这四类，C++ 还有第五类运算符——<b>位运算</b>。它直接操作二进制。第 35 讲揭晓。'
        }
      }
    },

    /* ===== 06 算术、赋值与自增 ===== */
    {
      id: 6, type: 'code-split', title: '算术、赋值与自增运算符', subtitle: '三大常用运算符，一起掌握',
      data: {
        code: `// 算术运算符
int a = 10, b = 3;
cout << a + b << endl;   // 13  加
cout << a - b << endl;   // 7   减
cout << a * b << endl;   // 30  乘
cout << a / b << endl;   // 3   整数除法，丢弃小数
cout << a % b << endl;   // 1   取余，10 除以 3 余 1

// 复合赋值
int x = 5;
x += 3;  // 等价于 x = x + 3;   x 变成 8
x -= 2;  // 等价于 x = x - 2;   x 变成 6
x *= 2;  // 等价于 x = x * 2;   x 变成 12

// 自增自减
int i = 0;
i++;     // i 变成 1（后置）
++i;     // i 变成 2（前置）
i--;     // i 变成 1`,
        annotations: [
          { line: 5, title: 'a / b', desc: '整数除法，10 / 3 = 3，小数部分被丢弃' },
          { line: 6, title: 'a % b', desc: '取余，10 除以 3 的余数是 1' },
          { line: 10, title: 'x += 3', desc: '简写形式，等价于 x = x + 3' },
          { line: 16, title: 'i++', desc: '自增，i 加 1。循环里最常用' }
        ],
        extra: {
          title: '💡 取余 % 的妙用',
          desc: '① <b>判断奇偶</b>：a % 2 == 0 是偶数，== 1 是奇数<br>② <b>提取数位</b>：n % 10 得到个位数，n / 10 % 10 得到十位数<br>③ <b>循环计数</b>：i % k == 0 判断 i 是否是 k 的倍数<br>取余是竞赛中的高频运算符，一定要熟练掌握。<br><b>实际应用</b>：密码学、哈希函数、日期计算都用取余。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 整数除法 vs 取余 ===== */
    {
      id: 7, type: 'compare', title: '整数除法 vs 取余', subtitle: '两个容易混淆的运算符',
      data: {
        groups: [
          { wrong: '10 / 3 = 3（丢弃小数）', right: '10.0 / 3 = 3.333...（保留小数）' },
          { wrong: '10 % 3 = 1（余数）', right: 'a % 2 == 0 → 判断偶数' },
          { wrong: '5 / 2 = 2', right: '5 % 2 = 1（5 除以 2 余 1）' }
        ],
        extra: {
          title: '💡 竞赛中的典型用法',
          desc: '<b>整数除法</b>：用于时间换算（秒 → 分钟）、数量统计。<br><b>取余运算</b>：用于判断奇偶、判断能否整除、提取数位。<br><b>口诀</b>：要小数先转 double，要余数就用 %。<br>这两个运算符几乎所有程序都会用到。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 关系运算符（伏笔：条件本质 0/1） ===== */
    {
      id: 8, type: 'code-split', title: '关系运算符 · 判断大小与相等', subtitle: '结果只有真或假',
      data: {
        code: `int a = 5, b = 3;
cout << (a > b)  << endl;   // 1  (true)
cout << (a < b)  << endl;   // 0  (false)
cout << (a >= 5) << endl;   // 1
cout << (a <= 4) << endl;   // 0
cout << (a == b) << endl;   // 0  相等判断
cout << (a != b) << endl;   // 1  不相等判断`,
        annotations: [
          { line: 2, title: 'a &gt; b', desc: '大于，5 > 3 为真，输出 1' },
          { line: 3, title: 'a &lt; b', desc: '小于，5 < 3 为假，输出 0' },
          { line: 6, title: 'a == b', desc: '相等，注意是两个等号' },
          { line: 7, title: 'a != b', desc: '不相等' }
        ],
        extra: {
          title: '💡 关系运算的结果',
          desc: '关系运算的结果是 <b>bool</b> 类型：true（真，输出 1）或 false（假，输出 0）。<br>这个结果可以直接用在 <code>if</code> 条件里，也可以参与算术运算，比如 <code>true + true = 2</code>。<br>更常见的是用 <code>cout << (a > b)</code> 打印判断结果。<br><b>注意</b>：括号不能省。写成 <code>cout << a > b</code> 会先算 <code>cout << a</code>，再比较，结果错。<br><br>🔮 <b>伏笔</b>：为什么 <code>true</code> 输出 1，<code>false</code> 输出 0？因为计算机里<b>真就是 1，假就是 0</b>。第 35 讲揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 逻辑运算符（伏笔：布尔代数/电路） ===== */
    {
      id: 9, type: 'grid', title: '逻辑运算符 · 组合多个条件', subtitle: '三个符号，组成复杂判断',
      data: {
        cards: [
          { icon: '🔗', title: '&amp;&amp; 逻辑与', desc: '<b>两边都真才为真</b><br>true &amp;&amp; true = true<br>true &amp;&amp; false = false<br>例：a &gt; 0 &amp;&amp; a &lt; 10' },
          { icon: '🔀', title: '|| 逻辑或', desc: '<b>一边真就为真</b><br>false || true = true<br>false || false = false<br>例：a == 1 || a == 2' },
          { icon: '❗', title: '! 逻辑非', desc: '<b>真变假，假变真</b><br>!true = false<br>!false = true<br>例：!(a == 0) 等价于 a != 0' }
        ],
        extra: {
          title: '💡 短路求值',
          desc: 'C++ 的 <code>&amp;&amp;</code> 和 <code>||</code> 是"短路"的：<br><b>&amp;&amp;</b>：左边为假，右边<b>不执行</b>。<br><b>||</b>：左边为真，右边<b>不执行</b>。<br>这个特性可以用于优化，也容易造成 bug，后面会详细讲。<br><br>🔮 <b>伏笔</b>：<code>&amp;&amp;</code>、<code>||</code>、<code>!</code> 这三个符号，在电路里对应的就是"与门、或门、非门"。第 35 讲从开关讲到计算机。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 优先级对话 ===== */
    {
      id: 10, type: 'dialog', title: '运算符优先级', subtitle: '小C与同学聊"谁先算"', chapterTag: '第 3 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果我写 2 + 3 * 4，结果是几？' },
          { who: 'robot', text: '14。乘法比加法先算。' },
          { who: 'student', text: '那如果我想先算加法呢？' },
          { who: 'robot', text: '加括号：(2 + 3) * 4 = 20。' },
          { who: 'student', text: '这么多运算符，我怎么知道谁先谁后？' },
          { who: 'robot', text: '不用背完所有规则。竞赛里只需要记住 4 级，剩下的加括号就行。' },
          { who: 'student', text: '哪 4 级？' },
          { who: 'robot', text: '括号 → 乘除取余 → 加减 → 比较。加上逻辑运算，一共 5 个层次，下一屏详细讲。' }
        ],
        extra: {
          title: '💡 为什么不用背所有优先级',
          desc: 'C++ 有 18 个优先级级别，全部背下来意义不大。<br><b>实战策略</b>：<br>① 记住常用 4—5 级<br>② 不确定就加括号<br>③ 加括号不会错，少加括号容易错<br><b>竞赛口诀</b>：能加括号就加括号，宁可繁琐，不要出错。<br><br>📖 <b>括号的历史</b>：<br>16 世纪的意大利数学家 <a href="https://baike.baidu.com/item/拉斐尔·邦贝利" target="_blank" class="wiki-link">邦贝利</a>第一次用圆括号 <code>()</code> 表示"先算这里"。<br>当时数学公式越写越长，运算顺序越来越容易搞混。<br>他用 <code>()</code> 把优先计算的部分"圈"起来——就像给一组数字戴上耳机，告诉它们"你们先算"。<br>后来数学家又发明了方括号 <code>[]</code> 和花括号 <code>{}</code>，用来处理多层嵌套。<br><b>括号让数学表达更清晰，也让代码更清晰。</b>'
        }
      }
    },

    /* ===== 11 优先级（简化版） ===== */
    {
      id: 11, type: 'flow', title: '运算符优先级（简化版）', subtitle: '只需记住 5 个层次',
      data: {
        rows: [
          [
            { icon: '1️⃣', label: '括号', sub: '( )' },
            { icon: '2️⃣', label: '非、自增', sub: '! ++ --' }
          ],
          [
            { icon: '3️⃣', label: '乘除取余', sub: '* / %' },
            { icon: '4️⃣', label: '加减', sub: '+ -' }
          ],
          [
            { icon: '5️⃣', label: '比较与逻辑', sub: '> < == && ||', glow: true }
          ]
        ],
        extra: {
          title: '💡 记忆技巧',
          desc: '优先级口诀：<b>括号 → 非 → 乘除 → 加减 → 比较逻辑</b>。<br>不确定的时候，<b>加括号</b>！加括号不会错，少加括号容易错。<br>例：<code>a > 0 && a < 10</code> 加括号写 <code>(a > 0) && (a < 10)</code> 更清晰。<br>竞赛中，加括号是好习惯。'
        }
      }
    },

    /* ===== 12 过渡页 ===== */
    {
      id: 12, type: 'transition', title: '第二站 · 条件分支', subtitle: '让程序学会做判断',
      data: { note: '接下来你将学会用 if 语句让程序"走不同的路"' }
    },

    /* ===== 13 什么是分支 ===== */
    {
      id: 13, type: 'dialog', title: '什么是分支结构？', subtitle: '让程序学会做判断', chapterTag: '第 3 讲 · 分支结构',
      data: {
        lines: [
          { who: 'student', text: '小 C，程序能像人一样做判断吗？' },
          { who: 'robot', text: '能。用 if 语句，程序可以根据条件走不同的路。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '比如判断成绩是否及格：如果分数 >= 60，输出"及格"；否则输出"不及格"。' },
          { who: 'student', text: '哦，那就像走岔路，根据条件选一条。' },
          { who: 'robot', text: '对。程序从此不再是流水账，而是可以"思考"了。这就是分支结构的威力。' }
        ],
        extra: {
          title: '📖 知识扩展 · 顺序 vs 分支',
          desc: '<b>顺序结构</b>：程序从上到下一条一条执行，像流水账。<br><b>分支结构</b>：根据条件选择执行路径，像十字路口。<br>分支让程序"活"了起来，可以处理各种不同的输入。<br>没有分支的程序，就像机器人只会做一件事——不管输入什么，结果都一样。<br>有了分支，程序就能"随机应变"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 if 单分支（已迁移 codeFile + snippet） ===== */
    {
      id: 14, type: 'code-split', title: 'if 单分支', subtitle: '条件为真就执行',
      data: {
        codeFile: 'codes/lesson-03/if-single.cpp',
        snippet: 'main',
        annotations: [
            { line: 6, title: 'int score;', desc: '定义变量存分数' },
            { line: 7, title: 'cin &gt;&gt; score;', desc: '从键盘读入分数' },
            { line: 9, title: 'if (条件)', desc: '条件为真时执行大括号内的内容' },
            { line: 9, title: 'score &gt;= 60', desc: '条件表达式，结果必须是 true 或 false' },
            { line: 10, title: 'cout', desc: '条件为真时执行' },
            { line: 12, title: 'cout', desc: '无论条件真假都执行' }
        ],
        extra: {
          title: '💡 单分支的特点',
          desc: '条件为真 → 执行 if 里的内容；条件为假 → 跳过 if，直接执行后面的代码。<br><b>执行体只有一条语句时</b>，大括号可以省略。但建议始终加，方便阅读，也避免出错。<br><b>易错</b>：<code>if (score >= 60);</code> 多了分号，后面的代码变成无条件执行。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 if-else（已迁移） ===== */
    {
      id: 15, type: 'code-split', title: 'if-else 双分支', subtitle: '两条路，必走一条',
      data: {
        codeFile: 'codes/lesson-03/if-else.cpp',
        snippet: 'main',
        annotations: [
            { line: 6, title: 'int score;', desc: '定义变量存分数' },
            { line: 7, title: 'cin &gt;&gt; score;', desc: '从键盘读入分数' },
            { line: 9, title: 'if', desc: '条件为真时执行这块' },
            { line: 11, title: 'else', desc: '条件为假时执行这块' },
            { line: 11, title: '} else {', desc: '大括号后紧跟 else' },
            { line: 12, title: 'cout', desc: '条件为假时才执行' }
        ],
        extra: {
          title: '💡 双分支的意义',
          desc: 'if-else 保证两条路必走一条，不可能两条都走，也不可能都不走。<br>这就像走到岔路口，向左或者向右，总有一条会被走。<br>常见错误：在 <code>else</code> 后面误加分号 <code>else;</code>，导致 else 变成空语句，逻辑全乱。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 if-else if-else（已迁移） ===== */
    {
      id: 16, type: 'code-split', title: 'if-else if-else 多分支', subtitle: '多条路，只走一条',
      data: {
        codeFile: 'codes/lesson-03/if-else-if.cpp',
        snippet: 'main',
        annotations: [
            { line: 6, title: 'int score;', desc: '定义变量存分数' },
            { line: 7, title: 'cin &gt;&gt; score;', desc: '从键盘读入分数' },
            { line: 9, title: 'score &gt;= 90', desc: '先判断最高档' },
            { line: 11, title: 'else if', desc: '上一个条件不成立时，判断这一个' },
            { line: 13, title: 'else if', desc: '依次往下判断' },
            { line: 15, title: 'else', desc: '所有条件都不成立时执行' }
        ],
        extra: {
          title: '💡 多分支的判断顺序',
          desc: '从上往下依次判断，<b>一旦某个条件成立，后面不再判断</b>。<br>所以条件的顺序很重要！<br>如果把 <code>score >= 60</code> 放在第一位，那么 90 分也会被判成"及格"，因为它先匹配了。<br><b>原则</b>：范围窄的条件放前面，范围宽的条件放后面。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 嵌套 if（已迁移） ===== */
    {
      id: 17, type: 'code-split', title: '嵌套 if', subtitle: '条件里还有条件',
      data: {
        codeFile: 'codes/lesson-03/if-nested.cpp',
        snippet: 'main',
        annotations: [
            { line: 6, title: 'int a, b;', desc: '定义两个变量' },
            { line: 7, title: 'cin &gt;&gt; a &gt;&gt; b;', desc: '读入两个数' },
            { line: 9, title: 'if (a &gt; 0)', desc: '外层条件：a 大于 0' },
            { line: 10, title: 'if (b &gt; 0)', desc: '内层条件：b 大于 0' },
            { line: 11, title: 'cout 第一象限', desc: 'a &gt; 0 且 b &gt; 0' },
            { line: 12, title: 'else', desc: 'a &gt; 0 但 b &lt;= 0' },
            { line: 15, title: 'else', desc: 'a &lt;= 0 的情况' }
        ],
        extra: {
          title: '💡 嵌套的层级建议',
          desc: '嵌套 if 能解决复杂判断，但层级太多会难读。<br>建议：<br>· 嵌套不超过 3 层<br>· 能用逻辑运算符合并的尽量合并，如 <code>a &gt; 0 &amp;&amp; b &gt; 0</code><br>· 每层加缩进和注释<br><b>口诀</b>：能扁平，不嵌套。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 switch 讨论 ===== */
    {
      id: 18, type: 'dialog', title: 'switch 有什么好处？', subtitle: '多分支的另一种写法', chapterTag: '第 3 讲 · 分支结构',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果我判断星期几，是不是要写 7 个 else if？' },
          { who: 'robot', text: '可以，但太啰嗦。C++ 有个专门的语法，叫 switch。' },
          { who: 'student', text: 'switch 和 if-else 有什么区别？' },
          { who: 'robot', text: 'switch 专门判断"一个变量是否等于某个固定值"，比如 day == 1、day == 2。' },
          { who: 'student', text: '那什么时候用 switch，什么时候用 if？' },
          { who: 'robot', text: '判断固定值用 switch，判断范围（如分数段）用 if-else。<br>下一屏看具体写法。' }
        ],
        extra: {
          title: '📖 知识扩展 · switch 的由来',
          desc: 'switch 最早出现在 1970 年代的 C 语言中。设计初衷是让"多路选择"写起来更清晰。<br>编译器的实现也很有意思——它会把 switch 编译成一张"跳转表"，直接跳到对应的 case，效率比 if-else 链更高。<br>这就是为什么"判断固定值"时，switch 往往比 if-else 更快。<br><b>但要注意</b>：switch 只能判断整数和字符，不能判断小数、字符串。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 switch（已迁移） ===== */
    {
      id: 19, type: 'code-split', title: 'switch 多分支', subtitle: '根据变量的值选择路径',
      data: {
        codeFile: 'codes/lesson-03/switch-day.cpp',
        snippet: 'main',
        annotations: [
            { line: 6, title: 'int day;', desc: '定义变量存天数' },
            { line: 7, title: 'cin &gt;&gt; day;', desc: '读入数字 1—7' },
            { line: 9, title: 'switch (day)', desc: '根据 day 的值跳转' },
            { line: 10, title: 'case 1:', desc: '当 day 等于 1 时执行' },
            { line: 10, title: 'break;', desc: '跳出 switch，不写会"穿透"' },
            { line: 17, title: 'default:', desc: '所有 case 都不匹配时执行' }
        ],
        extra: {
          title: '💡 break 的作用',
          desc: '<code>break</code> 表示"跳出 switch"。<br>如果不写 break，程序会继续执行下一个 case，这叫"<b>case 穿透</b>"。<br>有时候穿透是有意为之（多个 case 共用一段代码），但新手常因忘记 break 而出错。<br><b>建议</b>：先都加上 break，等熟练后再考虑穿透。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 switch vs if-else ===== */
    {
      id: 20, type: 'compare', title: 'switch vs if-else', subtitle: '什么时候用哪个',
      data: {
        groups: [
          { wrong: 'if-else 适合区间判断', right: 'switch 适合等值判断' },
          { wrong: '例：score &gt;= 90', right: '例：day == 1、day == 2' },
          { wrong: 'if-else 可以判断任意条件', right: 'switch 只能判断整数或字符' },
          { wrong: 'if-else 更灵活', right: 'switch 更清晰、更快' }
        ],
        extra: {
          title: '📖 选择建议',
          desc: '<b>用 if-else</b>：条件涉及范围（&gt;、&lt;、&gt;=）、复合条件（&amp;&amp;、||）、非整数的判断。<br><b>用 switch</b>：判断一个整数或字符是否等于几个固定值。<br>例：判断月份、星期、菜单选项，用 switch 更清晰。<br><b>口诀</b>：区间用 if，等值用 switch。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 练习1 判断奇偶（level-map，无 snippet） ===== */
    {
      id: 21, type: 'level-map', title: '课堂练习1：判断奇偶', subtitle: '用取余判断一个数是奇数还是偶数', chapterTag: '第 3 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个整数 <code>n</code>，如果 n 是偶数输出 <code>even</code>，如果是奇数输出 <code>odd</code>。<br>输入样例：<code>7</code>　输出样例：<code>odd</code>', timer: '⏱ 限时 5 分钟' },
        hints: ['用 <code>n % 2</code> 判断', '<code>n % 2 == 0</code> 是偶数', '用 if-else 走两条路'],
        answer: {
          code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n % 2 == 0) {
        cout << "even" << endl;
    } else {
        cout << "odd" << endl;
    }
    return 0;
}`
        },
        analysis: { title: '📖 解析', desc: 'n % 2 得到 n 除以 2 的余数，只有 0 和 1 两种结果。<br>余数为 0 就是偶数，余数为 1 就是奇数。' },
        extra: { title: '💡 取余的经典用法', desc: '判断奇偶是取余最典型的应用。<br>同理：<br>· n % 3 == 0 → 能被 3 整除<br>· n % 5 == 0 → 能被 5 整除<br>· n % 10 → 得到个位数<br>竞赛中，取余几乎无处不在。', variant: 'card-primary' }
      }
    },

    /* ===== 22 练习2 成绩等级 ===== */
    {
      id: 22, type: 'level-map', title: '课堂练习2：成绩等级', subtitle: '用多分支判断分数等级', chapterTag: '第 3 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个分数 <code>score</code>（0—100），按下面规则输出等级：<br>≥90 → <code>A</code>　≥80 → <code>B</code>　≥60 → <code>C</code>　其他 → <code>D</code>', timer: '⏱ 限时 8 分钟' },
        hints: ['用 <code>if-else if-else</code> 多分支', '从高到低依次判断', '条件是 <code>score &gt;= 90</code> 这种写法'],
        answer: {
          code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cin >> score;
    if (score >= 90) {
        cout << "A" << endl;
    } else if (score >= 80) {
        cout << "B" << endl;
    } else if (score >= 60) {
        cout << "C" << endl;
    } else {
        cout << "D" << endl;
    }
    return 0;
}`
        },
        analysis: { title: '📖 解析', desc: '多分支判断必须<b>从高到低</b>排。<br>如果先判断 <code>score &gt;= 60</code>，那 95 分也会被判为 C，因为它先匹配了。' },
        extra: { title: '💡 多分支的顺序', desc: '在多个条件里，哪个先判断决定了结果。<br>原则：<b>范围窄的、优先级高的先判断</b>。<br>例：先判断 90 以上，再判断 80 以上，以此类推。<br>这是新手最容易忽略的细节。', variant: 'card-primary' }
      }
    },

    /* ===== 23 练习3 闰年判断 ===== */
    {
      id: 23, type: 'level-map', title: '课堂练习3：闰年判断', subtitle: '用逻辑运算符组合条件', chapterTag: '第 3 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个年份 <code>year</code>，判断是否为闰年。<br>闰年规则：能被 4 整除但不能被 100 整除，或者能被 400 整除。<br>是闰年输出 <code>yes</code>，否则输出 <code>no</code>。', timer: '⏱ 限时 10 分钟' },
        hints: ['用 <code>&amp;&amp;</code> 和 <code>||</code> 组合条件', '能被 4 整除：<code>year % 4 == 0</code>', '完整条件：<code>(year % 4 == 0 &amp;&amp; year % 100 != 0) || year % 400 == 0</code>'],
        answer: {
          code: `#include <iostream>
using namespace std;

int main() {
    int year;
    cin >> year;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        cout << "yes" << endl;
    } else {
        cout << "no" << endl;
    }
    return 0;
}`
        },
        analysis: { title: '📖 解析', desc: '条件分两部分：<br>① <code>year % 4 == 0 &amp;&amp; year % 100 != 0</code>（普通闰年）<br>② <code>year % 400 == 0</code>（世纪闰年）<br>两者取"或"（||）关系。<br>括号不要漏，否则优先级会出错。' },
        extra: { title: '📖 知识扩展 · 闰年的由来', desc: '地球绕太阳一圈约 365.2422 天，不是整数。<br>每 4 年多出约 1 天，所以设闰年加 1 天。<br>但 4 年多加了一点点，所以每 100 年要减 1 次闰年。<br>减了之后又少了一点点，所以每 400 年又补 1 次。<br>这就是"4、100、400"规则的由来。<br><b>冷知识</b>：2000 年是闰年，1900 年不是。', variant: 'card-primary' }
      }
    },

    /* ===== 24 【新增】分支结构的实际应用 ===== */
    {
      id: 24, type: 'dialog', title: '分支结构的实际应用', subtitle: '从代码到真实世界', chapterTag: '第 3 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，分支结构除了做数学题，还能干嘛？' },
          { who: 'robot', text: '太多了。你手机里的每个 App 都在用它。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '比如微信：<br>· 密码对 → 登录<br>· 密码错 → 提示重试<br>· 重试 3 次错 → 锁定账号<br>每一步都是 if 判断。' },
          { who: 'student', text: '游戏里也有？' },
          { who: 'robot', text: '当然！<br>· 血量 = 0 → 死亡<br>· 金币 ≥ 100 → 可以买装备<br>· 距离 &lt; 5 米 → 攻击命中<br>游戏的每一帧，都在跑上万个 if 判断。' },
          { who: 'student', text: '所以分支结构是无处不在的。' },
          { who: 'robot', text: '对！<b>程序 = 数据 + 指令 + 判断</b>。<br>没有分支，程序就是死板的流水账。<br>有了分支，程序才能"随机应变"。' }
        ],
        extra: {
          title: '📖 知识扩展 · if 的历史',
          desc: '最早的 "if 语句" 出现在 <b>1957 年</b>的 FORTRAN 语言中。<br>FORTRAN 是第一个高级编程语言，为科学家计算服务。<br>它的设计者约翰·巴克斯说："我们要让科学家写公式一样写代码。"<br>IF 语句就是那个"如果 A 成立，就做 B"的语法。<br><b>60 多年过去，所有编程语言都保留了 if</b>——因为它就是人类"做判断"的最自然表达。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 常见错误总结 ===== */
    {
      id: 25, type: 'compare', title: '分支与运算符常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: 'if (a = 5) 赋值不是判断', right: 'if (a == 5) 用两个等号判断' },
          { wrong: 'if (a &gt; 0 &amp;&amp; a &lt; 10) 漏括号', right: 'if ((a &gt; 0) &amp;&amp; (a &lt; 10)) 加括号' },
          { wrong: 'switch 里忘记 break', right: '每个 case 后加 break' },
          { wrong: '多分支顺序从低到高', right: '从高到低依次判断' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>= 和 ==</b>：一个是赋值，一个是判断。编译器不报错，但结果错。<br>② <b>优先级</b>：逻辑运算符优先级低，容易搞错。<br>③ <b>break</b>：switch 里不写 break 会穿透。<br>④ <b>顺序</b>：多分支条件顺序决定结果。<br><b>调试方法</b>：写完分支代码，用几组典型数据测试一遍，尤其测边界情况。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 课堂小测 ===== */
    {
      id: 26, type: 'quiz', title: '课堂小测', subtitle: '运算符与分支结构',
      chapterTag: '第 3 讲 · 课堂小测',
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
            analysis: '这是经典的"<b>else 悬挂问题</b>"。<br><code>else</code> 只跟<b>最近的、未配对的 if</b> 配对。<br>所以 <code>else</code> 属于内层 <code>if (a > 4)</code>，而不是外层 <code>if (a > 3)</code>。<br>a = 5，两个条件都成立，输出 A。<br><b>建议</b>：嵌套 if 一定要加<b>大括号</b>，避免歧义。'
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
            analysis: 'C++ 逻辑运算符有<b>短路求值</b>特性：<br>· <code>a &amp;&amp; b</code>：若 a 为假，b <b>不执行</b><br>· <code>a || b</code>：若 a 为真，b <b>不执行</b><br>A 正确；B 错误（应改为"或"的短路）。<br>C 错误：<code>!</code> 优先级<b>高于</b> <code>&amp;&amp;</code>。<br>D 错误：<code>&amp;&amp;</code> 优先级<b>高于</b> <code>||</code>。'
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
            analysis: '两者完全不同：<br>· <code>if (a == 5)</code>：判断 a 是否等于 5<br>· <code>if (a = 5)</code>：先把 5 赋给 a，然后判断表达式的值（5，非 0 为真），所以<b>永远成立</b><br>这是 C++ 新手最容易犯的错误之一，而且编译器<b>不会报错</b>。<br>养成习惯：判断相等，永远用两个等号。'
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
            analysis: '不写 break 会导致"<b>case 穿透</b>"：<br>程序会从匹配的 case 开始，一直往下执行所有 case，直到遇到 break 或 switch 结束。<br>这是特性，有时被有意使用（如多个 case 共用一段代码），但更多时候是 bug 来源。<br><b>建议</b>：写 switch 时先都加上 break，除非有明确理由不使用。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 逻辑运算的真值表',
          desc: '<b>a &amp;&amp; b</b>：真&amp;真=真，其余全假<br><b>a || b</b>：假|假=假，其余全真<br><b>!a</b>：!真=假，!假=真<br>熟记这个表，初赛逻辑题就能秒杀。<br><b>补充</b>：布尔代数里，<code>&amp;&amp;</code> 和 <code>||</code> 满足"分配律""结合律"，和普通算术类似，但要注意——<code>a &amp;&amp; (b || c)</code> 不等于 <code>(a &amp;&amp; b) || c</code>。<br>括号是逻辑运算的好朋友。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 今日总结 ===== */
    {
      id: 27, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '条件为真走一条路，为假走另一条路。',
        author: '—— 分支结构第一课',
        points: [
          '四类运算符：算术、赋值、关系、逻辑',
          '算术：+ - * / %（注意整数除法）',
          '关系：> < == != 结果是 true / false',
          '逻辑：&& || !（短路求值）',
          'if 单分支、if-else 双分支、多分支',
          'switch 适合等值判断，注意 break'
        ],
        highlight: { title: '📌 关键口诀', desc: '算术算数，赋值存数；关系判真假，逻辑组合条件；if 走分支，else 兜底；switch 多分支，break 别忘记。' },
        extra: {
          title: '💡 分支让程序活了',
          desc: '到目前为止，程序已经能计算、能存储、能做判断了。<br>下一讲，我们让程序学会"重复执行"——循环结构。<br>有了循环，程序才能处理成千上万的数据。<br><br>🔮 <b>伏笔</b>：分支只能"走一次"。如果要让程序重复做事呢？第 4 讲教你循环。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 课后作业 ===== */
    {
      id: 28, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P5710', link: 'https://www.luogu.com.cn/problem/P5710', desc: '<b>数的性质</b><br>考察：逻辑运算、if 判断<br>难度：★★<br>目标：用 &amp;&amp; || 组合多个条件' },
          { icon: '🟢', title: '基础 2 · P5711', link: 'https://www.luogu.com.cn/problem/P5711', desc: '<b>闰年判断</b><br>考察：if-else、逻辑运算<br>难度：★★<br>目标：写出闰年的完整条件' },
          { icon: '🔴', title: '挑战 · P5712', link: 'https://www.luogu.com.cn/problem/P5712', desc: '<b>Apples</b><br>考察：if-else、单位换算<br>难度：★★<br>目标：读懂题意，注意边界' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 - 下节预告 ===== */
    {
      id: 29, type: 'radial', title: '下节预告', subtitle: '第 4 讲 · 循环结构',
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
          desc: '目前程序只能"从头到尾走一遍"。<br>如果要算 1 加到 100 呢？难道要写 100 行？<br>下一讲，程序将学会"重复"——循环结构。<br><br>🔮 <b>远期彩蛋</b>：为什么有些循环很快，有些很慢？第 40 讲教你算程序跑多久。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 30 - 答疑时间 ===== */
    {
      id: 30, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 3 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '为什么 if (a = 5) 不报错？' },
          { who: 'robot', text: '因为 = 是赋值，赋完值后整个表达式等于 5，非 0 视为真，所以 if 一定成立。' },
          { who: 'student', text: '多分支条件的顺序怎么排？' },
          { who: 'robot', text: '从范围最窄的条件开始，通常是"从高到低"或"从小到大"。' },
          { who: 'student', text: 'switch 和 if-else 用哪个更好？' },
          { who: 'robot', text: '判断固定值（如月份、星期）用 switch，判断范围（如分数段）用 if-else。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '分支结构的错误往往很隐蔽，编译器不会报错，但结果不对。<br>建议：写完代码后，用几个典型数据测一遍，尤其测边界情况。<br>比如判断闰年，测 1900（不是）、2000（是）、2024（是）。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 31 结束页 ===== */
    {
      id: 31, type: 'ending', title: '第三讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: { title: '🌟 你已经让程序学会了思考', desc: '程序从此不是流水账，而是能根据条件做判断的"智能体"。<br>下一讲，我们让程序学会重复——循环结构。<br>三大结构，你已经掌握了两个。', variant: 'card-glow' }
      }
    }

  ]
};
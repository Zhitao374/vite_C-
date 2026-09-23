export default {
  title: '第 5 讲 循环结构',
  subtitle: '让程序学会重复',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '循环结构', subtitle: '让程序学会重复', chapterTag: false,
      data: { accentWord: '循环', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 5 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '运算符与分支，让程序学会判断',
      data: {
        items: [
          { icon: '➕', badge: '运算符', title: '四类运算符', desc: '算术、赋值、关系、逻辑', points: ['+ - * / %', '= += -=', '> < == !=', '&& || !'] },
          { icon: '🔀', badge: '分支', title: 'if 家族', desc: '单分支、双分支、多分支', points: ['if (条件)', 'if-else', 'else if 多路'] },
          { icon: '🔢', badge: '进阶', title: 'switch 语句', desc: '多分支的另一种写法', points: ['switch (变量)', 'case 常量', 'break 跳出'] },
          { icon: '⚠️', badge: '易错', title: '常见错误', desc: '= 和 ==、优先级、break', points: ['= 不是 ==', '括号不能漏', '别忘 break'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '如果要计算 1 加到 100，难道要写 100 行加法吗？<br>当然不用。循环可以让程序自动重复执行，一行代码解决千万次计算。<br>今天我们就学习程序的第三种基本结构——循环。<br><br>🔮 <b>回收伏笔</b>：第 4 讲讲过分支只能"走一次"，今天我们学习"走很多次"。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步让程序学会重复',
      data: {
        cards: [
          { number: '01', title: 'while 循环', desc: '条件为真就重复执行' },
          { number: '02', title: 'for 循环', desc: '最常用的循环结构' },
          { number: '03', title: '循环嵌套', desc: '循环里面还有循环' },
          { number: '04', title: 'break 与 continue', desc: '提前跳出或跳过' }
        ],
        extra: { title: '📖 知识扩展 · 三大结构收官', desc: '顺序、分支、循环是程序的三大基本结构。<br>前两讲学完顺序和分支，本讲学完循环，<b>三大结构就齐了</b>。<br><b>顺序</b>是基础，<b>分支</b>让程序会思考，<b>循环</b>让程序会重复。<br>掌握这三件套，程序就能处理任何复杂任务。' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从重复到嵌套',
      data: {
        items: [
          { icon: '🔁', badge: '基础', title: '第一站 · while 循环', desc: '条件为真就重复执行', points: ['while (条件)', '循环三要素', '防止死循环'] },
          { icon: '🔂', badge: '核心', title: '第二站 · for 循环', desc: '最常用、最紧凑的循环结构', points: ['for (初始; 条件; 更新)', '计数循环', '和 while 的选择'] },
          { icon: '🔄', badge: '进阶', title: '第三站 · 循环嵌套', desc: '循环里面还有循环', points: ['外层 + 内层', '九九乘法表', '总次数 = 外 × 内'] },
          { icon: '⚡', badge: '实战', title: '第四站 · break 与 continue', desc: '提前跳出或跳过某次循环', points: ['break 跳出循环', 'continue 跳过本次', '常用场景'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"循环大师"徽章。' }
      }
    },

    /* ===== 05 为什么需要循环 ===== */
    {
      id: 5, type: 'dialog', title: '为什么要循环？', subtitle: '让程序自动重复做事', chapterTag: '第 5 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果要计算 1 加到 100，难道要写 100 行加法吗？' },
          { who: 'robot', text: '不用。用循环，几行代码就能搞定。' },
          { who: 'student', text: '循环是什么？' },
          { who: 'robot', text: '循环就是让计算机<b>重复执行</b>一段代码，直到满足某个条件为止。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '比如打印 1 到 100，只需要写一次 <code>cout</code>，加上循环，计算机就帮你打印 100 次。' },
          { who: 'student', text: '那程序岂不是能自动做很多事？' },
          { who: 'robot', text: '对！循环让程序有了"<b>批量处理</b>"的能力。<br>这就是程序能处理海量数据的原因。' }
        ],
        extra: {
          title: '📖 知识扩展 · 循环 vs 复制粘贴',
          desc: '如果没有循环，想打印 1 到 100 就要写 100 行 <code>cout</code>。<br>有了循环，<b>3 行代码就够了</b>。<br><br>循环是程序员最强大的工具之一。<br><b>计算机每秒能执行上亿次循环</b>，这是人类做不到的。<br><br>学会循环，就能把重复工作交给计算机。<br>程序从此不再是"一条条指令"，而是"批量生产"的工厂。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 while 循环 i 怎么变 ===== */
    {
      id: 6, type: 'evolution', title: 'while 循环：i 一步步长大', subtitle: '循环三要素：初始、条件、更新', chapterTag: '第 5 讲 · 过程演示',
      data: {
        intro: '📖 循环最难理解的是"<b>每次循环，i 都在变</b>"。<br>看 i 怎么从 1 慢慢走到 10，输出序列怎么一步步变长。',
        codeFile: 'codes/lesson-05/while-loop.cpp',
        snippet: 'main',
        steps: [
          {
            focusLines: [6],
            expression: 'i = 1',
            note: '① <b>初始值</b>：循环开始前，i 设为 1。<br>这就是循环的"起点"。'
          },
          {
            focusLines: [7],
            expression: 'i = 1<br>条件 i &lt;= 10 ? <b>✅ 真</b><br>输出：1',
            note: '② <b>循环条件</b>：i = 1 ≤ 10，为真，进入循环体。<br>③ 执行 <code>cout &lt;&lt; i</code>：输出 <b>1</b>。'
          },
          {
            focusLines: [9],
            expression: 'i = 1<br>输出：1<br>→ i++ 后 i = 2',
            note: '④ <b>更新 i</b>：<code>i++</code> 让 i 从 1 变成 2。<br>然后回到条件判断。'
          },
          {
            focusLines: [7],
            expression: 'i = 2<br>条件 i &lt;= 10 ? <b>✅ 真</b><br>输出：1 2',
            note: 'i = 2 ≤ 10，继续循环。<br>输出 <b>2</b>，序列变成 <code>1 2</code>。'
          },
          {
            focusLines: [8],
            expression: 'i = 3 → 4 → ... → 10<br>每次都输出<br>输出：1 2 3 4 5 6 7 8 9 10',
            note: 'i 继续从 3 变到 10，每次输出当前 i。<br>序列慢慢变长：<code>1 2 3 4 5 6 7 8 9 10</code>。'
          },
          {
            focusLines: [7],
            expression: 'i = 11<br>条件 i &lt;= 10 ? <b>❌ 假</b><br>→ 跳出循环',
            note: '🎯 <b>关键拐点</b>：<br>i 更新到 11，<code>11 &lt;= 10</code> 为假，<b>循环结束</b>。<br>这就是"条件决定何时停"。'
          },
          {
            focusLines: [11],
            expression: '输出结果：1 2 3 4 5 6 7 8 9 10',
            note: '✅ 最终输出：<code>1 2 3 4 5 6 7 8 9 10</code>。<br><br><b>循环三要素回顾</b>：<br>① 初始值 <code>i = 1</code><br>② 条件 <code>i &lt;= 10</code><br>③ 更新 <code>i++</code><br>缺一不可——忘了 i++ 就死循环。'
          }
        ],
        extra: {
          title: '💡 三要素缺一不可',
          desc: '<b>忘了初始值</b>：i 是"垃圾值"，循环从哪开始不确定。<br><b>忘了条件</b>：<code>while (true)</code> 会无限循环。<br><b>忘了更新</b>：i 永远是 1，条件永远为真，<b>死循环</b>。<br><br><b>常见错误</b>：<br><code>while (i &lt;= 10) { cout &lt;&lt; i; }</code><br>忘写 i++，程序会卡死。<br>竞赛里这叫 <b>TLE</b>（超时）。<br><br>📖 <b>提前剧透</b>：同样的循环，用 for 写更紧凑——<br><code>for (int i = 1; i &lt;= 10; i++) cout &lt;&lt; i;</code><br>一行搞定三要素。<br>下一屏我们看 for 的写法。<br><br>🔮 <b>伏笔</b>：为什么死循环会"超时"？因为 CPU 一直在跑，时间耗光了。<br>第 36 讲"复杂度"会讲"程序跑多久"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 for 循环 ===== */
    {
      id: 7, type: 'code-split', title: 'for 循环 · 三要素写在一行', subtitle: '最常用、最紧凑的循环',
      data: {
        intro: '📖 <b>语法</b>：<code>for (初始; 条件; 更新) { 循环体 }</code>。<br>三要素用<b>分号</b>分隔，写在同一行。',
        codeFile: 'codes/lesson-05/for-loop.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'for (三要素)', desc: '初始、条件、更新写在同一行' },
          { line: 6, title: '分号分隔', desc: '三部分用分号分隔，不是逗号' },
          { line: 6, title: 'i++', desc: '每次循环 i 加 1' },
          { line: 7, title: 'cout', desc: '循环体输出当前 i' }
        ],
        output: '1 2 3 4 5 6 7 8 9 10',
        extra: {
          title: '💡 for 的三个细节',
          desc: '① 变量 i 可以在 for 里定义：<code>for (int i = 0; ...)</code>，离开循环后 i 就消失<br>② 条件不写默认为真：<code>for (;;)</code> 是死循环<br>③ 更新可以是任意表达式：<code>i += 2</code> 也可以，比如输出所有偶数<br><br><b>竞赛惯例</b>：计数循环优先用 for，写起来更紧凑。<br><br><b>对比 while</b>：<br><code>int i = 1;</code><br><code>while (i &lt;= 10) { ...; i++; }</code><br>与<br><code>for (int i = 1; i &lt;= 10; i++) { ... }</code><br>完全等价——但 for 更清晰。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 while vs for ===== */
    {
      id: 8, type: 'compare', title: 'while vs for', subtitle: '什么时候用哪个',
      data: {
        groups: [
          { wrong: '已知循环次数 → 用 for', right: '循环次数未知 → 用 while' },
          { wrong: '例：1 到 100 求和', right: '例：直到输入 0 才停止' },
          { wrong: '三要素集中，一目了然', right: '只关心条件，更灵活' },
          { wrong: '竞赛中的主力', right: '处理未知长度的输入' }
        ],
        extra: {
          title: '📖 选择建议',
          desc: '<b>用 for</b>：循环次数已知，或需要计数变量。<br><b>用 while</b>：循环次数不确定，只看条件。<br><br>两者可以互相转换，选更清晰的那个。<br><br><b>口诀</b>：<b>次数已知用 for，次数未知用 while</b>。<br><br>📖 <b>知识扩展 · C++11 的范围 for</b><br>C++11 引入了一种"范围 for"，可以自动遍历数组或容器：<br><code>for (int x : arr) { ... }</code><br>不需要写下标，直接拿到每个元素。<br>这是"现代 C++"的写法，等学数组时详细介绍。<br><br><b>现在记住</b>：for 和 while 是基础，范围 for 是糖。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 for 循环答疑 ===== */
    {
      id: 9, type: 'dialog', title: 'for 循环答疑', subtitle: '小C回答常见疑问', chapterTag: '第 5 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，为什么 for 里可以写 <code>int i = 1</code>？<br>这个 i 是哪里来的？' },
          { who: 'robot', text: '这是 <b>for 的语法糖</b>——<br>你可以在 for 的初始化部分直接定义变量。<br>离开循环后，i 就"消失"了。' },
          { who: 'student', text: '消失是什么意思？' },
          { who: 'robot', text: '意思是 i 只在 for 循环里"存在"。<br>循环外的代码，访问不到 i。<br>这叫<b>变量的作用域</b>。' },
          { who: 'student', text: '那 <code>i++</code> 和 <code>++i</code> 有什么区别？' },
          { who: 'robot', text: '单独用时没区别——都是 i 加 1。<br>只有一种场景有区别：<br>把它们<b>放进表达式</b>时——<br>· <code>x = i++</code>：先赋值，后加 1<br>· <code>x = ++i</code>：先加 1，后赋值' },
          { who: 'student', text: '那竞赛里用哪个？' },
          { who: 'robot', text: '看习惯。大多数选手用 <code>i++</code>。<br>因为它是"经典写法"，早年的 C 语言教程都用 i++。<br>两者性能没差异，选一个用顺手的就行。' },
          { who: 'student', text: '明白了。' },
          { who: 'robot', text: '总结一句：<br><b>单独用没区别，放进表达式才有区别</b>。<br>初学者用 i++ 就好，不会踩坑。' }
        ],
        extra: {
          title: '💡 作用域与自增的两个细节',
          desc: '<b>① 变量作用域</b>：<br><code>for (int i = 0; i &lt; n; i++) { ... }</code><br>这里的 i 只在 for 循环里有效。循环外的代码访问 i 会报错"未定义"。<br><br><b>② 两种自增的细微差别</b>：<br><code>i++</code>（后置）：先用 i 的值，再加 1<br><code>++i</code>（前置）：先加 1，再用 i 的值<br><br>只有放进表达式时才看得出区别：<br><code>int i = 5;</code><br><code>int a = i++;  // a = 5, i = 6</code><br><code>int b = ++i;  // i = 7, b = 7</code><br><br><b>竞赛建议</b>：<br>· 循环更新写 <code>i++</code>——不会出错<br>· 放进表达式时想清楚前置后置的区别<br><br><b>为什么大多数人用 i++？</b><br>历史原因——C 语言早期教程约定用 i++。后来就成了惯例。<br>两种写法性能一样，选顺手的即可。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 过渡页 ===== */
    {
      id: 10, type: 'transition', title: '第三站 · 循环进阶', subtitle: '嵌套、break、continue',
      data: { note: '接下来你将学会循环嵌套、break 与 continue，以及循环的实战应用' }
    },

    /* ===== 11 循环嵌套 ===== */
    {
      id: 11, type: 'code-split', title: '循环嵌套 · 循环里还有循环', subtitle: '外层走一步，内层走完整圈',
      data: {
        intro: '📖 循环里再写一个循环，叫<b>嵌套循环</b>。<br>外层每走一步，内层走完整的一圈。',
        codeFile: 'codes/lesson-05/nested-loop.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: '外层循环 i', desc: 'i 从 1 到 3，共 3 次' },
          { line: 7, title: '内层循环 j', desc: 'j 从 1 到 4，共 4 次' },
          { line: 8, title: '循环体', desc: '输出 (i,j)' },
          { line: 10, title: 'endl', desc: '内层结束后换行' }
        ],
        output: '(1,1) (1,2) (1,3) (1,4)\n(2,1) (2,2) (2,3) (2,4)\n(3,1) (3,2) (3,3) (3,4)',
        extra: {
          title: '💡 执行次数',
          desc: '外层走 1 步，内层走 1 整圈。<br>外层走 3 步，内层总共走 <b>3 × 4 = 12 次</b>。<br><br><b>总次数 = 外层次数 × 内层次数</b>。<br><br>这是竞赛高频考点，初赛经常让你算循环执行了多少次。<br><br><b>例子</b>：两层 n 次循环，总次数是 n² 次。<br>比如 3 层 n 次，就是 n³ 次。<br>层数越深，次数增长越快。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 九九乘法表 ===== */
    {
      id: 12, type: 'code-split', title: '循环嵌套实例 · 九九乘法表', subtitle: '两个 for 画出三角形',
      data: {
        intro: '📖 内层循环的条件可以<b>依赖外层变量</b>——<br>比如 <code>j &lt;= i</code>，让内层每行越来越长。',
        codeFile: 'codes/lesson-05/multiplication-table.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: '外层 i', desc: '代表行号，从 1 到 9' },
          { line: 7, title: '内层 j', desc: 'j 从 1 到 i，所以每行越来越长' },
          { line: 8, title: '输出', desc: '格式：j*i=结果' },
          { line: 10, title: '换行', desc: '每行结束后换行' }
        ],
        output: '1*1=1\n1*2=2 2*2=4\n1*3=3 2*3=6 3*3=9\n...',
        extra: {
          title: '📖 交叉学科 · 数学',
          desc: '九九乘法表是中国古代数学的瑰宝。<br>早在<a href="https://baike.baidu.com/item/春秋战国" target="_blank" class="wiki-link">春秋战国</a>时期就有"九九歌"，比欧洲早了 <b>1000 多年</b>。<br><br>用循环嵌套，9 行代码就能画出这张表。<br>这就是计算机的威力——<b>把人脑的工作变成程序</b>。<br><br><b>变化的模式</b>：<br>· 内层固定次数 → 矩形<br>· 内层 <code>j &lt;= i</code> → 三角形<br>· 内层 <code>j &lt;= n - i</code> → 倒三角形<br>· 内层复杂规律 → 各种图案<br><br>图案打印题，就是考"找规律"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 嵌套答疑 ===== */
    {
      id: 13, type: 'dialog', title: '循环嵌套答疑', subtitle: '小C用排队打比方', chapterTag: '第 5 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，循环嵌套好难懂，外层内层老分不清。' },
          { who: 'robot', text: '你可以想象排队：外层是"队伍"，内层是"队伍里的每个人"。' },
          { who: 'student', text: '怎么说？' },
          { who: 'robot', text: '外层走一步，相当于换一支队伍；<br>内层走一圈，相当于把队伍里每个人点一遍。' },
          { who: 'student', text: '那如果外层 3 支队伍，每队 4 人？' },
          { who: 'robot', text: '总共点 <b>3 × 4 = 12 次</b>。这就是嵌套循环的执行次数。' },
          { who: 'student', text: '那什么时候用嵌套？' },
          { who: 'robot', text: '处理二维数据，比如矩阵、棋盘、图案打印。<br>只要问题有"两层循环"的感觉，就用嵌套。' }
        ],
        extra: {
          title: '💡 嵌套的两种常见形态',
          desc: '<b>形态 1：固定次数</b>（如打印 3×4 的矩形）<br>外层 3 次，内层 4 次，总 12 次。<br><br><b>形态 2：可变次数</b>（如打印三角形）<br>外层 9 次，内层从 1 到 i，总次数是 1+2+...+9 = 45 次。<br><br>第一种好算，第二种需要观察内层次数随外层的变化。<br><br><b>竞赛经验</b>：嵌套循环是算法基础，几乎所有二维问题都要用到。<br>初赛题目经常让你数"总执行次数"——<br>固定次数直接乘，可变次数要列出公式求和。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 break 与 continue ===== */
    {
      id: 14, type: 'compare', title: 'break 与 continue', subtitle: '跳出整圈 vs 跳过本次',
      data: {
        groups: [
          { wrong: 'break：遇到 5 就跳出整个循环', right: 'continue：遇到偶数就跳过本次' },
          { wrong: 'for (i=1; i&lt;=10; i++) {<br>&nbsp;&nbsp;if (i == 5) break;<br>&nbsp;&nbsp;cout &lt;&lt; i;<br>}', right: 'for (i=1; i&lt;=10; i++) {<br>&nbsp;&nbsp;if (i % 2 == 0) continue;<br>&nbsp;&nbsp;cout &lt;&lt; i;<br>}' },
          { wrong: '输出：1 2 3 4', right: '输出：1 3 5 7 9' },
          { wrong: 'break 是"我不干了"', right: 'continue 是"这次不算，继续"' }
        ],
        extra: {
          title: '💡 break 的常见场景',
          desc: '① <b>查找</b>：找到目标就跳出，不用继续找<br>② <b>菜单</b>：用户输入"退出"就跳出主循环<br>③ <b>限时</b>：超时后终止循环<br><br><b>记忆</b>：break 跳出整个循环，continue 只跳过本次。<br><br><b>陷阱</b>：break 只能跳出<b>一层</b>循环。<br>嵌套循环里，break 只跳出<b>最内层</b>，外层继续走。<br>想跳出多层，需要额外技巧（后续讲）。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 常见错误 ===== */
    {
      id: 15, type: 'compare', title: '循环常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '忘写 i++，死循环', right: '每次循环更新 i' },
          { wrong: 'for 里用逗号分隔', right: 'for 里用分号分隔' },
          { wrong: 'while (i = 10) 少个等号', right: 'while (i == 10)' },
          { wrong: 'break 写在循环外', right: 'break 必须在循环内' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>死循环</b>：忘记更新，条件永远为真。<br>② <b>分号</b>：for 的三部分必须用分号分隔，不是逗号。<br>③ <b>= 与 ==</b>：赋值和判断的区别。<br>④ <b>break 位置</b>：只能在循环或 switch 里用。<br><br><b>调试循环的三板斧</b>：<br>1. 打印中间值：<code>cout &lt;&lt; "i=" &lt;&lt; i &lt;&lt; endl;</code><br>2. 检查边界：i 从几到几，最后几次是否正常<br>3. 小数据测试：n = 1、2、3 手动推一遍',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 初赛渗透 ===== */
    {
      id: 16, type: 'dialog', title: '初赛小知识：循环次数', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 5 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛真的会考循环吗？' },
          { who: 'robot', text: '会，而且是最常见的题型之一——<b>给代码，数执行次数</b>。' },
          { who: 'student', text: '怎么算？' },
          { who: 'robot', text: '看循环变量的变化范围。<br>比如 <code>for (i=1; i&lt;=10; i++)</code>，i 从 1 到 10，共 10 次。' },
          { who: 'student', text: '如果是嵌套呢？' },
          { who: 'robot', text: '外层乘内层。比如外层 5 次，内层 8 次，总共 5 × 8 = 40 次。' },
          { who: 'student', text: '有没有陷阱？' },
          { who: 'robot', text: '有！看 <code>&lt;</code> 还是 <code>&lt;=</code>：<br><code>i=0; i&lt;n</code> → n 次<br><code>i=1; i&lt;=n</code> → n 次<br><code>i=1; i&lt;n</code> → n-1 次<br>边界差一次，初赛经常考。' }
        ],
        extra: {
          title: '📖 常见循环次数速查',
          desc: '<b>for (i=0; i&lt;n; i++)</b> → n 次<br><b>for (i=1; i&lt;=n; i++)</b> → n 次<br><b>for (i=0; i&lt;=n; i++)</b> → n+1 次<br><b>for (i=1; i&lt;n; i++)</b> → n-1 次<br><br><b>记忆口诀</b>：<br><code>&lt;</code> 看差值，<code>&lt;=</code> 看差值加一。<br><br><b>嵌套总次数</b>：<br>外层 × 内层（若内层次数固定）<br>逐层累加（若内层次数随外层变化）<br><br><b>初赛高频</b>：每年至少 1—2 道。<br>把这张表背下来，送分题稳拿。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 练习1：求和 ===== */
    {
      id: 17, type: 'level-map', title: '课堂练习1：求和', subtitle: '用循环计算 1 + 2 + ... + n', chapterTag: '第 5 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个正整数 <code>n</code>，计算 1 + 2 + ... + n 的和。<br>输入样例：<code>100</code>　输出样例：<code>5050</code>', timer: '⏱ 限时 6 分钟' },
        hints: [
          '用一个变量 <code>sum</code> 累加',
          'sum 初始化为 0',
          '循环变量 i 从 1 到 n'
        ],
        answer: { codeFile: 'codes/lesson-05/sum.cpp' },
        analysis: { title: '📖 解析', desc: 'sum 就像一个<b>累加器</b>，每次循环把当前的 i 加进去。<br>初始 sum = 0，循环结束后 sum 就是 1+2+...+n。<br><br><b>为什么初始化为 0？</b><br>因为 0 加任何数都不变，是"加法的起点"。' },
        extra: { title: '📖 知识扩展 · 高斯的故事', desc: '200 多年前，数学家<a href="https://baike.baidu.com/item/高斯" target="_blank" class="wiki-link">高斯</a> 9 岁时，老师让算 1 加到 100。<br>其他孩子都在埋头苦算。小高斯发现 1+100 = 101，2+99 = 101……共 50 对，所以答案 = 50 × 101 = 5050。<br>这就是等差数列求和公式。<br><br><b>但计算机不用想捷径</b>——它直接循环 100 次，一样得出 5050。<br>计算机的优势不是聪明，而是<b>快</b>。<br><br><b>算法的价值</b>：<br>高斯的方法 1 步算出，O(1)；<br>循环的方法跑 100 步，O(n)。<br>数据越大，"聪明算法"越值钱。', variant: 'card-primary' }
      }
    },

    /* ===== 18 练习2：阶乘 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习2：阶乘', subtitle: '计算 n! = 1 × 2 × ... × n', chapterTag: '第 5 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个正整数 <code>n</code>，输出 n 的阶乘 <code>n!</code>。<br>输入样例：<code>5</code>　输出样例：<code>120</code>', timer: '⏱ 限时 6 分钟' },
        hints: [
          '用一个变量 <code>fact</code> 累乘',
          'fact 初始化为 1（不能是 0）',
          '循环变量 i 从 1 到 n',
          'n 可能会大，用 <code>long long</code>'
        ],
        answer: { codeFile: 'codes/lesson-05/factorial.cpp' },
        analysis: { title: '📖 解析', desc: '累乘和累加思路一样，只是初始值不同。<br><b>累加</b>：初始 0，因为加 0 不影响。<br><b>累乘</b>：初始 1，因为乘 1 不影响。<br>如果 fact = 0，结果永远是 0。<br><br><b>为什么用 long long？</b><br>阶乘增长极快：13! 就超过 int 范围（21 亿）。<br>用 long long 能撑到 20!。' },
        extra: { title: '💡 阶乘的增长速度', desc: '阶乘是"爆炸式增长"的典型：<br>· 5! = 120<br>· 10! = 362 万<br>· 13! = 62 亿（超过 int）<br>· 20! = 2.4 × 10¹⁸（long long 上限）<br>· 100! ≈ 9.3 × 10¹⁵⁷（天文数字）<br><br><b>竞赛应用</b>：排列组合题会大量用到阶乘。<br>n 很大时要用"取模"技巧，第 40 讲讲。<br><br><b>记忆</b>：累乘的初始值必须为 <b>1</b>，不是 0。', variant: 'card-primary' }
      }
    },

    /* ===== 19 练习3：找最大值 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习3：找最大值', subtitle: '循环比较，找出最大的数', chapterTag: '第 5 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '第一行输入整数 <code>n</code>，第二行输入 n 个整数，输出其中的最大值。<br>输入样例：<code>5</code> 然后 <code>3 7 2 9 5</code>　输出样例：<code>9</code>', timer: '⏱ 限时 8 分钟' },
        hints: [
          '用变量 <code>maxVal</code> 记录当前最大值',
          '初始化为一个很小的数，如 <code>-1e9</code>（-10 亿）',
          '每次读入新数，如果更大就更新',
          '可以在循环里直接 <code>cin &gt;&gt; x</code>，不用数组'
        ],
        answer: { codeFile: 'codes/lesson-05/max.cpp' },
        analysis: { title: '📖 解析', desc: 'maxVal 初始值必须很小，才能被第一个数"打败"。<br>如果初始值写 0，那遇到全是负数的输入，结果就错了。<br><br><b>常用技巧</b>：初始化为 <code>-1e9</code>（-10 亿）。<br>竞赛数据范围通常在 ±10 亿以内，用 -10 亿一定安全。<br><br><b>口诀</b>：找最大值，初始值宁小勿大；找最小值，初始值宁大勿小。' },
        extra: { title: '💡 循环读入的技巧', desc: '可以在循环里直接 <code>cin &gt;&gt; x</code>，不需要数组。<br>因为每次读完立即比较，用完就丢。<br>这样处理 <b>100 万个数</b>也不占内存。<br><br><b>竞赛常用</b>：边读边处理，比先存数组再处理更省内存。<br><br><b>什么时候必须用数组？</b><br>需要"回头看"的时候——逆序输出、排序、找第 k 大。<br>这些题必须先把数据存下来。', variant: 'card-primary' }
      }
    },

    /* ===== 20 练习小结 ===== */
    {
      id: 20, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 5 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，三道练习我都做完了。' },
          { who: 'robot', text: '很好。说说你的发现。' },
          { who: 'student', text: '练习 1 和 2 都是"循环 + 一个变量"，<br>一个累加、一个累乘。' },
          { who: 'robot', text: '对。这就是<b>累加器</b>和<b>累乘器</b>的模式——<br>循环里的经典套路。' },
          { who: 'student', text: '练习 3 用了 if 判断，和循环结合。' },
          { who: 'robot', text: '对。<b>循环 + 分支</b>是程序的黄金组合。<br>循环遍历所有数据，分支处理每个数据——<br>这是竞赛题最常见的结构。' },
          { who: 'student', text: '那什么时候用数组？' },
          { who: 'robot', text: '需要"回头看"的时候。<br>练习 3 是边读边比，用完就丢，不用数组。<br>但如果要"逆序输出"，就必须先把所有数存下来。' }
        ],
        extra: {
          title: '💡 三个核心模式',
          desc: '<b>模式 1：累加</b><br><code>sum = 0;</code><br><code>for (...) sum += x;</code><br><br><b>模式 2：累乘</b><br><code>fact = 1;</code><br><code>for (...) fact *= x;</code><br><br><b>模式 3：极值</b><br><code>maxVal = -1e9;</code><br><code>for (...) if (x &gt; maxVal) maxVal = x;</code><br><br>这三个模式，几乎所有循环题都用得到。<br><b>记熟它们，就能应对 80% 的循环题。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 趣味扩展 ===== */
    {
      id: 21, type: 'grid', title: '🎨 难题后的放松 · 循环的真实应用', subtitle: '循环无处不在',
      chapterTag: '第 5 讲 · 知识讲解',
      data: {
        cards: [
          { icon: '🎮', title: '游戏主循环', desc: '游戏每秒运行 <b>60 次</b>画面刷新<br>每次刷新都在循环里更新<br>角色位置、血量、碰撞检测<br><b>没有循环，游戏无法运行</b>' },
          { icon: '📊', title: '数据处理', desc: '统计 <b>100 万条</b>记录<br>逐条读取、计算、汇总<br>循环让计算机"批量处理"<br><b>人做不到的事，计算机一秒完成</b>' },
          { icon: '🔬', title: '科学计算', desc: '物理模拟、天气预报、基因分析<br>用循环一步步逼近答案<br><b>数值计算</b>的核心是循环<br>模拟精度越高，循环次数越多' },
          { icon: '🤖', title: '人工智能', desc: '神经网络训练循环 <b>上万次</b><br>每次调整权重、计算误差<br><b>循环是 AI 训练的引擎</b><br>GPT 训练需要循环数月' }
        ],
        extra: {
          title: '💡 循环：计算机的"超能力"',
          desc: '人类做重复工作会累，计算机不会。<br><b>人类每秒最多做 10 次计算，计算机每秒能做上亿次</b>。<br><br>这就是为什么计算机能解决人类无法解决的复杂问题。<br><br><b>一个有趣的对比</b>：<br>1946 年，世界第一台电子计算机 <a href="https://baike.baidu.com/item/ENIAC" target="_blank" class="wiki-link">ENIAC</a> 每秒能算 5000 次。<br>今天的手机芯片，每秒能算几十亿次——<b>快了 100 万倍</b>。<br>但即使这么快，程序还得靠循环才能"批量工作"。<br><br><b>学会循环，你就掌握了计算机的超能力。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 课堂小测 ===== */
    {
      id: 22, type: 'quiz', title: '课堂小测', subtitle: '循环结构与次数',
      chapterTag: '第 5 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 循环结构',
            question: '下面代码的循环体会执行多少次？',
            questionCode: `int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}`,
            options: [
              { label: 'A', text: '99 次' },
              { label: 'B', text: '100 次', correct: true },
              { label: 'C', text: '101 次' },
              { label: 'D', text: '无限次' }
            ],
            analysis: 'i 从 1 开始，到 100 结束（包含 100），<b>共 100 次</b>。<br>计算公式：循环次数 = 结束值 - 起始值 + 1 = 100 - 1 + 1 = 100。<br>这是初赛最高频的题型之一。<br>对应本讲 slide-16"初赛渗透：循环次数"。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 初赛真题练习 · while 循环',
            question: '下面代码的输出是什么？',
            questionCode: `int i = 0;
while (i < 5) {
    cout << i << " ";
    i += 2;
}`,
            options: [
              { label: 'A', text: '0 1 2 3 4' },
              { label: 'B', text: '0 2 4', correct: true },
              { label: 'C', text: '0 2 4 6' },
              { label: 'D', text: '0' }
            ],
            analysis: '每次循环 i 加 2，依次输出 0、2、4。<br>当 i = 6 时，<code>i &lt; 5</code> 为假，循环结束。<br><br><b>关键</b>：<code>i += 2</code> 不是 <code>i++</code>，步长是 2。<br>所以输出 "0 2 4"，选 B。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 嵌套循环',
            question: '下面代码会输出多少个 <code>*</code>？',
            questionCode: `for (int i = 1; i <= 3; i++)
    for (int j = 1; j <= 4; j++)
        cout << "*";`,
            options: [
              { label: 'A', text: '7 个' },
              { label: 'B', text: '12 个', correct: true },
              { label: 'C', text: '3 个' },
              { label: 'D', text: '4 个' }
            ],
            analysis: '外层 3 次，内层 4 次，共 3 × 4 = <b>12 次</b>。<br><b>嵌套循环的总次数 = 外层 × 内层</b>（内层次数固定时）。<br><br>如果内层次数随外层变化（如 <code>j &lt;= i</code>），要逐层累加，不一定是乘法。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第三章',
            question: '在 C++ 中，<code>break</code> 和 <code>continue</code> 的效果完全一样。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '两者完全不同：<br><b>break</b>：跳出<b>整个循环</b>，不再执行循环。<br><b>continue</b>：跳过<b>本次循环</b>，继续下一次循环。<br><br>记忆口诀：break 是"我不干了"，continue 是"这次不算，继续"。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第三章',
            question: '在 C++ 中，<code>while (true) { }</code> 是一个死循环，程序会一直执行下去。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '<code>while (true)</code> 的条件永远为真，所以循环体会一直执行，形成"死循环"。<br><br>在竞赛中，意外的死循环会触发 <b>TLE</b>（超时）。<br>但<b>故意的死循环</b>也有用武之地，比如服务器监听、游戏主循环。<br>关键是<b>循环体里要有跳出机制</b>（如 break、return）。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛循环题三大考点',
          desc: '<b>① 循环次数</b>：看起始值、结束值、步长<br><b>② 输出内容</b>：逐次模拟，或找规律<br><b>③ 嵌套总次数</b>：外层 × 内层（若内层固定）<br><br>这三类题占了初赛循环题的 <b>90%</b>。<br>多练几道，就能秒杀。<br><br><b>建议</b>：做初赛真题时，把每次循环的变量值写在纸上，一步步推。<br>不要心算，容易错。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 今日总结 ===== */
    {
      id: 23, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '让程序重复做事，才是真正的自动化。',
        author: '—— 循环结构第一课',
        points: [
          'while 循环：条件为真就重复',
          'for 循环：三要素写在一行，最常用',
          '循环三要素：初始、条件、更新',
          '循环嵌套：外层走一步，内层走一圈',
          'break：提前跳出循环',
          'continue：跳过本次循环'
        ],
        highlight: { title: '📌 关键口诀', desc: 'while 看条件，for 三要素；初始、条件、更新，缺一不可；嵌套外乘内，break 跳整圈；continue 跳一次，记住别搞混。' },
        extra: {
          title: '💡 三大结构已掌握',
          desc: '顺序、分支、循环——程序的三大基本结构，你已经全部学会。<br>从下一讲开始，我们进入<b>批量存储数据</b>的世界——数组。<br><br>数组 + 循环 = 竞赛解题的黄金组合。<br><br>🔮 <b>伏笔</b>：<br>· 循环能处理海量数据，但数据本身存哪？→ 第 6 讲数组<br>· 为什么有些循环很快，有些很慢？→ 第 36 讲复杂度',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 课后作业 ===== */
    {
      id: 24, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P5722', link: 'https://www.luogu.com.cn/problem/P5722', desc: '<b>数列求和</b><br>考察：for 循环、累加<br>难度：★<br>目标：读入 n 个数，输出和' },
          { icon: '🟢', title: '基础 2 · P5721', link: 'https://www.luogu.com.cn/problem/P5721', desc: '<b>数字直角三角形</b><br>考察：循环嵌套、输出格式<br>难度：★★<br>目标：打印数字三角形' },
          { icon: '🔴', title: '挑战 · P5727', link: 'https://www.luogu.com.cn/problem/P5727', desc: '<b>冰雹猜想</b><br>考察：while 循环、条件判断<br>难度：★★★<br>目标：反复迭代直到 1' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 下节预告 ===== */
    {
      id: 25, type: 'radial', title: '下节预告', subtitle: '第 6 讲 · 一维数组',
      data: {
        center: '数组',
        items: [
          { text: '什么是数组' },
          { text: '定义与访问' },
          { text: '遍历与统计' },
          { text: '常见错误' }
        ],
        extra: {
          title: '💡 批量存储数据',
          desc: '循环能处理海量数据，但数据存哪呢？<br>如果输入 100 个数，用 100 个变量吗？<br>下一讲，我们学习能一次存很多数据的"数组"。<br>数组 + 循环 = 竞赛解题的黄金组合。<br><br>🔮 <b>远期彩蛋</b>：数组为什么访问快？因为它是连续内存。<br>如果不连续呢？第 27 讲"链表"会告诉你另一种可能。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 答疑时间 ===== */
    {
      id: 26, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 5 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: 'for 和 while 到底用哪个？' },
          { who: 'robot', text: '循环次数确定用 for，次数不确定用 while。<br>其实可以互换，选读起来更清晰的。' },
          { who: 'student', text: '为什么我的循环会死循环？' },
          { who: 'robot', text: '检查三要素。最常见的是忘写更新语句 i++ 或 i--。' },
          { who: 'student', text: 'break 和 continue 区别是什么？' },
          { who: 'robot', text: 'break 跳出整个循环，continue 只跳过本次。<br>画个图就懂了：<br>break 是"全都不干了"，continue 是"这次不算"。' },
          { who: 'student', text: '循环嵌套很难懂怎么办？' },
          { who: 'robot', text: '想象排队：外层是队伍，内层是每个人。<br>外层动一步，内层所有人都走一遍。<br>多画几遍就懂了。' },
          { who: 'student', text: '循环执行次数有什么用？' },
          { who: 'robot', text: '初赛必考。而且理解执行次数，能帮你估算程序跑多快。<br>n 次循环 vs n² 次循环，速度差很多。<br>这就是"复杂度"的雏形——第 36 讲会详细讲。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '循环是编程的核心。<br>初学者至少要写 <b>50 道循环题</b>才能熟练。<br><br>练习时注意：<br>· 每道题先想"循环几次"<br>· 再想"每次做什么"<br>· 最后想"循环结束输出什么"<br><br>这个思考顺序，能帮你避免大部分 bug。<br>别怕错，每错一次就进步一次。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 本讲英文单词 ===== */
    {
      id: 27, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 5 讲 · 复习',
      data: {
        words: [
          { word: 'while',    cn: '当……时', pron: '/waɪl/',            origin: '英文原意"当……时"',   category: '关键字' },
          { word: 'for',      cn: '为了',   pron: '/fɔːr/',            origin: '英文原意"为了"',      category: '关键字' },
          { word: 'break',    cn: '打断',   pron: '/breɪk/',           origin: '英文原意"打破"',      category: '关键字' },
          { word: 'continue', cn: '继续',   pron: '/kənˈtɪnjuː/',       origin: '英文原意"继续"',      category: '关键字' },
          { word: 'loop',     cn: '循环',   pron: '/luːp/',            origin: '英文原意"环、圈"',    category: '概念' },
          { word: 'iteration', cn: '迭代',  pron: '/ˌɪtəˈreɪʃn/',       origin: '英文原意"重复"',      category: '概念' }
        ],
        extra: {
          title: '💡 记忆法 · 英文原意',
          desc: '<b>关键字</b>（C++ 语法，必须记牢）：<br><code>while</code> = 当……时（条件成立时循环）<br><code>for</code> = 为了（为了做某事而循环）<br><code>break</code> = 打断（跳出循环）<br><code>continue</code> = 继续（跳过本次）<br><br><b>概念</b>（理解意思就行）：<br><code>loop</code> = 循环（圈）<br><code>iteration</code> = 迭代（每次重复叫一次迭代）<br><br><b>易错拼写</b>：<br>· <code>while</code> 不是 <code>whlie</code><br>· <code>continue</code> 有 8 个字母，容易拼错<br>· <code>iteration</code> 两个 t、两个 i<br><br><b>延伸</b>：<br>· <code>endless loop</code> = 死循环<br>· <code>infinite loop</code> = 无限循环（同义）',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 知识清单 ===== */
    {
      id: 28, type: 'grid', title: '第 5 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 5 讲 · 复习',
      data: {
        cards: [
          { icon: '🔁', title: 'while 循环', desc: '<b>语法</b>：while (条件) { ... }<br><b>初始</b>：循环外定义<br><b>更新</b>：循环体内写<br><b>陷阱</b>：忘写 i++ 会死循环' },
          { icon: '🔂', title: 'for 循环', desc: '<b>语法</b>：for (初始; 条件; 更新) { ... }<br><b>三要素</b>：初始、条件、更新<br><b>分号</b>：三部分用分号分隔<br><b>优势</b>：计数循环首选' },
          { icon: '🔄', title: '循环嵌套', desc: '<b>语法</b>：for 里套 for<br><b>执行</b>：外层 1 步，内层 1 圈<br><b>总次数</b>：外层 × 内层<br><b>应用</b>：九九乘法表、图案打印' },
          { icon: '⚡', title: 'break 与 continue', desc: '<b>break</b>：跳出整个循环<br><b>continue</b>：跳过本次，下次继续<br><b>位置</b>：必须在循环内<br><b>区别</b>：全不干 vs 这次不算' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<b>口诀</b>：while 看条件，for 三要素；初始、条件、更新，缺一不可；嵌套外乘内，break 跳整圈；continue 跳一次，记住别搞混。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P5722 数列求和<br><b>⭐⭐ 进阶</b>：P5721 数字直角三角形<br><b>⭐⭐⭐ 挑战</b>：P5727 冰雹猜想<br><b>🔗 延伸</b>：洛谷搜索"入门 3"，挑 3 道循环题练手。<br><br><b>小 C 彩蛋</b>：世界第一台电子计算机 <a href="https://baike.baidu.com/item/ENIAC" target="_blank" class="wiki-link">ENIAC</a> 每秒只能算 5000 次。<br>现在的电脑每秒能算几十亿次。<br>你写的 for 循环，计算机 1 秒能跑上亿遍。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 29 小结过渡 ===== */
    {
      id: 29, type: 'transition', title: '循环结构 · 小结', subtitle: '你已经让程序学会重复',
      data: { note: '下一讲，我们将学习批量存储数据的工具——数组' }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第五讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 三大结构已掌握',
          desc: '顺序、分支、循环，程序的三大基本结构你已经全部学会。<br>从下一讲开始，我们进入数据结构与算法的世界。<br><br>数组、字符串、函数、递归——<br>这些工具能让你的程序变得更强大、更灵活。<br>编程的大门，才刚刚打开。',
          variant: 'card-glow'
        }
      }
    }

  ]
};
export default {
  title: "第 7 讲 字符串基础",
  subtitle: "一串字符的容器",
  total: 28,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1,
      type: "cover",
      title: "字符串基础",
      subtitle: "一串字符的容器",
      chapterTag: false,
      data: {
        accentWord: "字符串",
        meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 7 讲"],
      },
    },

    /* ===== 2 上节回顾 ===== */
    {
      id: 2,
      type: "timeline",
      variant: "review",
      title: "上节课回顾",
      subtitle: "一维数组，批量数据的好帮手",
      data: {
        items: [
          { icon: "📦", badge: "基础", title: "数组概念", desc: "一排储物柜，同类型连续存放", points: ["同类型", "连续存储", "下标访问"] },
          { icon: "🔢", badge: "核心", title: "定义与访问", desc: "int a[100];", points: ["下标 0 到 99", "类型 名字[长度];", "数组宁开大点"] },
          { icon: "🔄", badge: "关键", title: "数组与循环", desc: "遍历、求和、找最大值", points: ["for (i=0; i<n; i++)", "边读边处理", "逆序输出"] },
          { icon: "⚠️", badge: "易错", title: "常见错误", desc: "越界、未初始化、数组太小", points: ["下标 < 长度", "sum = 0", "按范围开大"] },
        ],
        extra: {
          title: "💡 今天的新问题",
          desc: '数组能存整数，那文字呢？<br>"Hello" 这 5 个字母，怎么存？<br>今天我们就学习能存一串文字的"字符串"。<br><br>🔮 <b>回收伏笔</b>：第 6 讲说过"字符串本质是字符数组"，今天揭晓。',
        },
      },
    },

    /* ===== 3 本节课目标 ===== */
    {
      id: 3, type: "grid", title: "本节课目标", subtitle: "四步掌握文字的存储",
      data: {
        cards: [
          { number: "01", title: "理解字符", desc: "字符 'A' 和字符串 \"A\" 的区别" },
          { number: "02", title: "两种定义", desc: "字符数组 char[] 和 string 类型" },
          { number: "03", title: "读入与遍历", desc: "cin、getline、下标访问" },
          { number: "04", title: "实战应用", desc: "统计字符、回文判断、逆序输出" },
        ],
        footer: '<b>📌 灵魂拷问</b>：如果某天你要做一款聊天软件，你怎么把同学发的一整句话存进电脑里？<br>今天，程序将学会处理“人类的语言”。'
      },
    },

    /* ===== 4 为什么要学字符串 ===== */
    {
      id: 4, type: "dialog", title: "为什么要学字符串？", subtitle: "文字也是一种数据", chapterTag: "第 7 讲 · 概念理解",
      data: {
        lines: [
          { who: "student", text: "小 C，数组能存整数，那文字怎么存？" },
          { who: "robot", text: '用字符串。字符串就是一串字符的容器，比如 "Hello"、"China"、"2024"。' },
          { who: "student", text: "我们平时写代码不是为了算数吗？为什么要处理文字？" },
          { who: "robot", text: "竞赛里很多题目都是文字处理。<br>比如统计一篇文章里某个单词出现几次、判断一个单词是不是回文、给密码加密。" },
          { who: "student", text: "那字符串和数组有什么关系？" },
          { who: "robot", text: '字符串本质上就是"<b>字符的数组</b>"。<br>所以你第 6 讲学的数组知识，这里都能用上。' }
        ]
      },
    },

    /* ===== 5 字符 vs 字符串 ===== */
    {
      id: 5, type: "grid", title: "字符 vs 字符串", subtitle: "单引号 'A' 和双引号 \"A\" 的区别",
      data: {
        cards: [
          { icon: "🔤", title: "字符 char", desc: "<b>用单引号</b>：<code>'A'</code><br>只表示<b>一个</b>字符<br>占 1 字节<br>本质是 ASCII 码（整数）" },
          { icon: "📝", title: "字符串 string", desc: '<b>用双引号</b>：<code>"A"</code><br>表示<b>一串</b>字符<br>用 <code>string</code> 类型<br>占多个字节（含结束符）' },
          { icon: "⚠️", title: "常见错误", desc: "<code>char c = \"A\";</code> ❌<br>char 要用单引号<br><code>string s = 'A';</code> ❌<br>string 要用双引号" },
        ],
        footer: '<b>💡 为什么要多一个 \\0？</b><br>C 风格字符串结尾有一个隐藏的 <code>\\0</code>（ASCII 码 0），告诉程序“字符串到此结束”。<br>就像一串项链，必须有个扣子收尾。<br><br><b>📌 现代 C++ 建议</b>：在竞赛中，<b>无脑使用 <code>string</code> 即可</b>。它自动管理长度，自带很多实用函数，能省去你 90% 的麻烦。'
      },
    },

    /* ===== 6 char[] vs string 硬核对比 ===== */
    {
      id: 6, type: "compare", title: "char[] vs string", subtitle: "什么时候用哪个", chapterTag: "第 7 讲 · 概念理解",
      data: {
        neutral: true, splitStep: true, leftLabel: '🔴 char[] (C语言时代)', rightLabel: '🟢 string (C++现代)', arrow: 'vs',
        groups: [
          { wrong: "<b>长度固定</b><br>定义时要预留 \\0 位置", right: "<b>长度自动</b><br>想存多少存多少" },
          { wrong: "<b>求长度</b>：<code>strlen(s)</code>", right: "<b>求长度</b>：<code>s.size()</code>" },
          { wrong: "<b>拼接</b>：<code>strcat(s1, s2)</code>", right: "<b>拼接</b>：<code>s1 + s2</code>" },
          { wrong: "<b>比较</b>：<code>strcmp(s1, s2)</code>", right: "<b>比较</b>：<code>s1 == s2</code>" }
        ],
        footer: '<b>📌 为什么现在还留着 char[]？</b><br>因为 C++ 是从 C 语言发展来的，为了兼容几十年前的老代码，保留了 char[]。<br><br><b>竞赛建议</b>：<br>只要不是题目强制要求，<b>一律用 string</b>。它像开自动挡汽车，不香吗？'
      }
    },

    /* ===== 7 代码演示与 string 优势 ===== */
    {
      id: 7, type: "code-split", title: "代码演示：string 的魔力", subtitle: "自动管理长度的好处",
      data: {
        intro: "📖 <code>string</code> 是 C++ 的字符串类型。<br>它自动管理长度，用起来极其方便。<br>需要 <code>#include &lt;string&gt;</code>。",
        codeFile: "codes/lesson-07/string-type.cpp", snippet: "main",
        annotations: [
          { line: 7, title: 'string s = "Hello";', desc: "定义并初始化" },
          { line: 8, title: 's = "World";', desc: "可以重新赋值，不用管长度" },
          { line: 10, title: 's + "!"', desc: "可以用 + 拼接字符串" },
          { line: 11, title: "cout &lt;&lt; s2", desc: "输出拼接结果" },
        ],
        output: "World\nWorld!",
        extra: {
          title: "💡 string 的三大优势",
          desc: "① <b>自动管理长度</b>：赋值时自动调整，不用手动留 \\0<br>② <b>可以用 +</b>：字符串拼接像加法一样简单<br>③ <b>更安全</b>：内置边界检查，避免越界<br><br><b>竞赛建议</b>：优先用 string，除非题目明确要求 char[]。<br><br><b>string 需要 #include &lt;string&gt;</b><br>这个头文件不在 iostream 里，要单独包含。<br>竞赛中通常写 <code>#include &lt;bits/stdc++.h&gt;</code> 能一次性包含所有头文件。",
          variant: "card-primary",
        },
      },
    },

    /* ===== 8 初赛考点：内存尺寸计算 ===== */
    {
      id: 8, type: "split", title: "初赛高频考点：字符串占几个字节？", subtitle: "别被 sizeof 和 strlen 骗了", chapterTag: "第 7 讲 · 初赛渗透",
      data: {
        intro: '初赛极爱考 C 风格字符串（<code>char[]</code>）的字节数。<br>记住一个核心：<b>C 风格字符串结尾永远自带一个隐藏的 <code>\\0</code> 占 1 个字节。</b>',
        panes: [
          {
            title: 'C 风格数组', icon: '📦',
            items: [
              { title: '自动推算长度', desc: '<code>char s[] = "Hello";</code><br>5 个字母 + 1 个 \\0<br>占 <b>6 字节</b>' },
              { title: '固定长度', desc: '<code>char s[10] = "Hello";</code><br>长度写死 10 个格子<br>占 <b>10 字节</b>' },
              { title: 'sizeof 运算符', desc: '<code>sizeof(s)</code><br>求的是<b>数组总容量</b>（10）' },
              { title: 'strlen 函数', desc: '<code>strlen(s)</code><br>求的是<b>实际字符数</b>（5）' }
            ]
          },
          {
            title: '现代 string 类型', icon: '✨',
            items: [
              { title: '自动管理长度', desc: '<code>string s = "Hello";</code><br>不需要手动管 \\0' },
              { title: 'size() 方法', desc: '<code>s.size()</code><br>返回实际字符数（5）' },
              { title: 'length() 方法', desc: '<code>s.length()</code><br>同上，返回 5' },
              { title: '优点', desc: '自动扩展长度，不会越界' }
            ]
          }
        ],
        footer: '<b>📌 初赛必背口诀</b>：<br>· <b>sizeof 看容量，strlen 看内容</b>。<br>· C 风格字符串自带 \\0，算字节数别忘了加 1。<br>· <code>string</code> 的 <code>.size()</code> 算出来就是真实的可见字符数。'
      }
    },

    /* ===== 9 眼见为实：cin 遇到空格的尴尬 ===== */
    {
      id: 9, type: "code-walkthrough", title: "眼见为实：cin 的断句尴尬", subtitle: "遇到空格就罢工", chapterTag: "第 7 讲 · 概念理解",
      data: {
        intro: "如果我们想读入一句包含空格的完整句子，比如 <code>Hello World</code>，用我们最熟悉的 <code>cin &gt;&gt; s</code> 会发生什么？看代码：",
        codeFile: "codes/lesson-07/string-input.cpp", snippet: "main",
        steps: [
          { title: "输入一整句", line: 8, vars: { s: '"" (等待输入)' }, note: "用户输入了 <code>Hello World</code> 并敲了回车。" },
          { title: "读取数据", line: 8, vars: { s: '"Hello"' }, note: "<b>cin 傻眼了。</b>它看到 <code>Hello</code> 后面的空格，以为输入结束了，直接停止读取。" },
          { title: "结果", line: 9, vars: { s: '"Hello"' }, note: "屏幕只输出了 <code>Hello</code>。<br><b>World 去哪了？</b>留在了输入缓冲区里，没读进来。" }
        ],
        extra: {
          title: "💡 怎么解决？",
          desc: "在 C++ 中，<code>cin &gt;&gt;</code> 默认把<b>空格、Tab、回车</b>当作数据的分界线。<br><br>所以它只能用来读“一个词”，不能用来读“一句话”。<br>如果我们想读入带空格的整行文本，该怎么办？<br>下一页，我们请出新的救星。",
          variant: "card-primary"
        }
      }
    },

    /* ===== 10 救星登场：getline 读整行 ===== */
    {
      id: 10, type: "code-split", title: "救星登场：getline 读入整行", subtitle: "语法：getline(cin, s);", chapterTag: "第 7 讲 · 概念理解",
      data: {
        intro: "📖 为了解决空格截断的问题，C++ 提供了专用的函数 <code>getline(cin, s)</code>。<br>它的意思是：从 <code>cin</code> 读取一<b>整行</b>（遇到回车才停下），存进字符串 <code>s</code> 里。",
        codeFile: "codes/lesson-07/getline-demo.cpp", snippet: "main",
        annotations: [
          { line: 7, title: 'string s;', desc: "定义字符串" },
          { line: 8, title: "getline(cin, s);", desc: "读入一整行，包含空格，遇到回车结束" },
          { line: 9, title: "cout &lt;&lt; s;", desc: "输出完整的句子" }
        ],
        output: "（输入 Hello World）\nHello World",
        footer: '<b>📌 终极口诀</b><br>· <code>cin &gt;&gt; s</code> 读“词”（遇到空格停）<br>· <code>getline(cin, s)</code> 读“行”（遇到回车停）<br><br><b>怎么选？</b><br>题目给的是单个词（如名字），用 cin。<br>题目给的是一句话（如标题统计），必须用 getline！'
      }
    },

    /* ===== 11 进阶雷区：cin 与 getline 混用 ===== */
    {
      id: 11, type: "code-walkthrough", title: "进阶雷区：吃饱了回车的 getline", subtitle: "混用时的车祸现场", chapterTag: "第 7 讲 · 概念理解",
      data: {
        intro: "既然 <code>getline</code> 这么好用，那如果我先用 <code>cin</code> 读了个数字，接着用 <code>getline</code> 读一行字符串，会发生什么？看代码：",
        code: "int n;\ncin >> n;\nstring s;\ngetline(cin, s);",
        steps: [
          { title: "输入数字", line: 2, vars: { n: "5", s: '""' }, note: "用户输入了 <code>5</code> 并敲了回车。<br>此时，<b>数字被读走，但回车符（换行）留在了缓冲区里！</b>" },
          { title: "读取整行", line: 4, vars: { n: "5", s: '"" (空)' }, note: "<code>getline</code> 一运行，一看缓冲区里有个回车，以为用户输入了空行，直接结束读取！" },
          { title: "灾难结局", line: 4, vars: { n: "5", s: '"" (空)' }, note: "程序跳过了让你输入句子的环节。<br>接下来如果输出 s，屏幕上一片空白。" }
        ],
        extra: {
          title: "💡 怎么解决？吃掉它！",
          desc: "答案：在 <code>cin &gt;&gt; n;</code> 之后，<code>getline</code> 之前，加一句：<br><code>cin.ignore();</code><br><br>它的作用是把缓冲区里的那个回车符“吃掉”（ignore = 忽略）。<br><br><b>📌 机房保命口诀</b>：<br>· <code>cin &gt;&gt;</code> 读“词”<br>· <code>getline</code> 读“行”<br>· <b>混用时，必须加 <code>cin.ignore()</code>！</b>",
          variant: "card-primary"
        }
      }
    },

    /* ===== 12 过渡页 ===== */
    {
      id: 12, type: "transition", title: "第二站 · 字符串操作", subtitle: "长度、遍历、实战",
      data: { note: "接下来你将学会字符串的长度、遍历，以及统计、回文、逆序三大经典问题" },
    },

    /* ===== 13 字符串长度与遍历 ===== */
    {
      id: 13, type: "code-split", title: "字符串长度与遍历", subtitle: "size() 和下标访问",
      data: {
        intro: "📖 <b>string</b> 用 <code>s.size()</code> 求长度。<br>遍历时，和数组一模一样，用 <code>s[i]</code> 访问每个字符。",
        codeFile: "codes/lesson-07/string-length.cpp", snippet: "main",
        annotations: [
          { line: 8, title: 'string s = "Hello";', desc: "定义 string" },
          { line: 9, title: "s.size()", desc: "string 求长度，返回 5" },
          { line: 12, title: "for (int i = 0...)", desc: "用普通 for 循环遍历" }
        ],
        output: "长度: 5\n遍历: H e l l o",
        extra: {
          title: "💡 范围 for 循环（现代 C++ 写法）",
          desc: '除了下标遍历，C++11 还引入了"范围 for"，更简洁：<br><code>for (char c : s) { cout &lt;&lt; c; }</code><br>它的意思是"遍历 s 里的每个字符"。<br><br><b>选哪个？</b><br>如果只需要读每个字符，用范围 for；如果需要用到下标（比如回文判断），就用普通 for。',
          variant: "card-primary",
        },
      },
    },

    /* ===== 14 练习1：统计字符 ===== */
    {
      id: 14, type: "level-map", title: "课堂练习1：统计字符", subtitle: "统计字符串中非空格字符数", chapterTag: "第 7 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "读入一行字符串（含空格），统计其中<b>非空格字符</b>的个数。<br>输入样例：<code>Hello World</code>　输出样例：<code>10</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["用 <code>getline(cin, s)</code> 读整行", "用 <code>s.size()</code> 控制循环", "用 <code>if (s[i] != ' ')</code> 判断非空格"],
        answer: { codeFile: "codes/lesson-07/char-count.cpp" },
        analysis: { title: "📖 解析", desc: "典型的一遍遍历。<br>用 <code>getline</code> 读整行，用循环遍历每个字符，遇到非空格就 <code>count++</code>。<br><br>时间复杂度 <b>O(n)</b>，只需扫一遍字符串。" },
        extra: { title: "📖 知识扩展 · 洛谷 P5015 标题统计", desc: '这道题在洛谷的编号是 <a href="https://www.luogu.com.cn/problem/P5015" target="_blank" class="wiki-link">P5015</a>，是 CSP-J 2018 的真题。<br>题目说"标题"由数字、大小写字母、空格组成，让你统计非空格字符数。<br>核心就是今天学的字符串遍历 + 条件判断。<br><br><b>建议</b>：课后作业就做这道题，巩固基础。<br><br><b>变体</b>：如果让你"统计字母数"，只需把条件改成 <code>if ((c &gt;= \'a\' &amp;&amp; c &lt;= \'z\') || (c &gt;= \'A\' &amp;&amp; c &lt;= \'Z\'))</code>。', variant: "card-primary" },
      },
    },

    /* ===== 15 进阶操作：找子串与截取 ===== */
    {
      id: 15, type: "code-split", title: "进阶操作：找子串与截取", subtitle: "CSP-J 必考的 string 魔法", chapterTag: "第 7 讲 · 概念理解",
      data: {
        intro: "📖 字符串不仅是用来遍历的，C++ 还自带了强大的工具：<br><code>find()</code> 找子串，<code>substr()</code> 截取子串。",
        codeFile: "codes/lesson-07/find-demo.cpp", snippet: "main",
        annotations: [
          { line: 8, title: 's.find("World")', desc: "查找子串位置，返回起始下标" },
          { line: 9, title: 's.find("Java")', desc: "找不到时，返回一个特殊值 string::npos" },
          { line: 12, title: 's.substr(0, 5)', desc: "从下标 0 开始，截取 5 个字符" }
        ],
        output: "6\n找不到\nHello",
        footer: '<b>💡 为什么重要？</b><br>在做“文章单词统计”或“网址解析”这类题目时，不需要自己手写复杂的匹配逻辑。<br>用 <code>find()</code> 和 <code>substr()</code> 能少写几十行代码。<br><br><b>⚠️ 陷阱</b>：<code>find()</code> 找不到时返回 <code>string::npos</code>，不要直接跟 -1 比较，写成 <code>if (s.find(x) != string::npos)</code> 最安全。'
      }
    },

    /* ===== 16 练习2：判断是否为回文 ===== */
    {
      id: 16, type: "level-map", title: "课堂练习2：回文判断", subtitle: "正着读和倒着读一样吗", chapterTag: "第 7 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "读入一个字符串，判断它是否是回文。<br>回文：正着读和倒着读完全相同。<br>是回文输出 <code>yes</code>，否则 <code>no</code>。<br>输入样例：<code>level</code>　输出样例：<code>yes</code>", timer: "⏱ 限时 8 分钟" },
        hints: ["用下标 <code>i</code> 和 <code>n-1-i</code> 对比", "只需比较<b>前一半</b>", "发现不同就 <code>break</code>"],
        answer: { codeFile: "codes/lesson-07/palindrome.cpp" },
        analysis: { title: "📖 解析", desc: '只需比较<b>前一半</b>字符。<br>第 i 个字符和第 <code>n-1-i</code> 个字符对比。<br>只要有一对不相同，就不是回文。<br><br>循环次数 <code>n/2</code>，效率是 <b>O(n)</b>。<br>这是"双指针"思想的雏形——一头一尾往中间走。' },
        extra: { title: "📖 知识扩展 · 回文的文化意义", desc: '"回文"在中文里叫"回环诗"，在英文里叫 <b>palindrome</b>（希腊语"再次跑"）。<br><br>最有名的英文回文是 <code>"A man, a plan, a canal, Panama"</code>——读一百多年不腻。<br>数学里也有"回文数"，如 121、12321。<br><br><b>回文是人类对称审美的体现。</b><br><br><b>进阶变体</b>：<br>· 忽略大小写：先把 s 全部转小写<br>· 忽略标点：遇到非字母字符就跳过', variant: "card-primary" },
      },
    },

    /* ===== 17 进阶操作：字典序比较与数值转换 ===== */
    {
      id: 17, type: "code-split", title: "进阶操作：比较大小与互转", subtitle: "字符串的隐藏技能", chapterTag: "第 7 讲 · 概念理解",
      data: {
        intro: "📖 字符串可以直接比较大小（按字典序），也可以和数字互相转换。",
        codeFile: "codes/lesson-07/string-advanced.cpp", snippet: "main",
        annotations: [
          { line: 7, title: 'string a = "apple", b = "banana";', desc: "定义两个单词" },
          { line: 9, title: "a < b", desc: "字典序比较，apple 在 banana 前面，返回 true" },
          { line: 12, title: "to_string(123)", desc: "把数字转成字符串 \"123\"" },
          { line: 15, title: "stoi(\"456\")", desc: "把字符串转成数字 456" }
        ],
        output: "apple 更小\n数字转字符串: 123\n字符串转数字: 456",
        footer: '<b>📌 必考知识点</b><br>1. <b>字典序比较</b>：和查英文字典一样，<code>"abc" < "abd"</code>，因为 c 在 d 前面。如果要按长度比较，不能用这个。<br>2. <b>互转</b>：<code>to_string(数字)</code> 把数字变字符串；<code>stoi(字符串)</code> (String TO Integer) 把字符串变数字。<br><br>这两个操作在拼接输出、数字分离时极其常用！'
      }
    },

    /* ===== 18 练习3：字符串逆序 ===== */
    {
      id: 18, type: "level-map", title: "课堂练习3：字符串逆序", subtitle: "把字符串倒着输出", chapterTag: "第 7 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "读入一个字符串，把它倒着输出。<br>输入样例：<code>Hello</code>　输出样例：<code>olleH</code>", timer: "⏱ 限时 5 分钟" },
        hints: ["从 <code>s.size()-1</code> 倒着遍历到 0", "循环条件 <code>i &gt;= 0</code>", "和数组逆序完全一样"],
        answer: { codeFile: "codes/lesson-07/string-reverse.cpp" },
        analysis: { title: "📖 解析", desc: '和数组逆序一模一样。<br>字符串本质上就是字符数组，下标访问方式完全相同。<br>这就是"字符串 = 字符数组"的具体体现。' },
        extra: { title: "💡 更简洁的写法", desc: 'C++ 有内置的 <code>reverse</code> 函数：<br><code>reverse(s.begin(), s.end());</code><br>一行搞定逆序。<br>需要 <code>#include &lt;algorithm&gt;</code>。<br><br><b>建议</b>：初学者先手写循环，理解原理后再用 STL。<br>但到了竞赛阶段，能用 STL 就用——省时间。', variant: "card-primary" },
      },
    },

    /* ===== 19 初赛渗透：ASCII 码 ===== */
    {
      id: 19, type: "split", title: "初赛小知识：ASCII 码", subtitle: "字符背后的数字", chapterTag: "第 7 讲 · 初赛渗透",
      data: {
        intro: '每个字符对应一个数字，叫 <b>ASCII 码</b>。<br>这不仅是初赛考点，更是字符加密（凯撒密码）的基础。',
        panes: [
          {
            title: '核心数字速记', icon: '🔢',
            items: [
              { title: "'A' = 65", desc: "大写字母起点" },
              { title: "'a' = 97", desc: "小写字母起点" },
              { title: "'0' = 48", desc: "数字字符起点" },
              { title: "大小写差 32", desc: "小写字母 - 32 = 大写" }
            ]
          },
          {
            title: '实际应用', icon: '🛠️',
            items: [
              { title: '判断字符类型', desc: "<code>if (c >= 'a' && c <= 'z')</code>" },
              { title: '大小写转换', desc: "<code>c = c - 32;</code> 变大写" },
              { title: '字符转数字', desc: "<code>int x = c - '0';</code>" },
              { title: '数字转字符', desc: "<code>char c = x + '0';</code>" }
            ]
          }
        ],
        footer: '<b>💡 怎么考？</b><br>初赛常考：给你一个字母，问你它的 ASCII 码。或者给两个字母相减，问差值。<br><br><b>📌 终极捷径</b>：只要记住 <b>\'A\'=65, \'a\'=97, \'0\'=48</b> 这三个起点。遇到别的字母（比如 \'C\'），用起点往上加（65 + 2 = 67）。大写和小写之间，永远差 <b>32</b>。'
      }
    },

    /* ===== 20 轻松一刻：密码学初探 ===== */
    {
      id: 20, type: "quote", title: "🔐 轻松一刻 · 凯撒密码", subtitle: "两千年前的加密算法", chapterTag: "第 7 讲 · 知识讲解",
      data: {
        text: "把每个字母向后移动 3 位，就能加密情报。",
        author: "—— 尤利乌斯·凯撒（古罗马）",
        points: [
          "古罗马大将凯撒发明了一种密码：把字母表往后挪。",
          "比如 A 变成 D，B 变成 E。",
          "为什么能加密？因为只有知道‘挪几位’的人，才能把字母移回来。",
          "<b>代码实现</b>：<code>s[i] = (s[i] - 'a' + 3) % 26 + 'a';</code>"
        ],
        highlight: {
          title: "💡 代码背后的逻辑",
          desc: "字符在计算机里就是数字，所以对字符进行加减法，其实就是改变它们的 ASCII 码。<br>这就是为什么我们要学 ASCII 码！<br><br><b>课后作业有一道凯撒密码的题，今天你就能当一回密码破译专家。</b>"
        }
      }
    },

    /* ===== 21 课堂小测 ===== */
    {
      id: 21, type: "quiz", title: "课堂小测", subtitle: "字符、字符串与读入", chapterTag: "第 7 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第五章", optionLayout: "vertical", question: "下面哪个是合法的 C++ 字符串定义？", options: [ { label: "A", text: "<code>string s = 'Hello';</code>" }, { label: "B", text: '<code>string s = "Hello";</code>', correct: true }, { label: "C", text: "<code>char s = 'Hello';</code>" }, { label: "D", text: '<code>char s = "Hello";</code>' } ], analysis: "<b>string 用双引号</b>，<b>char 用单引号</b>。<br>A 错：string 用了单引号<br>B 对<br>C 错：char 只能存 1 个字符<br>D 错：char 用双引号会报错<br><b>口诀</b>：单引字符双引串。" },
          { id: 2, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 字符串", optionLayout: "horizontal", question: '在 C++ 中，<code>char s[] = "Hello";</code> 数组 s 占几个字节？', options: [ { label: "A", text: "5 字节" }, { label: "B", text: "6 字节", correct: true }, { label: "C", text: "7 字节" }, { label: "D", text: "不确定" } ], analysis: '字符串 "Hello" 有 5 个字符，但 C 风格字符串<b>结尾还有一个 \\0 结束符</b>。<br>所以总占 <b>5 + 1 = 6</b> 字节。<br>这就是为什么定义字符数组时，长度要多留一位。' },
          { id: 3, type: "single", difficulty: 3, source: "CSP-J 2021 初赛模拟题 · 字符串", optionLayout: "two-cols", question: "下面代码的输出是什么？", questionCode: `string s = "abc";\ncout << s.size() << endl;\ncout << s[1] << endl;`, options: [ { label: "A", text: "3 然后 b", correct: true }, { label: "B", text: "3 然后 a" }, { label: "C", text: "4 然后 b" }, { label: "D", text: "编译错误" } ], analysis: "<code>s.size()</code> 返回字符串长度，<b>3</b>（不是 4）。<br><code>s[1]</code> 是第 2 个字符（下标从 0 开始），即 <b>b</b>。<br>所以输出 3 和 b，选 A。<br><b>关键</b>：string 的 size() 不含结束符（\\0）。" },
          { id: 4, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第五章", optionLayout: "two-cols", question: "在 C++ 中，<code>cin &gt;&gt; s</code> 可以读入含空格的整行字符串。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: '<code>cin &gt;&gt; s</code> 遇到空格、Tab、换行就停止。<br>比如输入 "Hello World"，cin 只读到 "Hello"。<br>要读整行（含空格），必须用 <code>getline(cin, s)</code>。<br><b>口诀</b>：cin 读词，getline 读行。' },
          { id: 5, type: "judge", difficulty: 2, source: "CSP-J 初赛真题练习 · 字符串", optionLayout: "two-cols", question: "字符 'A' 在 ASCII 码表中是 65，字符 'a' 是 97。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: "常见 ASCII 码：<br>'A' = 65，'Z' = 90<br>'a' = 97，'z' = 122<br>'0' = 48，'9' = 57<br>空格 = 32<br><br><b>规律</b>：大写和小写相差 32，所以 <code>'a' - 'A' = 32</code>。<br>这是竞赛常考的知识点。" },
        ],
      },
    },

    /* ===== 22 知识清单 ===== */
    {
      id: 22, type: "grid", title: "第 7 讲 · 知识清单", subtitle: "一页看完本讲所有重点", chapterTag: "第 7 讲 · 复习",
      data: {
        cards: [
          { icon: "🔤", title: "字符 vs 字符串", desc: "<b>char</b> 用单引号 'A'<br><b>string</b> 用双引号 \"A\"<br>char 占 1 字节<br>字符串含结束符 \\0" },
          { icon: "📝", title: "两种定义", desc: "<b>char s[100];</b> 固定长度<br><b>string s;</b> 自动长度<br><b>推荐</b>：优先用 string<br><b>注意</b>：需要 #include &lt;string&gt;" },
          { icon: "📥", title: "读入与遍历", desc: "<b>cin &gt;&gt; s</b> 读词<br><b>getline(cin, s)</b> 读行<br><b>s[i]</b> 访问字符<br><b>范围 for</b> 遍历" },
          { icon: "📏", title: "长度与进阶", desc: "<b>s.size()</b> 求长度<br><b>s.find()</b> 找子串<br><b>s.substr()</b> 截取<br>字典序比较 & 互转" },
        ],
        footer: '<b>📌 关键口诀</b>：单引字符双引串，char 数组留 \\0 位；cin 读词行用 getline，大小写差 32；字符串本质是字符数组，数组知识全都用得上。<br><br><b>📸 建议拍照保存，作为课后复习清单。</b>'
      },
    },

    /* ===== 23 今日总结 ===== */
    {
      id: 23, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "字符串是文字的容器，本质是字符的数组。", author: "—— 字符串第一课",
        points: [ "字符用单引号 'A'，字符串用双引号 \"A\"", "两种定义：char s[100]; 和 string s;", "cin 读词，getline 读行", "长度：string 用 .size()，char[] 用 strlen()", "遍历：下标 s[i] 或范围 for", "实战：统计、回文、逆序三大经典问题" ],
        highlight: { title: "📌 关键口诀", desc: "单引字符双引串，char 数组留 \\0 位；cin 读词行用 getline，大小写差 32；字符串本质是字符数组，数组知识全都用得上。" },
      },
    },

    /* ===== 24 课后作业 ===== */
    {
      id: 24, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5015", link: "https://www.luogu.com.cn/problem/P5015", desc: "<b>标题统计</b><br>考察：getline、字符遍历<br>难度：★★<br>目标：统计非空格字符数" },
          { icon: "🟢", title: "基础 2 · P1914", link: "https://www.luogu.com.cn/problem/P1914", desc: "<b>小书童——凯撒密码</b><br>考察：字符遍历、字符加减<br>难度：★★<br>目标：把每个字符向后移动 n 位" },
          { icon: "🔴", title: "挑战 · P1553", link: "https://www.luogu.com.cn/problem/P1553", desc: "<b>数字反转（升级版）</b><br>考察：字符串处理、分类讨论<br>难度：★★★<br>目标：处理小数、分数、百分数、整数四种情况" },
        ],
      },
    },

    /* ===== 25 下节预告 ===== */
    {
      id: 25, type: "radial", title: "下节预告", subtitle: "第 8 讲 · 函数",
      data: { center: "函数", items: [ { text: "什么是函数" }, { text: "定义与调用" }, { text: "参数与返回值" }, { text: "作用域" } ] },
    },

    /* ===== 26 答疑时间 ===== */
    {
      id: 26, type: "grid", title: "答疑时间", subtitle: "有问题尽管问", chapterTag: "第 7 讲 · 答疑",
      data: {
        cards: [
          { icon: '❓', title: 'string 和 char[] 用哪个？', desc: '除非题目明确要求 char[]，否则都用 string。<br>string 更安全、更方便。' },
          { icon: '📥', title: 'cin 和 getline 怎么选？', desc: '读一个单词用 cin，读一整行用 getline。<br>如果 cin 后面接 getline，别忘了 cin.ignore()。' },
          { icon: '🔢', title: '为什么字符要用 ASCII？', desc: '因为计算机只认识数字。<br>把字符编码成数字，计算机才能存储和比较。' },
          { icon: '🔄', title: 'find 找不到会怎样？', desc: '会返回 <code>string::npos</code>。<br>用 <code>!= string::npos</code> 判断即可。' }
        ]
      }
    },

    /* ===== 27 本讲英文单词 ===== */
    {
      id: 27, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 7 讲 · 复习",
      data: {
        words: [
          { word: "string", cn: "字符串", pron: "/strɪŋ/", origin: '英文原意"一串、一线"', category: "类型" },
          { word: "char", cn: "字符", pron: "/kɑːr/", origin: "character 的缩写", category: "类型" },
          { word: "getline", cn: "读整行", pron: "/ɡet laɪn/", origin: "get（获取）+ line（行）", category: "函数" },
          { word: "length", cn: "长度", pron: "/leŋθ/", origin: '英文原意"长度"', category: "概念" },
          { word: "size", cn: "大小", pron: "/saɪz/", origin: '英文原意"大小、尺寸"', category: "函数" },
          { word: "ignore", cn: "忽略", pron: "/ɪɡˈnɔːr/", origin: '英文原意"忽略"', category: "函数" },
          { word: "reverse", cn: "反转", pron: "/rɪˈvɜːrs/", origin: '英文原意"颠倒、反转"', category: "函数" },
        ]
      },
    },

    /* ===== 28 结束页 ===== */
    {
      id: 28, 
      type: "ending", 
      title: "第七讲结束", 
      subtitle: "你的程序，能读懂人类的文字了", 
      chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 编程能力的跃迁",
          desc: "从只会算数，到能处理文字，你的程序功能越来越强大了。<br>但如果你注意看你的代码，你会发现它越来越长，越来越乱。<br><br>如果有一段代码你要用 10 次，难道要复制粘贴 10 遍吗？<br>下一讲，我们将学习编程中最重要的魔法——<b>函数</b>。它能让你的代码瞬间变短，而且无比优雅！<br><br>📌 <b>行动号召</b>：去洛谷干掉 P5015 和 凯撒密码，体会一下操控文字的乐趣！",
          variant: "card-glow"
        }
      },
    },
  ],
};
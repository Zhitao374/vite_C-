export default {
  title: "第 7 讲 字符串基础",
  subtitle: "一串字符的容器",
  total: 22,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "字符串基础", subtitle: "一串字符的容器", chapterTag: false,
      data: { accentWord: "字符串", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 7 讲"] },
    },

    /* ===== 2 钩子 ===== */
    {
      id: 2, type: "dialog", title: "读不出来的名字", subtitle: "cin 遇空格截断", chapterTag: "第 7 讲 · 开场",
      data: {
        lines: [
          { who: "student", text: "小 C，我想写个程序，存一下我的英文全名 `Tom Smith`，怎么输出只剩下 `Tom` 了？" },
          { who: "robot", text: "你是不是用了 <code>cin >> name;</code>？" },
          { who: "student", text: "对啊，存数字不都是这么存的吗？" },
          { who: "robot", text: "这就是今天要解决的第一个大坑。在 C++ 里，<code>cin</code> 只要遇到<b>空格</b>，就会认为输入结束了。" },
          { who: "student", text: "那后面那半截名字去哪了？" },
          { who: "robot", text: "留在缓冲区里了。要想读取带有空格的一整句话，我们需要换一个专门的武器：<b>字符串（string）</b>。" },
        ]
      }
    },

    /* ===== 3 上节回顾 ===== */
    {
      id: 3, type: "timeline", variant: "review", title: "上节课回顾", subtitle: "一维数组",
      data: {
        items: [
          { icon: "📦", badge: "定义", title: "数组基础", desc: "连续空间", points: ["下标从0开始", "大小是n，取到n-1"] },
          { icon: "🏆", badge: "算法", title: "打擂台", desc: "求最值", points: ["max_val = a[0]", "循环遍历更新"] },
          { icon: "💥", badge: "急救", title: "大数组防崩", desc: "栈溢出", points: ["必须开在main外面", "全局变量"] },
          { icon: "🪣", badge: "拓展", title: "计数数组", desc: "桶的思想", points: ["把值当下标", "count[x]++"] },
        ],
      },
    },

    /* ===== 4 本讲作战地图 ===== */
    {
      id: 4, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "四站闯关，读懂人类语言",
      data: {
        items: [
          { icon: "📜", badge: "第一站", title: "智能卷轴", desc: "string 基础", points: ["定义与拼接", "遇到空格截断"] },
          { icon: "🔍", badge: "第二站", title: "细心收信人", desc: "getline 读入", points: ["读取一整行", "幽灵回车急救"] },
          { icon: "🔁", badge: "第三站", title: "遍历与统计", desc: "长度与循环", points: ["s.length()", "统计字符与回文"] },
          { icon: "🎋", badge: "第四站", title: "底层竹简", desc: "初赛 \0 结尾", points: ["char[] 字符数组", "隐形休止符"] },
        ],
      },
    },

    /* ===== 5 string 基础 ===== */
    {
      id: 5, type: "code-split", title: "string · 智能卷轴", subtitle: "定义、拼接与长度",
      data: {
        intro: "📖 在 C++ 中，<code>string</code> 就像一卷会自动变长的现代智能卷轴。<br>它会自动管理大小，不需要你操心长度限制。",
        codeFile: "codes/lesson-07/string-basic.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "string s1 = \"Hello\";", desc: "定义字符串" },
          { line: 4, title: "string s3 = s1 + \" \" + s2;", desc: "拼接：直接用加号连接" },
          { line: 6, title: "cout << s3;", desc: "输出整句" },
          { line: 7, title: "s3.length()", desc: "获取长度（多少个字符）" },
        ],
        output: "Hello World\n11",
        footer: '<b>📌 注意</b>：<code>string</code> 定义在 <code>&lt;string&gt;</code> 头文件中，千万别忘了 <code>#include &lt;string&gt;</code>！'
      },
    },

    /* ===== 6 练习1：拼接字符串 ===== */
    {
      id: 6, type: "level-map", title: "课堂练习1：拼接字符串", subtitle: "用 + 号连接", chapterTag: "第 7 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入两个单词，用加号把它们拼起来，中间加一个横杠 `-`。输出拼接后的结果。<br>输入样例：<code>C++</code> 和 <code>No.1</code><br>输出样例：<code>C++-No.1</code>", timer: "⏱ 限时 5 分钟" },
        hints: ["定义两个 <code>string</code> 变量", "用 <code>cin >> s1 >> s2;</code> 读入", "输出 <code>s1 + \"-\" + s2</code>"],
        answer: { codeFile: "codes/lesson-07/practice-concat.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "C++ 的 <code>string</code> 重载了 <code>+</code> 运算符，拼接字符串就像做加法一样简单。" },
      },
    },

    /* ===== 7 冲突①：眼见为实：空格截断 ===== */
    {
      id: 7, type: "code-walkthrough", title: "眼见为实：空格截断", subtitle: "为什么读不到完整的话？", chapterTag: "第 7 讲 · 概念理解",
      data: {
        intro: "刚才我们用 <code>cin</code> 读入变量。如果是读字符串呢？<br>把下面的 <code>getline</code> 暂时换成 <code>cin >> s;</code> 试试：",
        codeFile: "codes/lesson-07/cin-vs-getline.cpp", snippet: "main",
        steps: [
          { title: "输入整句", line: 3, vars: { s: "" }, note: "我们要读入 <code>Hello World</code>。" },
          { title: "cin 罢工", line: 3, vars: { s: "Hello" }, note: "如果用的是 <code>cin</code>，遇到空格就停止，变量里只有 <code>Hello</code>。" },
          { title: "残局", line: 3, vars: { s: "Hello" }, note: "后面的 <code>World</code> 被留在了缓冲区，没读进来。" }
        ],
        footer: '<b>📌 记住</b>：<code>cin</code> 读到空格或回车就会停下，不能用它来读带空格的句子。'
      }
    },

    /* ===== 8 揭示：getline ===== */
    {
      id: 8, type: "dialog", title: "细心的收信人", subtitle: "getline 读入整行", chapterTag: "第 7 讲 · 概念理解",
      data: {
        lines: [
          { who: "student", text: "那怎么办？我总不能把空格都去掉吧？" },
          { who: "robot", text: "我们需要请出一位细心的收信人——<code>getline(cin, s);</code>" },
          { who: "student", text: "它和 cin 有什么区别？" },
          { who: "robot", text: "<code>cin</code> 是挑剔的收信人，看到空格就退回；<code>getline</code> 只要用户不敲回车，把一整行连汤带水全收进变量里。" },
          { who: "student", text: "听起来很完美，我马上用！" },
          { who: "robot", text: "别急，这位收信人虽然细心，但有些时候他会<b>吞掉你的数据</b>，下一页我们就会踩到这个坑。" },
        ]
      }
    },

    /* ===== 9 冲突②：眼见为实：幽灵回车 ===== */
    {
      id: 9, type: "code-walkthrough", title: "眼见为实：幽灵回车", subtitle: "程序为什么不理我？", chapterTag: "第 7 讲 · 概念理解",
      data: {
        intro: "看下面这段代码：先输入一个数字，再输入一个带空格的字符串。<br>去敲一下，猜猜会发生什么？",
        codeFile: "codes/lesson-07/_error-ghost-enter.cpp", snippet: "main",
        steps: [
          { title: "前置输入", line: 2, vars: { n: "5" }, note: "输入 5 并敲了回车。" },
          { title: "读入字符串", line: 5, vars: { s: "" }, note: "执行到 <code>getline</code>，它立刻读到了一个空字符串，然后程序直接结束了！" },
          { title: "为什么？", line: 5, vars: { s: "" }, note: "因为 <code>cin</code> 读走 5 之后，把<b>回车符</b>留在了缓冲区。`getline` 看到回车，以为这一行结束了，直接读了个空。" }
        ],
        footer: '<b>📌 急救解药</b>：在 <code>cin >> n;</code> 之后，加一句 <code>cin.ignore();</code>，把那个垃圾回车吃掉。'
      }
    },

    /* ===== 10 缓冲区原理解析 ===== */
    {
      id: 10, type: "grid", title: "缓冲区原理解析", subtitle: "幽灵回车到底在哪？", chapterTag: "第 7 讲 · 概念理解",
      data: {
        cards: [
          { icon: "🚚", title: "传送带", desc: "键盘输入的内容，先被放在一个叫缓冲区的传送带上。敲回车，代表包裹打包完毕。" },
          { icon: "🤖", title: "cin 的机器人", desc: "只搬走它需要的数字，遇到空格或回车就停止。留下回车在原地。" },
          { icon: "👻", title: "getline 的机器人", desc: "只看有没有回车符。看到残留的回车，以为是完整的一行，直接收走。" },
          { icon: "🧹", title: "ignore 清洁工", desc: "<code>cin.ignore();</code> 的作用就是丢掉一个字符（通常是回车），清空传送带。" },
        ],
      }
    },

    /* ===== 11 字符串遍历 ===== */
    {
      id: 11, type: "code-split", title: "遍历与统计", subtitle: "像数组一样处理字符串",
      data: {
        intro: "📖 <code>string</code> 和数组一样，可以通过下标 <code>s[i]</code> 访问每个字符。<br>配合 <code>s.length()</code> 就可以遍历整个字符串了。",
        codeFile: "codes/lesson-07/string-length.cpp", snippet: "main",
        annotations: [
          { line: 3, title: "getline(cin, s);", desc: "读取整行字符串" },
          { line: 6, title: "for (int i = 0; i < s.length(); i++)", desc: "循环条件：小于长度" },
          { line: 7, title: "if (s[i] == 'a')", desc: "判断每个字符是不是 'a'" },
          { line: 8, title: "count_a++;", desc: "如果是，计数器加1" },
        ],
        output: "（输入：banana）\n字母 a 出现了 3 次",
      },
    },

    /* ===== 12 练习2：统计字符 ===== */
    {
      id: 12, type: "level-map", title: "课堂练习2：统计字符", subtitle: "统计数字字符的个数", chapterTag: "第 7 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一行字符串，统计其中数字字符（'0'~'9'）的个数。<br>输入样例：<code>C++ 2026</code>　输出样例：<code>4</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["用 <code>getline</code> 读入整行", "判断字符是否在 '0' 到 '9' 之间：<code>s[i] >= '0' && s[i] <= '9'</code>"],
        answer: { codeFile: "codes/lesson-07/string-length.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "字符的底层是 ASCII 码，数字字符 '0' 到 '9' 是连续排列的，所以可以直接用大于等于和小于等于来比较。" },
      },
    },

    /* ===== 13 练习3：回文判断 ===== */
    {
      id: 13, type: "level-map", title: "课堂练习3：回文判断", subtitle: "正着读和反着读一样", chapterTag: "第 7 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个字符串，判断它是不是回文串（正着读和反着读一样，如 `level`）。<br>是输出 `Yes`，否则输出 `No`。", timer: "⏱ 限时 10 分钟" },
        hints: ["可以用双指针：一个指向开头，一个指向结尾", "如果左右对称位置的字符不一样，就不是回文", "循环条件是 <code>left < right</code>"],
        answer: { codeFile: "codes/lesson-07/palindrome.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "利用左右两个下标向中间靠拢，每次比较对应的字符。这就是后面高级算法中“双指针”的雏形。" },
      },
    },

    /* ===== 14 冲突③：竹简与休止符 ===== */
    {
      id: 14, type: "code-walkthrough", title: "眼见为实：竹简与休止符", subtitle: "初赛必考的 \0", chapterTag: "第 7 讲 · 概念理解",
      data: {
        intro: "复赛我们用 `string`。但初赛喜欢考它的老祖宗——`char[]` 字符数组（竹简）。<br>看下面这段代码：",
        codeFile: "codes/lesson-07/_error-char-array.cpp", snippet: "main",
        steps: [
          { title: "越界危机", line: 3, vars: { "s[5]": "{H,e,l,l,o}" }, note: "我们开了 5 个格子，塞进了 5 个字母。看起来很完美？" },
          { title: "隐形的尾巴", line: 3, vars: { "s[5]": "放不下 \\0" }, note: "在 C 语言底层，字符串最后必须有一个隐形的 \0 作为休止符。你需要 6 个格子才装得下！" },
          { title: "后果", line: 4, vars: { s: "乱码" }, note: "因为找不到休止符，程序会一直往后读，输出一堆乱码，甚至崩溃。" }
        ],
        footer: '<b>📌 初赛口诀</b>：字符数组要多开 1 格，因为结尾有隐形休止符 <code>\\0</code>。'
      }
    },

    /* ===== 15 初赛小知识 ===== */
    {
      id: 15, type: "grid", title: "初赛小知识：字符串与数组", subtitle: "CSP-J/S 初赛常考", chapterTag: "第 7 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "🆚", title: "string vs char[]", desc: "<code>string</code> 自动管理长度，安全；<br><code>char[]</code> 必须手动预留 <code>\\0</code> 的位置。" },
          { icon: "📏", title: "长度计算", desc: "<code>string</code> 用 <code>s.length()</code>；<br><code>char[]</code> 用 <code>strlen(s)</code>（遇到 <code>\\0</code> 停下）。" },
          { icon: "🔗", title: "拼接", desc: "<code>string</code> 直接用 <code>+</code>；<br><code>char[]</code> 要用 <code>strcat(s1, s2)</code>。" },
          { icon: "🛑", title: "结束符", desc: "只要涉及字符数组的内存分析，永远不要忘了那个占位置的 <code>\\0</code>。" },
        ],
      }
    },

    /* ===== 16 课堂小测 ===== */
    {
      id: 16, type: "quiz", title: "课堂小测", subtitle: "字符串与读入陷阱", chapterTag: "第 7 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 字符串", optionLayout: "horizontal", question: "执行 <code>string s; cin >> s;</code>，输入 <code>Hello World</code>，则 s 的值是？", options: [ { label: "A", text: "Hello World" }, { label: "B", text: "Hello", correct: true }, { label: "C", text: "World" }, { label: "D", text: "空字符串" } ], analysis: '<code>cin</code> 遇到空格就停止，所以只读到了空格前面的 Hello。' },
          { id: 2, type: "single", difficulty: 3, source: "CSP-J 2022 初赛模拟题 · 字符数组", optionLayout: "vertical", question: "下列字符数组的定义中，会引发编译错误或越界的是？", options: [ { label: "A", text: "<code>char s[5] = \"abcd\";</code>" }, { label: "B", text: "<code>char s[5] = \"abcde\";</code>", correct: true }, { label: "C", text: "<code>char s[10] = \"abc\";</code>" }, { label: "D", text: "<code>char s[] = \"a\";</code>" } ], analysis: '开 5 个格子，必须留 1 个给隐形休止符 <code>\\0</code>。<br>所以最多只能放 4 个可见字符。<br>B 选项有 5 个字母，加上 <code>\\0</code> 需要 6 个空间，会发生越界。' },
          { id: 3, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 字符串", optionLayout: "two-cols", question: "使用 <code>getline(cin, s)</code> 可以读取包含空格的一整行字符串。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: '<code>getline</code> 会读取直到遇到回车符为止，包括中间的空格。' },
        ],
      },
    },

    /* ===== 17 今日总结 ===== */
    {
      id: 17, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "cin 遇空格就停，getline 才能读整行。", author: "—— 字符串第一课",
        points: [ "string 定义与拼接（像数字一样用）", "读整行：getline(cin, s)", "遍历：配合 s.length() 和 for 循环", "幽灵回车：cin 之后必须 cin.ignore()", "初赛考点：char[] 结尾有 \\0" ],
        highlight: { title: "📌 关键口诀", desc: "读带空格用 getline，前面有 cin 要 ignore；string 方便又好用，char 数组多留坑。" },
      },
    },

    /* ===== 18 课后作业 ===== */
    {
      id: 18, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5015", link: "https://www.luogu.com.cn/problem/P5015", desc: "<b>标题统计</b><br>考察：getline、遍历<br>难度：★" },
          { icon: "🟢", title: "基础 2 · P1914", link: "https://www.luogu.com.cn/problem/P1914", desc: "<b>小书童</b><br>考察：字符数组、ASCII<br>难度：★★" },
          { icon: "🔴", title: "挑战 · P1553", link: "https://www.luogu.com.cn/problem/P1553", desc: "<b>数字反转</b><br>考察：字符串处理<br>难度：★★★" },
        ],
      },
    },

    /* ===== 19 下节预告 ===== */
    {
      id: 19, type: "radial", title: "下节预告", subtitle: "第 8 讲 · 函数",
      data: { center: "函数", items: [ { text: "代码复用" }, { text: "定义与调用" }, { text: "参数与返回" }, { text: "作用域" } ] },
    },

    /* ===== 20 答疑时间 ===== */
    {
      id: 20, type: "grid", title: "答疑时间", subtitle: "字符串常见 FAQ", chapterTag: "第 7 讲 · 答疑",
      data: {
        cards: [
          { icon: "🆚", title: "string 能用 == 比较吗？", desc: "可以！<code>string s1, s2; if(s1 == s2)</code> 是合法的。<br>但如果是 <code>char[]</code>，绝对不能用 ==，必须用 <code>strcmp(s1, s2)</code>。" },
          { icon: "📏", title: "length() 要减 1 吗？", desc: "不需要。如果长度是 5，合法下标就是 0 到 4。循环直接写 <code>i &lt; s.length()</code> 即可。" },
          { icon: "🕳️", title: "getline 吞了数字怎么办？", desc: "这是输入流的状态错误。只要在 getline 前加上 <code>cin.ignore()</code> 吃掉回车即可。" },
          { icon: "🔢", title: "怎么把字符串变数字？", desc: "非常高频的需求！用 <code>stoi(s)</code> 可以把 <code>\"123\"</code> 变成数字 123。第 12 讲会详细说。" },
        ],
      }
    },

    /* ===== 21 本讲英文单词 ===== */
    {
      id: 21, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 7 讲 · 复习",
      data: {
        words: [
          { word: "string", cn: "字符串", pron: "/strɪŋ/", origin: "英文原意“一串”", category: "类型" },
          { word: "length", cn: "长度", pron: "/leŋθ/", origin: "英文原意“长度”", category: "函数" },
          { word: "getline", cn: "获取一行", pron: "/ɡet laɪn/", origin: "get (获取) + line (行)", category: "函数" },
          { word: "ignore", cn: "忽略", pron: "/ɪɡˈnɔːr/", origin: "英文原意“不理睬”", category: "函数" },
        ],
      },
    },

    /* ===== 22 结束页 ===== */
    {
      id: 22, type: "ending", title: "第七讲结束", subtitle: "点击返回目录，复习本讲内容", chapterTag: false,
      data: { 
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 文本处理的第一步",
          desc: "今天，你的程序从只能处理数字，进化到了能处理文字。<br><br>但字符串的坑远不止这些。比如你想把一句话截断，或者找找里面有没有出现某个词，该怎么办？<br><br>下一讲，我们将打开字符串的‘工具箱’，见识一下什么叫真正的降维打击。<br><br>📌 <b>行动号召</b>：去洛谷把 P5015 标题统计刷掉。切记：<b>读一整行一定要用 getline！</b>",
          variant: "card-glow"
        }
      },
    },
  ],
};
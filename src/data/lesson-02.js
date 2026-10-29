export default {
  title: "第 2 讲 变量与整数类型",
  subtitle: "让程序学会记住数据",
  total: 30,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1,
      type: "cover",
      title: "变量与整数类型",
      subtitle: "让程序学会记住数据",
      chapterTag: false,
      data: {
        accentWord: "变量",
        meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 2 讲"],
      },
    },

    /* ===== 2 钩子：怎么让程序会算数 ===== */
    {
      id: 2,
      type: "grid",
      title: "怎么让程序会算数",
      subtitle: "从写死的数字，到万能的计算模板",
      chapterTag: "第 2 讲 · 开场",
      data: {
        cards: [
          {
            icon: "🧮",
            title: "数学课上的万能解法",
            desc: "老师问：1班人数 + 2班人数等于几？<br>你不知道具体人数，怎么算？<br>你会设 <b>x = 1班人数</b>，<b>y = 2班人数</b>，答案就是 <code>x + y</code>。"
          },
          {
            icon: "🏨",
            title: "程序中的“代号”",
            desc: "程序也是一样。在内存里借两块空间，贴上标签叫 <code>a</code> 和 <code>b</code>。<br>用户输入具体数字，程序自动算 <code>a + b</code>。<br>这个“可变的代号”，就叫<b>变量</b>。"
          }
        ],
        footer: '<b>📌 灵魂拷问</b>：数学里的 x 可以是 10，也可以是 200；可以是整数，也可以带小数。<br>程序里的“代号”能装下所有种类的东西吗？今天，我们就来学习怎么给内存“贴标签”。'
      }
    },

    /* ===== 3 上节回顾 ===== */
    {
      id: 3,
      type: "timeline",
      variant: "review",
      title: "上节课回顾",
      subtitle: "从第一个程序到今天的新问题",
      data: {
        items: [
          { icon: "📤", badge: "输出", title: "第一个程序", desc: "Hello, World! 和程序框架", points: ["头文件、命名空间", "int main()", "cout <<", "return 0"] },
          { icon: "⚙️", badge: "编译", title: "从代码到运行", desc: ".cpp → .obj → .exe", points: ["编译翻译机器码", "链接拼装成程序", "运行输出结果"] },
          { icon: "🏆", badge: "OJ", title: "提交与判题", desc: "注册、提交、看结果", points: ["AC 通过", "WA 答案错", "CE 编译错", "TLE 超时"] },
          { icon: "⚠️", badge: "易错", title: "四大常见错误", desc: "编译报错的主要原因", points: ["中文标点", "漏分号", "大小写错", "括号不配对"] },
        ],
      },
    },

    /* ===== 4 本节课目标 ===== */
    {
      id: 4, type: "grid", title: "本节课目标", subtitle: "四步让程序记住数据",
      data: {
        cards: [
          { number: "01", title: "理解变量", desc: "变量 = 酒店房间" },
          { number: "02", title: "输入与命名", desc: "用 cin 接收数据" },
          { number: "03", title: "整数类型", desc: "int 与 long long 的边界" },
          { number: "04", title: "常量 const", desc: "锁定不可变的数据" },
        ],
        footer: '<b>📌 今天的路线</b>：建房间（变量） → 迎客（cin 输入） → 换大房（long long） → 焊死门（const）。'
      },
    },

    /* ===== 5 学习地图 ===== */
    {
      id: 5,
      type: "timeline",
      variant: "map",
      title: "本讲学习地图",
      subtitle: "四站闯关，从零到防坑",
      data: {
        items: [
          { icon: "🧠", badge: "基础", title: "第一站 · 变量与输入", desc: "房间与迎客", points: ["变量三要素", "cin 读入数据", "黑窗口输入格式"] },
          { icon: "💥", badge: "冲突", title: "第二站 · 内存限制", desc: "int 的天花板", points: ["21亿视觉冲击", "符号位溢出", "long long 解药"] },
          { icon: "🔒", badge: "进阶", title: "第三站 · 常量", desc: "焊死的保险箱", points: ["const 语法", "防止手滑修改"] },
          { icon: "🏆", badge: "实战", title: "第四站 · 避坑", desc: "初赛与机房排雷", points: ["类型大小记忆", "机房实操急救"] },
        ],
      },
    },

    /* ===== 6 为什么需要变量 ===== */
    {
      id: 6, type: "origin", title: "为什么需要变量？", subtitle: "从内存地址到名字的演进", chapterTag: "第 2 讲 · 概念理解",
      data: {
        problem: {
          title: "没有变量时，程序怎么存数据？",
          points: ["程序员必须直接操作<b>内存地址</b>", "地址是 <code>0x1000</code> 这样的十六进制数——难记、难写", "换个电脑，地址可能就变了"],
          visual: "// 想存一个数，必须记住它的地址\nmov [0x1000], 3\nmov [0x1004], 5\nadd eax, [0x1000]\nadd eax, [0x1004]",
        },
        evolution: [
          { icon: "🔴", era: "1940s", title: "机器语言", desc: "直接写 0/1，地址全靠人脑记" },
          { icon: "🟡", era: "1949", title: "汇编语言", desc: "用 <code>ADD</code>、<code>MOV</code> 助记符代替 0/1，但仍要记地址" },
          { icon: "🟢", era: "1957", title: 'FORTRAN —— 第一个"变量"', desc: "第一次让程序员用<b>名字</b>代表地址，不用再记 0x1000" },
        ],
        summary: {
          title: "今天的变量：用名字代替地址",
          desc: "编译器帮我们管理地址——<br>程序员只需起个名字，剩下的交给编译器。",
          code: "int age = 11;   // 名字是 age，地址由编译器分配",
        },
        extra: {
          title: "📖 知识扩展 · 为什么叫「变量」？",
          desc: '<div>因为房间里的住客是可以<b>变化</b>的。<br>今天住的是 11，明天可以换成 12。</div><div>内存空间不变，但里面的值可以变，所以叫“变量”。</div><div>反之，永远不变的，就叫“常量”（我们在本讲最后会学）。</div>',
          variant: "card-primary",
        },
      },
    },

    /* ===== 7 变量定义与赋值 ===== */
    {
      id: 7, type: "code-split", title: "变量定义与赋值", subtitle: "两步走 或 一步到位",
      data: {
        intro: '📖 <b>定义</b>变量 = 给盒子起名字；<b>赋值</b> = 往盒子里放数据。<br>两件事可以分两步做，也可以一步完成。',
        codeFile: 'codes/lesson-02/var-basic.cpp', snippet: 'main',
        annotations: [
          { line: 6, title: 'int age;', desc: '定义：声明一个整数盒子，名字叫 age' },
          { line: 7, title: 'age = 11;', desc: '赋值：把 11 放进 age 里' },
          { line: 9, title: 'int score = 98;', desc: '定义 + 赋值一步到位（推荐写法）' },
          { line: 10, title: 'score = 100;', desc: '重新赋值：可以随时修改' }
        ],
        output: '11\n100',
        footer: '<b>⚠️ 机房急救</b>：如果定义变量后没有赋值就直接使用（如 <code>int a; cout << a;</code>），它会输出一个不可预测的“垃圾值”。<br><b>铁律：定义变量，顺手给初值。</b>'
      }
    },

    /* ===== 8 练习1：定义变量 ===== */
    {
      id: 8, type: "level-map", title: "课堂练习1：定义变量", subtitle: "定义 3 个变量并输出", chapterTag: "第 2 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "定义三个变量：<code>age = 11</code>、<code>score = 98</code>、<code>year = 2026</code>，分三行输出。", timer: "⏱ 限时 5 分钟" },
        hints: ["用 <code>int</code> 定义", "一步定义 + 赋值：<code>int age = 11;</code>", "每行一个 <code>cout</code> 加 <code>endl</code>"],
        answer: { codeFile: "codes/lesson-02/var-practice.cpp" },
        analysis: { title: "📖 解析", desc: "<b>定义变量 + 赋值</b>是编程的第一步。<br>推荐一步写：<code>int age = 11;</code> —— 避免忘了赋值。" }
      }
    },

    /* ===== 9 cin 输入 ===== */
    {
      id: 9, type: "code-split", title: "cin · 让程序读入数据", subtitle: "核心语法：cin >> 变量;",
      data: {
        intro: '📖 <code>cout</code> 是"输出"，<code>cin</code> 是"输入"。<br>方向记忆：<b>cout 用 <code>&lt;&lt;</code>，数据流向屏幕；cin 用 <code>&gt;&gt;</code>，数据流向变量。</b>',
        codeFile: 'codes/lesson-02/cin-cout.cpp', snippet: 'main',
        annotations: [
          { line: 6, title: 'int a, b;', desc: '一次定义两个整型变量' },
          { line: 7, title: 'cin &gt;&gt; a &gt;&gt; b;', desc: '从键盘读两个整数，空格或回车分隔' },
          { line: 8, title: 'cout &lt;&lt; a + b;', desc: '输出两数之和' }
        ],
        output: '（输入 3 5）\n8'
      }
    },

    /* ===== 10 冲突①：为什么敲逗号没反应 ===== */
    {
      id: 10, type: "dialog", title: "为什么敲逗号没反应？", subtitle: "机房输入的第一大惨案", chapterTag: "第 2 讲 · 概念理解",
      data: {
        lines: [
          { who: "student", text: "小 C，我写了 <code>cin >> a >> b;</code>。运行后我输入了 <code>3,5</code>（带逗号），结果程序直接跳过输出了，算出来不对！" },
          { who: "robot", text: "别慌，你没写错代码。<b>错在你在黑窗口里的输入姿势。</b>" },
          { who: "student", text: "平时写字 3 和 5 之间不都用逗号隔开吗？" },
          { who: "robot", text: '在 C++ 的黑窗口里，<b><code>cin</code> 是个死板的保安，它只认空格和回车。</b><br>你敲了 <code>3,5</code>，它认为这是一个字符串，读不出第二个数。' },
          { who: "student", text: "原来如此！那我应该怎么敲？" },
          { who: "robot", text: '敲 <code>3</code>，按一下<b>空格</b>，再敲 <code>5</code>。<br>或者敲 <code>3</code> 按<b>回车</b>，再敲 <code>5</code>。记住：<b>机房里输入，绝不能用逗号、顿号！</b>' },
        ]
      }
    },

    /* ===== 11 急救：cin 输入的三个坑 ===== */
    {
      id: 11, type: "pitfall", title: 'cin 输入的三个坑', subtitle: '知道这些，才不会机房翻车',
      data: {
        cases: [
          { icon: '❌', scene: '输入 abc，变量是 int 类型', what: '<code>cin</code> 读取失败，变量值不确定', why: '<code>cin</code> 期望数字，遇到字母会"卡住"', fix: '竞赛题保证输入格式正确——不用担心' },
          { icon: '❌', scene: '输入 3.5，变量是 int 类型', what: '变量读到 <code>3</code>，<code>.5</code> 留在缓冲区', why: '<code>cin</code> 遇到不匹配的字符就停止读取', fix: '整数变量只读整数——小数要用 <code>double</code>' },
          { icon: '❌', scene: '输入 3,5 (带逗号)', what: '程序只读到了 <code>3</code>，后面的没读进去', why: '默认情况下，<code>cin</code> 认为空格和回车才是分隔符', fix: '输入两个数时，中间只能用<b>空格</b>或<b>回车</b>' }
        ],
        footer: '<b>📌 机房救命小贴士</b>：在运行黑窗口输入数据时，多个数字之间只能用 <b>空格</b> 或 <b>回车</b> 隔开，千万别敲逗号 <code>,</code>。'
      }
    },

    /* ===== 12 冲突②：眼见为实：溢出多可怕 ===== */
    {
      id: 12, type: "code-walkthrough", title: "眼见为实：溢出多可怕？", subtitle: "别光听规则，我们跑个程序", chapterTag: "第 2 讲 · 概念理解",
      data: {
        intro: "刚才我们学了 int。现在我们把 int 能存的最大值放进去，给它 <b>加 1</b>，看看会发生什么。",
        code: "int a = 2147483647;\na = a + 1;\ncout << a;",
        steps: [
          {
            title: "准备好触发器",
            line: 1,
            vars: { a: "2147483647" },
            note: "把 int 能存的最大值放进了 a。<br>还能更大吗？接着往下看。"
          },
          {
            title: "危险动作：加 1",
            line: 2,
            vars: { a: "-2147483648" },
            note: "<b>屏幕炸了！</b><br>加 1 之后，它没有变大，反而变成了一个巨大的负数。<br>为什么？"
          },
          {
            title: "真相大白",
            line: 3,
            vars: { a: "-2147483648" },
            note: "因为 32 位全被占满了，再加 1，最高位的“符号位”被顶翻，变成了代表负数的 1。<br>这就是比赛中让人痛不欲生的「整数溢出」。"
          }
        ],
        extra: { 
          title: "📖 课堂小实验", 
          desc: "现在打开你的 Dev-C++，把这三行代码敲进去。按 F11 看看是不是这个负数。<br>亲眼看到一次，比背十遍口诀管用。", 
          variant: "card-primary" 
        }
      }
    },

    /* ===== 13 为什么变成负数了（原理揭示） ===== */
    {
      id: 13, type: "dialog", title: "为什么变成负数了？", subtitle: "符号位的奇妙原理", chapterTag: "第 2 讲 · 概念理解",
      data: {
        lines: [
          { who: "student", text: "小 C，加 1 怎么反而变小了，还变成了负数？数学里不是这样的！" },
          { who: "robot", text: '因为计算机的空间是有限的。想象一下汽车仪表盘，里程数到了 99999 再加 1，就会变成 00000。' },
          { who: "student", text: "那为什么是变成负数，不是变成 0？" },
          { who: "robot", text: '因为 int 占 4 个字节（32 个小格）。<br>最左边那个格子，不仅要存数，还要兼职当<b>“符号位”</b>。如果是 0 代表正数，1 代表负数。' },
          { who: "student", text: "我好像有点懂了。" },
          { who: "robot", text: '当你加到 2147483647 时，所有格子都是满的。再加 1，发生进位，把最左边代表正数的 0 给顶翻了，变成了 1。<br>于是，计算机以为你存了一个巨大的负数。' },
        ]
      }
    },

    /* ===== 14 难题后的放松·命名玄学 ===== */
    {
      id: 14, type: "grid", title: "🎨 命名玄学", subtitle: "为什么循环总用 i、j、k？", chapterTag: "第 2 讲 · 知识讲解",
      data: {
        cards: [
          { icon: "🔤", title: "为什么用 i、j、k？", desc: "数学里求和用 <b>Σ</b>，下标是 <b>i</b>。<br>1957 年 FORTRAN 规定：以 I 到 N 开头的变量名自动是整数。<br>从此 <code>i</code>、<code>j</code>、<code>k</code> 就成了循环变量的默契。<br><b>70 年过去，还在用。</b>" },
          { icon: "🍫", title: "为什么用 foo、bar？", desc: '<b>foo</b> 来自二战雷达术语 FU（Fouled Up，一团糟）。<br><b>bar</b> 来自 1930 年代漫画《Smokey Stover》。<br>程序员把它们当"占位符"用——<br>不重要的名字，就叫 <code>foo</code>、<code>bar</code>、<code>baz</code>。' },
        ],
        footer: '<b>📌 好名字值千金</b><br>编程界有句名言：<b>"计算机科学只有两件难事——缓存失效和命名。"</b><br><br>❌ <code>a</code>、<code>b</code>、<code>temp</code> —— 过两天不知道是什么<br>✅ <code>math_score</code>、<code>total_count</code> —— 见名知意<br><br><b>原则</b>：名字要像"自我介绍"——不用解释就能看懂。'
      }
    },

    /* ===== 15 int 类型的极限 ===== */
    {
      id: 15, type: "big-number", title: "int · 普通整数", subtitle: "最常用的整数类型，但它的极限在哪里？",
      data: {
        number: "2147483647", unit: "约 21 亿",
        card: { title: "这就是 int 的“天花板”", desc: "int 占 4 字节，正数最大只能存到 <b>2147483647</b>。<br><br>记住这个数字——它经常在初赛题和竞赛题里坑人。" },
        footer: '<b>📌 灵魂拷问</b>：<br>如果我把 2147483647 <b>再加 1</b>，屏幕会输出什么？<br>是 2147483648 吗？下一页我们跑个程序看看。'
      },
    },

    /* ===== 16 long long 类型 ===== */
    {
      id: 16, type: "code-split", title: "long long · 大整数", subtitle: "存得下更大的数",
      data: {
        intro: '📖 既然 int 会溢出，我们就需要更大的盒子。<code>long long</code> 是"长整型"，占 <b>8 字节</b>，范围约 <b>±9×10¹⁸</b>。<br>竞赛中遇到大数运算，必须用它。<br><br><b>写法注意</b>：<code>long long</code> 是<b>两个单词</b>，中间有空格——不能写成 <code>longlong</code>。',
        codeFile: "codes/lesson-02/longlong-type.cpp", snippet: "main",
        annotations: [
          { line: 6, title: "long long a = 10000000000;", desc: "100 亿——int 装不下，long long 可以" },
          { line: 7, title: "long long b = 9999999999;", desc: "注意写法：<code>long long</code> 是两个单词" },
          { line: 8, title: "cout &lt;&lt; a + b;", desc: '大数运算不会溢出<br><b>💡 记忆</b>：int 像"中等行李箱"，long long 像"大衣柜"' },
        ],
        output: "19999999999",
      },
    },

    /* ===== 17 决策指南 ===== */
    {
      id: 17, type: "decision", title: "什么时候必须用 long long？", subtitle: "看到这些信号，就要警惕溢出",
      data: {
        intro: '📖 <b>口诀不够用</b>——"不确定用 long long"太笼统。<br>下面是<b>具体的判断信号</b>：看到这些关键词，就该想到 long long。',
        signals: [
          { icon: "➕", keyword: "求和", desc: "n 个数的和可能超过 21 亿<br>例：1000 个数，每个 ≤ 10⁷" },
          { icon: "✖️", keyword: "乘积", desc: "<code>a × b</code> 可能溢出<br>例：a、b 都接近 10⁵，乘积就超 10⁹" },
          { icon: "📉", keyword: "阶乘", desc: "阶乘增长极快<br>13! 就超 int 范围" },
          { icon: "📊", keyword: "数据范围 ≥ 10⁹", desc: '题目直接给出<br>就明说"要用 long long"' },
          { icon: "💰", keyword: "累加 / 累计", desc: '类似"总分""总价""总和"<br>都需要预判最大值' },
          { icon: "🔢", keyword: "大数运算", desc: "如天文数字、人口统计<br>先想会不会超 int" },
        ],
        conclusion: { title: "判断法则", desc: '看到以上任一信号——<br><b>先问自己："结果会不会超过 21 亿？"</b><br>超过就用 long long，不确定也用 long long。<br><br>📌 多花 4 字节，避免"答案全错"——<br>这笔账，永远划算。' },
        extra: { title: "💡 反例：阿丽亚娜 5 号火箭", desc: '<div>1996 年，欧洲航天局的一枚火箭——<br>发射 <b>37 秒后</b>在高空解体，损失 <b>3.7 亿美元</b>。</div><div><b>事故原因</b>：火箭复用了旧软件的模块——<br>旧模块用 <b>16 位整数</b>存速度，最大值 32767。<br>火箭更快——速度超了，<b>整数溢出</b>。</div><div>程序崩溃，火箭失控。</div><div><b>教训</b>：选错类型，不是"答案错"，是"火箭炸了"。</div>', variant: "card-primary" }
      },
    },

    /* ===== 18 练习2：大数求和 ===== */
    {
      id: 18, type: "level-map", title: "课堂练习2：大数求和", subtitle: "用 long long 避免溢出", chapterTag: "第 2 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入 4 个大整数（每个可达 10¹⁰），输出它们的和。<br>输入样例：<code>10000000000 20000000000 30000000000 40000000000</code><br>输出样例：<code>100000000000</code>", timer: "⏱ 限时 8 分钟" },
        hints: ["每个数可能超过 21 亿，<b>必须用 long long</b>", "四个数之和可能更大，也要用 long long 保存", "cin 和 cout 对 long long 一样适用"],
        answer: { codeFile: "codes/lesson-02/big-sum.cpp" },
        analysis: { title: "📖 解析", desc: "<b>考点是类型选择</b>。<br>题目说“每个数可达 10¹⁰”——10¹⁰ > 21 亿 → 必须用 long long。<br>四个数之和更大 → 也要用 long long 存。<br><br><b>口诀</b>：大数用 long long，不确定时优先 long long。" }
      }
    },

    /* ===== 19 过渡页 ===== */
    {
      id: 19, type: "transition", title: "第四站 · 常量", subtitle: "有些值，永远不变",
      data: { note: '我们学了"会变"的变量，现在看看"不变"的常量' },
    },

    /* ===== 20 常量 const ===== */
    {
      id: 20, type: "dialog", title: "常量 const", subtitle: "不变的值有专门的家", chapterTag: "第 2 讲 · 常量",
      data: {
        lines: [
          { who: "student", text: "小 C，我写算圆面积的程序，π 就是写 3.14159 对吧？" },
          { who: "robot", text: "可以，但想象一个场景：你写了 <b>2000 行代码</b>，到处都是 3.14159。" },
          { who: "student", text: "然后呢？" },
          { who: "robot", text: "后来老师说 π 的精度要提高到 3.1415926。你是不是得把 2000 行里的数字全改一遍？一不小心改漏一个，答案就错了。" },
          { who: "student", text: "那怎么办？" },
          { who: "robot", text: "用<b>常量</b>！在开头定义一次：<code>const double PI = 3.1415926;</code>，下面全用 <code>PI</code>。<br>以后要改，改上面这一行就行了。<br>而且如果你不小心写了 <code>PI = 3.14;</code>，编译器会直接报错拦住你！" },
          { who: "student", text: "原来 const 是为了省事和防错！" }
        ]
      },
    },

    /* ===== 21 const 代码演示 ===== */
    {
      id: 21, type: "code-split", title: "const 常量 · 代码演示", subtitle: "定义后不可修改",
      data: {
        intro: "📖 <b>语法</b>：<code>const 类型 名字 = 值;</code><br>const 定义的变量，一旦赋值就不能再改——这是它和普通变量唯一的区别。",
        codeFile: "codes/lesson-02/const-basic.cpp", snippet: "main",
        annotations: [
          { line: 5, title: "const double PI = 3.14159;", desc: "定义常量 PI——圆周率，永不改变" },
          { line: 6, title: "const int MAXN = 100005;", desc: "定义数组最大长度——统一管理" },
          { line: 10, title: "double area = PI * r * r;", desc: "常量参与运算——和普通变量一样" },
        ],
        output: "（输入 5）\n78.5397",
      },
    },

    /* ===== 22 练习3：圆的面积 ===== */
    {
      id: 22, type: "level-map", title: "课堂练习3：圆的面积", subtitle: "用 const 和 double", chapterTag: "第 2 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入圆的半径 <code>r</code>，输出圆的面积。<br>要求：定义常量 <code>const double PI = 3.14159;</code>。<br>输入样例：<code>5</code>　输出样例：<code>78.5397</code>", timer: "⏱ 限时 5 分钟" },
        hints: ["用 <code>const double PI = 3.14159;</code> 定义圆周率", "用 <code>double</code> 存半径", "面积 = <code>PI * r * r</code>"],
        answer: { codeFile: "codes/lesson-02/circle.cpp" },
        analysis: { title: "📖 解析", desc: "<b>const 的经典用法</b>——把圆周率固定死，防止后面手滑改掉。<br>定义：<code>const 类型 名字 = 值;</code>。" }
      }
    },

    /* ===== 23 初赛渗透 ===== */
    {
      id: 23, type: "grid", title: "初赛小知识：类型大小", subtitle: "CSP-J/S 初赛必考", chapterTag: "第 2 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "🔢", title: "常见类型字节数", desc: "这是初赛每年的<b>送分题</b>，必须死记：<br>· <code>int</code> = <b>4 字节</b><br>· <code>long long</code> = <b>8 字节</b><br>· <code>double</code> = <b>8 字节</b><br>· <code>char</code> / <code>bool</code> = <b>1 字节</b>" },
          { icon: "💾", title: "计算内存占用", desc: "已知 1 字节 = 8 位。<br>如果定义 <code>int a[100];</code>，占多少内存？<br>100 × 4 = <b>400 字节</b>。<br><br>通常还会考换成 KB（除以 1024）。" },
          { icon: "⚠️", title: "溢出判断", desc: "题目问：<code>int a = 2147483647; a = a + 1;</code> 结果是多少？<br>因为超了 int 范围，会发生<b>溢出</b>，变成负数（-2147483648）。" }
        ],
        footer: '<b>📌 初赛避坑</b>：初赛不仅考概念，还会考你的“算数能力”。<b>别把 long long 的字节数和 int 记混了。</b>'
      }
    },

    /* ===== 24 课堂小测 ===== */
    {
      id: 24, type: "quiz", title: "课堂小测", subtitle: "变量、输入与整数类型", chapterTag: "第 2 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "2020 CSP-J 初赛 · 第 3 题", optionLayout: "horizontal", question: "以下哪个是 C++ 合法的变量名？", options: [ { label: "A", text: "<code>123name</code>" }, { label: "B", text: "<code>my_name</code>", correct: true }, { label: "C", text: "<code>my-name</code>" }, { label: "D", text: "<code>my name</code>" } ], analysis: 'C++ 变量名规则：<br>① 只能含字母、数字、下划线<br>② <b>不能以数字开头</b><br>③ 不能含空格或特殊符号（如 <code>-</code>）<br><br>A 以数字开头，错；B 合法；C 含 <code>-</code>，错；D 含空格，错。<br>这是本讲"变量命名规则"的直接考查。' },
          { id: 2, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 数据类型", optionLayout: "horizontal", question: "<code>int</code> 类型在常见编译器中通常占用几个字节？", options: [ { label: "A", text: "1 字节" }, { label: "B", text: "2 字节" }, { label: "C", text: "4 字节", correct: true }, { label: "D", text: "8 字节" } ], analysis: '常见类型字节数：<br>· <code>int</code> = <b>4 字节</b>（32 位）<br>· <code>long long</code> = 8 字节<br>· <code>double</code> = 8 字节<br>· <code>char</code> / <code>bool</code> = 1 字节<br><br>这是初赛的高频考点，对应本讲"初赛渗透：类型大小"。' },
          { id: 3, type: "single", difficulty: 3, source: "CSP-J 2021 初赛模拟题 · 变量", optionLayout: "two-cols", question: "下面代码的输出是什么？", questionCode: `int a;\ncout << a << endl;`, options: [ { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "垃圾值，不确定", correct: true }, { label: "D", text: "编译错误" } ], analysis: '未初始化的局部变量里是<b>垃圾值</b>，不是 0。<br>它的值取决于内存中残留的旧数据，结果不可预测。<br>所以定义变量时要养成初始化的好习惯：<code>int a = 0;</code>。<br>这是本讲"未初始化变量的坑"的直接考查。' },
          { id: 4, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第二章", optionLayout: "two-cols", question: "变量名不能以数字开头。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: 'C++ 变量名规则：首字符必须是<b>字母或下划线</b>，不能是数字。<br>例如 <code>age</code>、<code>_count</code>、<code>a1</code> 都合法；<code>1a</code>、<code>123</code> 都不合法。<br>这是本讲"变量命名规则"的核心内容。' },
          { id: 5, type: "judge", difficulty: 3, source: "CSP-J 初赛真题练习 · 数据类型", optionLayout: "two-cols", question: "在 C++ 中，<code>int</code> 类型能存储的最大值约为 21 亿（2147483647）。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: 'int 占 4 字节（32 位），正负各占一半，最大正数是 <b>2³¹ - 1 = 2147483647</b>，约 21 亿。<br>超出这个范围就会"溢出"，结果变成错误的负数。<br>大数运算要用 <code>long long</code>。<br>这是本讲"int 类型"的核心知识点。' },
        ],
      },
    },

    /* ===== 25 今日总结 ===== */
    {
      id: 25, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "变量是带名字的盒子，类型是盒子的大小。", author: "—— 变量第一课",
        points: [ "变量 = 名字 + 类型 + 值", "定义语法：类型 名字 = 初值;", "cin 输入：cin >> 变量;", "命名规则：字母数字下划线，不能数字开头", "int：4 字节，约 ±21 亿", "long long：8 字节，约 ±9×10¹⁸", "const 常量：值不可改变" ],
        highlight: { title: "📌 关键口诀", desc: "变量是盒子，名字要清晰；定义先初始化，cin 读数据；整数用 int，大数 long long；常量用 const，改它编译器会拦。" },
        extra: { title: '💡 今天你让程序学会了"记忆"', desc: '从只会"输出"到能"记住数据"，程序的能力又上了一个台阶。<br>变量是所有程序的基础——没有变量，就没有"计算"，就没有"判断"，就没有"算法"。<br>今天你已经掌握了编程最核心的工具之一。<br><br>🔮 <b>伏笔</b>：<br>· 变量只能存<b>一个</b>数据。如果要存 100 个呢？<br>· 数据除了整数，还有小数、字符、真假。<br>· 为什么 int 最大是 21 亿？为什么会有"溢出"？<br>这些问题的答案，会在后续讲次揭晓。', variant: "card-primary" },
      },
    },

    /* ===== 26 课后作业 ===== */
    {
      id: 26, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P1001", link: "https://www.luogu.com.cn/problem/P1001", desc: "<b>A+B Problem</b><br>考察：cin、变量、加法<br>难度：★<br>目标：读两个数，输出和" },
          { icon: "🟢", title: "基础 2 · P5703", link: "https://www.luogu.com.cn/problem/P5703", desc: "<b>苹果采购</b><br>考察：变量、乘法<br>难度：★<br>目标：读两个数，输出乘积" },
          { icon: "🔴", title: "挑战 · B2033", link: "https://www.luogu.com.cn/problem/B2033", desc: "<b>A*B Problem</b><br>考察：long long、结果范围预判<br>难度：★★<br>目标：输入 ≤ 50000，乘积超 int，选对类型" },
        ],
      },
    },

    /* ===== 27 下节预告 ===== */
    {
      id: 27, type: "radial", title: "下节预告", subtitle: "第 3 讲 · 小数、字符、布尔与类型转换",
      data: {
        center: "类型",
        items: [ { text: "double 小数" }, { text: "char 字符" }, { text: "bool 布尔" }, { text: "类型转换" } ],
      },
    },

    /* ===== 28 答疑时间 ===== */
    {
      id: 28, type: "grid", title: "自由提问时间", subtitle: "把你不懂的问题，大声说出来", chapterTag: "第 2 讲 · 互动",
      data: {
        cards: [
          { icon: "📦", title: "关于变量", desc: "名字、类型、初值<br>为什么未初始化是垃圾值？" },
          { icon: "📥", title: "关于 cin", desc: "怎么读、空格怎么算<br>遇到输入格式不对怎么办？" },
          { icon: "🔢", title: "关于类型", desc: "int 和 long long 到底选哪个？<br>什么时候会溢出？" },
          { icon: "🔒", title: "关于 const", desc: "为什么要用常量？<br>它和普通变量有什么区别？" }
        ],
        footer: '<b>📌 提问的三个层次</b><br>① 问“是什么”：查资料能解决。<br>② 问“为什么”：理解原理的钥匙。<br>③ 问“怎么办”：代码报错卡住了。<br><br><b>大胆开口！</b>'
      }
    },

    /* ===== 29 本讲英文单词 ===== */
    {
      id: 29, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 2 讲 · 复习",
      data: {
        words: [
          { word: "variable", cn: "变量", pron: "/ˈveəriəbl/", origin: "vary (变化) + able (可以) = 可变化的", category: "概念" },
          { word: "cin", cn: "输入", pron: "/siː ɪn/", origin: "character input 的缩写", category: "函数" },
          { word: "int", cn: "整数", pron: "/ɪnt/", origin: "integer 的缩写", category: "类型" },
          { word: "long long", cn: "长整型", pron: "/lɒŋ lɒŋ/", origin: "long (长) + long (长)", category: "类型" },
          { word: "const", cn: "常量", pron: "/ˈkɒnstənt/", origin: "constant (不变的) 的缩写", category: "关键字" },
          { word: "overflow", cn: "溢出", pron: "/ˌəʊvəˈfləʊ/", origin: "over (超过) + flow (流动) = 溢出", category: "概念" },
        ]
      },
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: "ending", title: "第二讲结束", subtitle: "点击返回目录，复习本讲内容", chapterTag: false,
      data: { slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题" },
    },
  ],
};
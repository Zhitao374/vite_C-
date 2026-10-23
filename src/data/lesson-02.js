export default {
  title: "第 2 讲 变量与整数类型",
  subtitle: "让程序学会记住数据",
  total: 35,
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

    /* ===== 2 上节回顾 ===== */
    {
      id: 2,
      type: "timeline",
      variant: "review",
      title: "上节课回顾",
      subtitle: "从第一个程序到今天的新问题",
      data: {
        items: [
          {
            icon: "📤",
            badge: "输出",
            title: "第一个程序",
            desc: "Hello, World! 和程序框架",
            points: ["头文件、命名空间", "int main()", "cout <<", "return 0"],
          },
          {
            icon: "⚙️",
            badge: "编译",
            title: "从代码到运行",
            desc: ".cpp → .obj → .exe",
            points: ["编译翻译机器码", "链接拼装成程序", "运行输出结果"],
          },
          {
            icon: "🏆",
            badge: "OJ",
            title: "提交与判题",
            desc: "注册、提交、看结果",
            points: ["AC 通过", "WA 答案错", "CE 编译错", "TLE 超时"],
          },
          {
            icon: "⚠️",
            badge: "易错",
            title: "四大常见错误",
            desc: "编译报错的主要原因",
            points: ["中文标点", "漏分号", "大小写错", "括号不配对"],
          },
        ],
      },
    },

    /* ===== 3 本节课目标 ===== */
    {
      id: 3,
      type: "grid",
      title: "本节课目标",
      subtitle: "四步让程序记住数据",
      data: {
        cards: [
          { number: "01", title: "理解变量", desc: "变量是什么、为什么需要它" },
          {
            number: "02",
            title: "输入与命名",
            desc: "cin 输入数据、变量命名规则",
          },
          {
            number: "03",
            title: "整数类型",
            desc: "int 和 long long 的区别与选择",
          },
          { number: "04", title: "常量 const", desc: "不变的值用 const 保存" },
        ],
      },
    },

    /* ===== 4 为什么需要变量？（origin 版） ===== */
    {
      id: 4,
      type: "origin",
      title: "为什么需要变量？",
      subtitle: "从内存地址到名字的演进",
      chapterTag: "第 2 讲 · 概念理解",
      data: {
        problem: {
          title: "没有变量时，程序怎么存数据？",
          points: [
            "程序员必须直接操作<b>内存地址</b>",
            "地址是 <code>0x1000</code> 这样的十六进制数——难记、难写",
            "换个电脑，地址可能就变了",
          ],
          visual:
            "// 想存一个数，必须记住它的地址\nmov [0x1000], 3\nmov [0x1004], 5\nadd eax, [0x1000]\nadd eax, [0x1004]",
        },
        evolution: [
          {
            icon: "🔴",
            era: "1940s",
            title: "机器语言",
            desc: "直接写 0/1，地址全靠人脑记",
          },
          {
            icon: "🟡",
            era: "1949",
            title: "汇编语言",
            desc: "用 <code>ADD</code>、<code>MOV</code> 助记符代替 0/1，但仍要记地址",
          },
          {
            icon: "🟢",
            era: "1957",
            title: 'FORTRAN —— 第一个"变量"',
            desc: "第一次让程序员用<b>名字</b>代表地址，不用再记 0x1000",
          },
        ],
        summary: {
          title: "今天的变量：用名字代替地址",
          desc: "编译器帮我们管理地址——<br>程序员只需起个名字，剩下的交给编译器。",
          code: "int age = 11;   // 名字是 age，地址由编译器分配",
        },
        extra: {
          title: "📖 变量名的长度限制",
          desc: '<div>1957 年，FORTRAN 的变量名最多只能用 <b>6 个字符</b>——因为打孔卡一行空间有限。</div><div>今天你写 <code>student_total_score</code> 这种长名字，在当年是不可能的。</div><div>🔮 <b>伏笔</b>：仓库的"门牌号"到底是什么？其实是一串二进制数。第 22 讲揭晓。</div>',
          variant: "card-primary",
        },
      },
    },

       /* ===== 5 变量 = 盒子 ===== */
    {
      id: 5, type: "grid", title: "变量 · 带名字的盒子", subtitle: "三要素：名字、类型、值",
      data: {
        cards: [
          {
            icon: "🏷️",
            title: "① 名字",
            desc: '变量的"标签"<br>要有意义，见名知意<br>如 <code>age</code>、<code>score</code><br><br><b>⚠️ 命名规则</b><br>· 只能字母、数字、下划线<br>· 不能数字开头<br>· 不能用关键字'
          },
          {
            icon: "📦",
            title: "② 类型",
            desc: '变量能装什么数据<br>整数、小数、字符……<br>本讲只讲<b>整数</b><br>类型决定"盒子大小"<br><br><b>⚠️ 类型不能改</b><br>定义 <code>int</code> 后<br>只能存整数'
          },
          {
            icon: "🎁",
            title: "③ 值",
            desc: '变量当前存的数<br>如 <code>age = 11</code><br>值可以随时修改<br>这就是"变"字的含义<br><br><b>⚠️ 改值要同类型</b><br><code>a = 5;</code> ✅<br><code>a = "hi";</code> ❌'
          }
        ]
      }
    },

    /* ===== 6 过渡页 ===== */
    {
      id: 6, type: "transition",
      title: "第二站 · 定义与输入",
      subtitle: "给盒子起名字、装数据",
      data: {
        previous: "变量 = 带名字的盒子",
        note: "接下来学习：如何定义变量、如何用 cin 读入数据"
      }
    },

    /* ===== 7 变量定义与赋值 ===== */
    {
      id: 7, type: "code-split", title: "变量定义与赋值", subtitle: "两步走 或 一步到位",
      data: {
        intro: '📖 <b>定义</b>变量 = 给盒子起名字；<b>赋值</b> = 往盒子里放数据。<br>两件事可以分两步做，也可以一步完成。',
        codeFile: 'codes/lesson-02/var-basic.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int age;', desc: '定义：声明一个整数盒子，名字叫 age' },
          { line: 7, title: 'age = 11;', desc: '赋值：把 11 放进 age 里' },
          { line: 9, title: 'int score = 98;', desc: '定义 + 赋值一步到位（推荐写法）' },
          { line: 10, title: 'score = 100;', desc: '重新赋值：可以随时修改' }
        ],
        output: '11\n100'
      }
    },

    /* ===== 8 练习1 ===== */
    {
      id: 8, type: "level-map",
      title: "课堂练习1：定义变量",
      subtitle: "定义 3 个变量并输出",
      chapterTag: "第 2 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "定义三个变量：<code>age = 11</code>、<code>score = 98</code>、<code>year = 2026</code>，分三行输出。",
          timer: "⏱ 限时 5 分钟"
        },
        hints: [
          "用 <code>int</code> 定义",
          "一步定义 + 赋值：<code>int age = 11;</code>",
          "每行一个 <code>cout</code> 加 <code>endl</code>"
        ],
        answer: { codeFile: "codes/lesson-02/var-practice.cpp" },
        analysis: {
          title: "📖 解析",
          desc: "<b>定义变量 + 赋值</b>是编程的第一步。<br>推荐一步写：<code>int age = 11;</code> —— 避免忘了赋值。"
        }
      }
    },

    /* ===== 9 未初始化变量的坑 ===== */
    {
      id: 9, type: "compare", title: "未初始化变量的坑", subtitle: "使用前必须赋值",
      data: {
        splitStep: true,
        groups: [
          {
            wrong: 'int a; cout &lt;&lt; a;',
            right: 'int a = 0; cout &lt;&lt; a;<br><br><b>💡 为什么？</b><br>未赋值时，变量里是内存残留的"旧数据"——不可预测。'
          },
          {
            wrong: '未赋值 → 输出垃圾值',
            right: '赋初值 → 输出 0<br><br><b>💡 为什么？</b><br>编译器不报错，但结果错——这是新手最常踩的坑。'
          },
          {
            wrong: '结果不可预测（看运气）',
            right: '结果稳定可控<br><br><b>💡 口诀</b><br>定义变量，顺手给初值。<code>int sum = 0;</code> 而不是 <code>int sum;</code>'
          }
        ]
      }
    },

    /* ===== 10 变量命名规则 ===== */
    {
      id: 10, type: "grid",
      title: '变量命名规则',
      subtitle: '给盒子起个好名字',
      chapterTag: '第 2 讲 · 定义与输入',
      data: {
        cards: [
          { icon: '🔤', title: '① 字母数字下划线', desc: '只能含这三种字符<br>如 <code>age</code>、<code>my_name</code>、<code>score1</code><br>不能含空格或 <code>-</code>' },
          { icon: '🚫', title: '② 不能数字开头', desc: '<code>1a</code> ❌ 错<br><code>a1</code> ✅ 对<br><b>首字符必须是字母或下划线</b>' },
          { icon: '⛔', title: '③ 不能用关键字', desc: '如 <code>int</code>、<code>if</code>、<code>for</code><br>这些是语言保留字<br><b>编译器认不出是变量名</b>' },
          { icon: '🔠', title: '④ 区分大小写', desc: '<code>Age</code> 和 <code>age</code><br><b>是两个不同的变量</b><br>写错了很难查' }
        ],
        footer: '<b>📌 好名字 vs 坏名字</b><br><br>❌ <code>a</code>、<code>b</code>、<code>temp</code>、<code>data1</code> —— 过两天不知道是什么<br>✅ <code>math_score</code>、<code>total_count</code>、<code>max_value</code>、<code>user_name</code> —— 见名知意<br><br><b>原则</b>：名字要像"自我介绍"——不用解释就能看懂。'
      }
    },

    /* ===== 11 cin 输入 ===== */
    {
      id: 11, type: "code-split", title: "cin · 让程序读入数据", subtitle: "核心语法：cin >> 变量;",
      data: {
        intro: '📖 <code>cout</code> 是"输出"，<code>cin</code> 是"输入"。<br>方向记忆：<b>cout 用 <code>&lt;&lt;</code>，数据流向屏幕；cin 用 <code>&gt;&gt;</code>，数据流向变量。</b>',
        codeFile: 'codes/lesson-02/cin-cout.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int a, b;', desc: '一次定义两个整型变量' },
          { line: 7, title: 'cin &gt;&gt; a &gt;&gt; b;', desc: '从键盘读两个整数，空格或回车分隔' },
          { line: 8, title: 'cout &lt;&lt; a + b;', desc: '输出两数之和' }
        ],
        output: '（输入 3 5）\n8'
      }
    },

    /* ===== 12 练习2 ===== */
    {
      id: 12, type: "level-map",
      title: "课堂练习2：cin 读入",
      subtitle: "读入两个整数，输出它们的和",
      chapterTag: "第 2 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入两个整数 <code>a</code> 和 <code>b</code>，输出它们的和。<br>输入样例：<code>3 5</code>　输出样例：<code>8</code>",
          timer: "⏱ 限时 5 分钟"
        },
        hints: [
          "定义两个 <code>int</code> 变量",
          "用 <code>cin &gt;&gt; a &gt;&gt; b;</code> 读入",
          "用 <code>cout &lt;&lt; a + b;</code> 输出"
        ],
        answer: { codeFile: "codes/lesson-02/cin-practice.cpp" },
        analysis: {
          title: "📖 解析",
          desc: "这是<b>第一次让程序“听懂”输入</b>。<br>三步走：定义变量 → cin 读入 → cout 输出。"
        }
      }
    },

    /* ===== 13 cin 输入的三个坑 ===== */
    {
      id: 13, type: "pitfall",
      title: 'cin 输入的三个坑',
      subtitle: '知道这些，才不会踩',
      data: {
        cases: [
          {
            icon: '❌',
            scene: '输入 abc，变量是 int 类型',
            what: '<code>cin</code> 读取失败，变量值不确定',
            why: '<code>cin</code> 期望数字，遇到字母会"卡住"',
            fix: '竞赛题保证输入格式正确——不用担心'
          },
          {
            icon: '❌',
            scene: '输入 3.5，变量是 int 类型',
            what: '变量读到 <code>3</code>，<code>.5</code> 留在缓冲区',
            why: '<code>cin</code> 遇到不匹配的字符就停止读取',
            fix: '整数变量只读整数——小数要用 <code>double</code>'
          },
          {
            icon: '❌',
            scene: '输入 3 5 7，但只读两个数',
            what: '<code>7</code> 留在缓冲区，下次 <code>cin</code> 会读到',
            why: '<code>cin</code> 是"流式读取"，不读的留在流里',
            fix: '想读几个就读几个——剩下的不读就留着'
          }
        ]
      }
    },

    /* ===== 14 过渡页 ===== */
    {
      id: 14,
      type: "transition",
      title: "第三站 · 整数类型",
      subtitle: "盒子有大小，装数要合适",
      data: {
        previous: 'int 与 long long 的区别及选择',
        note: '我们学了"会变"的变量，现在看看"不变"的常量'
      },
    },

    /* ===== 15 int 类型 ===== */
    {
      id: 15,
      type: "code-split",
      title: "int · 普通整数",
      subtitle: "最常用的整数类型",
      data: {
        intro:
          "📖 <code>int</code> 是 integer（整数）的缩写，是 C++ 最常用的整数类型。<br>日常计数、求和、编号，全用它。<br><br><b>基本信息</b>：占 <b>4 字节</b>，范围约 <b>±21 亿</b>（-2147483648 ~ 2147483647）",
        codeFile: "codes/lesson-02/int-type.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "int a = 100;", desc: "定义整型变量，赋值为 100" },
          { line: 7, title: "int b = -50;", desc: "int 可以存负数" },
          {
            line: 8,
            title: "int c = a + b;",
            desc: "int 之间可以运算<br><b>🔮 伏笔</b>：21 亿到底怎么算出来的？第 22 讲从二进制讲起。",
          },
        ],
        output: "100\n-50\n50",
      },
    },

    /* ===== 16 - long long 类型 ===== */
    {
      id: 16,
      type: "code-split",
      title: "long long · 大整数",
      subtitle: "存得下更大的数",
      data: {
        intro:
          '📖 <code>long long</code> 是"长整型"，占 <b>8 字节</b>，范围约 <b>±9×10¹⁸</b>。<br>竞赛中遇到大数运算，必须用它。<br><br><b>写法注意</b>：<code>long long</code> 是<b>两个单词</b>，中间有空格——不能写成 <code>longlong</code>。',
        codeFile: "codes/lesson-02/longlong-type.cpp",
        snippet: "main",
        annotations: [
          {
            line: 6,
            title: "long long a = 10000000000;",
            desc: "100 亿——int 装不下，long long 可以",
          },
          {
            line: 7,
            title: "long long b = 9999999999;",
            desc: "注意写法：<code>long long</code> 是两个单词",
          },
          {
            line: 8,
            title: "cout &lt;&lt; a + b;",
            desc: '大数运算不会溢出<br><b>💡 记忆</b>：int 像"中等行李箱"，long long 像"大衣柜"',
          },
        ],
        output: "19999999999",
      },
    },

    /* ===== 17 int vs long long ===== */
    {
      id: 17, type: 'compare',
      title: 'int vs long long',
      subtitle: '两个整数类型，各有分工',
      data: {
        neutral: true,
        leftLabel: '📦 int',
        rightLabel: '🗄️ long long',
        groups: [
          {
            wrong: '4 字节<br>范围约 ±21 亿',
            right: '8 字节<br>范围约 ±9×10¹⁸'
          },
          {
            wrong: '写法：<code>int a = 100;</code>',
            right: '写法：<code>long long a = 100;</code>'
          },
          {
            wrong: '存 100 亿 → <b>溢出</b>（变成负数）',
            right: '存 100 亿 → 正常显示'
          }
        ]
      }
    },

    /* ===== 18 决策指南 ===== */
    {
      id: 18,
      type: "decision",
      title: "什么时候必须用 long long？",
      subtitle: "看到这些信号，就要警惕溢出",
      data: {
        intro:
          '📖 <b>口诀不够用</b>——"不确定用 long long"太笼统。<br>下面是<b>具体的判断信号</b>：看到这些关键词，就该想到 long long。',
        signals: [
          {
            icon: "➕",
            keyword: "求和",
            desc: "n 个数的和可能超过 21 亿<br>例：1000 个数，每个 ≤ 10⁷",
          },
          {
            icon: "✖️",
            keyword: "乘积",
            desc: "<code>a × b</code> 可能溢出<br>例：a、b 都接近 10⁵，乘积就超 10⁹",
          },
          {
            icon: "📉",
            keyword: "阶乘",
            desc: "阶乘增长极快<br>13! 就超 int 范围",
          },
          {
            icon: "📊",
            keyword: "数据范围 ≥ 10⁹",
            desc: '题目直接给出<br>就明说"要用 long long"',
          },
          {
            icon: "💰",
            keyword: "累加 / 累计",
            desc: '类似"总分""总价""总和"<br>都需要预判最大值',
          },
          {
            icon: "🔢",
            keyword: "大数运算",
            desc: "如天文数字、人口统计<br>先想会不会超 int",
          },
        ],
        conclusion: {
          title: "判断法则",
          desc: '看到以上任一信号——<br><b>先问自己："结果会不会超过 21 亿？"</b><br>超过就用 long long，不确定也用 long long。<br><br>📌 多花 4 字节，避免"答案全错"——<br>这笔账，永远划算。',
        },
        extra: {
          title: "💡 反例：阿丽亚娜 5 号火箭",
          desc: '<div>1996 年，欧洲航天局的一枚火箭——<br>发射 <b>37 秒后</b>在高空解体，损失 <b>3.7 亿美元</b>。</div><div><b>事故原因</b>：火箭复用了旧软件的模块——<br>旧模块用 <b>16 位整数</b>存速度，最大值 32767。<br>火箭更快——速度超了，<b>整数溢出</b>。</div><div>程序崩溃，火箭失控。</div><div><b>教训</b>：选错类型，不是"答案错"，是"火箭炸了"。</div>',
          variant: "card-primary",
        },
      },
    },

    /* ===== 练习3：大数求和（插入） ===== */
    {
      id: 19, type: "level-map",
      title: "课堂练习3：大数求和",
      subtitle: "用 long long 避免溢出",
      chapterTag: "第 2 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入 4 个大整数（每个可达 10¹⁰），输出它们的和。<br>输入样例：<code>10000000000 20000000000 30000000000 40000000000</code><br>输出样例：<code>100000000000</code>",
          timer: "⏱ 限时 8 分钟"
        },
        hints: [
          "每个数可能超过 21 亿，<b>必须用 long long</b>",
          "四个数之和可能更大，也要用 long long 保存",
          "cin 和 cout 对 long long 一样适用"
        ],
        answer: { codeFile: "codes/lesson-02/big-sum.cpp" },
        analysis: {
          title: "📖 解析",
          desc: "<b>考点是类型选择</b>。<br>题目说“每个数可达 10¹⁰”——10¹⁰ > 21 亿 → 必须用 long long。<br>四个数之和更大 → 也要用 long long 存。<br><br><b>口诀</b>：大数用 long long，不确定时优先 long long。"
        }
      }
    },

    /* ===== 20 过渡页：第三站 → 第四站 ===== */
    {
      id: 20,
      type: "transition",
      title: "第四站 · 常量",
      subtitle: "有些值，永远不变",
      data: { note: '我们学了"会变"的变量，现在看看"不变"的常量' },
    },

    /* ===== 21 const 常量 ===== */
    {
      id: 21,
      type: "dialog",
      title: "常量 const",
      subtitle: "不变的值有专门的家",
      chapterTag: "第 2 讲 · 常量",
      data: {
        lines: [
          {
            who: "student",
            text: "小 C，如果有一个值一直不变，比如圆周率 π，也要用变量吗？",
          },
          {
            who: "robot",
            text: "用<b>常量</b>——用 <code>const</code> 关键字声明，值一旦定义就不能改。<br><br><b>三大好处</b>：<br>① <b>可读性</b>——看到 <code>PI</code> 就知道是圆周率<br>② <b>防误改</b>——编译器会拦住修改常量的尝试<br>③ <b>便于维护</b>——改一处，处处更新",
          },
          { who: "student", text: "什么时候用常量？" },
          {
            who: "robot",
            text: '固定值——比如：<br>· <code>const double PI = 3.14159;</code> 圆周率<br>· <code>const int MAXN = 100005;</code> 数组最大长度<br>· <code>const int MOD = 1000000007;</code> 竞赛常用模数<br><br><b>看到"多次出现的固定数字"——就用 const 定义。</b>',
          },
        ],
      },
    },

    /* ===== 22 const 代码演示 ===== */
    {
      id: 22,
      type: "code-split",
      title: "const 常量 · 代码演示",
      subtitle: "定义后不可修改",
      data: {
        intro:
          "📖 <b>语法</b>：<code>const 类型 名字 = 值;</code><br>const 定义的变量，一旦赋值就不能再改——这是它和普通变量唯一的区别。",
        codeFile: "codes/lesson-02/const-basic.cpp",
        snippet: "main",
        annotations: [
          {
            line: 5,
            title: "const double PI = 3.14159;",
            desc: "定义常量 PI——圆周率，永不改变",
          },
          {
            line: 6,
            title: "const int MAXN = 100005;",
            desc: "定义数组最大长度——统一管理",
          },
          {
            line: 7,
            title: "const int MOD = 1000000007;",
            desc: '竞赛常用的模数——防止"魔法数字"',
          },
          {
            line: 10,
            title: "double area = PI * r * r;",
            desc: "常量参与运算——和普通变量一样",
          },
        ],
        output: "（输入 5）\n78.5397",
      },
    },
    /* ===== 23 练习：圆的面积 ===== */
    {
      id: 23, type: "level-map",
      title: "课堂练习4：圆的面积",
      subtitle: "用 const 和 double",
      chapterTag: "第 2 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入圆的半径 <code>r</code>，输出圆的面积。<br>要求：定义常量 <code>const double PI = 3.14159;</code>。<br>输入样例：<code>5</code>　输出样例：<code>78.5397</code>",
          timer: "⏱ 限时 5 分钟"
        },
        hints: [
          "用 <code>const double PI = 3.14159;</code> 定义圆周率",
          "用 <code>double</code> 存半径",
          "面积 = <code>PI * r * r</code>"
        ],
        answer: { codeFile: "codes/lesson-02/circle.cpp" },
        analysis: {
          title: "📖 解析",
          desc: "<b>const 的经典用法</b>——把圆周率固定死，防止后面手滑改掉。<br>定义：<code>const 类型 名字 = 值;</code>。"
        }
      }
    },

    /* ===== 24 练习：交换两个数 ===== */
    {
      id: 24, type: "level-map",
      title: "课堂练习5：交换两个数",
      subtitle: "用临时变量交换值",
      chapterTag: "第 2 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入两个整数 <code>a</code> 和 <code>b</code>，交换它们的值后输出。",
          questionCode: "输入：3 5\n输出：5 3"
        },
        hints: [
          "需要一个额外的临时变量 <code>t</code>",
          "三步走：<code>t = a; a = b; b = t;</code>",
          "不能直接 <code>a = b; b = a;</code>（会丢失 a 的原值）",
          "C++ 标准库也提供了现成的 <code>swap(a, b)</code> 函数"
        ],
        answer: { codeFile: "codes/lesson-02/swap.cpp" },
        analysis: {
          title: "📖 解析",
          desc: '为什么不能直接 <code>a = b; b = a;</code>？<br>因为执行 <code>a = b</code> 后，a 原来的值被覆盖了，<br>再执行 <code>b = a</code> 时，等于把 b 的新值又赋给 b——相当于没交换。<br><br>需要<b>临时变量 t</b> 来保存中间值。这是经典的"三杯水交换"问题。'
        },
        extra: {
          title: '📖 交叉学科 · 三杯水交换 + swap 函数',
          desc: '<div><b>物理课上的经典问题</b><br>有两杯水，一杯红、一杯蓝——<br>如何交换两个杯子的水，但只能用第三个空杯？</div><div><b>答案</b><br>① 把红水倒进空杯<br>② 把蓝水倒进原红杯<br>③ 把空杯里的红水倒进原蓝杯</div><div><b>变量交换完全一样</b><br><code>t = a; a = b; b = t;</code></div><div><b>💡 好消息：C++ 有现成的 swap 函数</b><br>标准库提供了 <code>swap(a, b)</code> 函数——一行搞定：<br><code>#include &lt;algorithm&gt;</code><br><code>swap(a, b);</code></div><div><b>手写 vs swap</b><br>· 学习阶段：手写一遍，理解原理<br>· 竞赛阶段：直接用 swap，省时间<br><br>本讲先手写——理解交换的本质。<br>后续讲次（排序、字符串反转）直接用 swap。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 初赛渗透：类型大小 ===== */
    {
      id: 25, type: "dialog",
      title: "初赛小知识：类型大小",
      subtitle: "CSP-J/S 初赛必考",
      chapterTag: "第 2 讲 · 初赛渗透",
      data: {
        lines: [
          { who: "student", text: "小 C，初赛会考变量和类型吗？" },
          { who: "robot", text: "会，而且是<b>高频考点</b>。最常见的题型是\"某个类型占几个字节\"。" },
          { who: "student", text: "常见的类型大小是多少？" },
          { who: "robot", text: "<b>记忆口诀</b>：<br>· <code>int</code> = 4 字节<br>· <code>long long</code> = 8 字节<br>· <code>double</code> = 8 字节<br>· <code>char</code> / <code>bool</code> = 1 字节<br>· <code>float</code> = 4 字节" },
          { who: "student", text: "这些要背吗？" },
          { who: "robot", text: "必背。初赛每年至少考 1—2 道。<br>还有一道经典题：<br>如果我定义 100 个 <code>int</code> 变量，占多少内存？<br>答案是 100 × 4 = 400 字节。" },
          { who: "student", text: "还有别的考点吗？" },
          { who: "robot", text: "变量命名规则、int 范围、溢出判断——这些都是初赛的重点。<br>我们后面会陆续渗透。" }
        ]
      }
    },

    /* ===== 26 趣味扩展 ===== */
    {
      id: 26,
      type: "grid",
      title: "🎨 难题后的放松 · 程序员的命名玄学",
      subtitle: "变量名背后的故事",
      chapterTag: "第 2 讲 · 知识讲解",
      data: {
        cards: [
          {
            icon: "🔤",
            title: "为什么用 i、j、k？",
            desc: "数学里求和用 <b>Σ</b>，下标是 <b>i</b>。<br>1957 年 FORTRAN 规定：以 I 到 N 开头的变量名自动是整数。<br>从此 <code>i</code>、<code>j</code>、<code>k</code> 就成了循环变量的默契。<br><b>70 年过去，还在用。</b>",
          },
          {
            icon: "🍫",
            title: "为什么用 foo、bar？",
            desc: '<b>foo</b> 来自二战雷达术语 FU（Fouled Up，一团糟）。<br><b>bar</b> 来自 1930 年代漫画《Smokey Stover》。<br>程序员把它们当"占位符"用——<br>不重要的名字，就叫 <code>foo</code>、<code>bar</code>、<code>baz</code>。',
          },
          {
            icon: "🐍",
            title: "为什么用 snake_case？",
            desc: "下划线式命名，如 <code>student_name</code>。<br>出自 C 语言、Python 风格。<br>优点是<b>清晰可读</b>——两个单词一眼分开。<br>Linux 内核、Python 官方代码都推荐这种风格。",
          },
          {
            icon: "🐪",
            title: "为什么用 camelCase？",
            desc: '驼峰式命名，如 <code>studentName</code>。<br>因为单词"高低起伏"像骆驼的驼峰。<br>出自 Java、JavaScript 风格。<br>据说最早是施乐公司的程序员发明的。',
          },
        ],
        extra: {
          title: "📖 知识扩展 · 好名字值千金",
          desc: '编程界有句名言：<b>"计算机科学只有两件难事——缓存失效和命名。"</b><br><br>为什么命名难？<br>· 名字太长：<code>the_total_number_of_students_in_class</code>——打字累<br>· 名字太短：<code>t</code>、<code>x</code>——看不懂什么意思<br>· 名字不准确：<code>count</code> 到底是"计数"还是"总数"？<br><br><b>好的命名三原则</b>：<br>① 见名知意<br>② 长度适中<br>③ 风格统一<br><br><b>冷知识</b>：Google 内部有一份"命名规范"，长达 200 多页。<br>程序员花在"想变量名"上的时间，比你想象的多得多。',
          variant: "card-primary",
        },
      },
    },

    /* ===== 27 练习小结 ===== */
{
  id: 27,
  type: "grid",
  title: "练习小结",
  subtitle: "五道题的核心要点",
  data: {
    cards: [
      {
        icon: "📦",
        title: "练习 1 · 定义变量",
        desc: "<b>核心</b>：定义 + 赋值<br><code>int age = 11;</code><br><br><b>易错</b>：未初始化是垃圾值",
      },
      {
        icon: "📥",
        title: "练习 2 · cin 读入",
        desc: "<b>核心</b>：三步走<br>输入 → 处理 → 输出<br><br><b>易错</b>：别忘 <code>cin</code> 读数据",
      },
      {
        icon: "🔢",
        title: "练习 3 · 大数求和",
        desc: "<b>核心</b>：预判范围选类型<br>大数用 <code>long long</code><br><br><b>易错</b>：<code>int</code> 会溢出",
      },
      {
        icon: "⚪",
        title: "练习 4 · 圆的面积",
        desc: "<b>核心</b>：const + double<br><code>const double PI = 3.14159;</code><br><br><b>易错</b>：忘记 const 或类型用错",
      },
      {
        icon: "🔄",
        title: "练习 5 · 交换两个数",
        desc: "<b>核心</b>：用临时变量<br><code>t = a; a = b; b = t;</code><br><br><b>易错</b>：不能直接 <code>a = b; b = a;</code>",
      },
    ],
  },
},

    /* ===== 28 课堂小测 ===== */
    {
      id: 28,
      type: "quiz",
      title: "课堂小测",
      subtitle: "变量、输入与整数类型",
      chapterTag: "第 2 讲 · 课堂小测",
      data: {
        questions: [
          {
            id: 1,
            type: "single",
            difficulty: 2,
            source: "2020 CSP-J 初赛 · 第 3 题",
            question: "以下哪个是 C++ 合法的变量名？",
            options: [
              { label: "A", text: "<code>123name</code>" },
              { label: "B", text: "<code>my_name</code>", correct: true },
              { label: "C", text: "<code>my-name</code>" },
              { label: "D", text: "<code>my name</code>" },
            ],
            analysis:
              'C++ 变量名规则：<br>① 只能含字母、数字、下划线<br>② <b>不能以数字开头</b><br>③ 不能含空格或特殊符号（如 <code>-</code>）<br><br>A 以数字开头，错；B 合法；C 含 <code>-</code>，错；D 含空格，错。<br>这是本讲 slide-09"变量命名规则"的直接考查。',
          },
          {
            id: 2,
            type: "single",
            difficulty: 2,
            source: "CSP-J 初赛真题练习 · 数据类型",
            question: "<code>int</code> 类型在常见编译器中通常占用几个字节？",
            options: [
              { label: "A", text: "1 字节" },
              { label: "B", text: "2 字节" },
              { label: "C", text: "4 字节", correct: true },
              { label: "D", text: "8 字节" },
            ],
            analysis:
              '常见类型字节数：<br>· <code>int</code> = <b>4 字节</b>（32 位）<br>· <code>long long</code> = 8 字节<br>· <code>double</code> = 8 字节<br>· <code>char</code> / <code>bool</code> = 1 字节<br><br>这是初赛的高频考点，对应本讲 slide-20"初赛渗透：类型大小"。',
          },
          {
            id: 3,
            type: "single",
            difficulty: 3,
            source: "CSP-J 2021 初赛模拟题 · 变量",
            question: "下面代码的输出是什么？",
            questionCode: `int a;
cout << a << endl;`,
            options: [
              { label: "A", text: "0" },
              { label: "B", text: "1" },
              { label: "C", text: "垃圾值，不确定", correct: true },
              { label: "D", text: "编译错误" },
            ],
            analysis:
              '未初始化的局部变量里是<b>垃圾值</b>，不是 0。<br>它的值取决于内存中残留的旧数据，结果不可预测。<br>所以定义变量时要养成初始化的好习惯：<code>int a = 0;</code>。<br>这是本讲 slide-08"未初始化变量的坑"的直接考查。',
          },
          {
            id: 4,
            type: "judge",
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第二章",
            question: "变量名不能以数字开头。",
            options: [
              { label: "A", text: "正确", correct: true },
              { label: "B", text: "错误" },
            ],
            analysis:
              'C++ 变量名规则：首字符必须是<b>字母或下划线</b>，不能是数字。<br>例如 <code>age</code>、<code>_count</code>、<code>a1</code> 都合法；<code>1a</code>、<code>123</code> 都不合法。<br>这是本讲 slide-09"变量命名规则"的核心内容。',
          },
          {
            id: 5,
            type: "judge",
            difficulty: 3,
            source: "CSP-J 初赛真题练习 · 数据类型",
            question:
              "在 C++ 中，<code>int</code> 类型能存储的最大值约为 21 亿（2147483647）。",
            options: [
              { label: "A", text: "正确", correct: true },
              { label: "B", text: "错误" },
            ],
            analysis:
              'int 占 4 字节（32 位），正负各占一半，最大正数是 <b>2³¹ - 1 = 2147483647</b>，约 21 亿。<br>超出这个范围就会"溢出"，结果变成错误的负数。<br>大数运算要用 <code>long long</code>。<br>这是本讲 slide-13"int 类型"的核心知识点。',
          },
        ],
      },
    },

    /* ===== 29 今日总结 ===== */
    {
      id: 29,
      type: "quote",
      title: "今日总结",
      subtitle: "今天我们学会了",
      data: {
        text: "变量是带名字的盒子，类型是盒子的大小。",
        author: "—— 变量第一课",
        points: [
          "变量 = 名字 + 类型 + 值",
          "定义语法：类型 名字 = 初值;",
          "cin 输入：cin >> 变量;",
          "命名规则：字母数字下划线，不能数字开头",
          "int：4 字节，约 ±21 亿",
          "long long：8 字节，约 ±9×10¹⁸",
          "const 常量：值不可改变",
        ],
        highlight: {
          title: "📌 关键口诀",
          desc: "变量是盒子，名字要清晰；定义先初始化，cin 读数据；整数用 int，大数 long long；常量用 const，改它编译器会拦。",
        },
        extra: {
          title: '💡 今天你让程序学会了"记忆"',
          desc: '从只会"输出"到能"记住数据"，程序的能力又上了一个台阶。<br>变量是所有程序的基础——没有变量，就没有"计算"，就没有"判断"，就没有"算法"。<br>今天你已经掌握了编程最核心的工具之一。<br><br>🔮 <b>伏笔</b>：<br>· 变量只能存<b>一个</b>数据。如果要存 100 个呢？<br>· 数据除了整数，还有小数、字符、真假。<br>· 为什么 int 最大是 21 亿？为什么会有"溢出"？<br>这些问题的答案，会在后续讲次揭晓。',
          variant: "card-primary",
        },
      },
    },

    /* ===== 30 课后作业 ===== */
    {
      id: 30,
      type: "grid",
      title: "课后作业 · OJ 实战",
      subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          {
            icon: "🟢",
            title: "基础 1 · P1001",
            link: "https://www.luogu.com.cn/problem/P1001",
            desc: "<b>A+B Problem</b><br>考察：cin、变量、加法<br>难度：★<br>目标：读两个数，输出和",
          },
          {
            icon: "🟢",
            title: "基础 2 · P5703",
            link: "https://www.luogu.com.cn/problem/P5703",
            desc: "<b>苹果采购</b><br>考察：变量、乘法<br>难度：★<br>目标：读两个数，输出乘积",
          },
          {
            icon: "🔴",
            title: "挑战 · B2033",
            link: "https://www.luogu.com.cn/problem/B2033",
            desc: "<b>A*B Problem</b><br>考察：long long、结果范围预判<br>难度：★★<br>目标：输入 ≤ 50000，乘积超 int，选对类型",
          },
        ],
      },
    },

    /* ===== 31 下节预告 ===== */
    {
      id: 31,
      type: "radial",
      title: "下节预告",
      subtitle: "第 3 讲 · 小数、字符、布尔与类型转换",
      data: {
        center: "类型",
        items: [
          { text: "double 小数" },
          { text: "char 字符" },
          { text: "bool 布尔" },
          { text: "类型转换" },
        ],
      },
    },
    /* ===== 答疑时间 ===== */
    {
      id: 32, type: "quote",
      title: "自由提问时间",
      subtitle: "把你不懂的问题，大声说出来",
      chapterTag: "第 2 讲 · 互动",
      data: {
        text: "学编程，没有“愚蠢的问题”，只有“不敢问的问题”。",
        author: "—— 课堂互动环节",
        points: [
          "关于变量（名字、类型、初值），有疑问吗？",
          "关于 cin（怎么读、空格怎么算），有疑问吗？",
          "关于 int 和 long long（选哪个），有疑问吗？",
          "关于 const（为什么要用），有疑问吗？"
        ],
        highlight: {
          title: "💡 提问的三个层次",
          desc: "① 问“是什么”：查资料能解决。<br>② 问“为什么”：理解原理的钥匙。<br>③ 问“怎么办”：代码报错卡住了。<br><br><b>大胆开口！</b>"
        }
      }
    },

    /* ===== 33 本讲英文单词 ===== */
    {
      id: 33,
      type: "glossary",
      title: "本讲英文单词",
      subtitle: "记牢拼写，理解原意",
      chapterTag: "第 2 讲 · 复习",
      data: {
        words: [
          {
            word: "int",
            cn: "整数",
            pron: "/ɪnt/",
            origin: "integer 的缩写",
            category: "类型",
          },
          {
            word: "long long",
            cn: "长整数",
            pron: "/lɒŋ lɒŋ/",
            origin: "long 重复两次表示更长",
            category: "类型",
          },
          {
            word: "cin",
            cn: "输入",
            pron: "/siː ɪn/",
            origin: "character input 的缩写",
            category: "函数",
          },
          {
            word: "const",
            cn: "常量",
            pron: "/ˈkɒnstənt/",
            origin: "constant 的缩写",
            category: "关键字",
          },
          {
            word: "variable",
            cn: "变量",
            pron: "/ˈveəriəbl/",
            origin: '英文原意"可变化的量"',
            category: "概念",
          },
          {
            word: "float",
            cn: "单精度",
            pron: "/fləʊt/",
            origin: '英文原意"浮动"',
            category: "类型",
          },
        ],
      },
    },

    /* ===== 34 知识清单 ===== */
    {
      id: 34,
      type: "grid",
      title: "第 2 讲 · 知识清单",
      subtitle: "一页看完本讲所有重点",
      chapterTag: "第 2 讲 · 复习",
      data: {
        cards: [
          {
            icon: "📦",
            title: "变量",
            desc: "<b>三要素</b>：名字、类型、值<br><b>定义</b>：<code>int age = 11;</code><br><b>命名</b>：字母数字下划线，不能数字开头<br><b>陷阱</b>：未初始化是垃圾值",
          },
          {
            icon: "📥",
            title: "输入 cin",
            desc: "<b>语法</b>：<code>cin &gt;&gt; 变量;</code><br><b>方向</b>：cin 用 &gt;&gt;，cout 用 &lt;&lt;<br><b>特点</b>：自动跳过空格、回车<br><b>暂停</b>：等用户输入",
          },
          {
            icon: "🔢",
            title: "整数类型",
            desc: "<b>int</b>：4 字节，约 ±21 亿<br><b>long long</b>：8 字节，约 ±9×10¹⁸<br><b>选择</b>：不确定用 long long<br><b>陷阱</b>：溢出得错误结果",
          },
          {
            icon: "🔒",
            title: "常量 const",
            desc: "<b>语法</b>：<code>const int MOD = 1000000007;</code><br><b>特点</b>：定义后不能改<br><b>好处</b>：可读、防误改、易维护<br><b>常用</b>：π、模数、最大长度",
          },
        ],
      },
    },

    /* ===== 35 结束页 ===== */
    {
      id: 35,
      type: "ending",
      title: "第二讲结束",
      subtitle: "点击返回目录，复习本讲内容",
      chapterTag: false,
      data: {
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
      },
    },
  ],
};

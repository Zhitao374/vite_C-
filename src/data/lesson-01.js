export default {
  title: "第 1 讲 初识 C++",
  subtitle: "第一个程序与 OJ 提交",
  total: 36,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1,
      type: "cover",
      title: "初识 C++",
      subtitle: "第一个程序与 OJ 提交",
      chapterTag: false,
      data: {
        accentWord: "C++",
        meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 1 讲"],
      },
    },

    /* ===== 2 先看个东西（三声哇 · 第一声） ===== */
    {
      id: 2, type: "code-split",
      title: "先看个东西",
      subtitle: "3 行代码，画出一个三角形",
      chapterTag: "第 1 讲 · 开场",
      data: {
        intro: "这是 C++ 能做的事 —— 你写几行代码，它帮你画出图案。<br>不信？看下面。",
        codeFile: "codes/lesson-01/demo-triangle.cpp",
        annotations: [
          { line: 1, title: "for 循环", desc: "重复 5 次" },
          { line: 2, title: "cout", desc: "输出一行" },
          { line: 3, title: "换行", desc: "end" }
        ],
        output: "    *\n   ***\n  *****\n *******\n*********",
        footer: '<b>📌 这就是编程</b>：<br>你写 3 行"指令"，计算机执行上亿次操作 —— <b>最后变成你看到的图案</b>。<br><br>后面 45 分钟，你也能写出这样的代码 —— <b>甚至更酷的</b>。'
      }
    },

    /* ===== 3 本节课目标 ===== */
    {
      id: 3, type: "grid",
      title: "本节课目标",
      subtitle: "从“只会用电脑”到“能让电脑听懂你”",
      data: {
        cards: [
          { number: "01", title: "写出第一个程序", desc: "Hello, World! —— 5 分钟跑起来" },
          { number: "02", title: "装好环境", desc: "Dev-C++ —— 你写代码的地方" },
          { number: "03", title: "提交到 OJ", desc: "洛谷 —— 让系统评判你的代码" },
          { number: "04", title: "看懂报错", desc: "报错不可怕 —— 学会读它" }
        ],
        footer: '<b>📌 一句话</b>：<br>今天你就能写出人生第一个 C++ 程序。<br><b>不需要"先学懂原理再动手"</b> —— <b>先动手，再理解</b>，这是学编程的正确顺序。'
      }
    },

    /* ===== 4 学习地图 ===== */
    {
      id: 4,
      type: "timeline",
      variant: "map",
      title: "本讲学习地图",
      subtitle: "四站闯关，从零到提交",
      data: {
        items: [
          {
            icon: "🧠",
            badge: "基础",
            title: "第一站 · 概念理解",
            desc: "程序、C++、编译过程",
            points: [
              "程序 = 指令 + 数据",
              "C++ 是编译型语言",
              ".cpp → .obj → .exe",
              "冯·诺依曼存储程序",
            ],
          },
          {
            icon: "💻",
            badge: "核心",
            title: "第二站 · 第一个程序",
            desc: "Hello, World! 逐行拆解",
            points: [
              "程序框架四件套",
              "cout 输出与 endl 换行",
              "中文标点会报错",
              "大小写敏感",
            ],
          },
          {
            icon: "🔧",
            badge: "关键",
            title: "第三站 · 编译与运行",
            desc: "让代码变成程序",
            points: ["编译 → 链接 → 运行", "看懂报错信息", "四大常见错误"],
          },
          {
            icon: "🏆",
            badge: "实战",
            title: "第四站 · OJ 实战",
            desc: "提交、判题、闯关",
            points: [
              "注册 → 找题 → 提交",
              "AC 通过 · WA 答案错",
              "CE 编译错 · TLE 超时",
              "三题闯关拿积分",
            ],
          },
        ],
      },
    },

    /* ===== 5 Hello World（提前） ===== */
    {
      id: 5,
      type: "code-split",
      title: "第一个程序：Hello, World!",
      subtitle: "逐行拆解，理解每一行的使命",
      data: {
        intro:
          "📖 <b>程序框架四件套</b>：头文件、命名空间、主函数、返回 0。<br>这是所有 C++ 程序的标准开头，先照抄一遍，后面再细讲。",
        codeFile: "codes/lesson-01/hello-world.cpp",
        annotations: [
          {
            line: 1,
            title: "#include &lt;iostream&gt;",
            desc: "头文件——引入输入输出库",
          },
          {
            line: 2,
            title: "using namespace std;",
            desc: "命名空间——直接用 cout / endl",
          },
          { line: 4, title: "int main() {", desc: "主函数——程序入口" },
          { line: 5, title: "cout &lt;&lt; ...", desc: "输出 Hello, World!" },
          { line: 6, title: "return 0;", desc: "返回 0——程序正常结束" },
        ],
        output: "Hello, World!",
        extra: {
          title: "💡 为什么 main 是入口",
          desc: '<div><code>main</code> 是英文"<b>主要的</b>"的意思。计算机运行程序时，第一件事就是<b>找到 main</b>，从那里开始执行。</div><div>没有 main，程序就不知道从哪里出发。这是 C++ 标准的规定，<b>所有编译器都遵守</b>。</div><div>那能不能不叫 main？不行。<b>每个程序有且只有一个 main</b>。名字必须小写。写成 <code>Main</code> 会编译失败。</div><div>有意思的是，其他语言也有类似规定：<a href="https://baike.baidu.com/item/Java" target="_blank" class="wiki-link">Java</a> 是 <code>public static void main</code>，<a href="https://baike.baidu.com/item/Python" target="_blank" class="wiki-link">Python</a> 是 <code>if __name__ == \'__main__\'</code>。所有语言的"入口"都叫 main——这算是程序员之间的默契。</div><div></div><div>🔮 <b>伏笔</b>：你写的 "H"、"e"、"l"，在计算机里其实都是 <b>数字</b>。第 22 讲揭晓。</div>',
        },
      },
    },

    /* ===== 6 Dev-C++ 上手（提前） ===== */
    {
      id: 6, type: "split",
      title: "Dev-C++ · 5 步跑出第一个程序",
      subtitle: "从打开到运行，5 分钟搞定",
      chapterTag: "第 1 讲 · 动手实践",
      data: {
        panes: [
          {
            image: "static/images/tools/devcpp-interface.png",
            imageAlt: "Dev-C++ 界面",
            imageCaption: "Dev-C++ 界面（含代码区 + 编译日志）",
            imageLayout: "block",
            imageSize: "full",
            zoomable: true
          },
          {
            title: "5 步操作",
            items: [
              { title: "① 新建", desc: "<code>Ctrl + N</code> 新建文件" },
              { title: "② 写代码", desc: "粘贴 Hello World" },
              { title: "③ 保存", desc: "<code>Ctrl + S</code> 存为 <code>.cpp</code>" },
              { title: "④ 编译运行", desc: "按 <code>F11</code>" },
              { title: "⑤ 看结果", desc: "黑窗口显示 <code>Hello, World!</code>" },
              { title: "⌨️ 快捷键", desc: "<code>F9</code> 编译 · <code>F10</code> 运行 · <code>F11</code> 一键" }
            ]
          }
        ]
      }
    },

    /* ===== 7 练习1：Hello World ===== */
    {
      id: 7,
      type: "level-map",
      title: "课堂练习1：Hello World",
      subtitle: "独立完成第一个输出程序",
      chapterTag: "第 1 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输出 <code>Hello, World!</code>。要求：用 <code>cout</code>，英文双引号，末尾分号。",
          timer: "⏱ 限时 5 分钟",
        },
        hints: [
          "用 <code>cout</code> 输出",
          "字符串用英文双引号",
          "语句末尾有分号",
        ],
        answer: { codeFile: "codes/lesson-01/hello-world.cpp" },
        analysis: {
          title: "📖 解析",
          desc: '<code>cout</code> 输出 · <code>endl</code> 换行 · <code>return 0</code> 正常结束。<br>跨学科：输出的文字就像广播里的"一句话"，要用引号"打包"好才能送出去。',
        },
        extra: {
          title: "📖 知识扩展 · 第一位程序员",
          image: {
            src: "static/images/people/ada-lovelace.webp",
            alt: "阿达·洛芙莱斯",
            caption: "阿达·洛芙莱斯（1815—1852）",
            source: "Public Domain",
            layout: "float-right",
            size: "sm",
            zoomable: true
          },
          desc: '1843 年，<a href="https://baike.baidu.com/item/阿达·洛芙莱斯" target="_blank" class="wiki-link">阿达·洛芙莱斯</a>为<a href="https://baike.baidu.com/item/分析机" target="_blank" class="wiki-link">分析机</a>写下了<b>第一个算法——计算<a href="https://baike.baidu.com/item/伯努利数" target="_blank" class="wiki-link">伯努利数</a></b>。<br><br>（原内容不变）',
        },
      },
    },

    

    /* ===== 8 第一次编译报错 ===== */
    {
      id: 8,
      type: "dialog",
      title: "第一次编译报错怎么办？",
      subtitle: "小C教你读错误信息",
      chapterTag: "第 1 讲 · 概念理解",
      data: {
        lines: [
          {
            who: "student",
            text: "小 C，我点了编译，屏幕上跳出一大段红色文字，好吓人！",
          },
          {
            who: "robot",
            text: "别怕，红色文字是<b>编译器在帮你</b>。它告诉你哪里有问题，就像医生诊断。",
          },
          { who: "student", text: "那怎么读呢？" },
          {
            who: "robot",
            text: '看<b>第一行</b>就够了。它会说"第几行、什么错"。后面的细节可以先忽略。',
          },
          { who: "student", text: "常见的错误有哪些？" },
          {
            who: "robot",
            text: "新手最常见的四种：<br>① 中文标点<br>② 漏分号<br>③ 大小写错<br>④ 括号不配对。",
          },
          { who: "student", text: "能给我看个真实的例子吗？" },
          {
            who: "robot",
            text: "看这个——<br><br><code>hello.cpp:5:10: error: expected ';' before 'return'</code><br><br><b>三段读法</b>：<br>① <b>hello.cpp</b> —— 哪个文件出错<br>② <b>5:10</b> —— 第 5 行第 10 列<br>③ <b>expected ';'</b> —— 缺少分号<br><br>看这三段就够了——不用怕那些看不懂的细节。",
          },
        ],
      },
    },

    /* ===== 9 常见错误盘点 ===== */
    {
      id: 9,
      type: "compare",
      title: "常见错误大盘点",
      subtitle: "4 个新手必踩的坑",
      data: {
        groups: [
          {
            wrong: 'cout &lt;&lt; "Hello"；',
            right:
              'cout &lt;&lt; "Hello";<br><br><b>原因</b>：中文分号和英文分号编码不同，编译器认不出中文分号',
          },
          {
            wrong: 'cout &lt;&lt; "Hello"',
            right:
              'cout &lt;&lt; "Hello";<br><br><b>原因</b>：分号是语句结束的标志，漏了编译器就以为语句没写完',
          },
          {
            wrong: "Main()  count",
            right:
              "int main()  cout<br><br><b>原因</b>：C++ 区分大小写——Main ≠ main，cout ≠ count",
          },
          {
            wrong: "少一个大括号",
            right:
              "大括号必须成对<br><br><b>原因</b>：每个 <code>{</code> 必须有对应的 <code>}</code>，不然编译器不知道代码块在哪结束",
          },
        ],
      },
    },

    /* ===== 10 🎉 跑起来了（三声哇 · 第二声） ===== */
    {
      id: 10, type: "big-number",
      title: "🎉 你的第一个程序跑起来了！",
      subtitle: "Hello, World!",
      data: {
        number: "🎉",
        unit: "",
        card: {
          title: "Hello, World!",
          desc: '<b>1972 年</b>，第一个 Hello World 程序诞生。<br><b>今天你也写了一个。</b><br><br>这是编程之路的起点。<br>从今天起，你不再是"电脑的使用者" —— <b>你是"电脑的指挥者"</b>。'
        },
        footer: '<b>📌 接下来我们回头看</b>：<br>刚才那 5 行代码，到底怎么变成屏幕上的 "Hello, World!"？<br>计算机为什么能"读懂"你写的话？'
      },
    },

    /* ===== 11 什么是程序（抽象后置） ===== */
    {
      id: 11,
      type: "origin",
      title: "什么是程序？什么是 C++？",
      subtitle: "程序 = 指令 + 数据，C++ = 翻译官",
      chapterTag: "第 1 讲 · 概念理解",
      data: {
        problem: {
          title: "你写的代码，计算机能懂吗？",
          points: [
            '你写 <code>cout &lt;&lt; "Hello";</code> —— 计算机能直接读懂吗？',
            "不能。<b>计算机只认识 0 和 1</b>——一串二进制机器码",
            '那它到底是怎么"听懂"你的话的？',
          ],
        },
        evolution: [
          {
            icon: "✍️",
            era: "第一层",
            title: "你写代码（人类语言）",
            desc: '<code>cout &lt;&lt; "Hello";</code><br>用 C++ 语法写的——接近英语，<b>人容易写、容易读</b>',
          },
          {
            icon: "🔧",
            era: "第二层",
            title: "编译器翻译（翻译官）",
            desc: "把 C++ 一行行翻译成<b>机器码</b>——生成 <code>.obj</code> 文件<br>这个过程叫 <b>编译</b>",
          },
          {
            icon: "⚙️",
            era: "第三层",
            title: "计算机执行（机器语言）",
            desc: "CPU 读机器码（0 和 1）——按指令执行——输出 <code>Hello</code>",
          },
        ],
        summary: {
          title: "程序 = 指令 + 数据",
          desc: '指令告诉计算机"<b>做什么</b>"，数据告诉它"<b>处理什么</b>"。<br>比如 <code>cout &lt;&lt; "Hello"</code> —— "输出"是指令，"Hello"是数据。<br><br><b>C++ 的角色</b>：它是"人"和"机器"之间的 <b>翻译官</b> ——<br>你写人话，它翻译成机器话，计算机才听得懂。',
          code: 'cout << "Hello";       // 你写人话\n   ↓ ↓ 编译器翻译 ↓ ↓\n10110001 01001111 ...  // 机器话',
        },
        extra: {
          title: "📖 知识扩展 · 冯·诺依曼结构",
          image: {
            src: "static/images/people/von-neumann.jpg",
            alt: "约翰·冯·诺依曼",
            caption: "约翰·冯·诺依曼（1903—1957）",
            source: "美国能源部 / Public Domain",
            layout: "float-right",
            size: "sm",
            zoomable: true
          },
          desc: '1945 年，数学家冯·诺依曼提出了"<b>存储程序</b>"概念：把指令和数据一起存进内存，让计算机自动执行。<br><br>在这之前，改变计算任务要 <b>重新接线</b> —— 就像今天想换一个 App，你得换一台手机。<br><br>这个想法彻底改变了计算机。<br>今天你用的手机、电脑、服务器，<b>全都是冯·诺依曼结构</b>。',
        },
      },
    },

    /* ===== 12 为什么要学 C++（动机后置） ===== */
    {
      id: 12,
      type: "grid",
      title: "为什么要学 C++？",
      subtitle: "你已经跑过第一个程序 —— 现在讲“为什么选 C++”",
      data: {
        cards: [
          {
            icon: "🏆",
            title: "竞赛官方语言",
            desc: "CSP-J/S、NOIP、NOI 均支持",
          },
          { icon: "⚡", title: "运行速度快", desc: "适合大规模计算" },
          {
            icon: "🧰",
            title: "STL 强大",
            desc: "现成数据结构与算法<br><b>（STL = C++ 标准库，第 14 讲详讲）</b>",
          },
          { icon: "🎓", title: "升学助力", desc: "科技特长生重要参考" },
        ],
      },
    },

    /* ===== 13 编程语言 70 年（精简） ===== */
    {
      id: 13,
      type: "timeline",
      variant: "history",
      title: "编程语言 70 年",
      subtitle: "从 0/1 到现代百花齐放",
      data: {
        items: [
          {
            icon: "🔌",
            badge: "1940s",
            title: "机器语言",
            desc: "0/1 直接写",
            points: ["打孔卡输入"],
          },
          {
            icon: "⚙️",
            badge: "1972",
            title: "C 语言",
            desc: "现代语言之母",
            points: ["丹尼斯·里奇", "为 Unix 而生"],
          },
          {
            icon: "🚀",
            badge: "1983",
            title: "C++",
            desc: "C + 面向对象",
            points: ["本贾尼设计", "竞赛官方语言"],
            highlight: true,
          },
          {
            icon: "🐍",
            badge: "1991",
            title: "Python",
            desc: "简洁优雅",
            points: ["AI / 数据科学"],
          },
          {
            icon: "☕",
            badge: "1995",
            title: "Java",
            desc: "跨平台企业级",
            points: ["安卓开发"],
          },
          {
            icon: "📊",
            badge: "2026",
            title: "当今 · 五大热门",
            desc: "C++ 稳居全球前三",
            points: ["① Python", "② C", "③ C++", "④ Java", "⑤ C#"],
          },
        ]
      },
    },

    /* ===== 14 1946 · ENIAC 诞生 ===== */
    {
      id: 14, type: "split",
      title: "1946 · ENIAC 诞生",
      subtitle: "第一台通用电子计算机",
      chapterTag: "第 1 讲 · 概念理解",
      data: {
        intro: '它是"编程语言 70 年"的起点 —— <b>人类第一台自动计算的机器</b>。<br>它的诞生，宣告了"计算机时代"的到来。',
        panes: [
          {
            image: "static/images/events/eniac-1946.webp",
            imageAlt: "ENIAC 第一台通用电子计算机",
            imageCaption: "ENIAC（1946）· 占地 167 平方米，重 30 吨",
            imageSource: "百度百科",
            imageLayout: "block",
            imageSize: "full",
            zoomable: true
          },
          {
            title: "关键数据",
            items: [
              { title: "📊 规模", desc: "<b>18000</b> 个电子管<br>耗电 <b>150 kW</b>（够一个小镇）<br>占地 <b>167 ㎡</b> / 重 <b>30 吨</b>" },
              { title: "👥 人物", desc: "设计：<b>莫奇利 + 埃克特</b><br>编程：<b>6 位女程序员</b>" },
              { title: "⚡ 性能", desc: "每秒 <b>5000</b> 次加法<br>今天手机比它快 <b>100 万倍</b>" },
              { title: "🎯 用途", desc: "原本算<b>炮弹弹道</b><br>后来算<b>氢弹 / 天气预报</b>" },
              { title: "🐛 Bug 起源", desc: "1947 年飞蛾飞入继电器<br>被贴进日志 —— \"<b>第一个 Bug</b>\"" }
            ]
          }
        ]
      }
    },

    /* ===== 15 编程环境 ===== */
    {
      id: 15, type: "grid",
      title: "编程环境 · 在哪写代码？",
      subtitle: "三个选择，一个推荐",
      chapterTag: "第 1 讲 · 动手准备",
      data: {
        cards: [
          {
            icon: "🛠️",
            title: "Dev-C++",
            desc: "<b>竞赛标配</b><br>轻量、简单<br>一键编译运行<br>界面朴素但够用<br><br><b>⭐ 推荐初学者</b>"
          },
          {
            icon: "💻",
            title: "VS Code",
            desc: "<b>现代编辑器</b><br>界面漂亮、插件丰富<br>需装 C++ 插件<br>配置稍复杂<br><br><b>进阶选择</b>"
          },
          {
            icon: "🌐",
            title: "在线 IDE",
            desc: "<b>免安装</b><br>洛谷 IDE / CodeSandbox<br>打开浏览器就能写<br>需要网络<br><br><b>备用方案</b>"
          }
        ],
        footer: '<b>📌 建议</b>：初学者用 <b>Dev-C++</b> —— 简单，能跑就行。<br>等熟练后再换 VS Code 或 VS 2022 —— <b>工具是次要的，能写出正确代码才是关键</b>。<br><br><b>🔗 下载地址</b><br>Dev-C++：<code>sourceforge.net/projects/orwelldevcpp/</code><br>VS Code：<code>code.visualstudio.com</code><br>洛谷在线 IDE：<code>luogu.com.cn/ide</code>'
      }
    },

    /* ===== 16 过渡页 ===== */
    {
      id: 16,
      type: "transition",
      title: "第三站 · 编译与运行",
      subtitle: "从源码到程序",
      data: {
        note: "接下来，你将看懂程序是怎么变成可执行文件的",
      },
    },

    /* ===== 17 输出进阶 ===== */
    {
      id: 17,
      type: "code-split",
      title: "输出进阶：多个内容与换行",
      subtitle: "灵活使用 cout",
      data: {
        intro:
          "📖 <code>cout</code> 可以一次输出多个内容，用 <code>&lt;&lt;</code> 连接；<code>endl</code> 表示换行。",
        codeFile: "codes/lesson-01/output-advanced.cpp",
        annotations: [
          {
            line: 5,
            title: "连续输出",
            desc: "用 &lt;&lt; 连接多个内容，输出 AB",
          },
          { line: 6, title: "文字 + 结果", desc: "先算 1+2，再输出 1 + 2 = 3" },
          { line: 7, title: "输出单行", desc: "输出 * 后换行" },
          { line: 8, title: "输出多字符", desc: "输出 *** 后换行" },
        ],
      },
    },

    /* ===== 18 从代码到运行 ===== */
    {
      id: 18,
      type: "grid",
      title: "从代码到运行",
      subtitle: "源程序如何变成可执行程序",
      data: {
        cards: [
          {
            icon: "📄",
            title: "① 源程序",
            desc: "<b>hello.cpp</b><br>用 C++ 写的代码文件<br>人类可读<br>扩展名 .cpp",
          },
          {
            icon: "⚙️",
            title: "② 编译",
            desc: "<b>生成 .obj</b><br>翻译成机器码<br>检查语法错误<br>像翻译官",
          },
          {
            icon: "🔗",
            title: "③ 链接",
            desc: "<b>生成 .exe</b><br>组装目标文件<br>加上库文件<br>像装配工",
          },
          {
            icon: "▶️",
            title: "④ 运行",
            desc: "<b>输出结果</b><br>加载 .exe<br>CPU 执行机器码<br>得到最终结果",
          },
        ],
      },
    },

    /* ===== 19 初赛渗透：编译器 ===== */
    {
      id: 19, type: "dialog",
      title: "初赛小知识：编译器",
      subtitle: "CSP-J 初赛必考",
      chapterTag: "第 1 讲 · 初赛渗透",
      data: {
        lines: [
          { who: "student", text: "小 C，初赛会考编译器吗？" },
          { who: "robot", text: "会，而且是<b>高频考点</b>。" },
          { who: "student", text: "一般怎么考？" },
          {
            who: "robot",
            text: '最常见的是问"编译器的主要功能是什么"。<br>答案：<b>把源程序翻译成机器指令代码</b>。',
          },
          { who: "student", text: "还有别的考点吗？" },
          {
            who: "robot",
            text: "还有：编译和解释的区别、高级语言和低级语言、C++ 源程序扩展名（.cpp）。<br><br>这些都是送分题，一定要拿下。",
          },
        ],
      },
    },

    /* ===== 20 答疑：关于程序的疑问 ===== */
    {
      id: 20,
      type: "dialog",
      title: "答疑：关于程序的疑问",
      subtitle: "小C回答常见问题",
      chapterTag: "第 1 讲 · 答疑",
      data: {
        lines: [
          { who: "student", text: "程序一定要写在文件里吗？" },
          {
            who: "robot",
            text: "是的。程序必须保存成文件（.cpp），编译器才能读它。<br>就像写作文要写在纸上，编译器才看得到。",
          },
          { who: "student", text: "一个 .cpp 文件能写几个程序？" },
          {
            who: "robot",
            text: "一个文件只能有一个 <code>main</code> 函数，也就是一个可执行程序。<br>但可以写很多函数，被 main 调用。函数是第 8 讲的内容。",
          },
          { who: "student", text: "中文能当变量名吗？" },
          {
            who: "robot",
            text: "理论上能，但竞赛和工程都不用。<br>变量名用英文字母和下划线，是行业的默契。",
          },
          { who: "student", text: "为什么程序结尾一定要 return 0？" },
          {
            who: "robot",
            text: '<code>return 0</code> 是告诉操作系统"程序正常结束"。<br>不写也行，C++ 会自动加，但写出来更清楚。',
          },
        ],
      },
    },

    /* ===== 21 环境常见问题 ===== */
    {
      id: 21, type: "pitfall",
      title: "环境搭不好？常见问题",
      subtitle: "四个坑，提前避",
      chapterTag: "第 1 讲 · 动手准备",
      data: {
        cases: [
          {
            icon: "❌",
            scene: "编译报错：'g++' 不是内部或外部命令",
            what: "按 F11 后弹出一行红字，编译失败",
            why: "Dev-C++ 安装不完整，或环境变量没配好",
            fix: "重装 Dev-C++（选默认路径）<br>或手动添加 g++ 到系统 PATH"
          },
          {
            icon: "❌",
            scene: "程序一闪而过，看不到输出",
            what: "黑窗口开了又关，来不及看结果",
            why: "程序跑完立刻退出，窗口跟着关闭",
            fix: "① 在 <code>return 0;</code> 前加 <code>system(\"pause\");</code><br>② 或从命令行运行 <code>.exe</code>"
          },
          {
            icon: "❌",
            scene: "中文输出变成乱码",
            what: "输出\"你好\"显示成一堆奇怪符号",
            why: "编码不一致（GBK vs UTF-8）",
            fix: "① 竞赛建议用英文输出<br>② 或把文件编码改成 UTF-8"
          },
          {
            icon: "❌",
            scene: "找不到 .exe 文件",
            what: "编译成功但不知道程序在哪",
            why: "默认保存在源文件同目录",
            fix: "按 <code>F11</code> 后，同目录下会生成 <code>hello.exe</code><br>或在 Dev-C++ 里点\"运行\"直接看结果"
          }
        ],
        footer: '<b>📌 环境问题的通用思路</b><br>① <b>重装</b> —— 90% 的问题重装能解决<br>② <b>查错</b> —— 看报错信息的第一行<br>③ <b>搜索</b> —— 把报错原文贴到 Bing 搜索<br>④ <b>求助</b> —— 找同学 / 老师 / 洛谷社区<br><br><b>🔮 别让环境问题挡住你</b>：很多人第一次装环境就放弃了。其实这一步过了，后面全是"写代码"——比装环境简单得多。'
      }
    },

    /* ===== 22 练习2：输出图形 ===== */
    {
      id: 22,
      type: "level-map",
      title: "课堂练习2：输出图形",
      subtitle: "巩固输出与换行",
      chapterTag: "第 1 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输出下面图形：<br><code>*<br>***<br>*****</code><br>要求：使用 <code>cout</code> 和 <code>endl</code>，每行独立输出。",
          timer: "⏱ 限时 6 分钟",
        },
        hints: [
          '第一行输出 <code>"*"</code>',
          '第二行输出 <code>"***"</code>',
          '第三行输出 <code>"*****"</code>',
          "每行末尾加 <code>endl</code> 换行",
        ],
        answer: { codeFile: "codes/lesson-01/pattern.cpp" },
        analysis: {
          title: "📖 解析",
          desc: '每行一个 <code>cout</code> 语句；<code>endl</code> 控制换行；字符串必须用英文双引号。<br><br><b>⚠️ 输出格式三条铁律</b><br>① <b>空格</b>不能多不能少——OJ 是"字符级"对比，多一个空格 = WA<br>② <b>换行</b>不能漏不能多——最后一行是否要换行？看题目描述或样例<br>③ <b>标点</b>是隐形陷阱——中文引号" "和英文引号" "看起来一样，实际完全不同',
        },
      },
    },

    /* ===== 23 练习3：输出菱形 ===== */
    {
      id: 23,
      type: "level-map",
      title: "课堂练习3：输出菱形",
      subtitle: "灵活运用 cout 和 endl",
      chapterTag: "第 1 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输出下面 5 行菱形图案（用 <code>*</code> 组成）：<br>要求：每一行是一个 <code>cout</code> 语句，空格也要输出。",
          questionCode: "  *\n ***\n*****\n ***\n  *",
        },
        hints: [
          "第一行：2 个空格 + <code>*</code>",
          "第二行：1 个空格 + <code>***</code>",
          "第三行：<code>*****</code>",
          "第四、五行与第一、二行对称",
          "空格也是字符，要写在双引号里",
        ],
        answer: { codeFile: "codes/lesson-01/diamond.cpp" },
        analysis: {
          title: "📖 解析",
          desc: '菱形的核心是"<b>空格 + 星号</b>"的组合。<br>每一行都是一个字符串，空格必须写在双引号里。<br>这道题考的是对 <code>cout</code> 和格式的灵活运用，为后面"循环打印图案"（第 5 讲）打基础。',
        },
        extra: {
          title: "📖 知识扩展 · ASCII 艺术",
          desc: '<div><b>ASCII 艺术</b>就是用字符拼出图像。</div><div>1960 年代，打印机只能打字符，人们就用 <code>*</code>、<code>#</code>、<code>@</code> 拼出 LOGO、动物、人像。</div><div>今天你看到的很多"字符画"（比如终端里的企鹅、笑脸），都是 ASCII 艺术。</div><div><b>这是最早的"计算机艺术"形式之一。</b></div><div>今天你用 5 行代码，也画了一幅 ASCII 艺术。</div>',
        },
      },
    },

    /* ===== 24 难题后的放松：ASCII 艺术画廊 ===== */
    {
      id: 24,
      type: "grid",
      title: "🎨 难题后的放松 · 字符画画廊",
      subtitle: "用字符拼出的可爱图像",
      chapterTag: "第 1 讲 · 知识讲解",
      data: {
        cards: [
          {
            icon: "🙏",
            title: "佛祖保佑 · 永无 BUG",
            desc: '<img src="static/ascii-art/buddha-blessing.svg" alt="佛祖保佑 永无BUG" style="display:block;margin:0 auto;max-width:340px;width:100%;">',
          },
        ],
      },
    },

    /* ===== 25 OJ 是什么 ===== */
    {
      id: 25, type: "grid",
      title: "OJ 是什么？",
      subtitle: "Online Judge 在线判题系统",
      chapterTag: "第 1 讲 · OJ 实战",
      data: {
        cards: [
          {
            icon: "⚖️",
            title: "OJ = 在线裁判",
            desc: "<b>Online Judge</b><br>在线判题系统<br>像一位严格又公正的裁判",
          },
          {
            icon: "🔬",
            title: "怎么判题？",
            desc: "用预先准备的<b>测试数据</b><br>运行你的程序<br>对比输出结果",
          },
          {
            icon: "✅",
            title: "结果一样 → AC",
            desc: "<b>AC</b> = Accepted<br>答案正确<br>通过！",
          },
          {
            icon: "❌",
            title: "结果不一样 → WA",
            desc: "<b>WA</b> = Wrong Answer<br>答案错误<br>需要改进",
          },
        ],
        footer: '<b>📌 常用 OJ 平台推荐</b><br>· <b>洛谷</b>（luogu.com.cn）—— 中国最大，题目丰富，CSP-J/S 首选<br>· <b>一本通</b>—— 配套教材，按章节刷题，系统训练<br>· <b>AcWing</b>—— 课程 + 题库，零基础友好<br>· <b>Codeforces</b>—— 国际平台，每周比赛，提高段位<br><br>入门用<b>洛谷 + 一本通</b>，进阶用 <b>Codeforces</b>。',
      },
    },

    /* ===== 26 OJ 提交步骤 ===== */
    {
      id: 26,
      type: "flow",
      title: "OJ 提交步骤",
      subtitle: "手把手教你提交代码",
      data: {
        rows: [
          [
            { icon: "🔑", label: "注册登录" },
            { icon: "🔍", label: "搜索题目" },
            { icon: "📖", label: "阅读题目" },
            { icon: "⌨️", label: "粘贴代码" },
          ],
          [
            { icon: "🔽", label: "选择 C++" },
            { icon: "🚀", label: "点击提交" },
            {
              icon: "📊",
              label: "查看结果",
              glow: true,
              sub: "竞赛限时 3.5 小时，不能查资料",
            },
          ],
        ],
      },
    },

    /* ===== 27 判题结果 ===== */
    {
      id: 27, type: "compare",
      title: "OJ 判题结果解读",
      subtitle: "看懂反馈，快速改进",
      data: {
        groups: [
          {
            wrong: "❌ <b>WA</b> · 答案错误",
            right: "✅ <b>AC</b> · 答案正确<br><br>输出格式和预期一致",
          },
          {
            wrong: "❌ <b>CE</b> · 编译错误",
            right: "✅ 检查语法<br><br>标点、拼写、大小写、括号",
          },
          {
            wrong: "❌ <b>RE</b> · 运行时错误",
            right: "✅ 检查代码逻辑<br><br>数组越界、除零、递归太深",
          },
          {
            wrong: "❌ <b>TLE</b> · 超时",
            right: "✅ 优化算法<br><br>减少循环次数、换更优算法",
          },
        ],
      },
    },

    /* ===== 28 从 WA 到 AC ===== */
    {
      id: 28,
      type: "dialog",
      title: "从 WA 到 AC 的心路历程",
      subtitle: '小C与同学聊"改错"',
      chapterTag: "第 1 讲 · OJ 实战",
      data: {
        lines: [
          { who: "student", text: "小 C，我提交了 3 次，都是 WA，好沮丧。" },
          {
            who: "robot",
            text: '这是每个竞赛选手都走过的路。<b>WA 不是失败，是信息</b>——它告诉你"哪里不对"。',
          },
          { who: "student", text: "那我怎么找到不对的地方？" },
          {
            who: "robot",
            text: "三步走：<br>① 用题目给的样例测一遍，看看输出对不对<br>② 对比输出格式：多空格？少换行？<br>③ 检查常见错误：中文标点、大小写",
          },
          { who: "student", text: "样例过了还 WA 呢？" },
          {
            who: "robot",
            text: '那更常见——是<b>隐藏测试点</b>的问题。<br>比如题目要求输出末尾不能有空行，你的程序多输出了一行。<br>这类问题，后面学"输出格式"时会专门讲。',
          },
          { who: "student", text: "原来如此。" },
          {
            who: "robot",
            text: '记住这句话：<b>"AC 是礼物，WA 是老师。"</b><br>每次 WA 都让你更接近正确答案。',
          },
        ],
      },
    },

    /* ===== 29 课堂小测 ===== */
    {
      id: 29,
      type: "quiz",
      title: "课堂小测",
      subtitle: "编译器、程序结构与输出",
      chapterTag: "第 1 讲 · 课堂小测",
      data: {
        questions: [
          {
            id: 1,
            type: "single",
            difficulty: 3,
            source: "2020 CSP-J 初赛 · 第 2 题",
            question: "编译器的主要功能是（　）。",
            options: [
              { label: "A", text: "将源程序翻译成机器指令代码", correct: true },
              { label: "B", text: "将源程序重新组合" },
              { label: "C", text: "将低级语言翻译成高级语言" },
              { label: "D", text: "将一种高级语言翻译成另一种高级语言" },
            ],
            analysis:
              '编译器的作用是把高级语言编写的<b>源程序</b>整体翻译成等价的<b>机器指令代码</b>。选项 C 方向反了；选项 D 是"转译器"的功能。这正是本讲 "从代码到运行"的核心知识点。',
          },
          {
            id: 2,
            type: "single",
            difficulty: 3,
            source: "CSP-J 2026 初赛模拟卷一 · 第 5 题",
            question:
              "C++ 中使用 <code>cin</code> 和 <code>cout</code>，需要包含哪个头文件？",
            options: [
              { label: "A", text: "<code>iostream</code>", correct: true },
              { label: "B", text: "<code>cmath</code>" },
              { label: "C", text: "<code>cstdio</code>" },
              { label: "D", text: "<code>algorithm</code>" },
            ],
            analysis:
              '<code>cin</code> 和 <code>cout</code> 定义在标准输入输出流库中，对应头文件 <code>&lt;iostream&gt;</code>。这是本讲 slide-05"Hello, World!"中 <code>#include &lt;iostream&gt;</code> 的直接考查。',
          },
          {
            id: 3,
            type: "single",
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第一章",
            question: "下面哪个是 C++ 源程序文件的标准扩展名？",
            options: [
              { label: "A", text: "<code>.exe</code>" },
              { label: "B", text: "<code>.obj</code>" },
              { label: "C", text: "<code>.cpp</code>", correct: true },
              { label: "D", text: "<code>.txt</code>" },
            ],
            analysis:
              'C++ 源程序文件用 <code>.cpp</code> 扩展名。<br>· <code>.cpp</code> 是源程序（人类可读）<br>· <code>.obj</code> 是编译后的目标文件<br>· <code>.exe</code> 是链接后的可执行文件<br>这是初赛高频考点，对应本讲 slide-17 的"从代码到运行"。',
          },
          {
            id: 4,
            type: "judge",
            difficulty: 2,
            source: "CSP-J 初赛真题练习 · C++ 语法",
            question:
              "程序员用 C、C++、Python、Scratch 等编写的程序能在 CPU 上直接执行。",
            options: [
              { label: "A", text: "正确" },
              { label: "B", text: "错误", correct: true },
            ],
            analysis:
              'CPU 只能直接执行<b>机器指令</b>（0/1 序列）。高级语言（C++、Python）和图形化语言（Scratch）都需要经过<b>编译或解释</b>，转换成机器码后才能被 CPU 执行。这正是本讲 slide-17"从代码到运行"的核心知识点。',
          },
          {
            id: 5,
            type: "judge",
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第一章",
            question: "一个 C++ 程序可以没有 <code>main</code> 函数。",
            options: [
              { label: "A", text: "正确" },
              { label: "B", text: "错误", correct: true },
            ],
            analysis:
              '<code>main</code> 函数是 C++ 程序的<b>唯一入口</b>。每个可执行程序<b>有且只有一个</b> <code>main</code> 函数，程序从 <code>main</code> 的第一条语句开始执行。没有 <code>main</code>，编译器无法确定程序从哪里开始运行，会报链接错误。这是本讲 slide-05 extra"为什么 main 是入口"的核心内容。',
          },
          {
            id: 6,
            type: "judge",
            difficulty: 2,
            source: "CSP-J 初赛真题练习 · 考试规则",
            question: "CSP-J 通过初赛才能参加复赛，初赛淘汰率大约 60%—70%。",
            options: [
              { label: "A", text: "正确", correct: true },
              { label: "B", text: "错误" },
            ],
            analysis:
              "<b>CSP-J 分初赛和复赛两轮</b>：<br>· <b>初赛</b>：笔试（近年改为机试），考计算机基础、进制转换、逻辑运算、读程序写结果<br>· <b>复赛</b>：上机编程，4 道题，3.5 小时<br><br>初赛通过才能参加复赛，<b>淘汰率约 60%—70%</b>。<br>很多高手因为初赛没过，连复赛的门都进不去——<b>初赛不能忽视</b>。",
          },
        ],
      },
    },

    /* ===== 30 今日总结 ===== */
    {
      id: 30,
      type: "quote",
      title: "今日总结",
      subtitle: "今天我们学会了",
      data: {
        text: "程序框架不能少，头文件加命名空间。",
        author: "—— 竞赛第一课口诀",
        points: [
          "程序 = 指令 + 数据",
          "第一个 C++ 程序：Hello, World!",
          "程序基本结构：头文件、主函数、输出、返回",
          "编译过程：.cpp → .obj → .exe",
          "OJ 提交：注册、找题、提交、看结果",
          "判题结果：AC、WA、CE、RE、TLE",
        ],
        highlight: {
          title: "📌 关键口诀",
          desc: "主函数是入口，return 0 结束；cout 输出用 &lt;&lt;，换行用 endl；英文标点要记牢，分号千万别漏掉。",
        },
      },
    },

    /* ===== 31 课后作业 ===== */
    {
      id: 31,
      type: "grid",
      title: "课后作业 · OJ 实战",
      subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          {
            icon: "🟢",
            title: "基础 1 · P1000",
            link: "https://www.luogu.com.cn/problem/P1000",
            desc: "<b>Hello, World!</b><br>考察：输出格式<br>难度：★<br>目标：直接输出指定文本",
          },
          {
            icon: "🟢",
            title: "基础 2 · B2005",
            link: "https://www.luogu.com.cn/problem/B2005",
            desc: "<b>字符三角形</b><br>考察：cout + 换行<br>难度：★★<br>目标：用字符拼出三角形",
          },
          {
            icon: "🔴",
            title: "挑战 · B2002",
            link: "https://www.luogu.com.cn/problem/B2002",
            desc: "<b>Hello,World!</b>（变体）<br>考察：精确输出<br>难度：★★<br>目标：注意标点与大小写",
          },
        ],
      },
    },

    /* ===== 32 下节预告 ===== */
    {
      id: 32,
      type: "radial",
      title: "下节预告",
      subtitle: "第 2 讲 · 变量与整数类型",
      data: {
        center: "变量",
        items: [
          { text: "变量 = 盒子" },
          { text: "cin 输入" },
          { text: "int / long long" },
          { text: "命名规则" },
        ],
      },
    },

    /* ===== 33 答疑时间 ===== */
    {
      id: 33, type: "grid",
      title: "答疑时间",
      subtitle: "常见问题 FAQ",
      chapterTag: "第 1 讲 · 答疑",
      data: {
        cards: [
          {
            icon: "🔴",
            title: "编译不通过？",
            desc: "先看<b>第一行报错</b><br>通常是标点或分号<br>编译器会告诉你行号<br><br>对照四大错误找",
          },
          {
            icon: "❌",
            title: "WA 怎么办？",
            desc: "检查<b>输出格式</b><br>空格、换行、标点<br>有时候多一个空格<br>就被判 WA",
          },
          {
            icon: "🐛",
            title: "怎么调试？",
            desc: "在关键位置加 <code>cout</code><br>输出中间变量<br>看哪一步开始出错<br><br>这叫<b>打印调试</b>",
          },
          {
            icon: "🔀",
            title: "endl 还是 \\n？",
            desc: "初学用 <code>endl</code><br>更直观<br>竞赛大数据输出<br>换成 <code>\\n</code> 更快",
          },
          {
            icon: "📁",
            title: "程序保存成什么？",
            desc: "必须存成 <code>.cpp</code> 文件<br>编译器才能读<br>就像作文要写在纸上",
          },
          {
            icon: "❓",
            title: "中文变量名行吗？",
            desc: "理论上能<br><b>但绝对不要</b><br>竞赛、工程、审查<br>都不允许",
          },
        ],
      },
    },

    /* ===== 34 本讲英文单词 ===== */
    {
      id: 34,
      type: "glossary",
      title: "本讲英文单词",
      subtitle: "记牢拼写，理解原意",
      chapterTag: "第 1 讲 · 复习",
      data: {
        words: [
          {
            word: "cout",
            cn: "输出",
            pron: "/siː aʊt/",
            origin: "character output 的缩写",
            category: "函数",
          },
          {
            word: "endl",
            cn: "换行",
            pron: "/end ɛl/",
            origin: "end line 的缩写",
            category: "函数",
          },
          {
            word: "include",
            cn: "包含",
            pron: "/ɪnˈkluːd/",
            origin: '英文原意"包含"',
            category: "关键字",
          },
          {
            word: "main",
            cn: "主函数",
            pron: "/meɪn/",
            origin: '英文原意"主要的"',
            category: "函数",
          },
          {
            word: "return",
            cn: "返回",
            pron: "/rɪˈtɜːrn/",
            origin: '英文原意"返回"',
            category: "关键字",
          },
          {
            word: "std",
            cn: "标准",
            pron: "/stændəd/",
            origin: "standard 的缩写",
            category: "概念",
          },
          {
            word: "STL",
            cn: "标准模板库",
            pron: "/es tiː el/",
            origin: "Standard Template Library",
            category: "概念",
          },
        ],
      },
    },

    /* ===== 35 知识清单 ===== */
    {
      id: 35,
      type: "grid",
      title: "第 1 讲 · 知识清单",
      subtitle: "一页看完本讲所有重点",
      chapterTag: "第 1 讲 · 复习",
      data: {
        cards: [
          {
            icon: "📄",
            title: "程序结构",
            desc: "<b>头文件</b> #include &lt;iostream&gt;<br><b>命名空间</b> using namespace std;<br><b>主函数</b> int main() { }<br><b>返回</b> return 0;",
          },
          {
            icon: "📤",
            title: "输出 cout",
            desc: '用 <code>&lt;&lt;</code> 输出内容<br>可连续输出多个内容<br><code>endl</code> 换行并刷新<br><code>"\\n"</code> 换行更快',
          },
          {
            icon: "⚙️",
            title: "编译过程",
            desc: ".cpp → .obj → .exe<br><b>编译</b>：翻译成机器码<br><b>链接</b>：拼装成 .exe<br><b>运行</b>：CPU 执行",
          },
          {
            icon: "🏆",
            title: "OJ 提交与判题",
            desc: "注册 → 找题 → 粘贴 → 提交<br><b>AC</b> 通过 · <b>WA</b> 答案错<br><b>CE</b> 编译错 · <b>RE</b> 运行错<br><b>TLE</b> 超时 · <b>MLE</b> 内存超",
          },
          {
            icon: "📌",
            title: "本讲口诀",
            desc: "程序框架不能少，<br>头文件加命名空间。<br>主函数是入口，<br>return 0 结束；<br>cout 输出用 <code>&lt;&lt;</code>，<br>换行用 <code>endl</code>。<br><br><b>四大错误要记牢</b>：<br>中文标点、漏分号、大小写、括号不配对。",
          },
        ],
      },
    },

    /* ===== 36 结束页 ===== */
    {
      id: 36,
      type: "ending",
      title: "第一讲结束",
      subtitle: "点击返回目录，复习本讲内容",
      chapterTag: false,
      data: {
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
      },
    },
  ],
};
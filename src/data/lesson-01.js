export default {
  title: "第 1 讲 初识 C++",
  subtitle: "第一个程序与 OJ 提交",
  total: 34,
  category: "语法与基础算法",
  slides: [
    /* ===== 01 封面 ===== */
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

    /* ===== 02 开场钩子：3 行代码画三角形 ===== */
    {
      id: 2, type: "code-split",
      title: "3 行代码，画出三角形",
      subtitle: "开场：先看个东西",
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

    /* ===== 03 本节课目标 ===== */
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
        footer: '<b>📌 今天的路线</b>：装环境 → 写代码 → 编译运行 → 提交 OJ → 闯关成功<br><b>先动手，再理解</b>——这是学编程的正确顺序。'
      }
    },

    /* ===== 04 编程环境 ===== */
    {
      id: 4, type: "grid",
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

    /* ===== 05 Dev-C++ 5 步跑起来 ===== */
    {
      id: 5, type: "grid",
      title: "Dev-C++ · 5 步跑出第一个程序",
      subtitle: "打开软件，键盘不离手",
      chapterTag: "第 1 讲 · 动手实践",
      data: {
        cards: [
          {
            icon: "⚡",
            title: "5 步走 · 快捷键是效率",
            desc: "<b>① 新建</b>：<code>Ctrl + N</code><br><b>② 保存</b>：<code>Ctrl + S</code> 存为 <code>.cpp</code> 文件<br><b>③ 编译</b>：<code>F9</code> —— 只检查代码有没有错<br><b>④ 运行</b>：<code>F10</code> —— 执行上一次编译好的程序<br><b>⑤ 一键编译+运行</b>：<code>F11</code>（最常用）<br><br><b>💡 为什么 F11 最常用？</b><br>因为它把 ③④ 合并成一步 —— 你改一次代码就按一次 F11，省去反复切按键。"
          }
        ],
        footer: '<b>📌 口诀</b>：<br>新建 <code>Ctrl+N</code> · 保存 <code>Ctrl+S</code> · 编译 <code>F9</code> · 运行 <code>F10</code> · 一键 <code>F11</code><br><br>今天就靠这 5 个键走完全程。'
      }
    },

    /* ===== 06 Dev-C++ 两个必改设置 ===== */
    {
      id: 6, type: "grid",
      title: "Dev-C++ · 两个必改设置",
      subtitle: "不改，后面会报错",
      chapterTag: "第 1 讲 · 动手实践",
      data: {
        cards: [
          {
            icon: "⚙️",
            title: "① 必改：C++11 标准",
            desc: "竞赛默认要求 C++11 以上。<br><b>路径</b>：工具 → 编译选项 → 勾选“编译时加入以下命令” → 填入：<br><code>-std=c++11</code><br><br><b>⚠️ 如果不改，</b>后续学到的 <code>long long</code> 等语法可能会报错！"
          },
          {
            icon: "📝",
            title: "② 一劳永逸：代码模板",
            desc: "每次新建都要敲几行太麻烦。<br><b>路径</b>：工具 → 编辑器选项 → 代码模板 → 默认源。<br>填入基础框架：<br><code>#include &lt;iostream&gt;</code><br><code>using namespace std;</code><br><code>int main() {</code><br><code>&nbsp;&nbsp;return 0;</code><br><code>}</code>"
          }
        ],
        footer: '<b>📌 其他选修设置（建议但不必须）</b><br>· <b>代码补全</b>：工具 → 编辑器选项 → 代码补全 → 勾选"允许代码补全"<br>· <b>自动括号</b>：同上 → 勾选"自动添加括号"<br>· <b>显示行号</b>：工具 → 编辑器选项 → 显示 → 勾选"显示行号"<br>· <b>字体大小</b>：工具 → 编辑器选项 → 显示 → 调整到 16—18 号<br><br>💡 <b>口诀</b>：C++11 不能少，代码模板写好后，写起代码快又好。'
      }
    },

    /* ===== 07 Hello World ===== */
    {
      id: 7,
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
          title: "💡 为什么所有语言的第一课都是它？",
          desc: '<div><b>1. 为什么 main 是入口？</b><br><code>main</code> 是英文"<b>主要的</b>"的意思。计算机运行程序时，第一件事就是<b>找到 main</b>，从那里开始执行。</div><div>没有 main，程序就不知道从哪里出发。这是 C++ 标准的规定，<b>所有编译器都遵守</b>。</div><div><b>2. Hello World 的浪漫</b><br>1972 年，贝尔实验室的 Brian Kernighan 在教程里写下了第一句 <code>Hello World</code>。<br>半个世纪过去了，全世界所有程序员的第一行代码，几乎都是这句问候。这是我们向计算机世界打的第一个招呼。</div><div><b>3. 那能不能不叫 main？</b><br>不行。每个程序有且只有一个 main，且名字必须小写。写成 <code>Main</code> 会报错。<br>有趣的是，其他语言也是：<a href="https://baike.baidu.com/item/Java" target="_blank" class="wiki-link">Java</a> 是 <code>public static void main</code>，<a href="https://baike.baidu.com/item/Python" target="_blank" class="wiki-link">Python</a> 是 <code>if __name__ == \'__main__\'</code>。</div><div>🔮 <b>伏笔</b>：你写的 "H"、"e"、"l"，在计算机里其实都是 <b>数字</b>。第 22 讲揭晓。</div>',
        },
      },
    },

    /* ===== 08 练习1：Hello C++ ===== */
    {
      id: 8,
      type: "level-map",
      title: "课堂练习1：Hello, C++!",
      subtitle: "动手修改你的第一个程序",
      chapterTag: "第 1 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "不要直接抄上一页！请修改刚才的代码，让屏幕输出：<br><code>Hello, C++!</code><br><br>要求：注意<b>大小写</b>，结尾是<b>英文感叹号</b>，别忘了分号。",
          timer: "⏱ 限时 3 分钟",
        },
        hints: [
          "用 <code>cout</code> 输出",
          "仔细看引号里的内容，把 <code>World</code> 换成 <code>C++</code>",
          "感叹号 <code>!</code> 必须在英文双引号 <code>\" \"</code> 里面",
          "整句代码以英文分号 <code>;</code> 结尾",
        ],
        answer: {
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}',
        },
        analysis: {
          title: "📖 解析",
          desc: '这道题考的是<b>代码修改</b>与<b>标点符号</b>。<br>很多同学会不小心把感叹号写到引号外面，变成 <code>"Hello, C++"!</code>，这是典型的语法错误。<br><br>输出的文字就像广播里的"一句话"，<b>标点符号也是这句话的一部分</b>，必须用引号"打包"好才能送出去。',
        },
        extra: {
          title: "📖 知识扩展 · 第一位程序员与第一个 Bug",
          image: {
            src: "static/images/people/ada-lovelace.webp",
            alt: "阿达·洛芙莱斯",
            caption: "阿达·洛芙莱斯（1815—1852）",
            source: "Public Domain",
            layout: "float-right",
            size: "sm",
            zoomable: true
          },
          desc: '<div><b>第一位程序员</b></div><div>1843 年，英国诗人拜伦的女儿 <a href="https://baike.baidu.com/item/阿达·洛芙莱斯" target="_blank" class="wiki-link">阿达·洛芙莱斯</a>，为查尔斯·巴贝奇设计的"分析机"写下了计算伯努利数的算法。<br>她比计算机的诞生早了整整 100 年。为了纪念她，美国国防部将一种编程语言命名为 <b>Ada</b>。</div><div><b>历史上第一个 Bug</b></div><div>1947 年，哈佛大学的 Mark II 计算机出了故障。工程师打开机箱，发现一只飞蛾卡在了继电器里。<br>他们把这只飞蛾贴在了日志本上，并写下："First actual case of bug being found"（第一次发现真实的虫子）。<br>从此，程序出错就被称为 <b>Bug</b>，找错就成了 <b>Debug</b>。</div>',
        },
      },
    },

    /* ===== 09 🎉 跑起来了 ===== */
    {
      id: 9, type: "big-number",
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

    /* ===== 10 什么是程序 ===== */
    {
      id: 10,
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
          desc: '指令告诉计算机"<b>做什么</b>"，数据告诉它"<b>处理什么</b>"。<br>比如 <code>cout &lt;&lt; "Hello"</code> —— "输出"是指令，"Hello"是数据。<br><br><b>一个快递比喻</b>：<br>· 你写订单（<code>cout &lt;&lt; "Hello"</code>）<br>· 快递员翻译成地址码（编译器翻译成机器码）<br>· 快递系统按地址码配送（CPU 按机器码执行）<br>· <b>0/1 就是那个"地址码"</b>——机器才看得懂。<br><br><b>C++ 的角色</b>：它是"人"和"机器"之间的 <b>翻译官</b> ——<br>你写人话，它翻译成机器话，计算机才听得懂。',
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

    /* ===== 11 为什么要学 C++ ===== */
    {
      id: 11,
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

    /* ===== 12 编程语言 70 年 ===== */
    {
      id: 12,
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

    /* ===== 13 1946 · ENIAC 诞生 ===== */
    {
      id: 13, type: "split",
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

    /* ===== 14 从代码到运行 ===== */
    {
      id: 14,
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

    /* ===== 15 编译报错 · 三段读法 ===== */
    {
      id: 15,
      type: "grid",
      title: "第一次编译报错怎么办？",
      subtitle: "小 C 教你三段读法",
      chapterTag: "第 1 讲 · 概念理解",
      data: {
        cards: [
          {
            icon: "📄",
            title: "① 文件名",
            desc: "<code>hello.cpp</code><br><br><b>哪个文件出错？</b><br>多个文件时，先定位到出错的那个<br>单文件程序通常只有一个"
          },
          {
            icon: "📍",
            title: "② 行号列号",
            desc: "<code>5:10</code><br><br><b>第 5 行第 10 列</b><br>打开对应的行号去查看<br>（记得把行号显示打开）"
          },
          {
            icon: "🔍",
            title: "③ 错误类型",
            desc: "<code>expected ';'</code><br><br><b>缺什么？</b><br>这里是缺分号<br>编译器会告诉你缺什么"
          }
        ],
        footer: '<b>📌 完整的错误信息</b><br><code>hello.cpp:5:10: error: expected \';\' before \'return\'</code><br><br><b>三段读法</b>：<br>① <b>hello.cpp</b> —— 哪个文件出错<br>② <b>5:10</b> —— 第 5 行第 10 列<br>③ <b>expected \';\'</b> —— 缺少分号<br><br>看这三段就够了 —— 后面的细节可以先忽略。<b>红色文字不是灾难，是编译器在帮你</b>。'
      }
    },

    /* ===== 16 常见错误盘点 ===== */
    {
      id: 16,
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

    /* ===== 17 环境问题 ===== */
    {
      id: 17, type: "pitfall",
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

    /* ===== 18 OJ 是什么 ===== */
    {
      id: 18, type: "grid",
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

    /* ===== 19 OJ 提交步骤 ===== */
    {
      id: 19,
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

    /* ===== 20 判题结果 ===== */
    {
      id: 20, type: "compare",
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

    /* ===== 21 WA → AC 的心路历程 ===== */
    {
      id: 21,
      type: "quote",
      title: "从 WA 到 AC",
      subtitle: '小 C 的改错哲学',
      chapterTag: "第 1 讲 · OJ 实战",
      data: {
        text: "AC 是礼物，WA 是老师。",
        author: "—— 小 C",
        points: [
          "<b>第一步</b>：用题目给的样例测一遍，看看输出对不对",
          "<b>第二步</b>：对比输出格式：多空格？少换行？中文标点？",
          "<b>第三步</b>：检查常见错误：大小写、括号配对、分号缺失",
          "<b>隐藏测试点</b>：样例过了还 WA —— 更常见，检查边界（如多空行、末尾换行）",
        ],
        highlight: {
          title: "📌 记住这句话",
          desc: "每次 WA 都不是失败，是<b>信息</b> —— 它在告诉你"哪里不对"。<br><br>当年带出世界第一的学生，也是从第一次 WA 开始改起的。"
        }
      }
    },

    /* ===== 22 过渡页：第三站 ===== */
    {
      id: 22,
      type: "transition",
      title: "第三站 · 编译与运行",
      subtitle: "从源码到程序",
      data: {
        previous: "OJ 提交与判题",
        note: "接下来，你将看懂程序是怎么变成可执行文件的",
      },
    },

    /* ===== 23 输出进阶 ===== */
    {
      id: 23,
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

    /* ===== 24 练习2：输出图形 ===== */
    {
      id: 24,
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

    /* ===== 25 练习3：输出菱形 ===== */
    {
      id: 25,
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

    /* ===== 26 ASCII 艺术画廊（放松页） ===== */
    {
      id: 26,
      type: "split",
      title: "🎨 难题后的放松 · 字符画画廊",
      subtitle: "用字符拼出的可爱图像",
      chapterTag: "第 1 讲 · 知识讲解",
      data: {
        intro: "刚才练习 3 的菱形，是最简单的字符画。<br>真正的字符画能有多惊艳？看看这张——",
        panes: [
          {
            image: "static/ascii-art/buddha-blessing.svg",
            imageAlt: "佛祖保佑 永无BUG 字符画",
            imageCaption: "佛祖保佑 · 永无 BUG",
            imageLayout: "block",
            imageSize: "full",
            zoomable: true
          },
          {
            title: "字符画简史",
            items: [
              {
                title: "1960s · 打印机时代",
                desc: "打印机只能打字符<br>程序员开始用 <code>*</code> <code>#</code> <code>@</code> 拼图案"
              },
              {
                title: "1980s · BBS 时代",
                desc: "网络慢，图片发不了<br>字符画成了社交语言"
              },
              {
                title: "今天 · 文化符号",
                desc: "终端企鹅、笑脸、LOGO<br>都是 ASCII 艺术"
              },
              {
                title: "🎯 你能画什么？",
                desc: "只要会 <code>cout</code>，你就能画<br>试试看：拼一个笑脸？"
              }
            ]
          }
        ]
      }
    },

    /* ===== 27 初赛高频考点（合并原 p19+p20） ===== */
    {
      id: 27,
      type: "grid",
      title: "初赛高频考点 · 竞赛启蒙",
      subtitle: "这四个考点，初赛年年考",
      chapterTag: "第 1 讲 · 初赛渗透",
      data: {
        cards: [
          {
            icon: "⚙️",
            title: "① 编译器功能",
            desc: "<b>源程序 → 机器指令</b><br><br>编译器的作用是：<br>把高级语言编写的源程序<br>整体翻译成等价的机器指令代码<br><br><b>⚠️ 方向不要反</b>"
          },
          {
            icon: "🔍",
            title: "② 编译 vs 解释",
            desc: "<b>编译</b>：一次性翻译全部<br>（C++ / C）<br><br><b>解释</b>：逐行翻译执行<br>（Python / JavaScript）<br><br><b>C++ 是编译型语言</b>"
          },
          {
            icon: "📄",
            title: "③ .cpp 扩展名",
            desc: "<code>.cpp</code> = 源程序（人可读）<br><code>.obj</code> = 目标文件（编译后）<br><code>.exe</code> = 可执行文件（链接后）<br><br><b>必背：源程序是 .cpp</b>"
          },
          {
            icon: "🔌",
            title: "④ 高级 vs 低级语言",
            desc: "<b>低级语言</b>：机器语言 / 汇编<br><b>高级语言</b>：C++ / Python / Java<br><br>CPU 只能直接执行<b>机器语言</b><br>高级语言必须编译/解释"
          }
        ],
        footer: '<b>📌 记住这四个点，初赛送分题拿下</b><br>· 编译器 = 把源程序翻译成机器指令<br>· 编译型（C++）vs 解释型（Python）<br>· 源程序扩展名 = <code>.cpp</code><br>· 高级语言不能直接被 CPU 执行<br><br>这 4 题在 CSP-J 初赛里至少考 2 道，<b>送分不能丢</b>。'
      }
    },

    /* ===== 28 课堂小测（4 题） ===== */
    {
      id: 28,
      type: "quiz",
      title: "课堂小测",
      subtitle: "编译器、程序结构与执行",
      chapterTag: "第 1 讲 · 课堂小测",
      data: {
        questions: [
          {
            id: 1,
            type: "single",
            difficulty: 3,
            source: "2020 CSP-J 初赛 · 第 2 题",
            optionLayout: "vertical",
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
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第一章",
            optionLayout: "horizontal",
            question: "下面哪个是 C++ 源程序文件的标准扩展名？",
            options: [
              { label: "A", text: "<code>.exe</code>" },
              { label: "B", text: "<code>.obj</code>" },
              { label: "C", text: "<code>.cpp</code>", correct: true },
              { label: "D", text: "<code>.txt</code>" },
            ],
            analysis:
              'C++ 源程序文件用 <code>.cpp</code> 扩展名。<br>· <code>.cpp</code> 是源程序（人类可读）<br>· <code>.obj</code> 是编译后的目标文件<br>· <code>.exe</code> 是链接后的可执行文件<br>这是初赛高频考点，对应本讲"从代码到运行"。',
          },
          {
            id: 3,
            type: "judge",
            difficulty: 2,
            source: "CSP-J 初赛真题练习 · C++ 语法",
            optionLayout: "two-cols",
            question:
              "程序员用 C、C++、Python、Scratch 等编写的程序能在 CPU 上直接执行。",
            options: [
              { label: "A", text: "正确" },
              { label: "B", text: "错误", correct: true },
            ],
            analysis:
              'CPU 只能直接执行<b>机器指令</b>（0/1 序列）。高级语言（C++、Python）和图形化语言（Scratch）都需要经过<b>编译或解释</b>，转换成机器码后才能被 CPU 执行。这正是本讲"从代码到运行"的核心知识点。',
          },
          {
            id: 4,
            type: "judge",
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第一章",
            optionLayout: "two-cols",
            question: "一个 C++ 程序可以没有 <code>main</code> 函数。",
            options: [
              { label: "A", text: "正确" },
              { label: "B", text: "错误", correct: true },
            ],
            analysis:
              '<code>main</code> 函数是 C++ 程序的<b>唯一入口</b>。每个可执行程序<b>有且只有一个</b> <code>main</code> 函数，程序从 <code>main</code> 的第一条语句开始执行。没有 <code>main</code>，编译器无法确定程序从哪里开始运行，会报链接错误。这是本讲 Hello World extra"为什么 main 是入口"的核心内容。',
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
          desc: "主函数是入口，return 0 结束；<br>cout 输出用 &lt;&lt;，换行用 endl；<br>英文标点要记牢，分号千万别漏掉。"
        }
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

    /* ===== 31 下节预告 ===== */
    {
      id: 31,
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

    /* ===== 32 答疑时间（4 卡） ===== */
    {
      id: 32, type: "grid",
      title: "答疑时间",
      subtitle: "4 个最常被问到的问题",
      chapterTag: "第 1 讲 · 答疑",
      data: {
        cards: [
          {
            icon: "🔴",
            title: "编译不通过？",
            desc: "先看<b>第一行报错</b><br>通常是标点或分号<br>编译器会告诉你行号<br><br>对照四大错误找"
          },
          {
            icon: "❌",
            title: "WA 怎么办？",
            desc: "检查<b>输出格式</b><br>空格、换行、标点<br>有时候多一个空格<br>就被判 WA"
          },
          {
            icon: "🐛",
            title: "怎么调试？",
            desc: "在关键位置加 <code>cout</code><br>输出中间变量<br>看哪一步开始出错<br><br>这叫<b>打印调试</b>"
          },
          {
            icon: "🔀",
            title: "endl 还是 \\n？",
            desc: "初学用 <code>endl</code><br>更直观<br>竞赛大数据输出<br>换成 <code>\\n</code> 更快"
          }
        ],
        footer: '<b>📌 更多问题</b>：程序保存成什么？<code>.cpp</code> 文件（第 3 页已讲）。中文变量名行吗？理论上能，但<b>竞赛绝对不用</b>。'
      }
    },

    /* ===== 33 本讲英文单词 ===== */
    {
      id: 33,
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

    /* ===== 34 结束页 ===== */
    {
      id: 34,
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
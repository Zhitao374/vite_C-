export default {
  title: "第 1 讲 初识 C++",
  subtitle: "第一个程序与 OJ 提交",
  total: 27,
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

    /* ===== 2 钩子：3 行代码画三角形 ===== */
    {
      id: 2,
      type: "code-split",
      title: "3 行代码，画出三角形",
      subtitle: "开场：先看个东西",
      chapterTag: "第 1 讲 · 开场",
      data: {
        intro:
          "这是 C++ 能做的事 —— 你写 3 行代码，它帮你画出图案。<br>不信？看下面。",
        codeFile: "codes/lesson-01/demo-triangle.cpp",
        annotations: [
          { line: 1, title: "for 循环", desc: "重复 5 次 —— 不用懂，第 5 讲才学" },
          { line: 2, title: "cout", desc: "输出一行" },
          { line: 3, title: "换行", desc: "endl" },
        ],
        output: "    *\n   ***\n  *****\n *******\n*********",
        footer:
          '<b>📌 这就是编程</b>：<br>你写 3 行"指令"，计算机执行上亿次操作 —— <b>最后变成你看到的图案</b>。<br><br>后面 90 分钟，你也能写出这样的代码 —— <b>甚至更酷的</b>。',
      },
    },

    /* ===== 3 Dev-C++ 上手与配置（4 卡） ===== */
    {
      id: 3,
      type: "grid",
      title: "Dev-C++ 上手与配置",
      subtitle: "打开软件 → 5 步跑起来 → 4 项设置",
      chapterTag: "第 1 讲 · 动手实践",
      data: {
        cards: [
          {
            icon: "⚡",
            title: "① 5 步跑起来",
            desc:
              "<b>新建</b> <code>Ctrl + N</code><br>" +
              "<b>保存</b> <code>Ctrl + S</code> 存为 <code>.cpp</code><br>" +
              "<b>编译</b> <code>F9</code> · <b>运行</b> <code>F10</code><br>" +
              "<b>一键编译+运行</b> <code>F11</code>（最常用）",
          },
          {
            icon: "⚙️",
            title: "② 必改：C++11",
            desc:
              "工具 → 编译选项 → 勾选「编译时加入以下命令」<br>" +
              "填入 <code>-std=c++11</code><br>" +
              "<b>不改，后面会报错</b>",
          },
          {
            icon: "✨",
            title: "③ 必开：代码补全",
            desc:
              "工具 → 编辑器选项 → 代码补全<br>" +
              "勾选「允许代码补全」<br>" +
              "同时勾「自动添加括号」<br>" +
              "自动闭合 <code>{}</code> 和 <code>()</code>",
          },
          {
            icon: "📝",
            title: "④ 必存：代码模板",
            desc:
              "工具 → 编辑器选项 → 代码模板 → 默认源<br>" +
              "填入四件套框架（下一页有）<br>" +
              "每次新建自动生成，省 30 秒",
          },
        ],
        footer:
          '<b>🚨 机房急救卡</b>：按 F11 后软件黑屏、闪退或弹出一大堆红字，<b>千万不要乱点！</b><br>立刻举手，老师过去帮你排雷。<br><br><b>📌 口诀</b>：快捷键要记牢，C++11 不能少，代码补全调出来，写起代码快又好。',
      },
    },

    /* ===== 4 第一个程序：Hello World ===== */
    {
      id: 4,
      type: "code-split",
      title: "Hello World",
      subtitle: "5 行代码，你也能指挥电脑",
      chapterTag: "第 1 讲 · 动手实践",
      data: {
        intro:
          "📖 在 Dev-C++ 里敲下这 5 行。<br>这就是所有 C++ 程序的<b>标准框架</b> —— 先照抄，别问为什么。为什么，后面会讲。",
        codeFile: "codes/lesson-01/hello-world.cpp",
        snippet: "main",
        annotations: [
          { line: 1, title: "#include &lt;iostream&gt;", desc: "头文件 —— 引入输入输出工具" },
          { line: 2, title: "using namespace std;", desc: "命名空间 —— 告诉编译器用 std 里的东西" },
          { line: 4, title: "int main() {", desc: "主函数 —— 程序从这里开始（main = 主要的）" },
          { line: 5, title: "cout &lt;&lt; ...", desc: "输出 Hello, World!（cout = character output）" },
          { line: 6, title: "return 0;", desc: "返回 0 —— 程序正常结束" },
        ],
        output: "Hello, World!",
        extra: {
          title: "💡 为什么所有语言的第一课都是它？",
          desc:
            "<div><b>1972 年</b>，贝尔实验室的 Brian Kernighan 在教程里写下了第一句 <code>Hello World</code>。</div><div>半个世纪过去了，全世界所有程序员的第一行代码，几乎都是这句问候。</div><div>今天你写的，和前 50 年的程序员写的一模一样。<br><b>这不是巧合 —— 这是编程世界的「入会仪式」。</b></div><div>🔮 <b>伏笔</b>：你写的 H、e、l 这些字母，在计算机里其实都是<b>数字</b>。第 22 讲揭晓。</div>",
          variant: "card-primary",
        },
        footer:
          '<b>📌 敲完按 F11 试试！</b><br>看到黑窗口里弹出 Hello, World! 了吗？<br><br>如果报错了 —— 先别急，下一页我们会故意的让你再报一次错。',
      },
    },

    /* ===== 5 少一行，报错了（第一次冲突） ===== */
    {
      id: 5,
      type: "code-split",
      title: "少一行，报错了",
      subtitle: "第一次撞墙：为什么跑不起来",
      chapterTag: "第 1 讲 · 动手实践",
      data: {
        intro:
          "刚才跑通了。<br>现在——把<b>第 2 行删掉</b>（<code>using namespace std;</code>），再按 F11。<br>看看会发生什么。",
        code:
          '#include <iostream>\n\nint main() {\n    cout << "Hello, World!";   // 这里少了 using namespace std;\n    return 0;\n}',
        annotations: [
          { line: 1, title: "#include &lt;iostream&gt;", desc: "头文件还在" },
          { line: 4, title: "cout &lt;&lt; ...", desc: "输出代码也还在" },
          {
            line: 4,
            title: "但报错了！",
            desc:
              "<code>[Error] 'cout' was not declared in this scope</code><br>翻译：<b>「我不认识 cout」</b>",
          },
        ],
        output: "[Error] 'cout' was not declared in this scope",
        footer:
          '<b>🚨 卡住了？</b><br>你没抄错 —— 代码就是这样写。<br><b>报错说：「我不认识 cout」</b>。<br>为什么？—— 下一页揭晓。<br><br>⏱ <b>给你 30 秒，自己想</b>：cout 到底在哪？',
      },
    },

    /* ===== 6 编译器不认识 cout（+ 飞蛾 extra） ===== */
    {
      id: 6,
      type: "dialog",
      title: "编译器不认识 cout",
      subtitle: "报错在说什么？",
      chapterTag: "第 1 讲 · 概念理解",
      data: {
        lines: [
          { who: "student", text: "小 C，我按 F11 报错了 —— 我抄错了吗？" },
          {
            who: "robot",
            text: "没抄错。<b>代码就是那样写的。</b><br>报错信息是 <code>'cout' was not declared in this scope</code> —— 翻译过来就是<b>「我不认识 cout」</b>。",
          },
          { who: "student", text: "为什么不认识？cout 不是本来就有的吗？" },
          {
            who: "robot",
            text: '不是的。cout 住在 <b>std 这个"命名空间"</b>里。<br>你得告诉编译器：我用的是 <b>std 这家店</b>的 cout。<br>写法就是 <code>using namespace std;</code> —— 一句话，全搞定。',
          },
          { who: "student", text: "那为什么报错叫「bug」？" },
          {
            who: "robot",
            text: '因为 1947 年真的有一只<b>虫子</b>跑进了计算机。<br>故事在下面的「知识扩展」里 —— 打开看看。',
          },
        ],
        extra: {
          title: "🐛 1947 年 · 第一个 bug 是一只飞蛾",
          desc:
            '<div><b>1947 年 9 月 9 日</b>，哈佛大学的 Mark II 计算机突然出故障。<br>工程师打开机箱排查，发现一只<b>飞蛾</b>卡在了继电器里。</div><div>他们把飞蛾取出来，用胶带贴在当天的日志本上，写下：<br><b>「First actual case of bug being found」（第一个真正找到的 bug 案例）</b>。</div><div>这本日志现在还保存在史密森尼美国历史博物馆。<br><br>从那天起——<br>程序里的错误叫 <b>bug</b>（虫子）<br>找错叫 <b>debug</b>（除虫）<br><br>你今天说的"Debug 一下"，源头就是这只会飞的虫子。</div>',
          variant: "card-primary",
        },
      },
    },

    /* ===== 7 为什么写这一堆？（四件套） ===== */
    {
      id: 7,
      type: "dialog",
      title: "为什么写这一堆？",
      subtitle: "四件套拆解",
      chapterTag: "第 1 讲 · 概念理解",
      data: {
        lines: [
          { who: "student", text: "小 C，我只想输出一句 Hello，为什么要写 5 行？" },
          {
            who: "robot",
            text: "这是所有 C++ 程序的<b>「标准框架四件套」</b> —— 少一行都不行：<br>① <code>#include &lt;iostream&gt;</code>：借工具（头文件）<br>② <code>using namespace std;</code>：报菜名（命名空间）<br>③ <code>int main() {}</code>：主菜从这里开始（程序入口）<br>④ <code>return 0;</code>：吃完结账（正常结束）",
          },
          { who: "student", text: "那我把 main 改成 start 行不行？我觉得 start 更好听。" },
          {
            who: "robot",
            text: '绝对不行。<code>main</code> 是英文"<b>主要的</b>"的意思。<br>计算机启动程序，第一件事就是找 main。<br><b>没有 main，程序不知道从哪开始。</b><br>这是 C++ 的死规定 —— 必须背下来。',
          },
        ],
        footer:
          '<b>📌 关于「点菜」类比</b>：<br>程序 = 你去餐厅吃饭。<br>借工具（头文件）→ 报菜名（命名空间）→ 主菜（main）→ 结账（return 0）。<br>每一环都不能少。',
      },
    },

    /* ===== 8 程序 = 指令 + 数据（+ 冯诺依曼） ===== */
    {
      id: 8,
      type: "origin",
      title: "程序 = 指令 + 数据",
      subtitle: "计算机怎么\"听懂\"你的话",
      chapterTag: "第 1 讲 · 概念理解",
      data: {
        problem: {
          title: "你写的代码，计算机能直接读懂吗？",
          points: [
            '你写 <code>cout &lt;&lt; "Hello";</code> —— 计算机能直接读懂吗？',
            "不能。<b>计算机只认识 0 和 1</b> —— 一串二进制机器码",
            '那它到底是怎么"听懂"的？',
          ],
        },
        evolution: [
          {
            icon: "✍️",
            era: "第一层",
            title: "你写代码",
            desc: '<code>cout &lt;&lt; "Hello";</code><br>用 C++ 语法写的 —— 接近英语，人容易写、容易读',
          },
          {
            icon: "🔧",
            era: "第二层",
            title: "编译器翻译",
            desc: '把 C++ 一行行翻译成<b>机器码</b> —— 生成 <code>.obj</code> 文件<br>这个过程叫 <b>编译</b>',
          },
          {
            icon: "⚙️",
            era: "第三层",
            title: "计算机执行",
            desc: 'CPU 读机器码（0 和 1）—— 按指令执行 —— 输出 <code>Hello</code>',
          },
        ],
        summary: {
          title: "程序 = 指令 + 数据",
          desc: '指令告诉计算机"<b>做什么</b>"，数据告诉它"<b>处理什么</b>"。<br>比如 <code>cout &lt;&lt; "Hello"</code> —— "输出"是指令，"Hello"是数据。<br><br><b>C++ 的角色</b>：它是"人"和"机器"之间的 <b>翻译官</b> ——<br>你写人话，它翻译成机器话，计算机才听得懂。',
          code: 'cout << "Hello";       // 你写人话\n   ↓ ↓ 编译器翻译 ↓ ↓\n10110001 01001111 ...  // 机器话',
        },
        extra: {
          title: "📖 冯·诺依曼的「存储程序」",
          image: {
            src: "static/images/people/von-neumann.jpg",
            alt: "约翰·冯·诺依曼",
            caption: "约翰·冯·诺依曼（1903—1957）",
            source: "美国能源部 / Public Domain",
            layout: "float-right",
            size: "sm",
            zoomable: true,
          },
          desc:
            '<div>1945 年，数学家冯·诺依曼提出了「<b>存储程序</b>」概念：<br>把指令和数据一起存进内存，让计算机自动执行。</div><div>在这之前，改变计算任务要 <b>重新接线</b> —— 就像今天想换一个 App，你得换一台手机。</div><div>这个想法彻底改变了计算机。<br>今天你用的手机、电脑、服务器，<b>全都是冯·诺依曼结构</b>。</div>',
          variant: "card-primary",
        },
      },
    },

    /* ===== 9 🎉 跑起来了！（+ ENIAC extra） ===== */
    {
      id: 9,
      type: "big-number",
      title: "🎉 你的第一个程序跑起来了！",
      subtitle: "Hello, World!",
      data: {
        number: "🎉",
        unit: "",
        card: {
          title: "Hello, World!",
          desc:
            '<b>1972 年</b>，第一个 Hello World 程序诞生。<br><b>今天你也写了一个。</b><br><br>这是编程之路的起点。<br>从今天起，你不再是"电脑的使用者" —— <b>你是"电脑的指挥者"</b>。',
        },
        footer:
          '<b>📌 你比 ENIAC 快 100 万倍</b>：<br>1946 年的第一台计算机 ENIAC 每秒能算 <b>5000</b> 次；<br>今天你手机里的芯片，每秒能算 <b>几十亿</b> 次。<br><br>但无论多快，都靠你今天学的「指令 + 数据」在指挥。',
      },
    },

    /* ===== 10 练习1：Hello C++ 变式 ===== */
    {
      id: 10,
      type: "level-map",
      title: "课堂练习1：Hello, C++!",
      subtitle: "动手修改你的第一个程序",
      chapterTag: "第 1 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc:
            "不要直接抄上一页！请修改刚才的代码，让屏幕输出：<br><code>Hello, C++!</code><br><br>要求：注意<b>大小写</b>，结尾是<b>英文感叹号</b>，别忘了分号。",
          timer: "⏱ 限时 3 分钟",
        },
        hints: [
          "用 <code>cout</code> 输出",
          "仔细看引号里的内容，把 <code>World</code> 换成 <code>C++</code>",
          '感叹号 <code>!</code> 必须在英文双引号 <code>" "</code> 里面',
          "整句代码以英文分号 <code>;</code> 结尾",
        ],
        answer: {
          codeFile: "codes/lesson-01/hello-cpp.cpp",
        },
        analysis: {
          title: "📖 解析",
          desc:
            '这道题考的是<b>代码修改</b>与<b>标点符号</b>。<br>很多同学会不小心把感叹号写到引号外面，变成 <code>"Hello, C++"!</code>，这是典型的语法错误。<br><br>输出的文字就像广播里的"一句话"，<b>标点符号也是这句话的一部分</b>，必须用引号"打包"好才能送出去。',
        },
      },
    },

    /* ===== 11 练习2：输出三角形（+ Ada extra） ===== */
    {
      id: 11,
      type: "level-map",
      title: "课堂练习2：输出三角形",
      subtitle: "3 行 cout 画出图形",
      chapterTag: "第 1 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc:
            "输出下面图形：<br><code>*</code><br><code>***</code><br><code>*****</code><br>要求：使用 <code>cout</code> 和 <code>endl</code>，每行独立输出。",
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
          desc:
            '每行一个 <code>cout</code> 语句；<code>endl</code> 控制换行；字符串必须用英文双引号。<br><br><b>⚠️ 输出格式三条铁律</b><br>① <b>空格</b>不能多不能少——OJ 是"字符级"对比，多一个空格 = WA<br>② <b>换行</b>不能漏不能多——最后一行是否要换行？看题目描述或样例<br>③ <b>标点</b>是隐形陷阱——中文引号" "和英文引号" "看起来一样，实际完全不同',
        },
        extra: {
          title: "📖 第一位程序员 · Ada Lovelace",
          image: {
            src: "static/images/people/ada-lovelace.webp",
            alt: "阿达·洛芙莱斯",
            caption: "阿达·洛芙莱斯（1815—1852）",
            source: "Public Domain",
            layout: "float-right",
            size: "sm",
            zoomable: true,
          },
          desc:
            '<div>1843 年，英国诗人拜伦的女儿 <a href="https://baike.baidu.com/item/阿达·洛芙莱斯" target="_blank" class="wiki-link">阿达·洛芙莱斯</a>，为查尔斯·巴贝奇设计的「分析机」写下了计算伯努利数的算法。</div><div>她比计算机的诞生早了整整 <b>100 年</b>。</div><div>为了纪念她，美国国防部将一种编程语言命名为 <b>Ada</b>。</div><div>今天你写的每一行代码，都是站在她的肩膀上。</div>',
          variant: "card-primary",
        },
      },
    },

    /* ===== 12 练习3：输出菱形（挑战） ===== */
    {
      id: 12,
      type: "level-map",
      title: "课堂练习3：输出菱形",
      subtitle: "挑战题 · 快的同学做",
      chapterTag: "第 1 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc:
            "输出下面 5 行菱形图案（用 <code>*</code> 组成）：<br>要求：每一行是一个 <code>cout</code> 语句，空格也要输出。",
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
          desc:
            '菱形的核心是"<b>空格 + 星号</b>"的组合。<br>每一行都是一个字符串，空格必须写在双引号里。<br>这道题考的是对 <code>cout</code> 和格式的灵活运用，为后面"循环打印图案"（第 5 讲）打基础。',
        },
      },
    },

    /* ===== 13 字符画画廊（难题后的放松） ===== */
    {
      id: 13,
      type: "grid",
      title: "🎨 字符画画廊",
      subtitle: "用符号拼出的可爱图像",
      chapterTag: "第 1 讲 · 知识讲解",
      data: {
        cards: [
          {
            icon: "🙏",
            title: "佛祖保佑 · 永无 BUG",
            desc:
              '<img src="static/ascii-art/buddha-blessing.svg" alt="佛祖保佑 永无BUG" style="display:block;margin:0 auto;max-width:340px;width:100%;">',
          },
        ],
        footer:
          '<b>📖 ASCII 艺术的起源</b>：<br>1960 年代，打印机只能打字符，人们就用 <code>*</code>、<code>#</code>、<code>@</code> 拼出 LOGO、动物、人像。<br>今天你看到的很多"字符画"（比如终端里的企鹅、笑脸），都是 ASCII 艺术。<br><br><b>这是最早的"计算机艺术"形式之一。</b><br>刚才你用 3 行 cout，也画了一幅 ASCII 艺术。',
      },
    },

    /* ===== 14 看懂报错：三段法 ===== */
    {
      id: 14,
      type: "split",
      title: "看懂报错：三段法",
      subtitle: "报错不可怕，学会读它",
      chapterTag: "第 1 讲 · 概念理解",
      data: {
        intro: "编译器报错经常是一大堆红字，看着吓人。<br>其实你只需要看<b>第一行</b>就够了。后面的乱码统统不用管。",
        panes: [
          {
            title: "真实报错长这样",
            icon: "❌",
            items: [
              { title: "hello.cpp:5:10: error:", desc: "expected ';' before 'return'<br><br>（下面还有几十行红字，统统忽略）" }
            ]
          },
          {
            title: "三段读法",
            icon: "🔍",
            items: [
              { title: "① hello.cpp", desc: "哪个文件出错了" },
              { title: "② 5:10", desc: "第 5 行、第 10 列有问题" },
              { title: "③ expected ';'", desc: "编译器说：这里缺一个分号" }
            ]
          }
        ],
        footer: "<b>📌 新手急救法</b>：遇到报错，<b>双击 Dev-C++ 下面的第一行红字</b>，光标会自动跳到出错的那一行。<br>去看看那一行是不是漏了分号，或者混进了中文标点。"
      }
    },

    /* ===== 15 中文标点的坑（放大对比） ===== */
    {
      id: 15,
      type: "compare",
      title: "中文标点的坑",
      subtitle: "肉眼分不清，编译器能分清",
      data: {
        groups: [
          {
            wrong: 'cout &lt;&lt; "Hello"；',
            right:
              'cout &lt;&lt; "Hello";<br><br><b>原因</b>：中文分号和英文分号编码不同，编译器认不出中文分号',
          },
          {
            wrong: 'cout &lt;&lt; “Hello”;',
            right:
              'cout &lt;&lt; "Hello";<br><br><b>原因</b>：中文引号是"全角字符"，编译器当作非法符号',
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
        footer:
          '<b>🔍 放大对比</b><br><br>英文分号：<code>;</code>（半个字符高）<br>中文分号：<code>；</code>（一个字符高）<br><br>英文引号：<code>" "</code>（直上直下）<br>中文引号：<code>" "</code>（有弧度）<br><br><b>肉眼几乎一样 —— 但编译器能看出来。</b><br>养成习惯：写代码时切换成英文输入法。',
      },
    },

    /* ===== 16 OJ 是什么 ===== */
    {
      id: 16,
      type: "grid",
      title: "OJ 是什么？",
      subtitle: "Online Judge 在线判题系统",
      chapterTag: "第 1 讲 · OJ 实战",
      data: {
        cards: [
          {
            icon: "⚖️",
            title: "OJ = 在线裁判",
            desc:
              "<b>Online Judge</b><br>在线判题系统<br>像一位严格又公正的裁判",
          },
          {
            icon: "🔬",
            title: "怎么判题？",
            desc:
              "用预先准备的<b>测试数据</b><br>运行你的程序<br>对比输出结果",
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
        footer:
          '<b>📌 常用 OJ 平台推荐</b><br>· <b>洛谷</b>（luogu.com.cn）—— 中国最大，题目丰富，CSP-J/S 首选<br>· <b>一本通</b>—— 配套教材，按章节刷题，系统训练<br>· <b>AcWing</b>—— 课程 + 题库，零基础友好<br>· <b>Codeforces</b>—— 国际平台，每周比赛，提高段位<br><br>入门用<b>洛谷 + 一本通</b>，进阶用 <b>Codeforces</b>。',
      },
    },

    /* ===== 17 OJ 提交步骤（flow） ===== */
    {
      id: 17,
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

    /* ===== 18 判题结果解读（compare） ===== */
    {
      id: 18,
      type: "compare",
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

    /* ===== 19 AC 是礼物，WA 是老师（金句） ===== */
    {
      id: 19,
      type: "dialog",
      title: "AC 是礼物，WA 是老师",
      subtitle: "从失败中学到东西",
      chapterTag: "第 1 讲 · OJ 实战",
      data: {
        lines: [
          {
            who: "student",
            text: "小 C，我提交了 3 次，都是 WA，好沮丧。",
          },
          {
            who: "robot",
            text: '这是每个竞赛选手都走过的路。<b>WA 不是失败，是信息</b>——它告诉你"哪里不对"。',
          },
          { who: "student", text: "那我怎么找到不对的地方？" },
          {
            who: "robot",
            text: "三步走：<br>① 用题目给的样例测一遍，看输出对不对<br>② 对比输出格式：多空格？少换行？<br>③ 检查常见错误：中文标点、大小写",
          },
          {
            who: "student",
            text: "如果样例过了还是 WA 呢？",
          },
          {
            who: "robot",
            text: '那通常是<b>隐藏测试点</b>的问题。<br>比如要求输出末尾不能有空行，你的程序多输出了一行。<br>记住这句话：<b>"AC 是礼物，WA 是老师。"</b>',
          },
        ],
      },
    },

    /* ===== 20 课堂小测（4 题） ===== */
    {
      id: 20,
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
            optionLayout: "vertical",
            question: "编译器的主要功能是（　）。",
            options: [
              {
                label: "A",
                text: "将源程序翻译成机器指令代码",
                correct: true,
              },
              { label: "B", text: "将源程序重新组合" },
              { label: "C", text: "将低级语言翻译成高级语言" },
              { label: "D", text: "将一种高级语言翻译成另一种高级语言" },
            ],
            analysis:
              "编译器的作用是把高级语言编写的<b>源程序</b>整体翻译成等价的<b>机器指令代码</b>。选项 C 方向反了；选项 D 是「转译器」的功能。对应本讲「程序 = 指令 + 数据」的核心知识点。<br><br><b>干扰项设计</b>：<br>· B「重新组合」——学生可能把编译和链接混淆<br>· C「低级→高级」——方向反了，学生容易选错方向<br>· D「高级→高级」——学生可能想到 Python 转 Java，但这不是编译器的主要功能",
          },
          {
            id: 2,
            type: "single",
            difficulty: 3,
            source: "CSP-J 2026 初赛模拟卷一 · 第 5 题",
            optionLayout: "horizontal",
            question:
              "C++ 中使用 <code>cin</code> 和 <code>cout</code>，需要包含哪个头文件？",
            options: [
              { label: "A", text: "<code>iostream</code>", correct: true },
              { label: "B", text: "<code>cmath</code>" },
              { label: "C", text: "<code>cstdio</code>" },
              { label: "D", text: "<code>algorithm</code>" },
            ],
            analysis:
              '<code>cin</code> 和 <code>cout</code> 定义在标准输入输出流库中，对应头文件 <code>&lt;iostream&gt;</code>。这是本讲「Hello, World!」中 <code>#include &lt;iostream&gt;</code> 的直接考查。<br><br><b>干扰项设计</b>：<br>· B「cmath」——数学函数库，学生学了 sqrt 会记住它<br>· C「cstdio」——C 风格输入输出（scanf/printf），学生容易混淆<br>· D「algorithm」——算法库（sort 等），第 14 讲才学，但现在可能听过',
          },
          {
            id: 3,
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
              'C++ 源程序文件用 <code>.cpp</code> 扩展名。<br>· <code>.cpp</code> 是源程序（人类可读）<br>· <code>.obj</code> 是编译后的目标文件<br>· <code>.exe</code> 是链接后的可执行文件<br>这是初赛高频考点。<br><br><b>干扰项设计</b>：<br>· A「.exe」——学生天天见，最容易被误选为"程序文件"<br>· B「.obj」——编译过程讲过，但不清楚它是什么<br>· D「.txt」——最明显错的干扰项',
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
              "<code>main</code> 函数是 C++ 程序的<b>唯一入口</b>。每个可执行程序<b>有且只有一个</b> <code>main</code> 函数，程序从 <code>main</code> 的第一条语句开始执行。没有 <code>main</code>，编译器无法确定程序从哪里开始运行，会报链接错误。<br><br><b>为什么这是真/假判断题的好题</b>：<br>学生可能想到「函数可以有多个」——但 main 是唯一入口，这是反直觉的。",
          },
        ],
      },
    },

    /* ===== 21 今日总结 ===== */
    {
      id: 21,
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
          desc:
            "主函数是入口，return 0 结束；<br>cout 输出用 &lt;&lt;，换行用 endl；<br>英文标点要记牢，分号千万别漏掉。",
        },
      },
    },

    /* ===== 22 课后作业 ===== */
    {
      id: 22,
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

    /* ===== 23 下节预告 ===== */
    {
      id: 23,
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
        extra: {
          title: "💡 今天你的程序会「说话」了",
          desc:
            "<div>但它还是个<b>哑巴</b>——只会输出，不会记住东西。<br>你给它一个数，它算完就丢，下次还要重新输入。</div><div>下一讲，我们要教它<b>「记住」</b>——<br>怎么把数据存起来，怎么把数据读进来。</div><div>🔮 <b>两个伏笔</b>：<br>· 变量只能存<b>一个</b>数据。如果要存 100 个呢？<br>· 如果要输出 1 万行 Hello，怎么不用复制粘贴？<br>—— 这些都会在后续揭晓。</div>",
          variant: "card-primary",
        },
      },
    },

    /* ===== 24 答疑时间（FAQ） ===== */
    {
      id: 24,
      type: "grid",
      title: "答疑时间",
      subtitle: "常见问题 FAQ",
      chapterTag: "第 1 讲 · 答疑",
      data: {
        cards: [
          {
            icon: "🔴",
            title: "编译不通过？",
            desc:
              "先看<b>第一行报错</b><br>通常是标点或分号<br>编译器会告诉你行号<br><br>对照四大错误找",
          },
          {
            icon: "❌",
            title: "WA 怎么办？",
            desc:
              "检查<b>输出格式</b><br>空格、换行、标点<br>有时候多一个空格<br>就被判 WA",
          },
          {
            icon: "🐛",
            title: "怎么调试？",
            desc:
              "在关键位置加 <code>cout</code><br>输出中间变量<br>看哪一步开始出错<br><br>这叫<b>打印调试</b>",
          },
          {
            icon: "🔀",
            title: "endl 还是 \\n？",
            desc:
              "初学用 <code>endl</code><br>更直观<br>竞赛大数据输出<br>换成 <code>\\n</code> 更快",
          },
          {
            icon: "📁",
            title: "程序保存成什么？",
            desc:
              "必须存成 <code>.cpp</code> 文件<br>编译器才能读<br>就像作文要写在纸上",
          },
          {
            icon: "❓",
            title: "中文变量名行吗？",
            desc:
              "理论上能<br><b>但绝对不要</b><br>竞赛、工程、审查<br>都不允许",
          },
        ],
      },
    },

    /* ===== 25 本讲英文单词 ===== */
    {
      id: 25,
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
        ],
      },
    },

    /* ===== 26 知识清单 ===== */
    {
      id: 26,
      type: "grid",
      title: "第 1 讲 · 知识清单",
      subtitle: "一页看完本讲所有重点",
      chapterTag: "第 1 讲 · 复习",
      data: {
        cards: [
          {
            icon: "📄",
            title: "程序结构",
            desc:
              "<b>头文件</b> #include &lt;iostream&gt;<br><b>命名空间</b> using namespace std;<br><b>主函数</b> int main() { }<br><b>返回</b> return 0;",
          },
          {
            icon: "📤",
            title: "输出 cout",
            desc:
              '用 <code>&lt;&lt;</code> 输出内容<br>可连续输出多个内容<br><code>endl</code> 换行并刷新<br><code>"\\n"</code> 换行更快',
          },
          {
            icon: "⚙️",
            title: "编译过程",
            desc:
              ".cpp → .obj → .exe<br><b>编译</b>：翻译成机器码<br><b>链接</b>：拼装成 .exe<br><b>运行</b>：CPU 执行",
          },
          {
            icon: "🏆",
            title: "OJ 提交与判题",
            desc:
              "注册 → 找题 → 粘贴 → 提交<br><b>AC</b> 通过 · <b>WA</b> 答案错<br><b>CE</b> 编译错 · <b>RE</b> 运行错<br><b>TLE</b> 超时 · <b>MLE</b> 内存超",
          },
        ],
        footer:
          '<b>📌 关键口诀</b>：程序框架不能少，头文件加命名空间；主函数是入口，return 0 结束；cout 输出用 <code>&lt;&lt;</code>，换行用 <code>endl</code>。<br><br><b>📸 建议拍照保存，作为课后复习清单。</b>',
      },
    },

    /* ===== 27 结束页 ===== */
    {
      id: 27,
      type: "ending",
      title: "第一讲结束",
      subtitle: "你的编程之路，正式开始",
      chapterTag: false,
      data: {
        slogan:
          "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
        extra: {
          title: "🌟 欢迎来到代码世界",
          desc:
            "今天，你成功让计算机听懂了你的第一句话。<br>但这只是个开始。计算机目前还是个「哑巴」，它只会输出。<br><br>下一讲，我们要教它怎么「记住」你给它的数据。<br><br>📌 <b>行动号召</b>：去洛谷把 P1000 刷掉，向世界喊出你的 Hello World！",
          variant: "card-glow",
        },
      },
    },
  ],
};
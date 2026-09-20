export default {
  title: '第 1 讲 初识 C++',
  subtitle: '第一个程序与 OJ 提交',
  total: 28,
  category: '语法与基础算法',
  slides: [

    /* ======================= slide-01 封面 ======================= */
    {
      id: 1,
      type: 'cover',
      title: '初识 C++',
      subtitle: '第一个程序与 OJ 提交',
      chapterTag: false,
      data: {
        accentWord: 'C++',
        meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 1 讲']
      }
    },

    /* ======================= slide-02 为什么要学C++ ======================= */
    {
      id: 2,
      type: 'grid',
      title: '为什么要学 C++？',
      subtitle: '竞赛官方语言，高手的第一选择',
      data: {
        cards: [
          { icon: '🏆', title: '竞赛官方语言', desc: 'CSP-J/S、NOIP、NOI 均支持' },
          { icon: '⚡', title: '运行速度快', desc: '适合大规模计算' },
          { icon: '🧰', title: 'STL 强大', desc: '现成数据结构与算法' },
          { icon: '🎓', title: '升学助力', desc: '科技特长生重要参考' }
        ],
        extra: {
          title: '💡 冷知识 · C++ 为什么叫 C++',
          desc: '1979 年，<a href="https://baike.baidu.com/item/贝尔实验室" target="_blank" class="wiki-link">贝尔实验室</a>的<a href="https://baike.baidu.com/item/本贾尼·斯特劳斯特鲁普" target="_blank" class="wiki-link">本贾尼·斯特劳斯特鲁普</a>想让 C 语言"更好用一点"，最初把新语言叫 <b>"C with Classes"</b>。<br>后来有人开玩笑说：C 语言里的 <code>++</code> 是自增运算符，那"比 C 更强"的语言，就叫 <b>C++</b> 吧。所以 C++ 的字面意思是"<b>C 加一</b>"。<br>那 <b>C#</b> 呢？那个 <code>#</code> 是四个 <code>+</code> 叠起来，理论上应该读作"C 四个加"，但官方读法是"C Sharp"。'
        }
      }
    },

    /* ======================= slide-03 本节课目标 ======================= */
    {
      id: 3,
      type: 'grid',
      title: '本节课目标',
      subtitle: '四步进入编程世界',
      data: {
        cards: [
          { number: '01', title: '认识 C++', desc: '理解程序是什么、计算机如何运行' },
          { number: '02', title: '第一个程序', desc: '写出并运行 Hello, World!' },
          { number: '03', title: '编译与提交', desc: '编译、运行、提交到 OJ' },
          { number: '04', title: '看懂判题', desc: '分清 AC / WA / CE / TLE' }
        ],
        extra: {
          title: '📖 知识扩展 · Hello World 的起源',
          desc: '1972 年，<a href="https://baike.baidu.com/item/贝尔实验室" target="_blank" class="wiki-link">贝尔实验室</a>的<a href="https://baike.baidu.com/item/布莱恩·克尼汉" target="_blank" class="wiki-link">布莱恩·克尼汉</a>在《B 语言入门》中第一次写下 <code>"Hello, World!"</code>。<br>当时他和<a href="https://baike.baidu.com/item/丹尼斯·里奇" target="_blank" class="wiki-link">丹尼斯·里奇</a>（C 语言之父）正在开发 <a href="https://baike.baidu.com/item/Unix" target="_blank" class="wiki-link">Unix</a>。为了让初学者<b>第一次运行就能看到结果</b>，他们设计了这句最简单的输出。<br>没想到，<b>50 多年后</b>，全世界 <b>700 多种编程语言</b>的第一课都是它。<a href="https://baike.baidu.com/item/Python" target="_blank" class="wiki-link">Python</a>、<a href="https://baike.baidu.com/item/Java" target="_blank" class="wiki-link">Java</a>、Rust——所有语言的第一个程序永远是 <code>Hello, World!</code>。<br>克尼汉后来说："我只是想让编译器有个能跑的测试用例，没想到成了所有程序员的仪式。"<br><b>今天，你也完成了这个仪式。</b>'
        }
      }
    },

    /* ======================= slide-04 学习地图 ======================= */
    {
      id: 4,
      type: 'timeline',
      title: '本讲学习地图',
      subtitle: '四站闯关，从零到提交',
      data: {
        items: [
          {
            icon: '🧠', badge: '基础', title: '第一站 · 概念理解',
            desc: '程序、C++、编译过程',
            points: ['程序 = 指令 + 数据', 'C++ 是编译型语言', '.cpp → .obj → .exe', '冯·诺依曼存储程序']
          },
          {
            icon: '💻', badge: '核心', title: '第二站 · 第一个程序',
            desc: 'Hello, World! 逐行拆解',
            points: ['程序框架四件套', 'cout 输出与 endl 换行', '中文标点会报错', '大小写敏感']
          },
          {
            icon: '📥', badge: '关键', title: '第三站 · 输入与输出',
            desc: 'cin、cout、A+B 问题',
            points: ['cin 从键盘读数据', 'cin 方向是 >>', 'A+B 是竞赛第一题', '变量命名见名知意']
          },
          {
            icon: '🏆', badge: '实战', title: '第四站 · OJ 实战',
            desc: '提交、判题、闯关',
            points: ['注册 → 找题 → 提交', 'AC 通过 · WA 答案错', 'CE 编译错 · TLE 超时', '三题闯关拿积分']
          }
        ],
        extra: {
          title: '🏆 积分规则',
          desc: '每通过一关 +10 分，全部通过额外 +10 分。本月排位赛积分上榜，赛季冠军获得"C++ 启航者"徽章。'
        }
      }
    },

    /* ======================= slide-05 什么是程序（补丁 1-1：埋下 0/1 伏笔） ======================= */
    {
      id: 5,
      type: 'dialog',
      title: '什么是程序？',
      subtitle: '程序 = 指令 + 数据',
      chapterTag: '第 1 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，我按了电源键，计算机就亮了。它怎么知道要做什么？' },
          { who: 'robot', text: '这个问题问得好。计算机一开始什么都不知道，它只是一台非常听话的机器。' },
          { who: 'student', text: '那它怎么知道我让它做什么？' },
          { who: 'robot', text: '你给它一份"菜谱"，它就照着做。这份菜谱就是<b>程序</b>。' },
          { who: 'student', text: '菜谱里有食材和步骤，程序里有什么？' },
          { who: 'robot', text: '程序里有<b>数据</b>和<b>指令</b>。指令告诉计算机"做什么"，数据是它要处理的对象。比如"计算 3+5"——"计算"是指令，"3"和"5"是数据。' },
          { who: 'student', text: '那计算机看得懂"3"和"5"吗？' },
          { who: 'robot', text: '这个嘛……其实计算机只认识 <b>0 和 1</b>。它是怎么把"3"变成 0 和 1 的？第 35 讲揭晓。🔮' }
        ],
        extra: {
          title: '📖 知识扩展 · 冯·诺依曼结构',
          desc: '1945 年，数学家<a href="https://baike.baidu.com/item/约翰·冯·诺依曼" target="_blank" class="wiki-link">冯·诺依曼</a>在一份 <b>101 页</b>的报告里，提出了"<a href="https://baike.baidu.com/item/存储程序" target="_blank" class="wiki-link">存储程序</a>"概念：把指令和数据一起存进内存，让计算机自动执行。<br>在这之前，改变计算任务要<b>重新接线</b>——就像今天想换一个 App，你得换一台手机。<br>这个想法彻底改变了计算机。今天你用的手机、电脑、服务器，<b>全都是冯·诺依曼结构</b>。<br>有意思的是，冯·诺依曼本人是<b>数学、物理、经济、计算机</b>多个领域的大师。他晚年研究<a href="https://baike.baidu.com/item/博弈论" target="_blank" class="wiki-link">博弈论</a>，还是<a href="https://baike.baidu.com/item/量子力学" target="_blank" class="wiki-link">量子力学</a>的奠基人之一。有人开玩笑说：他是"<b>最后一个什么都知道的人</b>"。',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-06 什么是C++ ======================= */
    {
      id: 6,
      type: 'dialog',
      title: '什么是 C++？',
      subtitle: '编译型编程语言，竞赛王者',
      chapterTag: '第 1 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '为什么叫 C++？为什么不叫 D？' },
          { who: 'robot', text: '++ 是递增运算符，意思是"比 C 更进一步"。它的发明者本贾尼·斯特劳斯特鲁普最初叫它 "C with Classes"。' },
          { who: 'student', text: '那它比 C 强在哪？' },
          { who: 'robot', text: 'C++ 在 C 的基础上加了面向对象、STL、模板等能力，既保留了 C 的速度，又提供了更高级的工具。' },
          { who: 'student', text: '为什么竞赛都用 C++？' },
          { who: 'robot', text: '三个原因：<b>运行快</b>、<b>STL 强大</b>、<b>控制精细</b>。同样的算法，C++ 通常比 Python 快 10—100 倍。' }
        ],
        extra: {
          title: '📖 C++ 发展史 · 从实验室到全世界',
          desc: '1979 年，斯特劳斯特鲁普在<a href="https://baike.baidu.com/item/贝尔实验室" target="_blank" class="wiki-link">贝尔实验室</a>开始开发 "C with Classes"。<br>1983 年正式命名为 <b>C++</b>。<br>1998 年发布第一个 ISO 标准 <b>C++98</b>，成为通用编程语言。<br>2011 年发布 <b>C++11</b>，引入 auto、lambda、智能指针，被称为"现代 C++ 起点"。<br>2020 年发布 <b>C++20</b>，加入概念、协程、模块。<br>现在 <b>C++ 已经 40 多岁</b>，但仍然是竞赛、<a href="https://baike.baidu.com/item/游戏引擎" target="_blank" class="wiki-link">游戏引擎</a>、<a href="https://baike.baidu.com/item/操作系统" target="_blank" class="wiki-link">操作系统</a>、<a href="https://baike.baidu.com/item/高频交易" target="_blank" class="wiki-link">高频交易</a>的首选语言。',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-07 从代码到运行（补丁 1-2：埋下内存伏笔） ======================= */
    {
      id: 7,
      type: 'grid',
      title: '从代码到运行',
      subtitle: '源程序如何变成可执行程序',
      data: {
        cards: [
          { icon: '📄', title: '① 源程序', desc: '<b>hello.cpp</b><br>用 C++ 写的代码文件<br>人类可读<br>扩展名 .cpp' },
          { icon: '⚙️', title: '② 编译', desc: '<b>生成 .obj</b><br>翻译成机器码<br>检查语法错误<br>像翻译官' },
          { icon: '🔗', title: '③ 链接', desc: '<b>生成 .exe</b><br>组装目标文件<br>加上库文件<br>像装配工' },
          { icon: '▶️', title: '④ 运行', desc: '<b>输出结果</b><br>加载 .exe<br>CPU 执行机器码<br>得到最终结果' }
        ],
        extra: {
          title: '💡 编译 vs 链接',
          desc: '<b>编译</b>：C++ 代码 → 机器码，一个文件一个文件翻译，生成 <code>.obj</code>。就像把中餐菜谱翻译成英文。<br><b>链接</b>：把所有 <code>.obj</code> 和库文件"拼装"成可执行程序 <code>.exe</code>。就像把所有翻译好的菜谱装订成一本书。<br>它们是<b>两个不同的工具</b>：编译器 <a href="https://baike.baidu.com/item/GCC" target="_blank" class="wiki-link">g++</a> / <a href="https://baike.baidu.com/item/Clang" target="_blank" class="wiki-link">clang++</a>，链接器 <a href="https://baike.baidu.com/item/GNU_ld" target="_blank" class="wiki-link">ld</a>。<br>Dev-C++ 的"编译运行"按钮，其实一口气做了 <b>编译 → 链接 → 运行</b> 三件事。所以你感觉不到它们的区别。<br><br>📖 <b>编译器的来历</b>：1950 年代，程序员写程序要自己翻译成机器码——用打孔卡一张张打，一张卡只能写 80 个字符。<br>有位叫 <a href="https://baike.baidu.com/item/格蕾丝·霍珀" target="_blank" class="wiki-link">格蕾丝·霍珀</a> 的女程序员想：能不能让计算机自己翻译？<br>她带头开发了早期编译器，让程序员可以写"像英语一样的代码"。<br>从那时起，写程序不再需要背机器指令。<br><b>编译器，就是程序员和机器之间的翻译官。</b><br><br>🔮 <b>伏笔</b>：g++ 只是众多 C++ 编译器之一。clang++、MSVC 又是什么？它们有什么区别？第 15 讲揭晓。'
        }
      }
    },

    /* ======================= slide-08 开发环境 ======================= */
    {
      id: 8,
      type: 'grid',
      title: '开发环境与工具准备',
      subtitle: '工欲善其事，必先利其器',
      data: {
        cards: [
          { icon: '💻', title: '本地编译器', desc: 'Dev-C++：轻量<br>CodeBlocks：功能全<br>VS Code：适合进阶' },
          { icon: '🌐', title: '在线判题系统', desc: '洛谷：国内最流行<br>一本通：配套教材<br>AcWing：课程结合' },
          { icon: '📝', title: '辅助工具', desc: '浏览器：提交代码<br>笔记本：记录错题<br>草稿纸：画流程图' }
        ],
        extra: {
          title: '📖 知识扩展 · OJ 的历史',
          desc: '第一个 OJ 系统诞生于 <b>1990 年代的美国</b>，最初用于大学编程课自动批改作业。教授不想改几百份作业，就让机器来判断。<br>后来 OJ 演变成竞赛平台。现在全球有<b>上千个 OJ</b>，每年举办<b>上万场</b>编程比赛。<br>最知名的国际 OJ 是 <a href="https://baike.baidu.com/item/Codeforces" target="_blank" class="wiki-link">Codeforces</a>（俄罗斯）和 <a href="https://baike.baidu.com/item/AtCoder" target="_blank" class="wiki-link">AtCoder</a>（日本），每天都有上万人参加比赛。<br>国内的 <a href="https://baike.baidu.com/item/洛谷" target="_blank" class="wiki-link">洛谷</a>是 2013 年由一群高中生创办的，现在已经成为中国最大的算法竞赛社区之一。<br><br>💡 <b>开发环境的变化</b>：<br>1970 年代，程序员用打孔卡写代码，一张卡只能写 80 个字符。<br>1990 年代，用 <a href="https://baike.baidu.com/item/Dev-C%2B%2B" target="_blank" class="wiki-link">Dev-C++</a>、Turbo C 这样的桌面软件。<br>2020 年代，很多人直接在浏览器里写代码，不用装任何软件。<br><b>工具一直在变，但"写出能跑的程序"这件事，从来没有变过。</b>'
        }
      }
    },

    /* ======================= slide-09 过渡页 ======================= */
    {
      id: 9,
      type: 'transition',
      title: '第二站 · 开始写代码',
      subtitle: '从 Hello World 到输入输出',
      data: { note: '接下来你将写出人生第一个 C++ 程序，并学会让程序与用户对话' }
    },

    /* ======================= slide-10 Hello World（补丁 1-3：埋下 ASCII 伏笔） ======================= */
    {
      id: 10,
      type: 'code-split',
      title: '第一个程序：Hello, World!',
      subtitle: '逐行拆解，理解每一行的使命',
      data: {
        codeFile: 'codes/lesson-01/hello-world.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'cout <<', desc: '输出 "Hello, World!" 并换行' },
          { line: 7, title: 'return 0', desc: '返回 0，表示程序正常结束' }
        ],
        output: 'Hello, World!',
        extra: {
          title: '💡 为什么 main 是入口',
          desc: '<code>main</code> 是英文"<b>主要的</b>"的意思。计算机运行程序时，第一件事就是<b>找到 main</b>，从那里开始执行。<br>没有 main，程序就不知道从哪里出发。这是 C++ 标准的规定，<b>所有编译器都遵守</b>。<br>那能不能不叫 main？不行。<b>每个程序有且只有一个 main</b>。名字必须小写。写成 <code>Main</code> 会编译失败。<br>有意思的是，其他语言也有类似规定：<a href="https://baike.baidu.com/item/Java" target="_blank" class="wiki-link">Java</a> 是 <code>public static void main</code>，<a href="https://baike.baidu.com/item/Python" target="_blank" class="wiki-link">Python</a> 是 <code>if __name__ == \'__main__\'</code>。所有语言的"入口"都叫 main——这算是程序员之间的默契。<br><br>🔮 <b>伏笔</b>：你写的 "H"、"e"、"l"，在计算机里其实都是 <b>数字</b>。第 35 讲揭晓。'
        }
      }
    },

    /* ======================= slide-11 编译运行演示 ======================= */
    {
      id: 11,
      type: 'flow',
      title: '编译运行演示',
      subtitle: '让代码变成程序',
      data: {
        nodes: [
          { icon: '📝', label: '新建 .cpp' },
          { icon: '⌨️', label: '输入代码' },
          { icon: '🔨', label: 'F11 编译运行' },
          { icon: '👀', label: '观察输出' },
          { icon: '🔧', label: '根据报错修改', glow: true }
        ],
        extra: {
          title: '⌨️ 常用快捷键',
          desc: 'F9 编译 · F10 运行 · F11 编译并运行 · Ctrl+S 保存<br><br><b>💡 第一次编译就像第一次骑自行车</b>：可能会摔倒（报错），但每次摔倒都让你更接近成功。'
        }
      }
    },

    /* ======================= slide-12 常见错误大盘点 ======================= */
    {
      id: 12,
      type: 'compare',
      title: '常见错误大盘点',
      subtitle: '4 个新手必踩的坑',
      data: {
        groups: [
          { wrong: 'cout &lt;&lt; “Hello”；', right: 'cout &lt;&lt; "Hello";' },
          { wrong: 'cout &lt;&lt; "Hello"', right: 'cout &lt;&lt; "Hello";' },
          { wrong: 'Main()  count', right: 'int main()  cout' },
          { wrong: 'cin &lt;&lt; a;  cout &gt;&gt; b;', right: 'cin &gt;&gt; a;  cout &lt;&lt; b;' }
        ],
        extra: {
          title: '💡 四大错误的原因',
          desc: '① <b>中文标点</b>：计算机用不同数字编码表示中英标点<br>② <b>漏分号</b>：语句结束的标志<br>③ <b>大小写</b>：C++ 区分大小写，Main ≠ main<br>④ <b>方向反</b>：cout 用 &lt;&lt; 流出，cin 用 &gt;&gt; 流入<br>编程中 90% 的错误都是这些小错误，仔细检查能省很多时间。'
        }
      }
    },

    /* ======================= slide-13 输出进阶（补丁 1-4：埋下 endl/二进制伏笔） ======================= */
    {
      id: 13,
      type: 'code-split',
      title: '输出进阶：多个内容与换行',
      subtitle: '灵活使用 cout',
      data: {
        code: `cout << "A" << "B" << endl;           // 输出 AB
cout << 1 + 2 << endl;                // 输出 3
cout << "1 + 2 = " << 1 + 2 << endl;  // 输出 1 + 2 = 3`,
        annotations: [
          { line: 1, title: '连续输出', desc: '输出 AB' },
          { line: 2, title: '先算后输出', desc: '输出 3' },
          { line: 3, title: '文字 + 结果', desc: '输出 1 + 2 = 3' }
        ],
        extra: {
          title: '💡 endl 的来历',
          desc: '<code>endl</code> 是英文 "<b>end line</b>" 的缩写，意思是"<b>结束这一行</b>"。<br>它做两件事：换行 + <b>刷新缓冲区</b>。缓冲区就像"待发送的信件"，<code>endl</code> 相当于喊了一声"快递员，走起！"<br>但这也让 <code>endl</code> 比 <code>"\\n"</code> <b>慢一点</b>。因为每次都要"叫快递员"。<br>所以竞赛中大量输出时，选手都用 <code>"\\n"</code> 而不是 <code>endl</code>。这就是 C++ 的"细节决定快慢"——<b>一个字符的差别，可能是 TLE 和 AC 的差别</b>。<br><br>🔮 <b>伏笔</b>：<code>endl</code> 和 <code>"\\n"</code> 明明都是换行，为什么速度不一样？第 35 讲从二进制讲起。'
        }
      }
    },

    /* ======================= slide-14 练习1 ======================= */
    {
      id: 14,
      type: 'level-map',
      title: '课堂练习1：Hello World',
      subtitle: '独立完成第一个输出程序',
      chapterTag: '第 1 讲 · 实战演练',
      data: {
        question: {
          title: '题干',
          desc: '输出 <code>Hello, World!</code>。要求：用 <code>cout</code>，英文双引号，末尾分号。',
          timer: '⏱ 限时 5 分钟'
        },
        hints: [
          '用 <code>cout</code> 输出',
          '字符串用英文双引号',
          '语句末尾有分号'
        ],
        answer: {
          codeFile: 'codes/lesson-01/hello-world.cpp'
        },
        analysis: {
          title: '📖 解析',
          desc: '<code>cout</code> 输出 · <code>endl</code> 换行 · <code>return 0</code> 正常结束。跨学科：输出的文字就像广播里的"一句话"，要用引号"打包"好才能送出去。'
        },
        extra: {
          title: '📖 知识扩展 · 第一位程序员',
          desc: '1843 年，<a href="https://baike.baidu.com/item/阿达·洛芙莱斯" target="_blank" class="wiki-link">阿达·洛芙莱斯</a>为<a href="https://baike.baidu.com/item/分析机" target="_blank" class="wiki-link">分析机</a>写下了<b>第一个算法——计算<a href="https://baike.baidu.com/item/伯努利数" target="_blank" class="wiki-link">伯努利数</a></b>。<br>她原本只是在翻译一篇意大利论文，却忍不住加了 <b>7 篇注释</b>，总长度是原文的 <b>3 倍</b>。其中一篇注释详细描述了如何用机器一步步计算伯努利数。<b>这就是人类第一个计算机算法</b>。<br>她还第一次意识到：<b>机器不只是算数，还能处理符号</b>。她写道："分析机编织代数图案，就像提花机编织花朵和叶子。"<br>她的父亲是诗人<a href="https://baike.baidu.com/item/拜伦" target="_blank" class="wiki-link">拜伦</a>，但她走的不是文学路，而是数学与机器的交叉路。100 年后，<a href="https://baike.baidu.com/item/美国国防部" target="_blank" class="wiki-link">美国国防部</a>用一种编程语言纪念她——<b>语言的名字叫 <a href="https://baike.baidu.com/item/Ada" target="_blank" class="wiki-link">Ada</a></b>。'
        }
      }
    },

    /* ======================= slide-15 cin 与 A+B ======================= */
    {
      id: 15,
      type: 'code-split',
      title: '让程序与用户对话：cin',
      subtitle: '核心语法：cin >> 变量名;',
      chapterTag: '第 1 讲 · 输入输出',
      data: {
        codeFile: 'codes/lesson-01/cin-ab.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int a, b;', desc: '定义两个整型变量，用来存数据' },
          { line: 7, title: 'cin >> a >> b;', desc: '从键盘读两个整数，空格分隔' },
          { line: 8, title: 'cout << a + b;', desc: '把两个数相加后输出' },
          { line: 9, title: 'return 0;', desc: '程序正常结束' }
        ],
        output: '8',
        extra: {
          title: '📖 知识扩展 · cin 全称与 A+B 地位',
          desc: '<code>cin</code> 是英文 "<b>character input</b>" 的缩写，意思是"<b>字符输入</b>"。<br>它会自动跳过空格、Tab、回车，只读有效数据。所以你可以一行输入多个数，也可以分多行输入，效果一样。<br>A+B 被称为"<b>编程竞赛的第一题</b>"。几乎所有 OJ 都把它作为<b>第一道题</b>。<a href="https://baike.baidu.com/item/洛谷" target="_blank" class="wiki-link">洛谷</a> P1001、<a href="https://baike.baidu.com/item/Codeforces" target="_blank" class="wiki-link">Codeforces</a> 4A、<a href="https://baike.baidu.com/item/LeetCode" target="_blank" class="wiki-link">LeetCode</a> 1 号——不同的平台，同一个起点。<br>它看似简单，但包含了<b>程序最核心的三步：输入、计算、输出</b>。所以竞赛圈有一句话：<b>"A+B 做对了，后面的题就有一半会了。"</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-16 练习2 A+B ======================= */
    {
      id: 16,
      type: 'level-map',
      title: '课堂练习2：A+B',
      subtitle: '独立完成竞赛第一题',
      chapterTag: '第 1 讲 · 实战演练',
      data: {
        question: {
          title: '题干',
          desc: '输入两个整数 <code>a</code> 和 <code>b</code>，输出 <code>a+b</code>。<br>输入样例：<code>10 20</code><br>输出样例：<code>30</code>',
          timer: '⏱ 限时 7 分钟，提交到 OJ，AC 得 10 分'
        },
        hints: [
          '定义两个整数 <code>int a, b;</code>',
          '用 <code>cin &gt;&gt; a &gt;&gt; b;</code> 输入',
          '用 <code>cout &lt;&lt; a + b &lt;&lt; endl;</code> 输出'
        ],
        answer: {
          codeFile: 'codes/lesson-01/ab-practice.cpp'
        },
        analysis: {
          title: '📖 解析',
          desc: '输入两个数，输出它们的和。注意 <code>cin &gt;&gt;</code> 和 <code>cout &lt;&lt;</code> 的方向。'
        },
        extra: {
          title: '📖 知识扩展 · cin 为什么能跳过空格',
          desc: '<code>cin</code> 会<b>自动跳过空格、Tab、回车</b>，只读有效数据。所以你可以在同一行输入多个数，也可以分多行输入，效果一样。<br>但这也带来一个<b>陷阱</b>：如果输入数据里包含空格，cin 会把它当分隔符。<br>比如名字 "Hello World" 想读成一个字符串，cin 会只读到 "Hello"，剩下的 "World" 会流入下一个变量。<br>要读一整行（含空格），要用 <code>getline(cin, str)</code>。这是初学者的经典坑之一。<br>记住：<b>cin 读"词"，getline 读"行"</b>。'
        }
      }
    },

    /* ======================= slide-17 OJ 是什么 ======================= */
    {
      id: 17,
      type: 'dialog',
      title: 'OJ 是什么？',
      subtitle: 'Online Judge 在线判题系统',
      chapterTag: '第 1 讲 · OJ 实战',
      data: {
        lines: [
          { who: 'student', text: '我提交代码后，谁在检查对不对？' },
          { who: 'robot', text: 'OJ，全称 Online Judge，在线判题系统。它就像一位严格又公正的裁判。' },
          { who: 'student', text: '它怎么判断我的答案对不对？' },
          { who: 'robot', text: '它会用预先准备好的测试数据运行你的程序，然后对比输出结果。' },
          { who: 'student', text: '如果结果一样呢？' },
          { who: 'robot', text: '那就给你 <b>AC</b>，表示答案正确。如果不一样，就是 <b>WA</b>，答案错误。' }
        ],
        extra: {
          title: '📖 常见的 OJ 平台',
          desc: '<b><a href="https://baike.baidu.com/item/洛谷" target="_blank" class="wiki-link">洛谷</a></b>：中国最大，题目丰富，社区活跃，是 CSP-J/S 备赛首选。<br><b>一本通</b>：配套《信息学奥赛一本通》教材，按章节刷题，系统训练。<br><b><a href="https://baike.baidu.com/item/AcWing" target="_blank" class="wiki-link">AcWing</a></b>：课程 + 题库结合，适合零基础入门。<br><b><a href="https://baike.baidu.com/item/Codeforces" target="_blank" class="wiki-link">Codeforces</a></b>：国际平台，每周有比赛，题目风格灵活，是提高段位的好地方。<br>建议：<b>入门用洛谷 + 一本通，进阶用 Codeforces</b>。一个稳扎稳打，一个开阔视野。',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-18 OJ 提交步骤 ======================= */
    {
      id: 18,
      type: 'flow',
      title: 'OJ 提交步骤',
      subtitle: '手把手教你提交代码',
      data: {
        rows: [
          [
            { icon: '🔑', label: '注册登录' },
            { icon: '🔍', label: '搜索题目' },
            { icon: '📖', label: '阅读题目' },
            { icon: '⌨️', label: '粘贴代码' }
          ],
          [
            { icon: '🔽', label: '选择 C++' },
            { icon: '🚀', label: '点击提交' },
            { icon: '📊', label: '查看结果', glow: true }
          ]
        ],
        extra: {
          title: '💡 提交代码就像发射火箭',
          desc: '点击按钮的那一刻，你的代码就开始在服务器上运行。几秒钟后，结果就会返回。正式比赛中，每次提交都可能是最后一次机会，所以要仔细检查。'
        }
      }
    },

    /* ======================= slide-19 判题结果 ======================= */
    {
      id: 19,
      type: 'compare',
      title: 'OJ 判题结果解读',
      subtitle: '看懂反馈，快速改进',
      data: {
        groups: [
          { wrong: '❌ WA 答案错误', right: '✅ AC 答案正确' },
          { wrong: '❌ CE 编译错误', right: '✅ 检查语法、标点、拼写' },
          { wrong: '❌ RE 运行时错误', right: '✅ 检查数组越界、除零' },
          { wrong: '❌ TLE 超时', right: '✅ 优化算法' }
        ],
        extra: {
          title: '📖 知识扩展 · AC 的含义',
          desc: '<b>AC</b> 是 <b>Accepted</b> 的缩写，意思是"<b>已接受</b>"。在竞赛圈，看到 AC 就像看到绿灯，心情瞬间变好。<br>而 <b>WA</b> 是 Wrong Answer（答案错误），<b>TLE</b> 是 Time Limit Exceeded（超时），<b>RE</b> 是 Runtime Error（运行错误）。<br>每个竞赛选手都经历过从 WA 到 AC 的过程。有人统计过，<b>职业选手平均每题要提交 3—5 次才能 AC</b>。<br>所以看到 WA 不要慌。真正的高手不是一次做对，而是<b>从每次 WA 中学到东西</b>。',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-20 练习3 输出图形 ======================= */
    {
      id: 20,
      type: 'level-map',
      title: '课堂练习3：输出图形',
      subtitle: '巩固输出与换行',
      chapterTag: '第 1 讲 · 实战演练',
      data: {
        question: {
          title: '题干',
          desc: '输出下面图形：<br><code>*<br>***<br>*****</code><br>要求：使用 <code>cout</code> 和 <code>endl</code>，每行独立输出。',
          timer: '⏱ 限时 5 分钟'
        },
        hints: [
          '第一行输出 <code>"*"</code>',
          '第二行输出 <code>"***"</code>',
          '第三行输出 <code>"*****"</code>',
          '每行末尾加 <code>endl</code> 换行'
        ],
        answer: {
          codeFile: 'codes/lesson-01/pattern.cpp'
        },
        analysis: {
          title: '📖 解析',
          desc: '每行一个 <code>cout</code> 语句；<code>endl</code> 控制换行；字符串必须用英文双引号。'
        },
        extra: {
          title: '💡 输出格式的重要性',
          desc: '在竞赛中，输出格式非常重要。有时候答案完全正确，但因为多了一个空格或换行，就会被判 WA。这是最可惜的失分。'
        }
      }
    },

    /* ======================= slide-21 三题闯关 ======================= */
    {
      id: 21,
      type: 'level-map',
      title: '课堂挑战：三题闯关',
      subtitle: '限时实战，检验成果',
      chapterTag: '第 1 讲 · 实战演练',
      data: {
        question: {
          title: '闯关规则',
          desc: '限时 15 分钟，连续通过三关。<br>每通过一关得 10 分，全部通过额外奖励 10 分。<br>可求助老师或同学，求助扣 2 分。',
          timer: '⏱ 限时 15 分钟'
        },
        hints: [
          '遇到难题先跳过，把会做的先做完',
          '每题至少测试一遍样例',
          '提交前检查英文标点和分号'
        ],
        extra: {
          title: '💡 竞赛中的时间管理',
          desc: '竞赛就像闯关游戏，每一题都是一个关卡。你的目标是尽可能多地拿到分数。时间管理也是竞赛的重要能力。'
        }
      }
    },

    /* ======================= slide-22 总结与初赛渗透 ======================= */
    {
      id: 22,
      type: 'split',
      title: '总结与初赛渗透',
      subtitle: '易错点回顾 + 计算机基础知识',
      data: {
        left: {
          items: [
            { title: '❌ 中文标点', desc: '； “” （） 全部会报错' },
            { title: '❌ 漏分号', desc: '每条语句末尾必须有 ;' },
            { title: '❌ 大小写错误', desc: 'main ≠ Main，cout ≠ count' },
            { title: '❌ 方向反了', desc: 'cout &lt;&lt;，cin &gt;&gt;' }
          ]
        },
        right: {
          items: [
            { title: '🖥️ 硬件五大部件', desc: '运算器、控制器、存储器、输入、输出' },
            { title: '⚙️ 程序编译过程', desc: '.cpp → 编译 → .obj → 链接 → .exe' },
            { title: '⌨️ 常见输入设备', desc: '键盘、鼠标、扫描仪' },
            { title: '🖨️ 常见输出设备', desc: '显示器、打印机、音箱' }
          ]
        },
        extra: {
          title: '📖 知识扩展 · 计算机之父',
          desc: '<b><a href="https://baike.baidu.com/item/约翰·冯·诺依曼" target="_blank" class="wiki-link">冯·诺依曼</a></b>出生于 1903 年的匈牙利，从小就展现出超常的数学天赋。<br>他 6 岁能心算 8 位数除法，8 岁学会微积分，23 岁获得数学博士学位。<br>他一生跨越<b>数学、物理、经济、计算机</b>多个领域。在<a href="https://baike.baidu.com/item/量子力学" target="_blank" class="wiki-link">量子力学</a>、<a href="https://baike.baidu.com/item/博弈论" target="_blank" class="wiki-link">博弈论</a>、流体力学里都有建树。<br>1945 年他提出"<a href="https://baike.baidu.com/item/存储程序" target="_blank" class="wiki-link">存储程序</a>"概念，让计算机第一次能"自己运行程序"。这就是今天所有计算机的基础——<b>冯·诺依曼结构</b>。<br>他被称为"<b>计算机之父</b>"，也被称为"<b>最后一个什么都知道的人</b>"。',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-23 课堂小测（选择题） ======================= */
    {
      id: 23,
      type: 'quiz',
      title: '课堂小测 · 选择题',
      subtitle: '编译器、头文件与命名规则',
      chapterTag: '第 1 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 3,
            source: '2020 CSP-J 初赛 · 第 2 题',
            question: '编译器的主要功能是（　）。',
            options: [
              { label: 'A', text: '将源程序翻译成机器指令代码', correct: true },
              { label: 'B', text: '将源程序重新组合' },
              { label: 'C', text: '将低级语言翻译成高级语言' },
              { label: 'D', text: '将一种高级语言翻译成另一种高级语言' }
            ],
            analysis: '编译器的作用是把高级语言编写的<b>源程序</b>整体翻译成等价的<b>机器指令代码</b>。选项 C 方向反了；选项 D 是"转译器"的功能。这正是本讲 slide-07"从代码到运行"的核心知识点。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2026 初赛模拟卷一 · 第 5 题',
            question: 'C++ 中使用 <code>cin</code> 和 <code>cout</code>，需要包含哪个头文件？',
            options: [
              { label: 'A', text: '<code>iostream</code>', correct: true },
              { label: 'B', text: '<code>cmath</code>' },
              { label: 'C', text: '<code>cstdio</code>' },
              { label: 'D', text: '<code>algorithm</code>' }
            ],
            analysis: '<code>cin</code> 和 <code>cout</code> 定义在标准输入输出流库中，对应头文件 <code>&lt;iostream&gt;</code>。这是本讲 slide-10"Hello, World!"中 <code>#include &lt;iostream&gt;</code> 的直接考查。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'C++ 信息学奥赛总复习题 · 第一章',
            question: '以下哪个是 C++ 的合法标识符（变量名）？',
            options: [
              { label: 'A', text: '<code>123abc</code>' },
              { label: 'B', text: '<code>abc-123</code>' },
              { label: 'C', text: '<code>_abc123</code>', correct: true },
              { label: 'D', text: '<code>abc#123</code>' }
            ],
            analysis: 'C++ 标识符命名规则：① 只能含字母、数字、下划线；② <b>不能以数字开头</b>；③ 不能含特殊符号。<br>A 以数字开头，错；B 含 <code>-</code>，错；C 以下划线开头，合法；D 含 <code>#</code>，错。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛与复赛的区别',
          desc: 'CSP-J 分<b>初赛</b>和<b>复赛</b>两轮。<br><b>初赛</b>：笔试（近年改为机试），考计算机基础、进制转换、逻辑运算、读程序写结果。<br><b>复赛</b>：上机编程，4 道题，3.5 小时。<br>初赛通过才能参加复赛，初赛淘汰率约 60%—70%。<br>所以初赛不能忽视——很多高手因为初赛没过，连复赛的门都进不去。',
          variant: 'card-primary'
        }
      }
    },

        /* ======================= slide-24 课堂小测（判断题） ======================= */
    {
      id: 24,
      type: 'quiz',
      title: '课堂小测 · 判断题',
      subtitle: '编译、执行与程序入口',
      chapterTag: '第 1 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · C++ 语法',
            question: '程序员用 C、C++、Python、Scratch 等编写的程序能在 CPU 上直接执行。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: 'CPU 只能直接执行<b>机器指令</b>（0/1 序列）。高级语言（C++、Python）和图形化语言（Scratch）都需要经过<b>编译或解释</b>，转换成机器码后才能被 CPU 执行。这正是本讲 slide-07"从代码到运行"的核心知识点。'
          },
          {
            id: 2,
            type: 'judge',
            difficulty: 3,
            source: 'C++ 信息学奥赛总复习题 · 第一章',
            question: '一个 C++ 程序可以没有 <code>main</code> 函数。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '<code>main</code> 函数是 C++ 程序的<b>唯一入口</b>。每个可执行程序<b>有且只有一个</b> <code>main</code> 函数，程序从 <code>main</code> 的第一条语句开始执行。没有 <code>main</code>，编译器无法确定程序从哪里开始运行，会报链接错误。这是本讲 slide-10 extra"为什么 main 是入口"的核心内容。'
          }
        ],
        extra: {
          title: '💡 判断题的解题技巧',
          desc: '判断题常见的"陷阱"：<br>① <b>绝对化词语</b>：出现"一定""必须""所有""任何"往往错<br>② <b>反常识描述</b>：越是"听起来离谱"的越要仔细<br>③ <b>概念混淆</b>：把"编译"和"解释"、"源程序"和"机器码"混在一起<br>初赛中判断题占分不少，看题要慢，抓住关键词。',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-25 今日总结（补丁 1-5：新埋"程序记住数据"伏笔） ======================= */
    {
      id: 25,
      type: 'quote',
      title: '今日总结',
      subtitle: '今天我们学会了',
      data: {
        text: '程序框架不能少，头文件加命名空间。',
        author: '—— 竞赛第一课口诀',
        points: [
          '第一个 C++ 程序：Hello, World!',
          '程序基本结构：头文件、主函数、输出、返回',
          '输入输出：cin >> 和 cout <<',
          'OJ 提交：注册、找题、提交、看结果',
          '判题结果：AC、WA、CE、RE、TLE 等'
        ],
        highlight: {
          title: '📌 关键口诀',
          desc: '主函数是入口，return 0 结束；cout 输出用 &lt;&lt;，cin 输入用 &gt;&gt;；英文标点要记牢，分号千万别漏掉。'
        },
        extra: {
          title: '💡 今天你写下了第一个程序',
          desc: '这是编程之路的起点。1972 年，第一个 Hello World 程序诞生。今天你也写了一个。记住这一刻，未来你会感谢今天努力的自己。<br><br>🔮 <b>伏笔</b>：今天我们写的程序只在屏幕上输出，下一讲，程序将学会 <b>记住数据</b>——用变量。',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-26 课后作业 ======================= */
    {
      id: 26,
      type: 'grid',
      title: '课后作业 · OJ 实战',
      subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P1000', link: 'https://www.luogu.com.cn/problem/P1000', desc: '<b>Hello, World!</b><br>考察：输出格式<br>难度：★<br>目标：直接输出指定文本' },
          { icon: '🟢', title: '基础 2 · P1001', link: 'https://www.luogu.com.cn/problem/P1001', desc: '<b>A+B Problem</b><br>考察：cin 输入、加法<br>难度：★<br>目标：读两个数，输出和' },
          { icon: '🔴', title: '挑战 · P5706', link: 'https://www.luogu.com.cn/problem/P5706', desc: '<b>再分肥宅水</b><br>考察：double 精度<br>难度：★★<br>目标：读懂题意，注意输出小数' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-27 下节预告（补丁 1-6：加远期彩蛋） ======================= */
    {
      id: 27,
      type: 'radial',
      title: '下节预告',
      subtitle: '第 2 讲 数据类型 · 给数据找个家',
      data: {
        center: '数据类型',
        items: [
          { text: 'int / long long' },
          { text: 'double / float' },
          { text: 'char / bool' },
          { text: '变量命名与赋值' }
        ],
        extra: {
          title: '💡 数据也有自己的家',
          desc: '整数住小盒子，大整数住大箱子，小数住精密容器。下节课我们给数据找到合适的家。选错类型，数据会溢出或丢失精度。<br><br>🔮 <b>远期彩蛋</b>：为什么 int 最大是 21 亿？为什么小数存不准？这些问题，第 35 讲一次讲清。',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-28 答疑时间 ======================= */
    {
      id: 28,
      type: 'dialog',
      title: '答疑时间',
      subtitle: '有问题尽管问',
      chapterTag: '第 1 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '为什么我的程序编译不通过？' },
          { who: 'robot', text: '先看第一行报错，通常是标点或分号。编译器会告诉你出错的行号。' },
          { who: 'student', text: 'OJ 提交后显示 WA 怎么办？' },
          { who: 'robot', text: '检查输出格式和边界情况。有时候多一个空格就会被判 WA。' },
          { who: 'student', text: '程序运行结果不对，怎么调试？' },
          { who: 'robot', text: '在关键位置加 cout 输出中间变量，看看哪一步开始出错。' }
        ],
        extra: {
          title: '💡 提问是学习的最好方式',
          desc: '没有笨问题，只有不问的问题。每个程序员都是从无数个问题中成长起来的。',
          variant: 'card-primary'
        }
      }
    },

    /* ======================= slide-29 知识清单 ======================= */
    {
      id: 29,
      type: 'grid',
      title: '第 1 讲 · 知识清单',
      subtitle: '一页看完本讲所有重点',
      chapterTag: '第 1 讲 · 复习',
      data: {
        cards: [
          { icon: '📄', title: '程序结构', desc: '<b>头文件</b> #include &lt;iostream&gt;<br><b>命名空间</b> using namespace std;<br><b>主函数</b> int main() { }<br><b>返回</b> return 0;' },
          { icon: '📤', title: '输出 cout', desc: '用 <code>&lt;&lt;</code> 输出内容<br>可连续输出多个内容<br><code>endl</code> 换行并刷新<br><code>"\\n"</code> 换行更快' },
          { icon: '📥', title: '输入 cin', desc: '用 <code>&gt;&gt;</code> 读入变量<br>自动跳过空格、回车<br>类型必须匹配变量<br>程序会暂停等待输入' },
          { icon: '🏆', title: 'OJ 提交与判题', desc: '注册 → 找题 → 粘贴 → 提交<br><b>AC</b> 通过 · <b>WA</b> 答案错<br><b>CE</b> 编译错 · <b>RE</b> 运行错<br><b>TLE</b> 超时 · <b>MLE</b> 内存超' }
        ],
        extra: {
          title: '📌 关键口诀 + 小 C 彩蛋',
          desc: '<b>口诀</b>：程序框架不能少，头文件加命名空间；主函数是入口，return 0 结束；cout 输出用 &lt;&lt;，cin 输入用 &gt;&gt;。<br><b>四大错误</b>：① 中文标点 ② 漏分号 ③ 大小写错 ④ 方向反了。<br><b>小 C 彩蛋</b>：全世界第一个 "Hello, World!" 诞生于 1972 年。今天，你也写下了它。',
          variant: 'card-glow'
        }
      }
    },

    /* ======================= slide-30 结束页 ======================= */
    { 
      id: 30,
      type: 'ending',
      title: '第一讲结束',
      subtitle: '点击返回目录，复习本讲内容',
      chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 每一个程序员都从 Hello World 开始',
          desc: '今天你迈出了第一步，未来你可以用代码创造游戏、网站、人工智能。世界等着你去改变。',
          variant: 'card-glow'
        }
      }
    }

  ]
};
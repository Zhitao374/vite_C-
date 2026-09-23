export default {
  title: '第 1 讲 初识 C++',
  subtitle: '第一个程序与 OJ 提交',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '初识 C++', subtitle: '第一个程序与 OJ 提交', chapterTag: false,
      data: { accentWord: 'C++', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 1 讲'] }
    },

    /* ===== 02 为什么要学 C++ ===== */
    {
      id: 2, type: 'grid', title: '为什么要学 C++？', subtitle: '竞赛官方语言，高手的第一选择',
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

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步进入编程世界',
      data: {
        cards: [
          { number: '01', title: '认识程序', desc: '理解程序是什么、计算机如何运行' },
          { number: '02', title: '第一个程序', desc: '写出并运行 Hello, World!' },
          { number: '03', title: '编译与运行', desc: '看懂编译过程、学会运行' },
          { number: '04', title: '提交到 OJ', desc: '注册、提交、看懂判题结果' }
        ],
        extra: {
          title: '📖 知识扩展 · Hello World 的起源',
          desc: '1972 年，<a href="https://baike.baidu.com/item/贝尔实验室" target="_blank" class="wiki-link">贝尔实验室</a>的<a href="https://baike.baidu.com/item/布莱恩·克尼汉" target="_blank" class="wiki-link">布莱恩·克尼汉</a>在《B 语言入门》中第一次写下 <code>"Hello, World!"</code>。<br>当时他和<a href="https://baike.baidu.com/item/丹尼斯·里奇" target="_blank" class="wiki-link">丹尼斯·里奇</a>（C 语言之父）正在开发 <a href="https://baike.baidu.com/item/Unix" target="_blank" class="wiki-link">Unix</a>。为了让初学者<b>第一次运行就能看到结果</b>，他们设计了这句最简单的输出。<br>没想到，<b>50 多年后</b>，全世界 <b>700 多种编程语言</b>的第一课都是它。<a href="https://baike.baidu.com/item/Python" target="_blank" class="wiki-link">Python</a>、<a href="https://baike.baidu.com/item/Java" target="_blank" class="wiki-link">Java</a>、Rust——所有语言的第一个程序永远是 <code>Hello, World!</code>。<br><b>今天，你也将完成这个仪式。</b>'
        }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从零到提交',
      data: {
        items: [
          { icon: '🧠', badge: '基础', title: '第一站 · 概念理解', desc: '程序、C++、编译过程', points: ['程序 = 指令 + 数据', 'C++ 是编译型语言', '.cpp → .obj → .exe', '冯·诺依曼存储程序'] },
          { icon: '💻', badge: '核心', title: '第二站 · 第一个程序', desc: 'Hello, World! 逐行拆解', points: ['程序框架四件套', 'cout 输出与 endl 换行', '中文标点会报错', '大小写敏感'] },
          { icon: '🔧', badge: '关键', title: '第三站 · 编译与运行', desc: '让代码变成程序', points: ['编译 → 链接 → 运行', '看懂报错信息', '四大常见错误'] },
          { icon: '🏆', badge: '实战', title: '第四站 · OJ 实战', desc: '提交、判题、闯关', points: ['注册 → 找题 → 提交', 'AC 通过 · WA 答案错', 'CE 编译错 · TLE 超时', '三题闯关拿积分'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。本月排位赛积分上榜，赛季冠军获得"C++ 启航者"徽章。' }
      }
    },

    /* ===== 05 什么是程序 ===== */
    {
      id: 5, type: 'dialog', title: '什么是程序？', subtitle: '程序 = 指令 + 数据', chapterTag: '第 1 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，我按了电源键，计算机就亮了。它怎么知道要做什么？' },
          { who: 'robot', text: '这个问题问得好。计算机一开始什么都不知道，它只是一台非常听话的机器。' },
          { who: 'student', text: '那它怎么知道我让它做什么？' },
          { who: 'robot', text: '你给它一份"菜谱"，它就照着做。这份菜谱就是<b>程序</b>。' },
          { who: 'student', text: '菜谱里有食材和步骤，程序里有什么？' },
          { who: 'robot', text: '程序里有<b>数据</b>和<b>指令</b>。指令告诉计算机"做什么"，数据是它要处理的对象。比如"输出 Hello"——"输出"是指令，"Hello"是数据。' },
          { who: 'student', text: '那计算机看得懂"Hello"吗？' },
          { who: 'robot', text: '这个嘛……其实计算机只认识 <b>0 和 1</b>。它是怎么把"Hello"变成 0 和 1 的？第 22 讲揭晓。🔮' }
        ],
        extra: {
          title: '📖 知识扩展 · 冯·诺依曼结构',
          desc: '1945 年，数学家<a href="https://baike.baidu.com/item/约翰·冯·诺依曼" target="_blank" class="wiki-link">冯·诺依曼</a>在一份 <b>101 页</b>的报告里，提出了"<a href="https://baike.baidu.com/item/存储程序" target="_blank" class="wiki-link">存储程序</a>"概念：把指令和数据一起存进内存，让计算机自动执行。<br>在这之前，改变计算任务要<b>重新接线</b>——就像今天想换一个 App，你得换一台手机。<br>这个想法彻底改变了计算机。今天你用的手机、电脑、服务器，<b>全都是冯·诺依曼结构</b>。<br>有意思的是，冯·诺依曼本人是<b>数学、物理、经济、计算机</b>多个领域的大师。他晚年研究<a href="https://baike.baidu.com/item/博弈论" target="_blank" class="wiki-link">博弈论</a>，还是<a href="https://baike.baidu.com/item/量子力学" target="_blank" class="wiki-link">量子力学</a>的奠基人之一。有人开玩笑说：他是"<b>最后一个什么都知道的人</b>"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 什么是 C++ ===== */
    {
      id: 6, type: 'dialog', title: '什么是 C++？', subtitle: '编译型编程语言，竞赛王者', chapterTag: '第 1 讲 · 概念理解',
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

    /* ===== 07 从代码到运行 ===== */
    {
      id: 7, type: 'grid', title: '从代码到运行', subtitle: '源程序如何变成可执行程序',
      data: {
        cards: [
          { icon: '📄', title: '① 源程序', desc: '<b>hello.cpp</b><br>用 C++ 写的代码文件<br>人类可读<br>扩展名 .cpp' },
          { icon: '⚙️', title: '② 编译', desc: '<b>生成 .obj</b><br>翻译成机器码<br>检查语法错误<br>像翻译官' },
          { icon: '🔗', title: '③ 链接', desc: '<b>生成 .exe</b><br>组装目标文件<br>加上库文件<br>像装配工' },
          { icon: '▶️', title: '④ 运行', desc: '<b>输出结果</b><br>加载 .exe<br>CPU 执行机器码<br>得到最终结果' }
        ],
        extra: {
          title: '💡 编译 vs 链接',
          desc: '<b>编译</b>：C++ 代码 → 机器码，一个文件一个文件翻译，生成 <code>.obj</code>。就像把中餐菜谱翻译成英文。<br><b>链接</b>：把所有 <code>.obj</code> 和库文件"拼装"成可执行程序 <code>.exe</code>。就像把所有翻译好的菜谱装订成一本书。<br>它们是<b>两个不同的工具</b>：编译器 <a href="https://baike.baidu.com/item/GCC" target="_blank" class="wiki-link">g++</a> / <a href="https://baike.baidu.com/item/Clang" target="_blank" class="wiki-link">clang++</a>，链接器 <a href="https://baike.baidu.com/item/GNU_ld" target="_blank" class="wiki-link">ld</a>。<br>Dev-C++ 的"编译运行"按钮，其实一口气做了 <b>编译 → 链接 → 运行</b> 三件事。所以你感觉不到它们的区别。'
        }
      }
    },

    /* ===== 08 编译运行演示 ===== */
    {
      id: 8, type: 'flow', title: '编译运行演示', subtitle: '让代码变成程序',
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

    /* ===== 09 过渡页 ===== */
    {
      id: 9, type: 'transition', title: '第二站 · 开始写代码', subtitle: '从 Hello World 到输出进阶',
      data: { note: '接下来你将写出人生第一个 C++ 程序，并学会让程序与屏幕对话' }
    },

    /* ===== 10 Hello World ===== */
    {
      id: 10, type: 'code-split', title: '第一个程序：Hello, World!', subtitle: '逐行拆解，理解每一行的使命',
      data: {
        intro: '📖 <b>程序框架四件套</b>：头文件、命名空间、主函数、返回 0。<br>这是所有 C++ 程序的标准开头，先照抄一遍，后面再细讲。',
        codeFile: 'codes/lesson-01/hello-world.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'cout <<', desc: '输出 "Hello, World!" 并换行' },
          { line: 7, title: 'return 0', desc: '返回 0，表示程序正常结束' }
        ],
        output: 'Hello, World!',
        extra: {
          title: '💡 为什么 main 是入口',
          desc: '<code>main</code> 是英文"<b>主要的</b>"的意思。计算机运行程序时，第一件事就是<b>找到 main</b>，从那里开始执行。<br>没有 main，程序就不知道从哪里出发。这是 C++ 标准的规定，<b>所有编译器都遵守</b>。<br>那能不能不叫 main？不行。<b>每个程序有且只有一个 main</b>。名字必须小写。写成 <code>Main</code> 会编译失败。<br>有意思的是，其他语言也有类似规定：<a href="https://baike.baidu.com/item/Java" target="_blank" class="wiki-link">Java</a> 是 <code>public static void main</code>，<a href="https://baike.baidu.com/item/Python" target="_blank" class="wiki-link">Python</a> 是 <code>if __name__ == \'__main__\'</code>。所有语言的"入口"都叫 main——这算是程序员之间的默契。<br><br>🔮 <b>伏笔</b>：你写的 "H"、"e"、"l"，在计算机里其实都是 <b>数字</b>。第 22 讲揭晓。'
        }
      }
    },

    /* ===== 11 第一次编译报错 ===== */
    {
      id: 11, type: 'dialog', title: '第一次编译报错怎么办？', subtitle: '小C教你读错误信息', chapterTag: '第 1 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，我点了编译，屏幕上跳出一大段红色文字，好吓人！' },
          { who: 'robot', text: '别怕，红色文字是<b>编译器在帮你</b>。它告诉你哪里有问题，就像医生诊断。' },
          { who: 'student', text: '那怎么读呢？' },
          { who: 'robot', text: '看<b>第一行</b>就够了。它会说"第几行、什么错"。后面的细节可以先忽略。' },
          { who: 'student', text: '常见的错误有哪些？' },
          { who: 'robot', text: '新手最常见的四种：<br>① 中文标点<br>② 漏分号<br>③ 大小写错<br>④ 括号不配对。' },
          { who: 'student', text: '如果我找不到错呢？' },
          { who: 'robot', text: '可以对照第一行报错的位置，看那一行有没有这四个问题。<br><b>90% 的编译错误都是这四种。</b>' }
        ],
        extra: {
          title: '💡 报错的三段式',
          desc: '编译报错信息通常长这样：<br><code>hello.cpp:5:10: error: expected \';\' before \'return\'</code><br><b>翻译</b>：<br>· 文件：hello.cpp<br>· 位置：第 5 行第 10 列<br>· 类型：error（错误）<br>· 信息：return 前面少了个分号<br><b>看这三个部分就够了</b>——文件、行号、错误描述。<br>不用怕那些看不懂的细节。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 常见错误盘点 ===== */
    {
      id: 12, type: 'compare', title: '常见错误大盘点', subtitle: '4 个新手必踩的坑',
      data: {
        groups: [
          { wrong: 'cout &lt;&lt; “Hello”；', right: 'cout &lt;&lt; "Hello";' },
          { wrong: 'cout &lt;&lt; "Hello"', right: 'cout &lt;&lt; "Hello";' },
          { wrong: 'Main()  count', right: 'int main()  cout' },
          { wrong: '少一个大括号', right: '大括号必须成对' }
        ],
        extra: {
          title: '💡 四大错误的原因',
          desc: '① <b>中文标点</b>：计算机用不同数字编码表示中英标点<br>② <b>漏分号</b>：语句结束的标志<br>③ <b>大小写</b>：C++ 区分大小写，Main ≠ main，cout ≠ count<br>④ <b>括号不配对</b>：每个 <code>{</code> 必须有对应的 <code>}</code><br>编程中 90% 的错误都是这些小错误，仔细检查能省很多时间。'
        }
      }
    },

    /* ===== 13 输出进阶 ===== */
    {
      id: 13, type: 'code-split', title: '输出进阶：多个内容与换行', subtitle: '灵活使用 cout',
      data: {
        intro: '📖 <code>cout</code> 可以一次输出多个内容，用 <code>&lt;&lt;</code> 连接；<code>endl</code> 表示换行。',
        code: `cout << "A" << "B" << endl;           // 输出 AB
cout << "1 + 2 = " << 1 + 2 << endl;  // 输出 1 + 2 = 3
cout << "*" << endl;                  // 输出 *
cout << "***" << endl;                // 输出 ***`,
        annotations: [
          { line: 1, title: '连续输出', desc: '用 &lt;&lt; 连接多个内容，输出 AB' },
          { line: 2, title: '文字 + 结果', desc: '先算 1+2，再输出 1 + 2 = 3' },
          { line: 3, title: '输出单行', desc: '输出 * 后换行' },
          { line: 4, title: '输出多字符', desc: '输出 *** 后换行' }
        ],
        extra: {
          title: '💡 endl 的来历',
          desc: '<code>endl</code> 是英文 "<b>end line</b>" 的缩写，意思是"<b>结束这一行</b>"。<br>它做两件事：换行 + <b>刷新缓冲区</b>。缓冲区就像"待发送的信件"，<code>endl</code> 相当于喊了一声"快递员，走起！"<br>但这也让 <code>endl</code> 比 <code>"\\n"</code> <b>慢一点</b>。因为每次都要"叫快递员"。<br>所以竞赛中大量输出时，选手都用 <code>"\\n"</code> 而不是 <code>endl</code>。这就是 C++ 的"细节决定快慢"——<b>一个字符的差别，可能是 TLE 和 AC 的差别</b>。<br><br>🔮 <b>伏笔</b>：<code>endl</code> 和 <code>"\\n"</code> 明明都是换行，为什么速度不一样？第 22 讲从二进制讲起。'
        }
      }
    },

    /* ===== 14 初赛渗透：编译器 ===== */
    {
      id: 14, type: 'dialog', title: '初赛小知识：编译器', subtitle: 'CSP-J 初赛必考', chapterTag: '第 1 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考编译器吗？' },
          { who: 'robot', text: '会，而且是<b>高频考点</b>。' },
          { who: 'student', text: '一般怎么考？' },
          { who: 'robot', text: '最常见的是问"编译器的主要功能是什么"。<br>答案是：<b>把源程序翻译成机器指令代码</b>。' },
          { who: 'student', text: '有没有其他类似的题？' },
          { who: 'robot', text: '还有：编译和解释的区别、高级语言和低级语言、C++ 源程序文件的扩展名（.cpp）。' },
          { who: 'student', text: '那难吗？' },
          { who: 'robot', text: '不难，但是送分题，一定要拿下。<br>初赛常考的概念，我们在每讲都会渗透一点。' }
        ],
        extra: {
          title: '📖 编译型 vs 解释型',
          desc: '<b>编译型语言</b>：C++、C、Rust。源代码 → 编译 → 机器码 → 执行。<br>特点：<b>一次编译，多次运行，速度快</b>。<br><b>解释型语言</b>：Python、JavaScript。源代码 → 解释器逐行翻译 → 执行。<br>特点：<b>边翻译边执行，跨平台好，速度稍慢</b>。<br>竞赛都用 C++，就是因为<b>速度快</b>——同样的算法，C++ 快 10—100 倍。<br><b>初赛常考</b>：给一段描述，判断是编译型还是解释型。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 答疑：关于程序的疑问 ===== */
    {
      id: 15, type: 'dialog', title: '答疑：关于程序的疑问', subtitle: '小C回答常见问题', chapterTag: '第 1 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '程序一定要写在文件里吗？' },
          { who: 'robot', text: '是的。程序必须保存成文件（.cpp），编译器才能读它。<br>就像写作文要写在纸上，编译器才看得到。' },
          { who: 'student', text: '一个 .cpp 文件能写几个程序？' },
          { who: 'robot', text: '一个文件只能有一个 <code>main</code> 函数，也就是一个可执行程序。<br>但可以写很多函数，被 main 调用。函数是第 8 讲的内容。' },
          { who: 'student', text: '中文能当变量名吗？' },
          { who: 'robot', text: '理论上能，但竞赛和工程都不用。<br>变量名用英文字母和下划线，是行业的默契。' },
          { who: 'student', text: '为什么程序结尾一定要 return 0？' },
          { who: 'robot', text: '<code>return 0</code> 是告诉操作系统"程序正常结束"。<br>不写也行，C++ 会自动加，但写出来更清楚。' }
        ],
        extra: {
          title: '💡 三个关键问答回顾',
          desc: '① <b>程序必须保存成文件</b>，编译器才能读<br>② <b>一个文件一个 main</b>，一个可执行程序一个入口<br>③ <b>return 0</b> 表示程序正常结束<br>这三条是初学者的基本功。'
        }
      }
    },

    /* ===== 16 练习1：Hello World ===== */
    {
      id: 16, type: 'level-map', title: '课堂练习1：Hello World', subtitle: '独立完成第一个输出程序', chapterTag: '第 1 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输出 <code>Hello, World!</code>。要求：用 <code>cout</code>，英文双引号，末尾分号。', timer: '⏱ 限时 5 分钟' },
        hints: ['用 <code>cout</code> 输出', '字符串用英文双引号', '语句末尾有分号'],
        answer: { codeFile: 'codes/lesson-01/hello-world.cpp' },
        analysis: { title: '📖 解析', desc: '<code>cout</code> 输出 · <code>endl</code> 换行 · <code>return 0</code> 正常结束。<br>跨学科：输出的文字就像广播里的"一句话"，要用引号"打包"好才能送出去。' },
        extra: { title: '📖 知识扩展 · 第一位程序员', desc: '1843 年，<a href="https://baike.baidu.com/item/阿达·洛芙莱斯" target="_blank" class="wiki-link">阿达·洛芙莱斯</a>为<a href="https://baike.baidu.com/item/分析机" target="_blank" class="wiki-link">分析机</a>写下了<b>第一个算法——计算<a href="https://baike.baidu.com/item/伯努利数" target="_blank" class="wiki-link">伯努利数</a></b>。<br>她原本只是在翻译一篇意大利论文，却忍不住加了 <b>7 篇注释</b>，总长度是原文的 <b>3 倍</b>。其中一篇注释详细描述了如何用机器一步步计算伯努利数。<b>这就是人类第一个计算机算法</b>。<br>她还第一次意识到：<b>机器不只是算数，还能处理符号</b>。她写道："分析机编织代数图案，就像提花机编织花朵和叶子。"<br>她的父亲是诗人<a href="https://baike.baidu.com/item/拜伦" target="_blank" class="wiki-link">拜伦</a>，但她走的不是文学路，而是数学与机器的交叉路。100 年后，<a href="https://baike.baidu.com/item/美国国防部" target="_blank" class="wiki-link">美国国防部</a>用一种编程语言纪念她——<b>语言的名字叫 <a href="https://baike.baidu.com/item/Ada" target="_blank" class="wiki-link">Ada</a></b>。' }
      }
    },

    /* ===== 17 练习2：输出图形 ===== */
    {
      id: 17, type: 'level-map', title: '课堂练习2：输出图形', subtitle: '巩固输出与换行', chapterTag: '第 1 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输出下面图形：<br><code>*<br>***<br>*****</code><br>要求：使用 <code>cout</code> 和 <code>endl</code>，每行独立输出。', timer: '⏱ 限时 6 分钟' },
        hints: ['第一行输出 <code>"*"</code>', '第二行输出 <code>"***"</code>', '第三行输出 <code>"*****"</code>', '每行末尾加 <code>endl</code> 换行'],
        answer: { codeFile: 'codes/lesson-01/pattern.cpp' },
        analysis: { title: '📖 解析', desc: '每行一个 <code>cout</code> 语句；<code>endl</code> 控制换行；字符串必须用英文双引号。' },
        extra: { title: '💡 输出格式的重要性', desc: '在竞赛中，输出格式非常重要。有时候答案完全正确，但因为多了一个空格或换行，就会被判 WA。这是最可惜的失分。' }
      }
    },

    /* ===== 18 练习3：输出菱形 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习3：输出菱形', subtitle: '灵活运用 cout 和 endl', chapterTag: '第 1 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输出下面 5 行菱形图案（用 <code>*</code> 组成）：<br><code>&nbsp;&nbsp;*<br>&nbsp;***<br>*****<br>&nbsp;***<br>&nbsp;&nbsp;*</code><br>要求：每一行是一个 <code>cout</code> 语句，空格也要输出。', timer: '⏱ 限时 8 分钟' },
        hints: [
          '第一行：2 个空格 + <code>*</code>',
          '第二行：1 个空格 + <code>***</code>',
          '第三行：<code>*****</code>',
          '第四、五行与第一、二行对称',
          '空格也是字符，要写在双引号里'
        ],
        answer: {
          code: `#include <iostream>
using namespace std;

int main() {
    cout << "  *" << endl;
    cout << " ***" << endl;
    cout << "*****" << endl;
    cout << " ***" << endl;
    cout << "  *" << endl;
    return 0;
}`
        },
        analysis: { title: '📖 解析', desc: '菱形的核心是"<b>空格 + 星号</b>"的组合。<br>每一行都是一个字符串，空格必须写在双引号里。<br>这道题考的是对 <code>cout</code> 和格式的灵活运用，为后面"循环打印图案"（第 5 讲）打基础。' },
        extra: { title: '📖 知识扩展 · ASCII 艺术', desc: '<b>ASCII 艺术</b>就是用字符拼出图像。<br>1960 年代，打印机只能打字符，人们就用 <code>*</code>、<code>#</code>、<code>@</code> 拼出 LOGO、动物、人像。<br>今天你看到的很多"字符画"（比如终端里的企鹅、笑脸），都是 ASCII 艺术。<br><b>这是最早的"计算机艺术"形式之一。</b><br>今天你用 5 行代码，也画了一幅 ASCII 艺术。' }
      }
    },

    /* ===== 19 难题后的放松：ASCII 艺术画廊 ===== */
    {
      id: 19, type: 'grid', title: '🎨 难题后的放松 · 字符画画廊', subtitle: '用字符拼出的可爱图像',
      chapterTag: '第 1 讲 · 知识讲解',
      data: {
        cards: [
          {
            icon: '🙏',
            title: '佛祖保佑 · 永无 BUG',
            desc: '<img src="static/ascii-art/buddha-blessing.svg" alt="佛祖保佑 永无BUG" style="display:block;margin:0 auto;max-width:340px;width:100%;">'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 程序员的梗文化',
          desc: '这张图在程序员圈子里流传了 <b>20 多年</b>。<br>出处已不可考，但几乎每个程序员都见过它。<br><br><b>为什么程序员喜欢这张图？</b><br>· 代码里总有你找不到的 <b>BUG</b><br>· 服务器总在你下班时 <b>宕机</b><br>· 上线前总要拜一拜，图个吉利<br><br>这不是迷信，是<b>高压工作下的一种幽默</b>——用调侃化解焦虑，用自嘲面对不确定性。<br><br>类似的"程序员玄学"还有：<br>· 上线前不许说"今天很顺"<br>· 服务器命名用神话角色<br>· 给代码写"好运"注释<br><br>🔍 <b>冷知识</b>：英文程序员也有类似梗，比如"<code>// TODO: fix this later</code>"（以后再修）——那个"以后"永远不会来。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 OJ 是什么 ===== */
    {
      id: 20, type: 'dialog', title: 'OJ 是什么？', subtitle: 'Online Judge 在线判题系统', chapterTag: '第 1 讲 · OJ 实战',
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

    /* ===== 21 OJ 提交步骤 ===== */
    {
      id: 21, type: 'flow', title: 'OJ 提交步骤', subtitle: '手把手教你提交代码',
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

    /* ===== 22 判题结果 ===== */
    {
      id: 22, type: 'compare', title: 'OJ 判题结果解读', subtitle: '看懂反馈，快速改进',
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

    /* ===== 23 从 WA 到 AC ===== */
    {
      id: 23, type: 'dialog', title: '从 WA 到 AC 的心路历程', subtitle: '小C与同学聊"改错"', chapterTag: '第 1 讲 · OJ 实战',
      data: {
        lines: [
          { who: 'student', text: '小 C，我提交了 3 次，都是 WA，好沮丧。' },
          { who: 'robot', text: '这是每个竞赛选手都走过的路。<b>WA 不是失败，是信息</b>——它告诉你"哪里不对"。' },
          { who: 'student', text: '那我怎么找到不对的地方？' },
          { who: 'robot', text: '三步走：<br>① 用题目给的样例测一遍，看看输出对不对<br>② 对比输出格式：多空格？少换行？<br>③ 检查常见错误：中文标点、大小写' },
          { who: 'student', text: '样例过了还 WA 呢？' },
          { who: 'robot', text: '那更常见——是<b>隐藏测试点</b>的问题。<br>比如题目要求输出末尾不能有空行，你的程序多输出了一行。<br>这类问题，后面学"输出格式"时会专门讲。' },
          { who: 'student', text: '原来如此。' },
          { who: 'robot', text: '记住这句话：<b>"AC 是礼物，WA 是老师。"</b><br>每次 WA 都让你更接近正确答案。' }
        ],
        extra: {
          title: '💡 一个程序员的成长',
          desc: '职业选手的 <b>WA 率</b>也不低——他们只是"见识过的坑更多"。<br>新手 WA 一次慌半天，老手 WA 一次看一眼就找到问题。<br>区别不是聪明，而是<b>经验</b>。<br>经验从哪来？<b>从每一次 WA 中积累</b>。<br>所以，别怕错。看到 WA，先深呼吸，再按部就班排查。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 课堂小测 ===== */
    {
      id: 24, type: 'quiz', title: '课堂小测', subtitle: '编译器、程序结构与输出',
      chapterTag: '第 1 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1, type: 'single', difficulty: 3,
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
            id: 2, type: 'single', difficulty: 3,
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
            id: 3, type: 'single', difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第一章',
            question: '下面哪个是 C++ 源程序文件的标准扩展名？',
            options: [
              { label: 'A', text: '<code>.exe</code>' },
              { label: 'B', text: '<code>.obj</code>' },
              { label: 'C', text: '<code>.cpp</code>', correct: true },
              { label: 'D', text: '<code>.txt</code>' }
            ],
            analysis: 'C++ 源程序文件用 <code>.cpp</code> 扩展名。<br>· <code>.cpp</code> 是源程序（人类可读）<br>· <code>.obj</code> 是编译后的目标文件<br>· <code>.exe</code> 是链接后的可执行文件<br>这是初赛高频考点，对应本讲 slide-07 的"从代码到运行"。'
          },
          {
            id: 4, type: 'judge', difficulty: 2,
            source: 'CSP-J 初赛真题练习 · C++ 语法',
            question: '程序员用 C、C++、Python、Scratch 等编写的程序能在 CPU 上直接执行。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: 'CPU 只能直接执行<b>机器指令</b>（0/1 序列）。高级语言（C++、Python）和图形化语言（Scratch）都需要经过<b>编译或解释</b>，转换成机器码后才能被 CPU 执行。这正是本讲 slide-07"从代码到运行"的核心知识点。'
          },
          {
            id: 5, type: 'judge', difficulty: 2,
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
          title: '📖 知识扩展 · 初赛与复赛的区别',
          desc: 'CSP-J 分<b>初赛</b>和<b>复赛</b>两轮。<br><b>初赛</b>：笔试（近年改为机试），考计算机基础、进制转换、逻辑运算、读程序写结果。<br><b>复赛</b>：上机编程，4 道题，3.5 小时。<br>初赛通过才能参加复赛，初赛淘汰率约 60%—70%。<br>所以初赛不能忽视——很多高手因为初赛没过，连复赛的门都进不去。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 今日总结 ===== */
    {
      id: 25, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '程序框架不能少，头文件加命名空间。',
        author: '—— 竞赛第一课口诀',
        points: [
          '程序 = 指令 + 数据',
          '第一个 C++ 程序：Hello, World!',
          '程序基本结构：头文件、主函数、输出、返回',
          '编译过程：.cpp → .obj → .exe',
          'OJ 提交：注册、找题、提交、看结果',
          '判题结果：AC、WA、CE、RE、TLE'
        ],
        highlight: { title: '📌 关键口诀', desc: '主函数是入口，return 0 结束；cout 输出用 &lt;&lt;，换行用 endl；英文标点要记牢，分号千万别漏掉。' },
        extra: {
          title: '💡 今天你写下了第一个程序',
          desc: '这是编程之路的起点。1972 年，第一个 Hello World 程序诞生。今天你也写了一个。记住这一刻，未来你会感谢今天努力的自己。<br><br>🔮 <b>伏笔</b>：今天我们写的程序只会输出，不能记住数据。<br>下一讲，程序将学会 <b>记住数据</b>——用变量，用 cin。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 课后作业 ===== */
    {
      id: 26, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P1000', link: 'https://www.luogu.com.cn/problem/P1000', desc: '<b>Hello, World!</b><br>考察：输出格式<br>难度：★<br>目标：直接输出指定文本' },
          { icon: '🟢', title: '基础 2 · B2005', link: 'https://www.luogu.com.cn/problem/B2005', desc: '<b>字符三角形</b><br>考察：cout + 换行<br>难度：★★<br>目标：用字符拼出三角形' },
          { icon: '🔴', title: '挑战 · B2002', link: 'https://www.luogu.com.cn/problem/B2002', desc: '<b>Hello,World!</b>（变体）<br>考察：精确输出<br>难度：★★<br>目标：注意标点与大小写' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 下节预告 ===== */
    {
      id: 27, type: 'radial', title: '下节预告', subtitle: '第 2 讲 · 变量与整数类型',
      data: {
        center: '变量',
        items: [
          { text: '变量 = 盒子' },
          { text: 'cin 输入' },
          { text: 'int / long long' },
          { text: '命名规则' }
        ],
        extra: {
          title: '💡 让程序学会记住数据',
          desc: '今天的程序只会输出，不会"记住"数据。<br>如果我输入 3，程序能记住 3 吗？能算 3+5 吗？<br>下一讲，程序将学会<b>记住数据</b>——用变量，用 cin。<br>这是程序从"死板"变"灵活"的关键一步。<br><br>🔮 <b>远期彩蛋</b>：为什么 int 最大是 21 亿？为什么小数存不准？这些问题，第 22 讲一次讲清。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 答疑时间 ===== */
    {
      id: 28, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 1 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '为什么我的程序编译不通过？' },
          { who: 'robot', text: '先看第一行报错，通常是标点或分号。编译器会告诉你出错的行号。' },
          { who: 'student', text: 'OJ 提交后显示 WA 怎么办？' },
          { who: 'robot', text: '检查输出格式和边界情况。有时候多一个空格就会被判 WA。' },
          { who: 'student', text: '程序运行结果不对，怎么调试？' },
          { who: 'robot', text: '在关键位置加 cout 输出中间变量，看看哪一步开始出错。<br>这个方法叫"打印调试"，是竞赛常用技巧。' },
          { who: 'student', text: 'endl 和 \\n 到底用哪个？' },
          { who: 'robot', text: '初学者用 endl 就好，更直观。<br>等到了竞赛阶段，大数据输出时换成 \\n 会更快。' }
        ],
        extra: {
          title: '💡 提问是学习的最好方式',
          desc: '没有笨问题，只有不问的问题。每个程序员都是从无数个问题中成长起来的。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 本讲英文单词 ===== */
    {
      id: 29, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 1 讲 · 复习',
      data: {
        words: [
          { word: 'cout',    cn: '输出',   pron: '/siː aʊt/',  origin: 'character output 的缩写',  category: '函数' },
          { word: 'endl',    cn: '换行',   pron: '/end ɛl/',   origin: 'end line 的缩写',         category: '函数' },
          { word: 'include', cn: '包含',   pron: '/ɪnˈkluːd/', origin: '英文原意"包含"',          category: '关键字' },
          { word: 'main',    cn: '主函数', pron: '/meɪn/',     origin: '英文原意"主要的"',         category: '函数' },
          { word: 'return',  cn: '返回',   pron: '/rɪˈtɜːrn/', origin: '英文原意"返回"',          category: '关键字' },
          { word: 'std',     cn: '标准',   pron: '/stændəd/',  origin: 'standard 的缩写',         category: '概念' }
        ],
        extra: {
          title: '💡 记忆法 · 拆词记忆',
          desc: '<b>cout</b> = <b>c</b>haracter <b>out</b>put（字符输出）<br><b>endl</b> = <b>end</b> <b>l</b>ine（结束这一行）<br><b>include</b> = 英文"包含"（包含头文件）<br><b>main</b> = 英文"主要的"（主函数）<br><b>return</b> = 英文"返回"（返回结果）<br><br><b>为什么要理解英文原意？</b><br>· 记住原意，比死记拼写更容易<br>· 看到新词（如 <code>getline</code>）能猜出大致含义<br>· 初赛考拼写识别，理解原意能秒答<br><br><b>发音提示</b>：<code>cout</code> 不读 "count"，读 "c-out"。<code>endl</code> 读 "end-l"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 30 知识清单 ===== */
    {
      id: 30, type: 'grid', title: '第 1 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 1 讲 · 复习',
      data: {
        cards: [
          { icon: '📄', title: '程序结构', desc: '<b>头文件</b> #include &lt;iostream&gt;<br><b>命名空间</b> using namespace std;<br><b>主函数</b> int main() { }<br><b>返回</b> return 0;' },
          { icon: '📤', title: '输出 cout', desc: '用 <code>&lt;&lt;</code> 输出内容<br>可连续输出多个内容<br><code>endl</code> 换行并刷新<br><code>"\\n"</code> 换行更快' },
          { icon: '⚙️', title: '编译过程', desc: '.cpp → .obj → .exe<br><b>编译</b>：翻译成机器码<br><b>链接</b>：拼装成 .exe<br><b>运行</b>：CPU 执行' },
          { icon: '🏆', title: 'OJ 提交与判题', desc: '注册 → 找题 → 粘贴 → 提交<br><b>AC</b> 通过 · <b>WA</b> 答案错<br><b>CE</b> 编译错 · <b>RE</b> 运行错<br><b>TLE</b> 超时 · <b>MLE</b> 内存超' }
        ],
        extra: {
          title: '📌 关键口诀 + 小 C 彩蛋 + 挑战题单',
          desc: '<b>口诀</b>：程序框架不能少，头文件加命名空间；主函数是入口，return 0 结束；cout 输出用 &lt;&lt;，换行用 endl。<br><b>四大错误</b>：① 中文标点 ② 漏分号 ③ 大小写错 ④ 括号不配对。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P1000 Hello, World!<br><b>⭐⭐ 进阶</b>：B2005 字符三角形<br><b>⭐⭐⭐ 挑战</b>：B2002 Hello,World!（注意标点）<br><b>🔗 延伸</b>：在洛谷搜索"入门 1"，挑 3 道输出类题练手。<br><br><b>小 C 彩蛋</b>：全世界第一个 "Hello, World!" 诞生于 1972 年。今天，你也写下了它。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 31 结束页 ===== */
    {
      id: 31, type: 'ending', title: '第一讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
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
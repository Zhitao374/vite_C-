export default {
  title: '第 2 讲 变量与整数类型',
  subtitle: '让程序学会记住数据',
  total: 31,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '变量与整数类型', subtitle: '让程序学会记住数据', chapterTag: false,
      data: { accentWord: '变量', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 2 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '从第一个程序到今天的新问题',
      data: {
        items: [
          { icon: '📤', badge: '输出', title: '第一个程序', desc: 'Hello, World! 和程序框架', points: ['头文件、命名空间', 'int main()', 'cout <<', 'return 0'] },
          { icon: '⚙️', badge: '编译', title: '从代码到运行', desc: '.cpp → .obj → .exe', points: ['编译翻译机器码', '链接拼装成程序', '运行输出结果'] },
          { icon: '🏆', badge: 'OJ', title: '提交与判题', desc: '注册、提交、看结果', points: ['AC 通过', 'WA 答案错', 'CE 编译错', 'TLE 超时'] },
          { icon: '⚠️', badge: '易错', title: '四大常见错误', desc: '编译报错的主要原因', points: ['中文标点', '漏分号', '大小写错', '括号不配对'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '昨天的程序只会"输出"，不能"记住"任何数据。<br>如果我想让程序算"我输入的两个数的和"，它做不到——因为没有地方存这两个数。<br>今天我们就学习<b>变量</b>——让程序学会记住数据。<br><br>🔮 <b>回收伏笔</b>：第 1 讲结尾说过"下一讲程序将学会记住数据"，今天揭晓。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步让程序记住数据',
      data: {
        cards: [
          { number: '01', title: '理解变量', desc: '变量是什么、为什么需要它' },
          { number: '02', title: '输入与命名', desc: 'cin 输入数据、变量命名规则' },
          { number: '03', title: '整数类型', desc: 'int 和 long long 的区别与选择' },
          { number: '04', title: '常量 const', desc: '不变的值用 const 保存' }
        ],
        extra: { title: '📖 知识扩展 · 变量是编程的核心', desc: '没有变量，程序只能做一次性的计算。<br>有了变量，程序才能"记住"数据、"处理"数据、"传递"数据。<br>变量是所有程序的基础——从最简单的加法，到最复杂的 AI。<br><b>掌握变量，才是真正踏入编程大门。</b>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从盒子到类型',
      data: {
        items: [
          { icon: '📦', badge: '基础', title: '第一站 · 变量概念', desc: '变量 = 带名字的盒子', points: ['为什么需要变量', '变量的三要素', '变量在内存里'] },
          { icon: '📝', badge: '核心', title: '第二站 · 定义与输入', desc: '定义、赋值、cin 输入', points: ['类型 名字 = 初值;', '命名规则', 'cin 读入数据'] },
          { icon: '🔢', badge: '关键', title: '第三站 · 整数类型', desc: 'int 与 long long', points: ['int 约 ±21 亿', 'long long 约 ±9×10¹⁸', '大数用 long long'] },
          { icon: '🔒', badge: '进阶', title: '第四站 · 常量 const', desc: '不变的值有专门的家', points: ['const 定义常量', '常量的好处', '竞赛常用常量'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"变量大师"徽章。' }
      }
    },

    /* ===== 05 为什么需要变量 ===== */
    {
      id: 5, type: 'dialog', title: '为什么需要变量？', subtitle: '让程序记住数据', chapterTag: '第 2 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，我昨天的程序只会输出，不会算数。如果我想算 3 + 5，程序怎么写？' },
          { who: 'robot', text: '可以写 <code>cout &lt;&lt; 3 + 5</code>。但这样只能算"3+5"——换个数就要改代码。' },
          { who: 'student', text: '那我想算"用户输入的两个数之和"呢？' },
          { who: 'robot', text: '这时就需要<b>变量</b>。变量像一个带名字的盒子，把数据装进去，程序随时能取出来用。' },
          { who: 'student', text: '为什么要有名字？' },
          { who: 'robot', text: '因为计算机内存像一个大仓库，每个格子都有<b>地址</b>。你不想记地址吧？<br>起个名字，比如 <code>a</code>、<code>score</code>，就方便多了。' },
          { who: 'student', text: '那地址是什么？' },
          { who: 'robot', text: '是一串 <b>0 和 1</b> 组成的二进制数。第 22 讲会详细讲。🔮' },
          { who: 'student', text: '所以变量就是"数据的名字"？' },
          { who: 'robot', text: '对。名字最好"见名知意"。<code>age</code> 比 <code>a</code> 清晰，<code>score</code> 比 <code>b</code> 清晰。<br>程序是写给人看的，顺便让电脑跑起来。' }
        ],
        extra: {
          title: '📖 知识扩展 · 变量的本质',
          desc: '变量其实是内存里的一小块空间，变量名是这个空间的别名。程序运行时，计算机会给每个变量分配一个地址。<br>就像酒店房间有门牌号，但你不需要记门牌号，只要记住"小明的房间"就够了。<br><b>变量名就是数据的别名。</b><br><br>📜 <b>历史上的"第一个变量"</b>：<br>1957 年，FORTRAN 语言第一次引入"变量"概念。当时的变量名最多只能用 <b>6 个字符</b>——因为打孔卡一行空间有限。<br>今天你写 <code>student_total_score</code> 这种长名字，在 1957 年是不可能的。<br><br>🔮 <b>伏笔</b>：仓库的"门牌号"到底是什么？其实是一串二进制数。第 22 讲揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 变量 = 盒子 ===== */
    {
      id: 6, type: 'grid', title: '变量 · 带名字的盒子', subtitle: '三要素：名字、类型、值',
      data: {
        cards: [
          { icon: '🏷️', title: '① 名字', desc: '变量的"标签"<br>要有意义，见名知意<br>如 <code>age</code>、<code>score</code><br><b>命名有规则</b>' },
          { icon: '📦', title: '② 类型', desc: '变量能装什么数据<br>整数、小数、字符……<br>本讲只讲<b>整数</b><br>类型决定"盒子大小"' },
          { icon: '🎁', title: '③ 值', desc: '变量当前存的数<br>如 <code>age = 11</code><br>值可以随时修改<br><b>这就是"变"字的含义</b>' }
        ],
        extra: {
          title: '💡 为什么叫"变"量？',
          desc: '<b>变量</b>，英文是 <b>variable</b>，意思是"可以变化的量"。<br>和它对应的，是<b>常量</b>（constant）——值不能改变的量。<br><br>变量最大的特点就是"能变"：<br><code>int score = 60;</code><br><code>score = 90;</code>  ← 重新赋值<br><br>程序运行时，变量的值可以随时修改。这就是程序的"记忆"能更新的原因。<br><b>变量是程序动态性的来源。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 过渡页 ===== */
    {
      id: 7, type: 'transition', title: '第二站 · 定义与输入', subtitle: '给盒子起名字、装数据',
      data: { note: '接下来学习：如何定义变量、如何用 cin 读入数据' }
    },

    /* ===== 08 变量定义与赋值 ===== */
    {
      id: 8, type: 'code-split', title: '变量定义与赋值', subtitle: '两步走 或 一步到位',
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
        output: '11\n100',
        extra: {
          title: '💡 两种写法的区别',
          desc: '<b>分两步</b>：<br><code>int age;</code>  ← 定义（盒子是空的）<br><code>age = 11;</code>  ← 赋值（放数据进去）<br><br><b>一步到位</b>：<br><code>int age = 11;</code>  ← 推荐写法<br><br>哪种更好？<br><b>推荐一步到位</b>——定义时就初始化，避免"忘了赋值"。<br>这是编程界的共识："变量定义时就应该给它一个初值。"',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 未初始化变量的坑 ===== */
    {
      id: 9, type: 'compare', title: '未初始化变量的坑', subtitle: '使用前必须赋值',
      data: {
        groups: [
          { wrong: 'int a; cout &lt;&lt; a;', right: 'int a = 0; cout &lt;&lt; a;' },
          { wrong: '未赋值 → 输出垃圾值', right: '赋初值 → 输出 0' },
          { wrong: '结果不可预测（看运气）', right: '结果稳定可控' }
        ],
        extra: {
          title: '📖 为什么会有"垃圾值"？',
          desc: '内存里的旧数据没被清空，新变量会继承这些值。<br>编译器不会报错，但结果会错。<br>这是新手最常踩的坑——<b>程序能跑，但答案错</b>。<br>在竞赛中，未初始化变量会导致答案全错，而且很难查出来。<br><br><b>正确写法</b>：<br><code>int sum = 0;</code> 而不是 <code>int sum;</code><br><br><b>记忆口诀</b>：定义变量，顺手给初值。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 过渡页 ===== */
    {
      id: 10, type: 'dialog', title: '变量命名规则', subtitle: '给盒子起个好名字', chapterTag: '第 2 讲 · 定义与输入',
      data: {
        lines: [
          { who: 'student', text: '小 C，变量名可以随便起吗？' },
          { who: 'robot', text: '不行，有规则。<b>第一</b>，只能包含字母、数字、下划线。' },
          { who: 'student', text: '那可以叫 1a 吗？' },
          { who: 'robot', text: '不行。<b>第二</b>，首字符不能是数字。所以 <code>1a</code> 是错的，<code>a1</code> 才对。' },
          { who: 'student', text: '还有别的规则吗？' },
          { who: 'robot', text: '<b>第三</b>，不能和关键字重名，比如 <code>int</code>、<code>if</code>、<code>for</code>。<br><b>第四</b>，区分大小写，<code>Age</code> 和 <code>age</code> 是两个不同的变量。' },
          { who: 'student', text: '那起什么名字好？' },
          { who: 'robot', text: '见名知意。用有意义的英文单词：<code>student_name</code>、<code>game_score</code>。<br>程序是写给人看的。' },
          { who: 'student', text: '为什么代码里经常看到 i、j、k？' },
          { who: 'robot', text: '这是<b>循环变量的惯例</b>，来自数学——i 表示 index（索引）。<br>数学里求和用 Σ 加下标 i，程序员就把 i 沿用了下来。' }
        ],
        extra: {
          title: '📖 好习惯 · 见名知意 + 命名风格',
          desc: '<b>推荐</b>用有意义的英文单词，如 <code>student_name</code>、<code>game_score</code>。<br><br><b>三种常见命名风格</b>：<br>· <b>下划线式</b>：<code>student_name</code>（C 风格）<br>· <b>驼峰式</b>：<code>studentName</code>（Java 风格）<br>· <b>短命名</b>：<code>a</code>、<code>b</code>、<code>i</code>（竞赛快速写题）<br><br>竞赛中，为了快速写题，常用的短名字有：<br><code>i</code>、<code>j</code>、<code>k</code>（循环变量）<br><code>n</code>、<code>m</code>（个数）<br><code>a</code>、<code>b</code>、<code>c</code>（任意数值）<br>这些"短名字"在数学式程序里是默契。<br><br><b>原则</b>：简单处用短名，复杂处用长名。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 cin 输入 ===== */
    {
      id: 11, type: 'code-split', title: 'cin · 让程序读入数据', subtitle: '核心语法：cin >> 变量;',
      data: {
        intro: '📖 <code>cout</code> 是"输出"，<code>cin</code> 是"输入"。<br>方向记忆：<b>cout 用 <code>&lt;&lt;</code>，数据流向屏幕；cin 用 <code>&gt;&gt;</code>，数据流向变量。</b>',
        codeFile: 'codes/lesson-02/cin-cout.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int a, b;', desc: '一次定义两个整型变量' },
          { line: 7, title: 'cin &gt;&gt; a &gt;&gt; b;', desc: '从键盘读两个整数，空格或回车分隔' },
          { line: 8, title: 'cout &lt;&lt; a + b;', desc: '输出两数之和' }
        ],
        output: '（输入 3 5）\n8',
        extra: {
          title: '📖 cin 全称与输入技巧',
          intro: '📖 名字起好了，盒子也有了——现在让用户把数据"喂"进来。<br>这就用到 <code>cin</code>，C++ 的输入工具。<br>方向记忆：<b>cout 用 <code>&lt;&lt;</code>，数据流向屏幕；cin 用 <code>&gt;&gt;</code>，数据流向变量。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 - cin 答疑 ===== */
    {
      id: 12, type: 'dialog', title: 'cin 答疑', subtitle: '小C回答常见问题', chapterTag: '第 2 讲 · 定义与输入',
      data: {
        lines: [
          { who: 'student', text: '小 C，cin 和 cout 的方向为什么不一样？' },
          { who: 'robot', text: '记住一句话：<b>箭头指向"数据要去的地方"</b>。<br><code>cout &lt;&lt; a</code>：数据从 a 流向屏幕。<br><code>cin &gt;&gt; a</code>：数据从键盘流向 a。' },
          { who: 'student', text: '等等，我搞混了。' },
          { who: 'robot', text: '换个记忆法：<br><b>cout &lt;&lt;</b>：想象屏幕在外面，&lt;&lt; 像"把数据发射到屏幕"<br><b>cin &gt;&gt;</b>：想象变量在里面，&gt;&gt; 像"把数据吸进变量"' },
          { who: 'student', text: '那如果输入数据格式不对呢？' },
          { who: 'robot', text: '比如变量是 int，但你输入 "abc"，cin 会失败，变量值不确定。<br>竞赛题目保证输入格式正确，所以不用担心。' },
          { who: 'student', text: 'cin 一次能读几个数？' },
          { who: 'robot', text: '想读几个读几个。<br><code>cin &gt;&gt; a;</code> 读一个<br><code>cin &gt;&gt; a &gt;&gt; b &gt;&gt; c;</code> 读三个<br>空格、回车、Tab 都会自动跳过。' }
        ],
        extra: {
          title: '💡 三种常见的输入情形',
          desc: '<b>情形 1</b>：一行一个数<br>输入：<br><code>3</code><br><code>5</code><br>程序：<code>cin &gt;&gt; a &gt;&gt; b;</code> 一样能读<br><br><b>情形 2</b>：一行多个数<br>输入：<code>3 5</code><br>程序：<code>cin &gt;&gt; a &gt;&gt; b;</code> 正好<br><br><b>情形 3</b>：多行多个数<br>输入：<br><code>3 5</code><br><code>7 9</code><br>程序：<code>cin &gt;&gt; a &gt;&gt; b &gt;&gt; c &gt;&gt; d;</code><br><br><b>结论</b>：cin 不在乎空格和换行，只在乎"按顺序取数据"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 过渡页 ===== */
    {
      id: 13, type: 'transition', title: '第三站 · 整数类型', subtitle: '盒子有大小，装数要合适',
      data: { note: '接下来我们学习 C++ 最常用的两种整数类型——int 和 long long' }
    },

    /* ===== 14 int 类型 ===== */
    {
      id: 14, type: 'code-split', title: 'int · 普通整数', subtitle: '最常用的整数类型',
      data: {
        intro: '📖 <code>int</code> 是 integer（整数）的缩写，是 C++ 最常用的整数类型。<br>日常计数、求和、编号，全用它。',
        codeFile: 'codes/lesson-02/int-type.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int a = 100;', desc: '定义整型变量，赋值为 100' },
          { line: 7, title: 'int b = -50;', desc: 'int 可以存负数' },
          { line: 8, title: 'int c = a + b;', desc: 'int 之间可以运算' }
        ],
        output: '100\n-50\n50',
        extra: {
          title: '📖 int 的基本信息',
          desc: '<b>占用空间</b>：4 字节（32 位二进制）<br><b>取值范围</b>：约 <b>±21 亿</b>（准确值 -2147483648 到 2147483647）<br><b>常用场景</b>：日常计数、数组下标、编号、一般求和<br><br><b>为什么范围是 ±21 亿？</b><br>int 用 32 位二进制存数据，正负各占一半。<br>最大正数 = 2³¹ - 1 = 2147483647。<br>这个数字在竞赛中非常重要——<b>超出这个范围就会"溢出"</b>，得到一个错误的数。<br><br>🔮 <b>伏笔</b>：21 亿到底怎么算出来的？第 22 讲从二进制讲起。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 - long long 类型 ===== */
    {
      id: 15, type: 'code-split', title: 'long long · 大整数', subtitle: '存得下更大的数',
      data: {
        intro: '📖 <code>long long</code> 是"长整型"，占 8 字节，能存更大的整数。<br>竞赛中遇到大数运算，必须用它。',
        codeFile: 'codes/lesson-02/longlong-type.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'long long a = 10000000000;', desc: '100 亿——int 装不下，long long 可以' },
          { line: 7, title: 'long long b = 9999999999;', desc: '注意写法：long long 是两个单词' },
          { line: 8, title: 'cout &lt;&lt; a + b;', desc: '大数运算不会溢出' }
        ],
        output: '19999999999',
        extra: {
          title: '📖 long long 的基本信息',
          desc: '<b>占用空间</b>：8 字节（64 位二进制）<br><b>取值范围</b>：约 <b>±9 × 10¹⁸</b>（准确值 -9223372036854775808 到 9223372036854775807）<br><b>常用场景</b>：大数求和、阶乘、人口统计、天文数字<br><br><b>写法注意</b>：<code>long long</code> 是<b>两个单词</b>，中间有空格。<br>不能写成 <code>longlong</code> 或 <code>longLong</code>。<br><br><b>记忆技巧</b>：long long 是 int 的两倍字节，范围大约是 int 的 <b>40 亿倍</b>。<br>如果 int 像"中等行李箱"，long long 就像"大衣柜"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 int vs long long ===== */
    {
      id: 16, type: 'compare', title: 'int vs long long', subtitle: '什么时候用哪个',
      data: {
        groups: [
          { wrong: 'int：4 字节，±21 亿', right: 'long long：8 字节，±9×10¹⁸' },
          { wrong: '适用：10⁹ 以内的数', right: '适用：超过 10⁹ 的数' },
          { wrong: '陷阱：大数运算会溢出', right: '安全：几乎所有竞赛数据都够用' },
          { wrong: '如果存 100 亿，会变成负数', right: '存 100 亿，正常显示' }
        ],
        extra: {
          title: '💡 选择建议 + 竞赛经验',
          desc: '<b>口诀</b>：不确定时，优先用 long long。<br><br><b>为什么？</b><br>· long long 只比 int 多用 4 字节内存，几乎不影响性能<br>· 溢出后得到的错误答案，你根本看不出来<br>· "防溢出"比"省内存"重要得多<br><br><b>什么时候放心用 int？</b><br>· 计数（如 <code>n ≤ 1000</code>）<br>· 数组下标<br>· 循环变量<br>· 明确知道结果不超过 10⁹ 的场合<br><br><b>竞赛经验</b>：涉及"求和""阶乘""乘积"的题，先想"会不会超过 21 亿"，超过就用 long long。<br>这个习惯能帮你避免 90% 的溢出错误。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 const 常量 ===== */
    {
      id: 17, type: 'dialog', title: '常量 const', subtitle: '不变的值有专门的家', chapterTag: '第 2 讲 · 常量',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果程序里有一个值一直不变，比如圆周率 π，也要用变量吗？' },
          { who: 'robot', text: '用<b>常量</b>。用 <code>const</code> 关键字声明，值一旦定义就不能改。' },
          { who: 'student', text: '那和普通变量有什么区别？' },
          { who: 'robot', text: '变量可以改，常量不能改。如果试图修改常量，<b>编译器会报错</b>。' },
          { who: 'student', text: '什么时候用常量？' },
          { who: 'robot', text: '比如 π、重力加速度、竞赛中的模数 1000000007——这些固定值都用 const。' },
          { who: 'student', text: '用常量有什么好处？' },
          { who: 'robot', text: '<b>① 可读性</b>：看到 <code>PI</code> 就知道是圆周率，比 3.14159 直观。<br><b>② 防误改</b>：编译器会拦住任何修改常量的尝试。<br><b>③ 便于维护</b>：改一处常量定义，所有使用处自动更新。' }
        ],
        extra: {
          title: '📖 竞赛常用常量',
          desc: '<b>竞赛中常见的常量</b>：<br><br><code>const int MOD = 1000000007;</code><br>质数模数，用于"结果对 10⁹+7 取模"的题。<br><br><code>const int MAXN = 100005;</code><br>数组最大长度，定义在程序开头，方便统一修改。<br><br><code>const double PI = 3.141592653589793;</code><br>圆周率，用于几何题。<br><br><b>为什么用常量而不是直接写数字？</b><br>因为"魔法数字"（如 1000000007）在代码里出现多次，改起来麻烦，还容易写错。<br>用常量定义一次，处处引用，最安全。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 初赛渗透：类型大小 ===== */
    {
      id: 18, type: 'dialog', title: '初赛小知识：类型大小', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 2 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考变量和类型吗？' },
          { who: 'robot', text: '会，而且是<b>高频考点</b>。最常见的题型是"某个类型占几个字节"。' },
          { who: 'student', text: '常见的类型大小是多少？' },
          { who: 'robot', text: '<b>记忆口诀</b>：<br>· <code>int</code> = 4 字节<br>· <code>long long</code> = 8 字节<br>· <code>double</code> = 8 字节<br>· <code>char</code> / <code>bool</code> = 1 字节<br>· <code>float</code> = 4 字节' },
          { who: 'student', text: '这些要背吗？' },
          { who: 'robot', text: '必背。初赛每年至少考 1—2 道。<br>还有一道经典题：<code>int a[100];</code> 占多少内存？<br>答案是 100 × 4 = 400 字节。' },
          { who: 'student', text: '还有别的考点吗？' },
          { who: 'robot', text: '变量命名规则、int 范围、溢出判断——这些都是初赛的重点。<br>我们后面会陆续渗透。' }
        ],
        extra: {
          title: '📖 类型大小速查表',
          desc: '<b>常见类型字节数</b>（初赛必背）：<br>· <code>int</code> = 4 字节（32 位）<br>· <code>long long</code> = 8 字节（64 位）<br>· <code>double</code> = 8 字节<br>· <code>float</code> = 4 字节<br>· <code>char</code> = 1 字节<br>· <code>bool</code> = 1 字节<br><br><b>数组内存计算</b>：<br><code>int a[100];</code> → 100 × 4 = 400 字节<br><code>long long b[50];</code> → 50 × 8 = 400 字节<br><code>char s[20];</code> → 20 × 1 = 20 字节<br><br><b>规律</b>：所有维度的乘积 × 单元素字节数。<br>这个考点初赛每年至少 1 道。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 练习1：输出两倍 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习1：输出两倍', subtitle: '输入一个数，输出它的两倍', chapterTag: '第 2 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个整数 <code>n</code>，输出 <code>n × 2</code>。<br>输入样例：<code>7</code>　输出样例：<code>14</code>', timer: '⏱ 限时 4 分钟' },
        hints: [
          '定义 <code>int n;</code>',
          '用 <code>cin &gt;&gt; n;</code> 读入',
          '用 <code>cout &lt;&lt; n * 2 &lt;&lt; endl;</code> 输出'
        ],
        answer: { codeFile: 'codes/lesson-02/double.cpp' },
        analysis: { title: '📖 解析', desc: '第一次写"输入 + 计算 + 输出"的完整程序。<br>这三步是所有程序的骨架：<b>读数据 → 处理数据 → 输出结果</b>。<br>后面的题，都是在这个骨架上加变化。' },
        extra: { title: '📖 知识扩展 · 程序的"三步走"', desc: '几乎所有程序都是这个模式：<br><b>① 输入</b>：从键盘或文件读数据<br><b>② 处理</b>：对数据做运算、判断、循环<br><b>③ 输出</b>：把结果写到屏幕或文件<br><br>今天这个程序最简单——只做了一次乘法。<br>但再复杂的程序，也只是在这个骨架上加更多步骤。<br><b>记住这个骨架，你就理解了程序的本质。</b>', variant: 'card-primary' }
      }
    },

    /* ===== 20 练习2：交换 ===== */
    {
      id: 20, type: 'level-map', title: '课堂练习2：交换两个数', subtitle: '用临时变量交换值', chapterTag: '第 2 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入两个整数 <code>a</code> 和 <code>b</code>，交换它们的值后输出。<br>输入样例：<code>3 5</code>　输出样例：<code>5 3</code>', timer: '⏱ 限时 6 分钟' },
        hints: [
          '需要一个额外的临时变量 <code>t</code>',
          '三步走：<code>t = a; a = b; b = t;</code>',
          '不能直接 <code>a = b; b = a;</code>（会丢失 a 的原值）'
        ],
        answer: { codeFile: 'codes/lesson-02/swap.cpp' },
        analysis: { title: '📖 解析', desc: '为什么不能直接 <code>a = b; b = a;</code>？<br>因为执行 <code>a = b</code> 后，a 原来的值被覆盖了，<br>再执行 <code>b = a</code> 时，等于把 b 的新值又赋给 b——相当于没交换。<br><br>需要<b>临时变量 t</b> 来保存中间值。这是经典的"三杯水交换"问题。' },
        extra: { title: '📖 交叉学科 · 三杯水交换', desc: '物理课上有一个经典问题：<br>有两杯水，一杯红、一杯蓝，如何交换两个杯子的水，但只能用第三个空杯？<br><br>答案：<br>① 把红水倒进空杯<br>② 把蓝水倒进原红杯<br>③ 把空杯里的红水倒进原蓝杯<br><br>变量交换完全一样：<br><code>t = a; a = b; b = t;</code><br><br><b>编程的很多思想，都能在日常生活里找到原型。</b>', variant: 'card-primary' }
      }
    },

    /* ===== 21 练习3：大数和 ===== */
    {
      id: 21, type: 'level-map', title: '课堂练习3：大数求和', subtitle: '用 long long 避免溢出', chapterTag: '第 2 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入 4 个大整数（每个可达 <code>10¹⁰</code>），输出它们的和。<br>输入样例：<code>10000000000 20000000000 30000000000 40000000000</code>　输出样例：<code>100000000000</code>', timer: '⏱ 限时 8 分钟' },
        hints: [
          '每个数可能超过 21 亿，<b>必须用 long long</b>',
          '四个数之和可能更大，也要用 long long 保存',
          'cin 和 cout 对 long long 一样适用'
        ],
        answer: { codeFile: 'codes/lesson-02/big-sum.cpp' },
        analysis: { title: '📖 解析', desc: '这道题的<b>考点是类型选择</b>。<br>如果用 int 存 100 亿，会溢出变成一个错误的负数。<br><br><b>判断方法</b>：<br>题目说"每个数可达 10¹⁰"，10¹⁰ > 21 亿 → <b>必须用 long long</b>。<br>四个数之和更大 → 也要用 long long 存。<br><br><b>口诀</b>：大数用 long long，不确定时优先 long long。' },
        extra: { title: '📖 知识扩展 · 溢出事故：阿丽亚娜 5 号火箭', desc: '1996 年 6 月 4 日，欧洲航天局发射了一枚价值 <b>3.7 亿美元</b>的火箭——阿丽亚娜 5 号。<br>发射 <b>37 秒后</b>，火箭在高空解体，碎片散落在大西洋沿岸。<br><br><b>事故原因</b>：<br>火箭复用了阿丽亚娜 4 号的软件模块。<br>4 号速度慢，它的水平速度用 16 位整数存——最大只能到 32767。<br>5 号更快，水平速度超过了 32767，<b>整数溢出</b>了。<br>程序崩溃，火箭失控。<br><br><b>教训</b>：选错类型，后果可能不是"答案错"，而是"火箭炸了"。<br>这个事故成了计算机科学史上的经典案例——<b>类型选择，不是小事。</b>', variant: 'card-primary' }
      }
    },

    /* ===== 22 趣味扩展 ===== */
    {
      id: 22, type: 'grid', title: '🎨 难题后的放松 · 程序员的命名玄学', subtitle: '变量名背后的故事',
      chapterTag: '第 2 讲 · 知识讲解',
      data: {
        cards: [
          {
            icon: '🔤',
            title: '为什么用 i、j、k？',
            desc: '数学里求和用 <b>Σ</b>，下标是 <b>i</b>。<br>1957 年 FORTRAN 规定：以 I 到 N 开头的变量名自动是整数。<br>从此 <code>i</code>、<code>j</code>、<code>k</code> 就成了循环变量的默契。<br><b>70 年过去，还在用。</b>'
          },
          {
            icon: '🍫',
            title: '为什么用 foo、bar？',
            desc: '<b>foo</b> 来自二战雷达术语 FU（Fouled Up，一团糟）。<br><b>bar</b> 来自 1930 年代漫画《Smokey Stover》。<br>程序员把它们当"占位符"用——<br>不重要的名字，就叫 <code>foo</code>、<code>bar</code>、<code>baz</code>。'
          },
          {
            icon: '🐍',
            title: '为什么用 snake_case？',
            desc: '下划线式命名，如 <code>student_name</code>。<br>出自 C 语言、Python 风格。<br>优点是<b>清晰可读</b>——两个单词一眼分开。<br>Linux 内核、Python 官方代码都推荐这种风格。'
          },
          {
            icon: '🐪',
            title: '为什么用 camelCase？',
            desc: '驼峰式命名，如 <code>studentName</code>。<br>因为单词"高低起伏"像骆驼的驼峰。<br>出自 Java、JavaScript 风格。<br>据说最早是施乐公司的程序员发明的。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 好名字值千金',
          desc: '编程界有句名言：<b>"计算机科学只有两件难事——缓存失效和命名。"</b><br><br>为什么命名难？<br>· 名字太长：<code>the_total_number_of_students_in_class</code>——打字累<br>· 名字太短：<code>t</code>、<code>x</code>——看不懂什么意思<br>· 名字不准确：<code>count</code> 到底是"计数"还是"总数"？<br><br><b>好的命名三原则</b>：<br>① 见名知意<br>② 长度适中<br>③ 风格统一<br><br><b>冷知识</b>：Google 内部有一份"命名规范"，长达 200 多页。<br>程序员花在"想变量名"上的时间，比你想象的多得多。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 练习小结 ===== */
    {
      id: 23, type: 'dialog', title: '练习小结与答疑', subtitle: '小C点评三道练习', chapterTag: '第 2 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，练习 2 的交换我写成了 a = b; b = a;，结果不对。' },
          { who: 'robot', text: '这是经典陷阱。<br>执行 <code>a = b</code> 后，a 原来的值<b>被覆盖</b>了，<br>再执行 <code>b = a</code> 时，两边都是 b 的原值。<br><b>必须用临时变量 t 保存中间值。</b>' },
          { who: 'student', text: '练习 3 我用 int 写的，为什么答案错了？' },
          { who: 'robot', text: '因为数字超过了 int 的范围——21 亿。<br>题目说"每个数可达 10¹⁰"，10¹⁰ > 21 亿，<b>必须用 long long</b>。<br>这是竞赛中最高频的失分点。' },
          { who: 'student', text: '那怎么判断该用哪个类型？' },
          { who: 'robot', text: '看题目数据范围。<br>· ≤ 10⁹ → int<br>· > 10⁹ → long long<br><br>口诀：<b>不确定，就 long long。</b>' },
          { who: 'student', text: '明白了。变量定义时要注意什么？' },
          { who: 'robot', text: '三件事：<br>① <b>起个好名字</b>——见名知意<br>② <b>顺手初始化</b>——避免垃圾值<br>③ <b>选对类型</b>——防溢出<br>做到这三条，变量就稳了。' }
        ],
        extra: {
          title: '💡 三个核心要点回顾',
          desc: '① <b>起名</b>：见名知意，用英文单词<br>② <b>初始化</b>：定义时顺手给初值<br>③ <b>选类型</b>：大数用 long long<br><br>这三条是从新手到熟练的关键。<br>每次写代码前，先想清楚这三个问题，能避免 90% 的低级错误。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 课堂小测 ===== */
    {
      id: 24, type: 'quiz', title: '课堂小测', subtitle: '变量、输入与整数类型',
      chapterTag: '第 2 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: '2020 CSP-J 初赛 · 第 3 题',
            question: '以下哪个是 C++ 合法的变量名？',
            options: [
              { label: 'A', text: '<code>123name</code>' },
              { label: 'B', text: '<code>my_name</code>', correct: true },
              { label: 'C', text: '<code>my-name</code>' },
              { label: 'D', text: '<code>my name</code>' }
            ],
            analysis: 'C++ 变量名规则：<br>① 只能含字母、数字、下划线<br>② <b>不能以数字开头</b><br>③ 不能含空格或特殊符号（如 <code>-</code>）<br><br>A 以数字开头，错；B 合法；C 含 <code>-</code>，错；D 含空格，错。<br>这是本讲 slide-09"变量命名规则"的直接考查。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 数据类型',
            question: '<code>int</code> 类型在常见编译器中通常占用几个字节？',
            options: [
              { label: 'A', text: '1 字节' },
              { label: 'B', text: '2 字节' },
              { label: 'C', text: '4 字节', correct: true },
              { label: 'D', text: '8 字节' }
            ],
            analysis: '常见类型字节数：<br>· <code>int</code> = <b>4 字节</b>（32 位）<br>· <code>long long</code> = 8 字节<br>· <code>double</code> = 8 字节<br>· <code>char</code> / <code>bool</code> = 1 字节<br><br>这是初赛的高频考点，对应本讲 slide-17"初赛渗透：类型大小"。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 变量',
            question: '下面代码的输出是什么？',
            questionCode: `int a;
cout << a << endl;`,
            options: [
              { label: 'A', text: '0' },
              { label: 'B', text: '1' },
              { label: 'C', text: '垃圾值，不确定', correct: true },
              { label: 'D', text: '编译错误' }
            ],
            analysis: '未初始化的局部变量里是<b>垃圾值</b>，不是 0。<br>它的值取决于内存中残留的旧数据，结果不可预测。<br>所以定义变量时要养成初始化的好习惯：<code>int a = 0;</code>。<br>这是本讲 slide-08"未初始化变量的坑"的直接考查。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第二章',
            question: '变量名不能以数字开头。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: 'C++ 变量名规则：首字符必须是<b>字母或下划线</b>，不能是数字。<br>例如 <code>age</code>、<code>_count</code>、<code>a1</code> 都合法；<code>1a</code>、<code>123</code> 都不合法。<br>这是本讲 slide-09"变量命名规则"的核心内容。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 3,
            source: 'CSP-J 初赛真题练习 · 数据类型',
            question: '在 C++ 中，<code>int</code> 类型能存储的最大值约为 21 亿（2147483647）。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: 'int 占 4 字节（32 位），正负各占一半，最大正数是 <b>2³¹ - 1 = 2147483647</b>，约 21 亿。<br>超出这个范围就会"溢出"，结果变成错误的负数。<br>大数运算要用 <code>long long</code>。<br>这是本讲 slide-13"int 类型"的核心知识点。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛数据类型四大考点',
          desc: '<b>① 类型大小</b>：int = 4，long long = 8，char = 1<br><b>② 范围判断</b>：int 约 ±21 亿，超出要溢出<br><b>③ 命名规则</b>：字母数字下划线，不能数字开头<br><b>④ 未初始化</b>：局部变量是垃圾值，不是 0<br><br>这四类占了初赛类型题的 80%。<br><b>建议</b>：做初赛真题时，重点练这四类。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 今日总结 ===== */
    {
      id: 25, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '变量是带名字的盒子，类型是盒子的大小。',
        author: '—— 变量第一课',
        points: [
          '变量 = 名字 + 类型 + 值',
          '定义语法：类型 名字 = 初值;',
          'cin 输入：cin >> 变量;',
          '命名规则：字母数字下划线，不能数字开头',
          'int：4 字节，约 ±21 亿',
          'long long：8 字节，约 ±9×10¹⁸',
          'const 常量：值不可改变'
        ],
        highlight: { title: '📌 关键口诀', desc: '变量是盒子，名字要清晰；定义先初始化，cin 读数据；整数用 int，大数 long long；常量用 const，改它编译器会拦。' },
        extra: {
          title: '💡 今天你让程序学会了"记忆"',
          desc: '从只会"输出"到能"记住数据"，程序的能力又上了一个台阶。<br>变量是所有程序的基础——没有变量，就没有"计算"，就没有"判断"，就没有"算法"。<br>今天你已经掌握了编程最核心的工具之一。<br><br>🔮 <b>伏笔</b>：<br>· 变量只能存<b>一个</b>数据。如果要存 100 个呢？<br>· 数据除了整数，还有小数、字符、真假。<br>· 为什么 int 最大是 21 亿？为什么会有"溢出"？<br>这些问题的答案，会在后续讲次揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 课后作业 ===== */
    {
      id: 26, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P1001', link: 'https://www.luogu.com.cn/problem/P1001', desc: '<b>A+B Problem</b><br>考察：cin、变量、加法<br>难度：★<br>目标：读两个数，输出和' },
          { icon: '🟢', title: '基础 2 · P5703', link: 'https://www.luogu.com.cn/problem/P5703', desc: '<b>苹果采购</b><br>考察：变量、乘法<br>难度：★<br>目标：读两个数，输出乘积' },
          { icon: '🔴', title: '挑战 · B2033', link: 'https://www.luogu.com.cn/problem/B2033', desc: '<b>A*B Problem</b><br>考察：long long、结果范围预判<br>难度：★★<br>目标：输入 ≤ 50000，乘积超 int，选对类型' }
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
      id: 27, type: 'radial', title: '下节预告', subtitle: '第 3 讲 · 小数、字符、布尔与类型转换',
      data: {
        center: '类型',
        items: [
          { text: 'double 小数' },
          { text: 'char 字符' },
          { text: 'bool 布尔' },
          { text: '类型转换' }
        ],
        extra: {
          title: '💡 数据的多种面孔',
          desc: '今天学了整数，但程序世界里的数据远不止整数——<br>温度是小数、字母是字符、判断结果是真假。<br>下一讲，我们学习<b>更多类型</b>，以及它们之间的转换。<br><br>🔮 <b>远期彩蛋</b>：为什么 0.1 + 0.2 不等于 0.3？<br>为什么字符 \'A\' 是 65？<br>这些有趣的问题，第 22 讲从二进制讲起。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 答疑时间 ===== */
    {
      id: 28, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 2 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: 'int 和 long long 到底用哪个？' },
          { who: 'robot', text: '看数据范围。<br>≤ 10⁹ 用 int，超过就用 long long。<br>不确定时，优先 long long。' },
          { who: 'student', text: '变量忘了初始化会怎样？' },
          { who: 'robot', text: '里面的值是"垃圾值"——内存里残留的旧数据。<br>编译器不报错，但结果错。<br>所以定义变量就顺手给初值。' },
          { who: 'student', text: 'cin 后面接 getline 会出问题吗？' },
          { who: 'robot', text: '会。<code>cin</code> 读完会留下换行符，<code>getline</code> 会读到空行。<br>解决方法：cin 后加一句 <code>cin.ignore();</code>。<br>这是第 7 讲的内容。' },
          { who: 'student', text: 'const 和普通变量到底啥区别？' },
          { who: 'robot', text: 'const 定义后不能修改。<br>好处是：防止误改、提升可读性、便于维护。<br>固定不变的值（如 π、模数）都用 const。' },
          { who: 'student', text: '变量名能用中文吗？' },
          { who: 'robot', text: '理论上能（C++ 支持 Unicode），但<b>绝对不要</b>。<br>竞赛、工程、代码审查，都不允许中文变量名。<br>用英文单词，是行业的默契。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '变量是编程的地基。<br>初学者至少要写 <b>30 道变量题</b>才能熟练。<br>练习时不要"抄一遍就过"，要问自己：<br>· 为什么用这个类型？<br>· 名字起得清楚吗？<br>· 初始化了吗？<br>这三个问题想清楚，变量就掌握了。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 本讲英文单词 ===== */
    {
      id: 29, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 2 讲 · 复习',
      data: {
        words: [
          { word: 'int',       cn: '整数',   pron: '/ɪnt/',        origin: 'integer 的缩写',         category: '类型' },
          { word: 'long long', cn: '长整数', pron: '/lɒŋ lɒŋ/',    origin: 'long 重复两次表示更长',  category: '类型' },
          { word: 'cin',       cn: '输入',   pron: '/siː ɪn/',     origin: 'character input 的缩写', category: '函数' },
          { word: 'const',     cn: '常量',   pron: '/ˈkɒnstənt/',  origin: 'constant 的缩写',        category: '关键字' },
          { word: 'variable',  cn: '变量',   pron: '/ˈveəriəbl/',  origin: '英文原意"可变化的量"',   category: '概念' },
          { word: 'float',     cn: '单精度', pron: '/fləʊt/',      origin: '英文原意"浮动"',         category: '类型' }
        ],
        extra: {
          title: '💡 记忆法 · 缩写与词根',
          desc: '<b>缩写类</b>：<br><code>int</code> = <b>int</b>eger（整数）<br><code>cin</code> = <b>c</b>haracter <b>in</b>put（字符输入）<br><code>const</code> = <b>const</b>ant（常量）<br><br><b>组合类</b>：<br><code>long long</code> = long 重复两次，表示"更长的整数"<br><br><b>原意类</b>：<br><code>variable</code> = 可变化的量（变量）<br><code>float</code> = 浮动（小数点浮动）<br><br><b>易错拼写</b>：<br>· <code>long long</code> 中间有空格<br>· <code>const</code> 不要写成 <code>constant</code><br>· <code>int</code> 不是 <code>integer</code>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 30 知识清单 ===== */
    {
      id: 30, type: 'grid', title: '第 2 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 2 讲 · 复习',
      data: {
        cards: [
          { icon: '📦', title: '变量', desc: '<b>三要素</b>：名字、类型、值<br><b>定义</b>：<code>int age = 11;</code><br><b>命名</b>：字母数字下划线，不能数字开头<br><b>陷阱</b>：未初始化是垃圾值' },
          { icon: '📥', title: '输入 cin', desc: '<b>语法</b>：<code>cin &gt;&gt; 变量;</code><br><b>方向</b>：cin 用 &gt;&gt;，cout 用 &lt;&lt;<br><b>特点</b>：自动跳过空格、回车<br><b>暂停</b>：等用户输入' },
          { icon: '🔢', title: '整数类型', desc: '<b>int</b>：4 字节，约 ±21 亿<br><b>long long</b>：8 字节，约 ±9×10¹⁸<br><b>选择</b>：不确定用 long long<br><b>陷阱</b>：溢出得错误结果' },
          { icon: '🔒', title: '常量 const', desc: '<b>语法</b>：<code>const int MOD = 1000000007;</code><br><b>特点</b>：定义后不能改<br><b>好处</b>：可读、防误改、易维护<br><b>常用</b>：π、模数、最大长度' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<b>口诀</b>：变量是盒子，名字要清晰；定义先初始化，cin 读数据；整数用 int，大数 long long；常量用 const，改它编译器会拦。<br><b>四大错误</b>：① 名字起得乱 ② 忘了初始化 ③ 类型选错 ④ 命名违规。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P1001 A+B Problem<br><b>⭐⭐ 进阶</b>：P5703 苹果采购<br><b>⭐⭐⭐ 挑战</b>：P5704 字母转换<br><b>🔗 延伸</b>：洛谷搜索"入门 2"，挑 3 道变量题练手。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 31 结束页 ===== */
    {
      id: 31, type: 'ending', title: '第二讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你的程序从此有了"记忆"',
          desc: '从只会输出，到能记住数据，你的程序能力又跨了一大步。<br>变量是所有程序的基础——有了它，程序才能"运算""判断""循环"。<br>下一讲，我们认识更多的数据类型——小数、字符、布尔。<br>数据的家族，远比你想象的丰富。',
          variant: 'card-glow'
        }
      }
    }

  ]
};  
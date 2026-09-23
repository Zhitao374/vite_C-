export default {
  title: '第 3 讲 小数、字符、布尔与类型转换',
  subtitle: '数据的多种面孔',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '小数、字符、布尔与类型转换', subtitle: '数据的多种面孔', chapterTag: false,
      data: { accentWord: '类型', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 3 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '变量与整数类型',
      data: {
        items: [
          { icon: '📦', badge: '变量', title: '变量 = 盒子', desc: '三要素：名字、类型、值', points: ['定义先初始化', '命名见名知意', '未初始化是垃圾值'] },
          { icon: '📥', badge: '输入', title: 'cin 读入数据', desc: 'cin >> 变量;', points: ['自动跳过空格', '等用户输入', '方向是 >>'] },
          { icon: '🔢', badge: 'int', title: 'int 类型', desc: '4 字节，约 ±21 亿', points: ['最常用', '日常计数', '超范围会溢出'] },
          { icon: '📏', badge: 'long long', title: 'long long 类型', desc: '8 字节，约 ±9×10¹⁸', points: ['大数运算', '不确定优先用', 'long long 是两个单词'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '整数已经能算很多东西了，但世界不只是整数——<br>温度是 36.5、字母是 \'A\'、判断结果是"真假"。<br>这些数据怎么存？怎么用？这就是今天要学的。<br><br>🔮 <b>回收伏笔</b>：第 2 讲说过"数据除了整数，还有小数、字符、真假"，今天揭晓。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握数据的多种面孔',
      data: {
        cards: [
          { number: '01', title: '小数类型', desc: 'double、float 存小数' },
          { number: '02', title: '字符类型', desc: 'char 存单个字符，理解 ASCII' },
          { number: '03', title: '布尔类型', desc: 'bool 存真假，判断的基础' },
          { number: '04', title: '类型转换', desc: '自动转换、强制转换、整数除法陷阱' }
        ],
        extra: { title: '📖 知识扩展 · 为什么需要这么多类型', desc: '不同的数据，需要不同的"盒子"。<br>整数盒装整数，小数盒装小数，字符盒装字母。<br>如果只有一个类型，要么浪费空间，要么装不下。<br>C++ 提供了多种类型，让我们"按需选择"——<b>这是程序高效运行的基础。</b>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，认识数据的多种面孔',
      data: {
        items: [
          { icon: '📐', badge: '小数', title: '第一站 · double / float', desc: '小数数据的家', points: ['double 精度高', 'float 精度低', '竞赛首选 double'] },
          { icon: '🔤', badge: '字符', title: '第二站 · char', desc: '单个字符的家', points: ['单引号 \'A\'', '本质是 ASCII 码', '可转整数'] },
          { icon: '💡', badge: '布尔', title: '第三站 · bool', desc: '真假两个值', points: ['true = 1', 'false = 0', '判断的基础'] },
          { icon: '🔄', badge: '难点', title: '第四站 · 类型转换', desc: '不同类型之间转换', points: ['自动转换', '强制转换', '整数除法陷阱'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"类型大师"徽章。' }
      }
    },

    /* ===== 05 为什么要这么多类型 ===== */
    {
      id: 5, type: 'dialog', title: '为什么要这么多类型？', subtitle: '不同数据住不同的家', chapterTag: '第 3 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，int 不是挺好用的吗？为什么要学别的类型？' },
          { who: 'robot', text: '如果我让你存温度 36.5，用 int 行吗？' },
          { who: 'student', text: '不行吧，int 只能存整数。' },
          { who: 'robot', text: '对。如果硬存，36.5 会变成 36，小数部分丢了。' },
          { who: 'student', text: '那 \'A\' 呢？' },
          { who: 'robot', text: '字母也是。int 存 \'A\' 会变成一个数字 65——虽然能存，但语义就丢了。' },
          { who: 'student', text: '所以每种数据都有自己的类型？' },
          { who: 'robot', text: '对。整数用 int、小数用 double、字符用 char、真假用 bool。<br>不同类型，占的内存不同，能做的事也不同。<br><b>选对类型，是编程的基本功。</b>' }
        ],
        extra: {
          title: '📖 知识扩展 · 类型是"数字的身份证"',
          desc: '计算机内存里存的全是 <b>0 和 1</b>——它其实不知道什么是"整数""小数""字符"。<br>是<b>类型</b>告诉了计算机：<br>· 这段 0/1 该按整数解析<br>· 那段 0/1 该按小数解析<br>· 另一段 0/1 该按字符解析<br><br>同样一段二进制 <code>01000001</code>：<br>· 按 int 解析 → 65<br>· 按 char 解析 → \'A\'<br>· 按 bool 解析 → true<br><br><b>类型，就是数据的"身份证"</b>——告诉计算机该怎么读这段 0/1。<br><br>🔮 <b>伏笔</b>：为什么 \'A\' 是 65？为什么 0.1 存不准？这些问题的答案，第 22 讲从二进制讲起。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 类型总览 ===== */
    {
      id: 6, type: 'grid', title: 'C++ 常用数据类型总览', subtitle: '本讲学习 4 种，凑齐基础类型',
      data: {
        cards: [
          { icon: '📐', title: 'double · 双精度小数', desc: '<b>8 字节</b><br>精度约 15—17 位<br>温度、面积、平均值<br><b>竞赛首选</b>' },
          { icon: '📐', title: 'float · 单精度小数', desc: '<b>4 字节</b><br>精度约 6—7 位<br>内存紧张时用<br>竞赛极少用' },
          { icon: '🔤', title: 'char · 字符', desc: '<b>1 字节</b><br>单个字符：\'A\'、\'7\'<br>本质是 ASCII 码<br>可转整数' },
          { icon: '💡', title: 'bool · 布尔', desc: '<b>1 字节</b><br>只有两个值<br><b>true</b> = 1<br><b>false</b> = 0' }
        ],
        extra: {
          title: '📌 类型的"家族"',
          desc: 'C++ 的类型分两大类：<br><br><b>基本类型</b>（本讲学的）：<br>· 整数：int、long long<br>· 小数：float、double<br>· 字符：char<br>· 布尔：bool<br><br><b>复合类型</b>（后面学）：<br>· 数组、结构体、指针……<br><br>今天学了这 4 种，加上第 2 讲的 int/long long，<b>基础类型就凑齐了</b>。<br>后面的类型，都是在这些基础上"组合"出来的。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 double 小数 ===== */
    {
      id: 7, type: 'code-split', title: 'double · 小数的家', subtitle: '小数点带来的精度',
      data: {
        intro: '📖 <code>double</code> 是 double precision（双精度）的缩写。<br>存小数用它——写代码时直接写小数字面量，如 <code>3.14</code>。',
        codeFile: 'codes/lesson-03/double-type.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'double pi = 3.14159;', desc: '小数赋值给 double 变量' },
          { line: 7, title: 'double r = 2.5;', desc: '整数也可以赋给 double（会自动转成 2.0）' },
          { line: 8, title: 'double area = pi * r * r;', desc: 'double 之间运算，结果还是 double' }
        ],
        output: '19.6349',
        extra: {
          title: '📖 double vs float',
          desc: '<b>double</b>：8 字节，精度约 15—17 位，竞赛首选。<br><b>float</b>：4 字节，精度约 6—7 位，竞赛极少用。<br><br><b>为什么竞赛几乎总用 double？</b><br>· 精度高，几乎不用担心误差<br>· 内存代价小（相差 4 字节）<br>· OJ 题目通常按 double 精度设置误差范围<br><br><b>口诀</b>：<b>小数首选 double，不用犹豫</b>。<br><br>🔮 <b>伏笔</b>：为什么 0.1 + 0.2 不等于 0.3？这是浮点精度问题，第 20 讲 DP 前会详细讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 char 字符 ===== */
    {
      id: 8, type: 'code-split', title: 'char · 单个字符的家', subtitle: '单引号，1 字节',
      data: {
        intro: '📖 <code>char</code> 是 character（字符）的缩写。<br>用<b>单引号</b>包裹一个字符，如 <code>\'A\'</code>。<br>字符本质上是 ASCII 码——一个整数。',
        codeFile: 'codes/lesson-03/char-type.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'char grade = \'A\';', desc: '用单引号，1 个字符' },
          { line: 7, title: 'char letter = \'a\';', desc: '大小写字母是不同的字符' },
          { line: 10, title: '(int)grade', desc: '强制转整数，看到 \'A\' = 65' },
          { line: 11, title: '(int)letter', desc: '\'a\' = 97，大小写差 32' }
        ],
        output: 'A\na\n65\n97',
        extra: {
          title: '📖 单引号 vs 双引号',
          desc: '<b>单引号</b>：<code>\'A\'</code> 是字符（char），占 1 字节。<br><b>双引号</b>：<code>"A"</code> 是字符串（string），占多个字节。<br><br><b>常见错误</b>：<br>· <code>char c = "A";</code> ❌（双引号是字符串）<br>· <code>char c = \'AB\';</code> ❌（char 只能装 1 个字符）<br><br><b>记忆</b>：单引字符双引串。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 char 与 ASCII ===== */
    {
      id: 9, type: 'dialog', title: 'char 与 ASCII', subtitle: '字符背后的数字', chapterTag: '第 3 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，为什么 \'A\' 是 65？它明明是字母呀。' },
          { who: 'robot', text: '因为计算机只认识数字。要存 \'A\'，得先给每个字符"编号"。' },
          { who: 'student', text: '这个编号表叫什么？' },
          { who: 'robot', text: '<b>ASCII 码表</b>。1963 年制定的国际标准。<br>它规定了 128 个字符的编号。' },
          { who: 'student', text: '常用的有哪些？' },
          { who: 'robot', text: '<b>必背 3 组</b>：<br>· \'A\' = 65，\'Z\' = 90<br>· \'a\' = 97，\'z\' = 122<br>· \'0\' = 48，\'9\' = 57<br>还有：空格 = 32' },
          { who: 'student', text: '有什么规律？' },
          { who: 'robot', text: '大发现！<br>· 大写和小写相差 <b>32</b>（\'a\' - \'A\' = 32）<br>· 数字字符减 \'0\' 得到对应整数（\'7\' - \'0\' = 7）<br>这两个规律是竞赛中常用的技巧。' }
        ],
        extra: {
          title: '📖 ASCII 码表（重点区域）',
          desc: '<b>控制字符</b>（不显示）：0—31<br>如换行 10、Tab 9、回车 13<br><br><b>可打印字符</b>（32—126）：<br>· 空格：32<br>· 数字 \'0\'—\'9\'：48—57<br>· 大写 \'A\'—\'Z\'：65—90<br>· 小写 \'a\'—\'z\'：97—122<br><br><b>核心规律</b>：<br>① 大写 + 32 = 对应小写<br>② 小写 - 32 = 对应大写<br>③ 数字字符 - \'0\' = 对应整数<br><br><b>初赛必考</b>：ASCII 码值、大小写转换。<br><br>🔮 <b>伏笔</b>：为什么是 32 而不是 26？因为中间还留了 6 个符号位置。这个设计的细节，第 22 讲讲编码时揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 bool 布尔 ===== */
    {
      id: 10, type: 'code-split', title: 'bool · 只有真和假', subtitle: '判断的基础',
      data: {
        intro: '📖 <code>bool</code> 是 boolean（布尔）的缩写，只有两个值：<code>true</code> 和 <code>false</code>。<br>用整数角度看，<code>true = 1</code>，<code>false = 0</code>。',
        codeFile: 'codes/lesson-03/bool-type.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'bool is_pass = true;', desc: '布尔变量，赋值 true（真）' },
          { line: 7, title: 'bool is_rain = false;', desc: '赋值 false（假）' },
          { line: 9, title: 'cout << is_pass;', desc: '输出 1（true 显示为 1）' },
          { line: 10, title: 'cout << is_rain;', desc: '输出 0（false 显示为 0）' }
        ],
        output: '1\n0',
        extra: {
          title: '📖 bool 的名字来自数学家',
          desc: '<b>bool</b> 的名字来自 19 世纪数学家<a href="https://baike.baidu.com/item/乔治·布尔" target="_blank" class="wiki-link">乔治·布尔</a>。<br>他发明了一套"用 0 和 1 做逻辑运算"的代数——<b>布尔代数</b>。<br><br>当时没人觉得这有什么用。直到 100 年后，计算机出现了，工程师发现：<b>电路的通/断正好对应布尔的 1/0</b>。<br><br>今天所有计算机的底层逻辑，都是布尔代数。有人开玩笑说：布尔是"最超前 100 年的数学家"。<br><br><b>bool 的作用</b>：<br>· 存"是否成立"的判断结果<br>· 作为条件（后面学 if 用）<br>· 作为标志位（如"是否找到""是否闰年"）<br><br>🔮 <b>伏笔</b>：布尔代数的真/假，其实是电路的通/断。第 22 讲从开关讲到计算机。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 过渡页 ===== */
    {
      id: 11, type: 'transition', title: '第四站 · 类型转换', subtitle: '不同类型之间怎么转换',
      data: { note: '接下来学习本讲最重要的内容——类型转换，以及新手最容易踩的"整数除法陷阱"' }
    },

    /* ===== 12 类型转换答疑 ===== */
    {
      id: 12, type: 'dialog', title: '类型转换答疑', subtitle: '小C回答常见问题', chapterTag: '第 3 讲 · 类型转换',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果我把 int 赋值给 double，会出错吗？' },
          { who: 'robot', text: '不会。这叫<b>自动转换</b>——小类型自动升级为大类型。<br><code>double d = 5;</code> 等价于 <code>double d = 5.0;</code>' },
          { who: 'student', text: '反过来呢？double 赋值给 int？' },
          { who: 'robot', text: '可以，但会<b>丢掉小数部分</b>。<br><code>int a = 3.99;</code> 结果是 3，不是 4。' },
          { who: 'student', text: '那什么时候需要强制转换？' },
          { who: 'robot', text: '比如 <code>int a = 5, b = 2;</code>，我想算 <code>a / b</code> 得 2.5。<br>如果直接写 <code>a / b</code>，因为两边都是 int，结果是 2（整数除法）。<br>要得到 2.5，必须<b>强制转换</b>：<code>(double)a / b</code>。' },
          { who: 'student', text: '所以强制转换就是"手动指定类型"？' },
          { who: 'robot', text: '对。语法是 <code>(类型)变量</code>，比如 <code>(double)a</code>。<br>这是竞赛中<b>最常用</b>的技巧之一。' }
        ],
        extra: {
          title: '💡 自动转换的规则',
          desc: '<b>方向</b>：小类型 → 大类型，自动完成。<br><code>int → long long → double</code><br><br><b>反方向</b>（大 → 小）需要强制转换，可能丢数据。<br><code>double → int</code> 会丢掉小数部分（不是四舍五入，是<b>直接截断</b>）。<br><br><b>示例</b>：<br><code>int a = 3.99;</code> → a = 3<br><code>int b = (int)3.99;</code> → b = 3<br><br><b>注意</b>：丢掉的是"小数部分"，不是"四舍五入"。<br><code>int c = (int)3.99;</code> 还是 3，不是 4。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 自动转换 ===== */
    {
      id: 13, type: 'code-split', title: '自动转换 · 小类型自动升级', subtitle: '编译器帮你完成',
      data: {
        intro: '📖 范围小的类型可以自动转成范围大的类型：<code>int → double</code>。<br>不需要手动处理，编译器自动完成。',
        codeFile: 'codes/lesson-03/auto-convert.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int a = 5;', desc: 'a 是 int 类型' },
          { line: 7, title: 'double b = 2.0;', desc: 'b 是 double 类型' },
          { line: 8, title: 'double c = a / b;', desc: 'a 自动转成 double 再算，结果 2.5' }
        ],
        output: '2.5',
        extra: {
          title: '💡 自动转换的规则',
          desc: '<b>方向</b>：小类型 → 大类型<br>· <code>int → long long</code>（自动）<br>· <code>int → double</code>（自动）<br>· <code>float → double</code>（自动）<br>· <code>char → int</code>（自动，按 ASCII 码）<br>· <code>bool → int</code>（自动，true=1）<br><br><b>为什么叫"自动"？</b><br>因为方向是"安全的"——大类型能装下小类型的所有值，不会丢数据。<br><br><b>反方向</b>（大 → 小）不安全，编译器不帮你自动转，需要强制转换。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 强制转换 ===== */
    {
      id: 14, type: 'code-split', title: '强制转换 · 手动指定类型', subtitle: '语法：(类型)变量',
      data: {
        intro: '📖 用 <code>(类型)</code> 把变量临时转成另一种类型。<br>最常用的场景：把 int 转成 double，避免整数除法陷阱。',
        codeFile: 'codes/lesson-03/force-convert.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int a = 5, b = 2;', desc: '两个都是 int' },
          { line: 7, title: '(double)a', desc: '把 a 转成 double，b 自动跟着转' },
          { line: 7, title: '/ b', desc: '此时是 5.0 / 2.0 = 2.5' }
        ],
        output: '2.5',
        extra: {
          title: '💡 强制转换的两种写法',
          desc: '<b>写法 1</b>：<code>(double)a</code>  （C 风格）<br><b>写法 2</b>：<code>double(a)</code>  （函数式）<br><br>两种等价，竞赛中<b>写法 1 更常见</b>。<br><br><b>常见场景</b>：<br>· <code>(double)a / b</code>  —— 避免整数除法<br>· <code>(int)3.99</code>  —— 取整数部分（得 3）<br>· <code>(char)65</code>  —— 把数字转成字符（得 \'A\'）<br><br><b>注意</b>：强制转换是"临时的"，<b>不改变原变量</b>。<br><code>(double)a</code> 后，a 还是 int，只是参与运算时当 double 用。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 整数除法陷阱 ===== */
    {
      id: 15, type: 'compare', title: '整数除法陷阱', subtitle: '竞赛新手最容易踩的坑',
      data: {
        groups: [
          { wrong: '5 / 2 = 2（丢小数）', right: '5.0 / 2 = 2.5' },
          { wrong: '10 / 4 = 2', right: '(double)10 / 4 = 2.5' },
          { wrong: 'int avg = (a + b) / 2', right: 'double avg = (a + b) / 2.0' },
          { wrong: 'int ans = n * 3 / 2', right: 'double ans = n * 3 / 2.0' }
        ],
        extra: {
          title: '📖 为什么会出现这个问题',
          desc: 'C++ 有个规定：<b>两个整数相除，结果还是整数</b>——小数部分被"截断"（不是四舍五入）。<br><br><code>5 / 2</code> 的结果是 2，不是 2.5。<br><code>10 / 4</code> 的结果是 2，不是 2.5。<br><br><b>避坑指南</b>：<br>要小数结果，必须让至少一个操作数是小数类型：<br>· 写 <code>5.0</code> 而不是 <code>5</code><br>· 用 <code>(double)a</code> 强制转换<br><br><b>竞赛高频场景</b>：<br>· 计算平均值<br>· 计算比例<br>· 计算几何（距离、面积）<br><br><b>口诀</b>：<b>要小数，先转 double。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 类型转换小结 ===== */
    {
      id: 16, type: 'dialog', title: '类型转换小结', subtitle: '小C带同学复盘', chapterTag: '第 3 讲 · 类型转换',
      data: {
        lines: [
          { who: 'robot', text: '同学，我们来回看一下类型转换。' },
          { who: 'student', text: '好！' },
          { who: 'robot', text: 'int 赋值给 double，是自动还是强制？' },
          { who: 'student', text: '自动。小类型升级大类型。' },
          { who: 'robot', text: 'double 赋值给 int 呢？' },
          { who: 'student', text: '需要强制转换。会丢掉小数部分。' },
          { who: 'robot', text: '5 / 2 的结果？' },
          { who: 'student', text: '2！整数除法丢小数。要得 2.5 得写 5.0 / 2 或 (double)5 / 2。' },
          { who: 'robot', text: '非常好。你已经掌握了类型转换的核心了。' }
        ],
        extra: {
          title: '💡 三个核心要点',
          desc: '① <b>自动转换</b>：小 → 大，安全，不用管<br>② <b>强制转换</b>：大 → 小 或 混用，手动指定<br>③ <b>整数除法</b>：两个 int 相除，丢小数<br><br>这三条是竞赛中类型问题的核心。<br>记住一句话：<b>要小数，先转 double。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 常见错误 ===== */
    {
      id: 17, type: 'compare', title: '类型相关常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: 'char c = "A";（双引号）', right: 'char c = \'A\';（单引号）' },
          { wrong: 'int a = 3.99; 得到 3', right: 'double a = 3.99; 或明确 (int)3.99' },
          { wrong: '5 / 2 得到 2', right: '(double)5 / 2 得到 2.5' },
          { wrong: 'bool b = 2;（非 0 也可）', right: 'bool b = true;（用 true / false）' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>引号错</b>：char 用单引号，string 用双引号<br>② <b>赋值丢精度</b>：double 赋给 int 会截断小数<br>③ <b>整数除法</b>：两个 int 相除，丢小数部分<br>④ <b>bool 值</b>：虽然非 0 都是 true，但<b>推荐用 true/false</b> 更清晰<br><br><b>调试类型问题的三步</b>：<br>1. 看变量声明对不对<br>2. 看运算过程有没有混类型<br>3. 看输出类型是不是预期',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 练习1：圆的面积 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习1：圆的面积', subtitle: '用 double 和 const 计算', chapterTag: '第 3 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入圆的半径 <code>r</code>，输出圆的面积（保留 2 位小数）。<br>公式：<code>面积 = π × r²</code>，π 取 3.14159。<br>输入样例：<code>5</code>　输出样例：<code>78.5398</code>', timer: '⏱ 限时 6 分钟' },
        hints: [
          '用 <code>const double PI = 3.14159;</code>',
          '半径用 <code>double</code>',
          '面积 = <code>PI * r * r</code>'
        ],
        answer: { codeFile: 'codes/lesson-03/circle.cpp' },
        analysis: { title: '📖 解析', desc: '这是 <code>const</code> 和 <code>double</code> 的典型用法。<br>用常量定义 π，用 double 存小数。<br>计算过程都是 double，不需要额外转换。' },
        extra: { title: '📖 知识扩展 · 圆的面积', desc: '圆的面积公式 S = πr² 来自古希腊数学家<a href="https://baike.baidu.com/item/阿基米德" target="_blank" class="wiki-link">阿基米德</a>。<br>他用多边形逼近圆的方法计算 π，这是早期极限思想的雏形。<br>这个练习同时用到了 const、double、cin、cout，是本章的综合应用。<br><br><b>π 的精确值是 3.1415926535...</b><br>有趣的是，π 在数学上是个"无理数"——小数位无限且不循环。', variant: 'card-primary' }
      }
    },

    /* ===== 19 练习2：温度转换 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习2：温度转换', subtitle: '摄氏温度转华氏温度', chapterTag: '第 3 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入摄氏温度 <code>C</code>（可以是小数），输出对应的华氏温度。<br>公式：<code>F = C × 9.0 / 5.0 + 32</code><br>输入样例：<code>100</code>　输出样例：<code>212</code>', timer: '⏱ 限时 6 分钟' },
        hints: [
          '用 <code>double</code> 存温度',
          '公式里要写 <code>9.0 / 5.0</code> 而不是 <code>9 / 5</code>',
          '<code>9 / 5</code> 会得到 1（整数除法陷阱）'
        ],
        answer: { codeFile: 'codes/lesson-03/temperature.cpp' },
        analysis: { title: '📖 解析', desc: '必须写 <code>9.0 / 5.0</code>。<br>如果写 <code>9 / 5</code>，两个都是 int，结果是 1，<br>那 100°C 会算成 100 × 1 + 32 = 132°F（错的）。<br><br>正确公式：100 × 1.8 + 32 = 212°F。<br><b>整数除法陷阱的经典案例。</b>' },
        extra: { title: '📖 交叉学科 · 物理', desc: '摄氏温度以水的冰点 0°C、沸点 100°C 为基准。<br>华氏温度以冰点 32°F、沸点 212°F 为基准。<br>华氏和摄氏的转换比例是 9:5。<br>0°C = 32°F，100°C = 212°F。<br><br><b>1°C 的变化 = 1.8°F 的变化</b>。<br>有趣的是，-40°C = -40°F，这是两个温标的"交汇点"。', variant: 'card-primary' }
      }
    },

    /* ===== 20 练习3：整数除法 ===== */
    {
      id: 20, type: 'level-map', title: '课堂练习3：浮点除法', subtitle: '用强制转换避免整数除法', chapterTag: '第 3 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入两个正整数 <code>a</code> 和 <code>b</code>，输出 <code>a ÷ b</code> 的浮点结果。<br>输入样例：<code>10 3</code>　输出样例：<code>3.33333</code>', timer: '⏱ 限时 8 分钟' },
        hints: [
          '直接写 <code>a / b</code> 会得到整数结果（3）',
          '需要强制转换：<code>(double)a / b</code>',
          '或者写 <code>1.0 * a / b</code>，也行'
        ],
        answer: { codeFile: 'codes/lesson-03/divide.cpp' },
        analysis: { title: '📖 解析', desc: '关键在于<b>让除法变成浮点除法</b>。<br>两种写法都行：<br>· <code>(double)a / b</code>  —— 显式强制转换<br>· <code>1.0 * a / b</code>  —— 乘以 1.0 再除<br><br>本质相同：<b>让至少一个操作数变成 double</b>，除法就会按小数规则算。<br><br><b>口诀</b>：要小数，先转 double。' },
        extra: { title: '📖 知识扩展 · 分数与小数的故事', desc: '在古代，人们更习惯用分数——1/3、2/7，简洁又精确。<br>小数的历史要晚得多——<b>16 世纪</b>，比利时数学家西蒙·斯蒂文才系统引入小数。<br><br>为什么？因为小数有个"坑"——<b>不是所有分数都能精确表示成有限小数</b>。<br>· 1/2 = 0.5 ✅<br>· 1/4 = 0.25 ✅<br>· 1/3 = 0.333... ❌ 无限循环<br><br>计算机存储浮点数也有这个问题——<b>0.1 在二进制里是无限循环的</b>。<br>这就是为什么 <code>0.1 + 0.2 ≠ 0.3</code>。第 20 讲会详细讲。', variant: 'card-primary' }
      }
    },

    /* ===== 21 练习小结 ===== */
    {
      id: 21, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 3 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，我练习 2 写成 9 / 5 了，结果算错了。' },
          { who: 'robot', text: '这是经典陷阱。<br>两个 int 相除，结果还是 int——<code>9 / 5 = 1</code>，不是 1.8。<br><b>要小数，必须让至少一个操作数是 double。</b>' },
          { who: 'student', text: '练习 3 我用 <code>(double)a / b</code>，通过了。' },
          { who: 'robot', text: '很好。这就是"要小数，先转 double"的实践。<br>也可以用 <code>1.0 * a / b</code>——本质一样。' },
          { who: 'student', text: '那什么时候用 int，什么时候用 double？' },
          { who: 'robot', text: '看数据：<br>· 整数运算（计数、编号）用 int<br>· 小数运算（温度、面积、平均值）用 double<br>· 不确定时，宁可 double<br><br>错误用类型，是竞赛最"冤"的失分。' },
          { who: 'student', text: '明白了。' },
          { who: 'robot', text: '记住口诀：<b>整数不急用 int，小数首选 double；要小数先转 double，整数除法要小心。</b>' }
        ],
        extra: {
          title: '💡 三道练习回顾',
          desc: '<b>练习 1（圆面积）</b>：复习 const + double，巩固上一讲内容。<br><b>练习 2（温度转换）</b>：整数除法陷阱的经典案例。<br><b>练习 3（浮点除法）</b>：强制转换的直接应用。<br><br>这三道题，覆盖了本讲最核心的知识点——<b>类型选择 + 类型转换</b>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 初赛渗透 ===== */
    {
      id: 22, type: 'dialog', title: '初赛小知识：类型与 ASCII', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 3 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考今天的内容吗？' },
          { who: 'robot', text: '会，而且有两类高频考点——<b>类型大小</b>和 <b>ASCII 码</b>。' },
          { who: 'student', text: '类型大小怎么考？' },
          { who: 'robot', text: '常问某个类型占几字节。全部记牢：<br>· <code>int</code> = 4、<code>long long</code> = 8<br>· <code>double</code> = 8、<code>float</code> = 4<br>· <code>char</code> = 1、<code>bool</code> = 1' },
          { who: 'student', text: 'ASCII 码呢？' },
          { who: 'robot', text: '常问"某个字符的 ASCII 值"或"大小写字母差多少"。<br>必背：<br>· \'A\' = 65，\'a\' = 97<br>· \'0\' = 48<br>· 空格 = 32<br>· 大小写差 = 32' },
          { who: 'student', text: '还有别的吗？' },
          { who: 'robot', text: '还有：整数除法陷阱、强制转换语法、bool 的输出。<br>这些都是初赛的送分题，一定要拿下。' }
        ],
        extra: {
          title: '📖 初赛类型题三大考点',
          desc: '<b>① 类型大小</b>：int/long long/double/char 各占多少字节<br><b>② ASCII 码</b>：常用字符的值、大小写差 32<br><b>③ 类型转换</b>：自动 vs 强制、整数除法<br><br><b>解题技巧</b>：<br>· 类型大小题：直接背<br>· ASCII 题：记住 65/97/48，其他推算<br>· 转换题：看运算双方类型，判断结果类型<br><br>这三类占初赛基础题的 30%，是送分题，<b>必须全对</b>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 课堂小测 ===== */
    {
      id: 23, type: 'quiz', title: '课堂小测', subtitle: '小数、字符、布尔与类型转换',
      chapterTag: '第 3 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 数据类型',
            question: '<code>double</code> 类型在常见编译器中占用几个字节？',
            options: [
              { label: 'A', text: '1 字节' },
              { label: 'B', text: '4 字节' },
              { label: 'C', text: '8 字节', correct: true },
              { label: 'D', text: '16 字节' }
            ],
            analysis: '常见类型字节数：<br>· <code>int</code> = 4<br>· <code>long long</code> = 8<br>· <code>double</code> = <b>8</b><br>· <code>float</code> = 4<br>· <code>char</code> / <code>bool</code> = 1<br><br>这是本讲 slide-06"类型总览"的直接考查。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第二章',
            question: '字符 <code>\'A\'</code> 的 ASCII 码值是多少？',
            options: [
              { label: 'A', text: '60' },
              { label: 'B', text: '65', correct: true },
              { label: 'C', text: '80' },
              { label: 'D', text: '97' }
            ],
            analysis: '常用 ASCII 码：<br>· <code>\'A\'</code> = <b>65</b>，<code>\'Z\'</code> = 90<br>· <code>\'a\'</code> = 97，<code>\'z\'</code> = 122<br>· <code>\'0\'</code> = 48，<code>\'9\'</code> = 57<br>· 空格 = 32<br><br>大小写字母相差 <b>32</b>。这是本讲 slide-09"char 与 ASCII"的核心内容。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 类型转换',
            question: '下面代码的输出是什么？',
            questionCode: `int a = 5, b = 2;
double c = a / b;
cout << c << endl;`,
            options: [
              { label: 'A', text: '2.5' },
              { label: 'B', text: '2', correct: true },
              { label: 'C', text: '3' },
              { label: 'D', text: '编译错误' }
            ],
            analysis: '关键：<code>a / b</code> 是<b>整数除法</b>——a 和 b 都是 int，结果是 2（不是 2.5）。<br>然后再把 2 赋给 double c，c 就是 2.0。<br><br>要得到 2.5，必须写 <code>(double)a / b</code>。<br>这是本讲 slide-15"整数除法陷阱"的核心知识点。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第二章',
            question: '在 C++ 中，<code>bool</code> 类型只有 <code>true</code> 和 <code>false</code> 两个值。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: 'bool 类型的设计就是"真/假"二值。<br>从整数角度看，<code>true</code> = 1，<code>false</code> = 0。<br>虽然 C++ 允许 <code>bool b = 2;</code>（非 0 都算 true），但<b>推荐用 true/false</b>，更清晰。<br>这是本讲 slide-10"bool 布尔"的核心内容。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 3,
            source: 'CSP-J 初赛真题练习 · 类型转换',
            question: '<code>(int)3.99</code> 的结果是 4。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '强制转换 double → int 是<b>截断小数部分</b>，不是四舍五入。<br><code>(int)3.99</code> = <b>3</b>，不是 4。<br>要四舍五入，需要 <code>(int)(3.99 + 0.5)</code> 或 <code>round(3.99)</code>。<br>这是本讲 slide-12"类型转换答疑"的核心知识点。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 浮点数的"秘密"',
          desc: '为什么 <code>0.1 + 0.2 ≠ 0.3</code>？<br><br>因为计算机用<b>二进制</b>存储小数，而 0.1 在二进制里是"无限循环小数"——就像十进制里的 1/3 = 0.333...。<br><br>所以 0.1 在计算机里其实是个"近似值"。两个近似值加起来，就不精确。<br><br><b>竞赛中的处理</b>：<br>· 比较小数是否相等：<code>fabs(a - b) &lt; 1e-8</code>（不是直接 ==）<br>· 输出固定位数：用 <code>setprecision</code>（后面学）<br><br>这是所有编程语言的共同问题，不是 C++ 的缺陷。<br><br>🔮 <b>伏笔</b>：为什么小数存不准？第 20 讲讲 DP 时会详细展开。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 今日总结 ===== */
    {
      id: 24, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '选对类型，数据才能住得舒服。',
        author: '—— 数据类型第二课',
        points: [
          'double 存小数，8 字节，精度 15—17 位',
          'char 存单个字符，本质是 ASCII 码',
          'bool 存真假，true = 1，false = 0',
          '自动转换：小类型 → 大类型',
          '强制转换：(类型)变量，如 (double)a',
          '整数除法陷阱：要小数先转 double'
        ],
        highlight: { title: '📌 关键口诀', desc: '整数用 int，大数 long long，小数 double，真假 bool；自动转换小到大，强制转换手动标；要小数，先转 double。' },
        extra: {
          title: '💡 类型是编程的基本功',
          desc: '类型选错，程序可能算出错误答案，甚至崩溃。<br>CSP-J/S 很多 WA，都是因为类型问题。<br>熟练掌握类型，就掌握了竞赛的基本功。<br><br>今天你已经认识了数据的<b>大部分面孔</b>——整数、小数、字符、真假。<br>下一讲，我们学习如何让程序"做判断"——运算符与分支。<br><br>🔮 <b>伏笔</b>：<br>· 变量只能存一个数据，100 个怎么办？→ 第 6 讲数组<br>· 字符本质是数字，那字符串呢？→ 第 7 讲字符串<br>· 类型转换背后的二进制原理，第 22 讲讲',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课后作业 ===== */
    {
      id: 25, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P5708', link: 'https://www.luogu.com.cn/problem/P5708', desc: '<b>三角形面积</b><br>考察：double、海伦公式<br>难度：★★<br>目标：读三边长，输出面积' },
          { icon: '🟢', title: '基础 2 · B2029', link: 'https://www.luogu.com.cn/problem/B2029', desc: '<b>大象喝水</b><br>考察：double、向上取整<br>难度：★★<br>目标：计算需要多少桶水' },
          { icon: '🔴', title: '挑战 · P3954', link: 'https://www.luogu.com.cn/problem/P3954', desc: '<b>成绩</b><br>考察：小数、强制转换<br>难度：★★<br>目标：加权平均分计算' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 下节预告 ===== */
    {
      id: 26, type: 'radial', title: '下节预告', subtitle: '第 4 讲 · 运算符与分支',
      data: {
        center: '分支',
        items: [
          { text: '算术运算符' },
          { text: '关系运算符' },
          { text: '逻辑运算符' },
          { text: 'if / else' }
        ],
        extra: {
          title: '💡 让程序学会判断',
          desc: '目前程序只会从头到尾执行一遍。<br>如果让它"做判断"——比如"成绩及格就输出及格"——需要新的语法。<br>下一讲，程序将学会思考——运算符与分支结构。<br><br>🔮 <b>远期彩蛋</b>：运算符里还藏着一位"隐形高手"——位运算，它直接操作二进制。第 21 讲揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 答疑时间 ===== */
    {
      id: 27, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 3 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: 'double 和 float 到底用哪个？' },
          { who: 'robot', text: '竞赛几乎总是 double。<br>float 精度太低，只在内存紧张时用。<br><b>口诀：小数首选 double。</b>' },
          { who: 'student', text: 'char 能存中文吗？' },
          { who: 'robot', text: '不能。char 只能存 1 字节，中文通常占 2—3 字节。<br>中文字符串要用 <code>string</code>——第 7 讲讲。' },
          { who: 'student', text: 'bool 输出为什么是 1 和 0？' },
          { who: 'robot', text: '因为底层就是整数。<br>true = 1，false = 0，只是显示时按整数输出。<br>可以强制转换：<code>(int)true</code> 得到 1。' },
          { who: 'student', text: '为什么 (int)3.99 = 3 不是 4？' },
          { who: 'robot', text: '强制转换是"<b>截断</b>"，不是"四舍五入"。<br>3.99 截掉小数部分就是 3。<br>要四舍五入，得用 <code>round()</code> 函数。' },
          { who: 'student', text: '那我怎么避免整数除法陷阱？' },
          { who: 'robot', text: '一个习惯：<b>做除法前，先问自己"要不要小数"</b>。<br>要小数 → 至少一个操作数写小数形式（如 5.0）或用 (double)。<br>不要小数 → 直接 int 除。<br>养成这个习惯，就不会踩坑。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '类型是编程的地基。<br>初学者至少要写 <b>20 道类型题</b>才能熟练。<br>练习时注意：<br>· 明确每个变量该用什么类型<br>· 遇到除法，先判断要不要小数<br>· 遇到不同类运算，检查转换方向<br>这三条把握住，类型就掌握了。',
          variant: 'card-primary'
        }
      }
    },
    
    /* ===== 28 本讲英文单词 ===== */
    {
      id: 28, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 3 讲 · 复习',
      data: {
        words: [
          { word: 'double', cn: '双精度小数', pron: '/ˈdʌbl/',  origin: '英文原意"双倍"',              category: '类型' },
          { word: 'float',  cn: '单精度小数', pron: '/fləʊt/',  origin: '英文原意"浮动"',              category: '类型' },
          { word: 'char',   cn: '字符',       pron: '/kɑːr/',   origin: 'character 的缩写',           category: '类型' },
          { word: 'bool',   cn: '布尔',       pron: '/buːl/',   origin: '数学家 George Boole 的名字', category: '类型' },
          { word: 'true',   cn: '真',         pron: '/truː/',   origin: '英文原意"真的"',              category: '关键字' },
          { word: 'false',  cn: '假',         pron: '/fɔːls/',  origin: '英文原意"假的"',              category: '关键字' },
          { word: 'ASCII',  cn: '美国信息交换标准码', pron: '/ˈæski/', origin: '缩写，1963 年标准',    category: '概念' }
        ],
        extra: {
          title: '💡 记忆法 · 缩写与原意',
          desc: '<b>缩写类</b>：<br><code>char</code> = <b>char</b>acter（字符）<br><code>ASCII</code> = <b>A</b>merican <b>S</b>tandard <b>C</b>ode for <b>I</b>nformation <b>I</b>nterchange<br><br><b>原意类</b>：<br><code>double</code> = 双倍（精度是 float 的 2 倍）<br><code>float</code> = 浮动（小数点位置浮动）<br><code>true</code> = 真的、<code>false</code> = 假的<br><br><b>人名类</b>：<br><code>bool</code> = 纪念数学家 George <b>Boole</b>（布尔）<br><br><b>易错拼写</b>：<br>· <code>bool</code> 不是 <code>boolean</code><br>· <code>char</code> 不是 <code>character</code><br>· <code>ASCII</code> 全大写<br><br><b>发音</b>：<code>char</code> 读 "car"（车），<code>bool</code> 读 "bull"（公牛）。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 知识清单 ===== */
    {
      id: 29, type: 'grid', title: '第 3 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 3 讲 · 复习',
      data: {
        cards: [
          { icon: '📐', title: '小数类型', desc: '<b>double</b>：8 字节，精度 15—17 位<br><b>float</b>：4 字节，精度 6—7 位<br><b>推荐</b>：竞赛首选 double<br><b>陷阱</b>：0.1 + 0.2 ≠ 0.3' },
          { icon: '🔤', title: '字符与布尔', desc: '<b>char</b>：单引号 \'A\'，1 字节<br>本质是 ASCII 码<br><b>bool</b>：true = 1，false = 0<br>判断的基础' },
          { icon: '🔄', title: '类型转换', desc: '<b>自动</b>：小 → 大（int → double）<br><b>强制</b>：<code>(double)a</code><br><b>截断</b>：double → int 丢小数<br><b>口诀</b>：要小数先转 double' },
          { icon: '📌', title: 'ASCII 必背', desc: '<b>\'A\'</b> = 65，<b>\'Z\'</b> = 90<br><b>\'a\'</b> = 97，<b>\'z\'</b> = 122<br><b>\'0\'</b> = 48，<b>\'9\'</b> = 57<br>大小写差 <b>32</b>' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<b>口诀</b>：整数用 int，大数 long long，小数 double，真假 bool；自动转换小到大，强制转换手动标；要小数，先转 double。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P5708 三角形面积<br><b>⭐⭐ 进阶</b>：B2029 大象喝水<br><b>⭐⭐⭐ 挑战</b>：P3954 成绩<br><b>🔗 延伸</b>：洛谷搜索"入门 1"，挑 3 道小数题练手。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第三讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你已经认识了数据的多种面孔',
          desc: '从整数到小数、字符、布尔，数据的家族越来越丰富了。<br>每种数据都有自己的"家"，每种类型都有自己的"性格"。<br>下一讲，我们让程序学会"判断"——运算符与分支结构。<br>程序将第一次学会"做选择"。',
          variant: 'card-glow'
        }
      }
    }

  ]
};
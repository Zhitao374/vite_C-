export default {
  title: '第 2 讲 数据类型',
  subtitle: '给数据找个家',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '数据类型', subtitle: '给数据找个家', chapterTag: false,
      data: { accentWord: '数据', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 2 讲'] }
    },

    /* ===== 02 上节课回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '我们已经学会了什么',
      data: {
        items: [
          { icon: '👋', badge: '程序结构', title: '第一个程序', desc: 'Hello, World! 程序结构与编译运行', points: ['头文件', '主函数', 'cout 输出', 'return 0'] },
          { icon: '📤', badge: '输出', title: '输出 cout', desc: 'cout 输出内容，endl 换行', points: ['连续输出', '输出计算', '\\n 更快'] },
          { icon: '📥', badge: '输入', title: '输入 cin', desc: 'cin 从键盘读取数据', points: ['程序暂停等输入', '自动跳过空格', '类型要匹配'] },
          { icon: '🏆', badge: 'OJ', title: 'OJ 提交', desc: '注册、提交、看判题结果', points: ['AC 通过', 'WA 答案错', 'CE 编译错', 'TLE 超时'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '程序里怎么记住用户输入的数字？怎么区分整数和小数？这些问题，今天都会解答。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步给数据找到合适的家',
      data: {
        cards: [
          { number: '01', title: '理解变量', desc: '变量是什么？为什么需要它？' },
          { number: '02', title: '认识类型', desc: 'int、long long、double、char、bool' },
          { number: '03', title: '定义变量', desc: '定义、赋值、初始化、命名规则' },
          { number: '04', title: '类型转换', desc: '自动转换、强制转换、整数除法陷阱' }
        ],
        extra: { title: '📖 知识扩展 · 类型的重要性', desc: '数据类型选错，程序可能算出错误答案。比如用 int 存 100 亿，会溢出变成负数。<br>CSP-J/S 复赛中，很多"看起来对但结果错"的程序，都栽在类型上。' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，给数据安家',
      data: {
        items: [
          { icon: '🧠', badge: '基础', title: '第一站 · 变量的概念', desc: '什么是变量、为什么需要变量', points: ['变量 = 带名字的盒子', '内存与地址', '见名知意的命名习惯'] },
          { icon: '🔢', badge: '核心', title: '第二站 · 常用数据类型', desc: 'int / long long / double / char / bool 全解析', points: ['int 约 ±21 亿', '大数用 long long', '小数首选 double', 'char 与 bool 各有用途'] },
          { icon: '✏️', badge: '关键', title: '第三站 · 定义与赋值', desc: '定义语法、命名规则、赋值与初始化', points: ['语法：类型 名字 = 初值;', '未初始化会踩坑', '常量 const 不改变'] },
          { icon: '🔄', badge: '难点', title: '第四站 · 类型转换', desc: '自动转换、强制转换、整数除法陷阱', points: ['int → double 自动升级', '5/2 = 2 不是 2.5', '浮点精度问题要小心'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关后解锁"数据类型大师"徽章。' }
      }
    },

    /* ===== 05 什么是变量（伏笔：0/1、地址二进制） ===== */
    {
      id: 5, type: 'dialog', title: '什么是变量？', subtitle: '给数据找一个有名字的家', chapterTag: '第 2 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，程序里怎么记住用户输入的数字？' },
          { who: 'robot', text: '用变量。变量就像一个带名字的盒子，把数据装进去，下次用的时候直接喊名字。' },
          { who: 'student', text: '为什么要给盒子起名字？' },
          { who: 'robot', text: '因为计算机内存像一个大仓库，每个格子都有地址。你不想记地址吧？起个名字，比如 age、score，就方便多了。' },
          { who: 'student', text: '那地址是数字吗？' },
          { who: 'robot', text: '是，而且是一串 <b>0 和 1</b> 组成的二进制数。第 35 讲会详细讲。🔮' },
          { who: 'student', text: '那我起名叫 a 可以吗？' },
          { who: 'robot', text: '可以。但名字最好"见名知意"。age 比 a 清晰，score 比 b 清晰。程序是写给人看的，顺便让电脑跑起来。' }
        ],
        extra: {
          title: '📖 知识扩展 · 变量的本质',
          desc: '变量其实是内存里的一小块空间，变量名是这个空间的别名。程序运行时，计算机会给每个变量分配一个地址。<br>就像酒店房间有门牌号，但你不需要记门牌号，只要记住"小明的房间"就够了。<br><b>变量名就是数据的别名。</b><br><br>🔮 <b>伏笔</b>：仓库的"门牌号"到底是什么？其实是一串二进制数。第 35 讲揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 为什么需要数据类型 ===== */
    {
      id: 6, type: 'dialog', title: '为什么需要不同的数据类型？', subtitle: '不同的数据，住不同的盒子', chapterTag: '第 2 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '为什么盒子还要分类型？全部用一种不行吗？' },
          { who: 'robot', text: '不行。整数和小数需要不同的存储方式。整数住小格子，小数住精密容器。' },
          { who: 'student', text: '如果装错了会怎么样？' },
          { who: 'robot', text: '小盒子装大东西会溢出，数据损坏；大盒子装小东西浪费空间。就像用矿泉水瓶装大象，装不下。' },
          { who: 'student', text: '那最大的整数是多少？' },
          { who: 'robot', text: '常用 <code>int</code> 最大约 21 亿。超出就要用 <code>long long</code>，能存到 9 × 10¹⁸。竞赛题经常遇到大数，必须小心。' }
        ],
        extra: {
          title: '📖 知识扩展 · 数据类型的重要性',
          desc: '类型选错，程序可能算出错误答案，甚至崩溃。CSP-J/S 复赛里，很多错误都是因为类型选错导致的。<br>比如用 <code>int</code> 存 100 亿，会溢出变成负数；用 <code>int</code> 存小数，会丢掉小数部分。<br><b>选对类型，是竞赛的第一步。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 数据类型总览 ===== */
    {
      id: 7, type: 'grid', title: 'C++ 常用基础数据类型', subtitle: '4 大类 · 6 种类型，各有各的家',
      data: {
        cards: [
          { icon: '🔢', title: '整数类型', desc: '<b>int</b> · 4 字节 · 约 ±21 亿<br>普通整数，日常计数、累加<br><b>long long</b> · 8 字节 · 约 ±9×10¹⁸<br>大整数，竞赛必备' },
          { icon: '📐', title: '浮点类型', desc: '<b>float</b> · 4 字节 · 精度 6—7 位<br>单精度小数，竞赛极少用<br><b>double</b> · 8 字节 · 精度 15—17 位<br>双精度小数，竞赛首选' },
          { icon: '🔤', title: '字符类型', desc: '<b>char</b> · 1 字节 · 单个字符<br>如 \'A\'、\'7\'、\'!\'<br>本质是 ASCII 码，可转整数<br>常见 ASCII：\'A\'=65，\'a\'=97' },
          { icon: '💡', title: '布尔类型', desc: '<b>bool</b> · 1 字节 · 只有两个值<br><b>true</b> = 1（真）<br><b>false</b> = 0（假）<br>用于判断、标志位，可参与整数运算' }
        ],
        extra: { title: '📌 竞赛高频提醒', desc: '涉及大数运算（人口统计、天文数字）时，普通 int 会溢出，必须用 long long。<br>选错类型是最常见的失分点之一。' }
      }
    },

    /* ===== 08 int 与 long long（伏笔：int 21 亿） ===== */
    {
      id: 8, type: 'split', title: '整数类型：int 与 long long', subtitle: '日常用 int，大数用 long long',
      data: {
        left: { icon: '🔢', float: true },
        right: {
          items: [
            { title: 'int · 普通整数', desc: '4 字节，约 ±21 亿（2³¹-1）<br>计数、累加、数组下标、编号' },
            { title: 'long long · 大整数', desc: '8 字节，约 ±9×10¹⁸（2⁶³-1）<br>大数运算、阶乘、人口统计、天文数字' },
            { title: '选择建议', desc: '10⁹ 以内用 int，超过就用 long long<br>竞赛中不确定时，优先用 long long' },
            { title: '内存类比', desc: 'int 像中等行李箱，日常够用<br>long long 像大衣柜，什么都能装' }
          ]
        },
        extra: {
          title: '📖 知识扩展 · 为什么 int 最大是 21 亿',
          desc: 'int 占 32 位二进制，能表示 2³² 个数。正负各一半，所以最大正数是 <b>2³¹-1 = 2147483647</b>（约 21 亿）。<br>这个数字是计算机科学的经典数字。做题时如果答案可能超过它，就要换 long long。<br><b>记忆技巧</b>：long long 是 int 的两倍字节，范围大约是 int 的 40 亿倍。<br><br>🔮 <b>伏笔</b>：int 最大 21 亿，到底怎么算出来的？第 35 讲用二进制给你算一遍。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 double 与 float（伏笔：浮点精度） ===== */
    {
      id: 9, type: 'split', title: '浮点类型：double 与 float', subtitle: '小数首选 double',
      data: {
        left: { icon: '📐', float: true },
        right: {
          items: [
            { title: 'double · 双精度小数', desc: '8 字节，有效数字约 15—17 位<br>温度、面积、平均值、π' },
            { title: 'float · 单精度小数', desc: '4 字节，有效数字约 6—7 位<br>精度较低，竞赛极少用' },
            { title: '写法', desc: '直接写小数，如 3.14、0.5、1.0<br>整数后加 .0 也能被识别' },
            { title: '选择建议', desc: '竞赛首选 double，几乎不担心精度<br>float 只在内存紧张、精度要求很低时用' }
          ]
        },
        extra: {
          title: '📖 知识扩展 · 浮点数的"浮"是什么意思',
          desc: '为什么叫"浮点数"？因为小数点的位置是<b>浮动</b>的。<br>同一个二进制数，可以表示很大范围的数，但精度有限。就像一把弹性尺子，量程大了，刻度就粗了。<br>float 的精度只有 6—7 位，double 有 15—17 位。竞赛中，几乎总是用 double。<br><b>记住：小数首选 double，不用犹豫。</b><br><br>🔮 <b>伏笔</b>：为什么 0.1 + 0.2 不等于 0.3？第 21 讲会揭晓，第 35 讲从二进制讲起。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 char（伏笔：ASCII） ===== */
    {
      id: 10, type: 'split', title: '字符类型：char', subtitle: '单个字符的家',
      data: {
        left: { icon: '🔤', float: true },
        right: {
          items: [
            { title: '定义', desc: 'char 是 character（字符）的缩写，用来存储单个字符' },
            { title: '写法', desc: '用单引号，如 \'A\'、\'7\'、\'!\'，注意不是双引号' },
            { title: '占用空间', desc: '1 个字节，取值范围 -128 到 127' },
            { title: '本质', desc: '存储的是字符对应的 ASCII 码，可以强制转换成整数查看' }
          ]
        },
        extra: {
          title: '📖 知识扩展 · 单引号 vs 双引号 + ASCII',
          desc: '<b>单引号</b>：\'A\' 是字符（char），占 1 字节；<br><b>双引号</b>："A" 是字符串（string），占 2 字节（含结尾的 \'\\0\'）。<br><b>常见 ASCII 码</b>：\'A\' = 65，\'a\' = 97，\'0\' = 48。大小写字母相差 32，数字字符和整数相差 48。<br><b>小技巧</b>：把字符转整数用 <code>(int)ch</code>，把整数转字符用 <code>(char)n</code>。<br><br>🔮 <b>伏笔</b>：为什么 \'A\' 是 65、\'a\' 是 97？这张"字符身份证"叫 <b>ASCII 表</b>，第 35 讲专门讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 bool（伏笔：布尔代数/电路） ===== */
    {
      id: 11, type: 'split', title: '布尔类型：bool', subtitle: '只有真和假',
      data: {
        left: { icon: '💡', float: true },
        right: {
          items: [
            { title: '定义', desc: 'bool 只有两个值：true 和 false，用于逻辑判断' },
            { title: '占用空间', desc: '1 个字节' },
            { title: '数值对应', desc: 'true = 1，false = 0，可以参与整数运算' },
            { title: '适用场景', desc: '判断、条件、标志位，如"是否通过""是否闰年"' }
          ]
        },
        extra: {
          title: '📖 知识扩展 · 布尔代数的故事',
          desc: 'bool 的名字来自 19 世纪数学家<b>乔治·布尔</b>。他发明了一套"用 0 和 1 做逻辑运算"的代数——布尔代数。<br>当时没人觉得这有什么用。直到 100 年后，计算机出现了，工程师发现：<b>电路的通/断正好对应布尔的 1/0</b>。<br>今天所有计算机的底层逻辑，都是布尔代数。有人开玩笑说：布尔是"最超前 100 年的数学家"。<br><br>🔮 <b>伏笔</b>：布尔代数的真/假，其实是电路的通/断。第 35 讲从开关讲到计算机。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 变量命名规则 ===== */
    {
      id: 12, type: 'dialog', title: '变量命名规则', subtitle: '给盒子起个好名字', chapterTag: '第 2 讲 · 定义与赋值',
      data: {
        lines: [
          { who: 'student', text: '变量名可以随便起吗？' },
          { who: 'robot', text: '不行，有规则。第一，只能包含字母、数字、下划线。' },
          { who: 'student', text: '那可以叫 1a 吗？' },
          { who: 'robot', text: '不行。首字符不能是数字，所以 1a 是错的，a1 才对。' },
          { who: 'student', text: '还有别的规则吗？' },
          { who: 'robot', text: '不能和关键字重名，比如 int、if、for 都不能用作变量名。还要区分大小写，Age 和 age 是两个不同的变量。' }
        ],
        extra: {
          title: '📖 好习惯 · 见名知意',
          desc: '推荐用有意义的英文单词，如 student_name、game_score、total_count。<br>常见命名风格：<br>· <b>下划线式</b>：student_name（C 风格）<br>· <b>驼峰式</b>：studentName（Java 风格）<br>· <b>短命名</b>：a、b、c（竞赛快速写题）<br>程序是写给人看的，好名字能省很多调试时间。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 变量定义与赋值 ===== */
    {
      id: 13, type: 'code-split', title: '变量定义与赋值', subtitle: '两步走或一步到位',
      data: {
        code: `// 方式一：先定义，再赋值
int age;
age = 11;

// 方式二：定义的同时初始化（推荐）
int score = 98;
double pi = 3.14159;
char grade = 'A';
bool is_passed = true;`,
        annotations: [
          { line: 2, title: '先定义', desc: '声明变量名和类型，分配内存空间' },
          { line: 3, title: '再赋值', desc: '将数据写入变量，可以多次修改' },
          { line: 6, title: '初始化', desc: '定义 + 赋值一步完成，推荐写法' },
          { line: 7, title: 'double', desc: '小数用 double，自动存储小数部分' },
          { line: 8, title: 'char', desc: '字符用单引号，注意不是双引号' },
          { line: 9, title: 'bool', desc: '布尔用 true / false，也可以用 1 / 0' }
        ],
        extra: {
          title: '💡 编程好习惯',
          desc: '定义变量时，尽量同时初始化。未初始化的变量里是"垃圾值"，使用它结果不可预测。<br>为什么要初始化？因为内存里的旧数据没被清空，新变量会继承这些值。编译器不会报错，但结果会错。<br><b>一句话：定义变量，就顺手给它一个初值。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 未初始化变量的坑 ===== */
    {
      id: 14, type: 'compare', title: '未初始化变量的坑', subtitle: '使用前必须赋值',
      data: {
        groups: [
          { wrong: 'int a; cout &lt;&lt; a;', right: 'int a = 0; cout &lt;&lt; a;' },
          { wrong: '未赋值 → 输出垃圾值', right: '赋初值 → 输出 0' },
          { wrong: '结果不可预测', right: '结果稳定可控' }
        ],
        extra: {
          title: '📖 为什么会有垃圾值？',
          desc: '内存里的旧数据没被清空，新变量会继承这些值。编译器不会报错，但结果会错。这是新手最常踩的坑。<br>在竞赛中，未初始化变量可能导致答案全错，而且很难查出来。所以养成定义即初始化的好习惯。<br><b>正确写法</b>：<code>int sum = 0;</code>，而不是 <code>int sum;</code>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 cin 与 cout 复习 ===== */
    {
      id: 15, type: 'code-split', title: 'cin 与 cout · 输入输出的孪生兄弟', subtitle: '让程序与用户对话',
      data: {
        codeFile: 'codes/lesson-02/cin-cout.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int a, b;', desc: '定义两个整型变量，用来存数据' },
          { line: 7, title: 'cin &gt;&gt; a &gt;&gt; b;', desc: '读两个整数，空格分隔' },
          { line: 8, title: 'cout &lt;&lt; a + b;', desc: '输出和，endl 换行' },
          { line: 9, title: 'return 0;', desc: '程序正常结束' }
        ],
        output: '8',
        extra: {
          title: '📖 cin / cout 全称与陷阱',
          desc: '<code>cin</code> 全称 "<b>character input</b>"，字符输入；<code>cout</code> 全称 "<b>character output</b>"，字符输出。<br><b>陷阱</b>：cin 遇到空格就当分隔符。想读一整行（含空格），要用 <code>getline(cin, str)</code>。<br>记住：<b>cin 读"词"，getline 读"行"</b>。<br>另外，cin 的类型必须和变量类型匹配，输入 "3.14" 到 int 变量，只会读到 3。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 练习1 简单计算器 ===== */
    {
      id: 16, type: 'level-map', title: '课堂练习1：简单计算器', subtitle: '输入两个整数，输出和差积商', chapterTag: '第 2 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入两个整数 <code>a</code> 和 <code>b</code>，分别输出它们的和、差、积、商（整数商）。<br>输入样例：<code>10 3</code>', timer: '⏱ 限时 8 分钟' },
        hints: ['定义 <code>int a, b;</code>', '用 <code>cin &gt;&gt; a &gt;&gt; b;</code> 输入', '注意整数除法只保留整数部分'],
        answer: {
          codeFile: 'codes/lesson-02/calculator.cpp'
        },
        analysis: { title: '📖 解析', desc: '<code>10 / 3</code> 结果是 <code>3</code>，不是 3.33。整数除法只保留整数部分，小数部分被丢弃。' },
        extra: { title: '💡 整数除法陷阱', desc: '要得到小数结果，需要先转换成 double，如 <code>(double)a / b</code>。<br>这是新手最容易忽略的细节，也是竞赛中失分的高频原因。', variant: 'card-primary' }
      }
    },

    /* ===== 17 练习2 温度转换 ===== */
    {
      id: 17, type: 'level-map', title: '课堂练习2：温度转换', subtitle: '摄氏温度转华氏温度', chapterTag: '第 2 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入摄氏温度 <code>C</code>，输出对应的华氏温度 <code>F</code>。<br>转换公式：<code>F = C * 9.0 / 5.0 + 32</code><br>输入样例：<code>100</code>　输出样例：<code>212</code>', timer: '⏱ 限时 8 分钟' },
        hints: ['用 <code>double</code> 存温度', '公式里要用 <code>9.0 / 5.0</code> 而不是 <code>9 / 5</code>', '输出用 <code>cout</code> 直接输出'],
        answer: {
          codeFile: 'codes/lesson-02/temperature.cpp'
        },
        analysis: { title: '📖 解析', desc: '必须用 <code>double</code>，否则 <code>9 / 5</code> 会得到 1 而不是 1.8。这是新手常犯的错误。' },
        extra: { title: '📖 交叉学科 · 物理', desc: '摄氏温度以水的冰点 0°C、沸点 100°C 为基准。华氏温度以冰点 32°F、沸点 212°F 为基准。<br>华氏和摄氏的转换比例是 9:5。0°C = 32°F，100°C = 212°F。转换公式就来自这两个基准点。<br><b>1°C 的变化 = 1.8°F 的变化</b>。', variant: 'card-primary' }
      }
    },

    /* ===== 18 常量 const ===== */
    {
      id: 18, type: 'dialog', title: '常量 const', subtitle: '不会改变的值', chapterTag: '第 2 讲 · 定义与赋值',
      data: {
        lines: [
          { who: 'student', text: '如果程序里有一个值一直不变，比如圆周率 π，也要用变量吗？' },
          { who: 'robot', text: '用常量。用 const 关键字声明，值一旦定义就不能改。' },
          { who: 'student', text: '那和普通变量有什么区别？' },
          { who: 'robot', text: '变量可以改，常量不能改。如果试图修改常量，编译器会报错。' },
          { who: 'student', text: '什么时候用常量？' },
          { who: 'robot', text: '比如 π、重力加速度、竞赛中的模数 1000000007，这些固定值都用 const。' }
        ],
        extra: {
          title: '📖 使用常量的三大好处',
          desc: '① <b>提升可读性</b>：看到 PI 就知道是圆周率，比 3.14159 更直观<br>② <b>便于维护</b>：只需修改一处常量定义，所有使用该常量的地方自动更新<br>③ <b>防止误改</b>：编译器会拦住任何修改常量的尝试，保证数据安全。<br>竞赛中常用的常量：<code>const int MOD = 1000000007;</code>（质数模数）<br>竞赛中常用的常量还有：<code>const int MAXN = 100005;</code>（数组最大长度）',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 类型转换 ===== */
    {
      id: 19, type: 'code-split', title: '类型转换', subtitle: '自动升级 + 手动强转',
      data: {
        code: `// 自动转换：小类型自动升级为大类型
int a = 5;
double b = 2.0;
double c = a / b;      // a 自动转 double，结果 2.5

// 强制转换：手动指定类型
int x = 5, y = 2;
double z = (double)x / y;  // 结果 2.5`,
        annotations: [
          { line: 3, title: 'int + double', desc: 'int 自动升级为 double' },
          { line: 4, title: '自动转换', desc: '不需要手动处理，编译器自动完成' },
          { line: 8, title: '(double)x', desc: '强制转换语法，把 x 转成 double' },
          { line: 8, title: '整数除法陷阱', desc: '不加 (double) 会得到 2，不是 2.5' }
        ],
        extra: {
          title: '💡 转换方向与语法',
          desc: '范围小的类型自动转成范围大的类型，如 int → double。反方向需要强制转换，可能会丢数据。<br>语法：<code>(double)a</code> 或 <code>double(a)</code>。<br>竞赛中常用的就是 <code>(double)a / b</code>，避免整数除法陷阱。<br><b>记住：要小数，先转 double。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 整数除法陷阱 ===== */
    {
      id: 20, type: 'compare', title: '整数除法陷阱', subtitle: '竞赛新手最容易踩的坑',
      data: {
        groups: [
          { wrong: '5 / 2 = 2', right: '5.0 / 2 = 2.5' },
          { wrong: '7 / 3 = 2', right: '7.0 / 3 = 2.333...' },
          { wrong: '10 / 4 = 2', right: '(double)10 / 4 = 2.5' }
        ],
        extra: {
          title: '💡 避坑指南',
          desc: '要小数结果，必须让至少一个操作数是小数类型。<br>常用技巧：写 <code>5.0</code> 而不是 <code>5</code>，或者用 <code>(double)a</code>。<br>养成"要小数就先转 double"的习惯，能避免 90% 的精度错误。<br><b>竞赛高频陷阱</b>：计算平均值、计算比例、计算几何，都容易踩这个坑。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 浮点精度问题（回收伏笔 + 新埋） ===== */
    {
      id: 21, type: 'dialog', title: '浮点精度问题', subtitle: '0.1 + 0.2 不等于 0.3？', chapterTag: '第 2 讲 · 类型转换',
      data: {
        lines: [
          { who: 'student', text: '小 C，我刚学会了用 double，5.0 / 2 = 2.5，完美！' },
          { who: 'robot', text: '很好。不过 double 有一个隐藏的坑，很多新手都会踩。' },
          { who: 'student', text: '什么坑？小数不是比整数更"精确"吗？' },
          { who: 'robot', text: '你猜 0.1 + 0.2 等于多少？' },
          { who: 'student', text: '0.3 呀，这还用问？' },
          { who: 'robot', text: '写程序算算看，结果不是 0.3！' },
          { who: 'student', text: '啊？为什么会这样？' },
          { who: 'robot', text: '因为计算机用二进制存储小数，0.1 和 0.2 都不能精确表示。就像十进制不能精确表示 1/3。' },
          { who: 'student', text: '那竞赛里怎么处理？' },
          { who: 'robot', text: '大部分题目会规定误差范围，比如 |答案 - 正确值| &lt; 10⁻⁶。所以一般不直接比较两个小数是否相等。' }
        ],
        extra: {
          title: '📖 知识扩展 · 二进制小数',
          desc: '就像十进制不能精确表示 1/3（0.3333...），二进制也不能精确表示 0.1。这是所有编程语言都有的问题，不是 C++ 的缺陷。<br>竞赛中判断两个小数是否相等，写法是 <code>fabs(a - b) &lt; 1e-8</code>。<br>而比较两个整数是否相等，直接用 <code>==</code> 就行。<br><b>一句话：小数比"近似"，整数比"精确"。</b><br><br>🔮 <b>伏笔</b>：为什么小数存不准？二进制小数的秘密，第 35 讲揭晓。概率计算为什么有误差？第 38 讲讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 类型速查表 ===== */
    {
      id: 22, type: 'grid', title: '类型速查表', subtitle: '一眼看懂怎么选、怎么用',
      data: {
        cards: [
          { icon: '🔢', title: 'int · 普通整数', desc: '<b>字节</b>：4 字节（32 位）<br><b>范围</b>：约 ±21 亿<br><b>适用</b>：计数、累加、数组下标<br><b>陷阱</b>：大数溢出，需换 long long' },
          { icon: '📦', title: 'long long · 大整数', desc: '<b>字节</b>：8 字节（64 位）<br><b>范围</b>：约 ±9×10¹⁸<br><b>适用</b>：大数运算、阶乘、求和<br><b>提示</b>：不确定时优先用它' },
          { icon: '📐', title: 'double · 小数', desc: '<b>字节</b>：8 字节<br><b>精度</b>：有效数字约 15—17 位<br><b>适用</b>：温度、面积、平均值<br><b>提示</b>：竞赛首选，几乎不用 float' },
          { icon: '🔤', title: 'char / bool · 字符与布尔', desc: '<b>char</b>：1 字节，存单字符 \'A\'、\'7\'<br><b>bool</b>：1 字节，只有 true / false<br><b>适用</b>：字符处理、标志位、判断' }
        ],
        extra: {
          title: '📌 竞赛口诀 + 查大小技巧',
          desc: '<b>口诀</b>：整数不急用 int，大数就选 long long；小数首选 double，字符布尔按需走。<br><b>补充</b>：float 是单精度小数，占 4 字节，有效数字约 6—7 位。精度比 double 低，竞赛中极少使用。<br><b>查大小</b>：用 <code>sizeof(int)</code> 返回类型占用的字节数，如 sizeof(int) 返回 4，sizeof(double) 返回 8。<br><b>初赛必考</b>：常见类型的大小和范围，是 CSP-J/S 初赛的高频考点。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 综合练习 圆的面积 ===== */
    {
      id: 23, type: 'level-map', title: '综合练习：圆的面积', subtitle: '输入半径，输出面积', chapterTag: '第 2 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入圆的半径 <code>r</code>，输出圆的面积。<br>公式：<code>面积 = π × r²</code>，π 取 3.14159。<br>输入样例：<code>5</code>　输出样例：<code>78.5398</code>', timer: '⏱ 限时 8 分钟' },
        hints: ['用 <code>const double PI = 3.14159;</code>', '半径用 <code>double</code>', '面积 = <code>PI * r * r</code>'],
        answer: {
          codeFile: 'codes/lesson-02/circle-area.cpp'
        },
        analysis: { title: '📖 解析', desc: '用 <code>const</code> 定义 π，用 <code>double</code> 存储小数。这就是常量和浮点数的典型用法。' },
        extra: { title: '📖 知识扩展 · 圆的面积', desc: '圆的面积公式 S = πr² 来自古希腊数学家阿基米德。<br>他用多边形逼近圆的方法计算 π，这是早期极限思想的雏形。<br>这个练习同时用到了 const、double、cin、cout，是本章的综合应用。<br><b>π 的精确值是 3.1415926535...</b>', variant: 'card-primary' }
      }
    },

    /* ===== 24 数据类型知识点复盘（对话） ===== */
    {
      id: 24, type: 'dialog', title: '数据类型知识点复盘', subtitle: '小C提问，同学回答', chapterTag: '第 2 讲 · 答疑',
      data: {
        lines: [
          { who: 'robot', text: '同学，学了这么多类型，我问你几个问题。' },
          { who: 'student', text: '来吧！' },
          { who: 'robot', text: '整数 100 亿，用 int 还是 long long？' },
          { who: 'student', text: 'long long！int 最大只有 21 亿，会溢出。' },
          { who: 'robot', text: '小数 3.14，用 double 还是 float？' },
          { who: 'student', text: 'double。double 精度更高，竞赛首选。' },
          { who: 'robot', text: '5 / 2 的结果是多少？' },
          { who: 'student', text: '2！整数除法会丢掉小数部分。要得到 2.5，得写 5.0 / 2。' },
          { who: 'robot', text: '非常好。你已经掌握了数据类型的核心了。' }
        ],
        extra: {
          title: '💡 三个核心要点',
          desc: '① <b>整数选 int 还是 long long</b>？看范围，超 21 亿就用 long long。<br>② <b>小数选 double 还是 float</b>？永远用 double，精度更高。<br>③ <b>整数除法会丢小数</b>？要小数就先转 double。<br>这三条是竞赛中最常考的类型知识点。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 数据类型常见错误 ===== */
    {
      id: 25, type: 'compare', title: '数据类型常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '未初始化：int a; cout &lt;&lt; a;', right: '初始化：int a = 0;' },
          { wrong: '整数除法：5 / 2 = 2', right: '转小数：(double)5 / 2 = 2.5' },
          { wrong: '溢出：int 存 100 亿', right: '用 long long 存大数' },
          { wrong: '类型不匹配：int 存小数', right: 'double 存小数' }
        ],
        extra: {
          title: '📖 90% 的错误都是这四类',
          desc: '养成仔细检查的习惯。写完代码先自己看一遍，再运行验证。<br>竞赛中，一次 WA 可能就影响名次。做题前先想清楚数据类型，能避免大部分错误。<br><b>记住</b>：编译通过 ≠ 答案正确。类型错误往往编译不报错，但结果错。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 课堂小测（选择 3 道 + 判断 2 道） ===== */
    {
      id: 26, type: 'quiz', title: '课堂小测', subtitle: '变量、类型与整数除法',
      chapterTag: '第 2 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第一章',
            question: '以下哪个是 C++ 合法的变量名？',
            options: [
              { label: 'A', text: '<code>123name</code>' },
              { label: 'B', text: '<code>my_name</code>', correct: true },
              { label: 'C', text: '<code>my-name</code>' },
              { label: 'D', text: '<code>my name</code>' }
            ],
            analysis: 'C++ 变量名规则：① 只能含字母、数字、下划线；② <b>不能以数字开头</b>；③ 不能含空格或特殊符号（如 <code>-</code>）。<br>A 以数字开头，错；B 合法；C 含 <code>-</code>，错；D 含空格，错。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 基本数据类型',
            question: '<code>int</code> 类型在常见编译器中通常占用几个字节？',
            options: [
              { label: 'A', text: '1 字节' },
              { label: 'B', text: '2 字节' },
              { label: 'C', text: '4 字节', correct: true },
              { label: 'D', text: '8 字节' }
            ],
            analysis: '常见类型字节数：<br>· <code>int</code> = 4 字节（32 位）<br>· <code>long long</code> = 8 字节（64 位）<br>· <code>double</code> = 8 字节<br>· <code>char</code> / <code>bool</code> = 1 字节<br>这是初赛的高频考点。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'C++ 信息学奥赛总复习题 · 第二章',
            question: '阅读下面代码，输出是什么？',
            questionCode: `int a = 5, b = 2;
cout << a / b << endl;`,
            options: [
              { label: 'A', text: '2.5' },
              { label: 'B', text: '2', correct: true },
              { label: 'C', text: '3' },
              { label: 'D', text: '编译错误' }
            ],
            analysis: 'a 和 b 都是 <code>int</code>，所以 <code>a / b</code> 是<b>整数除法</b>，结果只保留整数部分，小数被丢弃。<br>5 / 2 = 2（不是 2.5）。<br>要得到 2.5，必须写 <code>(double)a / b</code>。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 模拟题 · 变量与类型',
            question: '在 C++ 中，未初始化的局部变量会有一个确定的值（比如 0）。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '未初始化的局部变量里是<b>垃圾值</b>，不是 0。它的值取决于内存中残留的旧数据，结果不可预测。<br>所以定义变量时要养成初始化的好习惯：<code>int sum = 0;</code>。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 1,
            source: 'C++ 信息学奥赛总复习题 · 第一章',
            question: '变量名不能以数字开头。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: 'C++ 变量名规则：首字符必须是<b>字母或下划线</b>，不能是数字。<br>例如 <code>age</code>、<code>_count</code>、<code>a1</code> 都合法；<code>1a</code>、<code>123</code> 都不合法。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛与复赛的区别',
          desc: 'CSP-J 分<b>初赛</b>和<b>复赛</b>两轮。<br><b>初赛</b>：笔试（近年改为机试），考计算机基础、进制转换、逻辑运算、读程序写结果。<br><b>复赛</b>：上机编程，4 道题，3.5 小时。<br>初赛通过才能参加复赛，初赛淘汰率约 60%—70%。<br>所以初赛不能忽视——很多高手因为初赛没过，连复赛的门都进不去。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 今日总结 ===== */
    {
      id: 27, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '选对类型，数据才能住得舒服。',
        author: '—— 数据类型第一课',
        points: [
          '变量是带名字的盒子，用来存数据',
          '常用类型：int、long long、double、char、bool',
          '定义语法：类型 变量名 = 初值;',
          '变量命名：见名知意，不能数字开头',
          '整数除法陷阱：要小数先转 double',
          '常量 const：值不可改变'
        ],
        highlight: { title: '📌 关键口诀', desc: '整数不急用 int，大数就选 long long；小数首选 double，字符布尔按需走；变量定义要初始化，类型匹配不出错。' },
        extra: {
          title: '💡 为什么类型这么重要？',
          desc: '类型是程序的基础。类型选错，程序可能算出错误答案，甚至崩溃。<br>CSP-J/S 很多 WA，都是因为类型问题。熟练掌握类型，就掌握了竞赛的基本功。<br><br>🔮 <b>伏笔</b>：变量能存一个数据，100 个数据怎么办？第 9 讲给你一个"一排储物柜"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 课后作业 ===== */
    {
      id: 28, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P5707', link: 'https://www.luogu.com.cn/problem/P5707', desc: '<b>上学迟到</b><br>考察：时间计算、整除<br>难度：★★<br>目标：读懂题意，注意单位换算' },
          { icon: '🟢', title: '基础 2 · P5709', link: 'https://www.luogu.com.cn/problem/P5709', desc: '<b>Apples Prologue</b><br>考察：整数除法、向上取整<br>难度：★★<br>目标：注意除以零的边界' },
          { icon: '🔴', title: '挑战 · P5708', link: 'https://www.luogu.com.cn/problem/P5708', desc: '<b>三角形面积</b><br>考察：double 精度、海伦公式<br>难度：★★★<br>目标：写出 sqrt 公式，注意精度' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 下节预告 ===== */
    {
      id: 29, type: 'radial', title: '下节预告', subtitle: '第 3 讲 · 分支结构',
      data: {
        center: '分支结构',
        items: [
          { text: '四类运算符' },
          { text: 'if 语句' },
          { text: 'switch 多分支' },
          { text: '逻辑运算' }
        ],
        extra: {
          title: '💡 让程序学会判断',
          desc: '目前程序只会从头到尾执行一遍。<br>如果想让它"做判断"，比如"成绩及格就输出及格"，需要新的语法。<br>下一讲，程序将学会思考——分支结构。<br><br>🔮 <b>远期彩蛋</b>：运算符里还藏着一位"隐形高手"——位运算，它直接操作二进制，第 35 讲揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第二讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: { title: '🌟 你已经掌握了程序的基础', desc: '变量是程序存储数据的方式，类型是数据的"家"。<br>下一讲，我们将让程序学会做判断和循环。<br>程序的三大结构，你已经走完了第一步。', variant: 'card-glow' }
      }
    }

  ]
};
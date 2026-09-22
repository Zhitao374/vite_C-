export default {
  title: '第 6 讲 字符串基础',
  subtitle: '一串字符的容器',
  total: 31,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '字符串基础', subtitle: '一串字符的容器', chapterTag: false,
      data: { accentWord: '字符串', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 6 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '一维数组，批量数据的好帮手',
      data: {
        items: [
          { icon: '📦', badge: '基础', title: '数组概念', desc: '一排储物柜，同类型连续存放', points: ['同类型', '连续存储', '下标访问'] },
          { icon: '🔢', badge: '核心', title: '定义与访问', desc: 'int a[100];', points: ['下标 0 到 99', '类型 名字[长度];', '数组宁开大点'] },
          { icon: '🔄', badge: '关键', title: '数组与循环', desc: '遍历、求和、找最大值', points: ['for (i=0; i<n; i++)', '边读边处理', '逆序输出'] },
          { icon: '⚠️', badge: '易错', title: '常见错误', desc: '越界、未初始化、数组太小', points: ['下标 < 长度', 'sum = 0', '按范围开大'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '数组能存整数，那文字呢？<br>"Hello" 这 5 个字母，怎么存？<br>今天我们就学习能存一串文字的"字符串"。<br><br>🔮 <b>回收伏笔</b>：第 5 讲说过"字符串本质是字符数组"，今天揭晓。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握文字的存储',
      data: {
        cards: [
          { number: '01', title: '理解字符', desc: '字符 \'A\' 和字符串 "A" 的区别' },
          { number: '02', title: '两种定义', desc: '字符数组 char[] 和 string 类型' },
          { number: '03', title: '读入与遍历', desc: 'cin、getline、下标、范围 for' },
          { number: '04', title: '实战应用', desc: '统计字符、回文判断、逆序输出' }
        ],
        extra: { title: '📖 知识扩展 · 字符串的重要性', desc: '字符串是竞赛中的高频考点。<br>CSP-J 每年至少 1 道字符串题。<br>从"统计单词"到"密码破解"，从"文本处理"到"数据解析"，字符串无处不在。<br><b>掌握字符串，你就能处理真实的文本数据。</b>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从字符到字符串',
      data: {
        items: [
          { icon: '🔤', badge: '基础', title: '第一站 · 字符 vs 字符串', desc: '单引号 \'A\' 和双引号 "A" 的区别', points: ['char 用单引号', 'string 用双引号', 'char 占 1 字节'] },
          { icon: '📝', badge: '核心', title: '第二站 · 两种定义方式', desc: '字符数组 vs string 类型', points: ['char s[100];', 'string s;', '各有优缺点'] },
          { icon: '📥', badge: '关键', title: '第三站 · 读入与遍历', desc: 'cin、getline、下标、范围 for', points: ['cin 遇空格停', 'getline 读整行', 's[i] 访问'] },
          { icon: '🏆', badge: '实战', title: '第四站 · 字符串实战', desc: '统计、回文、逆序三大经典问题', points: ['统计字符数', '回文判断', '逆序输出'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"字符串大师"徽章。' }
      }
    },

    /* ===== 05 为什么要学字符串 ===== */
    {
      id: 5, type: 'dialog', title: '为什么要学字符串？', subtitle: '文字也是一种数据', chapterTag: '第 6 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，数组能存整数，那文字怎么存？' },
          { who: 'robot', text: '用字符串。字符串就是一串字符的容器，比如 "Hello"、"China"、"2024"。' },
          { who: 'student', text: '我们平时写代码不是为了算数吗？为什么要处理文字？' },
          { who: 'robot', text: '竞赛里很多题目都是文字处理。比如统计一篇文章里某个单词出现几次、判断一个单词是不是回文、给密码加密。' },
          { who: 'student', text: '那字符串和数组有什么关系？' },
          { who: 'robot', text: '字符串本质上就是"字符的数组"。<br>所以你第 5 讲学的数组知识，这里都能用上。' },
          { who: 'student', text: '那我今天学起来会轻松些？' },
          { who: 'robot', text: '对！数组是地基，字符串是在地基上盖的第一层楼。' }
        ],
        extra: {
          title: '📖 知识扩展 · 字符串的英文',
          desc: '字符串的英文是 <b>string</b>，意思是"一串、一线"。<br>古代航海时，水手把珠子串成一串记录信息——这就是"字符串"最早的比喻。<br>现代计算机里，字符串就是一串字符按顺序排列。<br><b>从珠子到字符，人类记录信息的方式一直在变。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 字符 vs 字符串 ===== */
    {
      id: 6, type: 'grid', title: '字符 vs 字符串', subtitle: '单引号 \'A\' 和双引号 "A" 的区别',
      data: {
        cards: [
          { icon: '🔤', title: '字符 char', desc: '<b>用单引号</b>：<code>\'A\'</code><br>只表示<b>一个</b>字符<br>占 1 字节<br>本质是 ASCII 码（整数）' },
          { icon: '📝', title: '字符串 string', desc: '<b>用双引号</b>：<code>"A"</code><br>表示<b>一串</b>字符<br>用 <code>string</code> 类型<br>占多个字节（含结束符）' },
          { icon: '⚠️', title: '常见错误', desc: '<code>char c = "A";</code> ❌<br>char 要用单引号<br><code>string s = \'A\';</code> ❌<br>string 要用双引号' }
        ],
        extra: {
          title: '💡 单引号 vs 双引号',
          desc: '<b>单引号</b>：<code>\'A\'</code> 是字符（char），占 1 字节。<br><b>双引号</b>：<code>"A"</code> 是字符串（string），占 <b>2</b> 字节（含结尾的 <code>\\0</code>）。<br>为什么字符串多 1 字节？因为字符串需要一个"结束标记" <code>\\0</code>，告诉程序"这里结束了"。<br><b>记忆</b>：单引号一个字符，双引号一串字符。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 字符 vs 字符串代码 ===== */
    {
      id: 7, type: 'code-split', title: '代码演示：字符 vs 字符串', subtitle: '一眼看出区别',
      data: {
        codeFile: 'codes/lesson-06/char-vs-string.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'char c = \'A\';', desc: '单引号，1 个字符' },
          { line: 7, title: 'string s = "Hello";', desc: '双引号，一串字符' },
          { line: 9, title: 'cout &lt;&lt; c', desc: '输出字符 A' },
          { line: 10, title: 'cout &lt;&lt; s', desc: '输出字符串 Hello' }
        ],
        output: 'A\nHello',
        extra: {
          title: '💡 为什么需要两种？',
          desc: '因为它们的用途不同：<br><b>char</b>：存单个字符，如判断"是不是大写字母"<br><b>string</b>：存一串字符，如存一个人的名字<br>有些场景需要 char（如字符分类），有些场景需要 string（如文本处理）。<br>竞赛中两种都会用到。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 字符数组 ===== */
    {
      id: 8, type: 'code-split', title: '字符数组 · char[]', subtitle: 'C 风格字符串',
      data: {
        codeFile: 'codes/lesson-06/char-array.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'char s[100];', desc: '字符数组，能存 99 个字符 + 结束符' },
          { line: 7, title: 'cin &gt;&gt; s;', desc: '读入字符串，遇到空格停止' },
          { line: 10, title: 'char t[] = "Hello";', desc: '定义时初始化，自动分配 6 字节' }
        ],
        output: '（输入 Hello World）\nHello\nHello',
        extra: {
          title: '📖 知识扩展 · \\0 结束符',
          desc: 'C 风格字符串结尾有一个隐藏的 <code>\\0</code>（ASCII 码 0），告诉程序"字符串到此结束"。<br>所以 <code>char s[5]</code> 只能存 4 个字符 + 1 个 <code>\\0</code>。<br><code>char t[] = "Hello";</code> 实际占 <b>6</b> 字节（H e l l o \\0）。<br><b>陷阱</b>：忘留 \\0 的位置，输出会乱码或越界。<br>这就是为什么 string 类型更好用——它自动管理长度。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 string 类型 ===== */
    {
      id: 9, type: 'code-split', title: 'string 类型 · 更方便', subtitle: 'C++ 独有的字符串',
      data: {
        codeFile: 'codes/lesson-06/string-type.cpp',
        snippet: 'main',
        annotations: [
          { line: 7, title: 'string s = "Hello";', desc: '定义并初始化' },
          { line: 10, title: 's = "World";', desc: '可以重新赋值，不用管长度' },
          { line: 13, title: 's + "!"', desc: '可以用 + 拼接字符串' },
          { line: 14, title: 'cout &lt;&lt; s2', desc: '输出拼接结果' }
        ],
        output: 'Hello\nWorld\nWorld!',
        extra: {
          title: '💡 string 的三大优势',
          desc: '① <b>自动管理长度</b>：赋值时自动调整，不用手动留 \\0<br>② <b>可以用 +</b>：字符串拼接像加法一样简单<br>③ <b>更安全</b>：内置边界检查，避免越界<br><b>竞赛建议</b>：优先用 string，除非题目明确要求 char[]。<br>string 需要 <code>#include &lt;string&gt;</code>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 char[] vs string ===== */
    {
      id: 10, type: 'compare', title: 'char[] vs string', subtitle: '什么时候用哪个',
      data: {
        groups: [
          { wrong: 'char s[100]; 长度固定，需要预留空间', right: 'string s; 长度自动，想存多少存多少' },
          { wrong: 'char 用 strcat 拼接', right: 'string 用 + 拼接' },
          { wrong: 'char 用 strlen 求长度', right: 'string 用 s.size()' },
          { wrong: 'char 用 strcmp 比较', right: 'string 用 == 直接比较' }
        ],
        extra: {
          title: '📖 选择建议',
          desc: '<b>用 string</b>：几乎任何场景，除非题目明确要求 char[]。<br><b>用 char[]</b>：<br>· 需要精确控制内存（罕见）<br>· 处理 C 风格 API（少见）<br>· 某些老的竞赛题<br><b>口诀</b>：能 string 就 string，简单又安全。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 cin vs getline ===== */
    {
      id: 11, type: 'dialog', title: '字符串读入：cin vs getline', subtitle: '两个函数，两种用途', chapterTag: '第 6 讲 · 输入输出',
      data: {
        lines: [
          { who: 'student', text: '小 C，读字符串用 cin 就够了？' },
          { who: 'robot', text: '大部分时候够了。但 cin 有个坑——它遇到空格就停。' },
          { who: 'student', text: '那如果我输入 "Hello World" 呢？' },
          { who: 'robot', text: 'cin 只会读到 "Hello"，剩下的 "World" 留给下一个变量。' },
          { who: 'student', text: '那我想读整行怎么办？' },
          { who: 'robot', text: '用 <code>getline(cin, s)</code>，它会读到换行为止，中间的空格都包含。' },
          { who: 'student', text: '那什么时候用 cin？' },
          { who: 'robot', text: '读"一个单词"用 cin，读"一整行"用 getline。<br>口诀：<b>cin 读词，getline 读行。</b>' }
        ],
        extra: {
          title: '💡 混合使用的陷阱',
          desc: '如果先用 <code>cin &gt;&gt; n</code>，再用 <code>getline</code>，会读到"空行"。<br>因为 cin 读完后，换行符还留在缓冲区。<br><b>解决方法</b>：cin 后加一句 <code>cin.ignore()</code>，忽略换行符。<br>这是竞赛中极常见的坑，一定要记住。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 字符串读入 ===== */
    {
      id: 12, type: 'code-split', title: '字符串读入：cin 和 getline', subtitle: '两种读法，两种场景',
      data: {
        codeFile: 'codes/lesson-06/string-input.cpp',
        snippet: 'main',
        annotations: [
          { line: 7, title: 'string s1, s2;', desc: '定义两个字符串' },
          { line: 9, title: 'cin &gt;&gt; s1;', desc: '读一个单词，遇到空格停止' },
          { line: 12, title: 'cin.ignore();', desc: '忽略换行符，避免 getline 读到空行' },
          { line: 13, title: 'getline(cin, s2);', desc: '读一整行，包含空格' }
        ],
        output: '（输入：Hello 然后 你好 世界）\ns1 = Hello\ns2 = 你好 世界',
        extra: {
          title: '📖 知识扩展 · getline 的历史',
          desc: '<code>getline</code> 最早出现在 1970 年代的 C 语言 I/O 库里，用来解决"读一整行"的需求。<br>当时程序要处理配置文件，一行可能有多个空格分隔的参数。<br>cin 只能读一个词，不够用。<br>于是 getline 诞生了——它一次读到换行为止。<br><b>后来这成了处理文本的标配函数。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 过渡页 ===== */
    {
      id: 13, type: 'transition', title: '第二站 · 字符串操作', subtitle: '长度、遍历、实战',
      data: { note: '接下来你将学会字符串的长度、遍历，以及统计、回文、逆序三大经典问题' }
    },

    /* ===== 14 字符串长度 ===== */
    {
      id: 14, type: 'code-split', title: '字符串长度怎么算', subtitle: 'size() / length() / strlen()',
      data: {
        codeFile: 'codes/lesson-06/string-length.cpp',
        snippet: 'main',
        annotations: [
          { line: 8, title: 'string s = "Hello";', desc: '定义 string' },
          { line: 10, title: 's.size()', desc: 'string 求长度，返回 5' },
          { line: 11, title: 's.length()', desc: '和 size 一样，返回 5' },
          { line: 14, title: 'strlen(t)', desc: '字符数组用 strlen，返回 5' }
        ],
        output: '5\n5\n5',
        extra: {
          title: '💡 两种类型，两种方法',
          desc: '<b>string</b> 用 <code>.size()</code>；<b>char[]</b> 用 <code>strlen()</code>。<br>下一屏详细对比三种求长度方式。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 三种求长度的方式（新增 grid） ===== */
    {
      id: 15, type: 'grid', title: '三种求长度的方式', subtitle: '各有各的用途，别用错',
      data: {
        cards: [
          {
            icon: '📝',
            title: 'string · s.size()',
            desc: '<b>最常用</b><br>返回字符个数<br>例：<code>"Hello".size() = 5</code><br>等价写法：<code>s.length()</code>'
          },
          {
            icon: '🔤',
            title: 'char[] · strlen(s)',
            desc: '需要 <code>#include &lt;cstring&gt;</code><br>返回实际字符数<br>遇到 <code>\\0</code> 停止<br>例：<code>char s[]="Hello" → 5</code>'
          },
          {
            icon: '⚠️',
            title: '陷阱 · sizeof(s)',
            desc: '<b>返回数组占用字节数</b><br>不是字符串长度！<br>例：<code>char s[100]</code><br><code>sizeof(s) = 100</code><br>但 <code>strlen(s)</code> 是实际长度'
          }
        ],
        extra: {
          title: '💡 竞赛建议',
          desc: '优先用 <b>string + .size()</b>——最安全、最简洁。<br>如果必须用 char[]，就用 <code>strlen</code>。<br><b>绝对不要用 sizeof 求字符串长度</b>——这是新手陷阱。<br><br>🔮 <b>伏笔</b>：<code>sizeof</code> 是"编译期"就知道的字节数，<code>strlen</code> 是"运行期"才能算出的字符数。<br>它们语义完全不同，第 16 讲"指针"会再讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 字符串遍历 ===== */
    {
      id: 16, type: 'code-split', title: '字符串遍历', subtitle: '下标 vs 范围 for',
      data: {
        codeFile: 'codes/lesson-06/string-traverse.cpp',
        snippet: 'main',
        annotations: [
          { line: 7, title: 'string s = "Hello";', desc: '定义字符串' },
          { line: 10, title: '下标遍历', desc: '用 s[i] 访问每个字符' },
          { line: 11, title: 's[i]', desc: '返回第 i 个字符' },
          { line: 16, title: '范围 for', desc: 'C++11 语法，更简洁' }
        ],
        output: 'H e l l o\nH e l l o',
        extra: {
          title: '📖 知识扩展 · 范围 for 的由来',
          desc: 'C++11（2011 年）引入了"范围 for"，让遍历容器更简洁。<br>以前要写 <code>for (int i = 0; i &lt; s.size(); i++)</code>，现在写 <code>for (char c : s)</code>。<br>这个语法借鉴自 Python 的 <code>for x in list</code>。<br>有人说，C++11 是"现代 C++"的起点——它让 C++ 写起来更舒服。<br><b>竞赛里两种都用</b>，看哪个更清晰。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 字符串 遍历答疑 ===== */
    {
      id: 17, type: 'dialog', title: '遍历答疑', subtitle: '小C回答常见问题', chapterTag: '第 6 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，string 和 char[] 的遍历一样吗？' },
          { who: 'robot', text: '基本一样。都能用下标 <code>s[i]</code> 访问每个字符。' },
          { who: 'student', text: '那 s[i] 返回的是什么类型？' },
          { who: 'robot', text: '<code>char</code> 类型——一个字符。可以当字符用，也可以转成整数看 ASCII 码。' },
          { who: 'student', text: '范围 for 和下标遍历，用哪个更好？' },
          { who: 'robot', text: '如果只需要"读"每个字符，范围 for 更简洁。<br>如果需要用到下标（如回文判断），就用下标遍历。' },
          { who: 'student', text: '遍历时能修改字符吗？' },
          { who: 'robot', text: '能。<code>s[i] = \'X\';</code> 就可以修改第 i 个字符。<br>这也叫"原地修改"，竞赛里很常用。' }
        ],
        extra: {
          title: '💡 三个遍历技巧',
          desc: '① <b>逆序遍历</b>：<code>for (int i = s.size()-1; i &gt;= 0; i--)</code><br>② <b>隔一个遍历</b>：<code>for (int i = 0; i &lt; s.size(); i += 2)</code><br>③ <b>范围 for 修改</b>：<code>for (char &amp;c : s) c = toupper(c);</code><br><b>注</b>：<code>&amp;c</code> 是引用，能修改原字符串。第 16 讲会详细讲引用。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 练习1 统计字符 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习1：统计字符', subtitle: '统计字符串中非空格字符数', chapterTag: '第 6 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '读入一行字符串（含空格），统计其中<b>非空格字符</b>的个数。<br>输入样例：<code>Hello World</code>　输出样例：<code>10</code>', timer: '⏱ 限时 6 分钟' },
        hints: ['用 <code>getline(cin, s)</code> 读整行', '遍历每个字符', '用 <code>if (s[i] != \' \')</code> 判断非空格'],
        answer: { codeFile: 'codes/lesson-06/char-count.cpp' },
        analysis: { title: '📖 解析', desc: '典型的一遍遍历。<br>用 <code>getline</code> 读整行，用循环遍历每个字符，遇到非空格就 count++。<br>时间复杂度 O(n)，只需扫一遍字符串。' },
        extra: { title: '📖 知识扩展 · 洛谷 P5015 标题统计', desc: '这道题在洛谷的编号是 <a href="https://www.luogu.com.cn/problem/P5015" target="_blank" class="wiki-link">P5015</a>，是 CSP-J 2018 的真题。<br>题目说"标题"由数字、大小写字母、空格组成，让你统计非空格字符数。<br>核心就是今天学的字符串遍历 + 条件判断。<br><b>建议</b>：课后作业就做这道题，巩固基础。', variant: 'card-primary' }
      }
    },

    /* ===== 19 练习2 回文判断 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习2：回文判断', subtitle: '正着读和倒着读一样吗', chapterTag: '第 6 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '读入一个字符串，判断它是否是回文。<br>回文：正着读和倒着读完全相同。<br>是回文输出 <code>yes</code>，否则 <code>no</code>。<br>输入样例：<code>level</code>　输出样例：<code>yes</code>', timer: '⏱ 限时 8 分钟' },
        hints: ['用下标 <code>i</code> 和 <code>n-1-i</code> 对比', '只需比较前一半', '发现不同就 <code>break</code>'],
        answer: { codeFile: 'codes/lesson-06/palindrome.cpp' },
        analysis: { title: '📖 解析', desc: '只需比较<b>前一半</b>字符。<br>第 i 个字符和第 n-1-i 个字符对比。<br>只要有一对不相同，就不是回文。<br>循环次数 <code>n/2</code>，效率是 O(n)。' },
        extra: { title: '📖 知识扩展 · 回文的文化意义', desc: '"回文"在中文里叫"回环诗"，在英文里叫 <b>palindrome</b>（希腊语"再次跑"）。<br>最有名的英文回文是 <code>"A man, a plan, a canal, Panama"</code>——读一百多年不腻。<br>数学里也有"回文数"，如 121、12321。<br><b>回文是人类对称审美的体现。</b>', variant: 'card-primary' }
      }
    },

    /* ===== 20 回文讲评 ===== */
    {
      id: 20, type: 'dialog', title: '回文判断的三种写法', subtitle: '小C带你对比', chapterTag: '第 6 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，回文除了两两对比，还有别的方法吗？' },
          { who: 'robot', text: '有。最简单的是"生成倒序字符串，再对比"，但要多占空间。' },
          { who: 'student', text: '还有呢？' },
          { who: 'robot', text: '也可以用双指针：一头一尾往中间走。<br>这是竞赛里常用的技巧。' },
          { who: 'student', text: '那哪个最快？' },
          { who: 'robot', text: '三种方法都是 O(n)，但"两两对比"和"双指针"只用 O(1) 额外空间。<br>更省内存。' },
          { who: 'student', text: '所以推荐用哪个？' },
          { who: 'robot', text: '推荐"两两对比"，代码最简洁。<br>双指针技巧等第 39 讲专门讲。' }
        ],
        extra: {
          title: '📖 知识扩展 · 双指针思想',
          desc: '<b>双指针</b>：用两个"指针"（其实是下标变量）从两端向中间移动。<br>回文判断是最简单的双指针应用。<br>后续会学到的场景：<br>· 数组去重<br>· 有序数对查找<br>· 滑动窗口<br><b>双指针能优化很多 O(n²) 算法到 O(n)</b>，是竞赛必备技巧。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 练习3 字符串逆序 ===== */
    {
      id: 21, type: 'level-map', title: '课堂练习3：字符串逆序', subtitle: '把字符串倒着输出', chapterTag: '第 6 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '读入一个字符串，把它倒着输出。<br>输入样例：<code>Hello</code>　输出样例：<code>olleH</code>', timer: '⏱ 限时 5 分钟' },
        hints: ['从 <code>s.size()-1</code> 倒着遍历到 0', '循环条件 <code>i &gt;= 0</code>', '和数组逆序完全一样'],
        answer: { codeFile: 'codes/lesson-06/string-reverse.cpp' },
        analysis: { title: '📖 解析', desc: '和数组逆序一模一样。<br>字符串本质上就是字符数组，下标访问方式完全相同。<br>这就是"字符串 = 字符数组"的具体体现。' },
        extra: { title: '💡 更简洁的写法', desc: 'C++ 有内置的 <code>reverse</code> 函数：<br><code>reverse(s.begin(), s.end());</code><br>一行搞定逆序。<br>需要 <code>#include &lt;algorithm&gt;</code>。<br><b>建议</b>：初学者先手写循环，理解原理后再用 STL。', variant: 'card-primary' }
      }
    },

    /* ===== 22 常见错误 ===== */
    {
      id: 22, type: 'compare', title: '字符串常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: 'char c = "A"; 双引号', right: 'char c = \'A\'; 单引号' },
          { wrong: 'char s[5] = "Hello"; 装不下', right: 'char s[6] = "Hello"; 留 \\0 位置' },
          { wrong: 'cin &gt;&gt; s 读整行', right: 'getline(cin, s) 读整行' },
          { wrong: 's = "Hello" + "World" 直接拼接', right: 'string s = string("Hello") + "World";' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>引号错</b>：char 用单引号，string 用双引号<br>② <b>空间不够</b>：char 数组要预留 \\0 位置<br>③ <b>cin 遇空格停</b>：读整行用 getline<br>④ <b>字面量拼接</b>：两个字符串字面量不能直接 +，要至少一个是 string<br><b>口诀</b>：单引字符双引串，\\0 位置别忘留，读行要用 getline，拼接至少一个 string。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 初赛小知识 ASCII ===== */
    {
      id: 23, type: 'dialog', title: '初赛小知识：ASCII 码', subtitle: '字符背后的数字', chapterTag: '第 6 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，字符在计算机里是怎么存的？' },
          { who: 'robot', text: '每个字符对应一个数字，叫 <b>ASCII 码</b>。' },
          { who: 'student', text: '能举个例子吗？' },
          { who: 'robot', text: '大写字母 \'A\' 是 65，小写 \'a\' 是 97，数字 \'0\' 是 48。' },
          { who: 'student', text: '那大写和小写差多少？' },
          { who: 'robot', text: '差 <b>32</b>。所以小写字母 - 32 = 对应的大写字母。<br>这是竞赛常用技巧：<code>toupper(c)</code> 或 <code>c - 32</code>。' },
          { who: 'student', text: '那怎么判断一个字符是数字？' },
          { who: 'robot', text: '看 ASCII 范围：\'0\' 到 \'9\' 是 48 到 57。<br><code>if (c &gt;= \'0\' &amp;&amp; c &lt;= \'9\')</code> 就是数字。<br>第 35 讲会详细讲 ASCII 表。' }
        ],
        extra: {
          title: '📖 常用 ASCII 码速查',
          desc: '\'A\' = 65，\'Z\' = 90<br>\'a\' = 97，\'z\' = 122<br>\'0\' = 48，\'9\' = 57<br>空格 = 32<br>换行 = 10<br><b>规律</b>：<br>· 大写字母 + 32 = 小写字母<br>· 小写字母 - 32 = 大写字母<br>· 数字字符 - \'0\' = 对应整数（\'7\' - \'0\' = 7）<br>这些是初赛必背。<br><br>🔮 <b>伏笔</b>：为什么 \'A\' 是 65，\'a\' 是 97？第 35 讲从二进制讲起。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 字符串应用 ===== */
    {
      id: 24, type: 'grid', title: '字符串的实际应用', subtitle: '从竞赛到生活',
      data: {
        cards: [
          { icon: '📝', title: '文本统计', desc: '统计一篇文章的<br>单词数、字符数、行数<br><b>例：P1308 统计单词数</b>' },
          { icon: '🔐', title: '密码学', desc: '字符串加密、解密<br>凯撒密码、维吉尼亚密码<br><b>竞赛常考的入门密码题</b>' },
          { icon: '📊', title: '数据解析', desc: '从一行文本里提取数字<br>如解析 "12,34,56"<br><b>竞赛题的常见输入格式</b>' },
          { icon: '🌐', title: '自然语言', desc: '分词、判断回文、拼写检查<br>是 AI 处理文本的基础<br><b>计算机处理人类语言的起点</b>' }
        ],
        extra: {
          title: '💡 字符串：连接人和机器',
          desc: '计算机最初只能处理数字。<br>字符串的出现，让计算机能处理人类的语言。<br>今天你发的微信、搜的网页、AI 生成的回答——<br><b>底层全是字符串处理。</b><br>学会字符串，你就打开了"让计算机理解人类"的门。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课堂小测 ===== */
    {
      id: 25, type: 'quiz', title: '课堂小测', subtitle: '字符、字符串与读入',
      chapterTag: '第 6 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第五章',
            question: '下面哪个是合法的 C++ 字符串定义？',
            options: [
              { label: 'A', text: '<code>string s = \'Hello\';</code>' },
              { label: 'B', text: '<code>string s = "Hello";</code>', correct: true },
              { label: 'C', text: '<code>char s = \'Hello\';</code>' },
              { label: 'D', text: '<code>char s = "Hello";</code>' }
            ],
            analysis: '<b>string 用双引号</b>，<b>char 用单引号</b>。<br>A 错：string 用了单引号<br>B 对<br>C 错：char 只能存 1 个字符<br>D 错：char 用双引号会报错<br><b>口诀</b>：单引字符双引串。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 字符串',
            question: '在 C++ 中，<code>char s[] = "Hello";</code> 数组 s 占几个字节？',
            options: [
              { label: 'A', text: '5 字节' },
              { label: 'B', text: '6 字节', correct: true },
              { label: 'C', text: '7 字节' },
              { label: 'D', text: '不确定' }
            ],
            analysis: '字符串 "Hello" 有 5 个字符，但 C 风格字符串<b>结尾还有一个 \\0 结束符</b>。<br>所以总占 <b>5 + 1 = 6</b> 字节。<br>这就是为什么定义字符数组时，长度要多留一位。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 字符串',
            question: '下面代码的输出是什么？',
            questionCode: `string s = "abc";
cout << s.size() << endl;
cout << s[1] << endl;`,
            options: [
              { label: 'A', text: '3 然后 b', correct: true },
              { label: 'B', text: '3 然后 a' },
              { label: 'C', text: '4 然后 b' },
              { label: 'D', text: '编译错误' }
            ],
            analysis: '<code>s.size()</code> 返回字符串长度，<b>3</b>（不是 4）。<br><code>s[1]</code> 是第 2 个字符（下标从 0 开始），即 <b>b</b>。<br>所以输出 3 和 b，选 A。<br><b>关键</b>：string 的 size() 不含结束符（\\0）。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第五章',
            question: '在 C++ 中，<code>cin &gt;&gt; s</code> 可以读入含空格的整行字符串。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '<code>cin &gt;&gt; s</code> 遇到空格、Tab、换行就停止。<br>比如输入 "Hello World"，cin 只读到 "Hello"。<br>要读整行（含空格），必须用 <code>getline(cin, s)</code>。<br><b>口诀</b>：cin 读词，getline 读行。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 字符串',
            question: '字符 \'A\' 在 ASCII 码表中是 65，字符 \'a\' 是 97。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '常见 ASCII 码：<br>\'A\' = 65，\'Z\' = 90<br>\'a\' = 97，\'z\' = 122<br>\'0\' = 48，\'9\' = 57<br>空格 = 32<br><b>规律</b>：大写和小写相差 32，所以 <code>\'a\' - \'A\' = 32</code>。<br>这是竞赛常考的知识点。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛字符串三大考点',
          desc: '<b>① 类型区分</b>：char 用单引号，string 用双引号<br><b>② 字节数计算</b>：C 风格字符串含 \\0，string 不含<br><b>③ 读入方式</b>：cin 遇空格停，getline 读整行<br>这三类占了初赛字符串题的 80%。<br><b>建议</b>：做初赛真题时，重点练这三类。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 今日总结 ===== */
    {
      id: 26, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '字符串是文字的容器，本质是字符的数组。',
        author: '—— 字符串第一课',
        points: [
          '字符用单引号 \'A\'，字符串用双引号 "A"',
          '两种定义：char s[100]; 和 string s;',
          'cin 读词，getline 读行',
          '长度：string 用 .size()，char[] 用 strlen()',
          '遍历：下标 s[i] 或范围 for',
          '实战：统计、回文、逆序三大经典问题'
        ],
        highlight: { title: '📌 关键口诀', desc: '单引字符双引串，char 数组留 \\0 位；cin 读词行用 getline，大小写差 32；字符串本质是字符数组，数组知识全都用得上。' },
        extra: {
          title: '💡 字符串是通往"真实世界"的门',
          desc: '前面学的都是数字，从今天开始，程序能处理"人类的语言"了。<br>能处理文字，就能做聊天机器人、文本分析、密码破解。<br>这是编程能力的一次大跃迁。<br><br>🔮 <b>伏笔</b>：字符串的常用函数（find、substr、replace）还有很多，第 12 讲专门讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 课后作业 ===== */
    {
      id: 27, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P5015', link: 'https://www.luogu.com.cn/problem/P5015', desc: '<b>标题统计</b><br>考察：getline、字符遍历<br>难度：★★<br>目标：统计非空格字符数' },
          { icon: '🟢', title: '基础 2 · P1308', link: 'https://www.luogu.com.cn/problem/P1308', desc: '<b>统计单词数</b><br>考察：字符串匹配、大小写转换<br>难度：★★★<br>目标：统计一个单词在文章中出现的次数' },
          { icon: '🔴', title: '挑战 · P1603', link: 'https://www.luogu.com.cn/problem/P1603', desc: '<b>斯诺登的密码</b><br>考察：字符串处理、排序<br>难度：★★★<br>目标：把单词翻译成数字，拼成最小数字' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 下节预告 ===== */
    {
      id: 28, type: 'radial', title: '下节预告', subtitle: '第 7 讲 · 函数',
      data: {
        center: '函数',
        items: [
          { text: '什么是函数' },
          { text: '定义与调用' },
          { text: '参数与返回值' },
          { text: '作用域' }
        ],
        extra: {
          title: '💡 代码复用的秘密',
          desc: '目前我们写的代码都在 main 里，越写越长。<br>如果某段代码要用 10 次，难道要复制 10 遍？<br>不用。把代码打包成"函数"，想用就调用。<br>下一讲，程序将学会"复用"——函数。<br><br>🔮 <b>远期彩蛋</b>：函数的底层是怎么工作的？第 25 讲"栈"会揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 答疑时间 ===== */
    {
      id: 29, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 6 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: 'string 和 char[] 到底用哪个？' },
          { who: 'robot', text: '除非题目明确要求 char[]，否则都用 string。<br>string 更安全、更方便。' },
          { who: 'student', text: 'cin 和 getline 怎么选？' },
          { who: 'robot', text: '读一个单词用 cin，读一整行用 getline。<br>如果 cin 后面接 getline，别忘了 cin.ignore()。' },
          { who: 'student', text: '为什么字符要用 ASCII 码表示？' },
          { who: 'robot', text: '因为计算机只认识数字。<br>把字符编码成数字，计算机才能存储和比较。<br>ASCII 是最早的编码标准，1963 年就诞生了。' },
          { who: 'student', text: '回文题还有什么变种？' },
          { who: 'robot', text: '有。比如"忽略大小写和标点"的回文，要先把字符串"规范化"，再做判断。<br>这是进阶题，等练熟基础后可以挑战。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '字符串是竞赛的"第二大地基"（第一是数组）。<br>初学者至少要写 <b>20 道字符串题</b>才能熟练。<br>从"读入 - 遍历 - 处理 - 输出"这个模板开始，反复练。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 30 知识清单 ===== */
    {
      id: 30, type: 'grid', title: '第 6 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 6 讲 · 复习',
      data: {
        cards: [
          { icon: '🔤', title: '字符 vs 字符串', desc: '<b>char</b> 用单引号 \'A\'<br><b>string</b> 用双引号 "A"<br>char 占 1 字节<br>字符串含结束符 \\0' },
          { icon: '📝', title: '两种定义', desc: '<b>char s[100];</b> 固定长度<br><b>string s;</b> 自动长度<br><b>推荐</b>：优先用 string' },
          { icon: '📥', title: '读入与遍历', desc: '<b>cin &gt;&gt; s</b> 读词<br><b>getline(cin, s)</b> 读行<br><b>s[i]</b> 访问字符<br><b>范围 for</b> 遍历' },
          { icon: '📏', title: '长度与实战', desc: '<b>s.size()</b> 或 s.length()<br><b>strlen(s)</b> 用于 char[]<br>统计、回文、逆序<br>都是字符串经典题' }
        ],
        extra: {
          title: '📌 关键口诀 + 小 C 彩蛋',
          desc: '<b>口诀</b>：单引字符双引串，char 数组留 \\0 位；cin 读词行用 getline，大小写差 32；字符串本质是字符数组，数组知识全都用得上。<br><b>小 C 彩蛋</b>：1963 年，ASCII 码标准诞生，规定了 128 个字符的编码。<br>60 多年过去，它仍然是计算机处理文本的基础。<br>你写的每个字符串，背后都是 ASCII 码在默默工作。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 31 结束页 ===== */
    {
      id: 31, type: 'ending', title: '第六讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: { title: '🌟 你已经让程序会处理文字了', desc: '从数字到文字，程序能处理的数据类型越来越丰富。<br>下一讲，我们学习"函数"——让代码可以复用。<br>程序将变得更简洁、更强大。', variant: 'card-glow' }
      }
    }

  ]
};
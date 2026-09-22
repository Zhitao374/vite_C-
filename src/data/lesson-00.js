/**
 * 第 0 讲 · 动画布局合集预览
 * 用途：预览所有 visual-step 布局效果
 * 访问：/#/lesson/00 或 /#/slide/00/1
 */

export default {
  title: '动画布局合集',
  subtitle: '预览所有 visual-step 布局',
  total: 10,
  category: '演示工具',
  slides: [
    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '动画布局合集', subtitle: '预览所有 visual-step 布局', chapterTag: false,
      data: { accentWord: '动画', meta: ['开发预览用 · 非教学课程', '访问 /#/lesson/00'] }
    },

    /* ===== 02 目录 ===== */
    {
      id: 2, type: 'grid', title: '包含哪些布局', subtitle: '5 种可视化布局',
      data: {
        cards: [
          { icon: '🗼', title: 'hanoi', desc: '汉诺塔<br>柱子 + 盘子' },
          { icon: '📚', title: 'stack', desc: '栈<br>纵向堆叠方块' },
          { icon: '🚶', title: 'queue', desc: '队列<br>横向排列方块' },
          { icon: '📊', title: 'array-bar', desc: '数组柱状图<br>值 = 柱高' },
          { icon: '🔗', title: 'linked-list', desc: '链表<br>节点 + 箭头' }
        ],
        extra: {
          title: '💡 使用方式',
          desc: '每个布局由三部分组成：<br>① <b>布局插件</b>（`src/lib/visual-layouts/*.js`）<br>② <b>动画数据</b>（`src/data/animations/*.js`）<br>③ <b>通用渲染组件</b>（`VisualStepSlide.vue`）<br><br>新增布局只需写一个 `.js` 文件，注册后即可用。'
        }
      }
    },

    /* ===== 03 汉诺塔 ===== */
    {
      id: 3, type: 'hanoi-animation', title: '汉诺塔动画', subtitle: '4 个盘子，15 步', chapterTag: '预览 · 动画组件',
      data: {
        config: { pegs: ['A', 'B', 'C'], maxDisks: 3 },
        phases: [
          { id: 1, name: '阶段 ①', desc: '把 A 上 2 个盘移到 B', range: [0, 4] },
          { id: 2, name: '阶段 ②', desc: '把最大盘移到 C', range: [4, 5] },
          { id: 3, name: '阶段 ③', desc: '把 B 上 2 个盘移到 C', range: [5, 8] }
        ],
        steps: [
          { state: { A: [3, 2, 1], B: [], C: [] }, note: '3 个盘在 A 柱。' },
          { state: { A: [3, 2], B: [], C: [1] }, move: { from: 'A', to: 'C', disk: 1 }, note: '盘 1：A → C' },
          { state: { A: [3], B: [2], C: [1] }, move: { from: 'A', to: 'B', disk: 2 }, note: '盘 2：A → B' },
          { state: { A: [3], B: [2, 1], C: [] }, move: { from: 'C', to: 'B', disk: 1 }, note: '盘 1：C → B（阶段 ① 完成）' },
          { state: { A: [], B: [2, 1], C: [3] }, move: { from: 'A', to: 'C', disk: 3 }, note: '盘 3：A → C（阶段 ②）' },
          { state: { A: [1], B: [2], C: [3] }, move: { from: 'B', to: 'A', disk: 1 }, note: '盘 1：B → A（阶段 ③ 开始）' },
          { state: { A: [1], B: [], C: [3, 2] }, move: { from: 'B', to: 'C', disk: 2 }, note: '盘 2：B → C' },
          { state: { A: [], B: [], C: [3, 2, 1] }, move: { from: 'A', to: 'C', disk: 1 }, note: '盘 1：A → C（完成！）' }
        ],
        extra: {
          title: '💡 汉诺塔布局',
          desc: '绝对定位 + CSS transition。<br>盘子通过 <code>left/bottom</code> 的过渡平滑移动。<br>适合：需要元素"飞跃"的场景。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 04 栈 ===== */
    {
      id: 4, type: 'stack-animation', title: '栈的 push / pop', subtitle: '后进先出（LIFO）', chapterTag: '预览 · 动画组件',
      data: {
        steps: [
          {
            state: { items: [] },
            op: '空栈',
            note: '初始状态：栈是空的。'
          },
          {
            state: { items: [{ id: 'a', value: 10 }] },
            op: 'push(10)',
            note: '把 <b>10</b> 压入栈。<br>此时栈顶是 10。'
          },
          {
            state: { items: [{ id: 'a', value: 10 }, { id: 'b', value: 20 }] },
            op: 'push(20)',
            note: '把 <b>20</b> 压入栈。<br>栈顶变成 20。'
          },
          {
            state: { items: [{ id: 'a', value: 10 }, { id: 'b', value: 20 }, { id: 'c', value: 30 }] },
            op: 'push(30)',
            note: '把 <b>30</b> 压入栈。<br>栈顶变成 30。<br>栈里元素：10、20、30（从底到顶）。'
          },
          {
            state: { items: [{ id: 'a', value: 10 }, { id: 'b', value: 20 }] },
            op: 'pop() → 30',
            note: '弹出栈顶：<b>30</b> 被移除。<br>这就是"<b>后进先出</b>"——最后进的先出。'
          },
          {
            state: { items: [{ id: 'a', value: 10 }] },
            op: 'pop() → 20',
            note: '再弹一次：<b>20</b> 被移除。'
          },
          {
            state: { items: [] },
            op: 'pop() → 10',
            note: '再弹一次：<b>10</b> 被移除，栈空。<br>🎯 <b>push 顺序 10, 20, 30 → pop 顺序 30, 20, 10</b>。'
          }
        ],
        extra: {
          title: '💡 为什么动画这么流畅',
          desc: '用 <b>flex-direction: column-reverse</b> 让数组 <code>[10, 20, 30]</code> 自然从底向上排列——<b>无需计算任何坐标</b>。<br>当状态变化时，Vue 的 <code>&lt;TransitionGroup&gt;</code> <b>自动检测元素顺序变化</b>，用 FLIP 算法计算"从旧位置到新位置"的路径，平滑过渡。<br><br><b>对比绝对定位方案</b>：<br>· 旧：手算 left / bottom，改一处动全身<br>· 新：改数据即可，动画全自动',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 05 队列 ===== */
    {
      id: 5, type: 'queue-animation', title: '队列的 enqueue / dequeue', subtitle: '先进先出（FIFO）', chapterTag: '预览 · 动画组件',
      data: {
        steps: [
          {
            state: { items: [] },
            op: '空队列',
            note: '初始状态：队列为空。'
          },
          {
            state: { items: [{ id: 'a', value: 10 }] },
            op: 'enqueue(10)',
            note: '把 <b>10</b> 加入队尾。<br>队头 = 队尾 = 10。'
          },
          {
            state: { items: [{ id: 'a', value: 10 }, { id: 'b', value: 20 }] },
            op: 'enqueue(20)',
            note: '把 <b>20</b> 加入队尾。<br>队头 10，队尾 20。'
          },
          {
            state: { items: [{ id: 'a', value: 10 }, { id: 'b', value: 20 }, { id: 'c', value: 30 }] },
            op: 'enqueue(30)',
            note: '把 <b>30</b> 加入队尾。<br>队列：10、20、30（从左到右）。'
          },
          {
            state: { items: [{ id: 'b', value: 20 }, { id: 'c', value: 30 }] },
            op: 'dequeue() → 10',
            note: '队头 <b>10</b> 出队。<br>这就是"<b>先进先出</b>"——最先进的先出。'
          },
          {
            state: { items: [{ id: 'c', value: 30 }] },
            op: 'dequeue() → 20',
            note: '队头 <b>20</b> 出队。'
          },
          {
            state: { items: [] },
            op: 'dequeue() → 30',
            note: '队头 <b>30</b> 出队，队列空。<br>🎯 <b>入队顺序 10, 20, 30 → 出队顺序 10, 20, 30</b>。'
          }
        ],
        extra: {
          title: '💡 队列 vs 栈',
          desc: '<b>栈</b>：后进先出（LIFO）——像叠盘子<br><b>队列</b>：先进先出（FIFO）——像排队买票<br><br>两者都是"线性表"，只是"出入口"位置不同。<br>栈只有一端操作，队列两端操作。<br><b>应用场景</b>：<br>· 栈：函数调用、括号匹配、撤销操作<br>· 队列：BFS、任务调度、消息队列',
          variant: 'card-primary'
        }
      }
    }, 
        /* ===== 06 排序动画 ===== */
    {
      id: 6, type: 'sort-animation', title: '冒泡排序：第 1 轮', subtitle: '相邻比较 + 交换', chapterTag: '预览 · 动画组件',
      data: {
        config: { maxVal: 100 },
        steps: [
          {
            state: {
              items: [
                { id: 'a', value: 50 },
                { id: 'b', value: 30 },
                { id: 'c', value: 80 },
                { id: 'd', value: 20 },
                { id: 'e', value: 60 },
                { id: 'f', value: 40 }
              ],
              highlight: []
            },
            op: '初始状态',
            note: '6 个数：50, 30, 80, 20, 60, 40。<br>目标：从小到大排列。<br>冒泡排序：<b>相邻两个比较，大的往后换</b>。'
          },
          {
            state: {
              items: [
                { id: 'a', value: 50 },
                { id: 'b', value: 30 },
                { id: 'c', value: 80 },
                { id: 'd', value: 20 },
                { id: 'e', value: 60 },
                { id: 'f', value: 40 }
              ],
              highlight: ['a', 'b']
            },
            op: '比较 50 和 30',
            note: '比较第 1、2 个：<b>50 > 30</b>，需要交换。'
          },
          {
            state: {
              items: [
                { id: 'b', value: 30 },
                { id: 'a', value: 50 },
                { id: 'c', value: 80 },
                { id: 'd', value: 20 },
                { id: 'e', value: 60 },
                { id: 'f', value: 40 }
              ],
              highlight: ['a', 'c']
            },
            op: '交换完成，比较 50 和 80',
            note: '✅ 50 和 30 已交换。<br>接着比较 50 和 80：<b>50 < 80</b>，不交换。'
          },
          {
            state: {
              items: [
                { id: 'b', value: 30 },
                { id: 'a', value: 50 },
                { id: 'c', value: 80 },
                { id: 'd', value: 20 },
                { id: 'e', value: 60 },
                { id: 'f', value: 40 }
              ],
              highlight: ['c', 'd']
            },
            op: '比较 80 和 20',
            note: '比较 80 和 20：<b>80 > 20</b>，需要交换。'
          },
          {
            state: {
              items: [
                { id: 'b', value: 30 },
                { id: 'a', value: 50 },
                { id: 'd', value: 20 },
                { id: 'c', value: 80 },
                { id: 'e', value: 60 },
                { id: 'f', value: 40 }
              ],
              highlight: ['c', 'e']
            },
            op: '交换完成，比较 80 和 60',
            note: '✅ 80 和 20 已交换。<br>接着比较 80 和 60：<b>80 > 60</b>，需要交换。'
          },
          {
            state: {
              items: [
                { id: 'b', value: 30 },
                { id: 'a', value: 50 },
                { id: 'd', value: 20 },
                { id: 'e', value: 60 },
                { id: 'c', value: 80 },
                { id: 'f', value: 40 }
              ],
              highlight: ['c', 'f']
            },
            op: '交换完成，比较 80 和 40',
            note: '✅ 80 和 60 已交换。<br>接着比较 80 和 40：<b>80 > 40</b>，需要交换。'
          },
          {
            state: {
              items: [
                { id: 'b', value: 30 },
                { id: 'a', value: 50 },
                { id: 'd', value: 20 },
                { id: 'e', value: 60 },
                { id: 'f', value: 40 },
                { id: 'c', value: 80 }
              ],
              highlight: [],
              done: ['c']
            },
            op: '第 1 轮完成',
            note: '🎯 <b>第 1 轮结束</b>：最大值 <b>80</b> 已"冒泡"到末尾。<br>它已经在最终位置了（绿色标记）。<br>下一轮只需比较前 5 个。'
          }
        ],
        extra: {
          title: '💡 冒泡排序的本质',
          desc: '每一轮，最大的元素都会"冒"到未排序区的末尾。<br>所以 n 个数只需 <b>n-1 轮</b>。<br><br><b>时间复杂度</b>：O(n²)<br>6 个数约 15 次比较。<br>100 个数约 5000 次；1000 个数约 50 万次。<br><br><b>动画原理</b>：用 flex 布局排列柱子，用 <code>&lt;TransitionGroup&gt;</code> 的 FLIP 算法自动处理交换动画——<b>无需手写任何坐标</b>。',
          variant: 'card-primary'
        }
      }
    },
    /* ===== 07 链表动画 ===== */
    {
      id: 7, type: 'linked-list-animation', title: '链表：插入节点', subtitle: '改两条指针，无需搬动数据', chapterTag: '预览 · 动画组件',
      data: {
        steps: [
          {
            state: {
              nodes: [
                { id: 'n1', value: 10 },
                { id: 'n2', value: 20 },
                { id: 'n3', value: 30 }
              ],
              highlight: []
            },
            op: '初始链表',
            note: '一条 3 节点链表：<b>10 → 20 → 30 → ∧</b>。<br>每个节点存"值"和"下一个节点的地址"。'
          },
          {
            state: {
              nodes: [
                { id: 'n1', value: 10 },
                { id: 'n2', value: 20 },
                { id: 'n3', value: 30 }
              ],
              highlight: ['n2']
            },
            op: '定位',
            note: '想在 <b>20 之后</b>插入新节点 15。<br>先找到 20 这个节点（橙色）。'
          },
          {
            state: {
              nodes: [
                { id: 'n1', value: 10 },
                { id: 'n2', value: 20 },
                { id: 'new', value: 15 },
                { id: 'n3', value: 30 }
              ],
              highlight: [],
              inserted: 'new'
            },
            op: '插入 15',
            note: '插入新节点 15（绿色闪光）：<br>① 15 的 next 指向 30<br>② 20 的 next 指向 15<br><b>只改两条链，其他节点一动不动！</b>'
          }
        ],
        extra: {
          title: '💡 链表 vs 数组',
          desc: '<b>数组插入</b>：要搬动后面所有元素<br>例：在 1000 个元素的数组里插入，平均搬 500 个<br><br><b>链表插入</b>：只改两条指针<br>不管链表多长，插入只花 <b>O(1)</b><br><br>代价：链表<b>不能随机访问</b>。<br>访问第 k 个元素要从头走 k 步，<b>O(n)</b>。<br><b>各有取舍</b>：数组重查询，链表重修改。',
          variant: 'card-primary'
        }
      }
    },

        /* ===== 08 树动画 ===== */
    {
      id: 8, type: 'tree-animation', title: '二叉树前序遍历', subtitle: '根 → 左 → 右', chapterTag: '预览 · 动画组件',
      data: {
        tree: {
          id: 'root', value: 1,
          left: {
            id: 'n2', value: 2,
            left: { id: 'n4', value: 4 },
            right: { id: 'n5', value: 5 }
          },
          right: {
            id: 'n3', value: 3,
            left: { id: 'n6', value: 6 },
            right: { id: 'n7', value: 7 }
          }
        },
        steps: [
          { visit: 'root', visited: [], note: '开始前序遍历：<b>根 → 左 → 右</b>。' },
          { visit: 'root', visited: ['root'], note: '① 访问根节点 <b>1</b>。' },
          { visit: 'n2', visited: ['root', 'n2'], note: '② 访问左子 <b>2</b>。' },
          { visit: 'n4', visited: ['root', 'n2', 'n4'], note: '③ 访问 2 的左子 <b>4</b>。' },
          { visit: 'n5', visited: ['root', 'n2', 'n4', 'n5'], note: '④ 访问 2 的右子 <b>5</b>。<br>2 的子树遍历完。' },
          { visit: 'n3', visited: ['root', 'n2', 'n4', 'n5', 'n3'], note: '⑤ 回到根，访问右子 <b>3</b>。' },
          { visit: 'n6', visited: ['root', 'n2', 'n4', 'n5', 'n3', 'n6'], note: '⑥ 访问 3 的左子 <b>6</b>。' },
          { visit: 'n7', visited: ['root', 'n2', 'n4', 'n5', 'n3', 'n6', 'n7'], note: '⑦ 访问 3 的右子 <b>7</b>。<br>✅ 前序：<b>1 2 4 5 3 6 7</b>' }
        ],
        extra: {
          title: '💡 三种遍历只差"根在哪"',
          desc: '<b>前序</b>：根 → 左 → 右 = 1 2 4 5 3 6 7<br><b>中序</b>：左 → 根 → 右 = 4 2 5 1 6 3 7<br><b>后序</b>：左 → 右 → 根 = 4 5 2 6 7 3 1<br><br>把"访问根"的动作换个位置，就是三种遍历。<br>它们的代码只差一行 <code>cout</code> 的位置。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 二分查找 ===== */
    {
      id: 9, type: 'binary-search-animation', title: '二分查找', subtitle: 'O(log n) 的查找', chapterTag: '预览 · 动画组件',
      data: {
        target: 23,
        items: [
          { id: 'a', value: 3 },
          { id: 'b', value: 7 },
          { id: 'c', value: 11 },
          { id: 'd', value: 15 },
          { id: 'e', value: 19 },
          { id: 'f', value: 23 },
          { id: 'g', value: 27 },
          { id: 'h', value: 31 }
        ],
        steps: [
          { left: 0, right: 7, mid: -1, note: '有序数组，目标 <b>23</b>。<br>初始：L=0，R=7。' },
          { left: 0, right: 7, mid: 3, note: '中点 M = (0+7)/2 = <b>3</b>，a[3] = 15。<br>15 < 23，目标在<b>右半区</b>。' },
          { left: 4, right: 7, mid: 5, note: 'L = M+1 = 4，R = 7。<br>M = (4+7)/2 = <b>5</b>，a[5] = 23。<br>✅ 找到目标！' }
        ],
        extra: {
          title: '💡 为什么是 O(log n)',
          desc: '每次比较后，搜索区间<b>减半</b>。<br>n → n/2 → n/4 → ... → 1<br>只需 log₂(n) 次。<br><br>n=100 时约 7 次；n=100 万时约 20 次。<br>比顺序查找 O(n) 快无数倍。<br><b>前提：数组必须有序。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 图遍历 ===== */
    {
      id: 10, type: 'graph-animation', title: '图的 BFS 遍历', subtitle: '广度优先搜索', chapterTag: '预览 · 动画组件',
      data: {
        nodes: [
          { id: 'A', label: 'A', x: 310, y: 40 },
          { id: 'B', label: 'B', x: 160, y: 130 },
          { id: 'C', label: 'C', x: 460, y: 130 },
          { id: 'D', label: 'D', x: 90, y: 240 },
          { id: 'E', label: 'E', x: 240, y: 240 },
          { id: 'F', label: 'F', x: 400, y: 240 },
          { id: 'G', label: 'G', x: 520, y: 240 }
        ],
        edges: [
          { from: 'A', to: 'B' },
          { from: 'A', to: 'C' },
          { from: 'B', to: 'D' },
          { from: 'B', to: 'E' },
          { from: 'C', to: 'F' },
          { from: 'C', to: 'G' }
        ],
        steps: [
          { visit: null, visited: [], queue: [], note: '初始：从 A 出发，BFS。' },
          { visit: 'A', visited: ['A'], queue: ['B', 'C'], note: '① 访问 <b>A</b>。<br>把邻居 B、C 入队。' },
          { visit: 'B', visited: ['A', 'B'], queue: ['C', 'D', 'E'], note: '② 出队 B，访问 <b>B</b>。<br>把 D、E 入队。' },
          { visit: 'C', visited: ['A', 'B', 'C'], queue: ['D', 'E', 'F', 'G'], note: '③ 出队 C，访问 <b>C</b>。<br>把 F、G 入队。' },
          { visit: 'D', visited: ['A', 'B', 'C', 'D'], queue: ['E', 'F', 'G'], note: '④ 出队 D，访问 <b>D</b>。' },
          { visit: 'E', visited: ['A', 'B', 'C', 'D', 'E'], queue: ['F', 'G'], note: '⑤ 出队 E，访问 <b>E</b>。' },
          { visit: 'F', visited: ['A', 'B', 'C', 'D', 'E', 'F'], queue: ['G'], note: '⑥ 出队 F，访问 <b>F</b>。' },
          { visit: 'G', visited: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], queue: [], note: '⑦ 出队 G，访问 <b>G</b>。<br>✅ BFS 完成：<b>A B C D E F G</b>（按层序）。' }
        ],
        extra: {
          title: '💡 BFS 靠队列，DFS 靠栈',
          desc: '<b>BFS</b>：用<b>队列</b>存待访问节点<br>访问顺序：按"层"扩展<br>应用：最短路（无权图）、社交网络"几度人脉"<br><br><b>DFS</b>：用<b>栈</b>（或递归）<br>访问顺序：一条路走到底<br>应用：连通性、拓扑排序、回溯<br><br>同一张图，用队列是 BFS，用栈是 DFS。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 DP 填表 ===== */
    {
      id: 11, type: 'dp-table-animation', title: '01 背包 DP', subtitle: '逐格填表，从子问题到原问题', chapterTag: '预览 · 动画组件',
      data: {
        rows: 3,
        cols: 5,
        rowLabels: ['物品1(2kg,3元)', '物品2(3kg,4元)', '物品3(1kg,2元)'],
        colLabels: ['0kg', '1kg', '2kg', '3kg', '4kg'],
        steps: [
          {
            filled: [],
            note: '初始 dp 表全为 0。<br>行 = 物品编号，列 = 剩余容量。'
          },
          {
            filled: [{ row: 0, col: 2, value: 3 }],
            row: 0, col: 2,
            deps: [],
            formula: 'dp[0][2] = max(不选, 选) = max(0, 3) = <code>3</code>',
            note: '物品1（2kg）放入容量 2：<b>恰好装满，值 = 3</b>。'
          },
          {
            filled: [{ row: 0, col: 2, value: 3 }, { row: 1, col: 2, value: 3 }],
            row: 1, col: 2,
            deps: [{ row: 0, col: 2 }],
            formula: 'dp[1][2] = max(dp[0][2], …) = max(3, 不装) = <code>3</code>',
            note: '物品2（3kg）放不下容量 2。<br>直接继承上一行 dp[0][2]。'
          },
          {
            filled: [
              { row: 0, col: 2, value: 3 },
              { row: 1, col: 2, value: 3 },
              { row: 1, col: 3, value: 4 }
            ],
            row: 1, col: 3,
            deps: [],
            formula: 'dp[1][3] = max(不选=3, 选=4) = <code>4</code>',
            note: '物品2（3kg）放入容量 3：<b>装满，值 = 4</b>。'
          },
          {
            filled: [
              { row: 0, col: 2, value: 3 },
              { row: 1, col: 2, value: 3 },
              { row: 1, col: 3, value: 4 },
              { row: 2, col: 4, value: 6 }
            ],
            row: 2, col: 4,
            deps: [{ row: 1, col: 3 }],
            formula: 'dp[2][4] = max(不选=4, 选=4+2) = <code>6</code>',
            note: '物品3（1kg）放入容量 4：<br>不选：dp[1][4] = 4<br>选：2 + dp[1][3] = 2+4 = <b>6</b><br>✅ 最优解 = <b>6</b>'
          }
        ],
        extra: {
          title: '💡 DP 的两大要素',
          desc: '<b>① 状态定义</b>：dp[i][j] = 前 i 个物品、容量 j 时的最大价值<br><b>② 转移方程</b>：dp[i][j] = max(不选第 i 个, 选第 i 个)<br><br><b>关键</b>：每个格子的值由"上一行"和"本行左边的某列"推出。<br>所以可以一列列算，也可以一行行算。<br>这就是"从子问题到原问题"的过程。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 结束页 ===== */
    {
      id: 11, type: 'ending', title: '预览结束', subtitle: '所有布局演示完毕', chapterTag: false,
      data: {
        slogan: '开发预览用 · 后续课程陆续接入',
        extra: {
          title: '🌟 如何新增一个布局',
          desc: '<b>3 步搞定</b>：<br>① 在 `src/lib/visual-layouts/` 下新建 `xxx.js`，实现 `setup(config, stageSize).render(state)`<br>② 在 `index.js` 注册<br>③ 数据文件里用 `layout: \'xxx\'` 引用<br><br>组件会自动渲染，无需改 `VisualStepSlide.vue`。',
          variant: 'card-glow'
        }
      }
    }
  ]
};
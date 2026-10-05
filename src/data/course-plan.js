/**
 * course-plan.js · 课程完整蓝图（57 讲）
 * 唯一可信来源：新增/调整讲次时，改这里
 */

export default [
  /* ========== 阶段一：编程基础（1—10） ========== */
  { id: '01', stage: '编程基础', title: '初识 C++', subtitle: '第一个程序与 OJ 提交',
    core: '程序 = 指令 + 数据',
    points: ['cout 输出', '编译运行', 'OJ 提交'],
    difficulty: '⭐⭐', anim: '—', fore: '0 和 1 → 第 22 讲' },

  { id: '02', stage: '编程基础', title: '变量与整数类型', subtitle: '让程序学会记住数据',
    core: '变量 = 有类型的盒子',
    points: ['变量定义', 'cin 输入', 'int / long long', 'const'],
    difficulty: '⭐⭐⭐', anim: '—', fore: 'int 21 亿 → 第 22 讲' },

  { id: '03', stage: '编程基础', title: '小数、字符、布尔与类型转换', subtitle: '数据的多种面孔',
    core: '不同类型住不同的家',
    points: ['double / char / bool', '类型转换', '整数除法陷阱'],
    difficulty: '⭐⭐⭐⭐', anim: '—', fore: 'ASCII、浮点精度 → 第 22 / 41 讲' },

  { id: '04', stage: '编程基础', title: '运算符与分支', subtitle: '让程序学会判断',
    core: '运算符 = 工具，分支 = 岔路口',
    points: ['四类运算符', 'if / else if / else', 'switch'],
    difficulty: '⭐⭐⭐', anim: '—', fore: '位运算 → 第 21 讲；条件本质 0/1 → 第 22 讲' },

  { id: '05', stage: '编程基础', title: '循环结构', subtitle: '让程序学会重复',
    core: '循环 = 转圈',
    points: ['while / for', '循环嵌套', 'break / continue'],
    difficulty: '⭐⭐⭐⭐', anim: 'evolution（while 演化）', fore: '循环效率 → 第 36 讲' },

  { id: '06', stage: '编程基础', title: '一维数组', subtitle: '一排储物柜，批量装数据',
    core: '数组 = 储物柜',
    points: ['定义与访问', '遍历', '越界', '计数数组'],
    difficulty: '⭐⭐⭐', anim: 'evolution（求和累加）', fore: '连续内存 → 第 27 讲；不连续 → 第 27 讲链表' },

  { id: '07', stage: '编程基础', title: '字符串基础', subtitle: '一串字符的容器',
    core: '字符串 = 文字项链',
    points: ['char vs string', 'cin vs getline', '遍历', '统计 / 回文 / 逆序'],
    difficulty: '⭐⭐⭐', anim: '—', fore: '常用函数 → 第 12 讲' },

  { id: '08', stage: '编程基础', title: '函数', subtitle: '让代码可以复用',
    core: '函数 = 料理机',
    points: ['定义与调用', '形参实参', '值传递', '作用域'],
    difficulty: '⭐⭐⭐⭐', anim: 'function-call（调用栈）+ evolution（值传递）', fore: '函数调用栈 → 第 25 讲栈' },

  { id: '09', stage: '编程基础', title: '递归', subtitle: '函数调用自己',
    core: '递归 = 套娃',
    points: ['递归三要素', '求和 / 阶乘 / 数字反转', '复杂度'],
    difficulty: '⭐⭐⭐⭐', anim: 'function-call + evolution', fore: '栈溢出 → 第 25 讲；DP 记忆化 → 第 20 讲' },

  { id: '10', stage: '编程基础', title: '阶段实战', subtitle: '第一阶段模拟赛',
    core: '综合运用',
    points: ['模拟赛 3 题', '错题精讲', '知识串讲'],
    difficulty: '—', anim: 'function-call（挑战题演示）', fore: '剪枝 → 第 45 讲' },

  /* ========== 阶段二：算法入门（11—24） ========== */
  { id: '11', stage: '算法入门', title: '二维数组', subtitle: '数组的数组，表格的世界',
    core: '二维数组 = 表格',
    points: ['定义与访问', '双重循环', '对角线', '转置'],
    difficulty: '⭐⭐⭐', anim: '—', fore: '二维前缀和 → 第 19 讲；按行展开 → 第 27 讲' },

  { id: '12', stage: '算法入门', title: '字符串进阶', subtitle: '打开字符串的工具箱',
    core: '字符串的工具箱',
    points: ['substr / find / replace', '双指针', '字符串匹配', '中心扩展'],
    difficulty: '⭐⭐⭐', anim: 'evolution（中心扩展）', fore: 'KMP → 第 46 讲；双指针进阶 → 第 42 讲' },

  { id: '13', stage: '算法入门', title: '排序基础', subtitle: '让数据排好队',
    core: '排序 = 排队',
    points: ['冒泡 / 选择 / 插入', '稳定性', '三种对比'],
    difficulty: '⭐⭐⭐', anim: 'sort ×3（冒泡/选择/插入）', fore: 'sort 内部实现 → 第 14 讲；逆序对 → 第 46 讲' },

  { id: '14', stage: '算法入门', title: '排序进阶与 STL', subtitle: '一行代码的排序',
    core: '容器 = 工具盒',
    points: ['sort', 'cmp 自定义比较', '结构体排序', '去重'],
    difficulty: '⭐⭐⭐', anim: '—', fore: '内省排序 → 第 46 讲' },

  { id: '15', stage: '算法入门', title: '查找与二分', subtitle: '二分 = 翻字典',
    core: '二分 = 翻字典',
    points: ['顺序查找', '二分查找', '二分答案'],
    difficulty: '⭐⭐⭐⭐', anim: 'binary-search', fore: '二分答案 → 第 43 讲搜索' },

  { id: '16', stage: '算法入门', title: '枚举与模拟', subtitle: '枚举 = 逐个试',
    core: '枚举 = 逐个试',
    points: ['枚举思想', '模拟题', '暴力优化'],
    difficulty: '⭐⭐', anim: '—', fore: '—' },

  { id: '17', stage: '算法入门', title: '递推', subtitle: '递推 = 多米诺',
    core: '递推 = 多米诺',
    points: ['递推关系', '杨辉三角', '递推 vs 递归'],
    difficulty: '⭐⭐⭐', anim: 'evolution', fore: 'DP → 第 20 讲' },

  { id: '18', stage: '算法入门', title: '贪心入门', subtitle: '贪心 = 每次选最好',
    core: '贪心 = 每次选最好',
    points: ['贪心思想', '区间调度', '排序贪心'],
    difficulty: '⭐⭐⭐', anim: '—', fore: '贪心正确性证明 → 第 46 讲' },

  { id: '19', stage: '算法入门', title: '前缀和与差分', subtitle: '前缀和 = 账本',
    core: '前缀和 = 账本',
    points: ['一维前缀和', '差分', '二维前缀和'],
    difficulty: '⭐⭐⭐⭐', anim: 'evolution（累加）', fore: '前缀和优化 DP → 第 20 讲' },

  { id: '20', stage: '算法入门', title: '简单 DP', subtitle: 'DP = 记笔记',
    core: 'DP = 记笔记',
    points: ['DP 概念', '01 背包', '记忆化搜索', '斐波那契优化'],
    difficulty: '⭐⭐⭐⭐', anim: 'dp-table（01 背包）', fore: '状态设计 → 第 49 讲' },

  { id: '21', stage: '算法入门', title: '位运算入门', subtitle: '位运算 = 二进制工具',
    core: '位运算 = 二进制工具',
    points: ['位运算基础', '常用技巧', '状态压缩入门'],
    difficulty: '⭐⭐⭐', anim: '—', fore: '状态压缩 DP → 第 51 讲' },

  { id: '22', stage: '算法入门', title: '进制与编码', subtitle: '二进制、ASCII、原码反码补码',
    core: '进制 = 计数方式',
    points: ['二进制', '进制转换', 'ASCII / Unicode', '原码反码补码'],
    difficulty: '⭐⭐⭐', anim: '—', fore: '—（本讲回收重镇）' },

  { id: '23', stage: '算法入门', title: '结构体', subtitle: '结构体 = 名片',
    core: '结构体 = 名片',
    points: ['定义', '结构体数组', '结构体排序'],
    difficulty: '⭐⭐', anim: '—', fore: '—' },

  { id: '24', stage: '算法入门', title: '阶段实战', subtitle: '第二阶段模拟赛',
    core: '综合运用',
    points: ['模拟赛 4 题', '错题精讲'],
    difficulty: '—', anim: '—', fore: '—' },

  /* ========== 阶段三：数据结构（25—35） ========== */
  { id: '25', stage: '数据结构', title: '栈', subtitle: '栈 = 叠盘子',
    core: '栈 = 叠盘子',
    points: ['定义', 'push / pop', '括号匹配', '表达式求值'],
    difficulty: '⭐⭐⭐', anim: 'stack', fore: '单调栈 → 第 42 讲' },

  { id: '26', stage: '数据结构', title: '队列', subtitle: '队列 = 排队',
    core: '队列 = 排队',
    points: ['定义', 'enqueue / dequeue', '循环队列', 'BFS 入门'],
    difficulty: '⭐⭐⭐', anim: 'queue', fore: '单调队列 → 第 42 讲；BFS → 第 31 讲' },

  { id: '27', stage: '数据结构', title: '链表', subtitle: '链表 = 手拉手',
    core: '链表 = 手拉手',
    points: ['单链表', '插入 / 删除', '反转', '合并'],
    difficulty: '⭐⭐⭐⭐', anim: 'linked-list', fore: '双向链表 → 第 33 讲哈希冲突链' },

  { id: '28', stage: '数据结构', title: '二叉树', subtitle: '树 = 家族谱',
    core: '树 = 家族谱',
    points: ['定义', '遍历（前中后序）', '层序遍历'],
    difficulty: '⭐⭐⭐', anim: 'tree', fore: '树形 DP → 第 49 讲' },

  { id: '29', stage: '数据结构', title: '堆与优先队列', subtitle: '堆 = 优先级',
    core: '堆 = 优先级',
    points: ['堆定义', '优先队列', '堆排序', 'Top-K'],
    difficulty: '⭐⭐⭐', anim: '—', fore: 'Dijkstra 堆优化 → 第 47 讲' },

  { id: '30', stage: '数据结构', title: '图的基础', subtitle: '图 = 关系网',
    core: '图 = 关系网',
    points: ['顶点 / 边', '有向 / 无向', '邻接矩阵 / 邻接表'],
    difficulty: '⭐⭐⭐', anim: 'graph', fore: '—' },

  { id: '31', stage: '数据结构', title: '图的遍历', subtitle: 'DFS 与 BFS',
    core: '遍历 = 走遍每个点',
    points: ['DFS', 'BFS', '连通性', '无权最短路'],
    difficulty: '⭐⭐⭐⭐', anim: 'graph', fore: '搜索进阶 → 第 43 / 44 讲' },

  { id: '32', stage: '数据结构', title: '并查集', subtitle: '并查集 = 朋友圈',
    core: '并查集 = 朋友圈',
    points: ['定义', '路径压缩', '按秩合并', '连通性判断'],
    difficulty: '⭐⭐⭐', anim: '—', fore: 'Kruskal → 第 48 讲' },

  { id: '33', stage: '数据结构', title: '哈希表', subtitle: '哈希 = 字典',
    core: '哈希 = 字典',
    points: ['哈希函数', '冲突处理', 'STL map / set'],
    difficulty: '⭐⭐⭐', anim: '—', fore: '—' },

  { id: '34', stage: '数据结构', title: '数据结构综合', subtitle: '选型与组合应用',
    core: '综合运用',
    points: ['数据结构选型', '组合应用', '综合题'],
    difficulty: '⭐⭐⭐', anim: '—', fore: '—' },

  { id: '35', stage: '数据结构', title: '阶段实战', subtitle: '第三阶段模拟赛',
    core: '综合运用',
    points: ['模拟赛 4 题', '错题精讲'],
    difficulty: '—', anim: '—', fore: '—' },

  /* ========== 阶段四：竞赛进阶（36—50） ========== */
  { id: '36', stage: '竞赛进阶', title: '复杂度分析', subtitle: '算法效率的度量',
    core: '复杂度 = 算法效率',
    points: ['时间复杂度', '空间复杂度', '常见复杂度对比'],
    difficulty: '⭐⭐⭐⭐', anim: '—', fore: '主定理 → 第 46 讲' },

  { id: '37', stage: '竞赛进阶', title: '数论基础', subtitle: 'GCD、LCM、同余',
    core: '数论 = 整数的秘密',
    points: ['GCD / LCM', '扩展欧几里得', '同余'],
    difficulty: '⭐⭐⭐⭐', anim: '—', fore: '中国剩余定理 → 第 40 讲' },

  { id: '38', stage: '竞赛进阶', title: '质数筛与快速幂', subtitle: '数字的原子',
    core: '质数 = 数字的原子',
    points: ['埃氏筛', '线性筛', '快速幂', '模运算'],
    difficulty: '⭐⭐⭐⭐', anim: '—', fore: 'Miller-Rabin → NOIP 长线' },

  { id: '39', stage: '竞赛进阶', title: '高精度', subtitle: '大数运算',
    core: '高精度 = 大数运算',
    points: ['高精度加减乘除', '大数比较'],
    difficulty: '⭐⭐⭐', anim: '—', fore: '—' },

  { id: '40', stage: '竞赛进阶', title: '排列组合', subtitle: '组合 = 计数',
    core: '组合 = 计数',
    points: ['排列 / 组合', '二项式定理', '杨辉三角'],
    difficulty: '⭐⭐⭐⭐', anim: '—', fore: '组合数取模 → 第 49 讲' },

  { id: '41', stage: '竞赛进阶', title: '概率与期望入门', subtitle: '概率 = 可能性',
    core: '概率 = 可能性',
    points: ['古典概型', '条件概率', '期望', '线性期望'],
    difficulty: '⭐⭐⭐⭐', anim: '—', fore: '—' },

  { id: '42', stage: '竞赛进阶', title: '双指针与滑动窗口', subtitle: '两头往中间',
    core: '双指针 = 两头往中间',
    points: ['双指针', '滑动窗口', '单调队列优化'],
    difficulty: '⭐⭐⭐⭐', anim: '—', fore: '—（回收第 7 讲）' },

  { id: '43', stage: '竞赛进阶', title: '搜索进阶：DFS', subtitle: '深度优先',
    core: 'DFS = 深度优先',
    points: ['DFS 框架', '剪枝', '记忆化搜索'],
    difficulty: '⭐⭐⭐⭐', anim: 'graph', fore: '—' },

  { id: '44', stage: '竞赛进阶', title: '搜索进阶：BFS', subtitle: '广度优先',
    core: 'BFS = 广度优先',
    points: ['BFS 框架', '双向 BFS', '状态压缩 BFS'],
    difficulty: '⭐⭐⭐⭐', anim: 'graph', fore: '—' },

  { id: '45', stage: '竞赛进阶', title: '回溯与剪枝', subtitle: '试错 + 撤销',
    core: '回溯 = 试错 + 撤销',
    points: ['回溯框架', 'N 皇后', '数独', '剪枝策略'],
    difficulty: '⭐⭐⭐⭐', anim: '—', fore: '—（回收第 10 讲剪枝伏笔）' },

  { id: '46', stage: '竞赛进阶', title: '分治与归并排序', subtitle: '分而治之',
    core: '分治 = 分而治之',
    points: ['分治思想', '归并排序', '逆序对', '快速排序'],
    difficulty: '⭐⭐⭐⭐', anim: 'sort（归并）', fore: '—（回收第 13 讲逆序对伏笔）' },

  { id: '47', stage: '竞赛进阶', title: '最短路', subtitle: 'Dijkstra、Floyd 等',
    core: '最短路 = 最短路径',
    points: ['Dijkstra', 'Floyd', 'Bellman-Ford', 'SPFA'],
    difficulty: '⭐⭐⭐⭐⭐', anim: 'graph', fore: '—（回收第 29 讲堆优化）' },

  { id: '48', stage: '竞赛进阶', title: '最小生成树与拓扑排序', subtitle: 'Kruskal、Prim、DAG',
    core: 'MST = 最小代价',
    points: ['Kruskal', 'Prim', '拓扑排序'],
    difficulty: '⭐⭐⭐⭐', anim: '—', fore: '—（回收第 32 讲并查集）' },

  { id: '49', stage: '竞赛进阶', title: '树形 DP', subtitle: '树上动态规划',
    core: '树形 DP',
    points: ['树形 DP 框架', '树上背包', '换根 DP'],
    difficulty: '⭐⭐⭐⭐⭐', anim: '—', fore: '—' },

  { id: '50', stage: '竞赛进阶', title: '阶段实战', subtitle: '第四阶段模拟赛',
    core: '综合运用',
    points: ['模拟赛 4 题', '错题精讲'],
    difficulty: '—', anim: '—', fore: '—' },

  /* ========== 阶段五：冲刺实战（51+） ========== */
  { id: '51', stage: '冲刺实战', title: 'DP 进阶', subtitle: '区间 / 状压 DP',
    core: 'DP 进阶',
    points: ['区间 DP', '状态压缩 DP'],
    difficulty: '⭐⭐⭐⭐⭐', anim: '—', fore: '—' },

  { id: '52', stage: '冲刺实战', title: '线段树入门', subtitle: '单点修改、区间查询',
    core: '线段树 = 区间管理',
    points: ['单点修改', '区间查询', 'lazy 标记'],
    difficulty: '⭐⭐⭐⭐⭐', anim: '—', fore: '—' },

  { id: '53', stage: '冲刺实战', title: '树状数组', subtitle: '单点修改、区间查询',
    core: '树状数组 = 二进制索引',
    points: ['单点修改', '区间查询', '逆序对'],
    difficulty: '⭐⭐⭐⭐', anim: '—', fore: '—' },

  { id: '54', stage: '冲刺实战', title: 'CSP-J 真题精讲（一）', subtitle: '近 3 年真题',
    core: '真题实战',
    points: ['T1 / T2 精讲', '常见坑点', '时间分配'],
    difficulty: '—', anim: '—', fore: '—' },

  { id: '55', stage: '冲刺实战', title: 'CSP-J 真题精讲（二）', subtitle: '近 3 年真题',
    core: '真题实战',
    points: ['T3 / T4 精讲', '算法组合', '调试技巧'],
    difficulty: '—', anim: '—', fore: '—' },

  { id: '56', stage: '冲刺实战', title: 'CSP-S 真题精讲（一）', subtitle: '近 3 年真题',
    core: '真题实战',
    points: ['T1 / T2 精讲', '提高组思维'],
    difficulty: '—', anim: '—', fore: '—' },

  { id: '57', stage: '冲刺实战', title: 'CSP-S 真题精讲（二）', subtitle: '近 3 年真题',
    core: '真题实战',
    points: ['T3 / T4 精讲', '高级算法应用'],
    difficulty: '—', anim: '—', fore: '—' }
];

/* 预备课（不在主阶段内） */
export const PREVIEW_LESSON = {
  id: '00', stage: '预备', title: '动画合集预览',
  subtitle: '先看看这门课能学什么',
  core: '课程导览',
  points: ['动画预览', '代码展示方式'],
  difficulty: '—', anim: '多个', fore: '—'
};

/* 阶段顺序 */
export const STAGE_ORDER = ['预备', '编程基础', '算法入门', '数据结构', '竞赛进阶', '冲刺实战'];
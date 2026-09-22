# C++ 课程课件系统

面向 6 年级—初二的 C++ 竞赛教学课件（Vue 3 + Vite）。

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:4000/

## 项目结构

```
src/
├── components/
│   ├── common/        # 公共 UI（CodeBlock / ExtraCard / IntroCard 等）
│   ├── slides/        # 16 种版式组件（自动注册）
│   ├── animations/    # 10 种动画组件
│   └── level-map/     # 练习页子组件
├── composables/       # 组合式函数（useStep / useSlide 等）
├── config/            # 角色 / 颜色 / 默认值
├── data/              # 课程数据（lesson-00 ~ lesson-48）
├── lib/               # 工具函数（如 tree-layout）
├── styles/            # 主题 / 布局 / 组件样式
└── views/             # 页面视图

public/codes/          # 各讲的 .cpp 示例文件
```

## 常用命令

| 命令 | 用途 |
|---|---|
| `npm run dev` | 开发模式 |
| `npm run build` | 构建生产包 |
| `npm run preview` | 预览构建产物 |
| `node verify-codes.js --check` | 验证 .cpp 编译 + 引用完整性 |

## 文档

| 文档 | 用途 |
|---|---|
| [docs/GUIDE.md](docs/GUIDE.md) | **写讲次必看**：数据格式、组件字段、内容规则、大纲 |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | **改组件必看**：技术栈、目录、动画系统、样式约定 |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | **查进度看**：版本记录、已完成讲次、伏笔清单 |

## 课程进度

- ✅ lesson-00：动画合集预览
- ✅ lesson-01 ~ lesson-08：C++ 语法核心 + 递归
- ⏳ lesson-09 ~ lesson-48：待生成

## 技术栈

Vue 3 · Vite · Vue Router · CSS 变量主题 · 数据驱动渲染

---

科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题
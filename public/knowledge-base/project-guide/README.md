# 项目说明

## 个人学习知识库系统

一个轻量级的学习资料管理系统，无需后台和数据库，纯前端实现。

---

## 功能特性

- 🏠 **图书馆首页** - 展示资料分类、统计数据、快速入口
- 📁 **分类浏览** - 按模块分类组织学习资料
- 🔍 **全文搜索** - 快速检索所需内容
- 📖 **Markdown渲染** - 支持Markdown格式，代码高亮
- 📱 **响应式设计** - 适配不同设备
- 🚀 **零依赖** - 无需后台和数据库

---

## 快速开始

### 方式一：npm启动（推荐）

```bash
cd web
npm start
```

然后访问 http://localhost:8080/web/index.html

### 方式二：PowerShell脚本

```powershell
cd web
.\start-node.ps1
```

### 方式三：双击启动

Windows用户可以直接双击 `start.bat` 文件启动

---

## 页面结构

### 首页（图书馆风格）
- 统计数据：文档总数、资料分类、标签数量
- 资料分类：卡片式展示各分类
- 快速入口：常用文档快捷访问

### 阅读页
- 左侧导航：折叠式目录树
- 主内容区：Markdown渲染
- 右侧目录：文章大纲导航

---

## 知识库结构

```
spring_study/
├── knowledge-base/                    # 知识库根目录
│   ├── ai-application/               # AI应用知识库
│   │   ├── 00-prologue/              # 序章
│   │   ├── 01-getting-started/       # 初识AI
│   │   ├── 02-understanding/         # 理解AI
│   │   ├── 03-using-tools/           # 使用AI
│   │   ├── 04-applying/              # 运用AI
│   │   ├── 05-advanced/              # 进阶探索
│   │   ├── appendix/                 # 附录
│   │   └── README.md
│   │
│   ├── ai-learning/                  # AI学习知识库
│   │   ├── 01-foundation/            # 基础认知
│   │   ├── 02-tools/                 # 工具掌握
│   │   ├── 03-practice/              # 实战应用
│   │   ├── appendix/                 # 附录
│   │   └── README.md
│   │
│   ├── spring-boot-learning/         # Spring Boot学习知识库
│   │   ├── docs/                     # 学习文档
│   │   │   ├── 00-index/             # 索引
│   │   │   ├── 01-foundation/        # 入门篇
│   │   │   ├── 02-core/              # 进阶篇-核心技术
│   │   │   ├── 03-web/               # 进阶篇-Web开发
│   │   │   ├── 04-data/              # 进阶篇-数据访问
│   │   │   ├── 05-security/          # 进阶篇-安全架构
│   │   │   ├── 07-microservice/      # 实战篇
│   │   │   └── README.md
│   │   ├── appendix/                 # 附录
│   │   ├── cheatsheets/              # 速查手册
│   │   └── README.md
│   │
│   └── project-guide/                # 项目说明（本目录）
│       └── README.md
│
├── web/                              # Web学习系统
│   ├── index.html                    # 主页面（首页+阅读页）
│   ├── css/style.css                 # 样式文件
│   ├── js/app.js                     # 核心逻辑
│   ├── data/index.json               # 资料索引配置
│   ├── package.json                  # Node.js配置
│   ├── start.bat                     # Windows启动脚本
│   └── start-node.ps1                # PowerShell启动脚本
│
└── .trae/                            # Trae IDE配置
    ├── documents/                    # 文档
    └── skills/                       # 自定义技能
```

---

## 知识库概览

### 🤖 AI应用

从零开始认识AI，循序渐进理解AI，将AI应用到工作中。

**学习路径**：序章 → 初识AI → 理解AI → 使用AI → 运用AI → 进阶探索

**主要内容**：
- AI基础概念与入门
- 2026年主流大模型介绍
- AI编程工具（Claude Code、Cursor、Trae等）
- AI智能体、MCP与Skills
- 各工作场景的AI应用

### 📖 AI学习

让每个人都能掌握AI，用AI改变工作和生活。

**学习路径**：基础认知 → 工具掌握 → 实战应用

**主要内容**：
- 大语言模型概述
- AI名词解释与核心概念
- AI编程工具与Agent工具
- AI工作流实践

### 📗 Spring Boot 2 学习资料

从架构师视角深入理解Spring Boot 2设计与原理。

**学习路径**：入门篇 → 进阶篇 → 实战篇

**主要内容**：
- Spring Boot架构与设计哲学
- IoC容器与AOP架构
- Spring MVC与RESTful API
- 事务管理与Spring Data JPA
- Spring Security安全架构
- 微服务架构设计

---

## 添加新知识库

### 1. 创建知识库目录

在 `knowledge-base/` 目录下创建新的知识库文件夹：

```bash
mkdir knowledge-base\新知识库名称
```

### 2. 添加文档

将学习资料（Markdown格式）放入新知识库目录中。

### 3. 更新索引配置

编辑 `web/data/index.json` 文件，添加新的知识库：

```json
{
  "books": [
    {
      "id": "new-knowledge-base",
      "title": "新知识库名称",
      "icon": "📚",
      "description": "知识库描述",
      "author": "作者",
      "chapters": [
        {
          "id": "chapter-1",
          "name": "章节名称",
          "icon": "📖",
          "description": "章节描述",
          "items": [
            {
              "id": "doc-id",
              "title": "文档标题",
              "description": "文档描述",
              "path": "/knowledge-base/新知识库名称/path/to/doc.md",
              "tags": ["标签1", "标签2"]
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 配置字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| id | 是 | 唯一标识符 |
| title | 是 | 知识库/文档标题 |
| icon | 否 | 图标（emoji） |
| description | 否 | 描述信息 |
| path | 是 | Markdown文件路径（相对于项目根目录，以/开头） |
| tags | 否 | 标签数组，用于搜索 |
| learningObjectives | 否 | 学习目标数组 |

---

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| Ctrl/Cmd + K | 打开搜索 |
| Esc | 关闭搜索弹窗 |

---

## 技术栈

- **前端框架**: 原生JavaScript
- **Markdown解析**: [marked.js](https://marked.js.org/)
- **代码高亮**: [highlight.js](https://highlightjs.org/)
- **样式**: 原生CSS3

---

## 后续扩展计划

- [ ] 阅读历史
- [ ] 收藏功能
- [ ] 学习进度追踪
- [ ] 暗黑模式
- [ ] 导出PDF
- [ ] 多语言支持

---

## 更新日志

- **2026年2月**：知识库重构，新增AI应用、AI学习知识库，Spring Boot学习资料完善
- **2025年**：初始版本

---

## 许可证

MIT License

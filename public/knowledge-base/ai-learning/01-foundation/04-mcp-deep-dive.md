# MCP协议深入解析

> 掌握AI的"万能插座"，让AI真正能"动手做事"

## 一、MCP是什么

### 1.1 一句话讲透MCP

把AI模型（如GPT、Claude）比作"聪明的大脑"，AI应用（如ChatGPT、Claude Cowork）是"大脑的嘴巴和耳朵"，API是"脑机接口"，而**MCP就是给这个"大脑"装上的"万能插座"**，让大脑能轻松连接外部所有工具、数据源，直接帮我们完成具体任务，而不只是"回答问题"。

### 1.2 为什么需要MCP

**以前的问题**：
```
用户："帮我整理本地文件夹里的文档"
AI："您可以手动整理，方法是..."
结果：AI只能"说"，不能"做"
```

**有了MCP后**：
```
用户："帮我整理本地文件夹里的文档"
AI：[通过MCP连接文件系统] → 自动分类、命名、汇总
结果：AI真正"做事"
```

### 1.3 MCP的核心价值

| 价值 | 说明 |
|------|------|
| **从"会说"到"会做"** | AI不再只能给建议，而是能直接执行任务 |
| **统一标准** | 一个协议连接所有工具，无需重复开发 |
| **即插即用** | 像USB一样，插上就能用 |
| **安全可控** | 权限管理清晰，数据安全可控 |

---

## 二、MCP架构详解

### 2.1 核心组件

```
┌─────────────────────────────────────────────────────────────┐
│                      MCP架构图                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐                                           │
│  │    Host      │  ← AI应用（如Claude Cowork、Cursor）     │
│  │  (宿主应用)   │                                           │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ↓                                                    │
│  ┌──────────────┐                                           │
│  │   Client     │  ← MCP客户端（内置在Host中）              │
│  │  (客户端)     │    负责与Server通信                       │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ↓                                                    │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐│
│  │   Server     │     │   Server     │     │   Server     ││
│  │ 文件系统MCP  │     │ 数据库MCP    │     │ GitHub MCP   ││
│  └──────────────┘     └──────────────┘     └──────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 三大核心能力

| 能力 | 说明 | 示例 |
|------|------|------|
| **Tools（工具）** | AI可调用的功能性接口 | 执行命令、查询数据库、发送邮件 |
| **Resources（资源）** | AI可访问的数据源 | 文件内容、数据库记录、API响应 |
| **Prompts（提示）** | 预定义的提示模板 | 常用任务模板、角色设定 |

### 2.3 工作流程

```
1. 用户提问："帮我查看这个项目的GitHub Issues"
                    ↓
2. Host（Claude Cowork）接收问题
                    ↓
3. Client识别需要GitHub数据
                    ↓
4. Client连接GitHub MCP Server
                    ↓
5. Server调用GitHub API获取Issues
                    ↓
6. Server返回数据给Client
                    ↓
7. AI基于数据生成回答
                    ↓
8. 用户看到完整的Issues分析
```

---

## 三、实用MCP服务器推荐

### 3.1 开发工具类

#### GitHub MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | 操作GitHub仓库、Issues、PR、代码 |
| **用途** | 查看Issues、创建PR、搜索代码、管理仓库 |
| **获取** | GitHub官方MCP Registry |
| **安装** | `npx @modelcontextprotocol/server-github` |

**使用场景**：
```
"查看这个仓库最近的Issues"
"帮我创建一个PR，合并feature分支到main"
"搜索这个项目中所有TODO注释"
```

#### Apifox MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | 连接Apifox API文档 |
| **用途** | 根据API文档生成代码、搜索接口 |
| **获取** | https://docs.apifox.com/apifox-mcp-server |
| **特点** | 支持私有化部署 |

**使用场景**：
```
"根据API文档，生成/users接口的调用代码"
"搜索所有与用户相关的API接口"
```

#### Chrome DevTools MCP

| 项目 | 说明 |
|------|------|
| **功能** | 控制Chrome开发者工具 |
| **用途** | 网页自动化测试、截图、性能分析 |
| **获取** | https://github.com/ChromeDevTools/chrome-devtools-mcp |
| **特点** | AI Agent操作浏览器的桥梁 |

**使用场景**：
```
"帮我截图这个网页"
"测试这个页面的性能"
"自动填写这个表单"
```

---

### 3.2 数据库类

#### Supabase MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | 操作Supabase数据库 |
| **用途** | 执行SQL查询、管理模式、调用API |
| **获取** | 腾讯云MCP广场 / PyPI |
| **安装** | `pipx install supabase-mcp` |

#### Qdrant MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | 向量数据库操作 |
| **用途** | 向量检索、相似度搜索、RAG应用 |
| **获取** | https://github.com/qdrant/mcp-server-qdrant |

#### Neo4j MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | 图数据库操作 |
| **用途** | 知识图谱查询、关系分析 |
| **获取** | GitHub MCP Registry |

---

### 3.3 搜索与信息类

#### Brave Search MCP

| 项目 | 说明 |
|------|------|
| **功能** | 网页搜索 |
| **用途** | 实时搜索互联网信息 |
| **获取** | `npx @modelcontextprotocol/server-brave-search` |

#### Kagi MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | Kagi搜索引擎集成 |
| **用途** | 高质量搜索结果 |
| **获取** | https://github.com/kagisearch/mcp-server-kagi |

#### Exa MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | AI搜索引擎 |
| **用途** | 语义搜索、内容发现 |
| **获取** | https://github.com/exa-labs/exa-mcp-server |

#### Tavily MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | AI优化的搜索API |
| **用途** | 研究搜索、深度信息检索 |
| **获取** | https://github.com/tavily-ai/tavily-mcp |

---

### 3.4 文件与存储类

#### Filesystem MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | 本地文件系统操作 |
| **用途** | 读写文件、目录管理 |
| **获取** | `npx @modelcontextprotocol/server-filesystem` |
| **安全** | 可配置允许访问的目录 |

**使用场景**：
```
"帮我整理下载文件夹"
"搜索所有包含'TODO'的文件"
"读取这个配置文件并分析"
```

#### Cloudflare MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | Cloudflare服务集成 |
| **用途** | CDN管理、DNS配置、Workers部署 |
| **获取** | https://github.com/cloudflare/mcp-server-cloudflare |

---

### 3.5 企业应用类

#### 企业微信 MCP Server

| 项目 | 说明 |
|------|------|
| **功能** | 企业微信机器人 |
| **用途** | 发送消息、Markdown、图片 |
| **获取** | https://github.com/wechat-bot/mcp-wecom |

**使用场景**：
```
"发送项目进度报告到企业微信群"
"通知团队明天的会议安排"
```

#### MemOS MCP

| 项目 | 说明 |
|------|------|
| **功能** | AI长期记忆系统 |
| **用途** | 记住用户偏好、历史交互、任务上下文 |
| **获取** | https://github.com/mem0ai/mem0-mcp |
| **特点** | 解决AI"记忆失忆"问题 |

---

## 四、如何安装和使用MCP

### 4.1 安装方式

**方式一：通过包管理器**
```bash
# Node.js环境
npx @modelcontextprotocol/server-filesystem /path/to/allowed/dir

# Python环境
pipx install mcp-server-name
```

**方式二：配置文件**

在Claude Cowork配置文件中添加：
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    },
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token"
      }
    }
  }
}
```

### 4.2 配置文件位置

| 平台 | 配置文件路径 |
|------|--------------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

### 4.3 验证安装

```
在Claude Cowork中问：
"你有哪些MCP工具可以使用？"

AI会列出所有已安装的MCP工具
```

---

## 五、MCP开发指南

### 5.1 使用FastMCP快速开发

FastMCP是开发MCP服务器的最佳工具：

```python
from fastmcp import FastMCP

mcp = FastMCP("我的工具")

@mcp.tool()
def hello(name: str) -> str:
    """向用户问好"""
    return f"你好，{name}！"

@mcp.resource("config://settings")
def get_config() -> str:
    """获取配置"""
    return "配置内容..."

if __name__ == "__main__":
    mcp.run()
```

### 5.2 开发最佳实践

| 原则 | 说明 |
|------|------|
| **单一职责** | 每个Server专注一个领域 |
| **安全优先** | 限制访问范围，验证输入 |
| **文档清晰** | 提供详细的功能说明 |
| **错误处理** | 优雅处理异常情况 |

---

## 六、MCP资源获取

### 6.1 官方资源

| 资源 | 地址 |
|------|------|
| MCP官方文档 | https://modelcontextprotocol.io |
| GitHub MCP Registry | https://github.com/modelcontextprotocol/servers |
| FastMCP | https://github.com/anthropics/fastmcp |

### 6.2 社区资源

| 资源 | 地址 |
|------|------|
| 腾讯云MCP广场 | https://cloud.tencent.com/developer/mcp |
| Apifox MCP推荐 | https://apifox.com/apiskills/mcp-server-tools |
| Smithery.ai | https://smithery.ai |

---

## 七、思考与练习

### 概念理解

1. **MCP与API有什么区别？为什么说MCP是"万能插座"？**

2. **MCP的三大核心能力（Tools、Resources、Prompts）分别解决什么问题？**

### 实践练习

3. **安装一个MCP服务器**
   - 选择Filesystem MCP或GitHub MCP
   - 完成配置并验证

4. **使用MCP完成一个实际任务**
   - 让AI通过MCP操作文件或查询GitHub

---

> **下一节**：[AI Skills深入解析](./04-ai-skills.md) - 了解AI技能系统，扩展AI能力

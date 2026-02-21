---
name: "knowledge-collector"
description: "收集项目问题解决经验并更新到知识库。Invoke when user solves a problem and wants to document it for future reference, or when user wants to add troubleshooting knowledge to the project knowledge base."
---

# Knowledge Collector

这个 SKILL 用于在解决项目问题后，将问题和解决方案总结并更新到项目知识库中，便于后续快速排查。

## 使用场景

1. 解决了一个棘手的技术问题后，想要记录下来供以后参考
2. 排查了一个 bug 后，想要总结原因和解决方案
3. 发现某个常见问题的解决方案，想要添加到知识库
4. 想要整理项目中的技术债务或注意事项

## 工作流程

### 1. 收集问题信息

当用户调用此 skill 时，询问以下信息：
- 问题描述（简要描述遇到了什么问题）
- 问题表现（错误信息、异常行为等）
- 问题原因（根本原因分析）
- 解决方案（具体的解决步骤）
- 相关代码/配置（如果有的话）
- 预防措施（如何避免类似问题再次发生）

### 2. 整理知识条目

将收集到的信息整理成结构化的知识条目，包含以下字段：
- **标题**：简洁的问题描述
- **分类**：技术栈/模块/类型（如：Spring Boot、数据库、前端、部署等）
- **关键词**：便于搜索的标签
- **问题描述**：详细的问题说明
- **解决方案**：具体的解决步骤
- **参考链接**：相关的文档、Stack Overflow 链接等
- **创建时间**：记录创建日期

### 3. 更新知识库

检查项目根目录下是否存在知识库文件：
- 优先使用 `.trae/documents/knowledge-base.md`
- 如果不存在，创建该文件

将整理好的知识条目追加到知识库文件中。

### 4. 知识库格式

知识库使用 Markdown 格式，结构如下：

```markdown
# 项目知识库

## 分类1

### 条目标题
- **关键词**: tag1, tag2
- **问题**: 问题描述
- **解决方案**: 解决步骤
- **参考**: 链接
- **记录时间**: YYYY-MM-DD

## 分类2
...
```

## 示例

用户："我刚刚解决了 Spring Boot 应用启动时数据库连接超时的问题，帮我记录一下"

Skill 执行：
1. 询问具体的问题细节和解决方案
2. 整理成知识条目
3. 更新到 `.trae/documents/knowledge-base.md`

生成的条目示例：

```markdown
### Spring Boot 数据库连接超时
- **关键词**: spring-boot, database, connection-timeout, hikari
- **问题**: 应用启动时出现数据库连接超时，错误信息：Connection is not available, request timed out after 30000ms
- **解决方案**: 
  1. 增加 HikariCP 连接池的超时时间配置：`spring.datasource.hikari.connection-timeout=60000`
  2. 检查数据库服务是否正常运行
  3. 检查网络连接是否稳定
- **参考**: https://github.com/brettwooldridge/HikariCP/issues/XXX
- **记录时间**: 2026-02-20
```

## 注意事项

1. 保持条目简洁明了，突出重点
2. 使用清晰的关键词，便于后续搜索
3. 如果可能，提供参考链接
4. 定期整理知识库，合并相似条目

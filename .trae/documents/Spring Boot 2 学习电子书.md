# Spring Boot 2 学习电子书创建计划

## 目标读者定位
- 有多年Java开发经验
- 熟悉Struts等传统框架
- 需要快速掌握Spring Boot核心特性

---

## 目录结构

```
spring_study/
├── README.md                      # 电子书首页
├── SUMMARY.md                     # 快速查询总目录
│
├── docs/
│   ├── 01-quick-start/            # 快速入门篇
│   │   ├── README.md              # Struts vs Spring Boot对比
│   │   ├── 01-project-init.md     # 项目初始化方式
│   │   ├── 02-project-structure.md# 项目结构差异
│   │   ├── 03-configuration.md    # 配置方式对比
│   │   └── exercises/
│   │       ├── questions.md
│   │       └── answers.md
│   │
│   ├── 02-core-principle/         # 核心原理篇
│   │   ├── README.md
│   │   ├── 01-ioc-container.md    # IOC容器原理
│   │   ├── 02-auto-configuration.md# 自动配置机制
│   │   ├── 03-condition-annotation.md# 条件注解
│   │   ├── 04-starters.md         # Starter机制
│   │   ├── 05-bean-lifecycle.md   # Bean生命周期
│   │   └── exercises/
│   │       ├── questions.md
│   │       └── answers.md
│   │
│   ├── 03-web-mvc/                # Web MVC篇
│   │   ├── README.md              # Struts2 vs Spring MVC对比
│   │   ├── 01-controller.md       # 控制器详解
│   │   ├── 02-request-mapping.md  # 请求映射
│   │   ├── 03-parameter-binding.md# 参数绑定
│   │   ├── 04-data-validation.md  # 数据校验
│   │   ├── 05-interceptor.md      # 拦截器(对比Struts拦截器)
│   │   ├── 06-exception-handler.md# 异常处理
│   │   ├── 07-restful-api.md      # RESTful设计
│   │   └── exercises/
│   │       ├── questions.md
│   │       └── answers.md
│   │
│   ├── 04-data-access/            # 数据访问篇
│   │   ├── README.md
│   │   ├── 01-datasource-config.md# 数据源配置
│   │   ├── 02-jdbcTemplate.md     # JdbcTemplate
│   │   ├── 03-jpa.md              # Spring Data JPA
│   │   ├── 04-mybatis.md          # MyBatis集成
│   │   ├── 05-transaction.md      # 声明式事务
│   │   ├── 06-multi-datasource.md # 多数据源
│   │   └── exercises/
│   │       ├── questions.md
│   │       └── answers.md
│   │
│   ├── 05-security/               # 安全篇
│   │   ├── README.md
│   │   ├── 01-security-architecture.md# 安全架构
│   │   ├── 02-authentication.md   # 认证机制
│   │   ├── 03-authorization.md    # 授权机制
│   │   ├── 04-session-management.md# Session管理
│   │   ├── 05-jwt.md              # JWT认证
│   │   ├── 06-oauth2.md           # OAuth2
│   │   └── exercises/
│   │       ├── questions.md
│   │       └── answers.md
│   │
│   ├── 06-test/                   # 测试篇
│   │   ├── README.md
│   │   ├── 01-test-framework.md   # 测试框架
│   │   ├── 02-mock-test.md        # Mock测试
│   │   ├── 03-web-test.md         # Web层测试
│   │   ├── 04-data-test.md        # 数据层测试
│   │   └── exercises/
│   │       ├── questions.md
│   │       └── answers.md
│   │
│   ├── 07-deploy-ops/             # 部署运维篇
│   │   ├── README.md
│   │   ├── 01-build-package.md    # 构建打包
│   │   ├── 02-embedded-server.md  # 内嵌服务器
│   │   ├── 03-docker.md           # Docker部署
│   │   ├── 04-actuator.md         # Actuator监控
│   │   ├── 05-log-management.md   # 日志管理
│   │   └── exercises/
│   │       ├── questions.md
│   │       └── answers.md
│   │
│   └── 08-advanced/               # 高级篇
│       ├── README.md
│       ├── 01-async.md            # 异步处理
│       ├── 02-scheduled.md        # 定时任务
│       ├── 03-cache.md            # 缓存机制
│       ├── 04-messaging.md        # 消息队列
│       ├── 05-websocket.md        # WebSocket
│       ├── 06-custom-starter.md   # 自定义Starter
│       ├── 07-aop.md              # AOP详解
│       └── exercises/
│           ├── questions.md
│           └── answers.md
│
└── appendix/                      # 附录
    ├── annotations-reference.md   # 注解速查手册
    ├── config-properties.md       # 配置属性大全
    ├── struts-to-spring.md        # Struts迁移指南
    └── troubleshooting.md         # 问题排查手册
```

---

## 内容特色

### 1. 框架对比视角
- 每个篇章开头对比Struts与Spring Boot差异
- 帮助快速建立知识迁移

### 2. 深度知识点
- 不讲Java基础，专注Spring Boot核心
- 深入原理层面（源码分析、设计思想）

### 3. 实战导向
- 代码示例贴近生产环境
- 最佳实践与踩坑指南

### 4. 习题设计
- 选择题：概念辨析
- 简答题：原理阐述
- 编程题：实战场景
- 分析题：源码/问题分析

---

## 创建步骤

1. 创建目录结构
2. 创建README.md + SUMMARY.md
3. 创建8个篇章的README（含Struts对比）
4. 创建各章节详细内容
5. 创建每篇习题集
6. 创建附录速查表
# Spring Boot 配置属性索引

> 快速检索：按功能模块 | 按前缀分类 | 常用配置

---

## 一、核心配置

### 1. 应用基础配置 (spring.application.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.application.name | | 应用名称 |
| spring.application.admin.enabled | false | 启用管理特性 |

### 2. 配置文件配置 (spring.config.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.config.name | application | 配置文件名 |
| spring.config.location | | 配置文件位置 |
| spring.config.additional-location | | 额外配置文件位置 |
| spring.config.import | | 导入其他配置 |

### 3. Profile配置 (spring.profiles.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.profiles.active | | 激活的Profile |
| spring.profiles.default | default | 默认Profile |
| spring.profiles.include | | 包含的Profile |
| spring.profiles.group.* | | Profile分组 |

---

## 二、Web服务器配置

### 1. 服务器配置 (server.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| server.port | 8080 | 服务器端口 |
| server.address | 0.0.0.0 | 绑定地址 |
| server.servlet.context-path | / | 应用上下文路径 |
| server.servlet.application-display-name | application | 应用显示名称 |
| server.ssl.enabled | false | 启用SSL |
| server.ssl.key-store | | 密钥库路径 |
| server.ssl.key-store-password | | 密钥库密码 |
| server.ssl.key-store-type | JKS | 密钥库类型 |
| server.ssl.key-alias | | 密钥别名 |
| server.compression.enabled | false | 启用响应压缩 |
| server.compression.mime-types | | 压缩的MIME类型 |
| server.compression.min-response-size | 2048 | 最小压缩大小 |
| server.connection-timeout | | 连接超时 |
| server.max-http-header-size | 8KB | 最大HTTP头大小 |
| server.error.path | /error | 错误页面路径 |
| server.error.include-message | never | 错误响应包含消息 |
| server.error.include-stacktrace | never | 错误响应包含堆栈 |
| server.error.whitelabel.enabled | true | 启用默认错误页 |

### 2. Tomcat配置 (server.tomcat.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| server.tomcat.max-threads | 200 | 最大工作线程 |
| server.tomcat.min-spare-threads | 10 | 最小空闲线程 |
| server.tomcat.max-connections | 8192 | 最大连接数 |
| server.tomcat.accept-count | 100 | 等待队列长度 |
| server.tomcat.connection-timeout | 20s | 连接超时 |
| server.tomcat.uri-encoding | UTF-8 | URI编码 |
| server.tomcat.max-http-form-post-size | 2MB | 表单最大大小 |
| server.tomcat.accesslog.enabled | false | 启用访问日志 |
| server.tomcat.accesslog.directory | logs | 日志目录 |
| server.tomcat.accesslog.pattern | common | 日志格式 |

---

## 三、数据源配置

### 1. 数据源基础 (spring.datasource.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.datasource.url | | 数据库连接URL |
| spring.datasource.username | | 用户名 |
| spring.datasource.password | | 密码 |
| spring.datasource.driver-class-name | | 驱动类名（自动推断） |
| spring.datasource.name | | 数据源名称 |
| spring.datasource.type | | 数据源类型 |
| spring.datasource.schema | | Schema脚本 |
| spring.datasource.data | | Data脚本 |
| spring.datasource.initialization-mode | embedded | 初始化模式 |
| spring.datasource.continue-on-error | false | 错误时继续 |
| spring.datasource.separator | ; | SQL分隔符 |
| spring.datasource.sql-script-encoding | | SQL脚本编码 |

### 2. HikariCP配置 (spring.datasource.hikari.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.datasource.hikari.minimum-idle | 10 | 最小空闲连接 |
| spring.datasource.hikari.maximum-pool-size | 10 | 最大连接数 |
| spring.datasource.hikari.idle-timeout | 600000 | 空闲超时(ms) |
| spring.datasource.hikari.max-lifetime | 1800000 | 最大生命周期(ms) |
| spring.datasource.hikari.connection-timeout | 30000 | 连接超时(ms) |
| spring.datasource.hikari.connection-test-query | | 连接测试查询 |
| spring.datasource.hikari.pool-name | | 连接池名称 |
| spring.datasource.hikari.auto-commit | true | 自动提交 |
| spring.datasource.hikari.leak-detection-threshold | 0 | 连接泄露检测 |

### 3. JPA配置 (spring.jpa.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.jpa.database | | 数据库类型 |
| spring.jpa.database-platform | | 数据库平台 |
| spring.jpa.show-sql | false | 显示SQL |
| spring.jpa.hibernate.ddl-auto | none | DDL模式 |
| spring.jpa.hibernate.naming.physical-strategy | | 命名策略 |
| spring.jpa.properties.hibernate.* | | Hibernate属性 |
| spring.jpa.properties.hibernate.format_sql | false | 格式化SQL |
| spring.jpa.properties.hibernate.dialect | | 数据库方言 |
| spring.jpa.open-in-view | true | OSIV模式 |
| spring.jpa.generate-ddl | false | 生成DDL |

---

## 四、缓存配置

### 1. 缓存基础 (spring.cache.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.cache.type | | 缓存类型 |
| spring.cache.cache-names | | 缓存名称列表 |
| spring.cache.ehcache.config | | Ehcache配置 |
| spring.cache.infinispan.config | | Infinispan配置 |
| spring.cache.jcache.config | | JCache配置 |
| spring.cache.jcache.provider | | JCache提供者 |
| spring.cache.redis.cache-null-values | true | 缓存null值 |
| spring.cache.redis.key-prefix | | 键前缀 |
| spring.cache.redis.time-to-live | | 过期时间(ms) |
| spring.cache.redis.use-key-prefix | true | 使用键前缀 |

### 2. Redis配置 (spring.redis.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.redis.host | localhost | Redis主机 |
| spring.redis.port | 6379 | Redis端口 |
| spring.redis.password | | 密码 |
| spring.redis.database | 0 | 数据库索引 |
| spring.redis.url | | 连接URL |
| spring.redis.client-type | lettuce | 客户端类型 |
| spring.redis.timeout | | 连接超时 |
| spring.redis.lettuce.pool.max-active | 8 | 最大活跃连接 |
| spring.redis.lettuce.pool.max-idle | 8 | 最大空闲连接 |
| spring.redis.lettuce.pool.min-idle | 0 | 最小空闲连接 |
| spring.redis.lettuce.pool.max-wait | -1ms | 最大等待时间 |

---

## 五、消息队列配置

### 1. RabbitMQ配置 (spring.rabbitmq.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.rabbitmq.host | localhost | 主机地址 |
| spring.rabbitmq.port | 5672 | 端口 |
| spring.rabbitmq.username | guest | 用户名 |
| spring.rabbitmq.password | guest | 密码 |
| spring.rabbitmq.virtual-host | / | 虚拟主机 |
| spring.rabbitmq.addresses | | 地址列表 |
| spring.rabbitmq.requested-heartbeat | | 心跳时间 |
| spring.rabbitmq.publisher-confirm-type | | 发布确认类型 |
| spring.rabbitmq.publisher-returns | false | 发布返回 |
| spring.rabbitmq.listener.type | simple | 监听器类型 |
| spring.rabbitmq.listener.simple.concurrency | | 最小消费者数 |
| spring.rabbitmq.listener.simple.max-concurrency | | 最大消费者数 |
| spring.rabbitmq.listener.simple.auto-startup | true | 自动启动 |
| spring.rabbitmq.listener.simple.acknowledge-mode | auto | 确认模式 |

### 2. Kafka配置 (spring.kafka.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.kafka.bootstrap-servers | | Broker地址 |
| spring.kafka.consumer.group-id | | 消费者组ID |
| spring.kafka.consumer.auto-offset-reset | | 偏移量重置策略 |
| spring.kafka.consumer.enable-auto-commit | true | 自动提交 |
| spring.kafka.consumer.auto-commit-interval | | 提交间隔 |
| spring.kafka.consumer.key-deserializer | | 键反序列化器 |
| spring.kafka.consumer.value-deserializer | | 值反序列化器 |
| spring.kafka.producer.key-serializer | | 键序列化器 |
| spring.kafka.producer.value-serializer | | 值序列化器 |
| spring.kafka.producer.acks | | 确认模式 |
| spring.kafka.producer.retries | | 重试次数 |
| spring.kafka.listener.concurrency | | 监听器并发数 |

---

## 六、安全配置

### 1. Security配置 (spring.security.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.security.user.name | user | 默认用户名 |
| spring.security.user.password | | 默认密码 |
| spring.security.user.roles | | 默认角色 |
| spring.security.filter.order | -100 | 过滤器顺序 |
| spring.security.filter.dispatcher-types | async,error,request | 分发器类型 |

### 2. OAuth2配置 (spring.security.oauth2.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.security.oauth2.client.registration.* | | 客户端注册 |
| spring.security.oauth2.client.provider.* | | 提供者配置 |
| spring.security.oauth2.resourceserver.jwt.issuer-uri | | JWT签发者URI |
| spring.security.oauth2.resourceserver.jwt.jwk-set-uri | | JWK Set URI |

---

## 七、日志配置

### 1. 日志基础 (logging.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| logging.level.* | | 日志级别配置 |
| logging.file.name | | 日志文件名 |
| logging.file.path | | 日志文件路径 |
| logging.file.max-size | 10MB | 最大文件大小 |
| logging.file.max-history | 7 | 最大保留天数 |
| logging.file.total-size-cap | | 总大小限制 |
| logging.file.clean-history-on-start | false | 启动时清理 |
| logging.pattern.console | | 控制台格式 |
| logging.pattern.file | | 文件格式 |
| logging.pattern.level | | 级别格式 |
| logging.logback.rollingpolicy.* | | Logback滚动策略 |

### 2. 常用日志级别配置

```yaml
logging:
  level:
    root: INFO
    org.springframework: INFO
    org.springframework.web: DEBUG
    org.springframework.security: DEBUG
    org.hibernate: INFO
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
```

---

## 八、Actuator配置

### 1. Actuator基础 (management.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| management.server.port | | 管理端口 |
| management.server.address | | 管理地址 |
| management.endpoints.enabled-by-default | true | 默认启用端点 |
| management.endpoints.web.exposure.include | health,info | 暴露的端点 |
| management.endpoints.web.exposure.exclude | | 排除的端点 |
| management.endpoints.web.base-path | /actuator | 端点基础路径 |
| management.endpoint.health.enabled | true | 启用健康检查 |
| management.endpoint.health.show-details | never | 显示详情 |
| management.endpoint.health.show-components | never | 显示组件 |
| management.endpoint.health.probes.enabled | false | 启用探针 |
| management.endpoint.info.enabled | true | 启用信息端点 |
| management.endpoint.beans.enabled | true | 启用Beans端点 |
| management.endpoint.env.enabled | true | 启用环境端点 |
| management.endpoint.mappings.enabled | true | 启用映射端点 |
| management.endpoint.metrics.enabled | true | 启用指标端点 |

### 2. 健康检查配置

```yaml
management:
  endpoint:
    health:
      show-details: when-authorized
      show-components: always
      probes:
        enabled: true
  health:
    db:
      enabled: true
    redis:
      enabled: true
    diskspace:
      enabled: true
      threshold: 10MB
```

---

## 九、异步与定时任务配置

### 1. 异步任务 (spring.task.execution.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.task.execution.pool.core-size | 8 | 核心线程数 |
| spring.task.execution.pool.max-size | Integer.MAX_VALUE | 最大线程数 |
| spring.task.execution.pool.queue-capacity | Integer.MAX_VALUE | 队列容量 |
| spring.task.execution.pool.allow-core-thread-timeout | true | 核心线程超时 |
| spring.task.execution.pool.keep-alive | 60s | 空闲线程存活时间 |
| spring.task.execution.thread-name-prefix | task- | 线程名前缀 |

### 2. 定时任务 (spring.task.scheduling.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.task.scheduling.pool.size | 1 | 线程池大小 |
| spring.task.scheduling.thread-name-prefix | scheduling- | 线程名前缀 |

---

## 十、文件上传配置

### 文件上传 (spring.servlet.multipart.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.servlet.multipart.enabled | true | 启用文件上传 |
| spring.servlet.multipart.file-size-threshold | 0 | 内存阈值 |
| spring.servlet.multipart.location | | 临时目录 |
| spring.servlet.multipart.max-file-size | 1MB | 最大文件大小 |
| spring.servlet.multipart.max-request-size | 10MB | 最大请求大小 |
| spring.servlet.multipart.resolve-lazily | false | 延迟解析 |

---

## 十一、JSON配置

### Jackson配置 (spring.jackson.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.jackson.default-property-inclusion | | 属性包含策略 |
| spring.jackson.date-format | | 日期格式 |
| spring.jackson.property-naming-strategy | | 命名策略 |
| spring.jackson.serialization.* | | 序列化特性 |
| spring.jackson.deserialization.* | | 反序列化特性 |
| spring.jackson.time-zone | | 时区 |
| spring.jackson.locale | | 区域 |
| spring.jackson.generator.* | | 生成器特性 |
| spring.jackson.parser.* | | 解析器特性 |
| spring.jackson.mapper.* | | 映射器特性 |

### 常用Jackson配置示例

```yaml
spring:
  jackson:
    default-property-inclusion: non_null
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: Asia/Shanghai
    serialization:
      write-dates-as-timestamps: false
      fail-on-empty-beans: false
    deserialization:
      fail-on-unknown-properties: false
```

---

## 十二、邮件配置

### 邮件配置 (spring.mail.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.mail.host | | SMTP主机 |
| spring.mail.port | | SMTP端口 |
| spring.mail.username | | 用户名 |
| spring.mail.password | | 密码 |
| spring.mail.protocol | smtp | 协议 |
| spring.mail.default-encoding | UTF-8 | 默认编码 |
| spring.mail.properties.mail.smtp.auth | false | SMTP认证 |
| spring.mail.properties.mail.smtp.starttls.enable | false | 启用STARTTLS |
| spring.mail.properties.mail.smtp.ssl.enable | false | 启用SSL |
| spring.mail.properties.mail.smtp.timeout | | 超时时间 |

---

## 十三、国际化配置

### 国际化 (spring.messages.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.messages.basename | messages | 消息文件基础名 |
| spring.messages.encoding | UTF-8 | 编码 |
| spring.messages.fallback-to-system-locale | true | 回退到系统区域 |
| spring.messages.use-code-as-default-message | false | 使用代码作为默认消息 |
| spring.messages.cache-duration | | 缓存时间 |

---

## 十四、DevTools配置

### 开发工具 (spring.devtools.*)

| 属性 | 默认值 | 说明 |
|------|--------|------|
| spring.devtools.add-properties | true | 添加开发属性 |
| spring.devtools.livereload.enabled | true | 启用LiveReload |
| spring.devtools.livereload.port | 35729 | LiveReload端口 |
| spring.devtools.restart.enabled | true | 启用重启 |
| spring.devtools.restart.additional-paths | | 额外监控路径 |
| spring.devtools.restart.exclude | | 排除路径 |
| spring.devtools.restart.log-condition-evaluation-delta | true | 记录条件评估 |

---

## 十五、常用配置模板

### 生产环境配置模板

```yaml
server:
  port: 8080
  shutdown: graceful

spring:
  application:
    name: my-application
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
  jpa:
    show-sql: false
    hibernate:
      ddl-auto: validate
  redis:
    host: localhost
    port: 6379

logging:
  level:
    root: INFO
  file:
    name: logs/application.log
  file:
    max-size: 50MB
    max-history: 30

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: never
```

### 开发环境配置模板

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: create-drop
  devtools:
    restart:
      enabled: true

logging:
  level:
    root: DEBUG
    org.springframework.web: DEBUG
    org.hibernate.SQL: DEBUG
```

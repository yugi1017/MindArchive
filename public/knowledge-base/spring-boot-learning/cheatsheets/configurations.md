# Spring Boot 配置速查表

> 快速查阅常用配置

---

## 一、服务器配置

```yaml
server:
  port: 8080                          # 端口
  servlet:
    context-path: /api                # 上下文路径
  ssl:
    enabled: true                     # 启用SSL
    key-store: classpath:keystore.p12
    key-store-password: password
    key-store-type: PKCS12
  compression:
    enabled: true                     # 响应压缩
    mime-types: text/html,text/xml,text/plain,application/json
  error:
    path: /error                      # 错误页面
    include-message: always           # 包含错误消息
```

---

## 二、数据源配置

### MySQL

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

### PostgreSQL

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: postgres
    password: password
    driver-class-name: org.postgresql.Driver
```

### H2 (开发环境)

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: 
  h2:
    console:
      enabled: true
      path: /h2-console
```

---

## 三、JPA配置

```yaml
spring:
  jpa:
    database: mysql
    show-sql: true                    # 显示SQL
    hibernate:
      ddl-auto: update                # none, validate, update, create, create-drop
    properties:
      hibernate:
        format_sql: true              # 格式化SQL
        dialect: org.hibernate.dialect.MySQL8Dialect
    open-in-view: false               # 关闭OSIV
```

---

## 四、Redis配置

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password: 
    database: 0
    timeout: 3000
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
        max-wait: -1ms
```

---

## 五、缓存配置

```yaml
spring:
  cache:
    type: redis                       # generic, redis, caffeine, simple, none
    redis:
      time-to-live: 3600000           # 过期时间(ms)
      cache-null-values: true         # 缓存null值
      key-prefix: myapp:
      use-key-prefix: true
```

---

## 六、消息队列配置

### RabbitMQ

```yaml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
    virtual-host: /
    publisher-confirm-type: correlated
    publisher-returns: true
    listener:
      simple:
        acknowledge-mode: auto
        concurrency: 3
        max-concurrency: 10
```

### Kafka

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: my-group
      auto-offset-reset: earliest
      enable-auto-commit: false
    producer:
      acks: all
      retries: 3
```

---

## 七、日志配置

```yaml
logging:
  level:
    root: INFO
    org.springframework: INFO
    org.springframework.web: DEBUG
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
  file:
    name: logs/application.log
    max-size: 10MB
    max-history: 7
    total-size-cap: 100MB
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

---

## 八、Actuator配置

```yaml
management:
  server:
    port: 8081                        # 管理端口
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
        exclude: shutdown
      base-path: /actuator
  endpoint:
    health:
      show-details: when-authorized
      probes:
        enabled: true
    info:
      enabled: true
    metrics:
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

## 九、文件上传配置

```yaml
spring:
  servlet:
    multipart:
      enabled: true
      file-size-threshold: 2KB
      max-file-size: 50MB
      max-request-size: 100MB
      location: /tmp/uploads
```

---

## 十、JSON配置

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

## 十一、安全配置

```yaml
spring:
  security:
    user:
      name: admin
      password: admin123
      roles: ADMIN
```

---

## 十二、邮件配置

```yaml
spring:
  mail:
    host: smtp.example.com
    port: 587
    username: user@example.com
    password: password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
            required: true
          connectiontimeout: 5000
          timeout: 5000
          writetimeout: 5000
```

---

## 十三、国际化配置

```yaml
spring:
  messages:
    basename: messages
    encoding: UTF-8
    fallback-to-system-locale: true
    cache-duration: 3600
```

---

## 十四、异步任务配置

```yaml
spring:
  task:
    execution:
      pool:
        core-size: 8
        max-size: 20
        queue-capacity: 100
        keep-alive: 60s
      thread-name-prefix: async-
    scheduling:
      pool:
        size: 5
      thread-name-prefix: scheduling-
```

---

## 十五、Profile配置

```yaml
spring:
  profiles:
    active: dev
    default: dev
    group:
      dev:
        - dev-db
        - dev-cache
      prod:
        - prod-db
        - prod-cache
```

---

## 十六、常用组合配置

### 开发环境

```yaml
server:
  port: 8080

spring:
  profiles:
    active: dev
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: 
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
    livereload:
      enabled: true

logging:
  level:
    root: DEBUG
    org.springframework.web: DEBUG
```

### 生产环境

```yaml
server:
  port: 8080
  shutdown: graceful

spring:
  profiles:
    active: prod
  datasource:
    url: jdbc:mysql://prod-db:3306/mydb
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
    host: prod-redis
    port: 6379

logging:
  level:
    root: INFO
  file:
    name: /var/log/app/application.log
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

---

## 十七、环境变量注入

```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:mysql://localhost:3306/mydb}
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:password}
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
```

---

## 十八、配置优先级

从高到低:

1. 命令行参数 `--server.port=8081`
2. Java系统属性 `-Dserver.port=8081`
3. 操作系统环境变量 `SERVER_PORT=8081`
4. application-{profile}.yml
5. application.yml
6. @PropertySource注解
7. 默认属性

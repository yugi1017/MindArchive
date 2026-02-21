# Spring Boot 配置速查

> 常用配置属性快速参考，配置时查阅使用

---

## 一、服务器配置

```yaml
server:
  port: 8080                          # 服务端口
  servlet:
    context-path: /api                # 上下文路径
  tomcat:
    max-threads: 200                  # 最大工作线程
    max-connections: 8192             # 最大连接数
```

---

## 二、数据源配置

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 10           # 最大连接数
      minimum-idle: 5                 # 最小空闲连接
      connection-timeout: 30000       # 连接超时(ms)
```

---

## 三、JPA配置

```yaml
spring:
  jpa:
    show-sql: true                    # 显示SQL
    hibernate:
      ddl-auto: update                # DDL模式
    properties:
      hibernate:
        format_sql: true              # 格式化SQL
        dialect: org.hibernate.dialect.MySQL8Dialect
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
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
```

---

## 五、日志配置

```yaml
logging:
  level:
    root: INFO
    org.springframework.web: DEBUG
    org.hibernate.SQL: DEBUG
  file:
    name: logs/application.log
    max-size: 10MB
    max-history: 7
```

---

## 六、Profile配置

```yaml
spring:
  profiles:
    active: dev                       # 激活的Profile

---
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:h2:mem:testdb

---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: jdbc:mysql://prod-db:3306/mydb
```

---

## 七、文件上传配置

```yaml
spring:
  servlet:
    multipart:
      enabled: true
      max-file-size: 10MB             # 最大文件大小
      max-request-size: 100MB         # 最大请求大小
```

---

## 八、JSON配置

```yaml
spring:
  jackson:
    default-property-inclusion: non_null
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: Asia/Shanghai
    serialization:
      write-dates-as-timestamps: false
```

---

## 九、缓存配置

```yaml
spring:
  cache:
    type: redis
    redis:
      time-to-live: 600000            # 过期时间(ms)
      cache-null-values: true
```

---

## 十、Actuator配置

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: when-authorized
```

---

## 十一、安全配置

```yaml
spring:
  security:
    user:
      name: admin
      password: admin123
```

---

## 十二、异步任务配置

```yaml
spring:
  task:
    execution:
      pool:
        core-size: 8
        max-size: 16
        queue-capacity: 100
    scheduling:
      pool:
        size: 2
```

---

## 十三、常用配置模板

### 开发环境

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

logging:
  level:
    root: DEBUG
```

### 生产环境

```yaml
server:
  port: 8080
  shutdown: graceful

spring:
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

logging:
  level:
    root: INFO
  file:
    name: logs/application.log

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
```

---

> **提示**: 此文档为快速参考工具，详细内容请查阅对应章节。

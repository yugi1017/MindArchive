# Spring Boot 配置体系架构

> 理解配置体系是掌握Spring Boot灵活性的关键

---

## 一、配置体系架构

### 1.1 Environment抽象

Environment是Spring环境抽象的核心接口:

```
Environment (接口)
    │
    ├── PropertyResolver (属性解析)
    │   └── 解析属性值、占位符
    │
    └── Iterable<PropertySource<?>> (属性源集合)
        └── 多个属性源按优先级排列
```

### 1.2 PropertySource层次结构

```
┌─────────────────────────────────────────────────────────────┐
│                    Environment                               │
├─────────────────────────────────────────────────────────────┤
│  PropertySources (有序集合，优先级从高到低)                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. ConfigurationPropertySources                     │   │
│  │    - 命令行参数                                      │   │
│  │    - spring.application.json                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 2. ServletConfigInitParameters                     │   │
│  │    - Servlet配置参数                                 │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 3. ServletContextInitParameters                    │   │
│  │    - Servlet上下文参数                               │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 4. JndiProperties                                   │   │
│  │    - JNDI属性                                       │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 5. SystemProperties                                 │   │
│  │    - Java系统属性 (System.getProperties())          │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 6. SystemEnvironment                                │   │
│  │    - 操作系统环境变量                                 │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 7. RandomValuePropertySource                       │   │
│  │    - random.* 随机值                                 │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 8. ApplicationYamlPropertySource                   │   │
│  │    - application.yml/properties                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 9. ProfileSpecificYamlPropertySource               │   │
│  │    - application-{profile}.yml                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 10. @PropertySource                                │   │
│  │     - 自定义属性源                                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、配置优先级

### 2.1 完整优先级列表

从高到低:

| 优先级 | 配置来源 | 示例 |
|--------|----------|------|
| 1 | 命令行参数 | `--server.port=8081` |
| 2 | JNDI属性 | `java:comp/env/` |
| 3 | Java系统属性 | `-Dserver.port=8081` |
| 4 | 操作系统环境变量 | `SERVER_PORT=8081` |
| 5 | RandomValuePropertySource | `random.int` |
| 6 | application-{profile}.yml (jar外) | `/config/application-prod.yml` |
| 7 | application-{profile}.yml (jar内) | `classpath:/application-prod.yml` |
| 8 | application.yml (jar外) | `/config/application.yml` |
| 9 | application.yml (jar内) | `classpath:/application.yml` |
| 10 | @PropertySource | `@PropertySource("custom.properties")` |
| 11 | 默认属性 | `SpringApplication.setDefaultProperties` |

### 2.2 配置文件加载位置

按优先级从高到低:

1. `/config/` (当前目录的config子目录)
2. `/` (当前目录)
3. `classpath:/config/`
4. `classpath:/`

---

## 三、配置文件详解

### 3.1 application.yml

```yaml
spring:
  application:
    name: my-application
  profiles:
    active: dev
  
server:
  port: 8080

logging:
  level:
    root: INFO
```

### 3.2 Profile配置

**application-dev.yml**:
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: 

logging:
  level:
    root: DEBUG
```

**application-prod.yml**:
```yaml
spring:
  datasource:
    url: jdbc:mysql://prod-db:3306/mydb
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}

logging:
  level:
    root: INFO
```

### 3.3 多Profile激活方式

```yaml
spring:
  profiles:
    active: dev
```

```bash
java -jar app.jar --spring.profiles.active=prod
```

```bash
export SPRING_PROFILES_ACTIVE=prod
java -jar app.jar
```

### 3.4 Profile分组

```yaml
spring:
  profiles:
    group:
      dev:
        - dev-db
        - dev-cache
        - dev-mq
      prod:
        - prod-db
        - prod-cache
        - prod-mq
```

---

## 四、配置绑定

### 4.1 @Value注入

```java
@Service
public class MyService {
    
    @Value("${app.name}")
    private String appName;
    
    @Value("${app.timeout:30000}")
    private long timeout;
    
    @Value("#{systemProperties['user.home']}")
    private String userHome;
}
```

### 4.2 @ConfigurationProperties

```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private String version;
    private int timeout = 30000;
    private List<String> servers = new ArrayList<>();
    private Map<String, String> features = new HashMap<>();
    private Database database = new Database();
    
    public static class Database {
        private String url;
        private String username;
        private String password;
    }
}
```

对应配置:

```yaml
app:
  name: My Application
  version: 1.0.0
  timeout: 60000
  servers:
    - server1.example.com
    - server2.example.com
  features:
    feature1: enabled
    feature2: disabled
  database:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: secret
```

### 4.3 启用配置属性

```java
@Configuration
@EnableConfigurationProperties(AppProperties.class)
public class AppConfig {
}
```

或直接在属性类上添加@Component:

```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
}
```

### 4.4 构造器绑定

```java
@ConfigurationProperties(prefix = "app")
@ConstructorBinding
public class AppProperties {
    private final String name;
    private final int timeout;
    
    public AppProperties(String name, int timeout) {
        this.name = name;
        this.timeout = timeout;
    }
}
```

---

## 五、外部化配置

### 5.1 配置中心集成

**Spring Cloud Config**:

```yaml
spring:
  cloud:
    config:
      uri: http://config-server:8888
      name: myapp
      profile: prod
      label: main
```

**Nacos Config**:

```yaml
spring:
  cloud:
    nacos:
      config:
        server-addr: nacos-server:8848
        namespace: prod
        group: DEFAULT_GROUP
        file-extension: yaml
```

### 5.2 配置刷新

```java
@RestController
@RefreshScope
public class ConfigController {
    
    @Value("${app.config.value}")
    private String configValue;
    
    @GetMapping("/config")
    public String getConfig() {
        return configValue;
    }
}
```

### 5.3 配置加密

```yaml
jasypt:
  encryptor:
    password: ${JASYPT_PASSWORD}
    algorithm: PBEWithMD5AndDES

spring:
  datasource:
    password: ENC(encrypted_password_here)
```

---

## 六、自定义PropertySource

### 6.1 实现PropertySource

```java
public class CustomPropertySource extends PropertySource<String> {
    
    private final Map<String, Object> properties;
    
    public CustomPropertySource(String name, Map<String, Object> properties) {
        super(name);
        this.properties = properties;
    }
    
    @Override
    public Object getProperty(String name) {
        return properties.get(name);
    }
}
```

### 6.2 注册PropertySource

```java
@Configuration
public class CustomPropertySourceConfig {
    
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer(
            ConfigurableEnvironment environment) {
        
        Map<String, Object> customProperties = new HashMap<>();
        customProperties.put("custom.key", "custom.value");
        
        CustomPropertySource propertySource = new CustomPropertySource("customSource", customProperties);
        environment.getPropertySources().addFirst(propertySource);
        
        return new PropertySourcesPlaceholderConfigurer();
    }
}
```

---

## 七、配置验证

### 7.1 JSR-303验证

```java
@Component
@ConfigurationProperties(prefix = "app")
@Validated
public class AppProperties {
    
    @NotBlank
    private String name;
    
    @Min(1)
    @Max(65535)
    private int port;
    
    @Email
    private String adminEmail;
    
    @Valid
    private Database database;
    
    public static class Database {
        @NotBlank
        private String url;
    }
}
```

### 7.2 自定义验证

```java
@ConfigurationProperties(prefix = "app")
public class AppProperties implements Validator {
    
    private String name;
    private int port;
    
    @Override
    public boolean supports(Class<?> clazz) {
        return AppProperties.class.isAssignableFrom(clazz);
    }
    
    @Override
    public void validate(Object target, Errors errors) {
        AppProperties props = (AppProperties) target;
        if (props.getPort() < 1024) {
            errors.rejectValue("port", "port.too.low", "Port must be >= 1024");
        }
    }
}
```

---

## 八、配置最佳实践

### 8.1 敏感配置处理

```yaml
spring:
  datasource:
    username: ${DB_USERNAME:default_user}
    password: ${DB_PASSWORD}
```

### 8.2 配置分层

```
配置层次:
├── 基础配置 (application.yml)
│   └── 通用配置，所有环境共享
├── 环境配置 (application-{profile}.yml)
│   └── 特定环境配置
├── 外部配置
│   └── 运行时覆盖
└── 加密配置
    └── 敏感信息加密存储
```

### 8.3 配置文档化

```java
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    
    private String name;
    
    private int timeout = 30000;
}
```

---

## 九、配置调试

### 9.1 查看所有配置

```bash
curl http://localhost:8080/actuator/configprops
curl http://localhost:8080/actuator/env
```

### 9.2 查看特定配置

```bash
curl http://localhost:8080/actuator/env/server.port
```

### 9.3 配置来源追踪

```java
@RestController
public class ConfigDebugController {
    
    @Autowired
    private ConfigurableEnvironment environment;
    
    @GetMapping("/config/{key}")
    public Map<String, Object> getConfigSource(@PathVariable String key) {
        Map<String, Object> result = new HashMap<>();
        result.put("value", environment.getProperty(key));
        
        for (PropertySource<?> source : environment.getPropertySources()) {
            if (source.containsProperty(key)) {
                result.put("source", source.getName());
                break;
            }
        }
        
        return result;
    }
}
```

---

## 十、总结

### 核心概念

1. **Environment**: 环境抽象核心
2. **PropertySource**: 属性源抽象
3. **配置优先级**: 从高到低有序
4. **Profile**: 环境隔离
5. **配置绑定**: 类型安全的配置访问

### 最佳实践

1. 敏感配置使用环境变量
2. 合理使用Profile隔离环境
3. 使用@ConfigurationProperties进行类型安全绑定
4. 配置验证确保正确性
5. 外部化配置支持动态更新

---

## 十一、问题思考

> 完成本章学习后，请思考以下问题以检验学习效果

### 基础概念理解

1. **Spring Boot配置加载的优先级是怎样的？命令行参数为什么优先级最高？**
   - 提示：思考运维场景下的配置覆盖需求

2. **application.yml和application.properties有什么区别？各自的优势是什么？**

3. **@Value和@ConfigurationProperties有什么区别？各自适用于什么场景？**
   - 提示：从类型安全、复杂对象绑定等角度分析

### 代码实践应用

4. **如何实现多环境配置？请写出完整的配置方案。**
   - 提示：包括Profile激活方式、配置文件命名规则

5. **如何实现配置的动态刷新？需要哪些依赖和注解？**
   - 提示：思考Spring Cloud的@RefreshScope

### 综合分析

6. **在微服务架构中，如何管理分布式配置？有哪些常见方案？**
   - 提示：Spring Cloud Config、Nacos、Apollo等

7. **如何保证敏感配置的安全性？请设计一套完整的方案。**
   - 提示：环境变量、配置加密、密钥管理等

---

> **下一章预告**: [自动配置原理](./04-auto-configuration.md) - 深入理解Spring Boot自动配置机制与条件注解

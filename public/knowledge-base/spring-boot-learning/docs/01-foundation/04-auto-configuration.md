# Spring Boot 自动配置原理深度解析

> 理解自动配置是掌握Spring Boot核心的关键

---

## 一、自动配置概述

### 1.1 什么是自动配置

自动配置是Spring Boot的核心特性，它根据类路径下的依赖、已定义的Bean等因素，自动配置Spring应用。

### 1.2 自动配置的价值

- 减少样板配置
- 约定优于配置
- 开箱即用
- 灵活可覆盖

---

## 二、自动配置机制

### 2.1 @EnableAutoConfiguration

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";
    
    Class<?>[] exclude() default {};
    String[] excludeName() default {};
}
```

### 2.2 自动配置导入流程

```
@SpringBootApplication
    │
    └── @EnableAutoConfiguration
            │
            └── @Import(AutoConfigurationImportSelector.class)
                    │
                    ├── 1. 读取 META-INF/spring.factories
                    │      加载所有 EnableAutoConfiguration 配置类
                    │
                    ├── 2. 去重与过滤
                    │      - 排除 exclude 指定的类
                    │      - 过滤 @Conditional 条件不满足的类
                    │
                    └── 3. 注册配置类
                           导入符合条件的自动配置类
```

### 2.3 spring.factories示例

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration
```

---

## 三、条件注解体系

### 3.1 条件注解分类

| 类别 | 注解 | 作用 |
|------|------|------|
| 类条件 | @ConditionalOnClass | 类路径存在指定类 |
| | @ConditionalOnMissingClass | 类路径不存在指定类 |
| Bean条件 | @ConditionalOnBean | 容器中存在指定Bean |
| | @ConditionalOnMissingBean | 容器中不存在指定Bean |
| 属性条件 | @ConditionalOnProperty | 配置属性满足条件 |
| 资源条件 | @ConditionalOnResource | 资源存在 |
| Web条件 | @ConditionalOnWebApplication | Web应用 |
| | @ConditionalOnNotWebApplication | 非Web应用 |
| 表达式条件 | @ConditionalOnExpression | SpEL表达式 |
| 自定义条件 | @Conditional | 自定义条件类 |

### 3.2 条件注解原理

```java
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Conditional(OnClassCondition.class)
public @interface ConditionalOnClass {
    Class<?>[] value() default {};
    String[] name() default {};
}
```

### 3.3 Condition接口

```java
@FunctionalInterface
public interface Condition {
    boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata);
}
```

### 3.4 自定义条件

```java
public class MyCondition implements Condition {
    
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        Environment env = context.getEnvironment();
        return "true".equals(env.getProperty("my.feature.enabled"));
    }
}

@Configuration
@Conditional(MyCondition.class)
public class MyAutoConfiguration {
}
```

---

## 四、自动配置类分析

### 4.1 DataSourceAutoConfiguration

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass({ DataSource.class, EmbeddedDatabaseType.class })
@ConditionalOnMissingBean({ DataSource.class, XADataSource.class })
@Import({ DataSourceConfiguration.Hikari.class, 
          DataSourceConfiguration.Tomcat.class,
          DataSourceConfiguration.Dbcp2.class,
          DataSourceConfiguration.Generic.class,
          DataSourceJmxConfiguration.class })
protected static class PooledDataSourceConfiguration {
}
```

**条件分析**:
1. 类路径存在DataSource和EmbeddedDatabaseType类
2. 容器中不存在DataSource和XADataSource Bean
3. 满足条件则导入连接池配置

### 4.2 WebMvcAutoConfiguration

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnWebApplication(type = Type.SERVLET)
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10)
@AutoConfigureAfter({ DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class,
        ValidationAutoConfiguration.class })
public class WebMvcAutoConfiguration {
}
```

**条件分析**:
1. 必须是Servlet Web应用
2. 类路径存在Servlet相关类
3. 容器中不存在WebMvcConfigurationSupport（用户未自定义）

### 4.3 RedisAutoConfiguration

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(RedisClient.class)
@EnableConfigurationProperties(RedisProperties.class)
@Import({ LettuceConnectionConfiguration.class, JedisConnectionConfiguration.class })
public class RedisAutoConfiguration {
}
```

---

## 五、自动配置执行时机

### 5.1 配置类加载顺序

```
启动流程:
┌─────────────────────────────────────┐
│  1. @Configuration类加载             │
│     - 用户定义的配置类                │
│     - @ComponentScan扫描的类         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. 自动配置类加载                   │
│     - 读取spring.factories          │
│     - 过滤条件注解                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  3. Bean定义注册                    │
│     - @Bean方法解析                 │
│     - 条件注解判断                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  4. Bean实例化                      │
│     - 按依赖关系创建Bean             │
│     - 执行BeanPostProcessor         │
└─────────────────────────────────────┘
```

### 5.2 @AutoConfigureAfter与@AutoConfigureBefore

```java
@Configuration
@AutoConfigureAfter(DataSourceAutoConfiguration.class)
public class MyAutoConfiguration {
}

@Configuration
@AutoConfigureBefore(DataSourceAutoConfiguration.class)
public class MyDataSourceAutoConfiguration {
}
```

### 5.3 @AutoConfigureOrder

```java
@Configuration
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
public class MyAutoConfiguration {
}
```

---

## 六、自动配置报告

### 6.1 启用调试模式

```bash
java -jar app.jar --debug
```

或:

```yaml
debug: true
```

### 6.2 查看条件评估报告

```bash
curl http://localhost:8080/actuator/conditions
```

### 6.3 报告内容示例

```json
{
  "contexts": {
    "application": {
      "positiveMatches": {
        "DataSourceAutoConfiguration": [
          {
            "condition": "OnClassCondition",
            "message": "@ConditionalOnClass found required classes 'javax.sql.DataSource', 'org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType'"
          }
        ]
      },
      "negativeMatches": {
        "RedisAutoConfiguration": [
          {
            "condition": "OnClassCondition",
            "message": "@ConditionalOnClass did not find required class 'io.lettuce.core.RedisClient'"
          }
        ]
      }
    }
  }
}
```

---

## 七、自定义Starter

### 7.1 Starter结构

```
my-spring-boot-starter/
├── src/main/java/
│   └── com/example/
│       ├── MyAutoConfiguration.java
│       ├── MyProperties.java
│       └── MyService.java
├── src/main/resources/
│   └── META-INF/
│       └── spring.factories
└── pom.xml
```

### 7.2 配置类

```java
@Configuration
@ConditionalOnClass(MyService.class)
@EnableConfigurationProperties(MyProperties.class)
public class MyAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean
    public MyService myService(MyProperties properties) {
        return new MyService(properties);
    }
}
```

### 7.3 属性类

```java
@ConfigurationProperties(prefix = "my")
public class MyProperties {
    private String name;
    private int timeout = 30000;
}
```

### 7.4 spring.factories

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.example.MyAutoConfiguration
```

### 7.5 条件装配注解

```java
@Configuration
@ConditionalOnClass(MyService.class)
@EnableConfigurationProperties(MyProperties.class)
@ConditionalOnProperty(prefix = "my", name = "enabled", havingValue = "true", matchIfMissing = true)
public class MyAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnProperty(prefix = "my", name = "mode", havingValue = "simple", matchIfMissing = true)
    public MyService simpleMyService(MyProperties properties) {
        return new SimpleMyService(properties);
    }
    
    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnProperty(prefix = "my", name = "mode", havingValue = "advanced")
    public MyService advancedMyService(MyProperties properties) {
        return new AdvancedMyService(properties);
    }
}
```

---

## 八、排除自动配置

### 8.1 注解排除

```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class DemoApplication {
}

@SpringBootApplication(excludeName = {"org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration"})
public class DemoApplication {
}
```

### 8.2 配置文件排除

```yaml
spring:
  autoconfigure:
    exclude:
      - org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
      - org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration
```

### 8.3 条件排除

```java
@Configuration
@ConditionalOnProperty(name = "my.datasource.enabled", havingValue = "false")
@EnableAutoConfiguration(exclude = DataSourceAutoConfiguration.class)
public class NoDataSourceConfig {
}
```

---

## 九、自动配置覆盖

### 9.1 覆盖默认Bean

```java
@Configuration
public class MyConfiguration {
    
    @Bean
    @Primary
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}
```

### 9.2 扩展默认配置

```java
@Configuration
public class MyWebMvcConfig implements WebMvcConfigurer {
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MyInterceptor());
    }
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
}
```

### 9.3 完全替换

```java
@Configuration
@ComponentScan(basePackages = "com.example")
@EnableAutoConfiguration(exclude = WebMvcAutoConfiguration.class)
public class DemoApplication {
}
```

---

## 十、常见自动配置类

### 10.1 Web相关

| 配置类 | 作用 |
|--------|------|
| WebMvcAutoConfiguration | Spring MVC配置 |
| DispatcherServletAutoConfiguration | DispatcherServlet配置 |
| HttpEncodingAutoConfiguration | 编码配置 |
| MultipartAutoConfiguration | 文件上传配置 |
| ErrorMvcAutoConfiguration | 错误页面配置 |

### 10.2 数据相关

| 配置类 | 作用 |
|--------|------|
| DataSourceAutoConfiguration | 数据源配置 |
| HibernateJpaAutoConfiguration | JPA配置 |
| JdbcTemplateAutoConfiguration | JdbcTemplate配置 |
| TransactionAutoConfiguration | 事务配置 |

### 10.3 安全相关

| 配置类 | 作用 |
|--------|------|
| SecurityAutoConfiguration | 安全配置 |
| UserDetailsServiceAutoConfiguration | 用户详情服务 |

### 10.4 缓存相关

| 配置类 | 作用 |
|--------|------|
| CacheAutoConfiguration | 缓存配置 |
| RedisAutoConfiguration | Redis配置 |

---

## 十一、调试技巧

### 11.1 查看已加载的自动配置

```java
@RestController
public class AutoConfigController {
    
    @Autowired
    private ApplicationContext context;
    
    @GetMapping("/autoconfig")
    public List<String> getAutoConfigurations() {
        String[] names = context.getBeanNamesForType(Object.class);
        return Arrays.stream(names)
            .filter(name -> name.contains("AutoConfiguration"))
            .collect(Collectors.toList());
    }
}
```

### 11.2 条件评估报告

```java
@Autowired
private ConditionEvaluationReport report;

@GetMapping("/conditions")
public ConditionEvaluationReport getReport() {
    return report;
}
```

### 11.3 查看Bean来源

```java
@GetMapping("/bean-source/{name}")
public String getBeanSource(@PathVariable String name) {
    ConfigurableApplicationContext ctx = (ConfigurableApplicationContext) context;
    BeanDefinition definition = ctx.getBeanFactory().getBeanDefinition(name);
    return definition.getResourceDescription();
}
```

---

## 十二、总结

### 核心要点

1. **@EnableAutoConfiguration**: 自动配置入口
2. **spring.factories**: 自动配置类注册
3. **条件注解**: 控制配置生效条件
4. **配置顺序**: @AutoConfigureAfter/Before
5. **覆盖机制**: 用户配置优先

### 最佳实践

1. 理解条件注解的作用
2. 善用调试模式分析配置
3. 合理排除不需要的自动配置
4. 自定义Starter遵循规范
5. 保持配置的可覆盖性

---

## 十三、问题思考

> 完成本章学习后，请思考以下问题以检验学习效果

### 基础概念理解

1. **Spring Boot自动配置的工作流程是怎样的？请描述从启动到Bean创建的完整过程。**
   - 提示：从@EnableAutoConfiguration到条件注解判断

2. **@ConditionalOnBean和@ConditionalOnMissingBean有什么区别？为什么自动配置类常用@ConditionalOnMissingBean？**
   - 提示：思考用户自定义配置的优先级

3. **spring.factories文件的作用是什么？它的加载时机是什么时候？**

### 代码实践应用

4. **如何排除特定的自动配置？有哪些方式？**
   - 提示：注解方式、配置文件方式

5. **请设计一个自定义Starter，包含自动配置类、属性类和spring.factories文件。**
   - 提示：参考RedisAutoConfiguration的设计模式

### 综合分析

6. **当自动配置不生效时，如何进行调试和排查？**
   - 提示：debug模式、conditions端点、日志分析

7. **如何理解"用户配置优先于自动配置"这一原则？Spring Boot是如何实现的？**
   - 提示：@ConditionalOnMissingBean、@Primary等机制

---

> **下一阶段预告**: [IoC容器架构设计](../02-core/01-ioc-container.md) - 深入理解Spring IoC容器与Bean生命周期

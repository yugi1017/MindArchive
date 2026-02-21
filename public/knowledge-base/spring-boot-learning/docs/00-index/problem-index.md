# Spring Boot 常见问题索引

> 快速检索：按问题类型 | 按错误信息 | 按解决方案

---

## 一、启动类问题

### 1. 启动失败

#### 问题：找不到主类
**错误信息**: `Error: Could not find or load main class`

**原因**:
- 类路径问题
- 包结构不正确
- 编译问题

**解决方案**:
```bash
mvn clean compile
mvn spring-boot:run
```

#### 问题：端口被占用
**错误信息**: `Web server failed to start. Port 8080 was already in use.`

**解决方案**:
```yaml
server:
  port: 8081
```

或命令行指定:
```bash
java -jar app.jar --server.port=8081
```

查找并关闭占用端口的进程:
```bash
netstat -ano | findstr :8080
taskkill /PID <pid> /F
```

#### 问题：Bean创建失败
**错误信息**: `Error creating bean with name 'xxx'`

**排查步骤**:
1. 检查依赖注入是否正确
2. 检查Bean是否被正确扫描
3. 检查构造函数参数
4. 检查循环依赖

---

### 2. 自动配置问题

#### 问题：自动配置不生效
**症状**: 预期的自动配置未生效

**排查方法**:
```bash
java -jar app.jar --debug
```

或在启动类添加:
```java
@SpringBootApplication
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

查看自动配置报告:
```java
@Autowired
private AutoConfigurationReport report;
```

#### 问题：排除特定自动配置
**解决方案**:
```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Application { }

// 或在配置文件中
spring.autoconfigure.exclude: org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```

---

## 二、依赖注入问题

### 1. 注入失败

#### 问题：NoSuchBeanDefinitionException
**错误信息**: `No qualifying bean of type 'xxx' available`

**原因分析**:
1. 类未被Spring管理（缺少@Component等注解）
2. 组件扫描路径不正确
3. 条件注解导致Bean未创建
4. Profile不匹配

**解决方案**:
```java
@Component
public class MyService { }

@SpringBootApplication
@ComponentScan("com.example")
public class Application { }
```

#### 问题：NoUniqueBeanDefinitionException
**错误信息**: `No qualifying bean of type 'xxx' available: expected single matching bean but found 2`

**解决方案**:
```java
@Primary
@Service
public class PrimaryServiceImpl implements MyService { }

@Service
@Qualifier("secondary")
public class SecondaryServiceImpl implements MyService { }

@Autowired
@Qualifier("secondary")
private MyService myService;
```

#### 问题：注入为null
**症状**: @Autowired注入的字段为null

**常见原因**:
1. 在构造函数中使用了未注入的字段
2. 使用了new创建对象而非Spring管理
3. 静态字段无法注入
4. Bean生命周期问题

**解决方案**:
```java
@Service
public class MyService {
    private final OtherService otherService;
    
    public MyService(OtherService otherService) {
        this.otherService = otherService;
    }
}
```

---

### 2. 循环依赖

#### 问题：循环依赖
**错误信息**: `The dependencies of some of the beans in the application context form a cycle`

**解决方案**:

1. 使用@Lazy延迟加载:
```java
@Service
public class ServiceA {
    private final ServiceB serviceB;
    
    public ServiceA(@Lazy ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}
```

2. 使用Setter注入:
```java
@Service
public class ServiceA {
    private ServiceB serviceB;
    
    @Autowired
    public void setServiceB(ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}
```

3. 重构设计，消除循环依赖（推荐）

---

## 三、事务问题

### 1. 事务不生效

#### 问题：事务不回滚
**症状**: 抛出异常但事务未回滚

**原因分析**:
1. 方法非public
2. 同类方法调用（self-invocation）
3. 异常被catch捕获
4. 异常类型不在rollbackFor范围
5. 数据库不支持事务

**解决方案**:
```java
@Service
public class OrderService {
    
    @Transactional(rollbackFor = Exception.class)
    public void processOrder(Long orderId) throws Exception {
    }
    
    @Transactional
    public void createOrder(OrderDTO dto) {
        orderRepository.save(dto.toOrder());
        inventoryService.decreaseStock(dto.getProductId(), dto.getQuantity());
    }
}

@Service
public class OrderFacade {
    @Autowired
    private OrderService orderService;
    
    public void process(Long orderId) throws Exception {
        orderService.processOrder(orderId);
    }
}
```

#### 问题：嵌套事务异常
**错误信息**: `UnexpectedRollbackException`

**解决方案**:
```java
@Transactional
public void outerMethod() {
    try {
        innerService.innerMethod();
    } catch (Exception e) {
        log.error("Inner method failed", e);
    }
}

@Transactional(propagation = Propagation.REQUIRES_NEW)
public void innerMethod() {
}
```

---

### 2. 事务超时

#### 问题：事务超时
**错误信息**: `TransactionTimedOutException`

**解决方案**:
```java
@Transactional(timeout = 30)
public void longRunningOperation() {
}
```

---

## 四、Web开发问题

### 1. 请求处理问题

#### 问题：404 Not Found
**排查步骤**:
1. 检查URL路径是否正确
2. 检查Controller是否被扫描
3. 检查@RequestMapping配置
4. 检查context-path配置

**调试方法**:
```java
@RestController
@RequestMapping("/api")
public class TestController {
    @GetMapping("/test")
    public String test() {
        return "OK";
    }
}
```

#### 问题：参数绑定失败
**错误信息**: `Required request body is missing` 或 `Required parameter 'xxx' is not present`

**解决方案**:
```java
@GetMapping("/users")
public User getUser(@RequestParam(required = false) String name) {
}

@PostMapping("/users")
public User create(@RequestBody(required = false) UserDTO dto) {
}
```

#### 问题：JSON序列化失败
**错误信息**: `HttpMessageNotWritableException`

**解决方案**:
```java
@Data
public class UserDTO {
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    
    @JsonIgnore
    private String password;
}
```

---

### 2. 跨域问题

#### 问题：CORS错误
**错误信息**: `Access to XMLHttpRequest at 'xxx' from origin 'xxx' has been blocked by CORS policy`

**解决方案**:

1. 注解方式:
```java
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MyController { }
```

2. 全局配置:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

3. 过滤器方式:
```java
@Bean
public CorsFilter corsFilter() {
    CorsConfiguration config = new CorsConfiguration();
    config.addAllowedOrigin("http://localhost:3000");
    config.addAllowedMethod("*");
    config.addAllowedHeader("*");
    config.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return new CorsFilter(source);
}
```

---

### 3. 文件上传问题

#### 问题：文件大小超限
**错误信息**: `Maximum upload size exceeded`

**解决方案**:
```yaml
spring:
  servlet:
    multipart:
      max-file-size: 50MB
      max-request-size: 100MB
```

#### 问题：临时文件丢失
**错误信息**: `The temporary upload location is not valid`

**解决方案**:
```yaml
spring:
  servlet:
    multipart:
      location: /tmp/uploads
```

---

## 五、数据访问问题

### 1. 数据源问题

#### 问题：无法连接数据库
**错误信息**: `Unable to open JDBC Connection`

**排查步骤**:
1. 检查数据库服务是否启动
2. 检查连接URL是否正确
3. 检查用户名密码
4. 检查网络连通性
5. 检查驱动是否正确

**解决方案**:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
```

#### 问题：连接池耗尽
**错误信息**: `HikariPool - Connection is not available`

**解决方案**:
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

---

### 2. JPA问题

#### 问题：LazyInitializationException
**错误信息**: `could not initialize proxy - no Session`

**解决方案**:

1. 使用@EntityGraph:
```java
@EntityGraph(attributePaths = {"orders"})
User findById(Long id);
```

2. 使用JOIN FETCH:
```java
@Query("SELECT u FROM User u LEFT JOIN FETCH u.orders WHERE u.id = :id")
User findByIdWithOrders(@Param("id") Long id);
```

3. 配置OpenSessionInView:
```yaml
spring:
  jpa:
    open-in-view: true
```

#### 问题：N+1查询问题
**症状**: 大量重复查询

**解决方案**:
```java
@Entity
public class Order {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}

@EntityGraph(attributePaths = {"user"})
List<Order> findAll();
```

---

## 六、安全配置问题

### 1. 认证问题

#### 问题：401 Unauthorized
**排查步骤**:
1. 检查Security配置
2. 检查认证信息
3. 检查路径权限配置

**解决方案**:
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(Customizer.withDefaults());
        return http.build();
    }
}
```

#### 问题：CSRF保护
**症状**: POST请求被拒绝

**解决方案**:
```java
http.csrf(csrf -> csrf
    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
);

http.csrf(csrf -> csrf.disable());
```

---

### 2. 密码编码问题

#### 问题：密码不匹配
**错误信息**: `Bad credentials`

**解决方案**:
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

@Service
public class UserService {
    
    public void register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
    
    public boolean login(String username, String rawPassword) {
        User user = userRepository.findByUsername(username);
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
}
```

---

## 七、性能问题

### 1. 启动慢

#### 问题：启动时间过长
**优化方案**:

1. 延迟初始化:
```yaml
spring:
  main:
    lazy-initialization: true
```

2. 排除不必要的自动配置:
```java
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class
})
```

3. 减少组件扫描范围:
```java
@ComponentScan("com.example.myapp")
```

---

### 2. 内存问题

#### 问题：内存溢出
**错误信息**: `OutOfMemoryError`

**解决方案**:

1. 调整JVM参数:
```bash
java -Xms512m -Xmx2g -jar app.jar
```

2. 分析内存使用:
```bash
jmap -histo <pid> | head -20
jcmd <pid> GC.heap_info
```

3. 检查连接池配置:
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
```

---

## 八、配置问题

### 1. 配置不生效

#### 问题：配置文件不加载
**排查步骤**:
1. 检查文件名是否正确
2. 检查文件位置
3. 检查Profile激活状态
4. 检查配置格式

**解决方案**:
```yaml
spring:
  config:
    import: optional:classpath:custom-config.yml
  profiles:
    active: dev
```

#### 问题：配置值不注入
**症状**: @Value注入的值为null或默认值

**解决方案**:
```java
@Value("${app.name:default-name}")
private String appName;

@ConfigurationProperties(prefix = "app")
@Component
public class AppProperties {
    private String name;
}
```

---

### 2. Profile问题

#### 问题：Profile不生效
**解决方案**:
```yaml
spring:
  profiles:
    active: dev

---
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:h2:mem:testdb
```

---

## 九、日志问题

### 问题：日志不输出

**解决方案**:
```yaml
logging:
  level:
    root: INFO
    com.example: DEBUG
  file:
    name: logs/application.log
```

### 问题：日志文件不滚动

**解决方案**:
```yaml
logging:
  file:
    name: logs/application.log
    max-size: 10MB
    max-history: 7
    total-size-cap: 100MB
```

---

## 十、打包部署问题

### 1. 打包问题

#### 问题：打包后配置文件找不到
**解决方案**:
```xml
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*</include>
            </includes>
        </resource>
    </resources>
</build>
```

#### 问题：依赖冲突
**错误信息**: `NoSuchMethodError` 或 `ClassNotFoundException`

**解决方案**:
```bash
mvn dependency:tree
mvn dependency:analyze
```

排除冲突依赖:
```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>example-lib</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

---

### 2. 部署问题

#### 问题：外部配置不生效
**解决方案**:
```bash
java -jar app.jar --spring.config.location=classpath:/,file:./config/
java -jar app.jar --spring.config.additional-location=file:./config/
```

#### 问题：环境变量不生效
**解决方案**:
```yaml
spring:
  datasource:
    username: ${DB_USERNAME:default_user}
    password: ${DB_PASSWORD:default_password}
```

---

## 十一、调试技巧

### 1. 启动调试

```bash
java -jar app.jar --debug
java -jar app.jar --trace
```

### 2. Actuator端点

```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: always
```

访问端点:
- `/actuator/beans` - 查看所有Bean
- `/actuator/conditions` - 查看自动配置条件
- `/actuator/configprops` - 查看配置属性
- `/actuator/env` - 查看环境变量
- `/actuator/mappings` - 查看URL映射

### 3. 远程调试

```bash
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -jar app.jar
```

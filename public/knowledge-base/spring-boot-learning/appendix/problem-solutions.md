# Spring Boot 常见问题解决

> 常见问题与解决方案快速参考，排错时查阅使用

---

## 一、启动问题

### 端口被占用

**错误**: `Port 8080 was already in use`

**解决方案**:
```yaml
server:
  port: 8081
```

或命令行: `java -jar app.jar --server.port=8081`

---

### Bean创建失败

**错误**: `Error creating bean with name 'xxx'`

**排查步骤**:
1. 检查依赖注入是否正确
2. 检查Bean是否被正确扫描
3. 检查构造函数参数
4. 检查循环依赖

---

### 自动配置不生效

**排查方法**:
```bash
java -jar app.jar --debug
```

---

## 二、依赖注入问题

### NoSuchBeanDefinitionException

**错误**: `No qualifying bean of type 'xxx' available`

**解决方案**:
1. 添加@Component/@Service等注解
2. 检查@ComponentScan扫描路径
3. 检查条件注解是否满足

---

### NoUniqueBeanDefinitionException

**错误**: `expected single matching bean but found 2`

**解决方案**:
```java
@Primary
@Service
public class PrimaryServiceImpl implements MyService { }

@Autowired
@Qualifier("secondary")
private MyService myService;
```

---

### 循环依赖

**错误**: `The dependencies form a cycle`

**解决方案**:
```java
public ServiceA(@Lazy ServiceB serviceB) {
    this.serviceB = serviceB;
}
```

---

## 三、事务问题

### 事务不生效

**原因分析**:
1. 方法非public
2. 同类方法调用
3. 异常被catch捕获
4. 异常类型不在rollbackFor范围

**解决方案**:
```java
@Transactional(rollbackFor = Exception.class)
public void process() throws Exception {
}
```

---

## 四、Web开发问题

### 404 Not Found

**排查步骤**:
1. 检查URL路径
2. 检查Controller是否被扫描
3. 检查@RequestMapping配置
4. 检查context-path配置

---

### CORS错误

**解决方案**:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

---

### 文件大小超限

**错误**: `Maximum upload size exceeded`

**解决方案**:
```yaml
spring:
  servlet:
    multipart:
      max-file-size: 50MB
      max-request-size: 100MB
```

---

## 五、数据访问问题

### 无法连接数据库

**错误**: `Unable to open JDBC Connection`

**排查步骤**:
1. 检查数据库服务是否启动
2. 检查连接URL
3. 检查用户名密码
4. 检查网络连通性

---

### LazyInitializationException

**错误**: `could not initialize proxy - no Session`

**解决方案**:
```java
@EntityGraph(attributePaths = {"orders"})
User findById(Long id);

// 或
@Query("SELECT u FROM User u LEFT JOIN FETCH u.orders WHERE u.id = :id")
User findByIdWithOrders(@Param("id") Long id);
```

---

### N+1查询问题

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

### 401 Unauthorized

**排查步骤**:
1. 检查Security配置
2. 检查认证信息
3. 检查路径权限配置

---

### CSRF保护

**解决方案**:
```java
http.csrf(csrf -> csrf.disable());

// 或
http.csrf(csrf -> csrf
    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
);
```

---

## 七、性能问题

### 启动慢

**优化方案**:
```yaml
spring:
  main:
    lazy-initialization: true
```

---

### 内存溢出

**解决方案**:
```bash
java -Xms512m -Xmx2g -jar app.jar
```

---

## 八、配置问题

### 配置不生效

**排查步骤**:
1. 检查文件名是否正确
2. 检查文件位置
3. 检查Profile激活状态
4. 检查配置格式

---

### Profile不生效

**解决方案**:
```yaml
spring:
  profiles:
    active: dev
```

或命令行: `java -jar app.jar --spring.profiles.active=prod`

---

## 九、调试技巧

### 启动调试

```bash
java -jar app.jar --debug
java -jar app.jar --trace
```

### Actuator端点

```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

访问:
- `/actuator/beans` - 查看所有Bean
- `/actuator/conditions` - 查看自动配置条件
- `/actuator/env` - 查看环境变量
- `/actuator/mappings` - 查看URL映射

---

> **提示**: 此文档为快速参考工具，如问题未解决请查阅对应章节或搜索更多资料。

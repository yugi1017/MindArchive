# Spring Boot 注解速查表

> 快速查阅常用注解

---

## 一、Bean定义

| 注解 | 用途 | 示例 |
|------|------|------|
| `@Component` | 通用组件 | `@Component public class MyComponent {}` |
| `@Service` | 服务层 | `@Service public class UserService {}` |
| `@Repository` | 数据访问层 | `@Repository public class UserRepository {}` |
| `@Controller` | MVC控制器 | `@Controller public class PageController {}` |
| `@RestController` | REST控制器 | `@RestController public class ApiController {}` |
| `@Configuration` | 配置类 | `@Configuration public class AppConfig {}` |
| `@Bean` | 方法定义Bean | `@Bean public DataSource dataSource() {}` |

---

## 二、依赖注入

| 注解 | 用途 | 示例 |
|------|------|------|
| `@Autowired` | 自动注入 | `@Autowired private UserService userService;` |
| `@Qualifier` | 按名称限定 | `@Qualifier("primary") @Autowired private DataSource ds;` |
| `@Primary` | 首选Bean | `@Primary @Bean public DataSource primaryDs() {}` |
| `@Value` | 配置值注入 | `@Value("${app.name}") private String name;` |
| `@Resource` | JSR-250注入 | `@Resource private UserService userService;` |
| `@Inject` | JSR-330注入 | `@Inject private UserService userService;` |

---

## 三、Web开发

### 请求映射

| 注解 | 用途 | 示例 |
|------|------|------|
| `@RequestMapping` | 通用映射 | `@RequestMapping("/api/users")` |
| `@GetMapping` | GET请求 | `@GetMapping("/{id}")` |
| `@PostMapping` | POST请求 | `@PostMapping` |
| `@PutMapping` | PUT请求 | `@PutMapping("/{id}")` |
| `@DeleteMapping` | DELETE请求 | `@DeleteMapping("/{id}")` |
| `@PatchMapping` | PATCH请求 | `@PatchMapping("/{id}")` |

### 参数绑定

| 注解 | 用途 | 示例 |
|------|------|------|
| `@PathVariable` | 路径变量 | `@PathVariable Long id` |
| `@RequestParam` | 查询参数 | `@RequestParam String name` |
| `@RequestBody` | 请求体 | `@RequestBody UserDTO dto` |
| `@RequestHeader` | 请求头 | `@RequestHeader("Authorization") String token` |
| `@CookieValue` | Cookie值 | `@CookieValue("sessionId") String sessionId` |
| `@ModelAttribute` | 模型属性 | `@ModelAttribute User user` |

### 响应处理

| 注解 | 用途 | 示例 |
|------|------|------|
| `@ResponseBody` | 响应体 | `@ResponseBody public User getUser() {}` |
| `@ResponseStatus` | 响应状态 | `@ResponseStatus(HttpStatus.CREATED)` |
| `@ExceptionHandler` | 异常处理 | `@ExceptionHandler(Exception.class)` |
| `@ControllerAdvice` | 控制器增强 | `@ControllerAdvice public class GlobalExceptionHandler {}` |

---

## 四、数据校验

| 注解 | 用途 | 示例 |
|------|------|------|
| `@Valid` | 触发校验 | `@Valid @RequestBody UserDTO dto` |
| `@Validated` | 分组校验 | `@Validated(CreateGroup.class)` |
| `@NotNull` | 非空 | `@NotNull private Long id;` |
| `@NotEmpty` | 非空集合/字符串 | `@NotEmpty private List<String> items;` |
| `@NotBlank` | 非空白字符串 | `@NotBlank private String name;` |
| `@Size` | 大小范围 | `@Size(min=1, max=100) private String name;` |
| `@Min` | 最小值 | `@Min(0) private Integer age;` |
| `@Max` | 最大值 | `@Max(150) private Integer age;` |
| `@Pattern` | 正则匹配 | `@Pattern(regexp = "^[A-Za-z0-9]+$")` |
| `@Email` | 邮箱格式 | `@Email private String email;` |

---

## 五、事务管理

| 注解 | 用途 | 示例 |
|------|------|------|
| `@Transactional` | 声明事务 | `@Transactional public void save() {}` |
| `@EnableTransactionManagement` | 启用事务 | `@EnableTransactionManagement` |

### @Transactional属性

```java
@Transactional(
    propagation = Propagation.REQUIRED,  // 传播行为
    isolation = Isolation.READ_COMMITTED, // 隔离级别
    timeout = 30,                         // 超时(秒)
    readOnly = false,                     // 只读
    rollbackFor = Exception.class,        // 回滚异常
    noRollbackFor = BusinessException.class // 不回滚异常
)
```

---

## 六、AOP

| 注解 | 用途 | 示例 |
|------|------|------|
| `@Aspect` | 定义切面 | `@Aspect @Component public class LogAspect {}` |
| `@Pointcut` | 切入点 | `@Pointcut("execution(* com.example..*.*(..))")` |
| `@Before` | 前置通知 | `@Before("pointcut()")` |
| `@After` | 后置通知 | `@After("pointcut()")` |
| `@AfterReturning` | 返回通知 | `@AfterReturning(pointcut="...", returning="result")` |
| `@AfterThrowing` | 异常通知 | `@AfterThrowing(pointcut="...", throwing="ex")` |
| `@Around` | 环绕通知 | `@Around("pointcut()")` |

---

## 七、缓存

| 注解 | 用途 | 示例 |
|------|------|------|
| `@EnableCaching` | 启用缓存 | `@EnableCaching` |
| `@Cacheable` | 缓存结果 | `@Cacheable("users")` |
| `@CachePut` | 更新缓存 | `@CachePut("users")` |
| `@CacheEvict` | 清除缓存 | `@CacheEvict("users")` |
| `@CacheConfig` | 缓存配置 | `@CacheConfig(cacheNames = "users")` |

---

## 八、定时任务

| 注解 | 用途 | 示例 |
|------|------|------|
| `@EnableScheduling` | 启用定时任务 | `@EnableScheduling` |
| `@Scheduled` | 定时任务 | `@Scheduled(cron = "0 0 2 * * ?")` |
| `@EnableAsync` | 启用异步 | `@EnableAsync` |
| `@Async` | 异步执行 | `@Async public void asyncMethod() {}` |

### @Scheduled属性

```java
@Scheduled(cron = "0 0 2 * * ?")      // Cron表达式
@Scheduled(fixedRate = 60000)          // 固定频率(ms)
@Scheduled(fixedDelay = 5000)          // 固定延迟(ms)
@Scheduled(initialDelay = 10000, fixedRate = 30000) // 初始延迟
```

---

## 九、条件装配

| 注解 | 用途 |
|------|------|
| `@ConditionalOnClass` | 类存在时生效 |
| `@ConditionalOnMissingClass` | 类不存在时生效 |
| `@ConditionalOnBean` | Bean存在时生效 |
| `@ConditionalOnMissingBean` | Bean不存在时生效 |
| `@ConditionalOnProperty` | 属性条件 |
| `@ConditionalOnExpression` | SpEL表达式条件 |
| `@ConditionalOnWebApplication` | Web应用时生效 |

---

## 十、配置管理

| 注解 | 用途 | 示例 |
|------|------|------|
| `@ConfigurationProperties` | 配置绑定 | `@ConfigurationProperties(prefix = "app")` |
| `@EnableConfigurationProperties` | 启用配置属性 | `@EnableConfigurationProperties(AppProperties.class)` |
| `@PropertySource` | 属性源 | `@PropertySource("classpath:custom.properties")` |
| `@Profile` | 环境配置 | `@Profile("dev")` |

---

## 十一、安全

| 注解 | 用途 | 示例 |
|------|------|------|
| `@EnableWebSecurity` | 启用Web安全 | `@EnableWebSecurity` |
| `@Secured` | 角色控制 | `@Secured("ROLE_ADMIN")` |
| `@PreAuthorize` | 前置授权 | `@PreAuthorize("hasRole('ADMIN')")` |
| `@PostAuthorize` | 后置授权 | `@PostAuthorize("returnObject.owner == authentication.name")` |
| `@RolesAllowed` | JSR-250角色 | `@RolesAllowed("ADMIN")` |

---

## 十二、测试

| 注解 | 用途 | 示例 |
|------|------|------|
| `@SpringBootTest` | Spring Boot测试 | `@SpringBootTest` |
| `@WebMvcTest` | MVC测试 | `@WebMvcTest(UserController.class)` |
| `@DataJpaTest` | JPA测试 | `@DataJpaTest` |
| `@MockBean` | Mock Bean | `@MockBean private UserService userService;` |
| `@SpyBean` | Spy Bean | `@SpyBean private UserService userService;` |

---

## 十三、JPA

| 注解 | 用途 | 示例 |
|------|------|------|
| `@Entity` | 实体类 | `@Entity public class User {}` |
| `@Table` | 表映射 | `@Table(name = "t_user")` |
| `@Id` | 主键 | `@Id private Long id;` |
| `@GeneratedValue` | 主键生成 | `@GeneratedValue(strategy = GenerationType.IDENTITY)` |
| `@Column` | 列映射 | `@Column(name = "user_name", length = 50)` |
| `@OneToMany` | 一对多 | `@OneToMany(mappedBy = "user")` |
| `@ManyToOne` | 多对一 | `@ManyToOne @JoinColumn(name = "user_id")` |
| `@ManyToMany` | 多对多 | `@ManyToMany` |
| `@OneToOne` | 一对一 | `@OneToOne` |
| `@Query` | 自定义查询 | `@Query("SELECT u FROM User u WHERE u.name = :name")` |

---

## 十四、常用组合

### RESTful API控制器

```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> list() { }
    
    @GetMapping("/{id}")
    public User get(@PathVariable Long id) { }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@Valid @RequestBody UserDTO dto) { }
    
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @Valid @RequestBody UserDTO dto) { }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { }
}
```

### 服务层

```java
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Transactional(readOnly = true)
    public User findById(Long id) { }
    
    public User save(User user) { }
}
```

### 配置类

```java
@Configuration
@EnableConfigurationProperties(AppProperties.class)
public class AppConfig {
    
    @Bean
    @ConditionalOnMissingBean
    public UserService userService(UserRepository repository) {
        return new UserService(repository);
    }
}
```

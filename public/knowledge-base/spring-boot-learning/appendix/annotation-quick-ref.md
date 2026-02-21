# Spring Boot 注解速查

> 常用注解快速参考，开发时查阅使用

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

---

## 三、Web开发

### 请求映射

| 注解 | 用途 |
|------|------|
| `@RequestMapping` | 通用映射 |
| `@GetMapping` | GET请求 |
| `@PostMapping` | POST请求 |
| `@PutMapping` | PUT请求 |
| `@DeleteMapping` | DELETE请求 |
| `@PatchMapping` | PATCH请求 |

### 参数绑定

| 注解 | 用途 |
|------|------|
| `@PathVariable` | 路径变量 |
| `@RequestParam` | 查询参数 |
| `@RequestBody` | 请求体 |
| `@RequestHeader` | 请求头 |
| `@CookieValue` | Cookie值 |

### 响应处理

| 注解 | 用途 |
|------|------|
| `@ResponseBody` | 响应体 |
| `@ResponseStatus` | 响应状态 |
| `@ExceptionHandler` | 异常处理 |
| `@ControllerAdvice` | 控制器增强 |

---

## 四、数据校验

| 注解 | 用途 |
|------|------|
| `@Valid` | 触发校验 |
| `@Validated` | 分组校验 |
| `@NotNull` | 非空 |
| `@NotEmpty` | 非空集合/字符串 |
| `@NotBlank` | 非空白字符串 |
| `@Size` | 大小范围 |
| `@Min` / `@Max` | 数值范围 |
| `@Pattern` | 正则匹配 |
| `@Email` | 邮箱格式 |

---

## 五、事务管理

```java
@Transactional(
    propagation = Propagation.REQUIRED,  // 传播行为
    isolation = Isolation.READ_COMMITTED, // 隔离级别
    timeout = 30,                         // 超时(秒)
    readOnly = false,                     // 只读
    rollbackFor = Exception.class         // 回滚异常
)
```

### 传播行为

| 传播行为 | 说明 |
|----------|------|
| REQUIRED | 有事务则加入，无则新建（默认） |
| REQUIRES_NEW | 总是新建事务 |
| SUPPORTS | 有事务则加入，无则非事务执行 |
| NESTED | 嵌套事务 |

---

## 六、AOP

| 注解 | 用途 |
|------|------|
| `@Aspect` | 定义切面 |
| `@Pointcut` | 切入点定义 |
| `@Before` | 前置通知 |
| `@After` | 后置通知 |
| `@AfterReturning` | 返回通知 |
| `@AfterThrowing` | 异常通知 |
| `@Around` | 环绕通知 |

---

## 七、条件装配

| 注解 | 用途 |
|------|------|
| `@ConditionalOnClass` | 类存在时生效 |
| `@ConditionalOnMissingClass` | 类不存在时生效 |
| `@ConditionalOnBean` | Bean存在时生效 |
| `@ConditionalOnMissingBean` | Bean不存在时生效 |
| `@ConditionalOnProperty` | 属性条件 |
| `@ConditionalOnExpression` | SpEL表达式条件 |

---

## 八、缓存

| 注解 | 用途 |
|------|------|
| `@EnableCaching` | 启用缓存 |
| `@Cacheable` | 缓存结果 |
| `@CachePut` | 更新缓存 |
| `@CacheEvict` | 清除缓存 |

---

## 九、定时任务

```java
@Scheduled(cron = "0 0 2 * * ?")      // Cron表达式
@Scheduled(fixedRate = 60000)          // 固定频率(ms)
@Scheduled(fixedDelay = 5000)          // 固定延迟(ms)
```

---

## 十、安全

| 注解 | 用途 |
|------|------|
| `@EnableWebSecurity` | 启用Web安全 |
| `@Secured` | 角色控制 |
| `@PreAuthorize` | 前置授权 |
| `@PostAuthorize` | 后置授权 |

---

## 十一、测试

| 注解 | 用途 |
|------|------|
| `@SpringBootTest` | Spring Boot测试 |
| `@WebMvcTest` | MVC测试 |
| `@DataJpaTest` | JPA测试 |
| `@MockBean` | Mock Bean |

---

## 十二、JPA

| 注解 | 用途 |
|------|------|
| `@Entity` | 实体类 |
| `@Table` | 表映射 |
| `@Id` | 主键 |
| `@GeneratedValue` | 主键生成 |
| `@Column` | 列映射 |
| `@OneToMany` | 一对多 |
| `@ManyToOne` | 多对一 |
| `@ManyToMany` | 多对多 |
| `@Query` | 自定义查询 |

---

> **提示**: 此文档为快速参考工具，详细内容请查阅对应章节。

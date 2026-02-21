# Spring Boot 注解总索引

> 快速检索：按模块分类 | 按字母排序 | 按应用场景

---

## 一、按功能模块分类

### 1. IoC容器注解

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @Component | 类 | 通用组件标记 | [详情](#component) |
| @Service | 类 | 服务层组件 | [详情](#service) |
| @Repository | 类 | 数据访问层组件 | [详情](#repository) |
| @Controller | 类 | 控制器组件 | [详情](#controller) |
| @RestController | 类 | REST控制器 | [详情](#restcontroller) |
| @Configuration | 类 | 配置类标记 | [详情](#configuration) |
| @Bean | 方法 | Bean定义 | [详情](#bean) |
| @ComponentScan | 类 | 组件扫描配置 | [详情](#componentscan) |
| @Import | 类 | 导入配置类 | [详情](#import) |
| @ImportResource | 类 | 导入XML配置 | [详情](#importresource) |
| @Lazy | 类/方法/字段 | 延迟初始化 | [详情](#lazy) |
| @Scope | 类/方法 | Bean作用域 | [详情](#scope) |
| @Primary | 类/方法 | 首选Bean | [详情](#primary) |
| @Profile | 类/方法 | 环境配置 | [详情](#profile) |

### 2. 依赖注入注解

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @Autowired | 构造器/方法/字段 | 自动装配 | [详情](#autowired) |
| @Qualifier | 字段/参数 | 限定符匹配 | [详情](#qualifier) |
| @Value | 字段/参数 | 值注入 | [详情](#value) |
| @Inject | 构造器/方法/字段 | JSR-330注入 | [详情](#inject) |
| @Named | 类/字段/参数 | JSR-330命名 | [详情](#named) |
| @Resource | 字段/方法 | JSR-250注入 | [详情](#resource) |
| @Lookup | 方法 | 方法注入 | [详情](#lookup) |
| @DependsOn | 类/方法 | 依赖顺序 | [详情](#dependson) |

### 3. 配置管理注解

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @ConfigurationProperties | 类 | 配置属性绑定 | [详情](#configurationproperties) |
| @EnableConfigurationProperties | 类 | 启用配置属性 | [详情](#enableconfigurationproperties) |
| @PropertySource | 类 | 属性源配置 | [详情](#propertysource) |
| @PropertySources | 类 | 多属性源 | [详情](#propertysources) |
| @Conditional | 类/方法 | 条件装配 | [详情](#conditional) |
| @ConditionalOnClass | 类/方法 | 类存在条件 | [详情](#conditionalonclass) |
| @ConditionalOnMissingClass | 类/方法 | 类不存在条件 | [详情](#conditionalonmissingclass) |
| @ConditionalOnBean | 类/方法 | Bean存在条件 | [详情](#conditionalonbean) |
| @ConditionalOnMissingBean | 类/方法 | Bean不存在条件 | [详情](#conditionalonmissingbean) |
| @ConditionalOnProperty | 类/方法 | 属性条件 | [详情](#conditionalonproperty) |
| @ConditionalOnExpression | 类/方法 | SpEL条件 | [详情](#conditionalonexpression) |
| @ConditionalOnWebApplication | 类/方法 | Web应用条件 | [详情](#conditionalonwebapplication) |

### 4. AOP注解

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @Aspect | 类 | 切面定义 | [详情](#aspect) |
| @Pointcut | 方法 | 切入点定义 | [详情](#pointcut) |
| @Before | 方法 | 前置通知 | [详情](#before) |
| @After | 方法 | 后置通知 | [详情](#after) |
| @AfterReturning | 方法 | 返回通知 | [详情](#afterreturning) |
| @AfterThrowing | 方法 | 异常通知 | [详情](#afterthrowing) |
| @Around | 方法 | 环绕通知 | [详情](#around) |
| @EnableAspectJAutoProxy | 类 | 启用AOP | [详情](#enableaspectjautoproxy) |
| @DeclareParents | 字段 | 引入增强 | [详情](#declareparents) |

### 5. Web开发注解

#### 5.1 控制器相关

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @Controller | 类 | MVC控制器 | [详情](#controller) |
| @RestController | 类 | REST控制器 | [详情](#restcontroller) |
| @RequestMapping | 类/方法 | 请求映射 | [详情](#requestmapping) |
| @GetMapping | 方法 | GET映射 | [详情](#getmapping) |
| @PostMapping | 方法 | POST映射 | [详情](#postmapping) |
| @PutMapping | 方法 | PUT映射 | [详情](#putmapping) |
| @DeleteMapping | 方法 | DELETE映射 | [详情](#deletemapping) |
| @PatchMapping | 方法 | PATCH映射 | [详情](#patchmapping) |

#### 5.2 参数绑定

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @RequestParam | 参数 | 查询参数 | [详情](#requestparam) |
| @PathVariable | 参数 | 路径变量 | [详情](#pathvariable) |
| @RequestBody | 参数 | 请求体 | [详情](#requestbody) |
| @RequestHeader | 参数 | 请求头 | [详情](#requestheader) |
| @CookieValue | 参数 | Cookie值 | [详情](#cookievalue) |
| @ModelAttribute | 参数/方法 | 模型属性 | [详情](#modelattribute) |
| @SessionAttribute | 参数 | 会话属性 | [详情](#sessionattribute) |
| @RequestAttribute | 参数 | 请求属性 | [详情](#requestattribute) |
| @MatrixVariable | 参数 | 矩阵变量 | [详情](#matrixvariable) |

#### 5.3 响应处理

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @ResponseBody | 方法/类 | 响应体 | [详情](#responsebody) |
| @ResponseStatus | 方法/异常类 | 响应状态 | [详情](#responsestatus) |
| @ExceptionHandler | 方法 | 异常处理 | [详情](#exceptionhandler) |
| @ControllerAdvice | 类 | 控制器增强 | [详情](#controlleradvice) |
| @RestControllerAdvice | 类 | REST控制器增强 | [详情](#restcontrolleradvice) |
| @CrossOrigin | 类/方法 | 跨域配置 | [详情](#crossorigin) |

#### 5.4 数据校验

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @Valid | 参数 | 校验触发 | [详情](#valid) |
| @Validated | 类/参数 | 分组校验 | [详情](#validated) |
| @NotNull | 字段 | 非空校验 | [详情](#notnull) |
| @NotEmpty | 字段 | 非空集合/字符串 | [详情](#notempty) |
| @NotBlank | 字段 | 非空白字符串 | [详情](#notblank) |
| @Size | 字段 | 大小范围 | [详情](#size) |
| @Min | 字段 | 最小值 | [详情](#min) |
| @Max | 字段 | 最大值 | [详情](#max) |
| @Pattern | 字段 | 正则匹配 | [详情](#pattern) |
| @Email | 字段 | 邮箱格式 | [详情](#email) |

### 6. 数据访问注解

#### 6.1 事务管理

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @Transactional | 类/方法 | 事务管理 | [详情](#transactional) |
| @EnableTransactionManagement | 类 | 启用事务 | [详情](#enabletransactionmanagement) |
| @TransactionalEventListener | 方法 | 事务事件 | [详情](#transactionaleventlistener) |

#### 6.2 JPA注解

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @Entity | 类 | 实体类 | [详情](#entity) |
| @Table | 类 | 表映射 | [详情](#table) |
| @Id | 字段 | 主键 | [详情](#id) |
| @GeneratedValue | 字段 | 主键生成 | [详情](#generatedvalue) |
| @Column | 字段 | 列映射 | [详情](#column) |
| @OneToMany | 字段 | 一对多 | [详情](#onetomany) |
| @ManyToOne | 字段 | 多对一 | [详情](#manytoone) |
| @ManyToMany | 字段 | 多对多 | [详情](#manytomany) |
| @OneToOne | 字段 | 一对一 | [详情](#onetoone) |
| @JoinColumn | 字段 | 外键列 | [详情](#joincolumn) |
| @JoinTable | 字段 | 关联表 | [详情](#jointable) |
| @NamedQuery | 类 | 命名查询 | [详情](#namedquery) |
| @Query | 方法 | 自定义查询 | [详情](#query) |
| @Modifying | 方法 | 更新操作 | [详情](#modifying) |
| @EnableJpaRepositories | 类 | 启用JPA仓库 | [详情](#enablejparepositories) |

### 7. 安全注解

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @EnableWebSecurity | 类 | 启用Web安全 | [详情](#enablewebsecurity) |
| @Secured | 方法 | 角色控制 | [详情](#secured) |
| @PreAuthorize | 方法 | 前置授权 | [详情](#preauthorize) |
| @PostAuthorize | 方法 | 后置授权 | [详情](#postauthorize) |
| @PreFilter | 方法 | 前置过滤 | [详情](#prefilter) |
| @PostFilter | 方法 | 后置过滤 | [详情](#postfilter) |
| @RolesAllowed | 方法 | JSR-250角色 | [详情](#rolesallowed) |
| @PermitAll | 方法 | 允许所有 | [详情](#permitall) |
| @DenyAll | 方法 | 拒绝所有 | [详情](#denyall) |

### 8. 缓存注解

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @EnableCaching | 类 | 启用缓存 | [详情](#enablecaching) |
| @Cacheable | 方法 | 缓存结果 | [详情](#cacheable) |
| @CachePut | 方法 | 更新缓存 | [详情](#cacheput) |
| @CacheEvict | 方法 | 清除缓存 | [详情](#cacheevict) |
| @Caching | 方法 | 组合缓存 | [详情](#caching) |
| @CacheConfig | 类 | 缓存配置 | [详情](#cacheconfig) |

### 9. 定时任务注解

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @EnableScheduling | 类 | 启用定时任务 | [详情](#enablescheduling) |
| @Scheduled | 方法 | 定时任务 | [详情](#scheduled) |
| @EnableAsync | 类 | 启用异步 | [详情](#enableasync) |
| @Async | 方法 | 异步执行 | [详情](#async) |

### 10. 测试注解

| 注解 | 作用范围 | 核心功能 | 快速定位 |
|------|----------|----------|----------|
| @SpringBootTest | 类 | Spring Boot测试 | [详情](#springboottest) |
| @WebMvcTest | 类 | MVC测试 | [详情](#webmvctest) |
| @DataJpaTest | 类 | JPA测试 | [详情](#datajpatest) |
| @MockBean | 字段 | Mock Bean | [详情](#mockbean) |
| @SpyBean | 字段 | Spy Bean | [详情](#spybean) |
| @AutoConfigureMockMvc | 类 | MockMvc配置 | [详情](#autoconfiguremockmvc) |
| @TestConfiguration | 类 | 测试配置 | [详情](#testconfiguration) |
| @TestPropertySource | 类 | 测试属性源 | [详情](#testpropertysource) |

---

## 二、按字母排序索引

### A
- @After - [AOP](#after)
- @AfterReturning - [AOP](#afterreturning)
- @AfterThrowing - [AOP](#afterthrowing)
- @Around - [AOP](#around)
- @Aspect - [AOP](#aspect)
- @Async - [定时任务](#async)
- @Autowired - [依赖注入](#autowired)
- @AutoConfigureMockMvc - [测试](#autoconfiguremockmvc)

### B
- @Bean - [IoC容器](#bean)
- @Before - [AOP](#before)
- @NotBlank - [数据校验](#notblank)
- @NotEmpty - [数据校验](#notempty)
- @NotNull - [数据校验](#notnull)

### C
- @CacheConfig - [缓存](#cacheconfig)
- @CacheEvict - [缓存](#cacheevict)
- @CachePut - [缓存](#cacheput)
- @Cacheable - [缓存](#cacheable)
- @Caching - [缓存](#caching)
- @Column - [JPA](#column)
- @Component - [IoC容器](#component)
- @ComponentScan - [IoC容器](#componentscan)
- @Configuration - [IoC容器](#configuration)
- @ConfigurationProperties - [配置管理](#configurationproperties)
- @Controller - [Web开发](#controller)
- @ControllerAdvice - [Web开发](#controlleradvice)
- @CookieValue - [Web开发](#cookievalue)
- @CrossOrigin - [Web开发](#crossorigin)
- @Conditional* - [配置管理](#conditional)

### D
- @DeclareParents - [AOP](#declareparents)
- @DeleteMapping - [Web开发](#deletemapping)
- @DependsOn - [依赖注入](#dependson)
- @DenyAll - [安全](#denyall)

### E
- @Email - [数据校验](#email)
- @EnableAspectJAutoProxy - [AOP](#enableaspectjautoproxy)
- @EnableAsync - [定时任务](#enableasync)
- @EnableCaching - [缓存](#enablecaching)
- @EnableConfigurationProperties - [配置管理](#enableconfigurationproperties)
- @EnableJpaRepositories - [JPA](#enablejparepositories)
- @EnableScheduling - [定时任务](#enablescheduling)
- @EnableTransactionManagement - [事务](#enabletransactionmanagement)
- @EnableWebSecurity - [安全](#enablewebsecurity)
- @Entity - [JPA](#entity)
- @ExceptionHandler - [Web开发](#exceptionhandler)

### G
- @GeneratedValue - [JPA](#generatedvalue)
- @GetMapping - [Web开发](#getmapping)

### I
- @Id - [JPA](#id)
- @Import - [IoC容器](#import)
- @ImportResource - [IoC容器](#importresource)
- @Inject - [依赖注入](#inject)

### J
- @JoinColumn - [JPA](#joincolumn)
- @JoinTable - [JPA](#jointable)

### L
- @Lazy - [IoC容器](#lazy)
- @Lookup - [依赖注入](#lookup)

### M
- @ManyToMany - [JPA](#manytomany)
- @ManyToOne - [JPA](#manytoone)
- @MatrixVariable - [Web开发](#matrixvariable)
- @Max - [数据校验](#max)
- @Min - [数据校验](#min)
- @MockBean - [测试](#mockbean)
- @Modifying - [JPA](#modifying)
- @ModelAttribute - [Web开发](#modelattribute)

### N
- @Named - [依赖注入](#named)
- @NamedQuery - [JPA](#namedquery)

### O
- @OneToOne - [JPA](#onetoone)
- @OneToMany - [JPA](#onetomany)

### P
- @PatchMapping - [Web开发](#patchmapping)
- @Pattern - [数据校验](#pattern)
- @PermitAll - [安全](#permitall)
- @Pointcut - [AOP](#pointcut)
- @PostAuthorize - [安全](#postauthorize)
- @PostFilter - [安全](#postfilter)
- @PostMapping - [Web开发](#postmapping)
- @PreAuthorize - [安全](#preauthorize)
- @PreFilter - [安全](#prefilter)
- @Primary - [IoC容器](#primary)
- @Profile - [IoC容器](#profile)
- @PropertySource - [配置管理](#propertysource)
- @PropertySources - [配置管理](#propertysources)
- @PutMapping - [Web开发](#putmapping)

### Q
- @Qualifier - [依赖注入](#qualifier)
- @Query - [JPA](#query)

### R
- @Repository - [IoC容器](#repository)
- @RequestAttribute - [Web开发](#requestattribute)
- @RequestBody - [Web开发](#requestbody)
- @RequestHeader - [Web开发](#requestheader)
- @RequestParam - [Web开发](#requestparam)
- @RequestMapping - [Web开发](#requestmapping)
- @ResponseBody - [Web开发](#responsebody)
- @ResponseStatus - [Web开发](#responsestatus)
- @RestController - [Web开发](#restcontroller)
- @RestControllerAdvice - [Web开发](#restcontrolleradvice)
- @Resource - [依赖注入](#resource)
- @RolesAllowed - [安全](#rolesallowed)

### S
- @Scope - [IoC容器](#scope)
- @Scheduled - [定时任务](#scheduled)
- @Secured - [安全](#secured)
- @Service - [IoC容器](#service)
- @SessionAttribute - [Web开发](#sessionattribute)
- @Size - [数据校验](#size)
- @SpyBean - [测试](#spybean)
- @SpringBootTest - [测试](#springboottest)

### T
- @Table - [JPA](#table)
- @TestConfiguration - [测试](#testconfiguration)
- @TestPropertySource - [测试](#testpropertysource)
- @Transactional - [事务](#transactional)
- @TransactionalEventListener - [事务](#transactionaleventlistener)

### V
- @Valid - [数据校验](#valid)
- @Validated - [数据校验](#validated)
- @Value - [依赖注入](#value)

### W
- @WebMvcTest - [测试](#webmvctest)

---

## 三、按应用场景索引

### 场景：定义Bean

| 需求 | 推荐注解 | 说明 |
|------|----------|------|
| 通用组件 | @Component | 最基础的组件标记 |
| 服务层 | @Service | 语义化，服务层专用 |
| 数据访问层 | @Repository | 语义化，支持异常转换 |
| 控制器 | @Controller | MVC控制器 |
| REST控制器 | @RestController | = @Controller + @ResponseBody |
| 配置类 | @Configuration | 替代XML配置 |
| 方法定义Bean | @Bean | 第三方库Bean定义 |

### 场景：依赖注入

| 需求 | 推荐注解 | 说明 |
|------|----------|------|
| 按类型注入 | @Autowired | Spring推荐 |
| 按名称注入 | @Qualifier + @Autowired | 配合使用 |
| 指定首选Bean | @Primary | 多实现时的默认选择 |
| 配置值注入 | @Value | 支持SpEL |
| JSR-330标准 | @Inject | 可移植性更好 |
| JSR-250标准 | @Resource | 按名称优先 |

### 场景：条件装配

| 需求 | 推荐注解 | 说明 |
|------|----------|------|
| 类存在时装配 | @ConditionalOnClass | 检测类路径 |
| Bean存在时装配 | @ConditionalOnBean | 检测容器 |
| Bean不存在时装配 | @ConditionalOnMissingBean | 防止重复 |
| 属性条件 | @ConditionalOnProperty | 配置开关 |
| 表达式条件 | @ConditionalOnExpression | SpEL表达式 |
| 自定义条件 | @Conditional | 实现Condition接口 |

### 场景：Web请求处理

| 需求 | 推荐注解 | 说明 |
|------|----------|------|
| GET请求 | @GetMapping | 查询操作 |
| POST请求 | @PostMapping | 创建操作 |
| PUT请求 | @PutMapping | 更新操作 |
| DELETE请求 | @DeleteMapping | 删除操作 |
| 路径参数 | @PathVariable | RESTful风格 |
| 查询参数 | @RequestParam | URL参数 |
| 请求体 | @RequestBody | JSON/XML |
| 请求头 | @RequestHeader | Header参数 |

### 场景：数据校验

| 需求 | 推荐注解 | 说明 |
|------|----------|------|
| 触发校验 | @Valid / @Validated | 方法参数上 |
| 非空校验 | @NotNull / @NotEmpty / @NotBlank | 三者有区别 |
| 数值范围 | @Min / @Max | 数字类型 |
| 长度限制 | @Size | 字符串/集合 |
| 格式校验 | @Pattern / @Email | 正则表达式 |
| 分组校验 | @Validated | 指定分组 |

### 场景：事务管理

| 需求 | 推荐配置 | 说明 |
|------|----------|------|
| 默认事务 | @Transactional | REQUIRED传播 |
| 只读事务 | @Transactional(readOnly = true) | 优化查询 |
| 自定义回滚 | @Transactional(rollbackFor = ...) | 指定异常 |
| 嵌套事务 | @Transactional(propagation = ...) | 传播行为 |

---

## 四、注解详情

### @Component {#component}

#### 基本信息
- **所属模块**: IoC容器
- **作用范围**: 类
- **Spring版本**: 2.5+

#### 核心功能
将类标记为Spring管理的组件，自动检测并注册为Bean。

#### 使用示例

```java
@Component
public class EmailService {
    public void sendEmail(String to, String content) {
    }
}
```

#### 注意事项
- 需要配合@ComponentScan启用扫描
- 默认Bean名称为首字母小写的类名
- 可通过value属性指定Bean名称

#### 相关注解
@Service, @Repository, @Controller, @Configuration

---

### @Service {#service}

#### 基本信息
- **所属模块**: IoC容器
- **作用范围**: 类
- **Spring版本**: 2.5+

#### 核心功能
@Service是@Component的特化版本，用于标记服务层组件。

#### 使用示例

```java
@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

#### 注意事项
- 语义上表示服务层，便于代码组织
- 未来版本可能添加特定功能（如异常处理）

---

### @Repository {#repository}

#### 基本信息
- **所属模块**: IoC容器
- **作用范围**: 类
- **Spring版本**: 2.0+

#### 核心功能
标记数据访问层组件，提供异常转换功能。

#### 使用示例

```java
@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;
    
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    public User findById(Long id) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM users WHERE id = ?", 
            new UserRowMapper(), id);
    }
}
```

#### 注意事项
- 自动将持久层异常转换为Spring的DataAccessException
- 便于统一异常处理

---

### @Controller {#controller}

#### 基本信息
- **所属模块**: Web开发
- **作用范围**: 类
- **Spring版本**: 2.5+

#### 核心功能
标记MVC控制器，支持返回视图。

#### 使用示例

```java
@Controller
@RequestMapping("/users")
public class UserController {
    
    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        model.addAttribute("user", userService.findById(id));
        return "user/detail";
    }
}
```

---

### @RestController {#restcontroller}

#### 基本信息
- **所属模块**: Web开发
- **作用范围**: 类
- **Spring版本**: 4.0+

#### 核心功能
@RestController = @Controller + @ResponseBody，用于RESTful API。

#### 使用示例

```java
@RestController
@RequestMapping("/api/users")
public class UserRestController {
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
}
```

---

### @Configuration {#configuration}

#### 基本信息
- **所属模块**: IoC容器
- **作用范围**: 类
- **Spring版本**: 3.0+

#### 核心功能
标记配置类，替代XML配置文件。

#### 使用示例

```java
@Configuration
public class DataSourceConfig {
    
    @Bean
    public DataSource dataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
        ds.setUsername("root");
        ds.setPassword("password");
        return ds;
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```

#### 注意事项
- 配置类本身也是Bean
- @Bean方法之间的调用会被代理，确保单例语义
- 支持嵌套@Configuration

---

### @Bean {#bean}

#### 基本信息
- **所属模块**: IoC容器
- **作用范围**: 方法
- **Spring版本**: 3.0+

#### 核心属性
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | String[] | 方法名 | Bean名称 |
| initMethod | String | "" | 初始化方法 |
| destroyMethod | String | 自动推断 | 销毁方法 |
| autowire | Autowire | NO | 自动装配模式（已废弃） |

#### 使用示例

```java
@Configuration
public class AppConfig {
    
    @Bean
    public UserService userService() {
        return new UserService(userRepository());
    }
    
    @Bean(destroyMethod = "close")
    public DataSource dataSource() {
        return new HikariDataSource(config);
    }
    
    @Bean(name = {"primaryDataSource", "mainDataSource"})
    @Primary
    public DataSource primaryDataSource() {
        return createDataSource("primary");
    }
}
```

#### 注意事项
- 默认Bean名称为方法名
- 支持多别名
- destroyMethod默认会自动检测close/shutdown方法

---

### @Autowired {#autowired}

#### 基本信息
- **所属模块**: 依赖注入
- **作用范围**: 构造器/方法/字段
- **Spring版本**: 2.5+

#### 核心属性
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| required | boolean | true | 是否必须注入 |

#### 使用示例

```java
@Service
public class OrderService {
    
    private final OrderRepository orderRepository;
    private PaymentService paymentService;
    
    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    
    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    
    @Autowired(required = false)
    private NotificationService notificationService;
}
```

#### 注意事项
- Spring 4.3+ 单构造器可省略@Autowired
- 推荐构造器注入（不可变、易测试）
- 字段注入不推荐（难以测试、隐藏依赖）

#### 常见问题
- **Q: 为什么注入为null？**
  - 检查是否被Spring管理（缺少@Component等）
  - 检查是否在构造器中使用了未注入的字段
  
- **Q: 多实现如何选择？**
  - 使用@Qualifier指定名称
  - 使用@Primary标记首选实现

---

### @Qualifier {#qualifier}

#### 基本信息
- **所属模块**: 依赖注入
- **作用范围**: 字段/参数
- **Spring版本**: 2.5+

#### 核心功能
配合@Autowired按名称限定注入。

#### 使用示例

```java
@Service
public class NotificationService {
    
    private final MessageSender emailSender;
    private final MessageSender smsSender;
    
    public NotificationService(
            @Qualifier("emailSender") MessageSender emailSender,
            @Qualifier("smsSender") MessageSender smsSender) {
        this.emailSender = emailSender;
        this.smsSender = smsSender;
    }
}
```

#### 自定义Qualifier

```java
@Qualifier
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface EmailSender {
}

@Service
public class NotificationService {
    @Autowired
    @EmailSender
    private MessageSender messageSender;
}
```

---

### @Value {#value}

#### 基本信息
- **所属模块**: 依赖注入
- **作用范围**: 字段/参数
- **Spring版本**: 3.0+

#### 核心功能
注入配置值，支持SpEL表达式。

#### 使用示例

```java
@Service
public class ConfigService {
    
    @Value("${app.name}")
    private String appName;
    
    @Value("${app.timeout:30000}")
    private long timeout;
    
    @Value("#{systemProperties['user.home']}")
    private String userHome;
    
    @Value("#{T(java.lang.Math).random() * 100}")
    private double randomValue;
    
    @Value("${app.servers:localhost,remotehost}")
    private String[] servers;
}
```

#### 注意事项
- 使用${}引用属性
- 使用#{}执行SpEL表达式
- 冒号后为默认值
- 支持类型转换

---

### @Transactional {#transactional}

#### 基本信息
- **所属模块**: 数据访问/事务管理
- **作用范围**: 类/方法
- **Spring版本**: 1.0+

#### 核心属性
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| propagation | Propagation | REQUIRED | 传播行为 |
| isolation | Isolation | DEFAULT | 隔离级别 |
| timeout | int | -1 | 超时时间(秒) |
| readOnly | boolean | false | 是否只读 |
| rollbackFor | Class[] | {} | 触发回滚的异常类型 |
| noRollbackFor | Class[] | {} | 不触发回滚的异常类型 |
| value | String | "" | 事务管理器名称 |
| transactionManager | String | "" | 事务管理器名称 |

#### 传播行为说明
| 传播行为 | 说明 |
|----------|------|
| REQUIRED | 有事务则加入，无则新建（默认） |
| REQUIRES_NEW | 总是新建事务，挂起当前事务 |
| SUPPORTS | 有事务则加入，无则非事务执行 |
| NOT_SUPPORTED | 非事务执行，挂起当前事务 |
| MANDATORY | 必须在事务中执行，否则抛异常 |
| NEVER | 非事务执行，有事务则抛异常 |
| NESTED | 嵌套事务（保存点） |

#### 使用示例

```java
@Service
public class OrderService {
    
    @Transactional
    public Order createOrder(OrderDTO dto) {
        Order order = orderRepository.save(dto.toOrder());
        inventoryService.decreaseStock(dto.getProductId(), dto.getQuantity());
        return order;
    }
    
    @Transactional(readOnly = true)
    public Order findById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }
    
    @Transactional(rollbackFor = Exception.class)
    public void processOrder(Long orderId) throws Exception {
    }
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logOperation(String operation) {
    }
}
```

#### 注意事项
- 只能应用于public方法
- 同类方法调用不生效（绕过代理）
- 默认只对RuntimeException和Error回滚
- 推荐在类上设置通用配置，方法上覆盖特定配置

#### 常见问题
- **Q: 为什么事务不生效？**
  1. 方法不是public
  2. 同类方法调用（self-invocation）
  3. 异常被catch捕获未抛出
  4. 异常类型不在rollbackFor范围内
  5. 数据库不支持事务（如MyISAM）

---

### @RequestMapping {#requestmapping}

#### 基本信息
- **所属模块**: Web开发
- **作用范围**: 类/方法
- **Spring版本**: 2.5+

#### 核心属性
| 属性 | 类型 | 说明 |
|------|------|------|
| value / path | String[] | 请求路径 |
| method | RequestMethod[] | 请求方法 |
| params | String[] | 参数条件 |
| headers | String[] | 请求头条件 |
| consumes | String[] | Content-Type条件 |
| produces | String[] | Accept条件 |

#### 使用示例

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    @RequestMapping(
        value = "/search",
        method = RequestMethod.GET,
        params = "name",
        produces = "application/json"
    )
    public List<User> searchByName(@RequestParam String name) {
        return userService.findByName(name);
    }
}
```

#### 简化注解
Spring 4.3+ 推荐使用简化版本：
- @GetMapping
- @PostMapping
- @PutMapping
- @DeleteMapping
- @PatchMapping

---

### @GetMapping {#getmapping}

#### 基本信息
- **所属模块**: Web开发
- **作用范围**: 方法
- **Spring版本**: 4.3+

#### 核心功能
@GetMapping = @RequestMapping(method = RequestMethod.GET)

#### 使用示例

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public List<User> listUsers() {
        return userService.findAll();
    }
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    @GetMapping(params = "email")
    public User getByEmail(@RequestParam String email) {
        return userService.findByEmail(email);
    }
}
```

---

### @PostMapping {#postmapping}

#### 基本信息
- **所属模块**: Web开发
- **作用范围**: 方法
- **Spring版本**: 4.3+

#### 使用示例

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody @Valid UserDTO dto) {
        return userService.create(dto);
    }
    
    @PostMapping("/batch")
    public List<User> createUsers(@RequestBody List<UserDTO> dtos) {
        return userService.createAll(dtos);
    }
}
```

---

### @PathVariable {#pathvariable}

#### 基本信息
- **所属模块**: Web开发
- **作用范围**: 参数
- **Spring版本**: 3.0+

#### 核心属性
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | String | 参数名 | 路径变量名 |
| required | boolean | true | 是否必须 |

#### 使用示例

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    @GetMapping("/{userId}/orders/{orderId}")
    public Order getUserOrder(
            @PathVariable Long userId,
            @PathVariable Long orderId) {
        return orderService.findByUserAndId(userId, orderId);
    }
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") String userId) {
        return userService.findById(Long.parseLong(userId));
    }
}
```

---

### @RequestParam {#requestparam}

#### 基本信息
- **所属模块**: Web开发
- **作用范围**: 参数
- **Spring版本**: 2.5+

#### 核心属性
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | String | 参数名 | 请求参数名 |
| required | boolean | true | 是否必须 |
| defaultValue | String | "" | 默认值 |

#### 使用示例

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public Page<User> listUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String name) {
        return userService.findAll(page, size, name);
    }
    
    @GetMapping("/search")
    public List<User> search(
            @RequestParam List<String> status,
            @RequestParam(required = false) String keyword) {
        return userService.search(status, keyword);
    }
}
```

---

### @RequestBody {#requestbody}

#### 基本信息
- **所属模块**: Web开发
- **作用范围**: 参数
- **Spring版本**: 3.0+

#### 核心属性
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| required | boolean | true | 是否必须 |

#### 使用示例

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @PostMapping
    public User create(@RequestBody UserDTO dto) {
        return userService.create(dto);
    }
    
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody UserDTO dto) {
        return userService.update(id, dto);
    }
}
```

#### 注意事项
- 使用HttpMessageConverter解析请求体
- 常用于JSON/XML格式
- 配合@Valid进行校验

---

### @ConfigurationProperties {#configurationproperties}

#### 基本信息
- **所属模块**: 配置管理
- **作用范围**: 类
- **Spring版本**: 1.3+

#### 核心属性
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| prefix | String | "" | 配置前缀 |
| value | String | "" | 同prefix |
| ignoreInvalidFields | boolean | false | 忽略无效字段 |
| ignoreUnknownFields | boolean | true | 忽略未知字段 |

#### 使用示例

```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private String version;
    private int timeout = 30000;
    private List<String> servers = new ArrayList<>();
    private Map<String, String> features = new HashMap<>();
    
    public static class Database {
        private String url;
        private String username;
        private String password;
    }
    
    private Database database = new Database();
}
```

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

#### 启用方式

```java
@Configuration
@EnableConfigurationProperties(AppProperties.class)
public class AppConfig {
}

@Service
public class MyService {
    private final AppProperties properties;
    
    public MyService(AppProperties properties) {
        this.properties = properties;
    }
}
```

---

### @ConditionalOnProperty {#conditionalonproperty}

#### 基本信息
- **所属模块**: 配置管理
- **作用范围**: 类/方法
- **Spring版本**: 1.1+

#### 核心属性
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| prefix | String | "" | 属性前缀 |
| value / name | String[] | | 属性名 |
| havingValue | String | "" | 期望值 |
| matchIfMissing | boolean | false | 属性不存在时是否匹配 |

#### 使用示例

```java
@Configuration
public class CacheConfig {
    
    @Bean
    @ConditionalOnProperty(prefix = "cache", name = "type", havingValue = "redis")
    public CacheService redisCacheService() {
        return new RedisCacheService();
    }
    
    @Bean
    @ConditionalOnProperty(prefix = "cache", name = "type", havingValue = "local", matchIfMissing = true)
    public CacheService localCacheService() {
        return new LocalCacheService();
    }
    
    @Bean
    @ConditionalOnProperty(name = "feature.x.enabled", havingValue = "true")
    public FeatureXService featureXService() {
        return new FeatureXService();
    }
}
```

---

### @Cacheable {#cacheable}

#### 基本信息
- **所属模块**: 缓存
- **作用范围**: 方法
- **Spring版本**: 3.1+

#### 核心属性
| 属性 | 类型 | 说明 |
|------|------|------|
| value / cacheNames | String[] | 缓存名称 |
| key | String | 缓存键（SpEL） |
| condition | String | 缓存条件（SpEL） |
| unless | String | 不缓存条件（SpEL） |

#### 使用示例

```java
@Service
public class UserService {
    
    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    @Cacheable(value = "users", key = "#email", unless = "#result == null")
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    @Cacheable(value = "users", condition = "#id > 0")
    public User findByIdWithCondition(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

---

### @Scheduled {#scheduled}

#### 基本信息
- **所属模块**: 定时任务
- **作用范围**: 方法
- **Spring版本**: 3.0+

#### 核心属性
| 属性 | 类型 | 说明 |
|------|------|------|
| cron | String | Cron表达式 |
| fixedRate | long | 固定频率（毫秒） |
| fixedDelay | long | 固定延迟（毫秒） |
| initialDelay | long | 初始延迟（毫秒） |
| zone | String | 时区 |

#### 使用示例

```java
@Component
@EnableScheduling
public class ScheduledTasks {
    
    @Scheduled(cron = "0 0 2 * * ?")
    public void dailyCleanup() {
    }
    
    @Scheduled(fixedRate = 60000)
    public void everyMinute() {
    }
    
    @Scheduled(fixedDelay = 5000)
    public void afterCompletion() {
    }
    
    @Scheduled(initialDelay = 10000, fixedRate = 30000)
    public void withInitialDelay() {
    }
}
```

---

### @Async {#async}

#### 基本信息
- **所属模块**: 定时任务
- **作用范围**: 类/方法
- **Spring版本**: 3.0+

#### 核心属性
| 属性 | 类型 | 说明 |
|------|------|------|
| value | String | 执行器Bean名称 |

#### 使用示例

```java
@Service
@EnableAsync
public class NotificationService {
    
    @Async
    public void sendEmailAsync(String to, String content) {
    }
    
    @Async("taskExecutor")
    public CompletableFuture<String> processAsync(String input) {
        return CompletableFuture.completedFuture(result);
    }
}
```

---

### @SpringBootTest {#springboottest}

#### 基本信息
- **所属模块**: 测试
- **作用范围**: 类
- **Spring版本**: 1.4+

#### 核心属性
| 属性 | 类型 | 说明 |
|------|------|------|
| classes | Class[] | 配置类 |
| webEnvironment | WebEnvironment | Web环境类型 |
| properties | String[] | 配置属性 |
| value | String[] | 同properties |

#### 使用示例

```java
@SpringBootTest
class ApplicationTests {
    
    @Autowired
    private UserService userService;
    
    @Test
    void contextLoads() {
    }
    
    @Test
    void testUserService() {
        User user = userService.findById(1L);
        assertNotNull(user);
    }
}

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class WebIntegrationTests {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void testApi() {
        ResponseEntity<User> response = restTemplate.getForEntity(
            "/api/users/1", User.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
```

---

> **注**: 更多注解详情将持续更新...

# Spring Boot 核心概念索引

> 快速检索：按架构层次 | 按功能领域 | 按学习路径

---

## 一、核心架构概念

### 1. Spring Boot 核心理念

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| 约定优于配置 | Convention over Configuration | [详情](#约定优于配置) |
| 自动配置 | Auto-Configuration | [详情](#自动配置) |
| 起步依赖 | Starter Dependencies | [详情](#起步依赖) |
| 内嵌容器 | Embedded Container | [详情](#内嵌容器) |
| 生产就绪 | Production-Ready | [详情](#生产就绪) |

### 2. IoC容器

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| IoC容器 | Inversion of Control Container | [详情](#ioc容器) |
| Bean | Spring管理的对象 | [详情](#bean) |
| BeanDefinition | Bean的元数据定义 | [详情](#beandefinition) |
| BeanFactory | Bean工厂接口 | [详情](#beanfactory) |
| ApplicationContext | 应用上下文 | [详情](#applicationcontext) |
| Bean生命周期 | Bean Lifecycle | [详情](#bean生命周期) |
| Bean作用域 | Bean Scope | [详情](#bean作用域) |

### 3. 依赖注入

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| 依赖注入 | Dependency Injection | [详情](#依赖注入) |
| 构造器注入 | Constructor Injection | [详情](#构造器注入) |
| Setter注入 | Setter Injection | [详情](#setter注入) |
| 字段注入 | Field Injection | [详情](#字段注入) |
| 自动装配 | Autowiring | [详情](#自动装配) |
| 循环依赖 | Circular Dependency | [详情](#循环依赖) |

---

## 二、配置管理概念

### 1. 配置体系

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| Environment | 环境抽象 | [详情](#environment) |
| PropertySource | 属性源 | [详情](#propertysource) |
| Profile | 环境配置 | [详情](#profile) |
| 配置绑定 | Configuration Binding | [详情](#配置绑定) |
| 外部化配置 | Externalized Configuration | [详情](#外部化配置) |

### 2. 条件装配

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| 条件注解 | Conditional Annotations | [详情](#条件注解) |
| Condition接口 | 条件判断接口 | [详情](#condition接口) |
| 条件评估报告 | Condition Evaluation Report | [详情](#条件评估报告) |

---

## 三、AOP概念

### 1. AOP基础

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| AOP | Aspect-Oriented Programming | [详情](#aop) |
| 切面 | Aspect | [详情](#切面) |
| 切入点 | Pointcut | [详情](#切入点) |
| 通知 | Advice | [详情](#通知) |
| 连接点 | Join Point | [详情](#连接点) |
| 引入 | Introduction | [详情](#引入) |
| 织入 | Weaving | [详情](#织入) |

### 2. 代理机制

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| JDK动态代理 | JDK Dynamic Proxy | [详情](#jdk动态代理) |
| CGLIB代理 | CGLIB Proxy | [详情](#cglib代理) |
| 代理选择策略 | Proxy Selection Strategy | [详情](#代理选择策略) |

---

## 四、Web开发概念

### 1. Spring MVC

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| DispatcherServlet | 核心分发器 | [详情](#dispatcherservlet) |
| HandlerMapping | 处理器映射 | [详情](#handlermapping) |
| HandlerAdapter | 处理器适配器 | [详情](#handleradapter) |
| ViewResolver | 视图解析器 | [详情](#viewresolver) |
| 拦截器 | Interceptor | [详情](#拦截器) |
| 过滤器 | Filter | [详情](#过滤器) |

### 2. RESTful

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| REST | Representational State Transfer | [详情](#rest) |
| 资源 | Resource | [详情](#资源) |
| HTTP方法 | HTTP Methods | [详情](#http方法) |
| 状态码 | Status Codes | [详情](#状态码) |
| HATEOAS | Hypermedia As The Engine Of Application State | [详情](#hateoas) |

### 3. 数据处理

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| 参数绑定 | Parameter Binding | [详情](#参数绑定) |
| 数据校验 | Data Validation | [详情](#数据校验) |
| 消息转换器 | Message Converter | [详情](#消息转换器) |
| 异常处理 | Exception Handling | [详情](#异常处理) |

---

## 五、数据访问概念

### 1. 数据源

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| DataSource | 数据源接口 | [详情](#datasource) |
| 连接池 | Connection Pool | [详情](#连接池) |
| HikariCP | 高性能连接池 | [详情](#hikaricp) |
| 多数据源 | Multiple DataSources | [详情](#多数据源) |

### 2. 事务管理

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| 事务 | Transaction | [详情](#事务) |
| 事务管理器 | Transaction Manager | [详情](#事务管理器) |
| 传播行为 | Propagation Behavior | [详情](#传播行为) |
| 隔离级别 | Isolation Level | [详情](#隔离级别) |
| 声明式事务 | Declarative Transaction | [详情](#声明式事务) |
| 编程式事务 | Programmatic Transaction | [详情](#编程式事务) |

### 3. ORM

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| JPA | Java Persistence API | [详情](#jpa) |
| Hibernate | ORM框架 | [详情](#hibernate) |
| Spring Data JPA | JPA扩展 | [详情](#spring-data-jpa) |
| Repository | 仓库模式 | [详情](#repository) |
| 实体 | Entity | [详情](#实体) |
| 延迟加载 | Lazy Loading | [详情](#延迟加载) |

---

## 六、安全概念

### 1. 认证与授权

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| 认证 | Authentication | [详情](#认证) |
| 授权 | Authorization | [详情](#授权) |
| Principal | 主体 | [详情](#principal) |
| GrantedAuthority | 授权权限 | [详情](#grantedauthority) |
| 角色 | Role | [详情](#角色) |

### 2. Spring Security

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| SecurityFilterChain | 安全过滤器链 | [详情](#securityfilterchain) |
| UserDetailsService | 用户详情服务 | [详情](#userdetailsservice) |
| PasswordEncoder | 密码编码器 | [详情](#passwordencoder) |
| CSRF | Cross-Site Request Forgery | [详情](#csrf) |
| CORS | Cross-Origin Resource Sharing | [详情](#cors) |

### 3. OAuth2

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| OAuth2 | 开放授权协议 | [详情](#oauth2) |
| JWT | JSON Web Token | [详情](#jwt) |
| 资源服务器 | Resource Server | [详情](#资源服务器) |
| 授权服务器 | Authorization Server | [详情](#授权服务器) |

---

## 七、微服务概念

### 1. 服务治理

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| 服务发现 | Service Discovery | [详情](#服务发现) |
| 服务注册 | Service Registration | [详情](#服务注册) |
| 负载均衡 | Load Balancing | [详情](#负载均衡) |
| 熔断 | Circuit Breaker | [详情](#熔断) |
| 限流 | Rate Limiting | [详情](#限流) |
| 降级 | Degradation | [详情](#降级) |

### 2. 分布式系统

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| CAP定理 | CAP Theorem | [详情](#cap定理) |
| BASE理论 | BASE Theory | [详情](#base理论) |
| 分布式事务 | Distributed Transaction | [详情](#分布式事务) |
| 分布式锁 | Distributed Lock | [详情](#分布式锁) |
| 分布式ID | Distributed ID | [详情](#分布式id) |
| 分布式缓存 | Distributed Cache | [详情](#分布式缓存) |

### 3. Spring Cloud

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| Eureka | 服务注册中心 | [详情](#eureka) |
| Nacos | 服务注册与配置中心 | [详情](#nacos) |
| Ribbon | 客户端负载均衡 | [详情](#ribbon) |
| Feign | 声明式HTTP客户端 | [详情](#feign) |
| Hystrix/Sentinel | 熔断器 | [详情](#熔断器) |
| Gateway | API网关 | [详情](#gateway) |
| Config | 配置中心 | [详情](#config) |

---

## 八、性能与监控概念

### 1. 性能优化

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| 启动优化 | Startup Optimization | [详情](#启动优化) |
| 内存优化 | Memory Optimization | [详情](#内存优化) |
| 连接池调优 | Connection Pool Tuning | [详情](#连接池调优) |
| 缓存策略 | Caching Strategy | [详情](#缓存策略) |

### 2. 监控运维

| 概念 | 说明 | 详细文档 |
|------|------|----------|
| Actuator | 监控端点 | [详情](#actuator) |
| Metrics | 指标监控 | [详情](#metrics) |
| Health Check | 健康检查 | [详情](#health-check) |
| Tracing | 链路追踪 | [详情](#tracing) |

---

## 九、概念详解

### 约定优于配置 {#约定优于配置}

**定义**: 一种软件设计范式，旨在减少开发者需要做出的决策数量。

**核心思想**:
- 提供合理的默认值
- 只在需要时才进行配置
- 遵循既定的项目结构

**Spring Boot中的体现**:
- 默认端口号8080
- 默认配置文件application.yml
- 默认包扫描路径
- 自动配置类

---

### 自动配置 {#自动配置}

**定义**: 根据类路径下的依赖自动配置Spring应用。

**工作原理**:
1. 启动时扫描META-INF/spring.factories
2. 加载所有EnableAutoConfiguration配置类
3. 根据条件注解判断是否生效
4. 注册符合条件的Bean

**核心注解**:
```java
@SpringBootApplication
@EnableAutoConfiguration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
```

---

### IoC容器 {#ioc容器}

**定义**: 控制反转容器，负责对象的创建、配置和生命周期管理。

**核心职责**:
- Bean的实例化
- 依赖注入
- 生命周期管理
- 作用域管理

**容器层次**:
```
BeanFactory (基础容器)
    └── ApplicationContext (高级容器)
            ├── ClassPathXmlApplicationContext
            ├── AnnotationConfigApplicationContext
            └── SpringApplication
```

---

### Bean {#bean}

**定义**: 由Spring IoC容器管理的对象。

**生命周期阶段**:
1. 实例化 (Instantiation)
2. 属性赋值 (Populate Properties)
3. 初始化前 (BeanPostProcessor.postProcessBeforeInitialization)
4. 初始化 (InitializingBean.afterPropertiesSet, @PostConstruct)
5. 初始化后 (BeanPostProcessor.postProcessAfterInitialization)
6. 使用 (In Use)
7. 销毁前 (Destruction)
8. 销毁 (DisposableBean.destroy, @PreDestroy)

---

### 依赖注入 {#依赖注入}

**定义**: 对象的依赖关系由外部容器在运行时注入。

**注入方式对比**:

| 方式 | 优点 | 缺点 |
|------|------|------|
| 构造器注入 | 不可变、易测试、强制依赖 | 构造器参数多时繁琐 |
| Setter注入 | 可选依赖、灵活 | 可能导致不完整状态 |
| 字段注入 | 简洁 | 难以测试、隐藏依赖 |

**推荐**: 优先使用构造器注入

---

### 事务 {#事务}

**定义**: 一组操作的逻辑单元，要么全部成功，要么全部失败。

**ACID特性**:
- Atomicity (原子性)
- Consistency (一致性)
- Isolation (隔离性)
- Durability (持久性)

**Spring事务抽象**:
```java
@Transactional(
    propagation = Propagation.REQUIRED,
    isolation = Isolation.READ_COMMITTED,
    timeout = 30,
    readOnly = false,
    rollbackFor = Exception.class
)
```

---

### 传播行为 {#传播行为}

**定义**: 事务方法被另一个事务方法调用时，事务如何传播。

| 传播行为 | 说明 |
|----------|------|
| REQUIRED | 有事务则加入，无则新建（默认） |
| REQUIRES_NEW | 总是新建事务，挂起当前事务 |
| SUPPORTS | 有事务则加入，无则非事务执行 |
| NOT_SUPPORTED | 非事务执行，挂起当前事务 |
| MANDATORY | 必须在事务中执行，否则抛异常 |
| NEVER | 非事务执行，有事务则抛异常 |
| NESTED | 嵌套事务（保存点） |

---

### AOP {#aop}

**定义**: 面向切面编程，将横切关注点模块化。

**核心概念**:
- **切面(Aspect)**: 横切关注点的模块化
- **切入点(Pointcut)**: 在哪里执行通知
- **通知(Advice)**: 在切入点执行的动作
- **连接点(Join Point)**: 程序执行的特定点
- **织入(Weaving)**: 将切面应用到目标对象

**通知类型**:
```java
@Before     // 前置通知
@After      // 后置通知
@AfterReturning  // 返回通知
@AfterThrowing   // 异常通知
@Around     // 环绕通知
```

---

### REST {#rest}

**定义**: 表述性状态转移，一种架构风格。

**核心约束**:
1. 客户端-服务器分离
2. 无状态
3. 可缓存
4. 统一接口
5. 分层系统
6. 按需代码（可选）
7. HATEOAS（可选）

**HTTP方法语义**:
| 方法 | 语义 | 幂等性 |
|------|------|--------|
| GET | 获取资源 | 是 |
| POST | 创建资源 | 否 |
| PUT | 更新资源（全量） | 是 |
| PATCH | 更新资源（部分） | 否 |
| DELETE | 删除资源 | 是 |

---

### CAP定理 {#cap定理}

**定义**: 分布式系统最多只能同时满足三项中的两项。

**三项特性**:
- **Consistency (一致性)**: 所有节点同时看到相同的数据
- **Availability (可用性)**: 每个请求都能得到响应
- **Partition Tolerance (分区容错)**: 系统在网络分区时仍能运行

**权衡选择**:
- CP: ZooKeeper, HBase
- AP: Cassandra, DynamoDB
- CA: 单机数据库（不存在于分布式系统）

---

### 分布式事务 {#分布式事务}

**定义**: 跨越多个服务或数据库的事务。

**解决方案**:

| 方案 | 说明 | 适用场景 |
|------|------|----------|
| 2PC | 两阶段提交 | 强一致性要求 |
| TCC | Try-Confirm-Cancel | 高性能要求 |
| Saga | 长事务编排 | 复杂业务流程 |
| 本地消息表 | 最终一致性 | 异步场景 |
| 事务消息 | RocketMQ事务消息 | 高可靠场景 |

---

### 服务发现 {#服务发现}

**定义**: 服务实例自动注册和发现的机制。

**工作流程**:
1. 服务启动时向注册中心注册
2. 注册中心维护服务实例列表
3. 消费者从注册中心获取服务列表
4. 消费者调用服务实例
5. 服务下线时注销

**常见实现**:
- Eureka
- Nacos
- Consul
- ZooKeeper

---

### 熔断 {#熔断}

**定义**: 当服务不可用时，快速失败，防止级联故障。

**状态机**:
```
Closed (关闭) → Open (打开) → Half-Open (半开)
     ↑                                    ↓
     └────────────────────────────────────┘
```

**状态说明**:
- **Closed**: 正常状态，请求正常通过
- **Open**: 熔断状态，请求直接失败
- **Half-Open**: 探测状态，允许部分请求通过测试

**实现方案**:
- Hystrix (已停止维护)
- Resilience4j
- Sentinel

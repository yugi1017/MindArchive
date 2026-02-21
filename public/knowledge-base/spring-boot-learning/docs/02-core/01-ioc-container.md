# IoC容器架构设计

> 理解IoC容器是掌握Spring架构的核心

---

## 一、IoC容器概述

### 1.1 什么是IoC

**IoC (Inversion of Control)**: 控制反转

- 传统方式: 对象自己创建和管理依赖
- IoC方式: 对象的创建和依赖管理交给容器

### 1.2 IoC容器的职责

```
┌─────────────────────────────────────────────────────────────┐
│                      IoC容器职责                             │
├─────────────────────────────────────────────────────────────┤
│  1. Bean的实例化                                             │
│     - 根据BeanDefinition创建Bean实例                         │
│                                                              │
│  2. 依赖注入                                                 │
│     - 解析依赖关系并注入                                      │
│                                                              │
│  3. 生命周期管理                                             │
│     - 初始化回调                                             │
│     - 销毁回调                                               │
│                                                              │
│  4. 作用域管理                                               │
│     - singleton, prototype, request, session等               │
│                                                              │
│  5. AOP支持                                                  │
│     - 代理创建                                               │
│     - 切面织入                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、容器体系结构

### 2.1 核心接口层次

```
BeanFactory (基础容器接口)
    │
    ├── ListableBeanFactory (可列举Bean)
    │       └── 提供获取所有Bean的能力
    │
    ├── HierarchicalBeanFactory (层级容器)
    │       └── 支持父子容器
    │
    ├── AutowireCapableBeanFactory (自动装配)
    │       └── 提供自动装配能力
    │
    └── ConfigurableBeanFactory (可配置)
            └── 提供配置能力

ApplicationContext (高级容器接口)
    │
    ├── MessageSource (国际化)
    │
    ├── ApplicationEventPublisher (事件发布)
    │
    ├── ResourcePatternResolver (资源加载)
    │
    └── EnvironmentCapable (环境访问)
```

### 2.2 BeanFactory vs ApplicationContext

| 特性 | BeanFactory | ApplicationContext |
|------|-------------|---------------------|
| Bean实例化 | 延迟初始化 | 预初始化(默认) |
| 国际化 | 不支持 | 支持 |
| 事件机制 | 不支持 | 支持 |
| 资源加载 | 基础支持 | 增强支持 |
| AOP支持 | 需手动配置 | 自动支持 |
| 使用场景 | 资源受限环境 | 企业级应用 |

### 2.3 常用ApplicationContext实现

| 实现类 | 用途 |
|--------|------|
| AnnotationConfigApplicationContext | 基于注解配置 |
| ClassPathXmlApplicationContext | 基于XML配置(类路径) |
| FileSystemXmlApplicationContext | 基于XML配置(文件系统) |
| AnnotationConfigServletWebServerApplicationContext | Spring Boot Web应用 |
| AnnotationConfigReactiveWebServerApplicationContext | Spring Boot Reactive应用 |

---

## 三、BeanDefinition

### 3.1 什么是BeanDefinition

BeanDefinition是Bean的元数据定义，描述了如何创建一个Bean。

### 3.2 BeanDefinition属性

```java
public interface BeanDefinition {
    String SCOPE_SINGLETON = "singleton";
    String SCOPE_PROTOTYPE = "prototype";
    
    String getBeanClassName();
    void setBeanClassName(String beanClassName);
    
    String getScope();
    void setScope(String scope);
    
    boolean isLazyInit();
    void setLazyInit(boolean lazyInit);
    
    String[] getDependsOn();
    void setDependsOn(String... dependsOn);
    
    boolean isPrimary();
    void setPrimary(boolean primary);
    
    String getInitMethodName();
    void setInitMethodName(String initMethodName);
    
    String getDestroyMethodName();
    void setDestroyMethodName(String destroyMethodName);
}
```

### 3.3 BeanDefinition来源

```
┌─────────────────────────────────────────────────────────────┐
│                    BeanDefinition来源                        │
├─────────────────────────────────────────────────────────────┤
│  1. @Component/@Service/@Repository/@Controller             │
│     → ComponentScan扫描注册                                  │
│                                                              │
│  2. @Bean方法                                                │
│     → ConfigurationClassPostProcessor处理                    │
│                                                              │
│  3. @Import                                                  │
│     → 导入配置类或ImportSelector                             │
│                                                              │
│  4. XML配置                                                  │
│     → XmlBeanDefinitionReader解析                           │
│                                                              │
│  5. 编程式注册                                               │
│     → GenericBeanDefinition/AnnotatedGenericBeanDefinition  │
└─────────────────────────────────────────────────────────────┘
```

### 3.4 编程式注册BeanDefinition

```java
@Configuration
public class BeanDefinitionConfig {
    
    @Bean
    public static BeanDefinitionRegistryPostProcessor beanDefinitionRegistryPostProcessor() {
        return new BeanDefinitionRegistryPostProcessor() {
            @Override
            public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) {
                GenericBeanDefinition definition = new GenericBeanDefinition();
                definition.setBeanClass(MyService.class);
                definition.setScope(BeanDefinition.SCOPE_SINGLETON);
                definition.setInitMethodName("init");
                registry.registerBeanDefinition("myService", definition);
            }
            
            @Override
            public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) {
            }
        };
    }
}
```

---

## 四、Bean生命周期

### 4.1 完整生命周期

```
┌─────────────────────────────────────────────────────────────┐
│                    Bean生命周期                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 实例化 (Instantiation)                                   │
│     ├── 推断构造方法                                         │
│     ├── 实例化Bean                                          │
│     └── MergedBeanDefinitionPostProcessor处理               │
│                                                              │
│  2. 属性赋值 (Populate Properties)                           │
│     ├── InstantiationAwareBeanPostProcessor.postProcessAfterInstantiation │
│     ├── 处理@Autowired/@Value                               │
│     └── InstantiationAwareBeanPostProcessor.postProcessProperties │
│                                                              │
│  3. 初始化 (Initialization)                                  │
│     ├── Aware接口回调                                        │
│     │   ├── BeanNameAware.setBeanName                       │
│     │   ├── BeanClassLoaderAware.setBeanClassLoader         │
│     │   └── BeanFactoryAware.setBeanFactory                 │
│     │                                                        │
│     ├── BeanPostProcessor.postProcessBeforeInitialization   │
│     │   └── @PostConstruct                                  │
│     │                                                        │
│     ├── InitializingBean.afterPropertiesSet                 │
│     │                                                        │
│     ├── 自定义init-method                                    │
│     │                                                        │
│     └── BeanPostProcessor.postProcessAfterInitialization    │
│         └── AOP代理创建                                      │
│                                                              │
│  4. 使用 (In Use)                                            │
│     └── Bean正常使用                                         │
│                                                              │
│  5. 销毁 (Destruction)                                       │
│     ├── DestructionAwareBeanPostProcessor.postProcessBeforeDestruction │
│     │   └── @PreDestroy                                     │
│     │                                                        │
│     ├── DisposableBean.destroy                              │
│     │                                                        │
│     └── 自定义destroy-method                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 生命周期代码示例

```java
@Component
public class MyBean implements BeanNameAware, BeanFactoryAware, 
        InitializingBean, DisposableBean {
    
    private String beanName;
    private BeanFactory beanFactory;
    
    @Override
    public void setBeanName(String name) {
        this.beanName = name;
        System.out.println("1. BeanNameAware.setBeanName: " + name);
    }
    
    @Override
    public void setBeanFactory(BeanFactory beanFactory) {
        this.beanFactory = beanFactory;
        System.out.println("2. BeanFactoryAware.setBeanFactory");
    }
    
    @PostConstruct
    public void postConstruct() {
        System.out.println("3. @PostConstruct");
    }
    
    @Override
    public void afterPropertiesSet() {
        System.out.println("4. InitializingBean.afterPropertiesSet");
    }
    
    public void customInit() {
        System.out.println("5. custom init-method");
    }
    
    @PreDestroy
    public void preDestroy() {
        System.out.println("6. @PreDestroy");
    }
    
    @Override
    public void destroy() {
        System.out.println("7. DisposableBean.destroy");
    }
    
    public void customDestroy() {
        System.out.println("8. custom destroy-method");
    }
}
```

### 4.3 BeanPostProcessor

```java
@Component
public class MyBeanPostProcessor implements BeanPostProcessor {
    
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        System.out.println("Before initialization: " + beanName);
        return bean;
    }
    
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        System.out.println("After initialization: " + beanName);
        return bean;
    }
}
```

---

## 五、Bean作用域

### 5.1 内置作用域

| 作用域 | 说明 | 生命周期 |
|--------|------|----------|
| singleton | 单例(默认) | 容器生命周期 |
| prototype | 原型 | 每次获取创建新实例 |
| request | 请求 | HTTP请求生命周期 |
| session | 会话 | HTTP会话生命周期 |
| application | 应用 | ServletContext生命周期 |
| websocket | WebSocket | WebSocket生命周期 |

### 5.2 作用域配置

```java
@Component
@Scope("prototype")
public class PrototypeBean {
}

@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestScopedBean {
}
```

### 5.3 自定义作用域

```java
public class MyScope implements Scope {
    
    private final Map<String, Object> objects = new ConcurrentHashMap<>();
    
    @Override
    public Object get(String name, ObjectFactory<?> objectFactory) {
        return objects.computeIfAbsent(name, k -> objectFactory.getObject());
    }
    
    @Override
    public Object remove(String name) {
        return objects.remove(name);
    }
    
    @Override
    public void registerDestructionCallback(String name, Runnable callback) {
    }
    
    @Override
    public Object resolveContextualObject(String key) {
        return null;
    }
    
    @Override
    public String getConversationId() {
        return null;
    }
}

@Configuration
public class ScopeConfig {
    
    @Bean
    public static CustomScopeConfigurer customScopeConfigurer() {
        CustomScopeConfigurer configurer = new CustomScopeConfigurer();
        configurer.addScope("myScope", new MyScope());
        return configurer;
    }
}
```

---

## 六、依赖注入机制

### 6.1 注入方式

#### 构造器注入（推荐）

```java
@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
}
```

**优点**:
- 不可变对象
- 依赖明确
- 易于测试
- 强制依赖

#### Setter注入

```java
@Service
public class UserService {
    private UserRepository userRepository;
    private EmailService emailService;
    
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }
}
```

**优点**:
- 可选依赖
- 灵活配置

#### 字段注入（不推荐）

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;
}
```

**缺点**:
- 难以测试
- 隐藏依赖
- 无法创建不可变对象

### 6.2 自动装配策略

| 模式 | 说明 |
|------|------|
| no | 不自动装配(默认) |
| byName | 按名称装配 |
| byType | 按类型装配 |
| constructor | 构造器自动装配 |

### 6.3 @Autowired工作原理

```
@Autowired注入流程:
┌─────────────────────────────────────────────────────────────┐
│  1. 查找依赖类型                                             │
│     ├── 字段类型                                            │
│     ├── 方法参数类型                                        │
│     └── 构造器参数类型                                       │
├─────────────────────────────────────────────────────────────┤
│  2. 按类型查找候选Bean                                       │
│     └── beanFactory.getBeanNamesForType(requiredType)       │
├─────────────────────────────────────────────────────────────┤
│  3. 候选Bean数量判断                                         │
│     ├── 0个: required=true则抛异常, false则返回null         │
│     ├── 1个: 直接使用                                       │
│     └── 多个: 需要进一步筛选                                 │
├─────────────────────────────────────────────────────────────┤
│  4. 多候选Bean筛选                                           │
│     ├── @Primary标记的Bean                                  │
│     ├── @Priority标记的Bean                                 │
│     ├── @Qualifier指定的Bean                                │
│     └── 按名称匹配                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 七、循环依赖处理

### 7.1 什么是循环依赖

```java
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;
}

@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA;
}
```

### 7.2 Spring处理方式

```
单例Bean循环依赖处理:
┌─────────────────────────────────────────────────────────────┐
│  1. 创建ServiceA实例                                         │
│     └── 暴露早期引用到singletonFactories                     │
├─────────────────────────────────────────────────────────────┤
│  2. 注入ServiceB                                             │
│     └── 发现ServiceB未创建，开始创建                         │
├─────────────────────────────────────────────────────────────┤
│  3. 创建ServiceB实例                                         │
│     └── 暴露早期引用到singletonFactories                     │
├─────────────────────────────────────────────────────────────┤
│  4. 注入ServiceA                                             │
│     └── 从singletonFactories获取ServiceA早期引用             │
├─────────────────────────────────────────────────────────────┤
│  5. ServiceB创建完成                                         │
├─────────────────────────────────────────────────────────────┤
│  6. ServiceA注入ServiceB完成                                 │
├─────────────────────────────────────────────────────────────┤
│  7. ServiceA创建完成                                         │
└─────────────────────────────────────────────────────────────┘
```

### 7.3 三级缓存

```java
public class DefaultSingletonBeanRegistry {
    
    private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);
    
    private final Map<String, Object> earlySingletonObjects = new ConcurrentHashMap<>(16);
    
    private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<>(16);
}
```

| 缓存 | 说明 |
|------|------|
| singletonObjects | 完整的单例Bean |
| earlySingletonObjects | 早期暴露的Bean引用 |
| singletonFactories | Bean工厂(用于创建早期引用) |

### 7.4 无法解决的循环依赖

```java
@Service
@Scope("prototype")
public class ServiceA {
    @Autowired
    private ServiceB serviceB;
}

@Service
@Scope("prototype")
public class ServiceB {
    @Autowired
    private ServiceA serviceA;
}
```

**解决方案**:
1. 使用@Lazy延迟加载
2. 重构设计消除循环依赖
3. 使用Setter注入替代构造器注入

---

## 八、容器扩展点

### 8.1 BeanFactoryPostProcessor

```java
@Component
public class MyBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
    
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) {
        BeanDefinition definition = beanFactory.getBeanDefinition("myService");
        definition.getPropertyValues().add("timeout", "5000");
    }
}
```

### 8.2 BeanDefinitionRegistryPostProcessor

```java
@Component
public class MyBeanDefinitionRegistryPostProcessor implements BeanDefinitionRegistryPostProcessor {
    
    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) {
        GenericBeanDefinition definition = new GenericBeanDefinition();
        definition.setBeanClass(MyDynamicService.class);
        registry.registerBeanDefinition("myDynamicService", definition);
    }
    
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) {
    }
}
```

### 8.3 Aware接口

| 接口 | 作用 |
|------|------|
| BeanNameAware | 获取Bean名称 |
| BeanFactoryAware | 获取BeanFactory |
| ApplicationContextAware | 获取ApplicationContext |
| EnvironmentAware | 获取Environment |
| ResourceLoaderAware | 获取ResourceLoader |
| ApplicationEventPublisherAware | 获取事件发布器 |
| MessageSourceAware | 获取消息源 |

---

## 九、总结

### 核心概念

1. **IoC容器**: 管理Bean的创建和依赖
2. **BeanDefinition**: Bean的元数据定义
3. **生命周期**: Bean从创建到销毁的完整过程
4. **作用域**: Bean的可见范围和生命周期
5. **依赖注入**: 自动装配依赖关系

### 最佳实践

1. 优先使用构造器注入
2. 避免循环依赖
3. 合理使用BeanPostProcessor扩展
4. 理解三级缓存机制
5. 选择合适的作用域

---

## 十、问题思考

> 完成本章学习后，请思考以下问题以检验学习效果

### 基础概念理解

1. **BeanFactory和ApplicationContext有什么区别？在Spring Boot中默认使用的是哪个？**
   - 提示：从功能特性和使用场景角度分析

2. **Bean的生命周期包含哪些阶段？@PostConstruct和InitializingBean的执行顺序是怎样的？**
   - 提示：画出完整的生命周期流程图

3. **Spring支持哪些Bean作用域？singleton作用域的Bean是否线程安全？**
   - 提示：思考Bean的状态管理

### 代码实践应用

4. **构造器注入、Setter注入和字段注入各有什么优缺点？为什么推荐构造器注入？**
   - 提示：从不可变性、测试性、依赖明确性角度分析

5. **如何解决循环依赖问题？Spring的三级缓存是如何工作的？**
   - 提示：分析为什么构造器注入无法解决循环依赖

### 综合分析

6. **BeanPostProcessor的作用是什么？它和BeanFactoryPostProcessor有什么区别？**
   - 提示：从执行时机和功能角度分析

7. **如何实现一个自定义的BeanPostProcessor？请举例说明其应用场景。**
   - 提示：如日志记录、性能监控、代理创建等

---

> **下一章预告**: [AOP面向切面编程](./02-aop-architecture.md) - 理解切面编程原理与代理机制

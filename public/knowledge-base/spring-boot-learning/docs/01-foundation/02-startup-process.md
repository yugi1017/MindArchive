# Spring Boot 启动流程深度解析

> 理解启动流程是掌握Spring Boot架构的关键

---

## 一、启动入口

### 1.1 典型启动类

```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### 1.2 启动流程概览

```
main() 方法
    │
    ▼
SpringApplication.run()
    │
    ├── 1. 创建SpringApplication对象
    │   ├── 推断应用类型
    │   ├── 加载初始化器(Initializer)
    │   └── 加载监听器(Listener)
    │
    └── 2. 执行run()方法
        ├── 准备环境
        ├── 打印Banner
        ├── 创建ApplicationContext
        ├── 准备上下文
        ├── 刷新上下文
        └── 执行Runner
```

---

## 二、SpringApplication构造过程

### 2.1 构造方法

```java
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
    this.resourceLoader = resourceLoader;
    Assert.notNull(primarySources, "PrimarySources must not be null");
    this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
    
    // 1. 推断应用类型
    this.webApplicationType = WebApplicationType.deduceFromClasspath();
    
    // 2. 加载初始化器
    setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));
    
    // 3. 加载监听器
    setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
    
    // 4. 推断主类
    this.mainApplicationClass = deduceMainApplicationClass();
}
```

### 2.2 应用类型推断

```java
static WebApplicationType deduceFromClasspath() {
    if (ClassUtils.isPresent(WEBFLUX_INDICATOR_CLASS, null) 
        && !ClassUtils.isPresent(WEBMVC_INDICATOR_CLASS, null)
        && !ClassUtils.isPresent(JERSEY_INDICATOR_CLASS, null)) {
        return WebApplicationType.REACTIVE;
    }
    for (String className : SERVLET_INDICATOR_CLASSES) {
        if (!ClassUtils.isPresent(className, null)) {
            return WebApplicationType.NONE;
        }
    }
    return WebApplicationType.SERVLET;
}
```

**应用类型**:

| 类型 | 条件 |
|------|------|
| SERVLET | 存在Servlet相关类 |
| REACTIVE | 存在WebFlux相关类 |
| NONE | 非Web应用 |

### 2.3 加载Spring Factories

```java
private <T> Collection<T> getSpringFactoriesInstances(Class<T> type) {
    return getSpringFactoriesInstances(type, new Class<?>[] {});
}

private <T> Collection<T> getSpringFactoriesInstances(Class<T> type, Class<?>[] parameterTypes, Object... args) {
    ClassLoader classLoader = getClassLoader();
    Set<String> names = new LinkedHashSet<>(SpringFactoriesLoader.loadFactoryNames(type, classLoader));
    List<T> instances = createSpringFactoriesInstances(type, parameterTypes, classLoader, args, names);
    AnnotationAwareOrderComparator.sort(instances);
    return instances;
}
```

**加载位置**: META-INF/spring.factories

---

## 三、run()方法执行流程

### 3.1 核心流程

```java
public ConfigurableApplicationContext run(String... args) {
    StopWatch stopWatch = new StopWatch();
    stopWatch.start();
    
    DefaultBootstrapContext bootstrapContext = createBootstrapContext();
    ConfigurableApplicationContext context = null;
    
    // 1. 配置Headless模式
    configureHeadlessProperty();
    
    // 2. 获取SpringApplicationRunListeners
    SpringApplicationRunListeners listeners = getRunListeners(args);
    
    // 3. 发布starting事件
    listeners.starting(bootstrapContext, this.mainApplicationClass);
    
    try {
        // 4. 封装命令行参数
        ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);
        
        // 5. 准备环境
        ConfigurableEnvironment environment = prepareEnvironment(listeners, bootstrapContext, applicationArguments);
        
        // 6. 配置忽略Bean信息
        configureIgnoreBeanInfo(environment);
        
        // 7. 打印Banner
        Banner printedBanner = printBanner(environment);
        
        // 8. 创建ApplicationContext
        context = createApplicationContext();
        
        // 9. 准备上下文
        prepareContext(bootstrapContext, context, environment, listeners, applicationArguments, printedBanner);
        
        // 10. 刷新上下文
        refreshContext(context);
        
        // 11. 刷新后处理
        afterRefresh(context, applicationArguments);
        
        stopWatch.stop();
        
        // 12. 发布started事件
        listeners.started(context, this.mainApplicationClass, stopWatch.getTotalTimeMillis());
        
        // 13. 执行Runner
        callRunners(context, applicationArguments);
    }
    catch (Throwable ex) {
        handleRunFailure(context, ex, listeners);
        throw new IllegalStateException(ex);
    }
    
    try {
        // 14. 发布ready事件
        listeners.ready(context, this.mainApplicationClass);
    }
    catch (Throwable ex) {
        handleRunFailure(context, ex, null);
        throw new IllegalStateException(ex);
    }
    
    return context;
}
```

### 3.2 流程详解

#### 步骤1: 配置Headless模式

```java
private void configureHeadlessProperty() {
    System.setProperty(SYSTEM_PROPERTY_JAVA_AWT_HEADLESS, 
        System.getProperty(SYSTEM_PROPERTY_JAVA_AWT_HEADLESS, Boolean.toString(this.headless)));
}
```

#### 步骤2: 获取RunListeners

```java
private SpringApplicationRunListeners getRunListeners(String[] args) {
    Class<?>[] types = new Class<?>[] { SpringApplication.class, String[].class };
    return new SpringApplicationRunListeners(logger,
        getSpringFactoriesInstances(SpringApplicationRunListener.class, types, this, args));
}
```

**默认实现**: EventPublishingRunListener

#### 步骤3-5: 准备环境

```java
private ConfigurableEnvironment prepareEnvironment(
        SpringApplicationRunListeners listeners,
        DefaultBootstrapContext bootstrapContext,
        ApplicationArguments applicationArguments) {
    
    // 创建环境对象
    ConfigurableEnvironment environment = getOrCreateEnvironment();
    
    // 配置环境
    configureEnvironment(environment, applicationArguments.getSourceArgs());
    
    // 添加ConfigurationProperties检查
    ConfigurationPropertySources.attach(environment);
    
    // 发布environmentPrepared事件
    listeners.environmentPrepared(bootstrapContext, environment);
    
    // 绑定环境到SpringApplication
    DefaultPropertiesPropertySource.moveToEnd(environment);
    
    return environment;
}
```

#### 步骤7: 打印Banner

```java
private Banner printBanner(ConfigurableEnvironment environment) {
    if (this.bannerMode == Banner.Mode.OFF) {
        return null;
    }
    ResourceLoader resourceLoader = (this.resourceLoader != null) ? this.resourceLoader : 
        new DefaultResourceLoader(null);
    SpringApplicationBannerPrinter bannerPrinter = new SpringApplicationBannerPrinter(
        resourceLoader, this.banner);
    if (this.bannerMode == Mode.LOG) {
        return bannerPrinter.print(environment, this.mainApplicationClass, logger);
    }
    return bannerPrinter.print(environment, this.mainApplicationClass, System.out);
}
```

#### 步骤8: 创建ApplicationContext

```java
protected ConfigurableApplicationContext createApplicationContext() {
    return this.applicationContextFactory.create(this.webApplicationType);
}
```

**不同类型创建不同上下文**:

| 应用类型 | 上下文类型 |
|----------|------------|
| SERVLET | AnnotationConfigServletWebServerApplicationContext |
| REACTIVE | AnnotationConfigReactiveWebServerApplicationContext |
| NONE | AnnotationConfigApplicationContext |

#### 步骤9: 准备上下文

```java
private void prepareContext(
        DefaultBootstrapContext bootstrapContext,
        ConfigurableApplicationContext context,
        ConfigurableEnvironment environment,
        SpringApplicationRunListeners listeners,
        ApplicationArguments applicationArguments,
        Banner printedBanner) {
    
    // 设置环境
    context.setEnvironment(environment);
    
    // 后置处理上下文
    postProcessApplicationContext(context);
    
    // 执行初始化器
    applyInitializers(context);
    
    // 发布contextPrepared事件
    listeners.contextPrepared(context);
    
    // 注册单例Bean
    context.getBeanFactory().registerSingleton("springApplicationArguments", applicationArguments);
    if (printedBanner != null) {
        context.getBeanFactory().registerSingleton("springBootBanner", printedBanner);
    }
    
    // 加载主配置类
    Set<Object> sources = getAllSources();
    Assert.notEmpty(sources, "Sources must not be empty");
    load(context, sources.toArray(new Object[0]));
    
    // 发布contextLoaded事件
    listeners.contextLoaded(context);
}
```

#### 步骤10: 刷新上下文

```java
private void refreshContext(ConfigurableApplicationContext context) {
    if (this.registerShutdownHook) {
        shutdownHook.registerApplicationContext(context);
    }
    refresh(context);
}

protected void refresh(ConfigurableApplicationContext applicationContext) {
    applicationContext.refresh();
}
```

---

## 四、事件机制

### 4.1 启动事件序列

```
ApplicationStartingEvent
    ↓
ApplicationEnvironmentPreparedEvent
    ↓
ApplicationContextInitializedEvent
    ↓
ApplicationPreparedEvent
    ↓
ApplicationStartedEvent
    ↓
ApplicationReadyEvent
```

### 4.2 自定义监听器

```java
@Component
public class MyApplicationListener implements ApplicationListener<ApplicationStartedEvent> {
    
    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        System.out.println("Application started!");
    }
}
```

### 4.3 注册监听器

**方式1: spring.factories**

```properties
org.springframework.context.ApplicationListener=\
com.example.MyApplicationListener
```

**方式2: 代码注册**

```java
SpringApplication app = new SpringApplication(DemoApplication.class);
app.addListeners(new MyApplicationListener());
app.run(args);
```

---

## 五、ApplicationContextInitializer

### 5.1 作用

在ApplicationContext刷新之前进行自定义初始化。

### 5.2 自定义初始化器

```java
public class MyInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        environment.addActiveProfile("dev");
    }
}
```

### 5.3 注册初始化器

**方式1: spring.factories**

```properties
org.springframework.context.ApplicationContextInitializer=\
com.example.MyInitializer
```

**方式2: 代码注册**

```java
SpringApplication app = new SpringApplication(DemoApplication.class);
app.addInitializers(new MyInitializer());
app.run(args);
```

---

## 六、CommandLineRunner与ApplicationRunner

### 6.1 作用

应用启动完成后执行特定逻辑。

### 6.2 CommandLineRunner

```java
@Component
@Order(1)
public class MyCommandLineRunner implements CommandLineRunner {
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("CommandLineRunner executed with args: " + Arrays.toString(args));
    }
}
```

### 6.3 ApplicationRunner

```java
@Component
@Order(2)
public class MyApplicationRunner implements ApplicationRunner {
    
    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("ApplicationRunner executed");
        System.out.println("Non-option args: " + args.getNonOptionArgs());
        System.out.println("Option names: " + args.getOptionNames());
    }
}
```

### 6.4 执行顺序

1. 按@Order值升序执行
2. 同Order值，ApplicationRunner先于CommandLineRunner

---

## 七、启动流程图

```
┌─────────────────────────────────────────────────────────────────┐
│                        SpringApplication.run()                    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. configureHeadlessProperty()                                  │
│     配置Headless模式                                              │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. getRunListeners()                                            │
│     获取SpringApplicationRunListeners                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. listeners.starting()                                         │
│     发布ApplicationStartingEvent                                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. prepareEnvironment()                                         │
│     创建并配置Environment                                        │
│     发布ApplicationEnvironmentPreparedEvent                     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. printBanner()                                                │
│     打印Banner                                                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. createApplicationContext()                                   │
│     创建ApplicationContext                                       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  7. prepareContext()                                             │
│     设置环境、执行初始化器、加载主配置类                          │
│     发布ApplicationContextInitializedEvent                      │
│     发布ApplicationPreparedEvent                                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  8. refreshContext()                                             │
│     刷新ApplicationContext（核心）                               │
│     - 执行BeanFactoryPostProcessor                              │
│     - 注册BeanPostProcessor                                     │
│     - 初始化单例Bean                                             │
│     - 完成自动配置                                               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  9. afterRefresh()                                               │
│     刷新后处理                                                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  10. listeners.started()                                         │
│      发布ApplicationStartedEvent                                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  11. callRunners()                                               │
│      执行CommandLineRunner和ApplicationRunner                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  12. listeners.ready()                                           │
│      发布ApplicationReadyEvent                                  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    应用启动完成                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 八、调试技巧

### 8.1 启动日志分析

```bash
java -jar app.jar --debug
```

### 8.2 条件评估报告

```java
@RestController
public class ConditionController {
    
    @Autowired
    private ConditionEvaluationReport report;
    
    @GetMapping("/conditions")
    public ConditionEvaluationReport getConditions() {
        return report;
    }
}
```

### 8.3 启动时间分析

```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(DemoApplication.class);
        app.setBannerMode(Banner.Mode.OFF);
        long start = System.currentTimeMillis();
        app.run(args);
        long end = System.currentTimeMillis();
        System.out.println("Started in " + (end - start) + " ms");
    }
}
```

---

## 九、总结

### 核心要点

1. **SpringApplication构造**: 推断类型、加载初始化器和监听器
2. **run()方法**: 完整的启动生命周期
3. **事件机制**: 各阶段发布对应事件
4. **初始化器**: 上下文刷新前的扩展点
5. **Runner**: 启动完成后的执行点

### 扩展点

| 扩展点 | 作用 | 执行时机 |
|--------|------|----------|
| ApplicationContextInitializer | 初始化上下文 | 上下文刷新前 |
| ApplicationListener | 监听事件 | 各阶段 |
| BeanFactoryPostProcessor | 修改Bean定义 | 上下文刷新时 |
| BeanPostProcessor | 修改Bean实例 | Bean创建时 |
| CommandLineRunner | 执行启动逻辑 | 启动完成后 |
| ApplicationRunner | 执行启动逻辑 | 启动完成后 |

# AOP面向切面编程架构

> 理解AOP是掌握Spring企业级开发的关键

---

## 一、AOP概述

### 1.1 什么是AOP

**AOP (Aspect-Oriented Programming)**: 面向切面编程

- 将横切关注点模块化
- 分离业务逻辑与系统服务
- 提高代码可维护性

### 1.2 核心概念

| 概念 | 英文 | 说明 |
|------|------|------|
| 切面 | Aspect | 横切关注点的模块化 |
| 切入点 | Pointcut | 定义在哪些连接点执行通知 |
| 通知 | Advice | 在切入点执行的动作 |
| 连接点 | Join Point | 程序执行的特定点 |
| 目标对象 | Target Object | 被通知的对象 |
| 代理 | Proxy | AOP框架创建的对象 |
| 织入 | Weaving | 将切面应用到目标对象 |
| 引入 | Introduction | 为类添加新方法或属性 |

### 1.3 AOP架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        业务逻辑层                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Service A  │  │  Service B  │  │  Service C  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        切面层                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  日志切面    │  │  事务切面    │  │  安全切面    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、通知类型

### 2.1 五种通知类型

| 通知类型 | 注解 | 说明 |
|----------|------|------|
| 前置通知 | @Before | 方法执行前执行 |
| 后置通知 | @After | 方法执行后执行(无论成功或异常) |
| 返回通知 | @AfterReturning | 方法成功返回后执行 |
| 异常通知 | @AfterThrowing | 方法抛出异常后执行 |
| 环绕通知 | @Around | 包围方法执行 |

### 2.2 通知执行顺序

```
正常执行:
┌─────────────────────────────────────────────────────────────┐
│  @Around (前置部分)                                          │
│      ↓                                                       │
│  @Before                                                     │
│      ↓                                                       │
│  方法执行                                                     │
│      ↓                                                       │
│  @AfterReturning                                             │
│      ↓                                                       │
│  @After                                                      │
│      ↓                                                       │
│  @Around (后置部分)                                          │
└─────────────────────────────────────────────────────────────┘

异常执行:
┌─────────────────────────────────────────────────────────────┐
│  @Around (前置部分)                                          │
│      ↓                                                       │
│  @Before                                                     │
│      ↓                                                       │
│  方法执行(抛出异常)                                           │
│      ↓                                                       │
│  @AfterThrowing                                              │
│      ↓                                                       │
│  @After                                                      │
│      ↓                                                       │
│  @Around (捕获异常或重新抛出)                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 三、切入点表达式

### 3.1 execution表达式

**语法**: `execution(修饰符? 返回类型 包名.类名?方法名(参数) 异常?)`

```java
@Pointcut("execution(* com.example.service.*.*(..))")
public void serviceLayer() {}

@Pointcut("execution(public * *(..))")
public void anyPublicMethod() {}

@Pointcut("execution(* set*(..))")
public void anySetter() {}

@Pointcut("execution(* com.example..*Service.*(..))")
public void anyServiceMethod() {}

@Pointcut("execution(* *(String, ..))")
public void methodWithFirstStringParam() {}
```

### 3.2 通配符说明

| 通配符 | 说明 |
|--------|------|
| * | 匹配任意字符(单个) |
| .. | 匹配任意字符(多个)，用于包或参数 |
| + | 匹配指定类及其子类 |

### 3.3 其他切入点指示符

```java
@Pointcut("within(com.example.service..*)")
public void withinServicePackage() {}

@Pointcut("this(com.example.service.UserService)")
public void implementUserService() {}

@Pointcut("target(com.example.service.UserService)")
public void targetUserService() {}

@Pointcut("@annotation(com.example.annotation.Loggable)")
public void hasLoggableAnnotation() {}

@Pointcut("@within(org.springframework.stereotype.Service)")
public void withinServiceClass() {}

@Pointcut("args(String, Integer)")
public void argsMatch() {}

@Pointcut("bean(userService)")
public void beanNameMatch() {}
```

### 3.4 组合切入点

```java
@Pointcut("execution(* com.example.service.*.*(..)) && args(String)")
public void serviceMethodWithStringParam() {}

@Pointcut("execution(* com.example.service.*.*(..)) || execution(* com.example.dao.*.*(..))")
public void serviceOrDaoMethod() {}

@Pointcut("execution(* com.example.service.*.*(..)) && !@annotation(com.example.annotation.SkipLog)")
public void serviceMethodWithoutSkipLog() {}
```

---

## 四、切面实现

### 4.1 基于注解的切面

```java
@Aspect
@Component
@Slf4j
public class LoggingAspect {
    
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceLayer() {}
    
    @Before("serviceLayer()")
    public void logBefore(JoinPoint joinPoint) {
        log.info("Entering: {} with args: {}", 
            joinPoint.getSignature().toShortString(),
            Arrays.toString(joinPoint.getArgs()));
    }
    
    @AfterReturning(pointcut = "serviceLayer()", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        log.info("Exiting: {} with result: {}", 
            joinPoint.getSignature().toShortString(), result);
    }
    
    @AfterThrowing(pointcut = "serviceLayer()", throwing = "ex")
    public void logAfterThrowing(JoinPoint joinPoint, Exception ex) {
        log.error("Exception in {}: {}", 
            joinPoint.getSignature().toShortString(), ex.getMessage());
    }
    
    @Around("serviceLayer()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - start;
            log.info("Method {} executed in {} ms", 
                joinPoint.getSignature().toShortString(), duration);
            return result;
        } catch (Exception e) {
            log.error("Exception in method {}", joinPoint.getSignature().toShortString());
            throw e;
        }
    }
}
```

### 4.2 自定义注解切面

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Loggable {
    String value() default "";
}

@Aspect
@Component
public class LoggableAspect {
    
    @Around("@annotation(loggable)")
    public Object log(ProceedingJoinPoint joinPoint, Loggable loggable) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Executing: " + methodName + " - " + loggable.value());
        
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long duration = System.currentTimeMillis() - start;
        
        System.out.println("Completed: " + methodName + " in " + duration + "ms");
        return result;
    }
}

@Service
public class UserService {
    
    @Loggable("Find user by ID")
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

---

## 五、代理机制

### 5.1 JDK动态代理

```java
public class JdkProxy implements InvocationHandler {
    
    private final Object target;
    
    public JdkProxy(Object target) {
        this.target = target;
    }
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Before method: " + method.getName());
        Object result = method.invoke(target, args);
        System.out.println("After method: " + method.getName());
        return result;
    }
    
    public static <T> T createProxy(T target) {
        return (T) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            new JdkProxy(target)
        );
    }
}
```

### 5.2 CGLIB代理

```java
public class CglibProxy implements MethodInterceptor {
    
    private final Object target;
    
    public CglibProxy(Object target) {
        this.target = target;
    }
    
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("Before method: " + method.getName());
        Object result = method.invoke(target, args);
        System.out.println("After method: " + method.getName());
        return result;
    }
    
    public static <T> T createProxy(T target) {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(target.getClass());
        enhancer.setCallback(new CglibProxy(target));
        return (T) enhancer.create();
    }
}
```

### 5.3 代理选择策略

```
┌─────────────────────────────────────────────────────────────┐
│                    代理选择策略                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  目标类实现了接口?                                            │
│      │                                                       │
│      ├── 是 ── proxyTargetClass=true?                       │
│      │           │                                           │
│      │           ├── 是 ── CGLIB代理                         │
│      │           │                                           │
│      │           └── 否 ── JDK动态代理                       │
│      │                                                       │
│      └── 否 ── CGLIB代理                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.4 强制使用CGLIB

```java
@Configuration
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class AopConfig {
}
```

---

## 六、实际应用场景

### 6.1 日志记录

```java
@Aspect
@Component
@Slf4j
public class LoggingAspect {
    
    @Around("execution(* com.example..*Service.*(..))")
    public Object logMethod(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        
        log.info("[{}] Entering {}() with args: {}", className, methodName, args);
        
        try {
            Object result = joinPoint.proceed();
            log.info("[{}] Exiting {}() with result: {}", className, methodName, result);
            return result;
        } catch (Exception e) {
            log.error("[{}] Exception in {}(): {}", className, methodName, e.getMessage());
            throw e;
        }
    }
}
```

### 6.2 性能监控

```java
@Aspect
@Component
public class PerformanceAspect {
    
    @Around("execution(* com.example..*Service.*(..))")
    public Object monitorPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.nanoTime();
        
        try {
            return joinPoint.proceed();
        } finally {
            long duration = System.nanoTime() - start;
            String method = joinPoint.getSignature().toShortString();
            
            if (duration > 1_000_000) {
                log.warn("Slow method {} took {} ms", method, duration / 1_000_000);
            }
        }
    }
}
```

### 6.3 异常处理

```java
@Aspect
@Component
public class ExceptionHandlingAspect {
    
    @AfterThrowing(
        pointcut = "execution(* com.example..*Service.*(..))",
        throwing = "ex"
    )
    public void handleException(JoinPoint joinPoint, Exception ex) {
        String method = joinPoint.getSignature().toShortString();
        log.error("Exception in {}: {}", method, ex.getMessage(), ex);
        
        sendAlert(joinPoint.getTarget().getClass().getSimpleName(), method, ex);
    }
}
```

### 6.4 缓存

```java
@Aspect
@Component
public class CacheAspect {
    
    private final Map<String, Object> cache = new ConcurrentHashMap<>();
    
    @Around("@annotation(cacheable)")
    public Object cache(ProceedingJoinPoint joinPoint, Cacheable cacheable) throws Throwable {
        String key = generateKey(joinPoint);
        
        if (cache.containsKey(key)) {
            return cache.get(key);
        }
        
        Object result = joinPoint.proceed();
        cache.put(key, result);
        
        return result;
    }
    
    private String generateKey(JoinPoint joinPoint) {
        return joinPoint.getSignature().toLongString() + 
               Arrays.toString(joinPoint.getArgs());
    }
}
```

### 6.5 权限校验

```java
@Aspect
@Component
public class AuthorizationAspect {
    
    @Before("@annotation(requiresRole)")
    public void checkRole(JoinPoint joinPoint, RequiresRole requiresRole) {
        String requiredRole = requiresRole.value();
        String currentUserRole = getCurrentUserRole();
        
        if (!requiredRole.equals(currentUserRole)) {
            throw new AccessDeniedException("Required role: " + requiredRole);
        }
    }
    
    private String getCurrentUserRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getAuthorities().stream()
            .findFirst()
            .map(GrantedAuthority::getAuthority)
            .orElse("ROLE_ANONYMOUS");
    }
}
```

---

## 七、切面执行顺序

### 7.1 @Order注解

```java
@Aspect
@Component
@Order(1)
public class LoggingAspect {
}

@Aspect
@Component
@Order(2)
public class TransactionAspect {
}
```

### 7.2 实现Ordered接口

```java
@Aspect
@Component
public class SecurityAspect implements Ordered {
    
    @Override
    public int getOrder() {
        return 0;
    }
}
```

### 7.3 执行顺序规则

- Order值越小，优先级越高
- 高优先级切面的@Before先执行
- 高优先级切面的@After后执行

---

## 八、最佳实践

### 8.1 切面设计原则

1. **单一职责**: 每个切面只关注一个横切关注点
2. **最小侵入**: 切入点表达式精确匹配
3. **性能考虑**: 避免在切面中执行耗时操作
4. **异常处理**: 合理处理切面中的异常

### 8.2 切入点表达式优化

```java
@Aspect
@Component
public class OptimizedAspect {
    
    @Pointcut("execution(* com.example.service.*.*(..))")
    private void serviceMethod() {}
    
    @Pointcut("@annotation(com.example.annotation.Audited)")
    private void auditedMethod() {}
    
    @Around("serviceMethod() && auditedMethod()")
    public Object audit(ProceedingJoinPoint joinPoint) throws Throwable {
        return joinPoint.proceed();
    }
}
```

### 8.3 避免切面陷阱

```java
@Aspect
@Component
public class BadAspect {
    
    @Around("execution(* com.example..*.*(..))")
    public Object badAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = joinPoint.proceed();
        
        if (result instanceof List) {
            return ((List<?>) result).stream()
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        }
        
        return result;
    }
}
```

---

## 九、总结

### 核心要点

1. **AOP概念**: 切面、切入点、通知、连接点
2. **通知类型**: Before, After, AfterReturning, AfterThrowing, Around
3. **代理机制**: JDK动态代理 vs CGLIB
4. **切入点表达式**: execution, within, @annotation等
5. **执行顺序**: @Order控制切面优先级

### 最佳实践

1. 合理划分切面职责
2. 精确定义切入点
3. 注意性能影响
4. 正确处理异常
5. 使用自定义注解增强可读性

---

## 十、问题思考

> 完成本章学习后，请思考以下问题以检验学习效果

### 基础概念理解

1. **AOP的核心概念有哪些？切面、切入点、通知之间的关系是什么？**
   - 提示：从横切关注点的模块化角度理解

2. **JDK动态代理和CGLIB代理有什么区别？Spring AOP如何选择代理方式？**
   - 提示：从实现机制、性能、限制等角度分析

3. **五种通知类型的执行顺序是怎样的？@Around通知为什么最强大？**
   - 提示：画出正常执行和异常执行的流程图

### 代码实践应用

4. **如何使用AOP实现方法执行时间的监控？请写出完整的切面代码。**
   - 提示：使用@Around通知和ProceedingJoinPoint

5. **如何设计一个基于自定义注解的日志切面？需要考虑哪些问题？**
   - 提示：注解设计、切入点表达式、日志格式

### 综合分析

6. **AOP在Spring事务管理中是如何应用的？@Transactional注解的实现原理是什么？**
   - 提示：思考事务切面的织入时机和通知类型

7. **在同一个方法上应用多个切面时，如何控制它们的执行顺序？**
   - 提示：@Order注解、Ordered接口、执行顺序规则

---

> **下一章预告**: [Spring MVC架构原理](../03-web/01-spring-mvc.md) - 理解Web请求处理流程与MVC架构

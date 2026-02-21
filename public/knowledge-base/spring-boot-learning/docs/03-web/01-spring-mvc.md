# Spring MVC架构原理

> 理解Spring MVC是掌握Web开发的关键

---

## 一、Spring MVC概述

### 1.1 什么是Spring MVC

Spring MVC是基于Java的轻量级Web框架，实现了MVC设计模式。

### 1.2 MVC架构

```
┌─────────────────────────────────────────────────────────────┐
│                        MVC架构                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │    Model    │◄───│  Controller │───►│    View     │     │
│  │  (数据模型)  │    │  (控制器)    │    │   (视图)    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                  │             │
│         │                  │                  │             │
│         ▼                  ▼                  ▼             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    业务逻辑层                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、核心组件

### 2.1 组件架构图

```
┌─────────────────────────────────────────────────────────────┐
│                    Spring MVC核心组件                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  HTTP请求                                                    │
│      │                                                       │
│      ▼                                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              DispatcherServlet                       │   │
│  │              (核心分发器)                             │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│      ┌──────────────────┼──────────────────┐               │
│      │                  │                  │               │
│      ▼                  ▼                  ▼               │
│  ┌─────────┐     ┌─────────────┐     ┌─────────────┐      │
│  │Handler  │     │   Handler   │     │    View     │      │
│  │Mapping  │     │   Adapter   │     │  Resolver   │      │
│  └────┬────┘     └──────┬──────┘     └──────┬──────┘      │
│       │                 │                   │              │
│       ▼                 ▼                   ▼              │
│  ┌─────────┐     ┌─────────────┐     ┌─────────────┐      │
│  │Controller│     │  ModelAndView│    │    View     │      │
│  │  (Handler)│    │              │    │             │      │
│  └─────────┘     └─────────────┘     └─────────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 核心组件说明

| 组件 | 说明 |
|------|------|
| DispatcherServlet | 核心分发器，协调所有组件 |
| HandlerMapping | 映射请求到处理器 |
| HandlerAdapter | 适配不同类型的处理器 |
| Controller | 处理请求的业务逻辑 |
| ModelAndView | 封装模型数据和视图 |
| ViewResolver | 解析视图名称到视图对象 |
| View | 渲染响应内容 |
| HandlerInterceptor | 处理器拦截器 |
| LocaleResolver | 区域解析器 |
| ThemeResolver | 主题解析器 |
| MultipartResolver | 文件上传解析器 |

---

## 三、请求处理流程

### 3.1 完整流程

```
┌─────────────────────────────────────────────────────────────┐
│                    请求处理流程                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. HTTP请求到达DispatcherServlet                            │
│      │                                                       │
│      ▼                                                       │
│  2. DispatcherServlet调用HandlerMapping                      │
│      │                                                       │
│      ▼                                                       │
│  3. HandlerMapping返回HandlerExecutionChain                  │
│      │   (包含Handler和Interceptor)                          │
│      ▼                                                       │
│  4. 执行Interceptor.preHandle()                              │
│      │                                                       │
│      ▼                                                       │
│  5. DispatcherServlet调用HandlerAdapter                      │
│      │                                                       │
│      ▼                                                       │
│  6. HandlerAdapter调用Handler(Controller)                    │
│      │                                                       │
│      ▼                                                       │
│  7. Controller返回ModelAndView                               │
│      │                                                       │
│      ▼                                                       │
│  8. 执行Interceptor.postHandle()                             │
│      │                                                       │
│      ▼                                                       │
│  9. ViewResolver解析View                                     │
│      │                                                       │
│      ▼                                                       │
│  10. View渲染响应                                            │
│      │                                                       │
│      ▼                                                       │
│  11. 执行Interceptor.afterCompletion()                       │
│      │                                                       │
│      ▼                                                       │
│  12. 返回HTTP响应                                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 源码分析

```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
    HttpServletRequest processedRequest = request;
    HandlerExecutionChain mappedHandler = null;
    
    try {
        ModelAndView mv = null;
        Exception dispatchException = null;
        
        try {
            processedRequest = checkMultipart(request);
            
            mappedHandler = getHandler(processedRequest);
            if (mappedHandler == null) {
                noHandlerFound(processedRequest, response);
                return;
            }
            
            HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());
            
            if (!mappedHandler.applyPreHandle(processedRequest, response)) {
                return;
            }
            
            mv = ha.handle(processedRequest, response, mappedHandler.getHandler());
            
            applyDefaultViewName(processedRequest, mv);
            mappedHandler.applyPostHandle(processedRequest, response, mv);
        }
        catch (Exception ex) {
            dispatchException = ex;
        }
        catch (Throwable err) {
            dispatchException = new ServletException("Handler dispatch failed", err);
        }
        
        processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
    }
    finally {
        if (mappedHandler != null) {
            mappedHandler.triggerAfterCompletion(processedRequest, response, null);
        }
    }
}
```

---

## 四、HandlerMapping

### 4.1 HandlerMapping类型

| 类型 | 说明 |
|------|------|
| RequestMappingHandlerMapping | 基于@RequestMapping注解 |
| BeanNameUrlHandlerMapping | 基于Bean名称URL |
| SimpleUrlHandlerMapping | 基于简单URL映射 |
| RouterFunctionMapping | 函数式路由 |

### 4.2 RequestMappingHandlerMapping

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    @PostMapping
    public User createUser(@RequestBody UserDTO dto) {
        return userService.create(dto);
    }
}
```

### 4.3 映射信息

```java
public interface HandlerMapping {
    HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception;
}

public class RequestMappingInfo {
    private PatternsRequestCondition patternsCondition;
    private RequestMethodsRequestCondition methodsCondition;
    private ParamsRequestCondition paramsCondition;
    private HeadersRequestCondition headersCondition;
    private ConsumesRequestCondition consumesCondition;
    private ProducesRequestCondition producesCondition;
}
```

---

## 五、HandlerAdapter

### 5.1 HandlerAdapter类型

| 类型 | 说明 |
|------|------|
| RequestMappingHandlerAdapter | 处理@RequestMapping方法 |
| HttpRequestHandlerAdapter | 处理HttpRequestHandler |
| SimpleControllerHandlerAdapter | 处理Controller接口 |
| HandlerFunctionAdapter | 处理函数式端点 |

### 5.2 RequestMappingHandlerAdapter处理流程

```
┌─────────────────────────────────────────────────────────────┐
│              RequestMappingHandlerAdapter                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 参数解析                                                  │
│     ├── HandlerMethodArgumentResolver                       │
│     ├── @RequestParam, @PathVariable, @RequestBody等         │
│     └── 类型转换                                             │
│                                                              │
│  2. 方法调用                                                  │
│     └── 反射调用Controller方法                               │
│                                                              │
│  3. 返回值处理                                                │
│     ├── HandlerMethodReturnValueHandler                     │
│     ├── @ResponseBody, ModelAndView等                        │
│     └── 序列化响应                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 参数解析器

```java
public interface HandlerMethodArgumentResolver {
    boolean supportsParameter(MethodParameter parameter);
    Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                          NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception;
}
```

**内置解析器**:

| 解析器 | 支持的参数类型 |
|--------|----------------|
| RequestParamMethodArgumentResolver | @RequestParam |
| PathVariableMethodArgumentResolver | @PathVariable |
| RequestResponseBodyMethodProcessor | @RequestBody |
| RequestHeaderMethodArgumentResolver | @RequestHeader |
| ServletCookieValueMethodArgumentResolver | @CookieValue |
| SessionAttributeMethodArgumentResolver | @SessionAttribute |
| ModelMethodProcessor | Model |
| ServletRequestMethodArgumentResolver | HttpServletRequest |

---

## 六、拦截器

### 6.1 HandlerInterceptor

```java
public interface HandlerInterceptor {
    
    default boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
                             Object handler) throws Exception {
        return true;
    }
    
    default void postHandle(HttpServletRequest request, HttpServletResponse response, 
                           Object handler, ModelAndView modelAndView) throws Exception {
    }
    
    default void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
                                Object handler, Exception ex) throws Exception {
    }
}
```

### 6.2 自定义拦截器

```java
@Component
public class AuthInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
                            Object handler) throws Exception {
        String token = request.getHeader("Authorization");
        if (token == null || !validateToken(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        return true;
    }
    
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, 
                          Object handler, ModelAndView modelAndView) throws Exception {
    }
    
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
                               Object handler, Exception ex) throws Exception {
    }
}
```

### 6.3 注册拦截器

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Autowired
    private AuthInterceptor authInterceptor;
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
            .addPathPatterns("/api/**")
            .excludePathPatterns("/api/auth/**", "/api/public/**");
    }
}
```

### 6.4 拦截器执行顺序

```
请求 → Interceptor1.preHandle → Interceptor2.preHandle → Controller
                                                              ↓
响应 ← Interceptor1.afterCompletion ← Interceptor2.afterCompletion ←
                                                              ↑
        Interceptor1.postHandle ← Interceptor2.postHandle ←────┘
```

---

## 七、过滤器与拦截器对比

### 7.1 架构位置

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  HTTP请求                                                    │
│      │                                                       │
│      ▼                                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Servlet Container                       │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │           Filter Chain                       │   │   │
│  │  │  Filter1 → Filter2 → Filter3                 │   │   │
│  │  └──────────────────────┬──────────────────────┘   │   │
│  └─────────────────────────┼───────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              DispatcherServlet                       │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │           Interceptor Chain                  │   │   │
│  │  │  Interceptor1 → Interceptor2 → Controller    │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 对比表

| 特性 | 过滤器(Filter) | 拦截器(Interceptor) |
|------|----------------|---------------------|
| 所属 | Servlet规范 | Spring MVC |
| 作用范围 | 所有请求 | 仅Controller请求 |
| 执行时机 | DispatcherServlet之前 | Controller前后 |
| 依赖容器 | Servlet容器 | Spring容器 |
| 获取Bean | 需要手动获取 | 自动注入 |
| 使用场景 | 编码、安全、日志 | 权限、日志、事务 |

---

## 八、异常处理

### 8.1 @ExceptionHandler

```java
@RestController
public class UserController {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("USER_NOT_FOUND", ex.getMessage()));
    }
}
```

### 8.2 @ControllerAdvice

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.toList());
        
        return ResponseEntity.badRequest()
            .body(new ErrorResponse("VALIDATION_ERROR", String.join(", ", errors)));
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse("INTERNAL_ERROR", "系统错误"));
    }
}
```

### 8.3 自定义异常

```java
public class BusinessException extends RuntimeException {
    private final String code;
    
    public BusinessException(String code, String message) {
        super(message);
        this.code = code;
    }
    
    public String getCode() {
        return code;
    }
}

@RestControllerAdvice
public class BusinessExceptionHandler {
    
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException ex) {
        return ResponseEntity.badRequest()
            .body(new ErrorResponse(ex.getCode(), ex.getMessage()));
    }
}
```

---

## 九、异步请求处理

### 9.1 Callable

```java
@GetMapping("/async")
public Callable<User> asyncMethod() {
    return () -> {
        Thread.sleep(1000);
        return userService.findById(1L);
    };
}
```

### 9.2 DeferredResult

```java
@GetMapping("/deferred")
public DeferredResult<User> deferredMethod() {
    DeferredResult<User> result = new DeferredResult<>();
    
    executorService.submit(() -> {
        try {
            User user = userService.findById(1L);
            result.setResult(user);
        } catch (Exception e) {
            result.setErrorResult(e);
        }
    });
    
    return result;
}
```

### 9.3 CompletableFuture

```java
@GetMapping("/future")
public CompletableFuture<User> futureMethod() {
    return CompletableFuture.supplyAsync(() -> userService.findById(1L));
}
```

---

## 十、总结

### 核心要点

1. **DispatcherServlet**: 核心分发器
2. **HandlerMapping**: 请求映射
3. **HandlerAdapter**: 处理器适配
4. **拦截器**: 请求预处理和后处理
5. **异常处理**: 统一异常处理

### 最佳实践

1. 合理使用拦截器和过滤器
2. 统一异常处理
3. 异步处理耗时操作
4. RESTful API设计规范
5. 参数校验与绑定

---

## 十一、问题思考

> 完成本章学习后，请思考以下问题以检验学习效果

### 基础概念理解

1. **Spring MVC的请求处理流程是怎样的？DispatcherServlet起到了什么作用？**
   - 提示：从请求到响应的完整流程

2. **HandlerMapping和HandlerAdapter各自的作用是什么？为什么需要两个组件？**
   - 提示：思考解耦和扩展性

3. **拦截器(Interceptor)和过滤器(Filter)有什么区别？各自适用于什么场景？**
   - 提示：从执行时机、作用范围、依赖关系角度分析

### 代码实践应用

4. **如何实现全局异常处理？请写出完整的代码示例。**
   - 提示：@ControllerAdvice + @ExceptionHandler

5. **如何实现请求参数校验？有哪些常用的校验注解？**
   - 提示：@Valid、@Validated、JSR-303注解

### 综合分析

6. **Spring MVC如何支持异步请求处理？Callable、DeferredResult、CompletableFuture有什么区别？**
   - 提示：从线程模型和适用场景分析

7. **如何设计一个RESTful API的统一响应格式？需要考虑哪些因素？**
   - 提示：状态码、错误信息、数据结构

---

> **下一章预告**: [RESTful API设计](./02-restful-api.md) - 掌握RESTful设计原则与最佳实践

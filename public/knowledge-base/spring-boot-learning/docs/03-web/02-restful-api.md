# RESTful API设计最佳实践

> 掌握RESTful API设计是现代Web开发的关键

---

## 一、REST架构风格

### 1.1 REST核心概念

**REST (Representational State Transfer)**: 表述性状态转移

- 资源(Resource): 系统中的实体
- 表述(Representation): 资源的表现形式
- 状态转移(State Transfer): 通过HTTP方法实现

### 1.2 REST约束

| 约束 | 说明 |
|------|------|
| 客户端-服务器 | 关注点分离 |
| 无状态 | 请求包含所有信息 |
| 可缓存 | 响应可缓存 |
| 统一接口 | 简化架构 |
| 分层系统 | 支持中间层 |
| 按需代码 | 可选，客户端可扩展 |

### 1.3 Richardson成熟度模型

```
Level 0: SOAP/RPC风格
    │
    │  使用HTTP作为传输协议
    ▼
Level 1: 资源
    │
    │  引入资源概念，每个资源有唯一URI
    ▼
Level 2: HTTP方法
    │
    │  正确使用HTTP方法语义
    ▼
Level 3: HATEOAS
    │
    │  超媒体作为应用状态引擎
    ▼
```

---

## 二、URL设计规范

### 2.1 基本原则

1. 使用名词表示资源
2. 使用复数形式
3. 使用小写字母
4. 使用连字符分隔单词
5. 避免层级过深

### 2.2 URL示例

```
好的设计:
GET    /api/users                    # 获取用户列表
GET    /api/users/{id}               # 获取单个用户
POST   /api/users                    # 创建用户
PUT    /api/users/{id}               # 更新用户(全量)
PATCH  /api/users/{id}               # 更新用户(部分)
DELETE /api/users/{id}               # 删除用户

GET    /api/users/{id}/orders        # 获取用户的订单
GET    /api/orders/{id}              # 获取订单详情

不好的设计:
GET    /api/getUsers                 # 动词形式
GET    /api/user                     # 单数形式
GET    /api/Users                    # 大写字母
GET    /api/user_management          # 下划线
GET    /api/getUserById?id=1         # 混合动词
```

### 2.3 资源关系

```
一对多关系:
GET    /api/users/{userId}/orders              # 用户的订单列表
GET    /api/users/{userId}/orders/{orderId}    # 用户的特定订单

多对多关系:
GET    /api/students/{studentId}/courses       # 学生的课程
GET    /api/courses/{courseId}/students        # 课程的学生
```

---

## 三、HTTP方法语义

### 3.1 方法语义

| 方法 | 语义 | 幂等性 | 安全性 |
|------|------|--------|--------|
| GET | 获取资源 | 是 | 是 |
| POST | 创建资源 | 否 | 否 |
| PUT | 更新资源(全量) | 是 | 否 |
| PATCH | 更新资源(部分) | 否 | 否 |
| DELETE | 删除资源 | 是 | 否 |
| HEAD | 获取资源头信息 | 是 | 是 |
| OPTIONS | 获取支持的方法 | 是 | 是 |

### 3.2 幂等性说明

**幂等**: 多次执行相同请求，结果相同

```
GET: 幂等
    GET /users/1 多次调用，返回相同用户

PUT: 幂等
    PUT /users/1 {name: "Tom"} 多次调用，结果相同

DELETE: 幂等
    DELETE /users/1 多次调用，结果相同(资源被删除)

POST: 非幂等
    POST /users {name: "Tom"} 多次调用，创建多个用户

PATCH: 非幂等(通常)
    PATCH /users/1 {age: +1} 多次调用，年龄累加
```

---

## 四、状态码设计

### 4.1 HTTP状态码分类

| 分类 | 说明 |
|------|------|
| 1xx | 信息性响应 |
| 2xx | 成功 |
| 3xx | 重定向 |
| 4xx | 客户端错误 |
| 5xx | 服务器错误 |

### 4.2 常用状态码

| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 200 | OK | 成功响应 |
| 201 | Created | 资源创建成功 |
| 204 | No Content | 成功但无返回内容 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未认证 |
| 403 | Forbidden | 无权限 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突 |
| 422 | Unprocessable Entity | 语义错误 |
| 500 | Internal Server Error | 服务器错误 |

### 4.3 Spring Boot实现

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public List<User> list() {
        return userService.findAll();
    }
    
    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return userService.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@Valid @RequestBody UserDTO dto) {
        return userService.create(dto);
    }
    
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @Valid @RequestBody UserDTO dto) {
        return userService.update(id, dto);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
```

---

## 五、请求响应设计

### 5.1 请求设计

```java
@Data
public class UserCreateRequest {
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 50, message = "用户名长度3-50字符")
    private String username;
    
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;
    
    @NotBlank(message = "密码不能为空")
    @Size(min = 6, message = "密码至少6位")
    private String password;
}

@Data
public class UserUpdateRequest {
    @Size(min = 3, max = 50, message = "用户名长度3-50字符")
    private String username;
    
    @Email(message = "邮箱格式不正确")
    private String email;
}
```

### 5.2 响应设计

```java
@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;
    private long timestamp;
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "success", data, System.currentTimeMillis());
    }
    
    public static <T> ApiResponse<T> error(int code, String message) {
        return new ApiResponse<>(code, message, null, System.currentTimeMillis());
    }
}

@Data
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
}
```

### 5.3 分页查询

```java
@GetMapping
public ApiResponse<PageResponse<User>> list(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String keyword) {
    
    Page<User> userPage = userService.findAll(page, size, keyword);
    
    PageResponse<User> response = new PageResponse<>(
        userPage.getContent(),
        userPage.getNumber(),
        userPage.getSize(),
        userPage.getTotalElements(),
        userPage.getTotalPages()
    );
    
    return ApiResponse.success(response);
}
```

---

## 六、版本控制

### 6.1 版本控制策略

| 策略 | 示例 | 优点 | 缺点 |
|------|------|------|------|
| URL路径 | /api/v1/users | 简单直观 | URL变化 |
| 请求头 | Accept: application/vnd.api.v1+json | URL不变 | 复杂 |
| 查询参数 | /api/users?version=1 | 简单 | 不够RESTful |

### 6.2 URL路径版本控制

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserV1Controller {
    @GetMapping
    public List<UserV1> list() {
    }
}

@RestController
@RequestMapping("/api/v2/users")
public class UserV2Controller {
    @GetMapping
    public List<UserV2> list() {
    }
}
```

### 6.3 请求头版本控制

```java
@RestController
public class UserController {
    
    @GetMapping(value = "/api/users", headers = "X-API-Version=1")
    public List<UserV1> listV1() {
    }
    
    @GetMapping(value = "/api/users", headers = "X-API-Version=2")
    public List<UserV2> listV2() {
    }
}
```

---

## 七、HATEOAS

### 7.1 什么是HATEOAS

**HATEOAS (Hypermedia As The Engine Of Application State)**: 超媒体作为应用状态引擎

响应中包含相关操作的链接，客户端通过链接发现可执行的操作。

### 7.2 Spring HATEOAS实现

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    public EntityModel<User> get(@PathVariable Long id) {
        User user = userService.findById(id);
        
        return EntityModel.of(user,
            linkTo(methodOn(UserController.class).get(id)).withSelfRel(),
            linkTo(methodOn(UserController.class).list(0, 10, null)).withRel("users"),
            linkTo(methodOn(OrderController.class).listByUser(id)).withRel("orders")
        );
    }
}
```

### 7.3 响应示例

```json
{
    "id": 1,
    "username": "john",
    "email": "john@example.com",
    "_links": {
        "self": {
            "href": "http://localhost:8080/api/users/1"
        },
        "users": {
            "href": "http://localhost:8080/api/users"
        },
        "orders": {
            "href": "http://localhost:8080/api/users/1/orders"
        }
    }
}
```

---

## 八、安全性设计

### 8.1 认证

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### 8.2 授权

```java
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> listUsers() {
        return userService.findAll();
    }
    
    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }
}
```

### 8.3 敏感数据处理

```java
@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    
    @JsonIgnore
    private String password;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
}
```

---

## 九、API文档

### 9.1 Swagger/OpenAPI

```java
@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("User API")
                .version("1.0")
                .description("User management API"))
            .addSecurityItem(new SecurityRequirement().addList("Bearer"))
            .components(new Components()
                .addSecuritySchemes("Bearer", 
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}
```

### 9.2 注解使用

```java
@RestController
@RequestMapping("/api/users")
@Tag(name = "User", description = "用户管理API")
public class UserController {
    
    @Operation(summary = "获取用户列表", description = "分页获取所有用户")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "成功"),
        @ApiResponse(responseCode = "401", description = "未认证")
    })
    @GetMapping
    public PageResponse<User> list(
            @Parameter(description = "页码") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") int size) {
        return userService.findAll(page, size);
    }
}
```

---

## 十、最佳实践总结

### 10.1 设计原则

1. **资源导向**: 以资源为中心设计API
2. **统一接口**: 遵循REST约束
3. **无状态**: 请求包含所有信息
4. **可缓存**: 合理使用缓存策略
5. **版本控制**: 支持API演进

### 10.2 实践建议

1. 使用名词表示资源
2. 正确使用HTTP方法和状态码
3. 统一响应格式
4. 完善的错误处理
5. 编写清晰的API文档
6. 实施安全措施
7. 支持分页和过滤
8. 考虑HATEOAS

### 10.3 检查清单

- [ ] URL使用名词复数形式
- [ ] HTTP方法语义正确
- [ ] 状态码使用恰当
- [ ] 请求参数有校验
- [ ] 响应格式统一
- [ ] 错误信息清晰
- [ ] API有版本控制
- [ ] 文档完整准确
- [ ] 安全措施到位
- [ ] 支持分页查询

---

## 十一、问题思考

> 完成本章学习后，请思考以下问题以检验学习效果

### 基础概念理解

1. **RESTful架构的核心约束有哪些？为什么说REST是无状态的？**
   - 提示：从客户端-服务器、无状态、缓存、统一接口等约束分析

2. **HTTP方法(GET/POST/PUT/DELETE/PATCH)在RESTful API中应该如何正确使用？**
   - 提示：从幂等性、安全性、语义角度分析

3. **什么是HATEOAS？它在RESTful API中有什么作用？**
   - 提示：思考超媒体驱动的API设计

### 代码实践应用

4. **如何设计API的版本控制方案？各有什么优缺点？**
   - 提示：URL路径、请求头、查询参数三种方式

5. **如何设计统一的API响应格式？请给出完整的JSON结构示例。**
   - 提示：包含状态码、消息、数据、时间戳等

### 综合分析

6. **如何处理RESTful API中的分页、排序和过滤？请设计一套完整的方案。**
   - 提示：考虑URL参数设计、响应格式、性能优化

7. **RESTful API如何保证安全性？有哪些常见的认证授权方案？**
   - 提示：JWT、OAuth2、API Key等

---

> **下一章预告**: [事务管理机制](../04-data/01-transaction-management.md) - 理解Spring事务管理与传播行为

# 微服务架构设计原则

> 理解微服务架构是现代分布式系统的基础

---

## 一、微服务概述

### 1.1 什么是微服务

**微服务架构**: 将单一应用拆分为一组小型服务，每个服务独立部署、独立扩展。

### 1.2 单体架构 vs 微服务架构

```
单体架构:
┌─────────────────────────────────────────────────────────────┐
│                      单体应用                                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ 用户模块 │ │ 订单模块 │ │ 支付模块 │ │ 库存模块 │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    共享数据库                         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

微服务架构:
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ 用户服务 │ │ 订单服务 │ │ 支付服务 │ │ 库存服务 │          │
│  │   DB    │ │   DB    │ │   DB    │ │   DB    │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    API网关                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 微服务优缺点

| 优点 | 缺点 |
|------|------|
| 独立部署 | 分布式复杂性 |
| 技术异构 | 运维成本高 |
| 故障隔离 | 数据一致性难 |
| 按需扩展 | 服务间通信复杂 |
| 团队自治 | 测试难度增加 |

---

## 二、服务拆分原则

### 2.1 拆分策略

| 策略 | 说明 |
|------|------|
| 按业务能力 | 根据业务边界划分 |
| 按子域 | DDD限界上下文 |
| 按团队 | 康威定律 |
| 按数据 | 数据所有权 |

### 2.2 服务边界划分

```
电商系统服务划分:
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  用户服务(User Service)                                      │
│  ├── 用户注册、登录                                          │
│  ├── 用户信息管理                                            │
│  └── 用户认证授权                                            │
│                                                              │
│  商品服务(Product Service)                                   │
│  ├── 商品管理                                                │
│  ├── 分类管理                                                │
│  └── 商品搜索                                                │
│                                                              │
│  订单服务(Order Service)                                     │
│  ├── 订单创建                                                │
│  ├── 订单状态管理                                            │
│  └── 订单查询                                                │
│                                                              │
│  支付服务(Payment Service)                                   │
│  ├── 支付处理                                                │
│  ├── 退款处理                                                │
│  └── 支付记录                                                │
│                                                              │
│  库存服务(Inventory Service)                                 │
│  ├── 库存管理                                                │
│  ├── 库存扣减                                                │
│  └── 库存预警                                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 服务粒度

```
服务粒度考量:
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  太粗粒度:                                                    │
│  ├── 难以独立扩展                                            │
│  ├── 故障影响范围大                                          │
│  └── 团队协作困难                                            │
│                                                              │
│  太细粒度:                                                    │
│  ├── 服务间通信频繁                                          │
│  ├── 运维复杂度高                                            │
│  └── 分布式事务多                                            │
│                                                              │
│  合适粒度:                                                    │
│  ├── 单一职责                                                │
│  ├── 独立部署                                                │
│  ├── 数据自治                                                │
│  └── 团队可管理                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 三、服务通信

### 3.1 通信模式

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| 同步调用 | 实时响应 | 需要立即结果 |
| 异步消息 | 解耦、削峰 | 不需要立即结果 |
| 事件驱动 | 松耦合 | 状态变更通知 |

### 3.2 同步通信

```java
@Service
public class OrderService {
    
    private final RestTemplate restTemplate;
    
    public Order createOrder(OrderDTO dto) {
        User user = restTemplate.getForObject(
            "http://user-service/api/users/" + dto.getUserId(), User.class);
        
        Product product = restTemplate.getForObject(
            "http://product-service/api/products/" + dto.getProductId(), Product.class);
        
        Order order = new Order();
        order.setUserId(user.getId());
        order.setProductId(product.getId());
        order.setAmount(product.getPrice().multiply(new BigDecimal(dto.getQuantity())));
        
        return orderRepository.save(order);
    }
}
```

### 3.3 Feign声明式调用

```java
@FeignClient(name = "user-service")
public interface UserClient {
    
    @GetMapping("/api/users/{id}")
    User getUser(@PathVariable("id") Long id);
    
    @PostMapping("/api/users")
    User createUser(@RequestBody UserDTO dto);
}

@FeignClient(name = "product-service")
public interface ProductClient {
    
    @GetMapping("/api/products/{id}")
    Product getProduct(@PathVariable("id") Long id);
    
    @GetMapping("/api/products")
    List<Product> listProducts();
}

@Service
public class OrderService {
    
    private final UserClient userClient;
    private final ProductClient productClient;
    
    public Order createOrder(OrderDTO dto) {
        User user = userClient.getUser(dto.getUserId());
        Product product = productClient.getProduct(dto.getProductId());
        
        Order order = new Order();
        order.setUserId(user.getId());
        order.setProductId(product.getId());
        
        return orderRepository.save(order);
    }
}
```

### 3.4 异步消息通信

```java
@Service
public class OrderService {
    
    private final RabbitTemplate rabbitTemplate;
    
    public Order createOrder(OrderDTO dto) {
        Order order = orderRepository.save(dto.toOrder());
        
        OrderCreatedEvent event = new OrderCreatedEvent(
            order.getId(), 
            order.getUserId(), 
            order.getAmount()
        );
        
        rabbitTemplate.convertAndSend("order.exchange", "order.created", event);
        
        return order;
    }
}

@Component
public class InventoryEventListener {
    
    @Autowired
    private InventoryService inventoryService;
    
    @RabbitListener(queues = "inventory.order.queue")
    public void handleOrderCreated(OrderCreatedEvent event) {
        inventoryService.decreaseStock(event.getProductId(), event.getQuantity());
    }
}
```

---

## 四、服务发现

### 4.1 服务发现模式

```
客户端发现:
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌─────────┐     查询服务地址     ┌─────────────────┐       │
│  │  客户端  │ ──────────────────► │  服务注册中心    │       │
│  └────┬────┘                     └─────────────────┘       │
│       │                                                       │
│       │ 直接调用                                              │
│       ▼                                                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                        │
│  │ 服务实例 │ │ 服务实例 │ │ 服务实例 │                        │
│  └─────────┘ └─────────┘ └─────────┘                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

服务端发现:
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌─────────┐     请求服务      ┌─────────────────┐          │
│  │  客户端  │ ────────────────► │    负载均衡器    │          │
│  └─────────┘                   └────────┬────────┘          │
│                                         │                    │
│                                         ▼                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                        │
│  │ 服务实例 │ │ 服务实例 │ │ 服务实例 │                        │
│  └─────────┘ └─────────┘ └─────────┘                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Nacos服务发现

```yaml
spring:
  application:
    name: order-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        namespace: dev
        group: DEFAULT_GROUP
```

```java
@Service
public class OrderService {
    
    @Autowired
    private DiscoveryClient discoveryClient;
    
    public List<ServiceInstance> getUserServiceInstances() {
        return discoveryClient.getInstances("user-service");
    }
}
```

---

## 五、API网关

### 5.1 网关职责

```
┌─────────────────────────────────────────────────────────────┐
│                      API网关职责                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 路由转发                                                  │
│     └── 将请求路由到后端服务                                  │
│                                                              │
│  2. 负载均衡                                                  │
│     └── 分发请求到多个服务实例                                │
│                                                              │
│  3. 认证授权                                                  │
│     └── 统一身份认证                                          │
│                                                              │
│  4. 限流熔断                                                  │
│     └── 保护后端服务                                          │
│                                                              │
│  5. 日志监控                                                  │
│     └── 请求追踪和统计                                        │
│                                                              │
│  6. 协议转换                                                  │
│     └── HTTP/gRPC/WebSocket转换                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Spring Cloud Gateway

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=1
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - AuthenticationFilter
```

```java
@Component
public class AuthenticationFilter implements GlobalFilter, Ordered {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        
        if (token == null || !validateToken(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        
        return chain.filter(exchange);
    }
    
    @Override
    public int getOrder() {
        return -100;
    }
}
```

---

## 六、分布式事务

### 6.1 分布式事务方案

| 方案 | 说明 | 一致性 | 性能 |
|------|------|--------|------|
| 2PC | 两阶段提交 | 强一致 | 低 |
| TCC | Try-Confirm-Cancel | 最终一致 | 中 |
| Saga | 长事务编排 | 最终一致 | 高 |
| 本地消息表 | 最终一致 | 最终一致 | 高 |
| 事务消息 | RocketMQ | 最终一致 | 高 |

### 6.2 Seata AT模式

```java
@Service
public class OrderService {
    
    @GlobalTransactional
    public Order placeOrder(OrderDTO dto) {
        Order order = orderRepository.save(dto.toOrder());
        
        inventoryClient.decreaseStock(dto.getProductId(), dto.getQuantity());
        
        accountClient.decreaseBalance(dto.getUserId(), order.getAmount());
        
        return order;
    }
}
```

### 6.3 Saga模式

```java
@Service
public class OrderSagaService {
    
    public void placeOrder(OrderDTO dto) {
        try {
            Order order = createOrder(dto);
            
            try {
                decreaseStock(dto.getProductId(), dto.getQuantity());
            } catch (Exception e) {
                cancelOrder(order.getId());
                throw e;
            }
            
            try {
                decreaseBalance(dto.getUserId(), order.getAmount());
            } catch (Exception e) {
                increaseStock(dto.getProductId(), dto.getQuantity());
                cancelOrder(order.getId());
                throw e;
            }
            
        } catch (Exception e) {
            throw new BusinessException("下单失败: " + e.getMessage());
        }
    }
}
```

---

## 七、服务治理

### 7.1 熔断降级

```java
@Service
public class UserService {
    
    private final UserClient userClient;
    
    @CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
    public User getUser(Long id) {
        return userClient.getUser(id);
    }
    
    public User getUserFallback(Long id, Exception e) {
        return new User(id, "默认用户", "default@example.com");
    }
}

@Service
public class OrderService {
    
    @RateLimiter(name = "orderService")
    public Order createOrder(OrderDTO dto) {
        return orderRepository.save(dto.toOrder());
    }
}
```

### 7.2 限流配置

```yaml
resilience4j:
  circuitbreaker:
    instances:
      userService:
        slidingWindowSize: 10
        failureRateThreshold: 50
        waitDurationInOpenState: 10s
        permittedNumberOfCallsInHalfOpenState: 3
  ratelimiter:
    instances:
      orderService:
        limitForPeriod: 10
        limitRefreshPeriod: 1s
        timeoutDuration: 0
```

---

## 八、总结

### 核心要点

1. **服务拆分**: 按业务能力划分子域
2. **服务通信**: 同步/异步/事件驱动
3. **服务发现**: 客户端/服务端发现
4. **API网关**: 统一入口、路由、认证
5. **分布式事务**: 最终一致性方案

### 最佳实践

1. 合理划分服务边界
2. 选择合适的通信模式
3. 实施服务治理
4. 保证数据一致性
5. 完善监控告警

---

## 九、问题思考

> 完成本章学习后，请思考以下问题以检验学习效果

### 基础概念理解

1. **微服务架构和单体架构各有什么优缺点？什么情况下应该选择微服务？**
   - 提示：从团队规模、业务复杂度、部署频率角度分析

2. **微服务拆分的原则有哪些？如何确定服务的边界？**
   - 提示：DDD限界上下文、业务能力、团队组织

3. **服务间通信有哪些方式？同步通信和异步通信各有什么优缺点？**
   - 提示：REST、gRPC、消息队列、事件驱动

### 代码实践应用

4. **如何实现服务的注册与发现？Spring Cloud提供了哪些组件？**
   - 提示：Eureka、Nacos、Consul

5. **API网关的作用是什么？如何使用Spring Cloud Gateway实现网关？**
   - 提示：路由、认证、限流、熔断

### 综合分析

6. **分布式事务有哪些解决方案？各自的适用场景是什么？**
   - 提示：2PC、TCC、Saga、本地消息表

7. **如何保证微服务架构的高可用性？需要考虑哪些方面？**
   - 提示：熔断降级、限流、负载均衡、监控告警

---

> **恭喜完成全部学习内容！** 建议回顾各章节的问题思考，巩固所学知识。如有疑问，可查阅[附录](../appendix/annotation-quick-ref.md)快速参考。

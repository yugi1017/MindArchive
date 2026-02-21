# 事务管理机制深度解析

> 理解事务管理是数据访问层的核心

---

## 一、事务基础

### 1.1 什么是事务

**事务(Transaction)**: 一组操作的逻辑单元，要么全部成功，要么全部失败。

### 1.2 ACID特性

| 特性 | 说明 |
|------|------|
| Atomicity (原子性) | 事务是不可分割的工作单位 |
| Consistency (一致性) | 事务前后数据保持一致状态 |
| Isolation (隔离性) | 多个事务并发执行互不干扰 |
| Durability (持久性) | 事务完成后数据永久保存 |

### 1.3 事务问题

| 问题 | 说明 |
|------|------|
| 脏读 | 读到其他事务未提交的数据 |
| 不可重复读 | 同一事务两次读取结果不同 |
| 幻读 | 同一事务两次查询记录数不同 |
| 丢失更新 | 两个事务同时更新，一个更新丢失 |

---

## 二、Spring事务抽象

### 2.1 事务抽象架构

```
┌─────────────────────────────────────────────────────────────┐
│                    Spring事务抽象                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PlatformTransactionManager (事务管理器接口)                  │
│      │                                                       │
│      ├── DataSourceTransactionManager (JDBC)                │
│      │                                                       │
│      ├── JpaTransactionManager (JPA)                        │
│      │                                                       │
│      ├── HibernateTransactionManager (Hibernate)            │
│      │                                                       │
│      └── JtaTransactionManager (JTA)                        │
│                                                              │
│  TransactionDefinition (事务定义)                            │
│      ├── 隔离级别                                            │
│      ├── 传播行为                                            │
│      ├── 超时时间                                            │
│      └── 只读标志                                            │
│                                                              │
│  TransactionStatus (事务状态)                                │
│      ├── 是否新事务                                          │
│      ├── 是否已完成                                          │
│      └── 是否只回滚                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 PlatformTransactionManager

```java
public interface PlatformTransactionManager {
    
    TransactionStatus getTransaction(TransactionDefinition definition) throws TransactionException;
    
    void commit(TransactionStatus status) throws TransactionException;
    
    void rollback(TransactionStatus status) throws TransactionException;
}
```

### 2.3 TransactionDefinition

```java
public interface TransactionDefinition {
    
    int getPropagationBehavior();
    
    int getIsolationLevel();
    
    int getTimeout();
    
    boolean isReadOnly();
    
    String getName();
}
```

---

## 三、隔离级别

### 3.1 隔离级别说明

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|----------|------|------------|------|
| READ_UNCOMMITTED | 可能 | 可能 | 可能 |
| READ_COMMITTED | 不可能 | 可能 | 可能 |
| REPEATABLE_READ | 不可能 | 不可能 | 可能 |
| SERIALIZABLE | 不可能 | 不可能 | 不可能 |

### 3.2 Spring隔离级别

```java
public enum Isolation {
    DEFAULT(-1),
    READ_UNCOMMITTED(1),
    READ_COMMITTED(2),
    REPEATABLE_READ(4),
    SERIALIZABLE(8);
}
```

### 3.3 使用示例

```java
@Service
public class OrderService {
    
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public Order createOrder(OrderDTO dto) {
        return orderRepository.save(dto.toOrder());
    }
    
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void criticalOperation() {
    }
}
```

---

## 四、传播行为

### 4.1 传播行为说明

| 传播行为 | 说明 |
|----------|------|
| REQUIRED | 有事务则加入，无则新建（默认） |
| REQUIRES_NEW | 总是新建事务，挂起当前事务 |
| SUPPORTS | 有事务则加入，无则非事务执行 |
| NOT_SUPPORTED | 非事务执行，挂起当前事务 |
| MANDATORY | 必须在事务中执行，否则抛异常 |
| NEVER | 非事务执行，有事务则抛异常 |
| NESTED | 嵌套事务（保存点） |

### 4.2 传播行为图解

```
REQUIRED:
┌─────────────────────────────────────┐
│  外层事务                            │
│  ┌─────────────────────────────┐   │
│  │  内层方法(REQUIRED)          │   │
│  │  加入外层事务                │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

REQUIRES_NEW:
┌─────────────────────────────────────┐
│  外层事务                            │
│  ┌─────────────────────────────┐   │
│  │  内层方法(REQUIRES_NEW)      │   │
│  │  新建独立事务                │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

NESTED:
┌─────────────────────────────────────┐
│  外层事务                            │
│  ┌─────────────────────────────┐   │
│  │  内层方法(NESTED)            │   │
│  │  嵌套事务(保存点)            │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 4.3 使用示例

```java
@Service
public class OrderService {
    
    @Transactional
    public void placeOrder(OrderDTO dto) {
        Order order = createOrder(dto);
        inventoryService.decreaseStock(dto.getProductId(), dto.getQuantity());
        notificationService.sendOrderNotification(order);
    }
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logOperation(String operation) {
    }
}

@Service
public class NotificationService {
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void sendOrderNotification(Order order) {
    }
}
```

---

## 五、声明式事务

### 5.1 @Transactional注解

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Transactional {
    
    @AliasFor("transactionManager")
    String value() default "";
    
    @AliasFor("value")
    String transactionManager() default "";
    
    String[] label() default {};
    
    Propagation propagation() default Propagation.REQUIRED;
    
    Isolation isolation() default Isolation.DEFAULT;
    
    int timeout() default TransactionDefinition.TIMEOUT_DEFAULT;
    
    String timeoutString() default "";
    
    boolean readOnly() default false;
    
    Class<? extends Throwable>[] rollbackFor() default {};
    
    String[] rollbackForClassName() default {};
    
    Class<? extends Throwable>[] noRollbackFor() default {};
    
    String[] noRollbackForClassName() default {};
}
```

### 5.2 常用配置

```java
@Service
@Transactional
public class UserService {
    
    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    @Transactional(rollbackFor = Exception.class)
    public User create(UserDTO dto) throws Exception {
        return userRepository.save(dto.toUser());
    }
    
    @Transactional(
        propagation = Propagation.REQUIRES_NEW,
        isolation = Isolation.READ_COMMITTED,
        timeout = 30
    )
    public void criticalOperation() {
    }
}
```

### 5.3 事务回滚规则

```java
@Service
public class OrderService {
    
    @Transactional(rollbackFor = Exception.class)
    public void processOrder(Long orderId) throws Exception {
    }
    
    @Transactional(
        rollbackFor = {SQLException.class, IOException.class},
        noRollbackFor = BusinessException.class
    )
    public void anotherMethod() {
    }
}
```

---

## 六、事务失效场景

### 6.1 常见失效原因

| 原因 | 说明 |
|------|------|
| 方法非public | 只对public方法有效 |
| 同类调用 | 绕过代理，事务不生效 |
| 异常被捕获 | 异常未抛出，事务不回滚 |
| 异常类型不匹配 | 默认只回滚RuntimeException |
| 数据库不支持 | 如MyISAM引擎 |
| 事务管理器未配置 | 缺少事务管理器 |

### 6.2 同类调用问题

```java
@Service
public class OrderService {
    
    public void placeOrder(OrderDTO dto) {
        createOrder(dto);
    }
    
    @Transactional
    public void createOrder(OrderDTO dto) {
    }
}
```

**解决方案**:

```java
@Service
public class OrderService {
    
    @Autowired
    private OrderService self;
    
    public void placeOrder(OrderDTO dto) {
        self.createOrder(dto);
    }
    
    @Transactional
    public void createOrder(OrderDTO dto) {
    }
}
```

或使用AopContext:

```java
@Service
public class OrderService {
    
    public void placeOrder(OrderDTO dto) {
        ((OrderService) AopContext.currentProxy()).createOrder(dto);
    }
    
    @Transactional
    public void createOrder(OrderDTO dto) {
    }
}
```

### 6.3 异常处理问题

```java
@Service
public class OrderService {
    
    @Transactional
    public void placeOrder(OrderDTO dto) {
        try {
            createOrder(dto);
            inventoryService.decreaseStock(dto.getProductId(), dto.getQuantity());
        } catch (Exception e) {
            log.error("Error", e);
        }
    }
}
```

**解决方案**:

```java
@Service
public class OrderService {
    
    @Transactional
    public void placeOrder(OrderDTO dto) {
        try {
            createOrder(dto);
            inventoryService.decreaseStock(dto.getProductId(), dto.getQuantity());
        } catch (Exception e) {
            log.error("Error", e);
            throw new RuntimeException(e);
        }
    }
}
```

---

## 七、编程式事务

### 7.1 TransactionTemplate

```java
@Service
public class OrderService {
    
    private final TransactionTemplate transactionTemplate;
    
    public OrderService(TransactionTemplate transactionTemplate) {
        this.transactionTemplate = transactionTemplate;
    }
    
    public void placeOrder(OrderDTO dto) {
        transactionTemplate.execute(status -> {
            try {
                createOrder(dto);
                inventoryService.decreaseStock(dto.getProductId(), dto.getQuantity());
            } catch (Exception e) {
                status.setRollbackOnly();
            }
            return null;
        });
    }
}
```

### 7.2 PlatformTransactionManager

```java
@Service
public class OrderService {
    
    private final PlatformTransactionManager transactionManager;
    
    public OrderService(PlatformTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }
    
    public void placeOrder(OrderDTO dto) {
        TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
        
        try {
            createOrder(dto);
            inventoryService.decreaseStock(dto.getProductId(), dto.getQuantity());
            transactionManager.commit(status);
        } catch (Exception e) {
            transactionManager.rollback(status);
            throw e;
        }
    }
}
```

---

## 八、分布式事务

### 8.1 分布式事务方案

| 方案 | 说明 |
|------|------|
| 2PC | 两阶段提交 |
| TCC | Try-Confirm-Cancel |
| Saga | 长事务编排 |
| 本地消息表 | 最终一致性 |
| 事务消息 | RocketMQ事务消息 |

### 8.2 Seata分布式事务

```java
@Service
public class OrderService {
    
    @GlobalTransactional
    public void placeOrder(OrderDTO dto) {
        orderRepository.save(dto.toOrder());
        inventoryClient.decreaseStock(dto.getProductId(), dto.getQuantity());
        accountClient.decreaseBalance(dto.getUserId(), dto.getAmount());
    }
}
```

---

## 九、事务最佳实践

### 9.1 设计原则

1. **事务尽可能小**: 减少锁持有时间
2. **避免长事务**: 防止连接池耗尽
3. **只读优化**: 使用readOnly=true
4. **合理设置隔离级别**: 平衡一致性和性能
5. **正确处理异常**: 确保回滚

### 9.2 代码示例

```java
@Service
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final InventoryService inventoryService;
    private final NotificationService notificationService;
    
    @Transactional
    public Order placeOrder(OrderDTO dto) {
        Order order = orderRepository.save(dto.toOrder());
        inventoryService.decreaseStock(dto.getProductId(), dto.getQuantity());
        return order;
    }
    
    @Transactional(readOnly = true)
    public Order findById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logOperation(String operation) {
    }
}

@Service
public class NotificationService {
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Async
    public void sendOrderNotification(Order order) {
    }
}
```

---

## 十、总结

### 核心要点

1. **ACID特性**: 原子性、一致性、隔离性、持久性
2. **隔离级别**: 解决并发问题
3. **传播行为**: 控制事务边界
4. **声明式事务**: @Transactional注解
5. **失效场景**: 避免常见陷阱

### 最佳实践

1. 事务方法保持public
2. 避免同类调用
3. 正确处理异常
4. 合理设置传播行为
5. 使用只读事务优化查询

---

## 十一、问题思考

> 完成本章学习后，请思考以下问题以检验学习效果

### 基础概念理解

1. **事务的ACID特性分别是什么？为什么它们对数据一致性很重要？**
   - 提示：从数据完整性和并发场景角度分析

2. **数据库的四种隔离级别分别解决什么问题？MySQL默认使用哪种隔离级别？**
   - 提示：脏读、不可重复读、幻读

3. **Spring事务的七种传播行为分别是什么？各自适用于什么场景？**
   - 提示：REQUIRED、REQUIRES_NEW、NESTED等

### 代码实践应用

4. **@Transactional注解在什么情况下会失效？如何避免？**
   - 提示：方法非public、同类调用、异常处理等

5. **如何正确设置@Transactional的rollbackFor属性？默认行为是什么？**
   - 提示：默认只对RuntimeException回滚

### 综合分析

6. **在嵌套事务中，如果内层事务抛出异常，外层事务如何处理？**
   - 提示：分析不同传播行为下的行为差异

7. **分布式事务有哪些常见解决方案？Spring Boot如何集成分布式事务？**
   - 提示：Seata、XA、TCC、Saga等

---

> **下一章预告**: [Spring Data JPA](./02-spring-data-jpa.md) - 掌握JPA实体映射与Repository使用

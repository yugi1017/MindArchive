# Spring Data JPA架构与实践

> 掌握JPA是数据访问层的核心技能

---

## 一、JPA概述

### 1.1 什么是JPA

**JPA (Java Persistence API)**: Java持久化规范，定义了对象关系映射(ORM)的标准。

### 1.2 JPA架构

```
┌─────────────────────────────────────────────────────────────┐
│                      JPA架构                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  应用层                                                      │
│      │                                                       │
│      ▼                                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              EntityManager (持久化上下文)             │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│      ┌──────────────────┼──────────────────┐               │
│      │                  │                  │               │
│      ▼                  ▼                  ▼               │
│  ┌─────────┐     ┌─────────────┐     ┌─────────────┐      │
│  │ Entity  │     │   Query     │     │ Criteria    │      │
│  │ Manager │     │   Language  │     │   API       │      │
│  └─────────┘     └─────────────┘     └─────────────┘      │
│                                                              │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Persistence Provider                    │   │
│  │              (Hibernate/EclipseLink)                 │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Database                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、实体定义

### 2.1 基本实体

```java
@Entity
@Table(name = "users")
@Data
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", nullable = false, length = 50, unique = true)
    private String username;
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "password", nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.ACTIVE;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
```

### 2.2 常用注解

| 注解 | 说明 |
|------|------|
| @Entity | 标记为实体类 |
| @Table | 指定表名 |
| @Id | 标记主键 |
| @GeneratedValue | 主键生成策略 |
| @Column | 列映射 |
| @Enumerated | 枚举映射 |
| @Temporal | 日期时间映射 |
| @Lob | 大对象映射 |
| @Transient | 忽略映射 |
| @CreationTimestamp | 创建时间自动填充 |
| @UpdateTimestamp | 更新时间自动填充 |

### 2.3 主键生成策略

```java
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_sequence", allocationSize = 1)
    private Long id;
    
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "user_table")
    @TableGenerator(name = "user_table", table = "id_generator", 
                    pkColumnName = "gen_name", valueColumnName = "gen_value",
                    pkColumnValue = "user_id", allocationSize = 1)
    private Long id;
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
}
```

---

## 三、关联关系

### 3.1 一对一

```java
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfile profile;
}

@Entity
public class UserProfile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private String bio;
}
```

### 3.2 一对多

```java
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();
    
    public void addOrder(Order order) {
        orders.add(order);
        order.setUser(this);
    }
    
    public void removeOrder(Order order) {
        orders.remove(order);
        order.setUser(null);
    }
}

@Entity
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    private BigDecimal amount;
}
```

### 3.3 多对多

```java
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToMany
    @JoinTable(
        name = "user_role",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}

@Entity
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToMany(mappedBy = "roles")
    private Set<User> users = new HashSet<>();
    
    private String name;
}
```

### 3.4 关联关系总结

| 关系 | 注解 | 说明 |
|------|------|------|
| 一对一 | @OneToOne | 一个实体对应另一个实体 |
| 一对多 | @OneToMany | 一个实体对应多个实体 |
| 多对一 | @ManyToOne | 多个实体对应一个实体 |
| 多对多 | @ManyToMany | 多个实体对应多个实体 |

---

## 四、Repository接口

### 4.1 Repository层次结构

```
Repository (标记接口)
    │
    ├── CrudRepository (CRUD操作)
    │       └── 基本的增删改查
    │
    ├── PagingAndSortingRepository (分页排序)
    │       └── 继承CrudRepository，增加分页排序
    │
    └── JpaRepository (JPA扩展)
            └── 继承PagingAndSortingRepository，增加JPA特性
```

### 4.2 定义Repository

```java
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    List<User> findByStatus(UserStatus status);
    
    List<User> findByCreatedAtAfter(LocalDateTime date);
    
    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain")
    List<User> findByEmailDomain(@Param("domain") String domain);
    
    @Query(value = "SELECT * FROM users WHERE status = :status", nativeQuery = true)
    List<User> findByStatusNative(@Param("status") String status);
    
    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.id = :id")
    int updateStatus(@Param("id") Long id, @Param("status") UserStatus status);
    
    boolean existsByUsername(String username);
    
    long countByStatus(UserStatus status);
    
    void deleteByStatus(UserStatus status);
}
```

### 4.3 方法命名规则

| 关键字 | 示例 | JPQL片段 |
|--------|------|----------|
| And | findByNameAndAge | where x.name = ? and x.age = ? |
| Or | findByNameOrAge | where x.name = ? or x.age = ? |
| Between | findByAgeBetween | where x.age between ? and ? |
| LessThan | findByAgeLessThan | where x.age < ? |
| GreaterThan | findByAgeGreaterThan | where x.age > ? |
| Like | findByNameLike | where x.name like ? |
| In | findByAgeIn | where x.age in (?) |
| OrderBy | findByAgeOrderByNameDesc | order by x.name desc |
| Not | findByNameNot | where x.name <> ? |
| IsNull | findByNameIsNull | where x.name is null |
| IsNotNull | findByNameIsNotNull | where x.name is not null |

---

## 五、查询方法

### 5.1 分页查询

```java
public interface UserRepository extends JpaRepository<User, Long> {
    
    Page<User> findByStatus(UserStatus status, Pageable pageable);
    
    Page<User> findByUsernameContaining(String keyword, Pageable pageable);
}

@Service
public class UserService {
    
    public Page<User> findAll(int page, int size, String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
        return userRepository.findAll(pageable);
    }
    
    public Page<User> search(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findByUsernameContaining(keyword, pageable);
    }
}
```

### 5.2 自定义查询

```java
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u JOIN FETCH u.orders WHERE u.id = :id")
    Optional<User> findByIdWithOrders(@Param("id") Long id);
    
    @Query("SELECT new com.example.dto.UserSummary(u.id, u.username, u.email) FROM User u WHERE u.status = :status")
    List<UserSummary> findSummaryByStatus(@Param("status") UserStatus status);
    
    @EntityGraph(attributePaths = {"orders"})
    List<User> findAllWithOrders();
}
```

### 5.3 Specifications动态查询

```java
public class UserSpecifications {
    
    public static Specification<User> hasStatus(UserStatus status) {
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }
    
    public static Specification<User> usernameContains(String keyword) {
        return (root, query, cb) -> cb.like(root.get("username"), "%" + keyword + "%");
    }
    
    public static Specification<User> createdAfter(LocalDateTime date) {
        return (root, query, cb) -> cb.greaterThan(root.get("createdAt"), date);
    }
}

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> search(UserStatus status, String keyword, LocalDateTime date) {
        Specification<User> spec = Specification
            .where(UserSpecifications.hasStatus(status))
            .and(UserSpecifications.usernameContains(keyword))
            .and(UserSpecifications.createdAfter(date));
        
        return userRepository.findAll(spec);
    }
}
```

---

## 六、实体生命周期

### 6.1 生命周期回调

```java
@Entity
@EntityListeners(AuditingEntityListener.class)
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
    
    @PostPersist
    public void postPersist() {
        System.out.println("User created: " + id);
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    @PostUpdate
    public void postUpdate() {
        System.out.println("User updated: " + id);
    }
    
    @PreRemove
    public void preRemove() {
        System.out.println("About to remove user: " + id);
    }
    
    @PostRemove
    public void postRemove() {
        System.out.println("User removed: " + id);
    }
    
    @PostLoad
    public void postLoad() {
        System.out.println("User loaded: " + id);
    }
}
```

### 6.2 审计功能

```java
@Configuration
@EnableJpaAuditing
public class JpaConfig {
    
    @Bean
    public AuditorAware<String> auditorProvider() {
        return () -> {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null) {
                return Optional.of("system");
            }
            return Optional.of(auth.getName());
        };
    }
}

@Entity
@EntityListeners(AuditingEntityListener.class)
public class User {
    
    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy;
    
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedBy
    @Column(name = "updated_by")
    private String updatedBy;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
```

---

## 七、性能优化

### 7.1 N+1问题

**问题**: 查询N个用户，每个用户的订单单独查询

```java
List<User> users = userRepository.findAll();
for (User user : users) {
    List<Order> orders = user.getOrders();
}
```

**解决方案**:

```java
@EntityGraph(attributePaths = {"orders"})
List<User> findAllWithOrders();

@Query("SELECT u FROM User u LEFT JOIN FETCH u.orders")
List<User> findAllWithOrders();
```

### 7.2 批量操作

```yaml
spring:
  jpa:
    properties:
      hibernate:
        jdbc:
          batch_size: 50
        order_inserts: true
        order_updates: true
```

```java
@Service
public class UserService {
    
    @Transactional
    public void batchInsert(List<UserDTO> users) {
        for (int i = 0; i < users.size(); i++) {
            userRepository.save(users.get(i).toUser());
            if (i % 50 == 0) {
                userRepository.flush();
                entityManager.clear();
            }
        }
    }
}
```

### 7.3 只读查询优化

```java
@Service
public class UserService {
    
    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
}
```

---

## 八、最佳实践

### 8.1 实体设计原则

1. 使用延迟加载(LAZY)
2. 避免双向关联的无限递归
3. 合理使用级联操作
4. 使用嵌入式对象减少表数量
5. 为查询频繁的字段添加索引

### 8.2 Repository设计原则

1. 方法命名清晰
2. 使用@Query优化复杂查询
3. 合理使用分页
4. 使用Specification处理动态查询
5. 批量操作注意性能

### 8.3 代码示例

```java
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_username", columnList = "username"),
    @Index(name = "idx_email", columnList = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 50)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.ACTIVE;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Order> orders = new ArrayList<>();
    
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
```

---

## 九、总结

### 核心要点

1. **实体映射**: @Entity, @Table, @Column
2. **关联关系**: @OneToOne, @OneToMany, @ManyToOne, @ManyToMany
3. **Repository**: 继承JpaRepository
4. **查询方法**: 方法命名规则、@Query
5. **性能优化**: 解决N+1问题、批量操作

### 最佳实践

1. 使用延迟加载
2. 合理设置级联
3. 解决N+1问题
4. 使用审计功能
5. 批量操作优化

---

## 十、问题思考

> 完成本章学习后，请思考以下问题以检验学习效果

### 基础概念理解

1. **JPA中的实体生命周期有哪些状态？持久化上下文的作用是什么？**
   - 提示：新建、托管、游离、删除四种状态

2. **@OneToMany和@ManyToOne如何正确使用？mappedBy属性的作用是什么？**
   - 提示：思考关联关系的维护方

3. **JPA的延迟加载(LAZY)和立即加载(EAGER)有什么区别？什么情况下使用哪种？**
   - 提示：从性能和N+1问题角度分析

### 代码实践应用

4. **如何解决JPA的N+1查询问题？有哪些方案？**
   - 提示：@EntityGraph、JOIN FETCH、批量获取

5. **Repository的方法命名规则有哪些？如何定义自定义查询方法？**
   - 提示：findBy、findByAnd、findByOr、findByOrderBy等

### 综合分析

6. **JPA和MyBatis各有什么优缺点？在什么场景下选择哪种方案？**
   - 提示：从开发效率、性能、灵活性角度分析

7. **如何优化JPA的性能？请列举常见的优化策略。**
   - 提示：批量操作、二级缓存、延迟加载、索引优化

---

> **下一章预告**: [Spring Security架构](../05-security/01-spring-security.md) - 理解安全框架与认证授权机制

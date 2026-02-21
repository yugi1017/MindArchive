# Spring Security架构设计

> 理解安全架构是企业级应用的核心

---

## 一、安全架构概述

### 1.1 安全核心概念

| 概念 | 说明 |
|------|------|
| 认证(Authentication) | 确认用户身份 |
| 授权(Authorization) | 确认用户权限 |
| 主体(Principal) | 当前操作用户 |
| 凭证(Credentials) | 身份证明(密码、证书) |
| 权限(Authority) | 操作许可 |

### 1.2 Spring Security架构

```
┌─────────────────────────────────────────────────────────────┐
│                  Spring Security架构                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  HTTP请求                                                    │
│      │                                                       │
│      ▼                                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           SecurityFilterChain                        │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ SecurityContextPersistenceFilter             │   │   │
│  │  │ HeaderWriterFilter                           │   │   │
│  │  │ CsrfFilter                                   │   │   │
│  │  │ LogoutFilter                                 │   │   │
│  │  │ UsernamePasswordAuthenticationFilter         │   │   │
│  │  │ DefaultLoginPageGeneratingFilter             │   │   │
│  │  │ BasicAuthenticationFilter                    │   │   │
│  │  │ RequestCacheAwareFilter                      │   │   │
│  │  │ SecurityContextHolderAwareRequestFilter      │   │   │
│  │  │ AnonymousAuthenticationFilter                │   │   │
│  │  │ SessionManagementFilter                      │   │   │
│  │  │ ExceptionTranslationFilter                   │   │   │
│  │  │ FilterSecurityInterceptor                    │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              AuthenticationManager                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              AccessDecisionManager                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、认证机制

### 2.1 认证流程

```
┌─────────────────────────────────────────────────────────────┐
│                      认证流程                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 用户提交凭证                                             │
│      │                                                       │
│      ▼                                                       │
│  2. AuthenticationFilter创建Authentication                   │
│      │                                                       │
│      ▼                                                       │
│  3. AuthenticationManager.authenticate()                     │
│      │                                                       │
│      ▼                                                       │
│  4. ProviderManager遍历AuthenticationProvider                │
│      │                                                       │
│      ▼                                                       │
│  5. AuthenticationProvider验证                               │
│      │                                                       │
│      ├── 成功: 返回已认证的Authentication                    │
│      │                                                       │
│      └── 失败: 抛出AuthenticationException                   │
│                                                              │
│  6. SecurityContext存储Authentication                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 核心接口

```java
public interface Authentication extends Principal, Serializable {
    Collection<? extends GrantedAuthority> getAuthorities();
    Object getCredentials();
    Object getDetails();
    Object getPrincipal();
    boolean isAuthenticated();
    void setAuthenticated(boolean isAuthenticated);
}

public interface AuthenticationManager {
    Authentication authenticate(Authentication authentication) throws AuthenticationException;
}

public interface AuthenticationProvider {
    Authentication authenticate(Authentication authentication) throws AuthenticationException;
    boolean supports(Class<?> authentication);
}
```

### 2.3 表单登录配置

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/home", "/register").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .failureUrl("/login?error")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout")
                .permitAll()
            );
        
        return http.build();
    }
    
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails user = User.builder()
            .username("user")
            .password(passwordEncoder.encode("password"))
            .roles("USER")
            .build();
        
        UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder.encode("admin"))
            .roles("ADMIN")
            .build();
        
        return new InMemoryUserDetailsManager(user, admin);
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

### 2.4 自定义UserDetailsService

```java
@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            user.isEnabled(),
            true, true, true,
            getAuthorities(user.getRoles())
        );
    }
    
    private Collection<? extends GrantedAuthority> getAuthorities(Set<Role> roles) {
        return roles.stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
            .collect(Collectors.toList());
    }
}
```

---

## 三、JWT认证

### 3.1 JWT结构

```
JWT = Header.Payload.Signature

Header:
{
    "alg": "HS256",
    "typ": "JWT"
}

Payload:
{
    "sub": "user123",
    "name": "John Doe",
    "iat": 1516239022,
    "exp": 1516242622
}

Signature:
HMACSHA256(
    base64UrlEncode(header) + "." + base64UrlEncode(payload),
    secret
)
```

### 3.2 JWT配置

```java
@Configuration
@EnableWebSecurity
public class JwtSecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        String token = getTokenFromRequest(request);
        
        if (token != null && tokenProvider.validateToken(token)) {
            String username = tokenProvider.getUsernameFromToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}

@Component
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private long expiration;
    
    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);
        
        return Jwts.builder()
            .setSubject(userPrincipal.getId().toString())
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }
    
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();
        
        return claims.getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
```

---

## 四、授权机制

### 4.1 授权流程

```
┌─────────────────────────────────────────────────────────────┐
│                      授权流程                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 请求到达FilterSecurityInterceptor                        │
│      │                                                       │
│      ▼                                                       │
│  2. 获取SecurityContext中的Authentication                    │
│      │                                                       │
│      ▼                                                       │
│  3. 获取请求的ConfigAttribute(权限要求)                      │
│      │                                                       │
│      ▼                                                       │
│  4. AccessDecisionManager.decide()                           │
│      │                                                       │
│      ├── AffirmativeBased: 一票通过                          │
│      ├── ConsensusBased: 多数通过                            │
│      └── UnanimousBased: 一票否决                            │
│                                                              │
│  5. AccessDecisionVoter投票                                   │
│      │                                                       │
│      ├── ACCESS_GRANTED: 同意                                │
│      ├── ACCESS_DENIED: 反对                                 │
│      └── ACCESS_ABSTAIN: 弃权                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 方法级安全

```java
@Configuration
@EnableMethodSecurity
public class MethodSecurityConfig {
}

@Service
public class UserService {
    
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostAuthorize("returnObject.status == 'ACTIVE'")
    public User activateUser(Long id) {
        return userRepository.findById(id)
            .map(user -> {
                user.setStatus(UserStatus.ACTIVE);
                return userRepository.save(user);
            })
            .orElse(null);
    }
    
    @PreFilter("filterObject.owner == authentication.name")
    public void deleteOrders(List<Order> orders) {
        orderRepository.deleteAll(orders);
    }
    
    @PostFilter("filterObject.owner == authentication.name")
    public List<Order> getMyOrders() {
        return orderRepository.findAll();
    }
}
```

### 4.3 自定义权限表达式

```java
@Component
public class CustomSecurityExpression {
    
    @Autowired
    private UserRepository userRepository;
    
    public boolean isOwner(Long resourceId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.isOwner(username, resourceId);
    }
    
    public boolean hasPermission(String resource, String action) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals(resource + ":" + action));
    }
}

@Service
public class ResourceService {
    
    @PreAuthorize("@customSecurityExpression.isOwner(#resourceId)")
    public Resource getResource(Long resourceId) {
        return resourceRepository.findById(resourceId).orElse(null);
    }
    
    @PreAuthorize("@customSecurityExpression.hasPermission('document', 'read')")
    public Document getDocument(Long documentId) {
        return documentRepository.findById(documentId).orElse(null);
    }
}
```

---

## 五、CSRF防护

### 5.1 CSRF原理

```
CSRF攻击流程:
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  1. 用户登录正常网站A                                         │
│      │                                                       │
│      ▼                                                       │
│  2. 用户访问恶意网站B                                         │
│      │                                                       │
│      ▼                                                       │
│  3. 恶意网站B向网站A发送请求                                   │
│      │   (携带用户在A的Cookie)                               │
│      ▼                                                       │
│  4. 网站A误认为是用户请求                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘

CSRF防护:
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  1. 服务器生成CSRF Token                                     │
│      │                                                       │
│      ▼                                                       │
│  2. Token存储在Session中，返回给前端                          │
│      │                                                       │
│      ▼                                                       │
│  3. 前端请求携带Token                                         │
│      │                                                       │
│      ▼                                                       │
│  4. 服务器验证Token                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 CSRF配置

```java
@Configuration
@EnableWebSecurity
public class CsrfSecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            );
        
        return http.build();
    }
}
```

### 5.3 REST API禁用CSRF

```java
@Configuration
@EnableWebSecurity
public class RestSecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        
        return http.build();
    }
}
```

---

## 六、CORS配置

### 6.1 CORS配置

```java
@Configuration
@EnableWebSecurity
public class CorsSecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()));
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}
```

---

## 七、最佳实践

### 7.1 安全配置清单

- [ ] 使用HTTPS
- [ ] 密码加密存储
- [ ] 防止SQL注入
- [ ] 防止XSS攻击
- [ ] CSRF防护
- [ ] 会话管理
- [ ] 权限最小化
- [ ] 敏感数据加密
- [ ] 日志脱敏
- [ ] 安全响应头

### 7.2 安全响应头

```java
@Configuration
@EnableWebSecurity
public class HeaderSecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers(headers -> headers
                .contentSecurityPolicy(csp -> csp.policyDirectives("default-src 'self'"))
                .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                .httpStrictTransportSecurity(hsts -> hsts
                    .includeSubDomains(true)
                    .maxAgeInSeconds(31536000)
                )
                .xssProtection(xss -> xss.headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
            );
        
        return http.build();
    }
}
```

---

## 八、总结

### 核心要点

1. **认证**: 确认用户身份
2. **授权**: 确认用户权限
3. **过滤器链**: 请求安全处理
4. **JWT**: 无状态认证
5. **方法安全**: 细粒度权限控制

### 最佳实践

1. 使用强密码加密
2. 实施最小权限原则
3. 保护敏感端点
4. 启用安全响应头
5. 定期安全审计

---

## 九、问题思考

> 完成本章学习后，请思考以下问题以检验学习效果

### 基础概念理解

1. **Spring Security的认证流程是怎样的？核心组件有哪些？**
   - 提示：AuthenticationManager、Provider、UserDetailsService

2. **认证(Authentication)和授权(Authorization)有什么区别？**
   - 提示：从"你是谁"和"你能做什么"角度分析

3. **JWT的工作原理是什么？它和Session认证有什么区别？**
   - 提示：无状态、可扩展性、安全性

### 代码实践应用

4. **如何在Spring Boot中集成JWT认证？请写出核心配置代码。**
   - 提示：JwtTokenFilter、JwtTokenProvider、SecurityConfig

5. **如何实现基于角色的访问控制(RBAC)？**
   - 提示：@PreAuthorize、hasRole、hasAuthority

### 综合分析

6. **CSRF攻击是什么？Spring Security如何防护？为什么REST API通常禁用CSRF？**
   - 提示：从Cookie、SameSite、Token角度分析

7. **OAuth2的工作流程是怎样的？如何在Spring Boot中集成OAuth2？**
   - 提示：授权码模式、客户端模式、Spring Security OAuth2

---

> **下一阶段预告**: [微服务架构设计](../07-microservice/01-microservice-design.md) - 进入实战篇，学习微服务架构设计

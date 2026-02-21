# Spring Boot 常用命令速查表

> 快速查阅常用命令

---

## 一、Maven命令

### 项目构建

```bash
mvn clean                    # 清理构建目录
mvn compile                  # 编译源代码
mvn test                     # 运行测试
mvn package                  # 打包项目
mvn install                  # 安装到本地仓库
mvn clean package -DskipTests  # 跳过测试打包
```

### Spring Boot特定

```bash
mvn spring-boot:run          # 运行Spring Boot应用
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### 依赖管理

```bash
mvn dependency:tree          # 查看依赖树
mvn dependency:analyze       # 分析依赖
mvn dependency:resolve       # 解析依赖
mvn dependency:purge-local-repository  # 清理本地依赖
```

### 代码生成

```bash
mvn archetype:generate -DgroupId=com.example -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

---

## 二、Gradle命令

### 项目构建

```bash
gradle clean                 # 清理构建目录
gradle build                 # 构建项目
gradle test                  # 运行测试
gradle assemble              # 打包
gradle bootJar               # 生成可执行JAR
gradle bootRun               # 运行应用
```

### 依赖管理

```bash
gradle dependencies          # 查看依赖
gradle dependencyInsight --dependency <name>  # 依赖详情
```

---

## 三、运行JAR

### 基本运行

```bash
java -jar app.jar
java -jar app.jar --server.port=8081
java -jar app.jar --spring.profiles.active=dev
```

### JVM参数

```bash
java -Xms512m -Xmx2g -jar app.jar
java -XX:+UseG1GC -jar app.jar
java -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -jar app.jar
```

### 调试模式

```bash
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -jar app.jar
java -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005 -jar app.jar
```

### 后台运行

```bash
nohup java -jar app.jar > app.log 2>&1 &
nohup java -jar app.jar --spring.profiles.active=prod > /dev/null 2>&1 &
```

---

## 四、Docker命令

### 构建镜像

```bash
docker build -t myapp:latest .
docker build -t myapp:1.0.0 -t myapp:latest .
docker build --no-cache -t myapp:latest .
```

### 运行容器

```bash
docker run -d -p 8080:8080 --name myapp myapp:latest
docker run -d -p 8080:8080 -e SPRING_PROFILES_ACTIVE=prod myapp:latest
docker run -d -p 8080:8080 -v /data/logs:/logs myapp:latest
docker run -d -p 8080:8080 --network host myapp:latest
```

### 容器管理

```bash
docker ps                    # 查看运行中的容器
docker ps -a                 # 查看所有容器
docker logs myapp            # 查看日志
docker logs -f myapp         # 实时查看日志
docker exec -it myapp /bin/sh  # 进入容器
docker stop myapp            # 停止容器
docker rm myapp              # 删除容器
docker rmi myapp:latest      # 删除镜像
```

### Docker Compose

```bash
docker-compose up -d         # 启动服务
docker-compose down          # 停止服务
docker-compose logs -f       # 查看日志
docker-compose ps            # 查看状态
docker-compose restart       # 重启服务
```

---

## 五、Kubernetes命令

### 部署管理

```bash
kubectl apply -f deployment.yaml
kubectl get deployments
kubectl get pods
kubectl get services
kubectl logs <pod-name>
kubectl logs -f <pod-name>
kubectl exec -it <pod-name> -- /bin/sh
```

### 扩缩容

```bash
kubectl scale deployment myapp --replicas=3
kubectl autoscale deployment myapp --min=2 --max=10 --cpu-percent=80
```

---

## 六、数据库命令

### MySQL

```bash
mysql -h localhost -u root -p
mysql -u root -p mydb < backup.sql
mysqldump -u root -p mydb > backup.sql
mysqldump -u root -p mydb table1 table2 > tables.sql
```

### PostgreSQL

```bash
psql -h localhost -U postgres -d mydb
pg_dump -U postgres mydb > backup.sql
psql -U postgres mydb < backup.sql
```

### Redis

```bash
redis-cli
redis-cli -h localhost -p 6379
redis-cli ping
redis-cli info
redis-cli monitor
redis-cli FLUSHALL
```

---

## 七、端口与进程

### 查看端口占用

```bash
netstat -ano | findstr :8080
netstat -tlnp | grep 8080    # Linux
lsof -i :8080                # Linux/Mac
```

### 终止进程

```bash
taskkill /PID <pid> /F       # Windows
kill -9 <pid>                # Linux/Mac
```

---

## 八、日志查看

### Linux

```bash
tail -f /var/log/app.log     # 实时查看
tail -n 100 /var/log/app.log # 查看最后100行
head -n 100 /var/log/app.log # 查看前100行
grep "ERROR" /var/log/app.log  # 搜索错误
grep -A 5 "ERROR" /var/log/app.log  # 显示匹配行及后5行
cat /var/log/app.log | grep "ERROR" | wc -l  # 统计错误数
```

### Windows PowerShell

```powershell
Get-Content app.log -Tail 100 -Wait
Select-String -Path app.log -Pattern "ERROR"
```

---

## 九、性能监控

### JVM监控

```bash
jps                         # 查看Java进程
jstat -gc <pid> 1000        # GC统计
jstat -gcutil <pid> 1000    # GC利用率
jmap -heap <pid>            # 堆信息
jmap -histo <pid> | head -20  # 对象统计
jstack <pid> > thread.txt   # 线程转储
jcmd <pid> VM.flags         # JVM参数
jcmd <pid> GC.heap_info     # 堆信息
```

### 内存分析

```bash
jmap -dump:format=b,file=heap.hprof <pid>  # 生成堆转储
```

---

## 十、网络测试

### HTTP请求

```bash
curl http://localhost:8080/api/users
curl -X POST -H "Content-Type: application/json" -d '{"name":"test"}' http://localhost:8080/api/users
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/users
curl -I http://localhost:8080/api/users  # 只获取响应头
```

### 健康检查

```bash
curl http://localhost:8080/actuator/health
curl http://localhost:8080/actuator/info
curl http://localhost:8080/actuator/metrics
```

### 端口测试

```bash
telnet localhost 8080
nc -zv localhost 8080       # Linux/Mac
```

---

## 十一、Git命令

### 常用操作

```bash
git status
git add .
git commit -m "message"
git push origin main
git pull origin main
git clone <url>
```

### 分支管理

```bash
git branch
git branch feature/new-feature
git checkout feature/new-feature
git checkout -b feature/new-feature
git merge feature/new-feature
git branch -d feature/new-feature
```

### 标签管理

```bash
git tag v1.0.0
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
git push origin --tags
```

---

## 十二、Spring Boot CLI

### 安装后可用

```bash
spring run app.groovy
spring run -- --server.port=8081
spring init --dependencies=web,data-jpa myproject
spring jar myapp.jar app.groovy
```

---

## 十三、常用组合命令

### 完整部署流程

```bash
mvn clean package -DskipTests
docker build -t myapp:latest .
docker stop myapp-container 2>/dev/null || true
docker rm myapp-container 2>/dev/null || true
docker run -d -p 8080:8080 --name myapp-container myapp:latest
docker logs -f myapp-container
```

### 快速本地测试

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### 生产环境启动

```bash
java -Xms1g -Xmx2g \
     -XX:+UseG1GC \
     -XX:MaxGCPauseMillis=200 \
     -Dspring.profiles.active=prod \
     -Djava.security.egd=file:/dev/./urandom \
     -jar app.jar
```

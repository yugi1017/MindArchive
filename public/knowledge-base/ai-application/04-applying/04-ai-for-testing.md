# 第17章 软件测试场景

> 测试工程师如何用AI：用例设计、自动化脚本、缺陷分析、测试报告，附完整案例和实操步骤

## 本章使用指南

本章提供测试工程师日常工作的AI实战方法，每个场景都有：
- 完整的操作步骤
- 可直接复制的Prompt模板
- 真实案例和效果

---

## 一、用例设计

### 用例自动生成实战

**场景**：需要为新功能设计测试用例

**操作步骤**：

**第一步：输入需求描述**
```
需求：用户登录功能
- 支持手机号+验证码登录
- 支持账号密码登录
- 支持第三方登录（微信、QQ）
- 登录失败3次后需要验证码

请帮我生成完整的测试用例，包含：
1. 正常场景
2. 异常场景
3. 边界条件
4. 安全测试
5. 性能测试
```

**AI输出示例**：
```
## 一、正常场景

| 用例ID | 用例名称 | 前置条件 | 测试步骤 | 预期结果 |
|--------|----------|----------|----------|----------|
| TC001 | 手机号验证码登录-正常 | 已注册手机号 | 1.输入手机号 2.获取验证码 3.输入验证码 4.点击登录 | 登录成功，跳转首页 |
| TC002 | 账号密码登录-正常 | 已注册账号 | 1.输入账号 2.输入密码 3.点击登录 | 登录成功，跳转首页 |
| TC003 | 微信登录-正常 | 已绑定微信 | 1.点击微信登录 2.授权 3.确认登录 | 登录成功，跳转首页 |
| TC004 | QQ登录-正常 | 已绑定QQ | 1.点击QQ登录 2.授权 3.确认登录 | 登录成功，跳转首页 |

## 二、异常场景

| 用例ID | 用例名称 | 测试步骤 | 预期结果 |
|--------|----------|----------|----------|
| TC005 | 手机号未注册 | 输入未注册手机号，获取验证码 | 提示"手机号未注册" |
| TC006 | 验证码错误 | 输入错误验证码 | 提示"验证码错误" |
| TC007 | 验证码过期 | 输入过期验证码 | 提示"验证码已过期" |
| TC008 | 密码错误 | 输入错误密码 | 提示"密码错误" |
| TC009 | 连续错误3次 | 连续输入错误密码3次 | 出现验证码验证 |
| TC010 | 账号不存在 | 输入未注册账号 | 提示"账号不存在" |

## 三、边界条件

| 用例ID | 用例名称 | 测试步骤 | 预期结果 |
|--------|----------|----------|----------|
| TC011 | 手机号为空 | 不输入手机号，点击获取验证码 | 提示"请输入手机号" |
| TC012 | 手机号格式错误 | 输入非手机号格式 | 提示"手机号格式错误" |
| TC013 | 手机号11位边界 | 输入10位/12位手机号 | 提示"手机号格式错误" |
| TC014 | 密码为空 | 不输入密码，点击登录 | 提示"请输入密码" |
| TC015 | 密码长度边界 | 输入5位/21位密码 | 提示"密码长度6-20位" |

## 四、安全测试

| 用例ID | 用例名称 | 测试步骤 | 预期结果 |
|--------|----------|----------|----------|
| TC016 | SQL注入 | 账号输入 ' or 1=1 -- | 系统正确处理，不泄露数据 |
| TC017 | XSS攻击 | 输入 <script>alert(1)</script> | 系统正确转义 |
| TC018 | 暴力破解 | 连续尝试100次错误密码 | 账号被锁定 |
| TC019 | 验证码绕过 | 不输入验证码直接提交 | 请求被拒绝 |

## 五、性能测试

| 用例ID | 用例名称 | 测试条件 | 预期结果 |
|--------|----------|----------|----------|
| TC020 | 登录响应时间 | 单用户登录 | 响应时间<1秒 |
| TC021 | 并发登录 | 100用户同时登录 | 成功率>99% |
| TC022 | 验证码获取 | 单用户获取验证码 | 响应时间<3秒 |
```

### 用例评审与优化

**场景**：已有测试用例，需要评审和优化

**操作步骤**：
```
以下是测试用例：
[粘贴用例]

请帮我评审：
1. 覆盖是否完整？遗漏了哪些场景？
2. 用例是否可执行？步骤是否清晰？
3. 预期结果是否明确？
4. 是否有冗余或重复？
5. 优化建议
```

---

## 二、自动化脚本生成

### Python+Selenium脚本生成

**场景**：需要生成自动化测试脚本

**操作步骤**：
```
请根据以下测试用例生成自动化脚本：
用例：用户登录功能
- 输入账号：testuser
- 输入密码：password123
- 点击登录按钮
- 验证登录成功

技术栈：Python + Selenium + pytest
要求：
1. 使用Page Object模式
2. 添加断言
3. 添加注释
```

**AI输出示例**：
```python
# test_login.py
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class LoginPage:
    """登录页面"""
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://example.com/login"
        
        # 页面元素定位器
        self.username_input = (By.ID, "username")
        self.password_input = (By.ID, "password")
        self.login_button = (By.ID, "login-btn")
        self.success_message = (By.CLASS_NAME, "success-msg")
    
    def open(self):
        """打开登录页面"""
        self.driver.get(self.url)
    
    def login(self, username, password):
        """执行登录操作"""
        self.driver.find_element(*self.username_input).send_keys(username)
        self.driver.find_element(*self.password_input).send_keys(password)
        self.driver.find_element(*self.login_button).click()
    
    def is_login_success(self):
        """验证登录是否成功"""
        try:
            element = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located(self.success_message)
            )
            return True
        except:
            return False


class TestLogin:
    """登录测试类"""
    
    def setup_method(self):
        """测试前置：初始化浏览器"""
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.login_page = LoginPage(self.driver)
    
    def teardown_method(self):
        """测试后置：关闭浏览器"""
        self.driver.quit()
    
    def test_login_success(self):
        """测试正常登录"""
        # 打开登录页面
        self.login_page.open()
        
        # 执行登录
        self.login_page.login("testuser", "password123")
        
        # 验证登录成功
        assert self.login_page.is_login_success(), "登录失败"
    
    def test_login_wrong_password(self):
        """测试密码错误"""
        self.login_page.open()
        self.login_page.login("testuser", "wrongpassword")
        
        # 验证错误提示
        error_msg = self.driver.find_element(By.CLASS_NAME, "error-msg").text
        assert "密码错误" in error_msg


if __name__ == "__main__":
    pytest.main(["-v", "test_login.py"])
```

### 测试数据生成

**场景**：需要生成测试数据

**操作步骤**：
```
请生成测试数据：
类型：用户注册数据
数量：10条
字段：
- 用户名：6-12位字母数字
- 密码：8-16位，包含字母数字
- 手机号：11位有效手机号
- 邮箱：有效邮箱格式

输出格式：JSON
```

---

## 三、缺陷分析

### 缺陷报告生成

**场景**：发现Bug，需要写缺陷报告

**操作步骤**：
```
缺陷信息：
- 功能：用户登录
- 问题：连续登录失败3次后，验证码不出现
- 环境：iOS 16, iPhone 14
- 重现步骤：连续输入错误密码3次

请帮我生成标准的缺陷报告，包含：
1. 缺陷标题
2. 严重程度
3. 重现步骤
4. 预期结果
5. 实际结果
6. 可能原因
7. 建议优先级
```

### 批量缺陷分析

**场景**：需要分析一批缺陷

**操作步骤**：
```
以下是本周缺陷列表：
[粘贴缺陷列表]

请帮我分析：
1. 按模块分类统计
2. 按严重程度统计
3. 找出高频问题
4. 分析可能的原因
5. 给出改进建议
```

---

## 四、测试报告生成

### 测试报告模板

**场景**：需要生成测试报告

**操作步骤**：
```
测试周期：2026年2月15日 - 2026年2月21日
测试范围：用户模块、订单模块
测试结果：
- 用例总数：100
- 通过：85
- 失败：10
- 阻塞：5

缺陷统计：
- 致命：0
- 严重：2
- 一般：8
- 轻微：5

请帮我生成测试报告，包含：
1. 测试概述
2. 测试结果统计
3. 缺陷分析
4. 风险评估
5. 建议
```

**AI输出示例**：
```markdown
# 测试报告

## 1. 测试概述
- 测试周期：2026年2月15日 - 2026年2月21日
- 测试范围：用户模块、订单模块
- 测试人员：张三

## 2. 测试结果统计

### 2.1 用例执行情况
| 指标 | 数量 | 占比 |
|------|------|------|
| 用例总数 | 100 | 100% |
| 通过 | 85 | 85% |
| 失败 | 10 | 10% |
| 阻塞 | 5 | 5% |

### 2.2 缺陷统计
| 严重程度 | 数量 | 占比 |
|----------|------|------|
| 致命 | 0 | 0% |
| 严重 | 2 | 13% |
| 一般 | 8 | 53% |
| 轻微 | 5 | 33% |

## 3. 缺陷分析

### 3.1 模块分布
| 模块 | 缺陷数 | 占比 |
|------|--------|------|
| 用户模块 | 6 | 40% |
| 订单模块 | 9 | 60% |

### 3.2 高频问题
1. 订单支付超时（3次）
2. 用户登录失败（2次）

## 4. 风险评估

### 高风险项
- 订单支付功能存在性能问题，可能导致用户流失

### 中风险项
- 用户登录偶现失败，影响用户体验

## 5. 建议

### 优先处理
1. 修复订单支付超时问题
2. 排查用户登录失败原因

### 后续优化
1. 增加订单模块测试用例
2. 完善异常场景覆盖
```

---

## 五、性能测试辅助

### 性能测试场景设计

**场景**：需要设计性能测试场景

**操作步骤**：
```
系统信息：
- 类型：电商App
- 日活：10万
- 核心功能：商品浏览、下单、支付

请帮我设计性能测试场景：
1. 单接口性能测试
2. 混合场景测试
3. 压力测试
4. 稳定性测试

包含：
- 并发用户数
- 测试时长
- 通过标准
```

### 性能报告分析

**场景**：需要分析性能测试结果

**操作步骤**：
```
以下是性能测试结果：
- 平均响应时间：500ms
- 最大响应时间：3s
- TPS：1000
- 错误率：0.5%
- CPU使用率：80%
- 内存使用率：70%

请帮我分析：
1. 性能是否达标？
2. 瓶颈在哪里？
3. 优化建议
```

---

## 六、测试工程师AI工具推荐

| 场景 | 推荐工具 | 使用方法 |
|------|----------|----------|
| 用例生成 | 豆包、DeepSeek | 生成完整用例 |
| 脚本生成 | DeepSeek、Claude | 生成自动化脚本 |
| 缺陷分析 | 豆包 | 分析缺陷原因 |
| 报告生成 | 豆包、Kimi | 生成测试报告 |
| 视觉测试 | Applitools | UI对比测试 |

---

## 七、实战案例

### 案例1：新功能测试用例设计

**背景**：新开发购物车功能，需要设计测试用例

**过程**：
1. 输入需求描述给AI
2. AI生成100+条用例
3. 人工审核筛选
4. 补充遗漏场景

**效果**：
- 用例设计时间：从1天缩短到1小时
- 用例覆盖度：从80%提升到95%

### 案例2：自动化脚本批量生成

**背景**：需要为50个接口生成自动化脚本

**过程**：
1. 整理接口文档
2. 批量生成脚本框架
3. 补充断言和数据
4. 调试运行

**效果**：
- 脚本编写时间：从1周缩短到1天
- 代码质量：统一规范

---

## 进阶技巧：用Skills实现测试自动化

> **更高门槛，更大收益**：Skills让测试工程师从"AI辅助生成"升级为"自动化执行"。

### 对话方式 vs Skills方式

| 场景 | 对话方式 | Skills方式 | 收益 |
|------|----------|-----------|------|
| 测试用例生成 | 手动复制粘贴 | 自动生成并保存 | 效率提升10倍 |
| 接口测试 | 手动编写脚本 | 自动生成可执行脚本 | 可直接运行 |
| 测试报告 | 手动整理数据 | 自动汇总生成 | 格式统一 |
| 回归测试 | 手动执行用例 | 自动化执行+报告 | 无人值守 |

### 测试工程师专用Skills推荐

| Skill | 功能 | 安装方式 |
|-------|------|----------|
| test-case-generator | 自动生成完整测试用例 | `npx skills add community/test-case-generator` |
| api-test-generator | 生成Postman/JMeter脚本 | `npx skills add community/api-test-generator` |
| test-report-generator | 自动生成测试报告 | `npx skills add community/test-report-generator` |
| selenium-recorder | 自动录制测试脚本 | `npx skills add community/selenium-recorder` |

### 实战案例：用Skills生成可执行测试脚本

**传统方式**：
```
场景：需要为登录接口生成自动化测试

1. 编写测试用例
2. 手动编写Python/Java脚本
3. 配置测试框架
4. 调试脚本
5. 执行测试
预计耗时：半天
```

**Skills方式**：
```bash
# 安装Skill
npx skills add community/api-test-generator

# 使用
"用api-test-generator为登录接口生成pytest脚本，包含正常和异常场景"
```

**输出内容**：
```python
# test_login.py - 可直接执行的测试脚本
import pytest
import requests

def test_login_success():
    """正常登录测试"""
    response = requests.post('/api/login', json={
        'username': 'testuser',
        'password': 'password123'
    })
    assert response.status_code == 200
    assert 'token' in response.json()

def test_login_wrong_password():
    """密码错误测试"""
    response = requests.post('/api/login', json={
        'username': 'testuser',
        'password': 'wrongpassword'
    })
    assert response.status_code == 401

# ... 更多测试用例
```

### 实战案例：用Skills自动执行回归测试

**传统方式**：
```
1. 手动运行测试脚本
2. 等待执行完成
3. 查看结果
4. 整理报告
5. 发送给团队
```

**Skills方式**：
```bash
# 安装Skill
npx skills add community/test-report-generator

# 使用
"用test-report-generator执行回归测试，生成报告并发送到团队群"
```

**效果对比**：
- 执行：自动运行所有测试
- 报告：自动生成HTML报告
- 通知：自动发送到企业微信/钉钉
- 时间：从人工操作到无人值守

### Skills的门槛与收益

| 门槛 | 说明 | 收益 |
|------|------|------|
| 需要本地环境 | Python/Node.js | 可直接执行脚本 |
| 需要理解测试框架 | pytest/JMeter等 | 脚本可直接集成到CI/CD |
| 需要命令行操作 | 非图形界面 | 可自动化批量执行 |

**适合人群**：需要频繁执行重复测试、追求自动化的测试工程师

---

## 下一步

现在你了解了测试工程师如何用AI，接下来：

- **第18章**：其他工作场景——更多岗位的AI应用

---

> 💡 **核心建议**：AI能帮你快速生成测试用例和脚本，但测试思维和判断力是AI无法替代的。用AI提升效率，把精力放在更有价值的测试设计上。进阶用户可以尝试Skills，实现测试自动化执行。

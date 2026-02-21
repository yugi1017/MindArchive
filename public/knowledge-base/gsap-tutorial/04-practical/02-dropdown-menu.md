# 案例2：下拉导航菜单

> 创建平滑展开的下拉导航菜单动画

## 效果预览

```text
┌─────────────┐
│  菜单 ▼     │
└─────────────┘
       ↓ 点击展开
┌─────────────┐
│  菜单 ▲     │
├─────────────┤
│  选项 1     │
│  选项 2     │
│  选项 3     │
└─────────────┘
```

## 应用场景

- 网站主导航
- 用户菜单
- 设置面板

## 完整代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>下拉导航菜单</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      min-height: 100vh;
      background: #1a1a2e;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      padding: 50px;
    }
    
    .nav {
      display: flex;
      gap: 20px;
    }
    
    .dropdown {
      position: relative;
    }
    
    .dropdown-trigger {
      padding: 12px 20px;
      background: #16213e;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      transition: background 0.2s;
    }
    
    .dropdown-trigger:hover {
      background: #1f2b47;
    }
    
    .arrow {
      transition: transform 0.3s;
    }
    
    .dropdown-menu {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      min-width: 200px;
      background: #16213e;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }
    
    .dropdown-item {
      padding: 12px 20px;
      color: #ccc;
      cursor: pointer;
      transition: all 0.2s;
      border-bottom: 1px solid #2d3748;
    }
    
    .dropdown-item:last-child {
      border-bottom: none;
    }
    
    .dropdown-item:hover {
      background: #1f2b47;
      color: #fff;
      padding-left: 25px;
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="dropdown" id="dropdown1">
      <button class="dropdown-trigger">
        产品
        <span class="arrow">▼</span>
      </button>
      <div class="dropdown-menu">
        <div class="dropdown-item">产品特性</div>
        <div class="dropdown-item">定价方案</div>
        <div class="dropdown-item">案例展示</div>
        <div class="dropdown-item">更新日志</div>
      </div>
    </div>
    
    <div class="dropdown" id="dropdown2">
      <button class="dropdown-trigger">
        资源
        <span class="arrow">▼</span>
      </button>
      <div class="dropdown-menu">
        <div class="dropdown-item">文档中心</div>
        <div class="dropdown-item">API参考</div>
        <div class="dropdown-item">视频教程</div>
      </div>
    </div>
  </nav>

  <script>
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      const menu = dropdown.querySelector('.dropdown-menu');
      const arrow = dropdown.querySelector('.arrow');
      const items = dropdown.querySelectorAll('.dropdown-item');
      
      let isOpen = false;
      
      gsap.set(menu, { 
        height: 0, 
        opacity: 0,
        display: 'none'
      });
      
      const tl = gsap.timeline({ paused: true, reversed: true });
      
      tl.set(menu, { display: 'block' })
        .to(menu, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
        .to(arrow, {
          rotation: 180,
          duration: 0.3
        }, 0)
        .from(items, {
          y: -10,
          opacity: 0,
          stagger: 0.05,
          duration: 0.2
        }, 0.1);
      
      trigger.addEventListener('click', () => {
        if (isOpen) {
          tl.reverse();
        } else {
          tl.play();
        }
        isOpen = !isOpen;
      });
      
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && isOpen) {
          tl.reverse();
          isOpen = false;
        }
      });
    });
  </script>
</body>
</html>
```

## 代码解析

### 动画序列

1. **设置初始状态**：菜单高度为0，透明度为0
2. **展开动画**：高度从0到auto，透明度从0到1
3. **箭头旋转**：旋转180度表示展开状态
4. **项目交错**：菜单项依次淡入

### 关键技术点

```javascript
// 高度动画需要设置为auto才能适应内容
.to(menu, {
  height: 'auto',
  duration: 0.3
})

// 交错动画让菜单项依次出现
.from(items, {
  y: -10,
  opacity: 0,
  stagger: 0.05
})
```

### 点击外部关闭

```javascript
document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target) && isOpen) {
    tl.reverse();
    isOpen = false;
  }
});
```

---

> **下一个案例**：[导航指示器](./03-nav-indicator.md)

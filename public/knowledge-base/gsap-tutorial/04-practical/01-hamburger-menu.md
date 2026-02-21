# 案例1：汉堡菜单动画

> 创建流畅的汉堡菜单到关闭按钮的变形动画

## 效果预览

```text
汉堡状态          →          关闭状态
════════                    ╲ ╱
════════         →           ╳
════════                    ╱ ╲
```

## 应用场景

- 移动端导航菜单
- 全屏菜单触发按钮
- 侧边栏开关

## 完整代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>汉堡菜单动画</title>
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
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .hamburger {
      width: 50px;
      height: 50px;
      background: #16213e;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .hamburger:hover {
      background: #1f2b47;
    }
    
    .line {
      width: 24px;
      height: 3px;
      background: #fff;
      border-radius: 2px;
      transform-origin: center;
    }
    
    .menu-text {
      margin-top: 20px;
      color: #888;
      font-family: sans-serif;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div style="text-align: center;">
    <div class="hamburger" id="hamburger">
      <div class="line" id="line1"></div>
      <div class="line" id="line2"></div>
      <div class="line" id="line3"></div>
    </div>
    <p class="menu-text">点击切换状态</p>
  </div>

  <script>
    const hamburger = document.getElementById('hamburger');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    
    let isOpen = false;
    
    const tl = gsap.timeline({ paused: true, reversed: true });
    
    tl.to(line2, {
      opacity: 0,
      scale: 0,
      duration: 0.2
    })
    .to(line1, {
      y: 9,
      rotation: 45,
      duration: 0.3
    }, 0)
    .to(line3, {
      y: -9,
      rotation: -45,
      duration: 0.3
    }, 0);
    
    hamburger.addEventListener('click', () => {
      if (isOpen) {
        tl.reverse();
      } else {
        tl.play();
      }
      isOpen = !isOpen;
    });
  </script>
</body>
</html>
```

## 代码解析

### HTML结构

```html
<div class="hamburger">
  <div class="line"></div>  <!-- 上线 -->
  <div class="line"></div>  <!-- 中线 -->
  <div class="line"></div>  <!-- 下线 -->
</div>
```

### 动画逻辑

1. **中线消失**：使用opacity和scale让中间线淡出缩小
2. **上线变形**：向下移动并旋转45度
3. **下线变形**：向上移动并旋转-45度

### 关键参数

| 参数 | 说明 |
|------|------|
| `y: 9` | 垂直移动距离（等于线间距+线高度） |
| `rotation: 45` | 旋转角度 |
| `duration: 0.3` | 动画时长 |

## 变体效果

### 圆形变形

```javascript
tl.to(hamburger, {
  borderRadius: "50%",
  duration: 0.3
}, 0);
```

### 颜色变化

```javascript
tl.to(".line", {
  backgroundColor: "#e74c3c",
  duration: 0.3
}, 0);
```

---

> **下一个案例**：[下拉导航菜单](./02-dropdown-menu.md)

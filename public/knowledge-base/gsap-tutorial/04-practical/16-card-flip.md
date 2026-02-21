# 案例16：卡片翻转

> 创建3D卡片翻转效果，展示正面和背面内容

## 效果预览

```text
正面                翻转中                背面
┌─────────┐        ┌───┐         ┌─────────┐
│         │   →    │   │    →    │         │
│  正面   │        │   │         │  背面   │
│         │        └───┘         │         │
└─────────┘                      └─────────┘
```

## 完整代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>卡片翻转</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      perspective: 1000px;
    }
    
    .card-container {
      width: 300px;
      height: 400px;
      cursor: pointer;
    }
    
    .card {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
    }
    
    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
    }
    
    .card-front {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .card-back {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      transform: rotateY(180deg);
    }
    
    .card-icon {
      font-size: 60px;
      margin-bottom: 20px;
    }
    
    .card-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    .card-text {
      font-size: 14px;
      opacity: 0.8;
      text-align: center;
    }
    
    .hint {
      position: fixed;
      bottom: 30px;
      color: #888;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="card-container" id="card-container">
    <div class="card" id="card">
      <div class="card-face card-front">
        <div class="card-icon">🎨</div>
        <h2 class="card-title">设计服务</h2>
        <p class="card-text">专业的UI/UX设计解决方案</p>
      </div>
      <div class="card-face card-back">
        <div class="card-icon">✨</div>
        <h2 class="card-title">联系我们</h2>
        <p class="card-text">hello@example.com<br>点击返回正面</p>
      </div>
    </div>
  </div>
  
  <p class="hint">点击卡片翻转</p>

  <script>
    const card = document.getElementById('card');
    const container = document.getElementById('card-container');
    let isFlipped = false;
    
    container.addEventListener('click', () => {
      if (isFlipped) {
        gsap.to(card, {
          rotationY: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      } else {
        gsap.to(card, {
          rotationY: 180,
          duration: 0.6,
          ease: "power2.out"
        });
      }
      isFlipped = !isFlipped;
    });
    
    container.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3
      });
    });
    
    container.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3
      });
    });
  </script>
</body>
</html>
```

---

> **下一个案例**：[悬浮效果](./17-hover-effect.md)

# 案例5：骨架屏加载

> 创建优雅的骨架屏加载动画效果

## 效果预览

```text
┌─────────────────────────────────┐
│ ████████                        │
│ ████████████████                │
│ ████████████████████████        │
│                                 │
│ ████████  ████████████████████  │
│ ████████  ████████████████████  │
└─────────────────────────────────┘
     ↑ 波浪动画效果
```

## 完整代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>骨架屏加载</title>
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
      padding: 40px;
    }
    
    .skeleton-container {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .skeleton-card {
      background: #16213e;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }
    
    .skeleton-row {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .skeleton-row:last-child {
      margin-bottom: 0;
    }
    
    .skeleton-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #2d3748;
      position: relative;
      overflow: hidden;
    }
    
    .skeleton-text {
      height: 16px;
      background: #2d3748;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }
    
    .skeleton-text.short {
      width: 100px;
    }
    
    .skeleton-text.medium {
      width: 200px;
    }
    
    .skeleton-text.long {
      width: 100%;
    }
    
    .skeleton-image {
      width: 100%;
      height: 200px;
      background: #2d3748;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    }
    
    .skeleton-shine {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,0.1),
        transparent
      );
      transform: translateX(-100%);
    }
    
    .controls {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .btn {
      padding: 10px 20px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .btn:hover {
      background: #5a6fd6;
    }
  </style>
</head>
<body>
  <div class="skeleton-container">
    <div class="controls">
      <button class="btn" onclick="startLoading()">开始加载</button>
      <button class="btn" onclick="showContent()">显示内容</button>
    </div>
    
    <div class="skeleton-card" id="skeleton">
      <div class="skeleton-row">
        <div class="skeleton-avatar">
          <div class="skeleton-shine"></div>
        </div>
        <div style="flex: 1;">
          <div class="skeleton-row">
            <div class="skeleton-text short">
              <div class="skeleton-shine"></div>
            </div>
          </div>
          <div class="skeleton-row" style="margin-bottom: 0;">
            <div class="skeleton-text medium">
              <div class="skeleton-shine"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="skeleton-image">
        <div class="skeleton-shine"></div>
      </div>
      <div class="skeleton-row" style="margin-top: 15px;">
        <div class="skeleton-text long">
          <div class="skeleton-shine"></div>
        </div>
      </div>
      <div class="skeleton-row">
        <div class="skeleton-text long">
          <div class="skeleton-shine"></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const shines = document.querySelectorAll('.skeleton-shine');
    let animation;
    
    function startLoading() {
      shines.forEach((shine, i) => {
        gsap.to(shine, {
          x: '200%',
          duration: 1.5,
          repeat: -1,
          ease: 'none',
          delay: i * 0.1
        });
      });
    }
    
    function showContent() {
      shines.forEach(shine => {
        gsap.killTweensOf(shine);
      });
      
      gsap.to('#skeleton', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          document.getElementById('skeleton').innerHTML = `
            <div class="skeleton-row">
              <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">A</div>
              <div style="flex: 1;">
                <div style="font-weight: bold; color: white; margin-bottom: 5px;">用户名称</div>
                <div style="color: #888; font-size: 14px;">2小时前</div>
              </div>
            </div>
            <div style="width: 100%; height: 200px; background: linear-gradient(135deg, #f093fb, #f5576c); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">图片内容</div>
            <div style="margin-top: 15px; color: #ccc; line-height: 1.6;">
              这是一段示例内容，当数据加载完成后，骨架屏会被实际内容替换。
            </div>
          `;
          gsap.from('#skeleton', {
            opacity: 0,
            y: 20,
            duration: 0.3
          });
        }
      });
    }
    
    startLoading();
  </script>
</body>
</html>
```

---

> **下一个案例**：[进度条动画](./06-progress-bar.md)

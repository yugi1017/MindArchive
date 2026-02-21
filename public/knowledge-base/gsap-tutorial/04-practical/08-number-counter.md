# 案例8：数字滚动器

> 创建数字从0滚动到目标值的动画效果

## 效果预览

```text
   0      →     500    →    1,234
┌─────┐       ┌─────┐       ┌─────┐
│  0  │       │ 500 │       │1,234│
└─────┘       └─────┘       └─────┘
```

## 完整代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>数字滚动器</title>
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
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }
    
    .stats-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      margin-bottom: 40px;
    }
    
    @media (max-width: 768px) {
      .stats-container {
        grid-template-columns: 1fr;
        gap: 30px;
      }
    }
    
    .stat-card {
      text-align: center;
      padding: 30px;
      background: rgba(255,255,255,0.05);
      border-radius: 16px;
      backdrop-filter: blur(10px);
    }
    
    .stat-number {
      font-size: 48px;
      font-weight: bold;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .stat-label {
      color: #888;
      font-size: 14px;
      margin-top: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .controls {
      display: flex;
      gap: 10px;
    }
    
    .btn {
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: transform 0.2s;
    }
    
    .btn:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="stats-container">
    <div class="stat-card">
      <div class="stat-number" id="counter1">0</div>
      <div class="stat-label">用户数量</div>
    </div>
    <div class="stat-card">
      <div class="stat-number" id="counter2">0</div>
      <div class="stat-label">项目数量</div>
    </div>
    <div class="stat-card">
      <div class="stat-number" id="counter3">0</div>
      <div class="stat-label">下载次数</div>
    </div>
  </div>
  
  <div class="controls">
    <button class="btn" onclick="startCounters()">开始计数</button>
    <button class="btn" onclick="resetCounters()">重置</button>
  </div>

  <script>
    const counters = [
      { el: document.getElementById('counter1'), target: 12580, suffix: '' },
      { el: document.getElementById('counter2'), target: 3420, suffix: '' },
      { el: document.getElementById('counter3'), target: 89450, suffix: '' }
    ];
    
    const counterObjects = counters.map(c => ({ value: 0 }));
    
    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    function startCounters() {
      counters.forEach((counter, i) => {
        gsap.to(counterObjects[i], {
          value: counter.target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            counter.el.textContent = formatNumber(Math.round(counterObjects[i].value)) + counter.suffix;
          }
        });
      });
    }
    
    function resetCounters() {
      counters.forEach((counter, i) => {
        gsap.to(counterObjects[i], {
          value: 0,
          duration: 0.5,
          onUpdate: () => {
            counter.el.textContent = formatNumber(Math.round(counterObjects[i].value));
          }
        });
      });
    }
  </script>
</body>
</html>
```

---

> **下一个案例**：[环形进度图](./13-circle-progress.md)

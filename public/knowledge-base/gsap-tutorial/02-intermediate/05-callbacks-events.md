# 第10章 回调与事件

> 处理动画生命周期事件，实现动画与其他逻辑的联动

## 10.1 回调函数概览

GSAP提供完整的动画生命周期回调，让你可以在特定时刻执行代码。

```text
┌─────────────────────────────────────────────────────────────┐
│                    动画生命周期                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐               │
│   │ onStart │ ──→│ onUpdate│ ──→│onComplete│               │
│   │  开始时  │    │  更新时  │    │  完成时  │               │
│   └─────────┘    └─────────┘    └─────────┘               │
│                                                             │
│   ┌──────────────┐    ┌──────────────────┐                 │
│   │ onRepeat     │    │ onReverseComplete│                 │
│   │   重复时      │    │     反向完成时    │                 │
│   └──────────────┘    └──────────────────┘                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 10.2 基础回调

### onStart - 动画开始

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onStart: function() {
    console.log("动画开始");
    console.log("目标元素:", this.targets());
  }
});
```

### onUpdate - 动画更新

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onUpdate: function() {
    console.log("进度:", this.progress().toFixed(2));
  }
});
```

### onComplete - 动画完成

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onComplete: function() {
    console.log("动画完成");
  }
});
```

### onRepeat - 动画重复

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  repeat: 3,
  onRepeat: function() {
    console.log("重复次数:", this.iteration());
  }
});
```

### onReverseComplete - 反向完成

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onReverseComplete: function() {
    console.log("反向播放完成");
  }
});
```

## 10.3 回调参数

### this上下文

在回调函数中，`this`指向Tween或Timeline实例：

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onComplete: function() {
    console.log(this.targets());
    console.log(this.progress());
    console.log(this.time());
    console.log(this.duration());
  }
});
```

### 传递参数

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onComplete: function(message, count) {
    console.log(message);
    console.log(count);
  },
  onCompleteParams: ["动画完成!", 42]
});
```

### 所有回调参数

| 回调 | 参数属性 |
|------|---------|
| `onStartParams` | onStart的参数数组 |
| `onUpdateParams` | onUpdate的参数数组 |
| `onCompleteParams` | onComplete的参数数组 |
| `onRepeatParams` | onRepeat的参数数组 |
| `onReverseCompleteParams` | onReverseComplete的参数数组 |

## 10.4 时间线回调

### 时间线级别回调

```javascript
const tl = gsap.timeline({
  onStart: () => console.log("时间线开始"),
  onUpdate: () => console.log("时间线更新"),
  onComplete: () => console.log("时间线完成"),
  onReverseComplete: () => console.log("时间线反向完成")
});

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 50, duration: 0.5 });
```

### 单个Tween的回调

```javascript
const tl = gsap.timeline();

tl.to(".box1", { 
  x: 100, 
  duration: 1,
  onStart: () => console.log("box1开始"),
  onComplete: () => console.log("box1完成")
})
.to(".box2", { 
  y: 50, 
  duration: 0.5,
  onStart: () => console.log("box2开始"),
  onComplete: () => console.log("box2完成")
});
```

## 10.5 call()方法

在时间线中添加回调：

```javascript
const tl = gsap.timeline();

tl.to(".box", { x: 100, duration: 1 })
  .call(() => {
    console.log("第一步完成");
    updateUI();
  })
  .to(".box", { y: 50, duration: 0.5 })
  .call(() => {
    console.log("第二步完成");
  });
```

### call()参数

```javascript
tl.call(callback, params, position);

tl.call(myFunction, ["参数1", "参数2"], 2);
```

## 10.6 实用示例

### 链式动画

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onComplete: () => {
    gsap.to(".box", {
      y: 50,
      duration: 0.5,
      onComplete: () => {
        gsap.to(".box", {
          rotation: 360,
          duration: 1
        });
      }
    });
  }
});
```

### 进度显示

```javascript
gsap.to(".box", {
  x: 500,
  duration: 2,
  onUpdate: function() {
    document.querySelector(".progress").textContent = 
      Math.round(this.progress() * 100) + "%";
  }
});
```

### 动画状态管理

```javascript
let isAnimating = false;

gsap.to(".box", {
  x: 100,
  duration: 1,
  onStart: () => {
    isAnimating = true;
    document.querySelector(".box").classList.add("animating");
  },
  onComplete: () => {
    isAnimating = false;
    document.querySelector(".box").classList.remove("animating");
  }
});
```

### 音效触发

```javascript
const sound = new Audio("pop.mp3");

gsap.to(".box", {
  scale: 1.2,
  duration: 0.2,
  onStart: () => {
    sound.currentTime = 0;
    sound.play();
  }
});
```

### 数据更新

```javascript
const counter = { value: 0 };

gsap.to(counter, {
  value: 100,
  duration: 2,
  onUpdate: () => {
    document.querySelector(".counter").textContent = 
      Math.round(counter.value);
  },
  onComplete: () => {
    document.querySelector(".counter").classList.add("complete");
  }
});
```

### 页面切换

```javascript
function transitionToPage(pageId) {
  const tl = gsap.timeline({
    onComplete: () => {
      loadPage(pageId);
      gsap.from(".page", { opacity: 0, duration: 0.5 });
    }
  });

  tl.to(".page", { 
    opacity: 0, 
    y: -50, 
    duration: 0.5 
  });
}
```

## 10.7 回调最佳实践

### 避免过多计算

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onUpdate: function() {
    if (Math.round(this.progress() * 10) % 2 === 0) {
      return;
    }
    updateProgress(this.progress());
  }
});
```

### 使用箭头函数注意this

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onComplete: () => {
    console.log(this);
  }
});

gsap.to(".box", {
  x: 100,
  duration: 1,
  onComplete: function() {
    console.log(this.targets());
  }
});
```

### 清理资源

```javascript
let animation;

function startAnimation() {
  animation = gsap.to(".box", {
    x: 100,
    duration: 1,
    onComplete: () => {
      animation = null;
    }
  });
}

function stopAnimation() {
  if (animation) {
    animation.kill();
    animation = null;
  }
}
```

---

## 交互式演示

<div class="demo-container" data-demo="callback-demo">
  <div class="demo-preview">
    <div class="demo-box" id="callback-box">动画元素</div>
    <div class="callback-log" id="callback-log">事件日志将显示在这里</div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">const log = document.getElementById("callback-log");
log.innerHTML = "";

gsap.to("#callback-box", {
  x: 150,
  duration: 1,
  onStart: () => {
    log.innerHTML += "▶ 动画开始<br>";
  },
  onUpdate: function() {
    log.innerHTML = `▶ 进度: ${Math.round(this.progress() * 100)}%<br>`;
  },
  onComplete: () => {
    log.innerHTML += "✓ 动画完成<br>";
  }
});</code></pre>
  </div>
  <button class="demo-run-btn">运行代码</button>
  <button class="demo-reset-btn">重置</button>
</div>

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **onStart和onComplete分别在什么时候触发？**
   - 提示：思考动画的开始和结束

2. **在回调函数中this指向什么？**
   - 提示：考虑Tween实例

### 代码实践

3. **创建一个动画，在开始时显示"开始"，完成时显示"完成"**
   - 提示：使用onStart和onComplete

4. **创建一个进度条动画，实时显示当前进度百分比**
   - 提示：使用onUpdate和this.progress()

---

> **下一章**：[第11章 SVG动画](./03-advanced/01-svg-animations.md) - 掌握SVG路径与变形动画

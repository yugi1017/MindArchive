# 第7章 时间线控制

> 掌握动画序列的精确控制，创建复杂的动画编排

## 7.1 时间线控制方法概览

```text
┌─────────────────────────────────────────────────────────────┐
│                   Timeline 控制方法                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   播放控制                                                   │
│   ┌──────┐ ┌───────┐ ┌─────────┐ ┌──────────┐              │
│   │ play │ │ pause │ │ reverse │ │ restart  │              │
│   └──────┘ └───────┘ └─────────┘ └──────────┘              │
│                                                             │
│   时间控制                                                   │
│   ┌──────┐ ┌──────────┐ ┌─────────┐ ┌────────────┐         │
│   │ seek │ │ progress │ │ time    │ │ timeScale  │         │
│   └──────┘ └──────────┘ └─────────┘ └────────────┘         │
│                                                             │
│   状态检查                                                   │
│   ┌──────────┐ ┌────────┐ ┌──────────┐ ┌──────────┐        │
│   │ isActive │ │ paused │ │ progress │ │ duration │        │
│   └──────────┘ └────────┘ └──────────┘ └──────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 7.2 播放控制

### play() - 播放

```javascript
const tl = gsap.timeline({ paused: true });

tl.play();
tl.play(1);
tl.play("label");
tl.play(true);
```

### pause() - 暂停

```javascript
tl.pause();
tl.pause(1);
tl.pause("label");
```

### reverse() - 反向播放

```javascript
tl.reverse();
tl.reverse(1);
tl.reverse("label");
```

### restart() - 重新开始

```javascript
tl.restart();
tl.restart(true);
tl.restart(false, true);
```

### resume() - 继续播放

```javascript
tl.resume();
tl.resume(1);
```

### 完整示例

```javascript
const tl = gsap.timeline({ paused: true });

tl.to(".box", { x: 200, duration: 2 })
  .to(".box", { y: 100, duration: 1 })
  .to(".box", { rotation: 360, duration: 1 });

document.querySelector(".play-btn").addEventListener("click", () => tl.play());
document.querySelector(".pause-btn").addEventListener("click", () => tl.pause());
document.querySelector(".reverse-btn").addEventListener("click", () => tl.reverse());
document.querySelector(".restart-btn").addEventListener("click", () => tl.restart());
```

## 7.3 时间跳转

### seek() - 跳转到指定时间

```javascript
tl.seek(2);
tl.seek("label");
tl.seek(0.5, false);
```

### progress() - 进度控制

```javascript
tl.progress(0.5);
console.log(tl.progress());
```

### time() - 时间控制

```javascript
tl.time(1.5);
console.log(tl.time());
```

### 使用标签跳转

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .addLabel("step1")
  .to(".box2", { y: 50, duration: 0.5 })
  .addLabel("step2")
  .to(".box3", { rotation: 360, duration: 1 });

tl.seek("step1");
tl.play("step2");
```

## 7.4 速度控制

### timeScale() - 播放速度

```javascript
tl.timeScale(2);
tl.timeScale(0.5);
tl.timeScale(1);
```

### 动态调整速度

```javascript
const tl = gsap.timeline();

tl.to(".box", { x: 200, duration: 2 });

document.querySelector(".slow-btn").addEventListener("click", () => {
  tl.timeScale(0.5);
});

document.querySelector(".fast-btn").addEventListener("click", () => {
  tl.timeScale(2);
});

document.querySelector(".normal-btn").addEventListener("click", () => {
  tl.timeScale(1);
});
```

### 平滑速度过渡

```javascript
gsap.to(tl, { timeScale: 2, duration: 1 });
gsap.to(tl, { timeScale: 0.5, duration: 0.5 });
```

## 7.5 状态检查

### 检查方法

```javascript
tl.isActive();
tl.isActive(false);

tl.paused();
tl.paused(true);

tl.progress();
tl.totalProgress();

tl.time();
tl.totalTime();

tl.duration();
tl.totalDuration();
```

### 条件控制

```javascript
const tl = gsap.timeline();

document.querySelector(".box").addEventListener("click", () => {
  if (tl.isActive()) {
    tl.pause();
  } else if (tl.progress() === 1) {
    tl.restart();
  } else {
    tl.play();
  }
});
```

## 7.6 高级控制技巧

### 从指定位置开始播放

```javascript
tl.play(1);
tl.play("label");
```

### 反向到指定位置

```javascript
tl.reverse(0);
tl.reverse("start");
```

### 切换播放方向

```javascript
function toggleDirection(tl) {
  if (tl.reversed()) {
    tl.play();
  } else {
    tl.reverse();
  }
}

function toggleDirection(tl) {
  tl.reversed(!tl.reversed());
}
```

### 播放范围

```javascript
tl.play(1);
tl.pause(3);

function playRange(tl, start, end) {
  tl.time(start).play();
  gsap.delayedCall(end - start, () => tl.pause());
}

playRange(tl, 1, 3);
```

## 7.7 事件回调

### 回调属性

```javascript
const tl = gsap.timeline({
  onStart: () => console.log("开始"),
  onUpdate: () => console.log("更新"),
  onComplete: () => console.log("完成"),
  onReverseComplete: () => console.log("反向完成"),
  onRepeat: () => console.log("重复")
});
```

### 回调参数

```javascript
const tl = gsap.timeline({
  onComplete: function() {
    console.log(this.targets());
    console.log(this.time());
    console.log(this.progress());
  }
});
```

### 添加回调到特定位置

```javascript
const tl = gsap.timeline();

tl.to(".box", { x: 100, duration: 1 })
  .call(() => console.log("第一步完成"))
  .to(".box", { y: 50, duration: 0.5 })
  .call(() => console.log("第二步完成"), null, 2);
```

## 7.8 实用示例

### 播放控制器

```javascript
class TimelineController {
  constructor(timeline) {
    this.tl = timeline;
    this.setupControls();
  }

  setupControls() {
    document.querySelector(".play").addEventListener("click", () => this.play());
    document.querySelector(".pause").addEventListener("click", () => this.pause());
    document.querySelector(".reverse").addEventListener("click", () => this.reverse());
    document.querySelector(".restart").addEventListener("click", () => this.restart());
    
    document.querySelector(".speed-slow").addEventListener("click", () => this.setSpeed(0.5));
    document.querySelector(".speed-normal").addEventListener("click", () => this.setSpeed(1));
    document.querySelector(".speed-fast").addEventListener("click", () => this.setSpeed(2));
    
    document.querySelector(".progress-slider").addEventListener("input", (e) => {
      this.setProgress(e.target.value / 100);
    });
  }

  play() { this.tl.play(); }
  pause() { this.tl.pause(); }
  reverse() { this.tl.reverse(); }
  restart() { this.tl.restart(); }
  setSpeed(speed) { this.tl.timeScale(speed); }
  setProgress(progress) { this.tl.progress(progress); }
}
```

### 滚动进度控制

```javascript
const tl = gsap.timeline({ paused: true });
tl.to(".box", { x: 500, rotation: 360, duration: 1 });

window.addEventListener("scroll", () => {
  const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  tl.progress(scrollProgress);
});
```

### 键盘控制

```javascript
const tl = gsap.timeline();

document.addEventListener("keydown", (e) => {
  switch(e.key) {
    case " ":
      e.preventDefault();
      tl.paused() ? tl.play() : tl.pause();
      break;
    case "ArrowRight":
      tl.progress(tl.progress() + 0.05);
      break;
    case "ArrowLeft":
      tl.progress(tl.progress() - 0.05);
      break;
    case "r":
      tl.restart();
      break;
  }
});
```

---

## 交互式演示

<div class="demo-container" data-demo="control-demo">
  <div class="demo-preview">
    <div class="demo-box" id="control-box">控制演示</div>
    <div class="demo-controls">
      <button onclick="window.tlDemo?.play()">播放</button>
      <button onclick="window.tlDemo?.pause()">暂停</button>
      <button onclick="window.tlDemo?.reverse()">反向</button>
      <button onclick="window.tlDemo?.restart()">重置</button>
    </div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">window.tlDemo = gsap.timeline({ repeat: -1, yoyo: true });

window.tlDemo.to("#control-box", {
  x: 150,
  rotation: 180,
  scale: 1.2,
  duration: 1,
  ease: "power2.inOut"
});</code></pre>
  </div>
  <button class="demo-run-btn">运行代码</button>
  <button class="demo-reset-btn">重置</button>
</div>

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **play()和resume()有什么区别？**
   - 提示：考虑播放位置

2. **timeScale()如何影响动画？**
   - 提示：思考播放速度

### 代码实践

3. **创建一个可以通过滑块控制进度的动画**
   - 提示：使用progress()方法

4. **创建一个可以通过键盘控制的动画播放器**
   - 提示：监听keydown事件

---

> **下一章**：[第8章 缓动函数](./03-easing-functions.md) - 灵活运用各种缓动效果

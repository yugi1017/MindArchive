# 调试技巧

> GSAP动画调试方法与工具

## 基础调试

### 使用回调函数

```javascript
gsap.to(".box", {
  x: 100,
  duration: 1,
  onStart: () => console.log("动画开始"),
  onUpdate: function() {
    console.log("进度:", this.progress().toFixed(2));
  },
  onComplete: () => console.log("动画完成")
});
```

### 检查动画状态

```javascript
const tween = gsap.to(".box", { x: 100, duration: 1 });

console.log("是否激活:", tween.isActive());
console.log("当前进度:", tween.progress());
console.log("当前时间:", tween.time());
console.log("总时长:", tween.duration());
```

### 检查元素状态

```javascript
const box = document.querySelector(".box");

console.log("元素:", box);
console.log("GSAP x值:", gsap.getProperty(box, "x"));
console.log("计算样式:", getComputedStyle(box).transform);
```

## ScrollTrigger调试

### 显示markers

```javascript
ScrollTrigger.create({
  trigger: ".box",
  start: "top center",
  end: "bottom top",
  markers: {
    startColor: "green",
    endColor: "red",
    fontSize: "12px"
  }
});
```

### 检查触发状态

```javascript
const st = ScrollTrigger.create({
  trigger: ".box",
  onEnter: () => console.log("进入"),
  onLeave: () => console.log("离开"),
  onUpdate: (self) => {
    console.log("进度:", self.progress);
    console.log("方向:", self.direction);
    console.log("是否激活:", self.isActive);
  }
});

console.log("start位置:", st.start);
console.log("end位置:", st.end);
```

## 时间线调试

### 使用标签

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .addLabel("step1")
  .to(".box2", { y: 50, duration: 0.5 })
  .addLabel("step2")
  .to(".box3", { rotation: 360, duration: 1 });

console.log("当前时间:", tl.time());
console.log("当前标签:", tl.currentLabel());
```

### 暂停检查

```javascript
const tl = gsap.timeline();

tl.to(".box", { x: 100, duration: 1 })
  .call(() => {
    tl.pause();
    console.log("暂停检查点");
    console.log("当前状态:", tl.time());
  })
  .to(".box", { y: 50, duration: 0.5 });
```

## 性能调试

### FPS监控

```javascript
let lastTime = performance.now();
let frames = 0;

gsap.ticker.add(() => {
  frames++;
  const now = performance.now();
  
  if (now - lastTime >= 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    lastTime = now;
  }
});
```

### 动画数量检查

```javascript
// 检查活跃的Tween数量
console.log("活跃Tween:", gsap.globalTimeline.getChildren().length);

// 检查ScrollTrigger数量
console.log("ScrollTrigger数量:", ScrollTrigger.getAll().length);
```

## 常用调试代码

### 动画信息输出

```javascript
function debugTween(tween) {
  console.group("Tween调试信息");
  console.log("目标:", tween.targets());
  console.log("时长:", tween.duration());
  console.log("进度:", tween.progress());
  console.log("是否激活:", tween.isActive());
  console.log("是否暂停:", tween.paused());
  console.groupEnd();
}
```

### ScrollTrigger信息输出

```javascript
function debugScrollTrigger(st) {
  console.group("ScrollTrigger调试信息");
  console.log("触发元素:", st.trigger);
  console.log("start:", st.start);
  console.log("end:", st.end);
  console.log("进度:", st.progress);
  console.log("方向:", st.direction);
  console.log("是否激活:", st.isActive);
  console.groupEnd();
}
```

### 时间线信息输出

```javascript
function debugTimeline(tl) {
  console.group("Timeline调试信息");
  console.log("时长:", tl.duration());
  console.log("当前时间:", tl.time());
  console.log("进度:", tl.progress());
  console.log("子动画数:", tl.getChildren().length);
  console.log("当前标签:", tl.currentLabel());
  console.groupEnd();
}
```

## 调试工具

### GSDevTools（付费插件）

```javascript
gsap.registerPlugin(GSDevTools);

const tl = gsap.timeline();
tl.to(".box", { x: 100 });

GSDevTools.create({ animation: tl });
```

### 浏览器开发工具

1. **Elements面板**：检查元素样式变化
2. **Performance面板**：录制动画性能
3. **Console面板**：输出调试信息

---

> **相关参考**：[常见问题](./common-issues.md) | [API速查](./api-quick-ref.md)

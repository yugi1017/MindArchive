# 第16章 性能优化

> 优化动画性能表现，确保流畅的用户体验

## 16.1 性能优化概述

```text
┌─────────────────────────────────────────────────────────────┐
│                    动画性能优化策略                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐      │
│   │  属性选择   │   │  渲染优化   │   │  内存管理   │      │
│   │  Transform  │   │  GPU加速    │   │  清理资源   │      │
│   └─────────────┘   └─────────────┘   └─────────────┘      │
│                                                             │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐      │
│   │  时序优化   │   │  滚动优化   │   │  设备适配   │      │
│   │  减少重绘   │   │  节流防抖   │   │  能力检测   │      │
│   └─────────────┘   └─────────────┘   └─────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 16.2 属性选择

### 高性能属性

优先使用transform和opacity：

```javascript
gsap.to(".box", {
  x: 100,           // 好 - transform
  y: 50,            // 好 - transform
  scale: 1.5,       // 好 - transform
  rotation: 45,     // 好 - transform
  opacity: 0.5      // 好 - opacity
});
```

### 低性能属性

避免动画布局属性：

```javascript
gsap.to(".box", {
  width: 200,       // 差 - 触发重排
  height: 200,      // 差 - 触发重排
  left: 100,        // 差 - 触发重排
  top: 50,          // 差 - 触发重排
  margin: 20        // 差 - 触发重排
});
```

### 性能对比

| 属性类型 | 性能 | 原因 |
|---------|------|------|
| transform | 高 | GPU加速，不触发重排 |
| opacity | 高 | GPU加速 |
| 颜色属性 | 中 | 只触发重绘 |
| 布局属性 | 低 | 触发重排 |

## 16.3 GPU加速

### will-change

```javascript
gsap.set(".box", {
  willChange: "transform"
});

gsap.to(".box", {
  x: 500,
  duration: 1,
  onComplete: function() {
    gsap.set(this.targets(), { willChange: "auto" });
  }
});
```

### force3D

```javascript
gsap.to(".box", {
  x: 500,
  force3D: true
});
```

### 自动GPU加速

GSAP自动为transform属性启用GPU加速：

```javascript
gsap.to(".box", {
  x: 100,
  y: 50,
  rotation: 45,
  scale: 1.2
});
```

## 16.4 减少重绘

### 批量更新

```javascript
gsap.to([".box1", ".box2", ".box3"], {
  x: 100,
  duration: 1
});
```

### 使用时间线

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 0.3 })
  .to(".box2", { x: 100, duration: 0.3 })
  .to(".box3", { x: 100, duration: 0.3 });
```

### 避免频繁读取布局

```javascript
const rect = box.getBoundingClientRect();

gsap.to(box, {
  x: rect.width,
  duration: 1
});
```

## 16.5 内存管理

### 清理动画

```javascript
let animation = gsap.to(".box", { x: 100 });

animation.kill();
animation = null;
```

### 使用上下文

```javascript
let ctx = gsap.context(() => {
  gsap.to(".box", { x: 100, repeat: -1 });
  gsap.to(".circle", { rotation: 360, repeat: -1 });
});

ctx.revert();
ctx = null;
```

### ScrollTrigger清理

```javascript
ScrollTrigger.getAll().forEach(st => st.kill());
ScrollTrigger.clearMatchMedia();
```

## 16.6 滚动优化

### 防抖刷新

```javascript
let resizeTimeout;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});
```

### 限制ScrollTrigger

```javascript
ScrollTrigger.config({
  limitCallbacks: true
});
```

### fastScrollEnd

```javascript
scrollTrigger: {
  trigger: ".box",
  fastScrollEnd: true,
  preventOverlaps: true
}
```

## 16.7 设备适配

### 能力检测

```javascript
const isLowEnd = navigator.hardwareConcurrency <= 2;
const isMobile = /Android|iPhone/i.test(navigator.userAgent);

if (isLowEnd || isMobile) {
  gsap.to(".box", {
    x: 100,
    duration: 0.5
  });
} else {
  gsap.to(".box", {
    x: 100,
    duration: 1,
    ease: "elastic.out"
  });
}
```

### 减少动画偏好

```javascript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  gsap.to(".box", { x: 100 });
}
```

## 16.8 性能监控

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

### GSAP DevTools

```javascript
gsap.registerPlugin(GSDevTools);

const tl = gsap.timeline();
GSDevTools.create({ animation: tl });
```

## 16.9 最佳实践总结

### DO - 推荐做法

```javascript
gsap.to(".box", {
  x: 100,
  y: 50,
  rotation: 45,
  opacity: 0.8,
  duration: 0.5
});

gsap.to(".box", {
  scale: 1.2,
  duration: 0.3,
  overwrite: "auto"
});
```

### DON'T - 避免做法

```javascript
gsap.to(".box", {
  width: 200,
  height: 200,
  left: 100,
  top: 50,
  duration: 1
});

setInterval(() => {
  gsap.to(".box", { x: Math.random() * 100 });
}, 100);
```

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **为什么transform属性比width/height性能更好？**
   - 提示：考虑GPU加速和重排

2. **will-change属性的作用是什么？**
   - 提示：思考浏览器优化

### 代码实践

3. **优化一个使用width/height的动画，改用transform**
   - 提示：使用scale代替width/height

4. **创建一个自动清理的动画上下文**
   - 提示：使用gsap.context

---

> **下一部分**：[实战篇 - 实用动画效果案例](./04-practical/) - 学习20个实用动画效果

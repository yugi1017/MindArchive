# 第15章 响应式动画

> 适配不同屏幕尺寸，创建跨设备的动画体验

## 15.1 响应式动画概述

```text
┌─────────────────────────────────────────────────────────────┐
│                   响应式动画策略                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   桌面端                     移动端                         │
│   ┌─────────────────┐       ┌───────────┐                  │
│   │                 │       │           │                  │
│   │   复杂动画      │       │  简化动画  │                  │
│   │   多元素交互    │ ───→  │  单元素    │                  │
│   │   大幅度位移    │       │  小幅度    │                  │
│   │                 │       │           │                  │
│   └─────────────────┘       └───────────┘                  │
│                                                             │
│   根据设备能力调整动画复杂度                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 15.2 matchMedia基础

### 基本用法

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", (context) => {
  gsap.to(".box", { x: 500, duration: 1 });
  
  return () => {
    // 清理代码
  };
});
```

### 多个断点

```javascript
mm.add({
  isMobile: "(max-width: 767px)",
  isTablet: "(min-width: 768px) and (max-width: 1023px)",
  isDesktop: "(min-width: 1024px)"
}, (context) => {
  const { isMobile, isTablet, isDesktop } = context.conditions;
  
  if (isMobile) {
    gsap.to(".box", { x: 100, duration: 1 });
  } else if (isTablet) {
    gsap.to(".box", { x: 300, duration: 1 });
  } else {
    gsap.to(".box", { x: 500, duration: 1 });
  }
});
```

## 15.3 减少动画偏好

### prefers-reduced-motion

```javascript
mm.add({
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { reduceMotion } = context.conditions;
  
  if (reduceMotion) {
    gsap.globalTimeline.timeScale(0);
  }
});
```

### 完整响应式配置

```javascript
mm.add({
  isMobile: "(max-width: 767px)",
  isDesktop: "(min-width: 768px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isMobile, isDesktop, reduceMotion } = context.conditions;
  
  if (reduceMotion) {
    return;
  }
  
  if (isMobile) {
    gsap.to(".box", { x: 100, duration: 0.5 });
  } else {
    gsap.to(".box", { x: 500, duration: 1 });
  }
});
```

## 15.4 响应式时间线

### 条件时间线

```javascript
mm.add("(min-width: 768px)", () => {
  const tl = gsap.timeline();
  
  tl.from(".title", { y: 50, opacity: 0 })
    .from(".subtitle", { y: 30, opacity: 0 }, "-=0.3")
    .from(".cta", { scale: 0 }, "-=0.2");
});

mm.add("(max-width: 767px)", () => {
  gsap.from(".title", { y: 30, opacity: 0, duration: 0.5 });
});
```

### 响应式ScrollTrigger

```javascript
mm.add("(min-width: 768px)", () => {
  gsap.to(".box", {
    x: 500,
    scrollTrigger: {
      trigger: ".section",
      scrub: true,
      pin: true
    }
  });
});

mm.add("(max-width: 767px)", () => {
  gsap.to(".box", {
    x: 100,
    scrollTrigger: {
      trigger: ".section",
      start: "top center"
    }
  });
});
```

## 15.5 清理和重置

### 自动清理

```javascript
mm.add("(min-width: 768px)", (context) => {
  const animation = gsap.to(".box", { x: 500 });
  
  context.add(() => {
    animation.kill();
  });
});
```

### 手动清理

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // 桌面端动画
});

mm.revert();
mm.clear();
```

## 15.6 响应式动画策略

### 动画复杂度调整

```javascript
mm.add({
  isMobile: "(max-width: 767px)",
  isDesktop: "(min-width: 768px)"
}, (context) => {
  const { isMobile, isDesktop } = context.conditions;
  
  const config = {
    duration: isMobile ? 0.5 : 1,
    distance: isMobile ? 50 : 200,
    stagger: isMobile ? 0.05 : 0.1
  };
  
  gsap.from(".card", {
    y: config.distance,
    opacity: 0,
    stagger: config.stagger,
    duration: config.duration
  });
});
```

### 元素可见性

```javascript
mm.add("(max-width: 767px)", () => {
  gsap.set(".desktop-only", { display: "none" });
  gsap.set(".mobile-only", { display: "block" });
});

mm.add("(min-width: 768px)", () => {
  gsap.set(".desktop-only", { display: "block" });
  gsap.set(".mobile-only", { display: "none" });
});
```

## 15.7 实用示例

### 响应式导航动画

```javascript
mm.add({
  isMobile: "(max-width: 767px)",
  isDesktop: "(min-width: 768px)"
}, (context) => {
  const { isMobile, isDesktop } = context.conditions;
  
  if (isMobile) {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(".mobile-menu", {
      x: 0,
      duration: 0.3
    })
    .from(".menu-item", {
      x: 50,
      opacity: 0,
      stagger: 0.05
    }, "-=0.1");
    
    document.querySelector(".menu-toggle")
      .addEventListener("click", () => {
        tl.reversed() ? tl.play() : tl.reverse();
      });
  } else {
    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.3
    });
  }
});
```

### 响应式卡片网格

```javascript
mm.add({
  isMobile: "(max-width: 767px)",
  isTablet: "(min-width: 768px) and (max-width: 1023px)",
  isDesktop: "(min-width: 1024px)"
}, (context) => {
  const { isMobile, isTablet, isDesktop } = context.conditions;
  
  const gridConfig = {
    columns: isMobile ? 1 : (isTablet ? 2 : 3),
    gap: isMobile ? 10 : 20,
    animationDistance: isMobile ? 30 : 60
  };
  
  gsap.from(".card", {
    y: gridConfig.animationDistance,
    opacity: 0,
    stagger: {
      each: 0.1,
      grid: [Math.ceil(cards.length / gridConfig.columns), gridConfig.columns],
      from: "start"
    },
    duration: 0.5
  });
});
```

### 响应式视差

```javascript
mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
  gsap.to(".parallax-bg", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
```

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **matchMedia.add()的回调函数返回什么？**
   - 提示：考虑清理机制

2. **为什么需要处理prefers-reduced-motion？**
   - 提示：考虑无障碍访问

### 代码实践

3. **创建一个在移动端和桌面端有不同动画效果的组件**
   - 提示：使用matchMedia

4. **创建一个尊重用户减少动画偏好的动画**
   - 提示：检测prefers-reduced-motion

---

> **下一章**：[第16章 性能优化](./06-performance-optimization.md) - 优化动画性能表现

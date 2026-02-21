# 第12章 3D变换

> 创建立体视觉效果，打造沉浸式的3D动画体验

## 12.1 3D变换概述

GSAP支持完整的CSS 3D变换，包括3D旋转、透视、3D位移等。

```text
┌─────────────────────────────────────────────────────────────┐
│                    3D变换类型                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│           ┌─────────┐                                      │
│          /│         │\      rotationX                      │
│         / │  X轴旋转 │ \     绕X轴旋转                      │
│        /  │         │  \                                    │
│       └─────────────┘                                      │
│                                                             │
│       ┌─────────────────┐                                  │
│       │                 │                                  │
│       │    rotationY    │      Y轴旋转                     │
│       │    绕Y轴旋转     │      绕Y轴旋转                    │
│       │                 │                                  │
│       └─────────────────┘                                  │
│                                                             │
│            rotationZ / rotation                             │
│            绕Z轴旋转（平面旋转）                             │
│                    ↻                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 12.2 透视设置

### perspective属性

设置3D空间的透视距离：

```javascript
gsap.set(".container", {
  perspective: 1000
});
```

### perspective值对比

```text
perspective: 500px        perspective: 1000px       perspective: 2000px
(透视强，变形大)           (适中)                    (透视弱，变形小)

    ┌───┐                    ┌───┐                    ┌───┐
   /     \                  /     \                  /     \
  │       │                │       │                │       │
   \     /                  \     /                  \     /
    └───┘                    └───┘                    └───┘
```

### transformPerspective

直接在元素上设置透视：

```javascript
gsap.to(".box", {
  rotationY: 45,
  transformPerspective: 500,
  duration: 1
});
```

## 12.3 3D旋转

### rotationX - X轴旋转

```javascript
gsap.to(".box", {
  rotationX: 180,
  duration: 1,
  ease: "power2.out"
});
```

### rotationY - Y轴旋转

```javascript
gsap.to(".box", {
  rotationY: 360,
  duration: 1,
  ease: "power2.out"
});
```

### rotationZ - Z轴旋转

```javascript
gsap.to(".box", {
  rotationZ: 90,
  duration: 1
});

// rotationZ等同于rotation
gsap.to(".box", {
  rotation: 90,
  duration: 1
});
```

### 组合旋转

```javascript
gsap.to(".box", {
  rotationX: 45,
  rotationY: 45,
  rotationZ: 15,
  duration: 1
});
```

## 12.4 3D位移

### z属性

```javascript
gsap.to(".box", {
  z: 200,
  duration: 1
});
```

### transformOrigin

设置变换原点：

```javascript
gsap.to(".box", {
  rotationY: 180,
  transformOrigin: "left center",
  duration: 1
});

gsap.to(".box", {
  rotationX: 90,
  transformOrigin: "center bottom",
  duration: 1
});
```

## 12.5 3D变换原点

### transformOrigin值

```javascript
transformOrigin: "center center"
transformOrigin: "left top"
transformOrigin: "right bottom"
transformOrigin: "50% 50%"
transformOrigin: "center center -100px"
```

### 变换原点效果

```text
transformOrigin: "left center"    transformOrigin: "right center"
        │                                  │
        │    ┌───┐                         │    ┌───┐
        │    │   │ 旋转                    │    │   │ 旋转
        │    └───┘                         │    └───┘
        │                                  │
     左边缘为轴                          右边缘为轴
```

## 12.6 3D翻转效果

### 卡片翻转

```javascript
const card = document.querySelector(".card");
const front = card.querySelector(".front");
const back = card.querySelector(".back");

gsap.set(back, { rotationY: 180 });

gsap.to(card, {
  rotationY: 180,
  duration: 0.8,
  ease: "power2.out"
});
```

### 翻转动画

```javascript
function flipCard(card) {
  const tl = gsap.timeline();
  
  tl.to(card, {
    rotationY: 90,
    duration: 0.3,
    ease: "power2.in"
  })
  .set(card, { rotationY: -90 })
  .to(card, {
    rotationY: 0,
    duration: 0.3,
    ease: "power2.out"
  });
}
```

## 12.7 3D立方体

### 创建立方体

```html
<div class="cube-container">
  <div class="cube">
    <div class="face front">前</div>
    <div class="face back">后</div>
    <div class="face right">右</div>
    <div class="face left">左</div>
    <div class="face top">上</div>
    <div class="face bottom">下</div>
  </div>
</div>
```

```javascript
gsap.set(".cube-container", { perspective: 800 });

gsap.set(".front", { z: 100 });
gsap.set(".back", { rotationY: 180, z: 100 });
gsap.set(".right", { rotationY: 90, z: 100 });
gsap.set(".left", { rotationY: -90, z: 100 });
gsap.set(".top", { rotationX: 90, z: 100 });
gsap.set(".bottom", { rotationX: -90, z: 100 });

gsap.to(".cube", {
  rotationX: 360,
  rotationY: 360,
  duration: 5,
  ease: "none",
  repeat: -1
});
```

## 12.8 实用示例

### 3D卡片悬停

```javascript
const card = document.querySelector(".card");

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  
  gsap.to(card, {
    rotationX: rotateX,
    rotationY: rotateY,
    duration: 0.3,
    ease: "power2.out"
  });
});

card.addEventListener("mouseleave", () => {
  gsap.to(card, {
    rotationX: 0,
    rotationY: 0,
    duration: 0.5,
    ease: "power2.out"
  });
});
```

### 3D翻转导航

```javascript
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  const tl = gsap.timeline({ paused: true });
  
  tl.to(item, {
    rotationX: 90,
    duration: 0.2,
    ease: "power2.in"
  })
  .set(item, { rotationX: -90 })
  .to(item, {
    rotationX: 0,
    duration: 0.2,
    ease: "power2.out"
  });
  
  item.addEventListener("mouseenter", () => tl.play(0));
});
```

### 3D旋转木马

```javascript
const items = document.querySelectorAll(".carousel-item");
const radius = 300;

items.forEach((item, i) => {
  const angle = (i / items.length) * 360;
  
  gsap.set(item, {
    rotationY: angle,
    transformOrigin: "center center -" + radius + "px"
  });
});

gsap.to(".carousel", {
  rotationY: 360,
  duration: 20,
  ease: "none",
  repeat: -1
});
```

### 3D文字效果

```javascript
const letters = document.querySelectorAll(".letter");

gsap.from(letters, {
  rotationX: -90,
  opacity: 0,
  stagger: 0.05,
  duration: 0.5,
  ease: "back.out(1.7)",
  transformOrigin: "center bottom"
});
```

---

## 交互式演示

<div class="demo-container" data-demo="3d-demo">
  <div class="demo-preview" style="perspective: 800px;">
    <div class="demo-box" id="3d-box">3D变换</div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">gsap.to("#3d-box", {
  rotationX: 360,
  rotationY: 180,
  transformPerspective: 800,
  duration: 2,
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

1. **perspective和transformPerspective有什么区别？**
   - 提示：考虑应用对象的不同

2. **rotationX、rotationY、rotationZ分别是什么效果？**
   - 提示：想象绕不同轴旋转

### 代码实践

3. **创建一个卡片翻转效果，点击时翻转显示背面**
   - 提示：使用rotationY

4. **创建一个鼠标跟随的3D倾斜效果**
   - 提示：根据鼠标位置计算rotationX和rotationY

---

> **下一章**：[第13章 ScrollTrigger基础](./03-scrolltrigger-basics.md) - 实现滚动触发动画

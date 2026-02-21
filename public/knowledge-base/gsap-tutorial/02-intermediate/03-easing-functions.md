# 第8章 缓动函数

> 灵活运用各种缓动效果，让动画更自然流畅

## 8.1 什么是缓动？

缓动（Easing）定义了动画过程中速度变化的曲线，决定了动画的"感觉"。

```text
┌─────────────────────────────────────────────────────────────┐
│                      缓动曲线对比                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  linear (匀速)                                              │
│  │ ────────────────────────────────────────                 │
│  │                                          │               │
│  └──────────────────────────────────────────                │
│                                                             │
│  power2.out (开始快，结束慢)                                 │
│  │ ────────                                                 │
│  │         ─────────────────────────────────                │
│  └──────────────────────────────────────────                │
│                                                             │
│  elastic.out (弹性效果)                                      │
│  │ ────────╮   ╭─╮                                          │
│  │         ╰───╯ ╰──────────────────────────                │
│  └──────────────────────────────────────────                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 缓动的重要性

| 缓动类型 | 感觉 | 适用场景 |
|---------|------|---------|
| linear | 机械、生硬 | 进度条、匀速移动 |
| ease-out | 自然、舒适 | 大多数UI动画 |
| ease-in | 缓慢开始 | 离开屏幕 |
| elastic | 弹性、活泼 | 强调、吸引注意 |
| bounce | 弹跳、有趣 | 游戏、趣味动画 |

## 8.2 缓动类型

### 基础缓动

```javascript
gsap.to(".box", { x: 100, ease: "none" });
gsap.to(".box", { x: 100, ease: "power1.out" });
gsap.to(".box", { x: 100, ease: "power2.out" });
gsap.to(".box", { x: 100, ease: "power3.out" });
gsap.to(".box", { x: 100, ease: "power4.out" });
```

### 方向后缀

| 后缀 | 说明 |
|------|------|
| `.in` | 开始慢，结束快 |
| `.out` | 开始快，结束慢 |
| `.inOut` | 两头慢，中间快 |

```javascript
gsap.to(".box", { x: 100, ease: "power2.in" });
gsap.to(".box", { x: 100, ease: "power2.out" });
gsap.to(".box", { x: 100, ease: "power2.inOut" });
```

## 8.3 内置缓动函数

### Power系列

```javascript
gsap.to(".box", { x: 100, ease: "power1" });
gsap.to(".box", { x: 100, ease: "power2" });
gsap.to(".box", { x: 100, ease: "power3" });
gsap.to(".box", { x: 100, ease: "power4" });
```

### Back系列（回弹）

```javascript
gsap.to(".box", { x: 100, ease: "back.out(1.7)" });
gsap.to(".box", { x: 100, ease: "back.in(2)" });
gsap.to(".box", { x: 100, ease: "back.inOut(1.5)" });
```

### Elastic系列（弹性）

```javascript
gsap.to(".box", { x: 100, ease: "elastic.out(1, 0.3)" });
gsap.to(".box", { x: 100, ease: "elastic.in(1, 0.3)" });
gsap.to(".box", { x: 100, ease: "elastic.inOut(1, 0.3)" });
```

参数说明：
- 第一个参数：振幅（默认1）
- 第二个参数：周期（默认0.3）

### Bounce系列（弹跳）

```javascript
gsap.to(".box", { x: 100, ease: "bounce.out" });
gsap.to(".box", { x: 100, ease: "bounce.in" });
gsap.to(".box", { x: 100, ease: "bounce.inOut" });
```

### 其他缓动

```javascript
gsap.to(".box", { x: 100, ease: "circ.out" });
gsap.to(".box", { x: 100, ease: "expo.out" });
gsap.to(".box", { x: 100, ease: "sine.out" });
gsap.to(".box", { x: 100, ease: "steps(12)" });
```

## 8.4 缓动函数对比

### 视觉对比

```text
缓动函数          开始速度    中间速度    结束速度
─────────────────────────────────────────────────
none/linear       快          快          快
power1.out        快          中          慢
power2.out        快          中快        慢
power3.out        很快        中          很慢
power4.out        极快        中慢        极慢
back.out          快          超出        回弹
elastic.out       快          弹跳        稳定
bounce.out        快          弹跳        停止
```

### 使用场景

| 缓动 | 最佳场景 |
|------|---------|
| `power1.out` | 简单过渡 |
| `power2.out` | 通用动画 |
| `power3.out` | 强调效果 |
| `power4.out` | 戏剧性效果 |
| `back.out` | 按钮、弹出元素 |
| `elastic.out` | 强调、吸引注意 |
| `bounce.out` | 下落、游戏效果 |

## 8.5 自定义缓动

### 使用缓动函数

```javascript
gsap.to(".box", {
  x: 100,
  ease: "power2.out"
});

gsap.to(".box", {
  x: 100,
  ease: Power2.easeOut
});
```

### 自定义贝塞尔曲线

```javascript
gsap.to(".box", {
  x: 100,
  ease: "M0,0 C0.4,0 0.2,1 1,1"
});

gsap.to(".box", {
  x: 100,
  ease: CustomEase.create("custom", "M0,0 C0.4,0 0.2,1 1,1")
});
```

### 使用函数

```javascript
gsap.to(".box", {
  x: 100,
  ease: function(t) {
    return t < 0.5 
      ? 2 * t * t 
      : -1 + (4 - 2 * t) * t;
  }
});
```

## 8.6 缓动可视化

### 常用缓动曲线

```text
power1.out          power2.out          power3.out
    │                   │                   │
    │  ╭──────────      │    ╭──────────    │      ╭────────
    │ ╱                 │   ╱               │     ╱
    │╱                  │  ╱                │    ╱
    └────────           │ ╱                 │   ╱
                        │╱                  │  ╱
                        └────────           │ ╱
                                            │╱
                                            └────────

back.out            elastic.out          bounce.out
    │                   │                   │
    │   ╭───────        │   ╭╮  ╭╮          │   ▔▔╲  ╱╲
    │  ╱                │  ╱  ╲╱  ╲         │      ╲╱  ╲
    │ ╱                 │ ╱                 │
    │╱                  │╱                  │
    └────────           └────────           └────────
```

## 8.7 实用示例

### 按钮点击效果

```javascript
document.querySelector(".btn").addEventListener("click", () => {
  gsap.to(".btn", {
    scale: 0.95,
    duration: 0.1,
    ease: "power2.in",
    yoyo: true,
    repeat: 1
  });
});
```

### 弹出卡片

```javascript
gsap.from(".card", {
  scale: 0.8,
  opacity: 0,
  duration: 0.5,
  ease: "back.out(1.7)"
});
```

### 下落效果

```javascript
gsap.from(".ball", {
  y: -200,
  duration: 1.5,
  ease: "bounce.out"
});
```

### 强调动画

```javascript
gsap.to(".highlight", {
  scale: 1.1,
  duration: 0.3,
  ease: "elastic.out(1, 0.5)"
});
```

### 平滑滚动

```javascript
gsap.to(window, {
  scrollTo: { y: 1000 },
  duration: 1.5,
  ease: "power2.inOut"
});
```

## 8.8 缓动选择指南

### 根据动画类型选择

```javascript
// 进入动画
gsap.from(".element", { 
  opacity: 0, 
  y: 30, 
  ease: "power2.out" 
});

// 退出动画
gsap.to(".element", { 
  opacity: 0, 
  y: -30, 
  ease: "power2.in" 
});

// 强调效果
gsap.to(".element", { 
  scale: 1.2, 
  ease: "back.out(2)" 
});

// 物理效果
gsap.to(".element", { 
  y: 100, 
  ease: "bounce.out" 
});
```

### 根据元素类型选择

| 元素类型 | 推荐缓动 |
|---------|---------|
| 按钮 | `power2.out` 或 `back.out` |
| 卡片 | `power3.out` |
| 模态框 | `power2.out` |
| 通知 | `power2.out` |
| 图标 | `elastic.out` |
| 进度条 | `none` 或 `power1.out` |

---

## 交互式演示

<div class="demo-container" data-demo="easing-demo">
  <div class="demo-preview">
    <div class="demo-boxes easing-demo">
      <div class="demo-box" id="ease-box1">power2.out</div>
      <div class="demo-box" id="ease-box2">back.out</div>
      <div class="demo-box" id="ease-box3">elastic.out</div>
      <div class="demo-box" id="ease-box4">bounce.out</div>
    </div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">gsap.to("#ease-box1", { x: 150, duration: 1, ease: "power2.out" });
gsap.to("#ease-box2", { x: 150, duration: 1, ease: "back.out(1.7)" });
gsap.to("#ease-box3", { x: 150, duration: 1.5, ease: "elastic.out(1, 0.3)" });
gsap.to("#ease-box4", { x: 150, duration: 1.5, ease: "bounce.out" });</code></pre>
  </div>
  <button class="demo-run-btn">运行代码</button>
  <button class="demo-reset-btn">重置</button>
</div>

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **ease.in、ease.out、ease.inOut有什么区别？**
   - 提示：思考速度变化的方向

2. **什么场景下应该使用bounce.out？**
   - 提示：考虑物理效果

### 代码实践

3. **创建一个按钮点击效果，按下时缩小，释放时弹回**
   - 提示：使用back.out

4. **创建一个从高处落下的球，要有弹跳效果**
   - 提示：使用bounce.out

---

> **下一章**：[第9章 交错动画](./04-stagger-animations.md) - 创建批量元素的动画效果

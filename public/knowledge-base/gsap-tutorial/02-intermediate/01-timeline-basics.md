# 第6章 时间线基础

> 理解时间线概念与基本用法，掌握动画序列管理

## 6.1 什么是时间线？

时间线（Timeline）是GSAP的核心概念，用于管理多个动画的播放顺序和时序关系。

```text
┌─────────────────────────────────────────────────────────────┐
│                      Timeline 时间线                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  时间轴: 0s ──── 0.5s ──── 1s ──── 1.5s ──── 2s ──── 2.5s  │
│                                                             │
│  动画1: ████████████                                        │
│                    动画2: ████████████                       │
│                             动画3: ████████████              │
│                                                             │
│  时间线将多个动画按时间顺序组织在一起                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 为什么需要时间线？

| 问题 | 无时间线 | 有时间线 |
|------|---------|---------|
| 动画顺序控制 | 使用delay计算 | 直观的位置参数 |
| 整体控制 | 需要管理多个Tween | 统一控制 |
| 时间调整 | 需要重新计算delay | 自动调整 |
| 复杂动画 | 难以维护 | 结构清晰 |

## 6.2 创建时间线

### 基础创建

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 50, duration: 0.5 })
  .to(".box3", { rotation: 360, duration: 1 });
```

### 时间线选项

```javascript
const tl = gsap.timeline({
  repeat: 2,           // 重复次数（-1为无限）
  yoyo: true,          // 来回播放
  delay: 0.5,          // 延迟开始
  paused: true,        // 初始暂停
  onStart: () => console.log("开始"),
  onUpdate: () => console.log("更新"),
  onComplete: () => console.log("完成"),
  onRepeat: () => console.log("重复"),
  onReverseComplete: () => console.log("反向完成")
});
```

## 6.3 添加动画到时间线

### 链式调用

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 50, duration: 0.5 })
  .to(".box3", { rotation: 360, duration: 1 });
```

### add()方法

```javascript
const tl = gsap.timeline();

tl.add(gsap.to(".box1", { x: 100, duration: 1 }))
  .add(gsap.to(".box2", { y: 50, duration: 0.5 }));
```

### 添加标签

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .addLabel("intro")
  .to(".box2", { y: 50, duration: 0.5 })
  .addLabel("middle", 2)
  .to(".box3", { rotation: 360, duration: 1 });

tl.play("intro");
tl.seek("middle");
```

## 6.4 位置参数

### 绝对位置

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })       // 0秒开始
  .to(".box2", { y: 50, duration: 0.5 }, 1)   // 1秒开始
  .to(".box3", { rotation: 360, duration: 1 }, 2);  // 2秒开始
```

### 相对位置

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 50, duration: 0.5 }, "+=0.5")   // 上一个动画结束后0.5秒
  .to(".box3", { rotation: 360, duration: 1 }, "-=0.3");  // 上一个动画结束前0.3秒
```

### 特殊位置标记

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 50, duration: 0.5 }, ">")   // 上一个动画结束时
  .to(".box3", { rotation: 360, duration: 1 }, "<")   // 上一个动画开始时
  .to(".box4", { scale: 2, duration: 0.5 }, "<0.2");  // 上一个动画开始后0.2秒
```

| 标记 | 说明 |
|------|------|
| `">"` | 上一个动画结束时 |
| `"<"` | 上一个动画开始时 |
| `">0.5"` | 上一个动画结束后0.5秒 |
| `"<0.5"` | 上一个动画开始后0.5秒 |
| `"-=0.5"` | 上一个动画结束前0.5秒 |
| `"+=0.5"` | 上一个动画结束后0.5秒 |

## 6.5 时间线控制

### 播放控制

```javascript
const tl = gsap.timeline({ paused: true });

tl.to(".box", { x: 100, duration: 2 });

tl.play();           // 播放
tl.pause();          // 暂停
tl.reverse();        // 反向播放
tl.restart();        // 重新开始
tl.resume();         // 继续播放（不重置）
```

### 时间跳转

```javascript
tl.seek(1);           // 跳转到第1秒
tl.seek("labelName"); // 跳转到标签位置
tl.progress(0.5);     // 跳转到50%进度
tl.time(1.5);         // 设置当前时间为1.5秒
```

### 速度控制

```javascript
tl.timeScale(2);      // 2倍速
tl.timeScale(0.5);    // 0.5倍速
```

### 状态检查

```javascript
tl.isActive();        // 是否正在播放
tl.paused();          // 是否暂停
tl.progress();        // 当前进度(0-1)
tl.time();            // 当前时间
tl.duration();        // 总时长
tl.totalDuration();   // 包含重复的总时长
```

## 6.6 嵌套时间线

### 创建嵌套结构

```javascript
const tl = gsap.timeline();

const intro = gsap.timeline();
intro.to(".logo", { scale: 1, duration: 0.5 })
     .to(".title", { opacity: 1, duration: 0.3 });

const content = gsap.timeline();
content.to(".card", { y: 0, stagger: 0.1, duration: 0.5 });

tl.add(intro)
  .add(content, "-=0.2");
```

### 模块化动画

```javascript
function createIntroAnimation() {
  const tl = gsap.timeline();
  tl.from(".logo", { scale: 0, duration: 0.5 })
    .from(".title", { y: 30, opacity: 0, duration: 0.3 });
  return tl;
}

function createContentAnimation() {
  const tl = gsap.timeline();
  tl.from(".card", { y: 50, opacity: 0, stagger: 0.1, duration: 0.5 });
  return tl;
}

const master = gsap.timeline();
master.add(createIntroAnimation())
      .add(createContentAnimation(), "-=0.2");
```

## 6.7 实用示例

### 页面加载序列

```javascript
const tl = gsap.timeline();

tl.set(".hero", { visibility: "visible" })
  .from(".hero-bg", { scale: 1.2, duration: 1.2, ease: "power2.out" })
  .from(".hero-title", { y: 60, opacity: 0, duration: 0.8 }, "-=0.6")
  .from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.6 }, "-=0.4")
  .from(".hero-btn", { y: 20, opacity: 0, duration: 0.4 }, "-=0.2")
  .from(".nav-item", { y: -20, opacity: 0, stagger: 0.1, duration: 0.3 }, "-=0.3");
```

### 交错动画序列

```javascript
const tl = gsap.timeline();

tl.from(".card", {
  y: 100,
  opacity: 0,
  stagger: {
    each: 0.15,
    from: "center"
  },
  duration: 0.6,
  ease: "power2.out"
});
```

### 循环动画

```javascript
const tl = gsap.timeline({ repeat: -1 });

tl.to(".box", { x: 100, duration: 1 })
  .to(".box", { y: 100, duration: 1 })
  .to(".box", { x: 0, duration: 1 })
  .to(".box", { y: 0, duration: 1 });
```

### 交互式控制

```javascript
const tl = gsap.timeline({ paused: true });

tl.to(".menu", { x: 0, duration: 0.5 })
  .to(".menu-item", { opacity: 1, stagger: 0.1, duration: 0.3 }, "-=0.2");

document.querySelector(".menu-btn").addEventListener("click", () => {
  if (tl.progress() === 0) {
    tl.play();
  } else {
    tl.reverse();
  }
});
```

---

## 交互式演示

<div class="demo-container" data-demo="timeline-demo">
  <div class="demo-preview">
    <div class="demo-boxes">
      <div class="demo-box" id="tl-box1">1</div>
      <div class="demo-box" id="tl-box2">2</div>
      <div class="demo-box" id="tl-box3">3</div>
    </div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">const tl = gsap.timeline();

tl.to("#tl-box1", { x: 100, duration: 0.5 })
  .to("#tl-box2", { x: 100, duration: 0.5 }, "-=0.25")
  .to("#tl-box3", { x: 100, duration: 0.5 }, "-=0.25");</code></pre>
  </div>
  <button class="demo-run-btn">运行代码</button>
  <button class="demo-reset-btn">重置</button>
</div>

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **时间线相比单独使用Tween有什么优势？**
   - 提示：考虑动画管理和控制

2. **位置参数">"和"<"分别表示什么？**
   - 提示：思考与前一个动画的时间关系

### 代码实践

3. **创建一个包含4个步骤的动画序列，每个步骤依次播放**
   - 提示：使用timeline链式调用

4. **创建一个可以正向和反向播放的菜单动画**
   - 提示：使用reverse()方法

---

> **下一章**：[第7章 时间线控制](./02-timeline-control.md) - 掌握动画序列的精确控制

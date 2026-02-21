# 第13章 ScrollTrigger基础

> 实现滚动触发动画，创建引人入胜的滚动体验

## 13.1 ScrollTrigger概述

ScrollTrigger是GSAP最强大的插件之一，让动画与页面滚动完美结合。

```text
┌─────────────────────────────────────────────────────────────┐
│                   ScrollTrigger 工作原理                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  页面滚动                                                    │
│     ↓                                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │    trigger元素                                       │   │
│  │    ┌─────────────┐                                  │   │
│  │    │             │ ← start触发点                    │   │
│  │    │   动画元素   │                                  │   │
│  │    │             │ ← end触发点                      │   │
│  │    └─────────────┘                                  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  当滚动到start位置时开始动画                                 │
│  当滚动到end位置时结束动画                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 13.2 基础用法

### 注册插件

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

### 基本配置

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});
```

### 独立创建

```javascript
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  end: "bottom center",
  onEnter: () => console.log("进入"),
  onLeave: () => console.log("离开"),
  onEnterBack: () => console.log("从下方进入"),
  onLeaveBack: () => console.log("从上方离开")
});
```

## 13.3 触发位置

### start和end语法

```javascript
start: "top center"
// 格式: "触发器位置 视口位置"

start: "top bottom"    // 触发器顶部碰到视口底部
start: "top center"    // 触发器顶部碰到视口中心
start: "top top"       // 触发器顶部碰到视口顶部
start: "center center" // 触发器中心碰到视口中心
start: "bottom top"    // 触发器底部碰到视口顶部
```

### 位置示意图

```text
视口                    触发器
┌─────────────┐        ┌─────────────┐
│     top     │        │     top     │
│             │        │             │
│   center    │ ←───→  │   center    │
│             │        │             │
│   bottom    │        │   bottom    │
└─────────────┘        └─────────────┘

start: "top center" 表示触发器top碰到视口center时触发
```

### 数值位置

```javascript
start: "top 100px"     // 触发器顶部距离视口顶部100px
start: "top -=100"     // 触发器顶部距离视口顶部-100px
end: "+=500"           // 从start位置开始500px后结束
```

## 13.4 scrub模式

### 什么是scrub？

scrub让动画进度与滚动位置直接关联：

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    scrub: true
  }
});
```

### scrub值

```javascript
scrub: true     // 动画直接跟随滚动
scrub: 0.5      // 动画有0.5秒的延迟跟随
scrub: 1        // 动画有1秒的延迟跟随
```

### 效果对比

```text
scrub: true              scrub: 1
滚动 ↔ 动画进度           滚动 → 动画进度（有延迟）

滚动: 0%  → 动画: 0%      滚动: 0%  → 动画: 0%
滚动: 50% → 动画: 50%     滚动: 50% → 动画: 渐进到50%
滚动: 100% → 动画: 100%   滚动: 100% → 动画: 渐进到100%
```

## 13.5 钉住元素（pin）

### 基础钉住

```javascript
ScrollTrigger.create({
  trigger: ".section",
  pin: true,
  start: "top top",
  end: "+=500"
});
```

### 钉住动画

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".section",
    pin: true,
    scrub: true,
    start: "top top",
    end: "+=500"
  }
});
```

### pinSpacing

```javascript
pin: true,
pinSpacing: true    // 自动添加间距（默认）
pinSpacing: false   // 不添加间距
pinSpacing: "margin" // 使用margin而非padding
```

## 13.6 切换和播放

### toggleActions

定义滚动到触发点时的行为：

```javascript
scrollTrigger: {
  trigger: ".box",
  toggleActions: "play pause resume reset"
}
```

| 位置 | 说明 |
|------|------|
| onEnter | 向下滚动进入触发点 |
| onLeave | 向下滚动离开触发点 |
| onEnterBack | 向上滚动进入触发点 |
| onLeaveBack | 向上滚动离开触发点 |

### toggleActions值

| 值 | 说明 |
|------|------|
| `play` | 播放动画 |
| `pause` | 暂停动画 |
| `resume` | 继续播放 |
| `reset` | 重置到初始状态 |
| `restart` | 重新开始 |
| `complete` | 跳到结束状态 |
| `reverse` | 反向播放 |
| `none` | 无动作 |

### 常用组合

```javascript
toggleActions: "play none none reverse"
toggleActions: "play pause resume reset"
toggleActions: "restart pause reverse pause"
```

## 13.7 回调函数

### 滚动回调

```javascript
ScrollTrigger.create({
  trigger: ".section",
  onEnter: () => console.log("进入"),
  onLeave: () => console.log("离开"),
  onEnterBack: () => console.log("从下方进入"),
  onLeaveBack: () => console.log("从上方离开"),
  onUpdate: (self) => {
    console.log("进度:", self.progress);
  },
  onToggle: (self) => {
    console.log("切换:", self.isActive);
  }
});
```

### 回调参数

回调函数接收self对象：

```javascript
onUpdate: (self) => {
  console.log(self.progress);     // 当前进度 0-1
  console.log(self.direction);    // 滚动方向 1或-1
  console.log(self.isActive);     // 是否激活
  console.log(self.trigger);      // 触发元素
  console.log(self.start);        // start位置
  console.log(self.end);          // end位置
}
```

## 13.8 实用示例

### 滚动显示

```javascript
gsap.from(".fade-in", {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: ".fade-in",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});
```

### 视差效果

```javascript
gsap.to(".parallax-bg", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
```

### 水平滚动

```javascript
const sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-container",
    pin: true,
    scrub: 1,
    end: "+=3000"
  }
});
```

### 进度指示器

```javascript
gsap.to(".progress-bar", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});
```

---

## 交互式演示

<div class="demo-container" data-demo="scrolltrigger-demo">
  <div class="demo-preview" style="height: 200px; overflow-y: auto;">
    <div style="height: 100px;">向下滚动查看效果</div>
    <div class="demo-box scroll-demo-box" id="scroll-box">滚动触发</div>
    <div style="height: 100px;"></div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">gsap.from("#scroll-box", {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: "#scroll-box",
    start: "top center",
    toggleActions: "play none none reverse"
  },
  duration: 0.5
});</code></pre>
  </div>
  <button class="demo-run-btn">运行代码</button>
</div>

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **start: "top center"表示什么意思？**
   - 提示：考虑触发器位置和视口位置

2. **scrub: true和scrub: 1有什么区别？**
   - 提示：思考动画与滚动的同步方式

### 代码实践

3. **创建一个元素滚动到视口时淡入显示的动画**
   - 提示：使用toggleActions

4. **创建一个简单的视差滚动效果**
   - 提示：使用scrub和yPercent

---

> **下一章**：[第14章 ScrollTrigger进阶](./04-scrolltrigger-advanced.md) - 掌握高级滚动动画技巧

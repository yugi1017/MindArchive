# 第9章 交错动画

> 创建批量元素的动画效果，实现优雅的序列动画

## 9.1 什么是交错动画？

交错动画（Stagger）让多个元素按顺序依次执行动画，产生波浪式或序列式的视觉效果。

```text
┌─────────────────────────────────────────────────────────────┐
│                     交错动画效果                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  无交错（同时执行）                                          │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐                            │
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │  ← 同时开始                │
│  └───┘ └───┘ └───┘ └───┘ └───┘                            │
│                                                             │
│  有交错（依次执行）                                          │
│  ┌───┐                                                     │
│  │ 1 │ ← 先开始                                             │
│  └───┘ ┌───┐                                               │
│        │ 2 │ ← 稍后开始                                     │
│        └───┘ ┌───┐                                         │
│              │ 3 │ ← 更后开始                               │
│              └───┘ ┌───┐                                   │
│                    │ 4 │                                   │
│                    └───┘ ┌───┐                             │
│                          │ 5 │                             │
│                          └───┘                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 9.2 基础交错

### 简单数值

```javascript
gsap.from(".box", {
  opacity: 0,
  y: 50,
  stagger: 0.1,
  duration: 0.5
});
```

数值表示每个元素之间的延迟时间（秒）。

### 效果演示

```text
时间轴:  0s    0.1s   0.2s   0.3s   0.4s
         │      │      │      │      │
元素1:   ████████████
元素2:          ████████████
元素3:                 ████████████
元素4:                        ████████████
元素5:                               ████████████
```

## 9.3 交错对象配置

### 基础配置

```javascript
gsap.from(".box", {
  opacity: 0,
  y: 50,
  stagger: {
    each: 0.1,
    from: "start",
    ease: "power2.out"
  },
  duration: 0.5
});
```

### 配置选项

| 属性 | 说明 | 默认值 |
|------|------|--------|
| `each` | 每个元素之间的延迟 | 0 |
| `from` | 开始位置 | "start" |
| `amount` | 总延迟时间 | - |
| `ease` | 交错缓动 | "none" |
| `grid` | 网格布局 | - |
| `axis` | 网格轴 | - |
| `repeat` | 重复次数 | 0 |
| `yoyo` | 来回交错 | false |

## 9.4 from选项

### 预设位置

```javascript
stagger: { each: 0.1, from: "start" }
stagger: { each: 0.1, from: "end" }
stagger: { each: 0.1, from: "center" }
stagger: { each: 0.1, from: "edges" }
stagger: { each: 0.1, from: "random" }
```

### 效果对比

```text
from: "start"          from: "end"           from: "center"
┌───┐ ┌───┐ ┌───┐     ┌───┐ ┌───┐ ┌───┐     ┌───┐ ┌───┐ ┌───┐
│ 1 │ │ 2 │ │ 3 │     │ 3 │ │ 2 │ │ 1 │     │ 2 │ │ 1 │ │ 2 │
└───┘ └───┘ └───┘     └───┘ └───┘ └───┘     └───┘ └───┘ └───┘
 ↓     ↓     ↓         ↓     ↓     ↓         ↓     ↓     ↓
先    中    后        后    中    先        中    先    中

from: "edges"          from: "random"
┌───┐ ┌───┐ ┌───┐     ┌───┐ ┌───┐ ┌───┐
│ 1 │ │ 3 │ │ 1 │     │ ? │ │ ? │ │ ? │
└───┘ └───┘ └───┘     └───┘ └───┘ └───┘
 ↓     ↓     ↓         ↓     ↓     ↓
先    后    先        随机顺序
```

### 指定索引

```javascript
stagger: {
  each: 0.1,
  from: 2
}
```

从索引为2的元素开始向两边扩散。

## 9.5 网格交错

### 基础网格

```javascript
gsap.from(".grid-item", {
  opacity: 0,
  scale: 0.5,
  stagger: {
    each: 0.1,
    from: "center",
    grid: [4, 5]
  },
  duration: 0.5
});
```

### 网格效果

```text
grid: [3, 3], from: "center"

┌───┐ ┌───┐ ┌───┐
│ 3 │ │ 2 │ │ 3 │
└───┘ └───┘ └───┘
┌───┐ ┌───┐ ┌───┐
│ 2 │ │ 1 │ │ 2 │    ← 从中心向外扩散
└───┘ └───┘ └───┘
┌───┐ ┌───┐ ┌───┐
│ 3 │ │ 2 │ │ 3 │
└───┘ └───┘ └───┘
```

### 轴向控制

```javascript
stagger: {
  each: 0.1,
  from: "start",
  grid: [4, 5],
  axis: "x"
}

stagger: {
  each: 0.1,
  from: "start",
  grid: [4, 5],
  axis: "y"
}
```

## 9.6 高级配置

### amount选项

使用总延迟时间而非每个元素的延迟：

```javascript
stagger: {
  amount: 1,
  from: "start"
}
```

如果5个元素，总延迟1秒，则每个元素间隔约0.25秒。

### 交错缓动

```javascript
stagger: {
  each: 0.2,
  ease: "power2.inOut"
}
```

### 重复和yoyo

```javascript
stagger: {
  each: 0.1,
  repeat: 1,
  yoyo: true
}
```

## 9.7 实用示例

### 导航菜单

```javascript
gsap.from(".nav-item", {
  opacity: 0,
  y: -30,
  stagger: {
    each: 0.1,
    from: "start",
    ease: "power2.out"
  },
  duration: 0.5
});
```

### 卡片网格

```javascript
gsap.from(".card", {
  opacity: 0,
  y: 50,
  scale: 0.9,
  stagger: {
    each: 0.1,
    from: "center",
    grid: [3, 4],
    ease: "power2.out"
  },
  duration: 0.6
});
```

### 文字动画

```javascript
const text = document.querySelector(".text");
const chars = text.textContent.split("");
text.innerHTML = chars.map(char => `<span>${char}</span>`).join("");

gsap.from(".text span", {
  opacity: 0,
  y: 20,
  stagger: {
    each: 0.05,
    from: "start"
  },
  duration: 0.3
});
```

### 列表项

```javascript
gsap.from(".list-item", {
  opacity: 0,
  x: -50,
  stagger: {
    each: 0.15,
    from: "start",
    ease: "power1.out"
  },
  duration: 0.4
});
```

### 波浪效果

```javascript
gsap.to(".wave-item", {
  y: -20,
  stagger: {
    each: 0.1,
    repeat: -1,
    yoyo: true,
    from: "start"
  },
  duration: 0.5,
  ease: "sine.inOut"
});
```

### 随机出现

```javascript
gsap.from(".particle", {
  opacity: 0,
  scale: 0,
  stagger: {
    each: 0.05,
    from: "random"
  },
  duration: 0.3,
  ease: "back.out"
});
```

## 9.8 交错动画最佳实践

### 时间控制

```javascript
// 较少元素 - 较大间隔
stagger: { each: 0.2 }

// 较多元素 - 较小间隔
stagger: { each: 0.05 }

// 使用amount自动计算
stagger: { amount: 0.8 }
```

### 配合其他属性

```javascript
gsap.from(".item", {
  opacity: 0,
  y: 30,
  scale: 0.9,
  stagger: 0.1,
  duration: 0.5,
  ease: "power2.out"
});
```

### 与时间线结合

```javascript
const tl = gsap.timeline();

tl.from(".header", { opacity: 0, y: -50, duration: 0.5 })
  .from(".nav-item", { 
    opacity: 0, 
    y: -20, 
    stagger: 0.1, 
    duration: 0.3 
  }, "-=0.3")
  .from(".card", { 
    opacity: 0, 
    y: 30, 
    stagger: {
      each: 0.1,
      from: "center"
    },
    duration: 0.4
  }, "-=0.2");
```

---

## 交互式演示

<div class="demo-container" data-demo="stagger-demo">
  <div class="demo-preview">
    <div class="demo-boxes stagger-demo">
      <div class="demo-box">1</div>
      <div class="demo-box">2</div>
      <div class="demo-box">3</div>
      <div class="demo-box">4</div>
      <div class="demo-box">5</div>
    </div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">gsap.from(".stagger-demo .demo-box", {
  opacity: 0,
  y: 50,
  scale: 0.8,
  stagger: {
    each: 0.1,
    from: "center",
    ease: "power2.out"
  },
  duration: 0.5
});</code></pre>
  </div>
  <button class="demo-run-btn">运行代码</button>
  <button class="demo-reset-btn">重置</button>
</div>

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **stagger: 0.1和stagger: { each: 0.1 }有什么区别？**
   - 提示：考虑配置灵活性

2. **from: "center"和from: "edges"的区别是什么？**
   - 提示：思考动画开始的位置

### 代码实践

3. **创建一个3x3网格的卡片，从中心向外依次出现**
   - 提示：使用grid选项

4. **创建一个文字逐字出现的动画效果**
   - 提示：将文字拆分为span元素

---

> **下一章**：[第10章 回调与事件](./05-callbacks-events.md) - 处理动画生命周期事件

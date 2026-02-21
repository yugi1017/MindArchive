# 第11章 SVG动画

> 掌握SVG路径与变形动画，创建精美的矢量图形动画效果

## 11.1 SVG动画概述

GSAP对SVG动画提供了强大的支持，包括属性动画、路径动画、变形动画等。

```text
┌─────────────────────────────────────────────────────────────┐
│                    SVG动画类型                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   属性动画    │  │   描边动画    │  │   变形动画    │      │
│  │  fill, stroke │  │ strokeDash   │  │  MorphSVG    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   路径动画    │  │   裁剪动画    │  │   滤镜动画    │      │
│  │ MotionPath   │  │  clipPath    │  │   filter     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 11.2 SVG基础属性动画

### fill和stroke

```javascript
gsap.to("circle", {
  fill: "#e74c3c",
  stroke: "#3498db",
  strokeWidth: 3,
  duration: 1
});
```

### 几何属性

使用`attr`对象动画SVG属性：

```javascript
gsap.to("circle", {
  attr: {
    cx: 100,
    cy: 100,
    r: 50
  },
  duration: 1
});

gsap.to("rect", {
  attr: {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    rx: 10
  },
  duration: 1
});
```

### viewBox动画

```javascript
gsap.to("svg", {
  attr: {
    viewBox: "0 0 200 200"
  },
  duration: 1
});
```

## 11.3 描边动画

### strokeDasharray

使用stroke-dasharray和stroke-dashoffset创建描边动画：

```javascript
const path = document.querySelector("path");
const length = path.getTotalLength();

gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length
});

gsap.to(path, {
  strokeDashoffset: 0,
  duration: 2,
  ease: "none"
});
```

### 描边效果

```text
strokeDashoffset: length    strokeDashoffset: 0
(完全隐藏)                   (完全显示)

┌─────────────────┐         ┌─────────────────┐
│                 │         │ ─────────────── │
│                 │   ──→   │                 │
│                 │         │                 │
└─────────────────┘         └─────────────────┘
```

### DrawSVGPlugin（付费插件）

```javascript
gsap.from("path", {
  drawSVG: "0%",
  duration: 2
});

gsap.from("path", {
  drawSVG: "100% 100%",
  duration: 2
});

gsap.to("path", {
  drawSVG: "50% 100%",
  duration: 1
});
```

## 11.4 路径动画

### MotionPathPlugin

让元素沿SVG路径移动：

```javascript
gsap.to(".box", {
  motionPath: {
    path: "#path",
    align: "#path",
    alignOrigin: [0.5, 0.5]
  },
  duration: 3,
  ease: "none"
});
```

### 路径定义

```html
<svg>
  <path id="motionPath" d="M10,50 Q50,10 90,50 T170,50" fill="none" stroke="#ccc"/>
</svg>
<div class="box"></div>

<script>
gsap.to(".box", {
  motionPath: {
    path: "#motionPath",
    align: "#path"
  },
  duration: 2,
  repeat: -1,
  ease: "none"
});
</script>
```

### 路径选项

```javascript
gsap.to(".box", {
  motionPath: {
    path: "#path",
    align: "#path",
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
    start: 0.2,
    end: 0.8
  },
  duration: 2
});
```

| 选项 | 说明 |
|------|------|
| `path` | 路径选择器或路径数据 |
| `align` | 对齐到路径 |
| `alignOrigin` | 对齐原点 [x, y] |
| `autoRotate` | 自动旋转 |
| `start` | 起始位置 (0-1) |
| `end` | 结束位置 (0-1) |

## 11.5 SVG变形动画

### MorphSVGPlugin（付费插件）

在两个SVG形状之间平滑变形：

```javascript
gsap.to("#shape1", {
  morphSVG: "#shape2",
  duration: 1
});

gsap.to("#circle", {
  morphSVG: "M10,30 L30,10 L50,30 L30,50 Z",
  duration: 1
});
```

### 形状索引优化

```javascript
gsap.to("#shape1", {
  morphSVG: {
    shape: "#shape2",
    shapeIndex: 1
  },
  duration: 1
});
```

## 11.6 SVG裁剪和遮罩

### clipPath动画

```javascript
gsap.to("circle", {
  attr: {
    r: 100
  },
  duration: 1
});
```

```html
<svg>
  <defs>
    <clipPath id="clip">
      <circle cx="100" cy="100" r="10"/>
    </clipPath>
  </defs>
  <image href="image.jpg" clip-path="url(#clip)"/>
</svg>
```

### mask动画

```javascript
gsap.to("#mask rect", {
  attr: {
    width: 200,
    height: 200
  },
  duration: 1
});
```

## 11.7 SVG滤镜动画

### 模糊效果

```javascript
gsap.to("#blur-filter", {
  attr: {
    stdDeviation: 5
  },
  duration: 1
});
```

```html
<svg>
  <defs>
    <filter id="blur">
      <feGaussianBlur id="blur-filter" stdDeviation="0"/>
    </filter>
  </defs>
  <rect filter="url(#blur)" width="100" height="100"/>
</svg>
```

## 11.8 实用示例

### 加载动画

```javascript
const tl = gsap.timeline({ repeat: -1 });

tl.to(".loader-path", {
  strokeDashoffset: 0,
  duration: 1,
  ease: "power2.inOut"
})
.to(".loader-path", {
  strokeDashoffset: -200,
  duration: 1,
  ease: "power2.inOut"
});
```

### 图标动画

```javascript
gsap.to(".menu-icon line", {
  attr: {
    y1: 12,
    y2: 12
  },
  stagger: 0.1,
  duration: 0.3
});
```

### 路径绘制

```javascript
const paths = document.querySelectorAll("path");

paths.forEach((path, i) => {
  const length = path.getTotalLength();
  
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
  });
  
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1,
    delay: i * 0.2,
    ease: "power2.out"
  });
});
```

### 沿路径移动

```javascript
gsap.registerPlugin(MotionPathPlugin);

gsap.to(".plane", {
  motionPath: {
    path: "#flightPath",
    align: "#flightPath",
    alignOrigin: [0.5, 0.5],
    autoRotate: true
  },
  duration: 5,
  ease: "none",
  repeat: -1
});
```

---

## 交互式演示

<div class="demo-container" data-demo="svg-demo">
  <div class="demo-preview">
    <svg width="200" height="100" viewBox="0 0 200 100">
      <path id="svg-demo-path" d="M10,50 Q50,10 90,50 T170,50" 
            fill="none" stroke="#3498db" stroke-width="3"/>
    </svg>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">const path = document.getElementById("svg-demo-path");
const length = path.getTotalLength();

gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length
});

gsap.to(path, {
  strokeDashoffset: 0,
  duration: 2,
  ease: "power2.out"
});</code></pre>
  </div>
  <button class="demo-run-btn">运行代码</button>
  <button class="demo-reset-btn">重置</button>
</div>

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **strokeDasharray和strokeDashoffset如何配合创建描边动画？**
   - 提示：思考如何隐藏和显示路径

2. **MotionPathPlugin的作用是什么？**
   - 提示：考虑元素与路径的关系

### 代码实践

3. **创建一个圆形描边动画，从0度绘制到360度**
   - 提示：使用strokeDasharray和strokeDashoffset

4. **创建一个元素沿圆形路径移动的动画**
   - 提示：使用MotionPathPlugin

---

> **下一章**：[第12章 3D变换](./02-3d-transforms.md) - 创建立体视觉效果

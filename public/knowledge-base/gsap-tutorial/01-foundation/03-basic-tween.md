# 第3章 基础Tween动画

> 学会创建简单动画效果，理解Tween的核心概念

## 3.1 什么是Tween？

Tween（补间动画）是GSAP的核心概念，它定义了元素从一个状态到另一个状态的过渡过程。

```text
┌─────────────────────────────────────────────────────────┐
│                    Tween 动画过程                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   起始状态 ──────────────────────────→ 结束状态         │
│                                                         │
│   ┌─────┐      duration: 1s       ┌─────────┐          │
│   │ x:0 │  ─────────────────────→ │ x: 100  │          │
│   │ y:0 │      ease: power2       │ y: 50   │          │
│   └─────┘                         └─────────┘          │
│                                                         │
│   时间: 0s ────────────────────────────────→ 1s        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Tween的组成要素

| 要素 | 说明 | 示例 |
|------|------|------|
| **目标** | 要动画的元素 | `".box"` 或 `document.querySelector(".box")` |
| **持续时间** | 动画时长 | `duration: 1` (秒) |
| **属性** | 要变化的属性 | `{ x: 100, opacity: 0.5 }` |
| **缓动** | 动画速度曲线 | `ease: "power2.out"` |

## 3.2 GSAP核心方法

GSAP提供三个核心方法创建Tween：

### gsap.to() - 动画到目标状态

从当前状态动画到指定的目标状态：

```javascript
// 语法
gsap.to(target, vars);

// 示例：将.box元素移动到x:100的位置
gsap.to(".box", {
  x: 100,        // 目标x位置
  duration: 1,   // 持续时间
  ease: "power2.out"  // 缓动函数
});
```

```text
当前状态                    目标状态
┌─────┐                    ┌─────┐
│ .box│ ──── gsap.to ────→ │ .box│
│ x: 0│                    │x:100│
└─────┘                    └─────┘
```

### gsap.from() - 从指定状态开始

从指定的初始状态动画到当前状态：

```javascript
// 从x:100的位置动画到当前位置
gsap.from(".box", {
  x: 100,       // 起始x位置
  opacity: 0,   // 起始透明度
  duration: 1
});
```

```text
指定状态                    当前状态
┌─────┐                    ┌─────┐
│ .box│ ──── gsap.from ──→ │ .box│
│x:100│                    │ x: 0│
│op: 0│                    │op: 1│
└─────┘                    └─────┘
```

### gsap.fromTo() - 完全控制起点和终点

明确指定起始状态和目标状态：

```javascript
// 从x:0动画到x:100
gsap.fromTo(".box", 
  { x: 0, opacity: 0 },      // 起始状态
  { x: 100, opacity: 1, duration: 1 }  // 目标状态
);
```

```text
指定起始状态               指定目标状态
┌─────┐                    ┌─────┐
│ .box│ ──── gsap.fromTo ─→│ .box│
│ x: 0│                    │x:100│
│op: 0│                    │op: 1│
└─────┘                    └─────┘
```

## 3.3 目标选择器

### 字符串选择器

```javascript
// 类选择器
gsap.to(".box", { x: 100 });

// ID选择器
gsap.to("#logo", { x: 100 });

// 复合选择器
gsap.to(".container .box:first-child", { x: 100 });

// 多个元素
gsap.to(".box, .circle", { x: 100 });
```

### DOM元素

```javascript
// 单个元素
const box = document.querySelector(".box");
gsap.to(box, { x: 100 });

// 元素数组
const boxes = document.querySelectorAll(".box");
gsap.to(boxes, { x: 100 });
```

### 数组和NodeList

```javascript
// NodeList
const boxes = document.querySelectorAll(".box");
gsap.to(boxes, { x: 100 });

// 数组
const elements = [element1, element2, element3];
gsap.to(elements, { x: 100 });
```

### 对象属性动画

GSAP不仅可以动画DOM元素，还可以动画任意对象：

```javascript
const obj = { value: 0 };

gsap.to(obj, {
  value: 100,
  duration: 1,
  onUpdate: () => {
    console.log(obj.value);  // 实时输出变化的值
  }
});
```

## 3.4 常用动画属性

### 变换属性（Transform）

GSAP使用简化的属性名：

| GSAP属性 | CSS对应 | 说明 |
|----------|---------|------|
| `x` | `transform: translateX()` | X轴位移 |
| `y` | `transform: translateY()` | Y轴位移 |
| `xPercent` | `transform: translateX(% )` | X轴百分比位移 |
| `yPercent` | `transform: translateY(%)` | Y轴百分比位移 |
| `rotation` | `transform: rotate()` | 旋转（度） |
| `rotationX` | `transform: rotateX()` | X轴旋转 |
| `rotationY` | `transform: rotateY()` | Y轴旋转 |
| `scale` | `transform: scale()` | 缩放 |
| `scaleX` | `transform: scaleX()` | X轴缩放 |
| `scaleY` | `transform: scaleY()` | Y轴缩放 |
| `skewX` | `transform: skewX()` | X轴倾斜 |
| `skewY` | `transform: skewY()` | Y轴倾斜 |

```javascript
gsap.to(".box", {
  x: 100,           // 向右移动100px
  y: 50,            // 向下移动50px
  rotation: 45,     // 旋转45度
  scale: 1.5,       // 放大1.5倍
  duration: 1
});
```

### CSS属性

```javascript
gsap.to(".box", {
  width: 200,           // 宽度
  height: 200,          // 高度
  backgroundColor: "#ff0000",  // 背景色（驼峰命名）
  borderRadius: "50%",  // 圆角
  borderWidth: 5,       // 边框宽度
  opacity: 0.5,         // 透明度
  duration: 1
});
```

### 颜色动画

GSAP可以自动处理颜色过渡：

```javascript
gsap.to(".box", {
  backgroundColor: "#3498db",  // 从当前颜色过渡到蓝色
  borderColor: "rgba(255,0,0,0.5)",  // 支持rgba
  color: "hsl(120, 100%, 50%)",  // 支持hsl
  duration: 1
});
```

### 特殊属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `duration` | Number | 动画持续时间（秒） |
| `delay` | Number | 动画延迟时间（秒） |
| `ease` | String/Function | 缓动函数 |
| `repeat` | Number | 重复次数（-1为无限） |
| `yoyo` | Boolean | 是否来回播放 |
| `stagger` | Number/Object | 交错延迟 |
| `onStart` | Function | 动画开始回调 |
| `onUpdate` | Function | 动画更新回调 |
| `onComplete` | Function | 动画完成回调 |

## 3.5 创建第一个动画

### 基础位移动画

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>GSAP First Animation</title>
  <style>
    .box {
      width: 100px;
      height: 100px;
      background: #3498db;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="box"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script>
    gsap.to(".box", {
      x: 200,       // 向右移动200px
      duration: 1,  // 持续1秒
      ease: "power2.out"  // 缓动效果
    });
  </script>
</body>
</html>
```

### 组合多个属性

```javascript
gsap.to(".box", {
  x: 200,
  y: 100,
  rotation: 360,
  scale: 1.5,
  backgroundColor: "#e74c3c",
  borderRadius: "50%",
  duration: 1.5,
  ease: "elastic.out(1, 0.5)"
});
```

### 重复和来回播放

```javascript
gsap.to(".box", {
  x: 200,
  duration: 1,
  repeat: 3,    // 重复3次（共播放4次）
  yoyo: true,   // 来回播放
  ease: "power2.inOut"
});
```

```text
播放流程：
位置0 ──→ 位置200 ──→ 位置0 ──→ 位置200 ──→ 位置0 ──→ 位置200 ──→ 位置0
      (1)        (2)       (3)       (4)       (5)       (6)       (7)
```

## 3.6 动画控制

Tween返回一个动画实例，可以用来控制动画：

```javascript
const tween = gsap.to(".box", {
  x: 200,
  duration: 2,
  paused: true  // 初始暂停
});

// 控制方法
tween.play();       // 播放
tween.pause();      // 暂停
tween.reverse();    // 反向播放
tween.restart();    // 重新开始
tween.seek(1);      // 跳转到第1秒
tween.progress(0.5);// 跳转到50%进度
tween.timeScale(2); // 2倍速播放
tween.kill();       // 销毁动画
```

### 动画状态检查

```javascript
const tween = gsap.to(".box", { x: 200, duration: 2 });

console.log(tween.isActive());  // 是否正在播放
console.log(tween.paused());    // 是否暂停
console.log(tween.progress());  // 当前进度(0-1)
console.log(tween.time());      // 当前时间
console.log(tween.duration());  // 总时长
```

## 3.7 实用示例

### 淡入效果

```javascript
gsap.from(".element", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  ease: "power2.out"
});
```

### 弹跳效果

```javascript
gsap.from(".ball", {
  y: -200,
  duration: 1.5,
  ease: "bounce.out"
});
```

### 脉冲效果

```javascript
gsap.to(".pulse", {
  scale: 1.1,
  duration: 0.3,
  repeat: -1,      // 无限重复
  yoyo: true,
  ease: "power1.inOut"
});
```

### 摇晃效果

```javascript
gsap.to(".shake", {
  x: 10,
  duration: 0.1,
  repeat: 5,
  yoyo: true,
  ease: "none"
});
```

---

## 交互式演示

<div class="demo-container" data-demo="basic-tween">
  <div class="demo-preview">
    <div class="demo-box" id="tween-demo-box">动画元素</div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">// 编辑代码后点击运行
gsap.to("#tween-demo-box", {
  x: 150,
  rotation: 360,
  backgroundColor: "#e74c3c",
  borderRadius: "50%",
  duration: 1,
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

1. **gsap.to()、gsap.from()、gsap.fromTo()三者的区别是什么？**
   - 提示：思考起始状态和结束状态的来源

2. **为什么GSAP使用x/y而不是translateX/translateY？**
   - 提示：考虑性能和API设计

### 代码实践

3. **创建一个元素从屏幕左侧滑入的动画**
   - 提示：使用gsap.from()设置初始x值为负数

4. **创建一个无限旋转的动画**
   - 提示：使用repeat: -1和rotation属性

---

> **下一章**：[第4章 动画属性详解](./04-tween-properties.md) - 深入了解所有可动画属性

# 第4章 动画属性详解

> 深入了解所有可动画属性，掌握属性动画的技巧

## 4.1 属性分类概览

GSAP可以动画几乎所有CSS属性，分为以下几类：

```text
┌─────────────────────────────────────────────────────────────┐
│                    GSAP 可动画属性                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Transform属性 │  │  CSS样式属性  │  │  特殊属性    │      │
│  │  x, y, scale │  │ width, color │  │ scroll, text │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   SVG属性    │  │  CSS变量     │  │  自定义属性   │      │
│  │ stroke, fill │  │ --var-name   │  │ 任意对象属性  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 4.2 Transform属性

### 位移属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `x` | X轴位移(px) | `x: 100` |
| `y` | Y轴位移(px) | `y: 50` |
| `xPercent` | X轴位移(%) | `xPercent: 50` |
| `yPercent` | Y轴位移(%) | `yPercent: -100` |

```javascript
gsap.to(".box", {
  x: 100,          // 向右移动100px
  y: 50,           // 向下移动50px
  duration: 1
});

gsap.to(".box", {
  xPercent: 50,    // 向右移动自身宽度的50%
  yPercent: -100,  // 向上移动自身高度的100%
  duration: 1
});
```

### 百分比位移的应用

```javascript
gsap.to(".box", {
  xPercent: -50,   // 配合CSS居中
  yPercent: -50,
  left: "50%",
  top: "50%",
  duration: 1
});
```

### 旋转属性

| 属性 | 说明 | 单位 |
|------|------|------|
| `rotation` | 2D旋转 | 度(°) |
| `rotationX` | X轴3D旋转 | 度(°) |
| `rotationY` | Y轴3D旋转 | 度(°) |
| `rotationZ` | Z轴旋转(同rotation) | 度(°) |

```javascript
gsap.to(".box", {
  rotation: 360,      // 顺时针旋转360度
  rotationX: 180,     // X轴翻转
  rotationY: 90,      // Y轴旋转
  duration: 1
});
```

### 缩放属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `scale` | 整体缩放 | `scale: 2` |
| `scaleX` | X轴缩放 | `scaleX: 1.5` |
| `scaleY` | Y轴缩放 | `scaleY: 0.5` |

```javascript
gsap.to(".box", {
  scale: 1.5,        // 放大1.5倍
  scaleX: 2,         // 水平放大2倍
  scaleY: 0.5,       // 垂直缩小一半
  duration: 1
});
```

### 倾斜属性

| 属性 | 说明 | 单位 |
|------|------|------|
| `skewX` | X轴倾斜 | 度(°) |
| `skewY` | Y轴倾斜 | 度(°) |

```javascript
gsap.to(".box", {
  skewX: 20,         // X轴倾斜20度
  skewY: -10,        // Y轴倾斜-10度
  duration: 1
});
```

### 变换原点

使用`transformOrigin`设置变换中心点：

```javascript
gsap.to(".box", {
  rotation: 360,
  transformOrigin: "center center",  // 默认值
  duration: 1
});

gsap.to(".box", {
  rotation: 360,
  transformOrigin: "left top",        // 左上角
  duration: 1
});

gsap.to(".box", {
  rotation: 360,
  transformOrigin: "50% 100%",        // 底部中心
  duration: 1
});
```

## 4.3 CSS样式属性

### 尺寸属性

```javascript
gsap.to(".box", {
  width: 200,          // 宽度
  height: 200,         // 高度
  maxWidth: 500,       // 最大宽度
  minWidth: 100,       // 最小宽度
  padding: 20,         // 内边距
  margin: 10,          // 外边距
  duration: 1
});
```

### 边框属性

```javascript
gsap.to(".box", {
  borderWidth: 5,
  borderStyle: "solid",
  borderColor: "#e74c3c",
  borderRadius: "50%",
  duration: 1
});
```

### 背景属性

```javascript
gsap.to(".box", {
  backgroundColor: "#3498db",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  duration: 1
});
```

### 文本属性

```javascript
gsap.to(".text", {
  fontSize: 24,
  fontWeight: "bold",
  letterSpacing: 5,
  lineHeight: 1.5,
  textAlign: "center",
  color: "#e74c3c",
  duration: 1
});
```

### 透明度

```javascript
gsap.to(".box", {
  opacity: 0.5,
  duration: 1
});

gsap.from(".box", {
  autoAlpha: 0,    // opacity: 0 + visibility: hidden
  duration: 1
});
```

`autoAlpha`是GSAP的特殊属性，结合了opacity和visibility：
- 当值变为0时，自动设置visibility: hidden
- 当值从0变为非0时，自动设置visibility: visible

## 4.4 颜色动画

### 支持的颜色格式

```javascript
gsap.to(".box", {
  backgroundColor: "#e74c3c",                    // 十六进制
  borderColor: "rgb(255, 0, 0)",                // RGB
  color: "rgba(255, 0, 0, 0.5)",                // RGBA
  outlineColor: "hsl(120, 100%, 50%)",          // HSL
  duration: 1
});
```

### 颜色插值

GSAP自动处理颜色之间的平滑过渡：

```javascript
gsap.to(".box", {
  backgroundColor: "#3498db",  // 从当前颜色平滑过渡到蓝色
  duration: 1
});
```

## 4.5 特殊属性

### scrollLeft / scrollTop

动画滚动位置：

```javascript
gsap.to(window, {
  scrollTo: { y: 1000, x: 0 },  // 需要ScrollToPlugin
  duration: 1
});

gsap.to(".container", {
  scrollTop: 500,
  duration: 1
});
```

### 文本动画

使用TextPlugin动画文本：

```javascript
gsap.to(".text", {
  text: "Hello GSAP!",
  duration: 2,
  ease: "none"
});
```

### CSS滤镜

```javascript
gsap.to(".box", {
  filter: "blur(5px)",
  backdropFilter: "blur(10px)",
  duration: 1
});
```

### clipPath

```javascript
gsap.to(".box", {
  clipPath: "circle(50% at 50% 50%)",
  duration: 1
});

gsap.to(".box", {
  clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
  duration: 1
});
```

## 4.6 SVG属性

### 基础SVG属性

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
    height: 100
  },
  duration: 1
});
```

### SVG填充和描边

```javascript
gsap.to("path", {
  fill: "#3498db",
  stroke: "#e74c3c",
  strokeWidth: 2,
  duration: 1
});
```

### SVG路径动画

```javascript
gsap.to("path", {
  strokeDasharray: "100%",
  strokeDashoffset: 0,
  duration: 2
});
```

## 4.7 CSS变量动画

GSAP可以动画CSS自定义属性：

```css
:root {
  --main-color: #3498db;
  --spacing: 20px;
}
```

```javascript
gsap.to(":root", {
  "--main-color": "#e74c3c",
  "--spacing": "40px",
  duration: 1
});
```

## 4.8 对象属性动画

GSAP可以动画任意JavaScript对象的属性：

```javascript
const obj = {
  x: 0,
  y: 0,
  rotation: 0
};

gsap.to(obj, {
  x: 100,
  y: 50,
  rotation: 360,
  duration: 1,
  onUpdate: () => {
    console.log(`x: ${obj.x}, y: ${obj.y}, rotation: ${obj.rotation}`);
  }
});
```

### 应用场景

```javascript
const counter = { value: 0 };

gsap.to(counter, {
  value: 100,
  duration: 2,
  ease: "power1.out",
  onUpdate: () => {
    document.querySelector(".counter").textContent = Math.round(counter.value);
  }
});
```

## 4.9 相对值

### 相对位移

使用`+=`或`-=`表示相对值：

```javascript
gsap.to(".box", {
  x: "+=100",     // 在当前位置基础上加100px
  y: "-=50",      // 在当前位置基础上减50px
  rotation: "+=90", // 在当前角度基础上加90度
  duration: 1
});
```

### 函数式值

使用函数动态计算值：

```javascript
gsap.to(".box", {
  x: function(index, target) {
    return index * 100;  // 每个元素根据索引设置不同的x值
  },
  duration: 1
});
```

## 4.10 属性组合示例

### 综合变换

```javascript
gsap.to(".box", {
  x: 100,
  y: 50,
  rotation: 45,
  scale: 1.2,
  skewX: 10,
  transformOrigin: "center center",
  duration: 1,
  ease: "power2.out"
});
```

### 复杂样式动画

```javascript
gsap.to(".card", {
  width: 300,
  height: 400,
  backgroundColor: "#2c3e50",
  borderRadius: 20,
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  padding: 30,
  duration: 0.5
});
```

---

## 交互式演示

<div class="demo-container" data-demo="properties-demo">
  <div class="demo-preview">
    <div class="demo-box" id="properties-box">变换元素</div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">gsap.to("#properties-box", {
  x: 100,
  y: 30,
  rotation: 45,
  scale: 1.2,
  backgroundColor: "#9b59b6",
  borderRadius: "20px",
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

1. **x和xPercent有什么区别？各适用于什么场景？**
   - 提示：考虑绝对值和相对值的差异

2. **autoAlpha相比opacity有什么优势？**
   - 提示：思考visibility属性的作用

### 代码实践

3. **创建一个元素从屏幕中心放大到全屏的动画**
   - 提示：使用scale和transformOrigin

4. **创建一个数字从0滚动到1000的动画效果**
   - 提示：动画对象属性，在onUpdate中更新显示

---

> **下一章**：[第5章 GSAP核心方法](./05-gsap-methods.md) - 深入学习GSAP的核心API

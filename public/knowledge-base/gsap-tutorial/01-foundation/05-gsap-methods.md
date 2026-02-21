# 第5章 GSAP核心方法

> 深入学习GSAP的核心API，掌握动画创建的高级技巧

## 5.1 核心方法概览

GSAP提供丰富的核心方法来创建和控制动画：

```text
┌─────────────────────────────────────────────────────────────┐
│                    GSAP 核心方法                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   动画创建方法                                               │
│   ┌────────┐ ┌────────┐ ┌──────────┐ ┌────────┐            │
│   │gsap.to │ │gsap.from│ │gsap.fromTo│ │gsap.set│            │
│   └────────┘ └────────┘ └──────────┘ └────────┘            │
│                                                             │
│   时间线方法                                                 │
│   ┌──────────────┐ ┌────────────────┐                      │
│   │ gsap.timeline │ gsap.globalTimeline │                      │
│   └──────────────┘ └────────────────┘                      │
│                                                             │
│   工具方法                                                   │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│   │gsap.killTweensOf│ │gsap.getProperty│ │gsap.utils│ │gsap.ticker│      │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 5.2 gsap.to()

### 基础语法

```javascript
gsap.to(target, vars);
```

| 参数 | 类型 | 说明 |
|------|------|------|
| target | String/Element/Array | 目标元素 |
| vars | Object | 动画属性对象 |

### 详细用法

```javascript
gsap.to(".box", {
  x: 100,
  y: 50,
  duration: 1,
  ease: "power2.out",
  delay: 0.5,
  onComplete: () => {
    console.log("动画完成");
  }
});
```

### 返回值

返回一个Tween实例，可用于控制动画：

```javascript
const tween = gsap.to(".box", { x: 100, duration: 1 });
tween.pause();
tween.play();
```

## 5.3 gsap.from()

### 基础语法

```javascript
gsap.from(target, vars);
```

从指定状态动画到当前状态：

```javascript
gsap.from(".box", {
  x: -200,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});
```

### 常见应用场景

```javascript
gsap.from(".logo", {
  scale: 0,
  opacity: 0,
  duration: 0.8,
  ease: "back.out(1.7)"
});

gsap.from(".nav-item", {
  y: -50,
  opacity: 0,
  stagger: 0.1,
  duration: 0.5
});
```

## 5.4 gsap.fromTo()

### 基础语法

```javascript
gsap.fromTo(target, fromVars, toVars);
```

完全控制起始和结束状态：

```javascript
gsap.fromTo(".box",
  { x: 0, opacity: 0, scale: 0.5 },    // 起始状态
  { x: 200, opacity: 1, scale: 1, duration: 1 }  // 结束状态
);
```

### 注意事项

duration、ease等控制属性应放在toVars中：

```javascript
gsap.fromTo(".box",
  { x: 0 },                              // fromVars - 只有属性值
  { x: 100, duration: 1, ease: "power2" } // toVars - 属性值 + 控制属性
);
```

## 5.5 gsap.set()

### 基础语法

```javascript
gsap.set(target, vars);
```

立即设置属性值，无动画效果：

```javascript
gsap.set(".box", { x: 100, opacity: 0.5 });
```

### 常见用途

```javascript
gsap.set(".box", { visibility: "visible" });

gsap.set(".box", { clearProps: "all" });

gsap.set(".box", { x: 0, y: 0, scale: 1 });
```

### clearProps

清除GSAP设置的行内样式：

```javascript
gsap.set(".box", { clearProps: "transform,opacity" });
gsap.set(".box", { clearProps: "all" });
```

## 5.6 gsap.timeline()

### 基础语法

```javascript
const tl = gsap.timeline(options);
```

创建时间线来管理多个动画：

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 50, duration: 0.5 })
  .to(".box3", { rotation: 360, duration: 1 });
```

### 时间线选项

```javascript
const tl = gsap.timeline({
  repeat: 2,           // 重复2次
  yoyo: true,          // 来回播放
  delay: 0.5,          // 延迟0.5秒
  paused: true,        // 初始暂停
  onStart: () => console.log("开始"),
  onUpdate: () => console.log("更新"),
  onComplete: () => console.log("完成")
});
```

### 时间线位置参数

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })        // 0秒开始
  .to(".box2", { y: 50, duration: 0.5 }, 0.5)  // 0.5秒开始
  .to(".box3", { rotation: 360, duration: 1 }, "-=0.5")  // 前一个动画结束前0.5秒
  .to(".box4", { scale: 2, duration: 0.5 }, ">")  // 前一个动画结束后
  .to(".box5", { opacity: 0, duration: 0.3 }, "<")  // 前一个动画开始时
  .to(".box6", { x: 200, duration: 0.5 }, "+=0.3");  // 前一个动画结束后0.3秒
```

| 位置参数 | 说明 |
|---------|------|
| 数字 | 绝对时间位置（秒） |
| `"+=1"` | 前一个动画结束后1秒 |
| `"-=0.5"` | 前一个动画结束前0.5秒 |
| `">"` | 前一个动画结束时 |
| `"<"` | 前一个动画开始时 |
| `"<0.5"` | 前一个动画开始后0.5秒 |

## 5.7 gsap.globalTimeline

全局时间线控制所有动画：

```javascript
gsap.globalTimeline.pause();

gsap.globalTimeline.play();

gsap.globalTimeline.timeScale(0.5);

gsap.globalTimeline.clear();
```

## 5.8 gsap.killTweensOf()

### 基础用法

停止指定元素的所有动画：

```javascript
gsap.killTweensOf(".box");
```

### 指定属性

只停止特定属性的动画：

```javascript
gsap.killTweensOf(".box", "x,y");
gsap.killTweensOf(".box", { x: true, y: true });
```

### 停止所有动画

```javascript
gsap.killTweensOf("*");
```

## 5.9 gsap.getProperty()

获取元素的属性值：

```javascript
const x = gsap.getProperty(".box", "x");
const rotation = gsap.getProperty(".box", "rotation");

const getBoxProp = gsap.getProperty(".box");
console.log(getBoxProp("x"));
console.log(getBoxProp("y"));
```

## 5.10 gsap.utils

GSAP提供实用工具方法：

### gsap.utils.toArray()

将类数组转为数组：

```javascript
const boxes = gsap.utils.toArray(".box");
const elements = gsap.utils.toArray([elem1, elem2, elem3]);
```

### gsap.utils.random()

生成随机数：

```javascript
const num = gsap.utils.random(0, 100);        // 0-100之间的随机数
const num = gsap.utils.random(0, 100, true);  // 返回小数
const item = gsap.utils.random([1, 2, 3, 4]); // 随机选择数组元素
```

### gsap.utils.snap()

吸附到最近的值：

```javascript
gsap.utils.snap(10)(37);       // 40
gsap.utils.snap([0, 50, 100])(37);  // 50
```

### gsap.utils.wrap()

循环值：

```javascript
const wrap = gsap.utils.wrap(0, 100);
wrap(120);  // 20
wrap(-10);  // 90

const wrapArray = gsap.utils.wrap(["a", "b", "c"]);
wrapArray(3);  // "a"
wrapArray(4);  // "b"
```

### gsap.utils.mapRange()

映射范围：

```javascript
const mapper = gsap.utils.mapRange(0, 100, 0, 1000);
mapper(50);  // 500
mapper(25);  // 250
```

### gsap.utils.pipe()

组合函数：

```javascript
const transform = gsap.utils.pipe(
  gsap.utils.snap(10),
  gsap.utils.wrap(0, 100)
);
transform(107);  // 10
```

## 5.11 gsap.ticker

GSAP的内部更新循环：

```javascript
gsap.ticker.add((time, deltaTime) => {
  console.log(`Time: ${time}, Delta: ${deltaTime}`);
});

gsap.ticker.remove(callback);

gsap.ticker.fps(60);

gsap.ticker.sleep();
gsap.ticker.wake();
```

## 5.12 gsap.matchMedia()

响应式动画：

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", (context) => {
  gsap.to(".box", { x: 100 });
  
  return () => {
    // 清理代码
  };
});

mm.add({
  isMobile: "(max-width: 767px)",
  isDesktop: "(min-width: 768px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isMobile, isDesktop, reduceMotion } = context.conditions;
  
  if (isMobile) {
    gsap.to(".box", { scale: 0.8 });
  }
  
  if (reduceMotion) {
    gsap.globalTimeline.timeScale(0);
  }
});

mm.revert();
```

## 5.13 gsap.context()

批量管理动画：

```javascript
let ctx = gsap.context(() => {
  gsap.to(".box1", { x: 100 });
  gsap.to(".box2", { y: 50 });
  const tl = gsap.timeline();
  tl.to(".box3", { rotation: 360 });
}, container);

ctx.revert();
ctx.clear();
```

## 5.14 实用示例

### 页面加载动画序列

```javascript
const tl = gsap.timeline();

tl.from(".logo", { scale: 0, opacity: 0, duration: 0.8 })
  .from(".nav-item", { y: -30, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.3")
  .from(".hero-title", { y: 50, opacity: 0, duration: 0.6 }, "-=0.2")
  .from(".hero-text", { y: 30, opacity: 0, duration: 0.5 }, "-=0.3")
  .from(".hero-btn", { scale: 0, duration: 0.4 }, "-=0.1");
```

### 响应式动画

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  gsap.to(".box", { x: 500, duration: 1 });
});

mm.add("(max-width: 1023px)", () => {
  gsap.to(".box", { x: 200, duration: 1 });
});
```

### 清理动画

```javascript
function createAnimation() {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100, repeat: -1 });
    gsap.to(".circle", { rotation: 360, repeat: -1 });
  });
  
  return () => ctx.revert();
}

const cleanup = createAnimation();
cleanup();
```

---

## 交互式演示

<div class="demo-container" data-demo="methods-demo">
  <div class="demo-preview">
    <div class="demo-boxes">
      <div class="demo-box" id="method-box1">Box 1</div>
      <div class="demo-box" id="method-box2">Box 2</div>
      <div class="demo-box" id="method-box3">Box 3</div>
    </div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript" contenteditable="true">const tl = gsap.timeline();

tl.to("#method-box1", { x: 100, duration: 0.5 })
  .to("#method-box2", { x: 100, duration: 0.5 }, "-=0.25")
  .to("#method-box3", { x: 100, duration: 0.5 }, "-=0.25");</code></pre>
  </div>
  <button class="demo-run-btn">运行代码</button>
  <button class="demo-reset-btn">重置</button>
</div>

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **gsap.to()和gsap.from()有什么区别？什么时候应该使用哪个？**
   - 提示：思考起始状态和结束状态的来源

2. **时间线位置参数中">"和"<"分别表示什么？**
   - 提示：考虑与前一个动画的时间关系

### 代码实践

3. **创建一个包含5个元素的动画序列，每个元素依次出现**
   - 提示：使用timeline和stagger

4. **使用gsap.matchMedia()创建响应式动画**
   - 提示：区分桌面和移动端的不同动画效果

---

> **下一章**：[第6章 时间线基础](./02-intermediate/01-timeline-basics.md) - 深入学习时间线的概念与用法

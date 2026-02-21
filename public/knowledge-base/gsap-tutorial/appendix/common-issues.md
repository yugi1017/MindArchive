# 常见问题

> GSAP使用中的常见问题与解决方案

## 安装与配置

### Q: gsap is not defined

**问题**：控制台报错 "gsap is not defined"

**原因**：GSAP未正确引入或引入顺序错误

**解决方案**：
```html
<!-- 确保在动画代码之前引入GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  gsap.to(".box", { x: 100 });
</script>
```

### Q: 插件不生效

**问题**：使用了ScrollTrigger但动画不触发

**原因**：未注册插件

**解决方案**：
```javascript
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

## 动画问题

### Q: 动画不执行

**问题**：动画代码正确但元素不动

**可能原因**：
1. 元素不存在
2. CSS样式冲突
3. 元素被隐藏

**排查步骤**：
```javascript
// 检查元素是否存在
console.log(document.querySelector(".box"));

// 检查GSAP是否正常
console.log(gsap.version);

// 使用onStart确认动画是否开始
gsap.to(".box", {
  x: 100,
  onStart: () => console.log("动画开始")
});
```

### Q: 动画闪烁或跳跃

**问题**：动画开始时元素闪烁或位置跳跃

**原因**：元素初始状态与动画起始状态不一致

**解决方案**：
```javascript
// 方案1：使用from设置初始状态
gsap.from(".box", {
  opacity: 0,
  y: 50,
  duration: 1
});

// 方案2：使用fromTo完全控制
gsap.fromTo(".box",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1 }
);

// 方案3：使用set预先设置
gsap.set(".box", { opacity: 0, y: 50 });
gsap.to(".box", { opacity: 1, y: 0, duration: 1 });
```

### Q: 动画重复执行

**问题**：动画意外重复播放

**原因**：可能设置了repeat或创建了多个动画

**解决方案**：
```javascript
// 检查是否有repeat
gsap.to(".box", {
  x: 100,
  repeat: 0  // 确保不重复
});

// 清除之前的动画
gsap.killTweensOf(".box");
gsap.to(".box", { x: 100 });
```

## 性能问题

### Q: 动画卡顿

**问题**：动画不流畅，有卡顿感

**解决方案**：
```javascript
// 1. 使用transform代替布局属性
gsap.to(".box", {
  x: 100,        // 好
  // left: 100   // 差
});

// 2. 避免动画过多元素
gsap.to(".box", { x: 100 });  // 好
// gsap.to("*", { x: 100 });  // 差

// 3. 使用will-change
gsap.set(".box", { willChange: "transform" });
gsap.to(".box", { x: 100 });
```

### Q: 移动端动画慢

**问题**：移动设备上动画变慢

**解决方案**：
```javascript
// 检测设备能力
const isMobile = /Android|iPhone/i.test(navigator.userAgent);

gsap.to(".box", {
  x: isMobile ? 100 : 500,
  duration: isMobile ? 0.5 : 1
});

// 尊重减少动画偏好
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  gsap.to(".box", { x: 100 });
}
```

## ScrollTrigger问题

### Q: ScrollTrigger不触发

**问题**：滚动到触发点但动画不执行

**排查步骤**：
```javascript
// 1. 开启markers调试
ScrollTrigger.create({
  trigger: ".box",
  start: "top center",
  markers: true  // 显示触发位置
});

// 2. 检查trigger元素是否存在
console.log(document.querySelector(".box"));

// 3. 确保页面足够长可以滚动
```

### Q: ScrollTrigger位置不准

**问题**：触发位置与预期不符

**原因**：图片加载或字体加载改变了布局

**解决方案**：
```javascript
// 图片加载后刷新
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// 使用invalidateOnRefresh
ScrollTrigger.create({
  trigger: ".box",
  invalidateOnRefresh: true
});
```

## 时间线问题

### Q: 时间线动画同时执行

**问题**：时间线中的动画同时开始而不是依次执行

**原因**：位置参数设置错误

**解决方案**：
```javascript
const tl = gsap.timeline();

// 正确：依次执行
tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { x: 100, duration: 1 });

// 如果要同时执行，使用位置参数
tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { x: 100, duration: 1 }, 0);  // 0表示从头开始
```

### Q: 时间线无法控制

**问题**：play()、pause()等方法不生效

**原因**：可能创建了多个时间线实例

**解决方案**：
```javascript
// 保存时间线引用
const tl = gsap.timeline({ paused: true });
tl.to(".box", { x: 100 });

// 使用同一个实例控制
document.querySelector(".play").onclick = () => tl.play();
document.querySelector(".pause").onclick = () => tl.pause();
```

## 其他问题

### Q: 如何调试动画？

**解决方案**：
```javascript
// 1. 使用GSDevTools（付费）
GSDevTools.create();

// 2. 使用console.log
gsap.to(".box", {
  x: 100,
  onStart: () => console.log("开始"),
  onUpdate: function() {
    console.log("进度:", this.progress());
  },
  onComplete: () => console.log("完成")
});

// 3. 使用markers（ScrollTrigger）
ScrollTrigger.create({
  trigger: ".box",
  markers: true
});
```

### Q: 如何清除所有动画？

**解决方案**：
```javascript
// 清除特定元素的所有动画
gsap.killTweensOf(".box");

// 清除所有动画
gsap.killTweensOf("*");

// 清除所有ScrollTrigger
ScrollTrigger.getAll().forEach(st => st.kill());

// 使用context清理
let ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
});
ctx.revert();
```

---

> **相关参考**：[调试技巧](./debugging-tips.md) | [API速查](./api-quick-ref.md)

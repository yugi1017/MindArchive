# 第14章 ScrollTrigger进阶

> 掌握高级滚动动画技巧，创建复杂的滚动交互效果

## 14.1 高级触发配置

### markers调试

```javascript
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  end: "bottom top",
  markers: true,
  markers: {
    startColor: "green",
    endColor: "red",
    fontSize: "12px",
    indent: 20
  }
}
```

### 基于容器滚动

```javascript
scrollTrigger: {
  trigger: ".box",
  scroller: ".scroll-container",
  start: "top center"
}
```

### 响应式配置

```javascript
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  horizontal: false,
  invalidateOnRefresh: true,
  refreshPriority: 1
}
```

## 14.2 批量创建

### batch方法

```javascript
ScrollTrigger.batch(".card", {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      stagger: 0.1
    });
  },
  start: "top 90%"
});
```

### 批量配置

```javascript
ScrollTrigger.batch(".item", {
  onEnter: (elements, triggers) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      stagger: 0.15
    });
  },
  onLeave: (elements) => {
    gsap.to(elements, {
      opacity: 0.3,
      y: -20
    });
  },
  onEnterBack: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      stagger: 0.1
    });
  },
  start: "top 80%",
  end: "bottom 20%"
});
```

## 14.3 时间线集成

### 时间线与ScrollTrigger

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    pin: true,
    scrub: 1,
    start: "top top",
    end: "+=2000"
  }
});

tl.from(".title", { opacity: 0, y: 50 })
  .from(".text", { opacity: 0, y: 30 }, "-=0.3")
  .from(".btn", { scale: 0 }, "-=0.2");
```

### 多阶段动画

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: true,
    start: "top top",
    end: "+=3000"
  }
});

tl.to(".scene1", { opacity: 0, duration: 1 })
  .to(".scene2", { opacity: 1, duration: 1 }, 1)
  .to(".scene2", { opacity: 0, duration: 1 }, 2)
  .to(".scene3", { opacity: 1, duration: 1 }, 3);
```

## 14.4 高级钉住效果

### 钉住多个元素

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    pin: ".pin-spacer",
    scrub: true,
    start: "top top",
    end: "+=1000"
  }
});

tl.to(".card1", { x: -500 })
  .to(".card2", { x: -500 }, 0.5)
  .to(".card3", { x: -500 }, 1);
```

### 钉住与动画分离

```javascript
ScrollTrigger.create({
  trigger: ".section",
  pin: ".pinned-element",
  start: "top top",
  end: "+=500"
});

gsap.to(".animated-element", {
  x: 500,
  scrollTrigger: {
    trigger: ".section",
    scrub: true,
    start: "top top",
    end: "+=500"
  }
});
```

## 14.5 滚动捕捉

### snap配置

```javascript
scrollTrigger: {
  trigger: ".section",
  snap: {
    snapTo: 0.5,
    duration: 0.5,
    ease: "power2.out"
  }
}
```

### snap到标签

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: true,
    snap: {
      snapTo: "labels",
      duration: 0.3
    }
  }
});

tl.addLabel("step1")
  .to(".box1", { x: 100 })
  .addLabel("step2")
  .to(".box2", { x: 100 })
  .addLabel("step3")
  .to(".box3", { x: 100 });
```

### snap到数组位置

```javascript
snap: {
  snapTo: [0, 0.25, 0.5, 0.75, 1],
  duration: 0.3,
  directional: false
}
```

## 14.6 刷新和清理

### 刷新ScrollTrigger

```javascript
ScrollTrigger.refresh();

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
```

### 清理ScrollTrigger

```javascript
const st = ScrollTrigger.create({
  trigger: ".box"
});

st.kill();
ScrollTrigger.getAll().forEach(st => st.kill());
ScrollTrigger.clearMatchMedia();
```

### 上下文管理

```javascript
let ctx = gsap.context(() => {
  ScrollTrigger.create({ trigger: ".box" });
  gsap.to(".element", {
    scrollTrigger: { trigger: ".element" }
  });
});

ctx.revert();
```

## 14.7 性能优化

### 避免过多触发器

```javascript
ScrollTrigger.config({
  limitCallbacks: true
});
```

### 使用fastScrollEnd

```javascript
scrollTrigger: {
  trigger: ".box",
  fastScrollEnd: true,
  preventOverlaps: true
}
```

### 延迟刷新

```javascript
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});
```

## 14.8 实用示例

### 全屏滚动幻灯片

```javascript
const sections = gsap.utils.toArray(".slide");

sections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    pin: true,
    start: "top top",
    end: "+=100%",
    pinSpacing: i === sections.length - 1 ? false : true
  });
});
```

### 滚动进度动画

```javascript
gsap.to(".progress", {
  value: 100,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});
```

### 视差层叠效果

```javascript
gsap.utils.toArray(".parallax-layer").forEach((layer, i) => {
  const depth = layer.dataset.depth;
  
  gsap.to(layer, {
    yPercent: -50 * depth,
    ease: "none",
    scrollTrigger: {
      trigger: layer.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
```

### 滚动触发数字动画

```javascript
const counter = { value: 0 };

ScrollTrigger.create({
  trigger: ".counter-section",
  start: "top center",
  onEnter: () => {
    gsap.to(counter, {
      value: 1000,
      duration: 2,
      onUpdate: () => {
        document.querySelector(".counter").textContent = 
          Math.round(counter.value);
      }
    });
  }
});
```

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **batch方法的作用是什么？**
   - 提示：考虑批量处理元素

2. **snap配置如何实现滚动吸附效果？**
   - 提示：思考滚动停止时的行为

### 代码实践

3. **创建一个全屏滚动幻灯片效果**
   - 提示：使用pin和多个section

4. **创建一个多层视差滚动效果**
   - 提示：使用不同的yPercent值

---

> **下一章**：[第15章 响应式动画](./05-responsive-animations.md) - 适配不同屏幕尺寸

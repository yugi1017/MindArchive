# API速查表

> GSAP常用API快速参考

## 核心方法

| 方法 | 语法 | 说明 |
|------|------|------|
| `gsap.to()` | `gsap.to(target, vars)` | 动画到目标状态 |
| `gsap.from()` | `gsap.from(target, vars)` | 从指定状态开始 |
| `gsap.fromTo()` | `gsap.fromTo(target, fromVars, toVars)` | 完全控制起点终点 |
| `gsap.set()` | `gsap.set(target, vars)` | 立即设置属性 |
| `gsap.timeline()` | `gsap.timeline(options)` | 创建时间线 |

## Tween属性

### 控制属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `duration` | Number | 0.5 | 动画时长(秒) |
| `delay` | Number | 0 | 延迟时间(秒) |
| `ease` | String | "power1.out" | 缓动函数 |
| `repeat` | Number | 0 | 重复次数(-1无限) |
| `yoyo` | Boolean | false | 来回播放 |
| `stagger` | Number/Object | - | 交错延迟 |
| `paused` | Boolean | false | 初始暂停 |
| `overwrite` | Boolean/String | false | 覆盖模式 |

### 回调属性

| 属性 | 说明 |
|------|------|
| `onStart` | 动画开始时 |
| `onUpdate` | 动画更新时 |
| `onComplete` | 动画完成时 |
| `onRepeat` | 动画重复时 |
| `onReverseComplete` | 反向完成时 |

## Transform属性

| GSAP属性 | CSS对应 | 说明 |
|----------|---------|------|
| `x` | translateX | X轴位移(px) |
| `y` | translateY | Y轴位移(px) |
| `xPercent` | translateX(%) | X轴位移(%) |
| `yPercent` | translateY(%) | Y轴位移(%) |
| `rotation` | rotate | 旋转(度) |
| `rotationX` | rotateX | X轴旋转 |
| `rotationY` | rotateY | Y轴旋转 |
| `scale` | scale | 缩放 |
| `scaleX` | scaleX | X轴缩放 |
| `scaleY` | scaleY | Y轴缩放 |
| `skewX` | skewX | X轴倾斜 |
| `skewY` | skewY | Y轴倾斜 |

## Tween方法

| 方法 | 说明 |
|------|------|
| `play()` | 播放 |
| `pause()` | 暂停 |
| `reverse()` | 反向播放 |
| `restart()` | 重新开始 |
| `seek(time)` | 跳转到指定时间 |
| `progress(value)` | 设置/获取进度 |
| `timeScale(value)` | 设置播放速度 |
| `kill()` | 销毁动画 |
| `isActive()` | 是否正在播放 |
| `duration()` | 获取时长 |

## Timeline方法

| 方法 | 说明 |
|------|------|
| `to()` | 添加to动画 |
| `from()` | 添加from动画 |
| `fromTo()` | 添加fromTo动画 |
| `add()` | 添加动画/回调 |
| `addLabel()` | 添加标签 |
| `call()` | 添加回调函数 |
| `time()` | 设置/获取当前时间 |
| `totalDuration()` | 获取总时长 |

## 位置参数

| 参数 | 说明 |
|------|------|
| 数字 | 绝对时间位置 |
| `"+=1"` | 前一个动画结束后1秒 |
| `"-=0.5"` | 前一个动画结束前0.5秒 |
| `">"` | 前一个动画结束时 |
| `"<"` | 前一个动画开始时 |
| `"<0.5"` | 前一个动画开始后0.5秒 |

## 缓动函数

### 常用缓动

| 缓动 | 效果 |
|------|------|
| `"none"` | 匀速 |
| `"power1.out"` | 轻微减速 |
| `"power2.out"` | 中等减速 |
| `"power3.out"` | 强烈减速 |
| `"power4.out"` | 非常强烈减速 |
| `"back.out"` | 回弹效果 |
| `"elastic.out"` | 弹性效果 |
| `"bounce.out"` | 弹跳效果 |
| `"circ.out"` | 圆形曲线 |
| `"expo.out"` | 指数曲线 |
| `"sine.out"` | 正弦曲线 |

### 方向后缀

| 后缀 | 说明 |
|------|------|
| `.in` | 开始慢，结束快 |
| `.out` | 开始快，结束慢 |
| `.inOut` | 两头慢，中间快 |

## Stagger配置

```javascript
stagger: 0.1  // 简单延迟

stagger: {
  each: 0.1,        // 每个元素延迟
  from: "center",   // 开始位置
  amount: 1,        // 总延迟时间
  ease: "power2",   // 缓动
  grid: [3, 4],     // 网格布局
  axis: "x"         // 轴向
}
```

## ScrollTrigger配置

| 属性 | 说明 |
|------|------|
| `trigger` | 触发元素 |
| `start` | 开始位置 |
| `end` | 结束位置 |
| `scrub` | 跟随滚动 |
| `pin` | 钉住元素 |
| `markers` | 显示标记 |
| `toggleActions` | 切换行为 |
| `onEnter` | 进入回调 |
| `onLeave` | 离开回调 |
| `onEnterBack` | 从下方进入 |
| `onLeaveBack` | 从上方离开 |

## 工具方法

| 方法 | 说明 |
|------|------|
| `gsap.utils.toArray()` | 转为数组 |
| `gsap.utils.random()` | 随机数 |
| `gsap.utils.snap()` | 吸附值 |
| `gsap.utils.wrap()` | 循环值 |
| `gsap.utils.mapRange()` | 映射范围 |
| `gsap.getProperty()` | 获取属性 |
| `gsap.killTweensOf()` | 停止动画 |
| `gsap.matchMedia()` | 响应式 |

---

> **相关参考**：[缓动函数速查](./easing-cheatsheet.md) | [常见问题](./common-issues.md)

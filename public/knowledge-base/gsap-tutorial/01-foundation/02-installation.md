# 第2章 安装与配置

> 掌握GSAP的多种引入方式与项目配置

## 2.1 安装方式概览

GSAP提供多种安装方式，适应不同的项目需求：

```text
┌─────────────────────────────────────────────────────────┐
│                   GSAP 安装方式                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐  │
│   │   CDN引入   │   │   NPM安装   │   │  下载本地   │  │
│   │   最快速    │   │   推荐      │   │   离线使用  │  │
│   └─────────────┘   └─────────────┘   └─────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 2.2 CDN引入（快速开始）

### 基础CDN引入

最简单的方式，适合快速测试和学习：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>GSAP Demo</title>
</head>
<body>
  <div class="box">Hello GSAP!</div>

  <!-- 从CDN引入GSAP -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  
  <script>
    // 现在可以使用gsap了
    gsap.to(".box", { x: 100, duration: 1 });
  </script>
</body>
</html>
```

### CDN提供商选择

| CDN提供商 | 地址 | 特点 |
|-----------|------|------|
| cdnjs | `cdnjs.cloudflare.com` | 稳定可靠 |
| unpkg | `unpkg.com` | 自动最新版 |
| jsDelivr | `cdn.jsdelivr.net` | 国内访问快 |

### 引入插件

需要使用插件时，在核心库之后引入：

```html
<!-- 核心库 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

<!-- ScrollTrigger插件 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Draggable插件 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js"></script>

<script>
  // 注册插件
  gsap.registerPlugin(ScrollTrigger, Draggable);
</script>
```

## 2.3 NPM安装（推荐）

### 安装命令

```bash
# 使用npm
npm install gsap

# 使用yarn
yarn add gsap

# 使用pnpm
pnpm add gsap
```

### 项目中使用

#### ES Module方式（推荐）

```javascript
// 引入GSAP核心
import gsap from "gsap";

// 引入插件
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// 注册插件
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);

// 使用
gsap.to(".box", {
  x: 100,
  duration: 1,
  scrollTrigger: {
    trigger: ".box",
    start: "top center"
  }
});
```

#### CommonJS方式

```javascript
const gsap = require("gsap");
const { ScrollTrigger } = require("gsap/ScrollTrigger");

gsap.registerPlugin(ScrollTrigger);
```

### TypeScript支持

GSAP 3.x 原生支持TypeScript：

```typescript
import gsap, { Tween, Timeline } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// TypeScript会提供完整的类型提示
const tween: gsap.core.Tween = gsap.to(".box", {
  x: 100,
  duration: 1
});
```

## 2.4 下载本地文件

### 下载地址

从GitHub或官网下载：

```
https://github.com/greensock/GSAP
https://greensock.com/download/
```

### 文件结构

```text
gsap/
├── gsap.min.js           # 核心库（压缩版）
├── gsap.js               # 核心库（开发版）
├── ScrollTrigger.min.js  # ScrollTrigger插件
├── Draggable.min.js      # Draggable插件
├── MotionPathPlugin.min.js
└── ...
```

### 本地引入

```html
<script src="./gsap/gsap.min.js"></script>
<script src="./gsap/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);
</script>
```

## 2.5 常用插件介绍

### 插件列表

| 插件 | 说明 | 是否免费 |
|------|------|----------|
| ScrollTrigger | 滚动触发动画 | 免费 |
| Draggable | 拖拽交互 | 免费 |
| MotionPathPlugin | 路径动画 | 免费 |
| DrawSVGPlugin | SVG描边动画 | 付费 |
| MorphSVGPlugin | SVG变形动画 | 付费 |
| SplitText | 文字分割动画 | 付费 |
| ScrambleTextPlugin | 文字乱码动画 | 付费 |

### 免费插件使用

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";

// 一次性注册所有插件
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin, TextPlugin);
```

### 付费插件

付费插件需要购买许可证，在Club GreenSock获取：

```javascript
// 付费插件需要从特定路径引入
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(MorphSVGPlugin, DrawSVGPlugin, SplitText);
```

## 2.6 项目配置示例

### Vite项目配置

```javascript
// main.js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 导出到全局（可选）
window.gsap = gsap;
```

### Webpack项目配置

```javascript
// index.js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
```

### React项目配置

```jsx
// src/utils/animations.js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeIn = (element) => {
  return gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 1
  });
};

export const staggerIn = (elements) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.5
  });
};
```

```jsx
// src/components/AnimatedBox.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

function AnimatedBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.from(boxRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });
  }, []);

  return (
    <div 
      ref={boxRef}
      className="box"
    >
      Animated Box
    </div>
  );
}
```

### Vue项目配置

```javascript
// src/plugins/gsap.js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  install(app) {
    app.config.globalProperties.$gsap = gsap;
    app.provide("gsap", gsap);
  }
};
```

```vue
<!-- src/components/AnimatedBox.vue -->
<template>
  <div ref="boxRef" class="box">Animated Box</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const boxRef = ref(null);

onMounted(() => {
  gsap.from(boxRef.value, {
    opacity: 0,
    x: -100,
    duration: 1
  });
});
</script>
```

## 2.7 验证安装

### 检查GSAP版本

```javascript
console.log(gsap.version);  // 输出: "3.12.5"
```

### 测试基本功能

```javascript
// 创建一个简单的动画测试
gsap.to(".test-box", {
  x: 100,
  duration: 1,
  onComplete: () => {
    console.log("GSAP is working!");
  }
});
```

### 检查插件是否加载

```javascript
// 检查ScrollTrigger是否可用
if (gsap.plugins && gsap.plugins.scrollTrigger) {
  console.log("ScrollTrigger is loaded");
}

// 或者尝试使用
try {
  ScrollTrigger.create({
    trigger: ".test",
    start: "top center"
  });
  console.log("ScrollTrigger is working!");
} catch (e) {
  console.log("ScrollTrigger is not loaded");
}
```

## 2.8 常见安装问题

### 问题1：gsap is not defined

**原因**：未正确引入GSAP

**解决**：
```html
<!-- 确保在动画代码之前引入GSAP -->
<script src="gsap.min.js"></script>
<script>
  // 你的动画代码
  gsap.to(".box", { x: 100 });
</script>
```

### 问题2：插件不生效

**原因**：未注册插件

**解决**：
```javascript
import { ScrollTrigger } from "gsap/ScrollTrigger";
// 必须注册插件
gsap.registerPlugin(ScrollTrigger);
```

### 问题3：TypeScript类型错误

**原因**：缺少类型定义

**解决**：
```bash
# 确保安装了完整的gsap包
npm install gsap
# GSAP 3.x 自带类型定义，无需额外安装
```

---

## 交互式演示

<div class="demo-container" data-demo="installation-test">
  <div class="demo-preview">
    <div class="demo-box">点击测试GSAP</div>
  </div>
  <div class="demo-code">
    <pre><code class="language-javascript">// 测试GSAP是否正确安装
gsap.to(".demo-box", {
  x: 100,
  rotation: 360,
  duration: 1,
  ease: "power2.out"
});</code></pre>
  </div>
  <button class="demo-run-btn">运行代码</button>
</div>

---

## 思考题

> 完成以下问题，检验你的学习成果

### 概念理解

1. **CDN引入和NPM安装各有什么优缺点？**
   - 提示：考虑项目规模、离线需求、版本管理

2. **为什么需要注册插件？**
   - 提示：思考GSAP的模块化设计

### 实践操作

3. **在你的项目中安装GSAP，并创建一个简单的动画验证安装成功**
   - 提示：使用gsap.to()创建一个简单的位移动画

4. **尝试引入ScrollTrigger插件并注册**
   - 提示：按照文档步骤操作

---

> **下一章**：[第3章 基础Tween动画](./03-basic-tween.md) - 学习创建你的第一个GSAP动画

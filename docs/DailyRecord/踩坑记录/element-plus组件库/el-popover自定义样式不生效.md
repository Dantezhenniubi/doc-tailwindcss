---
outline: [2, 6]
tags: ['组件库', 'element-plus', '前端']
---

# el-popover自定义样式不生效

## 问题描述
我在页面使用了el-popover组件，但是自定义样式不生效，不论是使用官方文档里的`popper-class="my-tooltip"`指定类名，还是直接写class都不起作用。

## 解决方案
Element Plus 的 `<el-popover>` 弹出层默认挂载到 `<body>` 末端，不在当前组件 DOM 树内，因此：
- 写 scoped 样式 → 不会生效
- 用 ::v-deep → 也不会生效

✅ 正确做法（零污染、可维护）
用官方属性 `popper-class` 给浮层加全局类名
在无 scoped 的样式文件（或 `<style lang="scss">`）里写覆盖规则
如需箭头颜色，一并改 `.el-popover__arrow::after`
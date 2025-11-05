---
outline: [2, 6]
tags: ['组件库', 'element-plus', '前端', '踩坑记录']
---


# el-pagination样式顺序问题
在自定义el-pagination的回到上一页按钮样式时，我做了一个移动的背景动画，发现一个需要注意的样式定义顺序问题：

::: danger 错误写法
```css
:global(.el-pagination > .btn-prev:not(:disabled)) {
  @apply text-gray-800 bg-gray-50! transition-all duration-300 ease-in-out relative rounded-full;
}
/* 背景动画层 */
:global(.el-pagination > .btn-prev:not(:disabled)::before) {
  @apply transition-all duration-300 ease-in-out rounded-full;
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cpolygon fill='%230EA5E9' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200'/%3E%3C/svg%3E");
  background-size: 300%;
  background-position: 200%;
  background-repeat: no-repeat;
}
/* 背景移动定义放在了黑暗模式背景图定义前，这样在黑暗模式下会直接失效 */
:global(.el-pagination > .btn-prev:not(:disabled):hover::before) {
  background-position: 40%;
}
:global(.dark .el-pagination > .btn-prev:not(:disabled)::before) {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cpolygon fill='%2397D8C4' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200'/%3E%3C/svg%3E");
  background-size: 300%;
  background-position: 200%;
}

```
:::

::: success 正确写法
```css
:global(.el-pagination > .btn-prev:not(:disabled)) {
  @apply text-gray-800 bg-gray-50! transition-all duration-300 ease-in-out relative rounded-full;
}
/* 背景动画层 */
:global(.el-pagination > .btn-prev:not(:disabled)::before) {
  @apply transition-all duration-300 ease-in-out rounded-full;
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cpolygon fill='%230EA5E9' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200'/%3E%3C/svg%3E");
  background-size: 300%;
  background-position: 200%;
  background-repeat: no-repeat;
}

:global(.dark .el-pagination > .btn-prev:not(:disabled)::before) {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cpolygon fill='%2397D8C4' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200'/%3E%3C/svg%3E");
  background-size: 300%;
  background-position: 200%;
}
:global(.el-pagination > .btn-prev:not(:disabled):hover::before) {
  background-position: 40%;
}
```
:::
---
outline: [2, 6]
tags: ['组件库', 'element-plus', '前端', '踩坑记录']
---

# el-pagination样式状态问题
el-pagination样式状态问题，在el-pagination组件中，active状态是通过设置`is-active`类名实现的

::: danger 错误写法1
```css
/* ------下一页按钮------ */
:global(.el-pagination > .el-pager li) {
  @apply rounded-full bg-gray-50! text-gray-800;
}
/* 这里使用了:active ，但是这样只会在鼠标左键按下元素时生效  */
:global(.el-pagination.is-background .el-pager li:active) {
  @apply bg-green-500!;
}
```
:::

::: danger 错误写法2
```css
/* ------下一页按钮------ */
:global(.el-pagination > .el-pager li) {
  @apply rounded-full bg-gray-50! text-gray-800;
}
/* 这里使用.active，一般来说可以在激活状态下生效，但是在el-pagination中不会生效 */
:global(.el-pagination.is-background .el-pager li.active) {
  @apply bg-green-500!;
}
```
:::

::: success 正确写法
```css
/* ------下一页按钮------ */
:global(.el-pagination > .el-pager li) {
  @apply rounded-full bg-gray-50! text-gray-800;
}
/* 这里使用了is-active，这个类名是el-pagination组件内部使用的，所以这里使用这个类名，而不是active */
:global(.el-pagination.is-background .el-pager li.is-active) {
  @apply bg-green-500!;
}
```
:::
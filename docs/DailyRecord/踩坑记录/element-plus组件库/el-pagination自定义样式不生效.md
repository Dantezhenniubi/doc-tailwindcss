---
outline: [2, 6]
tags: ['组件库', 'element-plus', '前端', '踩坑记录']
---

# el-pagination自定义样式不生效

## 问题描述
我在页面使用了el-pagination组件，但是自定义样式不生效，不论是使用`::v-deep`，还是写`!important`都不起作用。

## 解决方案
Element Plus 的分页样式**确实很难覆盖**，因为：

1. 它把很多元素（页码下拉、页码按钮、popper）**挂在 body 上**；  
2. 大部分背景/边框/颜色写死在 **全局样式表**；  
3. `scoped` + `::v-deep` 对「body 外挂」的弹窗无效；  
4. `!important` 优先级仍低于「组件内联 style」。

下面给出「**一次配好、永远生效**」的完整方案 —— **全局样式文件 + 深度选择器 + popper-class**，三步搞定，**无需 !important**。

---

### ✅ 一、先确认「哪些元素挂在 body」

用 DevTools → **Esc → Rendering → Show layer borders** 可见：

| 元素                      | 是否外挂 body | 穿透方式        |
| ------------------------- | ------------- | --------------- |
| 页码按钮、prev/next       | ❌             | `::v-deep` 即可 |
| 每页条数下拉 (`sizes`)    | ✅             | `popper-class`  |
| 页码 hover 提示 (tooltip) | ✅             | `popper-class`  |

---

### ✅ 二、全局样式文件（**不要 scoped**）

新建 `src/styles/element-pagination.css`（或 `.scss`）：

```css
/* ===== 页码按钮 ===== */
.el-pagination {
  /* 整体背景 */
  background: transparent;
}
.el-pagination .btn-prev,
.el-pagination .btn-next,
.el-pagination .el-pager li {
  background-color: transparent !important;   /* 按钮底色 */
  border: 1px solid #dcdfe6;
  color: #606266;
}
.el-pagination .el-pager li.active {
  background-color: #4059AD !important;
  color: #fff;
  border-color: #4059AD;
}

/* ===== 下拉选择器（sizes） ===== */
/* 通过 popper-class 注入，见第三步 */
.el-pagination .popper-my-style {
  background: #132144;
  border: 1px solid #022c60;
}
.popper-my-style .el-select-dropdown__item {
  color: #cddcfb;
}
.popper-my-style .el-select-dropdown__item.hover,
.popper-my-style .el-select-dropdown__item:hover {
  background: #32456d;
}
.popper-my-style .el-select-dropdown__item.selected {
  color: #4e95ff;
}
```

在 `main.ts` 引入：
```ts
import 'element-plus/dist/index.css';   // 官方先加载
import '@/styles/element-pagination.css'; // 你的覆盖层
```

### ✅ 三、组件里加 `popper-class`

::: CTcode
```vue
<el-pagination
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :total="total"
  layout="total, sizes, prev, pager, next, jumper"
  background
  popper-class="popper-my-style"
/>
```
:::

> `popper-class` 的值**必须跟全局样式里的类名一致**，否则下拉弹窗吃不到样式。


### ✅ 四、Vue3 + `<style scoped>` 补充（可选）

若仍想写在单文件，用 `:global()` 包裹**整段**：

```vue<style scoped>
:global(.el-pagination .el-pager li.active) {
  background-color: #4059AD;
  color: #fff;
}
:global(.popper-my-style) {
  background: #132144;
}
</style>
```

---

### ✅ 五、常见坑速查

| 现象                | 原因                  | 解决                              |
| ------------------- | --------------------- | --------------------------------- |
| `::v-deep` 无效     | 元素挂在 body         | 用全局样式文件 + `popper-class`   |
| `!important` 不生效 | 内联 style 优先级更高 | **全局样式**里写，**不要 scoped** |
| 下拉弹窗样式丢      | 没加 `popper-class`   | 组件里写 `popper-class="xxx"`     |
| 深色模式不跟随      | 没写 `dark:` 前缀     | 全局里补 `dark:` 变体             |

---

### ✅ 六、一行记忆

**「全局 CSS + popper-class + 不要 scoped」**  
三步走完，**el-pagination 任意样式都能改**！

我最终选择了使用`:global()`语法糖







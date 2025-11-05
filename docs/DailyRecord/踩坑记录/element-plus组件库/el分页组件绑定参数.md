---
outline: [2, 6]
tags: ['组件库', 'element-plus', '前端', '踩坑记录']
---

## el分页组件绑定参数不生效


> 为什么 `<el-pagination>` 中必须写 v-model:current-page，而不能直接写 :current-page？ 

```vue
<el-pagination
    :current-page="currentPage"
    :page-size="pageSize"
    :total="filteredSites.length"
    layout="total, jumper, prev, pager, next, sizes"
    :page-sizes="[8, 12, 16, 20]"
    background
    @update:current-page="currentPage = $event"
    @size-change="currentPage = 1"
/>
```

因为 `<el-pagination>` 是一个“受控组件”（controlled component），它内部会修改 `current-page` 的值（比如用户点击第 2 页），所以必须用 `v-model:current-page`（即双向绑定）来同步子组件的变更回父组件。如果只用 `:current-page（单向绑定）`，父组件的 `currentPage` 不会更新，分页就“卡住”了。

::: tip
`v-model:xxx` 是什么？
:::

`v-model:xxx` 只是**语法糖**

在 Vue 3 中：
```vue
<el-pagination v-model:current-page="currentPage" />
```

等价于：

```vue
<el-pagination
  :current-page="currentPage"
  @update:current-page="currentPage = $event"
/>
```
也就是说：

`:current-page`：把父组件的值传给子组件（数据流入）
`@update:current-page`：当子组件内部页码变化时，通知父组件更新（数据流出）
两者合起来就是 **双向绑定**。

::: danger 错误写法
```vue
<!-- ❌ 错误写法 -->
<el-pagination :current-page="currentPage" />
```
:::


## 官方强调

::: warning 值得注意的问题
Element Plus官方在Pagination分页组件中，给出了以下说明：

我们现在会检查一些不合理的用法，如果发现分页器未显示，可以核对是否违反以下情形：

- total 和 page-count 必须传一个，不然组件无法判断总页数；优先使用 page-count;
- 如果传入了 current-page，必须监听 current-page 变更的事件（@update:current-page），否则分页切换不起作用；
- 如果传入了 page-size，且布局包含 page-size 选择器（即 layout 包含 sizes），必须监听 page-size 变更的事件（@update:page-size），否则分页大小的变化将不起作用。

事件​

size-change	page-size 改变时触发	

current-change	current-page 改变时触发	

change 2.4.4	current-page 或 page-size 更改时触发	

prev-click	用户点击上一页按钮改变当前页时触发	

next-click	用户点击下一页按钮改变当前页时触发	


以上事件不推荐使用（但由于兼容的原因仍然支持，在以后的版本中将会被删除）；如果要监听 current-page 和 page-size 的改变，使用 v-model 双向绑定是个更好的选择。
:::

这意味着，我们最好使用的是双向绑定的模式，即：
```vue
<el-pagination v-model:current-page="currentPage" />
```

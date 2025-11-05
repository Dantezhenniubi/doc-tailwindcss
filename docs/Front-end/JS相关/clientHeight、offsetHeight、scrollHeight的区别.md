---
outline: [2, 6]
tag: ['JS', '布局', '前端基础', '前端', '语法']
---

`clientHeight`、`offsetHeight` 和 `scrollHeight` 是 DOM 元素的三个重要属性，用于获取元素的高度信息，但它们的计算方式和包含的内容不同。以下是它们的区别：

---

### 1. **clientHeight**
- **定义**：元素内部可视区域的高度（不包括滚动条、边框和外边距）。
- **包含内容**：
  - 内容高度（content height）
  - 内边距（padding）
- **不包含内容**：
  - 滚动条（如果有）
  - 边框（border）
  - 外边距（margin）
- **用途**：常用于获取用户实际可见区域的高度。

```js
element.clientHeight
```

> ✅ 举例：一个 `div` 设置了 `height: 200px; padding: 10px; border: 5px solid; overflow: auto;`，且内容未溢出。  
> 则 `clientHeight = 200 + 10 + 10 = 220px`（假设没有滚动条）。

---

### 2. **offsetHeight**
- **定义**：元素的布局高度，包括内容、内边距、边框和滚动条（如果有）。
- **包含内容**：
  - 内容高度
  - 内边距（padding）
  - 边框（border）
  - 滚动条（如果存在）
- **不包含内容**：
  - 外边距（margin）
- **用途**：常用于获取元素在页面中实际占据的总高度（用于布局计算）。

```js
element.offsetHeight
```

> ✅ 举例：同上 `div`，则 `offsetHeight = 200 + 10 + 10 + 5 + 5 = 230px`（加上上下边框）。

---

### 3. **scrollHeight**
- **定义**：元素内容的总高度，包括不可见的溢出部分（即滚动区域的总高度）。
- **包含内容**：
  - 所有内容的实际高度（即使被 overflow 隐藏）
  - 内边距（padding）
- **不包含内容**：
  - 边框（border）
  - 滚动条
  - 外边距（margin）
- **用途**：判断内容是否溢出、实现“滚动到底部”检测等。

```js
element.scrollHeight
```

> ✅ 举例：如果 `div` 中的内容实际高度为 500px（即使容器只显示 200px），  
> 则 `scrollHeight ≈ 500 + 10 + 10 = 520px`（加上上下 padding）。

---

### 对比总结表：

| 属性           | 包含内容                    | 是否包含滚动条 | 是否包含边框 | 是否包含溢出内容 |
| -------------- | --------------------------- | -------------- | ------------ | ---------------- |
| `clientHeight` | 内容 + padding              | ❌              | ❌            | ❌（仅可见部分）  |
| `offsetHeight` | 内容 + padding + border     | ✅（占用空间）  | ✅            | ❌                |
| `scrollHeight` | 全部内容（含溢出）+ padding | ❌              | ❌            | ✅                |

---

### 实际应用场景：

- **判断是否滚动到底部**：
  ```js
  if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
    console.log('已滚动到底部');
  }
  ```

- **获取元素在页面中的真实占用高度** → 用 `offsetHeight`
- **获取可视区域高度（不含边框）** → 用 `clientHeight`
- **获取内容总高度（用于懒加载、分页等）** → 用 `scrollHeight`

---
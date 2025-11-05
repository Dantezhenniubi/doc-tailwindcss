---
outline: [2, 6]
tags: ['组件库', 'element-plus', '前端', '踩坑记录']
---


# el-pagination二次封装样式失效

## 问题描述
根据项目需求，我需要将el-pagination组件进行二次封装便于代码抽离和二次修改，但是封装完后默认样式失效了，布局也变成了竖着的。



## 解决方案

我确实有使用 `unplugin-vue-components`，在封装之前，样式是生效的，封装之后就失效了，不过我在`index.js`里加了`import 'element-plus/dist/index.css'`就正常了。这是为什么呢？

::: tip 原因
**unplugin-vue-components 的自动样式引入机制对“二次封装组件”失效了**
:::


### 🔍 背景：`unplugin-vue-components` 是如何自动引入样式的？

当你直接在模板中使用 `<el-pagination>` 时：

```vue
<template>
  <el-pagination :total="100" />
</template>
```

`unplugin-vue-components` 插件会：
1. **识别出你用了 `ElPagination` 组件**
2. **自动导入组件**：
   ```js
   import { ElPagination } from 'element-plus'
   ```
3. **同时自动导入其对应 CSS**（因为你在配置中写了 `importStyle: 'css'`）：
   ```js
   import 'element-plus/es/components/pagination/style/css'
   ```

✅ 所以样式正常。

---

### ❌ 但当你封装后：

```vue
<!-- MyPagination.vue -->
<template>
  <el-pagination v-bind="$attrs" />
</template>
```

并在父组件中使用：

```vue
<template>
  <MyPagination :total="100" />
</template>
```

此时：
- **父组件中没有直接使用 `<el-pagination>`**
- `unplugin-vue-components` **只扫描模板中的标签名**，它看到的是 `<MyPagination>`，不是 `<el-pagination>`
- 所以它**不会为 `ElPagination` 自动引入样式**
- 而你的 `MyPagination.vue` 是本地组件，**不会触发 `unplugin-vue-components` 的按需样式注入**

➡️ 结果：**`el-pagination` 的 CSS 没有被加载 → 样式失效，变成竖直排列**

---

### ✅ 为什么加 `import 'element-plus/dist/index.css'` 就好了？

因为你**手动引入了 Element Plus 的完整样式**，覆盖了按需引入的缺失：

```js
// main.js
import 'element-plus/dist/index.css' // 全局引入所有样式
```

这样，无论你在哪里用 `el-pagination`（直接用 or 封装后用），样式都存在。

---

### 🧩 补充说明：为什么封装组件内部不自动触发样式引入？

因为 `unplugin-vue-components` **只处理 `.vue` 文件的 `<template>` 中的标签**，它**不会分析组件内部的实现**。  
也就是说，它不知道 `MyPagination` 内部用了 `el-pagination`。

这是设计使然——插件无法做“深度依赖分析”。

---

### ✅ 解决方案对比

| 方案                                       | 优点                 | 缺点                               |
| ------------------------------------------ | -------------------- | ---------------------------------- |
| **全局引入 `element-plus/dist/index.css`** | 简单、可靠、一劳永逸 | 包体积增大（引入了所有组件样式）   |
| **在封装组件中手动引入对应样式**           | 按需、体积小         | 需要为每个封装组件单独维护样式导入 |
| **放弃封装，直接用原生组件**               | 无额外成本           | 无法统一逻辑或扩展                 |

#### 如果你选择“按需引入样式”（推荐用于生产环境）：

```vue
<!-- MyPagination.vue -->
<script setup lang="ts">
import { ElPagination } from 'element-plus'
// 手动引入 pagination 的样式
import 'element-plus/es/components/pagination/style/css'
</script>

<template>
  <el-pagination v-bind="$attrs" />
</template>
```

> ✅ 这样既保持按需，又确保样式存在。

---

### 📌 总结

| 现象                              | 原因                                                       |
| --------------------------------- | ---------------------------------------------------------- |
| 直接用 `<el-pagination>` 样式正常 | `unplugin-vue-components` 自动注入了样式                   |
| 封装后样式失效                    | 插件无法感知封装组件内部使用了 `el-pagination`，未注入样式 |
| 全局引入 CSS 后正常               | 手动补全了缺失的样式                                       |

> 💡 **这是“按需自动引入”机制的天然局限**，不是你的代码问题。

---

### ✅ 最佳实践建议

- **开发阶段**：全局引入 `element-plus/dist/index.css`，省心。
- **生产构建**：如果关注包体积，改为在封装组件中**手动按需引入对应样式**。

这样既能封装复用，又不丢失样式。
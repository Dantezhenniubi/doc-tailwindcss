---
outline: [2, 6]
tag: ['vue', 'vue3', '基础知识']
---

# mounted和onMounted的区别

`mounted()` 和 `onMounted(() => {})` **功能上等价**，但它们属于 **不同的 Vue API 风格**，主要区别如下：

---

### ✅ 1. **所属 API 体系不同**

| 写法                   | 所属 API            | 适用场景                                   |
| ---------------------- | ------------------- | ------------------------------------------ |
| `mounted() { }`        | **Options API**     | Vue 2 传统写法，也兼容 Vue 3               |
| `onMounted(() => { })` | **Composition API** | Vue 3 推荐，尤其在 `<script setup>` 中使用 |

---

### ✅ 2. **使用位置不同**

#### Options API（选项式）：
```js
export default {
  mounted() {
    console.log('组件已挂载')
  }
}
```

#### Composition API（组合式）：
```js
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})
</script>
```

> ⚠️ 不能在 Options API 中直接使用 `onMounted`（除非用 `setup()` 函数），也不能在 Composition API 中直接写 `mounted()`。

---

### ✅ 3. **逻辑组织能力不同**

- **Options API**：生命周期钩子是“分散”的，所有逻辑按选项（data、methods、mounted 等）组织。
- **Composition API**：可以将**相关逻辑聚合在一起**，比如：

```js
// 获取用户数据 + 挂载时加载
const user = ref(null)
const fetchUser = async () => { /* ... */ }

onMounted(fetchUser)
onUnmounted(() => { /* 清理 */ })
```

这在复杂组件中更清晰。

---

### ✅ 4. **TypeScript 支持**

- Composition API（`onMounted`）与 TypeScript 集成更自然，类型推导更准确。
- Options API 在 Vue 3 中虽支持 TS，但需依赖 `defineComponent` 等辅助函数。

---

### ✅ 5. **Tree-shaking 与打包体积**

- Composition API 的导入是**按需引入**（如 `import { onMounted } from 'vue'`），有利于 tree-shaking。
- Options API 的 `mounted` 是隐式注册的，无法被摇树优化（但影响极小）。

---

### 📌 总结：如何选择？

| 场景                                  | 推荐写法                             |
| ------------------------------------- | ------------------------------------ |
| 使用 `<script setup>`                 | ✅ 必须用 `onMounted`                 |
| 使用 Options API（如 Vue 2 迁移项目） | ✅ 用 `mounted()`                     |
| 新项目 + Vue 3                        | ✅ 优先 Composition API + `onMounted` |
| 简单组件，无逻辑复用需求              | 两者皆可                             |

---

### 💡 补充：执行时机完全相同

无论是 `mounted()` 还是 `onMounted()`，它们都在 **组件 DOM 挂载完成后** 同步执行，**没有性能或时机差异**。

---

✅ 所以：  
**不是“哪个更好”，而是“你用哪种 API 风格”**。  
在 `<script setup>` 中，只能用 `onMounted`；在 `export default {}` 中，通常用 `mounted`。
---
outline: [2, 6]
tags: ['踩坑记录', 'vue', 'vue3', '前端']
---

# 在Vue3.4+使用defineExpose

我在二次封装组件的时候，发现了defineExpose

从 Vue 3.4 开始，官方推荐使用 defineExpose + 内部 ref 的方式转发 ref。



### ✅ 使用 `useForwardRef` 模式（推荐）

从 Vue 3.4 开始，官方推荐使用 **`defineExpose` + 内部 `ref`** 的方式转发 ref。

#### 修正后的封装组件：

```vue
<!-- MyPagination.vue -->
<template>
  <div class="NavListPage">
    <el-pagination
      ref="paginationRef"
      v-bind="$attrs"
    >
      <template v-for="(_, name) in $slots" #[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ElPagination } from 'element-plus'

// 获取内部 el-pagination 的 ref
const paginationRef = ref<InstanceType<typeof ElPagination> | null>(null)

// 暴露内部实例的方法（按需暴露）
defineExpose({
  // 例如：暴露 focus 方法
  focus: () => paginationRef.value?.focus(),

  // 或者直接暴露整个实例（不推荐，但可行）
  // ... 可以选择性暴露你需要的方法
})

// 如果你确实需要在 mounted 时做点什么，可以用：
onMounted(() => {
  // paginationRef.value 现在可用
  console.log('Pagination instance:', paginationRef.value)
})
</script>
```

按上述代码来说，我们抛出子组件ref时，最好**只抛“行为”，不抛“实现”**

方法要“按需、语义化”抛出；
**属性（只读状态）**也可以抛，但要“不可变”或“只读”快照，永远不要直接抛可写响应式数据。
否则父组件一句 `xxx.value.page = 999` 就绕过了你的所有校验。

即只把需要的方法抛出供父组件使用，例如：
```vue
// NavListPage.vue
const goPage = (p: number) => paginationRef.value?.setCurrentPage(p)
const next = () => paginationRef.value?.next()
const prev = () => paginationRef.value?.prev()

defineExpose({ goPage, next, prev })
```

如果父组件确实需要“只读”状态，再包只读快照:
```vue
const getPagerState = () => ({
  page: paginationRef.value?.currentPage ?? 1,
  size: paginationRef.value?.pageSize ?? 10
})
defineExpose({ getPagerState })
```



### 父组件使用方式

```vue
<template>
  <MyPagination
    ref="myPageRef"
    v-model:current-page="page"
    :total="1000"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const myPageRef = ref()
const page = ref(1)

onMounted(() => {
  // 调用暴露的方法
  myPageRef.value?.focus() // ✅ 可以调用
})
</script>
```

### 调用ref时需要注意

在父组件中调用ref时，抛出的对象在对应ref的value中，对象的值会自动解包。

关于Ref模板引用，请看[官方文档](https://cn.vuejs.org/guide/essentials/template-refs)

这里使用了3.5vue新加的[useTemplateRef](https://cn.vuejs.org/api/composition-api-helpers.html#usetemplateref)来获取ref

#### 模板引用
ref 是一个特殊的 `attribute`，和 `v-for` 章节中提到的 key 类似。它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。
##### 访问模板引用
下面给出3.5+和3.5前模板引用的方法

###### vue3.5+版本的用法
要在组合式 API 中获取引用，我们可以使用辅助函数 `useTemplateRef()`
```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'

// 第一个参数必须与模板中的 ref 值匹配
const input = useTemplateRef('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```
###### vue3.5前的用法
在 3.5 之前的版本尚未引入 `useTemplateRef()`，我们需要声明一个与模板里 `ref attribute` 匹配的引用：
```vue
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```
如果不使用 `<script setup>`，需确保从 `setup()` 返回 `ref`：
```vue
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```
注意，你只可以**在组件挂载后**才能访问模板引用。如果你想在模板中的表达式上访问 `input`，在初次渲染时会是 `null`。这是因为在初次渲染前这个元素还不存在呢！

如果你需要侦听一个模板引用 `ref` 的变化，确保考虑到其值为 `null` 的情况：
```vue
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // 此时还未挂载，或此元素已经被卸载(例如通过 v-if 控制)
  }
})
```

模板引用也可以被用在一个子组件上。这种情况下引用中获得的值是组件实例：
```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'
import Child from './Child.vue'

const childRef = useTemplateRef('child')

onMounted(() => {
  // childRef.value 将持有 <Child /> 的实例
})
</script>

<template>
  <Child ref="child" />
</template>
```
更多请看官方文档

#### useTemplateRef

类型：
```ts
function useTemplateRef<T>(key: string): Readonly<ShallowRef<T | null>>
```
示例：
```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'

const inputRef = useTemplateRef('input')

onMounted(() => {
  inputRef.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```


父组件中：
```vue
<script setup lang="ts">
// const pageRef = ref(null);
const ELPage = useTemplateRef('pageRef'); // 获取分页组件的引用

onMounted(() => {
  console.log('外部访问到的实例', ELPage.value.paginationRef);
});
</script>
```

### 🔍 补充说明

#### ❓ 为什么不能直接暴露整个 `paginationRef.value`？
```ts
defineExpose(paginationRef.value) // ❌ 不安全！
```
- 因为 `paginationRef.value` 在 `setup()` 执行时尚未挂载（为 `null`）
- `defineExpose` 必须传入一个 **响应式对象或普通对象**，不能是 `null`

#### ✅ 安全做法：只暴露你需要的方法
Element Plus 的 `ElPagination` 实例方法很少，常见的是：
- `focus()`：聚焦分页控件
- 其他基本没有公开方法

所以通常只需暴露 `focus` 即可。

---

### 🚫 不要这样做

- 不要用 `this.$refs`（Options API 写法）
- 不要在 `<script setup>` 中使用 `this`
- 不要试图遍历并复制所有属性（破坏封装，且可能包含私有属性）

---

### ✅ 最终建议

如果你**不需要调用 `el-pagination` 的任何方法**（比如只是展示分页），那甚至**不需要处理 ref**，因为 Element Plus 的分页组件本身也不依赖 ref 调用。

但如果你需要（如 `focus()`），就按上述方式 **显式暴露必要方法**。

这样既安全，又符合 Vue 3 的设计哲学。


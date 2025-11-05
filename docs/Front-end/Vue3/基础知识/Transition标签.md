---
outline: [2, 6]
tag: ['vue', 'vue3', '基础知识']
---


`<transition>` 是 Vue 提供的**内置抽象组件**（不需要注册，全局可用）。  
它**本身不会渲染任何额外 DOM**，只做一件事：  
> 在「**一个**子节点」进入 / 离开 DOM 时，**自动追加/移除一组 CSS 类名**或**调用 JS 钩子**，让你能写出平滑的过渡/动画效果。

---

### 一、适用场景
- 条件渲染 `v-if` / `v-show`  
- 动态组件 `<component :is="xxx">`  
- 路由视图 `<RouterView>`（内部同样用 `<transition>` 包一层）

---

### 二、最简例子（CSS 过渡）

```vue
<transition name="fade">
  <p v-if="visible">Hello Transition</p>
</transition>
```

生成类名序列（`name` 默认是 `v`，这里叫 `fade`）：

| 阶段     | 被添加的类名        | 说明                                   |
| -------- | ------------------- | -------------------------------------- |
| 进入开始 | `fade-enter-from`   | 插入前 1 帧存在                        |
| 进入活跃 | `fade-enter-active` | 整个进入阶段存在，写 `transition` 属性 |
| 进入结束 | `fade-enter-to`     | 插入后 1 帧存在                        |
| 离开开始 | `fade-leave-from`   | 卸载前 1 帧存在                        |
| 离开活跃 | `fade-leave-active` | 整个离开阶段存在                       |
| 离开结束 | `fade-leave-to`     | 卸载后 1 帧存在                        |

典型 CSS：
```css
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
```

**流程图（进入）**  
```
插入 DOM
├─ 添加 fade-enter-from        → 帧 1
├─ 添加 fade-enter-active      → 帧 1
├─ 移除 fade-enter-from       → 帧 2
├─ 添加 fade-enter-to         → 帧 2
├─ 监听 transitionend
└─ 移除 fade-enter-active & fade-enter-to
```

离开过程同理，类名换成 `leave-*`。

---

### 三、常用 props 速查

| prop                  | 类型                                     | 默认  | 说明                                                        |
| --------------------- | ---------------------------------------- | ----- | ----------------------------------------------------------- |
| `name`                | string                                   | `'v'` | 替换 `v-*` 前缀，例 `name="slide"` → `slide-enter-from` ... |
| `duration`            | number \| {enter: number, leave: number} | —     | 显式指定动画时长（ms），Vue 会等够时间再抛 `after-*` 事件   |
| `mode`                | `'out-in' \| 'in-out'`                   | —     | 控制“先出后进”还是“先进后出”，适合动态组件                  |
| `appear`              | boolean                                  | false | 节点**初次渲染**时也执行过渡（= 挂载即动画）                |
| `type`                | `'transition' \| 'animation'`            | —     | 告诉 Vue 监听 `transitionend` 还是 `animationend`           |
| `css`                 | boolean                                  | true  | 设为 false 可**完全禁用 CSS 类**，只跑 JS 钩子              |
| `enter-from-class` 等 | string                                   | —     | 自定义类名，覆盖默认 `name-enter-from` ...                  |

---

### 四、JS 钩子（精细控制）

```vue
<transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
>
  <div v-if="show">xxx</div>
</transition>
```

**典型用途**  
- 在 `onEnter(el, done)` 里手动写 `requestAnimationFrame` 动画，**最后必须调用 `done()`** 告诉 Vue 动画结束。  
- 埋点：在 `after-*` 里上报用户行为。  
- 与第三方动画库（GSAP、Anime.js）结合。

---

### 五、动态组件 & 列表过渡

1. 动态组件  
```vue
<transition name="fade" mode="out-in">
  <component :is="currentTab"/>
</transition>
```
`mode="out-in"` 保证**旧组件先完全消失**，新组件再进入，避免两元素同时存在导致布局抖动。

2. 列表过渡  
`<transition-group>` 为 **多个节点** 提供同样机制，还会：  
- 自动生成 `key` 差异的 `move` 类（FLIP 动画）  
- 可选 `tag="ul"` 渲染真实包裹元素  
```vue
<transition-group name="list" tag="ul">
  <li v-for="item in list" :key="item.id">{{ item.text }}</li>
</transition-group>
```

---

### 六、与 `<Transition>` (Vue 3) 的区别

- **写法**：Vue 3 推荐用 **大写** `<Transition>`，功能完全一致，只是更符合 JSX/TSX 习惯。  
- **新特性**：Vue 3 支持 **组合式 API** `onEnter`、`onLeave` 作为 prop 传入，写法更函数式。

---

### 七、常见坑速记

| 坑             | 解决                                                                  |
| -------------- | --------------------------------------------------------------------- |
| 过渡不生效     | 被过渡元素必须 **key 唯一** 且 **单根节点**；检查 CSS 类名拼写。      |
| 列表闪现       | 给 `<transition-group>` 显式设 `tag` 并加 `position: relative` 容器。 |
| 初次渲染无动画 | 加 `appear` 或 `mode="out-in"`。                                      |
| JS 钩子不结束  | 手动动画里 **一定** 调 `done()`，否则 Vue 永远不会清理类名。          |

---

### 一句话总结

`<transition>` 就是 **“Vue 官方动画钩子”**：  
**单节点** 进/出 DOM → 自动给你 6 个 CSS 类 + 8 个 JS 钩子，  
写几行 CSS 或调用 `done()`，就能做出顺滑过渡、精准埋点、与第三方库无缝衔接。
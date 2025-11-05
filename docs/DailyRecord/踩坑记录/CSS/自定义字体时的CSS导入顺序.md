---
outline: [2, 6]
tags: ['vitepress', 'css', '字体', '前端']
---

# 自定义字体时的CSS导入顺序

## 问题描述
vitepress自定义字体时，需要导入字体的CSS文件`my-fonts.css`，但是开始发现并没有生效。
::: danger 错误写法

```js
import './my-fonts.css';
import DefaultTheme from 'vitepress/theme-without-fonts';

export default DefaultTheme;
```

:::

## 解决方案
是因为自定义字体CSS必须要在默认主题后导入，这是由于CSS 的 Cascade 层叠规则导致的。<br>
详细理论可参考[CSS 层叠规则](../../../Front-end/CSS相关/CSS层叠规则.md)

后面的CSS文件会覆盖前面的CSS文件，所以自定义字体CSS必须要在默认主题后导入。<br>

::: success 正确写法

```js
import DefaultTheme from 'vitepress/theme-without-fonts';
// 这里顺序很重要！！！
import './my-fonts.css';

export default DefaultTheme;
```

:::
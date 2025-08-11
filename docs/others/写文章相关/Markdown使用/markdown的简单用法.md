---
outline: [2,6]
---
> 抄的[Yiov大佬的](https://yiov.top/computer/markdown.html)，自己只是简单的记录一下，方便自己以后查看。

# Markdown的简单用法

## 简介
Markdown是一种轻量级标记语言，创始人为约翰·格鲁伯（John Gruber）

文档后缀为 .md 或 .markdown，目前它已是 GitHub 的御用书写格式

- 弥补了传统纯文本缺少样式的不足

- 降低了传统 Word、HTML 等样式文本的技术门槛

## 工具
| 软件  | 支持平台  | 是否收费  |
| :---: | :---: | :---: |
| [Typora](https://typoraio.cn/)  |  IOS / Mac / Windows / Linux   |  收费   |
| [VSCode](https://code.visualstudio.com/)  |  Mac / Windows / Linux   |  免费   |
| [Obsidian](https://obsidian.md/)  |  Android / iOS / Mac / Windows / Linux   |  免费   |
| [Joplin](https://github.com/laurent22/joplin/)  |  Android / iOS / Mac / Windows / Linux   |  免费   |


## 标题
以`#`号开头，后面至少一个空格，和H1~H6一样的
输入：
```md
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

还有一种写法，但是仅限于一级标题和二级标题
输入：
```md
一级标题的下方加等号，数量无所谓
=======

二级标题的下方加横杠，数量无所谓
-------
```


## 列表
列表的使用场景比较多

### 无序列表
以`*`、`+`、`-`开头，后面至少一个空格，标识为前面有一个实心圆点`●`
输入：
```md
* 无序列表1
+ 无序列表2
- 无序列表3
```
输出：
* 无序列表1
+ 无序列表2
- 无序列表3

### 有序列表
全部使用`1.`即可，生成的时候会自增

> [!TIP]
> 有序列表的序号会自动递增，不需要手动输入，当然你也可以手动输入

输入：
```md
1. 有序列表1
2. 有序列表2
3. 有序列表3
```
输出：
1. 有序列表1
2. 有序列表2
3. 有序列表3

### 层级列表
和无序列表一样，只是层级更深了，使用`*`号开头
每下一层比上一层多 **2个空格**
::: warning
第一层前面**不可超过3个空格**
第一级的标识为实心圆点`●`
第二级的标识为空心圆点`○`
第三级的标识为实心方点`■`
:::

输入：
```md
* 层级列表1
  * 层级列表1-1
    * 层级列表1-1-1
```
输出：
* 层级列表1
  * 层级列表1-1
    * 层级列表1-1-1

### 任务列表
和无序列表一样，使用 * 号开头
其实就是我们常说的待办列表
格式如下， [ ] 里面是空格，若完成了， [ ] 里的空格换成X
```md
* [ ] 任务1
* [X] 任务2
```
输出：
* [ ] 任务1
* [X] 任务2

## 引用
引用比较简单，符号是 >，可以多层嵌套
输入：
```md
> 引用1
>> 引用2
>>> 引用3
```
输出：
> 引用1
>> 引用2
>>> 引用3

## 字体
字体的格式比较多，记得符号后不用空格

```md
*斜体* 
```
*斜体*

```md
**粗体** 
```
**粗体**

```md
***斜体粗体***
```
***斜体粗体***

```md
~~删除线~~
```
~~删除线~~


```md
`高亮`
```
`高亮`

```md
<u>下划线</u>   // 纯视觉上的下划线（无特定语义）
```
<u>下划线</u>


```md
<ins>下划线</ins>   // 表示"插入的内容"（带有语义，表示文档修订后新增的内容）
```
<ins>下划线</ins>

```md
<mark>高亮标记</mark>
```
<mark>高亮标记</mark>


```md
<span style="border-bottom:2px dashed yellow;">黄色下划线 用的是html代码</span>
```
<span style="border-bottom:2px dashed yellow;">黄色下划线 用的是html代码</span>

```md
<span style="text-decoration: underline;">普通下划线 用的是html代码</span>
```
<span style="text-decoration: underline;">普通下划线 用的是html代码</span>

## 图片链接
此方法，适用于图片/视频/音频等，有链接都可以
::: tip
[] 中括号的替代文字可以留空
:::

输入：
```md
![这是夏娜，她很可爱](https://raw.githubusercontent.com/Dantezhenniubi/image-repo/master/%E5%9B%BE%E7%89%87%E9%93%BE%E6%8E%A5%E6%BC%94%E7%A4%BA.jpg)
```
输出：
![这是夏娜，她很可爱](https://raw.githubusercontent.com/Dantezhenniubi/image-repo/master/%E5%9B%BE%E7%89%87%E9%93%BE%E6%8E%A5%E6%BC%94%E7%A4%BA.jpg)

当链接失效时，中括号里的内容会替代图片:
![这是夏娜，她很可爱](https://raw.githubusercontent.com/Dantezhenniubi/错误的链接/master/%E5%9B%BE%E7%89%87%E9%93%BE%E6%8E%A5%E6%BC%94%E7%A4%BA.jpg)


## 超链接
### 行内式
```md
[链接文字](链接地址)
```
例如：
```md
[这是一个超链接](https://www.baidu.com)
```
输出：
[这是一个超链接](https://www.baidu.com)

自动链接
```md
<链接地址>
```
例如：
```md
<https://www.baidu.com>
```
输出：
<https://www.baidu.com>

## 分割线
同时用三个连续的`-`或`*`或`_`即可，建议不要用`-`，因为会和二级标题语法混乱
```md
---
***
___
```
输出：

区域1
此处不展示

区域2
***
区域3
___

## 代码块
### 单个代码
2个反引号包裹，中间是文字或代码
输入：
```md
`突出文字`
```

输出：
`突出文字`

### 多行代码
上下三个反引号```开始和结尾，中间放内容，开头反引号后面可以接高亮的语言语法，例如：
````md
```js
console.log('hello world')
```
````

输出：

```js
console.log('hello world')
```

### 代码块嵌套
比如我们想展示代码块的写法，但是反引号已经用了，那么我们就用4个反引号 ```` ，以此类推即可

输入：
`````md{1,5}
````md
```js
console.log('hello world')
```
````
`````

输出：
````md
```js
console.log('hello world')
```
````

### 代码增减行加亮
输入：
````md{1,4}
```diff
- pnpm add -D vitepress
+ pnpm add -D vitepress
```
````

输出：
```diff
- pnpm add -D vitepress
+ pnpm add -D vitepress
```

## 表格
- 第一行：表头行，用`|`分隔，控制分列
- 第二行：控制行，用`-`分隔，控制分行

::: tip
使用冒号`:` 可控制对齐方式

`:-`表示左对齐

`.`或`:-:`表示中对齐

`-:`表示右对齐
`:::`
:::

- 第三行及以下：数据行,用`|`隔开

**表头行和控制行数量要一致，否则不生效！**

输入：
```md
| 姓名 | 年龄 | 性别 |
| :- | -: | :-: |
| 张三 | 18 | 男 |
| 李四 | 19 | 女 |
```
输出：
| 姓名 | 年龄 | 性别 |
| :- | -: | :-: |
| 张三 | 18 | 男 |
| 李四 | 19 | 女 |

::: tip
可以使用[在线表格转换工具](https://tableconvert.com/zh-cn/)
:::

## 换行
回车只能换一行，如果想换多行，需要使用`<br />`标签<br>
似乎`<br>`和`<br/>`都是可以的
```md
<br>
```
---
outline: [2,6]
---


# 集成Roo Code使用大模型
这里介绍一下怎么使用VSCode插件`Roo Code`来使用免费大模型，当然你有米用付费我也没意见（

## 安装Roo Code
这里选择一个类VSCode的编辑器，不论是VSCode本体或者是衍生的AI编辑器如字节的Trae都可以~<br>
当然本教程使用的是Trae<br>
打开插件市场，搜索关键词Roo，找到图中的`Roo Code`安装
![](https://cdn.jsdelivr.net/gh/Dantezhenniubi/image-repo@master/20250825004003.png)
安装好后，左边会有个小袋鼠的图标，点开就是了
![](https://cdn.jsdelivr.net/gh/Dantezhenniubi/image-repo@master/20250825005002.png)

> 有个cherrystudio提一嘴，但是我不喜欢用~

## 注册API网站
这里你可以选择
[魔搭社区](https://modelscope.cn/my/myaccesstoken)
或者是[openrouter](https://openrouter.ai/settings/keys)

这里重点介绍魔搭社区，每天2000次免费API请求，足够你嚯嚯了

注意要**绑定阿里云账号**，否则后面访问一些模型会出现401错误
![](https://cdn.jsdelivr.net/gh/Dantezhenniubi/image-repo@master/Quicker_20250825_010205.png)

打开 个人主页 -> 访问令牌 -> 新建访问令牌
新建一个访问令牌我们后续用，名字随便起，选长期有效，复制好
![](https://cdn.jsdelivr.net/gh/Dantezhenniubi/image-repo@master/Quicker_20250825_010719.png)

## 配置Roo Code
来模型库，找一个你想要的模型点开
![](https://cdn.jsdelivr.net/gh/Dantezhenniubi/image-repo@master/20250825011125.png)

滑下来，点击右下角查看代码范例
![](https://cdn.jsdelivr.net/gh/Dantezhenniubi/image-repo@master/Quicker_20250825_011216.png)

复制这个URL和api_key，我们待会填到Roo Code中
![](https://cdn.jsdelivr.net/gh/Dantezhenniubi/image-repo@master/Quicker_20250825_011349.png)

打开Roo Code设置，填入刚刚的信息，选好对应的模型，保存一份配置
![](https://cdn.jsdelivr.net/gh/Dantezhenniubi/image-repo@master/20250825011545.png)

好了，现在你可以和AI唠嗑一句看看是否连接成功，有反应就行
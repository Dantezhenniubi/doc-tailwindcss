# 使用Github和PicGo作为图床
两者作为开源免费，适合作为初学者进行免费图床搭建
> [!warning]
> 缺点是GitHub有仓库大小限制1G

## 安装PicGo
可以到官方仓库下载PicGo的安装包，根据自己的操作系统选择下载对应的版本:
[PicGo](https://github.com/Molunerfinn/picgo/releases)

具体安装过程不再赘述

## 创建图床仓库
你需要在GitHub上创建一个仓库，用于存储图片。然后在仓库的Settings中创建一个token，用于PicGo上传图片。
### 设置token
- 点击GitHub头像，右侧菜单的`Settings`。

![](https://raw.githubusercontent.com/Dantezhenniubi/image-repo/master/GitHub%E5%9B%BE%E5%BA%8A-%E8%AE%BE%E7%BD%AEtoken1.jpg)

- 然后点击`Developer settings`（开发者设置）

![](https://raw.githubusercontent.com/Dantezhenniubi/image-repo/master/GitHub%E5%9B%BE%E5%BA%8A-%E8%AE%BE%E7%BD%AEtoken2.jpg)

- 再点击`Personal access tokens`（个人访问令牌），最后点击`Generate new token`（生成新令牌）
我们这里直接用普通的token就好
![](https://raw.githubusercontent.com/Dantezhenniubi/image-repo/master/GitHub%E5%9B%BE%E5%BA%8A-%E8%AE%BE%E7%BD%AEtoken3.jpg)


- 我们这里直接选择所有的`repo`（仓库）权限，并填好名字和有效时间
![](https://raw.githubusercontent.com/Dantezhenniubi/image-repo/master/GitHub%E5%9B%BE%E5%BA%8A-%E8%AE%BE%E7%BD%AEtoken4.jpg)

- 点击最下方的`Generate token`（生成令牌）即可得到token，复制一下，后面会用到。

## 配置PicGo
安装好PicGo后，我们打开软件，找到图床设置里的GitHub部分，填入刚刚生成的token。
然后填入你用于存储图片的仓库名称，必须按照`用户名/仓库名`格式来，分支随意，默认即可。
![](https://raw.githubusercontent.com/Dantezhenniubi/image-repo/master/GitHub%E5%9B%BE%E5%BA%8A-%E9%85%8D%E7%BD%AEPicGo1.jpg)
点击设为默认图床即可，我们就可以在上传区开始上传图片了，很简单。
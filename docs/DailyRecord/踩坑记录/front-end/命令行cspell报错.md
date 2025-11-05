---
outline: [2, 6]
tags: ['代码检查', 'cspell', '前端']
---

# 命令行cspell报错

## 问题描述
命令行一直有单词cspell拼写检查报错，导致提交钩子检查失败无法提交代码

## 解决方案
本来以为得安装cspell拓展`@cspell/eslint-plugin`，结果直接在vscode编辑器的插件里搜`Code Spell Checker`打开设置，在插件设置里关掉插件，或者**在ignorewords中添加要忽略检查的单词就行了**。
其实问题输出框里直接找到对应警告邮件添加对应单词忽略配置就行了。
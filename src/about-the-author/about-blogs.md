---
title: 介绍
category: 博客
---

## 关于博客博客

### 博客框架
> 优秀的博客框架有很多，这里我用的是vuepress-theme-hope，他是vuepress的加强版，更多可以访问官网。

1、[vuepress](https://www.vuepress.cn/)   
2、[vuepress-theme-hope](https://vuepress-theme-hope.gitee.io/v1/zh/guide/)    
3、[vuepress-reco](http://v2.vuepress-reco.recoluan.com/)

> https://vuepress-theme-hope.github.io/v2/zh/cookbook/tutorial/     
一些插件，但不支持vuepress2，https://moefyit.github.io/moefy-vuepress/

### 一些美化

> https://blog.csdn.net/weixin_42029738/article/details/125833297

### 开始
获取到后初始化：
```shell
npm i -D vuepress-theme-hope
```

## 博客内容

### 来源

::: tip
- 面试指南部分：主要来源[JavaGuide](https://javaguide.cn/),我这里复制过来，主要是打算加入自己的东西和总结。如有侵权联系我可删除。   
- 学习笔记部分：主要来源[陌溪的学习笔记](http://moxi159753.gitee.io/learningnotes/#/)。关于学习笔记，主要是节省了学习做笔记的时间，当然该实践的地方，是不能省过的。
也有其他博客的内容。这部分还不够完善，主要是学到哪里，添加到哪里。学习笔记主要用来回忆和复习以前的学习内容。（很多东西学习过后，没有经常用到很快就会忘记）
- 学习路径部分：主要来源[pdai.tech](https://pdai.tech/)，他不愧名为《Java 全栈知识体系》。他可以作为你整个学习的纲领。
- 一些其他内容：也来源一些优秀的博客文章。
- 以上都是别人的学习和总结，对于自己学习还是尽量得从源码，官网入手，其余都是一种辅助自己理解的工具。只有官网和源码是最精准的。（毕竟代码怎么会骗你呢）。

:::

所以，你就没有自己的东西吗？

哈哈，可能你会这样问。怎么说呢，现在关于Java的各种知识，网上的到处都是。但不过都是相互拷贝，其中不乏错漏。所以我想是想有那么一份全而真的文档，
方便自己复习。

其实很多知识他就在那里，搬过来很容易，但是搬进自己的脑子，再融会贯通就不是一件轻松的事了。所以我以pdai为指导，按照陌溪的学习方式（视频结合笔记），
系统的对自己知识体系结构进行梳理和查漏补缺。在用JavaGuide的面试题进行巩固。

### Gitee 和 GitHub同步
> 参考：https://gitee.com/help/articles/4284#article-header1

1. 首先通过 git remote -v 查看您要同步的仓库的远程库列表。Gitee和GitHub少了就添加
```shell
git remote add 远程库名 远程库地址
eg: git remote add gitee git@github.com:xxx/xxx.git
```
如果在 add 的时候出现error: Could not remove config section 'remote.xxx'.一类的错误，通过把仓库下.git/config 文件里面的 [remote "xxx"] 删掉或者是用别的远程库名即可。

2. 从 GitHub 上拉取最新代码到本地(或者 Gitee)
```shell
git pull 远程库名 分支名

git pull origin master
git pull gitee master
```

3. 推送本地最新代码到 Gitee（GitHub） 上。也可直接推送到GitHub，然后再gitee上拉取
```shell
git push 远程库名 分支名

git push gitee master
git push origin master

```
### 计划和要求

目前博客内容还是以面试题为主导，我会偶尔不定时的更新JavaGuide最新内容。我也会跟着内容复习和学习，其中可能会更改或补充一些自己的内容。  
该博客理论性较多，实操东西比较少。所以理论没有落地实现都是空话，就算你当时理解，如果没有实际操作，慢慢都将遗忘。  
我的实操主要是基于开源项目去学习，修改，新增各种东西（各种小demo）等。以致于在自己脑海形成自己的知识图谱。    
最终的目的，都是学以致用，为工作服务。只有技术知识扎实了才能更好的完成工作。从而实现自己的价值，过上满意的生活。（说到生活，人生啥的，想法就太多了，这里不多讲。喜欢闲聊也可以找我吹牛！）



### 推荐一些学习的网站（菜鸟教程）

> 来自：https://www.runoob.com/w3cnote/code-website-recommend.html

除了首页的一些博客分享，一些基础学习的网站也挺不错.  
[如何在 2023 年学习编程并获得开发者工作 -完整指南](https://www.freecodecamp.org/chinese/news/learn-to-code-book/)  

#### 国外的：推荐

- https://www.google.com: 基本上所有的问题都可以在这上面找到答案，但是访问需要点技巧。
- https://chat.openai.com/chat: 怎么能忘了我们的AI助手呢？他可能很不错的，当然得看你的问问题技巧了。
- http://stackoverflow.com 有干货的地方。代码遇到相关问题经常被导到这个网站去，回答质量很高，排版简洁清晰。我现在遇到问题经常会搜索词后面加一个词"stackoverflow"，敲回车的同时常常要骂一下这个创始人起个名字咋那么长.....
- http://github.com 最大的开源中心，项目五花八门，从华贵绚丽的界面到低调实用的小类库，应有尽有。需要睁大眼睛慢慢挑，适合英语好的。Ruby和Javascript的项目尤其多。
- http://codecanyon.net 初次看到这个网站，小伙伴们表示都惊呆了。原来代码也可以放在网上卖的？！！ 很多coder上传了各种代码，每个代码都明码标价。看了下销售排行，有的19刀的卖了3万多份，额di神啊。可以看到代码的演示效果，真的很漂亮。代码以php、wordpress主题、Javascript、css为主，偏前台。
- https://www.lintcode.com/: 算法学习网站，上去每天刷两道算法题，走遍天下都不怕。
- https://www.freecodecamp.org/：这是国外发起的一个 Web 开发学习的网站，从简单到深入，一步一步带你学习 Web 开发。就像一本练习册，并且当你完成相应的内容后，会得到相应的资格认证。
- https://www.codecademy.com/: 包含在线编程练习和课程视频。
- https://www.reddit.com/: 包含有趣的编程挑战题，即使不会写，也可以查看他人的解决方法。
- https://ideone.com/：在线编译器，可运行，可查看代码示例。
- http://it-ebooks.info/：大型电子图书馆，可即时免费下载书籍。
#### 国内的：
- https://www.runoob.com 自己的网站，内容丰富，新手可以作为入门指引，高手可作为手册使用，支持移动版，地址为：- https://m.runoob.com
- http://csdn.net 国内的程序员入门级网站，内容很多很杂，包括论坛、资源下载、博客、各种资讯等等。经常只在这个网站找到稳定的资源下载。攒积分要从娃娃抓起啊，不要到了要下载的时候才发现分不够。。。
- http://oschina.net 国内最好的开源社区，在这里讨论问题的氛围挺不错的。创始人红薯也很热心，更新很即时，经常看到新出的开源项目在这里有翻译介绍。
- https://cnblogs.com 个人觉得国内比较好的技术博客网站，总体质量比 CSDN 好。
- https://zhihu.com 有一些编程的专题还是不错的，还多牛人在上面分享编程经验及个人成长。
- http://segmentfault.com 国内版的stackoverflow，90后的作品，已经积累了不少中文问答，人气还有待提高。
- https://www.infoq.cn/：infoQ 内容比较有技术深度，很多大公司的架构上面都有介绍，很多实战经验非常值得借鉴。
- https://juejin.im: 掘金,一个高质量的技术社区，从 Swift 到 React Native，性能优化到开源类库，让你不错过互联网开发的每一个技术干货。
- https://www.v2ex.com/：V2EX 是一个关于分享和探索的地方，上面有很多各大公司的员工，程序员。你想要的应有尽有。
- https://www.nowcoder.com: 面经和刷面试题，各个公司的面试题和面经分享，找工作前认真刷一刷，一定会有很大收获！拿到心仪的 offer！
- https://www.proginn.com/：程序员客栈是领先的程序员自由工作平台，如果你是有经验有资质的开发者，都可以来上面注册成为开发者，业余的时候做点项目，赚点零花钱。
- https://www.imooc.com/: 慕课网，在线视频学习的编程网站,提供了丰富的移动端开发、php开发、web前端、android开发以及html5等视频教程资源公开课。
- http://www.jikexueyuan.com: 包含了各种教学视频。


## 记录博客用到的工具
将博客文章打开控制台，找到'article_content',’复制到outerHTML‘.
>markdown转换工具：https://tool.lu/markdown/#



## 文件转换工具
推荐一个文件转换的网址: (https://cloudconvert.com/epub-to-pdf)[https://cloudconvert.com/epub-to-pdf]

https://products.aspose.app/words/zh/conversion/pdf-to-md

https://products.groupdocs.app/zh/conversion/pdf-to-md

---
title: RocketMQ学习笔记
category: 
 - 中间件
tag:
- RocketMQ
---

::: tip
课程来自慕课网：[https://www.imooc.com/learn/1377](https://www.imooc.com/learn/1377)  
RocketMQ官网：[https://rocketmq.apache.org/zh/](https://rocketmq.apache.org/zh/)
简介：本实战课程涵盖RocketMQ基础概念及应用架构，通过实录环境搭建、CPP生产者应用开发、Portal门户消费者开发等实战操作，掌握RocketMQ数据接收原理，并熟练使用RocketMQ Dashboard部署及监控，深度实践RocketMQ技能。

TODO  去掉图片，整理文档。具体代码实践。
:::

## 介绍

- 需求说明与解决方案
- 开发CPP内容生产者
- 接入Portal消费者
- 架构优化与进阶调整

## 需求说明与解决方案

### 项目概要

- Q点中文网是国内著名的网络小说平台
- Q点中文网采用分布式架构开发，根据业务职能进行垂直切分，包含核心应用CPP（内容发布平台）与若干二级系统。
- 在V1.CPP暴露Restful接口，实现与二级系统数据同步
![img.png](./images/img.png)
![img_1.png](./images/img_1.png)


### 业务痛点

![img_2.png](./images/img_2.png)


### 解决方案

![img_3.png](./images/img_3.png)

### MQ能做什么
![img_4.png](./images/img_4.png)
![img_5.png](./images/img_5.png)
![img_6.png](./images/img_6.png)

### RocketMQ是什么

官网：https://rocketmq.apache.org/
![img_7.png](./images/img_7.png)
![img_8.png](./images/img_8.png)


### 解决架构痛点
![img_9.png](./images/img_9.png)

例子
![img_10.png](./images/img_10.png)


## RocketMQ关键概念 （官网）

![img_11.png](./images/img_11.png)
![img_12.png](./images/img_12.png)
![img_13.png](./images/img_13.png)

## 编码 TODO


## 分析讲解消费者接收数据的原理

![img_14.png](./images/img_14.png)

![img_15.png](./images/img_15.png)
![img_16.png](./images/img_16.png)




## 进阶优化篇

### RocketMQ Dashboard
![img_17.png](./images/img_17.png)

![img_18.png](./images/img_18.png)

![img_19.png](./images/img_19.png)

![img_20.png](./images/img_20.png)

## 总结
![img_22.png](./images/img_22.png)

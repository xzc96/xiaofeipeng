---
title: MySQL常见面试题总结
category: 
 - 中间件
tag:
- RocketMQ
---

::: tip
课程来自慕课网：[https://www.imooc.com/learn/1377](https://www.imooc.com/learn/1377)

简介：本实战课程涵盖RocketMQ基础概念及应用架构，通过实录环境搭建、CPP生产者应用开发、Portal门户消费者开发等实战操作，掌握RocketMQ数据接收原理，并熟练使用RocketMQ Dashboard部署及监控，深度实践RocketMQ技能。
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



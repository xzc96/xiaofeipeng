---
title: 我的开元醒目
category: 
 - 开源项目
icon: 
 - ruoyi
---
## RuoYi-Vue-Jiang

### 1、后端打包，将jar放进
```shell
/usr/local/src/ruoyi-jiang

```
执行脚本：
```shell

```
或者：
```shell
nohup java -jar ruoyi-admin.jar >log_ruoyi.txt &
```
### 2、前端打包，将dist里面的内容放进
```shell
/home/nginx/www/html
```
### 3、检查
```shell
ps aux | grep java
```


## RuoYi-App-Jiang

> http://doc.ruoyi.vip/ruoyi-app/
> https://uniapp.dcloud.net.cn/
> https://gitee.com/cuckoocry/RuoYi-App
> 

### 后端

ps aux | grep java

nohup java -jar officer-admin.jar >log_officer.txt &

### minion

启动：
su nohup /opt/minio server  /opt/minio/data > /opt/minio/data/minio.log 2>&1 &
http://8.129.222.111:9000/

### 小程序

1、后端重新部署ruoyi-jiang
2、app打包在微信小程序

或者：
https://uniapp.dcloud.net.cn/tutorial/build/publish-mp-weixin-cli.html

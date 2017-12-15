---
layout: post
title:  "搭建自己的科学上网方式"
excerpt: "搭建自己的科学上网方式"
date:   2017-12-15
author: ityangbaojin
---
1、[搬瓦工服务器](https://bandwagonhost.com/){:target="_blank"}, 购买搬瓦工的服务器, 购买最便宜的就好了。   
2、终端命令链接vps   
3、搭建Shadowsocks服务器:
  > 在安装Shadowsocks之前，需要安装python-pip它是python的包管理工具，类似apt-get。
  执行以下命令：
  
```
apt-get update
apt-get install python-pip
pip install shadowsocks
```    
4、然后我们在/etc/shadowsocks.json里面写一个配置文件：
```
# vim /etc/shadowsocks.json
# 内容如下
{
    "server":"ip", # 这里填写vps的ip
    "server_port":8388, # 监听的端口
    "local_address": "127.0.0.1", # 本地监听的IP地址，默认为主机
    "local_port":1080, # 本地监听的端口
    "password":"mypassword", # 服务密码
    "timeout":300,
    "method":"rc4-md5", # 这里推荐使用 md5 加密方式
    "fast_open": false # 是否使用 TCP_FASTOPEN, true / false
}
```    
5、配置完成信息之后，启动Shadowsocks服务器如下：
```
ssserver -c /etc/shadowsocks.json -d start
```
6、设置开机自启动
```
# vim /etc/rc.d/rc.local
ssserver -c /etc/shadowsocks.json -d start
```
7、在windows或者Mac上面都有Shadowsocks客户端版本：[shadowsocks](https://github.com/shadowsocks){:target="_blank"}，在这里下载对应的系统版本，然后设置shadowsocks如下：
![](http://sunnyday.qiniudn.com/ss)



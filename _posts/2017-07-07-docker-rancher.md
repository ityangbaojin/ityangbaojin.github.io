---
layout: post
title:  "Docker install Rancher"
excerpt: "Docker install Rancher"
date:   2017-07-07
author: ityangbaojin
---

1、ubuntu上安装最新版docker

    curl https://get.docker.com | sudo sh
2、安装rencher

    docker pull rancher/server    
3、启动rancher server
    
    docker run -d --restart=unless-stopped -p 8080:8080 rancher/server
4、查看Rancher logs
    
    docker logs -f <CONTAINER_ID>(docker run后的ID)
5、映射的8080端口既服务于Rancher UI，也是Rancher API的服务端口。用浏览器打开```http://ip:8080```看见UI，则说明你的Rancher Server搭建成功了
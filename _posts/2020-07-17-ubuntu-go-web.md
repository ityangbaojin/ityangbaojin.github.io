---
layout: post
title:  "Ubuntu服务器上部署golang web应用"
excerpt: "Ubuntu服务器上部署golang web应用"
date:   2020-07-17
author: ityangbaojin
---
一、前期需要准备  
> 一台可以用的Ubuntu服务器。  

二、ubuntu上安装golang
>```
apt-get install golang-go
```
查看是否安装成功
```
go version
```
查看GOPATH位置
```
go env
```
添加到环境变量中
```
vim /etc/profile
// 设置golang工作目录
export GOPATH=/root/work/go/go-web
// golang安装完默认位置
export GOROOT=/usr/lib/go-1.10
// 执行
source /etc/profile
// 验证是否成功
go version
```

三、在golang工作目录创建代码
```
package main  // 编译成可执行文件

// 导入包
import (  
    "fmt"
    "net/http"
)

func main() {
    // 建立路由
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello Golang")
    })
    http.ListenAndServe(":8080", nil)
}
```

四、创建Systemd Unit文件
>在Ubuntu服务器中找到/lib/systemd/system路径，创建goweb.service内容如下
先在golang工作目录执行, go build main.go

```
如下goweb.service内容
[Unit]
Description=goweb

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/root/work/go/go-web/main

[Install]
WantedBy=multi-user.target
```

1、启动服务
- service goweb start 
2、查看服务状态，显示Active: active (running)代表启动成功 
- service goweb status 
3、停止服务 
- service goweb stop


五、安装Nginx
>apt-get install nginx
1、启动nginx
- sudo nginx
2、停止nginx
- sudo nginx -s stop
4、修改配置文件
- cd /etc/nginx/conf.d
- vim goweb.conf
没有域名的设置，内容如下：

```
server {
    listen 80;

    location / {
        try_files $uri @backend;
    }

    location @backend {
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Host            $http_host;

        proxy_pass http://127.0.0.1:8080;
    }
}
然后保存
重新加载nginx配置
nginx -s reload
```

六、打开浏览器
输入服务器公网IP，就能出现Hello Golang
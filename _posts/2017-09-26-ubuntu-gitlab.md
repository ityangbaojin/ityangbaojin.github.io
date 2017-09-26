---
layout: post
title:  "Ubuntu 16.04 LTS搭建GitLab服务器"
excerpt: "Ubuntu 16.04 LTS搭建GitLab服务器"
date:   2017-09-26
author: ityangbaojin
---
1、安装和配置必须的依赖项

```
sudo apt-get install curl openssh-server ca-certificates postfix
```
ps: 安装完之后,出现邮件配置,如果不需要邮件服务的话,直接忽略即可,如果需要邮件服务,根据提示进行配置。

2、利用清华大学的镜像[https://mirror.tuna.tsinghua.edu.cn/help/gitlab-ce/](https://mirror.tuna.tsinghua.edu.cn/help/gitlab-ce/){:target="_blank"}来进行主程序的安装。 
首先信任 GitLab 的 GPG 公钥:

```
curl https://packages.gitlab.com/gpg.key 2> /dev/null | sudo apt-key add - &>/dev/null
```
vi打开文件/etc/apt/sources.list.d/gitlab-ce.list，加入下面一行：

```
deb https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/ubuntu xenial main
```

安装 gitlab-ce:

```
sudo apt-get update
sudo apt-get install gitlab-ce
```

3、配置并启动 GitLab

```
sudo -e /etc/gitlab/gitlab.rb
```

在文本中修改"externval_url"之后的域名，可以是本机IP或指向本机IP的域名。

externval_url 'http://192.168.31.59'

配置邮箱，通过SMTP发送应用电子邮件

```ruby
gitlab_rails['smtp_enable'] = true 
gitlab_rails['smtp_address'] = "smtp.163.com"
gitlab_rails['smtp_port'] = 25 
gitlab_rails['smtp_user_name'] = "xxuser@163.com"
gitlab_rails['smtp_password'] = "xxpassword"
gitlab_rails['smtp_domain'] = "163.com"
gitlab_rails['smtp_authentication'] = :login 
gitlab_rails['smtp_enable_starttls_auto'] = true
```

修改gitlab配置的发信人

```ruby
gitlab_rails['gitlab_email_from'] = "xxuser@163.com" 
user["git_user_email"] = "xxuser@163.com"
```

修改完，重新配置使配置生效

```
sudo gitlab-ctl reconfigure
```

4、打开 sshd 和 postfix 服务

```
service sshd start 
service postfix start 
```

5、需要允许 80 端口通过防火墙，这个端口是 GitLab 社区版的默认端口。

```
sudo iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT 
```

6、检查GitLab是否安装好并且已经正确运行

```
sudo gitlab-ctl status
```
ps: 看见如下图，run代表启动

![](http://7o52ee.com1.z0.glb.clouddn.com//17-9-26/17636108.jpg)

7、在浏览器地址栏中输入：http://192.168.31.59，即可访问GitLab的Web页面

8、启动命令

```
sudo gitlab-ctl status 查看GitLab状态
sudo gitlab-ctl stop 停止GitLab
sudo gitlab-ctl restart 重启GitLab
sudo gitlab-ctl start 启动GitLab
sudo gitlab-ctl tail 查看日志
```
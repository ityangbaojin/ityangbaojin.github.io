---
layout: post
title:  "Ubuntu 16.04 LTS Desktop install Wireless drive"
excerpt: "Ubuntu 16.04 LTS Desktop install Wireless drive"
date:   2017-06-29
author: ityangbaojin
---

无线网卡：[COMFAST CF-WU825N](https://item.jd.com/1003188.html){:target="_blank"}  
驱动：[rtl8192eu-linux-driver](https://github.com/Mange/rtl8192eu-linux-driver){:target="_blank"}

### 一、code make install
1. github clone or download [wifi-linux-driver](https://github.com/Mange/rtl8192eu-linux-driver){:target="_blank"}
2. 进入目录 ```cd xxx```
3. 配置 ```./configure```
4. 编译 ```make```
5. 安装 ```make install```
6. 卸载 ```make uninstall```
7. 重启后就有wifi了 ```reboot``` 
  
---    

### 二、Building and installing using DKMS
1. git clone
    > git clone https://github.com/Mange/rtl8192eu-linux-driver.git
    > cd rtl8192eu-linux-driver dir
    
2. Install DKMS and other required tools
    > sudo apt-get install git linux-headers-generic build-essential dkms
    
3. Add the driver to DKMS. This will copy the source to a system directory so that it can used to rebuild the module on kernel upgrades.
    > sudo dkms add .
    
4. Build and install the driver.
    > sudo dkms install rtl8192eu/1.0
    
5. sudo reboot重启后wifi设备亮了   ,显示可连接就大功告成
6. uninstall || remove
    > If you wish to uninstall the driver at a later point, use ```dkms uninstall rtl8192eu/1.0.``` To completely remove the driver from DKMS use ```dkms remove rtl8192eu/1.0.```  

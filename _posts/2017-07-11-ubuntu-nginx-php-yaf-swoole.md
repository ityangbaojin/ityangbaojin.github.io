---
layout: post
title:  "ubuntu 16.04下php7、nginx、swoole、yaf"
excerpt: "ubuntu 16.04下php7、nginx、swoole、yaf"
date:   2017-07-11
author: ityangbaojin
---

### 环境
```
ubuntu: 16.04
php: 7.0.21
nginx: 1.11.3
swoole:1.9.15
mysql: 5.7.13
redis: 3.2.1
yaf: 3.0.5
```

### 编译环境
```
更新ubuntu:
apt-get update 
apt-get upgrade 
编译php所需编译工具以及依赖包：
sudo apt-get install build-essential gcc g++ autoconf libiconv-hook-dev libmcrypt-dev libxml2-dev libmysqlclient-dev libcurl4-openssl-dev libjpeg8-dev libpng12-dev libfreetype6-dev libpcre3 libpcre3-dev libssl-dev libxpm-dev
```

### 安装php 7.0.21
```
1. wget http://php.net/distributions/php-7.0.21.tar.gz
2. tar -zxvf php-7.0.21.tar.gz
4. cd php-7.0.21
5. ./configure --prefix=/usr/local/php \
    --with-config-file-path=/etc/php \
    --enable-fpm \
    --enable-pcntl \
    --enable-mysqlnd \
    --enable-opcache \
    --enable-sockets \
    --enable-sysvmsg \
    --enable-sysvsem \
    --enable-sysvshm \
    --enable-shmop \
    --enable-zip \
    --enable-soap \
    --enable-xml \
    --enable-mbstring \
    --disable-rpath \
    --disable-debug \
    --disable-fileinfo \
    --with-mysqli=mysqlnd \
    --with-pdo-mysql=mysqlnd \
    --with-pcre-regex \
    --with-iconv \
    --with-zlib \
    --with-mcrypt \
    --with-gd \
    --enable-gd-native-ttf \
    --with-png \
    --with-zlib-dir \
    --with-ttf \
    --with-jpeg-dir \
    --with-freetype-dir \
    --with-xpm-dir \
    --with-openssl \
    --with-mhash \
    --with-xmlrpc \
    --with-curl \
    --with-imap-ssl
6. sudo make
7. sudo make install
8. sudo mkdir /etc/php
9. sudo cp php.ini-development /etc/php/php.ini
10. vim ~/.bashrc 在末尾加上两行
export PATH=/usr/local/php/bin:$PATH
export PATH=/usr/local/php/sbin:$PATH
保存后执行：
source ~/.bashrc
10. php -v 即可看到版本
```

### 安装 nginx 1.11.3
```
1. wget http://nginx.org/download/nginx-1.11.3.tar.gz
2. tar -zxvf nginx-1.11.3.tar.gz
3. cd nginx-1.11.3/
4. /configure --prefix=/usr/local/nginx  make && make install
5. cp /usr/local/nginx/sbin/nginx /usr/local/bin/nginx
2. vim /usr/local/nginx/conf/nginx.conf
        index index.html index.htm index.php;
        location ~ \.php$ {
            root html;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }
3. 测试配置是否有语法错误
   nginx -t
   启动 nginx
   sudo nginx
   重新加载配置|重启|停止|退出
   nginx -s reload | reopen | stop | quit
```

### 配置php-fpm
```
1. cd /usr/local/php/etc/
    sudo cp php-fpm.conf.default php-fpm.conf
2. cd /usr/local/php/etc/php-fpm.d/
    sudo mv www.conf.default www.conf
3. cd /usr/local/php/var/log/
    sudo chmod -R 777 php-fpm.log
    sudo /usr/local/php/sbin/php-fmp 启动php-fpm
```

### 安装MySql 5.7.13
```
1. wget http://dev.mysql.com/get/mysql-apt-config_0.6.0-1_all.debsudo 
2. dpkg -i mysql-apt-config_0.6.0-1_all.deb
3. sudo apt-get update
4. sudo apt-get install mysql-server-5.7
```

### 安装 Redis 3.2.1
```
1. wget http://download.redis.io/releases/redis-3.2.1.tar.gz
2. tar xzf redis-3.2.1.tar.gz
3. cd redis-3.2.1
4. make
5. make install
```

### php7 安装redis扩展
```
1. wget -c https://github.com/phpredis/phpredis/archive/php7.zip
2. unzip php7.zip
3. cd phpredis-php7
4. /usr/local/php/bin/phpize
5. ./configure --with-php-config=/usr/local/php7/bin/php-config
6. make
7. make install
8. sudo vim /usr/local/php7/etc/php.ini
   中加入extension=redis.so并重启php-fpm
```

### 安装 swoole 1.9.15
```
1. wget https://github.com/swoole/swoole-src/archive/v1.9.15.tar.gz # 下载
2. tar -zxvf v1.9.15.tar.gz # 解压
3. cd swoole-src-1.9.15 # 进入目录
4. /usr/local/php/bin/phpize # 生成编译文件
5. ./configure --with-php-config=/usr/local/php7/bin/php-config # 编译php扩展
6. sudo make && make install # 编译和安装
7. sudo vim /usr/local/php7/etc/php.ini # 最后添加 extension=swoole.so
8. 重启php, php -i | grep "swoole" # 看见swoole信息就代表安装成功
```

### 安装yaf 3.0.5
```
1. wget http://pecl.php.net/get/yaf-3.0.5.tgz # 下载
2. tar -zxvf yaf-3.0.5.tgz # 解压
3. cd yaf-3.0.5 # 进入目录
4. /usr/local/php/bin/phpize # 生成编译文件
5. ./configure --with-php-config=/usr/local/php7/bin/php-config # 编译php扩展
6. make 
7. make test
8. sudo make install
9. sudo vim /usr/local/php7/etc/php.ini # 最后添加 extension=yaf.so
10. 重启php, php -i | grep "yaf" # 看见yaf信息就代表安装成功
```
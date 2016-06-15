---
layout: post
title:  "PHP7如何扩展开发"
date:   2016-06-15
author: Internet
---

本文是以PHP7作为基础，讲解如何从零开始创建一个PHP扩展。本文主要讲解创建一个扩展的基本步骤都有哪些。

### php使用
````php
<?php
var_dump(itybj('SunnyDay'));
// 结果：SunnyDay你好...
?>
````

### 生成代码
PHP为了扩展开发的方便，提供了一个类似代码生成器的工具ext_skel，这个工具在PHP源代码的/ext目录下。

````
cd xxx/ext/
./ext_skel --extname=itybj
````
extname参数的值就是扩展名称。执行ext_skel命令后，生成一个与扩展名一样的目录。

### 修改config.m4配置文件
config.m4的作用就是配合phpize工具生成configure文件。configure文件是用于环境检测的。

````
cd ./itybj
vim ./config.m4
````
大致16，17，18行
打开config.m4后，修改下面代码：

````
dnl If your extension references something external, use with: 
dnl PHP_ARG_WITH(itybj, for itybj support,
dnl Make sure that the comment is aligned:
dnl [  --with-itybj             Include itybj support])

dnl Otherwise use enable:

dnl PHP_ARG_ENABLE(itybj, whether to enable itybj support,
dnl Make sure that the comment is aligned:
dnl [  --enable-itybj           Enable itybj support])
````
dnl 是注释符号，去掉
修改成这样如下：

````
dnl If your extension references something external, use with: 
dnl PHP_ARG_WITH(itybj, for itybj support,
dnl Make sure that the comment is aligned:
dnl [  --with-itybj             Include itybj support])

dnl Otherwise use enable:

PHP_ARG_ENABLE(itybj, whether to enable itybj support,
Make sure that the comment is aligned:
[  --enable-itybj           Enable itybj support])
````

### 实现功能
修改itybj.c文件。实现itybj方法。

````c
PHP_FUNCTION(itybj)
{
    char *str = NULL;
    zend_string *strg;
    if (zend_parse_parameters(ZEND_NUM_ARGS(), "s", &str) == FAILURE) {
          return;
    }
    strg = strpprintf(0, "%.78s你好...", str);
    RETURN_STR(strg);
}
````
然后找到PHP_FE添加PHP_FE(itybj, NULL)：

````c
const zend_function_entry itybj_functions[] = {
    PHP_FE(itybj, NULL) // 此处添加即可
    PHP_FE(confirm_itybj_compiled,  NULL)        
    PHP_FE_END  
};
````

### 编译扩展
````
phpize
./configure
make
make install
````
make install 完后会出现类似这样的 xxx/extensions/no-debug-non-zts-20151012/ 就代表扩展编译成功

### 修改php.ini文件保存重启即可
````
[itybj]
extension = itybj.so
````

1、php -m 命令就会看到itybj   
2、可以写一个脚本测试  

	var_dump(itybj('SunnyDay'));

3、php -d 'extnsion=itybj.so' demo.php 或 php demo.php
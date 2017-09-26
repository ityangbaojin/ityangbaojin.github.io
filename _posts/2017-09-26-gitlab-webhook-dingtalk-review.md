---
layout: post
title:  "使用Gitlab的webhook和钉钉做代码review"
excerpt: "使用Gitlab的webhook和钉钉做代码review"
date:   2017-09-26
author: ityangbaojin
---

1、webhook功能的作用是当开发者向git服务器push代码完成时，git会触发webhook里配置的url，即向我们配置的url用post的方式发送一个json格式的内容，这个内容里包含本次push的所有信息。

2、实现步骤:
1. 根据gitlab的文档中描述的webhook post的json格式编写一个接受post内容的http接口。  
2. 接口处理完post的内容之后发送钉钉消息至群里。

3、钉钉自定义机器人文档
[自定义机器人](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.karFPe&treeId=257&articleId=105735&docType=1){:target="_blank"}

4、具体实现:
1. 接口代码(PHP)
```php
<?php
// 设置时区
    date_default_timezone_set('PRC');
    // 请求内容
    $requestBody = file_get_contents('php://input');
    if (empty($requestBody)) {
        exit('Failed to send!');
    }
    // Secret Token 验证Secret Token是不是来自gitlab设置的token
    if (! checkToken('57cb5a2633')) {
        exit('Token mismatch!');
    }
    $content = json_decode($requestBody, true);
    // 把返回的数据已原格式的数据写入文件
    // file_put_contents('./tmp.log', var_export($content, true));
    // 组装内容
    $message = '';
    if ($content['total_commits_count'] > 0) {
        $message = $content['user_name'] . ' 向 ' . $content['project']['name'] . ' 项目的 ' . $content['ref'] . ' 分支 ' . $content['event_name'] . ' 了文件' . PHP_EOL;
        $count = 0;
        foreach ($content['commits'] as $commit) {
            $count++;
            $message .=  $count . '、 ' . date('Y-m-d H:i:s', strtotime($commit['timestamp'])) . ' 提交的commit：' . $commit['message'] . '点击 ' . $commit['url'] . ' 查看本次commit diff' . PHP_EOL;
        }
    } else {
        $message .= $content['user_name'] . '在' . $content['project']['name'] . '项目创建或者删除了一个分支:' . $content['ref'];
    }
    // 机器人对应的Webhook地址
    $webhook = 'https://oapi.dingtalk.com/robot/send?access_token=xxxxx';
    $data = [
        'msgtype' => 'text',
        'text' => [
            'content' => $message
        ]
    ];
    $dataString = json_encode($data);
    // 向钉钉发起POST请求
    $result = requestByCurl($webhook, $dataString);  
    echo $result;  


    /**
     * 检测token
     * @param {string} $validToken
     * @return boolean
     */
    function checkToken($validToken) {  
        return $validToken === $_SERVER['HTTP_X_GITLAB_TOKEN'] ? true : false;
    }

    /**
     * 向钉钉发起POST请求
     * @param {string} $remoteServer
     * @param {string} $postString
     * @return json
     */
    function requestByCurl($remoteServer, $postString) {  
        $ch = curl_init();  
        curl_setopt($ch, CURLOPT_URL, $remoteServer);
        curl_setopt($ch, CURLOPT_POST, 1); 
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5); 
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json;charset=utf-8']);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
        $data = curl_exec($ch);
        curl_close($ch);   
        return $data;  
    }
```

5、完成之后，把接口的url配置到gitlab的webhook上就可以看push消息了。

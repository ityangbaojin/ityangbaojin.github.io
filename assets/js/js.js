$(function() {
	$('[data-toggle="tooltip"]').tooltip();

	// 去除指定文章的href为#
    var sunnyday = document.querySelector('.sunnyday');
    if (sunnyday !== null) {
    	sunnyday.setAttribute('href', '#');
	    // 需要输入密码才可以访问，密码MD5加密
	    sunnyday.onclick = function() {
	    	var passWord = prompt('请输入查看密码!!!');
	      	if (passWord === null) {
	        	return;
	      	}
	      	if (hex_md5(passWord) === 'd569e7165b01adda3f1dbb74faa5f6e7') {
	      		// 本地存储
	      		store.set('secret', 'sunnyday');
	        	window.location.href = '/2016/07/11/laravel.html';
	      	}
	    }
    }
	
	var buttonColor = ['', 'default', 'primary', 'success', 'info', 'warning', 'danger'];
	// 随机一个值
	function randNum(arr) {
	    return arr[Math.floor(Math.random() * arr.length)];
	}
	var btnElement = document.querySelectorAll('.button-color');
	var len = btnElement.length;
	for(var i = 0; i < len; i++) {
	    btnElement[i].className = 'btn btn-' + randNum(buttonColor);
	}

	
	// url是tool就选中
    if (window.location.href.indexOf('tool') > 1) {
        document.querySelectorAll('.nav li a')[1].className = 'selected';
    }

	if (window.location.href.indexOf('about') > 1) {
		// document.querySelectorAll('.nav li a')[1].style.borderBottom = '2px solid #4183c4';
		document.querySelectorAll('.nav li a')[2].className = 'selected';
	}

    

	// 禁止右键
	document.oncontextmenu = function() {
    	return false;
  	}

  	// 禁止F12键
  	document.onkeydown = function() {
		if (window.event && window.event.keyCode == 123) {
			window.event.keyCode = 0;
	    	window.event.returnValue = false;
		}
	}

    // 清除textarea内容
    $('.clear-all').click(function () {
        $('textarea').val('');
    });

    // Base64编码
    $('.base-encode').click(function () {
        var baseVal = $.trim($('textarea[name="baseVal"]').val());
        // Base64编码支持中文
        var enBase64 = base64.encode(utf8.encode(baseVal));
        $('.baseVal').val(enBase64);
    });

    // Base64解码
    $('.base-decode').click(function () {
        var baseVal = $.trim($('textarea[name="baseVal"]').val());
        // Base64解码
        var deBase64 = utf8.decode(base64.decode(baseVal));
        $('.baseVal').val(deBase64);
    });

    // UrlEncode编码
    $('.url-encode').click(function () {
        var urlVal = $.trim($('textarea[name="urlVal"]').val());
        $('.urlVal').val(encodeURI(urlVal));
    });

    // UrlEncode解码
    $('.url-decode').click(function () {
        var urlVal = $.trim($('textarea[name="urlVal"]').val());
        $('.urlVal').val(decodeURI(urlVal));
    });

    // MD5加密
    $('.md5-encode').click(function () {
        var md5Val = $.trim($('textarea[name="md5Val"]').val());
        $('.md5Val').val(hex_md5(md5Val));
    });

    // ip查询
    $('.ip-select').click(function () {
        var ipVal = $.trim($('input[name="ipVal"]').val());
        if (ipVal === '') {
            return false;
        }
        $(this).attr('disabled', true);
        var url = 'http://test.bingootech.com/ip/service?ip=' + ipVal;
        $.ajax({
            url: url ,
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(data) {
                if (data.errNum == 0 && data.errMsg == 'success') {
                    $('.ip-info ').show();
                    var str = '<tr><th>IP</th><th>国家/地区</th><th>省份</th><th>城市</th><th>区/县</th><th>运营商</th></tr>';
                        str += '<tr class="success"><td>' + data.retData.ip + '</td><td>' + data.retData.country + '</td><td>' + data.retData.province + '</td><td>' + data.retData.city + '</td><td>' + data.retData.district + '</td><td>' + data.retData.carrier + '</td></tr>';
                    $('.ip-data').html(str);
                    setTimeout(function () {
                        $('.ip-select').removeAttr('disabled');
                    }, 1500);
                } else {
                    alert(data.retData);
                    setTimeout(function () {
                        $('.ip-select').removeAttr('disabled');
                    }, 1500);
                }
            }, error:function() {
                alert('Service is busy, please try again later!');
                setTimeout(function () {
                    $('.ip-select').removeAttr('disabled');
                }, 1500);
            }
        });
    });
});
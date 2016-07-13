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

	// url是about就选中
	if (window.location.href.indexOf('about') > 1) {
		// document.querySelectorAll('.nav li a')[1].style.borderBottom = '2px solid #4183c4';
		document.querySelectorAll('.nav li a')[1].className = 'selected';
	}

	// 禁止右键
	document.oncontextmenu = function() {
    	return false;
  	}

  	// 禁止F12键
  	document.onkeydown = function() {
		if(window.event && window.event.keyCode == 123) {
			window.event.keyCode = 0;
	    	window.event.returnValue = false;
		}
	}
});
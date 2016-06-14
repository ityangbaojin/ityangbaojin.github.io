$(function() {
	$('[data-toggle="tooltip"]').tooltip();
	
	var buttonColor = ['', 'default', 'primary', 'success', 'info', 'warning', 'danger'];
	// 随机一个值
	function randNum(arr) {
	    return arr[Math.floor(Math.random() * arr.length)];
	}
	var btnElement = document.querySelectorAll('.button-color');
	for(var i = 0; i < btnElement.length; i++) {
	    btnElement[i].className = 'btn btn-' + randNum(buttonColor);
	}

	// url是about就选中
	if (window.location.href.indexOf('about') > 1) {
		// document.querySelectorAll('.nav li a')[1].style.borderBottom = '2px solid #4183c4';
		document.querySelectorAll('.nav li a')[1].className = 'selected';
	}
});
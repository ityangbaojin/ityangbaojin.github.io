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
});
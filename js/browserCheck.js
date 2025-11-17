var browser = navigator.userAgent.toLowerCase();
if(browser.indexOf("msie") != -1 && browser.indexOf("msie 9") == -1 && browser.indexOf("msie 10") == -1){
	alert("해당 사이트는 익스플로러 9이상, 크롬, 파폭, 오페라, 사파리에서 보셔야 됩니다.");
	window.location.href = "./downBrowser.html";
}
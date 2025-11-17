$(document).ready(function() {
	 /* common */
	$(".slideBox > a").mouseover(function(){
		$(this).addClass("arrow");
		$(this).parents(".slideBox").stop().animate({top:"-420px"}, 500, function(){
			$(".contList").textillate("start");
		});
		$(this).parents("li").mouseleave(function(){
			$(this).children(".slideBox").stop().animate({top:"0px"}, 500, function(){
				$(this).children("a").removeClass("arrow");
			});
		});
		return false;
	});
	/* //comon */

	/* about */
	$(".about > a.ShowCont").click(function(){
		var prtVal = $(this).parent().parent();

		prtVal.animate({width:"1000px"}, {duration:500});
		prtVal.mouseleave(function(){
			$(this).animate({width:"320px"}, {duration:500});
			$(this).children(".slideBox").stop().animate({top:"0px"}, 500, function(){
				$(this).children("a").removeClass("arrow");
			});
		});

		$(".btn_close").click(function(){
			prtVal.animate({width:"320px"}, {duration:500});
			return false;
		});

		return false;
	});
	/* //about */

	/* portfolio */
	$(".portfolio > a.ShowCont").click(function(){
		var prtVal = $(this).parent().parent();
		
		prtVal.children("div:not(:last)").hide();
		prtVal.prev().hide().end().next().hide();

		prtVal.children("#animated").show();
		prtVal.css({"margin-left" : "0px"}).animate({width:"1000px"}, 1000, function(){
			$("#animated").hide();
			$("#project").show();
			$(".warning").textillate("start");
			
		});

		$(".btn_close").click(function(){
			prtVal.children().show();
			prtVal.css({"width" : "320px","margin-left" : "15px"});
			prtVal.parent().children("li").show();
			return false;
		});
		return false;
	});
	
	/* thumenail에 맞춰서 ajax로 프로젝트 가져오기 */
	$(".thumenail").click(function(){
		var PRName = $(this).data("id");
		var loadHtml = "";
		$(".contentBox").html("<img src='./images/common/loading.gif' alt='loading' class='loading'/>");
		
		$(".contentBox").animate({ scrollTop: $("h1").offset().top-20 }, "slow","swing",function(){
			$.ajax({
				type: "GET",
				url: "./portfolio.html",
				dataType: "html",
				success: function(data) {
					$("body").append("<div id='load_project' style='display:none;'></div>");
					$("#load_project").html(data);
					$(".project_info").each(function(){
						var idVal = $(this).attr("id");
						if(idVal != PRName){
							$(this).remove();
						}
					});
					loadHtml = $("#load_project").html();
					$("#load_project").remove();
					$(".contentBox").html(loadHtml);
				},
				error: function(xhr, textStatus, errorThrown) {
					alert("An error occurred!" + ( errorThrown ? errorThrown :xhr.status ));
				}
			});
		});
		
		return false;
	});

	/* paging처리 */
	$("#paging > a").click(function(){
		var pageVal = $(this).children("span").text();
		
		$("#paging > a").removeClass("selected");
		$(this).addClass("selected");
		
		$(".thum").hide();
		$(".thum"+pageVal).show();
		
	});
	/* //portfolio */

	/* contact */
	$(".contact > a.ShowCont").click(function(){
		$("#layer_bg").show();
		$("#ctctBox").fadeIn(700).animate({marginTop:"-245px"}, {duration:500});

		$("#ctctBox > .btn_close").click(function(){
			$("#ctctBox").animate({marginTop : "-200"}, 200, function(){
				$("#ctctBox").animate({marginTop : "-1000px"}, 200, function(){
					$("#layer_bg").fadeOut(700);
				});
			});
		});

		return false;
	});
	
	$("#choice").click(function(){
		$(this).next().slideDown("slow");
		$("#selectBox > li > a").click(function(){
			var choiceTxt = $(this).text();
			$("#choice").text(choiceTxt);
			$("#selectBox").slideUp("slow");
			return false;
		});
	});
	
	$("#selectBox > ul > li > a").click(function(){
		var nameVal = $(this).attr("id"),
			linkVal = $(this).attr("href"),
			topVal = "",
			txtUse = true,
			returnVal = false;

		$("#bul_arrow").removeClass("hdn");
		if(nameVal === "mail"){
			topVal = 122;
			if(!confirm("OutLook사용자이십니까?")) txtUse = false;
			else $("#btn_send").attr("href",linkVal)
		}else{
			txtUse = false;

			if(nameVal === "facebook"){
				topVal = 85;
				returnVal = true;
			}else if(nameVal === "tel"){
				var userInfo = navigator.userAgent.toUpperCase(),
					chkList = ["IPHONE","IPAD","MOBILE","IEMOBILE"],
					mobileAt = "N";
					topVal = 159;

				$.each(chkList, function(i, val){
					if(userInfo.indexOf(val) > -1){
						mobileAt = "Y";
					}
				});
				
				if(mobileAt == "N"){
					alert("전화기기로 접속 시 전화연결 사용가능합니다.");
				}else{
					returnVal = true;
				}
			}else topVal = 0;
		}
		
		if(txtUse){
			$("#ctctBox").animate({height:"450px"},300,function(){
				$(".box_contact_txt").fadeIn(300);
			});
		}else{
			$(".box_contact_txt").fadeOut(300);
			$("#ctctBox").animate({height:"200px"},300);
		}

		$("#bul_arrow").stop().animate({top:topVal+"px"}, 300);
		
		$("#box_radio > ."+nameVal).prop("checked", true);
			
		if(!returnVal) return false;
	});

	$("#btn_send").click(function(){
		var linkVal = $(this).attr("href")
			subject = $("#nttSj").val()
			body = $("#nttCn").val();
		
		if(!subject){
			alert("제목을 작성해주세요.");
			$("#nttSj").focus();
			return false;
		}
		
		if(!body){
			alert("내용을 작성해주세요.");
			$("#nttCn").focus();
			return false;
		}
		$(this).attr("href",linkVal+"&subject="+subject+"&body="+body);
	});
	/* //contact */
 });

/* text */
$(function () {
	$(".contList").textillate({
	  selector: ".texts",
	  loop: true,
	  minDisplayTime: 2000,
	  initialDelay: 0,
	  autoStart: false,
	  inEffects: [],
	  outEffects: [ "hinge" ],
	  in: {
		effect: "rotateIn",
		delayScale: 1.5,
		delay: 50,
		sync: false,
		shuffle: false,
		reverse: false,
		callback: function () {}
	  },
	  out: {
		effect: "fadeOut",
		delayScale: 1.5,
		delay: 50,
		sync: false,
		shuffle: false,
		reverse: false,
		callback: function () {}
	  },
	  callback: function () {}
	});

	$(".warning").textillate({
	  selector: ".texts",
	  loop: true,
	  minDisplayTime: 2000,
	  initialDelay: 0,
	  autoStart: false,
	  inEffects: [],
	  outEffects: [ "hinge" ],
	  in: {
		effect: "pulse",
		delayScale: 1.5,
		delay: 50,
		sync: false,
		shuffle: false,
		reverse: false,
		callback: function () {}
	  },
	  out: {
		effect: "fadeOut",
		delayScale: 1.5,
		delay: 50,
		sync: false,
		shuffle: false,
		reverse: false,
		callback: function () {}
	  },
	  callback: function () {}
	});
});
/* //text */
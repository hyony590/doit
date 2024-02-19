//브라우저 너비 감지하여 중단점 지정
(function(win, $){
	var $html = $("html");
	var deviceSize = { pc:1009, tablet:801, mobile:800 };	//반응형 웹의 중단점에 사용할 값을 객체 속성으로 등록함

	//매개변수에 전달된 값이 'scroll'이면, 스크롤바가 생성. 너빗값을 반환.
	function scrollShowHide(status) {
		$html.css({"overflow-y":status});
		return $html.width();    
	}

	var sc_w1 = scrollShowHide("hidden"),
					sc_w2 = scrollShowHide("scroll"),
					sc_w3 = sc_w1 - sc_w2;

	if(sc_w3 > 0) {
					deviceSize.pc = deviceSize.pc -  sc_w3;
					deviceSize.tablet = deviceSize.tablet -  sc_w3;
					deviceSize.mobile = deviceSize.mobile -  sc_w3;
	}
	//console.log(deviceSize.pc);

	$(win).on("resize", function() {
		var w_size = $(win).width();	//창 너비가 변하면 w_size에 저장
		if(w_size >= deviceSize.pc && !$("html").hasClass("pc")) {	//브라우저 창 너비가 데스크톱 너비보다 크거나 같으면
			$html.removeClass("mobile tablet").addClass("pc");
			scrollShowHide("scroll");
		} else if(w_size < deviceSize.pc  && w_size >= deviceSize.tablet && !$("html").hasClass("tablet")) {		//브라우저 창 너비가 태블릿 사이즈인 경우
			$html.removeClass("mobile pc").addClass("tablet");
			scrollShowHide("scroll");
		} else if(w_size <= deviceSize.mobile  && !$html.hasClass("mobile")) {		//모바일 사이즈인 경우 실행
			$html.removeClass("pc tablet").addClass("mobile");
			var menu_pos = parseInt($(".mobile-menu-wrap").css("left"));
			if(menu_pos >= 0) {
				scrollShowHide("hidden");
			}
		}
	});

	$(function(){
		$(win).trigger("resize");	//문서가 로딩될 때 resize 이벤트 발생. 이때 설정한 중단점에 맞는 class 값 생성

		$(document).on("mouseover focus", ".pc #gnb>ul>li>a, .tablet #gnb>ul>li>a", gnbPlay);

		$(document).on("click", ".mobile #gnb>ul>li:not(.no-sub)>a", gnbPlay);
					
		function gnbPlay() {
			var $ts = $(this);
			if($("html").hasClass("mobile")) {
				$(".mobile #gnb>ul>li>a").removeClass("on");
				$("#gnb ul ul:visible").slideUp(300);
				if($ts.next().is(":hidden")) {
								$ts.addClass("on");
								$ts.next().stop(true,true).slideDown(300);
				}
			} else {
					$("#gnb ul ul:visible").slideUp(300);
					$ts.next().stop(true,true).slideDown(300);
			}
		} 

		$(document).on("mouseleave",".pc #gnb, .tablet #gnb", gnbleave);

		function gnbleave() {
			$("#gnb ul ul:visible").slideUp(300);
			$("#gnb>ul>li>a").removeClass("on");
		}

		$(".mobile-menu-open button").on("click", function() {
			$(".mobile-menu-wrap").animate({"left":0}, 200);
			scrollShowHide("hidden");
		});

		$(".mobile-menu-close button").on("click", function() {
			$(".mobile-menu-wrap").animate({"left":"-1000px"}, 200);
			scrollShowHide("scroll");
			gnbleave();
		});
	});
}(window, jQuery));

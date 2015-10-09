$(function(){
	var confi = {
		keepZoomRatio: false,
		layer: {
			"width": "100%",
			"height": "100%",
			"top": 0,
			"left": 0
		},
		timeAlldefault:{
			mayun : {
				left: "20px",
				top:"10px"
			}
		}

	};
	var container = $("#content");
	container.css(confi.layer);       //初始化页面布局
	var visualWidth = container.width();
	var visualHeight = container.height();

	var runWay = visualWidth *15/4;      //动态获取图片的宽
	var runWayWidth = runWay * 2200/3842.75; //获取跑道的宽
	console.info(visualHeight);
	console.info(visualWidth);
	$('#runway>img').css("width",runWay);
	//$('#runway>img').css("height",visualHeight);


	//获取你选择人的名字
	$("#PKpeople li div").click(function(){
		$("#PKpeople li div").removeClass("active");
		$(this).addClass("active");			
		var PKname = $(this).find("span").html(); // 获取到你选中的人		
	});
	// 单击次数
	var leftNum =0;
	var rightNum =0;

	var leftcount = 0;
	var rightcount = 0;
	touch.on('#btn-left', 'touchstart', function(ev){
		leftcount ++;
		//$("#btn-right").css("background-image","url(images/right_f.png)");
		//$(this).css("background-image","url(images/left-active.png)");
		$("#btn-right").removeClass("active");
		$("#btn-left").addClass("active");
		if (leftcount>1) {
			$("#boyOne").removeClass("slowRunning");
			$("#boyOne").css("backgroundPosition", "-200% -200%");
			// $("#boyOne").addClass("slowFell");
		} else{
			leftNum = leftNum + 1;
			$("#boyOne").addClass("slowRunning");
			//$("#boyOne").animate({ left: '+=1px',top: '-=0.5px' },100);
			$("#boyTwo").animate({ left: '-=8px',top :'+=4px'},10);
			$("#boyThree").animate({ left: '-=6px',top :'+=3px'},10);
			$("#runway").animate({ left: '-=4px',top :'+=2px'},10);
		}
        rightcount=0;
   		return leftNum;
	});

	touch.on('#btn-right', 'touchstart', function(ev){
		rightcount ++;
		//$("#btn-left").css("background-image","url(images/left_f.png)");
		//$(this).css("background-image","url(images/right-active.png)");
		$("#btn-left").removeClass("active");
		$("#btn-right").addClass("active");
		if(rightcount>1){
			$("#boyOne").removeClass("slowRunning");
			$("#boyOne").css("backgroundPosition", "-200% -200%");
			// $("#boyOne").addClass("slowFell");
		}else{
			rightNum = rightNum + 1;
			$("#boyOne").addClass("slowRunning");
			//$("#boyOne").animate({ left: '+=1px',top: '-=0.5px' },100);
			$("#boyTwo").animate({ left: '-=8px',top :'+=4px'},10);
			$("#boyThree").animate({ left: '-=6px',top :'+=3px'},10);
			$("#runway").animate({ left: '-=4px',top :'+=2px'},10);
		}
		leftcount=0;
		return rightNum;
	});
	
	//马云的速度
	function people(){
		$("#boyTwo").animate({ left: '+=4px',top :'-=2px'},100)
	}
	function peopleThree(){
		$("#boyThree").animate({ left: '+=12px',top :'-=6px'},100)
	}
	//跑道移动
	function runWayLeft(){
		$("#runway").animate({ left: '-=2px',top :'+=1px'},100);
	}
		 			

	// 倒计时
	touch.on('#started', 'touchstart', function(ev){
		downTime = setInterval (countDown, 1000);
		$(".message").hide();
	});

	// 倒计时
	var downDefault = 3;
	var downTime ;
	var timeTime;
	function countDown(){	
		downDefault -- ;
		if(downDefault == 1){
			$("#boyTwo").css("backgroundPosition", "-0% -200%");
	 		$("#boyOne").css("backgroundPosition", "-0% -200%");
		}
		if(downDefault == 0){
	 		clearInterval(downTime);
	 		$("#countDown").css("display","none");
	 		timeTime = setInterval (countTime,10);
	 		$("#boyTwo").addClass("slowRunning");
	 		$("#boyOne").addClass("slowRunning");
			$("#boyThree").addClass("slowRunning");
	 		var peopleRun = setInterval (people, 200);
			var peopleRunThree = setInterval (peopleThree, 200);
	 		var runWayLeftRun = setInterval (runWayLeft, 200);
	 		
	 	}
		//$("#countDown").html(downDefault);
		$("#countDown").css("background-image","url(images/"+downDefault+".png)");
		
	}

	// 跑步计时
	var timeMsDefault = 0;
	var timeSDefault = 0;
	var timeDefault = "00:00";
	function countTime(){
		timeMsDefault ++;
		if (timeMsDefault >= 100) {
			timeMsDefault = 0;
			timeSDefault ++;
		};
		if(timeMsDefault < 10){
			timeMsDefault = '0' + timeMsDefault;
		}
		if(timeSDefault >= 5){
			timeDefault = timeSDefault+':'+timeMsDefault;
			 clearInterval(timeTime);
			// clearInterval(peopleRun);
			// clearInterval(runWayLeftRun);

			// var allOneWay = 1000 + leftNum * 1 + rightNum * 1;
			// var allTwoWay = 2000 - leftNum * 8 - rightNum * 8;
			var allWay = leftNum *20 + rightNum*20;
			
			document.cookie= "allWay=" + allWay;
			//location.href = "file:///Users/macmini/Desktop/running%E5%89%AF%E6%9C%AC%202/result.html";
			location.href = "http://taiji.iwepac.com/run/result.html";

		}else{
			timeDefault = '0'+timeSDefault+':'+timeMsDefault;
		}
		$("#countTime").html(timeDefault);
	}
});













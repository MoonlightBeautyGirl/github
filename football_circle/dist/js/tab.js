function indexSwipe(e){var i=jq("#fbBox").width()/3,n=parseInt(jq("#fbBox").css("marginLeft")),s=0;return!("left"==e&&n==-2*i||"right"==e&&0==n)&&(s="left"==e?n-i:n+i,void jq("#fbBox").animate({marginLeft:s+"px"},200,function(){n=parseInt(jq("#fbBox").css("marginLeft"));var e=-n/i;jq("#topNav").find("span").eq(e).addClass("checked").siblings().removeClass("checked")}))}function hotPageShow(e){var i=jq("#fbBox").width()/3;jq("#fbBox").css("marginLeft",-i*e+"px")}function loginShow(){jq("#login").fadeIn("fast")}function loginHide(){jq("#login").fadeOut("fast")}function regShow(){jq("#register").show().animate({bottom:"0"},200)}function regHide(){jq("#register").animate({bottom:"-4rem"},200,function(){jq("#register").hide()})}function sideShow(){jq("#sideBar").show().animate({left:"0"},200)}function sideHide(){jq("#sideBar").animate({left:"-3.6rem"},200,function(){jq("#sideBar").hide()})}function maskShow(){jq("#mask").fadeIn("fast")}function maskHide(){jq("#mask").fadeOut("fast")}$("#headerTab").find("span").on("singleTap",function(){$(this).addClass("checked").siblings().removeClass("checked"),jq("#indexBox").find(".index-page").eq($(this).index()).show().siblings().hide()}),$("#topNav").find("span").on("singleTap",function(){hotPageShow($(this).index()),$(this).addClass("checked").siblings().removeClass("checked")}),$("#mask").on("singleTap",function(){maskHide(),sideHide(),loginHide(),regHide(),jq("#quitTip").hide("fast")}),$("#sideBarBtn").on("singleTap",function(e){maskShow(),sideShow(),jq("#unLog").find("img").on("singleTap",function(){sideHide(),loginShow()})}),$("#logClose").on("singleTap",function(){loginHide(),maskHide()}),$("#gotoReg").on("singleTap",function(){loginHide(),regShow()}),$("#regClose").on("singleTap",function(){regHide(),maskHide()});var footerCheck="indexBtn";$("#indexBtn").on("singleTap",function(){jq("#indexBtn").addClass("checked").siblings().removeClass("checked"),jq("#indexBox").show().siblings().hide(),jq("#headerTab").show(),jq("#headerTitle").hide(),footerCheck="indexBtn"}),$("#findBtn").on("singleTap",function(){jq("#findBtn").addClass("checked").siblings().removeClass("checked"),jq("#searchBar").show().siblings().hide(),jq("#headerTab").hide(),jq("#headerTitle").show().html("发现"),footerCheck="findBtn"}),$("#myBtn").on("singleTap",function(){jq("#myBtn").addClass("checked").siblings().removeClass("checked"),jq("#myBox").show().siblings().hide(),jq("#headerTab").hide(),jq("#headerTitle").show().html("个人中心"),footerCheck="myBtn"}),$("#exitBtn").on("singleTap",function(){isLogin()&&(jq("#exitBtn").addClass("checked").siblings().removeClass("checked"),maskShow(),jq("#quitTip").show("fast"),$("#quitClose").on("singleTap",function(){maskHide(),jq("#quitTip").hide("fast",function(){jq("#"+footerCheck).addClass("checked").siblings().removeClass("checked")})}),$("#quitSure").on("singleTap",function(){maskHide(),jq("#quitTip").hide("fast",function(){jq("#"+footerCheck).addClass("checked").siblings().removeClass("checked")}),logOut(),jq("#userInfo").hide(),jq("#unLog").show(),jq("#myUnlog").show().siblings().hide()}))}),$(".side-btn").on("singleTap",function(){footerCheck="indexBtn",jq("#indexBtn").addClass("checked").siblings().removeClass("checked"),jq("#indexBox").show().siblings().hide(),$("#hotBtn").addClass("checked").siblings().removeClass("checked"),jq("#hotSpot").show(),jq("#follow").hide();var e=$(this).index();hotPageShow(e),$("#topNav").find("span").eq(e).addClass("checked").siblings().removeClass("checked"),maskHide(),sideHide(),jq("#headerTab").show(),jq("#headerTitle").hide()}),$("#fbBox").on("swipeLeft",function(){indexSwipe("left")}),$("#fbBox").on("swipeRight",function(){indexSwipe("right")}),$("#myLogin").on("singleTap",function(){maskShow(),loginShow()}),$("#touXiang").on("singleTap",function(){jq("#myCut").show().siblings().hide()}),$("#cutSub").on("singleTap",function(){var e=document.getElementById("c1"),i=e.toDataURL();jq("#touXiang").attr("src",i),jq("#bysbd").attr("src",i),jq("#myUser").show().siblings().hide()});
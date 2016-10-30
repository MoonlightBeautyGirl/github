/*交互
 *start fy
 */

/*header按钮点击*/
$('#headerTab').find('span').on('singleTap', function() {
	$(this).addClass('checked').siblings().removeClass('checked');
	jq('#indexBox').find('.index-page').eq($(this).index()).show().siblings().hide();
})

/*热点nav按钮点击*/
$('#topNav').find('span').on('singleTap', function() {
	hotPageShow($(this).index());
	$(this).addClass('checked').siblings().removeClass('checked');
})

/*点击mask都消失*/
$('#mask').on('singleTap', function() {
	maskHide();
	sideHide();
	loginHide();
	regHide();
	jq('#quitTip').hide('fast');
})

/*侧边栏按钮*/
$('#sideBarBtn').on('singleTap', function(e) {
	maskShow();
	sideShow();
	/*未登录时点击头像登录*/
	jq('#unLog').find('img').on('singleTap', function() {
		sideHide();
		loginShow();
	})
})

/*登录框*/
$('#logClose').on('singleTap', function() {
	loginHide();
	maskHide();
})
$('#gotoReg').on('singleTap', function() {
	loginHide();
	regShow();
})

/*注册框*/
$('#regClose').on('singleTap', function() {
	regHide();
	maskHide();
})

/*底部切换*/
var footerCheck = "indexBtn"; //保存最后选中的底部按钮id名
$('#indexBtn').on('singleTap', function() {
	jq('#indexBtn').addClass('checked').siblings().removeClass('checked');
	jq('#indexBox').show().siblings().hide();
	jq('#headerTab').show();
	jq('#headerTitle').hide();
	footerCheck = "indexBtn";
});
$('#findBtn').on('singleTap', function() {
	jq('#findBtn').addClass('checked').siblings().removeClass('checked');
	jq('#searchBar').show().siblings().hide();
	jq('#headerTab').hide();
	jq('#headerTitle').show().html('发现');
	footerCheck = "findBtn";
});
$('#myBtn').on('singleTap', function() {
	jq('#myBtn').addClass('checked').siblings().removeClass('checked');
	jq('#myBox').show().siblings().hide();
	jq('#headerTab').hide();
	jq('#headerTitle').show().html('个人中心');
	footerCheck = "myBtn";
});
$('#exitBtn').on('singleTap', function() {
	if (isLogin()) {
		jq('#exitBtn').addClass('checked').siblings().removeClass('checked');
		maskShow();
		jq('#quitTip').show('fast');
		$('#quitClose').on('singleTap', function() {
			maskHide();
			jq('#quitTip').hide('fast', function() {
				jq('#' + footerCheck).addClass('checked').siblings().removeClass('checked');
			});
		})
		$('#quitSure').on('singleTap', function() {
			maskHide();
			jq('#quitTip').hide('fast', function() {
				jq('#' + footerCheck).addClass('checked').siblings().removeClass('checked');
			});
			logOut();
			jq('#userInfo').hide();
			jq('#unLog').show();
			jq('#myUnlog').show().siblings().hide();
		})
	} else {
		return;
	}

})

/*侧边栏点击*/
$('.side-btn').on('singleTap', function() {
	footerCheck = "indexBtn"; 
	// 跳转回主页
	jq('#indexBtn').addClass('checked').siblings().removeClass('checked');
	jq('#indexBox').show().siblings().hide();
	//切换到热点模块
	$('#hotBtn').addClass('checked').siblings().removeClass('checked');
	jq('#hotSpot').show();
	jq('#follow').hide();
	// 跳转到对应分页,顶栏切换
	var pageNum = $(this).index()
	hotPageShow(pageNum);
	$('#topNav').find('span').eq(pageNum).addClass('checked').siblings().removeClass('checked');
	//侧边栏消失,mask隐藏
	maskHide();
	sideHide();
	// header切换
	jq('#headerTab').show();
	jq('#headerTitle').hide();
})



/*热点分页滑动切换*/
$('#fbBox').on('swipeLeft', function() {
	indexSwipe('left');
})
$('#fbBox').on('swipeRight', function() {
	indexSwipe('right');
})

/*首页滑动函数,dir方向(left,right)*/
function indexSwipe(dir) {
	var w = jq('#fbBox').width() / 3; //一次移动距离
	var ml = parseInt(jq('#fbBox').css('marginLeft')); //当前移动量marginLeft值
	var dis = 0; //偏移量
	if (((dir == "left") && (ml == -2 * w)) || ((dir == "right") && (ml == 0))) {
		return false;
	} else {
		if (dir == "left") {
			dis = ml - w;
		} else {
			dis = ml + w;
		}
		jq('#fbBox').animate({
			marginLeft: dis + 'px'
		}, 200, function() {
			ml = parseInt(jq('#fbBox').css('marginLeft'));
			var pageNum = -ml / w;
			jq('#topNav').find('span').eq(pageNum).addClass('checked').siblings().removeClass('checked');
		})
	}
}

/*个人中心*/
$('#myLogin').on('singleTap', function() {
	maskShow();
	loginShow();
})
$('#touXiang').on('singleTap', function() {
	jq('#myCut').show().siblings().hide();
})
$('#cutSub').on('singleTap', function() {
	var c1 = document.getElementById("c1");
	var dataURL = c1.toDataURL();
	jq('#touXiang').attr('src', dataURL);
	jq('#bysbd').attr('src', dataURL)
	jq('#myUser').show().siblings().hide();
})


/*热点三张页面的显示*/
function hotPageShow(n) {
	var w = jq('#fbBox').width() / 3;
	jq('#fbBox').css('marginLeft', -w * n + 'px');
}


/*登录框动画*/
function loginShow() {
	jq('#login').fadeIn('fast');
}

function loginHide() {
	jq('#login').fadeOut('fast');
}

/*注册动画*/
function regShow() {
	jq('#register').show().animate({
		bottom: '0'
	}, 200)
}

function regHide() {
	jq('#register').animate({
		bottom: '-4rem'
	}, 200, function() {
		jq('#register').hide();
	});
}

/*侧边栏动画*/
function sideShow() {
	jq('#sideBar').show().animate({
		left: '0'
	}, 200)
}

function sideHide() {
	jq('#sideBar').animate({
		left: '-3.6rem'
	}, 200, function() {
		jq('#sideBar').hide();
	});
}

/*mask动画*/
function maskShow() {
	jq('#mask').fadeIn('fast');
}

function maskHide() {
	jq('#mask').fadeOut('fast');
}
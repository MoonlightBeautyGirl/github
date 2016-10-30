//点赞;
var $foMsg = $('.fo_msg');
for (var j = 0; j < $foMsg.length; j++) {
	jq($foMsg.eq(j).find('i')).on('tap', function() {
		if (isReg()) {
			if (isLogin()) {
				if (jq(this).hasClass('click')) {
					jq(this).removeClass('click');
					var msNum = parseInt(jq(this).siblings('.ms_num').text());
					msNum--;
					jq(this).siblings('.ms_num').text(msNum);
				} else {
					jq(this).addClass('click');
					var msNum = parseInt(jq(this).siblings('.ms_num').text());
					msNum++;
					jq(this).siblings('.ms_num').text(msNum);
				}
			} else {
				maskShow();
				loginShow();
			}
		} else {
			maskShow();
			loginShow();
		}
	})
};
//关注;
var $userCare = $('.username');
for (var j = 0; j < $userCare.length; j++) {
	jq($userCare.eq(j).find('.guanzhu')).on('tap', function() {
		if (isReg()) {
			if (isLogin()) {
				if (jq(this).hasClass('weiguanzhu')) {
					jq(this).removeClass('weiguanzhu');
					jq(this).text('已关注');
				} else {
					jq(this).addClass('weiguanzhu');
					jq(this).text('关注');
				}
			} else {
				loginShow();
				maskShow();
			}
		} else {
			loginShow();
			maskShow();
		}
	})
};
//判断注册；
function isReg() {
	var len = localStorage.length;
	if (len == 0) {
		return false;
	} else {
		return true;
	}
}
//判断当前账号的注册信息
function isNowReg() {
	var $log_tel = $('#logTel').val();
	var len = localStorage.length;
	var cnt = 0;
	for (var i = 0; i < len; i++) {
		var key = localStorage.key(i);
		if ($log_tel == key) {
			cnt++;
		}
	}
	if (cnt == 0) {
		return false;
	} else {
		return true;
	}
}
//判断登录；
function isLogin() {
	var len = localStorage.length;
	var cnt = 0;
	for (var i = 0; i < len; i++) {
		var key = localStorage.key(i);
		if ('login' == key) {
			return true;
		} else {
			cnt++;
		}
		if (cnt == len) {
			return false;
		}
	}
}
//刷新页面判断是否登录；
if (isReg()) {
	if (isLogin()) {
		jq('#myUser').show().siblings().hide();
		var len = localStorage.length;
		for (var j = 0; j < len; j++) {
			var key = localStorage.key(j);
			var loginTel = localStorage.getItem('login');
			if (loginTel == key) {
				var $regInfo = JSON.parse(localStorage.getItem(loginTel));
				var $regName = $regInfo.name;
				jq('#userInfo').show();
				jq('#unLog').hide();
				jq('#userName').html($regName);
				jq('#myName').html($regName);
			}
		}
	}
}

function logOut() {
	var len = localStorage.length;
	for (var j = 0; j < len; j++) {
		var key = localStorage.key(j);
		localStorage.removeItem('login');
	}
}
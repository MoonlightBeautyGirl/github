//注册；

//正则验证;
var $psw = /^\w{6,18}$/;
var $tel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

//验证手机号；
$('#regTel').on('blur', function() {
		if (!($tel.test($(this).val()))) {
			$(this).val('').attr('placeholder', '请输入正确的手机号码').addClass('wrongIpt');
		} else {
			$(this).addClass('rightIpt');
		}
	})
	//验证密码格式;
$('#regPsw').on('blur', function() {
		if (!($psw.test($(this).val()))) {
			$(this).val('').attr('placeholder', '请输入6-18位字母或数字').addClass('wrongIpt');
		} else {
			$(this).addClass('rightIpt');
		}
	})
	//点击确定验证是否非空;
$('#regSub').on('tap', function() {
	//缓存变量；
	var $reg_tel = $('#regTel').val();
	var $reg_psw = $('#regPsw').val();
	var $reg_nam = $('#regName').val();
	if ($reg_tel != '' && $reg_psw != '' && $reg_nam != '') {
		//储存；
		var $userinfo = ({
			psw: $reg_psw,
			name: $reg_nam
		});
		//localStorage.clear();
		localStorage.setItem($reg_tel, JSON.stringify($userinfo));

		// 跳转登录页面
		regHide();
		loginShow();
		$('#logTel').val('').attr('placeholder', '手机号').removeClass('wrongIpt');
		$('#logTel').val('').attr('placeholder', '手机号').removeClass('rightIpt');

	} else {
		alert('请完善信息');
	}
})


//登录;
$('#logSbm').on('tap', function() {
	//缓存变量;
	var $log_tel = $('#logTel').val();
	var $log_psw = $('#logPsw').val();
	if (isNowReg()) {
		var len = localStorage.length;
		var cnt = 0;
		//遍历localstorage;
		for (var i = 0; i < len; i++) {
			var key = localStorage.key(i);
			if ($log_tel == key) {
				var $regInfo = JSON.parse(localStorage.getItem($log_tel));
				var $regPsw = $regInfo.psw;
				var $regName = $regInfo.name;
				if ($log_psw == $regPsw) {
					$('#logTel').addClass('rightIpt');
					$('#logPsw').addClass('rightIpt');
					//调用fadeout函数；
					localStorage.setItem('login', $log_tel);
					loginHide();
					maskHide();
					jq('#userInfo').show();
					jq('#unLog').hide();
					jq('#userName').html($regName);
					jq('#myName').html($regName)
						/*我的页面切换*/
					jq('#myUser').show().siblings().hide();
				} else {
					$('#logTel').val('').attr('placeholder', '用户名或密码有误，请重新输入').addClass('wrongIpt');
					$('#logPsw').val('').addClass('wrongIpt');
				}
			}
		}
	} else {
		$('#logTel').val('').attr('placeholder', '该用户名未注册').addClass('wrongIpt');
		$('#logPsw').val('').attr('placeholder', '密码');
	}
})
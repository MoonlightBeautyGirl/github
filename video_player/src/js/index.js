//点击播放暂停；
var vd = $('#vd').get(0);
var ballW = $('#ball').width();
function play(){
	vd.play();
	$('.mask').addClass('hide');
	$('#play').addClass('hide');
	$('#pause').removeClass('hide');
}
function pause(){
	vd.pause();
	$('.mask').removeClass('hide');
	$('#pause').addClass('hide');
	$('#play').removeClass('hide');
}
$('#play').on('click',function(){
	play();
});
$('#pause').on('click',function(){
	pause();	
});
$('.mask').on('click',function(){
	play();
});
vd.onclick = function(){
	pause();
}
nowTime($('#vd').get(0));

//全屏；
function allScreen(){
	var wid = $('html').width();
	var hei = $('html').height();
	$('#allScreen').addClass('hide');
	$('#smallScreen').removeClass('hide');
	// $('#vd').webkitRequestFullScreen();

	$('.vd-box').css({
		'width':(wid-10) + 'px',
		'height':(hei-10) + 'px',
		'margin':'0 auto'
	})
	$('#vd').css({
		'width':(wid-10)+ 'px',
		'height':(hei-85) + 'px'
	})
	$('.mask').css({
		'width':(wid-10) + 'px',
		'height':(hei-10) + 'px'
	})
}

//取消全屏;
function smallScreen(){
	$('#smallScreen').addClass('hide');
	$('#allScreen').removeClass('hide');
	$('.vd-box').css({
		'width':'760px',
		'height':'505px',
		'margin':'100px auto'
	})
	$('#vd').css({
		'width':'760px',
		'height':'420px'
	})
	$('.mask').css({
		'width':'760px',
		'height':'420px'
	})
}
$('#allScreen').on('click',function(){
	allScreen();
})
$('#smallScreen').on('click',function(){
	smallScreen();
})


//计算总时间;
function allTime(a){
	var allTime = a.duration;
	var aSec = parseInt(allTime%60);
	var aMin = parseInt(allTime/60);
	if(aSec < 10){
		if(aMin < 10){
			$('#allTime').text( '0' + aMin + ':0' + aSec );
		}else{
			$('#allTime').text(aMin + ':0' + aSec);
		}
	}else{
		if(aMin < 10){
			$('#allTime').text('0' + aMin + ':' + aSec);
		}else{
			$('#allTime').text(aMin + ':' + aSec);
		}
	}
}

//当前时间；
function nowTime(b){
	var nowTime = b.currentTime;
	var nSec = parseInt(nowTime%60);
	var nMin = parseInt(nowTime/60);
	if(nSec < 10){
		if(nMin < 10){
			$('#nowTime').text( '0' + nMin + ':0' + nSec );
		}else{
			$('#nowTime').text(nMin + ':0' + nSec );
		}
	}else{
		if(nMin < 10){
			$('#nowTime').text('0' + nMin + ':' + nSec );
		}else{
			$('#nowTime').text(nMin + ':' + nSec );
		}
	}
}

//时间条;
var isDraging = false;
vd.addEventListener('timeupdate',function(s){
	if(isDraging){
		return;
	}
	//总时间；
	allTime(this);
	//当前时间；
	nowTime(this);
	if(vd.currentTime == vd.duration){
		pause();
	}
	//事件进度条及ball的前进位置；
	var left= vd.currentTime/vd.duration*(700-ballW);
	$('#played').css('width',left + 'px');
	$('#ball').css('left', left + 'px');
},false);

//拖动事件；
$('#ball').on('mousedown',function(ev){
	allTime($('#vd').get(0));
	var e = ev.originalEvent;
	var x = e.clientX;
	var ballLeft = ball.offsetLeft;
	isDraging = true;
	$(document).on('mousemove.aaa',function(ev){
		var e = ev.originalEvent;
		var left = e.clientX + ballLeft -x;
		if((left >= 700-ballW )|| left <= 0){
			return;
		}
		$('#played').css('width',left+'px');
		$('#ball').css('left',left + 'px');

		vd.currentTime = left/(700-ballW)*vd.duration;
		nowTime($('#vd').get(0));
		e.preventDefault();
	});
	$(document).on('mouseup.aaa',function(){
		$(document).off('.aaa');
		isDraging = false;
	});
})

//静音和开启音量；
$('#vcOpen').on('click',function(){
	$(this).addClass('hide');
	$('#vcClose').removeClass('hide');
	vd.muted = true;
})
$('#vcClose').on('click',function(){
	$(this).addClass('hide');
	$('#vcOpen').removeClass('hide');
	vd.muted = false;
})

//音量；
var vcLeft = $('#voiceCtl').offset().left;
var vbWid = $('#vcBall').width();
$('#vcBall').on('mousedown',function(ev){
	var e = ev.originalEvent;
	var x = e.clientX;
	var left = $(this).offset().left;
	$(document).on('mousemove.bb',function(ev){
		var e = ev.originalEvent;
		var vbLeft = e.clientX + left - x -vcLeft;
		if(vbLeft >= 100 || vbLeft <= 0){
			return false;
		}
		$('#vcBall').css('left',vbLeft + 'px');
		$('#vcPcs').css('width',(vbLeft +vbWid/2) + 'px');
		vd.volume = (vbLeft/100);
	})
	$(document).on('mouseup.bb',function(){
		$(document).off('.bb');
	})
})
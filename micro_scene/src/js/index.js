swiper();
loading();
playing();
//刮奖效果
var cvW = window.outerWidth;
var cvH = window.outerHeight;
var canvas = document.getElementById('cv');
var context = canvas.getContext('2d');

canvas.setAttribute('width',cvW);
canvas.setAttribute('height',cvH);

context.lineCap = 'round';
context.lineJoin = 'round';
context.lineWidth = 35;
context.beginPath();
var img = new Image();
img.src ="img/a.png";
img.onload = function(){
	context.drawImage(img,0,0,cvW,cvH);
	context.closePath();

	$('canvas').on('touchstart',function(ev){
		var e = ev.touches[0];
		var x = e.clientX;
		var y = e.clientY;
		context.moveTo(x,y);
		$('canvas').on('touchmove',function(ev){
			var e = ev.touches[0];
			var x = e.clientX;
			var y = e.clientY;
			context.lineTo(x,y);
			context.globalCompositeOperation = 'destination-out';
			context.stroke();	
		})
		$('canvas').on('touchend',function(){
			$(this).off("touchend");
			$(this).off("touchmove");
			judge();
		})
	})
}

//判断蒙版是否去掉；
function judge(){
	var data = context.getImageData(0,0,cvW,cvH).data;
	var cnt = 0;
	var len = data.length;
	for (var i = 3; i < len; i+=4){
		if(data[i] == 0){
			cnt++;
		}
	}
	if(cnt/(len/4) >=0.4){
		$('canvas').fadeOut('slow');
		$('.left').addClass('animated').removeClass('left');
		$('.right').addClass('animated').removeClass('right');	
	}
}
//实例化swiper
function swiper(){
	var swiper = new Swiper('.swiper-container',{
		pagination:'.swiper-pagination',
		sliderperview:1,
		paginationClickable:true,
		loop:true,
		direction:'vertical'
	})
}

//音乐播放暂停；
function playing(){
	var ad = document.getElementById('ad');
	var play = document.getElementById('play');
	var isPlaying = true;
	play.ontouchend = function(){
		if(isPlaying){
			ad.pause();	
			isPlaying = false;
			$('#play img').removeClass('rolling')
			return false;
		}else{
			$('#play img').addClass('rolling')
			ad.play();
			isPlaying = true;
		}
	}
}

//图片预加载；
function loading(){
	console.log(1);
	var arr = ['a.png','ad1.png','ad2.png','ad3.png','ad4.png','arr.png','b.png','c.png','c1.png','c2.png','c3.png','c4.png','c5.png','c6.png','d.png','d1.png'];
	var $loading = jq('#loading');
	var iNow = 0;
	for(var i = 0 ;i < arr.length ; i++){
		var oImg = new Image();
		oImg.src ='img'+ arr[i];
		oImg.onload = function(){
			iNow ++;
			if(iNow == arr.length){
				$loading.animate({opacity:0},1000,function(){
					jq(this).hide();
				})
			}
		}
		oImg.onerror = function(){
			$loading.animate({opacity:0},1000,function(){
				jq(this).hide();
			})			
		}
	}
}
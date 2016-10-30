	// jq(window).on("load",function(){
	// 	waterFall();
	// 	jq(window).scroll(function(){
	// 		if ( isLoadImg() ) {
	// 			addBox();
	// 			waterFall();
	// 		}
	// 	})
	// })
	var Num = 1;

 //    //确定是否需要加载图片
    function isLoadImg(father,son){
    	//找到最后一个box
    	var lastBox = jq("#"+father+">"+son).last();
    	var lastBoxTop = lastBox.position().top;
    	var lastBoxHeight = lastBox.outerHeight() /2 ;
    	// console.log(lastBoxHeight);
    	var scrollH = $(window).scrollTop();
    	var windowHeight = jq(window).height() + jq(document).scrollTop();
    	return  (lastBoxTop +1000 - scrollH-lastBoxHeight )*Num < windowHeight ? true : false;
    }


//生成图片；
function addBox(father,figName){
	jq.getJSON('json/image.json',function(data){
		jq.each(data,function(index,items){
			if(items.name == figName){
				jq.each(items.img,function(ix,it){
					var $box = jq(
						'<figure class="fb_l_cont"><div class="cont_img"><img src="img/'+it.url+'" alt=""><figcaption>'+it.discribe+'</figcaption></div></figure>'
						);
					jq('#'+father).append($box);
            	})
            	waterFall('fbLive','fb_l_cont');
            	waterFall('fbLife','fb_l_cont');
            	waterFall('fbGirl','fb_l_cont');
            	isLoadImg('fbLive','figure');
			}
		})	
	})	
}
addBox('fbLive','live');
addBox('fbLife','life');
addBox('fbGirl','girl');

function waterFall(father,son){
	var $figure =jq('#'+father);
	var $fig = jq('#'+father + '>'+son);
	var w = parseInt($fig.eq(0).outerWidth())/Rem;
	var windowCW = parseInt(document.documentElement.clientWidth)/Rem; 	
	var figCW = parseInt(jq('#'+father + '>figure')[0].clientWidth)/Rem;
	var cols = Math.floor(windowCW/figCW);	
	var hArr = new Array();
	$fig.each(function(index,items){
		 var h = parseInt($fig.eq(index).outerHeight())/Rem;
		if(index < cols){
			hArr.push(h);
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = jq.inArray(minH,hArr);
			if(minHIndex == 0){
				$fig.eq(index).css({
					'position':'absolute',
					'top':(minH+0.1*Math.floor(index/2+1))+'rem',
					'left':'0rem'
				})
			}else if(minHIndex == 1){
				$fig.eq(index).css({
					'position':'absolute',
					'top':(minH+0.1*Math.floor(index/2+1))+'rem',
					'left':(w+0.1) + 'rem'
				})
			}	
			$('#content').css('height',(minH)+'rem');
			hArr[minHIndex] += parseInt($fig.eq(index).outerHeight())/Rem;
		}

	})
}
$(window).scroll(function(){
	if(isLoadImg('fbLive','figure')&& Num <=2){
		addBox('fbLive','live');
		addBox('fbLife','life');
		addBox('fbGirl','girl');
		Num++;
		return;
	}else{
		return false;
	}
});

//获取元素；
var box = document.getElementById('box');
var chessBox = box.getElementsByTagName('div');
var start = document.getElementById('startBtn');
var restart = document.getElementById('restartBtn');
var mask = document.getElementById('mask');

//初始化数据；
var isWhite = true;
var isWell = false;

//棋盘信息，0为没有走的，1为白棋走的，2为黑棋走的
var chessData = new Array(15);for (var x = 0; x < 15; x++) {
    chessData[x] = new Array(15);
    for (var y = 0; y < 15; y++) {
        chessData[x][y] = 0;
    }
}

//监听点击事件；
box.addEventListener('click',function(e){
	//点击时获取点击的div位置；
	var x = Math.floor((e.clientX-50)/40);
	var y = Math.floor((e.clientY-50)/40);

	//判断该位置是否已有棋子；
	if(chessData[x][y] != 0){
		alert('不可以在重复位置落子');
		return;
	}
	//判断是否应该落白子；
	if(isWhite){
		isWhite = false;
		//执行落子函数；
		playChess(1,x,y);
	}else{
		isWhite = true;
		playChess(2,x,y);
	}	
})

//落子函数；
function playChess(chess,x,y){
	//判断是否游戏结束；
	if(isWell == true){
		var b = window.confirm('游戏结束，是否重新开始');
		if(b){
			window.location.reload();
		}else{
			return;
		}
		return;
	}
	//在点击的div上设置背景图片；
	if(x >= 0 && x <= 15 && y >=0 && y <= 15){
		var num = y*15 + x;
		if(chess == 1){
			chessBox[num].style.cssText = 'background:url(../img/white.png) no-repeat;background-size:cover;';
			chessData[x][y] = 1;
		}else{
			chessBox[num].style.cssText = 'background:url(../img/black.png) no-repeat;background-size:cover;';
			chessData[x][y] = 2;
		}
		winJudge(x,y,chess);
	}
}

//裁判函数；
function winJudge(x,y,chess){
	var cnt1 = 0;
	var cnt2 = 0;
	var cnt3 = 0;
	var cnt4 = 0;

	//cnt1;左右判断；
	for (var i = x ; i >= 0 ; i--) {
		if(chessData[i][y] != chess){
			break;
		}
		cnt1 ++;
	}
	for (var i = x + 1 ; i < 15 ; i++){
		if(chessData[i][y] != chess){
			break;
		}
		cnt1 ++;

	}
	//cnt2;上下判断；、
	for (var i = y ; i >= 0 ; i--){
		if(chessData[x][i] != chess){
			break;
		}
		cnt2 ++;
	}
	for(var i = y + 1  ; i <= 15 ; i++){
		if(chessData[x][i] != chess){
			break;
		}
		cnt2 ++;
	}
	//cnt3;左上右下判断；
	for(var i = x , j = y ; i >=0 , j >= 0 ; i-- , j--){
		if(chessData[i][j] != chess){
			break;
		}
		cnt3 ++;
	}
	for(var i = x + 1  , j = y + 1  ; i <= 15 , j <= 15 ; i++ , j++){
		if(chessData[i][j] != chess){
			break;
		}
		cnt3 ++;
	}
	//cnt4;左下右上判断；
	 for (var i = x , j = y ; i >= 0 , j < 15 ; i-- , j++) {
        if (chessData[i][j] != chess) {
            break;
        }
        cnt4++;
    }
    for (var i = x + 1 , j = y - 1 ; i < 15 , j >= 0 ; i++ , j--) {
        if (chessData[i][j] != chess) {
            break;
        }
        cnt4++;
    }
	//判断输赢；
	if(cnt1 >= 5 || cnt2 >= 5 || cnt3 >= 5 || cnt4 >= 5){
		if (chess == 1) {
			alert('白棋赢了');
		}else{
			alert('黑棋赢了');
		}
		//判断游戏结束；
		isWell = true;
	}
}

//开始游戏；
start.onclick = function(){
	this.className = 'hide';
	restart.className = '';
	mask.className = 'hide';

}
//重玩；
restart.onclick = function(){
	this.className = 'hide';
	start.className = '';
	mask.className = '';
	window.location.reload();
}
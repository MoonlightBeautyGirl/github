//判断;
	checkHtml5();

	var btn = document.getElementById('startBtn');
	var mask = document.getElementById('mask');
	var chessBoard = document.getElementById('chessBoard');
	var box = document.getElementById('chessbox');
	var chessBox = chessBoard.getElementsByTagName('div');
	var chess = document.getElementById('chess');
	var isWhite = true;
	var isWell = false;

	//开始与重玩；
	var isStart = true;
	btn.onclick = function(){
		if(isStart){
			this.innerText = '重玩';
			mask.className = 'hide';
			chess.className = '';
			isStart = false;
			return;
		}else{
			this.innerText = '开始';
			mask.className = '';
			window.location.reload();
			isStart = true;
			return;
		}	
	}

	//初始化数据数组；0为未下棋；1为白棋；2为黑棋；
	var chessData = new Array(15);
	for(var x = 0; x < 15; x ++){
		chessData[x] = new Array(15);
		for (var y = 0; y < 15 ; y++){
			chessData[x][y] = 0;
		}
	}	

	//判断是否支持canvas；
	var cvs;
	function checkHtml5() {    
		if (typeof(Worker) !== "undefined") {
			return cvs = true;
		}else{
			return cvs = false;
		} 
	}  
	
	if(cvs){
		var isWhite = true;
		var isWell = false;
		var img_w = new Image();
		img_w.src = "img/white.png";
		var img_b = new Image();
		img_b.src = "img/black.png";

		//绘制棋盘；
		var chess = document.getElementById('chess');
		var context = chess.getContext('2d');
		var backimage = new Image();
		backimage.src = 'img/chessboard.png';
		backimage.onload = function(){
			context.drawImage(backimage,10,10,513,513);
		}
	}

	box.onclick =function(event){
		var e = event || window.event;
		var x = Math.floor((e.clientX-45)/36);
		var y = Math.floor((e.clientY-45)/36);

		if (chessData[x][y] != 0) {//判断该位置是否被下过了
			alert("你不能在这个位置下棋");
			return;
		}

		if (isWhite) {
			isWhite = false;
			drawChess(1, x, y);
		}
		else {
			isWhite = true;
			drawChess(2, x, y);
		}
	}
	function drawChess(chess, x, y) {//参数为，棋（1为白棋，2为黑棋），数组位置
		if (isWell == true) {
			var b = window.confirm('游戏结束，是否重新开始');
			if(b){
				window.location.reload();
			}
			return;
		}
		if(x >= 0 && x <= 15 && y >=0 && y <= 15){
		var num = y*15 + x;
		if(chess == 1){
			if(cvs){
				context.drawImage(img_w, x * 36 , y * 36  );//绘制白棋
			}else{
				console.log(chessBox[num]);
				chessBox[num].className = 'chesswhite'
			}
			chessData[x][y] = 1;
		}else{
			if(cvs){
				 context.drawImage(img_b, x * 36 , y * 36  );
			}else{
				chessBox[num].className = 'chessblack';
			}
			
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
	for(var i = y + 1  ; i < 15 ; i++){
		if(chessData[x][i] != chess){
			break;
		}
		cnt2 ++;
	}
	//cnt3;左上右下判断；
	for(var i = x , j = y ; i > 0 , j > 0 ; j-- , i--){
		if(i > 0 && j > 0){
			if(chessData[i][j] == chess){
				break;
			}
			cnt3 ++;
		}
	}
		
	
	for(var i = x + 1  , j = y + 1  ; i < 15 , j < 15 ; i++ , j++){
		if (i < 15 && j < 15) {
			if(chessData[i][j] != chess){
				break;
			}
			cnt3 ++;
		}
		
	}
	//cnt4;左下右上判断；
	 for (var i = x , j = y ; i >= 0 , j <= 15 ; i-- , j++) {
	 	if(i >= 0 && j<= 15){
			if (chessData[i][j] != chess) {
	            break;
	        }
	        cnt4++;
	 	}
    }
    for (var i = x + 1 , j = y + 1 ; i < 15 , j >= 0 ; i++ , j--) {
    	if(i < 15 && j >=0 ){
    		if (chessData[i][j] != chess) {
           		break;
	        }
	        cnt4++;    
    	}
    	
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
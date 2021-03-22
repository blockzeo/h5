	var canvas = $("#main")[0];
	var ctx = canvas.getContext("2d");
	var Wwidth = $(window).width();
	var Wheight = $(window).height()
	canvas.width = Wwidth;
	canvas.height = Wheight;

	var hero = {
		x : (Wwidth/2)-90,
		y : Wheight - 140,
		char:0,
		type:0,
		jumpTime:0
	}
	var mapImage = new Image();
	var mapReady = false;
	mapImage.onload = function(){
		mapReady = true;
		if(mapReady) ctx.drawImage(mapImage,0 ,0 ,30 ,30);
	}
	heroImage.src = "assets/images/map.png";

	var heroImage = new Image();
	var heroReady = false;
	heroImage.onload = function(){
		heroReady = true;
		if(heroReady) ctx.drawImage(heroImage,0 ,0 ,30 ,30);
	}
	heroImage.src = "assets/images/char.png";

	var keysDown = {};
	addEventListener("keydown", function(e){
		keysDown[e.keyCode] = true;
	});
	addEventListener("keyup", function(e){
		delete keysDown[e.keyCode];
	});	

	var a = setInterval(main, 100);


	function update(){
		switch(hero.type){
			case 0:
/*				if(38 in keysDown) {
					if(hero.y >0) move(hero ,0 ,-2)
				}
				if(40 in keysDown) {
					if(hero.y <= 235) move(hero ,0 ,2);
				}
				if(37 in keysDown) {
					if(hero.x >= 0) move(hero ,-2 ,0);
				}
				if(39 in keysDown){
					if(hero.x <= 400 ) move(hero ,2 ,0);
				}*/
				if(32 in keysDown){
					hero.jumpTime = 7;
					hero.type = 1;
				}
				break;
			default:
				jump();
				break;
		}
	}
	function heroAnimate() {
		var num = hero.char;
		if(num < 2){
			num++;
		} else {
			num=0
		}
		hero.char = num;
	}
	function move(id ,x ,y){
		if(x){
			id.x = id.x + x;
		}
		if(y){
			id.y = id.y + y;
		}
	}
	function jump(){
		if(hero.type == 1){
			hero.jumpTime -- ;
			move(hero ,0 ,-4);
			if(hero.jumpTime<=0){
				hero.type = 2;
				hero.jumpTime = 7;
			}
		}
		if(hero.type == 2){
			hero.jumpTime -- 
			move(hero ,0 ,4);
			if(hero.jumpTime<=0){ 
				hero.type = 0;
			}
		}
	}
	function main(){
		update();
		ctx.clearRect(0,0,Wwidth,Wheight);
		heroAnimate();
		ctx.drawImage(heroImage,(180 * hero.char) ,0 ,180 ,140 ,hero.x ,hero.y ,180 ,140);
	}
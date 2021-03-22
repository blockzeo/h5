 function bganimate(src, id ,times ,speed){
   var index = 0;
   var nimg = new Image();
   let ww;
   let interval;
   let type = "play";
   $(id).css("background-image" , "url(" +  src + ")");


    var interFunction = function(){
      $(id).css("background-position-x", "-" + index* (ww/times) + "px")
      index++;
      if(index === times) index = 0;
    };
    function setImg(){
      nimg.src = src;
      nimg.onload = function () {
        w = nimg.width;
        h = nimg.height;
        ww = w*($(id).height()/h);
        // $("#main").css("background-position-x", "-" + 9* (a/30) + "px")
        interval = setInterval(interFunction,speed);
      }    
    }
    this.stop = function(){
      clearInterval(interval);
      type = "stop";
    };
    this.play = function(){
      if(type === "stop"){
        interval = setInterval(interFunction,speed);
      }
    };
    this.data = function(){
      var data = {};
      data.id = id;
      data.times = times;
      data.speed = speed;
      return data;
    }
  }

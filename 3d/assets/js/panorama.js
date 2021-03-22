function panorama(option){
      var rotateX = [0 ,90 ,180 ,270, 0 ,0];
      var rotateY = [0 ,0 ,0 ,0, 90 ,270];
      var screen = [0,0];
      var id = option.id;
      var src = option.src;
      var width = option.width;
      var height = option.height;
      var perspective = option.perspective;
      var mousedown = false;
      var speed = option.speed;

      var $pic = $("<div>").addClass("panorama-div")
      var $picU = $("<div>").addClass("panorama-img").append($("<img>").attr("src", src.up));
      var $picD = $("<div>").addClass("panorama-img").append($("<img>").attr("src", src.down));
      var $picF = $("<div>").addClass("panorama-img").append($("<img>").attr("src", src.front));
      var $picB = $("<div>").addClass("panorama-img").append($("<img>").attr("src", src.back));
      var $picL = $("<div>").addClass("panorama-img").append($("<img>").attr("src", src.left));
      var $picR = $("<div>").addClass("panorama-img").append($("<img>").attr("src", src.right));
      $pic.append($picU, $picD, $picL, $picR, $picF, $picB);
      $picF.css("transform", "rotateX(0deg) rotateY(0deg) translateZ(" + perspective + ")")
      $picB.css("transform", "rotateX(0deg) rotateY(180deg) translateZ(" + perspective + ")")
      $picL.css("transform", "rotateX(0deg) rotateY(90deg) translateZ(" + perspective + ")")
      $picR.css("transform", "rotateX(0deg) rotateY(270deg) translateZ(" + perspective + ")")
      $picU.css("transform", "rotateX(90deg) rotateZ(0deg)  translateZ(" + perspective + ")")
      $picD.css("transform", "rotateX(270deg) rotateZ(0deg)  translateZ(" + perspective + ")")
      $(id)
      var $panorama = $("<div>").css({
        width: width,
        height: height,
        perspective: perspective
      }).addClass("panorama-perspective").append($pic);
      var $desktop = $("<div>").addClass("panorama-desktop");
      $(id).addClass("panorama-main").append($desktop, $panorama);
      $(id + "  .panorama-img img").css({
        "width" : width,
        "height" : height
      });
      var touch = false;
      document.addEventListener('touchstart', function(e){
        screen[0] = e.x;
        screen[1] = e.y;
        touch = true;
        $("#text").text("start");
      })
      document.addEventListener('touchmove', function(e){
        if(touch) touchMove(e);
        $("#text").text("move");
      });
      document.addEventListener('touchend', function(e){
        touch = false;
        $("#text").text("end");
      });
      function touchMove(e){
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        var rX = (screen[0] - x) * 0.1;
        var rY = (screen[1] - y) * 0.1;
        screen[0] = x;
        screen[1] = y;
        rotate(rX, rY);
      }
      document.addEventListener('mousedown', function(e){
        screen[0] = e.x;
        screen[1] = e.y;
        touch = true;
        $("#text").text("start");
      })
      document.addEventListener('mousemove', function(e){
        if(touch) mouseMove(e);
        $("#text").text("move");
      });
      document.addEventListener('mouseup', function(e){
        touch = false;
        $("#text").text("end");
      });
      function mouseMove(e){
        console.log(screen)
        var x = e.x;
        var y = e.y;
        var rX = (screen[0] - x) * parseInt(speed);
        var rY = (screen[1] - y) * parseInt(speed);
        screen[0] = x;
        screen[1] = y;
        rotate(rX, rY);
      }
      function rotate(x ,y){
        rotateCal(x ,true)
        if(y>0 && rotateY[1] >= -45){
          rotateCal(y ,false)
        }
        if(y<0 && rotateY[1] <= 45) {
          rotateCal(y ,false);
        }
      }
      var interval = setInterval(picRotate, 10);
      function rotateCal(r , type){
        if(!r) return;
        if(type){
          rotateX[0] = rotateX[0]+r;
          rotateX[1] = rotateX[1]+r;
          rotateX[2] = rotateX[2]+r;
          rotateX[3] = rotateX[3]+r;
          rotateX[4] = rotateX[4]+r;
          rotateX[5] = rotateX[5]+r;
        } else {
          rotateY[0] = rotateY[0]-r;
          rotateY[1] = rotateY[1]-r;
          rotateY[2] = rotateY[2]-r;
          rotateY[3] = rotateY[3]-r;
          rotateY[4] = rotateY[4]-r;
          rotateY[5] = rotateY[5]-r;
        }
      }
      function picRotate(){
        $picF.css("transform", "rotateX(" + rotateY[0] + "deg)  rotateY(" + rotateX[0] + "deg) translateZ(" + perspective + ")");
        $picL.css("transform", "rotateX(" + rotateY[1] + "deg) rotateY(" + rotateX[1] + "deg) translateZ(" + perspective + ")")
        $picB.css("transform", "rotateX(" + rotateY[2] + "deg) rotateY(" + rotateX[2] + "deg) translateZ(" + perspective + ")")
        $picR.css("transform", "rotateX(" + rotateY[3] + "deg) rotateY(" + rotateX[3] + "deg) translateZ(" + perspective + ")")
        $picU.css("transform", "rotateX(" + rotateY[4] + "deg) translateZ(" + perspective + ") rotateZ(" + (-1 * rotateX[4]) + "deg )")
        $picD.css("transform", "rotateX(" + rotateY[5] + "deg) translateZ(" + perspective + ") rotateZ(" + rotateX[5] + "deg )")
      }
      this.showRotate = function(){
        return rotateX;
      }
    }
///////////////////////////////////
//// MODULE SCOPE METHOD//
///////////////////////////////////

var Ball = function(settings) {
    // Settings
    var ballElement = null;

    var verticalDirection = 'down';
    var horizontalDirection = 'down';
    var velocity = 3;


    var Ball = function(x, y, radius) {

        this.x = x;
        this.y = y;

        this.px = x;
        this.py = y;

        this.fx = 0;
        this.fy = 0;

        this.radius = radius;
    };

    this,getBall = function(){
       return ballElement;
    }

    this.drawBall=function(mouse){
       ballElement = document.getElementById('ball');
       x = ballElement.left;
       y= ballElement.top;
       wall.apply(ballElement);
    };

    this.showCoord = function(){
       return{
          x : x + radius,
          y : y + radius,
          radius : radius
       };
    };
    ////////////////////////////////
  /// VERLET PHYSICS     ///////
  ///////////////////////////////

    Ball.prototype.verlet = function() {

      var nx = (this.x * 2) - this.px;
      var ny = (this.y * 2) - this.py;

      this.px = this.x;
      this.py = this.y;

      this.x = nx;
      this.y = ny;
    };

    Ball.prototype.applyForce = function(force){
      force *= force;
      this.fy += settings.gravity;

      this.x += this.fx * force;
      this.y += this.fy * force;

    }

    function wall() {

      var x_right = parseInt(ballElement.style.left)  + parseInt(ballElement.style.width);
      var x_left = parseInt(ballElement.style.left);
      var y_top = parseInt(ballElement.style.top);
      var y_bottom = parseInt(ballElement.style.top) + parseInt(ballElement.style.height);
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);
      var ballRect = ballElement.getBoundingClientRect();
      // Collision detection for ballElement and Window
      if(ballRect.bottom > h){
         ballElement.style.top = (h-ballRect.height) + 'px';
      }

      if(ballRect.top <0){
        ballElement.style.top = '0px';
      }
      if(ballRect.left<0){
        ballElement.style.left = '0px';
      }
      if(ballRect.right>w){
        ballElement.style.left = (w-ballRect.width) + 'px';
      }
    }

    function dropBall(){
      if(ballElement > '1px'){
        ballElement.style.top = parseInt(ballElement.style.top)+ settings.gravity + "px";
      }
    }


    function ballClick(interactions){
     


      console.log(interactions.target.id);

      if(interactions.target.id == 'green' ){
        verticalDirection = "down";
      }
      if(interactions.target.id == 'yellow'){
        verticalDirection = "up";
      }

      if(interactions.target.id == 'red'){
        horizontalDirection = "left";
      }

      if(interactions.target.id == 'blue'){
        horizontalDirection = "right";
      }

      velocity += 40;
    }

    function moveBall(){
      var ballRect = ballElement.getBoundingClientRect();
      // var w = parseInt(window.innerWidth);
      // var h = parseInt(window.innerHeight);

      var arenaElement = document.getElementById('arena');
      var arenaRect = arenaElement.getBoundingClientRect();
      var w = arenaRect.width;
      var h = arenaRect.height;
      var ball = document.getElementById('arena')
      var gameOver = function(){
            ball.innerHTML = "<h1>Game Over</h1>";
            console.log("Game Over");
            setTimeout(function(){location.reload()}, 2000)
         }
      // Apply gravity
    //  ballElement.style.top = ballRect.top + settings.gravity + 'px';

      // Bottom
      if((ballRect.top + ballRect.height) > h ){
        ballElement.style.top = h-ballRect.height + 'px'
        verticalDirection = "up";
        ballRect = ballElement.getBoundingClientRect();

 
         gameOver();
      }

      // Top
      if(ballRect.top < 0 ){
        ballElement.style.top = '0px'
        verticalDirection = "down";
        ballRect = ballElement.getBoundingClientRect();
      }

      // Left
      if(ballRect.left < 0 ){
        ballElement.style.left = '0px';
        horizontalDirection = 'right';
        ballRect = ballElement.getBoundingClientRect();
      }

      // Right
      if(ballRect.left + ballRect.width > w ){
        ballElement.style.left = w - ballRect.width + 'px';
        horizontalDirection = 'left';
        ballRect = ballElement.getBoundingClientRect();
      }

      if (verticalDirection == 'up'){
         velocity -= settings.gravity;
         if(velocity < 0){
           velocity = 0;
         }
      }

      if(verticalDirection == 'down' && velocity < settings.gravity){
        velocity = settings.gravity;
      }

      if (horizontalDirection == 'right' && velocity > 0){
        ballElement.style.left = ballRect.left + velocity + 'px';
        ballRect = ballElement.getBoundingClientRect();
      }

      if (horizontalDirection == 'left' && velocity > 0){
        ballElement.style.left = ballRect.left - velocity + 'px';
        ballRect = ballElement.getBoundingClientRect();
      }

      if (verticalDirection == 'up'){
        ballElement.style.top = ballRect.top - velocity + 'px';
        ballRect = ballElement.getBoundingClientRect();
      }

      if (verticalDirection == 'down'){
        ballElement.style.top = ballRect.top + velocity + 'px';
          ballRect = ballElement.getBoundingClientRect();
      }
    }



  //   function clickBall(interactions,settings){
  //      var w = parseInt(window.innerWidth);
  //      var h = parseInt(window.innerHeight);
  //      var ballRect = ballElement.getBoundingClientRect();
  //      var ball_mid_x = ballRect.left + ballRect.width/2;//Ball Middle Coordiantes
  //      var ball_mid_y = ballRect.top + ballRect.height/2;//Ball Middle Coordiantes
  //      var distancex = interactions.mouseX - ball_mid_x;
  //      var distancey = interactions.mouseY - ball_mid_y;
  //      var distance = Math.sqrt((distancex * distancex) + (distancey * distancey)); //Calculate Distance

  //      if(distancex == 0) { // Avoid division by zero
  //         settings.velocityX-= settings.punch;
  //         return;
  //      }
  //      if(distancey < 0){ //mirror both side of the ball
  //        distancey = -distancey;
  //      }
  //      var radius = distance/2;
  //      var newX; // calculate new X to move either left or right

  //      if(distancex>0) { //RIGHT SIDE CONTACT ON BALL
  //         theta = Math.atan(distancey/distancex);
  //         newX =  settings.punch * parseFloat(Math.cos(theta));
  //      } else {
  //         distancex = -distancex //LEFT SIDE CONTACT ON BALL
  //         theta = Math.atan(distancey/distancex);
  //         newX = settings.punch * parseFloat(Math.cos(theta));
  //      }
  //      // Change the velocity of ball. SET NEW VELOCITY TO X AND Y
  //       settings.velocityX -= newX;
  //       settings.velocityY -= settings.punch;
  //       // console.log("x",interactions.mouseX);
  //       // console.log("dX",distancex);
  //       // console.log("y",interactions.mouseY);
  //       // console.log("dY",distancey);

  //       ////////////////////////////////////
  //       // WHEN BALL HIT WALL DAMPEN SPEED//
  //       ////////////////////////////////////
  //      //  if(ballRect.top < 0){ // check whether top
  //      //    ballRect.top = 0;
  //      //    settings.velocityY = - settings.velocityY //bounce off walll
  //      //    if(Math.abs(settings.velocityY)>settings.punch){
  //      //      settings.velocityX += settings.punch / 3; //slow down speed when wall is hit
  //      //    }
  //      //  }
  //      //  else if (ballRect.top >= h - ballRect){ //when ball hit bottom / game over
  //      //      this.gameOver(); //How to link to gameOver function...
  //      //  }
  //      //  if(ballRect.left >= w - ballRect){ //check whether right
  //      //    ballRect.left = w - ballRect;
  //      //    settings.velocityX = -settings.velocityX;
  //      //    if(Math.abs(settings.velocityX) > settings.punch){
  //      //        settings.velocityX += settings.punch / 3;   ///Slow Down Ball Speed when Ball hit on the wall [RIGHT SIDE]
  //      //        settings.points += 2;//ADD POINTS WHEN BALL HIT WALL
  //      //     }
  //      //  }
  //      // else if (ballRect.left < 0){ // check whether ball left
  //      //     ballrect.left = 0;
  //      //     settings.velocityX = -settings.velocityX;
  //      //     if(Math.abs(settings.velocityX) > settings.punch){
  //      //        settings.velocityX -= settings.punch / 3; // Slow Down Ball Speed when Ball hit on the wall [LEFT SIDE]
  //      //         settings.points += 2; // ADD POINTS WHEN BALL HIT WALL
  //      //     }
  //      // }
  //      //   ////////////////////////////////////////////////
  //      //  // LIMIT MAX VELOCITY- So Velocity dont go crazy///
  //      //  //////////////////////////////////////////////////
  //      //  if(settings.velocityX > 10){
  //      //     settings.velocityX =10;
  //      //  }
  //      //  if(settings.velocityY > 10){
  //      //     settings.velocityY = 10;
  //      //  }

  //       ////////////////////////////////
  //       /// MOVING BALL BY MOUSE CLICK///
  //       ///////////////////////////////
  //      // if(distancex>interactions.mouseX + parseInt(ballElement.style.left) && distancey<interactions.mouseY - parseInt(ballElement.style.top)){
  //      //  //////// Dampen Ball Speed when Ball hit the wall/////////
  //      //    ballElement.style.top = parseInt(ballElement.style.top)- settings.velocityY +"px";
  //      //    ballElement.style.left = parseInt(ballElement.style.left) - settings.velocityX + "px";
  //      // }

  //      // if(distancex<interactions.mouseX - parseInt(ballElement.style.left) && distancey<interactions.mouseY + parseInt(ballElement.style.top)){
  //      //    ballElement.style.top = parseInt(ballElement.style.top)+ settings.velocityY +"px";
  //      //    ballElement.style.left = parseInt(ballElement.style.left) + settings.velocityX + "px";
  //      // }

  //      // if(distancex>interactions.mouseX + parseInt(ballElement.style.top)&& distancey<interactions.mouseY- parseInt(ballElement.style.top)){
  //      //    ballElement.style.top = parseInt(ballElement.style.top)- settings.velocityY +"px";
  //      //    ballElement.style.left = parseInt(ballElement.style.left) - settings.velocityX + "px";
  //      // }

  //      // if(distancex<interactions.mouseX - parseInt(ballElement.style.top)&& distancey>interactions.mouseY- parseInt(ballElement.style.top)){
  //      //    ballElement.style.top = parseInt(ballElement.style.top) - settings.velocityY +"px";
  //      //    ballElement.style.left = parseInt(ballElement.style.left) + settings.velocityX + "px";
  //      // }
  // }




    ///////////////////////////////////////
    /// ACCUMULATE POINTS /////////////////
    ////////////////////////////////////////



    this.scorePoints=function(interactions){
      //this.points = 0;
      //settings.points=points;
       var temp = document.getElementsByClassName('score')[0];
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);
      if(ballElement.style.bottom< 0.1 ){// Test ball is  near the bottom of map
         settings.points += 1;
         temp.innerHTML = "Score: " + settings.points;
      }
      if(ballElement.style.bottom< 0.2 * h){  // Test ball is  near the bottom of map
        settings.points += 3;
        temp.innerHTML = "Score: " + settings.points;
      }
      if(settings.velocityY> 3){ // Test ball is high in the map
        settings.points += 5;
        temp.innerHTML = "Score: " + settings.points;
      }
      if(settings.velocity> 5){
        settings.points +=10;
        temp.innerHTML = "Score: " + settings.points;
      }

      //settings.points =points;
      //return points;

    }


    ///////////////////////////////////////
    /// GAME OVER//////// /////////////////
    ///////////////////////////////////////
     





     ///////////////////////////////////////
    /// MOVING BALL BY ARROWKEY FOR DEBUG ///
    ////////////////////////////////////////


    function move(interactions){

     

      if(interactions.click){
        interactions.click = false;
        ballClick(interactions);
    
      }
      moveBall();
     

     }



    ///////////////////////////////////////
    /// INIT BALL  ///;//////////////////////
    ////////////////////////////////////////

    function init(){
      // create();
      ballElement = document.getElementById('ball');
      ballElement.classList.add("sect");
       ballElement.style.top = '10px';
      ballElement.style.left = '500px';



    }

    this.render = function(interactions){
      move(interactions);
    }

    init();
}

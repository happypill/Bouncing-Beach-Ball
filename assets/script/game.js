  /*PSEUDO CODE
1.) Create Viewport
   1.1 Reponsive
2.) Create Ball
   2.1 Ball Detection  ( on click )
   2.2  Ball Detection ( quandrants)
   2,3 Ball Launch (launch)
6.) Collision Detection

*/
////MODULE SCOPE///

var Game = function() {
    // Game settings
    var settings = {};                     // Containes all game settings               // force of the ball with each click
    settings.walls = true;                 // The ball can not go outside the screen           // The ball will move by itself              // Debug mode
    settings.dropball = true;
    settings.gravity = 10;
    settings.velocityX = 0;
    settings.velocityY = 0;
    settings.distance = 0;
    settings.points=0;
    settings.gameover = false;
   


    //y = sin (d)  * v
    //x = cos (d) * v;

    // World settings
    var assets = [];                      // All game objects
    ballElement = document.getElementById('ball');
    var checkgameOver = false;
    var player = new Ball(settings);      // The player
    assets[0] = player;
    var frame = 0;                        // Frames since the start of the game

    // Interactions
    // up ,down ,ledft,right are for debug purposes
    var interactions = {};
    interactions.up = false;              // Up arrow key pressed
    interactions.down = false;            // Down arrow key pressed
    interactions.left = false;            // Left arrow key pressed
    interactions.right = false;           // Right arrow ket pressed
    interactions.space = false;           // Speace key pressed
    interactions.click = false;
    interactions.mouseX = false;
    interactions.mouseY = false;

    // Setup event listeners for debugged , will be remove during Alpha
    function setupEvents() {
      document.addEventListener('keyup', function(event){
        var keyName = event.key;

        switch(keyName) {
          case "ArrowRight":
              interactions.right = false;
              break;
          case "ArrowLeft":
              interactions.left = false;
              break;
          case "ArrowUp":
              interactions.up = false;
              break;
          case "ArrowDown":
              interactions.down = false;
              break;
          default:
              break;
        }
      });
        // Setup event listeners for debugged , will be remove during Alpha
      document.addEventListener('keydown', function(event){
        var keyName = event.key;

        switch(keyName) {
          case "ArrowRight":
              interactions.right = true;
              break;
          case "ArrowLeft":
              interactions.left = true;
              break;
          case "ArrowUp":
              interactions.up = true;
              break;
          case "ArrowDown":
              interactions.down = true;
              break;
          default:
              break;
        }
      });

      ballElement.addEventListener('mousedown',function(event){
         if(event.which === 1){ //IF LEFT CLICK
               interactions.click =true;
               interactions.mouseX = event.clientX;
               interactions.mouseY = event.clientY;
               player.scorePoints();
               interactions.target = event.target;
               console.log(event.target); 
              
               //console.log('interaction',interactions.mouseY,interactions.mouseX);
               //console.log('target',ballElement.style.top);
               //console.log('target',ballElement.style.left);
               settings.dropball = false;

               //console.log('distance :' , settings.distance);
            } else {
              console.log("false")
            }

         setTimeout(function(){settings.dropball = true;interactions.click =false;}, 300)
      });


    }
      function collisionDectectionBorder(){


      }




    ///////////////////////////////////////
    /// GAME OVER//////// /////////////////
    ///////////////////////////////////////

      function gameOver(){
        var temp = document.getElementById('ball');
        player.gameOver();
        temp.innerHTML = "Game Over: " + settings.gameover;


      }









    // Startup the game
    function init(){
      setupEvents();
      //startScreen();
      

    }

    // The render function. It will be called 60/sec

     this.render = function(){ // Change to this.render
      for(var i=0; i < assets.length; i++){
        assets[i].render(interactions);
      }
    
      frame++;
    }

    var self = this;
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
            })();


            (function animloop(){
              requestAnimFrame(animloop);
              self.render();
              //frame++;
            })();

            init();
}

var g = new Game();

//////////////GLOBAL VARIABLES
var leftPressed = false;
var upPressed = false;
var rightPressed = false;
var downPressed = false;
var aPressed = false;
var sPressed = false;
var dPressed = false;
var wPressed = false;
var wallArray = [];
var leftWall = new Wall(0,0,505,0);
var rightWall = new Wall(500,-5,505,5);
var topWall = new Wall(0,0,0,505);
var bottomWall = new Wall(500,-5,5,505);
wallArray.push(leftWall,rightWall,topWall,bottomWall);
var level1 = new Level(1);
var roomArray = [];

///////////PLAYER OBJECT
function Player() {
  this.xPos=0,
  this.yPos=0,
  this.height=50,
  this.width=50,
  this.dx=0,
  this.dy=0,
  this.moveSpeed=5,
  this.items='',
  this.roomLocation = 0;
}
Player.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.xPos,this.yPos,this.width,this.height);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}
Player.prototype.move = function() {
  console.log('here')
  if(rightPressed) {
    this.xPos += this.moveSpeed;
    if (wallCollision(this,level1.levelRoomArray[this.roomLocation].roomWallArray) || edgeCollision(this,wallArray)) {
      this.xPos -= this.moveSpeed;
    }
  };
  if(leftPressed) {
    this.xPos -= this.moveSpeed;
    if (wallCollision(this,level1.levelRoomArray[this.roomLocation].roomWallArray) || edgeCollision(this,wallArray)) {
      this.xPos += this.moveSpeed;
    }
  }
  if(upPressed) {
    this.yPos -= this.moveSpeed;
    if (wallCollision(this,level1.levelRoomArray[this.roomLocation].roomWallArray) || edgeCollision(this,wallArray)) {
      this.yPos += this.moveSpeed;
    }
  }
  if(downPressed) {
    this.yPos += this.moveSpeed;
    if (wallCollision(this,level1.levelRoomArray[this.roomLocation].roomWallArray) || edgeCollision(this,wallArray)) {
      this.yPos -= this.moveSpeed;
    }
  }
}


///////////WALL OBJECT
function Wall(xPos,yPos,height,width) {
  this.xPos=xPos,
  this.yPos=yPos,
  this.height=height,
  this.width=width
}
Wall.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.xPos,this.yPos,this.width,this.height);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}
function randomWall() {
  var newWall = new Wall(randomNumberGrid(2,8),randomNumberGrid(2,8),50,50)
  return newWall;
}
function wallArrayDraw(ctx) {
  for (var i=0;i<wallArray.length;i++) {
    wallArray[i].draw(ctx);
  }
}

///////////ROOM OBJECT
function Room() {
  this.roomWallArray = [],
  this.items = '',
  this.walls = ''
}
Room.prototype.fill = function(walls) {
  for (var i=0;i<walls;i++) {
    this.roomWallArray.push(randomWall());
  }
}
Room.prototype.draw = function(ctx) {
  for (var i=0;i<this.roomWallArray.length;i++){
    ctx.beginPath();
    ctx.rect(this.roomWallArray[i].xPos,this.roomWallArray[i].yPos,this.roomWallArray[i].width,this.roomWallArray[i].height);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
}

//////////LEVEL OBJECT
function Level(difficulty) {
 this.difficulty = difficulty,
 this.levelRoomArray = []
}
Level.prototype.newLevel = function(){
  for (var i=0;i<9;i++) {
    this.levelRoomArray[i] = new Room();
    this.levelRoomArray[i].fill(2);
  }
}


////////////ITEM OBJECT
function Item(xPos,yPos,height,width,type) {}

///////////COLLISION DETECTION
function xCollision(object,obstacle) {
  if ((object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width)) {
    return 'x';
    console.log('here')

  }
}
function yCollision(object,obstacle) {
  if ((object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height)) {
    return 'y';
    console.log('here')

  }
}
function wallCollision(object,obstacleArray) {
  for (var i=0;i<obstacleArray.length;i++) {
    if(xCollision(object,obstacleArray[i])) {
      return 'x'
    };
    if(yCollision(object,obstacleArray[i])) {
      return 'y'
    };
  }
}

function xEdgeCollision(object,obstacle) {
  if ((object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width)) {
    return 'x';
    console.log('here')

  }
}
function yEdgeCollision(object,obstacle) {
  if ((object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height)) {
    return 'y';
    console.log('here')

  }
}
function edgeCollision(object,obstacleArray) {
  for (var i=0;i<obstacleArray.length;i++) {
    if(xEdgeCollision(object,obstacleArray[i])) {
      return 'x'
    };
    if(yEdgeCollision(object,obstacleArray[i])) {
      return 'y'
    };
  }
}


///////////RANDOM NUMBERS
function randomNumber(min,max) {
  return Math.floor(Math.random()*(max-min)+min);
};
function randomNumberGrid(min,max) {
  return randomNumber(min,max)*50;
}


/////////////DOCUMENT READY
$(function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var player = new Player;
  level1.newLevel();



  //////////////CONTROLLER
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  function keyDownHandler(e) {
    if(e.keyCode === 39) {
      rightPressed = true;
    } else if (e.keyCode === 40) {
      downPressed = true;
    } else if(e.keyCode === 37) {
      leftPressed = true;
    } else if(e.keyCode === 38) {
      upPressed = true;
    }
  }
  function keyUpHandler(e) {
    if(e.keyCode === 39) {
      rightPressed = false;
    } else if (e.keyCode === 40) {
      downPressed = false;
    } else if(e.keyCode === 37) {
      leftPressed = false;
    } else if(e.keyCode === 38) {
      upPressed = false;
    }
  }


  ///////////////DRAW FUNCTION
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.move();
    player.draw(ctx);
    wallArrayDraw(ctx);
    level1.levelRoomArray[player.roomLocation].draw(ctx);
  }
  drawInterval = setInterval(draw, 10);
})

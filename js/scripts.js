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
var rightWall = new Wall(500,0,505,0);
var topWall = new Wall(0,0,0,505);
var bottomWall = new Wall(0,500,0,505);
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
  this.health = 100;
}
Player.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.xPos,this.yPos,this.width,this.height);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}
Player.prototype.move = function() {
  if(rightPressed) {
    this.xPos += this.moveSpeed;
    if (hardCollision(this,level1.levelRoomArray[this.roomLocation].roomWallArray) || edgeCollision(this,wallArray)) {
      this.xPos -= this.moveSpeed;
    }
    if (softCollision(this,level1.levelRoomArray[this.roomLocation].roomItemArray)) {

      level1.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[0]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[0])) {
      console.log('here')
      this.roomLocation += 3;
      if (this.roomLocation > 8) {
        this.roomLocation = 8;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[1]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[1])) {
      this.roomLocation -= 3;
      if (this.roomLocation < 0) {
        this.roomLocation = 0;
      }
      if (this.roomLocation < 0) {
        this.roomLocation = 0;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[2]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[2])) {
      this.roomLocation -= 1;
      if (this.roomLocation < 0) {
        this.roomLocation = 0;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[3]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[3])) {
      this.roomLocation += 1;
      if (this.roomLocation > 8) {
        this.roomLocation = 8;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
  };
  if(leftPressed) {
    this.xPos -= this.moveSpeed;
    if (hardCollision(this,level1.levelRoomArray[this.roomLocation].roomWallArray) || edgeCollision(this,wallArray)) {
      this.xPos += this.moveSpeed;
    }
    if (softCollision(this,level1.levelRoomArray[this.roomLocation].roomItemArray)) {

      level1.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[0]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[0])) {
      this.roomLocation += 3;
      if (this.roomLocation > 8) {
        this.roomLocation = 8;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[1]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[1])) {
      this.roomLocation -= 3;
      if (this.roomLocation < 0) {
        this.roomLocation = 0;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[2]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[2])) {
      this.roomLocation -= 1;
      if (this.roomLocation < 0) {
        this.roomLocation = 0;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[3]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[3])) {
      this.roomLocation += 1;
      if (this.roomLocation > 8) {
        this.roomLocation = 8;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
  }
  if(upPressed) {
    this.yPos -= this.moveSpeed;
    if (hardCollision(this,level1.levelRoomArray[this.roomLocation].roomWallArray) || edgeCollision(this,wallArray)) {
      this.yPos += this.moveSpeed;
    }
    if (softCollision(this,level1.levelRoomArray[this.roomLocation].roomItemArray)) {

      level1.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[0]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[0])) {
      this.roomLocation += 3;
      if (this.roomLocation > 8) {
        this.roomLocation = 8;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[1]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[1])) {
      this.roomLocation -= 3;
      if (this.roomLocation < 0) {
        this.roomLocation = 0;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[2]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[2])) {
      this.roomLocation -= 1;
      if (this.roomLocation < 0) {
        this.roomLocation = 0;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[3]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[3])) {
      this.roomLocation += 1;
      if (this.roomLocation > 8) {
        this.roomLocation = 8;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
  }
  if(downPressed) {
    this.yPos += this.moveSpeed;
    if (hardCollision(this,level1.levelRoomArray[this.roomLocation].roomWallArray) || edgeCollision(this,wallArray)) {
      this.yPos -= this.moveSpeed;
    }
    if (softCollision(this,level1.levelRoomArray[this.roomLocation].roomItemArray)) {

      level1.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[0]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[0])) {
      this.roomLocation += 3;
      if (this.roomLocation > 8) {
        this.roomLocation = 8;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[1]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[1])) {
      this.roomLocation -= 3;
      if (this.roomLocation < 0) {
        this.roomLocation = 0;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[2]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[2])) {
      this.roomLocation -= 1;
      if (this.roomLocation < 0) {
        this.roomLocation = 0;
      }
      this.xPos = 0;
      this.ypos = 0;
    }
    if (xSoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[3]) || ySoftCollision(this,level1.levelRoomArray[this.roomLocation].roomDoorArray[3])) {
      this.roomLocation += 1;
      if (this.roomLocation > 8) {
        this.roomLocation = 8;
      }
      this.xPos = 0;
      this.ypos = 0;
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

////////////ITEM OBJECT
function Item(xPos,yPos,height,width,type) {
  this.xPos=xPos,
  this.yPos=yPos,
  this.height=height,
  this.width=width,
  this.type=type
}
Item.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.xPos,this.yPos,this.width,this.height);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

///////////ROOM OBJECT
function Room() {
  this.roomWallArray = [],
  this.roomItemArray = [],
  this.roomDoorArray = [],
  this.items = '',
  this.walls = ''
}
Room.prototype.fill = function(walls) {
  for (var i=0;i<walls;i++) {
    this.roomWallArray.push(randomWall());
  }
  this.roomItemArray.push(new Item (100,100,50,50,'health'));
  this.roomDoorArray.push(new Door (200,0,50,50,'top'));
  this.roomDoorArray.push(new Door (200,450,50,50,'bottom'));
  this.roomDoorArray.push(new Door (0,200,50,50,'left'));
  this.roomDoorArray.push(new Door (450,200,50,50,'right'));
}
Room.prototype.draw = function(ctx) {
  for (var i=0;i<this.roomWallArray.length;i++){
    ctx.beginPath();
    ctx.rect(this.roomWallArray[i].xPos,this.roomWallArray[i].yPos,this.roomWallArray[i].width,this.roomWallArray[i].height);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
  for (var i=0;i<this.roomItemArray.length;i++){
    this.roomItemArray[i].draw(ctx);
  }
  for (var i=0;i<this.roomDoorArray.length;i++){
    this.roomDoorArray[i].draw(ctx);
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

//////////DOOR OBJECT
function Door(xPos,yPos,height,width,location) {
  this.xPos=xPos,
  this.yPos=yPos,
  this.height=height,
  this.width=width,
  this.location=location
}
Door.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.xPos,this.yPos,this.width,this.height);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

///////////COLLISION DETECTION
function xCollision(object,obstacle) {
  if ((object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width) && (object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height)) {
    return 'x';

  }
}
function yCollision(object,obstacle) {
  if ((object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height)&&(object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width)) {
    return 'y';

  }
}
function hardCollision(object,obstacleArray) {
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
  if ((object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width) && (object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height)) {
    return 'x';

  }
}
function yEdgeCollision(object,obstacle) {
  if ((object.yPos + object.height + 5 > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height) && (object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width)) {
    return 'y';

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

function xSoftCollision(object,obstacle) {
  if ((object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width) && (object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height)) {
    return 'x';

  }
}
function ySoftCollision(object,obstacle) {
  if ((object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height)&&(object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width)) {
    return 'y';

  }
}

function softCollision(object,itemArray) {
  for (var i=0;i<itemArray.length;i++) {
    if(xSoftCollision(object,itemArray[i])) {
      return 'x'
    };
    if(ySoftCollision(object,itemArray[i])) {
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

//////////////GLOBAL VARIABLES
var leftPressed = false;
var upPressed = false;
var rightPressed = false;
var downPressed = false;
var spacePressed = false;
var wallArray = [];
var leftWall = new Wall(0,0,505,0);
var rightWall = new Wall(500,0,505,0);
var topWall = new Wall(0,0,0,505);
var bottomWall = new Wall(0,500,0,505);
wallArray.push(leftWall,rightWall,topWall,bottomWall);
var roomArray = [];
var minimap = new Minimap();
var game;

//////////GAME OBJECT
function Game() {
  this.player = new Player;
  this.player.weapon = new Weapon(this.player);
  this.level = new Level(1);
  this.enemy = new Enemy;
}
Game.prototype.nextLevel = function(player){
  this.level = new Level(1);
  this.level.newLevel();
  this.player.itemArray = [];
}
Game.prototype.newEnemy =  function() {
  if (this.enemy.itemArray.length > 0) {
    for (var i=0; i < this.enemy.itemArray.length; i++) {
      this.level.levelRoomArray[this.player.roomLocation].roomItemArray = this.level.levelRoomArray[this.player.roomLocation].roomItemArray.concat(new Item(this.enemy.xPos+(5*i), this.enemy.yPos+(5*i), 25, 25));
    }
  }
  this.enemy = new Enemy
}

Game.prototype.newPlayer = function() {
  this.player = new Player;
}


///////////PLAYER OBJECT
function Player() {
  this.xPos=0,
  this.yPos=0,
  this.height=50,
  this.width=50,
  this.dx=0,
  this.dy=0,
  this.moveSpeed=5,
  this.itemArray=[],
  this.roomLocation = 0,
  this.health = 100,
  this.level = 1,
  this.weapon
}
Player.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.xPos,this.yPos,this.width,this.height);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}
Player.prototype.move = function(level,game) {
  if(rightPressed) {
    this.xPos += this.moveSpeed;
    if (hardCollision(this,level.levelRoomArray[this.roomLocation].roomWallArray) === 'xy' || edgeCollision(this,wallArray) === 'xy' || spacePressed) {
      console.log(level.levelRoomArray[this.roomLocation].roomWallArray)
      this.xPos -= this.moveSpeed;
    }
    if (softCollision(this,level.levelRoomArray[this.roomLocation].roomItemArray)) {
      if (level.levelRoomArray[this.roomLocation].roomItemArray.length < 9) {
        game.newPlayer();
      } else {
        for (var i=0;i<9;i++) {
          this.itemArray.push('item')
          level.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
        }
      }
    }
    doorCollision(this,level,game);
  }

  if(leftPressed) {
    this.xPos -= this.moveSpeed;
    if (hardCollision(this,level.levelRoomArray[this.roomLocation].roomWallArray) === 'xy' || edgeCollision(this,wallArray) === 'xy' || spacePressed) {
      this.xPos += this.moveSpeed;
    }
    if (softCollision(this,level.levelRoomArray[this.roomLocation].roomItemArray)) {
      if (level.levelRoomArray[this.roomLocation].roomItemArray.length < 9) {
        game.newPlayer();
      } else {
        for (var i=0;i<9;i++) {
          this.itemArray.push('item')
          level.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
        }
      }
    }

    doorCollision(this,level,game);
  }
  if(upPressed) {
    this.yPos -= this.moveSpeed;
    if (hardCollision(this,level.levelRoomArray[this.roomLocation].roomWallArray) === 'xy' || edgeCollision(this,wallArray) === 'xy' || spacePressed) {
      this.yPos += this.moveSpeed;
    }
    if (softCollision(this,level.levelRoomArray[this.roomLocation].roomItemArray)) {
      if (level.levelRoomArray[this.roomLocation].roomItemArray.length < 9) {
        game.newPlayer();
      } else {
        for (var i=0;i<9;i++) {
          this.itemArray.push('item')
          level.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
        }
      }
    }

    doorCollision(this,level,game);
  }
  if(downPressed) {
    this.yPos += this.moveSpeed;
    if (hardCollision(this,level.levelRoomArray[this.roomLocation].roomWallArray) === 'xy' || edgeCollision(this,wallArray) === 'xy' || spacePressed) {
      this.yPos -= this.moveSpeed;
    }
    if (softCollision(this,level.levelRoomArray[this.roomLocation].roomItemArray)) {
      if (level.levelRoomArray[this.roomLocation].roomItemArray.length < 9) {
        game.newPlayer();
      } else {
        for (var i=0;i<9;i++) {
          this.itemArray.push('item')
          level.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
        }
      }
    }

    doorCollision(this,level,game);
  }
}
Player.prototype.swing = function(ctx,game) {
  if (spacePressed) {
    this.weapon = new Weapon(this);
    this.weapon.draw(ctx);
    console.log(this.weapon)
    console.log(game.enemy)
    if (xSoftCollision(this.weapon, game.enemy) === 'x') {
      game.newEnemy();
    };
  }
}


////////WEAPON OBJECT
function Weapon(player) {
  this.damage = 0,
  this.height = 150,
  this.width = 150,
  this.xPos = player.xPos - 50,
  this.yPos = player.yPos - 50
}
Weapon.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.xPos,this.yPos,this.width,this.height);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}
////////////ENEMY OBJECT
function Enemy() {
  this.xPos=450,
  this.yPos=450,
  this.height=50,
  this.width=50,
  this.dx=0,
  this.dy=0,
  this.moveSpeed=5,
  this.itemArray=[],
  this.roomLocation = 0,
  this.health = 100,
  this.level = 1
}

  Enemy.prototype.draw = function(ctx,player) {
    if (this.roomLocation === player.roomLocation) {
      ctx.beginPath();
      ctx.rect(this.xPos,this.yPos,this.width,this.height);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.closePath();
    }
  }




// Enemy.protoype.think = function() {
//
// }

  Enemy.prototype.move = function(level,game) {
    if(rightPressed) {
      this.xPos += this.moveSpeed;
      if (edgeCollision(this,wallArray)) {
        this.xPos -= this.moveSpeed;
      }
      if (hardCollision(this,level.levelRoomArray[this.roomLocation].roomWallArray)) {
        game.newEnemy();
      }
      if (softCollision(this,level.levelRoomArray[this.roomLocation].roomItemArray)) {
        this.itemArray.push('item')
        level.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
      }
      doorCollision(this,level,game);
    };
    if(leftPressed) {
      this.xPos -= this.moveSpeed;
      if (edgeCollision(this,wallArray)) {
        this.xPos += this.moveSpeed;
      }
      if (hardCollision(this,level.levelRoomArray[this.roomLocation].roomWallArray)) {
        game.newEnemy();
      }
      if (softCollision(this,level.levelRoomArray[this.roomLocation].roomItemArray)) {
        this.itemArray.push('item')
        level.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
      }
      doorCollision(this,level,game);
    }
    if(upPressed) {
      this.yPos -= this.moveSpeed;
      if (edgeCollision(this,wallArray)) {
        this.yPos += this.moveSpeed;
      }
      if (hardCollision(this,level.levelRoomArray[this.roomLocation].roomWallArray)) {
        game.newEnemy();
      }
      if (softCollision(this,level.levelRoomArray[this.roomLocation].roomItemArray)) {
        this.itemArray.push('item')
        level.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
      }
      doorCollision(this,level,game);
    }
    if(downPressed) {
      this.yPos += this.moveSpeed;
      if (edgeCollision(this,wallArray)) {
        this.yPos -= this.moveSpeed;
      }
      if (hardCollision(this,level.levelRoomArray[this.roomLocation].roomWallArray)) {
        game.newEnemy();
      }
      if (softCollision(this,level.levelRoomArray[this.roomLocation].roomItemArray)) {
        this.itemArray.push('item')
        level.levelRoomArray[this.roomLocation].roomItemArray.splice(0,1);
      }
      doorCollision(this,level,game);
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
function randomWall(walls) {
  var seed = [5,5]
  var newWalls = [];
  for (var i=0;i<walls;i++) {
    var newWall = new Wall(randomNumberGrid(seed[0]-i/2,seed[1]+i/2),randomNumberGrid(seed[0]-(i/2),seed[1]+i/2),50,50)
    newWalls.push(newWall);
  }
  return newWalls;
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
function randomItem(room) {
  var newItem = new Item(randomNumberGrid(1,9),randomNumberGrid(1,9),50,50)
  while (hardCollision(newItem,room.roomWallArray)) {
    newItem = new Item(randomNumberGrid(1,9),randomNumberGrid(1,9),50,50)
  }
  return newItem;
}

////////////BALL OBJECT
// function Ball(xPos,yPos,width,height, dx, dy) {
//   this.xPos = xPos;
//   this.yPos = yPos;
//   this.width = width;
//   this.height = height;
//   this.dx = dx;
//   this.dy = dy;
// }
// Ball.prototype.draw = function(canvasContext) {
//   canvasContext.beginPath();
//   canvasContext.rect(this.xPos, this.yPos, this.width, this.height);
//   canvasContext.fillStyle = 'red'
//   canvasContext.fill();
//   canvasContext.closePath();
// }
// function randomBall() {
//   var dx = 3;
//   var dy = 3;
//   var randomBallX = randomNumberGrid(1,9);
//   var randomBallY = randomNumberGrid(1,9);
//   return new Ball(randomBallX, randomBallY, 40, 40, dx, dy);
// }



///////////ROOM OBJECT
function Room() {
  this.roomWallArray = [],
  this.roomItemArray = [],
  this.roomDoorArray = [],
  this.roomBallArray = [],
  this.items = '',
  this.walls = ''
}
Room.prototype.fill = function(walls,balls) {
  this.roomWallArray = (randomWall(walls));
  this.roomItemArray.push(randomItem(this));
  this.roomDoorArray.push(new Door (225,-40,50,50,'top'));
  this.roomDoorArray.push(new Door (225,490,50,50,'bottom'));
  this.roomDoorArray.push(new Door (-40,225,50,50,'left'));
  this.roomDoorArray.push(new Door (490,225,50,10,'right'));
  this.roomDoorArray.push(new Door (450,0,50,50,'levelstairs'));
  // for (var i=0;i<balls;i++) {
  //   this.roomBallArray.push(randomBall());
  // }
}
Room.prototype.draw = function(ctx,player) {
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
  for (var i=0;i<this.roomBallArray.length;i++){
    this.roomBallArray[i].draw(ctx);
  }
  if (player.roomLocation < 6) {
    this.roomDoorArray[0].draw(ctx);
  } else {
    this.roomDoorArray[0] = 0;
  }
  if (player.roomLocation%3 < 2) {
    this.roomDoorArray[3].draw(ctx);
  } else {
    this.roomDoorArray[3] = 0;
  }
  if (player.roomLocation > 2) {
    this.roomDoorArray[1].draw(ctx);
  } else {
    this.roomDoorArray[1] = 0;
  }
  if (player.roomLocation%3 > 0) {
    this.roomDoorArray[2].draw(ctx);
  } else {
    this.roomDoorArray[2] = 0;
  }
  if (player.roomLocation === 4 && player.itemArray.length > 8) {
    this.roomDoorArray[4].draw(ctx);
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
    this.levelRoomArray[i].fill(5,2);
  }
}

//////////MINIMAP OBJECT
function Minimap() {
  this.mapRoomArray = []
}
Minimap.prototype.draw = function(ctx,room) {
  ctx.rect(500,0,100,100);
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(500+((room%3)*33),66-(Math.floor(room/3)*33),33,33);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
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
function doorCollision(player,level,game) {
  if (xSoftCollision(player,level.levelRoomArray[player.roomLocation].roomDoorArray[0])) {
    player.roomLocation += 3;
    if (player.roomLocation > 8) {
      player.roomLocation = 8;
    }
    player.xPos = 225;
    player.yPos = 440;
  }
  if (xSoftCollision(player,level.levelRoomArray[player.roomLocation].roomDoorArray[1])) {
    player.roomLocation -= 3;
    if (player.roomLocation < 0) {
      player.roomLocation = 0;
    }
    player.xPos = 225;
    player.yPos = 10;
  }
  if (xSoftCollision(player,level.levelRoomArray[player.roomLocation].roomDoorArray[2])) {
    player.roomLocation -= 1;
    if (player.roomLocation < 0) {
      player.roomLocation = 0;
    }
    player.xPos = 440;
    player.yPos = 225;
  }
  if (xSoftCollision(player,level.levelRoomArray[player.roomLocation].roomDoorArray[3])) {
    player.roomLocation += 1;
    if (player.roomLocation > 8) {
      player.roomLocation = 8;
    }
    player.xPos = 10;
    player.yPos = 225;
  }
  if (xSoftCollision(player,level.levelRoomArray[player.roomLocation].roomDoorArray[4])) {
    if (player.roomLocation === 4 && player.itemArray.length > 7) {
      player.level += 1;
      player.xPos = 0;
      player.yPos = 0;
      game.nextLevel();

    }
  }
}

///////////COLLISION DETECTION
function xCollision(object,obstacle) {
  if ((object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width)) {
    return 'x';
  }
}
function yCollision(object,obstacle) {
  if ((object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height)) {
    return 'y';
  }
}
function hardCollision(object,obstacleArray) {
  for (var i=0;i<obstacleArray.length;i++) {
    var xCollider = xCollision(object,obstacleArray[i])
    var yCollider = yCollision(object,obstacleArray[i])
    if(xCollider+yCollider === 'xy') {
      return 'xy'
    }
  }
}

function xEdgeCollision(object,obstacle) {
  if ((object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width) && (object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height)) {
    return 'x';
    console.log('x')
  }
}
function yEdgeCollision(object,obstacle) {
  if ((object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height) && (object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width)) {
    return 'y';
    console.log('y')
  }
}
function edgeCollision(object,obstacleArray) {
  for (var i=0;i<obstacleArray.length;i++) {
    if(xEdgeCollision(object,obstacleArray[i])) {
      return 'xy'
    };
    if(yEdgeCollision(object,obstacleArray[i])) {
      return 'xy'
    };
  }
}

function xSoftCollision(object,obstacle) {
  if ((object.xPos + object.width > obstacle.xPos) && (object.xPos < obstacle.xPos + obstacle.width) && (object.yPos + object.height > obstacle.yPos) && (object.yPos < obstacle.yPos + obstacle.height)) {
    return 'x';

  }
}

function softCollision(object,itemArray) {
  for (var i=0;i<itemArray.length;i++) {
    if(xSoftCollision(object,itemArray[i])) {
      return 'x'
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

  var game = new Game();
  game.level.newLevel();


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
    } else if(e.keyCode === 32) {
      spacePressed = true;
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
    } else if(e.keyCode === 32) {
      spacePressed = false;
    }
  }


  ///////////////DRAW FUNCTION
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    game.player.move(game.level,game);
    game.enemy.move(game.level,game);
    game.player.swing(ctx,game);
    game.enemy.draw(ctx,game.player);
    game.player.draw(ctx);
    wallArrayDraw(ctx);
    game.level.levelRoomArray[game.player.roomLocation].draw(ctx,game.player);
    minimap.draw(ctx,game.player.roomLocation);
  }
  drawInterval = setInterval(draw, 10);
})

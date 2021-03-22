const Engine = Matter.Engine ;
const World = Matter.World ;
const Body = Matter.Body ;
const Bodies = Matter.Bodies;

var engine, world, body;
var board, die;
var bluePawn;
var blueMoved, blueSpaces;

function preload() {
 board = loadImage("sprites/background.png")
}

function setup() {
  createCanvas(725, 600);

  engine = Engine.create();
  world = engine.world;

  engine.world.gravity.y = 0;

  bluePawn = new BluePawn(28,570,50,50)
  blueSpaces = 1;
  blueMoved = false;

  die = [false,1,0,false,0]
// 0 = if die is rolling or not
// 1 = current no. displayed
// 2 = times to die
// 3 = blinking time or not
// 4 = blinking counter
}

function draw() {
  background("white");

  Engine.update(engine)

  image(board,0,0,600,600)

  bluePawn.display();

  stroke("black")
  strokeWeight(1)
  fill("black")
  text(mouseX + "," + mouseY, mouseX, mouseY)

  stroke("black")
  strokeWeight(5)
  fill("black")
  line(0,600,600,600)
  line(600,700,600,1)

  // Draw a die or blink it or move it
  if(die[3] === false){
    drawDie(660,320,die[1]);
  }
  else{
    if (die[4] % 2 === 0){
      drawDie(660,320,die[1])
      if(blueMoved === false && blueSpaces !== 100){
        if(blueSpaces % 10 === 0){
          bluePawn.moveUp();
        }
        else{
          var num = Math.floor(blueSpaces/10)
          if(num === 0 || num === 2 || num === 4 || num === 6 || num === 8){
            bluePawn.moveRight();
          }
          else{
            bluePawn.moveLeft();
          }
        }
        blueMoved = true;
        blueSpaces ++;
      }
    }
    if(frameCount % 15 === 0){
      die[4]--;
      blueMoved = false;
      if(die[4] === 0){
        die[3] = false;
        die[0] = false;
        checkForBlueUpsAndDowns();
      }
    }
  }

  // Make the die roll

  if(die[0] === true && die[2] > 0 && frameCount % 5 === 0){
    die[2]--;
    die[1]++;
    if(die[1] > 6){
      die[1] = 1;
    }
    if(die[2] === 0){
      die[3] = true;
      die[4] = die[1]*2;
    }
  }

}

function keyPressed(){
  if(keyCode === 32 && die[0] === false){
    die[0] = true;
    die[2] = round(random(12,18));
  }
}

function checkForBlueUpsAndDowns(){

  // Ladders

  if(blueSpaces === 2){
    Matter.Body.setVelocity(bluePawn.body,{x : 7, y : -13})
    blueSpaces = 23;
  }
  if(blueSpaces === 6){
    Matter.Body.setVelocity(bluePawn.body,{x : -6, y : -26})
    blueSpaces = 45;
  }
  if(blueSpaces === 20){
    Matter.Body.setVelocity(bluePawn.body,{x : 7, y : -26})
    blueSpaces = 59;
  }
  if(blueSpaces === 28){
    Matter.Body.setVelocity(bluePawn.body,{x : 7, y : -13})
    blueSpaces = 49;
  }
  if(blueSpaces === 52){
    Matter.Body.setVelocity(bluePawn.body,{x : 0, y : -13})
    blueSpaces = 72;
  }
  if(blueSpaces === 57){
    Matter.Body.setVelocity(bluePawn.body,{x : 7, y : -26})
    blueSpaces = 96;
  }
  if(blueSpaces === 71){
    Matter.Body.setVelocity(bluePawn.body,{x : -7, y : -13})
    blueSpaces = 92;
  }

  // Snakes

  if(blueSpaces === 98){
    Matter.Body.setVelocity(bluePawn.body,{x : -14, y : 39})
    blueSpaces = 40;
  }
  if(blueSpaces === 87){
    Matter.Body.setVelocity(bluePawn.body,{x : 12, y : 26})
    blueSpaces = 49;
  }
  if(blueSpaces === 84){
    Matter.Body.setVelocity(bluePawn.body,{x : -7, y : 13})
    blueSpaces = 63;
  }
  if(blueSpaces === 73){
    Matter.Body.setVelocity(bluePawn.body,{x : -13, y : 38})
    blueSpaces = 15;
  }
  if(blueSpaces === 56){
    Matter.Body.setVelocity(bluePawn.body,{x : 20, y : 33})
    blueSpaces = 8;
  }
  if(blueSpaces === 50){
    Matter.Body.setVelocity(bluePawn.body,{x : -32, y : 26})
    blueSpaces = 5;
  }
  if(blueSpaces === 43){
    Matter.Body.setVelocity(bluePawn.body,{x : 7, y : 20})
    blueSpaces = 17;
  }

}

function drawDie(x,y,side){

  stroke("black")
  strokeWeight(2)
  fill("white")
  rectMode(CENTER)
  rect(660,320, 100, 100, 20);

  fill("black")

  if(side === 1){
    circle(x,y,20)
  }
  else if(side === 2){
    circle(x-25,y-25,20)
    circle(x+25,y+25,20)
  }
  else if(side === 3){
    circle(x-27,y-27,20)
    circle(x,y,20)
    circle(x+27,y+27,20)
  } 
  else if(side === 4){
    circle(x-25,y-25,20)
    circle(x+25,y+25,20)
    circle(x+25,y-25,20)
    circle(x-25,y+25,20)
  }
  else if(side === 5){
    circle(x,y,20)
    circle(x-25,y-25,20)
    circle(x+25,y+25,20)
    circle(x+25,y-25,20)
    circle(x-25,y+25,20)
  }
  else if(side === 6){
    circle(x-25,y-30,20)
    circle(x+25,y+30,20)
    circle(x+25,y-30,20)
    circle(x-25,y+30,20)
    circle(x-25,y,20)
    circle(x+25,y,20)
  }

  stroke("black")
  strokeWeight(1)
  fill("skyblue")
  text(mouseX + "," + mouseY, mouseX, mouseY)

}

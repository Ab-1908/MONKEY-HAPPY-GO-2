//Global Variables
var jungle , jungleImage;
var invisibleground;
var monkey , monkey_running;
var PLAY = 1;
var END = 0;
var GameState = PLAY;
var banana, bananaImage;
var stone , stoneImage;
var score;

function preload(){
  
  jungleImage = loadImage("jungle.jpg")
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");

}


function setup() {
  createCanvas(400,400);
  
   jungle = createSprite(200,180,400,20);
   jungle.addImage("jungle",jungleImage);
   round.x = jungle.width /2;
  
   invisibleGround = createSprite(200,375,400,10);
   invisibleGround.visible = false;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  bananaGroup = new Group();
  stoneGroup = new Group();

  stroke("white");
  textSize (20);
  fill("white")
  
   score = 0;
  
}

function draw(){
 background(220); 

  
  if (GameState === PLAY){
    
    jungle.velocityX = -4;
    
    score = score + Math.round(getFrameRate()/60);
    
    switch(score){
      case 10: monkey.scale = 0.12;
        break;
      case 100: monkey.scale = 0.14;
        break;
      case 200: monkey.scale = 0.16;
        break ;
      case 300: monkey.scale = 0.17;
        break;
        default: break ;
    }
    
    if(keyDown("space") && monkey.y >= 114) {
    monkey.velocityY = -10;
    } 
    
    monkey.velocityY = monkey.velocityY + 0.8;
    

    if (jungle.x < 0){
    jungle.x = jungle.width/2;
  
    }
    
   if(stoneGroup.isTouching(monkey)){
     GameState = END;
    }
           
    if(bananaGroup.isTouching(monkey)){
       bananaGroup.destroyEach();
      
       }
    
    spawnbanana();
    spawnstone();
    
  }
  
  else if(GameState === END){
    
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
    
  }
  
   monkey.collide(invisibleGround);
  
  drawSprites();
  
   text("Score: "+ score, 280,50)
  
 }
  
function spawnbanana() {
  
   if (frameCount % 80 === 0) {
    var banana = createSprite(400, 150,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
     
    banana.lifetime = 50;
     
    bananaGroup.add(banana);
  
   }
}


function spawnstone() {
  
   if (frameCount % 300 === 0) {
    var stone = createSprite(400,340,20,20);
    stone.addImage(stoneImage);
    stone.scale = 0.2;
    stone.velocityX = -4;
     
    stone.lifetime = 100;
     
    stoneGroup.add(stone);
  
  
   }
}

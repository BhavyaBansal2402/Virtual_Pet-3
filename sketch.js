//initialising the variables
var dog, dog1;
var dogImg, dogImg1;
var foodS;
var milkImg;
var foodStock;
var database;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/milk.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  
  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodS = createSprite(211,280,10,10);
  foodS.addImage(milkImg);
  foodS.scale = 0.025;
  foodS.visible = false;

}


function draw() {
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
    foodS.visible = true;
  }

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}


function writeStock(x){

  if(x<=0)
  {
    x=0;
  }
  else
  {
    x=x-1;
  }

  database.ref('/').update({
    Food : x
  })
}
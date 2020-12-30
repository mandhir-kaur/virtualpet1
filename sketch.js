var dog,dogImg,happyDog,foodS,foodStock,database;
var feed ,addFood;
var fedTime ,lastFed;
var foodObj;

function preload(){
dogImg=loadImage("images/dog.png");
happyDogImg=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(1000,500);
  database=firebase.database();
    dog = createSprite(250,350,10,60);
    dog.addImage(dogImg);
    dog.scale=0.15;
    database=firebase.database();
    foodStock = database.ref("food");
    foodStock.on("value", readStock);
    foodStock.set(20);
    foodObj=new foodS();
feed =createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);
addFood =createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);
}


function draw() {  
background("green");
if (foodS!==undefined){
textSize(15);
fill(255,255,254);
if(lastFed>=12){
text("Last Feed:"+lastFed%12+"PM",350,30);
}
else if(lastFed==0){
  text("Last Feed:12 AM",350,30);
}
else{
  text("Last Feed:12 AM",350,30)
}
  drawSprites();
  
}
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
  })
}

function addFoods(){
 foodS++;
 database.ref('/').update({
   Food:foodS
 })
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
foodS=data.val();
}



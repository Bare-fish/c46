var bg,bgImg;
var obsTop1, obsTop2, obsTop;
var obsBottom1, obsBottom2, obsBottom3, obsBottom;
var topGround;
var bottomGround;
var topObsGroup;
var bottomObsGroup;
var balloon, balloonImg;
var gameState = "play";
var gameOver, gameOverImg;
var restart, restartImg;
var bar, barGroup;
var score = 0;
var jumpSound, dieSound;

function preload(){
    bgImg = loadImage("assets/bg.png");
    balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");
    obsTop1 = loadImage("assets/obsTop1.png");
    obsTop2 = loadImage("assets/obsTop2.png");
    obsBottom1 = loadImage("assets/obsBottom1.png");
    obsBottom2 = loadImage("assets/obsBottom2.png");
    obsBottom3 = loadImage("assets/obsBottom3.png");
    restartImg = loadImage("assets/restart.png");
    gameOverImg = loadImage("assets/gameOver.png");
    jumpSound = loadSound("assets/jump.mp3");
    dieSound = loadSound("assets/die.mp3");
}

function setup() {
    createCanvas(600,400);

    bg = createSprite(165,365,1,1);
    bg.addImage(bgImg);

    balloon = createSprite(100,200,20,50);
    balloon.addAnimation("baloon",balloonImg);
    balloon.scale = 0.2;

    bottomGround = createSprite(200,390,800,20);
    bottomGround.visible = false;

    topGround = createSprite(200,10,800,20);
    topGround.visible = false;

    topObsGroup = new Group();
    bottomObsGroup = new Group();
    barGroup = new Group();

    gameOver = createSprite(300,170);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;

    restart = createSprite(300,240);
    restart.addImage(restartImg);
    restart.visible = false;
}

function draw() {
    background("black");

    if(gameState === "play"){

    

    if(keyDown("space")){
        balloon.velocityY = -6;
        jumpSound.play();
    }
    balloon.velocityY += 1;

    Bar();

    if(topObsGroup.isTouching(balloon) || bottomObsGroup.isTouching(balloon) || 
    balloon.isTouching(topGround) || balloon.isTouching(bottomGround)){
        gameState = "end";
        dieSound.play();
    }
    spawnObsTop();
    spawnObsBottom();
}

    if(gameState === "end"){
        gameOver.visible = true;
        restart.visible = true;
        balloon.velocityX = 0;
        balloon.velocityY = 0; 
        barGroup.setVelocityXEach(0);
        topObsGroup.setVelocityXEach(0);
        bottomObsGroup.setVelocityXEach(0);
        topObsGroup.setLifetimeEach(-1);
        bottomObsGroup.setLifetimeEach(-1);
        if(mousePressedOver(restart)){
            reset();
        }
    }
    drawSprites();
    Score();
}

function reset(){
    gameState = "play";
    gameOver.visible = false;
    restart.visible = false;
    topObsGroup.destroyEach();
    bottomObsGroup.destroyEach();
    balloon.y = 200;
    score = 0;
}

function spawnObsTop() {
    if(World.frameCount % 60 === 0){
        obsTop = createSprite(600,50,20,20);
        obsTop.scale = 0.07;
        obsTop.velocityX = -3;

        obsTop.y = random(10,100);

        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obsTop.addImage(obsTop1);
            break;
            case 2: obsTop.addImage(obsTop2);
            break;

            default: break;
        }
        obsTop.lifetime = 210;
        topObsGroup.add(obsTop);
    }
}

function spawnObsBottom() {
    if(World.frameCount % 100 === 0){
        obsBottom = createSprite(600,350,20,20);
        obsBottom.scale = 0.07;
        obsBottom.velocityX = -3;

        var rand = Math.round(random(1,3));
        switch(rand){
            case 1: obsBottom.addImage(obsBottom1);
            break;
            case 2: obsBottom.addImage(obsBottom2);
            break;
            case 3: obsBottom.addImage(obsBottom3);
            break;

            default: break;
        }
        obsBottom.lifetime = 210;
        bottomObsGroup.add(obsBottom);
    }
}

function Bar(){
    if(World.frameCount % 70 === 0){
        bar = createSprite(600,200,10,800);
        bar.velocityX = -3;
        bar.lifetime = 200;
        barGroup.add(bar);
        bar.visible = false;
    }
}

function Score(){
    if(balloon.isTouching(barGroup)){
        score += 1;
    }
    textSize(24);
    fill("black");
    text("score: " + score, 400,70);
}
class Sprite {
    constructor(img, posX, posY, dimX, dimY, velX, velY) {
        this.model = {
            dim : { x : dimX, y : dimY },
            pos : { x : posX, y : posY },
            vel : { x : velX, y : velY }
        };
        this.view = {
            img : img,
            dim : { x : undefined, y : undefined },
            pos : { x : undefined, y : undefined }
        }
    }
    draw(){
        con.drawImage(this.view.img, this.view.pos.x, this.view.pos.y, this.view.dim.x, this.view.dim.y);
    }
    resize(){
        this.view.dim.x  = this.model.dim.x * bcr.width;
        this.view.dim.y  = this.model.dim.y * bcr.height;
        this.view.pos.x  = this.model.pos.x * bcr.width;
        this.view.pos.y  = this.model.pos.y * bcr.height;
    }
    update(){   
        this.model.pos.x += this.model.vel.x;
        this.model.pos.y += this.model.vel.y;
        this.view.pos.x = this.model.pos.x * bcr.width;
        this.view.pos.y = this.model.pos.y * bcr.height
    }
    collide(){

    }
}
class Sprite_Player extends Sprite {
    constructor(img, posX, posY, dimX, dimY, velX, velY){
        super(img, posX, posY, dimX, dimY, velX, velY);
    }
    update(){
        super.update();
        if (this.model.pos.x < 0){
            this.model.pos.x = 0;
            this.view.pos.x = 0;
            alert("You win");
        }
        if(this.model.pos.x > 1 - this.model.dim.x){
            this.model.pos.x = 1 - this.model.dim.x;
            this.view.pos.x = this.model.pos.x * bcr.width;
        }
        if (this.model.pos.y < 0){
            this.model.pos.y = 0;
            this.view.pos.y = 0;
        }
        if (this.model.pos.y > 1 - this.model.dim.y){
            this.model.pos.y = 1 - this.model.dim.y;
            this.view.pos.y = this.model.pos.y * bcr.height;
        }
    }
    collide(){}
}
class Sprite_Auto extends Sprite {
    constructor(img, posX, posY, dimX, dimY, velX, velY){
        super(img, posX, posY, dimX, dimY, velX, velY);
    }
    update(){
        super.update();
        if (this.model.pos.y <  - this.model.dim.y){
            this.model.pos.y = 1;
            this.view.pos.y = bcr.height;
        }
        if (this.model.pos.y > 1 + this.model.dim.y){
            this.model.pos.y = 0;
            this.view.pos.y = 0;
        }
    }
    collide(){}
    //to do
}
class Sprite_BG extends Sprite {
    constructor(img, posX, posY, dimX, dimY, velX, velY) {
        super(img, posX, posY, dimX, dimY, velX, velY);
    }
    collide() {}
}

class Sprite_Bounce extends Sprite {
    constructor(img, posX, posY, dimX, dimY, velX, velY) {
        super(img, posX, posY, dimX, dimY, velX, velY);
    }
    update() {
        if (this.collide()) {
            return;
        }
        super.update();
    }
    collide() {
        return (
            (this.model.pos.x < player.model.pos.x + player.model.dim.x) && 
            (this.model.pos.x + this.model.dim.x > player.model.pos.x) &&
            (this.model.pos.y < player.model.pos.y + player.model.dim.y) && 
            (this.model.pos.y + this.model.dim.y > player.model.pos.y)
         );
    }
}

var sprites = [
        //                               img    posX   posY dimX  dimY velX velY
    new Sprite_BG(document.getElementById("road"), 0.005, 0,   0.21, 1,   0,   0),
    new Sprite_BG(document.getElementById("road"), 0.33,  0,    0.21, 1,   0,   0),
    new Sprite_BG(document.getElementById("road"), 0.67,  0,    0.21, 1,   0,   0),
   

    new Sprite_Player(document.getElementById("player"), 0.869, 0.65, 0.05, 0.1, 0, 0),


    new Sprite_BG(document.getElementById("wolf"), 0.8, 0.2, 0.3, 0.4, 0, 0),


    new Sprite_Auto(document.getElementById("tractor"), 0.055, 0.0, 0.12, 0.12, 0, -0.004),
    new Sprite_Auto(document.getElementById("tractor"), 0.055, 0.3, 0.12, 0.12, 0, -0.004),
    new Sprite_Auto(document.getElementById("tractor"), 0.055, 0.6, 0.12, 0.12, 0, -0.004),
    new Sprite_Auto(document.getElementById("tractor"), 0.055, 0.9, 0.12, 0.12, 0, -0.004),

    new Sprite_Auto(document.getElementById("tractor"), 0.38, 0.2, 0.12, 0.12, 0, 0.005),
    new Sprite_Auto(document.getElementById("tractor"), 0.38, 0.5, 0.12, 0.12, 0, 0.005),
    new Sprite_Auto(document.getElementById("tractor"), 0.38, 0.8, 0.12, 0.12, 0, 0.005),
    new Sprite_Auto(document.getElementById("tractor"), 0.38, 1.1, 0.12, 0.12, 0, 0.005),

    new Sprite_Auto(document.getElementById("tractor"), 0.72, 0.1, 0.12, 0.12, 0, -0.006),
    new Sprite_Auto(document.getElementById("tractor"), 0.72, 0.4, 0.12, 0.12, 0, -0.006),
    new Sprite_Auto(document.getElementById("tractor"), 0.72, 0.7, 0.12, 0.12, 0, -0.006),
    new Sprite_Auto(document.getElementById("tractor"), 0.72, 1.0, 0.12, 0.12, 0, -0.006),


    new Sprite_Bounce(document.getElementById("tree"),    0.2, 0, 0.13, 0.17, 0, 0),    
    new Sprite_Bounce(document.getElementById("tree"),    0.2, 0.3, 0.13, 0.17, 0, 0),       
    new Sprite_Bounce(document.getElementById("tree"),    0.2, 0.6, 0.13, 0.17, 0, 0),     
    new Sprite_Bounce(document.getElementById("tree"),    0.2, 0.9, 0.13, 0.17, 0, 0),    
   
    new Sprite_Bounce(document.getElementById("tree"),    0.55, -0.1, 0.13, 0.17, 0, 0),     
    new Sprite_Bounce(document.getElementById("tree"),    0.55, 0.2, 0.13, 0.17, 0, 0),        
    new Sprite_Bounce(document.getElementById("tree"),    0.55, 0.5, 0.13, 0.17, 0, 0),     
    new Sprite_Bounce(document.getElementById("tree"),    0.55, 0.8, 0.13, 0.17, 0, 0),             
];
var player = sprites[3];
var tractor1 = sprites[4];

var bcr;
var can = document.getElementById("can");
var con = can.getContext("2d");
var playerJumpX = 0.04;
var playerJumpY = 0.04;
var playerIsMovingX = false;
var playerIsMovingY = false;

document.body.addEventListener("keydown", handleKD);
document.body.addEventListener("keyup", handleKU);
window.onresize = resize;
resize();
requestAnimationFrame(animate);

function animate(){
    con.clearRect(0,0, bcr.width, bcr.height);
    updateAll();
    drawAll();
    requestAnimationFrame(animate);
}
function drawAll(){
    for (var i = 0; i < sprites.length; i++){
        sprites[i].draw();
    }
}
function handleKD(e){
    console.log(e);
    switch(e.key){
        case "ArrowUp" :
            if (playerIsMovingY !== -1){
                player.model.pos.y -= playerJumpY;
                playerIsMovingY = -1;
            }
            break;
        case "ArrowDown":
            if (playerIsMovingY !== 1){
                player.model.pos.y += playerJumpY;
                playerIsMovingY = 1;
            }
            break;
        case "ArrowLeft":
            if (playerIsMovingX !== -1) {
                player.model.pos.x -= playerJumpX;
                playerIsMovingX = -1;
            }
            break;
        case "ArrowRight":
            if (playerIsMovingX !== 1) {
                player.model.pos.x += playerJumpX;
                playerIsMovingX = 1;
            }
            break;
    }
}
function handleKU(e){
    console.log(e);
    switch(e.key){
        case "ArrowUp" :
            if (playerIsMovingY === -1) {
                playerIsMovingY = 0;
            }
            break;
        case "ArrowDown":
            if (playerIsMovingY === 1) {
                playerIsMovingY = 0;
            }
            break;
        case "ArrowLeft":
            if (playerIsMovingX === -1){
                playerIsMovingX = 0;
            }
            break;
        case "ArrowRight":
            if (playerIsMovingX === 1){
                playerIsMovingX = 0;
            }
            break;
    }
}
function resize(){
    bcr = document.body.getBoundingClientRect();
    can.width = bcr.width;
    can.height = bcr.height;
    for (var i=0; i < sprites.length; i++){
        sprites[i].resize();
    }
}
function updateAll(){
    for (var i = 0; i < sprites.length; i++){
        sprites[i].update();
    }
}
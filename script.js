var spawnRate = 800;
var spawnRateOfDescent = 2;
var lastSpawn = -10;
var objects = [];
var startTime = Date.now();

function spawnRandomObject() {

    var t;

    if (Math.random() < 0.50) {
        t = "red";
    } else {
        t = "red";
    }

    var object = {
        type: t,
        x: Math.random() * (canvas.width - 30) + 15,
        y: 0,
        r: 8
    }



    objects.push(object);
}


function animate() {
    var time = Date.now();
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }


    var paddleLeft = paddleX;
    var paddleRight = paddleX + paddleWidth;
    var paddleTop = paddleY
    var paddleBottom = paddleY + paddleHeight;

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];
        object.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.arc(object.x, object.y, object.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();


    }
}



var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var paddleHeight = 15;
var paddleWidth = 70;
var paddleY = 690
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}



function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#A52A2A";
    ctx.fill();
    ctx.closePath();
}

function move() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    animate();
    move();
}


var theInterval = setInterval(draw, 20);
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

    // calculate the bounds of the paddle
    var paddleLeft = paddleX;
    var paddleRight = paddleX + paddleWidth;
    var paddleTop = paddleY;
    var paddleBottom = paddleY + paddleHeight;

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];
        object.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.arc(object.x, object.y, object.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();

        //Collision code starts here           

        // calculate bounds of this ball
        var objectTop = object.y - object.r;
        var objectBottom = object.y + object.r;
        var objectLeft = object.x - object.r;
        var objectRight = object.x + object.r;

        // Collision test: Part 1
        // Has the ball not yet reached the paddle?
        if (objectBottom < paddleY) {
            // no collision yet so no collision is happening
            continue;
        }
        // Collision test: Part 2
        // Has the ball already passed below the paddle?
        if (objectTop > paddleBottom) {
            // the ball is under the paddle so no collision is happening
            continue;
        }
        // Collision test: Part 3
        // Is the ball now horizontally over the paddle?
        if (objectRight > paddleLeft && objectLeft < paddleRight) {
            // ball is colliding with paddle
            // end the game
            clearInterval(theInterval);
            alert('Ball collided with paddle +1 score');
        }

        //Collsion code ends here
    }
}



var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var paddleHeight = 20;
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
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    animate();
    move();
}


var theInterval = setInterval(draw, 25);
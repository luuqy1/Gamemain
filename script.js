window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var canvasBack = document.getElementById("backgroundCanvas");
    var contextBack = canvasBack.getContext("2d");
    var timer;
    var hiscore = 0;
    var background = new Image();
    background.src = 'Images/apple-tree-drawing.jpg';
    var catchSounds = [];
    var catchSoundCounter = 0;
    for (var i = 0; i < 5; i++) {
        var catchSound = new Audio();
        catchSound.src = 'Audio/bleep.wav';
        catchSounds.push(catchSound);
    }

    var music = new Audio();
    music.src = 'Audio/MarimbaBoy.wav';
    music.loop = true;

    var smashSounds = [];
    var smashCounter = 0;
    for (var i = 0; i < 5; i++) {
        var smash = new Audio();
        smash.src = 'Audio/smash.mp3';
        smashSounds.push(smash);
    }

    var player;
    var fruits = [];
    var numberOfFruits = 15;
    function Player() {
        this.gameOver = false;
        this.score = 0;
        this.fruitsCollected = 0;
        this.fruitsMissed = 0;
        this.playerWidth = 150;
        this.playerHeight = 90;
        this.playerSpeed = 15;
        this.x = canvas.width / 2;
        this.y = canvas.height - this.playerHeight;
        this.playerImage = new Image();
        this.playerImage.src = 'Images/basket2.png';


        this.render = function () {
            context.drawImage(this.playerImage, this.x, this.y);
        }


        this.moveLeft = function () {
            if (this.x > 0) {
                this.x -= this.playerSpeed;
            }
        }


        this.moveRight = function () {
            if (this.x < canvas.width - this.playerWidth) {
                this.x += this.playerSpeed;
            }
        }
    }


    function Fruit() {
        this.fruitNumber = Math.floor(Math.random() * 5);
        this.fruitType = "apple";
        this.fruitScore = 0;
        this.fruitWidth = 50;
        this.fruitHeight = 50;
        this.fruitImage = new Image();
        this.fruitSpeed = Math.floor(Math.random() * 3 + 1);
        this.x = Math.random() * (canvas.width - this.fruitWidth);
        this.y = Math.random() * -canvas.height - this.fruitHeight;

        this.chooseFruit = function () {
            if (this.fruitNumber == 0) {
                this.fruitType = "apple";
                this.fruitScore = 5 * this.fruitSpeed;
                this.fruitImage.src = 'Images/apple2.png';
            }
            else if (this.fruitNumber == 1) {
                this.fruitType = "apple";
                this.fruitScore = 20 * this.fruitSpeed;
                this.fruitImage.src = 'Images/apple2.png';
            }
            else if (this.fruitNumber == 2) {
                this.fruitType = "apple";
                this.fruitScore = 20 * this.fruitSpeed;
                this.fruitImage.src = 'Images/apple2.png';
            }


        }
        this.fall = function () {
            if (this.y < canvas.height - this.fruitHeight) {
                this.y += this.fruitSpeed;
            }
            else {
                smashSounds[smashCounter].play();
                if (smashCounter == 4) {
                    smashCounter = 0;
                }
                else {
                    smashCounter++;
                }

                player.fruitsMissed += 1;
                this.changeState();
                this.chooseFruit();
            }
            this.checkIfCaught();
        }
        this.checkIfCaught = function () {
            if (this.y >= player.y) {
                if ((this.x > player.x && this.x < (player.x + player.playerWidth)) ||
                    (this.x + this.fruitWidth > player.x && this.x + this.fruitWidth < (player.x + player.playerWidth))) {
                    catchSounds[catchSoundCounter].play();
                    if (catchSoundCounter == 4) {
                        catchSoundCounter = 0;
                    }
                    else {
                        catchSoundCounter++;
                    }

                    player.score += this.fruitScore;
                    player.fruitsCollected += 1;

                    this.changeState();
                    this.chooseFruit();
                }
            }
        }
        this.changeState = function () {
            this.fruitNumber = Math.floor(Math.random() * 5);
            this.fruitSpeed = Math.floor(Math.random() * 3 + 1);
            this.x = Math.random() * (canvas.width - this.fruitWidth);
            this.y = Math.random() * -canvas.height - this.fruitHeight;
        }


        this.render = function () {
            context.drawImage(this.fruitImage, this.x, this.y);
        }
    }
    window.addEventListener("keydown", function (e) {
        e.preventDefault();
        if (e.keyCode == 37) {
            player.moveLeft();
        }
        else if (e.keyCode == 39) {
            player.moveRight();
        }
        else if (e.keyCode == 13 && player.gameOver == true) {
            main();
            window.clearTimeout(timer);
        }
    });

    main();
    function main() {
        contextBack.font = "bold 25px Velvetica";
        contextBack.fillStyle = "BLACK";
        player = new Player();
        fruits = [];

        for (var i = 0; i < numberOfFruits; i++) {
            var fruit = new Fruit();
            fruit.chooseFruit();
            fruits.push(fruit);
        }

        startGame();
    }

    function startGame() {
        updateGame();
        window.requestAnimationFrame(drawGame);
    }
    function updateGame() {
        music.play();
        if (player.fruitsMissed >= 10) {
            player.gameOver = true;
        }

        for (var j = 0; j < fruits.length; j++) {
            fruits[j].fall();
        }
        timer = window.setTimeout(updateGame, 30);
    }
    function drawGame() {
        if (player.gameOver == false) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            contextBack.clearRect(0, 0, canvasBack.width, canvasBack.height);

            contextBack.drawImage(background, 0, 0);
            player.render();

            for (var j = 0; j < fruits.length; j++) {
                fruits[j].render();
            }
            contextBack.fillText("SCORE: " + player.score, 50, 50);
            contextBack.fillText("HI SCORE: " + hiscore, 250, 50);
            contextBack.fillText("FRUIT CAUGHT: " + player.fruitsCollected, 500, 50);
            contextBack.fillText("FRUIT MISSED: " + player.fruitsMissed, 780, 50);
        }
        else {
            for (var i = 0; i < numberOfFruits; i++) {
                console.log("Speed was" + fruits[fruits.length - 1].fruitSpeed);
                fruits.pop();
            }

            if (hiscore < player.score) {
                hiscore = player.score;
                contextBack.fillText("NEW HI SCORE: " + hiscore, (canvas.width / 2) - 100, canvas.height / 2);
            }
            contextBack.fillText("PRESS ENTER TO RESTART", (canvas.width / 2) - 140, canvas.height / 2 + 50);
            context.clearRect(0, 0, canvas.width, canvas.height);

        }
        window.requestAnimationFrame(drawGame);

    }
}


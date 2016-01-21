        var score = parseInt(document.getElementById('score').innerHTML);
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
        var rightPress = false;
        var leftPress = false;
        var upPress = false;
        var downPress = false;
        var paddleWidth = 100;
        var paddleHeight = 10;
        var paddleX = (canvas.width-paddleWidth)/2; 
        var paddleY = canvas.height-paddleHeight;
        var brickNumber = 10;
        var ballNumber = 5;
        var scoreCounter = 100;
        var balls = [{x: (Math.random()*(canvas.width-20)+20), y: 20, drawing: drawBall, ballRadius: 20, dx: 2, dy: 1, brickCollision: brickCollisionDetection, ballCollision: ballCollisionDetection}];
        var bricks = [{x: Math.floor((Math.random()*1000)+1), 
                         y: Math.floor((Math.random()*400)+1), 
                         color: "#" + Math.random().toString(16).slice(2,8),
                         width: Math.floor((Math.random()*50)+10),
                         height: Math.floor((Math.random()*50)+10),
                         status: 1}];

        
        for (var j=1; j<brickNumber; j++) {                 //add bricks to brick array
            var valX = Math.floor((Math.random()*1000)+1);
            var valY = Math.floor((Math.random()*400)+1);
            var valW = Math.floor((Math.random()*50)+10);
            var valH = Math.floor((Math.random()*50)+10);
            
            bricks[j] = ({x: valX, 
                         y: valY, 
                         color: "#" + Math.random().toString(16).slice(2,8),
                         width: valW,
                         height: valH,
                         status: 1});
        }

        function addNewBrick() {                                //add new brick to brick array when called
            var valX = Math.floor((Math.random()*1000)+1);
            var valY = Math.floor((Math.random()*400)+1);
            var valW = Math.floor((Math.random()*50)+10);
            var valH = Math.floor((Math.random()*50)+10);
            var n=0;
            bricks.push({x: valX, 
                         y: valY, 
                         color: "#" + Math.random().toString(16).slice(2,8),
                         width: valW,
                         height: valH,
                         status: 1});
        }

        function drawNewBrick() {                                               // draw new brick on canvas
            var newBrick = bricks[bricks.length-1];
            ctx.beginPath();
            ctx.rect(newBrick.x, newBrick.y, newBrick.width, newBrick.height);
            ctx.fillStyle = newBrick.color;
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks() {                                     //draw all bricks in brick array on canvas
            for(var i=0; i<bricks.length; i++) {
                if (bricks[i].status === 1) {
                    ctx.beginPath();
                    ctx.rect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
                    ctx.fillStyle = bricks[i].color;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }

        document.addEventListener('keydown', keyDownHandler, false); // event handlers for paddle movement
        document.addEventListener('keyup', keyUpHandler, false);
        document.addEventListener('keydown', enterPromptGame, false); //event handler for moving to next popup/begin StartGame function
        
        function drawPaddle() {                                     //draw paddle on canvas
            ctx.beginPath();
            ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight)
            ctx.fillStyle = 'white';
            ctx.strokeStyle = '#0040ff';
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
                                                //following 2 functions allow enter key initialize next popup box
        function enterPromptGame(e) {           
            if (e.keyCode==13) {
                promptGame();
            }
        }

        function enterInstuctions(e) {
            if (e.keyCode==13) {
                showInstructions();
            }
        }
                                                //startGame on enter key press
        function enterStartGame(e) {
            if (e.keyCode==13) {
                startGame();
            }
        }

        function keyDownHandler(e) {            //arrow key paddle control handler
            if (e.keyCode==39) {
                rightPress = true;
            } else if (e.keyCode==37) {
                leftPress = true;
            }
        }

       function keyUpHandler(e) {               //arrow key paddle control handler
            if (e.keyCode==39) {
                rightPress = false;
            } else if (e.keyCode==37) {
                leftPress = false;
            } 
        }

        function mouseMoveHandler(e) {                          //mouse paddle control handler
            var relativeX = e.clientX - canvas.offsetLeft;
            if (relativeX>0 && relativeX<canvas.width) {
                paddleX = relativeX-paddleWidth/2;
            }
        }

        function collisionSound() {                                         //play sound on brick collision
            var sound = new Audio('Whip-SoundBible.com-1988767601.mp3');
            sound.play();
        }

        function brickCollisionDetection() {                //detect ball and brick collision and send ball in opposite direction
            for (var k=0; k<bricks.length; k++) {
                var b = bricks[k];
                if (b.status === 1) {
                   if (this.x+this.ballRadius > b.x && this.x+this.ballRadius < b.x + 2 && 
                        this.y+this.ballRadius > b.y && this.y-this.ballRadius < b.y + b.height && this.dx==Math.abs(this.dx) && this.dy==Math.abs(this.dy)) {
                        collisionSound();
                        document.getElementById('score').innerHTML = score += 20;
                        this.dx = this.dx*-1;
                        b.status = 0;
                        addNewBrick();
                        drawNewBrick();
                    }
                    if (this.x+this.ballRadius > b.x && this.x+this.ballRadius < b.x + 2 && 
                        this.y+this.ballRadius > b.y && this.y-this.ballRadius < b.y + b.height && this.dx==Math.abs(this.dx) && this.dy!=Math.abs(this.dy)) {
                        collisionSound();
                        document.getElementById('score').innerHTML = score += 20;
                        this.dx = this.dx*-1;
                        b.status = 0;
                        addNewBrick();
                        drawNewBrick();
                    }

                    if (this.x-this.ballRadius > b.x + b.width-2 && this.x-this.ballRadius < b.x + b.width && 
                        this.y+this.ballRadius > b.y && this.y-this.ballRadius < b.y + b.height && this.dx!=Math.abs(this.dx) && this.dy==Math.abs(this.dy)) {
                        collisionSound();
                        document.getElementById('score').innerHTML = score += 20;
                        this.dx = this.dx*-1;
                        b.status = 0;
                        addNewBrick();
                        drawNewBrick();
                    }
                    if (this.x+this.ballRadius > b.x + b.width-2 && this.x-this.ballRadius < b.x + b.width && 
                        this.y+this.ballRadius > b.y && this.y-this.ballRadius < b.y + b.height && this.dx!=Math.abs(this.dx) && this.dy!=Math.abs(this.dy)) {
                        collisionSound();
                        document.getElementById('score').innerHTML = score += 20;
                        this.dx = this.dx*-1;
                        b.status = 0;
                        addNewBrick();
                        drawNewBrick();
                    }

                     if (this.x+this.ballRadius > b.x && this.x-this.ballRadius < b.x + b.width && 
                        this.y+this.ballRadius > b.y && this.y+this.ballRadius < b.y + 2 && this.dx==Math.abs(this.dx) && this.dy==Math.abs(this.dy)) {
                        collisionSound();
                        document.getElementById('score').innerHTML = score += 20;
                        this.dy = this.dy*-1;
                        b.status = 0;
                        addNewBrick();
                        drawNewBrick();
                    }

                    if (this.x+this.ballRadius > b.x && this.x-this.ballRadius < b.x + b.width && 
                        this.y+this.ballRadius > b.y && this.y+this.ballRadius < b.y + 2 && this.dx!=Math.abs(this.dx) && this.dy==Math.abs(this.dy)) {
                        collisionSound();
                        document.getElementById('score').innerHTML = score += 20;
                        this.dy = this.dy*-1;
                        b.status = 0;
                        addNewBrick();
                        drawNewBrick();
                    }

                   if (this.x+this.ballRadius > b.x && this.x-this.ballRadius < b.x + b.width && 
                        this.y-this.ballRadius > b.y + b.height-2 && this.y-this.ballRadius < b.y + b.height && this.dx==Math.abs(this.dx) && this.dy!=Math.abs(this.dy)) {
                        collisionSound();
                        document.getElementById('score').innerHTML = score += 20;
                        this.dy = this.dy*-1;
                        b.status = 0;
                        addNewBrick();
                        drawNewBrick();
                    }

                    if (this.x+this.ballRadius > b.x && this.x-this.ballRadius < b.x + b.width && 
                        this.y-this.ballRadius > b.y + b.height-2 && this.y-this.ballRadius < b.y + b.height && this.dx!=Math.abs(this.dx) && this.dy!=Math.abs(this.dy)) {
                        collisionSound();
                        document.getElementById('score').innerHTML = score += 20;
                        this.dy = this.dy*-1;
                        b.status = 0;
                        addNewBrick();
                        drawNewBrick();
                    }
                }
            }
        }

        function ballCollisionDetection() {                 //detect collision between balls
            for (var j=0;j<balls.length;j++) {
                var b = balls[j];
                if (this != b) {
                    if (this.x+this.ballRadius > b.x-b.ballRadius && this.x-this.ballRadius < b.x+b.ballRadius && this.y+this.ballRadius > b.y-b.ballRadius && this.y-this.ballRadius < b.y + b.ballRadius) {
                        this.dy = this.dy*-1;
                    }
                }
            }
        }

        function drawBall() {                               //draw ball on canvas
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
                ctx.fillStyle = '#36f';
                ctx.strokeStyle = '#0040ff';
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
        }

        function addNewBall() {                             //add new ball to canvas
            if (balls.length<=ballNumber) {
                balls.push({x: (Math.random()*(canvas.width-10)+10), y: 20, drawing: drawBall, ballRadius: 20, dx: 2, dy: 1, brickCollision: brickCollisionDetection, ballCollision: ballCollisionDetection});
            }
        }

        function promptGame() {                                             //displays second popup prompt for choosing game
            document.getElementById('askName').style.display = 'none';
            document.getElementById('gameType1').style.display = 'block';
            document.removeEventListener('keydown', enterPromptGame, false);
            document.addEventListener('keydown', enterInstuctions, false);
        }

        function showInstructions() {                                       //shows instruction popup, prompts for starting game
            document.getElementById('gameType1').style.display = 'none';
            document.getElementById('instructions').style.display = 'block';
            document.removeEventListener('keydown', enterInstuctions, false);
            document.addEventListener('keydown', enterStartGame, false);
        }

        function displayLoser() {                                           //displays in game is lost
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('loser').style.display = 'block'; 
        }

        function displayWinner() {                                          //displays if game is won
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('winner').style.display = 'block';
        }

        function createPlayerId() {                                         //creates name of player on page
            var name = document.getElementById('promptName').value;
            var nameDiv = document.createElement('div');
            var section = document.getElementById('scoreEl')
            nameDiv.id = 'playerName';
            section.insertBefore(nameDiv, section.firstChild);
            if (name==='') {
                document.getElementById('playerName').innerHTML = 'Anonymous user is playing';    
            } else {
                document.getElementById('playerName').innerHTML = name + ' is playing';
            }
        }

        function startGame() {              
            document.removeEventListener('keydown', enterStartGame);                                //initializes game
            createPlayerId();
            document.getElementById('instructions').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
            var multiBall = document.getElementById('multiBall').checked;
            document.querySelector('body').style.cursor = 'none'
            
            function moveBall() {
                if (score>=1000) {
                    displayWinner();
                    document.removeEventListener('mousemove', mouseMoveHandler);  
                    document.querySelector('body').style.cursor = 'auto';
                    return false;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height)  //clears canvas after every interval
                
                drawBricks();

                if (multiBall) {
                    if (score>=scoreCounter) {
                        addNewBall();
                        scoreCounter+=100;
                    }
                }
                
                for (var l=0;l<balls.length;l++) {         //draws and moves on canvas any balls present in balls array
                    var ball = balls[l];

                    ball.drawing();    
                    drawPaddle();
                    ball.brickCollision();
                    ball.ballCollision();
                                                    //changes direction of ball if it hits the side of the canvas
                    if (ball.x+ball.dx>canvas.width-ball.ballRadius || ball.x+ball.dx<ball.ballRadius) {
                        ball.dx = ball.dx*-1;
                    }

                    if (ball.y+ball.dy<ball.ballRadius) {                                       //changes direction of ball if it hits the top of the canvas          
                        ball.dy = ball.dy*-1;
                    } else if (ball.y + ball.dy > canvas.height-ball.ballRadius) {
                        if (ball.x > paddleX && ball.x < paddleX + paddleWidth && score<1000) { //checks to see if ball hit paddle or bottom of canvas
                            ball.dy = ball.dy*-1;
                        } else {                                                                //displays loser popup if ball his canvas bottom and ends startGame execution
                            displayLoser();
                            document.removeEventListener('mousemove', mouseMoveHandler);
                            document.querySelector('body').style.cursor = 'auto';  
                            return false;
                        }
                    }
                    ball.x += ball.dx;  //increment ball's x postion for movement on canvas
                    ball.y += ball.dy;  //increment ball's y postion for movement on canvas
                }

                if (rightPress && paddleX<canvas.width-paddleWidth) {  //prevent paddle from moving outside the canvas borders
                    paddleX += 5;
                } else if (leftPress && paddleX>0){
                    paddleX -= 5;
                } 
                document.addEventListener('mousemove', mouseMoveHandler, false);    
            }
            
            setInterval(moveBall, 10);
        }

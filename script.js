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
        var lives = 3;

        var bricks = [{x: Math.floor((Math.random()*1000)+1), 
                         y: Math.floor((Math.random()*400)+1), 
                         color: "#" + Math.random().toString(16).slice(2,8),
                         width: Math.floor((Math.random()*50)+10),
                         height: Math.floor((Math.random()*50)+10),
                         status: 1}];

        
        for (var j=1; j<brickNumber; j++) {
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

        function addNewBrick() {
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

        function drawNewBrick() {
            var newBrick = bricks[bricks.length-1];
            ctx.beginPath();
            ctx.rect(newBrick.x, newBrick.y, newBrick.width, newBrick.height);
            ctx.fillStyle = newBrick.color;
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks() {
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

        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);
        
        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight)
            ctx.fillStyle = 'white';
            ctx.strokeStyle = '#0040ff';
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

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

        function enterStartGame(e) {
            if (e.keyCode==13) {
                startGame();
            }
        }

        document.addEventListener('keydown', enterPromptGame, false);

        function keyDownHandler(e) {
            if (e.keyCode==39) {
                rightPress = true;
            } else if (e.keyCode==37) {
                leftPress = true;
            } else if (e.keyCode==38) {
                upPress = true;
            } else if (e.keyCode==40) {
                downPress = true;
            }
        }

       function keyUpHandler(e) {
            if (e.keyCode==39) {
                rightPress = false;
            } else if (e.keyCode==37) {
                leftPress = false;
            } else if (e.keyCode==38) {
                upPress = false;
            } else if (e.keyCode==40) {
                downPress = false;
            }
        }

        function mouseMoveHandler(e) {
            var relativeX = e.clientX - canvas.offsetLeft;
            if (relativeX>0 && relativeX<canvas.width) {
                paddleX = relativeX-paddleWidth;
            }
        }

        function brickCollisionDetection() {
            for (var k=0; k<bricks.length; k++) {
                var b = bricks[k];
                if (b.status === 1) {
                    if (this.x+this.ballRadius > b.x && this.x-this.ballRadius < b.x + b.width && this.y+this.ballRadius > b.y && this.y-this.ballRadius < b.y + b.height) {
                        document.getElementById('score').innerHTML = score += 20;
                        this.dy = this.dy*-1;
                        b.status = 0;
                        addNewBrick();
                        drawNewBrick();
                    }
                }
            }
        }

        function ballCollisionDetection() {
            for (var j=0;j<balls.length;j++) {
                var b = balls[j];
                if (this != b) {
                    if (this.x+this.ballRadius > b.x-b.ballRadius && this.x-this.ballRadius < b.x+b.ballRadius && this.y+this.ballRadius > b.y-b.ballRadius && this.y-this.ballRadius < b.y + b.ballRadius) {
                        this.dy = this.dy*-1;
                    }
                }
            }
        }

        function drawBall() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
                ctx.fillStyle = '#36f';
                ctx.strokeStyle = '#0040ff';
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
        }

        var balls = [{x: (Math.random()*(canvas.width-20)+20), y: 20, drawing: drawBall, ballRadius: 20, dx: 2, dy: 1, brickCollision: brickCollisionDetection, ballCollision: ballCollisionDetection}];

        function addNewBall() {
            if (balls.length<=ballNumber) {
                balls.push({x: (Math.random()*(canvas.width-10)+10), y: 20, drawing: drawBall, ballRadius: 20, dx: 2, dy: 1, brickCollision: brickCollisionDetection, ballCollision: ballCollisionDetection});
            }
        }

        function promptGame() {
            document.getElementById('askName').style.display = 'none';
            document.getElementById('gameType1').style.display = 'block';
            document.removeEventListener('keydown', enterPromptGame, false);
            document.addEventListener('keydown', enterInstuctions, false);
        }

        function showInstructions() {
            document.getElementById('gameType1').style.display = 'none';
            document.getElementById('instructions').style.display = 'block';
            document.removeEventListener('keydown', enterInstuctions, false);
            document.addEventListener('keydown', enterStartGame, false);
        }

        function displayLoser() {
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('loser').style.display = 'block'; 
        }

        function displayWinner() {
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('winner').style.display = 'block';
        }

        function createPlayerId() {
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

                ctx.clearRect(0, 0, canvas.width, canvas.height)
                
                drawBricks();

                if (multiBall) {
                    if (score>=scoreCounter) {
                        addNewBall();
                        scoreCounter+=100;
                    }
                }
                
                for (var l=0;l<balls.length;l++) {
                    var ball = balls[l];

                    ball.drawing();    
                    drawPaddle();
                    ball.brickCollision();
                    ball.ballCollision();

                    if (ball.x+ball.dx>canvas.width-ball.ballRadius || ball.x+ball.dx<ball.ballRadius) {
                        ball.dx = ball.dx*-1;
                    }

                    if (ball.x+ball.dx>canvas.width-ball.ballRadius || ball.x+ball.dx<ball.ballRadius) {
                        ball.dx = ball.dx*-1;
                    }

                    if (ball.y+ball.dy<ball.ballRadius) {
                        ball.dy = ball.dy*-1;
                    } else if (ball.y + ball.dy > canvas.height-ball.ballRadius) {
                        if (ball.x > paddleX && ball.x < paddleX + paddleWidth && score<3000) {
                            ball.dy = ball.dy*-1;
                        } else {
                            displayLoser();
                            document.removeEventListener('mousemove', mouseMoveHandler);
                            document.querySelector('body').style.cursor = 'auto';  
                            return false;
                        }
                    }
                    ball.x += ball.dx;
                    ball.y += ball.dy;
                }

                if (rightPress && paddleX<canvas.width-paddleWidth) {
                    paddleX += 5;
                } else if (leftPress && paddleX>0){
                    paddleX -= 5;
                } else if (upPress && paddleY>canvas.height/2) {
                    paddleY -= 1;
                } else if (downPress && paddleY<canvas.height-paddleHeight) {
                    paddleY += 1;
                }
                document.addEventListener('mousemove', mouseMoveHandler, false);    
            }
            
            setInterval(moveBall, 10);
        }

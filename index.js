let canvas = document.getElementById('game'),
    ctx = canvas.getContext ('2d'),
    ballRadius = 9,
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
    y = canvas.height - 40,
    dx = 2,
    dy = -2;

let paddleHeight = 12, 
    paddleWidth = 72; 

let paddleX = (canvas.width - paddleWidth ) / 2;

let rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40,
    letfOffset = 33,
    score = 0;

let bricks = [];
for(let c = 0; c < columnCount; c++){
    bricks [c] = [];
    for (let r = 0; r < rowCount; r++){
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
    let relaviteX = e.clientX - canvas.offsetLeft; 
    if(relaviteX > 0 && relaviteX < canvas.width){
        paddleX = relaviteX - paddleWidth / 2;
    }
}

function drawPaddle(){
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30);
    ctx.fillStyle = '#534f52';
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#00755E';
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(let c = 0; c < columnCount; c++){
        for(let r = 0; r < rowCount; r++){
            if(bricks[c][r].status === 1){
                let brickX = (c * (brickWidth + brickPadding)) + letfOffset;
                let brickY = (r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
                ctx.fillStyle = '#71797E';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function trackScore(){
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#00755E';
    ctx.fillText('Score: ' + score, 8,24);
}

function hitDetection() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === rowCount * columnCount) {
                        setTimeout(function () {
                            alert('You Win!');
                            document.location.reload();
                        }, 50);
                    }
                }
            }
        }
    }
}

function showGameOver(){
const gameOverElement = document.createElement('div');
gameOverElement.id = 'game-over';
gameOverElement.style.display = 'none';
gameOverElement.innerHTML = `
  <div>
    <h2>Fim de jogo!</h2>
    <p>Sua pontuação final foi: <span id="final-score"></span></p>
    <button onclick="restart()">Jogar novamente</button>
  </div>
`;
canvas.parentNode.appendChild(gameOverElement);}

function restart() {
  
  score = 0;
  x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3);
  y = canvas.height -40;
  paddleX = (canvas.width - paddleWidth ) / 2;
  bricks = [];
  for(let c = 0; c < columnCount; c++){
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++){
      bricks[c][r] = { x: 0, y: 0, status: 1};
    }
  }
  gameOverElement.style.display = 'none';
}

function init(){
  

  if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
    dy = -dy;
  }

  x += dx;
  y += dy;
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  x += dx;
  y += dy;

  if(y + dy > canvas.height - ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    }else{
      // mostra a janela de game over
      document.getElementById('final-score').innerText = score;
      gameOverElement.style.display = 'block';
    }
  }
}

setInterval(init, 10);

let ghost;
let score = 0;
let duration = 20;
let startTime;
let state = 'start';
let spawnEvery = 60;
function setup() {
  createCanvas(480, 360);
  spawnGhost();
}

  

function draw() {
  background(52, 21, 57) 

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(200);
    textSize(22);
    text('Click to start', width / 2, height / 2);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(100);
    textSize(50);
    text('Game over\nScore: ' + score + '\nClick to retry', width / 2, height / 2);
    return;
  }
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }
  if (frameCount % spawnEvery === 0) spawnGhost();
  drawGhost(ghost.x, ghost.y);
  let floatY = ghost.y + sin(frameCount * 0.05) * 10;
  drawGhost(ghost.x, floatY)

  textAlign(LEFT, TOP);
  fill(255);
  textFont('Arial')
  textSize(35);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}

function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}

function drawGhost(x, y) {
  noStroke(10);
  fill(230, 200, 255);
  ellipse(x, y, 70, 60);
  fill(20);
  ellipse(x - 20, y - 5, 10);
  ellipse(x + 25, y - 5, 10);

}
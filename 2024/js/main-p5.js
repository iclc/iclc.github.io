const GRID_SIZE = 80;
const GRID_SCALE_ADJ = 0.92;
let canvas;

function setup() {
  canvas = createCanvas(940, 400);
  canvas.parent("container-p5");

  initThree(); // ***
}

function draw() {
  clear();
  drawLogo();
  noLoop();
}

function keyPressed() {
  clear();
  drawLogo();
}

function drawLogo() {
  push();

  // i
  translate(GRID_SIZE - GRID_SIZE / 2, GRID_SIZE);
  grid(0.5, 0);
  grid(1, 1);
  grid(1, 2);
  grid(1, 3);

  // c
  translate(GRID_SIZE * 2.7, 0);
  grid(0.5, 0);
  grid(1.5, 0);
  grid(0, 1);
  grid(0, 2);
  grid(0.5, 3);
  grid(1.5, 3);

  // l
  translate(GRID_SIZE * 3, 0);
  grid(0.5, 0);
  grid(0, 1);
  grid(0, 2);
  grid(0, 3);
  grid(1, 3);
  grid(2, 3);

  // c
  translate(GRID_SIZE * 3, 0);
  grid(0.5, 0);
  grid(1.5, 0);
  grid(0, 1);
  grid(0, 2);
  grid(0.5, 3);
  grid(1.5, 3);

  pop();
}

function grid(x, y) {
  let roundness = GRID_SIZE * 0.35;
  //let alpha = random(70, 255);
  let alpha = random(0, 100);

  push();
  translate(x * GRID_SIZE, y * GRID_SIZE);
  rectMode(CENTER);
  noStroke();
  strokeWeight(2);
  stroke(255);
  fill(255, alpha);
  rect(0, 0, GRID_SIZE * GRID_SCALE_ADJ, GRID_SIZE * GRID_SCALE_ADJ, roundness);

  // newly added
  drawPattern();

  pop();
}

function drawPattern() {
  let angleInc = 360 / floor(random(2, 5));
  for (let angle = 0; angle < 360; angle += angleInc) {
    push();
    rotate(radians(angle));
    stroke(255);
    strokeWeight(2);
    noFill();
    if (random() < 0.5) {
      rect(
        (GRID_SIZE * GRID_SCALE_ADJ) / 4.5,
        0,
        (GRID_SIZE * GRID_SCALE_ADJ) / 6,
        (GRID_SIZE * GRID_SCALE_ADJ) / 6
      );
    } else {
      circle((GRID_SIZE * GRID_SCALE_ADJ) / 4.5, 0, (GRID_SIZE * GRID_SCALE_ADJ) / 5);
    }
    pop();
  }
}
function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("container-p5");
  canvas.hide();

  initThree(); // ***
}

function draw() {
  background(100);
  noLoop();
}
var _h;

var x;
var y;

var r = 200;
var s = 20;

function setup() {
	var c = createCanvas(windowWidth, windowHeight);
	c.parent('p5Canvas')
	background(0);

	_h = random(0, 360);
	x = random(0, width);
	y = random(0, height);
}

function draw() {
	background(0, 0);

	r = map(mouseY, 0, height, 20, 300);
	s = map(mouseX, 0, width, 5, 300);

	noStroke();
	colorMode(HSB);

	_h = (_h + (random(-20, 20) % 360) + 360) % 360;
	fill(_h, 80, 70);
	circle(x, y, r);

	x = (x + (random(-s, s) % width) + width) % width;
	y = (y + (random(-s, s) % height) + height) % height;
}
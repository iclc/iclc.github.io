// [{1,1}, [2,1], [3,1],[4,1],[5,1],[3,2],[3,3],[3,4],[1,5],[2,5],[3,5],[4,5],[4,5]];
const positionsList = [{
		x: 1,
		y: 1
	},
	{
		x: 1,
		y: 5
	},
	{
		x: 2,
		y: 1
	},
	{
		x: 2,
		y: 2
	},
	{
		x: 2,
		y: 3
	},
	{
		x: 2,
		y: 4
	},
	{
		x: 2,
		y: 5
	},
	{
		x: 3,
		y: 1
	},
	{
		x: 3,
		y: 5
	},
	{
		x: 5,
		y: 1
	},
	{
		x: 5,
		y: 2
	},
	{
		x: 5,
		y: 3
	},
	{
		x: 5,
		y: 4
	},
	{
		x: 5,
		y: 5
	},
	{
		x: 6,
		y: 1
	},
	{
		x: 6,
		y: 5
	},
	{
		x: 7,
		y: 1
	},
	{
		x: 7,
		y: 5
	},
	{
		x: 9,
		y: 1
	},
	{
		x: 9,
		y: 2
	},
	{
		x: 9,
		y: 3
	},
	{
		x: 9,
		y: 4
	},
	{
		x: 9,
		y: 5
	},
	{
		x: 10,
		y: 5
	},
	{
		x: 11,
		y: 5
	},
	{
		x: 13,
		y: 1
	},
	{
		x: 13,
		y: 2
	},
	{
		x: 13,
		y: 3
	},
	{
		x: 13,
		y: 4
	},
	{
		x: 13,
		y: 5
	},
	{
		x: 14,
		y: 1
	},
	{
		x: 14,
		y: 5
	},
	{
		x: 15,
		y: 1
	},
	{
		x: 15,
		y: 5
	},
];

let shapeObjects = [];
let shapeSize = 70;
let strokeSize = 2;
let colorPalette = [];
let backgroundColor = "#000";
let outlineColor = "#fff";
let angle = 0;
let margin = 0;
let marginY = 0;

let pg;

let myFont;

function preload() {
	myFont = loadFont("fonts/Exo-Bold.ttf");
}

function setup() {
	setDimensions();
	// centerCanvas();

	var c = createCanvas(windowWidth, windowHeight, WEBGL);
	c.parent('p5Canvas');
	// c.setDimensions();
	// c.centerCanvas();

	textFont(myFont);

	let palettes = [
		[
			color(218, 49, 106),
			color(117, 250, 155),
			color(139, 188, 180)
		],
		[
			color(161, 32, 242),
			color(178, 253, 209),
			color(158, 145, 220)
		],
		[
			color(226, 102, 99),
			color(215, 250, 246),
			color(100, 60, 191)
		],
		[
			color(242, 180, 63),
			color(187, 49, 137),
			color(113, 46, 101)
		]
	];
	colorPalette = palettes[Math.floor(Math.random()*palettes.length)];

	// colorPalette = [
	// 	color("#FF1E00"),
	// 	color("#764AF1"),
	// 	color("#FFFFFF"),
	// ];
	// colorPalette2 = [
	// 	color("#000"),
	// 	color("#000"),
	// 	color("#000"),
	// ];
	colorPalette2 = palettes[Math.floor(Math.random()*palettes.length)];

	rectMode(CENTER);
	initialiseShapes();
}

function draw() {
	background(backgroundColor);

	push();
	translate(-margin, -marginY, 0);
	rotateY(radians(4));

	noLights();

	for (i = 0; i < positionsList.length; i++) {
		shapeObjects[i].display(mouseY/height, mouseX/width);
	}
	pop();

	angle += 0.015;
}



class Shapes {
	constructor(_x, _y, _off) {
		this.update(_x, _y, _off);
		this.x = _x;
		this.y = _y;
	}

	update(_x, _y, _off) {
		this.shapeVariant = int(random(0, 2));
		this.dim = int(random(1, 1)) * (shapeSize / 2);
		this.randomColor = int(random(0, colorPalette2.length));
		this.randomPosY = int(random(1, 7) * (shapeSize / 10));
		this.randomDisplacementX = int(random(-8, 8) * 2);
		this.randomDisplacementY = int(random(-8, 8) * 2);
		this.randomDisplacementZ = Math.random()*2-1;
		this.randomRotateCubeX = int(random(-5, 5) * 2);
		this.randomRotateCubeY = int(random(-5, 5) * 2);
		this.randomRotateCubeZ = int(random(-5, 5) * 2);

		//console.log(this.randomDisplacementX);

		///   texture
		this.pg = createGraphics(this.dim, this.dim);
		this.pg.textFont(myFont);
		this.rndFontSize = [(shapeSize * 0.4), (shapeSize * 0.7), (shapeSize), (shapeSize * 0.2)];
		this.rndFontSizeChooser = int(random(0, 3)); //this.rndFontSize.length));

		this.offSet = _off;
		this.rotateRadians = int(random(0, 4)) * 90;
		this.randomOffsetMovement01 = int(random(1, 10) * 10);
		this.mov01 = shapeSize;
		if (this.shapeVariant === 0) {
			if (this.rndFontSizeChooser === 0) {
				this.movTxtStart = 0;
				this.movTxtEnd = -(shapeSize * 3);

			} else if (this.rndFontSizeChooser === 1) {
				let rndNumS = random((shapeSize * 2));
				let rndNumE = random((shapeSize * 2));
				this.movTxtStart = rndNumS;
				this.movTxtEnd = -(shapeSize * 2) - rndNumE;

			} else if (this.rndFontSizeChooser === 2) {
				let rndNumS = random((shapeSize * 2.5));
				let rndNumE = random((shapeSize * 2.5));
				this.movTxtStart = rndNumS;
				this.movTxtEnd = -(shapeSize * 2.5) - rndNumE;
			} else if (this.rndFontSizeChooser === 3) {
				let rndNumS = random((shapeSize * 1));
				let rndNumE = random((shapeSize * 1));
				this.movTxtStart = rndNumS;
				this.movTxtEnd = -(shapeSize * 0.5) - rndNumE;
			}

		} else if (this.shapeVariant === 1) {
			// this.mov01 = 40;

			if (this.rndFontSizeChooser === 0) {
				this.movTxtStart = 0;
				this.movTxtEnd = -(shapeSize * 0.3);

			} else if (this.rndFontSizeChooser === 1) {
				let rndNumS = random((shapeSize * 0.5));
				let rndNumE = random((shapeSize * 0.5));
				this.movTxtStart = rndNumS;
				this.movTxtEnd = -(shapeSize * 0.5) - rndNumE;

			} else if (this.rndFontSizeChooser === 2) {
				let rndNumS = random((shapeSize * 0.75));
				let rndNumE = random((shapeSize * 0.75));
				this.movTxtStart = rndNumS;
				this.movTxtEnd = -(shapeSize * 0.75) - rndNumE;


			} else if (this.rndFontSizeChooser === 3) {
				let rndNumS = random((shapeSize * 0.5));
				let rndNumE = random((shapeSize * 0.5));
				this.movTxtStart = rndNumS;
				this.movTxtEnd = (shapeSize * 0.5) - rndNumE;
			}
		} else {
			this.movTxtStart = 0;
			this.movTxtEnd = -(shapeSize * 0.5);

		}

		this.randomOffsetMovement02 = int(random(1, 10) * (shapeSize * 0.1));
		this.mov02 = (shapeSize * 0.25);

		this.randomOffsetMovementTxt = int(random(1, 10) * (shapeSize * 0.1));


	}

	display(y, x) {
		push();

		/// Motion
		let movePos1 = map(
			sin(angle + this.randomOffsetMovement01),
			-1,
			1,
			-this.mov01,
			0
		);

		let moveTxt1 = map(
			sin(angle + this.randomOffsetMovementTxt),
			-1,
			1,
			-this.movTxtStart,
			this.movTxtEnd
		);

		translate(this.x + this.randomDisplacementX, this.y + this.randomDisplacementY, this.randomDisplacementZ*(x*500-250));
		rotateX(radians(this.randomRotateCubeX));
		rotateY(radians(this.randomRotateCubeY));
		rotateZ(radians(this.randomRotateCubeZ));
		// rotateY(frameCount * 0.01 + this.randomOffsetMovementTxt);
		/// BOX ///
		noFill();
		// colorMode(HSB);
		stroke(y*100+30);
		// colorMode(RGB);
		strokeWeight(strokeSize);
		box((shapeSize / 2));

		let d1 = this.dim / 2;
		let d2 = moveTxt1;
		let d3 = movePos1;

		rotateX(radians(movePos1))
		this.pg.background("#000");
		this.pg.textSize(this.rndFontSize[this.rndFontSizeChooser]);
		this.pg.noStroke();
		this.pg.strokeWeight(strokeSize);
		this.pg.fill(colorPalette[this.randomColor]);
		this.pg.stroke("#000");

		if (this.shapeVariant == 0) {
			this.pg.text('DISPLACEMENT', d2, this.randomPosY);
		} else if (this.shapeVariant == 1) {
			this.pg.text('2023', d2, this.randomPosY);
		} else if (this.shapeVariant == 2) {
			// this.pg.fill(0);
			this.pg.ellipse(0, 0, 50);
			// this.pg.text('h',d2, 25);
		}

		texture(this.pg);
		noStroke();
		plane(d1 * 2);

		stroke(255);
		noFill();
		rect(0, 0, d1 * 2, d1 * 2);

		pop();
	}
}


function windowResized() {
	setDimensions();
	initialiseShapes();
	resizeCanvas(windowWidth, windowHeight);
}

function setDimensions() {
	canvasSize = min(windowWidth, windowHeight);
	baseGrid = 2.5;
	gridSize = baseGrid * 4;
	shapeSize = int((canvasSize / baseGrid)) / 2;
	strokeSize = (shapeSize * 0.02);
	shapeSpacing = (shapeSize);
	shapeSpacingDouble = (shapeSpacing) * 2;
	margin = ((15) / 4) * shapeSize;
	marginY = ((5) / 4) * shapeSize;
}

function centerCanvas() {
	var s = document.body.style;
	s.display = "flex";
	s.overflow = "hidden";
	s.height = "100vh";
	s.alignItems = "center";
	s.justifyContent = "center";
}

function initialiseShapes() {
	for (i = 0; i < positionsList.length; i++) {
		posX = int(positionsList[i].x) * (shapeSize / 2);
		posY = int(positionsList[i].y) * (shapeSize / 2);
		shapeObjects[i] = new Shapes(posX, posY);
	}
}
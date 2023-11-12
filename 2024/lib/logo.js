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
let shapeSize = 75;
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

  let c = createCanvas(windowWidth, windowHeight, WEBGL);
  c.parent('p5Canvas');
  c.style('max-width', 'calc(100dvw - 20px)');

  textFont(myFont);

  let palettes = [
    [
      color("#ff0066"),
      color("#ff9933"),
      color("#ccff33")
    ],
    [
      color("#ff00ff"),
      color("#ffff00"),
      color("#ccffcc")
    ],
    [
      color("#ffcc00"),
      color("#66ff99"),
      color("#99ffff")
    ],
    [
      color("#ff6633"),
      color("#66ff99"),
      color("#6699ff")
    ]
  ];

  colorPalette = palettes[Math.floor(Math.random() * palettes.length)];

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
    shapeObjects[i].display(mouseY / height, mouseX / width);
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
    this.randomColor = int(random(0, colorPalette.length));
    this.randomPosY = int(random(1, 7) * (shapeSize / 10));
    this.randomDisplacementX = int(random(-4, 4) * 2);
    this.randomDisplacementY = int(random(-4, 4) * 2);
    this.randomDisplacementZ = Math.random() * 2 - 1;
    this.randomRotateCubeX = int(random(-5, 5) * 2);
    this.randomRotateCubeY = int(random(-5, 5) * 2);
    this.randomRotateCubeZ = int(random(-5, 5) * 2);

    ///   texture
    this.pg = createGraphics(this.dim, this.dim);
    this.pg.textFont(myFont);
    this.rndFontSize = [(shapeSize * 0.4), (shapeSize * 0.7), (shapeSize), (shapeSize * 0.2)];
    this.rndFontSizeChooser = int(random(0, this.rndFontSize.length));

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

    let mapZ = map(this.randomDisplacementZ * (x * 400 - 150), 0, 100, 0, 255);

    translate(this.x + this.randomDisplacementX, this.y + this.randomDisplacementY, mapZ);
    rotateX(radians(this.randomRotateCubeX));
    rotateY(radians(this.randomRotateCubeY));
    rotateZ(radians(this.randomRotateCubeZ));

    /// BOX ///
    noFill();
    let colorDepthInput = this.randomDisplacementZ * (x * 400 - 150);
    let colorDepth = 255 - abs(map(colorDepthInput, 150, -150, -250, 255));
    stroke(colorDepth);

    strokeWeight(strokeSize);
    box((shapeSize / 2));

    let d1 = this.dim / 2;
    let d2 = moveTxt1;
    let d3 = movePos1;


    let from = color(0, 0, 0);
    let to = colorPalette[this.randomColor];
    let colorDepthFill = abs(map(colorDepthInput, 150, -150, -1, 1));
    let interA = lerpColor(from, to, colorDepthFill);

    rotateX(radians(movePos1));
    this.pg.background(interA);
    this.pg.textSize(this.rndFontSize[this.rndFontSizeChooser]);
    this.pg.noStroke();
    this.pg.strokeWeight(strokeSize);
    this.pg.fill(colorPalette[this.randomColor]);


    if (this.shapeVariant == 0) {
      this.pg.text('DISPLACEMENT', d2, this.randomPosY);
    } else if (this.shapeVariant == 1) {
      this.pg.text('2023', d2, this.randomPosY);
    }

    texture(this.pg);
    noStroke();
    plane(d1 * 2);

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
  baseGrid = 3.0;
  gridSize = baseGrid * 2;
  shapeSize = int((canvasSize / baseGrid)) / 2.5;
  strokeSize = (shapeSize * 0.02);
  shapeSpacing = (shapeSize);
  shapeSpacingDouble = (shapeSpacing) * 2;
  margin = ((15) / 4) * shapeSize;
  marginY = ((5) / 4) * shapeSize;
}

function centerCanvas() {
  let s = document.body.style;
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
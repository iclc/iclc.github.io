function setup() {
  const container = document.querySelector("#canvas-container"); // Select the div
  createCanvas(800, 420).parent(container); // Create canvas inside the div

  sampleFactor = 0.18;
  mosaicMaxSides = 6;
  mouseDiaspora = 65;
  minMosaicSize = 5;
  maxMosaicSize = 15;

  noStroke();
  createTiles();
  fgnColor = 0;
}

function draw() {
  clear();

  // Draw each tile
  for (let tile of tiles) {
    tile.update(mouseX, mouseY);
    tile.display();
  }

  textFont(copyFont);
  stroke(255, 255, 255);
  fill(fgnColor);
  textSize(26);
  text("INTERNATIONAL CONFERENCE ON LIVE CODING", 122, 330);

  textFont(headingFont);
  fill(fgnColor);
  textSize(45.5);
  text("BARCELONA 2025", 122, 378);

  textFont(font);
  textSize(20);
  fill(255, 255, 0);
}

// Create all individual tiles in the shape of the logo characters
function createTiles() {
  let points = font.textToPoints("ICLC", 100, height * 3/5, 300, {
    sampleFactor: sampleFactor,
    simplifyThreshold: 0,
  });

  tiles = [];
  for (let pt of points) {
    tiles.push(new MosaicTile(pt.x, pt.y));
  }
}

// Individual tile class
class MosaicTile {
  constructor(x, y) {
    this.originX = x;
    this.originY = y;
    this.x = x + random(-10, 10); // Initial position, with some randomness applied
    this.y = y + random(-10, 10);
    this.size = random(minMosaicSize, maxMosaicSize); // Random size
    this.sides = int(random(3, mosaicMaxSides)); // Random number of sides
    this.rotation = random(TWO_PI); // Initial random rotation
    this.color = random([
      color(0, 82, 142),
      color(246, 149, 0),
      color(204, 0, 36),
      color(0, 128, 64),
      color(255, 255, 0),
      color(255, 204, 0),
      color(255, 255, 255),
    ]);
    this.offsetX = random(-0.5, 10.5); // Soft horizontal movement
    this.offsetY = random(-10.5, 0.5); // Soft vertical movement
    this.breathingAmount = random(0.2, 0.005); // Random breathing factor
    this.breathingSpeed = random(0.01, 0.003); // Breathing speed
    this.breathingDirection = -1; // Breathing direction

    // Properties to support resetting the tile to its original position periodically
    this.timeToReset = random(2, 9) * 1000; // Time in milliseconds (2~9s)
    this.lastResetTime = millis();
    this.isAtOriginalPosition = false;

    this.randomAngle = random(-PI, PI); // Unique random angle for each tile
  }

  update(mouseX, mouseY) {
    // Check whether it's time to reset to original position
    if (
      millis() - this.lastResetTime >= this.timeToReset &&
      !this.isAtOriginalPosition
    ) {
      this.x = this.originX;
      this.y = this.originY;
      this.isAtOriginalPosition = true;
      this.lastResetTime = millis();
    }

    // Stay at original position for a bit (2~9s)
    if (this.isAtOriginalPosition && millis() - this.lastResetTime >= 1000) {
      this.isAtOriginalPosition = false;
      this.timeToReset = random(2, 9) * 1000; // Reset time for next cycle
    }

    // Soft contained movement
    if (!this.isAtOriginalPosition) {
      this.x += this.offsetX;
      this.y += this.offsetY;

      // Restrict movement so it doesn't go too far
      this.x = constrain(this.x, this.originX - 15, this.originX + 15);
      this.y = constrain(this.y, this.originY - 15, this.originY + 15);
    }

    // Parallax effect when mouse moves
    let distance = dist(mouseX, mouseY, this.originX, this.originY);
    if (distance < mouseDiaspora) {
      this.x += (this.originX - mouseX) * 0.2151;
      this.y += (this.originY - mouseY) * 0.121611;
      this.rotation = this.rotate * sin(TWO_PI);
    }

    this.rotation *= cos(this.rotation * TWO_PI);

    // Breathing effect
    if (!this.isAtOriginalPosition) {
      this.size += this.breathingDirection * this.breathingSpeed;
      if (this.size >= this.breathingAmount || this.size <= 5) {
        this.breathingDirection *= -1; // Invert breathing direction
      }
    }
  }

  display() {
    // Draw shadow
    fill(0, 86); // Shadow is dark and semi transparent
    beginShape();
    for (let i = 0; i < this.sides; i++) {
      let angle = map(i, 0, this.sides, 0, TWO_PI + this.randomAngle); // Unique random angle
      let sx = this.x + cos(angle) * this.size + 3; // Shadow offset
      let sy = this.y + sin(angle) * this.size + 3; // Shadow offset
      vertex(sx, sy);
    }
    endShape(CLOSE);

    // Draw the mosaic
    fill(this.color);
    strokeWeight(0.5);
    stroke(brightness(this.color), 55);
    beginShape();
    for (let i = 0; i < this.sides; i++) {
      let angle = map(i, 0, this.sides, 0, TWO_PI + this.randomAngle); // Unique random angle
      let sx = this.x + sin(angle) * this.size * 1.2;
      let sy = this.y + cos(angle) * this.size * 1.234;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}



function setup() {
	const container = select("#canvas-container"); // Select the div
	createCanvas(800, 600).parent(container); // Create canvas inside the div
	buildUI();

	noStroke();
	createTiles();
	fgnColor = 255;
}

function draw() {
	clear();

	// Dibujar los mosaicos
	for (let tile of tiles) {
		tile.display();
	}

	if (toggleFilters) {
		filter(GRAY);
	}

	textFont(copyFont);
	stroke(255, 255, 255);
	fill(fgnColor);
	textSize(26);
	text("INTERNATIONAL CONFERENCE ON LIVE CODING", 122, 444);

	textFont(headingFont);
	fill(fgnColor);
	textSize(45.5);
	text("BARCELONA 2025", 122, 492);

	textFont(font);
	textSize(20);
	fill(255, 255, 0);

	text("TYPOGRAPHY RESOLUTION: " + sampleFactor.value(), 10, height - 15);
	text("MAX MOSAIC SIZE: " + maxMosaicSize.value(), 10, height - 35);
	text("MIN MOSAIC SIZE: " + minMosaicSize.value(), 10, height - 55);
	text("MOSAIC MAX SLIDES: " + mosaicMaxSides.value(), 10, height - 75);
}

// Crear los mosaicos que forman las letras
function createTiles() {
	let points = font.textToPoints("ICLC", 100, height / 2, 300, {
		sampleFactor: sampleFactor.value(), // Densidad de puntos
		simplifyThreshold: 0,
	});

	tiles = [];
	for (let pt of points) {
		tiles.push(new MosaicTile(pt.x, pt.y));
	}
}

// Clase para los mosaicos
class MosaicTile {
	constructor(x, y) {
		this.originX = x;
		this.originY = y;
		this.x = x + random(-10, 10); // Posición inicial con ligera variación
		this.y = y + random(-10, 10);
		this.size = random(minMosaicSize.value(), maxMosaicSize.value()); // Tamaño aleatorio
		this.sides = int(random(3, mosaicMaxSides.value())); // Número aleatorio de lados (entre 3 y 5)
		this.rotation = random(TWO_PI); // Rotación aleatoria inicial
		this.color = random([
			color(0, 82, 142),
			color(246, 149, 0),
			color(204, 0, 36),
			color(0, 128, 64),
			color(255, 255, 0),
			color(255, 204, 0),
			color(255, 255, 255),
		]);
		this.offsetX = random(-0.5, 10.5); // Movimiento horizontal suave
		this.offsetY = random(-10.5, 0.5); // Movimiento vertical suave
		this.breathingAmount = random(0.2, 0.005); // Cantidad de "respiración" aleatoria
		this.breathingSpeed = random(0.01, 0.003); // Velocidad de respiración
		this.breathingDirection = -1; // Dirección de la respiración
		this.points = []; // store all actual points for SVG export

		// Nueva propiedad para el "reset" a posición original
		this.timeToReset = random(2, 9) * 1000; // Tiempo en milisegundos (entre 2 y 9 segundos)
		this.lastResetTime = millis();
		this.isAtOriginalPosition = false;

		// Asignar un ángulo aleatorio único para cada mosaico
		this.randomAngle = random(-PI, PI); // Ángulo aleatorio único por mosaico
	}

	display() {
		// Dibujar la sombra
		fill(0, 86); // Sombra con color oscuro y un poco de transparencia
		beginShape();
		for (let i = 0; i < this.sides; i++) {
			let angle = map(i, 0, this.sides, 0, TWO_PI + this.randomAngle); // Usar el ángulo aleatorio único
			let sx = this.x + cos(angle) * this.size + 3; // Desplazamiento para la sombra
			let sy = this.y + sin(angle) * this.size + 3; // Desplazamiento para la sombra
			vertex(sx, sy);
		}
		endShape(CLOSE);

		// Dibujar el mosaico
		fill(this.color);
		strokeWeight(0.5);
		stroke(brightness(this.color), 55);
		beginShape();
		this.points = [];
		for (let i = 0; i < this.sides; i++) {
			let angle = map(i, 0, this.sides, 0, TWO_PI + this.randomAngle); // Usar el ángulo aleatorio único
			let sx = this.x + sin(angle) * this.size * 1.2;
			let sy = this.y + cos(angle) * this.size * 1.234;
			vertex(sx, sy);
			this.points.push([sx, sy]); // store the actual final vertex so we can export it later as SVG
		}
		endShape(CLOSE);
	}

	getSVG() {
		let fillRGB = this.color.levels.slice(0,3),
			strokeRGB = this.color.levels.map(l=>Math.floor(l*0.55)).slice(0,3);
		return `<polygon points="${this.points.map(p=>p.toString()).join(' ')}" style="fill:rgb(${fillRGB.join(',')});stroke:rgb(${strokeRGB.join(',')});stroke-width:0.5" />`;
	}
}

function buildUI() {
	let uiContainer = select("#ui-container"); // Select the div

	createP().parent(uiContainer);

	let a_button = createButton("TOGGLE BW");
	a_button.mousePressed(function () {
		toggleFilters = !toggleFilters;
		createTiles();
	});
	a_button.parent(uiContainer); // Attach to div

	let exportButton = createButton("SAVE AS SVG");
	exportButton.mousePressed(function () { exportLogo(); });
	exportButton.parent(uiContainer);

	createP().parent(uiContainer);
	createSpan("TYPOGRAPHY RESOLUTION ").parent(uiContainer);
	sampleFactor = createSlider(0.0, 1.0, 0.18, 0.01).parent(uiContainer);
	sampleFactor.changed(function () { createTiles(); });

	createP().parent(uiContainer);
	createSpan("MOSAIC MAX SLIDES").parent(uiContainer);
	mosaicMaxSides = createSlider(6, 20, 6, 1).parent(uiContainer);
	mosaicMaxSides.changed(function () { createTiles(); });

	createP().parent(uiContainer);
	createSpan("MIN MOSAIC SIZE").parent(uiContainer);
	minMosaicSize = createSlider(1, 100, 5, 1).parent(uiContainer);
	minMosaicSize.changed(function () { createTiles(); });

	createP().parent(uiContainer);
	createSpan("MAX MOSAIC SIZE").parent(uiContainer);
	maxMosaicSize = createSlider(1, 100, 15, 1).parent(uiContainer);
	maxMosaicSize.changed(function () { createTiles(); });
}



// {"P5LIVE":{"name":"iclcLOGO","mod":1769267114068}} 

let v = .003
let mouseon = true
let size  = 15
let boxsize = 15*size
let char_i = [[1],[0],[1],[1],[1],[1]]
let char_c = [[1,1,1],[1],[1],[1],[1],[1,1,1]]
let char_l = [[1],[1],[1],[1],[1],[1,1,1]]
let date_2 = [[1,1,1],[0,0,1],[1,1,1],[1],[1],[1,1,1]]
let date_0 = [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]]
let date_7 = [[1,1,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]]
let vwidth = 0
let hheight = 0
let disc = 0.3
let amp = 1
let vword = ["dance", "collaboration","classical", "jazz", "algorave", "livecoding","dance", "choreography"]
let hword = ["choreography", "jazz", "algorave", "livecoding","classical", "jazz", "algorave", "livecoding"]
let font;

// let windowWidth = document.get;
// let windowHeight = 700;
// let ww = window.innerWidth/3;
// let wh = window.innerHeight/3;

let libs = ['https://unpkg.com/hydra-synth', 'includes/libs/hydra-synth.js']
// hydra canvas + init
let hc = document.createElement('canvas') // hydra canvas + custom size
// let hc = document.getElementById("toto");
hc.width = boxsize // window.innerWidth // for full res
hc.height = boxsize // window.innerHeight // for full res
let hydra = new Hydra({detectAudio: false,canvas: hc})
noize = noise // use noize() since noise() is taken by p5js

let pg // store hydra texture

// sandbox - start
pattern = () => osc(20, 0).kaleid(3).colorama(()=> time*0.03+0.5 ).rotate(()=> time ).diff(voronoi([2])).scale(1, 0.4)
//
pattern()
  .scrollX(0.1, 0.01)
  .mult(pattern())
  .out()
  

// sandbox - stop


function preload() {
  font = loadFont("fonts/PressStart2P-Regular.otf")
}

function setup() {
    const container = select("#logocontainer")
    createCanvas(windowWidth/2, windowHeight/2, WEBGL).parent(container)
    // angleMode(DEGREES)
    textFont(font);
    // setupAudio(true)
    pg = createGraphics(hc.width, hc.height)
	camera(0,0,2000)
    perspective(0.2, 1.5, 0, 5200);
    /* let strudel = createElement('iframe')
    strudel.attribute("src", "https://strudel.cc")
    // Set the element's style and position.
    strudel.style('color', 'deeppink');
    strudel.size(800,150)
    strudel.position(700, 500);
    */
}

function on() {
	lights()
	noStroke()
	fill(255, 128)
}

function off() {
	stroke(255)
	noFill()
}

function draw() {
	// updateAudio()
	background(0)
	orbitControl(5)

	// ortho()

	if(mouseIsPressed) {

		mouseon = true

	} else {
		mouseon = false

	}
	let sizeA = size + size*amp/2000

	push()
	translate(rPos(0.5))
	// rotateX(frameCount / 4)
	// rotateZ(frameCount / 2)
	// rotateY(frameCount / 2)
	rotateX((sin(frameCount/30))*0.005)
	rotateY((sin(frameCount/30))*0.002)
	rotateZ((sin(frameCount/30))*0.001)
	push()
	translate(-6*size,-3*size,0)
	ii(-6, -3, 0, sizeA, char_i)
	translate(-1*size,0,-disc*size)
	dd(sizeA, date_2)
	translate(4*size,0,disc*size)
	ii(-6, -3, 0,sizeA, char_c)
	translate(0,0,-disc*size)
	dd(sizeA, date_0)
	translate(4*size,0,disc*size)
	ii(-6, -3, 0,sizeA, char_l)
	translate(0,0,-disc*size)
	dd(sizeA, date_2)
	translate(4*size,0,disc*size)
	ii(-6, -3, 0,sizeA, char_c)
	translate(0,0,-disc*size)
	dd(sizeA, date_7)
	pop()
	if (mouseon == false) {off()} else {on()}
	box(boxsize)
	pg.clear()
	pg.drawingContext.drawImage(hc, 0, 0, pg.width, pg.height)
	horiPlane(pg)
	vertiPlane(pg)
	pop()


}

function horiPlane(tex) {
	stroke(255)
	hindex = int((hheight+boxsize)/boxsize*hword.length-2)
	// hheight = (mouseY-windowHeight/2)/windowHeight*boxsize
	hheight= sin(frameCount/305)*boxsize/2
	textSize(14);
	fill('yellow')
	// text(-1*((mouseY-windowHeight/2)/windowHeight-0.5), (windowWidth/2)-490, 121)
	// text(hindex, (windowWidth/2)-490, 121)
	line(-boxsize/2, hheight , -boxsize/2, boxsize/2,hheight,-boxsize/2 );
	line(-boxsize/2, hheight , boxsize/2, -boxsize/2,hheight,-boxsize/2 );
	line(-boxsize/2, hheight , boxsize/2, boxsize/2,hheight,boxsize/2 );
	line(boxsize/2, hheight , boxsize/2, boxsize/2,hheight,-boxsize/2 );
	push()
	rotateY(radians(90))
	translate(0,0,hheight)
	texture(tex)
	noStroke()
	plane(boxsize, boxsize)
	rotateZ(radians(90))
	rotateX(radians(-90))
	translate(-boxsize/2,0,boxsize/2)
	
	text(hword[hindex], 25, -25)
	pop()
}

function vertiPlane(tex) {
	stroke(255)
	// vwidth = (mouseX-windowWidth/2)/windowWidth*boxsize
	vindex = int((vwidth+boxsize)/boxsize*vword.length-2)
	vwidth=sin(frameCount/300)*boxsize/2
	textSize(14);
	fill('yellow')
	// text(-1*((mouseX-windowWidth/2)/windowWidth-0.5), (windowWidth/2)-490, 151)
	
	line(vwidth ,boxsize/2, -boxsize/2, vwidth, -boxsize/2, -boxsize/2 );
	line(vwidth ,-boxsize/2,  boxsize/2, vwidth, -boxsize/2, -boxsize/2 );
	line(vwidth ,boxsize/2, -boxsize/2, vwidth, boxsize/2,  boxsize/2 );
	line(vwidth ,boxsize/2,  boxsize/2, vwidth,  -boxsize/2, boxsize/2 );
	push()
	rotateX(radians(90))
	translate(0,0,vwidth)
	texture(tex)
	noStroke()
	plane(boxsize, boxsize)
	rotateX(radians(-90))
	translate(-boxsize/2,0,boxsize/2)
	text(vword[vindex], 25, 25)
	pop()
}


function ii(x,y,z,size, char) {
	push()
	fill(233,129)
	let h=x
	let v=y
	for (let row in char) {
		v++
		// console.log(row)
		// console.log(char[row])
		for (let vox in char[row]){
			h++
			push()
			if (mouseon == true) {off()} else {on()}
			translate(vox*size,row*size)
			// console.log(char[row][vox])
			if (char[row][vox] == 1) {
				if (vwidth/boxsize <  h*size-100) { fill("deeppink") } else {fill("white")}
				// if ((-1*((mouseY-windowHeight/2)/windowHeight-0.5)-0.1)*6*size < row*size) {
				if (vwidth < row*size) {
				box(size)
				}
			}
			pop()
		}
	}
	pop()
}

function dd(size, date) {
	push()
	fill(255,0,0)
	for (let row in date) {
		// console.log(row)
		// console.log(char[row])
		for (let vox in date[row]){
			push()
			// if (mouseon == true) {off()} else {on()}
			translate(vox*size,row*size)
			// console.log(char[row][vox])
			if (date[row][vox] == 1) {
				if (vwidth > row*size) {
					// if ((-1*((mouseY-windowHeight/2)/windowHeight-0.5)-0.1)*6*size > row*size) {
					box(size)
				}
			}
			pop()
		}
	}
	pop()
}


function rPos(off) {
	let x = (sin(off + frameCount * v) * width / 100)
	let y = (cos(off + frameCount * v) * height / 100)
	return createVector(x, y)
}

/* 
P5LIVE - Audio
If using outside P5LIVE, include p5live-audio.js 
https://cdn.jsdelivr.net/gh/ffd8/P5LIVE/includes/utils/p5live-audio.js
*/

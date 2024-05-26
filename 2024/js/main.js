const WORLD_SIZE = 1000;
const WORLD_HALF = WORLD_SIZE / 2;

let worldBoxWidth = window.innerWidth;
let worldBoxHeight = window.innerHeight;
let worldBoxDepth = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

let world;
let worldBox;
let nodes = [];

function setupThree() {
  //controls = new OrbitControls(camera, renderer.domElement);
  scene.fog = new THREE.Fog(0x000033, 1, worldBoxDepth * 2.2);

  world = new THREE.Group();
  scene.add(world);

  worldBox = getWorldBox();
  world.add(worldBox);
}

function updateThree() {
  world.rotation.x = sin(frame * 0.01) * 0.05;
  world.rotation.y += 0.001;
  world.rotation.z = sin(frame * 0.015) * 0.02;

  if (random() < 0.05) createNode();

  for (const node of nodes) {
    node.move();
    //node.rotate(); // too much so it won't be used.
    node.update();
    node.age();
    node.remove(nodes);
  }
}

function createNode() {
  let w = floor(random(150, 400));
  let h = floor(random(150, 400));

  let direction;
  let rotation;
  if (random() < 0.33) {
    direction = createVector(1, 0, 0);
    rotation = createVector(0, 0, 0);
  }
  else if (random() < 0.66) {
    direction = createVector(0, 1, 0);
    rotation = createVector(0, PI / 2, 0);
  }
  else {
    direction = createVector(0, 0, 1);
    rotation = createVector(PI / 2, 0, 0);
  }
  direction.mult(random(-1.0, 1.0));

  const tNode = new NodePlane(w, h);
  let range = 0.6;
  tNode.setPosition(
    random(-worldBoxWidth * range, worldBoxWidth * range),
    random(-worldBoxHeight * range, worldBoxHeight * range),
    random(-worldBoxDepth * range, worldBoxDepth * range));
  tNode.setVelocity(direction.x, direction.y, direction.z);
  tNode.setRotationAngle(rotation.x, rotation.y, rotation.z);
  tNode.setRotationTarget(rotation.x, rotation.y, rotation.z);

  nodes.push(tNode);
}

///// EVENT LISTENERS /////

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  worldBoxWidth = window.innerWidth;
  worldBoxHeight = window.innerHeight;
  worldBoxDepth = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

  if (worldBox) {
    world.remove(worldBox);

    worldBox = getWorldBox();
    world.add(worldBox);
  }

  changeHeroDivScale();
});

window.addEventListener("load", function (event) {
  changeHeroDivScale();
});

function changeHeroDivScale() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobile = /android|webos|iphone|ipod|blackberry|windows phone/i.test(userAgent); // ipad is not included.
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (!isMobile) {
    document.getElementById("main-hero-container").style.transform = `scale(${window.innerHeight / 1000})`;
  }
}
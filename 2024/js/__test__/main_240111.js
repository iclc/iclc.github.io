const WORLD_SIZE = 1000;
let worldBoxWidth = window.innerWidth;
let worldBoxHeight = window.innerHeight;
let worldBoxDepth = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

let cube;
let worldBox;

function setupThree() {
  //controls = new OrbitControls(camera, renderer.domElement);
  scene.fog = new THREE.Fog(0x000033, 1, worldBoxDepth * 2.2);

  cube = getBox();
  cube.position.set(0, 0, 0);
  cube.scale.x = 400;
  cube.scale.y = 400;
  cube.scale.z = 400;
  //scene.add(cube);

  worldBox = getRoom();
  worldBox.position.z = WORLD_SIZE;
  scene.add(worldBox);
}

function updateThree() {
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;

  worldBox.rotation.x = sin(frame * 0.01) * 0.05;
  worldBox.rotation.z = sin(frame * 0.015) * 0.02;
}

function getRoom() {
  const geometry = new BoxLineGeometry(worldBoxWidth, worldBoxHeight, worldBoxDepth * 2, 10, 10, 20); //.translate(0, 3, 0);
  const materials = new THREE.LineBasicMaterial({
    color: 0xbcbcbc,
    transparent: true,
    opacity: 0.5,
  });
  const mesh = new THREE.LineSegments(geometry, materials);
  return mesh;
}

function getWorldBox_old() {
  const group = new THREE.Group();

  const resolution = 200;
  const planeTop = getPlane(worldBoxWidth / resolution, worldBoxDepth / resolution);
  planeTop.scale.set(worldBoxWidth, worldBoxDepth);
  planeTop.position.y = worldBoxHeight / 2;
  planeTop.rotation.x = -Math.PI / 2;
  group.add(planeTop);

  const planeBottom = getPlane(worldBoxWidth / resolution, worldBoxDepth / resolution);
  planeBottom.scale.set(worldBoxWidth, worldBoxDepth);
  planeBottom.position.y = -worldBoxHeight / 2;
  planeBottom.rotation.x = Math.PI / 2;
  group.add(planeBottom);

  const planeLeft = getPlane(worldBoxDepth / resolution, worldBoxHeight / resolution);
  planeLeft.scale.set(worldBoxDepth, worldBoxHeight);
  planeLeft.position.x = -worldBoxWidth / 2;
  planeLeft.rotation.y = -Math.PI / 2;
  group.add(planeLeft);

  const planeRight = getPlane(worldBoxDepth / resolution, worldBoxHeight / resolution);
  planeRight.scale.set(worldBoxDepth, worldBoxHeight);
  planeRight.position.x = worldBoxWidth / 2;
  planeRight.rotation.y = Math.PI / 2;
  group.add(planeRight);

  const planeBack = getPlane(worldBoxWidth / resolution, worldBoxHeight / resolution);
  planeBack.scale.set(worldBoxWidth, worldBoxHeight);
  planeBack.position.z = -worldBoxDepth / 2;
  group.add(planeBack);

  return group;
}

function getBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshNormalMaterial({
    // wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function getPlane(wSeg, hSeg) {
  wSeg = parseInt(wSeg);
  hSeg = parseInt(hSeg);
  const geometry = new THREE.PlaneGeometry(1, 1, wSeg, hSeg);
  const material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.10,
    // side: THREE.DoubleSide,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  worldBoxWidth = window.innerWidth;
  worldBoxHeight = window.innerHeight;
  worldBoxDepth = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

  if (worldBox) {
    scene.remove(worldBox);

    worldBox = getRoom();
    worldBox.position.z = WORLD_SIZE;
    scene.add(worldBox);
  }
});
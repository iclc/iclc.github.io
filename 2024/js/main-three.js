console.log("three.js Version: " + THREE.REVISION);

let container, gui, stats;
let scene, camera, renderer;
let controls;
let time, frame = 0;

function initThree() {
  scene = new THREE.Scene();

  const fov = 75;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const near = 10;
  const far = 10000;
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
  //camera.position.z = 1000;

  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);


  container = document.getElementById("container-three");
  container.appendChild(renderer.domElement);

  setupThree(); // *** 

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  time = performance.now();
  frame++;

  updateThree(); // ***

  renderer.render(scene, camera);
}
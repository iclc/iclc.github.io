function getWorldBox() {
  const geometry = new BoxLineGeometry(worldBoxWidth, worldBoxHeight, worldBoxDepth * 2, 10, 10, 20); //.translate(0, 3, 0);
  const materials = new THREE.LineBasicMaterial({
    color: 0xbcbcbc,
    transparent: true,
    opacity: 0.2,
  });
  const mesh = new THREE.LineSegments(geometry, materials);
  return mesh;
}

function getBox(w = 1.0, h = 1.0, d = 1.0) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const material = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.55,
    blend: THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function getLineBox(w = 1.0, h = 1.0, d = 1.0) {
  const geometry = new BoxLineGeometry(w, h, d);
  const materials = new THREE.LineBasicMaterial({
    color: 0xFFFFFF,
    transparent: true,
  });
  const mesh = new THREE.LineSegments(geometry, materials);
  return mesh;
}

function getPlane(w = 1.0, h = 1.0) {
  const geometry = new THREE.PlaneGeometry(w, h, 10, 10);
  const material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    transparent: true,
    side: THREE.DoubleSide,
    // map: texture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function getLinePlane(w = 1.0, h = 1.0) {
  const vertices = [];
  vertices.push(new THREE.Vector3(-w / 2, h / 2, 0));
  vertices.push(new THREE.Vector3(w / 2, h / 2, 0));
  vertices.push(new THREE.Vector3(w / 2, -h / 2, 0));
  vertices.push(new THREE.Vector3(-w / 2, -h / 2, 0));
  vertices.push(new THREE.Vector3(-w / 2, h / 2, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
  const material = new THREE.LineBasicMaterial({
    color: 0xFFFFFF,
    transparent: true,
  });
  const mesh = new THREE.Line(geometry, material);
  return mesh;
}
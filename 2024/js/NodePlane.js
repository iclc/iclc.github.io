const colorPalette = [
  "#711DB0",
  "#C21292",
  "#EF4040",
  "#FFA732",
  "#FFD151",
  "#1D2B53",
  "#7E2553",
  "#FF004D",
  "#FAEF5D",
  "#0766AD",
  "#29ADB2",
  "#C5E898",
];

class NodePlane {
  constructor(w, h, d = 1) {
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();

    this.scl = createVector(1, 1, 1);
    this.mass = this.scl.x * this.scl.y * this.scl.z;

    this.rot = createVector();
    this.rotTarget = createVector(0, 0, 0);
    this.isRotationDone = false;

    this.lifespan = 1.0;
    this.lifeReduction = random(0.001, 0.002);
    this.isDone = false;

    // this.mesh = this.getNodeBox(w, h, d);
    this.mesh = this.getNodePlane(w, h);
    world.add(this.mesh);
  }
  getNodePlane(w, h) {
    const group = new THREE.Group();

    const plane = getPlane();
    group.add(plane);
    plane.geometry.translate(0.5, -0.5, 0);
    let gap = 5;
    plane.position.set(gap, -gap, 0);
    plane.scale.set(w - gap * 2, h - gap * 2, 1);
    plane.material.color.set(
      colorPalette[floor(random(colorPalette.length))]
    );

    const linePlane = getLinePlane();
    group.add(linePlane);
    linePlane.geometry.translate(0.5, -0.5, 0);
    linePlane.scale.set(w, h, 1);

    let box;
    let boxSize = 1.5;

    box = getLineBox();
    box.position.x = 0;
    box.position.y = 0;
    box.scale.set(boxSize * 3, boxSize * 3, boxSize * 3);
    group.add(box);

    box = getLineBox();
    box.position.x = w;
    box.position.y = 0;
    box.scale.set(boxSize, boxSize, boxSize);
    group.add(box);

    box = getLineBox();
    box.position.x = 0;
    box.position.y = -h;
    box.scale.set(boxSize, boxSize, boxSize);
    group.add(box);

    box = getLineBox();
    box.position.x = w;
    box.position.y = -h;
    box.scale.set(boxSize, boxSize, boxSize);
    group.add(box);

    return group;
  }
  getNodePlaneBck(w, h) {
    const group = new THREE.Group();

    const plane = getPlane();
    group.add(plane);
    plane.scale.set(w * 0.96, h * 0.96, 1);
    plane.material.color.set(
      colorPalette[floor(random(colorPalette.length))]
    );

    const linePlane = getLinePlane();
    group.add(linePlane);
    linePlane.scale.set(w, h, 1);

    let box;
    let boxSize = 2;

    box = getLineBox();
    box.position.x = -w / 2;
    box.position.y = h / 2;
    box.scale.set(boxSize, boxSize, boxSize);
    group.add(box);

    box = getLineBox();
    box.position.x = w / 2;
    box.position.y = h / 2;
    box.scale.set(boxSize, boxSize, boxSize);
    group.add(box);

    box = getLineBox();
    box.position.x = -w / 2;
    box.position.y = -h / 2;
    box.scale.set(boxSize, boxSize, boxSize);
    group.add(box);

    box = getLineBox();
    box.position.x = w / 2;
    box.position.y = -h / 2;
    box.scale.set(boxSize, boxSize, boxSize);
    group.add(box);

    return group;
  }
  setPosition(x, y, z) {
    this.pos = createVector(x, y, z);
    return this;
  }
  setVelocity(x, y, z) {
    this.vel = createVector(x, y, z);
    return this;
  }
  setRotationAngle(x, y, z) {
    this.rot = createVector(x, y, z);
    return this;
  }
  setRotationTarget(x, y, z) {
    this.rotTarget = createVector(x, y, z);
    return this;
  }
  setScale(w, h = w, d = w) {
    const minScale = 0.01;
    if (w < minScale) w = minScale;
    if (h < minScale) h = minScale;
    if (d < minScale) d = minScale;
    this.scl = createVector(w, h, d);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    return this;
  }
  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  rotate() {
    if (this.isRotationDone == true) {
      this.rot.lerp(this.rotTarget, 0.05);
    } else {
      if (random() < 0.003) {
        if (random() < 0.5) {
          this.rotTarget.add(this.rotTarget);
        } else {
          this.rotTarget.sub(this.rotTarget);
        }
        this.isRotationDone = true;
      }
    }
  }
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  reappear() {
    if (this.pos.z > WORLD_SIZE / 2) {
      this.pos.z = -WORLD_SIZE / 2;
    }
  }
  disappear() {
    if (this.pos.z > WORLD_SIZE / 2) {
      this.isDone = true;
    }
  }
  age() {
    this.lifespan -= this.lifeReduction;
    if (this.lifespan <= 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  remove(array) {
    if (this.isDone) {
      world.remove(this.mesh);
      array.splice(array.indexOf(this), 1);
    }
  }
  update() {
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.mesh.rotation.set(this.rot.x, this.rot.y, this.rot.z);

    let start = 0.90;
    let end = 0.06;
    let opacityAdj = 0.55;
    let opacityAdjPlane = 0.25;
    if (this.lifespan > start) {
      let amount = map(this.lifespan, 1.0, start, 0.0, 1.0, true);
      //let newScale = p5.Vector.mult(this.scl, amount);
      //this.mesh.scale.set(newScale.x, newScale.y, newScale.z);
      for (let i = 0; i < this.mesh.children.length; i++) {
        if (i == 0) {
          this.mesh.children[i].material.opacity = amount * opacityAdjPlane;
        } else {
          this.mesh.children[i].material.opacity = amount * opacityAdj;
        }
      }
    }
    else if (this.lifespan < end) {
      let amount = map(this.lifespan, end, 0.0, 1.0, 0.0, true);
      let newScale = p5.Vector.mult(this.scl, amount);
      this.mesh.scale.set(newScale.x, newScale.y, newScale.z);
      for (let i = 0; i < this.mesh.children.length; i++) {
        if (i == 0) {
          this.mesh.children[i].material.opacity = amount * opacityAdjPlane;
        } else {
          this.mesh.children[i].material.opacity = amount * opacityAdj;
        }
      }
    }
  }
}
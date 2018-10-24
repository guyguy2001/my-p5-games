const Vector = p5.Vector;
let tank = { position: { x: 0, y: 0 } }; //for intellisense
let objects = [];
const tankSpeed = 10;
let deltaTime = 0;
let mousePos = {};
let keysPressed = { 37: false, 38: false, 39: false, 40: false };
function setup() {
  createCanvas(windowWidth, windowHeight);
  initGame();
}

function initGame() {
  tank = {
    position: createVector(0, 0),
    velocity: createVector(0, 0),
    draw: drawTank,
    update: updateTank,
	speed: 0.25,
	shootingSpeed: 1
  };
  objects = [];
  objects.push(tank);
}
function updateTank() {
  this.velocity = new Vector(0, 0);
  if (keysPressed[37]) this.velocity.add(-1, 0);
  if (keysPressed[38]) this.velocity.add(0, -1);
  if (keysPressed[39]) this.velocity.add(1, 0);
  if (keysPressed[40]) this.velocity.add(0, 1);
  this.position.add(Vector.mult(this.velocity, deltaTime));
  this.cannonDirection = p5.Vector.sub(
    createVector(mouseX, mouseY),
    createVector(windowWidth / 2, windowHeight / 2)
  ).normalize();
}
function drawTank() {
  push();
  const canonWidth = 15,
    canonLength = 15;
  const tankRadius = 70;
  translate(this.position.x - tankRadius / 2, this.position.y - tankRadius / 2);
  const cannonDirection = this.cannonDirection;
  const perpendicular = createVector(
    -cannonDirection.y,
    cannonDirection.x
  ).normalize();
  fill(0, 130, 30);
  stroke(0);
  strokeWeight(2);
  beginShape();
  vectorVertex(p5.Vector.mult(perpendicular, canonWidth / 2));
  vectorVertex(p5.Vector.mult(perpendicular, -canonWidth / 2));
  vectorVertex(
    p5.Vector.add(
      p5.Vector.mult(perpendicular, -canonWidth / 2),
      p5.Vector.mult(cannonDirection, tankRadius / 2 + canonLength)
    )
  );
  vectorVertex(
    p5.Vector.add(
      p5.Vector.mult(perpendicular, canonWidth / 2),
      p5.Vector.mult(cannonDirection, tankRadius / 2 + canonLength)
    )
  );
  endShape(CLOSE);

  fill(150, 150, 0);
  ellipse(0, 0, tankRadius);
  pop();
}
function draw() {
  for (let object of objects) if (object.update) object.update();
  translate(
    windowWidth / 2 - tank.position.x,
    windowHeight / 2 - tank.position.y
  );
  translateMouse();
  deltaTime = 1000 / frameRate();
  console.log(objects);
  background(100);
  for (let object of objects) object.draw();
}

function translateMouse() {
  mousePos.x = mouseX - windowWidth / 2 + tank.position.x;
  mousePos.y = mouseY - windowHeight / 2 + tank.position.y;
}
function vectorVertex(v) {
  vertex(v.x, v.y);
}

function mousePressed() {
  objects.unshift(new Bullet(tank.position.x, tank.position.y, Vector.mult(tank.cannonDirection, tank.shootingSpeed)));
}

function keyPressed(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) keysPressed[e.keyCode] = true;
}

function keyReleased(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) keysPressed[e.keyCode] = false;
}

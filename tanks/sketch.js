let tank = { position: {x: 0, y: 0}}; //for intellisense
let objects = [];
const tankSpeed = 10;
let deltaTime = 0;
let mousePos = {};
function setup() {
	createCanvas(windowWidth, windowHeight);
	initGame();
}

function initGame() {
	tank = {
		position: createVector(0,0),
		draw: drawTank
	}
	objects = [];
	objects.push(tank);
}

function drawTank() {

	const canonWidth = 15, canonLength = 15;
	const tankRadius = 70;
	const cannonDirection = tank.cannonDirection;
	const perpendicular = createVector(-cannonDirection.y, cannonDirection.x).normalize();
	fill(0, 130, 30);
	stroke(0);
	strokeWeight(2);
	beginShape();
	vectorVertex(p5.Vector.mult(perpendicular, canonWidth / 2));
	vectorVertex(p5.Vector.mult(perpendicular, -canonWidth / 2));
	vectorVertex(p5.Vector.add(p5.Vector.mult(perpendicular, -canonWidth / 2), p5.Vector.mult(cannonDirection, tankRadius / 2 + canonLength)));
	vectorVertex(p5.Vector.add(p5.Vector.mult(perpendicular, canonWidth / 2), p5.Vector.mult(cannonDirection, tankRadius / 2 + canonLength)));
	endShape(CLOSE);
	
	fill(150, 150, 0);
	ellipse(0, 0, tankRadius);
}
function draw() {
	translate(windowWidth/2 + tank.position.x, windowHeight/2 + tank.position.y);
	translateMouse();
	deltaTime = 1000 / frameRate();
	console.log(objects);
	background(100);
	tank.cannonDirection = p5.Vector.sub(createVector(mousePos.x, mousePos.y), tank.position).normalize();
	for (let object of objects)
		object.draw();
}

function translateMouse(){
	mousePos.x = mouseX - windowWidth / 2 - tank.position.x;
	mousePos.y = mouseY - windowHeight / 2 - tank.position.y;
}
function vectorVertex(v){
	vertex(v.x, v.y); 
}

function mousePressed(){
	objects.push(new Bullet(tank.position.x + 100, tank.position.y + 100));
}
class Bullet{
    constructor(x, y, velocity){
        this.position = createVector(x, y);
        this.size = 50;
        this.velocity = velocity;
    }
    update(){
        this.position.add(Vector.mult(this.velocity, deltaTime));
    }
    draw(){
        push()
        translate(this.position.x - this.size / 2 , this.position.y - this.size / 2);
        stroke(0);
        strokeWeight(1);
        fill(200, 100, 0);
        ellipse(0, 0, this.size);
        pop();
    }
}
class Bullet{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 50;
    }
    draw(){
        push()
        translate(this.x - this.size / 2 , this.y - this.size / 2);
        stroke(0);
        strokeWeight(1);
        fill(200, 100, 0);
        ellipse(0, 0, this.size);
        pop();
    }
}
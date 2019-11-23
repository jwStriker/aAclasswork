const CONSTANTS = {
    GRAVITY: 0.8,
    FLAP_SPEED: 8,
    TERMINAL_VEL: 12,
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30
};
export default class Bird {

constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = dimensions.width / 3;
    this.y = dimensions.height / 2;
    this.velocity = 0;
}

animate(ctx){
    this.moveBird();
    this.drawBird(ctx);
}

moveBird() {
    this.y += this.velocity;
    this.velocity += CONSTANTS.GRAVITY;
}

flap() {
    this.velocity = -1 * CONSTANTS.FLAP_SPEED;
}


drawBird(ctx){
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x,this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
}


}
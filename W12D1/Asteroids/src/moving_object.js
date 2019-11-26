const Util = require("./util")

function MovingObject(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
}

MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.pos = this.game.wrap(this.pos);
}

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
    const centerDistance = Util.dist(this.pos, otherObject.pos);    
    return centerDistance < (this.radius + otherObject.radius - 6);
};

MovingObject.prototype.collideWith = function collideWith(otherObject) {
};

module.exports = MovingObject;

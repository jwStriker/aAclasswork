const Util = require("./util");
const MovingObject = require("./moving_object");

function Ship(options) {
    options.radius = 15;
    options.color = "#fdf6e3";
    options.vel = options.vel || [0,0];
    options.pos = options.pos || [500,300];

    MovingObject.call(this, options)
}

Ship.prototype.relocate = function relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
};

Util.inherits(Ship, MovingObject);

module.exports = Ship;
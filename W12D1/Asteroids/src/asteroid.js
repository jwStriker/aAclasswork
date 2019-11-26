const Util = require("./util");
const MovingObject = require("./moving_object");

const DEFAULTS = {
    COLOR: "#60c9dd",
    RADIUS: 30,
    SPEED: 4
};

function Asteroid(options) {
    options = options || {};
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.pos = 0;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

    MovingObject.call(this,options);
};

// Asteroid.prototype.randPosition = function randPosition() {
//     return [
//         1000 * Math.random(),
//         600 * Math.random()
//     ];
// };

Asteroid.prototype.collideWith = function collideWith(otherObject) {
    if (otherObject instanceof Ship) {
        otherObject.relocate();
        return true;
    }
    return false;
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
const Asteroid = require("./asteroid");
const Util = require("./util");
const Ship = require("./ship");


function Game() {
    this.asteroids = [];
    this.addAsteroids();
    this.ships = [];
    this.addShip();
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 1;
Game.BG_COLOR = '#9d9d9d';

Game.prototype.addShip = function addShip() {
    const ship = new Ship ({
        pos: this.randomPosition(),
        game: this
    });
    ship.game = this;
    this.ships.push(ship);
    return ship;
};

Game.prototype.draw = function draw(ctx) {
    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    for (let i = 0; i < this.asteroids.length; i++) {
        this.asteroids[i].draw(ctx);
    };
    
    this.ships[0].draw(ctx);

};

Game.prototype.checkCollisions = function checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
        for (let j = 0; j < allObjects.length; j++) {
           const obj1 = allObjects[i];
            const obj2 = allObjects[j];
            
            if (obj1.isCollidedWith(obj2)) {
                console.log("made it here")
                const collision = obj1.collideWith(obj2);
                if (collision) return;
            }
        }
    }
};

Game.prototype.step = function step() {
    this.moveObjects();
    this.checkCollisions();
};

Game.prototype.addAsteroids = function addAsteroids() {
    // debugger;
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
        const stroid = new Asteroid();
        stroid.pos = [
            Math.floor(1000 * Math.random()),
            Math.floor(600 * Math.random())
        ];
        stroid.game = this;
        this.asteroids.push(stroid);
    }
};

Game.prototype.moveObjects = function moveObjects() {
    this.asteroids.forEach(function (asteroid) {
        asteroid.move();
    });
};

Game.prototype.wrap = function wrap(pos) {
    return [
        Util.wrap(pos[0], 1000), Util.wrap(pos[1], 600)
    ];
};

Game.prototype.remove = function remove(object) {
    this.asteroids.splice(this.asteroids.indexOf(object), 1);
}

Game.prototype.randomPosition = function randomPosition() {
    this.pos = [Math.floor(Math.random * Game.DIM_X), Math.floor(Math.random * Game.DIM_Y)];
    // return this.pos;
};

Game.prototype.allObjects = function allObjects() {
    allObjs = [];
    this.asteroids.forEach( asteroid => allObjs.push(asteroid));
    allObjs.push(this.ships[0]);

    return allObjs;
}


module.exports = Game;


Function.prototype.inherits = function(BaseClass) {
  function Surrogate(){}
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

Function.prototype.inherits2 = function (BaseClass) {
    this.prototype = Object.create(BaseClass.prototype);
    this.prototype.constructor = this;
};

function MovingObject() {
 }

function Ship() {
}
Ship.inherits(MovingObject);

function Asteroid() {
}
Asteroid.inherits(MovingObject);

 MovingObject.prototype.greet = function() {
    console.log("hello");
 };

Ship.prototype.fly = function () {
    console.log("woosh");
};

Asteroid.prototype.float = function () {
    console.log("floating");
};



const ship = new Ship 
const asteroid = new Asteroid 

ship.fly();
// ship.float();
ship.greet();
// asteroid.fly();
asteroid.float();
asteroid.greet();
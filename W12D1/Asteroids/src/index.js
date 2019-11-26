const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');
const Game = require('./game');
const GameView = require('./game_view');
const Ship = require('./ship');

document.addEventListener("DOMContentLoaded", function () {
    const canvasElement = document.getElementById("game-canvas");
    canvasElement.width = 1000;
    canvasElement.height = 600;

    const ctx = canvasElement.getContext("2d");
    window.ctx = ctx;
    // const game = new Game();
});

window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Game = Game;
window.GameView = GameView;
window.Ship = Ship;
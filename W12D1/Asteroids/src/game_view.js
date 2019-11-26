const Game = require('./game');
const Ship = require("./ship");

function GameView(game, ctx) {
    this.ctx = ctx;
    this.game = game;
}

GameView.prototype.start = function start() {
    setInterval(function() {
        this.game.draw(ctx);
        this.game.step();
    }, 20);
};


module.exports = GameView;
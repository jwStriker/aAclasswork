const View = require('./ttt-view');
const Game = require('../solution/game');

  $(() => {
    // Your code here
    const root = $('.ttt');
    const game = new Game();
    const view = new View(game, root);
  });

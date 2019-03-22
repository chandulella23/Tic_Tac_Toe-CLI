let gamePlay = require('./../controllers/gameplay.js');

module.exports = function (input, game) {
    input = input.trim();
    if (input === './ttt' || input === './ttt play' || input === './ttt restart') {
        game.started = true;
        gamePlay.resetValues(game);
        gamePlay.designBoard(game);
        console.log(game)
    }
}
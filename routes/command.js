let GamePlay = require('./../controllers/gameplay.js');
let error = require('./../constant/error.js')

module.exports = function (input, game) {
    input = input.trim().split(' ');
    let type = input[1] ? input[1] : null;
    if ((!game.started && input.length === 1) || (!game.started && input.length ===2 && type === "play")) {
        GamePlay.startGame(game);
    } else if(game.started && input.length === 4 && type === "set") {
        GamePlay.setHumanVal(input,game);
    } else {
        console.log(error.printCorrectInput)
    }
}

require('dotenv').config();
require("./../constant/help.js");
let error = require("./../constant/error.js");
let Gameplay = require("./../controllers/gameplay.js");

let game = {
    started : false,
    turn : '',
    is_input : false,
    matrix : 3,
    board : [],
    empty : []
};

process.stdin.setEncoding('utf8');
process.stdin.on("data", input => {
    start(input.trim());
});

function start(input) {
    if(!game.started) {
        require('./../routes/command.js')(input,game);
    } else {
        Gameplay.checkRoute(input,game);
    }

}
require('dotenv').config();
require("./../constant/help.js");
let error = require("./../constant/error.js");

let game = {
    started: false,
    user_assigned_value: null,
    turn: 'O',
    matrix: 3,
    board: [],
    players : ['X','O']
};

process.stdin.setEncoding('utf8');
process.stdin.on("data", input => {
    start(input.trim());
});

function start(input) {
    check = checkEnteredInput(input);
    if(check) {
        require('./../routes/command.js')(input, game);
    } else {
        console.log(error.printCorrectInput)
    }
}

function checkEnteredInput(input) {
    if (input) {
        let inputVal = input.trim().split(' ');
        if (inputVal && inputVal[0] === './ttt' ) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}
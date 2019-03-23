let error = require('./../constant/error.js')

const self = module.exports = {
    resetValues: (game) => {
        game.board = [...Array(game.matrix)].map(x => Array(game.matrix).fill(null));
    },
    designBoard: (game) => {
        let divider = '+';
        for(let i = 0; i < game.matrix; i++) {
            divider += '---+'
        }
        console.log(`
        
        `)
        for (let i = 0; i < game.matrix; i++) {
            console.log(divider);
            let row = '|'
            for (let j = 0; j < game.matrix; j++) {
                if (game.board[i][j]) {
                    row = row + ' ' + game.board[i][j] + ' |';
                } else {
                    row = row + '   |';
                }
            }
            console.log(row);
        }
        console.log(divider);
    },
    startGame: (game) => {
        game.started = true;
        self.resetValues(game);
        self.designBoard(game);
        let random = Math.floor(Math.random() * 2);
        game.user_assigned_value = game.players[random];
        if(game.user_assigned_value === 'O') {
            console.log(`
Your Value is    : 'O'
Machine value is : 'X' 
So you will have first move
            `);
            console.log(`
Player ${game.user_assigned_value}'s move (enter ./ttt set row column):  
                `);
        } else {
            console.log(`
Your Value is    : 'X'
Machine value is : 'O'
So Machine will have first move
            `);
            self.setMachineVal(game);
        } 
    },
    setMachineVal: (game) => {
        if (self.checkBoardStatus(game)) {
            self.makeRandomValueOnBoard(game);
            self.designBoard(game);
            if (self.checkAnswer(game)) {
                process.exit()
            } else {
                game.turn = game.user_assigned_value;
                console.log(`
Player ${game.user_assigned_value}'s move (enter ./ttt set row column):  
                `)
            }
        } else {
            console.log(`
Match Drawn :) :(            
            `)
            process.exit()
        }

    },
    setHumanVal: (input, game) => {
        if (self.checkBoardStatus(game)) {
            let x = parseInt(input[2]);
            let y = parseInt(input[3]);
            if (x >= 0 && x < game.matrix && y >= 0 && y < game.matrix) {
                if (game.board[x][y] === null) {
                    game.board[x][y] = game.turn;
                    self.makeLogic(game)
                } else {
                    console.log(error.printOccupiedValueOnBoard)
                }
            } else {
                console.log(error.printCorrectRowColomn)
            }
        } else {
            console.log(`
Match Drawn :) :(            
            `)
            process.exit();
        }

    },
    makeLogic: (game) => {
        self.designBoard(game);
        if (self.checkAnswer(game)) {
            process.exit()
        } else {
            game.turn = game.user_assigned_value === 'X' ? 'O' : 'X';
            self.setMachineVal(game);
        }
    },
    checkAnswer: (game) => {
        let answer = '';
        let winner = null;
        for (let i = 0; i < game.matrix; i++) {
            answer = answer + game.turn;
        }
        let diagnolAns1 ='';
        let diagnolAns2 = '';
        for (let i = 0; i < game.matrix; i++) {
            //row Answer logic
            let rowAns = game.board[i].join('');
            if (rowAns === answer) {
                winner = game.turn;
                break;
            }

            //col Answer Logic
            let colAns = ''
            for (var j = 0; j < game.matrix; j++) {
                colAns += game.board[j][i];
            }
            if (colAns === answer) {
                winner = game.turn;
                break;
            }

            //Diagnol Answer Logic
            diagnolAns1 = diagnolAns1 + game.board[i][i];
            diagnolAns2 = diagnolAns2 + game.board[i][game.matrix-i-1]
            
        }
        if(diagnolAns1 === answer || diagnolAns2 === answer) {
            winner = game.turn
        }
        if (winner) {
            if (winner === game.user_assigned_value) {
                console.log(` 
                Cheers ! Player ${game.turn} wins :) 
                `);
            } else {
                console.log(` 
                OOOPS ! Player ${game.turn} wins :( 
                `);
            }
            return true;
        } else
            return false;
    },
    checkBoardStatus: (game) => {
        for(let i = 0 ;i < game.matrix; i++) {
            for(let j = 0; j < game.matrix; j++) {
                if(game.board[i][j] === null) {
                    return true;
                }
            }
        }
        return false;
    },
    makeRandomValueOnBoard: (game) => {
        let flag = 0;
        do {
            let x = Math.floor(Math.random() * game.matrix);
            let y = Math.floor(Math.random() * game.matrix);
            if (game.board[x][y] === null) {
                game.board[x][y] = game.turn;
                flag = flag + 1;
            }
        } while (flag === 0);
    }
}
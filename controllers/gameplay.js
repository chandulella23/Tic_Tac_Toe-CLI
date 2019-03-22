module.exports = {
    resetValues: (game) => {
                game.board = [...Array(game.matrix)].map(x=>Array(game.matrix).fill(null));
                game.empty = [...Array(game.matrix)].map(x=>Array(game.matrix).fill(null));
    },
    designBoard: (game) => {
        let divider = '+---+---+---+';
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
    }
}
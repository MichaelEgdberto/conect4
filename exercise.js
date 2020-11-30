var readline = require('readline-sync');

player = 'R'
cols = [1, 2, 3, 4, 5, 6, 7, 'Exit game']
empty = ['_','_','_','_','_','_','_']

var board = [['_','_','_','_','_','_','_'],
             ['_','_','_','_','_','_','_'],
             ['_','_','_','_','_','_','_'],
             ['_','_','_','_','_','_','_'],
             ['_','_','_','_','_','_','_'],
             ['_','_','_','_','_','_','_']];

function printBoard() {
    console.log(' ' + cols.slice(0, board[0].length) + ' ');
    console.log('.' + empty + '.');
    for (const row of board) {
        console.log('|' + row + '|');
    }
}

function changePlayer() {
    if(player === 'R'){
        player = 'Y';
    } else{
        player = 'R';
    }
}

function row(board, i) {
    return board[i].join('');
}

function col(board, j) {
    return board.map(e => e[j]).join('');
}

function diagDown(board, i) {
    return board.map((e, j) => e[i - board.length + j] || '').join('');
}

function diagUp(board, i) {
    return board.slice(0).reverse().map((e, j) => e[i - board.length + j] || '').join('');
}

function whoWon() {
    var r = 'RRRR', y = 'YYYY';
    // rows
    for (let i = 0; i < board.length; ++i) {
        s = row(board, i);
        if (s.includes(r)) return 'R';
        if (s.includes(y)) return 'Y';
    }
    // cols
    for (let i = 0; i < board[0].length; ++i) {
        s = col(board, i);
        if (s.includes(r)) return 'R';
        if (s.includes(y)) return 'Y';
    }
    // diagonals
    for (i = 4; i <= board.length + board[0].length - 4; ++i) {
        s = diagDown(board, i);
        if (s.includes(r)) return 'R';
        if (s.includes(y)) return 'Y';
        s = diagUp(board, i);
        if (s.includes(r)) return 'R';
        if (s.includes(y)) return 'Y';
    }
    // No one wons
    return '_';
}

function userInput() {
    console.log("");
    let col = readline.question("Is your turn, choose one column");
    if(col === -1){
        console.log("Player "+player+" did not wanted to choose");
        changePlayer();
        return;
    }
    else if(col === cols.length-1){
        console.log('Game over');
        process.exit();
        return;
    }
    
    console.log(player+' selected '+(col+1)+' column');
    
    var i = board.length-1;
    while (board[i]) {
        console.log(i)
        if(board[i][col] === '_'){
            board[i][col] = player;
            changePlayer();
            break;
        }
        if(i === 0){
            console.log('You cannot choose that column. Please try again.');
            printBoard();
            userInput();
        }
        i--;
    }
}

(function() {
    printBoard();
    while(whoWon() === '_'){
        userInput();
        printBoard();
    }
    console.log(' ')
    console.log(whoWon()+' wons. Congratulations!');
})();
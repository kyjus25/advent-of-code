import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input  = inputFile.split('\n');

const getNumBoards = () => {
    // 5 board spaces plus the empty line between them
    return (input.length - 1) / 6;
}

const getBoard = (index) => {
    // Get the board using it's index and initialize it with no marked fields
    const startIndex = ((index - 1) * BOARD_DIMENSIONS) + index + 1;
    const endIndex = startIndex + BOARD_DIMENSIONS;
    const tmp = input.slice(startIndex, endIndex).map(i => i.match(/.{1,3}/g));
    for (let i = 0; i < BOARD_DIMENSIONS; i++) {
        for (let j = 0; j < BOARD_DIMENSIONS; j++) {
            tmp[i][j] = {num: parseInt(tmp[i][j].trim()), marked: false};
        }
    }
    tmp[2][2].marked = true;
    return tmp;
}

const initBoards = () => {
    const boards = [];
    for (let i = 1; i <= NUM_BOARDS; i++) {
        boards.push( getBoard(i) );
    }
    return boards;
}

const markBoard = (board, callout) => {
    board.forEach(i => {
        i.filter(j => j.num === callout).map(j => j.marked = true);
    })
}

const checkWinner = (board, callout) => {
    // Check horizontal
    const wonHorizontal = board.findIndex(i => i.filter(j => j.marked === true).length === BOARD_DIMENSIONS) !== -1;
    if (wonHorizontal) { 
        alertWinner(board, callout);
        return true;
    }

    // Check vertical
    for (let i = 0; i < BOARD_DIMENSIONS; i++) {
        const wonVertical = board.filter(j => j[i].marked === true).length === BOARD_DIMENSIONS;
        if (wonVertical) { 
            alertWinner(board, callout); 
            return true;
        }
    }

    // Check diagonal
    const marked = [];
    for (let i = 0; i < BOARD_DIMENSIONS; i++) {
        marked.push(board[i][i].marked === true);
    }
    const wonDiagonal = marked.filter(i => i).length === BOARD_DIMENSIONS;
    if (wonDiagonal) { 
        alertWinner(board, callout); 
        return true;
    }    

    return false;
}

const alertWinner = (board, callout) => {
    console.log('WINNER WINNER', callout, board)
    let score = 0;
    // Sum up unmarked places
    board.flatMap(i => i.filter(j => !j.marked)).forEach(i => score += i.num);
    // Multiply by the winning callout
    console.log('SCORE', score * callout);
}

const CALLOUTS = input[0].split(',').map(i => parseInt(i));
const BOARD_DIMENSIONS = 5;
const NUM_BOARDS = getNumBoards();
const BOARDS = initBoards();

// Play the game.
const WINNER = CALLOUTS.find((callout, cIndex) => {
    return BOARDS.find((board, bIndex) => {
        // Marks the board
        markBoard(board, callout);
        // Check for winner
        return checkWinner(board, callout)
    });
})


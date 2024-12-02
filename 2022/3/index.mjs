import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input = inputFile.split('\n').map(i => {
    const [theirMove, ourMove] = i.split(' ');
    return {theirMove, ourMove};
});

const lookup = {
    letterMap: {
        A: 'Rock',
        B: 'Paper',
        C: 'Scissors',
        X: 'Rock',
        Y: 'Paper',
        Z: 'Scissors'
    },
    win: {
        Rock: 'Scissors',
        Paper: 'Rock',
        Scissors: 'Paper'
    },
    buff: {
        Rock: 1,
        Paper: 2,
        Scissors: 3
    },
    score: {
        lose: 0,
        draw: 3,
        win: 6
    }
}

let totalScore = 0;

input.forEach(game => {
    // Decrypt letters to move
    const theirs = lookup.letterMap[game.theirMove];
    const ours = lookup.letterMap[game.ourMove];
    // Assume draw if our moves match, otherwise look up if we won or lost
    let round = 'draw';
    if (theirs !== ours) { round = lookup.win[ours] === theirs ? 'win' : 'lose'; }
    // Score is move chosen + win bonus
    const roundScore = lookup.buff[ours] + lookup.score[round];
    // Count the total for the whole round
    totalScore = totalScore + roundScore;
    console.log('Game:', theirs, 'vs', ours, '-', roundScore);
})

console.log('Total Score:', totalScore);


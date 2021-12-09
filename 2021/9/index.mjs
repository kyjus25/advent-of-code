import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input  = inputFile.split('\n').map(i => i.split(''));

// console.log('input', input);

const check = (x, y) => {
    const curr = parseInt(input[y][x]);
    const top = input[y - 1] ? parseInt(input[y - 1][x]) : null;
    const bottom = input[y + 1] ? parseInt(input[y + 1][x]) : null;
    const left = input[y][x - 1] ? parseInt(input[y][x - 1]) : null;
    const right = input[y][x + 1] ? parseInt(input[y][x + 1]) : null;
    const isLowest = [top, bottom, left, right].filter(i => i !== null).filter(i => i <= curr).length === 0;
    return {isLowest, risk: isLowest ? curr + 1 : 0}; // true means it should be lit
}

let risk = 0;
input.forEach((column, y) => {
    column.forEach((row, x) => {
        risk += check(x, y).risk;
    })
})
console.log('RISK', risk);
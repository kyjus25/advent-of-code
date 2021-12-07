import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input  = inputFile.split(',').map(i => parseInt(i));

// Most common
let sums = {};
input.forEach(i => sums[i] ? sums[i]++ : sums[i] = 1);
sums = Object.keys(sums).sort((a,b) => sums[a] < sums[b] ? 1 : -1);
const avg = parseInt(sums[0]);

// Middle
const sorted = input.sort((a,b) => a < b ? 1 : -1);
const middle = sorted[sorted.length / 2];

const getTotal = (target, input) => {
    const diff = input.map(i => (i - target) < 0 ? (i - target) * -1 : i - target);
    return diff.reduce((a,b) => a + b);
}

console.log('AVG', avg);
console.log('MIDDLE', middle);
console.log('input', input);
console.log('TOTAL AVG', getTotal(avg, input));
console.log('TOTAL MIDDLE', getTotal(middle, input));
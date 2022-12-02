import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input = inputFile.split('\n').map(i => parseInt(i) || null);

let sums = [];
let index = 0;
input.forEach(i => {
    if (!i) { index++; return }
    if (!sums[index]) { sums[index] = 0; }
    sums[index] = sums[index] + i;
});
sums = sums.sort((a,b) => a < b ? 1 : -1);

console.log(sums);
console.log('most', sums[0]);
console.log('total 3', sums.slice(0, 3).reduce((a,b) => a + b))
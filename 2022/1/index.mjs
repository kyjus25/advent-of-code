import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input = inputFile.split('\n').map(i => parseInt(i) || null);

let sums = [];
let index = 0;

input.forEach(i => {
    // Each elf is separated by a null value, use this to bucket the calories
    if (!i) { index++; return }
    // If the index hasn't been created yet, set it to zero
    if (!sums[index]) { sums[index] = 0; }
    // Create a running total of the index as we traverse the file
    sums[index] = sums[index] + i;
});
// Sort the buckets largest to smallest
sums = sums.sort((a,b) => a < b ? 1 : -1);

// The calories of the top elf
console.log('most', sums[0]);

// The sum of the top 3 elves
console.log('total 3', sums.slice(0, 3).reduce((a,b) => a + b));
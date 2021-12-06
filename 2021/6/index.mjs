import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input  = inputFile.split(',').map(i => parseInt(i));

const queue = Array(9).fill(0);
input.forEach(i => queue[i]++);
console.log('INITIAL state', JSON.stringify(queue) );
for (let i = 0; i < 256; i++) {
    const spawn = queue.shift();
    queue[6] += spawn;
    queue.push(spawn);
    console.log(`After ${i + 1} days`, JSON.stringify(queue) );
}

const total = queue.reduce((a,b) => a + b);
console.log('TOTAL', total);

// console.log('input', input);
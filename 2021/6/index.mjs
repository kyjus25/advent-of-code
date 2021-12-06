import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input  = inputFile.split(',').map(i => parseInt(i));

const resolve = () => {
    let push = 0;
    input = input.map(i => {
        if (i === 0) { 
            i = 7; // 6 plus 1 to account for them all to go down a num
            push++;
        }
        return i;
    });

    input = input.map(i => i - 1);

    [...Array(push).keys()].forEach(i => {
        input.push(8);
    });
}

const iterate = (days) => {
    console.log('Intial State: ', JSON.stringify(input));
    [...Array(days).keys()].forEach(i => {
        resolve();
        // console.log(`After ${i + 1} days: `, JSON.stringify(input));
    });
    console.log('TOTAL: ', input.length);
}

iterate(256);

// console.log('input', input);
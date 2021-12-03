import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input  = inputFile.split('\n').map(i => i.split(''));

const BITLENGTH = 12;

// Gamma is defined as the MOST occuring number in a set. In this case, a "SET is an index in the input value"
export const calcGamma = (index, input) => {
    const tmp = input.map(i => i[index]);
    return tmp.filter(i => i === '0').length > tmp.filter(i => i === '1').length ? '0' : '1';
}

// Epsilon is defined as the LEAST occuring number in a set. In this case, a "SET is an index in the input value"
export const calcEpsilon = (gammaBinary) => {
    return gammaBinary.split('').map(num => num === '1' ? '0' : '1').join('');
}

// Loop through each index in the input binaries to find the latest in each input
let gammaBinary = '';
for (let i = 0; i < BITLENGTH; i++) {
    gammaBinary = gammaBinary + calcGamma(i, input);
}

// Convert the binary to int
const gamma = parseInt(gammaBinary, 2);

// Epsilon is just the opposite of the gamma
const epsilionBinary = calcEpsilon(gammaBinary);
const epsilion = parseInt(epsilionBinary, 2);

console.log('gamma', gamma);
console.log('epsilon', epsilion);
console.log('POWER CONSUMPTION', gamma * epsilion);
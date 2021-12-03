import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input  = inputFile.split('\n').map(i => i.split(''));

const BITLENGTH = 12;

// Gamma is defined as the MOST occuring number in a set. In this case, a "SET is an index in the input value"
export const calcGamma = (index, input) => {
    const tmp = input.map(i => i[index]);
    const prob0 = tmp.filter(i => i === '0').length;
    const prob1 = tmp.filter(i => i === '1').length;
    if (prob0 === prob1) { return null; }
    return prob0 > prob1 ? '0' : '1';
}

// Epsilon is defined as the LEAST occuring number in a set. In this case, a "SET is an index in the input value"
export const calcEpsilon = (gammaBinary) => {
    return gammaBinary.split('').map(num => num === '1' ? '0' : '1').join('');
}

let validBinaries = input;

// Find gamma by filtering binaries based on the MOST occuring number in that index.
for (let i = 0; i < BITLENGTH; i++) {
    let gamma = calcGamma(i, validBinaries);
    if (!gamma) { gamma = '1'; }
    validBinaries = validBinaries.filter(j => j[i] === gamma);
}
const gammaBinary = validBinaries[0].join('');

// Same thing, but for epsilon
validBinaries = input;
console.log('start', validBinaries);
for (let i = 0; i < BITLENGTH; i++) {
    if (validBinaries.length !== 1) {
        let gamma = calcGamma(i, validBinaries);
        if (!gamma) { gamma = '1'; }
        validBinaries = validBinaries.filter(j => j[i] !== gamma);
    }
}
const epsilionBinary = validBinaries[0].join('');
console.log(epsilionBinary)


// Convert the binary to int
const gamma = parseInt(gammaBinary, 2);

// Epsilon is just the opposite of the gamma
// const epsilionBinary = calcEpsilon(gammaBinary);
const epsilion = parseInt(epsilionBinary, 2);

console.log('gamma', gamma);
console.log('epsilon', epsilion);
console.log('LIFE SUPPORT', gamma * epsilion);
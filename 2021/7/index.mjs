import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input  = inputFile.split(',').map(i => parseInt(i));

// Most common
let sums = {};
input.forEach(i => sums[i] ? sums[i]++ : sums[i] = 1);
sums = Object.keys(sums).sort((a,b) => sums[a] < sums[b] ? 1 : -1).map(Number);
const avg = parseInt(sums[0]);

// Middle
const sorted = input.sort((a,b) => a < b ? 1 : -1);
const middle = sorted[sorted.length / 2];

// const getTotal = (target, input) => {
//     const diff = input.map(i => (i - target) < 0 ? (i - target) * -1 : i - target);
//     return diff.reduce((a,b) => a + b);
// }

const calcFuelSpent = (i, target) => {
    // console.log('calc', i, target);
    // let fuel = 1;
    // let subtractions = 0;
    // while (i > target) {
    //     i--;
    //     subtractions++;
    //     fuel++;
    // }
    // return {fuel, subtractions};
    // if (i === target) {
    //     return 0;
    // } else if (i < target) {
    //     let times = 0;
    //     while (i < target) {
    //         i++;
    //         times++;
    //         fuelCost = fuelCost + times;
    //         console.log('iterating', i, target);
    //     }
    //     return fuelCost * times;
    // } else if (i > target) {
    //     let times = 0;
    //     while (i > target) {
    //         i--;
    //         times++;
    //         fuelCost = fuelCost + times;
    //         console.log('iterating');
    //     }
    //     return fuelCost * times;
    // }
}

// 16 15 14 13 12 11 10 9 8 7 6 5
//  0  1  2  3  4  5  6 7 8 9 10 11
// console.log('SUMS', sums);

// 1 - 5 = 4 * ? (10)
// 2 - 5 = 3 * 2 (6)
// 16 - 5 = 11 * ? (66)

// const fuelSpent = input.map(i => {
//     return calcFuelSpent(i, sums[0]);
// });
// }).reduce((a,b) => a + b);

// console.log('FUEL SPENT $', calcFuelSpent(16, 5));
// console.log('FUEL SPENT', fuelSpent);
//console.log('AVG', avg);
// console.log('MIDDLE', middle);
// console.log('input', input);
//console.log('TOTAL AVG', getTotal(avg, input));
//console.log('TOTAL MIDDLE', getTotal(middle, input));

let fuel = [];
for (let i = Math.min(...input); i <= Math.max(...input); i++) {
	fuel[i] = 0;
	for (let j = 0; j < input.length; j++) {
		const positionDiff = Math.abs(input[j] - i);
		fuel[i] += positionDiff * ((positionDiff + 1) / 2);
	}
}
console.log(Math.min(...fuel));
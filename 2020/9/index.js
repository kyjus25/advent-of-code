var fs = require('fs');

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input  = inputFile.split('\n').map(i => parseInt(i));

const preambleLength = 25;
for (let i = preambleLength + 1; i < input.length; i++) {
  checkNumber(i)
}

function checkNumber(i) {
  let target = input[i - 1];
  let pool = input.slice(i - (preambleLength + 1), i - 1).sort(function(a, b){return a-b});

  let foundSum = false;
  let indexMatch = false;

  let firstNumIndex = 0;
  let lastNumIndex = pool.length - 1;
  while (!foundSum && !indexMatch) {
    const sum = pool[firstNumIndex] + pool[lastNumIndex];
    if (firstNumIndex === lastNumIndex) {
      indexMatch = true;
      // console.log('DID NOT FIND MATCH AT INDEX ' + i + ', TARGET WAS ' + target);
      calcSums(target);
    } else {
      if (sum === target) {
        foundSum = true;
        // console.log('FOUND MATCH', {
        //   'target': target,
        //   'firstNumIndex': firstNumIndex,
        //   'lastNumIndex': lastNumIndex,
        //   'firstNum': pool[firstNumIndex],
        //   'lastNum': pool[lastNumIndex]
        // });
      } else if (sum < target) {
        firstNumIndex++;
      } else if (sum > target) {
        lastNumIndex--;
      }
    }
  }
}

function calcSums(i) {
  let firstNumIndex = 0;
  let lastNumIndex = 1;

  let reachedLength = false;
  let reachedTotal = false;

  while (!reachedLength && !reachedTotal) {
    let sum = 0;
  
    const pool = input.slice(firstNumIndex, lastNumIndex + 1);
    pool.forEach(i => sum = sum + i);

    if (sum === i) {
      // console.log('sum', {
      //   'target': i,
      //   'firstNumIndex': firstNumIndex,
      //   'lastNumIndex': lastNumIndex,
      //   'sum': sum,
      //   'pool': pool
      // });
      calcWeakness(pool);
      reachedTotal = true;
    } else if (lastNumIndex + 1 === input.length) {
      // console.log('COULD NOT FIND NUMBER');
      reachedLength = true;
    } else if (sum < i) {
      lastNumIndex++
      // console.log('LESS THAN TOTAL');
    } else if (sum > i) {
      firstNumIndex = firstNumIndex + 1;
      lastNumIndex = firstNumIndex + 1;
      // console.log('NEW NUMBERS', firstNumIndex, lastNumIndex);
    }
  }
}

function calcWeakness(i) {
  const pool = i.sort(function(a, b){return a-b});
  const sum = pool[0] + pool[pool.length -1];
  console.log('WEAKNESS IS ' + sum);
}


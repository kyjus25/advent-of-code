import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input  = inputFile
                .split('\n')
                .map(i => i.split(' | '));

const numbers = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];

const knownAnswers = (answers) => {
    return Object.keys(answers).map(i => answers[i]).filter(i => i !== '');
}

const getA = (num1, num7) => {
    // 7 includes a letter that 1 does not
    return num7.find(i => !num1.includes(i));
}

const getB = (num3, num4) => {
    // Which letter is in 4 but not 3
    return num4.find(i => !num3.includes(i));
}

const getC = (num1, num6) => {
    // 6 includes 1 of the letters of 1, but not the other
    return num1.find(i => !num6.includes(i));
}

const getD = (num4, answers) => {
    // Whatever letter we don't currently have as an answer
    return num4.find(i => !knownAnswers(answers).includes(i));
}

const getE = (answers) => {
    // Whatever letter we don't currently have as an answer
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g'].find(i => !knownAnswers(answers).includes(i));
}

const getF = (num1, num6) => {
    // 6 includes 1 of the letters of 1, but not the other
    return num1.find(i => num6.includes(i));
}

const getG = (num5, answers) => {
    // Whatever letter we don't currently have as an answer
    return num5.find(i => !knownAnswers(answers).includes(i));
}

const get3 = (length5, answers) => {
    // The only 5 digit number that has both a C and an F
    return length5.find(i => i.includes(answers['c']) && i.includes(answers['f']) );
}

const get5 = (length5, answers) => {
    // The only 5 digit number that has both an A and B
    return length5.find(i => i.includes(answers['a']) && i.includes(answers['b']) );
}

const get6 = (num1, length6) => {
    // 6 is the only 6 digit number that is missing a letter from 1
    const deduce = length6.map(i => {
        return i.filter(j => j === num1[0] || j === num1[1])
    });
    return {number: length6[ deduce.findIndex(i => i.length === 1) ], missing: deduce.find(i => i.length === 1)[0]};
}

const solve = (answers, index) => {
    // Split the number blocks, sort alphabetically, and join again
    let code = input[index][1].split(' ').map(i => i.split('').sort((a,b) => a > b ? 1 : -1).join(''));
    // Convert to the correct letter
    code = code.map(i => i.split('').map(j => Object.keys(answers).find(k => answers[k] === j) ));
    // Sort alphabetically
    code = code.map(i => i.sort((a,b) => a > b ? 1 : -1).join(''));
    // Convert the code to the numbers
    code = code.map(i => numbers.findIndex(j => i === j));
    // Return and join to a single number
    return {number: parseInt(code.join('')), code: code}
}

// console.log('input', input);

const deduceAnswers = (index) => {
    const answers = {a: '', b: '', c: '', d: '', e: '', f: '', g: ''};
    const scramble = input[index][0].split(' ').map(i => i.split(''));
    const num1 = scramble.find(i => i.length === 2);
    const num4 = scramble.find(i => i.length === 4);
    const num7 = scramble.find(i => i.length === 3);
    answers['a'] = getA(num1, num7);
    const length6 = scramble.filter(i => i.length === 6);
    const num6 = get6(num1, length6).number;
    answers['c'] = getC(num1, num6);
    answers['f'] = getF(num1, num6);
    const length5 = scramble.filter(i => i.length === 5);
    const num3 = get3(length5, answers);
    answers['b'] = getB(num3, num4, answers);
    answers['d'] = getD(num4, answers);
    const num5 = get5(length5, answers);
    answers['g'] = getG(num5, answers);
    answers['e'] = getE(answers);
    return answers;
}

let total = 0;
let sum = 0;
input.forEach((i, index) => {
    const solution = solve(deduceAnswers(index), index);
    const count = [1, 4, 7, 8];
    const counted = solution.code.filter(j => count.includes(j)).length;
    total += counted;
    sum += solution.number;
    console.log('solution', solution);
})
console.log('TOTAL', total);
console.log('SUM', sum);



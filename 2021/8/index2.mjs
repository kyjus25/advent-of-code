// GRANT'S VERSION

import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input  = inputFile
                .split('\n')
                .map(i => i.split(' | '));

const test = (calcData, actualData) => {
    const data = calcData.split(' ');
    const resultData = actualData.split(' ');
    const map = [  
      {label: 'a', value: null},
      {label: 'b', value: null},
      {label: 'c', value: null},
      {label: 'd', value: null},
      {label: 'e', value: null},
      {label: 'f', value: null},
      {label: 'g', value: null},
    ];
    const updateMap = (letter, value) => {
      const found = map.find(i => i.label === letter);
      found.value = value;
    }
    const get1 = (input) => input.find(i => i.length === 2);
    const get4 = (input) => input.find(i => i.length === 4);
    const get7 = (input) => input.find(i => i.length === 3);
    const get8 = (input) => input.find(i => i.length === 7);
    const findA = (input) => {
      const one = get1(input);
      const seven = get7(input);
      updateMap('a', seven.split('').find(item => one.split('').indexOf(item) < 0));
    };
    const findBE = (input) => {
      const length5List = input.filter(i => i.length === 5);
      const characters = length5List.join("").split('')
        .filter((v, i, a) => a.indexOf(v) === i);
      const oneInstanceLetters = characters.filter(letter => length5List.filter(i => i.indexOf(letter) > -1).length === 1);
      const four = get4(input);
      updateMap('b', oneInstanceLetters.find(i => four.split('').includes(i)));
      updateMap('e', oneInstanceLetters.find(i => !four.split('').includes(i)));
    };
    const findCDE = (input) => {
      const length6List = input.filter(i => i.length === 6);
      const characters = length6List.join("").split('')
      .filter((v, i, a) => a.indexOf(v) === i);
      const twoInstanceLetters = characters.filter(letter => length6List.filter(i => i.indexOf(letter) > -1).length === 2);
      const cValue = twoInstanceLetters.find(i => get1(input).split('').includes(i));
      const eValue = twoInstanceLetters.find(i => !get4(input).split('').includes(i))
      updateMap('c', cValue);
      updateMap('e', eValue);
      updateMap('d', twoInstanceLetters.find(i => i != cValue && i != eValue));
    };
    const findFG = (input) => {
      const definedValues = map.filter(i => i.value).map(i => i.value);
      const fValue = get4(input).split('').find(letter => !definedValues.includes(letter));
      updateMap('f', fValue);
      updateMap('g', ['a', 'b', 'c', 'd', 'e', 'f', 'g']
        .find(letter => !map
          .filter(i => i.value)
          .map(i => i.value).includes(letter)));
    };
    const defaultNumbers = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];
    findA(data);
    findBE(data);
    findCDE(data);
    findFG(data);
    console.log('FINISH', map);
    const newData = resultData.map(data => {
      return data.split('').map(letter => map.find(m => m.value === letter).label).sort().join('');
    });
    let result = [];
    newData.forEach((item, index) => {
      defaultNumbers.find((num, index) => {
        if (num === item) {
          result.push(index);
        }
        return num === item;
      });
    });
    // console.log('FINISH', result.join(''));
    return parseInt(result.join(''));
  }

  // console.log(input[0]);

  let total = 0;
  // console.log('total is', test(input[0][0], input[0][1]));
  input.forEach(i => {
      let testVal = test(i[0], i[1]);
        console.log('testVal', testVal)
      total = total + testVal;
      // arr.push( test(i[0], i[1]) );
    // total = total + test(i[0], i[1]);
  });
  console.log('TOTAL', total);

  // arr = arr.flatMap(i => i);
  // console.log('GRAND TOTAL', arr);


  // const arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
// const counts = {};

// for (const num of arr) {
//   counts[num] = counts[num] ? counts[num] + 1 : 1;
// }

// const NEWTOTAL = counts['1'] + counts['4'] + counts['7'] + counts['8'];

import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input  = inputFile.split('\n').map(i => { return {dir: i.split(' ')[0], amt: parseInt(i.split(' ')[1])} });

export const calcPos = (vals) => {
    const pos = {horizontal: 0, depth: 0, aim: 0};
    vals.forEach((heading, index) => {
        switch (heading.dir) {
            case 'forward':
                pos.horizontal += heading.amt;
                pos.depth += (pos.aim * heading.amt)
                return;
            case 'up':
                pos.aim -= heading.amt;
                return;
            case 'down':
                pos.aim += heading.amt;
                return;
        }
    });
    pos.total = pos.horizontal * pos.depth;
    console.log(pos);
    return pos;
}

calcPos(input);
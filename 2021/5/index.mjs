import { Console } from 'console';
import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input  = inputFile
                .split('\n')
                .map(i => i.split(' -> '))
                .map(i => {
                    const coords1 = i[0].split(',');
                    const coords2 = i[1].split(',');
                    return {x1: coords1[0], y1: coords1[1], x2: coords2[0], y2: coords2[1] }
                });

const MAP = [];
const MAP_DIMENSIONS = 9;

const createMap = () => {
    for (let x = 0; x <= MAP_DIMENSIONS; x++) {
        MAP.push([]);
        for (let y = 0; y <= MAP_DIMENSIONS; y++) {
            MAP[x].push('.');
        }
    }
}

const plot = (coords) => {
    addPoint(coords.x1, coords.y1);
    addPoint(coords.x2, coords.y2);
    if (coords.x1 === coords.x2) { 
        console.log('vertical')
    } else {
        console.log('horizontal')
    }
    // point = point = '.' ? 1 : point + 1;
    // console.log('POINT', MAP[coords.y1][coords.x1]);
}

const addPoint = (x,y) => {
    if (MAP[y][x] === '.') { MAP[y][x] = 0; }
    MAP[y][x] = MAP[y][x] + 1;
}

const log = () => {
    const display = MAP.map(i => i.join(' '));
    console.log(display);
}

createMap();
input.forEach(coords => {
    plot(coords);
});
log();




// console.log('input', input);
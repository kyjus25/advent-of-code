import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input  = inputFile
                .split('\n')
                .map(i => i.split(' -> '))
                .map(i => {
                    const coords1 = i[0].split(',');
                    const coords2 = i[1].split(',');
                    return {x1: parseInt(coords1[0]), y1: parseInt(coords1[1]), x2: parseInt(coords2[0]), y2: parseInt(coords2[1]) }
                });

const MAP = [];
const MAP_DIMENSIONS = 1000;

const createMap = () => {
    for (let x = 0; x <= MAP_DIMENSIONS; x++) {
        MAP.push([]);
        for (let y = 0; y <= MAP_DIMENSIONS; y++) {
            MAP[x].push('.');
        }
    }
}

const plot = (coords) => {
    let method = 'NONE';
    let start = -1;
    let end = -1;
    let pivot = -1;
    if (coords.x1 === coords.x2) {
        method = 'VERTICAL';
        pivot = coords.x1;
        if (coords.y1 < coords.y2) { start = coords.y1; end = coords.y2; } else { start = coords.y2; end = coords.y1; }
    } else if (coords.y1 === coords.y2) {
        method = 'HORIZONTAL';
        pivot = coords.y1;
        if (coords.x1 < coords.x2) { start = coords.x1; end = coords.x2; } else { start = coords.x2; end = coords.x1; }
    } else if (
        (coords.x1 - coords.x2) === (coords.y1 - coords.y2) || 
        (coords.x1 - coords.x2) === (coords.y2 - coords.y1) ) {
        // Could be diagonal
        method = 'DIAGONAL';
        plotDiagonal(coords);
    }
    if (method === 'NONE') { 
        console.log('NONE', coords);
        // addPoint(coords.x1, coords.y1);
        // addPoint(coords.x2, coords.y2);
        return;
    }
    addPoints(method, pivot, start, end);
}

const plotDiagonal = (coords) => {
    let iterateX = 1;
    let iterateY = 1;
    let currX = coords.x1;
    let currY = coords.y1;
    if (coords.x1 > coords.x2) {  iterateX = -1; }
    if (coords.y1 > coords.y2) {  iterateY = -1; }  
    addPoint(currX, currY);
    while (currX !== coords.x2 && currY !== coords.y2) {
        currX = currX + iterateX;
        currY = currY + iterateY;
        addPoint(currX, currY);
    }
}

const addPoints = (method, pivot, start, end) => {
    switch (method) {
        case 'VERTICAL':
            for (let i = start; i <= end; i++) {
                addPoint(pivot, i);
            }
            return;
        case 'HORIZONTAL':
            for (let i = start; i <= end; i++) {
                addPoint(i, pivot);
            }
            return;
    }
    
}

const addPoint = (x,y) => {
    if (MAP[y][x] === '.') { MAP[y][x] = 0; }
    MAP[y][x] = MAP[y][x] + 1;
}

const findAnswer = () => {
    console.log('ANSWER', MAP.flatMap(i => i.filter(j => j >= 2)).length);
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
findAnswer();

// console.log('input', input);
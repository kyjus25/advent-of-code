import fs from 'fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input  = inputFile.split('\n').map(i => parseInt(i));

// console.log('input', input);

export const calcSums = (vals) => {
    const sums = [];
    vals.forEach((depth, index) => {
        if (index < 2) { return }
        const sum = depth + (vals[index - 1]) + (vals[index - 2]);
        sums.push(sum);
        console.log(index, sum);
    });
    return sums;
}

export const calcDepths = (vals) => {
    const depths = {increased: 0, same: 0, decreased: 0};
    vals.forEach((depth, index) => {
        // Check the depth of the next sonar sweep.
        const prevDepth = vals[index - 1];
        // If we are at the end of the list and don't have a next sweep, return out.
        if (!prevDepth) { return; }
        // Console log if the depth has rose or lowered
        if (prevDepth < depth) {
            console.log('+ Increased');
            depths.increased++;
        } else if (prevDepth === depth) {
            console.log('= No change');
            depths.same++;
        } else {
            console.log('- Decreased');
            depths.decreased++;
        }
    });
    console.log(`# Total: ${depths.increased} increased, ${depths.decreased} decreased, ${depths.same} didn't change.`);
}

calcDepths( calcSums(input) );
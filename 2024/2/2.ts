const file = await Bun.file("input.txt").text();
// Split the file by rows
const rows = file.split("\n").map((i) => i.split(" ").map(i => parseInt(i)));
// console.log(rows);

const checks: boolean[] = rows.reduce((acc, curr) => {

    // Get the differences between each adjacent number
    const differences: Array<number> = curr.map((i, index) => {
        const current = i;
        const next = curr[index + 1];
        if (!next) return null;
        return current - next;
    }).filter(i => i !== null);

    // Calculate all pos and all neg for future calculations
    const pos: number[] = differences.map(i => Math.abs(i));
    const neg: number[] = differences.map(i => Math.abs(i) * -1);

    // Count the number of unsafe levels
    let unsafe: number = 0;

    // Flag if either not all positive or not all negative
    if (
        JSON.stringify(differences) !== JSON.stringify(pos) && 
        JSON.stringify(differences) !== JSON.stringify(neg)
    ) {
        // console.log('differences', differences, false);
        unsafe += 1;
        // return acc;
    }

    // Flag if any difference is less than 1 or greater than 3
    if (
        pos.find(i => i === 0) !== undefined ||
        pos.find(i => i > 3)
    ) {
        // console.log('differences', differences, false);
        unsafe += 1;
        // return acc;
    }
    
    // console.log('differences', differences, true);
    // acc.push(true);

    
    acc.push(unsafe);
    return acc;
}, [] as number[]);

// The answer is how ever many are safe levels
// console.log(checks.filter(i => !!i).length);
console.log(checks)
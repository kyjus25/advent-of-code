const file = await Bun.file("input.txt").text();
// Split the file by rows
const rows = file.split("\n").map((i) => i.split(" ").map((i) => parseInt(i)));
// console.log(rows);

const getLevels = (row: number[]) => {
  // Get the differences between each adjacent number
  const differences: Array<number> = row
    .map((i, index) => {
      const current = i;
      const next = row[index + 1];
      if (!next) return null;
      return current - next;
    })
    .filter((i) => i !== null);
  // Calculate all pos and all neg for future calculations
  const pos: number[] = differences.map((i) => Math.abs(i));
  const neg: number[] = differences.map((i) => Math.abs(i) * -1);
  // Flag if either not all positive or not all negative
  if (
    JSON.stringify(differences) !== JSON.stringify(pos) &&
    JSON.stringify(differences) !== JSON.stringify(neg)
  ) {
    return false;
  }
  // Flag if any difference is less than 1 or greater than 3
  if (pos.find((i) => i === 0) !== undefined || pos.find((i) => i > 3)) {
    // console.log('differences', differences, false);
    return false;
  }
  return true;
};

const checks: boolean[] = rows.reduce((acc, curr) => {
  const levels: boolean[] = [
    // Check safety with all levels
    getLevels(curr),
    // Also check safety if any 1 level is removed
    ...[...Array(curr.length).keys()].map((i) => {
      const arr: number[] = curr.filter((_, index) => index !== i);
      return getLevels(arr);
    }),
  ];
  // Return if any level check was safe
  acc.push(levels.find((i) => i === true) || false);
  return acc;
}, [] as boolean[]);

// The answer is how ever many are safe levels
console.log(checks.filter((i) => !!i).length);

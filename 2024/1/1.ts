const file = await Bun.file("input.txt").text();
// Split the file by rows
const rows = file.split("\n").map((i) => i.split("   "));

const cols: Array<number[]> = rows
  .reduce(
    // Join the numbers back by their appropriate column
    (acc, curr) => {
      acc[0].push(parseInt(curr[0]));
      acc[1].push(parseInt(curr[1]));
      return acc;
    },
    [[], []] as Array<number[]>
  )
  // And then sort the column
  .map((i) => i.sort());

const diffs: number[] = cols[0].map((i, index) => {
  // For each index, return the difference between the two columns
  const col1 = i;
  const col2 = cols[1][index];
  // If col1 is larger, subtract it from col2
  if (col1 >= col2) return col1 - col2;
  // Otherwise, subtract col2 from col1
  return col2 - col1;
});

// The answer to the question is the sum of all the diffs
const sum: number = diffs.reduce((acc, curr) => (acc += curr), 0);

console.log(sum);

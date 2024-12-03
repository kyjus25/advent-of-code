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
  );

  // For each item in the left column, find the amount of times it appears on the right
  const similarity: number[] = cols[0].reduce((acc, curr) => {
    const occurrances = cols[1].filter(i => i === curr).length;
    acc.push(curr * occurrances)
    return acc;
  }, [] as number[]);

  // Sum the total number of similarities
  const sum: number = similarity.reduce((acc, curr) => (acc += curr), 0)

console.log(sum);

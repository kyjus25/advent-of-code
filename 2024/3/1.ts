const file = await Bun.file("input.txt").text();
const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

// Loop though all matches of mul(X,X)
const matches = Array.from(file.matchAll(regex))
  .map((match) => {
    // Multiply the numbers together
    return parseInt(match[1]) * parseInt(match[2]);
  })
  .reduce((acc, curr) => {
    // And sum them together
    acc += curr;
    return acc;
  }, 0);

console.log(matches);

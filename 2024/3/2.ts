const file = await Bun.file("input.txt").text();
const regex = /(mul)\((\d{1,3}),(\d{1,3})\)|(do|don't)\(\)/g;

interface Match {
  fn: "mul" | "do" | "don't";
  num1: number;
  num2: number;
}

// Loop though all matches of mul(X,X), do(), and don't()
const matches: Match[] = Array.from(file.matchAll(regex)).map((match) => ({
  fn: (match[4] || match[1]) as Match["fn"],
  num1: parseInt(match[2]),
  num2: parseInt(match[3]),
}));

// Assume first is a do in order to simplify logic
matches.unshift({
  fn: "do",
  num1: NaN,
  num2: NaN,
});

const result = matches
  .filter((i, index) => {
    // If it's not a mul, ignore
    if (i.fn === "do" || i.fn === "don't") return false;
    // If it is a mul, check if it is active (do() is before it)
    const prev = matches.slice(0, index).reverse();
    const condition = prev.find((i) => i.fn === "do" || i.fn === "don't")?.fn;
    return condition === ("do" as Match["fn"]);
  })
  .map((match) => {
    // Multiply the numbers together
    return match.num1 * match.num2;
  })
  .reduce((acc, curr) => {
    // And sum them together
    acc += curr;
    return acc;
  }, 0);

console.log(result);

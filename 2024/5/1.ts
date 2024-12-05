const file = await Bun.file("input.txt").text();
const data = file.split("\n");

// Split the file by rules and updates separated by the empty line
const splitter = data.findIndex((i) => i === "");
const rules = data.slice(0, splitter).map((i) => i.split("|"));
let updates = data.slice(splitter + 1).map((i) => i.split(","));

// updates = [updates[updates.length - 1]];
// updates = [updates[3]];

const results = updates.map((update) => {
  const check = update.map((num, index) => {
    const foundRules = rules.filter(
      (i) => i[1] === num && update.indexOf(i[0]) !== -1
    );
    const before = update.slice(0, index);
    // if (before.length === 0) return true;
    const correctness = foundRules.reduce((acc, curr) => {
      const found = before.find((i) => i === curr[0]);
      //   console.log("CHECK", num, curr, before);
      acc.push(!found);
      return acc;
    }, [] as boolean[]);
    // console.log("NUM", num);
    // console.log("BEFORE", before);
    // console.log("FOUND RULES", foundRules);
    // console.log("CORRECTNESS", correctness);
    return !correctness.find((i) => i === true);
  });
  return check.indexOf(false) === -1;
});

// console.log(rules);

console.log(results);

const sum = results.reduce((acc, curr, index) => {
  if (!curr) return acc;
  const update = updates[index];
  console.log(update);
  const middle = update[(update.length - 1) / 2];
  console.log(middle);
  acc += parseInt(middle);
  return acc;
}, 0);

console.log(sum);

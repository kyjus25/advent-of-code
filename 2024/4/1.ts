const file = await Bun.file("input.txt").text();
const grid = file.split("\n").map((i) => i.split(""));

interface Answer {
  word: string;
  direction:
    | "left"
    | "right"
    | "up"
    | "down"
    | "diagonalRight"
    | "diagonalLeft"
    | "unknown";
  startX: number;
  startY: number;
}

const words: string[] = ["XMAS"];
let answers: Answer[] = [];

const getDirection = (dirX: number, dirY: number) => {
  if (dirX === 0 && dirY === 1) return "right";
  if (dirX === 0 && dirY === -1) return "left";
  if (dirX === 1 && dirY === 0) return "down";
  if (dirX === -1 && dirY === 0) return "up";
  if (dirX === 1 && dirY === 1) return "diagonalDownRight"; //
  if (dirX === 1 && dirY === -1) return "diagonalDownRight";
  if (dirX === -1 && dirY === 1) return "diagonalUpLeft";
  if (dirX === -1 && dirY === -1) return "diagonalDownLeft";
  return "unknown";
};

const check = (
  word: string,
  currX: number,
  currY: number,
  dirX: number,
  dirY: number
) => {
  let index = 0;
  for (
    let x = currX;
    dirX === 0 ? (x = x) : Math.abs(dirX) === dirX ? x < grid.length : x >= 0;
    dirX === 0 ? (x += 0) : Math.abs(dirX) === dirX ? x++ : x--
  ) {
    // console.log("x is now", x, dirX, currX);
    for (
      let y = currY;
      dirY === 0
        ? (y = y)
        : Math.abs(dirY) === dirY
        ? y < grid[x].length
        : y >= 0;
      dirY === 0 ? (y += 0) : Math.abs(dirY) === dirY ? y++ : y--
    ) {
      console.log("y is now", y, dirY, currY);
      const letter = grid[x][y];
      const expectedLetter: string = word.charAt(index);
      console.log("letter", letter, expectedLetter, x, y);
      if (letter !== expectedLetter) return;
      if (index === word.length - 1) {
        answers.push({
          word: word,
          direction: getDirection(dirX, dirY) as any,
          startX: currX,
          startY: currY,
        });
        return;
      }
      index++;
    }
  }
};

// Loop thru all rows
for (let x = 0; x < grid.length; x++) {
  // Loop thru all columns
  for (let y = 0; y < grid[x].length; y++) {
    // Check each word in our wordlist
    words.forEach((word) => {
      // If we found a letter than matches one of the words
      if (x !== 0 || y !== 5) return;
      if (word.charAt(0) === grid[x][y]) {
        console.log("Found", word.charAt(0), "at", x, y, "Checking word", word);
        // check(word, x, y, 0, 1);
        // check(word, x, y, 0, -1);
        // check(word, x, y, 1, 0);
        // check(word, x, y, -1, 0);
        // check(word, x, y, 1, 1);
        // check(word, x, y, 1, -1);
        // check(word, x, y, -1, 1);
        // check(word, x, y, -1, -1);
        // check(word, x, y, -1, 0);
        check(word, x, y, 1, 1);
      }
    });
    // console.log("GRID", val);
  }
}

console.log(grid);

console.log(answers);
console.log(answers.length);

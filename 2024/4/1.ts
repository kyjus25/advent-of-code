const file = await Bun.file("input.txt").text();
// Split the input file into a grid of characters
const grid = file
  .split("\n")
  .filter((row) => row.trim() !== "")
  .map((i) => i.split(""));

interface Answer {
  word: string;
  direction:
    | "left"
    | "right"
    | "up"
    | "down"
    | "diagonalDownRight"
    | "diagonalDownLeft"
    | "diagonalUpRight"
    | "diagonalUpLeft"
    | "unknown";
  startX: number; // Starting X coordinate
  startY: number; // Starting Y coordinate
}

// List of words to search for
const words: string[] = ["XMAS"];
let answers: Answer[] = [];

// Function to determine the direction based on dirX and dirY
const getDirection = (dirX: number, dirY: number) => {
  if (dirX === 0 && dirY === 1) return "right"; // Moving right
  if (dirX === 0 && dirY === -1) return "left"; // Moving left
  if (dirX === 1 && dirY === 0) return "down"; // Moving down
  if (dirX === -1 && dirY === 0) return "up"; // Moving up
  if (dirX === 1 && dirY === 1) return "diagonalDownRight"; // Moving diagonally down-right
  if (dirX === 1 && dirY === -1) return "diagonalDownLeft"; // Moving diagonally down-left
  if (dirX === -1 && dirY === 1) return "diagonalUpRight"; // Moving diagonally up-right
  if (dirX === -1 && dirY === -1) return "diagonalUpLeft"; // Moving diagonally up-left
  return "unknown"; // Unknown direction
};

// Function to check for a word in a given direction
const check = (
  word: string,
  currX: number, // Current X position
  currY: number, // Current Y position
  dirX: number, // Direction along the X axis
  dirY: number // Direction along the Y axis
) => {
  // Loop through each character in the word
  for (let i = 0; i < word.length; i++) {
    // Calculate the new position
    const newX = currX + i * dirX;
    const newY = currY + i * dirY;

    // Ensure the position is within bounds
    if (
      newX < 0 ||
      newX >= grid.length ||
      newY < 0 ||
      newY >= grid[newX].length
    )
      return;

    // Check if the character matches
    if (grid[newX][newY] !== word.charAt(i)) return;

    // If we reach the last character, add the word to answers
    if (i === word.length - 1) {
      answers.push({
        word: word,
        direction: getDirection(dirX, dirY), // Determine direction
        startX: currX, // Starting X coordinate
        startY: currY, // Starting Y coordinate
      });
    }
  }
};

// Loop through all rows in the grid
for (let x = 0; x < grid.length; x++) {
  // Loop through all columns in the grid
  for (let y = 0; y < grid[x].length; y++) {
    // Check each word in the word list
    words.forEach((word) => {
      // If the first letter of the word matches the current cell
      if (word.charAt(0) === grid[x][y]) {
        console.log("Found", word.charAt(0), "at", x, y, "Checking word", word);

        // Check in all possible directions
        check(word, x, y, 0, 1); // Right
        check(word, x, y, 0, -1); // Left
        check(word, x, y, 1, 0); // Down
        check(word, x, y, -1, 0); // Up
        check(word, x, y, 1, 1); // Diagonal down-right
        check(word, x, y, 1, -1); // Diagonal down-left
        check(word, x, y, -1, 1); // Diagonal up-right
        check(word, x, y, -1, -1); // Diagonal up-left
      }
    });
  }
}

// Log the final results
console.log(grid); // Display the grid
console.log(answers); // Display the found words and their details
console.log(answers.length); // Display the total number of found words

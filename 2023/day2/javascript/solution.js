import fs from 'fs'
const file = fs.readFileSync('input.txt', 'utf8')
const lines = file.split('\n')

const maxAmount = {
  red: 12,
  green: 13,
  blue: 14
}

let ids = new Set()

lines.map((line) => {
  const [game, rest] = line.split(':');

  const [_, gameId] = game.split(' ')
  let addToSum = true
  rest.split(';').forEach((round) => {
    const split = round.trim().split(' ')

    for (let i = 0; i < split.length; i += 2) {
      const value = parseInt(split[i])
      const key = split[i + 1].split(',')[0]

      if (maxAmount[key] < value) {
        addToSum = false
      }
    }
  })
  if (addToSum) {
    ids.add(gameId)
  }
})

const idsList = [...ids];

let sum = 0
for (let i = 0; i < idsList.length; i += 1) {
  sum += parseInt(idsList[i])
}

console.log(`part 1a: ${sum}`)


// ________________________________________________________
import { readFileSync } from 'fs';

export const asLines = (fname) => {
  return readFileSync(fname).toString()
    .split('\n')
    .filter((l) => l.length > 0);
}
const getGames = () => {
  return asLines('./input.txt').map(line => toGame(line));
};

const toGame = (line) => {
  const [gameStr, setsStr] = line.split(':');
  const id = parseInt(gameStr.split(' ')[1]);
  const sets = setsStr.split(';').map(setStr => {
    const set = {};
    const colors = setStr.split(',');
    colors.forEach(color => {
      const [count, colorName] = color.trim().split(' ');
      set[colorName] = parseInt(count);
    });
    return set;
  });
  return { id, sets };
};

const isPossibleGame = (game, red, green, blue) => {
  return game.sets.filter(set => !isPossibleSet(set, red, green, blue)).length === 0;
};

const isPossibleSet = (set, red, green, blue) => {
  return (set.red || 0) <= red && (set.green || 0) <= green && (set.blue || 0) <= blue;
}

const minimumSet = (sets) => {
  const red = sets.reduce((min, set) => Math.max(min, set.red || 0), 0);
  const green = sets.reduce((min, set) => Math.max(min, set.green || 0), 0);
  const blue = sets.reduce((min, set) => Math.max(min, set.blue || 0), 0);
  return { red, green, blue };
};

const sum1 = getGames()
  .filter(game => isPossibleGame(game, 12, 13, 14))
  .map(game => game.id)
  .reduce((a, b) => a + b, 0);

console.log(`part 1b: ${sum1}`);

const sum2 = getGames()
  .map(game => minimumSet(game.sets))
  .map(minSet => minSet.red * minSet.green * minSet.blue)
  .reduce((a, b) => a + b, 0);

console.log(`part 2b: ${sum2}`);
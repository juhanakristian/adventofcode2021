const input = await Deno.readTextFile(Deno.args[0]);
const iterations = Deno.args[1] ? parseInt(Deno.args[1]) : 10;

const [template, lines] = input.split("\n\n");

const instructions = new Map<string, string>();

for (const line of lines.split("\n")) {
  const [pair, character] = line.split(" -> ");
  instructions.set(pair, character);
}

console.log(template, instructions);

const letters = new Map<string, number>();
let pairs = new Map<string, number>();

for (let i = 0; i < template.length - 1; i++) {
  const pair = template.substring(i, i + 2);
  pairs.set(pair, (pairs.get(pair) || 0) + 1);
}

for (const letter of template) {
  const count = letters.get(letter) || 0;
  letters.set(letter, count + 1);
}

console.log(pairs);
console.log(letters);
for (let i = 0; i < iterations; i++) {
  const newPairs = new Map<string, number>();
  for (const [pair, value] of pairs.entries()) {
    const character = instructions.get(pair) as string;

    const newPair1 = pair[0] + character;
    const existingCount1 = newPairs.get(newPair1) || 0;
    newPairs.set(newPair1, value + existingCount1);

    const newPair2 = character + pair[1];
    const existingCount2 = newPairs.get(newPair2) || 0;
    newPairs.set(newPair2, value + existingCount2);

    letters.set(character, (letters.get(character) || 0) + value);
  }
  pairs = newPairs;
}

// console.log(pairs);

const sorted = [...letters.entries()].sort((a, b) => b[1] - a[1]);
console.log(sorted);
console.log(sorted[0][1] - sorted[sorted.length - 1][1]);

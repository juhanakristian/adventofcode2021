const input = await Deno.readTextFile(Deno.args[0]);

const lines = input.split("\n");

const width = lines[0].length;
const height = lines.length;

const positions = lines
  .map((l) => l.split(""))
  .flat()
  .map(Number);
console.log(positions);

let riskSum = 0;
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const index = y * width + x;
    const left = x > 0 ? positions[index - 1] : Infinity;
    const up = y > 0 ? positions[index - width] : Infinity;
    const right = x < width - 1 ? positions[index + 1] : Infinity;
    const down = y < height - 1 ? positions[index + width] : Infinity;

    const value = positions[index];
    if (value < left && value < up && value < right && value < down) {
      riskSum += value + 1;
    }
  }
}

console.log(`Low points: ${riskSum}`);

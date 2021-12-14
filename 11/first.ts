const input = await Deno.readTextFile(Deno.args[0]);

const lines = input.split("\n");

const width = lines[0].length;
const height = lines.length;

let octopuses = lines
  .map((line) => line.split("").map((num) => parseInt(num)))
  .flat();

console.log(octopuses);
console.log(width, height);

function increaseEnergy(octopuses: number[]) {
  return octopuses.map((num) => num + 1);
}

function increaseEnergyAt(x: number, y: number, octopuses: number[]) {
  if (x < 0) return octopuses;
  if (x > width - 1) return octopuses;
  if (y < 0) return octopuses;
  if (y > height - 1) return octopuses;

  const index = x + y * width;
  octopuses[index] += 1;
  return octopuses;
}

function flash(x: number, y: number, octopuses: number[]) {
  octopuses = increaseEnergyAt(x - 1, y, octopuses);
  octopuses = increaseEnergyAt(x - 1, y - 1, octopuses);
  octopuses = increaseEnergyAt(x, y - 1, octopuses);
  octopuses = increaseEnergyAt(x + 1, y - 1, octopuses);
  octopuses = increaseEnergyAt(x + 1, y, octopuses);
  octopuses = increaseEnergyAt(x + 1, y + 1, octopuses);
  octopuses = increaseEnergyAt(x, y + 1, octopuses);
  octopuses = increaseEnergyAt(x - 1, y + 1, octopuses);
  return octopuses;
}

let count = 0;
for (let i = 0; i < 100; i++) {
  octopuses = increaseEnergy(octopuses);

  let flashed: string[] = [];
  while (true) {
    let flashCount = 0;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const key = `${x},${y}`;
        if (octopuses[x + y * width] > 9 && !flashed.includes(key)) {
          octopuses = flash(x, y, octopuses);
          flashed.push(key);
          flashCount++;
        }
      }
    }

    if (flashCount === 0) break;
  }

  for (const point of flashed) {
    const [x, y] = point.split(",").map((num) => parseInt(num));
    const index = x + y * width;
    octopuses[index] = 0;
  }
  count += flashed.length;
  flashed = [];
}

console.log(count);

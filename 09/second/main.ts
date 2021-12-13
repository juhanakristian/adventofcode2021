const input = await Deno.readTextFile(Deno.args[0]);

const lines = input.split("\n");

const width = lines[0].length;
const height = lines.length;

const positions = lines
  .map((l) => l.split(""))
  .flat()
  .map(Number);
console.log(positions);

interface Point {
  x: number;
  y: number;
}

let visited = new Set<string>();

function basinAt(
  x: number,
  y: number,
  positions: number[],
  width: number,
  height: number,
  result: Point[]
): Point[] {
  const key = `${x},${y}`;
  if (visited.has(key)) return result;

  visited.add(key);

  result.push({ x, y });
  const index = y * width + x;

  const left = x > 0 ? positions[index - 1] : -Infinity;
  const up = y > 0 ? positions[index - width] : -Infinity;
  const right = x < width - 1 ? positions[index + 1] : -Infinity;
  const down = y < height - 1 ? positions[index + width] : -Infinity;

  if (left > positions[index] && left < 9) {
    result = basinAt(x - 1, y, positions, width, height, result);
  }

  if (up > positions[index] && up < 9) {
    result = basinAt(x, y - 1, positions, width, height, result);
  }

  if (right > positions[index] && right < 9) {
    result = basinAt(x + 1, y, positions, width, height, result);
  }

  if (down > positions[index] && down < 9) {
    result = basinAt(x, y + 1, positions, width, height, result);
  }

  return result;
}

const basins: Point[][] = [];
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const index = y * width + x;
    const left = x > 0 ? positions[index - 1] : Infinity;
    const up = y > 0 ? positions[index - width] : Infinity;
    const right = x < width - 1 ? positions[index + 1] : Infinity;
    const down = y < height - 1 ? positions[index + width] : Infinity;

    const value = positions[index];
    if (value < left && value < up && value < right && value < down) {
      basins.push(basinAt(x, y, positions, width, height, []));
    }
  }
}

basins.sort((a, b) => b.length - a.length);

const result = basins[0].length * basins[1].length * basins[2].length;

console.log(`Result: ${result}`);

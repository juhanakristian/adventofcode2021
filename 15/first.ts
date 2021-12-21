const input = await Deno.readTextFile(Deno.args[0]);

const map = input
  .split("\n")
  .map((line) => line.split("").map((c) => parseInt(c)));

const width = map[0].length;
const height = map.length;
console.log(width, height);

interface Point {
  x: number;
  y: number;
}

function isValid(point: Point) {
  if (point.x < 0 || point.y < 0 || point.x >= width || point.y >= height) {
    return false;
  }

  return true;
}

function neighbours(point: Point) {
  const candidates = [
    { x: point.x, y: point.y - 1 },
    { x: point.x, y: point.y + 1 },
    { x: point.x - 1, y: point.y },
    { x: point.x + 1, y: point.y },
  ];

  return candidates.filter((c) => isValid(c));
}

function djikstra(map: number[][], start: Point) {
  const available = new Set<string>();
  const distances = new Map();
  const previous = new Map();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      available.add(`${x}, ${y}`);
      distances.set(`${x}, ${y}`, Infinity);
      previous.set(`${x}, ${y}`, null);
    }
  }

  distances.set(`0, 0`, 0);
  console.log(available);

  while (available.size > 0) {
    const current: string = Array.from(available).sort(
      (a, b) => distances.get(a) - distances.get(b)
    )[0];
    available.delete(current);

    const point = {
      x: parseInt(current.split(", ")[0]),
      y: parseInt(current.split(", ")[1]),
    };
    const n = neighbours(point);
    console.log(n);
    for (const neighbour of n.filter((n: Point) =>
      available.has(`${n.x}, ${n.y}`)
    )) {
      const newDistance =
        distances.get(`${point.x}, ${point.y}`) + map[neighbour.y][neighbour.x];
      console.log(neighbour);
      if (newDistance < distances.get(`${neighbour.x}, ${neighbour.y}`)) {
        distances.set(`${neighbour.x}, ${neighbour.y}`, newDistance);
        previous.set(`${neighbour.x}, ${neighbour.y}`, current);
      }
    }
  }

  return { distances, previous };
}

console.log(map);
const { distances, previous } = djikstra(map, { x: 0, y: 0 });
const end = { x: width - 1, y: height - 1 };
console.log(distances.get(`${end.x}, ${end.y}`));

const input = await Deno.readTextFile(Deno.args[0]);

const map = input
  .split("\n")
  .map((line) => line.split("").map((c) => parseInt(c)));

const width = map[0].length;
const height = map.length;
// console.log(width, height);

interface Point {
  x: number;
  y: number;
}

function isValid(point: Point, width: number, height: number) {
  if (point.x < 0 || point.y < 0 || point.x >= width || point.y >= height) {
    return false;
  }

  return true;
}

function neighbours(point: Point, width: number, height: number) {
  const candidates = [
    { x: point.x, y: point.y - 1 },
    { x: point.x, y: point.y + 1 },
    { x: point.x - 1, y: point.y },
    { x: point.x + 1, y: point.y },
  ];

  return candidates.filter((c) => isValid(c, width, height));
}

function djikstra(
  map: number[][],
  start: Point,
  width: number,
  height: number
) {
  let available: string[] = [];
  const distances = new Map();
  const previous = new Map();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // available.add(`${x}, ${y}`);
      available.push(`${x}, ${y}`);
      distances.set(`${x}, ${y}`, Infinity);
      previous.set(`${x}, ${y}`, null);
    }
  }

  distances.set(`0, 0`, 0);
  // console.log(available);

  const removed = new Set<string>();
  while (available.length > 0) {
    available.sort((a, b) => distances.get(a) - distances.get(b));

    if (available.length === 0) break;
    const current: string = available.shift() as string;
    removed.add(current);

    const point = {
      x: parseInt(current.split(", ")[0]),
      y: parseInt(current.split(", ")[1]),
    };
    const n = neighbours(point, width, height);
    for (const neighbour of n.filter(
      (n: Point) => !removed.has(`${n.x}, ${n.y}`)
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

let expandedMap = [];
for (let i = 0; i < width; i++) {
  const row = map[i].slice();
  const length = row.length;
  for (let j = 0; j < 4; j++) {
    for (let k = 0; k < length; k++) {
      const value = (row[k + j * length] + 1) % 10;
      row.push(value === 0 ? 1 : value);
    }
  }
  expandedMap.push(row);
}

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < height; j++) {
    const row: number[] = expandedMap[i * height + j].map((c: number) => {
      const value = (c + 1) % 10;
      return value === 0 ? 1 : value;
    });
    expandedMap.push(row);
  }
}

// console.log(expandedMap[0]);
// console.log(expandedMap[expandedMap.length - 1]);

// console.log(map);
const expandedWidth = 5 * width;
const expandedHeight = 5 * height;
const { distances, previous } = djikstra(
  expandedMap,
  { x: 0, y: 0 },
  expandedWidth,
  expandedHeight
);
const end = { x: expandedWidth - 1, y: expandedHeight - 1 };
console.log(distances.get(`${end.x}, ${end.y}`));

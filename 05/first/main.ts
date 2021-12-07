const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n").filter((line) => line.trim().length > 0);

interface Point {
  x: number;
  y: number;
}

function valuesBetween(start: number, end: number) {
  const values = [];

  for (let i = Math.min(start, end); i <= Math.max(end, start); i++) {
    values.push(i);
  }
  return values;
}

function getPoints(line: string): Point[] {
  const [start, end] = line.trim().split("->");
  console.log(line);
  const [x1, y1] = start.trim().split(",").map(Number);
  const [x2, y2] = end.trim().split(",").map(Number);

  if (x1 === x2) {
    return valuesBetween(y1, y2).map((y) => ({ x: x1, y }));
  } else if (y1 === y2) {
    return valuesBetween(x1, x2).map((x) => ({ x, y: y1 }));
  }

  return [];
}

const map: { [key: string]: number } = {};
for (const line of lines) {
  const points = getPoints(line);
  for (const point of points) {
    const value = map[`${point.x},${point.y}`] ?? 0;
    map[`${point.x},${point.y}`] = value + 1;
  }
}

let count = 0;
for (const key in map) {
  if (map[key] > 1) {
    count++;
  }
}

console.log(count);

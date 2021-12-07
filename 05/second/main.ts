const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n").filter((line) => line.trim().length > 0);

interface Point {
  x: number;
  y: number;
}

function valuesBetween(start: Point, end: Point): Point[] {
  const values = [];
  const step = 1;
  let x = start.x;
  let y = start.y;
  while (x !== end.x || y !== end.y) {
    values.push({ x, y });
    x += step * Math.sign(end.x - start.x);
    y += step * Math.sign(end.y - start.y);
  }

  values.push({ x: end.x, y: end.y });

  return values;
}

function getPoints(line: string): Point[] {
  const [start, end] = line.trim().split("->");
  console.log(line);
  const [x1, y1] = start.trim().split(",").map(Number);
  const [x2, y2] = end.trim().split(",").map(Number);

  return valuesBetween({ x: x1, y: y1 }, { x: x2, y: y2 });
}

const map: { [key: string]: number } = {};
for (const line of lines) {
  const points = getPoints(line);
  console.log(line);
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

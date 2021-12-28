const input = await Deno.readTextFile(Deno.args[0]);

const ranges = input
  .replace("target area: ", "")
  .split(",")
  .map((a) => a.split("=")[1])
  .map((a) => a.split("..").map(Number));

const start = [0, 0];

function inTarget(x: number, y: number) {
  const [x1, x2] = ranges[0];
  const [y1, y2] = ranges[1];
  return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

function checkHit(
  x: number,
  y: number
): number[][] | "overshoot" | "undershoot" {
  const point = [0, 0];
  const velocity = [x, y];
  const trajectory = [point.slice()];
  while (true) {
    point[0] += velocity[0];
    point[1] += velocity[1];

    trajectory.push(point.slice());

    if (velocity[0] !== 0)
      velocity[0] = (Math.abs(velocity[0]) - 1) * (velocity[0] < 0 ? -1 : 1);
    velocity[1]--;

    if (inTarget(point[0], point[1])) {
      return trajectory;
    }

    if (point[1] < ranges[1][0]) {
      if (point[0] > ranges[0][1]) {
        return "overshoot";
      } else {
        return "undershoot";
      }
    }
  }
}

const scanRange = [
  [-1000, 1000],
  [-1000, 1000],
];

let top = -Infinity;
let results = [];
for (let x = scanRange[0][0]; x < scanRange[0][1]; x++) {
  for (let y = scanRange[1][0]; y < scanRange[1][1]; y++) {
    const hit = checkHit(x, y);
    if (hit === "overshoot" || hit === "undershoot") {
      continue;
    }

    results.push([x, y]);
  }
}

// console.log(top);
console.log(results.length);

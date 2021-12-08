const input = await Deno.readTextFile("input.txt");

const positions = input.split(",").map(Number);

function median(a: number[]) {
  const mid = Math.floor(a.length / 2);
  const nums = [...a].sort((a, b) => a - b);
  return a.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

// const optimal = median(positions)
const optimal = positions.sort((a, b) => a - b)[
  Math.floor(positions.length / 2)
];
console.log(positions);
console.log(`Optimal position ${optimal}`);

let fuelCost = 0;
for (let i = 0; i < positions.length; i++) {
  // console.log(`Move from ${positions[i]} to ${median}`);
  // console.log(`Cost ${Math.abs(positions[i] - median)}`);
  fuelCost += Math.abs(optimal - positions[i]);
}

console.log(`Fuel cost ${fuelCost}`);

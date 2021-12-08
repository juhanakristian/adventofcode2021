const input = await Deno.readTextFile("input.txt");

const positions = input.split(",").map(Number);

const optimal = positions.sort((a, b) => a - b)[
  Math.floor(positions.length / 2)
];

console.log(`Optimal position ${optimal}`);

let fuelCost = 0;
for (let i = 0; i < positions.length; i++) {
  fuelCost += Math.abs(optimal - positions[i]);
}

console.log(`Fuel cost ${fuelCost}`);

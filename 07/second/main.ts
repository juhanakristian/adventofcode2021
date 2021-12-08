const input = await Deno.readTextFile("input.txt");

const positions = input.split(",").map(Number);

function costBetween(from: number, to: number): number {
  const distance = Math.abs(from - to);
  return [...Array(distance + 1).keys()].reduce((a, v) => a + v, 0);
}

const all = [...Array(Math.max(...positions) + 1).keys()];

let minimumCost = Infinity;
let minimumCostPosition = 0;
for (let i = 0; i < all.length; i++) {
  const currentPosition = all[i];
  let cost = 0;
  for (let j = 0; j < positions.length; j++) {
    cost += costBetween(currentPosition, positions[j]);
  }

  if (cost < minimumCost) {
    minimumCost = cost;
    minimumCostPosition = currentPosition;
  }
}

console.log(`Optimal position ${minimumCostPosition}`);
console.log(`Fuel cost ${minimumCost}`);

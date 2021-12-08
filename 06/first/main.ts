const input = await Deno.readTextFile("input.txt");

const lanterfish = input.split(",").map(Number);

for (let i = 0; i < 80; i++) {
  let birthCount = 0;
  console.log(`${i} ${lanterfish.length}`);
  for (let j = 0; j < lanterfish.length; j++) {
    const value = lanterfish[j] - 1;
    if (value < 0) {
      birthCount++;
    }

    lanterfish[j] = value >= 0 ? value : 6;
  }

  for (let j = 0; j < birthCount; j++) {
    lanterfish.push(8);
  }
}

console.log(`Number of fish: ${lanterfish.length}`);

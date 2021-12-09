const input = await Deno.readTextFile("input.txt");

const signals = input
  .split("\n")
  .map((line) => line.split("|"))
  .map((line) => {
    return {
      output: line[1].trim().split(" "),
      patterns: line[0]
        .trim()
        .split(" ")
        .sort((a, b) => a.length - b.length),
    };
  });

function isSubset(a: string, b: string) {
  const chars = a.split("");
  while (chars.length > 0) {
    if (!b.includes(chars[0])) return false;
    chars.shift();
  }

  return a.length === b.length;
}

let count = 0;
for (const signal of signals) {
  const one = signal.patterns.find((pattern) => pattern.length === 2);
  const seven = signal.patterns.find((pattern) => pattern.length === 3);
  const four = signal.patterns.find((pattern) => pattern.length === 4);
  const eight = signal.patterns.find((pattern) => pattern.length === 7);

  if (!one || !seven || !four || !eight) continue;

  for (const output of signal.output) {
    if (
      isSubset(output, one) ||
      isSubset(output, seven) ||
      isSubset(output, four) ||
      isSubset(output, eight)
    ) {
      count++;
    }
  }
}

console.log(`Count ${count}`);

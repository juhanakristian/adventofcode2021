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

function substract(a: string, b: string) {
  return a.replace(new RegExp(`[${b}]`, "g"), "");
}

let sum = 0;
for (const signal of signals) {
  const one = signal.patterns.find((pattern) => pattern.length === 2);
  const seven = signal.patterns.find((pattern) => pattern.length === 3);
  const four = signal.patterns.find((pattern) => pattern.length === 4);
  const eight = signal.patterns.find((pattern) => pattern.length === 7);

  if (!one || !seven || !four || !eight) continue;

  const cIndex =
    signal.patterns.filter((pattern) => pattern.includes(one[0])).length === 8
      ? 0
      : 1;
  const c = one[cIndex];
  const f = substract(one, c);

  const a = substract(seven, one);
  const g = signal.patterns
    .map((pattern) => substract(pattern, four + a))
    .find((p) => p.length === 1);
  const e = substract(eight, four + a + g);

  const d = signal.patterns
    .filter((p) => p !== seven)
    .filter((p) => p !== one)
    .map((p) => substract(p, a + c + e + g))
    .find((p) => p.length === 1);

  const b = substract(four, one + d);

  const numbers = [
    a + b + c + e + f + g,
    c + f,
    a + c + d + e + g,
    a + c + d + f + g,
    b + d + c + f,
    a + b + d + f + g,
    a + b + d + e + f + g,
    a + c + f,
    a + b + c + d + e + f + g,
    a + b + c + d + f + g,
  ];

  let result = "";
  for (const output of signal.output) {
    for (let i = 0; i < numbers.length; i++) {
      if (isSubset(output, numbers[i])) {
        result += `${i}`;
        break;
      }
    }
  }
  console.log(`Output ${signal.output.join(" ")} Result ${result}`);

  sum += parseInt(result);
}

console.log(`Sum ${sum}`);

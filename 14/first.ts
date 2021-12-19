const input = await Deno.readTextFile(Deno.args[0]);
const iterations = Deno.args[1] ? parseInt(Deno.args[1]) : 10;

const [template, lines] = input.split("\n\n");

const instructions = new Map<string, string>();

for (const line of lines.split("\n")) {
  const [pair, character] = line.split(" -> ");
  instructions.set(pair, character);
}

console.log(template, instructions);

function expand(template: string, instructions: Map<string, string>): string {
  let result = ""; //template.slice();
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.substring(i, i + 2);
    const character = instructions.get(pair);
    result += pair[0] + character;
  }

  return result + template[template.length - 1];
}

let result = template;
for (let i = 0; i < iterations; i++) {
  result = expand(result, instructions);
}

const counts = new Map<string, number>();
for (let i = 0; i < result.length; i++) {
  const count = counts.get(result[i]) || 0;
  counts.set(result[i], count + 1);
}
const sorted = new Array(...counts.entries()).sort(
  (a: any, b: any) => b[1] - a[1]
);
console.log(sorted);

console.log(sorted[0][1] - sorted[sorted.length - 1][1]);

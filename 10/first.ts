const input = await Deno.readTextFile(Deno.args[0]);

const lines = input.split("\n");

let sum = 0;

function traverse(line: string[], stack: string[]): void {
  const symbol = line.shift();
  if (symbol === undefined) {
    return;
  }

  if (symbol.match(/[\(\[\{\<]/)) stack.push(symbol);

  if (symbol.match(/[\)\]\}\>]/)) {
    const last = stack.pop();
    if (last === undefined) {
      throw new Error("Invalid input");
    }

    if (!`${last}${symbol}`.match(/\[\]|\(\)|\{\}|\<\>/)) {
      if (symbol === "}") {
        sum += 1197;
      } else if (symbol === "]") {
        sum += 57;
      } else if (symbol === ")") {
        sum += 3;
      } else if (symbol === ">") {
        sum += 25137;
      }
      console.log("Syntax error at ", stack.length);
      console.log(`${last}${symbol}`);
      return;
    }
  }

  return traverse(line, stack);
}

for (const line of lines) {
  traverse(line.split(""), []);
}

console.log(sum);

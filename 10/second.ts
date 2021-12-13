const input = await Deno.readTextFile(Deno.args[0]);

const lines = input.split("\n");

const sums: number[] = [];

function complete(stack: string[], sum: number): number {
  if (stack.length === 0) return sum;

  const last = stack.pop();
  if (last === "(") {
    sum = sum * 5 + 1;
  } else if (last === "[") {
    sum = sum * 5 + 2;
  } else if (last === "{") {
    sum = sum * 5 + 3;
  } else if (last === "<") {
    sum = sum * 5 + 4;
  }

  return complete(stack, sum);
}

function traverse(line: string[], stack: string[]): void {
  const symbol = line.shift();
  if (symbol === undefined) {
    sums.push(complete(stack, 0));
    return;
  }

  if (symbol.match(/[\(\[\{\<]/)) stack.push(symbol);

  if (symbol.match(/[\)\]\}\>]/)) {
    const last = stack.pop();
    if (last === undefined) {
      throw new Error("Invalid input");
    }

    if (!`${last}${symbol}`.match(/\[\]|\(\)|\{\}|\<\>/)) {
      return;
    }
  }

  return traverse(line, stack);
}

for (const line of lines) {
  traverse(line.split(""), []);
}

sums.sort((a, b) => a - b);

console.log(sums[Math.floor(sums.length / 2)]);

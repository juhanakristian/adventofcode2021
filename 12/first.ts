const input = await Deno.readTextFile(Deno.args[0]);

const lines = input.split("\n");

const nodes = new Map<string, Set<string>>();

for (const line of lines) {
  const [first, second] = line.split("-");
  const firstSet = nodes.get(first) || new Set<string>();
  firstSet.add(second);
  nodes.set(first, firstSet);

  const secondSet = nodes.get(second) || new Set<string>();
  secondSet.add(first);
  nodes.set(second, secondSet);
}

function traverse(
  node: string,
  visited: string[],
  paths: string[][]
): string[][] {
  const children = nodes.get(node) || new Set<string>();
  const visitedNew = visited.slice();
  let pathsNew = paths.slice();

  visitedNew.push(node);
  if (node === "end") {
    pathsNew.push(visitedNew);
    return pathsNew;
  }

  for (const child of children) {
    if (child.toUpperCase() !== child && visitedNew.includes(child)) continue;
    pathsNew = traverse(child, visitedNew, pathsNew);
  }

  return pathsNew;
}

const paths = traverse("start", [], []);

console.log(paths.length);

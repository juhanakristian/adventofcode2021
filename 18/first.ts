const input = await Deno.readTextFile(Deno.args[0]);

interface Node {
  left?: Node;
  right?: Node;
  parent: Node | null;
  value?: number;
}

function parseNode(input: any, parent: Node | null = null): Node {
  const left = input[0];
  const right = input[1];

  if (!isNaN(Number(input))) {
    return {
      value: Number(input),
      parent,
    };
  }

  const node: Node = {
    parent,
  };

  node.left = parseNode(left, node);
  node.right = parseNode(right, node);
  return node;
}

function first(
  node: Node | undefined,
  child: "left" | "right"
): Node | undefined {
  if (!node) return node;

  if (node.value !== undefined) {
    return node;
  }

  return first(node[child] as Node, child);
}

function addToLeft(node: Node, value: number) {
  let previous = node;
  let current = node.parent;
  while (true) {
    if (current && current.left !== previous) {
      const leftToAdd = first(current.left, "right");
      if (leftToAdd) leftToAdd.value = (leftToAdd.value ?? 0) + value;
      break;
    }

    if (!current?.parent) break;

    previous = current;
    current = current.parent;
  }
}

function addToRight(node: Node, value: number) {
  let previous = node;
  let current = node.parent;
  while (true) {
    if (current && current.right !== previous) {
      const add = first(current.right, "left");
      if (add) add.value = (add.value ?? 0) + value;
      break;
    }

    if (!current?.parent) break;

    previous = current;
    current = current.parent;
  }
}

function explode(node: Node) {
  const left = node.left?.value ?? 0;
  const right = node.right?.value ?? 0;

  addToRight(node, right);
  addToLeft(node, left);

  node.left = undefined;
  node.right = undefined;
  node.value = 0;
}

function split(node: Node) {
  const value = node.value ?? 0;

  node.left = {
    value: Math.floor(value / 2),
    parent: node,
  };
  node.right = {
    value: Math.ceil(value / 2),
    parent: node,
  };

  node.value = undefined;
}

function add(left: Node, right: Node) {
  const root = {
    left,
    right,
    parent: null,
  };

  left.parent = root;
  right.parent = root;
  return root;
}

function reduce(node: Node, depth: number): boolean {
  if (depth > 3 && node.value === undefined) {
    explode(node);
    return false;
  }

  if (node.value === undefined) {
    if (!reduce(node.left as Node, depth + 1)) return false;
    if (!reduce(node.right as Node, depth + 1)) return false;
  }

  // if (node.value !== undefined && node.value >= 10) {
  //   split(node);
  //   return false;
  // }

  return true;
}

function reduceS(node: Node, depth: number): boolean {
  if (node.value !== undefined && node.value >= 10) {
    split(node);
    return false;
  }

  if (node.value === undefined) {
    if (!reduceS(node.left as Node, depth + 1)) return false;
    if (!reduceS(node.right as Node, depth + 1)) return false;
  }

  return true;
}

function printNode(node?: Node): string {
  if (!node) return "";
  if (node.value !== undefined) {
    return `${node.value}`;
  }

  return `[${printNode(node.left)}, ${printNode(node.right)}]`;
}

function magnitude(node: Node): number {
  if (node.value !== undefined) return node.value;

  return magnitude(node.left as Node) * 3 + magnitude(node.right as Node) * 2;
}

const lines = input.split("\n").map((line) => JSON.parse(line.trim()));

let result = parseNode(lines[0]);
for (let i = 1; i < lines.length; i++) {
  const node = parseNode(lines[i]);
  console.log(printNode(result) + " + " + printNode(node));
  result = add(result, node);
  let r = false;
  let s = false;
  while (!r || !s) {
    r = reduce(result, 0);
    if (r) s = reduceS(result, 0);
  }
  console.log(printNode(result) + "\n");
}
console.log("RESULT");
console.log(printNode(result));

console.log("MAGNITUDE", magnitude(result));

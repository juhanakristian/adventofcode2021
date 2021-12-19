const input = await Deno.readTextFile(Deno.args[0]);

const [p, f] = input.split(/^\s*$/gm);

type Axis = "x" | "y";

const points = p
  .split("\n")
  .filter((l) => l.length !== 0)
  .map((p) => p.split(",").map((p) => parseInt(p)));
const folds: { axis: Axis; position: number }[] = f
  .split("\n")
  .filter((l) => l.length !== 0)
  .map((f) => {
    console.log("line", f);
    const axis = f.match(/\w=/)?.[0].replace("=", "") as Axis;
    const position = parseInt(f.match(/\d+/)?.[0] ?? "");
    return { axis, position };
  });

const maxX = Math.max(...points.map((p) => p[0])) + 1;
const maxY = Math.max(...points.map((p) => p[1])) + 1;
const paper = new Array(maxX * maxY).fill(0);

for (const point of points) {
  paper[point[0] + point[1] * maxX] = 1;
}

console.log(maxX, maxY);
console.log(paper);
console.log(folds);

interface Size {
  x: number;
  y: number;
}

function foldPaper(
  paper: number[],
  size: Size,
  axis: "x" | "y",
  position: number
) {
  // calculate new size after fold
  const newSize: Size = {
    ...size,
    [axis]: size[axis] - position - 1,
  };

  // create new paper
  const newPaper = new Array(newSize.x * newSize.y).fill(0);

  // copy old paper to new paper
  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      newPaper[x + y * newSize.x] = paper[x + y * size.x];
      if (axis === "x" && x >= position) {
        break;
      }
    }
    if (axis === "y" && y >= position) {
      break;
    }
  }

  // place points on the other side of the fold
  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      if (axis == "x" && x >= position) {
        newPaper[Math.abs(x - position - newSize.x) + y * newSize.x] +=
          paper[x + y * size.x];
      } else if (axis === "y" && y >= position) {
        newPaper[x + Math.abs(y - position - newSize.y) * newSize.x] +=
          paper[x + y * size.x];
      }
    }
  }

  return { newPaper, newSize };
}

function printPaper(paper: number[], size: Size) {
  for (let y = 0; y < size.y; y++) {
    let row = "";
    for (let x = 0; x < size.x; x++) {
      row += paper[x + y * size.x] ? "#" : ".";
    }
    console.log(row);
  }
}

let paperCopy = [...paper];
let sizeCopy = { x: maxX, y: maxY };
for (const fold of folds) {
  const { newPaper, newSize } = foldPaper(
    paperCopy,
    sizeCopy,
    fold.axis,
    fold.position
  );
  paperCopy = [...newPaper];
  sizeCopy = { ...newSize };
}

printPaper(paperCopy, sizeCopy);
console.log(paperCopy.filter((v) => v > 0).length);

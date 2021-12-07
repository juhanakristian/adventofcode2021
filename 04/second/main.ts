const input = await Deno.readTextFile("input.txt");

const contents = input.split(/^s*$/m);

const numbers = contents[0].trim().split(",");
console.log(numbers);

const cards: string[][] = [];
for (let i = 1; i < contents.length; i++) {
  const card = contents[i].trim();
  cards.push(
    card
      .split("\n")
      .join(" ")
      .split(" ")
      .filter((c) => c.length > 0)
  );
}

console.log(cards);

function getRow(index: number, card: string[]) {
  return card.slice(index * 5, index * 5 + 5);
}

function getColumn(index: number, card: string[]) {
  return [
    card[index],
    card[index + 5],
    card[index + 10],
    card[index + 15],
    card[index + 20],
  ];
}

function hasBingo(
  index: number,
  cards: string[][],
  numbers: string[]
): boolean {
  const card = cards[index];

  for (let i = 0; i < 5; i++) {
    const row = getRow(i, card);
    if (row.every((c) => numbers.includes(c))) return true;
    const column = getColumn(i, card);
    if (column.every((c) => numbers.includes(c))) return true;
  }

  return false;
}

const drawn: string[] = [];
const removedBoards: number[] = [];
for (let i = 0; i < numbers.length; i++) {
  const number = numbers[i];

  drawn.push(number);
  for (let a = 0; a < cards.length; a++) {
    if (removedBoards.includes(a)) continue;
    const bingo = hasBingo(a, cards, drawn);

    if (bingo) {
      removedBoards.push(a);

      if (removedBoards.length === cards.length) {
        const unmarked = cards[a]
          .filter((c) => !drawn.includes(c))
          .map((c) => parseInt(c));
        const sum = unmarked.reduce((a, b) => a + b);
        console.log(sum, number, a);
        console.log(sum * parseInt(number));
        console.log(removedBoards);
        Deno.exit();
      }
    }
  }
}

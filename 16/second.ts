const input = await Deno.readTextFile(Deno.args[0]);

const bits = new Map([
  ["0", "0000"],
  ["1", "0001"],
  ["2", "0010"],
  ["3", "0011"],
  ["4", "0100"],
  ["5", "0101"],
  ["6", "0110"],
  ["7", "0111"],
  ["8", "1000"],
  ["9", "1001"],
  ["A", "1010"],
  ["B", "1011"],
  ["C", "1100"],
  ["D", "1101"],
  ["E", "1110"],
  ["F", "1111"],
]);

function readVersion(input: string) {
  return parseInt(input.substring(0, 3), 2);
}

function readType(input: string) {
  return parseInt(input.substring(0, 3), 2);
}

function readLiteralValue(input: string) {
  let isLast = false;
  let bits = "";
  let data = input.slice();

  while (!isLast) {
    isLast = data.substring(0, 1) === "0";
    const value = data.substring(1, 5);
    data = data.slice(5, data.length);

    bits += value;
  }

  return { value: parseInt(bits, 2), bits: input.length - data.length };
}

function parsePacket(input: string) {
  let data = input.slice();
  const version = readVersion(data);
  data = data.slice(3, data.length);
  const type = readType(data);
  data = data.slice(3, data.length);

  if (type !== 4) {
    const lengthBit = data.substring(0, 1);
    data = data.slice(1, data.length);

    const values = [];
    if (lengthBit === "0") {
      const length = parseInt(data.substring(0, 15), 2);
      data = data.slice(15, data.length);
      let sub = data.slice(0, length);
      while (sub.length > 0) {
        const value: any = parsePacket(sub);
        sub = value.data;
        values.push(value);
      }

      data = data.slice(length, data.length);
    } else {
      const length = parseInt(data.substring(0, 11), 2);
      data = data.slice(11, data.length);
      for (let i = 0; i < length; i++) {
        const value: any = parsePacket(data);
        data = value.data;
        values.push(value);
      }
    }

    return {
      version,
      type,
      data,
      value: values,
    };
  } else {
    const value = readLiteralValue(data);
    return {
      data: data.slice(value.bits, input.length),
      value: value.value,
      type,
      version,
    };
  }
}

let data = input
  .split("")
  .map((c: string) => bits.get(c))
  .join("");

const values: any = [];
console.log(data);
while (data.length > 0) {
  const value = parsePacket(data);
  data = value.data;
  values.push(value);
}

function calc(packet: any): number {
  if (packet.type === 4) {
    return packet.value;
  }
  if (packet.type === 0) {
    return packet.value
      .map((p: any) => calc(p))
      .reduce((a: number, b: number) => a + b);
  }

  if (packet.type === 1) {
    return packet.value
      .map((p: any) => calc(p))
      .reduce((a: number, b: number) => a * b);
  }

  if (packet.type === 2) {
    return Math.min(...packet.value.map((p: any) => calc(p)));
  }
  if (packet.type === 3) {
    return Math.max(...packet.value.map((p: any) => calc(p)));
  }
  if (packet.type === 5) {
    const first = calc(packet.value[0]);
    const second = calc(packet.value[1]);
    return first > second ? 1 : 0;
  }
  if (packet.type === 6) {
    const first = calc(packet.value[0]);
    const second = calc(packet.value[1]);
    return first < second ? 1 : 0;
  }
  if (packet.type === 7) {
    const first = calc(packet.value[0]);
    const second = calc(packet.value[1]);
    return first === second ? 1 : 0;
  }

  return 0;
}

console.log(calc(values[0]));

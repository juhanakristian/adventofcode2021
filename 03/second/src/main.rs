use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong reading the file");

    let mut rows: Vec<String> = vec![];
    for line in contents.lines() {
        rows.push(line.to_string())
    }

    let oxygen_value = oxygen(&rows);
    let co2_value = co2(&rows);

    println!("{}", oxygen_value);
    println!("{}", co2_value);
    println!("Result {}", (co2_value as u32 * oxygen_value as u32) as u32);

}
fn co2(rows: &Vec<String>) -> u16 {
    let mut filtered_rows: Vec<String> = rows.clone();
    let mut pos = 0;
    loop {
        let value = if most_common_bit(&filtered_rows, pos) == 1 { 0 } else { 1 };
        filtered_rows = filter(filtered_rows, pos, value);

        pos += 1;
        if filtered_rows.len() == 1 {
            break;
        }
    }

    get_bits(&filtered_rows[0])
}

fn oxygen(rows: &Vec<String>) -> u16 {
    let mut oxygen_rows: Vec<String> = rows.clone();
    let mut pos = 0;
    loop {
        let value = most_common_bit(&oxygen_rows, pos);

        oxygen_rows = filter(oxygen_rows, pos, value);

        pos += 1;
        if oxygen_rows.len() == 1 {
            break;
        }
    }

    get_bits(&oxygen_rows[0])
}


fn get_bits(value: &str) -> u16 {
    let mut bits = 0;
    for i in 0..value.len() {
        let bit = if value.chars().nth(i).take().unwrap() == '1' { 1 } else { 0 };
        bits |= bit << value.len()-1-i;
    }
    bits
}


fn most_common_bit(bits: &Vec<String>, pos: usize) -> u8 {
    let mut count: u16 = 0;
    for i in 0..bits.len() {
        count += bits[i].chars().nth(pos).unwrap().to_digit(10).unwrap() as u16;
    }

    let half = (bits.len() as f32 / 2f32).ceil();
    return if count < half as u16 { 0 } else { 1 };
}


fn filter(bits: Vec<String>, pos: usize, value: u8) -> Vec<String> {
    bits.into_iter().filter(|x| x.chars().nth(pos).unwrap().to_digit(10).unwrap() as u8 == value).collect()
}


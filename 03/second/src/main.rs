use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong reading the file");


    let bit_count = 12;
    let mut rows: Vec<u16> = vec![];
    for line in contents.lines() {
        rows.push(get_bits(line));
    }


    let mut pos = 0;
    let mut oxygen_rows: Vec<u16> = rows.clone();
    loop {
        if pos == bit_count {
            break;
        }

        let value = most_common_bit(&oxygen_rows, bit_count-1-pos);
        oxygen_rows = filter_bits(&oxygen_rows, bit_count-1-pos, value);
        if oxygen_rows.len() == 1 {
            break;
        }

        pos += 1;
    }

    println!("{}", oxygen_rows[0]);
    println!("{:#02b}", oxygen_rows[0]);

    let mut co2_rows: Vec<u16> = rows.clone();
    pos = 0;
    loop {
        if pos == bit_count {
            break;
        }

        let value = least_common_bit(&co2_rows, bit_count-1-pos);
        co2_rows = filter_bits(&co2_rows, bit_count-1-pos, value);
        if co2_rows.len() == 1 {
            break;
        }

        pos += 1;
    }

    println!("{}", co2_rows[0]);
    println!("{:#02b}", co2_rows[0]);

    println!("{}", co2_rows[0] as u32 * oxygen_rows[0] as u32);

}


fn get_bits(value: &str) -> u16 {
    let mut bits = 0;
    for i in 0..value.len() {
        let bit = if value.chars().nth(i).take().unwrap() == '1' { 1 } else { 0 };
        // println!("{}", bit);
        bits |= bit << value.len()-1-i;
    }
    bits
}

fn least_common_bit(bits: &Vec<u16>, pos: u8) -> u8 {
    let mut count = 0;
    for i in 0..bits.len() {
        count += (bits[i] >> pos) & 1;
    }

    let half = (bits.len() as f32 / 2f32).ceil();

    return if count < half as u16 { 1 } else { 0 };
}

fn most_common_bit(bits: &Vec<u16>, pos: u8) -> u8 {
    let mut count = 0;
    for i in 0..bits.len() {
        count += (bits[i] >> pos) & 1;
    }

    let half = (bits.len() as f32 / 2f32).ceil();

    return if count >= half as u16 { 1 } else { 0 };
}

fn filter_bits(bits: &Vec<u16>, pos: u8, value: u8) -> Vec<u16> {
    bits.into_iter().filter(|x| bit_equals(**x, pos, value)).cloned().collect::<Vec<u16>>()
}


fn bit_equals(bits: u16, pos: u8, value: u8) -> bool {
    let result = bits & 1 << pos == (value as u16) << pos;
    result
}

use std::fs;
fn main() {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong reading the file");


    let line_count = contents.lines().count();

    let mut bits = vec![0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for line in contents.lines() {
        for i in 0..line.len() {
            bits[i] += line.chars().nth(i).take().unwrap().to_digit(10).unwrap();
        }
    }

    let mut gamma = 0;
    let mut epsilon = 0;
    for i in 0..bits.len() {
        let value = if bits[i] > (line_count / 2).try_into().unwrap() { 1 } else { 0 };
        gamma |= value << bits.len()-1-i;
        epsilon |= (value ^ 1) << bits.len()-1-i;
    }

    println!("{}", line_count);
    println!("{:?}", bits);
    println!("{}", gamma);
    println!("{}", epsilon);
    println!("{}", gamma * epsilon);

}

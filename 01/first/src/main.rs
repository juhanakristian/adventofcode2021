use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong reading the file");

    let mut count = 0;
    let mut previous_value: i32 = contents.lines().next().unwrap().parse::<i32>().unwrap();
    for line in contents.lines().skip(1) {
        let value: i32 = line.parse::<i32>().unwrap();
        if value > previous_value {
            count += 1;
        }

        previous_value = value;
    }

    println!("{}", count);
}

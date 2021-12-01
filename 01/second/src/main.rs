use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong reading the file");

    let mut count = 0;

    let line_count = contents.lines().count();

    for i in 0..line_count-3 {
        let first_window = get_window(&contents, i);
        let second_window = get_window(&contents, i+1);
        if second_window > first_window {
            count += 1;
        }

    }

    println!("{}", count);
}

fn get_window(contents: &str, index: usize) -> i32 {
    let mut sum = 0;
    for i in index..index + 3 {
        match contents.lines().nth(i) {
            Some::<&str>(line) => {
                match line.parse::<i32>() {
                    Ok(num) => sum += num,
                    Err(_) => println!("Error parsing line: {}", line),
                }
            },
            None => {
                println!("Error getting line: {}", i);
            }
        }
    }

    sum
}
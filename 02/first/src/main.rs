use std::fs;
fn main() {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong reading the file");

    let mut depth = 0;
    let mut horizontal_position = 0;
    for line in contents.lines() {
        let cmd = line.split(" ").collect::<Vec<&str>>();
        match *cmd.first().unwrap() {
            "forward" => horizontal_position += cmd[1].parse::<i32>().unwrap(),
            "up" => depth -= cmd[1].parse::<i32>().unwrap(),
            "down" => depth += cmd[1].parse::<i32>().unwrap(),
            &_ => panic!("Unknown command"),
        }
    }

    println!("position {} depth {}", horizontal_position, depth);
    println!("{}", horizontal_position * depth);
    
}

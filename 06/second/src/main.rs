use std::fs;
fn main() {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong reading the file");

    let lanternfish = contents.split(",").map(|x| x.parse::<i32>().unwrap()).collect::<Vec<i32>>();
    let mut fish_counts: Vec<i64> = vec![0, 0, 0, 0, 0, 0, 0, 0, 0];

    for fish in lanternfish {
        fish_counts[fish as usize] += 1;
    }

    for _day in 0..256 {
        fish_counts.rotate_left(1);
        fish_counts[6] += fish_counts[8];
    }

    let total_fish = fish_counts.iter().sum::<i64>();
    println!("Fish count {}", total_fish);
}

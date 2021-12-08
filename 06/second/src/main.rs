use std::fs;
fn main() {
    let contents = fs::read_to_string("input.txt").expect("Something went wrong reading the file");

    let lanternfish = contents.split(",").map(|x| x.parse::<i32>().unwrap()).collect::<Vec<i32>>();
    let mut fish_counts: Vec<i64> = vec![0, 0, 0, 0, 0, 0, 0, 0, 0];

    for fish in lanternfish {
        fish_counts[fish as usize] += 1;
    }

    for day in 0..256 {
        let birth_count = fish_counts[0];
        fish_counts[0] = fish_counts[1];
        fish_counts[1] = fish_counts[2];
        fish_counts[2] = fish_counts[3];
        fish_counts[3] = fish_counts[4];
        fish_counts[4] = fish_counts[5];
        fish_counts[5] = fish_counts[6];
        fish_counts[6] = fish_counts[7] + birth_count;
        fish_counts[7] = fish_counts[8];
        fish_counts[8] = birth_count;
        
        let total_fish = fish_counts.iter().sum::<i64>();
        println!("Day {}, fishes {}", day, total_fish);
    }

    let total_fish = fish_counts.iter().sum::<i64>();
    println!("Fish count {}", total_fish);
}

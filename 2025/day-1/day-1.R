library(tidyverse)

folder <- "day-1"
file <- "day-1-test.txt"
file <- "day-1.txt"

start <- 50

instructions <- read_lines(
  file.path(
    folder,
    file
  )
) |>
  str_replace("R", "") |>
  str_replace("L", "-") |>
  as.numeric()

make_numbers <- function(distance, x) {
  x <- distance + x
  x %% 100
}

num_zero <- function(distance, num) {
  test_num <- distance + num
  if (test_num > 100) {
    click_zero <- (test_num / 100) |> floor()
  } else if (num != 0 && test_num < 0) {
    click_zero <- (1 + abs(test_num / 100)) |> floor()
  } else if (num == 0 && test_num < -100) {
    click_zero <- abs(test_num / 100) |> floor()
  } else {
    click_zero <- 0
  }
  print(c(
    paste("distance:", distance),
    paste("cur_num:", cur_num),
    paste("test_num:", test_num),
    paste("click_zero:", click_zero)
  ))
  if (click_zero != 0 && test_num %% 100 == 0) {
    click_zero <- click_zero - 1
  }
  click_zero
}

cur_num <- start
a_vec <- c()
b_vec <- c()

for (val in instructions) {
  b_vec <- c(b_vec, num_zero(val, cur_num))
  cur_num <- make_numbers(val, cur_num)
  a_vec <- c(a_vec, cur_num)
}

a_1 <- sum(a_vec == 0)
b_1 <- sum(b_vec)

a_1 + b_1

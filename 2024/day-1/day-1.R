library(tidyverse)

# data_raw<-read_lines("day-1-test.txt") |>
#   str_split("   ")

data_raw <- read_lines("day-1-data.txt") |>
  str_split("   ")

## Part 1
row_1 <- data_raw |>
  lapply(function(x) as.numeric(x[1])) |>
  unlist() |>
  sort()


row_2 <- data_raw |>
  lapply(function(x) as.numeric(x[2])) |>
  unlist() |>
  sort()

abs(row_1 - row_2) |>
  sum()

## Part 2

row_2_count <- tibble(row_2 = row_2) |>
  count(row_2)

tibble(row_1 = row_1) |>
  left_join(row_2_count, by = c("row_1" = "row_2")) |>
  mutate(
    n = ifelse(is.na(n), 0, n),
    score = row_1 * n
  ) |>
  pull(score) |>
  sum()

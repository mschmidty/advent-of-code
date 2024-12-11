library(tidyverse)

data <- read_lines("day-3-test.txt")[1]
data <- read_lines("day-3-test.txt")[2]
data <- read_lines("day-3.txt")

## Part 1
get_mult <- function(x) {
  x |>
    str_extract_all("mul\\(\\d{1,3},\\d{1,3}\\)") |>
    unlist() |>
    str_replace("mul\\(", "") |>
    str_replace("\\)$", "") |>
    str_split(",") |>
    lapply(as.numeric) |>
    lapply(prod) |>
    unlist() |>
    sum()
}

get_mult(data)

## Part 2
get_starts_split <- data |>
  paste(collapse = "") |>
  str_split("(?=don't\\(\\)|do\\(\\))") |>
  unlist()

get_starts_split[!grepl("^don't\\(\\)", get_starts_split)] |>
  get_mult()

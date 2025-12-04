library(tidyverse)

folder <- "2025/day-2"
file <- "day-2-test.txt"
file <- "day-2.txt"

raw_data <- read_lines(
  file.path(folder, file)
) |>
  str_split(",")

sequences <- raw_data[[1]] |>
  str_split("\\-") |>
  lapply(function(x) {
    seq(x[1], x[2], by = 1)
  })

get_matches <- function(x) {
  length <- x |>
    as.character() |>
    str_length()

  if (length %% 2 != 0) {
    return(0)
  }

  mid <- ceiling(length / 2)

  f_half <- substring(x, 1, mid)
  s_half <- substring(x, mid + 1, length)

  if (f_half == s_half) {
    as.numeric(x)
  } else {
    0
  }
}
sequences |>
  lapply(map, get_matches) |>
  unlist() |>
  sum()

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
part_1 <- sequences |>
  lapply(map, get_matches) |>
  unlist() |>
  sum()

get_multi_match <- function(x) {
  length <- x |>
    as.character() |>
    str_length()

  mid <- ceiling(length / 2)

  dividers <- c()
  for (num in mid:1) {
    if (length %% num == 0) {
      dividers <- c(dividers, num)
    }
  }
  split_n_equal <- function(n, s) {
    len <- nchar(s)

    start_indices <- seq(1, len, by = n)

    sapply(start_indices, function(start) {
      substring(s, start, start + n - 1)
    })
  }
  y <- 0
  for (num in dividers) {
    split <- split_n_equal(num, x)
    # print(split)
    if (all(split == split[1]) && length > 1) {
      y <- x
      break()
    }
  }
  y
}


p2_all_num <- sequences |>
  lapply(map, get_multi_match)

p2_v <- p2_all_num |>
  unlist()

p2_v |>
  sum()

## finding mistakes
p2_v_filter <- p2_v != 0

p2_v[p2_v_filter]

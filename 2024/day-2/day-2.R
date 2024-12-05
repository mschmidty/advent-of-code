library(tidyverse)

data <- read_lines("day-2-test.txt") |>
  str_split(" +")

data <- read_lines("day-2.txt") |>
  str_split(" +")


check_report <- function(x) {
  i_or_d <- "start"
  safe <- TRUE
  r <- 1
  for (i in seq_along(x)) {
    t <- as.numeric(x[i]) - as.numeric(x[i + 1])
    if (t > 0 & i_or_d %in% c("increase", "start") & abs(t) < 4) {
      i_or_d <- "increase"
    } else if (t < 0 & i_or_d %in% c("decrease", "start") & abs(t) < 4) {
      i_or_d <- "decrease"
    } else {
      safe <- FALSE
    }
    if (!safe) {
      r <- 0
      break
    }
    if (i == length(x) - 1) {
      break
    }
  }
  r
}

data |>
  lapply(check_report) |>
  unlist() |>
  sum()

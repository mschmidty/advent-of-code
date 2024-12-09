library(tidyverse)

data <- read_lines("day-2-test.txt") |>
  str_split(" +") |>
  lapply(as.numeric)

data <- read_lines("day-2.txt") |>
  str_split(" +") |>
  lapply(as.numeric)


check_report <- function(x) {
  d <- diff(x)
  check_length <- length(x) - 1

  t_inc <- (d > 0 & abs(d) < 4) |>
    sum()
  t_dec <- (d < 0 & abs(d) < 4) |>
    sum()

  if (t_inc == check_length | t_dec == check_length) {
    return(1)
  } else {
    return(0)
  }
}

check_report2 <- function(y) {
  c1 <- check_report(y)
  if (c1 == 1) {
    return(1)
  } else {
    d <- diff(y)
    check_length <- length(y) - 2

    t_inc <- (d > 0 & abs(d) < 4)
    t_dec <- (d < 0 & abs(d) < 4)

    if (sum(t_inc) > 1) {
      s <- match(FALSE, t_inc)
      c2 <- check_report(y[-s])
      c3 <- check_report(y[-(s + 1)])
      if (c2 == 1 | c3 == 1) {
        return(1)
      }
    } else if (sum(t_dec) > 1) {
      s <- match(FALSE, t_dec)
      c4 <- check_report(y[-s])
      c5 <- check_report(y[-(s + 1)])
      if (c4 == 1 | c5 == 1) {
        return(1)
      }
    } else {
      return(0)
    }
  }
}
## Answer part 1
data |>
  lapply(check_report) |>
  unlist() |>
  sum()

## Answer part 2
data |>
  lapply(check_report2) |>
  unlist() |>
  sum()

library(tidyverse)

data <- read_lines("day-4-test.txt")
data <- read_lines("day-4.txt")

## Part 1
find_xmas <- function(x) {
  x |>
    str_match_all("(?=(XMAS|SAMX))") |>
    unlist() |>
    str_replace_all("XMAS|SAMX", "1") |>
    as.numeric() |>
    sum(na.rm = T)
}

fb <- find_xmas(data)

matrix_data <- data |>
  strsplit("") %>%
  do.call(rbind, .)

ud <- matrix_data |>
  apply(2, rev) |>
  t() |>
  apply(1, paste, collapse = "") |>
  find_xmas()

get_forward_diagonal <- function(x, n_char = 3) {
  f_diag_list <- list()

  for (t in seq_len(nrow(x) - n_char)) {
    f_diag <- c()
    for (i in seq_len(ncol(x) - n_char)) {
      f_diag_c <- x[t, i]
      for (j in seq_len(n_char)) {
        f_diag_c <- c(f_diag_c, x[t + j, i + j])
      }
      f_diag <- c(f_diag, paste(f_diag_c, collapse = ""))
    }
    f_diag_list[[t]] <- f_diag
  }
  f_diag_list
}

fd <- get_forward_diagonal(matrix_data, n_char = 3) |>
  unlist() |>
  str_replace_all("XMAS|SAMX", "1") |>
  as.numeric() |>
  sum(na.rm = T)

get_backward_diagonal <- function(x, n_char = 3) {
  b_diag_list <- list()
  for (t in seq_len(nrow(x) - n_char)) {
    diag <- c()
    for (i in (n_char + 1):ncol(x)) {
      diag_c <- x[t, i]
      for (j in seq_len(n_char)) {
        diag_c <- c(diag_c, x[t + j, i - j])
      }
      diag <- c(diag, paste(diag_c, collapse = ""))
    }
    b_diag_list[[t]] <- diag
  }
  b_diag_list
}

bd <- get_backward_diagonal(matrix_data, n_char = 3) |>
  unlist() |>
  str_replace_all("XMAS|SAMX", "1") |>
  as.numeric() |>
  sum(na.rm = T)

bd + fd + ud + fb

## Part 2

f_xmas <- get_forward_diagonal(matrix_data, n_char = 2)
b_xmas <- get_backward_diagonal(matrix_data, n_char = 2)

v_f_xmas <- f_xmas |>
  unlist()

v_b_xmas <- b_xmas |>
  unlist()

matrix_data |> head()

paste(v_f_xmas, v_b_xmas, sep = "_") |>
  str_split("_") |>
  lapply(str_replace_all, "MAS|SAM", "1") |>
  lapply(as.numeric) |>
  lapply(sum) |>
  unlist() |>
  sum(na.rm = T) / 2

library(tidyverse)

data_raw <- read_lines("day-5.txt")
data_raw <- read_lines("day-5-test.txt")

split_loc <- which("" == data_raw)

orders <- data_raw[1:(split_loc - 1)] |>
  str_split("\\|") |>
  lapply(as.numeric)

number_lists <- data_raw[(split_loc + 1):length(data_raw)] |>
  str_split(",") |>
  lapply(as.numeric)

cur_number_list <- number_lists[[1]]

cur_number <- cur_number_list[1]

filtered_orders <- keep(orders, ~ cur_number %in% .x)

cur_order <- filtered_orders[[1]]

position_cur_number <- which(cur_number == cur_order)

other_position <- ifelse(position_cur_number == 1, 2, 1)

list_position_cur_number <- which(cur_number == cur_number_list)

if (cur_order[other_position] %in% cur_number_list) {
  list_position_oth_number <- which(cur_order[other_position] == cur_number_list)
} ## NEED TO ADD SOMETHING ELSE HERE

if ((position_cur_number > other_position) == (list_position_cur_number > list_position_oth_number)) {
  ## This order is good
}

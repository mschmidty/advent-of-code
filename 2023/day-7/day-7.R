library(tidyverse)

# dataURL <- "day-7-test.txt"
dataURL <- "day-7.txt"

data<-read_lines(dataURL)|>
  str_split(" ")|>
  lapply(rate_hand)

get_hand_score<-function(data_list, start_list){
  return_list<-start_list
  vect<-data_list[[1]]
  for(i in seq_len(length(vect))){
    return_list[[vect[[i]]]]=return_list[[vect[[i]]]]+1
  }
  c(data_list[2], return_list)
}

get_hand_score_tibble<-function(data_list, start_tibble, low_jack = FALSE){
  hand<-data_list[[1]]
  return_tibble<-start_tibble|>
    mutate(score = data_list[[2]])
  for(card_to_count in hand){
    second_score_factor_to_add <- start_tibble|>
      filter(card==card_to_count)|>
      pull(value)|>
      as.character()%>%
      ifelse(nchar(.)==1, paste0("0", .), .)

    return_tibble<-return_tibble|>
      mutate(
        n=case_when(
          card==card_to_count~n+1,
          TRUE~n
        ),
        second_score_factor=ifelse(is.na(second_score_factor), second_score_factor_to_add, paste0(second_score_factor, second_score_factor_to_add))
      )
  }
  jack_count <- return_tibble|>
    filter(card=="J")|>
    pull(n)

  if(low_jack & jack_count > 0){
    most_valuable_card<-return_tibble|>
      filter(card!="J")|>
      arrange(desc(n), desc(value))|>
      head(1)|>
      pull(card)
    
    return_tibble<-return_tibble|>
      mutate(
        n=case_when(
          card==most_valuable_card~n+jack_count,
          card=="J"~0,
          TRUE~n
        )
      )
  }

  return_tibble|>
    mutate(
      lines_score = case_when(
        n==0~0,
        n==1~score_factor*n,
        n==2~score_factor*n*10,
        n==3~score_factor*n*100,
        n==4~score_factor*n*1000,
        n==5~score_factor*n*10000
      )
    )
}

rate_hand<-function(x){
  hand<-x[1]|>
    strsplit(NULL)|>
    unlist()

  list(hand, x[2])
}

t_start_list<-tibble(
    card = c("2","3","4","5","6","7","8","9","T","J","Q","K","A")
  )|>
  mutate(
    n=0,
    value = row_number()+1,
    score_factor = 1,
    second_score_factor = NA
  )

summed_scores_part_one<-data|>
  lapply(get_hand_score_tibble, t_start_list)|>
  bind_rows()

first_linescore_part_one<-summed_scores_part_one|>
  group_by(score, second_score_factor)|>
  summarize(line_score = sum(lines_score))|>
  ungroup()|>
  mutate(
    second_score_factor = as.numeric(second_score_factor)
  )|>
  arrange(line_score, second_score_factor)

first_linescore_part_one|>
  mutate(
    sort=row_number(),
    line_final_score=sort*as.numeric(score)
  )|>
  pull(line_final_score)|>
  sum()

# Part Two 
t_start_list_2<-tibble(
    card = c("J","2","3","4","5","6","7","8","9","T","Q","K","A")
  )|>
  mutate(
    n=0,
    value = row_number(),
    score_factor = 1,
    second_score_factor = NA
  )

summed_scores_part_two<-data|>
  lapply(get_hand_score_tibble, t_start_list_2, low_jack=TRUE)|>
  bind_rows()

first_linescore_part_two<-summed_scores_part_two|>
  group_by(score, second_score_factor)|>
  summarize(line_score = sum(lines_score))|>
  ungroup()|>
  mutate(
    second_score_factor = as.numeric(second_score_factor)
  )|>
  arrange(line_score, second_score_factor)

first_linescore_part_two|>
  mutate(
    sort=row_number(),
    line_final_score=sort*as.numeric(score)
  )|>
  pull(line_final_score)|>
  sum()

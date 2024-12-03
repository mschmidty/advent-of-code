library(tidyverse)

# dataURL<-"./day-8.txt"
# dataURL <-"./day-8-test.txt"
# dataURL <-"./day-8-test2.txt"
dataURL<-"./day-8-test3.txt"

data_raw<-read_lines(dataURL)

left_right<-data_raw[1]|>
  str_split('')%>%
  .[[1]]

data_maps<-data_raw[-(1:2)]%>%
  tibble(full_maps=.)%>%
  mutate(
    location = str_extract(full_maps, "^[^ ]+"),
    L = str_extract(full_maps, "\\(([^,]+)"),
    L = gsub("^\\(", "", L),
    R = str_extract(full_maps, ",\\s([^)]+)"),
    R = gsub("^,\\s", "", R)
  )

steps_to_zzz<-function(l_r, maps){

  starting_location<-head(maps, 1)|>
    pull(location)

  current_location<-"AAA"

  step_count<-0
  l_r_count<-1

  while(current_location!="ZZZ"){

    step_count<-step_count+1

    if(l_r_count>length(left_right)){
      l_r_count<-1
    }

    l_or_r<-l_r[l_r_count]

    current_location<-maps|>
      filter(location==current_location)|>
      pull(l_or_r)
      
    l_r_count<-l_r_count+1
  }
  return(tibble(step_count=step_count, current_location=current_location))
}

steps_to_zzz(left_right, data_maps)

# Part Two

data_maps_p2<-data_maps|>
  mutate(
    ends_with = substr(location, nchar(location), nchar(location))
  )



steps_to_ending_z<-function(l_r, maps){

  starting_location<-head(maps, 1)|>
    pull(location)

  current_locations<-maps|>
    filter(ends_with=="A")|>
    pull(location)

  
  node_counts<- c()

  for(node in current_locations){
    step_count<-0
    l_r_count<-1

    current_ends_with<-""

    while(current_ends_with!="Z"){

      step_count<-step_count+1

      if(l_r_count>length(left_right)){
        l_r_count<-1
      }

      l_or_r<-l_r[l_r_count]

      current_location<-maps|>
        filter(location==node)|>
        pull(l_or_r)
    
      current_ends_with<-maps|>
        filter(location==current_location)|>
        pull(ends_with)
      
      if(current_ends_with=="Z"){
        node_counts<-append(node_counts, l_r_count)
      }
      l_r_count<-l_r_count+1
    }
  }
  
  return(tibble(step_count=step_count))
}

steps_to_ending_z(left_right, data_maps_p2)

data_maps_p2|>
  mutate(
    last_l = str_extract(L, ".$"),
    last_r = str_extract(R, ".$")
  )|>
  filter(ends_with=="A")

library(ggplot2)
library(lubridate)

alphabeta <- read.csv("./data/alphaBetaSearch.csv", header=TRUE)
alphabeta$Date <- ymd_hms(alphabeta$Time)

ggplot(data = alphabeta) +
    geom_point(mapping = aes(x = Date, y = Win))

library(tidyverse)
library(lubridate)
library(rjson)

# Win rate vs random over time
alphabeta <- read_csv("./data/alphaBetaSearch.csv")
alphabeta$Time <- ymd_hms(alphabeta$Time)

ggplot(data = alphabeta) +
    geom_point(mapping = aes(x = Time, y = Win))

################################################################
# PROBCUT Stats
################################################################


# Linear regression for depth 4 vs depth 9, 25 moves in
probcut <- read_csv("./depth25.csv") 
probcut$Depth5 <- probcut$`5`
probcut$Depth8 <- probcut$`8`

probcut_mod <- lm(Depth8 ~ Depth5, data = probcut)
print(summary(probcut_mod))

ggplot(data = probcut, mapping = aes(x = Depth5, y = Depth8)) + 
    xlab("Heuristic Value at Depth 5") +
    ylab("Heuristic Value at Depth 8") +
    ggtitle("Deep vs Shallow Heuristic Values") +
    geom_point() +
    stat_smooth(method = "lm", col = "blue")

qqline(rstandard(probcut_mod))

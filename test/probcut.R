# Linear regression for depth 4 vs depth 9, 25 moves in

probcut <- read_csv("./data/depth25.csv") 
probcut$Depth5 <- probcut$`5`
probcut$Depth8 <- probcut$`8`

probcut_mod <- lm(Depth8 ~ Depth5, data = probcut)

png(file = "probcut.png")
ggplot(data = probcut, mapping = aes(x = Depth5, y = Depth8)) + 
    xlab("Heuristic Value at Depth 5") +
    ylab("Heuristic Value at Depth 8") +
    ggtitle("Deep vs Shallow Heuristic Values") +
    geom_point() +
    stat_smooth(method = "lm", col = "blue")
dev.off()

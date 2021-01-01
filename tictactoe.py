class TicTacToe:

    def __init__(self, board = None):
        if board == None:
            self.board = []
            for num1 in range(3):
                self.board.append([])
                for num2 in range(3):
                    self.board[-1].append(None)
        else:
            self.board = board
    
    def __str__(self):
        return str([str(square) for square in self.board])

    def get_board(self):
        return self.board.copy()
    
    def get_space(self, row, col):
        return self.board[row][col]
    
    def make_local_move(self, player, row, col):
        new_board = self.board.copy()
        new_board[row][col] = player
        return new_board
    
    def check_local_state(self):
        for row in self.board:
            if row[0] == row[1] == row[2] != None:
                return row[0]
        
        for col in range(3):
            if self.board[0][col] == self.board[1][col] == self.board[2][col] != None:
                return self.board[0][col]
            
        if self.board[0][0] == self.board[1][1] == self.board[2][2] != None:
            return self.board[1][1]
        
        if self.board[0][2] == self.board[1][1] == self.board[2][0] != None:
            return self.board[1][1]
        
        for row in self.board:
            for col in range(3):
                if row[col] == None:
                    return None
        
        return 0
    

#This is a script that will run it like a game of TicTacToe for testing purposes.
# =============================================================================
# game = TicTacToe()
# 
# player = 1
# 
# while game.check_local_state() == None:
#     for row in game.get_board():
#         print(row)
#     
#     while True:
#         row_input = input("Please type the row you'd like to play.")
#         col_input = input("Please type the column you'd like to play.")
#         if 0 <= int(row_input) <= 2 and 0 <= int(col_input) <= 2:
#             if game.get_space(int(row_input), int(col_input)) == None:
#                 break
#         else:
#             print("Please input a valid move.")
#         
#     game = TicTacToe(game.make_local_move(player, int(row_input), int(col_input)))
#     
#     player *= -1
# 
# print("Congratulations!", game.check_local_state(), "has won!")
# =============================================================================

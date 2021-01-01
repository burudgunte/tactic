class TicTacToe:
    def __init__(self):
        board = []
        for num1 in range(3):
            board.append([])
            for num2 in range(3):
                board[-1].append(None)
    
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
        
        for row in self.board:
            for col in range(3):
                if row[col] == None:
                    return None
        
        return 0
    
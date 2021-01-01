from tictactoe import TicTacToe

class Ultimate:

        def __init__(self):
                self.board = [[TicTacToe()] * 3] * 3

        def __str__(self):
                grid = ""
                for row in self.board:
                        for board in row:
                                grid += str(board) + "\n"
                        grid += "\n"
                return grid

        def __getitem__(self, row, col):
                return self.board[row][col]

        def get_board(self):
                return self.board

        def make_global_move(self, player, global_row, global_col, local_row, local_col):
                board = self.get_board()
                if not board[global_row][global_col].check_local_state():
                        board[global_row][global_col] = board[global_row][global_col].make_local_move(player, local_row, local_col)

        def check_row_win(self):
                board = self.get_board()
                for i in range(3):
                        
                        if board[i][0].check_local_state() == board[i][1].check_local_state() == board[i][2].check_local_state() == 1:
                                
                                return 1

                        if board[i][0].check_local_state() == board[i][1].check_local_state() == board[i][2].check_local_state() == -1:
                                
                                return -1

                        if board[i][0].check_local_state() != None and board[i][1].check_local_state() != None and board[i][2].check_local_state() != None:

                                return 0

                return None

        def check_col_win(self):
                board = self.get_board() 
                for j in range(3):
                        
                        if 1 == board[0][j].check_local_state() == board[1][j].check_local_state() == board[2][j].check_local_state():
                                
                                return 1
                        
                        if -1 == board[0][j].check_local_state() == board[1][j].check_local_state() == board[2][j].check_local_state():
                                
                                return -1

        def check_diag_win(self):
                board = self.get_board()

                #top left to bottom right
                if 1 == board[0][0].check_local_state() == board[1][1].check_local_state() == board[2][2].check_local_state():
                                
                        return 1

                if -1 == board[0][0].check_local_state() == board[1][1].check_local_state() == board[2][2].check_local_state():
                                
                        return -1

                #top right to bottom left
                if 1 == board[2][0].check_local_state() == board[1][1].check_local_state() == board[0][2].check_local_state():
                                
                        return 1

                if -1 == board[2][0].check_local_state() == board[1][1].check_local_state() == board[0][2].check_local_state():
                                
                        return -1
                
        def check_global_state(self):

                if self.check_row_win() == 1 or self.check_col_win() == 1 or self.check_diag_win() == 1:

                        return 1

                if self.check_row_win() == -1 or self.check_col_win() == -1 or self.check_diag_win() == -1:

                        return -1

                for i in range(3):

                        for j in range(3):

                                if self.get_board()[i][j].check_local_state() == None:

                                        return None
                                
                return 0

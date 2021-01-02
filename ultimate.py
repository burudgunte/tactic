from tictactoe import TicTacToe
from copy import deepcopy

class Ultimate:

        def __init__(self, ult_board=None):
                if ult_board:
                        self.ult_board = ult_board
                else:
                        self.ult_board = []
                        for row in range(3):
                                self.ult_board.append([])
                                for col in range(3):
                                        self.ult_board[-1].append(TicTacToe())

        def __str__(self):
                grid = ""
                for row in self.ult_board:
                        for board in row:
                                grid += str(board) + "\n"
                        grid += "\n"
                return grid

        def get_local_board(self, row, col):
                return self.ult_board[row][col]

        def get_ult_board(self):
                return deepcopy(self.ult_board)

        def make_global_move(self, player, global_row, global_col, local_row, local_col):
                new_ult_board = self.get_ult_board()
                new_ult_board[global_row][global_col] = new_ult_board[global_row][global_col].make_local_move(player, local_row, local_col)
                return Ultimate(new_ult_board)

        def check_row_win(self):
                ult_board = self.get_ult_board()
                for i in range(3):
                        
                        if ult_board[i][0].check_local_state() == ult_board[i][1].check_local_state() == ult_board[i][2].check_local_state() == 1:
                                
                                return 1

                        if ult_board[i][0].check_local_state() == ult_board[i][1].check_local_state() == ult_board[i][2].check_local_state() == -1:
                                
                                return -1

                        if ult_board[i][0].check_local_state() != None and ult_board[i][1].check_local_state() != None and ult_board[i][2].check_local_state() != None:

                                return 0

                return None

        def check_col_win(self):
                ult_board = self.get_ult_board() 
                for j in range(3):
                        
                        if 1 == ult_board[0][j].check_local_state() == ult_board[1][j].check_local_state() == ult_board[2][j].check_local_state():
                                
                                return 1
                        
                        if -1 == ult_board[0][j].check_local_state() == ult_board[1][j].check_local_state() == ult_board[2][j].check_local_state():
                                
                                return -1

        def check_diag_win(self):
                ult_board = self.get_ult_board()

                #top left to bottom right
                if 1 == ult_board[0][0].check_local_state() == ult_board[1][1].check_local_state() == ult_board[2][2].check_local_state():
                                
                        return 1

                if -1 == ult_board[0][0].check_local_state() == ult_board[1][1].check_local_state() == ult_board[2][2].check_local_state():
                                
                        return -1

                #top right to bottom left
                if 1 == ult_board[2][0].check_local_state() == ult_board[1][1].check_local_state() == ult_board[0][2].check_local_state():
                                
                        return 1

                if -1 == ult_board[2][0].check_local_state() == ult_board[1][1].check_local_state() == ult_board[0][2].check_local_state():
                                
                        return -1
                
        def check_global_state(self):

                if self.check_row_win() == 1 or self.check_col_win() == 1 or self.check_diag_win() == 1:

                        return 1

                if self.check_row_win() == -1 or self.check_col_win() == -1 or self.check_diag_win() == -1:

                        return -1

                for i in range(3):

                        for j in range(3):

                                if self.get_ult_board()[i][j].check_local_state() == None:

                                        return None
                                
                return 0

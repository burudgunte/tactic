from copy import deepcopy
from tictactoe import TicTacToe

class Ultimate:
        """
        Represents the overall board, made up of 9 local boards
        """

        def __init__(self, ult_board=None):
                if ult_board:
                        self.ult_board = ult_board
                else:
                        self.ult_board = []
                        for dummy_row in range(3):
                                self.ult_board.append([])
                                for dummy_col in range(3):
                                        self.ult_board[-1].append(TicTacToe())

        def __str__(self):
                """
                Returns string representation as a 3x3 grid of local boards
                """
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

        def to_array(self):
                """
                Returns a representation of the board using only basic data types.
                """
                ult_board = self.get_ult_board()
                ult_array = []
                for row in ult_board:
                        ult_array_row = []
                        for local_game in row:
                                ult_array_row.append(local_game.get_local_board())
                        ult_array.append(ult_array_row)
                return ult_array

        def make_global_move(self, player, global_row, global_col, local_row, local_col):
                """
                Makes a move by duplicating the board, making a move on the specified local board, then returning the new board
                """
                new_ult_board = self.get_ult_board()
                new_ult_board[global_row][global_col] = new_ult_board[global_row][global_col].make_local_move(player, local_row, local_col)
                return Ultimate(new_ult_board)

        def check_row_win(self):
                """
                Check if there is a row of local boards that are the same and returns 1 or -1
                """
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
                """
                Check if there is a column of local boards that are the same and returns 1 or -1
                """
                ult_board = self.get_ult_board() 
                for j in range(3):
                        if 1 == ult_board[0][j].check_local_state() == ult_board[1][j].check_local_state() == ult_board[2][j].check_local_state():   
                                return 1
                        if -1 == ult_board[0][j].check_local_state() == ult_board[1][j].check_local_state() == ult_board[2][j].check_local_state():   
                                return -1

        def check_diag_win(self):
                """
                Check if there is a diagonal of local boards that are the same and returns 1 or -1
                """
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
                """
                Check if there is a win or a tie using the above checks
                """
                if self.check_row_win() == 1 or self.check_col_win() == 1 or self.check_diag_win() == 1:
                        return 1
                if self.check_row_win() == -1 or self.check_col_win() == -1 or self.check_diag_win() == -1:
                        return -1
                for i in range(3):
                        for j in range(3):
                                if self.get_ult_board()[i][j].check_local_state() == None:
                                        return None

                return 0

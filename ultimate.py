from tictactoe import TicTacToe

class Ultimate:
   def __init__(self):
                board = []
                for i in range(3):
                        board.append([])
                        for j in range(3):
                                board[i].append(TicTacToe())

        def make_global_move(player, global_row, global_col, local_row, local_col):
                if board[global_row][global_col].check_local_state() == None:
                        board[global_row][global_col] = board[global_row][global_col].MakeLocalMove(player, local_row, local_col)

        def check_row_win():
                for i in range(3):
                        
                        if board[i][0].check_local_state() == board[i][1].check_local_state() == board[i][2].check_local_state() == 1:
                                
                                return 1

                        if board[i][0].check_local_state() == board[i][1].check_local_state() == board[i][2].check_local_state() == -1:
                                
                                return -1

                        if board[i][0].check_local_state() != None and board[i][1].check_local_state() != None and board[i][2].check_local_state() != None:

                                return 0

                return None

        def check_col_win():
                
                for j in range(3):
                        
                        if 1 == board[0][j].check_local_state() == board[1][j].check_local_state() == board[2][j].check_local_state():
                                
                                return 1
                        
                        if -1 == board[0][j].check_local_state() == board[1][j].check_local_state() == board[2][j].check_local_state():
                                
                                return -1

        def check_diag_win():

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
                
        def check_global_state():

                if check_row_win() == 1 or check_col_win() == 1 or check_diag_win() == 1:

                        return 1

                if check_row_win() == -1 or check_col_win() == -1 or check_diag_win() == -1:

                        return -1

                for i in range(3):

                        for j in range(3):

                                if board[i][j].check_local_state() == None:

                                        return None
                                
                return 0

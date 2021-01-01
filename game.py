import json
from tictactoe import TicTacToe
from ultimate import Ultimate

class Game:

    def __init__(self, board=Ultimate(), player=1, pointed_to=None):
        self.board = board
        self.player = player
        self.pointed_to = pointed_to

    def get_board(self):
        return self.board.copy()

    def get_player(self):
        return self.player

    def get_pointed_to(self):
        return self.pointed_to

    def set_board(self, newboard):
        self.board = newboard

    def set_player(self, newplayer):
        self.player = newplayer

    def set_pointed_to(self, row, col):
        self.pointed_to = (row, col)

    def to_json(self):
        state = {"board":self.get_board(), "player":self.get_player(),
                 "pointed_to":self.pointed_to()}
        return json.dumps(state)

    def play(self):
        while not self.board.check_global_state():

            # Choose a  board
            if not self.get_pointed_to():
                global_row = int(input("Row for global board: "))
                global_col = int(input("Column for global board: "))
            else:
                global_row, global_col = self.get_pointed_to()

            # Prompt for move
            local_row = int(input("Row for move: "))
            local_col = int(input("Column for move: "))
            newboard = self.board.make_global_move(self.get_player, global_row,
                                                     global_col, local_row, local_col)
            self.set_board(newboard)

            # Choose the board for the next move
            if not self.board[local_row][local_col].check_local_state():
                self.set_pointed_to(local_row, local_col)
            else:
                pointed_to = None

            # Switch player
            self.set_player(-1 * self.get_player())

        winner = self.board.check_global_state()
        print("{} wins the game".format(winner))

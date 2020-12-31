import json
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
        pass

    def set_player(self, newplayer):
        self.player = newplayer

    def set_pointed_to(self, row, col):
        self.pointed_to = (row, col)

    def to_json(self):
        state = {"board":self.get_board, "player":self.get_player,
                 "pointed_to":self.pointed_to}
        return json.dumps(state)

    def play(self):
        pass

class Game:

    def __init__(self, board=Ultimate(), player=1, pointed_to=None):
        self.board = board
        self.player = 1
        self.pointed_to = None

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

    def set_pointed_to(self, coordinates):
        self.pointed_to = coordinates

    def play(self):
        pass

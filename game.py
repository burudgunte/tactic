import json
from ultimate import Ultimate

class Game:

    def __init__(self, ultimate=Ultimate(), player=1, pointed_to=None):
        self.ultimate = ultimate
        self.player = player
        self.pointed_to = pointed_to

    def __str__(self):
        player_symbol = "X" if self.player == 1 else "O"
        print("Current player:", player_symbol)
        print("Current global board:", self.pointed_to)
        print("Current board state:")
        print(self.board)

    def get_ultimate(self):
        return self.ultimate

    def get_player(self):
        return self.player

    def get_pointed_to(self):
        return self.pointed_to

    def set_ultimate(self, newultimate):
        self.ultimate = newultimate

    def set_player(self, newplayer):
        self.player = newplayer

    def set_pointed_to(self, new_pointed_to):
        """
        Mutates the game, changing pointed_to.

        Input: a tuple (row, col) or None
        """
        self.pointed_to = new_pointed_to

    def to_json(self):
        state = {"ultimate":self.get_ultimate(), "player":self.get_player(),
                 "pointed_to":self.pointed_to()}
        return json.dumps(state)

    def play(self):
        """
        Plays the game with the starting position passed as an argument to __init__.
        """
        while not self.get_ultimate().check_global_state():

            player_symbol = "X" if self.player == 1 else "O"
            print("Current player:", player_symbol)
            print("Current global board:", self.pointed_to)
            print("Current board state:")
            print(self.ultimate)

            # Choose a board
            if not self.get_pointed_to():
                global_row = int(input("Row for global board: "))
                global_col = int(input("Column for global board: "))
            else:
                global_row, global_col = self.get_pointed_to()

            # Prompt for move
            local_row = int(input("Row for move: "))
            local_col = int(input("Column for move: "))
            newultimate = self.ultimate.make_global_move(self.get_player(), global_row,
                                                     global_col, local_row, local_col)
            self.set_ultimate(newultimate)

            # Choose the board for the next move
            print("Set ultimate to:")
            print(self.get_ultimate())
            local_board = self.get_ultimate().get_local_board(local_row, local_col)
            print(type(local_board))
            if not local_board.check_local_state():
                self.set_pointed_to(local_row, local_col)
            else:
                self.set_pointed_to(None)

            # Switch player
            self.set_player(-1 * self.get_player())

        winner = self.ultimate.check_global_state()
        print("{} wins the game".format(winner))

#########################
# Testing
#########################

def main():
    testgame = Game()
    testgame.play()

if __name__ == "__main__":
    main()

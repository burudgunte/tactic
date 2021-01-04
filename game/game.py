import json
from copy import deepcopy

from ultimate import Ultimate

class Game:

    def __init__(self, ultimate=Ultimate(), player=1, next_global_coords=None):
        self.ultimate = ultimate
        self.player = player
        self.next_global_coords = next_global_coords

    def __str__(self):
        player_symbol = "X" if self.player == 1 else "O"
        print("Current player:", player_symbol)
        print("Current global board:", self.next_global_coords)
        print("Current board state:")
        print(self.ultimate)

    def get_ultimate(self):
        return deepcopy(self.ultimate)

    def get_player(self):
        return self.player

    def get_next_global_coords(self):
        return self.next_global_coords

    def set_ultimate(self, newultimate):
        self.ultimate = newultimate

    def set_player(self, newplayer):
        self.player = newplayer

    def set_next_global_coords(self, new_next_global_coords):
        """
        Returns a new instance of Game with next_global_coords replaced.

        Input: a tuple (row, col) or None
        """
        self.next_global_coords = new_next_global_coords

    def to_json(self):
        """
        Returns a json representation of the game's current state.
        """
        state = {"board":self.get_ultimate().to_array(), "player":self.get_player(),
                 "next_global_coords":self.get_next_global_coords()}
        return json.dumps(state)

    def next_move(self, next_global_coords, local_row, local_col):
        """
        Plays the next move with given parameters.
        Returns a json representation of the game after the move has been played.
        """
        pass

    def play(self):
        """
        Plays the game with the starting position passed as an argument to the
        init function.
        """
        while not self.get_ultimate().check_global_state():
            
            with open("test.json", "w") as f:
                f.write(self.to_json())

            player_symbol = "X" if self.player == 1 else "O"
            print("Current player:", player_symbol)
            print("Current global board:", self.next_global_coords)
            print("Current board state:")
            print(self.get_ultimate())

            # Choose a board
            if not self.get_next_global_coords():
                global_row = int(input("Row for global board: "))
                global_col = int(input("Column for global board: "))
            else:
                global_row, global_col = self.get_next_global_coords()

            # Prompt for move
            local_row = int(input("Row for move: "))
            local_col = int(input("Column for move: "))
            newultimate = self.get_ultimate().make_global_move(self.get_player(), global_row,
                                                     global_col, local_row, local_col)
            self.set_ultimate(newultimate)

            # Choose board for next move
            print("Set ultimate to:")
            print(self.get_ultimate())
            local_board = self.get_ultimate().get_local_board(local_row, local_col)
            print(type(local_board))
            if not local_board.check_local_state():
                self.set_next_global_coords((local_row, local_col))
            else:
                self.set_next_global_coords(None)

            # Switch player
            self.set_player(-1 * self.get_player())

        winner = self.get_ultimate().check_global_state()
        print("{} wins the game".format(winner))

#########################
# Testing
#########################

def main():
    testgame = Game()
    testgame.play()

if __name__ == "__main__":
    main()

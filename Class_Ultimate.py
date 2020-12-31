Class Ultimate:

	def __init__(self, b1, b2, b3, b4, b5, b6, b7, b8, b9):
		
		self.board = {{b1, b2, b3}, {b4, b5, b6}, {b7, b8, b9}}

	def MakeGlobalMove(player, global_row, global_col, local_row, local_col):

		if board[global_row][global_col].CheckLocalState() == 0:

			board[global_row][global_col] = board[global_row][global_col].MakeLocalMove(player, local_row, local_col)

	def CheckRowWin(player):
		
		for i in range(3):
			
			if board[i][1] == board[i][2] == board[i][3]:
				
				return True
		
		return False

	def CheckColWin(player):
		
		for j in range(3):
			
			if  board[1][j] == board[2][j] == board[3][j]:
				
				return True
		
		return False

	def CheckDiagWin(player):
		
		if board[1][1] == board[2][2] == board[3][3]:
				
			return True

		if board[3][1] == board[2][2] == board[1][3]:
				
			return True

		return False

	def CheckGlobalState():

		if CheckRowWin(1) or CheckColWin(1) or CheckDiagWin(1):

			return 1

		if CheckRowWin(-1) or CheckColWin(-1) or CheckDiagWin(-1):

			return -1

		return 0
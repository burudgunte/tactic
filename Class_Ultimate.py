class Ultimate:

	def __init__(self):
		
		board = []

		for i in range(3):

			board.append([])

			for j in range(3):

				board[i].append(TicTacToe())


	def MakeGlobalMove(player, global_row, global_col, local_row, local_col):

		if board[global_row][global_col].CheckLocalState() == None:

			board[global_row][global_col] = board[global_row][global_col].MakeLocalMove(player, local_row, local_col)

	def CheckRowWin():
		
		for i in range(3):
			
			if board[i][0].CheckLocalState() == board[i][1].CheckLocalState() == board[i][2].CheckLocalState() == 1:
				
				return 1

			if board[i][0].CheckLocalState() == board[i][1].CheckLocalState() == board[i][2].CheckLocalState() == -1:
				
				return -1

			if board[i][0].CheckLocalState() != None and board[i][1].CheckLocalState() != None and board[i][2].CheckLocalState() != None:

				return 0

		return None
		

	def CheckColWin():
		
		for j in range(3):
			
			if 1 == board[0][j].CheckLocalState() == board[1][j].CheckLocalState() == board[2][j].CheckLocalState():
				
				return 1
			
			if -1 == board[0][j].CheckLocalState() == board[1][j].CheckLocalState() == board[2][j].CheckLocalState():
				
				return -1

	def CheckDiagWin():

		#top left to bottom right
		if 1 == board[0][0].CheckLocalState() == board[1][1].CheckLocalState() == board[2][2].CheckLocalState():
				
			return 1

		if -1 == board[0][0].CheckLocalState() == board[1][1].CheckLocalState() == board[2][2].CheckLocalState():
				
			return -1

		#top right to bottom left
		if 1 == board[2][0].CheckLocalState() == board[1][1].CheckLocalState() == board[0][2].CheckLocalState():
				
			return 1

		if -1 == board[2][0].CheckLocalState() == board[1][1].CheckLocalState() == board[0][2].CheckLocalState():
				
			return -1


	def CheckGlobalState():

		if CheckRowWin() == 1 or CheckColWin() == 1 or CheckDiagWin() == 1:

			return 1

		if CheckRowWin() == -1 or CheckColWin() == -1 or CheckDiagWin() == -1:

			return -1

		return None

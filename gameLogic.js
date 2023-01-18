

class Game {
  constructor(gameOptions) {
    // Initialize game with game options
    this.gameOptions = gameOptions;

    // Bind game functions to the game object
    for (const functionName in this.gameFunctions) {
      this.gameFunctions[functionName] = this.gameFunctions[functionName].bind(this)
    }
    this.xTurn = true;
  }

  constants = {
    WINNING_COMBOS: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ],
    boardCells: Array.from(document.querySelectorAll('[data-cell]')),
    gameBoard: document.querySelector('.game-board'),
    restartButton: document.querySelector('#play-again-btn'),
    resultBoard: document.getElementById('resb'),
    resultDisplay: document.getElementById('resdisplay'),
  };

  xTurn = true;

  start = function () {
    this.constants.boardCells.forEach(cell => {
      cell.addEventListener('click', () => {
        // return if cell is already marked
        if (cell.classList.contains('x') || cell.classList.contains('o')) {
          return;
        } else {
          this.gameFunctions.handleCellClick(cell);
        }
      });
    });
    this.constants.restartButton.addEventListener('click', this.gameFunctions.resetBoard);
  };

  gameFunctions = {
    handleCellClick: function (cell) {
      if (gameOptions.opponent === 'friend') {
        this.playWithFriend(cell);
      } else {
        this.playWithComputer(cell, gameOptions.difficulty);
      }
    },
    resetBoard: function () {
      this.constants.resultBoard.style.display = "none";
      this.constants.resultDisplay.innerText = '';
      this.constants.boardCells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
      });
      // Add correct starting hoverClass 
      this.constants.gameBoard.classList.add('x')
    },
    playWithFriend: function (cell) {
      this.gameFunctions.placeMark(cell);
      if (this.gameFunctions.checkWin()) {
        this.constants.resultDisplay.innerText = `${(this.xTurn) ? 'X' : 'O'} wins this round`;
        this.constants.resultBoard.style.display = "block"
      } else if (this.constants.boardCells.every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
        this.constants.resultDisplay.innerText = `It's a draw`;
        this.constants.resultBoard.style.display = "block"
      } else {
        this.xTurn = (this.xTurn) ? false : true;
        this.constants.gameBoard.classList.toggle('x');
        this.constants.gameBoard.classList.toggle('o');
      }
    },
    playWithComputer: function (cell, difficulty) {
      this.gameFunctions.placeMark(cell);

      this.xTurn = (this.xTurn) ? false : true;
      // clone game board
      // const boardState = this.constants.boardCells.map(cell => cell.classList.contains('x') ? 'x' : cell.classList.contains('o') ? 'o' : '');
      // console.log(boardState)
      // get best move using minimax algorithm
      // const bestMove = minimax(boardState, xTurn, difficulty);
      // console.log(bestMove)
      // insert computer's mark
      // this.constants.boardCells[bestMove.index].classList.add((xTurn) ? 'x' : 'o');
      this.gameFunctions.placeMark(this.constants.boardCells[]);
      this.xTurn = (this.xTurn) ? false : true;
    },
    placeMark: function (cell) {
      cell.classList.add((this.xTurn) ? 'x' : 'o');
    },
    checkWin: function () {
      return this.constants.WINNING_COMBOS.some(COMBOS => {
        return COMBOS.every(index => {
          return this.constants.boardCells[index].classList.contains((this.xTurn) ? 'x' : 'o')
        })
      })
    }
  }
}









function startGame(gameOptions) {
  let game = new Game(gameOptions);
  game.start();
}



function checkwin(xTurn) {

}
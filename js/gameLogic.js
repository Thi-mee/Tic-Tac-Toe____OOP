
class Game {
  constructor(gameOptions) {
    // Initialize game with game options
    this.gameOptions = gameOptions;

    // Bind game functions to the game object
    for (const functionName in this.gameFunctions) {
      this.gameFunctions[functionName] = this.gameFunctions[functionName].bind(this)
    }
    this.xTurn = true;
    this.huPlayer = 'x';
    this.aiPlayer = 'o';
  }

  constants = {
    WINNING_COMBOS: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ],
    boardCells: Array.from(document.querySelectorAll('[data-cell]')),
    gameBoard: document.querySelector('.game-board'),
    resultBoard: document.getElementById('resb'),
    resultDisplay: document.getElementById('resdisplay'),
  };

  start = function () {
    if (this.gameOptions.opponent === 'computer' && this.gameOptions.playerIcon === 'o') {
      console.log('Computer goes first');
      setTimeout(function compFirstMove() {
        this.gameFunctions.randomMove();
        this.constants.gameBoard.classList.add('o')
      }.bind(this), 300);
    } else {
      this.constants.gameBoard.classList.add('x')
    }

    this.constants.boardCells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
          this.gameFunctions.handleCellClick(cell);
        }
      });
    });
  }

  reset = function () {
    this.constants.boardCells.forEach(cell => {
      cell.classList.contains('x') && cell.classList.remove('x');
      cell.classList.contains('o') && cell.classList.remove('o');
    });
    this.constants.resultBoard.style.display = "none";
    this.constants.resultDisplay.innerText = '';

    this.constants.gameBoard.classList.contains('o') && this.constants.gameBoard.classList.remove('o'); // Remove incorrect starting hoverClass
    this.xTurn = true;
    this.start()
  }

  gameFunctions = {

    handleCellClick: function (cell) {
      if (gameOptions.opponent === 'friend') {
        this.gameFunctions.playWithFriend(cell);
      } else {
        this.gameFunctions.playWithComputer(cell, gameOptions.compDifficulty);
      }
    },

    playWithFriend: function (cell) {
      this.gameFunctions.placeMark(cell);
      if (this.gameFunctions.gameOver()) {
        return;
      } else {
        this.gameFunctions.toggleHoverClass()
      }
    },

    playWithComputer: function (cell, difficulty) {

      // Player move
      this.gameFunctions.placeMark(cell);
      if (this.gameFunctions.gameOver()) {
        return;
      }

      // Computer move
      setTimeout(function () {
        if (difficulty === "easy") {
          this.gameFunctions.randomMove();
          setTimeout(function () {
            if (this.gameFunctions.gameOver()) {
              return;
            }
          }.bind(this), 300);
        } else {
          let gameState = this.gameFunctions.mapCells()
          console.log(gameState)
          const bestSpot = this.gameFunctions.minimax(
            gameState,
            this.gameFunctions.emptyIndexies(gameState).length,
            'o')
          this.gameFunctions.placeMark(this.constants.boardCells[bestSpot.index]);
          if (this.gameFunctions.gameOver()) {
            return;
          }
        }
      }.bind(this), 200);

    },

    placeMark: function (cell) {
      cell.classList.add((this.xTurn) ? 'x' : 'o');
      this.xTurn = !this.xTurn;
    },

    checkWin: function () {
      return this.constants.WINNING_COMBOS.some(COMBOS => {
        return COMBOS.every(index => {
          return this.constants.boardCells[index].classList.contains((this.xTurn) ? 'o' : 'x')
        })
      })
    },

    minimax: function (currBoardState, depth, currPlayerIcon) {

      // console.log(currBoardState)

      if (this.gameFunctions.winning(currBoardState, 'x')) {
        return { score: 10 };
      } else if (this.gameFunctions.winning(currBoardState, 'o')) {
        return { score: -10 };
      } else if (depth === 0) {
        return { score: 0 };
      }

      let moves = [];
      for (const spot of this.gameFunctions.emptyIndexies(currBoardState)) {
        let move = {};
        move.index = currBoardState[spot];
        currBoardState[spot] = currPlayerIcon;
        let result = this.gameFunctions.minimax(currBoardState, depth - 1, (currPlayerIcon === 'x' ? 'o' : 'x'));
        move.score = result.score;
        currBoardState[spot] = move.index
        moves.push(move)
      }
      
      var bestMove;
      if (currPlayerIcon === 'x') {
        var bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        var bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }

      return moves[bestMove];
    },

    emptyIndexies: function (board) {
      return board.filter(s => s !== "o" && s !== "x");
    },

    winning: function (board, player) {
      if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
      ) {
        return true;
      } else {
        return false;
      }
    },

    mapCells: function () {
      return this.constants.boardCells.map((cell, index) => {
        if (this.gameOptions.playerIcon === 'x') {
          if (cell.classList.contains('x')) {
            return 'x'
          } else if (cell.classList.contains('o')) {
            return 'o'
          } else {
            return index
          }
        } else {
          if (cell.classList.contains('x')) {
            return 'o'
          } else if (cell.classList.contains('o')) {
            return 'x'
          } else {
            return index
          }
        }
      })
    },

    gameOver: function () {
      if (this.gameFunctions.checkWin()) {
        this.constants.resultDisplay.innerText = `${(this.xTurn) ? 'O' : 'X'} wins this round`;
        this.constants.resultBoard.style.display = "block"
        return true;
      } else if (this.constants.boardCells.every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
        this.constants.resultDisplay.innerText = `It's a draw`;
        this.constants.resultBoard.style.display = "block"
        return true;
      } else {
        return false;
      }
    },

    randomMove: function () {
      const emptyCells = this.constants.boardCells.filter(cell => !cell.classList.contains('x') && !cell.classList.contains('o'))
      const randomchoice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.gameFunctions.placeMark(randomchoice);
    },

    toggleHoverClass: function () {
      this.constants.gameBoard.classList.toggle('x');
      this.constants.gameBoard.classList.toggle('o');
    }

  }
}









function startGame(gameOptions) {
  let game = new Game(gameOptions);
  game.start();

  const restartButton = document.querySelector('#play-again-btn')
  restartButton.onclick = () => game.reset();
}

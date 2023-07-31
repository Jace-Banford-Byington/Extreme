const gameBoard = 19;
const boardEmpty = 0;
const playerOne = 1;
const playerTwo = 2;
const countThree = 3;
const countFour = 4;
const winCount = 5;

let board = [];
let currentPlayer = playerOne;
playerOneName = '';
playerTwoName = '';
playerOneCaps = 0;
playerTwoCaps = 0;

gameOver = false;

startGame();

function getBoard(){
    for(let i = 0; i < gameBoard; i++){
        board[i] = [];
        for(let q = 0; q < gameBoard; q++){
            board[i][q] = boardEmpty;
        }
    }
}

function getNames(){
    playerOne = document.getElementById('playerOneName').value.trim() || 'Player One';
    playerTwo = document.getElementById('playerTwoName').value.trim() || 'Player Two';

}

function checkWin(row, col) {
    function countMoves(rowDirection, colDirection) {
      let count = 1;
      for (let i = 1; i < winCount; i++) {
        const r = row + rowDirection * i;
        const c = col + colDirection * i;
        if (r < 0 || r >= gameBoard || c < 0 || c >= gameBoard || board[r][c] !== board[row][col]) {
          break;
        }
        count++;
      }
      for (let i = 1; i < winCount; i++) {
        const r = row - rowDirection * i;
        const c = col - colDirection * i;
        if (r < 0 || r >= gameBoard || c < 0 || c >= gameBoard || board[r][c] !== board[row][col]) {
          break;
        }
        count++;
      }
      return count;
    }

    for (const [rowDirection, colDirection] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const count = countMoves(rowDirection, colDirection);
      if (count >= winCount) {
        return winCount;
      } else if (count >= countFour) {
        return countFour;
      } else if (count >= countThree) {
        return countThree;
      }
    }
    return 0;
  }

function captureOpponentPieces(row, col, rowDirection, colDirection) {
    const opponent = currentPlayer === playerOne ? playerTwo : playerOne;
    const r = row + rowDirection;
    const c = col + colDirection;
    if (r >= 0 && r < gameBoard && c >= 0 && c < gameBoard && board[r][c] === opponent) {
      board[r][c] = boardEmpty;
      if (opponent === playerOne) {
        playerOneCaptured++;
        document.getElementById('playerOneCapturedText').textContent = `${playerOneName} Captured: ${playerOneCaptured}`;
      } else {
        playerTwoCaptured++;
        document.getElementById('playerTwoCapturedText').textContent = `${playerTwoName} Captured: ${playerTwoCaptured}`;
      }
      captureOpponentPieces(r, c, rowDirection, colDirection);
    }
  }

function countMoves(rowDirection, colDirection) {
    let count = 1;
    for (let i = 1; i < winCount; i++) {
      const r = row + rowDirection * i;
      const c = col + colDirection * i;
      if (r < 0 || r >= board || c < 0 || c >= board || board[r][c] !== board[row][col]) {
        break;
      }
      count++;
    }
    for (let i = 1; i < winCount; i++) {
      const r = row - rowDirection * i;
      const c = col - colDirection * i;
      if (r < 0 || r >= board || c < 0 || c >= board || board[r][c] !== board[row][col]) {
        break;
      }
      count++;
    }
    return count;
  }


  function makeMove(row, col) {
    if (gameOver || board[row][col] !== boardEmpty) {
      return;
    }

    board[row][col] = currentPlayer;
    makeGameBoard();

    const count = checkWin(row, col);

    if (count === winCount) {
      alert(`${currentPlayer === playerOne ? playerOneName : playerTwoName} wins with 5 in a row!`);
      gameOver = true;
    } else if (count === countFour) {
      alert(`${currentPlayer === playerOne ? playerOneName : playerTwoName} has 4 in a row!`);
    } else if (count >= countThree) {
      let message = `${currentPlayer === playerOne ? playerOneName : playerTwoName} has ${count} in a row!`;
      if (count === countThree) {
        message += "\nCapturing opponent's pieces!";
      }
      alert(message);
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [rowDirection, colDirection] of directions) {
        captureOpponentPieces(row, col, rowDirection, colDirection);
      }
    }

    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  function makeGameBoard() {
    const container = document.getElementById('board');
    container.innerHTML = '';
    for (let i = 0; i < gameBoard; i++) {
      for (let q = 0; q < gameBoard; q++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = q;
        if (board[i][q] === playerOne) {
          cell.style.backgroundColor = '#77091c';
        } else if (board[i][q] === playerTwo) {
          cell.style.backgroundColor = '#E2AF09';
        }
        container.appendChild(cell);
      }
    }
  }

  function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    makeMove(row, col);
  }

  function setupEventListeners() {
    const boardContainer = document.getElementById('board');
    boardContainer.addEventListener('click', handleCellClick);
}


  function startGame() {
    getBoard();
    makeGameBoard();
    setupEventListeners();
  }


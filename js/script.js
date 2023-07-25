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

function getBoard(){
    for(let i = 0; i < gameBoard; i++){
        board[i] = [];
        for(let q = 0; q < gameBoard; q++){
            baord[i][q] = boardEmpty;
        }
    }
}

function getNames(){
    playerOne = document.getElementById('playerOneName').value.trim() || 'Player One';
    playerTwo = document.getElementById('playerTwoName').value.trim() || 'Player Two';

}

function checkWin(row, col){
    const directions = [
        [-1,0], [1,0], [0,-1], [0,1], [-1,-1], [1,1], [-1,1], [1,-1]
    ];
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

  for (const [rowDirection, colDirection] of directions) {
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


function makeMove(row, col) {
    if (gameOver || board[row][col] !== boardEmpty) {
      return;
    }

    board[row][col] = currentPlayer;
    drawBoard();

    const winCount = checkWin(row, col);

    if (winCount === winCount) {
      alert(`Player ${currentPlayer} wins with 5 in a row!`);
      gameOver = true;
    } else if (winCount === countFour) {
      alert(`Player ${currentPlayer} has 4 in a row!`);
    } else if (winCount === countThree) {
      alert(`Player ${currentPlayer} has 3 in a row!`);
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
          cell.style.backgroundColor = 'black';
        } else if (board[i][q] === playerTwo) {
          cell.style.backgroundColor = 'white';
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
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
      cell.addEventListener('click', handleCellClick);
    }
  }

  function startGame() {
    getBoard();
    makeGameBoard();
    setupEventListeners();
  }

  startGame();
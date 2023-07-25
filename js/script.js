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

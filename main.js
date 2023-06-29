const gameBoard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];

    return {board};
})()

const displayController = function() {
    console.log(` ${gameBoard.board[0]} | ${gameBoard.board[1]} | ${gameBoard.board[2]} `)
    console.log("---+---+---");
    console.log(` ${gameBoard.board[3]} | ${gameBoard.board[4]} | ${gameBoard.board[5]} `)
    console.log("---+---+---");
    console.log(` ${gameBoard.board[6]} | ${gameBoard.board[7]} | ${gameBoard.board[8]} `)
    console.log("---+---+---");

}

const Players = () => {
    const playerMark = (mark) => {
        return mark;
    }

    return {playerMark};
}

const player = Players();

const player1 = player.playerMark("X");
const player2 = player.playerMark("O");

let currentPlayer = player1

const playersMove = (index) => {
    if (gameBoard.board[index] === "") {
    gameBoard.board[index] = currentPlayer;
    displayController();
    }
    switchPlayer()
}


const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1
}





const gameBoard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true
        }
        return false
    } 

    return {getBoard, setMark};
})()

const displayController = (function() {

    const renderGameBoard = () => {
        const board = gameBoard.getBoard()
        console.log(` ${board[0]} | ${board[1]} | ${board[2]} `)
        console.log("---------");
        console.log(` ${board[3]} | ${board[4]} | ${board[5]} `)
        console.log("----------");
        console.log(` ${board[6]} | ${board[7]} | ${board[8]} `)
        console.log("---------");
    }

    return {renderGameBoard}
})()

const Players = (mark) => {
    const getMark = () => mark;

    return {getMark};
}


const player1 = Players("X");
const player2 = Players("O");



const gameLogic = (function() {
    const _checkForWin = (gameBoard, currentPlayer) => {
        const winingConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
    
    
        for (let i = 0; i < winingConditions.length; i++) {
            const combinations = winingConditions[i]
    
            const isWin = combinations.every(
                (index) => gameBoard[index] === currentPlayer.getMark()
            )
    
            if (isWin) {
                console.log(`${currentPlayer.getMark()} wins!`)
                return true;
            }
        }
        return false
    }
    
    const _checkForTie = (gameBoard) => {
        if (_checkForWin(gameBoard, currentPlayer)) {
            return false
        }
    
        for (let i = 0; i < gameBoard.length; i++) {
            if(gameBoard[i] === "") {
                return false
            }
        }
    
        return true;
    }
    
    const _restartTheGame = () => {

        for (let i = 0; i < gameBoard.getBoard().length; i++){
            gameBoard.setMark(i, "")
        }
    }
    
    
    const playGame = (index, gamePlayer) => {
        if (gameBoard.setMark(index, gamePlayer.getMark())) {
            displayController.renderGameBoard();
              
            if (_checkForWin(gameBoard.getBoard(), gamePlayer)) {
                console.log(`${gamePlayer.getMark} wins!`)
                _restartTheGame();
            }
    
            else if (_checkForTie(gameBoard.getBoard())) {
                console.log(`It is a tie`)
                _restartTheGame();
            }
            switchPlayer()
            
        
        }
        
        
    }

    
    return { playGame };
    
    
})()

const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1
}

let currentPlayer = player1;

displayController.renderGameBoard();

gameLogic.playGame(0, currentPlayer);


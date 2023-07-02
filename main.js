const result = document.querySelector(".result")
const resRestart = document.querySelector(".result-restart")
const msg = document.querySelector(".start")
const btn = document.querySelector("#btn")
const header = document.querySelector("header")
const footer = document.querySelector("footer")
const main = document.querySelector(".game-board")


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
    const score = 0
    return {getMark, score};
}


const player1 = Players("X");
const player2 = Players("O");

let currentPlayer = player1;

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
    
    const restartTheGame = (arg1, arg2, arg3) => {
        for (let i = 0; i < arg1.getBoard().length; i++){
            arg1.getBoard()[i] = ""
        }
        arg2.classList.remove("show")
        arg3.forEach((arg) => arg.textContent = "")
        console.log(`Restart`)
        if (true) {
            currentPlayer = player1
            console.log(`${currentPlayer.getMark()}`)
            console.log(`yes`)
            turnDisplay.textContent = `${currentPlayer.getMark()}'s turn`
            }
    }
    
    
    const playGame = (index, gamePlayer, disp) => {
        if (gameBoard.setMark(index, gamePlayer.getMark())) {
            displayController.renderGameBoard();
              
            if (_checkForWin(gameBoard.getBoard(), gamePlayer)) {
                console.log(`${gamePlayer.getMark()} wins!`)
                gamePlayer.score += 1
                disp.textContent = `${gamePlayer.getMark()} wins!`;
                resRestart.classList.add("show")
                
            }
    
            else if (_checkForTie(gameBoard.getBoard())) {
                console.log(`It is a tie`)
                disp.textContent = `It's a tie!`
                resRestart.classList.add("show")
            }
            switchPlayer()
            
        }
        
        
    }

    
    return { playGame, restartTheGame };
    
    
})()

const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1
}

//let currentPlayer = player1;

displayController.renderGameBoard();

//gameLogic.playGame(0, currentPlayer);

const cells = document.querySelectorAll(".cell")
const turnDisplay = document.querySelector("#turn-display")
const restart = document.querySelector("button")

//turnDisplay.textContent = `${currentPlayer.getMark()}'s turn`

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (cell.textContent === "") {
            cell.textContent = currentPlayer.getMark()
            gameLogic.playGame(index, currentPlayer, result);
            turnDisplay.textContent = `${currentPlayer.getMark()}'s turn`
        }
    });
});

restart.addEventListener("click", () => {
    gameLogic.restartTheGame(gameBoard, resRestart, cells);
    displayController.renderGameBoard();
 }
)

window.addEventListener("load", () => {
    msg.classList.add("anime")
    main.classList.add("msg")
    header.classList.add("msg")
    footer.classList.add("msg")
})

btn.addEventListener("click", () => {
    msg.classList.add("msg");
    msg.classList.remove("anime")
    main.classList.remove("msg")
    header.classList.remove("msg")
    footer.classList.remove("msg")
})

turnDisplay.textContent = `${currentPlayer.getMark()}'s turn`



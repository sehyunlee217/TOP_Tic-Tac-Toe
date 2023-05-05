// Tic Tac Toe Game

// gameBoard module 

let gameBoard = (function () {
    let boardArray = [
        "", "", "",
        "", "", "",
        "", "", ""];

    let winningSign;

    // initialize and create an empty new board
    const createBoard = () => {
        const container = document.getElementById("container");

        boardArray.forEach((arr, index) => {
            const space = document.createElement("div");
            space.classList.add("index");
            space.dataset.index = index;
            container.appendChild(space);
        });
    };

    const clearBoard = () => {
        boardArray.forEach(function (space, index) {
            boardArray[index] = "";
        });
    };

    const clearMsg = () => {
        const msgLoc = document.querySelector("#msg");
        msgLoc.replaceChildren();
    };

    // print boardArray to html
    const printBoard = () => {
        const displayBoard = document.querySelectorAll(".index");
        displayBoard.forEach((space, i) => {
            space.textContent = boardArray[i];
        });
    };

    const disableBtns = () => {
        btns = document.querySelector(".turnButtons");
        btns.style.visibility = "hidden";
    };

    const enableBtns = () => {
        btns = document.querySelector(".turnButtons");
        btns.style.visibility = "visible";

        button_O = document.querySelector(".button_O");
        button_X = document.querySelector(".button_X");

        button_O.disabled = button_X.disabled = false;
    };

    // create reset button 
    const createReset = () => {
        but1 = document.querySelector(".button_O");
        but2 = document.querySelector(".button_X");

        const resetBtn = document.createElement("button");

        resetBtn.classList.add("button_reset");
        resetBtn.textContent = "Reset";

        const btnLoc = document.querySelector("#msg");
        btnLoc.appendChild(resetBtn);

        resetBtn.addEventListener("click", () => {
            clearBoard();
            clearMsg();
            printBoard();
            enableBtns();
            gameFunction.gameMsg("Tic Tac Toe");
        });
    };

    // Place sign given the index and the sign
    const placeSignonboard = (index, sign) => {
        button_O = document.querySelector(".button_O");
        button_X = document.querySelector(".button_X");
        // sign can be placed if and only if current space is empty("").
        if (boardArray[index] === "") {
            // sign can be placed if and only if button is not disabled
            if (sign == "O" && button_O.disabled == false) {
                boardArray[index] = sign;
            }
            if (sign == "X" && button_X.disabled == false) {
                boardArray[index] = sign;
            }
        }

        // if game is over
        if (checkforWinner(boardArray) == true) {
            clearMsg();
            gameFunction.gameMsg(`'${ winningSign }' Wins!`);
            disableBtns();
            createReset();

        }
        // if game is tied
        if (!boardArray.includes("")) {
            clearMsg();
            gameFunction.gameMsg("It's a Tie!");
            disableBtns();
            createReset();
        }

    };

    // check if all items in sliced array are equal
    const allElementsEqual = (arr) => arr.every(e => e == arr[0]);

    // check if sliced array is empty
    const isArrayEmpty = (arr) => arr.every((e) => (e) === "");

    const checkforWinner = (boardArray) => {
        // return sign if there is a winner
        // check horizontal row
        let result = false;
        // set array for each row,
        let row1 = boardArray.slice(0, 3);
        let row2 = boardArray.slice(3, 6);
        let row3 = boardArray.slice(6, 9);
        // column, 
        let col1 = [].concat(boardArray[0], boardArray[3], boardArray[6]);
        let col2 = [].concat(boardArray[1], boardArray[4], boardArray[7]);
        let col3 = [].concat(boardArray[2], boardArray[5], boardArray[8]);
        // diagonal combinations 
        let diag1 = [].concat(boardArray[0], boardArray[4], boardArray[8]);
        let diag2 = [].concat(boardArray[2], boardArray[4], boardArray[6]);

        let arrs = [row1, row2, row3, col1, col2, col3, diag1, diag2];
        // go through each array that could win the game
        for (const arr of arrs) {
            if (!isArrayEmpty(arr)) {
                arrCheck = allElementsEqual(arr);
                if (arrCheck == true) {
                    result = true;
                    winningSign = arr[0];
                }
            }
        };
        return result;
    };

    return {
        createBoard, clearBoard, printBoard, placeSignonboard
    };
})();

let gameFunction = (function () {
    let playerSign = "";
    // Add event listener to each button -> playerSign stores currently selected button.
    const getPlayerSign = () => {
        const curPlayer = document.querySelectorAll("button");
        curPlayer.forEach((button) => {
            button.addEventListener("click", () => {
                playerSign = button.dataset.sign;
            });
        });
    };

    const nextTurn = (sign) => {
        let curPlayer, nextPlayer;
        // disable the button that that sign just used.
        if (sign == "O") {
            curPlayer = document.querySelector(".button_O");
            nextPlayer = document.querySelector(".button_X");
            curPlayer.disabled = true;
            nextPlayer.disabled = false;
        }
        if (sign == "X") {
            curPlayer = document.querySelector(".button_X");
            nextPlayer = document.querySelector(".button_O");
            curPlayer.disabled = true;
            nextPlayer.disabled = false;
        }
    };

    const playerTurn = () => {
        getPlayerSign();
        const spaces = document.querySelectorAll(".index");
        spaces.forEach((space) => {
            space.addEventListener("click", () => {
                gameBoard.placeSignonboard(space.dataset.index, playerSign);
                gameBoard.printBoard();
                nextTurn(playerSign);
            });
        });
    };

    const gameMsg = (dispMsg) => {
        const msg = document.createElement("h3");
        msg.textContent = dispMsg;

        const container = document.getElementById("msg");
        container.appendChild(msg);
    };

    return {
        getPlayerSign, playerTurn, gameMsg
    };

}
)();

// Main funtion to execute Game 
let execGame = () => {
    // ---------------- game starts at this point -----------------
    // initialize gameboard. 
    gameBoard.createBoard();
    // start turns if O or X is clicked. 
    gameFunction.playerTurn();
    // check if someone won the game
    // pop up rematch button, and clear board + display board
};

execGame();

















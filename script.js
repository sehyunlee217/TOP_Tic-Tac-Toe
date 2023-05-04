// Tic Tac Toe Game

// gameBoard module 

let gameBoard = (function () {
    let boardArray = [
        "", "", "",
        "", "", "",
        "", "", ""];

    // initialize and create an empty new board
    const createBoard = () => {
        let num = 0;
        const container = document.getElementById("container");

        boardArray.forEach(() => {
            const space = document.createElement("div");
            space.classList.add("index");
            space.dataset.index = num;
            num++;

            container.appendChild(space);
        });

    };

    const clearBoard = () => {
        boardArray.forEach(function (space, index) {
            boardArray[index] = "";
        });
    };

    // print boardArray to html
    const printBoard = () => {
        let i = 0;

        const displayBoard = document.querySelectorAll(".index");
        displayBoard.forEach((space) => {
            space.textContent = boardArray[i];
            i++;
        });
    };

    // Place sign given the index and the sign
    const placeSignonboard = (index, sign) => {
        button_O = document.querySelector(".button_O");
        button_X = document.querySelector(".button_X");

        let WinnerExists = checkforWinner(boardArray);

        // if there is no winner yet,
        if (WinnerExists == false) {
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
        }
        // if there is a winner
        else {
            console.log("there is a winner");
        }

    };

    // check if all items in sliced array are equal
    const allElementsEqual = (arr) => arr.every(e => e == arr[0]);

    // check if sliced array is empty
    const isArrayEmpty = (arr) => arr.every((e) => (e) === "");

    // const checkNestedArray = (arr) => {
    //     let result = false;
    //     for (nestedArr in arr) {
    //         if (!isArrayEmpty(nestedArr)) {
    //             nestedResult = allElementsEqual(nestedArr);
    //             if (nestedResult == true) {
    //                 result = true;
    //             }
    //         }
    //     }

    //     return result;
    // };



    const checkforWinner = (boardArray) => {
        // return sign if there is a winner
        // check horizontal row
        let result = false;

        let row1 = boardArray.slice(0, 3);
        let row2 = boardArray.slice(3, 6);
        let row3 = boardArray.slice(6, 9);

        let rows = [row1, row2, row3];

        // result = checkNestedArray(rows);

        for (const row of rows) {
            console.log(row);
            if (!isArrayEmpty(row)) {
                rowCheck = allElementsEqual(row);
                if (rowCheck == true) {
                    result = true;
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
        else {
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

    return {
        getPlayerSign, playerTurn
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
    // console.log("hi");

};

execGame();

















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
        // sign can be placed if and only if current space is empty("").
        if (boardArray[index] === "") {
            boardArray[index] = sign;
        }
    };

    return {
        createBoard, clearBoard, printBoard, placeSignonboard
    };

})();

let gameFunction = (function () {

    let playerSign = "";

    // Add event listener to each button -> playerSign stores currently selected button.
    const getPlayerSign = () => {
        const curPlayer = document.querySelectorAll(".button");

        curPlayer.forEach((button) => {
            button.addEventListener("click", () => {
                playerSign = button.dataset.sign;
                button.classList.add("enabled");
            });
        });

    };

    const nextTurn = (sign) => {
        const curPlayer = document.querySelector(".enabled");
        const nextPlayer = document.querySelector(".disabled");

        console.log(curPlayer);
        console.log(nextPlayer);

        // if current sign is O, 
        // disable O, enable X
        if (curPlayer.dataset.sign == "O") {
            console.log("O");
            curPlayer.classList.remove("enabled");
            curPlayer.classList.add("disabled");
            // nextPlayer.classList.add("enabled");
        }
        // if current sign is X
        else {
            console.log("X");
            curPlayer.classList.remove("enabled");
            curPlayer.classList.add("disabled");
            // nextPlayer.classList.add("enabled");
        }
    };





    // A sign can only be placed once in the gameBoard.
    // can't press other sign button once pressed.

    // add css color for disabled, enabled.

    // Once sign is selected, add new sign in  boardArray, then print board. 

    // need to add algorithm for checking for 3 in a row/column/diagonal

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

    // initialize gameboard
    gameBoard.createBoard();

    gameFunction.getPlayerSign();
    gameFunction.playerTurn();




};

// Player Factory Functions 

// player need name, 
// whether the player is O or X, 
// the number of turn right now.

const Player = (name, playerSign) => {
    // player selects an index from the gameBoard
    // [0,1,2]
    // [3,4,5]
    // [6,7,8]

    // apply the playetSign(X or O) to gameBoard[selectedIndex]

    const placeSignOnboard = (selectedIndex) => {
        gameBoard.placeSignonboard(selectedIndex, playerSign);
    };

    return { placeSignOnboard };

};

execGame();

















// const addSign = (sign, space) => {
//     console.log(space.dataset.space);

//     const signElement = document.createElement("div");
//     signElement.textContent = sign;

//     space.appendChild(signElement);

// };

// const spaces = document.querySelectorAll(".index");
// // console.log(spaces);

// spaces.forEach((space) => {
//     space.addEventListener("click", () => gameBoard.placeSignonboard(1, "X"));
// });



// Tic Tac Toe Game

// gameBoard module 

let gameBoard = (function () {
    let boardArray = [
        "", "X", "",
        "", "", "O",
        "", "X", ""];

    // initialize and create an empty new board
    const createBoard = () => {
        const container = document.getElementById("container");

        boardArray.forEach(() => {
            const space = document.createElement("div");
            space.classList.add("index");
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
        boardArray[index] = sign;
    };

    return {
        createBoard, clearBoard, printBoard, placeSignonboard
    };

})();

// Game 




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

gameBoard.createBoard();
gameBoard.printBoard();
gameBoard.clearBoard();
gameBoard.printBoard();

















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



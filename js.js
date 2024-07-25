
// PLAYERS' NAME

const Player = name => {
    const playerName = name[0].toUpperCase() + name.slice(1);
    const getName = () => playerName;

    return {getName};
}

let playerX;
let playerO;

// GAMEBOARD


let gameboard = (function() {
    let line1 = [0, 0, 0];
    let line2 = [0, 0, 0];
    let line3 = [0, 0, 0];

    return [line1, line2, line3];
})();


// GAME LOGIC

const game = (function() {

    // GLOBAL SCOPED VARIABLES
    
    let roundMarker = 'X';
    const cells = document.querySelectorAll('.cell');
    const results = document.querySelector('.results');
    const dialog = document.querySelector('dialog');
    dialog.showModal();
    const playerXName = document.querySelector('#X');
    const playerOName = document.querySelector('#O');
    const startBtn = document.querySelector('.startBtn');


    // LISTEN "START" BUTTON, SET OR NOT SET PLAYERS' NAME
    
    startBtn.addEventListener('click', () => {
        if (playerXName.value != '' && playerOName.value != '') {
            playerX = Player(playerXName.value);
            playerO = Player(playerOName.value);
        }
        dialog.close();
        dialog.style.display = 'none';
    })


    // LISTEN CELLS

    cells.forEach(cell => cell.addEventListener('click', () => {
    
        const lineIndex = cell.getAttribute('line');
        const cellIndex = cell.getAttribute('cell');
    
        if (gameboard[lineIndex][cellIndex] === 0 && game.results.innerText === 'Tic-Tac-Toe') {
            cell.innerHTML = game.getMarker();
            gameboard[lineIndex][cellIndex] = game.getMarker();
            game.changeMarker();
            game.checkWinner();
        }
    
    }));

    // CHANGE MARKER AFTER MOVE

    const changeMarker = () => {
        if (roundMarker === 'X') {
            roundMarker = 'O';
        } else {
            roundMarker = 'X';
        };
    };

    // GET ACTUAL MARKER

    const getMarker = () => {
        return roundMarker;
    };

    // CHECK WIN COMBINATION AND ANOUNCE ABOUT THIS

    const checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (gameboard[i].every(element => element === gameboard[i][0] && gameboard[i][0] != 0)) {
                if (playerX != undefined) {
                    if (gameboard[i][0] === 'X') {
                        results.innerHTML = `${playerX.getName()} got three ${gameboard[i][0]} horizontally`; 
                    } else {
                        results.innerHTML = `${playerO.getName()} got three ${gameboard[i][0]} horizontally`;
                    }
                } else {
                    results.innerHTML = `Three ${gameboard[i][0]} horizontally`;
                }
            } else if (gameboard.every(element => element[i] === gameboard[0][i] && gameboard[0][i] != 0)) {
                if (playerX != undefined) {
                    if (gameboard[0][i] === 'X') {
                        results.innerHTML = `${playerX.getName()} got three ${gameboard[0][i]} vertically`; 
                    } else {
                        results.innerHTML = `${playerO.getName()} got three ${gameboard[0][i]} vertically`;
                    }
                } else {
                    results.innerHTML = `Three ${gameboard[0][i]} vertically`;
                }
            } else if (gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2] && gameboard[1][1] != 0 || gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0] && gameboard[1][1] != 0) {
                if (playerX != undefined) {
                    if (gameboard[1][1] === 'X') {
                        results.innerHTML = `${playerX.getName()} got three ${gameboard[1][1]} diagonally`; 
                    } else {
                        results.innerHTML = `${playerO.getName()} got three ${gameboard[1][1]} diagonally`;
                    }
                } else {
                    results.innerHTML = `Three ${gameboard[1][1]} diagonally`;
                }
            } else if (gameboard.every(line => line.every(cell => cell != 0))) {
                results.innerHTML = `It's a Tie`;
            } 
        }
    };

    // RESET GAME

    const resetGame = () => {
        roundMarker = 'X';
        cells.forEach(cell => cell.innerHTML = '');
        results.innerHTML = 'Tic-Tac-Toe';
        gameboard.forEach(line => line.fill(0));
    }

    return {checkWinner, changeMarker, getMarker, resetGame, results};
})();

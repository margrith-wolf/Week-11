let turnText = document.getElementById('turnText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

//console.log(boxes);

const O_TEXT = "0";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

//console.log(spaces);

const playGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    //console.log(e.target);
    const id = e.target.id;

    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon() !==false){
            let winning_blocks = playerHasWon()

            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            return;
        }

        if(currentPlayer == X_TEXT){
            currentPlayer = O_TEXT;
            turnText.innerHTML = ("O, it's your turn!");
        } else {
            currentPlayer = X_TEXT;
            turnText.innerHTML = ("X, it's your turn!");
        };

    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let[a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            turnText.innerHTML = (`${currentPlayer} has won!`);
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    })

    playerText = 'Tic Tac Toe';

    currentPlayer = X_TEXT;

    turnText.innerHTML = ("X, you start!");
}

playGame();
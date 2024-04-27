"use strict";
document.addEventListener('DOMContentLoaded', function(){
    // game variables
    const NUMCELLS = 9;
    let turnNumber = 0;
    let xPlayerTurn = true;
    const winningPositions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    const currentPlayerTitle = document.getElementById('currentPlayer');
    currentPlayerTitle.innerText = xPlayerTurn ? 'X' : 'O';
    // section containers
    const initialScreen = document.getElementById('initial-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameContainer = gameScreen.querySelector('.game__container');
    const finalResultScreen = document.getElementById('result-screen');
    // numOfClasses to hide the elements
    const hideInitial = 'initial'
    const hideGame = 'game';
    const hideResult = 'modal';
    // buttons
    const startGame = document.querySelector('.initial__button');
    const reStartGame = document.querySelector('.modal__button');

    // functions///
    function restoreGame() {
        finalResultScreen.classList.add(hideResult);
        gameScreen.classList.remove(hideGame);
        turnNumber = 0;
        xPlayerTurn = true;
        currentPlayerTitle.innerText = xPlayerTurn ? 'X' : 'O';
        gameContainer.addEventListener('click', catchCell);
        createCells();
    }
    // show result
    function showResult(winner) {
        gameContainer.removeEventListener('click', catchCell);
        // i want so charge with a delay the result:
        setTimeout(()=>{
            
            gameScreen.classList.add(hideGame);
            finalResultScreen.classList.remove(hideResult);
            let resultTitle = document.querySelector('.modal__title');

            if(winner === 'circle' || winner === 'cross'){
            resultTitle.innerText = `The winner is the ${winner}!`;
            }else{
                resultTitle.innerText = `It's a tie!`;
            }
        }, 2000);
    }
    // check if there's a winner
    function checkPlayer(gameCell){
        let shapeClass = gameCell.classList.contains('cross') ? 'cross' : 'circle';
        const cells = gameContainer.querySelectorAll('.game__cell');
        let numOfClasses = 0;

        for(let i = 0; i < winningPositions.length; i++){
            let array = winningPositions[i];
            for(let j = 0; j < array.length; j++){
                if(cells[array[j]].classList.contains(shapeClass)){
                    numOfClasses++;
                }
            }
            if(numOfClasses === 3){
                showResult(shapeClass);
                return true;
            }else{
                numOfClasses = 0;
            }
        }
        if(numOfClasses === 0) return false;
    }
    // Draw shape
    function drawShape(gameCell){
        if(!gameCell.classList.contains('cross') && !gameCell.classList.contains('circle')){
            if(xPlayerTurn){
                gameCell.classList.add('cross');
                xPlayerTurn = !xPlayerTurn;
                turnNumber++;
                currentPlayerTitle.innerText = xPlayerTurn ? 'X' : 'O';
                return true;
            }else{
                gameCell.classList.add('circle');
                xPlayerTurn = !xPlayerTurn;
                turnNumber++;
                currentPlayerTitle.innerText = xPlayerTurn ? 'X' : 'O';
                return true;
            }
        }else{
            alert(`There's already a shape`)
            return false;
        }
    }
    // manage game
    function manageGame(gameCell){
        if(drawShape(gameCell)){
            if(turnNumber > 3){
                if(!checkPlayer(gameCell)){
                    // if there's no winner and it's the turn #9 then there's a tie
                    if(turnNumber === 9){
                        showResult('tie');
                    }
                }
            }
        }   
    }
    // create cells
    function createCells(){
        // delete posible elements
        while(gameContainer.firstElementChild){
            gameContainer.firstElementChild.remove();
        }
        // create elements
        for(let i = 0; i < NUMCELLS; i++){
            const gameCell = document.createElement('div');
            gameCell.classList.add('game__cell');
            gameContainer.appendChild(gameCell);
        }
    } 

    // DOM EVENTS
    startGame.addEventListener('click', function(){
        initialScreen.classList.add(hideInitial);
        gameScreen.classList.remove(hideGame);
        createCells();
    });

    // event bubbling lo catch the cell
    function catchCell(e){
        if(e.target.classList.contains('game__cell')){
            manageGame(e.target);
            // send the cell to the function manage game
        }
    }
    gameContainer.addEventListener('click', catchCell);

    reStartGame.addEventListener('click', restoreGame);
});//domcontentloaded


console.log('add animations');
console.log('create box shadow for the text');
console.log('box shadow when there is a winner');
console.log('animation to the shapes');


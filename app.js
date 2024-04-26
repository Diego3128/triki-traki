"use strict";
document.addEventListener('DOMContentLoaded', function(){
    // game variables
    const numCells = 9;
    let numTurns = 0;
    let xPlayerTurn = true;
    const winningPositions = [];

    // section containers
    const initialScreen = document.getElementById('initial-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameContainer = gameScreen.querySelector('.game__container');
    const resultScreen = document.getElementById('result-screen');
    // classes to hide the elements
    const hideInitial = 'initial'
    const hideGame = 'game';
    const hideResult = 'modal';
    // buttons
    const startGame = document.querySelector('.initial__button');
    const reStartGame = document.querySelector('.modal__button');
    // cell in real time
    const gameHTMLCells = [];
    // functions
    // create cells
    function createCells(){
        for(let i = 0; i < numCells; i++){
            const gameCell = document.createElement('div');
            gameCell.classList.add('game__cell');
            gameCell.innerText = i;
            gameHTMLCells.push(gameCell);
            gameContainer.appendChild(gameCell);
        }
        
    }
    // manage game
    function manageGame(gameCell){
        // check if there's a wiiner
            // cheks if there's a tie

        if(xPlayerTurn){
            gameCell.classList.add('cross');
            xPlayerTurn = !xPlayerTurn;
        }else{
            gameCell.classList.add('circle');
            xPlayerTurn = !xPlayerTurn;
        }
        console.log(gameHTMLCells);

    }

    // DOM EVENTS
    startGame.addEventListener('click', function(){
        initialScreen.classList.add(hideGame);
        gameScreen.classList.remove(hideGame);
        createCells();
    });

    // event bubbling lo catch the cell
    gameContainer.addEventListener('click', function(e){
        if(e.target.classList.contains('game__cell')){
            manageGame(e.target);
        }
    });


});//domcontentloaded

alert('create winning positions');
alert('create loops to check winner positions');
alert('update the current player');
alert('set options to tie and count the number of turns');


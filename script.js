'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');//This is faster than querySelector.
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;


// Starting conditions
const init = function (){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // for (let i = 0; i < scores.length; i++){
    //     scores[i] = 0;
    //     document.getElementById(`score--${i}`).textContent = 0;
    //     document.getElementById(`current--${i}`).textContent = 0;
    //     document.querySelector(`.player--${i}`).classList.remove('player--winner');
    // }

    current0Element.textContent = 0;
    current1Element.textContent = 0;
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    
    diceElement.classList.add('hidden');
    player1Element.classList.remove('player--active');
    player0Element.classList.add('player--active');
}

init();

const switchPlayer = function (){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;
    player0Element.classList.toggle('player--active');//.toggle it will add the class if it is not there and if it is there, it will remove it.
    player1Element.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        // 3. Check for rolled 1: if true, switch to next player
        if(dice !== 1){
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100){
            // Finish the game
            playing = false;
            diceElement.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});


btnNew.addEventListener('click', init);
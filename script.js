//Capture data from DOM on variables.
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const brnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Variables

//Functions
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //TOGGLE- if the class does not exist then it is added, if it existsm it is removed
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
let scores;
let currentScore;
let activePlayer;
let activeGame;

//Starting conditions
const startingGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  activeGame = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

//Rolling the dice

brnRoll.addEventListener('click', () => {
  if (activeGame) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Showing dice picture on screen
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check rolled dice.
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//Hold button
btnHold.addEventListener('click', () => {
  if (activeGame) {
    //Transfer current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check winner
    if (scores[activePlayer] >= 100) {
      activeGame = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
//New game functionality -- Resetting the game
btnNew.addEventListener('click', startingGame);

//Calling functions
startingGame();

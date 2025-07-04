// const score0El = document.getElementById('score--0');
// const score1El = document.getElementById('score--1');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');
// const player0El = document.querySelector('.player--0');
// const player1El = document.querySelector('.player--1');
// const diceEl = document.getElementById('dice');
// const btnNew = document.getElementById('btn-new-game');
// const btnRoll = document.getElementById('btn-roll');
// const btnHold = document.getElementById('btn-hold');

// let scores, currentScore, activePlayer, playing;

// function init() {
//   scores = [0, 0];
//   currentScore = 0;
//   activePlayer = 0;
//   playing = true;

//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;

//   diceEl.style.display = 'none';

//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
// }

// init();

// function switchPlayer() {
//   document.getElementById(`current--${activePlayer}`).textContent = 0;
//   currentScore = 0;

//   switch (activePlayer) {
//     case 0:
//       activePlayer = 1;
//       break;
//     case 1:
//       activePlayer = 0;
//       break;
//   }

//   player0El.classList.toggle('player--active');
//   player1El.classList.toggle('player--active');
// }

// btnRoll.addEventListener('click', function () {
//   switch (true) {
//     case playing === true:
//       const dice = Math.trunc(Math.random() * 6) + 1;
//       diceEl.style.display = 'block';
//       diceEl.src = `dice${dice}.jpg`;

//       switch (true) {
//         case dice !== 1:
//           currentScore += dice;
//           document.getElementById(`current--${activePlayer}`).textContent = currentScore;
//           break;
//         default:
//           switchPlayer();
//           break;
//       }
//       break;
//   }
// });

// btnHold.addEventListener('click', function () {
//   switch (true) {
//     case playing === true:
//       scores[activePlayer] += currentScore;
//       document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

//       switch (true) {
//         case scores[activePlayer] >= 100:
//           playing = false;
//           diceEl.style.display = 'none';
//           document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
//           document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
//           break;
//         default:
//           switchPlayer();
//           break;
//       }
//       break;
//   }
// });

// btnNew.addEventListener('click', init);






'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.getElementById('dice');
const btnNew = document.getElementById('btn-new-game');
const btnRoll = document.getElementById('btn-roll');
const btnHold = document.getElementById('btn-hold');

let score0, score1, currentScore, activePlayer, playing, rollInterval;

const init = function () {
  score0 = 0;
  score1 = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  if (rollInterval) {
    clearInterval(rollInterval);
    rollInterval = null;
  }
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const rollDice = function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice${dice}.jpg`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
};

const startRolling = function () {
  if (playing && !rollInterval) {
    rollDice();
    rollInterval = setInterval(rollDice, 3000); 
  }
};

btnRoll.addEventListener('click', startRolling);

btnHold.addEventListener('click', function () {
  if (!playing) return;

  if (activePlayer === 0) {
    score0 += currentScore;
    score0El.textContent = score0;
    if (score0 >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      player0El.classList.add('player--winner');
      player0El.classList.remove('player--active');
      clearInterval(rollInterval);
      rollInterval = null;
    } else {
      switchPlayer();
    }
  } else {
    score1 += currentScore;
    score1El.textContent = score1;
    if (score1 >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      player1El.classList.add('player--winner');
      player1El.classList.remove('player--active');
      clearInterval(rollInterval);
      rollInterval = null;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

init();

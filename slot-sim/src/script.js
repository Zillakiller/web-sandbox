const balanceElement = document.getElementById('balance');
const rtpElement = document.getElementById('rtp');
const betElement = document.getElementById('bet');
const spinButton = document.getElementById('spin-button');
const outcomesDiv = document.getElementById('outcomes');

const winsCacheLength = 10;

let outcomeElements = [];
for (let i = 1; i <= winsCacheLength; i++) {
  const outcome = document.createElement('p');
  outcomesDiv.appendChild(outcome);
  outcomeElements[i - 1] = outcome;
}

// each element of wins is an array with two value [amount, ifProfit]
let wins = [];
function insertWin(amount, didProfit) {
  wins.unshift([amount, didProfit]);
  if (wins.length > winsCacheLength) {
    wins.pop();
  }
  updateWins();
}
function updateWins() {
  console.log(wins.length);
  for (let i = 0; i < wins.length; i++) {
    const element = outcomeElements[i];
    const color = wins[i][1] ? 'green' : 'red'; 
    element.style.color = color;
    outcomeElements[i].innerText = 'You won $' + wins[i][0].toFixed(2);
  }
}

let balance = 1000;
balanceElement.innerText = balance;

function spin(rtp, bet) {
  // Deduct the bet from the user's balance
  balance -= bet;

  let winAmount = +((bet * (rtp / 100)).toFixed(2));
  insertWin(winAmount, winAmount > bet);

  balance += winAmount;
  balanceElement.innerText = balance.toFixed(2);
}

function onSpinButtonClicked() {
  // Get the RTP
  const rtp = Math.random() * 200;
  // const rtp = parseFloat(rtpElement.value);
  // Get the Bet size
  const bet = parseFloat(betElement.value);
  // Run the spin function
  spin(rtp, bet);
}

spinButton.addEventListener('click', onSpinButtonClicked);

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, stillPlaying;

function init() {
    score = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    stillPlaying = 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('name-1').style.color = "Black";
    document.getElementById('name-0').style.color = "Black";

}

function rollDice() {
    if (stillPlaying == 0) {
        document.querySelector('.dice').style.display = 'block';
        var dice = Math.ceil(Math.random() * 6);
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        if (dice === 1)
            passOver();
        else {
            var player = document.querySelector('#current-' + activePlayer);
            player.textContent = parseInt(player.textContent) + dice;
        }
    }
}

function passOver() {
    var current = document.querySelector('#current-' + activePlayer);
    var currentScore = document.getElementById('score-' + activePlayer);
    current.textContent = '0';
    if (stillPlaying == 0) {
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        if (activePlayer === 0)
            activePlayer = 1;
        else if (activePlayer === 1)
            activePlayer = 0;
        current.textContent = '0';
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';

    }
}

function hold() {
    if (stillPlaying == 0) {

        var current = document.querySelector('#current-' + activePlayer);
        var currentScore = document.getElementById('score-' + activePlayer);

        score[activePlayer] = parseInt(currentScore.textContent) + parseInt(current.textContent);
        currentScore.textContent = score[activePlayer];
        current.textContent = 0;
        if (parseInt(currentScore.textContent) > 10) {
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('#name-' + activePlayer).style.color = "Red";
            stillPlaying = 1;
        }
        else {
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
            if (activePlayer === 0)
                activePlayer = 1;
            else if (activePlayer === 1)
                activePlayer = 0;
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        }
        document.querySelector('.dice').style.display = 'none';
    }
}

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', hold);

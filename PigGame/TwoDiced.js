/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)


*/

var score, roundScore, activePlayer, stillPlaying, previousDice, winningScore;

function init() {
    score = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    stillPlaying = 0;
    previousDice = 0;
    winningScore = 10;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('name-1').style.color = "Black";
    document.getElementById('name-0').style.color = "Black";

}

init();

function rollDice() {
    if (stillPlaying == 0) {

        document.querySelector('#dice1').style.display = 'block';
        document.querySelector('#dice2').style.display = 'block';
        
        //var previousDice = document.querySelector('.dice').getAttribute('src');
        //previousDice = previousDice.charAt(5);
        var dice1 = Math.ceil(Math.random() * 6);
        var dice2 = Math.ceil(Math.random() * 6);
        
        document.querySelector('#dice1').src = 'dice-' + dice1 + '.png';
        document.querySelector('#dice2').src = 'dice-' + dice2 + '.png';
        
        if (dice1 === 1 || dice2===1) {
                console.log('Sides switched because you got 1 on some');
            passOver();

        }
        else {
            var player = document.querySelector('#current-' + activePlayer);
            player.textContent = parseInt(player.textContent) + dice1 + dice2;
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
        document.querySelector('#dice1').style.display = 'none';
        document.querySelector('#dice2').style.display = 'none';
        
    }
}

function hold() {
    if (stillPlaying == 0) {

        var current = document.querySelector('#current-' + activePlayer);
        var currentScore = document.getElementById('score-' + activePlayer);

        score[activePlayer] = parseInt(currentScore.textContent) + parseInt(current.textContent);
        currentScore.textContent = score[activePlayer];
        current.textContent = 0;
        if (parseInt(currentScore.textContent) >= parseInt(winningScore)) {
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            //document.querySelector('#name-' + activePlayer).style.color = "Red";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

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
        document.querySelector('#dice1').style.display = 'none';
        document.querySelector('#dice2').style.display = 'none';
        
    }
}

function resetWiningScore() {
    if (stillPlaying == 0) {

        var response = prompt("Please enter the new Winning Score");
        if (response != undefined && response !== '0' && response != null) {
            if (isNaN(parseInt(response))) {
                alert('Could not update the winning score as it is not an integer');
                return false;
            }
            winningScore = parseInt(response);
            console.log("Winning Score is updated to " + winningScore);

        }
    }
}


document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-resetScore').addEventListener('click', resetWiningScore);

var currentGame;
var winningTotal = 100;
window.onload = function () {
    document.getElementById("add-players").onclick = addPlayers;
    document.getElementById("roll").onclick = rollDice;
    document.getElementById("end-turn").onclick = endTurn;
};
function addPlayers() {
    var pOneElem = document.getElementById("player-one");
    var pTwoElem = document.getElementById("player-two");
    pOneElem.nextElementSibling.innerHTML = "";
    pTwoElem.nextElementSibling.innerHTML = "";
    if (pOneElem.value.trim() == "") {
        pOneElem.nextElementSibling.innerHTML = "*required";
    }
    if (pTwoElem.value.trim() == "") {
        pTwoElem.nextElementSibling.innerHTML = "*required";
    }
    else {
        var p1 = new Player(pOneElem.value.trim(), 0);
        var p2 = new Player(pTwoElem.value.trim(), 0);
        currentGame = new newGame(p1, p2, winningTotal);
        document.getElementById("p-one").innerText = currentGame.playerOne.name;
        document.getElementById("p-two").innerText = currentGame.playerTwo.name;
        showGameView();
        showCurrPlayer();
    }
}
function showGameView() {
    var playerNamesPg = document.getElementById("enter-players-names");
    var showGame = document.getElementById("show-game");
    playerNamesPg.style.display = "none";
    showGame.style.display = "block";
    displayMessage("Good luck you two!");
}
function rollDice() {
    var randomRoll = Math.floor(Math.random() * 6) + 1;
    if (randomRoll == 1) {
        loseTurn();
    }
    else {
        addCurrScore(randomRoll);
    }
}
function endTurn() {
    updateScores(currentGame.currentPlayer);
    currentGame.changeCurrentPlayer();
    showCurrPlayer();
    resetCurrScore();
}
function updateScores(currPlayer) {
    var totalScore = currPlayer.score += getCurrScore();
    if (currPlayer == currentGame.playerOne) {
        document.getElementById("p-one")
            .nextElementSibling.innerText = totalScore.toString();
    }
    else {
        document.getElementById("p-two")
            .nextElementSibling.innerText = totalScore.toString();
    }
    checkForMessages(currPlayer);
    if (currPlayer.score >= winningTotal) {
        winner(currPlayer);
    }
}
function checkForMessages(currPlayer) {
    if (currPlayer.score >= winningTotal - 10) {
        displayMessage(currPlayer.name + " sure is getting close!");
    }
    else if (currPlayer.score - currentGame.currentOpponent.score >= 30) {
        displayMessage("Looks like " + currentGame.currentOpponent.name
            + " didn't bring their A game todsay.....");
    }
}
function winner(player) {
    displayMessage(player.name + " wins!!!!! Great game guys!");
}
function loseTurn() {
    displayMessage("OUCH! " + currentGame.currentPlayer.name + " rolled a ONE :(");
    resetCurrScore();
    currentGame.changeCurrentPlayer();
    showCurrPlayer();
}
function showCurrPlayer() {
    var currPlayerElem = document.getElementById("player-current-turn");
    if (currPlayerElem.innerText == "") {
        currentGame.changeCurrentPlayer();
    }
    currPlayerElem.innerText = currentGame.currentPlayer.name.toString();
}
function getCurrScore() {
    var currScoreElem = document.getElementById("curr-round-score");
    return parseInt(currScoreElem.innerText);
}
function addCurrScore(lastRoll) {
    var currScore = getCurrScore();
    document.getElementById("curr-round-score").innerText = (currScore + lastRoll).toString();
}
function displayMessage(msg) {
    var messageBox = document.getElementById("message");
    messageBox.innerText = msg;
}
function resetCurrScore() {
    document.getElementById("curr-round-score").innerText = '0';
}
var Player = (function () {
    function Player(name, score) {
        this.name = name;
        this.score = score;
    }
    return Player;
}());
var newGame = (function () {
    function newGame(playerOne, playerTwo, winningTotal) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.randomFirstPlayer();
        this.winningTotal = winningTotal;
    }
    newGame.prototype.randomFirstPlayer = function () {
        var randomBool = Math.random() >= 0.5;
        if (randomBool) {
            this.currentPlayer = this.playerOne;
            this.currentOpponent = this.playerTwo;
        }
        else {
            this.currentPlayer = this.playerTwo;
            this.currentOpponent = this.playerOne;
        }
    };
    newGame.prototype.changeCurrentPlayer = function () {
        if (this.currentPlayer == this.playerOne) {
            this.currentPlayer = this.playerTwo;
            this.currentOpponent = this.playerOne;
        }
        else {
            this.currentPlayer = this.playerOne;
            this.currentOpponent = this.playerTwo;
        }
    };
    return newGame;
}());

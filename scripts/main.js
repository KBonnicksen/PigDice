window.onload = function () {
    document.getElementById("add-players").onclick = addPlayers;
    document.getElementById("roll").onclick = rollDice;
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
        document.getElementById("p-one").innerText = p1.name;
        document.getElementById("p-two").innerText = p2.name;
        showGameView();
        var currentGame = new newGame(p1, p2);
        showCurrPlayer(currentGame);
    }
}
function playRound(currentGame) {
    showCurrPlayer(currentGame);
}
function showGameView() {
    var playerNamesPg = document.getElementById("enter-players-names");
    var showGame = document.getElementById("show-game");
    playerNamesPg.style.display = "none";
    showGame.style.display = "block";
}
function rollDice(currPlayer) {
    var randomRoll = Math.floor(Math.random() * 6) + 1;
    if (randomRoll == 1) {
        loseTurn();
    }
    else {
        addCurrScore(randomRoll);
    }
}
function loseTurn() {
    document.getElementById("curr-round-score").innerText = '0';
}
function showCurrPlayer(game) {
    var currPlayerElem = document.getElementById("player-current-turn");
    if (currPlayerElem.innerText != "") {
        game.changeCurrentPlayer();
    }
    currPlayerElem.innerText = game.currentPlayer.toString();
}
function addCurrScore(lastRoll) {
    var currScoreElem = document.getElementById("curr-round-score");
    var currScore = parseInt(currScoreElem.innerText);
    currScoreElem.innerText = (currScore + lastRoll).toString();
}
var newGame = (function () {
    function newGame(playerOne, playerTwo) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.currentPlayer = this.randomFirstPlayer();
    }
    newGame.prototype.randomFirstPlayer = function () {
        var randomBool = Math.random() >= 0.5;
        if (randomBool) {
            return this.playerOne;
        }
        return this.playerTwo;
    };
    newGame.prototype.changeCurrentPlayer = function () {
        if (this.currentPlayer == this.playerOne) {
            this.currentPlayer = this.playerTwo;
        }
        else {
            this.currentPlayer = this.playerOne;
        }
    };
    return newGame;
}());
var Player = (function () {
    function Player(name, score) {
        this.name = name;
        this.score = score;
    }
    Player.prototype.toString = function () {
        return this.name;
    };
    return Player;
}());

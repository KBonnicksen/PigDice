window.onload = function () {
    document.getElementById("add-players").onclick = addPlayers;
};
function addPlayers() {
    var pOneElem = document.getElementById("player-one");
    var pTwoElem = document.getElementById("player-two");
    pOneElem.nextElementSibling.innerHTML = "";
    pTwoElem.nextElementSibling.innerHTML = "";
    if (pOneElem.value.trim() == "") {
        pOneElem.nextElementSibling.innerHTML = "*required";
    }
    else if (pTwoElem.value.trim() == "") {
        pTwoElem.nextElementSibling.innerHTML = "*required";
    }
    else {
        var playerOne = new Player(pOneElem.value.trim(), 0);
        var playerTwo = new Player(pTwoElem.value.trim(), 0);
        console.log(playerOne.name + " " + playerTwo.name);
        toggleGame();
    }
}
function toggleGame() {
    var playerNamesPg = document.getElementById("enter-players-names");
    var showGame = document.getElementById("show-game");
    if (showGame.style.display == "none") {
        playerNamesPg.style.display = "none";
        showGame.style.display = "block";
    }
}
var newGame = (function () {
    function newGame(playerOne, playerTwo) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }
    return newGame;
}());
var Player = (function () {
    function Player(name, score) {
        this.name = name;
        this.score = score;
    }
    return Player;
}());
function isValidName() {
}

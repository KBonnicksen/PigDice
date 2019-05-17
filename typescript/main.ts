
window.onload = function(){
    document.getElementById("add-players").onclick = addPlayers;
    document.getElementById("roll").onclick = rollDice;
    //document.getElementById("end-turn").onclick = endTurn;
}

function addPlayers(){
    let pOneElem = (<HTMLInputElement>document.getElementById("player-one"));
    let pTwoElem = (<HTMLInputElement>document.getElementById("player-two"));
    pOneElem.nextElementSibling.innerHTML = "";
    pTwoElem.nextElementSibling.innerHTML = "";

    if(pOneElem.value.trim() == ""){
        pOneElem.nextElementSibling.innerHTML = "*required";
    }
    if(pTwoElem.value.trim() == ""){
        pTwoElem.nextElementSibling.innerHTML = "*required";
    }
    else{
        let p1:Player = new Player(pOneElem.value.trim(), 0);
        let p2:Player = new Player(pTwoElem.value.trim(), 0);
        document.getElementById("p-one").innerText = p1.name;
        document.getElementById("p-two").innerText = p2.name;
        showGameView(); 
        let currentGame = new newGame(p1, p2);
        showCurrPlayer(currentGame);
    }  
}

function playRound(currentGame:newGame){
    showCurrPlayer(currentGame);
}

function showGameView(){
    let playerNamesPg = document.getElementById("enter-players-names");
    let showGame = document.getElementById("show-game");
    playerNamesPg.style.display = "none";
    showGame.style.display = "block";  
}

function rollDice(currPlayer){
    let randomRoll = Math.floor(Math.random() * 6) + 1;
    if(randomRoll == 1){
        loseTurn();
    }
    else{
        addCurrScore(randomRoll);
    }
}

function loseTurn(){
    document.getElementById("curr-round-score").innerText = '0';
}

function showCurrPlayer(game:newGame){
    let currPlayerElem = document.getElementById("player-current-turn");
    if(currPlayerElem.innerText != ""){
        game.changeCurrentPlayer();
    }
    currPlayerElem.innerText = game.currentPlayer.toString();
}

function addCurrScore(lastRoll:number){
    let currScoreElem = document.getElementById("curr-round-score");
    let currScore = parseInt(currScoreElem.innerText);
    currScoreElem.innerText = (currScore + lastRoll).toString();
}

class newGame{
    playerOne:Player;
    playerTwo:Player;

    currentPlayer:Player;

    constructor(playerOne, playerTwo){
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.currentPlayer = this.randomFirstPlayer();
    }

    randomFirstPlayer(){
        let randomBool = Math.random() >= 0.5;
        if(randomBool){
             return this.playerOne;
        }
        return this.playerTwo;
    }

    changeCurrentPlayer(){
        if(this.currentPlayer == this.playerOne){
            this.currentPlayer = this.playerTwo;
        }
        else{
            this.currentPlayer = this.playerOne;
        }
    }
}

class Player{
    name:string;
    score:number;
    constructor(name, score){
        this.name = name;
        this.score = score;
    }

    toString(){
        return this.name;
    }
}

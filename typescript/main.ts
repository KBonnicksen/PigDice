
window.onload = function(){
    document.getElementById("add-players").onclick = addPlayers;
}

function addPlayers(){
    let pOneElem = (<HTMLInputElement>document.getElementById("player-one"));
    let pTwoElem = (<HTMLInputElement>document.getElementById("player-two"));
    pOneElem.nextElementSibling.innerHTML = "";
    pTwoElem.nextElementSibling.innerHTML = "";

    if(pOneElem.value.trim() == ""){
        pOneElem.nextElementSibling.innerHTML = "*required";
    }
    else if(pTwoElem.value.trim() == ""){
        pTwoElem.nextElementSibling.innerHTML = "*required";
    }
    else{
        let playerOne:Player = new Player(pOneElem.value.trim(), 0);
        let playerTwo:Player = new Player(pTwoElem.value.trim(), 0);
        console.log(playerOne.name + " " + playerTwo.name);
        toggleGame(); 
    }  
       
}

function toggleGame(){
    let playerNamesPg = document.getElementById("enter-players-names");
    let showGame = document.getElementById("show-game");
    if(showGame.style.display == "none"){
        playerNamesPg.style.display = "none";
        showGame.style.display = "block";
    }
}

class newGame{
    playerOne:Player;
    playerTwo:Player;
    constructor(playerOne, playerTwo){
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }
}

class Player{
    name:string;
    score:number;
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
}

function isValidName(){

}
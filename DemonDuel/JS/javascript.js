class Demon {
    constructor (name, health, attack, shield, img100, img60, img30) {
      this.name = name;
      this.health = health;
      this.attack = attack;
      this.shield = shield;
      this.img100 = img100;
      this.img60 = img60;
      this.img30 = img30;
      this.ammo = 0;
      this.state = "";
    }
  }
//Characters - objects (properties defined)
let demon1 = new Demon ("Jack", 110, 50, 30, "../Images/3.1.1.PNG", "../Images/3.1.2.PNG", "../Images/3.1.3.PNG");
let demon2 = new Demon ("Joe", 80, 60, 0, "../Images/3.2.1.PNG", "../Images/3.2.2.PNG", "../Images/3.3.3.PNG");
let demon3 = new Demon ("Julie", 150, 40, 50, "../Images/3.3.1.PNG", "../Images/3.3.2.PNG", "../Images/3.3.3.PNG");

//Demons to pick & image & properties to load - activation in "activation" function
let player1Demon = 0; // 1, 2 o 3 depending on character
let player2Demon = 0; // same as above
let player1DemonObj; // Object to use during DUEL
let player2DemonObj; // same as above


//Pick your character screen & body DOM
let pickCharacterScreen = document.getElementById('pickCharacterBlock');
let bodyforDom = document.getElementById('bodyBlock');

//Image reproducing in duel screen (character)
let imgDemonPlayer1 = document.getElementById('imgDemonPlayer1');
let imgDemonPlayer2 = document.getElementById('imgDemonPlayer2');

//Pick your character screen (P1 & P2 - characters id) & click to enable character picking
let activDemon1P1 = document.getElementById('demon1P1');
let activDemon2P1 = document.getElementById('demon2P1');
let activDemon3P1 = document.getElementById('demon3P1');
let activDemon1P2 = document.getElementById('demon1P2');
let activDemon2P2 = document.getElementById('demon2P2');
let activDemon3P2 = document.getElementById('demon3P2');

activDemon1P1.addEventListener("click", () => {activateCharacter(1,1)});
activDemon2P1.addEventListener("click", () => {activateCharacter(1,2)});
activDemon3P1.addEventListener("click", () => {activateCharacter(1,3)});
activDemon1P2.addEventListener("click", () => {activateCharacter(2,1)});
activDemon2P2.addEventListener("click", () => {activateCharacter(2,2)});
activDemon3P2.addEventListener("click", () => {activateCharacter(2,3)});

//INICIALIZATION CHARACTER FOR DUEL (FUNCTIONS) -------------------
function activateCharacter(player, demon) {
  if(player == 1){
    activDemon1P1.classList.remove("characterSelected");
    activDemon2P1.classList.remove("characterSelected");
    activDemon3P1.classList.remove("characterSelected");
    player1Demon = demon;
    if(demon == 1){
      activDemon1P1.classList.add("characterSelected");
      player1DemonObj = demon1;
    }
    else if (demon == 2){
      activDemon2P1.classList.add("characterSelected");
      player1DemonObj = demon2;
    }
    else {
      activDemon3P1.classList.add("characterSelected");
      player1DemonObj = demon3;
    }
  }
  else if (player == 2){
    activDemon1P2.classList.remove("characterSelected");
    activDemon2P2.classList.remove("characterSelected");
    activDemon3P2.classList.remove("characterSelected");
    player2Demon = demon;
    if(demon == 1){
      activDemon1P2.classList.add("characterSelected");
      player2DemonObj = demon1;
    }
    else if (demon == 2){
      activDemon2P2.classList.add("characterSelected");
      player2DemonObj = demon2;
    }
    else {
      activDemon3P2.classList.add("characterSelected");
      player2DemonObj = demon3;
    }
  }
  //demon.health --> innerHTML in DUEL screen (prepare HTML)
  //demon.ammo --> innerHTML in DUEL screen (prepare HTML)
}

//goDuel button in pick your character screen. --> takes us to DUEL screen.
//P1 & P2 must have picked character
let goDuel = document.getElementById('goDuel');
goDuel.addEventListener("click", activateDuel);

function activateDuel() {
  //TEST
  if((player1Demon !== 0) && (player2Demon !== 0)){
    pickCharacterScreen.remove();
    let duelScreenDiv = document.createElement("div");
    duelScreenDiv.classList.add("duel");
    duelScreenDiv.id = "duelBlock"
    
console.log(bodyforDom)
duelScreenDiv.innerHTML = `<div class = "playerBox"> 
<div> 
<p class="titlePlayerDuel">PLAYER 1</p>
</div>
<div class="propertiesDiv"> 
<img class = "propertiesNow" src="../Images/3_PropertiesNow.PNG" alt="Player 1 Status">
</div>
<div class="flexDuel" >
<div class="characterDiv"> 
<img id="imgDemonPlayer1" class="characterDuel" src=${player1DemonObj.img100} alt="Player 1 Character">
</div> 
<div class="duelOptions">
<img class="duelButton" src="../Images/3_Fire.PNG" alt="Fire Button">
<img class="duelButton" src="../Images/3_Load.PNG" alt="Load Button">
<img class="duelButton" src="../Images/3_Shield.PNG" alt="Shield Button">
</div> 
</div>
<div class="log" > 
</div>
</div>

<div class = "playerBox">
<div>
<p class="titlePlayerDuel">PLAYER 2</p>
</div>
<div class="propertiesDiv">
<img class="propertiesNow" src="../Images/3_PropertiesNow.PNG" alt="Player 2 Status">
</div>
<div class="flexDuel">
<div class="characterDiv"> 
<img id="imgDemonPlayer2" class="characterDuel" src="${player2DemonObj.img100}" alt="Player 2 Character">
</div> 
<div class="duelOptions"> 
<img class="duelButton" src="../Images/3_Fire.PNG" alt="Fire Button">
<img class="duelButton" src="../Images/3_Load.PNG" alt="Load Button">
<img class="duelButton" src="../Images/3_Shield.PNG" alt="Shield Button">
</div> 
</div>
<div class = "log"> 
</div>`
console.log(duelScreenDiv)
bodyforDom.appendChild(duelScreenDiv);
}
}




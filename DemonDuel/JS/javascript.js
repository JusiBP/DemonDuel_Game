// if problems when openening in browser check:
// JS ref in DemonDuel HTML
// audio ref in JS

// Character constructor:
class Demon {
    constructor (name, health, healthOrigin, attack, shield, img100, img60, img30, imgWin, imgDead, state) {
      this.name = name;
      this.health = health; // Current Health
      this.healthOrigin = healthOrigin // Original Health
      this.attack = attack;
      this.shield = shield;
      this.img100 = img100;
      this.img60 = img60;
      this.img30 = img30;
      this.imgWin = imgWin;
      this.imgDead = imgDead;
      this.ammo = 0;
      this.state = state; // Character Log
      this.duelOption = ""; // fire, load, shield, noAmmo
    }
  }

//Character definition - objects (properties defined)
const demon1 = new Demon ("LUCIFER", 110, 110, 50, 30, "../Images/3.1.1.PNG", "../Images/3.1.2.PNG", "../Images/3.1.3.PNG", "../Images/3.1.victory.PNG", "../Images/3.1.dead.PNG", "LUCIFER: Your time has come to burn eternally.");
const demon2 = new Demon ("LEYAK", 80, 80, 60, 0, "../Images/3.2.1.PNG", "../Images/3.2.2.PNG", "../Images/3.2.3.PNG", "../Images/3.2.victory.PNG", "../Images/3.2.dead.PNG", "LEYAK: No hope is left for you!");
const demon3 = new Demon ("LILITH", 150, 150, 40, 50, "../Images/3.3.1.PNG", "../Images/3.3.2.PNG", "../Images/3.3.3.PNG", "../Images/3.3.victory.PNG", "../Images/3.3.dead.PNG", "LILITH: Prepare your soul for darkness...");

//Demons to pick & image & properties to load - activation in "activation" function
let player1Demon = 0; // 1, 2 o 3 depending on character
let player2Demon = 0; // (same as above)
let player1DemonObj = 0; // Object (demon) to use during DUEL
let player2DemonObj = 0; // (same as above)

//Music
const bsoDuel = new Audio("../audio/dd_bso_duel.wav");
// const bsoDuel = document.createElement("audio")
// bsoDuel.src = "../audio/dd_bso_duel.wav"
bsoDuel.loop = true;
bsoDuel.volume = 1;

let bsoCharacter = new Audio("../audio/dd_bso_character.wav");
bsoCharacter.loop = true;
bsoCharacter.volume = 1;
bsoCharacter.play();


//Logs
const log1 = "F**** shit... forgot to load the gun!"; //noAmmo
const log2 = "Take this bullet MF!"; //fire
const log3 = "One more bullet to put in your skull..."; //load
const log4 = "Barely noticed it you sucker!"; //shield
const log5 = "Nothing fuckin' happened..."; //noAmmo && shield  
const log6 = "I shielded while you loaded... I suck!"; //shield && load
const log7 = "We both shielded... so dumb"; //shield && shield
const logDie = "..."; //die (this.demon health =< 0)
const logWin = "I WIN you piece of shit!"; //win (opponent demon health =< 0)

// DOM ------------------------------------------------------------------------------------------------------------
let bodyforDom = document.getElementById('bodyBlock'); //Body DOM.
let pickCharacterScreen = document.getElementById('pickCharacterBlock'); // Pick your character screen.
let duelScreenDiv = document.getElementById("duelBlock") //Duel screen.

let imgDemonPlayer1 = document.getElementById('imgDemonPlayer1'); //Image reproducing in duel screen (P1 character)
let imgDemonPlayer2 = document.getElementById('imgDemonPlayer2'); //Image reproducing in duel screen (P2 character)

let activDemon1P1 = document.getElementById('demon1P1'); //Pick your character screen - Demon1 (P1)
let activDemon2P1 = document.getElementById('demon2P1'); //Pick your character screen - Demon2 (P1)
let activDemon3P1 = document.getElementById('demon3P1'); //Pick your character screen - Demon3 (P1)
let activDemon1P2 = document.getElementById('demon1P2'); //Pick your character screen - Demon1 (P1)
let activDemon2P2 = document.getElementById('demon2P2'); //Pick your character screen - Demon2 (P2)
let activDemon3P2 = document.getElementById('demon3P2'); //Pick your character screen - Demon3 (P2)

let goDuel = document.getElementById('goDuel'); //Pick your character screen - DUEL button 

activDemon1P1.addEventListener("click", () => {activateCharacter(1,1)}); //Pick your character screen - CLICK EVENT --> Demon1 (P1)
activDemon2P1.addEventListener("click", () => {activateCharacter(1,2)}); //Pick your character screen - CLICK EVENT --> Demon2 (P1)
activDemon3P1.addEventListener("click", () => {activateCharacter(1,3)}); //Pick your character screen - CLICK EVENT --> Demon3 (P1)
activDemon1P2.addEventListener("click", () => {activateCharacter(2,1)}); //Pick your character screen - CLICK EVENT --> Demon1 (P2)
activDemon2P2.addEventListener("click", () => {activateCharacter(2,2)}); //Pick your character screen - CLICK EVENT --> Demon2 (P2)
activDemon3P2.addEventListener("click", () => {activateCharacter(2,3)}); //Pick your character screen - CLICK EVENT --> Demon3 (P2)

let fireP1 = document.getElementById('fireP1'); //Duel screen - Fire (P1)
let loadP1 = document.getElementById('loadP1'); //Duel screen - Load (P1)
let shieldP1 = document.getElementById('shieldP1'); //Duel screen - Shield (P1)
let fireP2 = document.getElementById('fireP2'); //Duel screen - Fire (P2)
let loadP2 = document.getElementById('loadP2'); //Duel screen - Load (P2)
let shieldP2 = document.getElementById('shieldP2'); //Duel screen - Shield (P2)

fireP1.addEventListener("click", () => {activateActionP1(1,1)}); //Duel screen - CLICK EVENT --> Fire (P1)
fireP2.addEventListener("click", () => {activateActionP2(2,1)}); //Duel screen - CLICK EVENT --> Fire (P2)
loadP1.addEventListener("click", () => {activateActionP1(1,2)}); //Duel screen - CLICK EVENT --> Load (P1)
loadP2.addEventListener("click", () => {activateActionP2(2,2)}); //Duel screen - CLICK EVENT --> Load (P2)
shieldP1.addEventListener("click", () => {activateActionP1(1,3)}); //Duel screen - CLICK EVENT --> Shield (P1)
shieldP2.addEventListener("click", () => {activateActionP2(2,3)}); //Duel screen - CLICK EVENT --> Shield (P2)

duelScreenDiv.remove(); //Duel Screen REMOVE (until goDuel event happens [pickCharacterScreen.remove()].)

//----------------------------------------------------------------------------------------------------------------


// INICIALIZATION CHARACTER FOR DUEL (PICK YOUR CHARACTER SCREEN):
function activateCharacter(player, demon) {
  if(player == 1){
    activDemon1P1.classList.remove("characterSelected"); // Character picked errase highlighting
    activDemon2P1.classList.remove("characterSelected"); // ..
    activDemon3P1.classList.remove("characterSelected"); // ..
    player1Demon = demon;
    if(demon == 1){
      activDemon1P1.classList.add("characterSelected"); // Character picked highlighted
      player1DemonObj = {...demon1}; //Clone Demon1 object (so both players can pick the same character)
    }
    else if (demon == 2){
      activDemon2P1.classList.add("characterSelected"); // Character picked highlighted
      player1DemonObj = {...demon2}; //Clone Demon2 object (so both players can pick the same character)
    }
    else {
      activDemon3P1.classList.add("characterSelected"); // Character picked highlighted
      player1DemonObj = {...demon3}; //Clone Demon2 object (so both players can pick the same character)
    }
  }
  else if (player == 2){
    activDemon1P2.classList.remove("characterSelected"); // Same as before (for PLAYER 2)
    activDemon2P2.classList.remove("characterSelected");
    activDemon3P2.classList.remove("characterSelected");
    player2Demon = demon;
    if(demon == 1){
      activDemon1P2.classList.add("characterSelected");
      player2DemonObj = {...demon1};
    }
    else if (demon == 2){
      activDemon2P2.classList.add("characterSelected");
      player2DemonObj = {...demon2};
    }
    else {
      activDemon3P2.classList.add("characterSelected");
      player2DemonObj = {...demon3};
    }
  }
}


goDuel.addEventListener("click", activateDuel); // Pick your character screen - CLICK EVENT --> DUEL Button


//PLAYER 1 & PLAYER 2 - Inicializate character img, health, ammo & log in DUEL SCREEN
function activateDuel() {
  if((player1Demon !== 0) && (player2Demon !== 0)){
    pickCharacterScreen.remove(); // Pick your character screen - REMOVE whole block
    bodyforDom.appendChild(duelScreenDiv); // Duel screen - GENERATE whole block
    bsoCharacter.pause();
    bsoDuel.play();

    //PLAYER 1 - Inicializate character img, health, ammo & log
    imgDemonPlayer1.src = player1DemonObj.img100
    document.getElementById("healthP1").innerHTML = player1DemonObj.health
    document.getElementById("ammoP1").innerHTML = player1DemonObj.ammo
    document.getElementById("logP1").innerHTML = player1DemonObj.state

    //PLAYER 2 - Inicializate character img, health, ammo & log
    imgDemonPlayer2.src = player2DemonObj.img100
    document.getElementById("healthP2").innerHTML = player2DemonObj.health
    document.getElementById("ammoP2").innerHTML = player2DemonObj.ammo
    document.getElementById("logP2").innerHTML = player2DemonObj.state
  }
}

function activateActionP1(player, option){
  imgDemonPlayer1.classList.add("characterSelected") // Character highlighted (duel option picked)
  if (((player == 1) && (option == 1)) && (player1DemonObj.ammo > 0)){player1DemonObj.duelOption = "fire"}
  else if ((player == 1) && (option == 1) && (player1DemonObj.ammo <= 0)){player1DemonObj.duelOption = "noAmmo"}
  else if (player == 1 && option == 2){player1DemonObj.duelOption = "load"}
  else if (player == 1 && option == 3){player1DemonObj.duelOption = "shield"}

  if ((player1DemonObj.duelOption.length > 0) && (player2DemonObj.duelOption.length > 0)){
    duelPicker()
  }
}
function activateActionP2(player, option){
  imgDemonPlayer2.classList.add("characterSelected") // Character highlighted (duel option picked)
  if (((player == 2) && (option == 1)) && (player2DemonObj.ammo > 0)){player2DemonObj.duelOption = "fire"}
  else if ((player == 2) && (option == 1) && (player2DemonObj.ammo <= 0)){player2DemonObj.duelOption = "noAmmo"}
  else if (player == 2 && option == 2){player2DemonObj.duelOption = "load"}
  else if (player == 2 && option == 3){player2DemonObj.duelOption = "shield"}
  
  if ((player1DemonObj.duelOption.length > 0) && (player2DemonObj.duelOption.length > 0)){
    duelPicker()
  } 
}


//DuelCombos
function duelPicker(){
  if ((player1DemonObj.duelOption == "fire") && (player2DemonObj.duelOption == "fire")){
    duelCombo1(player1DemonObj,player2DemonObj)
  } // P1: fire - P2: fire (UNIQUE)
  else if ((player1DemonObj.duelOption == "noAmmo") && (player2DemonObj.duelOption == "noAmmo")){
    duelCombo2(player1DemonObj,player2DemonObj)
  } // P1: noAmmo - P2: noAmmo (UNIQUE)
  else if ((player1DemonObj.duelOption == "shield") && (player2DemonObj.duelOption == "shield")){
    duelCombo3(player1DemonObj,player2DemonObj)
  } // P1: shield - P2: shield (UNIQUE)
  else if ((player1DemonObj.duelOption == "load") && (player2DemonObj.duelOption == "load")){
    duelCombo4(player1DemonObj,player2DemonObj)
  } // P1: load - P2: load (UNIQUE)
  else if ((player1DemonObj.duelOption == "fire") && (player2DemonObj.duelOption == "noAmmo")){
    duelCombo5(player1DemonObj,player2DemonObj)
  } // P1: fire - P2: noAmmo
  else if ((player2DemonObj.duelOption == "fire") && (player1DemonObj.duelOption == "noAmmo")){
    duelCombo5(player2DemonObj,player1DemonObj)
  } // P2: fire - P1: noAmmo
  else if ((player1DemonObj.duelOption == "fire") && (player2DemonObj.duelOption == "shield")){
    duelCombo6(player1DemonObj,player2DemonObj)
  } // P1: fire - P2: shield
  else if ((player2DemonObj.duelOption == "fire") && (player1DemonObj.duelOption == "shield")){
    duelCombo6(player2DemonObj,player1DemonObj)
  } // P2: fire - P1: shield
  else if ((player1DemonObj.duelOption == "fire") && (player2DemonObj.duelOption == "load")){
    duelCombo7(player1DemonObj,player2DemonObj)
  } // P1: fire - P2: load
  else if ((player2DemonObj.duelOption == "fire") && (player1DemonObj.duelOption == "load")){
    duelCombo7(player2DemonObj,player1DemonObj)
  } // P2: fire - P1: load
  else if ((player1DemonObj.duelOption == "noAmmo") && (player2DemonObj.duelOption == "shield")){
    duelCombo8(player1DemonObj,player2DemonObj)
  } // P1: noAmmo - P2: shield
  else if ((player2DemonObj.duelOption == "noAmmo") && (player1DemonObj.duelOption == "shield")){
    duelCombo8(player2DemonObj,player1DemonObj)
  } // P2: noAmmo - P1: shield
  else if ((player1DemonObj.duelOption == "noAmmo") && (player2DemonObj.duelOption == "load")){
    duelCombo9(player1DemonObj,player2DemonObj)
  } // P1: noAmmo - P2: load
  else if ((player2DemonObj.duelOption == "noAmmo") && (player1DemonObj.duelOption == "load")){
    duelCombo9(player2DemonObj,player1DemonObj)
  } // P1: noAmmo - P2: load
  else if ((player1DemonObj.duelOption == "shield") && (player2DemonObj.duelOption == "load")){
    duelCombo10(player1DemonObj,player2DemonObj)
  } // P1: shield - P2: load
  else if ((player2DemonObj.duelOption == "shield") && (player1DemonObj.duelOption == "load")){
    duelCombo10(player2DemonObj,player1DemonObj)
  } // P2: shield - P1: load
}

//DUEL ------------------------------------------------------------------------------------------------------------------
//DC 1 --> P1: fire - P2: fire (UNIQUE)
function duelCombo1(p1,p2){
  p1.health -= p2.attack;
  p1.ammo -= 1;
  p2.health -= p1.attack;
  p2.ammo -= 1;
  p1.state = log2;
  p2.state = log2;

  checkHealth()
} 

//DC 2 --> P1: noAmmo - P2: noAmmo (UNIQUE)
function duelCombo2(p1,p2){
  p1.state = log1;
  p2.state = log1;

  updatePostDuel()
} 

//DC 3 --> P1: shield - P2: shield (UNIQUE)
function duelCombo3(p1,p2){
  p1.state = log7;
  p2.state = log7;

  updatePostDuel()
} 

//DC 4 --> P1: load - P2: load (UNIQUE)
function duelCombo4(p1,p2){
  p1.ammo += 1;
  p2.ammo += 1;
  p1.state = log3;
  p2.state = log3;

  updatePostDuel()
} 

//DC 5 --> P1: fire - P2: noAmmo || P1: noAmmo - P2: fire
function duelCombo5(p1,p2){
  if (p1.duelOption == "noAmmo"){
    p1.health -= p2.attack;
  p2.ammo -= 1;
  p1.state = log1;
  p2.state = log2;
  }
  else if (p2.duelOption == "noAmmo"){
    p2.health -= p1.attack;
    p1.ammo -= 1;
    p2.state = log1;
    p1.state = log2;
  }
  checkHealth()
} 

//DC 6 --> P1: fire - P2: shield || P1: shield - P2: fire
function duelCombo6(p1,p2){
  if (p1.duelOption == "fire"){
    p1.ammo -= 1;
    p2.health -= (p1.attack * (p2.shield / 100));
    p2.state = log4;
    p1.state = log2;
  }
  else if (p2.duelOption == "fire"){
    p2.ammo -= 1;
    p1.health -= (p2.attack * (p1.shield / 100));
    p1.state = log4;
    p2.state = log2;
  }
  checkHealth()
} 

//DC 7 --> P1: fire - P2: load || P1: load - P2: fire
function duelCombo7(p1,p2){
  if (p1.duelOption == "fire"){
    p1.ammo -= 1;
    p2.ammo += 1;
    p2.health -= p1.attack;
    p2.state = log3;
    p1.state = log2;
  }
  else if (p2.duelOption == "fire"){
    p2.ammo -= 1;
    p1.ammo += 1;
    p1.health -= p2.attack;
    p1.state = log3;
    p2.state = log2;
  }
  checkHealth()
} 

//DC 8 --> P1: noAmmo - P2: shield || // P1: shield - P2: noAmmo
function duelCombo8(p1,p2){
  p1.state = log5;
  p2.state = log5;

  updatePostDuel()
} 

//DC 9 --> P1: noAmmo - P2: load || P1: load - P2: noAmmo
function duelCombo9(p1,p2){
  if (p1.duelOption == "load"){
    p1.ammo += 1;
    p2.state = log1;
    p1.state = log3;
  }
  else if (p2.duelOption == "load"){
    p2.ammo += 1;
    p1.state = log1;
    p2.state = log3;
  }

  updatePostDuel()
} 

//DC 10 --> P1: shield - P2: load || P1: load - P2: shield
function duelCombo10(p1,p2){
  if (p1.duelOption == "load"){
    p1.ammo += 1;
    p1.state = log3;
    p2.state = log6;
  }
  else if (p2.duelOption == "load"){
    p2.ammo += 1;
    p2.state = log3;
    p1.state = log6;
  }

  updatePostDuel()
} 


function checkHealth(){
  //Health P1
  if ((player1DemonObj.health > (player1DemonObj.healthOrigin * 0.3)) && (player1DemonObj.health < (player1DemonObj.healthOrigin * 0.6))){
    imgDemonPlayer1.src = player1DemonObj.img60
  }
  else if ((player1DemonObj.health > 0) && (player1DemonObj.health <= (player1DemonObj.healthOrigin * 0.3))){
    imgDemonPlayer1.src = player1DemonObj.img30
  }
  else if (player1DemonObj.health <= 0){
    imgDemonPlayer1.src = player1DemonObj.imgDead //image state Dead
    imgDemonPlayer2.src = player2DemonObj.imgWin //image state Win
    player1DemonObj.state = logDie;
    player2DemonObj.state = logWin;
  }

  //Health P2
  if ((player2DemonObj.health > (player2DemonObj.healthOrigin * 0.3)) && (player2DemonObj.health < (player2DemonObj.healthOrigin * 0.6))){
    imgDemonPlayer2.src = player2DemonObj.img60
  }
  else if ((player2DemonObj.health > 0) && (player2DemonObj.health <= (player2DemonObj.healthOrigin * 0.3))){
    imgDemonPlayer2.src = player2DemonObj.img30
  }
  else if (player2DemonObj.health <= 0){
    imgDemonPlayer2.src = player2DemonObj.imgDead //image state Dead
    imgDemonPlayer1.src = player1DemonObj.imgWin //image state Win
    player2DemonObj.state = logDie;
    player1DemonObj.state = logWin;
  }
 
  updatePostDuel()

  if ((player1DemonObj.health <= 0) || (player2DemonObj.health <= 0)){
    imgDemonPlayer1.addEventListener("click", restartGame);
    imgDemonPlayer2.addEventListener("click", restartGame);
  }
}

function updatePostDuel(){
  document.getElementById("healthP1").innerHTML = player1DemonObj.health
  document.getElementById("ammoP1").innerHTML = player1DemonObj.ammo
  document.getElementById("logP1").innerHTML = player1DemonObj.state

  document.getElementById("healthP2").innerHTML = player2DemonObj.health
  document.getElementById("ammoP2").innerHTML = player2DemonObj.ammo
  document.getElementById("logP2").innerHTML = player2DemonObj.state

  player1DemonObj.duelOption = "";
  player2DemonObj.duelOption = "";
  imgDemonPlayer1.classList.remove("characterSelected");
  imgDemonPlayer2.classList.remove("characterSelected");
}

// Restart GAME once one player dies
function restartGame(){
  bsoDuel.pause()
  bsoCharacter.play();
  duelScreenDiv.remove();
  bodyforDom.appendChild(pickCharacterScreen);
}

  






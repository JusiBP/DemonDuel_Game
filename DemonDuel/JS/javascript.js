class Demon {
    constructor (name, health, healthOrigin, attack, shield, img100, img60, img30, imgWin, imgDead, state) {
      this.name = name;
      this.health = health;
      this.healthOrigin = healthOrigin
      this.attack = attack;
      this.shield = shield;
      this.img100 = img100;
      this.img60 = img60;
      this.img30 = img30;
      this.imgWin = imgWin;
      this.imgDead = imgDead;
      this.ammo = 0;
      this.state = state;
      this.duelOption = ""; //Option picked in duel (fire, load, shield )
    }
  }
//Characters - objects (properties defined)
let demon1 = new Demon ("LUCIFER", 110, 110, 50, 30, "../Images/3.1.1.PNG", "../Images/3.1.2.PNG", "../Images/3.1.3.PNG", "../Images/3.1.victory.PNG", "../Images/3.1.dead.PNG", "LUCIFER: Your time has come to burn eternally.");
let demon2 = new Demon ("LEYAK", 80, 80, 60, 0, "../Images/3.2.1.PNG", "../Images/3.2.2.PNG", "../Images/3.2.3.PNG", "../Images/3.2.victory.PNG", "../Images/3.2.dead.PNG", "LEYAK: No hope is left for you!");
let demon3 = new Demon ("LILITH", 150, 150, 40, 50, "../Images/3.3.1.PNG", "../Images/3.3.2.PNG", "../Images/3.3.3.PNG", "../Images/3.3.victory.PNG", "../Images/3.3.dead.PNG", "LILITH: Prepare your soul for darkness...");

//Demons to pick & image & properties to load - activation in "activation" function
let player1Demon = 0; // 1, 2 o 3 depending on character
let player2Demon = 0; // same as above
let player1DemonObj; // Object to use during DUEL
let player2DemonObj; // same as above


//Pick your character screen & body DOM
let pickCharacterScreen = document.getElementById('pickCharacterBlock');
let bodyforDom = document.getElementById('bodyBlock');

//Duel Options & click to enable character picking
let duelScreenDiv = document.getElementById("duelBlock")

let fireP1 = document.getElementById('fireP1');
let loadP1 = document.getElementById('loadP1');
let shieldP1 = document.getElementById('shieldP1');
let fireP2 = document.getElementById('fireP2');
let loadP2 = document.getElementById('loadP2');
let shieldP2 = document.getElementById('shieldP2');

fireP1.addEventListener("click", () => {activateActionP1(1,1)});
fireP2.addEventListener("click", () => {activateActionP2(2,1)});
loadP1.addEventListener("click", () => {activateActionP1(1,2)});
loadP2.addEventListener("click", () => {activateActionP2(2,2)});
shieldP1.addEventListener("click", () => {activateActionP1(1,3)});
shieldP2.addEventListener("click", () => {activateActionP2(2,3)});

let imgDemonPlayer1 = document.getElementById('imgDemonPlayer1'); //Image reproducing in duel screen (character)
let imgDemonPlayer2 = document.getElementById('imgDemonPlayer2'); //Image reproducing in duel screen (character)

duelScreenDiv.remove();


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
      player1DemonObj = {...demon1};
    }
    else if (demon == 2){
      activDemon2P1.classList.add("characterSelected");
      player1DemonObj = {...demon2};
    }
    else {
      activDemon3P1.classList.add("characterSelected");
      player1DemonObj = {...demon3};
    }
  }
  else if (player == 2){
    activDemon1P2.classList.remove("characterSelected");
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

//goDuel button in pick your character screen. --> takes us to DUEL screen.
//P1 & P2 must have picked character
let goDuel = document.getElementById('goDuel');
goDuel.addEventListener("click", activateDuel);

function activateDuel() {
  if((player1Demon !== 0) && (player2Demon !== 0)){
    pickCharacterScreen.remove();
    bodyforDom.appendChild(duelScreenDiv);
    imgDemonPlayer1.src = player1DemonObj.img100

    document.getElementById("healthP1").innerHTML = player1DemonObj.health
    document.getElementById("ammoP1").innerHTML = player1DemonObj.ammo
    document.getElementById("logP1").innerHTML = player1DemonObj.state

    imgDemonPlayer2.src = player2DemonObj.img100
    document.getElementById("healthP2").innerHTML = player2DemonObj.health
    document.getElementById("ammoP2").innerHTML = player2DemonObj.ammo
    document.getElementById("logP2").innerHTML = player2DemonObj.state
  }
}

function activateActionP1(player, option){
  console.log("P1")
  imgDemonPlayer1.classList.add("characterSelected") // Player picked an option to DUEL
  if (((player == 1) && (option == 1)) && (player1DemonObj.ammo > 0)){player1DemonObj.duelOption = "fire"}
  if ((player == 1) && (option == 1) && (player1DemonObj.ammo <= 0)){player1DemonObj.duelOption = "noAmmo"}
  else if (player == 1 && option == 2){player1DemonObj.duelOption = "load"}
  else if (player == 1 && option == 3){player1DemonObj.duelOption = "shield"}

  if ((player1DemonObj.duelOption.length > 0) && (player2DemonObj.duelOption.length > 0)){
    duel()
  }
}
function activateActionP2(player, option){
  console.log("P2")
  imgDemonPlayer2.classList.add("characterSelected") // Player picked an option to DUEL
  if (((player == 2) && (option == 1)) && (player1DemonObj.ammo > 0)){player2DemonObj.duelOption = "fire"}
  if ((player == 2) && (option == 1) && (player1DemonObj.ammo <= 0)){player2DemonObj.duelOption = "noAmmo"}
  else if (player == 2 && option == 2){player2DemonObj.duelOption = "load"}
  else if (player == 2 && option == 3){player2DemonObj.duelOption = "shield"}

  if ((player1DemonObj.duelOption.length > 0) && (player2DemonObj.duelOption.length > 0)){
    duel()
  }
}


//DUEL ---- DUEL ---- DUEL ---- DUEL ---- DUEL ---- DUEL ---- DUEL ---- DUEL ---- DUEL ---- DUEL ---- DUEL ---- DUEL ----
//Both characters must choose a duel option
function duel(){

// FIRE vs NoAmmo --------------------------------------------------------------------
if ((player1DemonObj.duelOption == "noAmmo") && (player2DemonObj.duelOption == "fire")){
  player1DemonObj.health -= player2DemonObj.attack;
  player2DemonObj.ammo -= 1;
  player1DemonObj.state = "F**** shit... forgot to load the gun!";
  player2DemonObj.state = "Take this bullet MF!";

  //P1 health update
  if ((player1DemonObj.health > (player1DemonObj.healthOrigin * 0.3)) && (player1DemonObj.health < (player1DemonObj.healthOrigin * 0.6))){
    imgDemonPlayer1.src = player1DemonObj.img60 //image state 2
  }
  else if ((player1DemonObj.health > 0) && (player1DemonObj.health <= (player1DemonObj.healthOrigin * 0.3))){
    imgDemonPlayer1.src = player1DemonObj.img30 //image state 3
  }
  else if (player1DemonObj.health <= 0){
    imgDemonPlayer1.src = player1DemonObj.imgDead //image state Dead
    imgDemonPlayer2.src = player2DemonObj.imgWin //image state Win
    player1DemonObj.state = "...";
    player2DemonObj.state = "I WIN you piece of shit!";
  }
}
if ((player2DemonObj.duelOption == "noAmmo") && (player1DemonObj.duelOption == "fire")){
  player2DemonObj.health -= player1DemonObj.attack;
  player1DemonObj.ammo -= 1;
  player2DemonObj.state = "F**** shit... forgot to load the gun!";
  player1DemonObj.state = "Take this bullet MF!";
  //P2 health update
  if ((player2DemonObj.health > (player2DemonObj.healthOrigin * 0.3)) && (player2DemonObj.health < (player2DemonObj.healthOrigin * 0.6))){
    imgDemonPlayer2.src = player2DemonObj.img60 //image state 2
  }
  else if ((player2DemonObj.health > 0) && (player2DemonObj.health <= (player2DemonObj.healthOrigin * 0.3))){
    imgDemonPlayer2.src = player2DemonObj.img30 //image state 3
  }
  else if (player2DemonObj.health <= 0){
    imgDemonPlayer2.src = player2DemonObj.imgDead //image state Dead
    imgDemonPlayer1.src = player1DemonObj.imgWin //image state Win
    player2DemonObj.state = "...";
    player1DemonObj.state = "I WIN you piece of shit!";
  }
}

// NoAmmo vs SHIELD --------------------------------------------------------------------
if (((player1DemonObj.duelOption == "noAmmo") && (player2DemonObj.duelOption == "shield")) || ((player2DemonObj.duelOption == "noAmmo") && (player1DemonObj.duelOption == "shield"))){
  player1DemonObj.state = "Nothing fuckin' happened...";
  player2DemonObj.state = "Nothing fuckin' happened...";
}

// NoAmmo vs LOAD ---------------------------------------------------------------------
if ((player1DemonObj.duelOption == "noAmmo") && (player2DemonObj.duelOption == "load")){
  player2DemonObj.ammo += 1;
  player1DemonObj.state = "F**** shit... forgot to load the gun!";
  player2DemonObj.state = "One more bullet to put in your skull...";
}

else if ((player1DemonObj.duelOption == "load") && (player2DemonObj.duelOption == "noAmmo")){
  player1DemonObj.ammo += 1;
  player2DemonObj.state = "F**** shit... forgot to load the gun!";
  player1DemonObj.state = "One more bullet to put in your skull...";
}

// NoAmmo vs NoAmmo ---------------------------------------------------------------------
if ((player1DemonObj.duelOption == "noAmmo") && (player2DemonObj.duelOption == "noAmmo")){
  player1DemonObj.state = "F**** shit... forgot to load the gun!";
  player2DemonObj.state = "F**** shit... forgot to load the gun!";
}

// FIRE vs FIRE --------------------------------------------------------------------
if ((player1DemonObj.duelOption == "fire") && (player2DemonObj.duelOption == "fire")){
    player1DemonObj.health -= player2DemonObj.attack;
    player1DemonObj.ammo -= 1;
    player2DemonObj.health -= player1DemonObj.attack;
    player2DemonObj.ammo -= 1;
    player2DemonObj.state = "Take this bullet MF!!";
    player1DemonObj.state = "Take this bullet MF!";
  //P1 health update
  if ((player1DemonObj.health > (player1DemonObj.healthOrigin * 0.3)) && (player1DemonObj.health < (player1DemonObj.healthOrigin * 0.6))){
      imgDemonPlayer1.src = player1DemonObj.img60 //image state 2
    }
  else if ((player1DemonObj.health > 0) && (player1DemonObj.health <= (player1DemonObj.healthOrigin * 0.3))){
      imgDemonPlayer1.src = player1DemonObj.img30 //image state 3
    }
  else if (player1DemonObj.health <= 0){
      imgDemonPlayer1.src = player1DemonObj.imgDead //image state Dead
      imgDemonPlayer2.src = player2DemonObj.imgWin //image state Win
      player1DemonObj.state = "...";
      player2DemonObj.state = "I WIN you piece of shit!";
    }

  //P2 health update
  if ((player2DemonObj.health > (player2DemonObj.healthOrigin * 0.3)) && (player2DemonObj.health < (player2DemonObj.healthOrigin * 0.6))){
      imgDemonPlayer2.src = player2DemonObj.img60 //image state 2
    }
  else if ((player2DemonObj.health > 0) && (player2DemonObj.health <= (player2DemonObj.healthOrigin * 0.3))){
      imgDemonPlayer2.src = player2DemonObj.img30 //image state 3
    }
  else if (player2DemonObj.health <= 0){
      imgDemonPlayer2.src = player2DemonObj.imgDead //image state Dead
      imgDemonPlayer1.src = player1DemonObj.imgWin //image state Win
      player2DemonObj.state = "...";
      player1DemonObj.state = "I WIN you piece of shit!";
    }
}

// FIRE vs SHIELD --------------------------------------------------------------------
if ((player1DemonObj.duelOption == "fire") && (player2DemonObj.duelOption == "shield")){
    player1DemonObj.ammo -= 1;
    player2DemonObj.health -= (player1DemonObj.attack * (player2DemonObj.shield / 100));
    player2DemonObj.state = "Barely noticed it you sucker!";
    player1DemonObj.state = "Take this bullet MF!";

    //P2 health update
    if ((player2DemonObj.health > (player2DemonObj.healthOrigin * 0.3)) && (player2DemonObj.health < (player2DemonObj.healthOrigin * 0.6))){
      imgDemonPlayer2.src = player2DemonObj.img60 //image state 2
    }
    else if ((player2DemonObj.health > 0) && (player2DemonObj.health <= (player2DemonObj.healthOrigin * 0.3))){
      imgDemonPlayer2.src = player2DemonObj.img30 //image state 3
    }
    else if (player2DemonObj.health <= 0){
      imgDemonPlayer2.src = player2DemonObj.imgDead //image state Dead
      imgDemonPlayer1.src = player1DemonObj.imgWin //image state Win
      player2DemonObj.state = "...";
      player1DemonObj.state = "I WIN you piece of shit!";
    }
  }
if ((player2DemonObj.duelOption == "fire") && (player1DemonObj.duelOption == "shield")){
    player2DemonObj.ammo -= 1;
    player1DemonObj.health -= (player2DemonObj.attack * (player1DemonObj.shield / 100));
    player1DemonObj.state = "Barely noticed it you sucker!";
    player2DemonObj.state = "Take this bullet MF!";

  //P1 health update
  if ((player1DemonObj.health > (player1DemonObj.healthOrigin * 0.3)) && (player1DemonObj.health < (player1DemonObj.healthOrigin * 0.6))){
      imgDemonPlayer1.src = player1DemonObj.img60 //image state 2
    }
  else if ((player1DemonObj.health > 0) && (player1DemonObj.health <= (player1DemonObj.healthOrigin * 0.3))){
      imgDemonPlayer1.src = player1DemonObj.img30 //image state 3
    }
  else if (player1DemonObj.health <= 0){
      imgDemonPlayer1.src = player1DemonObj.imgDead //image state Dead
      imgDemonPlayer2.src = player2DemonObj.imgWin //image state Win
      player1DemonObj.state = "...";
      player2DemonObj.state = "I WIN you piece of shit!";
    }
  }

// FIRE vs LOAD ---------------------------------------------------------------------
if ((player1DemonObj.duelOption == "fire") && (player2DemonObj.duelOption == "load")){
    player1DemonObj.ammo -= 1;
    player2DemonObj.ammo += 1;
    player2DemonObj.health -= player1DemonObj.attack;
    player2DemonObj.state = "One more bullet to put in your skull...";
    player1DemonObj.state = "Take this bullet MF!";

  //P2 health update
  if ((player2DemonObj.health > (player2DemonObj.healthOrigin * 0.3)) && (player2DemonObj.health < (player2DemonObj.healthOrigin * 0.6))){
      imgDemonPlayer2.src = player2DemonObj.img60 //image state 2
    }
  else if ((player2DemonObj.health > 0) && (player2DemonObj.health <= (player2DemonObj.healthOrigin * 0.3))){
      imgDemonPlayer2.src = player2DemonObj.img30 //image state 3
    }
  else if (player2DemonObj.health <= 0){
      imgDemonPlayer2.src = player2DemonObj.imgDead //image state Dead
      imgDemonPlayer1.src = player1DemonObj.imgWin //image state Win
      player2DemonObj.state = "...";
      player1DemonObj.state = "I WIN you piece of shit!";
    }
}

if ((player1DemonObj.duelOption == "load") && (player2DemonObj.duelOption == "fire")){
    player2DemonObj.ammo -= 1;
    player1DemonObj.ammo += 1;
    player1DemonObj.health -= player2DemonObj.attack;
    player1DemonObj.state = "One more bullet to put in your skull...";
    player2DemonObj.state = "Take this bullet MF!";

  //P1 health update
  if ((player1DemonObj.health > (player1DemonObj.healthOrigin * 0.3)) && (player1DemonObj.health < (player1DemonObj.healthOrigin * 0.6))){
      imgDemonPlayer1.src = player1DemonObj.img60 //image state 2
    }
  else if ((player1DemonObj.health > 0) && (player1DemonObj.health <= (player1DemonObj.healthOrigin * 0.3))){
      imgDemonPlayer1.src = player1DemonObj.img30 //image state 3
    }
  else if (player1DemonObj.health <= 0){
      imgDemonPlayer1.src = player1DemonObj.imgDead //image state Dead
      imgDemonPlayer2.src = player2DemonObj.imgWin //image state Win
      player1DemonObj.state = "...";
      player2DemonObj.state = "I WIN you piece of shit!";
    }
}

// SHIELD vs LOAD ----------------------------------------------------------------------
if ((player1DemonObj.duelOption == "shield") && (player2DemonObj.duelOption == "load")){
    player2DemonObj.ammo += 1;
    player2DemonObj.state = "One more bullet to put in your skull...";
    player1DemonObj.state = "I shielded while you loaded... I suck!";
}
if ((player2DemonObj.duelOption == "shield") && (player1DemonObj.duelOption == "load")){
    player1DemonObj.ammo += 1;
    player1DemonObj.state = "One more bullet to put in your skull...";
    player2DemonObj.state = "I shielded while you loaded... I suck!";
}

// SHIELD vs SHIELD --------------------------------------------------------------------
if ((player1DemonObj.duelOption == "shield") && (player2DemonObj.duelOption == "shield")){
  player1DemonObj.state = "We both shielded... so stupid";
  player2DemonObj.state = "We both shielded... so stupid";
}

// LOAD vs LOAD ------------------------------------------------------------------------
if ((player1DemonObj.duelOption == "load") && (player2DemonObj.duelOption == "load")){
    player1DemonObj.ammo += 1;
    player2DemonObj.ammo += 1;
    player1DemonObj.state = "One more bullet to put in your skull...";
    player2DemonObj.state = "One more bullet to put in your skull...";
}
//--------------------------------------------------------------------------------------
  
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

  if ((player1DemonObj.health <= 0) || (player2DemonObj.health <= 0)){
    imgDemonPlayer1.addEventListener("click", restartGame);
    imgDemonPlayer2.addEventListener("click", restartGame);
  }

  // console.log(player1DemonObj)
  // console.log(player2DemonObj)
}

function restartGame(){
  duelScreenDiv.remove();
  bodyforDom.appendChild(pickCharacterScreen);
}



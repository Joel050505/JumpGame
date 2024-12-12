// Variables for sprite,obstecle and the jump effect when hit space on the keyboard
const sprite = document.querySelector("#sprite");
const obstacle = document.querySelector("#obstacle");
const boxObstacle = document.querySelector("#box-obstacle");
const cone = document.querySelector("#cone");
const obstacleBox = document.getElementById("obstacle-box");
const chestObstacle = document.getElementById("chest-obstacle");
const carObstacle = document.getElementById("car-obstacle");

const triggerJump = document.querySelector("body");
const scoreEl = document.querySelector("#score");
const missionBox = document.getElementById("mission-container");

// Play button and start menu
const playAgainButton = document.querySelector("#playAgainBtn");
const playBtn = document.querySelector("#play-btn");
const startMenu = document.querySelector("#container");

// Characters and character related stuff
const characterButton = document.querySelector(".characters-btn");
const characterButton2 = document.querySelector(".characters-btn2");
const characterMenu = document.querySelector("#character-container");
const characterBackBtn = document.querySelector("#back-to-start-menu-button");
const characterAgainBackBtn = document.querySelector(
  "#back-to-play-again-menu"
);

// Characters and their pictures
const willieMenuImg = document.querySelector(".character-one");
const roboSamMenuImg = document.querySelector(".character-two");
const zigZaneMenuImg = document.querySelector(".character-three");
const willie = document.querySelector("#willie");
const roboSam = document.querySelector("#robo-sam");
const zigZane = document.querySelector("#zig-zane");

// Sound effects
const jumpSound = document.getElementById("jump-sound");
const deathsound = document.getElementById("death-sound");
const newHighScoreSound = document.getElementById("new-high-score");
const backGroundMusic = document.getElementById("background-music");
const buttonSound = document.getElementById("button-click-sound");

// document.getElementById("info-btn").addEventListener("click", () => {
//   alert(
//     Number(localStorage.getItem("xpToLevelUp")) -
//       Number(localStorage.getItem("experience"))
//   );
// });

// Chest and coins
const openChest = document.getElementById("openChest");
const closedChest = document.getElementById("closedChest");
const chestBox = document.getElementById("chest-box");
const chestContainer = document.getElementById("chest-container");
const coins = document.getElementById("coins");
const roboSamBuyButton = document.getElementById("price2");
const zigZaneBuyButton = document.getElementById("price3");

// Display thing, display score and display how many until your current highscore
const scoreDisplay = document.getElementById("scoreDisplay");
const untilHighScoreDisplay = document.getElementById(
  "until-highScore-display"
);

const levelBox = document.getElementById("until-highScore");

// Night and day mode

const switchOffBtn = document.querySelector(".toggle-off");
const switchOnBtn = document.querySelector(".toggle-on");

switchOffBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  switchOnBtn.style.display = "block";
  switchOffBtn.style.display = "none";
  document.body.style.backgroundImage = "url('pictures/11.png')";
});

switchOnBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  switchOffBtn.style.display = "block";
  switchOnBtn.style.display = "none";
  document.body.style.backgroundImage = "url('pictures/10.png')";
});

untilHighScoreDisplay.textContent = localStorage.getItem("highScore");
document.querySelector(".score").textContent =
  localStorage.getItem("highScore");

levelBox.style.display = "flex";

// Scores variables
let currentScore = 0;
let scoreInterVal;

function playBackGroundMusic(music) {
  music.play();
  music.volume = 0.05;
  music.currentTime = 0;
}

// Storing the highscore in the local storage
// Function that will check ur highscore
function highScoreData(score) {
  if (score > Number(localStorage.getItem("highScore"))) {
    localStorage.setItem("highScore", score);
    scoreDisplay.textContent = currentScore;
    scoreDisplayText.textContent = "Your new highscore is: ";
    playSound(newHighScoreSound);
  } else {
    playSound(deathsound);
    deathsound.playbackRate = 1.2;
    deathsound.volume = 0.2;
    scoreDisplayText.textContent = "Your score was: ";
  }
}

// Playing sounds
function playSound(sound) {
  sound.play();
  sound.volume = 0.1;
  sound.currentTime = 0;
}

// Daily challenge/mission system that you can do so you even have more reasons for playing the game

const scoreDisplayText = document.getElementById("scoreDisplayText");
const missionName = document.getElementById("mission-name");
const missionAmount = document.getElementById("mission-amount");

const missionScore = document.getElementById("mission-count");

if (localStorage.getItem("mission") === null) {
  localStorage.setItem("mission", "mission1");
}

if (localStorage.getItem("coinsCollected") === null) {
  localStorage.setItem("coinsCollected", 0);
}

if (localStorage.getItem("mission") === "mission1") {
  missionAmount.textContent = 500;
  missionScore.textContent = localStorage.getItem("scored");
  missionName.textContent = "Score 500 points";
} else if (localStorage.getItem("mission") === "mission2") {
  missionAmount.textContent = 75;
  missionScore.textContent = localStorage.getItem("coinsCollected");
  missionName.textContent = "Collect 75 coins";
}

import {
  checkMission,
  hideMissionBord,
  showMissionBord,
  updateMissionScore,
} from "./mission.js";

// Make a nice sound when you press on a button
const allButtons = document.querySelectorAll("button");

allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttonSound.play();
    buttonSound.volume = 0.4;

    e.stopPropagation();

    setTimeout(() => {
      buttonSound.remove();
    }, 300);
  });
});

// Functions for characters so i dont have to repeat the same code to much
characterMenu.classList.add("displayNone");

function showMenu() {
  const playAgainMenu = document.querySelector(".playAgainMenu");
  playAgainMenu.classList.add("active");
  playAgainMenu.classList.remove("displayNone");
}

function hideMenu() {
  const playAgainMenu = document.querySelector(".playAgainMenu");
  playAgainMenu.classList.remove("active");
  playAgainMenu.classList.add("displayNone");
}
// Calling hideMenu function / by default this menu should not display
hideMenu();

function upDateScore() {
  currentScore++;
  scoreEl.textContent = currentScore;
  checkCurrentScore(currentScore);
}

// Character select menu, so that you can select a character
// Logic for every character so you have to unlock 2 of them so the game will have a goal

const characters = {
  willieCharacter: { life: 1, coinsMultipliyer: 1, unlocked: true },
  roboSamCharacter: {
    life: 1,
    coinsMultipliyer: 1.75,
    cost: 450,
    unlocked: JSON.parse(localStorage.getItem("roboSamUnlocked")) || false,
  },
  zigZaneCharacter: {
    life: 2,
    coinsMultipliyer: 2.75,
    cost: 1000,
    unlocked: JSON.parse(localStorage.getItem("zigZaneUnlocked")) || false,
  },
};

// Level display functions display that will remove it and add it
const levelDisplay = document.getElementById("level-container");

function removeLevelDisplay() {
  levelDisplay.style.display = "none";
}

function addLevelDisplay() {
  levelDisplay.style.display = "flex";
}

// Buy mechanism for characters so that players can buy characters and after they buy it it will update your gold

function buyMechanism(buyButton, localStorageName, _characterName) {
  buyButton.addEventListener("click", () => {
    let yourCoins = Number(localStorage.getItem("coins"));
    let cost = _characterName.cost;
    if (yourCoins >= cost) {
      localStorage.setItem("coins", yourCoins - cost);

      coins.textContent = localStorage.getItem("coins");
      buyButton.textContent = "Unlocked";
      localStorage.setItem(localStorageName, true);
      _characterName.unlocked = true;
    } else {
      alert(
        `You need ${
          cost - Number(localStorage.getItem("coins"))
        } more coins to buy this character`
      );
    }
  });
}

buyMechanism(roboSamBuyButton, "roboSamUnlocked", characters.roboSamCharacter);
buyMechanism(zigZaneBuyButton, "zigZaneUnlocked", characters.zigZaneCharacter);

// Logic for every character so you have to unlock 2 of them so the game will have a goal

characterMenu.classList.add("displayNone");

function disableOtherCharacter(display, notDisplay1, notDisplay2) {
  display.style.display = "inline-block";
  notDisplay1.style.display = "none";
  notDisplay2.style.display = "none";
}

willieMenuImg.addEventListener("click", (e) => {
  e.stopPropagation();
  disableOtherCharacter(willie, roboSam, zigZane);
});

function isUnlocked(char, button) {
  if (char.unlocked) {
    button.textContent = "Unlocked";
    button.disabled = true;
  }
}

isUnlocked(characters.roboSamCharacter, roboSamBuyButton);
isUnlocked(characters.zigZaneCharacter, zigZaneBuyButton);
localStorage.setItem("multiplyer", characters.willieCharacter.coinsMultipliyer);

// Character select menu, so that you can select a character
willieMenuImg.addEventListener("click", (e) => {
  e.stopPropagation();
  disableOtherCharacter(willie, roboSam, zigZane);
  localStorage.setItem(
    "multiplyer",
    characters.willieCharacter.coinsMultipliyer
  );
});

roboSamMenuImg.addEventListener("click", (e) => {
  e.stopPropagation();
  if (characters.roboSamCharacter.unlocked) {
    disableOtherCharacter(roboSam, willie, zigZane);
    localStorage.setItem(
      "multiplyer",
      characters.roboSamCharacter.coinsMultipliyer
    );
  }
});

zigZaneMenuImg.addEventListener("click", (e) => {
  e.stopPropagation();
  if (characters.zigZaneCharacter.unlocked) {
    disableOtherCharacter(zigZane, willie, roboSam);

    localStorage.setItem(
      "multiplyer",
      characters.zigZaneCharacter.coinsMultipliyer
    );
  }
});

characterButton.addEventListener("click", () => {
  startMenu.classList.add("displayNone");
  characterMenu.classList.add("active");
  hideMissionBord();
});

characterButton2.addEventListener("click", () => {
  characterMenu.classList.add("active");
  characterBackBtn.style.display = "none";
  characterAgainBackBtn.style.display = "flex";
  hideMenu();
  hideMissionBord();
});

characterAgainBackBtn.style.display = "none";
// Character back to start menu button
characterBackBtn.addEventListener("click", () => {
  startMenu.classList.remove("displayNone");
  characterMenu.classList.remove("active");
  missionBox.style.display = "flex";
  showMissionBord();
});

characterAgainBackBtn.addEventListener("click", () => {
  characterMenu.classList.remove("active");
  showMenu();
  showMissionBord();
});

// Coin/currency for the game
chestBox.style.display = "none";
openChest.style.display = "none";

closedChest.addEventListener("click", (e) => {
  e.stopPropagation();
  openChest.style.display = "flex";
  closedChest.style.display = "none";
  chestBox.style.display = "flex";
});

openChest.addEventListener("click", (e) => {
  e.stopPropagation();
  chestBox.style.display = "none";
  openChest.style.display = "none";
  closedChest.style.display = "flex";
});

// Ingame currency system to make player have a goal of achiving a valueble that they then can buy something with

coins.textContent = localStorage.getItem("coins");
let coinRate = 10;
let multipliyer;
setInterval(() => {
  multipliyer = Number(localStorage.getItem("multiplyer"));
}, 1000);

let coinsFromCurrentGame = 0;

function getCoins(score) {
  coinsFromCurrentGame = Math.round((score / coinRate) * multipliyer);

  let currentCoins = Number(localStorage.getItem("coins"));

  localStorage.setItem("coins", currentCoins + coinsFromCurrentGame);
  coins.textContent = localStorage.getItem("coins");
}

function removeChestsFromScreen() {
  closedChest.style.display = "none";
  openChest.style.display = "none";
  chestBox.style.display = "none";
}

// Level system for players so they have another reason of playing this boring game

if (localStorage.getItem("level") === null) {
  localStorage.setItem("level", 1);
}
if (localStorage.getItem("experience") === null) {
  localStorage.setItem("experience", 0);
}
if (localStorage.getItem("xpToLevelUp") === null) {
  localStorage.setItem("xpToLevelUp", 130);
}
if (localStorage.getItem("roboSamUnlocked") === null) {
  localStorage.setItem("roboSamUnlocked", false);
}
if (localStorage.getItem("zigZaneUnlocked") === null) {
  localStorage.setItem("zigZaneUnlocked", false);
}

import { updateLevel, displayLevel } from "./level.js";

let number = Number(localStorage.getItem("experience"));

displayLevel(number);

document.getElementById("level").textContent = localStorage.getItem("level");

// Make a text under the level display that displays how much xp there is until level up
const xpUntilLevel = document.getElementById("xpUntilLevelUp");

function xpUntilNextLevel() {
  let xpToLevelUp = Number(localStorage.getItem("xpToLevelUp"));
  let experience = Number(localStorage.getItem("experience"));

  let remainingXp = xpToLevelUp - experience;

  xpUntilLevel.textContent = remainingXp;
}

xpUntilNextLevel();

// Function to update the speed of the object comming towards the sprite
function setAnimationSpeed(element, duration) {
  element.style.animationDuration = duration + "s";
}

function hideObstacle(show, remove1, remove2, remove3, remove4) {
  show.style.display = "block";
  show.classList.add("animation");

  remove1.style.display = "none";
  remove1.classList.remove("animation");

  remove2.style.display = "none";
  remove2.classList.remove("animation");

  remove3.style.display = "none";
  remove3.classList.remove("animation");

  remove4.style.display = "none";
  remove4.classList.remove("animation");
}

// Default value so that you start with Willie,
// then in the funcction we want to add new values for each level that you are in, then the current character will change
let currentCharacter = obstacle;
let updateScoreTime;
// Default Value
setAnimationSpeed(obstacle, 1.8);

function checkCurrentScore(currentScore) {
  if (currentScore >= 0 && currentScore <= 20) {
    updateScoreTime = 1800;
    updateScoreTimeFunction(updateScoreTime);
    setAnimationSpeed(obstacle, 1.8);
    coinRate = 10;
    hideObstacle(obstacle, boxObstacle, cone, chestObstacle, carObstacle);
    currentCharacter = obstacle;
  } else if (currentScore > 20 && currentScore <= 40) {
    obstacle.classList.remove("animation");
    updateScoreTime = 1500;
    updateScoreTimeFunction(updateScoreTime);
    hideObstacle(cone, obstacle, boxObstacle, chestObstacle, carObstacle);
    coinRate = 9;
    setAnimationSpeed(cone, 1.5);

    setTimeout(() => {
      currentCharacter = cone;
    }, 1000);
  } else if (currentScore > 40 && currentScore <= 70) {
    cone.classList.remove("animation");
    updateScoreTime = 1300;
    updateScoreTimeFunction(updateScoreTime);
    setAnimationSpeed(boxObstacle, 1.3);
    hideObstacle(boxObstacle, cone, obstacle, chestObstacle, carObstacle);
    coinRate = 8;

    setTimeout(() => {
      currentCharacter = boxObstacle;
    }, 1000);
  } else if (currentScore > 70 && currentScore <= 110) {
    boxObstacle.classList.remove("animation");
    updateScoreTimeFunction(updateScoreTime);
    updateScoreTime = 1100;
    setAnimationSpeed(chestObstacle, 1.1);
    hideObstacle(chestObstacle, cone, obstacle, boxObstacle, carObstacle);
    coinRate = 7;

    setTimeout(() => {
      currentCharacter = chestObstacle;
    }, 1000);
  } else if (currentScore > 110 && currentScore <= 400) {
    chestObstacle.classList.remove("animation");
    updateScoreTimeFunction(updateScoreTime);
    updateScoreTime = 1000;
    coinRate = 5;
    setAnimationSpeed(carObstacle, 1);
    hideObstacle(carObstacle, cone, obstacle, boxObstacle, chestObstacle);

    setTimeout(() => {
      currentCharacter = carObstacle;
    }, 1000);
  }
}

function startScoreInterval(updateScoreTime) {
  scoreInterVal = setInterval(upDateScore, updateScoreTime);
}

function stopScoreInterVal() {
  window.clearInterval(scoreInterVal);
}

let currentInterValTime = null;

function updateScoreTimeFunction(time) {
  if (time !== currentInterValTime) {
    currentInterValTime = time;
    stopScoreInterVal(); // Stops the current one and beggins a new one with the time varible
    startScoreInterval(time); // Starts a new one
  }
}

// Pause and start function to the game so players can pause the game if they want to, but if the side is reloaded the game will reset to the start menu
const play = document.createElement("i");
const pauseButton = document.createElement("i");
const pausBox = document.querySelector("#paus-box");

pauseButton.className = "fa-solid fa-pause";
play.className = "fa-solid fa-play";

function addPauseAndStartButton() {
  pausBox.appendChild(pauseButton);
  pausBox.appendChild(play);
  pausBox.style.display = "inline-block";
  pauseButton.style.display = "inline-block";
  play.style.display = "none";

  pauseButton.addEventListener("click", (e) => {
    e.stopPropagation();
    play.classList.add("disabled");
    pauseButton.classList.add("disabled");

    currentCharacter.style.animationPlayState = "paused";

    setTimeout(() => {
      play.classList.remove("disabled");
      pauseButton.classList.remove("disabled");

      pauseButton.style.display = "none";
      play.style.display = "inline-block";

      currentCharacter.style.animationPlayState = "paused";
      triggerJump.style.animationPlayState = "paused";

      stopScoreInterVal();
      backGroundMusic.pause();
      console.log("Worked1");
    }, 600);
  });

  play.addEventListener("click", (e) => {
    e.stopPropagation();
    play.classList.add("disabled");

    setTimeout(() => {
      play.classList.remove("disabled");
      pauseButton.classList.remove("disabled");

      play.style.display = "none";
      pauseButton.style.display = "inline-block";

      currentCharacter.style.animationPlayState = "running";
      triggerJump.style.animationPlayState = "running";

      startScoreInterval(updateScoreTime);
      updateScoreTimeFunction(updateScoreTime);
      backGroundMusic.play();
      console.log("Worked2");
    }, 600);
  });
}

// Adds the default animation for the jump effect on the sprite.
obstacle.classList.remove("animation");

// The first screen you get to when page is loaded for the first time.
playBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentCharacter.classList.add("animation");
  startMenu.classList.add("displayNone");
  startScoreInterval(updateScoreTime);
  hideMissionBord();
  playBackGroundMusic(backGroundMusic);
  removeChestsFromScreen();
  displayLevel(number);
  levelBox.style.display = "none";
  xpUntilNextLevel();
  removeLevelDisplay();
});

// Event listener for space button down, if space is keydown it will jump and trigger an animation.
// Event listener for mobile will be a click on the screen.

triggerJump.addEventListener("click", () => {
  if (!sprite.classList.contains("jump")) {
    sprite.classList.add("jump");
    playSound(jumpSound);
    jumpSound.volume = 0.05;

    setTimeout(() => {
      sprite.classList.remove("jump");
    }, 1000);
  }
});

triggerJump.addEventListener("keydown", (e) => {
  if (e.key === " " && !sprite.classList.contains("jump")) {
    sprite.classList.add("jump");
    playSound(jumpSound);
    jumpSound.volume = 0.05;

    setTimeout(() => {
      sprite.classList.remove("jump");
    }, 1000);
  }
});

// Play again button in the play again menu so people can restart the game.
playAgainButton.addEventListener("click", (e) => {
  e.stopPropagation();
  currentScore = 0;
  scoreEl.textContent = 0;
  obstacle.classList.add("animation");
  scoreDisplay.textContent = "";
  newHighScoreSound.pause();
  deathsound.pause();
  startScoreInterval(updateScoreTime);
  hideMenu();
  hideMissionBord();
  triggerJump.style.animationPlayState = "running";
  playBackGroundMusic(backGroundMusic);
  removeChestsFromScreen();
  levelBox.style.display = "none";
  xpUntilNextLevel();
  removeLevelDisplay();
});

// Collision detection function.
function checkCollision() {
  const spriteRect = currentCharacter.getBoundingClientRect();
  const obstacleRect = sprite.getBoundingClientRect();

  // Check if there’s an overlap.
  if (
    spriteRect.left < obstacleRect.right &&
    spriteRect.right > obstacleRect.left &&
    spriteRect.top < obstacleRect.bottom &&
    spriteRect.bottom > obstacleRect.top
  ) {
    // If collision is detected then the game will stop and a game over menu will pop up u can see ur highscore there and chose character
    currentCharacter.classList.remove("animation");

    highScoreData(currentScore);
    scoreDisplay.textContent = currentScore;
    play.style.display = "none";
    pauseButton.style.display = "none";
    triggerJump.style.animationPlayState = "paused";
    characterButton.classList.add("active");
    pausBox.style.display = "none";

    levelBox.style.display = "flex";
    closedChest.style.display = "flex";

    showMenu();
    backGroundMusic.pause();
    getCoins(currentScore);
    stopScoreInterVal();
    showMissionBord();
    addLevelDisplay();

    updateMissionScore(currentScore, coinsFromCurrentGame);

    checkMission();

    updateLevel(coinsFromCurrentGame);
    xpUntilNextLevel();
  }
  // Repeat on the next animation frame.
  requestAnimationFrame(checkCollision);
}

// Start the collision detection loop.
requestAnimationFrame(checkCollision);

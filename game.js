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

untilHighScoreDisplay.textContent = localStorage.getItem("highScore");

levelBox.style.display = "flex";

// Scores variables
let currentScore = 0;
let scoreInterVal;

function playBackGroundMusic(music) {
  music.play();
  music.volume = 0.05;
  music.currentTime = 0;
}
const scoreDisplayText = document.getElementById("scoreDisplayText");

// Storing the highscore in the local storage
// Function that will check ur highscore
function highScoreData(score) {
  if (score > Number(localStorage.getItem("highScore"))) {
    localStorage.setItem("highScore", score);
    scoreDisplay.textContent = currentScore;
    scoreDisplayText.textContent = "Your new highscore is: ";
    console.log(scoreDisplay.textContent);
    playSound(newHighScoreSound);
    console.log("worked");
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

// Make a nice sound when you press on a button
const allButtons = document.querySelectorAll("button");

allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttonSound.play();
    buttonSound.volume = 0.4;
    e.stopPropagation();
    setTimeout(() => {
      buttonSound.remove();
    }, 500);
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
  currentScore += 1;
  scoreEl.textContent = currentScore;
  checkCurrentScore(currentScore);
}

// Character select menu, so that you can select a character
// Logic for every character so you have to unlock 2 of them so the game will have a goal

const characters = {
  willieCharacter: { life: 1, coinsMultipliyer: 1, unlocked: true },
  roboSamCharacter: {
    life: 1,
    coinsMultipliyer: 1.5,
    cost: 450,
    unlocked: JSON.parse(localStorage.getItem("roboSamUnlocked")) || false,
  },
  zigZaneCharacter: {
    life: 2,
    coinsMultipliyer: 1.75,
    cost: 1000,
    unlocked: JSON.parse(localStorage.getItem("zigZaneUnlocked")) || false,
  },
};

// Buy mechanism for characters so that players can buy characters and after they buy it it will update your gold

function buyMechanism(buyButton, localStorageName, _characterName) {
  buyButton.addEventListener("click", () => {
    let yourCoins = Number(localStorage.getItem("coins"));
    let cost = _characterName.cost;
    if (yourCoins >= cost) {
      localStorage.setItem("coins", yourCoins - cost);
      console.log(yourCoins);
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
    button.disable = true;
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
    console.log(characters.zigZaneCharacter.unlocked);
    localStorage.setItem(
      "multiplyer",
      characters.zigZaneCharacter.coinsMultipliyer
    );
  }
});

characterButton.addEventListener("click", () => {
  startMenu.classList.add("displayNone");
  characterMenu.classList.add("active");
});

characterButton2.addEventListener("click", () => {
  characterMenu.classList.add("active");
  characterBackBtn.style.display = "none";
  characterAgainBackBtn.style.display = "flex";
  hideMenu();
});

characterAgainBackBtn.style.display = "none";
// Character back to start menu button
characterBackBtn.addEventListener("click", () => {
  startMenu.classList.remove("displayNone");
  characterMenu.classList.remove("active");
});

characterAgainBackBtn.addEventListener("click", () => {
  characterMenu.classList.remove("active");
  showMenu();
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
let Multipliyer = Number(localStorage.getItem("multiplyer"));
let coinsFromCurrentGame = 0;

function getCoins(score) {
  coinsFromCurrentGame = Math.round(score / coinRate) * Multipliyer;
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

const levelImg = document.getElementById("level-img");

function updateLevel(coins) {
  let xp = coins * 5;

  let experienceToLevelUp = Number(localStorage.getItem("xpToLevelUp"));

  let rate = Math.round(experienceToLevelUp / 12);

  console.log("rate: ", rate, "amoun to level up: ", experienceToLevelUp, " ");
  let currentExperience = Number(localStorage.getItem("experience")) + xp;

  Number(localStorage.setItem("experience", currentExperience));

  console.log(
    "rate: ",
    rate,
    "amoun to level up: ",
    experienceToLevelUp,
    "current experience: ",
    currentExperience
  );

  displayLevel(currentExperience);
}

// localStorage.setItem("xpToLevelUp", 130);

function displayLevel(currentExperience, rate) {
  rate = Math.round(Number(localStorage.getItem("xpToLevelUp")) / 12);
  let experienceToLevelUp = Number(localStorage.getItem("xpToLevelUp"));

  if (currentExperience == 0) {
    levelImg.src = "level images/New Piskel-1.png (3).png";
  } else if (currentExperience > 0 && currentExperience <= rate * 1) {
    levelImg.src = "level images/New Piskel-2.png (4).png";
  } else if (currentExperience > rate && currentExperience <= rate * 2) {
    levelImg.src = "level images/New Piskel-3.png (1).png";
  } else if (currentExperience > rate * 2 && currentExperience <= rate * 3) {
    levelImg.src = "level images/New Piskel-4.png (1).png";
  } else if (currentExperience > rate * 3 && currentExperience <= rate * 4) {
    levelImg.src = "level images/New Piskel-5.png (1).png";
  } else if (currentExperience > rate * 4 && currentExperience <= rate * 5) {
    levelImg.src = "level images/New Piskel-6.png (1).png";
  } else if (currentExperience > rate * 5 && currentExperience <= rate * 6) {
    levelImg.src = "level images/New Piskel-7.png (1).png";
  } else if (currentExperience > rate * 6 && currentExperience <= rate * 7) {
    levelImg.src = "level images/New Piskel-8.png (1).png";
  } else if (currentExperience > rate * 7 && currentExperience <= rate * 8) {
    levelImg.src = "level images/New Piskel-9.png (1).png";
  } else if (currentExperience > rate * 8 && currentExperience <= rate * 9) {
    levelImg.src = "level images/New Piskel-10.png (1).png";
  } else if (currentExperience > rate * 9 && currentExperience <= rate * 10) {
    levelImg.src = "level images/New Piskel-11.png (2).png";
  } else if (currentExperience > rate * 10 && currentExperience <= rate * 11) {
    levelImg.src = "level images/New Piskel-12.png (2).png";
  } else if (currentExperience >= experienceToLevelUp) {
    levelImg.src = "level images/New Piskel-1.png (3).png";
    document.querySelector("#level").textContent =
      Number(localStorage.getItem("level")) + 1;

    localStorage.setItem("experience", 0);
    localStorage.setItem(
      "xpToLevelUp",
      Number(localStorage.getItem("xpToLevelUp")) + 20
    );

    document.querySelector("#level").textContent =
      Number(localStorage.getItem("level")) + 1;

    localStorage.setItem("level", Number(localStorage.getItem("level")) + 1);
  }
}

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

// Pause and start function to the game so players can pause the game if they want to, but if the side is reloaded the game will reset to the start menu
const play = document.createElement("i");
const pauseButton = document.createElement("i");
const pausBox = document.querySelector("#paus-box");

pauseButton.className = "fa-solid fa-pause";
play.className = "fa-solid fa-play";

function addPauseAndStartButton() {
  pausBox.appendChild(pauseButton);
  pausBox.appendChild(play);
  pauseButton.style.display = "inline-block";
  play.style.display = "none";

  pauseButton.addEventListener("click", (e) => {
    e.stopPropagation();
    pauseButton.style.display = "none";
    play.style.display = "inline-block";
    obstacle.style.animationPlayState = "paused";
    stopScoreInterVal();
    triggerJump.style.animationPlayState = "paused";
    backGroundMusic.pause();
  });

  play.addEventListener("click", (e) => {
    e.stopPropagation();
    play.style.display = "none";
    pauseButton.style.display = "inline-block";
    obstacle.style.animationPlayState = "running";
    triggerJump.style.animationPlayState = "running";
    startScoreInterval();
    backGroundMusic.play();
  });
}
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
let updateScoreTime = 1800;
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
    setTimeout(() => {
      updateScoreTime = 1500;
      updateScoreTimeFunction(updateScoreTime);
      setAnimationSpeed(cone, 1.5);
      hideObstacle(cone, obstacle, boxObstacle, chestObstacle, carObstacle);
      coinRate = 9;
      currentCharacter = cone;
    }, 1000);
  } else if (currentScore > 40 && currentScore <= 70) {
    cone.classList.remove("animation");
    setTimeout(() => {
      updateScoreTime = 1300;
      updateScoreTimeFunction(updateScoreTime);
      setAnimationSpeed(boxObstacle, 1.3);
      hideObstacle(boxObstacle, cone, obstacle, chestObstacle, carObstacle);
      coinRate = 8;
      currentCharacter = boxObstacle;
    }, 1000);
  } else if (currentScore > 70 && currentScore <= 110) {
    boxObstacle.classList.remove("animation");
    setTimeout(() => {
      updateScoreTimeFunction(updateScoreTime);
      updateScoreTime = 1100;
      setAnimationSpeed(chestObstacle, 1.1);
      hideObstacle(chestObstacle, cone, obstacle, boxObstacle, carObstacle);
      coinRate = 7;
      currentCharacter = chestObstacle;
    }, 1000);
  } else if (currentScore > 110 && currentScore <= 400) {
    chestObstacle.classList.remove("animation");
    setTimeout(() => {
      updateScoreTimeFunction(updateScoreTime);
      stopScoreInterVal();
      coinRate = 5;
      updateScoreTime = 1000;
      setAnimationSpeed(carObstacle, 1);
      hideObstacle(carObstacle, cone, obstacle, boxObstacle);
      currentCharacter = carObstacle;
    }, 1000);
  }
}

function startScoreInterval(updateScoreTime) {
  scoreInterVal = setInterval(upDateScore, updateScoreTime);
}

function stopScoreInterVal() {
  clearInterval(scoreInterVal);
}

function updateScoreTimeFunction(time) {
  stopScoreInterVal();
  startScoreInterval(time);
}

// Adds the default animation for the jump effect on the sprite.
obstacle.classList.remove("animation");

// The first screen you get to when page is loaded for the first time.
playBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  obstacle.classList.add("animation");
  startMenu.classList.add("displayNone");
  startScoreInterval();
  addPauseAndStartButton();
  playBackGroundMusic(backGroundMusic);
  removeChestsFromScreen();
  displayLevel(number);
  levelBox.style.display = "none";
  xpUntilNextLevel();
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
  startScoreInterval();
  hideMenu();
  addPauseAndStartButton();
  triggerJump.style.animationPlayState = "running";
  playBackGroundMusic(backGroundMusic);
  removeChestsFromScreen();
  levelBox.style.display = "none";
  xpUntilNextLevel();
});

// Collision detection function.
function checkCollision() {
  const spriteRect = sprite.getBoundingClientRect();
  const obstacleRect = currentCharacter.getBoundingClientRect();

  // Check if there’s an overlap.
  if (
    spriteRect.left < obstacleRect.right &&
    spriteRect.right > obstacleRect.left &&
    spriteRect.top < obstacleRect.bottom &&
    spriteRect.bottom > obstacleRect.top
  ) {
    // If collision is detected then the game will stop and a menu should pop up.
    console.log("Collision detected!");
    currentCharacter.classList.remove("animation");
    currentCharacter.classList.add("resetPos");
    highScoreData(currentScore);
    scoreDisplay.textContent = currentScore;
    play.style.display = "none";
    pauseButton.style.display = "none";
    triggerJump.style.animationPlayState = "paused";
    characterButton.classList.add("active");
    chestObstacle.classList.remove("animation");
    levelBox.style.display = "flex";

    closedChest.style.display = "flex";
    showMenu();
    backGroundMusic.pause();
    getCoins(currentScore);
    stopScoreInterVal();

    updateLevel(coinsFromCurrentGame);
    xpUntilNextLevel();
  }
  // Repeat on the next animation frame.
  requestAnimationFrame(checkCollision);
}

// Start the collision detection loop.
requestAnimationFrame(checkCollision);

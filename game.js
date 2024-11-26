// Variables for sprite,obstecle and the jump effect when hit space on the keyboard
const sprite = document.querySelector("#sprite");
const obstacle = document.querySelector("#obstacle");
const triggerJump = document.querySelector("body");
const scoreEl = document.querySelector("#score");

const playAgainButton = document.querySelector("#playAgainBtn");

const playBtn = document.querySelector("#play-btn");
const startMenu = document.querySelector("#container");

// Characters and character related stuff
const characterButton = document.querySelector("#characters-btn");
const characterMenu = document.querySelector("#character-container");
const characterBackBtn = document.querySelector("#back-to-start-menu-button");
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

// Chest and coins
const openChest = document.getElementById("openChest");
const closedChest = document.getElementById("closedChest");
const chestBox = document.getElementById("chest-box");
const chestContainer = document.getElementById("chest-container");
const coins = document.getElementById("coins");

const roboSamBuyButton = document.getElementById("price2");
const zigZaneBuyButton = document.getElementById("price3");

const scoreDisplay = document.getElementById("scoreDisplay");

// Scores variables
let currentScore = 0;
let scoreInterVal;
let updateScoreTime = 2000;

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

// Function that will store coins

function playSound(sound) {
  sound.play();
  sound.volume = 0.1;
  sound.currentTime = 0;
}

const scores = [0];
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
    cost: 350,
    unlocked: JSON.parse(localStorage.getItem("roboSamUnlocked")) || false,
  },
  zigZaneCharacter: {
    life: 2,
    coinsMultipliyer: 1.75,
    cost: 800,
    unlocked: JSON.parse(localStorage.getItem("zigZaneUnlocked")) || false,
  },
};

// Buy mechanism for characters so that players can buy characters and after they buy it it will update your gold

function buyMechanism(buyButton, localStorageName, _characterName) {
  buyButton.addEventListener("click", (e) => {
    e.stopPropagation();
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
      alert("Not enough coins");
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

characterButton.addEventListener("click", (e) => {
  e.stopPropagation();
  startMenu.classList.add("displayNone");
  characterMenu.classList.add("active");
});

// Character back to start menu button
characterBackBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  startMenu.classList.remove("displayNone");
  characterMenu.classList.remove("active");
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

function getCoins(score) {
  let coinsFromCurrentGame = Math.round(score / coinRate) * Multipliyer;

  let currentCoins = Number(localStorage.getItem("coins"));

  localStorage.setItem("coins", currentCoins + coinsFromCurrentGame);
  coins.textContent = localStorage.getItem("coins");
}

function removeChestsFromScreen() {
  closedChest.style.display = "none";
  openChest.style.display = "none";
}

// Pause and start function to the game
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

function checkCurrentScore(currentScore) {
  if (currentScore >= 0 && currentScore <= 20) {
    updateScoreTime = 2000;
    setAnimationSpeed(obstacle, 2);
    obstacle.src = "pictures/New Piskel (19) (2).gif";
    coinRate = 10;
  } else if (currentScore > 20 && currentScore <= 30) {
    updateScoreTime = 1800;
    setAnimationSpeed(obstacle, 1.8);
    obstacle.src = "pictures/New Piskel (28).gif";
    obstacle.style.left = 100 + "%";
    coinRate = 9;
  } else if (currentScore > 30 && currentScore <= 50) {
    updateScoreTime = 1500;
    setAnimationSpeed(obstacle, 1.5);
    obstacle.src = "pictures/New Piskel (27).gif";
    coinRate = 8;
  } else if (currentScore > 50 && currentScore <= 80) {
    updateScoreTime = 1200;
    setAnimationSpeed(obstacle, 1.2);
    coinRate = 7;
  }
}

function startScoreInterval() {
  scoreInterVal = setInterval(upDateScore, updateScoreTime);
}

function stopScoreInterVal() {
  clearInterval(scoreInterVal);
}

// Adds the default animation for the jump effect on the sprite
obstacle.classList.remove("animation");

// The first screen u get to when page is loaded
playBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  obstacle.classList.add("animation");
  startMenu.classList.add("displayNone");
  startScoreInterval();
  addPauseAndStartButton();
  playBackGroundMusic(backGroundMusic);
  removeChestsFromScreen();
});

// event listener for space button down, if space is keydown it will jump and trigger an animation

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

// Play again button in the play again menu
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
});

// Collision detection function
function checkCollision() {
  const spriteRect = sprite.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  // Check if there’s an overlap
  if (
    spriteRect.left < obstacleRect.right &&
    spriteRect.right > obstacleRect.left &&
    spriteRect.top < obstacleRect.bottom &&
    spriteRect.bottom > obstacleRect.top
  ) {
    // If collision is detected then the game will stop and a menu should pop up
    console.log("Collision detected!");
    obstacle.classList.remove("animation");
    obstacle.classList.add("resetPos");
    highScoreData(currentScore);
    scoreDisplay.textContent = currentScore;
    play.style.display = "none";
    pauseButton.style.display = "none";
    triggerJump.style.animationPlayState = "paused";

    closedChest.style.display = "flex";

    showMenu();
    backGroundMusic.pause();
    getCoins(currentScore);
    stopScoreInterVal();
  }
  // Repeat on the next animation frame
  requestAnimationFrame(checkCollision);
}

// Start the collision detection loop
requestAnimationFrame(checkCollision);

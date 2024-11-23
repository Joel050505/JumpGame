// Variables for sprite,obstecle and the jump effect when hit space on the keyboard
const sprite = document.querySelector("#sprite");
const obstacle = document.querySelector("#obstacle");
const triggerJump = document.querySelector("body");
const scoreEl = document.querySelector("#score");

const playAgainButton = document.querySelector("#playAgainBtn");

const playBtn = document.querySelector("#play-btn");
const startMenu = document.querySelector("#container");

// Characters
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

const scoreDisplay = document.getElementById("scoreDisplay");
// triggerJump.style.animationPlayState = "paused";

// Scores variables
let currentScore = 0;
let scoreInterVal;
let updateScoreTime = 2000;

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
characterMenu.classList.add("displayNone");

willieMenuImg.addEventListener("click", () => {
  roboSam.style.display = "none";
  willie.style.display = "inline-block";
  zigZane.style.display = "none";
});

roboSamMenuImg.addEventListener("click", () => {
  roboSam.style.display = "inline-block";
  willie.style.display = "none";
  zigZane.style.display = "none";
});

zigZaneMenuImg.addEventListener("click", () => {
  zigZane.style.display = "inline-block";
  willie.style.display = "none";
  roboSam.style.display = "none";
});

characterButton.addEventListener("click", () => {
  startMenu.classList.add("displayNone");
  characterMenu.classList.add("active");
});

// Character back to start menu button
characterBackBtn.addEventListener("click", () => {
  startMenu.classList.remove("displayNone");
  characterMenu.classList.remove("active");
});

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

  pauseButton.addEventListener("click", () => {
    pauseButton.style.display = "none";
    play.style.display = "inline-block";
    obstacle.style.animationPlayState = "paused";
    stopScoreInterVal();
    triggerJump.style.animationPlayState = "paused";
  });

  play.addEventListener("click", () => {
    play.style.display = "none";
    pauseButton.style.display = "inline-block";
    obstacle.style.animationPlayState = "running";
    triggerJump.style.animationPlayState = "running";
    startScoreInterval();
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
  } else if (currentScore > 20 && currentScore <= 30) {
    updateScoreTime = 1800;
    setAnimationSpeed(obstacle, 1.8);
  } else if (currentScore > 30 && currentScore <= 50) {
    updateScoreTime = 1500;
    setAnimationSpeed(obstacle, 1.5);
  } else if (currentScore > 50 && currentScore <= 80) {
    updateScoreTime = 1200;
    setAnimationSpeed(obstacle, 1.2);
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
playBtn.addEventListener("click", () => {
  obstacle.classList.add("animation");
  startMenu.classList.add("displayNone");

  startScoreInterval();
  addPauseAndStartButton();
});

// event listener for space button down, if space is keydown it will jump and trigger an animation
triggerJump.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Space") {
    if (!sprite.classList.contains("jump")) {
      sprite.classList.add("jump");
      playSound(jumpSound);
      jumpSound.volume = 0.05;
    }

    setTimeout(() => {
      sprite.classList.remove("jump");
    }, 1000);
  }
});

// Play again button in the play again menu
playAgainButton.addEventListener("click", () => {
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
    scoreDisplay.textContent = currentScore;
    play.style.display = "none";
    pauseButton.style.display = "none";
    triggerJump.style.animationPlayState = "paused";
    showMenu();

    // Pushing current score while playing to a array and then making a new array with the highest scores
    scores.push(currentScore);
    let highestScore = 0;

    // let highestScore = Math.max(...scores.slice(0, -1));

    if (currentScore > highestScore) {
      scoreDisplay.textContent = "NEW HIGH SCORE " + currentScore;
      scoreDisplay.style.color = "gold";
      playSound(newHighScoreSound);
    } else {
      playSound(deathsound);
      deathsound.playbackRate = 1.2;
      deathsound.volume = 0.2;
    }

    // Stoping the interval
    stopScoreInterVal();
  }
  // Repeat on the next animation frame
  requestAnimationFrame(checkCollision);
}

// Start the collision detection loop
requestAnimationFrame(checkCollision);

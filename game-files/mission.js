// Function that update the score based on the mission that the player has, play can do unlimited missions therefore its a very play to grind game.

const missionBox = document.getElementById("mission-container");

const missionName = document.getElementById("mission-name");
const missionAmount = document.getElementById("mission-amount");
const missionScore = document.getElementById("mission-count");

export function updateMissionScore(score, coinsFromCurrentGame) {
  let scoredEnough = Number(localStorage.getItem("scored"));
  let coinsCollected = Number(localStorage.getItem("coinsCollected"));

  if (scoredEnough < 500 && localStorage.getItem("mission") === "mission1") {
    let scored = Number(localStorage.getItem("scored")) + score;
    missionScore.textContent = scored;
    localStorage.setItem("scored", scored);
  }
  if (coinsCollected < 75 && localStorage.getItem("mission") === "mission2") {
    let collectedCoins =
      Number(localStorage.getItem("coinsCollected")) + coinsFromCurrentGame;

    localStorage.setItem("coinsCollected", collectedCoins);
    missionScore.textContent = collectedCoins;
  }
}

export function checkMission() {
  let scoredEnough = Number(localStorage.getItem("scored"));
  let coinsCollected = Number(localStorage.getItem("coinsCollected"));
  if (scoredEnough >= 500 && localStorage.getItem("mission") === "mission1") {
    localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 25);
    coins.textContent = localStorage.getItem("coins");
    missionScore.textContent = 0;
    missionAmount.textContent = 75;
    missionName.textContent = "Collect 75 coins";
    localStorage.setItem("scored", 0);
    localStorage.setItem("mission", "mission2");
  } else if (
    coinsCollected >= 75 &&
    localStorage.getItem("mission") === "mission2"
  ) {
    localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 25);
    coins.textContent = localStorage.getItem("coins");

    missionScore.textContent = 0;
    missionAmount.textContent = 500;
    missionName = "Score 500 points";
    localStorage.setItem("coinsCollected", 0);
    localStorage.setItem("mission", "mission1");
  }
}

export function hideMissionBord() {
  missionBox.style.display = "none";
}

export function showMissionBord() {
  missionBox.style.display = "flex";
}

const levelImg = document.getElementById("level-img");

export function updateLevel(coins) {
  let xp = coins * 5;

  let experienceToLevelUp = Number(localStorage.getItem("xpToLevelUp"));

  let rate = Math.round(experienceToLevelUp / 12);

  let currentExperience = Number(localStorage.getItem("experience")) + xp;

  Number(localStorage.setItem("experience", currentExperience));

  displayLevel(currentExperience);
}

// localStorage.setItem("xpToLevelUp", 130);

export function displayLevel(currentExperience, rate) {
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
  } else if (
    currentExperience > rate * 10 &&
    currentExperience <= experienceToLevelUp - 1
  ) {
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

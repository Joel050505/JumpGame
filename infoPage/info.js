const navBar = document.querySelector(".navBar2");

const hamburgerIcon = document.querySelector(".fa-bars");
const xmarkIcon = document.querySelector(".fa-xmark");

hamburgerIcon.addEventListener("click", () => {
  navBar.style.right = 0;
  hamburgerIcon.style.display = "none";
  xmarkIcon.style.display = "block";
});

xmarkIcon.addEventListener("click", () => {
  navBar.style.right = -200 + "px";

  hamburgerIcon.style.display = "block";
  xmarkIcon.style.display = "none";
});

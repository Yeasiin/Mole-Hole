const startBtn = document.querySelector(".start__btn");
const stopBtn = document.querySelector(".stop__btn");
const holes = document.querySelectorAll(".hole");
const gameEndIn = document.querySelector(".gameEndIn");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

let lastHole, peepTime, timer;
let timeUp = false;
let gameTime = 30000;
let gameTimer = gameTime / 1000;
let score = 0;

gameEndIn.textContent = gameTimer + " Seconds";

function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randHoles(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (lastHole === hole) {
    return randHoles(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randTime(300, 1000);
  // const time = randTime(100000, 220000);
  const hole = randHoles(holes);
  hole.classList.add("up");
  peepTime = setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  clearInterval(timer);
  clearTimeout(peepTime);
  timeUp = false;
  score = 0;
  gameTimer = gameTime / 1000;
  gameEndIn.textContent = gameTimer + " Seconds";
  scoreBoard.textContent = score;
  peep();
  setTimeout(() => {
    timeUp = true;
  }, gameTime);

  timer = setInterval(() => {
    updateSec();
  }, 1000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentElement.style.backgroundImage = "url(bang.png)";
  this.style.zIndex = "-1";
  setTimeout(() => {
    this.style.zIndex = "";
    this.parentElement.style.background = "";
  }, 500);

  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", bonk));

function updateSec() {
  gameEndIn.textContent = --gameTimer + " Seconds";

  if (gameTimer < 0) {
    gameEndIn.textContent = "Game Over";
    clearInterval(timer);
  }
}

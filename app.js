const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole, peepTime;
let timeup = false;
let score = 0;

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


function peep(){
    const time = randTime(200, 800);
    const hole = randHoles(holes);
    hole.classList.add("up");
    peepTime = setTimeout(() => {
        hole.classList.remove("up");
        if(!timeup) peep();
    }, time);
}

function startGame(){
    clearTimeout(peepTime)
    timeup = false;
    score = 0;
    peep();
    setTimeout(() => {
        timeup = true;
    }, 60000);
}
function bonk (e){
    if(!e.isTrusted) return;
    score++;
    this.parentElement.classList.remove("up");
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener("click", bonk));
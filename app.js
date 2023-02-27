let initialTime = 1800;
let valueInitial = 1800;
let CycleNumber = 0;
let restTime = 300;
let valueRest = 300;

/*Function pour transformer le nombre de seconde en format heure */

function returnFormattedTime(time) {
  return `${Math.trunc(time / 60)}:${
    time % 60 < 10 ? `0${time % 60}` : time % 60
  }`;
}
console.log(returnFormattedTime(restTime));

const workTimer = document.querySelector(".work-timer");
const restTimer = document.querySelector(".rest-timer");
const playButton = document.querySelector(".play-button");
const cycles = document.querySelector(".cycles");

const containerButton = document.querySelector(".container-button");

let toggle = true;
let timerID;

/*Gestion de la lecture */
playButton.addEventListener("click", start);
function start() {
  if (initialTime > 0) {
    initialTime--;
    pauseButton.disabled = false;
    toggle = true;

    workTimer.textContent = returnFormattedTime(initialTime);
    timerID = setInterval(
      play,
      1000
    ); /* appel de la fonction start avec un delay de 1 sec */
    playButton.disabled = true;
  } else {
    restTime--;

    pauseButton.disabled = false;
    toggle = true;

    restTime.textContent = returnFormattedTime(initialTime);
    timerID = setInterval(
      play,
      1000
    ); /* appel de la fonction start avec un delay de 1 sec */
    playButton.disabled = true;
  }
}
function play() {
  if (toggle === true && initialTime > 0) {
    initialTime--;
    workTimer.textContent = returnFormattedTime(initialTime);
  } else if (toggle === true && initialTime === 0 && restTime > 0) {
    restTime--;
    restTimer.textContent = returnFormattedTime(restTime);
  } else {
    initialTime = 1799;
    restTime = 300;
    restTimer.textContent = returnFormattedTime(restTime);
    CycleNumber++;
    cycles.textContent = `Cycle(s): ${CycleNumber}`; /* incrementation des cycles*/
  }
}

/* Gestion de la pause */
const pauseButton = document.querySelector(".pause-button");
pauseButton.addEventListener("click", handlePause);

function handlePause() {
  if (initialTime > 0) {
    pauseButton.disabled = true;
    toggle = false;
    playButton.disabled = false;

    workTimer.textContent = returnFormattedTime(initialTime);
  } else if (initialTime === 0) {
    pauseButton.disabled = true;
    toggle = false;
    playButton.disabled = false;
  }
  clearInterval(timerID); /* function pour stopper l'intervale*/
}

/* gestion du bouton Reset */
const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", handleReset);

function handleReset() {
  toggle = false;
  initialTime = valueInitial;
  restTime = valueRest;
  workTimer.textContent = returnFormattedTime(initialTime);
  restTimer.textContent = returnFormattedTime(restTime);
  playButton.disabled = false;
  pauseButton.disabled = false;
  cycles.textContent = `Cycle(s): 0`;
  clearInterval(timerID);
}

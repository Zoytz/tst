const textArea = document.querySelector('.form__input');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const overallTitle = document.querySelector('.titles__span_type_overall');
const counterTitle = document.querySelector('.titles__span_type_counter');

let start = 0;
let end = 0;
let timerId = 0;
let pause = 0;
let pauseStart = 0;
let pauseEnd = 0;

function handleTypeStop (pauseTime) {
    end = Date.now();
    const wastedTime = (end - start - pauseTime) / 1000 / 60;
    counterTitle.textContent = Math.floor(textArea.value.length / wastedTime);
    textArea.value = '';
}

function handlePause () {
  if(!pauseStart) {
    pauseStart = Date.now();
    clearTimeout(timerId);
    startButton.textContent = 'Возобновить';
  } else {
    startButton.textContent = 'Пауза';
    pauseEnd = Date.now();
    pause = pause + (pauseEnd - pauseStart);
    pauseStart = 0;
    textArea.focus();
  }
}

function handleResetAll() {
  textArea.value = '';
  counterTitle.textContent = 0;
  overallTitle.textContent = 0;
  start = 0;
  end = 0;
}

function handleInput (pauseTime) {
  if(!start) {
    start = Date.now();
  }
  overallTitle.textContent = textArea.value.length;
  now = Date.now();
  const wastedTime = (now - start - pauseTime) / 1000 / 60;
  counterTitle.textContent = Math.floor(textArea.value.length / wastedTime);
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => handleTypeStop(pause), 5000);
}


textArea.addEventListener('input', () => handleInput(pause));
startButton.addEventListener('click', handlePause);
resetButton.addEventListener('click', handleResetAll);

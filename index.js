const textArea = document.querySelector('.form__input');
const startButton = document.getElementById('startButton');
const resetButton = document.querySelector('.button_type_clear');
const overallTitle = document.querySelector('.titles__span_type_overall');
const counterTitle = document.querySelector('.titles__span_type_counter');

let start = 0;
let end = 0;
let timerId = null;

function handleTypeStop () {
    end = Date.now();
    const wastedTime = (end - start) / 1000 / 60;
    counterTitle.textContent = Math.floor(textArea.value.length / wastedTime);
    startButton.classList.add('button_type_run');
    startButton.classList.remove('button_type_pause');
    textArea.value = '';
}

function tsCounter() {
  if(startButton.classList.contains('button_type_run')) {
    end = Date.now();
    const wastedTime = (end - start - 5000) / 1000 / 60;
    counterTitle.textContent = Math.floor(textArea.value.length / wastedTime);
    startButton.classList.toggle('button_type_pause');
    textArea.value = '';
  } else {
    startButton.classList.remove('button_type_pause');
  }
}

function handleResetAll() {
  textArea.value = '';
  counterTitle.textContent = 0;
  overallTitle.textContent = 0;
  start = 0;
  end = 0;
}

function handleInput () {
  if(!start) {
    start = Date.now();
  }
  overallTitle.textContent = textArea.value.length;
  now = Date.now();
  const wastedTime = (now - start) / 1000 / 60;
  counterTitle.textContent = Math.floor(textArea.value.length / wastedTime);
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(handleTypeStop, 5000);
}


textArea.addEventListener('input', handleInput);
startButton.addEventListener('click', tsCounter);
resetButton.addEventListener('click', handleResetAll);

const textArea = document.querySelector('.form__input');
const startButton = document.getElementById('startButton');
const title = document.querySelector('.buttons__title');
const resetButton = document.querySelector('.button_type_clear');

let start = 0;
let end = 0;

function handleTypeStart () {
  start = Date.now();
}

function tsCounter() {
  if(startButton.classList.contains('button_type_run')) {
    end = Date.now();
    const wastedTime = (end - start) / 1000 / 60;
    title.textContent = Math.floor(textArea.value.length / wastedTime);
    startButton.classList.toggle('button_type_pause');
    textArea.value = '';
  } else {
    startButton.classList.remove('button_type_pause');
  }
}

function handleResetAll() {
  textArea.value = '';
  title.textContent = 0;
  start = 0;
  end = 0;
}

textArea.addEventListener('click', handleTypeStart);
startButton.addEventListener('click', tsCounter);
resetButton.addEventListener('click', handleResetAll);

const options = document.querySelectorAll('.options-btn');
const screenOne = document.querySelector('.screen.options.one');
const screenTwo = document.querySelector('.screen.options.two');
const screenThree = document.querySelector('.screen.options.three');


const gameOptions = {
  opponent: "",
  playerIcon: "",
  compDifficulty: ""
}

// sets an event listener for each option button
options.forEach((option, index) => {

  // If options are for choosing opponent 
  if (index === 0 || index === 1) {
    option.addEventListener('click', (e) => {
      const optionChosen = e.target.textContent.split(' ')[1].toLowerCase();
      if (optionChosen != null) {
        gameOptions.opponent = optionChosen;
        screenOne.classList.add('hide');
      }
    });
  }
  // If options are for choosing player icon
  else if (index === 2 || index === 3) {
    option.addEventListener('click', (e) => {
      const optionChosen = e.target.textContent.toLowerCase();
      if (optionChosen != null) {
        gameOptions.playerIcon = optionChosen;
        screenTwo.classList.add('hide');
      }
      if (gameOptions.opponent === 'friend') {
        startGame(gameOptions);
      } else {
        screenThree.classList.remove('hide');
      }
    });
  }
  // 
  else {
    option.addEventListener('click', (e) => {
      const optionChosen = e.target.textContent.toLowerCase();
      if (optionChosen != null) {
        gameOptions.compDifficulty = optionChosen;
        screenThree.classList.add('hide');
        startGame(gameOptions);
      }
    });
  }
});

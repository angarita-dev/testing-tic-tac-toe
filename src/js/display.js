class Display {

  clearChildren(parentElement) {
    while(parentElement.hasChildNodes()) {
      parentElement.removeChild(parentElement.firstChild);
    }
  }

  clearBoard() {
    const board = document.getElementById('board');

    let boardHTML = '' ;
    for(let i = 0; i < 9; i += 1){
      boardHTML += `
        <div class="tile"> 
        <h1 class="tile-container"></h1> 
        </div>`;
    }

    board.innerHTML = boardHTML;
  }

  displaySideCard() {
    const sideCard = document.getElementById('side-card');
    
    sideCard.classList.remove('slide-out');
    sideCard.classList.add('slide-in');
  }

  displayWin() {
    const tileContainers = Array.from(document.getElementsByClassName('tile-container'));

    tileContainers.forEach( tileContainer => {
      tileContainer.textContent = String.fromCodePoint(0x0001F389); 
    });
  }

  displayReplay(rematchHandler, restartHandler) {
    const sideCard = document.getElementById('side-card');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('replay-container');

    const rematch = document.createElement('span');
    rematch.textContent = 'Rematch';

    const restart = document.createElement('span');
    restart.textContent = 'New game';
    
    sideCard.appendChild(buttonContainer);

    buttonContainer.appendChild(rematch);
    buttonContainer.appendChild(restart);

    rematch.classList.add('rematch-button');
    rematch.onclick = () => { rematchHandler() };

    restart.classList.add('restart-button');
    restart.onclick = () => { restartHandler() };
  }

  hideSideCard() {
    const sideCard = document.getElementById('side-card');
    
    sideCard.classList.remove('slide-in');
    sideCard.classList.add('slide-out');
  }

  tileClickListener(handleFunction) {
    const tileContainers = Array.from(document.getElementsByClassName('tile-container'));

    tileContainers.forEach( tileContainer => {
      tileContainer.onclick = () => { 
        const itemIndex = tileContainers.indexOf(tileContainer);
        handleFunction(itemIndex);
      };
    });
  }

  fillTile(tileIndex, character) {
    const board = document.getElementById('board'); 
    const tile = board.children[tileIndex];

    tile.firstElementChild.textContent = character;
  }

  displayMessage(message) {
    const sideCardContainer = document.getElementById('side-card'); 
    const messageComponent = document.createElement('h3');

    messageComponent.textContent = message;
    this.clearChildren(sideCardContainer);
    sideCardContainer.appendChild(messageComponent);
  }

  displayForm(submitHandleFunction) {
    const sideCardContainer = document.getElementById('side-card'); 

    this.clearChildren(sideCardContainer);
    for(let i = 1; i <= 2; i += 1){
      const playerContainer = document.createElement('div');
      playerContainer.className = 'player-container';

      const nameInput = document.createElement('input');
      nameInput.className = 'name-input';
      nameInput.id = `p${i}-name`;
      nameInput.value = `Player ${i} name`;

      const charInput = document.createElement('input');
      charInput.className = 'char-input';
      charInput.id = `p${i}-char`;
      charInput.value = i == 1 ? 'x' : 'o';

      playerContainer.appendChild(nameInput);
      playerContainer.appendChild(charInput);
      sideCardContainer.appendChild(playerContainer);
    }

    const submitButton = document.createElement('span');
    submitButton.id = 'submit-players';
    submitButton.className = 'submit-players';
    submitButton.textContent = 'Submit';

    submitButton.onclick = () => {
      let char1 = document.getElementById('p1-char').value;
      let char2 = document.getElementById('p2-char').value;

      if(char1 === char2 || char1.length > 1 || char2.length > 1) return false;

      submitHandleFunction({
        player1: {
          name: document.getElementById('p1-name').value,
          character: char1, 
        },
        player2: {
          name: document.getElementById('p2-name').value,
          character: char2, 
        }
      });
    }

    sideCardContainer.appendChild(submitButton);
  }


}

export default Display;

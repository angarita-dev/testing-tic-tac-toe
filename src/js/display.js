class Display {

  clearChildren(parentElement) {
    while(parentElement.hasChildNodes()) {
      parentElement.removeChild(parentElement.firstChild);
    }
  }

  tileClickListener(handleFunction) {
    const tileContainers = Array.from(document.getElementsByClassName('tile-container'));

    tileContainers.forEach( tileContainer => {
      tileContainer.onclick = () => { handleFunction() };
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

  displayForm() {
    const sideCardContainer = document.getElementById('side-card'); 

    this.clearChildren(sideCardContainer);
    for(let i = 1; i <= 2; i += 1){
      const playerContainer = document.createElement('div');
      playerContainer.className = 'player-container';

      const nameInput = document.createElement('input');
      nameInput.className = 'name-input';
      nameInput.id = `p${i}-name`;
      nameInput.placeHolder = `Player ${i} name`;

      const charInput = document.createElement('input');
      charInput.className = 'char-input';
      charInput.id = `p${i}-char`;
      charInput.placeHolder = i == 1 ? 'x' : 'o';

      playerContainer.appendChild(nameInput);
      playerContainer.appendChild(charInput);
      sideCardContainer.appendChild(playerContainer);
    }

    const submitButton = document.createElement('span');
    submitButton.id = 'submit-players';
    submitButton.className = 'submit-players';
    submitButton.textContent = 'Submit';

    sideCardContainer.appendChild(submitButton);
  }


}

export default Display;

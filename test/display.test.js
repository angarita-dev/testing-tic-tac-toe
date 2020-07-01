import Display from '../src/js/display';

test('Adds message to side-card', () => {
  const display = new Display();
  document.body.innerHTML =
    '<div class="side-card slide-in" id="side-card">' +
    '</div>';

  const message = 'Test Message';
  display.displayMessage(message); 

  const firstChild = document.getElementById('side-card').firstElementChild;
  expect(firstChild.nodeName).toBe('H3');
  expect(firstChild.textContent).toBe(message);
});

test('Clears side card before adding message', () => {
  const display = new Display();
  document.body.innerHTML =
    '<div class="side-card slide-in" id="side-card">' +
      '<h3>junk</h3>' +
    '</div>';

  const message = 'Test Message';
  display.displayMessage(message); 

  const firstChild = document.getElementById('side-card').firstElementChild;
  expect(firstChild.parentElement.children.length).toBe(1);
  expect(firstChild.nodeName).toBe('H3');
  expect(firstChild.textContent).toBe(message);
});

test('Fills tile with character', () => {
  const display = new Display();

  let boardHTML = '<div class="board" id="board">' 
  for(let i = 0; i < 9; i += 1){
    boardHTML += `
      <div class="tile"> 
        <h1 class="tile-container"></h1> 
      </div>`;
  }
  boardHTML += '</div>'; 
  document.body.innerHTML = boardHTML;

  display.fillTile(0, 'X');
  expect(document.getElementById('board').children[0].firstElementChild.textContent)
    .toBe('X');
  display.fillTile(2, 'O');
  expect(document.getElementById('board').children[2].firstElementChild.textContent)
    .toBe('O');
  display.fillTile(8, 'C');
  expect(document.getElementById('board').children[8].firstElementChild.textContent)
    .toBe('C');
});

test('Displays form', () => {
  const display = new Display();

  document.body.innerHTML = `
    <div class="side-card slide-in" id="side-card">
    </div>`;

  display.displayForm();
  const playerContainers = Array.from(document.getElementsByClassName('player-container'));
  const submitButton = document.getElementById('side-card').lastChild;

  expect(playerContainers.length).toBe(2);
  
  let playerContainerPosition = 1;
  playerContainers.forEach( playerContainer => {
    const nameInput = playerContainer.firstElementChild;
    const charInput = playerContainer.lastElementChild;
    expect(nameInput.className).toBe('name-input');
    expect(charInput.className).toBe('char-input');
    expect(nameInput.id).toBe('p' + playerContainerPosition + '-name');
    expect(charInput.id).toBe('p' + playerContainerPosition + '-char');
    expect(nameInput.placeHolder).toBe('Player ' + playerContainerPosition + ' name');

    if(playerContainerPosition == 1) {
      expect(charInput.placeHolder).toBe('x');
    } else {
      expect(charInput.placeHolder).toBe('o');
    }
    playerContainerPosition += 1;
  });

  expect(submitButton.nodeName).toBe('SPAN');
  expect(submitButton.textContent).toBe('Submit');
});

test('Should add eventListener to tile click', () => {
  const display = new Display();
  let boardHTML = '<div class="board" id="board">' 

  for(let i = 0; i < 9; i += 1){
    boardHTML += `
      <div class="tile"> 
        <h1 class="tile-container"></h1> 
      </div>`;
  }

  boardHTML += '</div>'; 
  document.body.innerHTML = boardHTML;

  const toBeCalledFunction = jest.fn();
  const tiles = Array.from(document.getElementsByClassName('tile-container'));
  display.tileClickListener(toBeCalledFunction);

  for(let i = 0; i <= 8; i += 1) {
    tiles[i].click();
  }
  expect(toBeCalledFunction.mock.calls.length).toBe(9);
});

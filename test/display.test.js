import Display from '../src/js/display';

test('Hides and shows side-card', () => {
  const display = new Display();
  document.body.innerHTML =
    '<div class="side-card slide-in" id="side-card">' +
    '</div>';

  display.hideSideCard();
  expect(Array.from(document.getElementById('side-card').classList))
    .toEqual(expect.arrayContaining(['slide-in']));

  display.displaySideCard();
  expect(Array.from(document.getElementById('side-card').classList))
    .toEqual(expect.arrayContaining(['slide-out']));

  display.hideSideCard();
  expect(Array.from(document.getElementById('side-card').classList))
    .toEqual(expect.arrayContaining(['slide-in']));
});


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
  const handleFormSubmit = jest.fn(info => info);

  document.body.innerHTML = `
    <div class="side-card slide-in" id="side-card">
    </div>`;

  display.displayForm(handleFormSubmit);
  const playerContainers = Array.from(document.getElementsByClassName('player-container'));
  const submitButton = document.getElementById('side-card').lastChild;

  // Testing form display

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

  // Testing form submit

  playerContainerPosition = 1;
  playerContainers.forEach( playerContainer => {
    const nameInput = playerContainer.firstElementChild;
    const charInput = playerContainer.lastElementChild;

    nameInput.value = `player${playerContainerPosition}`;
    charInput.value = `${playerContainerPosition}`;
    playerContainerPosition += 1;
  });

  expect(handleFormSubmit.mock.calls.length).toBe(0);
  submitButton.click(); 
  expect(handleFormSubmit.mock.calls.length).toBe(1);
  expect(handleFormSubmit.mock.results[0].value)
    .toStrictEqual({
      p1: {
        name: 'player1',
        character: '1',
      },
      p2: {
        name: 'player2',
        character: '2',
      },
    });

  // Shouldn't submit form if characters equal

  playerContainerPosition = 1;
  playerContainers.forEach( playerContainer => {
    const nameInput = playerContainer.firstElementChild;
    const charInput = playerContainer.lastElementChild;

    nameInput.value = `player${playerContainerPosition}`;
    charInput.value = 'x';
    playerContainerPosition += 1;
  });
  submitButton.click(); 
  expect(handleFormSubmit.mock.calls.length).toBe(1);

  // Shouldn't submit form if characters longer than 1
  playerContainerPosition = 1;
  playerContainers.forEach( playerContainer => {
    const nameInput = playerContainer.firstElementChild;
    const charInput = playerContainer.lastElementChild;

    nameInput.value = `player${playerContainerPosition}`;
    charInput.value = `x${playerContainerPosition}`;
    playerContainerPosition += 1;
  });
  submitButton.click(); 
  expect(handleFormSubmit.mock.calls.length).toBe(1);

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

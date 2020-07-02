import Game from '../src/js/game';
import Display from '../src/js/display';
import Board from '../src/js/board';

jest.mock('../src/js/display');
jest.mock('../src/js/board');

beforeEach(() => {
  Display.mockClear();
  Board.mockClear();
});

it('Game constructor should instantiate classes and properties', () => {
  const game = new Game();

  expect(Display).toHaveBeenCalledTimes(1);
  expect(Board).toHaveBeenCalledTimes(1);
  expect(game.player1).toStrictEqual({});
  expect(game.player2).toStrictEqual({});
  expect(game.currentPlayer).toStrictEqual({});

  const mockDisplayInstance = Display.mock.instances[0];
  const displayFormMock = mockDisplayInstance.displayForm;

  expect(displayFormMock).toHaveBeenCalledTimes(1);
  const handlePlayerSubmit = displayFormMock.mock.calls[0][0];
  const playerData = {
    player1: {
      name: 'player1',
      character: '1',
    },
    player2: {
      name: 'player2',
      character: '2',
    },
  }

  const displaySideCardMock = mockDisplayInstance.displaySideCard;
  const tileClickListenerMock = mockDisplayInstance.tileClickListener;

  handlePlayerSubmit(playerData);

  expect(displaySideCardMock).toHaveBeenCalledTimes(1);
  expect(game.player1).toMatchObject({name: 'player1', character: '1'});
  expect(game.player2).toMatchObject({name: 'player2', character: '2'});
  expect(tileClickListenerMock).toHaveBeenCalledTimes(1);
});

test('Should setup nextPlayer', () => {
  const game = new Game();

  const player1 = { name: 'player1', character: '1'};
  const player2 = { name: 'player2', character: '2'};
  game.player1 = player1;
  game.player2 = player2;

  expect(game.currentPlayer).toMatchObject({});
  game.nextPlayer();
  expect(game.currentPlayer).toMatchObject(player1);
  game.nextPlayer();
  expect(game.currentPlayer).toMatchObject(player2);
});

test('Should setup turn', () => {
  const game = new Game();
  const player1 = { name: 'player1', character: '1'};
  const player2 = { name: 'player2', character: '2'};
  game.player1 = player1;
  game.player2 = player2;

  const nextPlayerSpy = jest.spyOn(game, 'nextPlayer'); 

  game.setupTurn();
  expect(nextPlayerSpy).toHaveBeenCalledTimes(1);

  const mockDisplayInstance = Display.mock.instances[0];
  const displaySideCard = mockDisplayInstance.displaySideCard;
  const displayMessage = mockDisplayInstance.displayMessage;

  expect(displaySideCard).toHaveBeenCalledTimes(1);
  expect(displayMessage).toHaveBeenCalledTimes(1);
  
  const playerName = game.currentPlayer.name;
  const playerChar = game.currentPlayer.character;

  const displayMessageArgument = displayMessage.mock.calls[0][0];
  const expectedMessageString = `${playerName}\'s turn (${playerChar})`;
  expect(displayMessageArgument).toBe(expectedMessageString);
});

test('Should execute normal turn', () => {
  const game = new Game();

  const tileIndex = 0;
  const [row, col] = [0, 0];
  const currentCharacter = 'C';

  game.currentPlayer = { character: currentCharacter };
  const executeTurnSpy = jest.spyOn(game, 'executeTurn');
  const setupTurnSpy = jest.spyOn(game, 'setupTurn');

  const mockDisplayInstance = Display.mock.instances[0];
  const mockBoardInstance = Board.mock.instances[0];

  const indexToCoordinatesMock = mockBoardInstance.indexToCoordinates;
  const isAvailableMock = mockBoardInstance.isAvailable; 
  const fillSpaceMock = mockBoardInstance.fillSpace;
  const fillTileMock = mockDisplayInstance.fillTile;
  const isWinMock = mockBoardInstance.isWin;
  const isTieMock = mockBoardInstance.isTie;

  indexToCoordinatesMock.mockReturnValueOnce([row, col]);
  isAvailableMock.mockReturnValueOnce(true);
  isWinMock.mockReturnValueOnce(false);
  isTieMock.mockReturnValueOnce(false);

  game.executeTurn(tileIndex);

  expect(indexToCoordinatesMock).toHaveBeenCalledTimes(1); 
  expect(isAvailableMock).toHaveBeenCalledTimes(1);
  expect(fillSpaceMock).toHaveBeenCalledTimes(1);
  expect(fillSpaceMock.mock.calls[0]).toEqual([row, col, currentCharacter]);
  expect(fillTileMock).toHaveBeenCalledTimes(1);
  expect(fillTileMock.mock.calls[0]).toEqual([tileIndex, currentCharacter]);
  expect(setupTurnSpy).toHaveBeenCalledTimes(1);
});

test('Should execute win turn', () => {
  const game = new Game();

  const tileIndex = 0;
  const [row, col] = [0, 0];
  const currentCharacter = 'C';
  const currentName = 'Winner';

  game.currentPlayer = { 
    name: currentName,
    character: currentCharacter,
  };

  const handleRematchSpy = jest.spyOn(game, 'handleRematch');

  const mockDisplayInstance = Display.mock.instances[0];
  const mockBoardInstance = Board.mock.instances[0];

  const isAvailableMock = mockBoardInstance.isAvailable; 
  const fillSpaceMock = mockBoardInstance.fillSpace;
  const isWinMock = mockBoardInstance.isWin;
  const clearBoardDataMock = mockBoardInstance.clearBoardData;
  const indexToCoordinatesMock = mockBoardInstance.indexToCoordinates;

  const fillTileMock = mockDisplayInstance.fillTile;
  const displayMessageMock = mockDisplayInstance.displayMessage;
  const displayWinMock = mockDisplayInstance.displayWin;

  indexToCoordinatesMock.mockReturnValueOnce([row, col]);
  isAvailableMock.mockReturnValueOnce(true);
  isWinMock.mockReturnValueOnce(true);

  game.executeTurn(tileIndex);

  expect(displayMessageMock).toHaveBeenCalledTimes(1);
  
  const winMessage = `${currentName} wins!`;
  expect(displayMessageMock.mock.calls[0][0]).toBe(winMessage);
  expect(displayWinMock).toHaveBeenCalledTimes(1);
  expect(clearBoardDataMock).toHaveBeenCalledTimes(1);
  expect(handleRematchSpy).toHaveBeenCalledTimes(1);
});

test('Should execute tie turn', () => {
  const game = new Game();

  const tileIndex = 0;
  const [row, col] = [0, 0];

  const handleRematchSpy = jest.spyOn(game, 'handleRematch');

  const mockDisplayInstance = Display.mock.instances[0];
  const mockBoardInstance = Board.mock.instances[0];

  const isAvailableMock = mockBoardInstance.isAvailable; 
  const fillSpaceMock = mockBoardInstance.fillSpace;
  const isWinMock = mockBoardInstance.isWin;
  const isTieMock = mockBoardInstance.isTie;
  const clearBoardDataMock = mockBoardInstance.clearBoardData;
  const indexToCoordinatesMock = mockBoardInstance.indexToCoordinates;

  const clearBoardMock = mockDisplayInstance.clearBoard;
  const fillTileMock = mockDisplayInstance.fillTile;
  const displayMessageMock = mockDisplayInstance.displayMessage;

  indexToCoordinatesMock.mockReturnValueOnce([row, col]);
  isAvailableMock.mockReturnValueOnce(true);
  isWinMock.mockReturnValueOnce(false);
  isTieMock.mockReturnValueOnce(true);

  game.executeTurn(tileIndex);

  expect(displayMessageMock).toHaveBeenCalledTimes(1);
  
  const tieMessage = "It's a tie!";
  expect(displayMessageMock.mock.calls[0][0]).toBe(tieMessage);
  expect(clearBoardDataMock).toHaveBeenCalledTimes(1);
  expect(clearBoardMock).toHaveBeenCalledTimes(1);
  expect(handleRematchSpy).toHaveBeenCalledTimes(1);
});

test('Shoud handleRematch', () => {
  const game = new Game(); 
  const handleRematchSpy = jest.spyOn(game, 'handleRematch');
  const setupTurnSpy = jest.spyOn(game, 'setupTurn');


  const mockDisplayInstance = Display.mock.instances[0];
  const displayReplayMock = mockDisplayInstance.displayReplay; 

  game.handleRematch();

  const tileClickListenerMock = mockDisplayInstance.tileClickListener; 
  const clearBoardMock = mockDisplayInstance.clearBoard;
  const displayFormMock = mockDisplayInstance.displayForm;

  const onRematch = displayReplayMock.mock.calls[0][0];
  const onRedo = displayReplayMock.mock.calls[0][1];


  clearBoardMock.mockClear();
  displayFormMock.mockClear();

  onRedo();

  expect(clearBoardMock).toHaveBeenCalledTimes(1);
  expect(displayFormMock).toHaveBeenCalledTimes(1);

  clearBoardMock.mockClear();
  tileClickListenerMock.mockClear();

  onRematch();
  
  expect(clearBoardMock).toHaveBeenCalledTimes(1);
  expect(setupTurnSpy).toHaveBeenCalledTimes(1);
  expect(tileClickListenerMock).toHaveBeenCalledTimes(1);
});

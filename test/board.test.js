import Board from '../src/js/board';

test('Board writes to tile', () => {
  const board = new Board();

  expect(board.fillSpace(0,0,'c')).toBe('c');
  expect(board.fillSpace(0,1,'o')).toBe('o');
  expect(board.fillSpace(0,2,'x')).toBe('x');

  expect(board.getBoardData()).toStrictEqual([['c','o','x'],[],[]]);

  expect(board.fillSpace(0,2,'x')).toBe(false);
  expect(board.fillSpace(1,0,'c')).toBe('c');

  expect(board.getBoardData()).toStrictEqual([['c','o','x'],['c'],[]]);
});

test('Returns gameboard data', () => {
  const board = new Board();

  board.fillSpace(0,0,'x');
  board.fillSpace(0,1,'o');
  board.fillSpace(0,2,'x');

  expect(board.getBoardData()).toStrictEqual([['x','o','x'],[],[]]);
});

test('Clears board', () => {
  const board = new Board();

  board.fillSpace(0,0,'x');
  board.fillSpace(0,1,'o');
  board.fillSpace(0,2,'x');

  expect(board.getBoardData()).toStrictEqual([['x','o','x'],[],[]]);

  board.clearBoardData();

  expect(board.getBoardData()).toStrictEqual([[],[],[]]);
});

test("Win won't trigger false possitives", () => {
  const board = new Board();

  expect(board.isWin()).toEqual(false);
  board.fillSpace(0,0,'x');
  board.fillSpace(0,1,'o');
  board.fillSpace(0,2,'x');
  board.fillSpace(1,0,'x');
  board.fillSpace(1,1,'o');
  board.fillSpace(1,2,'x');
  expect(board.isWin()).toEqual(false);

  board.fillSpace(2,0,'o');
  board.fillSpace(2,1,'x');
  board.fillSpace(2,2,'o');
  expect(board.isWin()).toEqual(false);
});

test("Win returns true with horizontals", () => {
  const board = new Board();

  board.fillSpace(0,0,'x');
  board.fillSpace(0,1,'x');
  board.fillSpace(0,2,'x');
  expect(board.isWin()).toEqual(true);
  board.clearBoardData();

  board.fillSpace(1,0,'x');
  board.fillSpace(1,1,'x');
  board.fillSpace(1,2,'x');
  expect(board.isWin()).toEqual(true);
  board.clearBoardData();

  board.fillSpace(2,0,'o');
  board.fillSpace(2,1,'o');
  board.fillSpace(2,2,'o');
  expect(board.isWin()).toEqual(true);
  board.clearBoardData();
});

test("Win returns true with verticals", () => {
  const board = new Board();

  board.fillSpace(0,0,'x');
  board.fillSpace(1,0,'x');
  board.fillSpace(2,0,'x');
  expect(board.isWin()).toEqual(true);
  board.clearBoardData();

  board.fillSpace(0,1,'x');
  board.fillSpace(1,1,'x');
  board.fillSpace(2,1,'x');
  expect(board.isWin()).toEqual(true);
  board.clearBoardData();

  board.fillSpace(0,2,'o');
  board.fillSpace(1,2,'o');
  board.fillSpace(2,2,'o');
  expect(board.isWin()).toEqual(true);
  board.clearBoardData();
});

test("Win returns true with diagonals", () => {
  const board = new Board();

  board.fillSpace(0,0,'x');
  board.fillSpace(1,1,'x');
  board.fillSpace(2,2,'x');
  expect(board.isWin()).toEqual(true);
  board.clearBoardData();

  board.fillSpace(2,2,'x');
  board.fillSpace(1,1,'x');
  board.fillSpace(0,0,'x');
  expect(board.isWin()).toEqual(true);
  board.clearBoardData();
});

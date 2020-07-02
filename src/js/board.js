class Board {
  constructor() {
    this.boardData = [[], [], []];
  }

  clearBoardData() {
    this.boardData = [[], [], []];
  }

  getBoardData() {
    return this.boardData;
  }

  static indexToCoordinates(index) {
    return [Math.floor(index / 3), index % 3];
  }

  getTileData(row, column) {
    return this.boardData[row][column];
  }

  isAvailable(row, column) {
    return this.boardData[row][column] === undefined;
  }

  fillSpace(row, column, character) {
    if (row > 2 || column > 2 || !this.isAvailable(row, column)) return false;

    this.boardData[row][column] = character;
    return character;
  }

  isTie() {
    const leanData = this.boardData.flat().filter(chr => chr !== undefined);

    return leanData.length === 9;
  }

  isWin() {
    let row;
    let col;
    let leftToRight;
    let rightToLeft;
    let horizontal;
    let vertical;

    const setDirectionVariable = (currentValue, row, column) => {
      const writtenChar = this.boardData[row][column];

      if (writtenChar === undefined) return false;

      if (currentValue === undefined) return writtenChar;

      if (currentValue && currentValue === writtenChar) return writtenChar;

      return false;
    };

    for (row = 0; row <= 2; row += 1) {
      leftToRight = setDirectionVariable(leftToRight, row, row);
      rightToLeft = setDirectionVariable(rightToLeft, row, 2 - row);

      for (col = 0; col <= 2; col += 1) {
        horizontal = setDirectionVariable(horizontal, row, col);
        vertical = setDirectionVariable(vertical, col, row);

        if (col === 2) {
          if (horizontal || vertical) return true;

          horizontal = undefined;
          vertical = undefined;
        }
      }

      if (row === 2 && (leftToRight || rightToLeft)) {
        return true;
      }
    }

    return false;
  }
}

export default Board;

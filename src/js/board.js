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

  isDraw() {
    const leanData = this.boardData.flat().filter( chr => chr !== undefined );

    return leanData.length === 9;
  }

  isWin() {
    let row;
    let col;
    let leftToRight;
    let rightToLeft;
    let horizontal;
    let vertical;

    const checkDirection = (currentValue, row, column) => {
      if (currentValue === undefined || this.boardData[row][column] === currentValue) {
        return true;
      }

      return false;
    };

    const setDirectionVariable = (currentValue, row, column) => {
      if ((currentValue === undefined || currentValue) && checkDirection(currentValue, row, column)) {
        return this.boardData[row][column];
      }

      return false;
    };

    for (row = 0; row <= 2; row += 1) {
      leftToRight = setDirectionVariable(leftToRight, row, row);
      rightToLeft = setDirectionVariable(rightToLeft, row, 2 - row);

      for (col = 0; col <= 2; col += 1) {
        horizontal = setDirectionVariable(horizontal, row, col);
        vertical = setDirectionVariable(vertical, col, row);
        if (col === 2) {
          if (horizontal || vertical) {
            return true;
          } else {
            horizontal = undefined;
            vertical = undefined;
          }
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

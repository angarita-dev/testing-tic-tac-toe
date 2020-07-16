import Board from './board';
import Display from './display';

class Game {
  nextPlayer() {
    this.currentPlayer = this.currentPlayer === this.player1
      ? this.player2
      : this.player1;
  }

  setupTurn() {
    this.nextPlayer();
    const playerName = this.currentPlayer.name;
    const playerChar = this.currentPlayer.character;

    Display.displaySideCard();

    Display.displayMessage(`${playerName}'s turn (${playerChar})`);
  }

  handleRematch() {
    const handlePlayerSubmit = (playerData) => {
      Display.hideSideCard();

      this.player1 = playerData.player1;
      this.player2 = playerData.player2;

      this.setupTurn();
      Display.tileClickListener(this.executeTurn.bind(this));
    };

    const onRedo = () => {
      Display.clearBoard();
      Display.displayForm(handlePlayerSubmit);
    };

    const onRematch = () => {
      Display.clearBoard();
      this.setupTurn();
      Display.tileClickListener(this.executeTurn.bind(this));
    };

    Display.displayReplay(onRematch.bind(this), onRedo);
  }

  executeTurn(tileIndex) {
    const [row, col] = Board.indexToCoordinates(tileIndex);

    if (!this.board.isAvailable(row, col)) return false;

    const playerChar = this.currentPlayer.character;

    this.board.fillSpace(row, col, playerChar);
    Display.fillTile(tileIndex, playerChar);

    if (this.board.isWin()) {
      const playerName = this.currentPlayer.name;
      Display.displayMessage(`${playerName} wins!`);
      Display.displayWin();
      this.board.clearBoardData();

      this.handleRematch();
    } else if (this.board.isTie()) {
      Display.displayMessage("It's a tie!");
      Display.clearBoard();
      this.board.clearBoardData();

      this.handleRematch();
    } else {
      this.setupTurn();
    }
    return true;
  }

  constructor() {
    this.board = new Board();

    this.currentPlayer = {};
    this.player1 = {};
    this.player2 = {};

    const handlePlayerSubmit = (playerData) => {
      Display.hideSideCard();

      this.player1 = playerData.player1;
      this.player2 = playerData.player2;

      this.setupTurn();
      Display.tileClickListener(this.executeTurn.bind(this));
    };

    Display.displayForm(handlePlayerSubmit);
  }
}

export default Game;

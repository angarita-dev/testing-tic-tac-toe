import Board from './board';
import Display from './display';

class Game {

  nextPlayer() {
    this.currentPlayer = this.currentPlayer === this.player1 ?
      this.player2 :
      this.player1;
  }

  setupTurn() {
    this.nextPlayer();
    const playerName = this.currentPlayer.name;
    const playerChar = this.currentPlayer.character;

    this.display.displaySideCard(); 

    this.display.displayMessage(`${playerName}\'s turn (${playerChar})`);
  }

  handleRematch() {
    const handlePlayerSubmit = (playerData) => {
      this.display.hideSideCard();

      this.player1 = playerData.player1;
      this.player2 = playerData.player2;

      this.setupTurn();
      this.display.tileClickListener( this.executeTurn.bind(this) );
    }

    const onRedo = () => {
      this.display.clearBoard();
      this.display.displayForm(handlePlayerSubmit);
    };

    const onRematch = () => {
      this.display.clearBoard();
      this.setupTurn();
      this.display.tileClickListener( this.executeTurn.bind(this) );
    };

    this.display.displayReplay(onRematch.bind(this), onRedo); 
  }

  executeTurn(tileIndex) {
    const [row, col] = this.board.indexToCoordinates(tileIndex)

    if(!this.board.isAvailable(row,col)) return false;

    const playerChar = this.currentPlayer.character;

    this.board.fillSpace(row, col, playerChar);
    this.display.fillTile(tileIndex, playerChar); 

    if(this.board.isWin()){
      const playerName = this.currentPlayer.name;
      this.display.displayMessage(`${playerName} wins!`);
      this.display.displayWin();
      this.board.clearBoardData();

      this.handleRematch();

    } else if(this.board.isTie()) {
      this.display.displayMessage("It's a tie!");
      this.display.clearBoard();
      this.board.clearBoardData();

      this.handleRematch();
    } else {
      this.setupTurn();
    }
  }

  constructor() {
    this.board = new Board();
    this.display = new Display();
    
    this.currentPlayer = {};
    this.player1 = {};
    this.player2 = {};

    const handlePlayerSubmit = (playerData) => {
      this.display.hideSideCard();

      this.player1 = playerData.player1;
      this.player2 = playerData.player2;

      this.setupTurn();
      this.display.tileClickListener( this.executeTurn.bind(this) );
    }

    this.display.displayForm(handlePlayerSubmit);
  }

}

export default Game;

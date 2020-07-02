/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/board.js":
/*!*************************!*\
  !*** ./src/js/board.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Board {\n  constructor() {\n    this.boardData = [[], [], []];\n  }\n\n  clearBoardData() {\n    this.boardData = [[], [], []];\n  }\n\n  getBoardData() {\n    return this.boardData;\n  }\n\n  static indexToCoordinates(index) {\n    return [Math.floor(index / 3), index % 3];\n  }\n\n  getTileData(row, column) {\n    return this.boardData[row][column];\n  }\n\n  isAvailable(row, column) {\n    return this.boardData[row][column] === undefined;\n  }\n\n  fillSpace(row, column, character) {\n    if (row > 2 || column > 2 || !this.isAvailable(row, column)) return false;\n\n    this.boardData[row][column] = character;\n    return character;\n  }\n\n  isTie() {\n    const leanData = this.boardData.flat().filter(chr => chr !== undefined);\n\n    return leanData.length === 9;\n  }\n\n  isWin() {\n    let row;\n    let col;\n    let leftToRight;\n    let rightToLeft;\n    let horizontal;\n    let vertical;\n\n    const setDirectionVariable = (currentValue, row, column) => {\n      const writtenChar = this.boardData[row][column];\n\n      if (writtenChar === undefined) return false;\n\n      if (currentValue === undefined) return writtenChar;\n\n      if (currentValue && currentValue === writtenChar) return writtenChar;\n\n      return false;\n    };\n\n    for (row = 0; row <= 2; row += 1) {\n      leftToRight = setDirectionVariable(leftToRight, row, row);\n      rightToLeft = setDirectionVariable(rightToLeft, row, 2 - row);\n\n      for (col = 0; col <= 2; col += 1) {\n        horizontal = setDirectionVariable(horizontal, row, col);\n        vertical = setDirectionVariable(vertical, col, row);\n\n        if (col === 2) {\n          if (horizontal || vertical) return true;\n\n          horizontal = undefined;\n          vertical = undefined;\n        }\n      }\n\n      if (row === 2 && (leftToRight || rightToLeft)) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n\n//# sourceURL=webpack:///./src/js/board.js?");

/***/ }),

/***/ "./src/js/display.js":
/*!***************************!*\
  !*** ./src/js/display.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Display {\n  static clearChildren(parentElement) {\n    while (parentElement.hasChildNodes()) {\n      parentElement.removeChild(parentElement.firstChild);\n    }\n  }\n\n  static clearBoard() {\n    const board = document.getElementById('board');\n\n    let boardHTML = '';\n    for (let i = 0; i < 9; i += 1) {\n      boardHTML += `\n        <div class=\"tile\"> \n        <h1 class=\"tile-container\"></h1> \n        </div>`;\n    }\n\n    board.innerHTML = boardHTML;\n  }\n\n  static displaySideCard() {\n    const sideCard = document.getElementById('side-card');\n\n    sideCard.classList.remove('slide-out');\n    sideCard.classList.add('slide-in');\n  }\n\n  static displayWin() {\n    const tileContainers = Array.from(document.getElementsByClassName('tile-container'));\n\n    tileContainers.forEach(tileContainer => {\n      tileContainer.textContent = String.fromCodePoint(0x0001F389);\n    });\n  }\n\n  static displayReplay(rematchHandler, restartHandler) {\n    const sideCard = document.getElementById('side-card');\n\n    const buttonContainer = document.createElement('div');\n    buttonContainer.classList.add('replay-container');\n\n    const rematch = document.createElement('span');\n    rematch.textContent = 'Rematch';\n\n    const restart = document.createElement('span');\n    restart.textContent = 'New game';\n\n    sideCard.appendChild(buttonContainer);\n\n    buttonContainer.appendChild(rematch);\n    buttonContainer.appendChild(restart);\n\n    rematch.classList.add('rematch-button');\n    rematch.onclick = () => { rematchHandler(); };\n\n    restart.classList.add('restart-button');\n    restart.onclick = () => { restartHandler(); };\n  }\n\n  static hideSideCard() {\n    const sideCard = document.getElementById('side-card');\n\n    sideCard.classList.remove('slide-in');\n    sideCard.classList.add('slide-out');\n  }\n\n  static tileClickListener(handleFunction) {\n    const tileContainers = Array.from(document.getElementsByClassName('tile-container'));\n\n    tileContainers.forEach(tileContainer => {\n      tileContainer.onclick = () => {\n        const itemIndex = tileContainers.indexOf(tileContainer);\n        handleFunction(itemIndex);\n      };\n    });\n  }\n\n  static fillTile(tileIndex, character) {\n    const board = document.getElementById('board');\n    const tile = board.children[tileIndex];\n\n    tile.firstElementChild.textContent = character;\n  }\n\n  static displayMessage(message) {\n    const sideCardContainer = document.getElementById('side-card');\n    const messageComponent = document.createElement('h3');\n\n    messageComponent.textContent = message;\n    this.clearChildren(sideCardContainer);\n    sideCardContainer.appendChild(messageComponent);\n  }\n\n  static displayForm(submitHandleFunction) {\n    const sideCardContainer = document.getElementById('side-card');\n\n    this.clearChildren(sideCardContainer);\n    for (let i = 1; i <= 2; i += 1) {\n      const playerContainer = document.createElement('div');\n      playerContainer.className = 'player-container';\n\n      const nameInput = document.createElement('input');\n      nameInput.className = 'name-input';\n      nameInput.id = `p${i}-name`;\n      nameInput.value = `Player ${i}`;\n\n      const charInput = document.createElement('input');\n      charInput.className = 'char-input';\n      charInput.id = `p${i}-char`;\n      charInput.value = i === 1 ? 'X' : 'O';\n\n      playerContainer.appendChild(nameInput);\n      playerContainer.appendChild(charInput);\n      sideCardContainer.appendChild(playerContainer);\n    }\n\n    const submitButton = document.createElement('span');\n    submitButton.id = 'submit-players';\n    submitButton.className = 'submit-players';\n    submitButton.textContent = 'Submit';\n\n    submitButton.onclick = () => {\n      const char1 = document.getElementById('p1-char').value;\n      const char2 = document.getElementById('p2-char').value;\n\n      if (char1 === char2 || char1.length > 1 || char2.length > 1) return;\n\n      submitHandleFunction({\n        player1: {\n          name: document.getElementById('p1-name').value,\n          character: char1,\n        },\n        player2: {\n          name: document.getElementById('p2-name').value,\n          character: char2,\n        },\n      });\n    };\n\n    sideCardContainer.appendChild(submitButton);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Display);\n\n\n//# sourceURL=webpack:///./src/js/display.js?");

/***/ }),

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/js/board.js\");\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ \"./src/js/display.js\");\n\n\n\nclass Game {\n  nextPlayer() {\n    this.currentPlayer = this.currentPlayer === this.player1\n      ? this.player2\n      : this.player1;\n  }\n\n  setupTurn() {\n    this.nextPlayer();\n    const playerName = this.currentPlayer.name;\n    const playerChar = this.currentPlayer.character;\n\n    _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displaySideCard();\n\n    _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayMessage(`${playerName}'s turn (${playerChar})`);\n  }\n\n  handleRematch() {\n    const handlePlayerSubmit = (playerData) => {\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hideSideCard();\n\n      this.player1 = playerData.player1;\n      this.player2 = playerData.player2;\n\n      this.setupTurn();\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].tileClickListener(this.executeTurn.bind(this));\n    };\n\n    const onRedo = () => {\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].clearBoard();\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayForm(handlePlayerSubmit);\n    };\n\n    const onRematch = () => {\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].clearBoard();\n      this.setupTurn();\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].tileClickListener(this.executeTurn.bind(this));\n    };\n\n    _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayReplay(onRematch.bind(this), onRedo);\n  }\n\n  executeTurn(tileIndex) {\n    const [row, col] = _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"].indexToCoordinates(tileIndex);\n\n    if (!this.board.isAvailable(row, col)) return false;\n\n    const playerChar = this.currentPlayer.character;\n\n    this.board.fillSpace(row, col, playerChar);\n    _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fillTile(tileIndex, playerChar);\n\n    if (this.board.isWin()) {\n      const playerName = this.currentPlayer.name;\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayMessage(`${playerName} wins!`);\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayWin();\n      this.board.clearBoardData();\n\n      this.handleRematch();\n    } else if (this.board.isTie()) {\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayMessage(\"It's a tie!\");\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].clearBoard();\n      this.board.clearBoardData();\n\n      this.handleRematch();\n    } else {\n      this.setupTurn();\n    }\n    return true;\n  }\n\n  constructor() {\n    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n    this.currentPlayer = {};\n    this.player1 = {};\n    this.player2 = {};\n\n    const handlePlayerSubmit = (playerData) => {\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hideSideCard();\n\n      this.player1 = playerData.player1;\n      this.player2 = playerData.player2;\n\n      this.setupTurn();\n      _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].tileClickListener(this.executeTurn.bind(this));\n    };\n\n    _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayForm(handlePlayerSubmit);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/js/game.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/js/game.js\");\n\n\nnew _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });
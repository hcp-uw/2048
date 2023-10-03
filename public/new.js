"use strict";

(function() {

  // MODULE GLOBAL VARIABLES, CONSTANTS, AND HELPER FUNCTIONS CAN BE PLACED HERE
  let player1;
  let squares = [];
  let prevTurn = [];
  let size;
  let width;
  let height;

  /**
   * Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   * CHANGE: Describe what your init function does here.
   */
  function init() {
    gridSizeButtons();
  }

  function gridSizeButtons() {
    height = 4;
    width = 4;
    id("h-up").addEventListener("click", incH);
    id("h-down").addEventListener("click", decH);
    id("w-up").addEventListener("click", incW);
    id("w-down").addEventListener("click", decW);
    qs("#menu form button").addEventListener("click", beginGame);
  }

  function incH() {
    if (!this.classList.contains("arrow-disabled")) {
      id("h-down").classList.remove("arrow-disabled");
      id("height").innerHTML = parseInt(id("height").innerHTML) + 1;
      height++;
      if (id("height").innerHTML === "6") {
        this.classList.add("arrow-disabled");
      }
    }
  }

  function decH() {
    if (!this.classList.contains("arrow-disabled")) {
      id("h-up").classList.remove("arrow-disabled");
      id("height").innerHTML = parseInt(id("height").innerHTML) - 1;
      height--;
      if (id("height").innerHTML === "4") {
        this.classList.add("arrow-disabled");
      }
    }
  }

  function incW() {
    if (!this.classList.contains("arrow-disabled")) {
      id("w-down").classList.remove("arrow-disabled");
      id("width").innerHTML = parseInt(id("width").innerHTML) + 1;
      width++;
      if (id("width").innerHTML === "6") {
        this.classList.add("arrow-disabled");
      }
    }
  }

  function decW() {
    if (!this.classList.contains("arrow-disabled")) {
      id("w-up").classList.remove("arrow-disabled");
      id("width").innerHTML = parseInt(id("width").innerHTML) - 1;
      width--;
      if (id("width").innerHTML === "4") {
        this.classList.add("arrow-disabled");
      }
    }
  }

  function beginGame(event) {
    document.addEventListener("keyup", control);
    event.preventDefault();
    createBoard(height, width);
    id("game").classList.remove("hidden");
    id("menu").classList.add("hidden");
    player1 = true;
    changePlayer();
  }

  function createBoard(height, width) {
    squares = [];
    qs(".grid").innerHTML = "";
    size = height * width;
    console.log("size" + size);
    qs(".grid").style.height = height * 100 + "px";
    qs(".grid").style.width= width * 100 + "px";
    for (let i = 0; i < size; i++) {
      let square = gen("div");
      square.classList.add("block");
      qs(".grid").appendChild(square);
      squares.push(square);
      console.log("create " + squares.length);
    }
    generateRandomNum();
    generateRandomNum();
    for (let i = 0; i < size; i++) {
      let prevSquare = gen("div");
      prevTurn.push(prevSquare);
      prevTurn[i].innerHTML = squares[i].innerHTML;
    }
    displayBoard();
  }

  function control(event) {
    // need to change if board changed, if so, play = true and then add new block
    let play = false;
    if (event.keyCode === 39) { // right
      moveRight();
      combineRow();
      moveRight();
      // generateRandomNum();
      // play = true;
    } else if (event.keyCode === 37) { // left
      moveLeft();
      combineRow();
      moveLeft();
      // generateRandomNum();
      // play = true;
    } else if (event.keyCode === 38) { // up
      moveUp();
      combineCol();
      moveUp();
      // generateRandomNum();
      // play = true;
    } else if (event.keyCode === 40) { // down
      moveDown();
      combineCol();
      moveDown();
      // generateRandomNum();
      // play = true;
    }
    for (let i = 0; i < size; i++) {

      if (squares[i].innerHTML !== prevTurn[i].innerHTML) {
        console.log("square " + squares[i].innerHTML);
        console.log("prev " + prevTurn[i].innerHTML);
        play = true;
      }
    }
    console.log(play);
    if (play) {
      generateRandomNum();
      let zeroes = 0;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == "") {
          zeroes++;
        }
        prevTurn[i].innerHTML = squares[i].innerHTML;
      }
      if (zeroes === 0) {
        endGame(false);
      }
      displayBoard();
      changePlayer();
    }
  }

  function generateRandomNum() {
    let randNum = Math.random() * 10;
    let squareNum = Math.floor(Math.random() * squares.length);
    if (squares[squareNum].innerHTML == "") {
      if (randNum > 1) {
        squares[squareNum].innerHTML = 2;
      } else {
        squares[squareNum].innerHTML = 4;
      }
    } else {
      generateRandomNum();
    }
  }

  function combineRow() {
    for (let i = 0; i < squares.length - 1; i++){
      if (squares[i].innerHTML != "" & squares[i].innerHTML === squares[i + 1].innerHTML) {
        let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = total;
        squares[i + 1].innerHTML = 0;
        if (total == 2048) {
          endGame(true);
        }
      }
    }
  }

  function combineCol() {
    for (let i = 0; i < width * (height - 1); i++){
      if (squares[i].innerHTML != "" & squares[i].innerHTML === squares[i + width].innerHTML) {
        let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = total;
        squares[i + width].innerHTML = 0;
        if (total == 2048) {
          endGame(true);
        }
      }
    }
  }

  function moveRight() {
    for (let i = 0; i < squares.length; i++) {
      if (i % width === 0) {
        let row = [];
        for (let j = 0; j < width; j++) {
          row.push(parseInt(squares[i + j].innerHTML));
        }
        let filteredRow = row.filter(num => num);
        let missing = width - filteredRow.length;
        let zeroes = Array(missing).fill("");
        let newRow = zeroes.concat(filteredRow);
        console.log(newRow);
        for (let j = 0; j < width; j++) {
          squares[i + j].innerHTML = newRow[j];
        }
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < squares.length; i++) {
      if (i % width === 0) {
        let row = [];
        for (let j = 0; j < width; j++) {
          row.push(parseInt(squares[i + j].innerHTML));
        }
        let filteredRow = row.filter(num => num);
        let missing = width - filteredRow.length;
        let zeroes = Array(missing).fill("");
        let newRow = filteredRow.concat(zeroes);
        for (let j = 0; j < width; j++) {
          squares[i + j].innerHTML = newRow[j];
        }
      }
    }
  }

  function moveDown() {
    for (let i = 0; i < width; i++) {
      let column = [];
      for (let j = 0; j < height; j++) {
        column.push(parseInt(squares[i + (width * j)].innerHTML));
      }
      let filteredCol = column.filter(num => num);
      let missing = height - filteredCol.length;
      let zeroes = Array(missing).fill("");
      let newCol = zeroes.concat(filteredCol);
      for (let j = 0; j < height; j++) {
        squares[i + (width * j)].innerHTML = newCol[j];
      }
    }
  }

  function moveUp() {
    for (let i = 0; i < width; i++) {
      let column = [];
      for (let j = 0; j < height; j++) {
        column.push(parseInt(squares[i + (width * j)].innerHTML));
      }
      let filteredCol = column.filter(num => num);
      let missing = height - filteredCol.length;
      let zeroes = Array(missing).fill("");
      let newCol = filteredCol.concat(zeroes);
      for (let j = 0; j < height; j++) {
        squares[i + (width * j)].innerHTML = newCol[j];
      }
    }
  }

  function changePlayer() {
    let player;
    if (player1) {
      player = 1;
      qs("body").classList.remove("p2-background");
      qs("body").classList.add("p1-background");
      player1 = false;
    } else {
      player = 2;
      qs("body").classList.remove("p1-background");
      qs("body").classList.add("p2-background");
      player1 = true;
    }
    qs("body > h2").textContent = "Player " + player + "'s Turn";
  }

  function endGame(win) {
    document.removeEventListener("keyup", control);
    let winner;
    if (win) {
      if (player1) {
        winner = "1";
      } else {
        winner = "2";
      }
    } else {
      if (player1) {
        winner = "2";
      } else {
        winner = "1";
      }
    }
    console.log(winner)
    id("result").classList.remove("hidden");
  }

  function displayBoard() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].className = "";
      squares[i].classList.add("block");
      if (squares[i].innerHTML != "") {
        squares[i].classList.add("block-" + squares[i].innerHTML);
      }
    }
  }

  /** ------------------------------ Helper Functions  ------------------------------ */
  /**
   * Note: You may use these in your code, but remember that your code should not have
   * unused functions. Remove this comment in your own code.
   */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Checks status from API response and throws error if needed   *
   * @param {Response} res - response from API
   * @returns {Response} response from API
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }
})();
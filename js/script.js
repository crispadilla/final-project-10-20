/*****************************************************************
 ***************    Global Variables/Constants    ****************
 *****************************************************************/
// Array used to hold tile divs.
var tileArray;

// Array used to hold the coordinates of the tile divs.
var elementCoordinatesArray;

// Variable used to hold the number of div tiles.
var numTiles;

// Variable used to hold the width of the container div.
var containerWidth;
// Variable used to hold the height of the container div.
var containerHeight;

// Variable used to calculate number of columns.
var numColumns;

// Variable used to determine the lateral (horizontal) tile shift.
var tileHorizontalShiftAmt; // Units are in pixels

// Varuable used to determine the vertical tile shift.
var tileVerticalShiftAmt; // Units are in pixels

// Variable used to hold the tile width.
const tileWidth = 140; //Units are in pixels

/********************************************************************
 **********************    Start the Game    ************************
 ********************************************************************/
/* The setupGame function is used to control the various stages of
 * setting up the game. First, it calls a function to set up the
 * coordinates for each div tile. Then it calls another function to
 * position the tile according to the assigned coordinates. It then
 * calls another function to set the appropriate attributes to each
 * tile. Finally, a number is assigned to the tiles - except for the
 * empty tile.
 */
function setupGame() {
  // Map the arrow keys to the moveTilesUsingArrowKeys functions
  document.onkeydown = moveTilesUsingArrowKeys;

  // Set up the tiles
  createTiles();
  setupCoordinates();
  positionTiles();
  setTileAttributes();
  assignTileNumbersRandomly();

  // The function below (testWinMessage()) is used to test the game
  // win condition by setting up a game state almost
  // complete.
  // testWinMessage();
}

/* The createTiles function creates the required tile divs and adds
 * them to the gridTile div container.
 */
function createTiles() {
  var tileGrid = document.body.getElementsByClassName("tileGrid")[0];
  var newTile;
  tileArray = Array(numTiles);
  for (var index = 0; index < numTiles; index++) {
    newTile = document.createElement("div");
    tileArray[index] = newTile;
    tileGrid.appendChild(newTile);
  }
}

/* The setupCoordinates function populates the elementCoordinateArray
 * so that the tile divs can be properly positions. The function uses
 * a for loop and both the tileHorizontalShiftAmt and tileVerticalShiftAmt
 * variables to calculate the correct xy-coordinate pairs for each tile.
 */
function setupCoordinates() {
  elementCoordinatesArray = Array(numTiles);
  x_coordinate = 0;
  y_coordinate = 0;

  for (var i = 0; i < numTiles; i++) {
    if (i != 0 && i % numColumns == 0) {
      y_coordinate += tileVerticalShiftAmt;
      x_coordinate = 0;
    }
    elementCoordinatesArray[i] = [x_coordinate, y_coordinate];
    x_coordinate += tileHorizontalShiftAmt;
  }
}

/* The assignTileNumbersRandomly function randomly assigns a value, numeric or class,
 * to all tiles. The numbers assign are between 1 and (numTiles - 1).
 * Also, one tile, the one with the index of 0, will be assigned assigned
 * as the empty tile.
 */
function assignTileNumbersRandomly() {
  var arrayValues = Array(numTiles);
  arrayValues.fill(true, 0);

  var index = 0;
  var randNum;
  while (index < numTiles) {
    randNum = Math.floor(Math.random() * numTiles);
    if (arrayValues[randNum]) {
      randNum == 0
        ? setupEmptyTile(tileArray[index])
        : (tileArray[index].innerText = randNum);
      arrayValues[randNum] = false;
      index += 1;
    }
  }
}

/* The positionTiles function uses the coordinates stored in the
 * elementCoordinatesArray array to position each tile according
 * to its xy-coordinate values.
 */
function positionTiles() {
  var x_coordinate;
  var y_coordinate;
  for (var i = 0; i < numTiles; i++) {
    x_coordinate = elementCoordinatesArray[i][0];
    y_coordinate = elementCoordinatesArray[i][1];

    tileArray[i].style.left = `${x_coordinate}` + "px";
    tileArray[i].style.top = `${y_coordinate}` + "px";
  }
}

/* The setTileAttributes assigns the necessary attributes
 * to each tile in the tileArray. So far I've only use
 * it to set the onclick attributes.
 */
function setTileAttributes() {
  tileArray.forEach((element) =>
    element.setAttribute("onclick", "moveTile(this)")
  );
  tileArray.forEach((element) => element.classList.add("tile"));
}

/* The setupEmptyTile function is used to set any extra
 * propetries/attributes required for the empty tile.
 */
function setupEmptyTile(tile) {
  tile.classList.add("empty");
}

/* The moveTile function is used to move the tiles around
 * the board as the rules allow.
 */
function moveTile(tile) {
  if (moveRightAllowed(tile)) {
    moveRight(tile);
  } else if (moveDownAllowed(tile)) {
    moveDown(tile);
  } else if (moveLeftAllowed(tile)) {
    moveLeft(tile);
  } else if (moveUpAllowed(tile)) {
    moveUp(tile);
  }

  // Check if player has won.
  if (winStatus()) {
    displayWinMessage();
  }
}

/* The moveRightAllowed function checks if it's ok for a tile
 * to move to the right. If so, it returns true. It returns false
 * otherwise. The funciton utilized the calling tile's position in
 * the tileArray and if the tile is adjacent to the empty tile in
 * order to determine if it's ok for the tile to move right.
 */
function moveRightAllowed(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var indexOfTileToTheRight = tileIndex + 1;
  if (
    tileIndex != numColumns - 1 &&
    tileIndex != numColumns * 2 - 1 &&
    tileIndex != numColumns * 3 - 1 &&
    tileIndex != numColumns * 4 - 1 &&
    tileIndex != numColumns * 5 - 1 &&
    tileArray[indexOfTileToTheRight].classList.contains("empty")
  ) {
    return true;
  }
  return false;
}

/* The moveRight function moves(shifts) the tile to the right
 * by swaping the xy-coordinates of the calling tile and the
 * tile to the right (one index higher). it uses an animation
 * effect to make the switch more interesting. Finally, the
 * tile and the tile to the right are swaped positions within
 * the array.
 */
function moveRight(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var emptyTileIndex = tileIndex + 1;
  var emptyTile = tileArray[emptyTileIndex];

  x_coordinate_tile = elementCoordinatesArray[tileIndex][0];
  y_coordinate_tile = elementCoordinatesArray[tileIndex][1];

  x_coordinate_emptyTile = elementCoordinatesArray[emptyTileIndex][0];
  y_coordinate_emptyTile = elementCoordinatesArray[emptyTileIndex][1];

  // Change tile coordinates to emptyTile coordinates
  tileArray[tileIndex].style.left = `${x_coordinate_emptyTile}` + "px";
  tileArray[tileIndex].style.top = `${y_coordinate_emptyTile}` + "px";

  // Change emptyTile to tile coordinates
  tileArray[emptyTileIndex].style.left = `${x_coordinate_tile}` + "px";
  tileArray[emptyTileIndex].style.top = `${y_coordinate_tile}` + "px";

  // Animate the shift
  tileArray[tileIndex].style.transition = "left 1.0s ease-in-out";

  // Swap tile and emptyTile places within the tileArray
  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;
}

/* The moveDownAllowed function checks if it's ok for a tile
 * to move down. If so, it returns true. It returns false
 * otherwise. The funciton utilized the calling tile's position in
 * the tileArray and if the tile is adjacent to the empty tile in
 * order to determine if it's ok for the tile to move down.
 */
function moveDownAllowed(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var indexOfTileUnderneath = tileIndex + numColumns;
  if (
    tileIndex < numColumns * (numColumns - 1) &&
    tileArray[indexOfTileUnderneath].classList.contains("empty")
  ) {
    return true;
  }
  return false;
}

/* The moveDown function moves(shifts) the tile down
 * by swaping the xy-coordinates of the calling tile and the
 * tile below (three indices higher). it uses an animation
 * effect to make the switch more interesting. Finally, the
 * tile and the tile below are swaped positions within
 * the array.
 */
function moveDown(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var emptyTileIndex = tileIndex + numColumns;
  var emptyTile = tileArray[emptyTileIndex];

  x_coordinate_tile = elementCoordinatesArray[tileIndex][0];
  y_coordinate_tile = elementCoordinatesArray[tileIndex][1];

  x_coordinate_emptyTile = elementCoordinatesArray[emptyTileIndex][0];
  y_coordinate_emptyTile = elementCoordinatesArray[emptyTileIndex][1];

  // Change tile coordinates to emptyTile coordinates
  tileArray[tileIndex].style.left = `${x_coordinate_emptyTile}` + "px";
  tileArray[tileIndex].style.top = `${y_coordinate_emptyTile}` + "px";

  // Change emptyTile coordinates to tile coordinates
  tileArray[emptyTileIndex].style.left = `${x_coordinate_tile}` + "px";
  tileArray[emptyTileIndex].style.top = `${y_coordinate_tile}` + "px";

  // Animate the shift
  tileArray[tileIndex].style.transition = "top 1.0s ease-in-out";

  // Swap tile and emptyTile places within the tileArray
  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;
}

/* The moveLeftAllowed function checks if it's ok for a tile
 * to move to the left. If so, it returns true. It returns false
 * otherwise. The funciton utilized the calling tile's position in
 * the tileArray and if the tile is adjacent to the empty tile in
 * order to determine if it's ok for the tile to move left.
 */
function moveLeftAllowed(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var indexOfTileToTheLeft = tileIndex - 1;
  if (
    tileIndex != numColumns * 0 &&
    tileIndex != numColumns * 1 &&
    tileIndex != numColumns * 2 &&
    tileIndex != numColumns * 3 &&
    tileIndex != numColumns * 4 &&
    tileArray[indexOfTileToTheLeft].classList.contains("empty")
  ) {
    return true;
  }
  return false;
}

/* The moveLeft function moves(shifts) the tile to the left
 * by swaping the xy-coordinates of the calling tile and the
 * tile to the left (one index lower). It uses an animation
 * effect to make the switch more interesting. Finally, the
 * tile and the tile to the left are swaped positions within
 * the array.
 */
function moveLeft(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var emptyTileIndex = tileIndex - 1;
  var emptyTile = tileArray[emptyTileIndex];

  x_coordinate_tile = elementCoordinatesArray[tileIndex][0];
  y_coordinate_tile = elementCoordinatesArray[tileIndex][1];

  x_coordinate_emptyTile = elementCoordinatesArray[emptyTileIndex][0];
  y_coordinate_emptyTile = elementCoordinatesArray[emptyTileIndex][1];

  // Change tile coordinates to emptyTile coordinates
  tileArray[tileIndex].style.left = `${x_coordinate_emptyTile}` + "px";
  tileArray[tileIndex].style.top = `${y_coordinate_emptyTile}` + "px";

  // Change emptyTile coordinates to tile coordinates
  tileArray[emptyTileIndex].style.left = `${x_coordinate_tile}` + "px";
  tileArray[emptyTileIndex].style.top = `${y_coordinate_tile}` + "px";

  // Animate the shift
  tileArray[tileIndex].style.transition = "left 1.0s ease-in-out";

  // Swap tile and emptyTile places within the tileArray
  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;
}

/* The moveUpAllowed checks if it's ok for a tile
 * to move up. If so, it returns true. It returns false
 * otherwise. The funciton utilized the calling tile's position in
 * the tileArray and if the tile is adjacent to the empty tile in
 * order to determine if it's ok for the tile to move up.
 */
function moveUpAllowed(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var indexOfTileAbove = tileIndex - numColumns;
  if (
    tileIndex > numColumns - 1 &&
    tileArray[indexOfTileAbove].classList.contains("empty")
  ) {
    return true;
  }
  return false;
}

/* The moveUp function moves(shifts) the tile up
 * by swaping the xy-coordinates of the calling tile and the
 * tile above (three indices lower). it uses an animation
 * effect to make the switch more interesting. Finally, the
 * tile and the tile above are swaped positions within
 * the array.
 */
function moveUp(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var emptyTileIndex = tileIndex - numColumns;
  var emptyTile = tileArray[emptyTileIndex];

  x_coordinate_tile = elementCoordinatesArray[tileIndex][0];
  y_coordinate_tile = elementCoordinatesArray[tileIndex][1];

  x_coordinate_emptyTile = elementCoordinatesArray[emptyTileIndex][0];
  y_coordinate_emptyTile = elementCoordinatesArray[emptyTileIndex][1];

  // Change tile coordinates to emptyTile coordinates
  tileArray[tileIndex].style.left = `${x_coordinate_emptyTile}` + "px";
  tileArray[tileIndex].style.top = `${y_coordinate_emptyTile}` + "px";

  // Change emptyTile coordinates to tile coordinates
  tileArray[emptyTileIndex].style.left = `${x_coordinate_tile}` + "px";
  tileArray[emptyTileIndex].style.top = `${y_coordinate_tile}` + "px";

  // Animate the shift
  tileArray[tileIndex].style.transition = "top 1.0s ease-in-out";

  // Swap tile and emptyTile places within the tileArray
  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;
}

/* The moveTilesUsingArrowKeys function moves the tiles using the arrow
 * keys instead of clicking the mouse. The function does this by
 * capturing the key being pressed and, using the index of the empty tile,
 * the function then performs a series of function calls to the move
 * functions to see if it's possible for a tile to move.
 */
function moveTilesUsingArrowKeys(e) {
  e = e || window.event;
  e.preventDefault();

  var emptyTile = document.getElementsByClassName("empty")[0];
  var emptyTileIndex = tileArray.indexOf(emptyTile);
  var tileToBeMoved;

  switch (e.key) {
    case "ArrowUp":
      if (emptyTileIndex < numColumns * (numColumns - 1)) {
        tileToBeMoved = tileArray[emptyTileIndex + numColumns];
        moveTile(tileToBeMoved);
      }
      break;
    case "ArrowDown":
      if (emptyTileIndex > numColumns - 1) {
        tileToBeMoved = tileArray[emptyTileIndex - numColumns];
        moveTile(tileToBeMoved);
      }
      break;
    case "ArrowLeft":
      if (emptyTileIndex >= 0) {
        tileToBeMoved = tileArray[emptyTileIndex + 1];
        moveTile(tileToBeMoved);
      }
      break;
    case "ArrowRight":
      if (emptyTileIndex < numTiles) {
        tileToBeMoved = tileArray[emptyTileIndex - 1];
        moveTile(tileToBeMoved);
      }
      break;
    case "Enter":
      resetGame();
      break;
  }
}

/* The winStatus function checks if the player has won the game.
 * It does so by checking if the tiles positioned in the tileArray
 * in accending order, with the empty tile position at the last
 * position in the tileArray. If the tiles are in the correct order,
 * then the function returns true. It returns false otherwise.
 */
function winStatus() {
  for (var i = 0; i < numTiles - 1; i++) {
    if (eval(tileArray[i].innerText + "- 1") != i) {
      return false;
    }
  }
  return true;
}

/* The displayWinMessage function simply displays the win message if
 * the player has won the game.
 */
function displayWinMessage() {
  document.body.getElementsByClassName("winMessage")[0].style.display =
    "initial";
}

/* The resetGame function resets the game by reloading the script page.
 */
function resetGame() {
  location.reload();
}

/* The testWinMessage function is a function used to test if the winning
 * condition works. The function basically sets up a state in which the
 * game can be won by simply moving just one tile.
 */
function testWinMessage() {
  // Numerate tiles up to numTiles - 2.
  for (var i = 1; i < numTiles - 1; i++) {
    tileArray[i - 1].innerText = i;
  }

  // Set the second to last tile as the empty tile.
  tileArray[numTiles - 2].classList.add("empty");

  // Set the last tile as the number 8 tile.
  tileArray[numTiles - 1].innerText = numTiles - 1;

  if (winStatus()) {
    displayWinMessage();
  }
}

/* The puzzleSize function takes number value which represents the
 * number of rows/columns for the board. It then sets the rest of the
 * variables to the appropriate values. Finally, it calls the setBoardSize
 * function and the setupGame function to get the game started.
 */
function puzzleSize(size) {
  tileArray = [];
  document.body.getElementsByClassName("tileGrid")[0].innerHTML = "";
  numTiles = size * size;
  numColumns = size;
  containerWidth = size * tileWidth;
  containerHeight = size * tileWidth;
  tileHorizontalShiftAmt = containerWidth / numColumns; // Units are in pixels
  tileVerticalShiftAmt = containerHeight / numColumns; // Units are in pixels

  setBoardSize(size);
  setupGame();
}

/* The setBoardSize function takes a number as an argument. The function uses
 * the size value to determine the width and height of the board, as well
 * as the board position.
 */
function setBoardSize(size) {
  var backgroundImg = document.body.getElementsByTagName("img")[0];
  var tileGrid = document.body.getElementsByClassName("tileGrid")[0];
  var controls = document.getElementsByClassName("controls")[0];

  switch (size) {
    case 3:
      backgroundImg.style.width = "450px";
      backgroundImg.style.height = "450px";
      tileGrid.style.width = "422px";
      controls.style.top = "64%";
      break;
    case 4:
      backgroundImg.style.width = "595px";
      backgroundImg.style.height = "590px";
      tileGrid.style.width = "563px";
      controls.style.top = "77%";
      break;
    case 5:
      backgroundImg.style.width = "735px";
      backgroundImg.style.height = "735px";
      tileGrid.style.width = "702px";
      controls.style.top = "91%";
      break;
  }
  fadeInBoard();
  fadeOutPuzzleSizeBtns();
}

function fadeInBoard() {
  document.getElementsByClassName("controls")[0].style.animation = "fadeIn 6s";
  document.getElementsByClassName("tileGrid")[0].style.animation = "fadeIn 6s";
  document.getElementsByTagName("img")[0].style.animation = "fadeIn 6s";

  document.getElementsByClassName("controls")[0].style.display = "initial";
  document.getElementsByClassName("tileGrid")[0].style.display = "initial";
  document.getElementsByTagName("img")[0].style.display = "initial";
}

function fadeOutPuzzleSizeBtns() {
  document.body.getElementsByClassName(
    "puzzleSizeBtnContainer"
  )[0].style.display = "none";
}

/*****************************************************************
 ***************    Global Variables/Constants    ****************
 *****************************************************************/
// Array used to hold tile divs.
var tileArray;

// Array used to hold the coordinates of the tile divs.
var elementCoordinatesArray;

// Variable used to hold the number of div tiles.
const numTiles = document.body.getElementsByClassName("tile").length;

// Variable used to hold the width of the container div.
const containerWidth = 320; // Units are in pixels

// Variable used to hold the height of the container div.
const containerHeight = 320; // Units are in pixels

// Variable used to hold the tile width.
const tileWidth = 100; //Units are in pixels

// Variable used to calculate number of columns.
const numColumns = Math.floor(containerWidth / tileWidth);

// Variable used to determine the lateral (horizontal) tile shift.
const tileHorizontalShiftAmt = containerWidth / numColumns; // Units are in pixels

// Varuable used to determine the vertical tile shift.
const tileVerticalShiftAmt = containerHeight / numColumns; // Units are in pixels

/********************************************************************
 **********************    Start the Game    ************************
 ********************************************************************/
setupGame();

/* The setupGame function is used to control the various stages of
 * setting up the game. First, it calls a function to set up the
 * coordinates for each div tile. Then it calls another function to
 * position the tile according to the assigned coordinates. It then
 * calls another function to set the appropriate attributes to each
 * tile. Finally, a number is assigned to the tiles - except for the
 * empty tile.
 */
function setupGame() {
  // Fill tileArray with all divs containing 'tile' class
  tileArray = Array.from(document.body.getElementsByClassName("tile"));

  // Map the arrow keys to the moveTilesUsingArrowKeys functions
  document.onkeydown = moveTilesUsingArrowKeys;

  // Set up the tiles
  setupCoordinates();
  positionTiles();
  setTileAttributes();
  assignTileNumbersRandomly();

  // The function below (testWinMessage()) is used to test the game
  // win condition by setting up a game state almost
  // complete.
  // testWinMessage();
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
 * to it's xy-coordinate values.
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
    tileIndex != 2 &&
    tileIndex != 5 &&
    tileIndex != 8 &&
    tileArray[indexOfTileToTheRight].classList.contains("empty")
  ) {
    console.log("Ok to move to the Right");
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
  var indexOfTileUnderneath = tileIndex + 3;
  if (
    tileIndex < 6 &&
    tileArray[indexOfTileUnderneath].classList.contains("empty")
  ) {
    console.log("Ok to move to Down");
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
  var emptyTileIndex = tileIndex + 3;
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
    tileIndex != 0 &&
    tileIndex != 3 &&
    tileIndex != 6 &&
    tileArray[indexOfTileToTheLeft].classList.contains("empty")
  ) {
    console.log("Ok to move to the Left");
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
  var indexOfTileAbove = tileIndex - 3;
  if (
    tileIndex > 2 &&
    tileArray[indexOfTileAbove].classList.contains("empty")
  ) {
    console.log("Ok to move to Up");
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
  var emptyTileIndex = tileIndex - 3;
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
      if (emptyTileIndex < 6) {
        tileToBeMoved = tileArray[emptyTileIndex + 3];
        moveTile(tileToBeMoved);
      }
      break;
    case "ArrowDown":
      if (emptyTileIndex > 2) {
        tileToBeMoved = tileArray[emptyTileIndex - 3];
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

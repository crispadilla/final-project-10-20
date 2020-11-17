var tileArray;
const numTiles = document.body.getElementsByClassName("tile").length;
const tileHorizontalShiftAmt = 105; // Unit in pixels
const tileVerticalShiftAmt = 107; // Unit in pixels

setupGame();

function setupGame() {
  tileArray = Array.from(document.body.getElementsByClassName("tile"));
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
  setTileAttributes();
}

function setTileAttributes() {
  tileArray.forEach((element) =>
    element.setAttribute("onclick", "moveTile(this)")
  );
}

function setupEmptyTile(tile) {
  tile.classList.add("empty");
}

function moveTile(tile) {
  console.log(tile.innerText);
  console.log(tileArray.indexOf(tile));

  if (moveRightAllowed(tile)) {
    moveRight(tile);
  } else if (moveDownAllowed(tile)) {
    moveDown(tile);
  } else if (moveLeftAllowed(tile)) {
    moveLeft(tile);
  } else if (moveUpAllowed(tile)) {
    moveUp(tile);
  }
}

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

function moveRight(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var emptyTileIndex = tileIndex + 1;
  var emptyTile = tileArray[emptyTileIndex];

  //  Move tile to the right.
  tile.style.transition = "transform 1.0s ease-in-out";
  tile.style.transform = "translateX(" + `${tileHorizontalShiftAmt}` + "px)";

  //  Move empty tile to the left.
  emptyTile.style.transition = "transform 1.0s ease-in-out";
  emptyTile.style.transform =
    "translateX(-" + `${tileHorizontalShiftAmt}` + "px)";

  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;
}

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

function moveDown(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var emptyTileIndex = tileIndex + 3;
  var emptyTile = tileArray[emptyTileIndex];

  //  Move tile Down.
  tile.style.transition = "transform 1.0s ease-in-out";
  tile.style.transform = "translateY(" + `${tileVerticalShiftAmt}` + "px)";

  //  Move empty tile up.
  emptyTile.style.transition = "transform 1.0s ease-in-out";
  emptyTile.style.transform =
    "translateY(-" + `${tileVerticalShiftAmt}` + "px)";

  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;
}

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

function moveLeft(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var emptyTileIndex = tileIndex - 1;
  var emptyTile = tileArray[emptyTileIndex];

  //  Move tile to the left.
  tile.style.transition = "transform 1.0s ease-in-out";
  tile.style.transform = "translateX(-" + `${tileHorizontalShiftAmt}` + "px)";

  //  Move empty tile to the left.
  emptyTile.style.transition = "transform 1.0s ease-in-out";
  emptyTile.style.transform =
    "translateX(" + `${tileHorizontalShiftAmt}` + "px)";

  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;
}

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

function moveUp(tile) {
  var tileIndex = tileArray.indexOf(tile);
  var emptyTileIndex = tileIndex - 3;
  var emptyTile = tileArray[emptyTileIndex];

  //  Move tile Up.
  tile.style.transition = "transform 1.0s ease-in-out";
  tile.style.transform = "translateY(-" + `${tileVerticalShiftAmt}` + "px)";

  //  Move empty tile down.
  emptyTile.style.transition = "transform 1.0s ease-in-out";
  emptyTile.style.transform = "translateY(" + `${tileVerticalShiftAmt}` + "px)";

  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;
}

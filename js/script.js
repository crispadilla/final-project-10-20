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
  if (moveRightAllowed(tile)) moveRight(tile);
  if (moveDownAllowed(tile)) moveDown(tile);
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

  console.log("Former empty position new element");
  console.log(tileArray[emptyTileIndex]);
  console.log("Former tile positoin new element");
  console.log(tileArray[tileIndex]);
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

  //  Move tile to Down.
  tile.style.transition = "transform 1.0s ease-in-out";
  tile.style.transform = "translateY(" + `${tileVerticalShiftAmt}` + "px)";

  //  Move empty tile to the left.
  emptyTile.style.transition = "transform 1.0s ease-in-out";
  emptyTile.style.transform =
    "translateY(-" + `${tileVerticalShiftAmt}` + "px)";

  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;

  console.log("Former empty position new element");
  console.log(tileArray[emptyTileIndex]);
  console.log("Former tile positoin new element");
  console.log(tileArray[tileIndex]);
}

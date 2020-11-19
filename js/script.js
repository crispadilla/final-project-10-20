var tileArray;
var elementCoordinatesArray;
const numTiles = document.body.getElementsByClassName("tile").length;
const containerWidth = 320; // Unit in pixels
const containerHeight = 320; // Unit in pixels
const tileHorizontalShiftAmt = containerWidth / 3; // Unit in pixels
const tileVerticalShiftAmt = containerHeight / 3; // Unit in pixels

setupGame();

function setupGame() {
  tileArray = Array.from(document.body.getElementsByClassName("tile"));

  setupCoordinates();
  positionTiles();
  setTileAttributes();
  assignTileNumbers();
  // testWinMessage();
}

function setupCoordinates() {
  elementCoordinatesArray = Array(numTiles);
  x_coordinate = 0;
  y_coordinate = 0;

  for (var i = 0; i < numTiles; i++) {
    if (i != 0 && i % 3 == 0) {
      y_coordinate += tileVerticalShiftAmt;
      x_coordinate = 0;
    }
    elementCoordinatesArray[i] = [x_coordinate, y_coordinate];
    x_coordinate += tileHorizontalShiftAmt;
  }
}

function assignTileNumbers() {
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

function setTileAttributes() {
  tileArray.forEach((element) =>
    element.setAttribute("onclick", "moveTile(this)")
  );
}

function setupEmptyTile(tile) {
  tile.classList.add("empty");
}

function moveTile(tile) {
  console.log("tile number: " + tile.innerText);
  console.log("tile index: " + tileArray.indexOf(tile));

  if (moveRightAllowed(tile)) {
    console.log("moveRight Called");
    moveRight(tile);
  } else if (moveDownAllowed(tile)) {
    console.log("moveDown Called");
    moveDown(tile);
  } else if (moveLeftAllowed(tile)) {
    console.log("moveLeft Called");
    moveLeft(tile);
  } else if (moveUpAllowed(tile)) {
    console.log("moveUp Called");
    moveUp(tile);
  }
  if (winStatus()) displayWinMessage();
  console.log(winStatus());
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

// function moveRight(tile) {
//   var tileIndex = tileArray.indexOf(tile);
//   var emptyTileIndex = tileIndex + 1;
//   var emptyTile = tileArray[emptyTileIndex];

//   //  Move tile to the right.
//   tile.style.transition = "transform 1.0s ease-in-out";
//   tile.style.transform = "translateX(" + `${tileHorizontalShiftAmt}` + "px)";

//   console.log("tile shift amount: " + tileHorizontalShiftAmt);
//   //  Move empty tile to the left.
//   emptyTile.style.transition = "transform 1.0s ease-in-out";
//   emptyTile.style.transform =
//     "translateX(-" + `${tileHorizontalShiftAmt}` + "px)";
//   console.log("emptyTile shift amount: " + "-" + `${tileHorizontalShiftAmt}`);

//   var temp = emptyTile;
//   tileArray[emptyTileIndex] = tile;
//   tileArray[tileIndex] = temp;

//   // Debugging
//   console.log("tile number: " + tile.innerText);
//   console.log("new index of tile: " + tileArray.indexOf(tile));
//   if (tileArray[tileIndex].classList.contains("empty")) {
//     console.log("new index of empty tile: " + tileIndex);
//     console.log(tileArray[tileIndex]);
//   }
// }

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
  tileArray[tileIndex].style.transition = "top 1.0s ease-in-out";

  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;
}

// function moveDown(tile) {
//   var tileIndex = tileArray.indexOf(tile);
//   var emptyTileIndex = tileIndex + 3;
//   var emptyTile = tileArray[emptyTileIndex];

//   //  Move tile Down.
//   tile.style.transition = "transform 1.0s ease-in-out";
//   tile.style.transform = "translateY(" + `${tileVerticalShiftAmt}` + "px)";

//   //  Move empty tile up.
//   emptyTile.style.transition = "transform 1.0s ease-in-out";
//   emptyTile.style.transform =
//     "translateY(-" + `${tileVerticalShiftAmt}` + "px)";

//   var temp = emptyTile;
//   tileArray[emptyTileIndex] = tile;
//   tileArray[tileIndex] = temp;

//   // Debugging
//   console.log("tile number: " + tile.innerText);
//   console.log("new index of tile: " + tileArray.indexOf(tile));
//   if (tileArray[tileIndex].classList.contains("empty")) {
//     console.log("new index of empty tile: " + tileIndex);
//     console.log(tileArray[tileIndex]);
//   }
// }

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

// function moveLeft(tile) {
//   var tileIndex = tileArray.indexOf(tile);
//   var emptyTileIndex = tileIndex - 1;
//   var emptyTile = tileArray[emptyTileIndex];

//   //  Move tile to the left.
//   tile.style.transition = "transform 1.0s ease-in-out";
//   tile.style.transform = "translateX(-" + `${tileHorizontalShiftAmt}` + "px)";
//   console.log("shift amount: " + tileHorizontalShiftAmt);

//   //  Move empty tile to the left.
//   emptyTile.style.transition = "transform 1.0s ease-in-out";
//   emptyTile.style.transform =
//     "translateX(" + `${tileHorizontalShiftAmt}` + "px)";
//   console.log("shift amount: " + tileHorizontalShiftAmt);

//   var temp = emptyTile;
//   tileArray[emptyTileIndex] = tile;
//   tileArray[tileIndex] = temp;

//   // Debugging
//   console.log("tile number: " + tile.innerText);
//   console.log("new index of tile: " + tileArray.indexOf(tile));
//   if (tileArray[tileIndex].classList.contains("empty")) {
//     console.log("new index of empty tile: " + tileIndex);
//     console.log(tileArray[tileIndex]);
//   }
// }

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
  tileArray[tileIndex].style.transition = "top 1.0s ease-in-out";

  var temp = emptyTile;
  tileArray[emptyTileIndex] = tile;
  tileArray[tileIndex] = temp;
}

// function moveUp(tile) {
//   var tileIndex = tileArray.indexOf(tile);
//   var emptyTileIndex = tileIndex - 3;
//   var emptyTile = tileArray[emptyTileIndex];

//   //  Move tile Up.
//   tile.style.transition = "transform 1.0s ease-in-out";
//   tile.style.transform = "translateY(-" + `${tileVerticalShiftAmt}` + "px)";

//   //  Move empty tile down.
//   emptyTile.style.transition = "transform 1.0s ease-in-out";
//   emptyTile.style.transform = "translateY(" + `${tileVerticalShiftAmt}` + "px)";

//   var temp = emptyTile;
//   tileArray[emptyTileIndex] = tile;
//   tileArray[tileIndex] = temp;

//   // Debugging
//   console.log("tile number: " + tile.innerText);
//   console.log("new index of tile: " + tileArray.indexOf(tile));
//   if (tileArray[tileIndex].classList.contains("empty")) {
//     console.log("new index of empty tile: " + tileIndex);
//     console.log(tileArray[tileIndex]);
//   }
// }

function winStatus() {
  for (var i = 0; i < numTiles - 1; i++) {
    if (eval(tileArray[i].innerText + "- 1") != i) {
      return false;
    }
  }
  return true;
}

function displayWinMessage() {
  document.body.getElementsByClassName("winMessage")[0].style.display =
    "initial";
}

function resetGame() {
  location.reload();
}

function testWinMessage() {
  for (var i = 1; i < numTiles - 1; i++) {
    tileArray[i - 1].innerText = i;
  }
  tileArray[numTiles - 2].classList.add("empty");
  tileArray[numTiles - 1].innerText = numTiles - 1;
  if (winStatus()) {
    displayWinMessage();
  }
}

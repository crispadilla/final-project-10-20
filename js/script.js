var tileArray;
const numTiles = document.body.getElementsByClassName("tile").length;

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
  setAttributes();
}

function setAttributes() {
  tileArray.forEach((element) =>
    element.setAttribute("onclick", "moveTile(this)")
  );
}

function setupEmptyTile(tile) {
  tile.classList.add("empty");
}

function moveTile(tile) {
  console.log(tile.innerText);
}

var tileArray;
const numTiles = 9;

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
      tileArray[index].innerText = randNum;
      arrayValues[randNum] = false;
      index += 1;
    }
  }
}

import Ship from "./classes/ship.js";
import Player from "./classes/player.js";
import GameBoard from "./classes/gameBoard.js";
import pubsub from "./pubsub.js";

export const playerGameBoard = new GameBoard("player");
const computerGameBoard = new GameBoard("computer");
const player = new Player("Player");
const computerPlayer = new Player("Computer");
const main = document.querySelector(".main");

const imagePath = "icons8-boom-96.png";

export function createGame() {
  // playerCreateShip(playerGameBoard);
  computerCreateShip(computerGameBoard);
}

export function finishGame() {
  const popup = document.querySelector(".popup");
  const text = document.querySelector(".text");
  if (computerGameBoard.areAllShipsSunk()) {
    popup.style.display = "flex";
    text.textContent = "You Won!";
  } else if (playerGameBoard.areAllShipsSunk()) {
    popup.style.display = "flex";
    text.textContent = "You Lose!";
  }
  const btn = document.querySelector(".btn");
  btn.addEventListener("click", function () {
    location.reload();
  });
  // console.log(computerGameBoard)
  // console.log(playerGameBoard)
}

export function playerCreateShip(playerGameBoard, length, row, col) {
  // console.log(`${playerGameBoard},${length},${row},${col}`);
  playerGameBoard.placeShip(new Ship(length), row, col);

}

function computerCreateShip(computerGameBoard) {
  computerGameBoard.placeRandomShip(new Ship(3));
  computerGameBoard.placeRandomShip(new Ship(4));
  computerGameBoard.placeRandomShip(new Ship(5));
  computerGameBoard.placeRandomShip(new Ship(3), true);
  computerGameBoard.placeRandomShip(new Ship(2), true);
  // console.log(computerGameBoard);
}

const boxPlayers = [];

export function createGridPlayer() {
  const main = document.querySelector("main");
  const AllGridPlayer = document.createElement("div");
  AllGridPlayer.classList.add("AllGridPlayer");
  const gridPlayer = document.createElement("div");
  const yourName = document.createElement("div");
  yourName.classList.add("yourName");
  yourName.textContent = "Player";

  AllGridPlayer.appendChild(yourName);
  AllGridPlayer.appendChild(gridPlayer);
  gridPlayer.classList.add("gridPlayer");
  main.appendChild(AllGridPlayer);

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const boxPlayer = document.createElement("div");
      boxPlayer.classList.add("boxOnGridToPlayer");
      boxPlayer.dataset.row = row;
      boxPlayer.dataset.column = col;
      boxPlayer.dataset.data = playerGameBoard.grid[row][col];

      boxPlayer.style["border-style"] = "solid";
      boxPlayer.style["border-width"] = "0.5px";

      gridPlayer.appendChild(boxPlayer);
      boxPlayers.push(boxPlayer);
    }
  }

  return boxPlayers;
}

export function colorCell(rowToColor, colToColor) {
  boxPlayers.forEach((boxPlayer) => {
    const row = parseInt(boxPlayer.dataset.row);
    const col = parseInt(boxPlayer.dataset.column);
    if (
      row === rowToColor &&
      col === colToColor &&
      playerGameBoard.grid[rowToColor][colToColor] === "x"
    ) {
      setInterval(() => {
        boxPlayer.style.backgroundImage = `url(${imagePath})`;
      }, 400);

      boxPlayer.style.backgroundSize = "cover";
    } else if (
      row === rowToColor &&
      col === colToColor &&
      playerGameBoard.grid[rowToColor][colToColor] === "o"
    ) {
      setInterval(() => {
        boxPlayer.style.backgroundColor = "#bde0fe";
      }, 400);
    }
  });
}

export function createGrid() {
  const AllGridPlayerComputer = document.createElement("div");
  AllGridPlayerComputer.classList.add("AllGridPlayerComputer");
  const gridComputer = document.createElement("div");
  const computerName = document.createElement("div");
  computerName.classList.add("computerName");
  computerName.textContent = "Computer";
  gridComputer.classList.add("gridComputer");

  AllGridPlayerComputer.appendChild(computerName);
  AllGridPlayerComputer.appendChild(gridComputer);

  main.appendChild(AllGridPlayerComputer);

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const boxComputer = document.createElement("button");
      boxComputer.classList.add("boxOnGridToComputer");
      boxComputer.dataset.row = row;
      boxComputer.dataset.column = col;

      boxComputer.style["border-style"] = "solid";
      boxComputer.style["border-width"] = "0.5px";
      boxComputer.style["border-color"] = "black";
      boxComputer.style.background = "none";
      boxComputer.style.cursor = "pointer";

      boxComputerClick(boxComputer);
      gridComputer.appendChild(boxComputer);
    }
  }
}

function boxComputerClick(boxComputer) {
  boxComputer.addEventListener("click", function (e) {
    if (boxComputer.style.background === "none") {
      handleClick(e, boxComputer);
      computerTurn();
      setTimeout(() => {
        finishGame();
      }, 500);
    }
  });
}

function handleClick(event, boxComputer) {
  const row = event.currentTarget.dataset.row;
  const column = event.currentTarget.dataset.column;

  if (computerGameBoard.grid[row][column] !== null) {
    boxComputer.style.backgroundImage = `url(${imagePath})`;
    boxComputer.style.backgroundSize = "cover";
    player.makeAttack(computerGameBoard, row, column);
    playerGameBoard.checkShipsStatus();
    computerGameBoard.checkShipsStatus();
  } else {
    boxComputer.style.background = "#bde0fe";
  }
  return {
    row,
    column,
  };
}

function computerTurn() {
  computerPlayer.makeRandomAttack(playerGameBoard);
}

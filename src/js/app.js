import { GridGame } from "./game";

window.addEventListener("DOMContentLoaded", () => {
  let gameWrapper = document.querySelector(".game__wrapper");
  window.game = new GridGame(gameWrapper);
  window.game.generateGrid();
  window.game.startGame();
});

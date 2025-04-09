import { GridGame } from "./game";

window.addEventListener("DOMContentLoaded", () => {
  let gameWrapper = document.querySelector(".game__wrapper");
  window.game = new GridGame(gameWrapper);
  window.game.generateGrid();
  window.game.startGame();

  document
    .querySelector(".message-modal__wrapper")
    .addEventListener("click", () => {
      document.querySelector(".message-modal__wrapper").style.display = "none";
      window.game.resetStats();
      window.game.startGame();
    });
});

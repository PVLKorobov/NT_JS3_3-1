import { GridGame } from "./game";

window.addEventListener("DOMContentLoaded", () => {
  let gameWrapper = document.querySelector(".game__wrapper");
  window.game = new GridGame(gameWrapper);
  window.game.generateGrid();
  window.game.startGame();

  document
    .querySelector(".message-modal__wrapper")
    .addEventListener("click", () => {
      const modalWrapper = document.querySelector(".message-modal__wrapper");
      const modalContents = modalWrapper.querySelector(
        ".message-modal__contents",
      );

      modalWrapper.style.display = "none";
      modalContents.innerHTML = "";
      modalContents.style.removeProperty("color");

      window.game.resetStats();
      window.game.startGame();
    });
});

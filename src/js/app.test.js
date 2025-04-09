/**
 * @jest-environment jsdom
 */

import { GridGame } from "./game";

beforeEach(() => {
  document.body.innerHTML = `
  <div class="contents__wrapper">
    <div class="game__wrapper">
      <div class="grid__wrapper"></div>
      <div class="counters__wrapper">
        <p>Successful clicks: <span class="successful-counter"></span></p>
        <p>Missed clicks: <span class="missed-counter"></span></p>
      </div>
    </div>
  </div>
  
  <div class="message-modal__wrapper">
    <div class="message-modal__contents">GAME OVER</div>
  </div>
  `;
  const gameWrapper = document.querySelector(".game__wrapper");
  window.game = new GridGame(gameWrapper);

  window.game.generateGrid();
});

describe("Тест перемещения img", () => {
  test.each([
    { x: 0, y: 1 },
    { x: 3, y: 0 },
    { x: 2, y: 2 },
    { x: 2, y: 1 },
  ])(`Moving to $x-$y`, ({ x, y }) => {
    window.game.currentPos = { x: x, y: y };
    window.game.moveImgToCurrentPos();
    const targetImage = window.game.gridWrapper.querySelector(
      `.grid__slot__${x}-${y} .target__img`,
    );
    expect(targetImage).not.toBeNull();
  });
});

describe("Тест выдачи случайных координат", () => {
  test("Current position is valid", () => {
    window.game.rollRandomPosition();
    expect(window.game.currentPos.x).not.toBeNull();
    expect(window.game.currentPos.y).not.toBeNull();
  });
});

describe("Тест запуска и остановки игры", () => {
  test("Game cycle started", () => {
    window.game.startGame();
    expect(window.game.gameCycleInterval).not.toBeNull();
  });

  test("Game cycle stopped", () => {
    window.game.stopGame();
    expect(window.game.gameCycleIntervalID).toBeNull();
  });
});

describe("Тест увеличения счетчиков", () => {
  test("Miss counter raised by one", () => {
    window.game.missedCount = 0;
    window.game.raiseMissedCounter();
    expect(window.game.missedCount).toBe(1);
  });

  test("Success counter raised by one", () => {
    window.game.successfulCount = 0;
    window.game.raiseSuccessfulCounter();
    expect(window.game.successfulCount).toBe(1);
  });

  test("Click function raises success counter", () => {
    window.game.successfulCount = 0;
    window.game.moveTarget();
    window.game.targetElement.click();
    window.game.stopGame();
    expect(window.game.successfulCount).toBe(1);
  });
});

describe("Тест экрана game over", () => {
  test("Modal is shown on game over", () => {
    const messageModalWrapper = document.querySelector(
      ".message-modal__wrapper",
    );
    window.game.missedCount = 4;
    window.game.raiseMissedCounter();
    expect(messageModalWrapper.style.display).toBe("flex");
  });

  test("Modal is hidden on wrapper click", () => {
    const messageModalWrapper = document.querySelector(
      ".message-modal__wrapper",
    );
    messageModalWrapper.click();
    expect(messageModalWrapper.style.display).toBe("");
  });
});

describe("Тест функции сброса игры", () => {
  test("Stats are reset", () => {
    window.game.raiseMissedCounter();
    window.game.raiseSuccessfulCounter();

    expect(window.game.missedCount).not.toBe(0);
    expect(window.game.successfulCount).not.toBe(0);

    window.game.resetStats();

    expect(window.game.missedCount).toBe(0);
    expect(window.game.successfulCount).toBe(0);
    expect(window.game.missedCounter.innerHTML).toBe("0");
    expect(window.game.successfulCounter.innerHTML).toBe("0");
  });
});

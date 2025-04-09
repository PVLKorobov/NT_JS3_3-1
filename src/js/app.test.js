/**
 * @jest-environment jsdom
 */

import { GridGame } from "./game";

beforeAll(() => {
  document.body.innerHTML = `
  <div class="contents__wrapper">
    <div class="game__wrapper">
      <div class="grid__wrapper"></div>
      <div class="counters__wrapper">
        <p class="successful-counter"></p>
        <p class="missed-counter"></p>
      </div>
    </div>
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
    expect(window.game.gameCycleInterval).toBeNull();
  });
});

describe;

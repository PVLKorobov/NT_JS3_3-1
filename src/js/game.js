class GridGame {
  constructor(gameWrapper) {
    this.targetElement = document.createElement("img");
    this.targetElement.setAttribute(
      "src",
      "https://github.com/netology-code/ahj-homeworks/raw/video/dom/pic/goblin.png",
    );
    this.targetElement.setAttribute("class", "target__img");
    this.targetElement.addEventListener("click", () => {
      this.successfulClick();
    });

    this.gridWrapper = gameWrapper.querySelector(".grid__wrapper");

    this.missedCount = 0;
    this.successfulCount = 0;
    this.successfulCounter = gameWrapper.querySelector(
      ".counters__wrapper .successful-counter",
    );
    this.missedCounter = gameWrapper.querySelector(
      ".counters__wrapper .missed-counter",
    );

    this.gameCycleInterval = null;
    this.currentPos = { x: null, y: null };
    this.gridSize = { x: 4, y: 4 };
  }

  generateGrid() {
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        const gridSlot = document.createElement("div");
        gridSlot.setAttribute("class", `grid__slot grid__slot__${x}-${y}`);
        document.querySelector(".grid__wrapper").appendChild(gridSlot);
      }
    }
    this.successfulCounter.innerHTML = this.successfulCount;
    this.missedCounter.innerHTML = this.missedCount;
  }

  rollRandomPosition() {
    let newPos = {
      x: Math.floor(Math.random() * 4),
      y: Math.floor(Math.random() * 4),
    };
    if (newPos.x == this.currentPos.x && newPos.y == this.currentPos.y) {
      this.rollRandomPosition();
    } else {
      this.currentPos = newPos;
    }
  }

  raiseSuccessfulCounter() {
    this.successfulCount += 1;
    this.successfulCounter.innerHTML = this.successfulCount;
  }

  raiseMissedCounter() {
    this.missedCount += 1;
    this.missedCounter.innerHTML = this.missedCount;
  }

  moveImgToCurrentPos() {
    const targetSlot = this.gridWrapper.querySelector(
      `.grid__slot__${this.currentPos.x}-${this.currentPos.y}`,
    );
    targetSlot.appendChild(this.targetElement);
  }

  successfulClick() {
    this.moveTarget();
    this.restartGameCycle();
    this.raiseSuccessfulCounter();
  }

  moveTarget() {
    this.rollRandomPosition();
    this.moveImgToCurrentPos();
  }

  startGame() {
    this.gameCycleInterval = setInterval(() => {
      this.moveTarget();
      this.raiseMissedCounter();
    }, 1000);
  }

  restartGameCycle() {
    this.stopGame();
    this.startGame();
  }

  stopGame() {
    clearInterval(this.gameCycleInterval);
    this.gameCycleInterval = null;
  }
}

export { GridGame };

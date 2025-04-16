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

    this.gameWrapper = gameWrapper;
    this.gridWrapper = gameWrapper.querySelector(".grid__wrapper");

    this.missedCount = 0;
    this.successfulCount = 0;
    this.successfulCounter = gameWrapper.querySelector(
      ".counters__wrapper .successful-counter",
    );
    this.missedCounter = gameWrapper.querySelector(
      ".counters__wrapper .missed-counter",
    );

    this.gameCycleIntervalID = null;
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
    if (this.successfulCount >= 10) {
      this.stopGame();
      this.showWinMessage();
    }
    this.successfulCounter.innerHTML = this.successfulCount;
  }

  raiseMissedCounter() {
    this.missedCount += 1;
    if (this.missedCount >= 5) {
      this.stopGame();
      this.showLoseMessage();
    }
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
    this.moveTarget();
    this.gameCycleIntervalID = window.setInterval(() => {
      this.moveTarget();
      this.raiseMissedCounter();
    }, 1000);
  }

  stopGame() {
    window.clearInterval(this.gameCycleIntervalID);
    this.gameCycleIntervalID = null;
  }

  restartGameCycle() {
    this.stopGame();
    this.startGame();
  }

  resetStats() {
    this.missedCount = 0;
    this.successfulCount = 0;
    this.missedCounter.innerHTML = 0;
    this.successfulCounter.innerHTML = 0;
  }

  showWinMessage() {
    const modalWrapper = document.querySelector(".message-modal__wrapper");
    const modalContents = modalWrapper.querySelector(
      ".message-modal__contents",
    );

    modalContents.style.color = "greenyellow";
    modalContents.innerHTML = "WIN";
    modalWrapper.style.display = "flex";
  }
  showLoseMessage() {
    const modalWrapper = document.querySelector(".message-modal__wrapper");
    const modalContents = modalWrapper.querySelector(
      ".message-modal__contents",
    );

    modalContents.style.color = "red";
    modalContents.innerHTML = "GAME OVER";
    modalWrapper.style.display = "flex";
  }
}

export { GridGame };

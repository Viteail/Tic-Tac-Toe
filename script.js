const gameboardDisplay = document.querySelector(".gameboard");
const gameWrapper = document.querySelector(".game");

const game = (() => {
  const storage = {
    gameboard: [],
    player1: ["ｏ"],
    player2: ["ｘ"],
    playerMove: [],
  };

  for (let i = 0; i < 9; i++) {
    const box = document.createElement("div");
    box.classList.add(`box`);
    storage.gameboard.push(box);
    gameboardDisplay.appendChild(box);
  }

  const selectPlayerMove = () => {
    const buttonX = document.createElement("button");
    buttonX.textContent = "ｘ";
    buttonX.classList.add("btnX");
    const buttonO = document.createElement("button");
    buttonO.textContent = "ｏ";
    buttonO.classList.add("btnO");

    buttonX.addEventListener("click", () => {
      storage.playerMove = [];
      storage.playerMove = storage.player2;
      buttonX.style.display = "none";
      buttonO.style.display = "none";
    });

    buttonO.addEventListener("click", () => {
      storage.playerMove = [];
      storage.playerMove = storage.player1;
      buttonX.style.display = "none";
      buttonO.style.display = "none";
    });

    gameWrapper.appendChild(buttonX);
    gameWrapper.appendChild(buttonO);
  };

  const switchPlayerMove = () => {
    if (storage.playerMove === storage.player2) {
      storage.playerMove = [];
      storage.playerMove = storage.player1;
    } else if (storage.playerMove === storage.player1) {
      storage.playerMove = [];
      storage.playerMove = storage.player2;
    }
    console.log("works");
    console.log(storage.playerMove);
    console.log(storage.player2);
  };

  const displayGame = () => {
    gameboardDisplay.addEventListener("click", (e) => {
      if (e.target.classList.contains("box")) {
        if (e.target.textContent === "") {
          e.target.textContent = storage.playerMove;
          return switchPlayerMove();
        }
      }
    });
  };
  return { displayGame: displayGame(), selectPlayerMove: selectPlayerMove() };
})();

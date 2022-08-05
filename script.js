const gameboardDisplay = document.querySelector(".gameboard");
const gameWrapper = document.querySelector(".game");

const game = (() => {
  const storage = {
    gameboard: [],
    player1: ["ｏ"],
    player2: ["ｘ"],
    playerMove: [],
  };

  const addGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.classList.add(`${i}`);
      storage.gameboard.push(box);
      gameboardDisplay.appendChild(box);
    }
  };

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
  };

  const displayGame = () => {
    gameboardDisplay.addEventListener("click", (e) => {
      if (e.target.classList.contains("box")) {
        if (e.target.textContent === "") {
          e.target.textContent = storage.playerMove;
          win();
          return switchPlayerMove();
        }
      }
    });
  };
  const win = () => {
    // O (player 1) win condition
    if (
      // check for 3-in-a-row horizontally
      (storage.gameboard[0].textContent === "ｏ" &&
        storage.gameboard[1].textContent === "ｏ" &&
        storage.gameboard[2].textContent === "ｏ") ||
      (storage.gameboard[3].textContent === "ｏ" &&
        storage.gameboard[4].textContent === "ｏ" &&
        storage.gameboard[5].textContent === "ｏ") ||
      (storage.gameboard[6].textContent === "ｏ" &&
        storage.gameboard[7].textContent === "ｏ" &&
        storage.gameboard[8].textContent === "ｏ") ||
      // check for 3-in-a-row vertically
      (storage.gameboard[0].textContent === "ｏ" &&
        storage.gameboard[3].textContent === "ｏ" &&
        storage.gameboard[6].textContent === "ｏ") ||
      (storage.gameboard[1].textContent === "ｏ" &&
        storage.gameboard[4].textContent === "ｏ" &&
        storage.gameboard[7].textContent === "ｏ") ||
      (storage.gameboard[2].textContent === "ｏ" &&
        storage.gameboard[5].textContent === "ｏ" &&
        storage.gameboard[8].textContent === "ｏ") ||
      // check for 3-in-a-row diagonally
      (storage.gameboard[0].textContent === "ｏ" &&
        storage.gameboard[4].textContent === "ｏ" &&
        storage.gameboard[8].textContent === "ｏ") ||
      (storage.gameboard[2].textContent === "ｏ" &&
        storage.gameboard[4].textContent === "ｏ" &&
        storage.gameboard[6].textContent === "ｏ")
    ) {
      console.log("Player 1 ez won");
    }
    // x (player 2) win condition
    else if (
      // check for 3-in-a-row horizontally
      (storage.gameboard[0].textContent === "ｘ" &&
        storage.gameboard[1].textContent === "ｘ" &&
        storage.gameboard[2].textContent === "ｘ") ||
      (storage.gameboard[3].textContent === "ｘ" &&
        storage.gameboard[4].textContent === "ｘ" &&
        storage.gameboard[5].textContent === "ｘ") ||
      (storage.gameboard[6].textContent === "ｘ" &&
        storage.gameboard[7].textContent === "ｘ" &&
        storage.gameboard[8].textContent === "ｘ") ||
      // check for 3-in-a-row vertically
      (storage.gameboard[0].textContent === "ｘ" &&
        storage.gameboard[3].textContent === "ｘ" &&
        storage.gameboard[6].textContent === "ｘ") ||
      (storage.gameboard[1].textContent === "ｘ" &&
        storage.gameboard[4].textContent === "ｘ" &&
        storage.gameboard[7].textContent === "ｘ") ||
      (storage.gameboard[2].textContent === "ｘ" &&
        storage.gameboard[5].textContent === "ｘ" &&
        storage.gameboard[8].textContent === "ｘ") ||
      // check for 3-in-a-row diagonally
      (storage.gameboard[0].textContent === "ｘ" &&
        storage.gameboard[4].textContent === "ｘ" &&
        storage.gameboard[8].textContent === "ｘ") ||
      (storage.gameboard[2].textContent === "ｘ" &&
        storage.gameboard[4].textContent === "ｘ" &&
        storage.gameboard[6].textContent === "ｘ")
    ) {
      console.log("Player 2 ez won");
    }
    // tie
    else if (
      storage.gameboard[0].textContent !== "" &&
      storage.gameboard[1].textContent !== "" &&
      storage.gameboard[2].textContent !== "" &&
      storage.gameboard[3].textContent !== "" &&
      storage.gameboard[4].textContent !== "" &&
      storage.gameboard[5].textContent !== "" &&
      storage.gameboard[6].textContent !== "" &&
      storage.gameboard[7].textContent !== "" &&
      storage.gameboard[8].textContent !== ""
    ) {
      console.log("its a tie");
    }
  };

  return {
    displayGame: displayGame(),
    selectPlayerMove: selectPlayerMove(),
    addGameBoard: addGameBoard(),
  };
})();

const gameboardDisplay = document.querySelector(".gameboard");
const gameWrapper = document.querySelector(".game");
const wrapper = document.querySelector(".wrapper");

const game = (() => {
  const storage = {
    gameboard: [],
    player1: ["ｏ"],
    player2: ["ｘ"],
    playerMove: [],
    winner: "",
    tie: "",
  };

  // modals
  const modalRestart = document.createElement("div");
  modalRestart.classList.add("modal");
  wrapper.appendChild(modalRestart);

  const modalSelect = document.createElement("div");
  modalSelect.classList.add("modal");
  wrapper.appendChild(modalSelect);

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
    // modal content
    const selectPlayerModal = document.createElement("div");
    selectPlayerModal.classList.add("selectplayermodal");
    modalSelect.appendChild(selectPlayerModal);
    modalSelect.style.display = "block";

    // paraSelectPlayer
    const paraSelectPlayer = document.createElement("p");
    paraSelectPlayer.classList.add("paraselectplayer");
    paraSelectPlayer.textContent = "Select your move!";
    selectPlayerModal.appendChild(paraSelectPlayer);

    // btn-wrapper
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btnwrapper");
    selectPlayerModal.appendChild(btnWrapper);

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
      modalSelect.style.display = "none";
      return displayGame();
    });

    buttonO.addEventListener("click", () => {
      storage.playerMove = [];
      storage.playerMove = storage.player1;
      buttonX.style.display = "none";
      buttonO.style.display = "none";
      modalSelect.style.display = "none";
      return displayGame();
    });

    btnWrapper.appendChild(buttonX);
    btnWrapper.appendChild(buttonO);
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
      storage.winner = "Player 1";
      restartGame();
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
      storage.winner = "Player 2";
      restartGame();
    }
    // tie
    else if (
      // check if every boxes are not empty
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
      storage.tie = "It's a Tie!";
      restartGame();
    }
  };

  const restartGame = () => {
    // modal content
    const restartGameModal = document.createElement("div");
    restartGameModal.classList.add("restartgamemodal");

    modalRestart.appendChild(restartGameModal);
    modalRestart.style.display = "block";

    // show the winner or tie
    const paraWinner = document.createElement("p");
    paraWinner.classList.add("parawinner");
    if (storage.winner !== "") {
      paraWinner.textContent = `Congratulations ${storage.winner} has won!`;
      storage.winner = "";
    } else {
      paraWinner.textContent = storage.tie;
      storage.tie = "";
    }
    restartGameModal.appendChild(paraWinner);

    // restart btn
    const restartBtn = document.createElement("button");
    restartBtn.classList.add("restartbtn");
    restartBtn.textContent = "Restart";
    restartGameModal.appendChild(restartBtn);

    restartBtn.addEventListener("click", () => {
      modalRestart.style.display = "none";
      while (gameboardDisplay.firstChild) {
        gameboardDisplay.removeChild(gameboardDisplay.firstChild);
      }
      storage.playerMove = [];
      storage.gameboard = [];
      addGameBoard();
      selectPlayerMove();
    });
  };

  return {
    selectPlayerMove: selectPlayerMove(),
    addGameBoard: addGameBoard(),
  };
})();

const gameboardDisplay = document.querySelector('.gameboard');
const gameWrapper = document.querySelector('.game');
const wrapper = document.querySelector('.wrapper');
const paraplayer1 = document.querySelector('.paraplayer1');
const paraplayer2 = document.querySelector('.paraplayer2');

const game = (() => {
  const storage = {
    gameboard: [],
    player1: ['ｘ'],
    player2: ['ｏ'],
    playerMove: [],
    aiMove: [],
    winner: '',
    tie: '',
    ai: false,
  };

  // modals
  const modalRestart = document.createElement('div');
  modalRestart.classList.add('modal');
  wrapper.appendChild(modalRestart);

  const modalSelect = document.createElement('div');
  modalSelect.classList.add('modal');
  wrapper.appendChild(modalSelect);

  const modalStart = document.createElement('div');
  modalStart.classList.add('modal');
  wrapper.appendChild(modalStart);

  const returnBtn = document.createElement('button');
  returnBtn.classList.add('returnbtn');
  returnBtn.textContent = 'Return to start menu';
  gameWrapper.appendChild(returnBtn);
  returnBtn.addEventListener('click', () => {
    storage.ai = false;
    storage.tie = '';
    storage.winner = '';
    storage.playerMove = [];
    storage.aiMove = [];
    storage.gameboard = [];
    paraplayer1.textContent = '';
    paraplayer2.textContent = '';
    removeModalChilds();
    while (gameboardDisplay.firstChild) {
      gameboardDisplay.removeChild(gameboardDisplay.firstChild);
    }
    return startGame();
  });

  const addGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.classList.add(`${i}`);
      storage.gameboard.push(box);
      gameboardDisplay.appendChild(box);
    }
  };

  const startGame = () => {
    // modal content
    const startGameModal = document.createElement('div');
    startGameModal.classList.add('startgamemodal');
    modalStart.appendChild(startGameModal);

    // para name of the game
    const paraGameName = document.createElement('p');
    paraGameName.classList.add('paragamename');
    paraGameName.textContent = 'Tic Tac Toe';
    startGameModal.appendChild(paraGameName);

    const btnPvP = document.createElement('button');
    btnPvP.classList.add('btnpvp');
    btnPvP.textContent = 'Player vs Player';
    startGameModal.appendChild(btnPvP);

    const btnPvE = document.createElement('button');
    btnPvE.classList.add('btnpve');
    btnPvE.textContent = 'Player vs AI';
    startGameModal.appendChild(btnPvE);

    modalStart.style.display = 'block';

    btnPvP.addEventListener('click', () => {
      modalStart.style.display = 'none';
      addGameBoard();
      removeModalChilds();
      selectPlayer();
    });

    btnPvE.addEventListener('click', () => {
      storage.ai = true;
      modalStart.style.display = 'none';
      addGameBoard();
      removeModalChilds();
      selectPlayer();
    });
  };

  const selectPlayer = () => {
    // modal content
    const selectPlayerModal = document.createElement('div');
    selectPlayerModal.classList.add('selectplayermodal');
    modalSelect.appendChild(selectPlayerModal);
    modalSelect.style.display = 'block';

    // paraSelectPlayer
    const paraSelectPlayer = document.createElement('p');
    paraSelectPlayer.classList.add('paraselectplayer');
    paraSelectPlayer.textContent = 'Select Player!';
    selectPlayerModal.appendChild(paraSelectPlayer);

    // btn-wrapper
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btnwrapper');
    selectPlayerModal.appendChild(btnWrapper);

    const buttonX = document.createElement('button');
    buttonX.textContent = 'Player 1 (ｘ)';
    buttonX.classList.add('btnX');
    const buttonO = document.createElement('button');
    buttonO.textContent = 'Player 2 (ｏ)';
    buttonO.classList.add('btnO');

    buttonX.addEventListener('click', () => {
      storage.playerMove = storage.player1;
      modalSelect.style.display = 'none';
      removeModalChilds();
      if (storage.ai === false) {
        return displayGame();
      } else if (storage.ai === true) {
        return markSpotvsAI();
      }
    });

    buttonO.addEventListener('click', () => {
      storage.playerMove = storage.player2;
      modalSelect.style.display = 'none';
      removeModalChilds();
      if (storage.ai === false) {
        return displayGame();
      } else if (storage.ai === true) {
        return markSpotvsAI();
      }
    });

    btnWrapper.appendChild(buttonX);
    btnWrapper.appendChild(buttonO);
  };

  const switchPlayerMove = () => {
    if (storage.ai === false) {
      if (storage.playerMove === storage.player1) {
        storage.playerMove = storage.player2;
        showPlayer();
      } else if (storage.playerMove === storage.player2) {
        storage.playerMove = storage.player1;
        showPlayer();
      }
    } else if (storage.ai === true) {
      if (storage.winner === '' && storage.tie === '') {
        if (storage.playerMove === storage.player1) {
          storage.playerMove = [];
          storage.aiMove = storage.player2;
          setTimeout(() => {
            markSpotAI(storage.aiMove);
          }, 1500);
          showPlayer();
        } else if (storage.playerMove === storage.player2) {
          storage.playerMove = [];
          storage.aiMove = storage.player1;
          setTimeout(() => {
            markSpotAI(storage.aiMove);
          }, 1500);
          showPlayer();
        }
      }
    }
  };

  const displayGame = () => {
    storage.playerMove = storage.player1;
    showPlayer();
    gameboardDisplay.addEventListener('click', (e) => {
      if (e.target.classList.contains('box')) {
        if (e.target.textContent === '') {
          e.target.textContent = storage.playerMove;
          win();
          return switchPlayerMove();
        }
      }
    });
  };

  const showPlayer = () => {
    if (storage.ai === false) {
      paraplayer1.textContent = 'Player 1';
      paraplayer2.textContent = 'Player 2';
      if (storage.playerMove === storage.player1) {
        paraplayer1.style.fontSize = '2rem';
        paraplayer2.style.fontSize = '1rem';
      } else if (storage.playerMove === storage.player2) {
        paraplayer2.style.fontSize = '2rem';
        paraplayer1.style.fontSize = '1rem';
      }
    } else if (storage.ai === true) {
      if (storage.playerMove === storage.player1) {
        paraplayer1.textContent = 'Player 1';
        paraplayer2.textContent = 'AI';
      } else if (storage.playerMove === storage.player2) {
        paraplayer1.textContent = 'AI';
        paraplayer2.textContent = 'Player 2';
      }
      if (storage.playerMove === storage.player1) {
        paraplayer1.style.fontSize = '2rem';
        paraplayer2.style.fontSize = '1rem';
      } else if (storage.aiMove === storage.player2) {
        paraplayer2.style.fontSize = '2rem';
        paraplayer1.style.fontSize = '1rem';
      } else if (storage.playerMove === storage.player2) {
        paraplayer2.style.fontSize = '2rem';
        paraplayer1.style.fontSize = '1rem';
      } else if (storage.aiMove === storage.player1) {
        paraplayer1.style.fontSize = '2rem';
        paraplayer2.style.fontSize = '1rem';
      }
    }
  };

  const win = () => {
    // ｘ (player 1) win condition
    if (
      // check for 3-in-a-row horizontally
      (storage.gameboard[0].textContent === `${storage.player1}` &&
        storage.gameboard[1].textContent === `${storage.player1}` &&
        storage.gameboard[2].textContent === `${storage.player1}`) ||
      (storage.gameboard[3].textContent === `${storage.player1}` &&
        storage.gameboard[4].textContent === `${storage.player1}` &&
        storage.gameboard[5].textContent === `${storage.player1}`) ||
      (storage.gameboard[6].textContent === `${storage.player1}` &&
        storage.gameboard[7].textContent === `${storage.player1}` &&
        storage.gameboard[8].textContent === `${storage.player1}`) ||
      // check for 3-in-a-row vertically
      (storage.gameboard[0].textContent === `${storage.player1}` &&
        storage.gameboard[3].textContent === `${storage.player1}` &&
        storage.gameboard[6].textContent === `${storage.player1}`) ||
      (storage.gameboard[1].textContent === `${storage.player1}` &&
        storage.gameboard[4].textContent === `${storage.player1}` &&
        storage.gameboard[7].textContent === `${storage.player1}`) ||
      (storage.gameboard[2].textContent === `${storage.player1}` &&
        storage.gameboard[5].textContent === `${storage.player1}` &&
        storage.gameboard[8].textContent === `${storage.player1}`) ||
      // check for 3-in-a-row diagonally
      (storage.gameboard[0].textContent === `${storage.player1}` &&
        storage.gameboard[4].textContent === `${storage.player1}` &&
        storage.gameboard[8].textContent === `${storage.player1}`) ||
      (storage.gameboard[2].textContent === `${storage.player1}` &&
        storage.gameboard[4].textContent === `${storage.player1}` &&
        storage.gameboard[6].textContent === `${storage.player1}`)
    ) {
      storage.winner = 'Player 1';
      restartGame();
    }
    // 0 (player 2) win condition
    else if (
      // check for 3-in-a-row horizontally
      (storage.gameboard[0].textContent === `${storage.player2}` &&
        storage.gameboard[1].textContent === `${storage.player2}` &&
        storage.gameboard[2].textContent === `${storage.player2}`) ||
      (storage.gameboard[3].textContent === `${storage.player2}` &&
        storage.gameboard[4].textContent === `${storage.player2}` &&
        storage.gameboard[5].textContent === `${storage.player2}`) ||
      (storage.gameboard[6].textContent === `${storage.player2}` &&
        storage.gameboard[7].textContent === `${storage.player2}` &&
        storage.gameboard[8].textContent === `${storage.player2}`) ||
      // check for 3-in-a-row vertically
      (storage.gameboard[0].textContent === `${storage.player2}` &&
        storage.gameboard[3].textContent === `${storage.player2}` &&
        storage.gameboard[6].textContent === `${storage.player2}`) ||
      (storage.gameboard[1].textContent === `${storage.player2}` &&
        storage.gameboard[4].textContent === `${storage.player2}` &&
        storage.gameboard[7].textContent === `${storage.player2}`) ||
      (storage.gameboard[2].textContent === `${storage.player2}` &&
        storage.gameboard[5].textContent === `${storage.player2}` &&
        storage.gameboard[8].textContent === `${storage.player2}`) ||
      // check for 3-in-a-row diagonally
      (storage.gameboard[0].textContent === `${storage.player2}` &&
        storage.gameboard[4].textContent === `${storage.player2}` &&
        storage.gameboard[8].textContent === `${storage.player2}`) ||
      (storage.gameboard[2].textContent === `${storage.player2}` &&
        storage.gameboard[4].textContent === `${storage.player2}` &&
        storage.gameboard[6].textContent === `${storage.player2}`)
    ) {
      storage.winner = 'Player 2';
      restartGame();
    }
    // tie
    else if (
      // check if every boxes are not empty
      storage.gameboard[0].textContent !== '' &&
      storage.gameboard[1].textContent !== '' &&
      storage.gameboard[2].textContent !== '' &&
      storage.gameboard[3].textContent !== '' &&
      storage.gameboard[4].textContent !== '' &&
      storage.gameboard[5].textContent !== '' &&
      storage.gameboard[6].textContent !== '' &&
      storage.gameboard[7].textContent !== '' &&
      storage.gameboard[8].textContent !== ''
    ) {
      storage.tie = "It's a Tie!";
      restartGame();
    }
  };

  const restartGame = () => {
    // modal content
    const restartGameModal = document.createElement('div');
    restartGameModal.classList.add('restartgamemodal');

    modalRestart.appendChild(restartGameModal);
    modalRestart.style.display = 'block';

    // show the winner or tie
    const paraWinner = document.createElement('p');
    paraWinner.classList.add('parawinner');
    if (storage.winner !== '') {
      paraWinner.textContent = `Congratulations ${storage.winner} has won!`;
    } else {
      paraWinner.textContent = storage.tie;
    }
    restartGameModal.appendChild(paraWinner);

    // restart btn
    const restartBtn = document.createElement('button');
    restartBtn.classList.add('restartbtn');
    restartBtn.textContent = 'Restart';
    restartGameModal.appendChild(restartBtn);

    restartBtn.addEventListener('click', () => {
      modalRestart.style.display = 'none';
      while (gameboardDisplay.firstChild) {
        gameboardDisplay.removeChild(gameboardDisplay.firstChild);
      }
      storage.tie = '';
      storage.winner = '';
      storage.playerMove = [];
      storage.aiMove = [];
      storage.gameboard = [];
      removeModalChilds();
      addGameBoard();
      selectPlayer();
    });
  };

  const markSpotvsAI = () => {
    if (storage.ai === true) {
      showPlayer();
      if (storage.playerMove === storage.player2) {
        switchPlayerMove();
      }
      gameboardDisplay.addEventListener('click', (e) => {
        if (e.target.classList.contains('box') && e.target.textContent === '') {
          e.target.textContent = storage.playerMove;
          console.log('zialla');
          win();
          switchPlayerMove();
        }
      });
    }
  };

  const markSpotAI = (aiMove) => {
    if (storage.ai === true) {
      const box = storage.gameboard;
      if (aiMove === storage.player2) {
        if (
          box[0].textContent !== '' &&
          box[1].textContent !== '' &&
          box[2].textContent !== '' &&
          box[3].textContent !== '' &&
          box[4].textContent !== '' &&
          box[5].textContent !== '' &&
          box[6].textContent !== '' &&
          box[7].textContent !== '' &&
          box[8].textContent !== ''
        ) {
          checking = false;
        }
        let checking = true;
        while (checking) {
          let random = Math.floor(Math.random() * 9);
          if (storage.gameboard[random].textContent === '') {
            storage.gameboard[random].textContent = aiMove;
            checking = false;
          }
        }
        console.log('beezsd');
        storage.playerMove = storage.player1;
      } else if (aiMove === storage.player1) {
        if (
          box[0].textContent !== '' &&
          box[1].textContent !== '' &&
          box[2].textContent !== '' &&
          box[3].textContent !== '' &&
          box[4].textContent !== '' &&
          box[5].textContent !== '' &&
          box[6].textContent !== '' &&
          box[7].textContent !== '' &&
          box[8].textContent !== ''
        ) {
          checking = false;
        }
        let checking = true;
        while (checking) {
          let random = Math.floor(Math.random() * 9);
          if (storage.gameboard[random].textContent === '') {
            storage.gameboard[random].textContent = aiMove;
            checking = false;
          }
        }
        console.log('beez');
        storage.playerMove = storage.player2;
      }
      showPlayer();
      win();
    }
  };

  const removeModalChilds = () => {
    while (modalSelect.firstChild) {
      modalSelect.removeChild(modalSelect.lastChild);
    }
    while (modalRestart.firstChild) {
      modalRestart.removeChild(modalRestart.lastChild);
    }
    while (modalStart.firstChild) {
      modalStart.removeChild(modalStart.lastChild);
    }
  };

  return {
    startGame: startGame(),
  };
})();

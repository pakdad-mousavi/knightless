import { Chess } from 'chess.js';
import { createGameFen, checkForPieces, debounce, getMoveType } from './chessUtils.mjs';
import { playMoveAudio } from './sounds.mjs';

const RESET_BUTTON_SELECTOR = 'a[href="#retry"]';
const MOVE_COUNTER_PANEL_SELECTOR = '.move-counter';

export const setUpSampleBoard = (boardElement) => {
  // Get respective data from the webpage
  const boardName = boardElement.dataset.boardName;
  const posFen = boardElement.dataset.fen;
  const gameFen = createGameFen(posFen);
  const maxMoves = Number(boardElement.dataset.maxMoves);

  // Get the game board's panel (all sampleBoards have a reset button and a move counter panel)
  const panel = document.querySelector(`.${boardName}`);
  const resetBtn = panel.querySelector(RESET_BUTTON_SELECTOR);
  const moveCounterPanel = panel.querySelector(MOVE_COUNTER_PANEL_SELECTOR);

  // Keep track of moves gone
  let moveCounter = 0;

  // Create the game
  const game = new Chess();
  game.load(gameFen, { skipValidation: true });

  // Only allow white pieces to be moved
  const onDragStart = (_, piece) => {
    if (piece.search(/^w/) === -1) {
      return false;
    }
  };

  // For promotions or en passants, to load in the new position on the board
  const onSnapEnd = () => {
    board.position(game.fen());
  };

  // Integrate the board move with the game move
  const onDrop = (from, to) => {
    // Make the move in the game
    try {
      const move = game.move({
        from,
        to,
        promotion: 'q',
      });

      const moveType = getMoveType(game, move);
      if (moveType !== 'check') {
        playMoveAudio(moveType);
      } else {
        playMoveAudio('move');
      }

      // Update the move counter
      moveCounter++;
      updateMovePanel();

      // Load in the new position, but as white's turn again
      const newPosFen = move.after.split(' ')[0];
      const newGameFen = createGameFen(newPosFen, 'w');
      game.load(newGameFen, { skipValidation: true });
    } catch {
      //If it was an illegal move, just snap back
      return 'snapback';
    }
  };

  // Create the config object for the gameboard
  const config = {
    draggable: true,
    position: gameFen,
    pieceTheme: '/chesspieces/{piece}.svg',
    onDrop,
    onDragStart,
    onSnapEnd,
    moveSpeed: 150,
    snapbackSpeed: 0,
    snapSpeed: 0,
  };

  const board = new Chessboard(boardElement, config);

  // Handle the reset button
  resetBtn.addEventListener('click', (e) => {
    // Reset both the game and chessboard positions
    e.preventDefault();
    board.position(gameFen);
    game.load(gameFen, { skipValidation: true });

    // Reset move counter
    moveCounter = 0;
    updateMovePanel();
  });

  // Update the counter panel
  const updateMovePanel = () => {
    moveCounterPanel.innerHTML = `Moves Used: ${moveCounter}`;

    // If the move limit is hit, check to see if all black pawns are captured
    if (moveCounter === maxMoves) {
      const allBlackPawnsCaptured = !checkForPieces(game, 'p', 'b');

      if (allBlackPawnsCaptured) {
        moveCounterPanel.classList.add('success-panel');
      } else {
        moveCounterPanel.classList.add('fail-panel');
      }
    }

    if (moveCounter === 0) {
      moveCounterPanel.classList.remove('success-panel');
      moveCounterPanel.classList.remove('fail-panel');
    }
  };

  // Handle dynamic board resizing
  const resizeBoard = () => {
    board.resize();
  };

  window.addEventListener('resize', debounce(resizeBoard));
};

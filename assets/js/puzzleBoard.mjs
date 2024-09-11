import { Chess } from '/chessjs/chess.js';
import { FLAGS, highlightSquare, removeAllHighlights, highlightChecks, debounce } from './chessUtils.mjs';
import { playMoveAudio } from './sounds.mjs';

const PGN_PANEL_CLASS = 'pgn-panel';
const MESSAGE_BOX_CLASS = 'message-box';
const MOVE_BOX_CLASS = 'move-box';
const INDEX_BOX_CLASS = 'index-box';
const PGN_SCROLLER_CLASS = 'pgn-scroller';
const MOVE_HIGHLIGHT_CLASS = 'move-highlight';
const MOVE_CLASS = 'move';
const MOVE_NUMBER_CLASS = 'move-number';
const CORRECT_MOVE_CLASS = 'correct';
const INCORRECT_MOVE_CLASS = 'incorrect';

const COMPUTER_MOVE_DELAY = 400;
const MOVE_TYPES = {
  move: 'move',
  capture: 'capture',
  check: 'check',
};

const createNewElement = (tag, content, classes) => {
  const element = document.createElement(tag);
  element.innerHTML = content;
  element.classList.add(...classes);
  return element;
};

const updateHighlights = (boardElement, game, move) => {
  removeAllHighlights(boardElement); // First, remove all current highlights
  highlightChecks(game, boardElement); // Then, check for a check on the next turns' player's king
  highlightSquare(boardElement, move.from, MOVE_HIGHLIGHT_CLASS); // Highlight the "from" move
  highlightSquare(boardElement, move.to, MOVE_HIGHLIGHT_CLASS); // Highlight the "to" move
};

export const getMoveType = (game, move) => {
  const isEnPassant = move.flags.search(FLAGS.enPassant) !== -1; // is the move an en passant?
  const isNormalCapture = move.flags.search(FLAGS.capture) !== -1; // is the move a normal capture?
  const isNonCapture = !isEnPassant && !isNormalCapture; // Is the move anything else besides a capture?
  const isCheck = game.inCheck(); // Are either one of the kings in check?

  if (isCheck) {
    return MOVE_TYPES.check;
  } else if (isNonCapture) {
    return MOVE_TYPES.move;
  } else {
    return MOVE_TYPES.capture;
  }
};

const makeComputerMove = (board, game, move) => {
  // Make the next move and set the board position
  const opponentMove = game.move(move);
  board.position(game.fen());

  // Return the move that was made
  return opponentMove;
};

const undoMove = (board, game) => {
  // Undo the move
  game.undo();

  // Get the previous move before the undo
  const history = game.history({ verbose: true });
  const previousMove = history[history.length - 1];

  // Return back to position before the move
  board.position(game.fen());

  // Return the previous move
  return previousMove;
};

export const setUpPuzzleBoard = (boardElement) => {
  // Get the game position and the last move played
  const dataPgn = boardElement.dataset.pgn;
  const pgnArray = dataPgn.replaceAll(',', ' ').split(' ');
  const initialPuzzleMove = pgnArray.splice(pgnArray.length - 1, 1)[0];
  const pgnString = pgnArray.join(' ');

  // Re-insert the initial puzzle move
  pgnArray.push(initialPuzzleMove);

  // Get the puzzle solution
  const solution = boardElement.dataset.solution.split(',');

  // Get the move, index, and message box elements and the scrollable pgn section for the respective board
  const id = boardElement.id;
  const pgnPanel = document.querySelector(`.${id}.${PGN_PANEL_CLASS}`);
  const pgnScroller = pgnPanel.querySelector(`.${PGN_SCROLLER_CLASS}`);
  const messageBox = pgnPanel.querySelector(`.${MESSAGE_BOX_CLASS}`);
  const moveBox = pgnPanel.querySelector(`.${MOVE_BOX_CLASS}`);
  const indexBox = pgnPanel.querySelector(`.${INDEX_BOX_CLASS}`);

  // Create the game with the pgn
  const game = new Chess();
  game.loadPgn(pgnString);

  // Deduce the board orientation based on number of moves done
  const gameLength = game.moveNumber();
  const orientation = gameLength % 2 === 0 ? 'white' : 'black';

  // Keep track of the moves used by the player
  let movesUsed = 0;
  let puzzleOver = false;

  // Keep track of the user's moves and the correct moves
  let newMoves = [];

  // Keep track of the move obj to highlight if window is resized
  let lastMove;

  // Function to add a move after it is made
  const addMove = (move, moveNumber, isCorrect) => {
    if (isCorrect === null) {
      newMoves.push({ move, moveNumber, type: null });
    } else if (isCorrect) {
      newMoves.push({ move, moveNumber, type: CORRECT_MOVE_CLASS }); // Add the correct move with its type
    } else {
      newMoves.push({ move, moveNumber, type: INCORRECT_MOVE_CLASS }); // Add incorrect move with its type
    }

    updatePgnPanel();
  };

  // Only allow the player to move their own pieces until the puzzle ends
  const onDragStart = (_, piece) => {
    const isWhiteMovingBlackPiece = orientation === 'white' && piece.search(/^w/) === -1;
    const isBlackMovingWhitePiece = orientation === 'black' && piece.search(/^b/) === -1;
    if (isWhiteMovingBlackPiece || isBlackMovingWhitePiece || puzzleOver) {
      return false;
    }
  };

  const onDrop = (from, to) => {
    try {
      // Make the move (checks if it is legal or not)
      const move = game.move({ from, to });

      // Play the respective move type sound
      const moveType = getMoveType(game, move);
      playMoveAudio(moveType);

      // Update the highlights on the board
      updateHighlights(boardElement, game, move);

      // Logical game variables
      const isCorrectMove = move.lan === solution[movesUsed];
      const areAllSolutionMovesFinished = solution.length === movesUsed + 1;

      // Add the move to the list
      addMove(move.san, orientation === 'black' ? game.moveNumber() - 1 : game.moveNumber(), isCorrectMove);

      // If the puzzle is over...
      if ((isCorrectMove && areAllSolutionMovesFinished) || game.isCheckmate()) {
        // Update the message box
        puzzleOver = true;
        updateMessageBox({ move, isCorrect: true, puzzleOver });

        // Update the last move to highlight
        lastMove = move;
        return;
      }

      // If the move is correct...
      if (isCorrectMove) {
        updateMessageBox({ move, isCorrect: true, puzzleOver: false });

        window.setTimeout(() => {
          // Make the opponents move based on the solution
          const solutionMove = solution[movesUsed + 1];
          const opponentMove = makeComputerMove(board, game, solutionMove);
          lastMove = opponentMove;
          addMove(opponentMove.san, game.moveNumber(), null);
          const moveType = getMoveType(game, opponentMove);

          updateHighlights(boardElement, game, opponentMove);
          playMoveAudio(moveType);

          // Update the moves used variable
          movesUsed += 2;
        }, COMPUTER_MOVE_DELAY);
      }

      // If the move is wrong...
      else {
        updateMessageBox({ move, isCorrect: false, puzzleOver });

        window.setTimeout(() => {
          const previousMove = undoMove(board, game); // Undo the move
          addMove(previousMove.san, orientation === 'black' ? game.moveNumber() : game.moveNumber() - 1, null);
          updateHighlights(boardElement, game, previousMove);
        }, COMPUTER_MOVE_DELAY);
      }
    } catch {
      return 'snapback';
    }
  };

  // Create the chessboard
  const config = {
    position: game.fen() || 'start',
    draggable: true,
    onDrop,
    onDragStart,
    moveSpeed: 150,
    snapbackSpeed: 0,
    snapSpeed: 0,
    pieceTheme: '/chesspieces/{piece}.svg',
  };

  const board = new Chessboard(boardElement, config);
  board.orientation(orientation);

  const updateMessageBox = (obj) => {
    // Initial run, set the message to tell the player who's turn it is
    if (obj.orientation) {
      const message = [];
      message.push(`<h4>It's your turn.</h4>`);
      message.push(`<span class="font-normal">Find the best move for ${obj.orientation}.</span>`);
      messageBox.innerHTML = message.join('');
    }

    // Update the panel based on the move
    if (obj.move) {
      // Set the message to tell the player the puzzle is over
      if (obj.puzzleOver && obj.isCorrect) {
        messageBox.innerHTML = `<h4>Puzzle solved!</h4><span class="font-normal">Great job.</span>`;
      } else {
        // Tell the player to keep going or to try again based on move
        const messageType = obj.isCorrect ? 'success' : 'fail';
        const messageTitle = obj.isCorrect ? `<h4><span class="${messageType}">${obj.move.san} is the best move.</span></h4>` : `<h4><span class="${messageType}">${obj.move.san} is not the right move.</span></h4>`;
        const messageText = obj.isCorrect ? `<span class="font-normal">Keep going...</span>` : `<span class="font-normal">Try again.</span>`;
        messageBox.innerHTML = messageTitle + messageText;
      }
    }
  };

  const updatePgnPanel = () => {
    indexBox.innerHTML = ''; // Clear current content
    moveBox.innerHTML = ''; // Clear current content

    const allMoves = [...pgnArray.map((move, index) => ({ move, moveNumber: Math.floor(index / 2) + 1, type: null })), ...newMoves];

    // Populate the grids
    allMoves.forEach((moveObj, index) => {
      const { move, moveNumber, moveType } = moveObj;
      // Create and append the move number
      if (index % 2 === 0) {
        const moveNumberClasses = [MOVE_NUMBER_CLASS];
        const moveNumberElement = createNewElement('div', `${moveNumber}.`, moveNumberClasses);
        indexBox.appendChild(moveNumberElement);
      }

      // Create and append the move
      const moveClasses = [MOVE_CLASS];
      if (moveType || moveType !== null) {
        moveClasses.push(moveObj.type);
      }
      const moveElement = createNewElement('div', move, moveClasses);
      moveBox.appendChild(moveElement);
    });

    // Scroll to the bottom of the pgn panel
    pgnScroller.scrollTop = pgnScroller.scrollHeight;
  };

  const resizeBoard = () => {
    board.resize();
    updateHighlights(boardElement, game, lastMove);
  };

  // Update the board when the page is resized
  window.addEventListener('resize', debounce(resizeBoard));

  // Scroll to the bottom of the pgn panel
  updatePgnPanel();

  // Give the pgn panel its initial message based on the boards orientation
  updateMessageBox({ orientation });

  // Make the initial puzzle move
  window.setTimeout(() => {
    const move = makeComputerMove(board, game, initialPuzzleMove);

    // Keep track of the last move played
    lastMove = move;

    const moveType = getMoveType(game, move);
    updateHighlights(boardElement, game, move);
    playMoveAudio(moveType);
  }, COMPUTER_MOVE_DELAY);
};

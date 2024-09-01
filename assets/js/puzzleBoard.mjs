import { Chess } from '/chessjs/chess.js';
import { FLAGS, highlightSquare, removeAllHighlights, highlightChecks } from './chessUtils.mjs';
import { playMoveAudio } from './sounds.mjs';

const PGNPANELCLASS = 'pgn-panel';
const MESSAGEBOXCLASS = 'message-box';
const MOVEHIGHLIGHTCLASS = 'move-highlight';
const COMPUTERMOVEDELAY = 400;
const MOVETYPES = {
  move: 'move',
  capture: 'capture',
  check: 'check',
};

const updateHighlights = (boardElement, game, move) => {
  removeAllHighlights(boardElement); // First, remove all current highlights
  highlightChecks(game, boardElement); // Then, check for a check on the next turns' player's king
  highlightSquare(boardElement, move.from, MOVEHIGHLIGHTCLASS); // Highlight the "from" move
  highlightSquare(boardElement, move.to, MOVEHIGHLIGHTCLASS); // Highlight the "to" move
};

const getMoveType = (game, move) => {
  const isEnPassant = move.flags.search(FLAGS.enPassant) !== -1; // is the move an en passant?
  const isNormalCapture = move.flags.search(FLAGS.capture) !== -1; // is the move a normal capture?
  const isNonCapture = !isEnPassant && !isNormalCapture; // Is the move anything else besides a capture?
  const isCheck = game.inCheck(); // Are either one of the kings in check?

  if (isCheck) {
    return MOVETYPES.check;
  } else if (isNonCapture) {
    return MOVETYPES.move;
  } else {
    return MOVETYPES.capture;
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

  // Get the puzzle solution
  const solution = boardElement.dataset.solution.split(',');

  // Get the move box and message box elements for the respective board
  const id = boardElement.id;
  const pgnPanel = document.querySelector(`.${id}.${PGNPANELCLASS}`);
  const messageBox = pgnPanel.querySelector(`.${MESSAGEBOXCLASS}`);
  // const moveBox = pgnPanel.querySelector(`.move-box`);

  // Create the game with the pgn
  const game = new Chess();
  game.loadPgn(pgnString);

  // Deduce the board orientation based on number of moves done
  const gameLength = game.moveNumber();
  const orientation = gameLength % 2 === 0 ? 'white' : 'black';

  // Keep track of the moves used by the player
  let movesUsed = 0;
  let puzzleOver = false;

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

      // If the puzzle is over...
      if ((isCorrectMove && areAllSolutionMovesFinished) || game.isCheckmate()) {
        puzzleOver = true;
        updatePgnPanel({ move, isCorrect: true, puzzleOver });
        return;
      }

      // If the move is correct...
      if (isCorrectMove) {
        updatePgnPanel({ move, isCorrect: true, puzzleOver: false });

        window.setTimeout(() => {
          // Make the opponents move based on the solution
          const solutionMove = solution[movesUsed + 1];
          const opponentMove = makeComputerMove(board, game, solutionMove);
          const moveType = getMoveType(game, opponentMove);

          updateHighlights(boardElement, game, opponentMove);
          playMoveAudio(moveType);

          // Update the moves used variable
          movesUsed += 2;
        }, COMPUTERMOVEDELAY);
      }

      // If the move is wrong...
      else {
        updatePgnPanel({ move, isCorrect: false, puzzleOver });

        window.setTimeout(() => {
          const previousMove = undoMove(board, game); // Undo the move
          updateHighlights(boardElement, game, previousMove);
        }, COMPUTERMOVEDELAY);
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

  const updatePgnPanel = (obj) => {
    // Initial run, set the message to tell the player who's turn it is
    if (obj.orientation) {
      const message = [];
      message.push(`<h4>It's your turn.</h4>`);
      message.push(`<span class="font-normal">Find the best move for ${obj.orientation}.</span>`);
      messageBox.innerHTML = message.join('');
    }

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

  // Give the pgn panel its initial message based on the boards orientation
  updatePgnPanel({ orientation });

  // Make the initial puzzle move
  window.setTimeout(() => {
    const move = makeComputerMove(board, game, initialPuzzleMove);
    const moveType = getMoveType(game, move);
    updateHighlights(boardElement, game, move);
    playMoveAudio(moveType);
  }, COMPUTERMOVEDELAY);
};

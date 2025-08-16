import { getMovementInfoFromPiece } from '../../helpers/getMovementsForPiece.js';
import { getTacticInfoFromPieceAndTactic } from '../../helpers/getTacticsForPiece.js';
import { Chessground } from '/chessground/dist/chessground.min.js';
import { ranks, files } from '/chessground/dist/types.js';

// Constants for timing different animations
const TIMES = {
  initialDelay: 500, // Initial delay before beginning animations
  move: 800, // Time for a single move animation

  boardTransition: 1500, // Total time for transitioning the board
  fadingInBoard: 500, // Time for fading the board in
  showingBoard: 500, // Time for fading the board out

  highlightingSquares: 2000, // Total time for showing, displaying and fading squares
  fadingInOutSquare: 500, // Time for fading a square in or out
};

const SQUARES_COLORS = {
  gray: 'bg-black',
  red: 'bg-red-800',
};

const sampleBoards = new Map();
const initialDelays = new Map();

// Function to transition the board element with a fade effect
const transitionBoardElement = (boardElement, cg, startingPosition) => {
  boardElement.classList.toggle('after:opacity-0'); // Toggle opacity for fade effect
  window.setTimeout(() => {
    cg.set({
      fen: startingPosition, // Reset the board to the starting position
      lastMove: [],
    });
  }, TIMES.showingBoard);
  window.setTimeout(() => {
    boardElement.classList.toggle('after:opacity-0'); // Toggle opacity back
  }, TIMES.fadingInBoard + TIMES.showingBoard);
};

const drawArrows = (arrows, cg) => {
  if (!arrows.length) return;
  const shapeSet = arrows.map((arrow) => {
    return { orig: arrow.orig, dest: arrow.dest, brush: 'yellow' };
  });

  cg.setShapes(shapeSet);
};

// Function to create and append a highlight square to the board
const createAndAppendHighlight = (boardElement, width, square, left, top, squaresColor) => {
  const boardId = boardElement.id;
  const squareElement = document.createElement('div');
  const color = SQUARES_COLORS[squaresColor];
  squareElement.classList.add(color, 'opacity-0', 'aspect-square', 'absolute', `square-highlight-${boardId}`);
  squareElement.setAttribute('data-square', square);
  squareElement.style.left = `${left}%`;
  squareElement.style.top = `${top}%`;
  squareElement.style.width = `${width}px`;
  squareElement.style.transitionDuration = `${TIMES.fadingInOutSquare}ms`;

  boardElement.appendChild(squareElement);

  // Trigger opacity change for fade-in effect
  window.setTimeout(() => {
    squareElement.style.opacity = '50%';
  }, 10);

  return squareElement;
};

// Function to calculate the position of a highlight square on the board
const calculateHighlightPosition = (boardElement, square) => {
  const totalWidth = boardElement.offsetWidth; // Total width of the board
  const squareWidth = totalWidth / 8; // Width of a single square

  const file = square.slice(0, 1); // Extract file (column) from square
  const rank = square.slice(1, 2); // Extract rank (row) from square

  const leftFactor = files.indexOf(file); // Calculate horizontal position
  const topFactor = ranks.indexOf(rank) + 1; // Calculate vertical position

  const leftPercentage = (squareWidth / totalWidth) * 100 * leftFactor;
  const topPercentage = 100 - (squareWidth / totalWidth) * 100 * topFactor;

  return { leftPercentage, topPercentage };
};

// Function to recalculate the size and position of a highlight square on resize
const recalulateSizeAndPosition = (squareElement, boardElement, square) => {
  const totalWidth = boardElement.offsetWidth;
  const squareWidth = totalWidth / 8;

  const { leftPercentage, topPercentage } = calculateHighlightPosition(boardElement, square);

  squareElement.remove(); // Remove the element temporarily
  squareElement.style.width = `${squareWidth}px`;
  boardElement.appendChild(squareElement); // Re-append the element
  squareElement.style.left = `${leftPercentage}%`;
  squareElement.style.top = `${topPercentage}%`;
};

// Function to highlight a specific square on the board
const highlightSquare = (boardElement, square, squaresColor) => {
  const totalWidth = boardElement.offsetWidth;
  const squareWidth = totalWidth / 8;

  const { leftPercentage, topPercentage } = calculateHighlightPosition(boardElement, square);

  // Create and append the highlight square
  const appendedSquare = createAndAppendHighlight(boardElement, squareWidth, square, leftPercentage, topPercentage, squaresColor);
  return appendedSquare;
};

// Function to remove all highlighted squares from the board
const removeCosmetics = (boardElement, cg) => {
  if (!document.body.contains(boardElement)) return;
  const boardId = boardElement.id;
  const highlightedSquares = document.querySelectorAll(`.square-highlight-${boardId}`);

  for (const square of highlightedSquares) {
    square.style.opacity = 0; // Fade out the square
    window.setTimeout(() => {
      square.remove(); // Remove the square after fade-out
    }, TIMES.fadingInOutSquare);
  }

  cg.set({ fen: cg.getFen() });
};

// Main function to set up the sample chessboard and execute movement rounds
export const setUpSampleBoard = (boardElement) => {
  // Load the data for the respective piece
  const piece = boardElement.dataset.piece;
  const boardType = boardElement.dataset.type;

  // Get the movement round based on the type of the board
  let movementRounds;
  if (boardType === 'movements') {
    movementRounds = getMovementInfoFromPiece(piece);
  } else if (boardType === 'tactics') {
    const tactic = boardElement.dataset.tactic;
    movementRounds = getTacticInfoFromPieceAndTactic(piece, tactic);
  }

  const initialPosition = movementRounds[0].startingPosition;

  // Create the chessboard with the initial configuration
  const config = {
    fen: initialPosition,
    orientation: 'white',
    movable: {
      free: false,
      viewOnly: true, // Board is view-only
    },
    animation: {
      enabled: true,
      duration: 200, // Animation duration for moves
    },
    drawable: {
      visible: true, // can view
    },
  };

  const cg = Chessground(boardElement, config);
  sampleBoards.set(boardElement.id, { cg, timeouts: [] });

  let isFirstRound = true; // Flag to handle the first round (to avoid board transitioning)

  // Function to execute all movement rounds
  let isRunning = false;
  let resizeListeners = [];

  const executeRounds = async () => {
    // Prevent overlapping calls
    if (isRunning || !document.body.contains(boardElement)) return;

    // Clear any previous delays and wait begin new initial delay
    window.clearTimeout(initialDelays.get(boardElement.id));
    await new Promise((res) => {
      const initialDelayTimeout = window.setTimeout(res, TIMES.initialDelay);
      initialDelays.set(boardElement.id, initialDelayTimeout);
    });

    // Ensures the board was not switched out during the initial delay
    if (isRunning || !document.body.contains(boardElement)) return;
    isRunning = true;

    while (isRunning) {
      for (const movementRound of movementRounds) {
        if (isFirstRound) {
          isFirstRound = false;
        } else {
          await new Promise((res) => {
            transitionBoardElement(boardElement, cg, movementRound.startingPosition);
            const transitionTimeout = setTimeout(res, TIMES.boardTransition);
            sampleBoards.get(boardElement.id).timeouts.push(transitionTimeout);
          });
          sampleBoards.get(boardElement.id).timeouts.pop();
        }

        for (let i = 0; i < movementRound.moves.length; i++) {
          const move = movementRound.moves?.[i];
          const squares = movementRound.squaresToHighlight[i]?.squares || [];
          const squaresColor = movementRound.squaresToHighlight[i]?.color;
          const arrows = movementRound.squaresToHighlight[i]?.arrows;

          if (squares.length && document.body.contains(boardElement)) {
            await new Promise(async (res) => {
              for (const square of squares) {
                const elem = highlightSquare(boardElement, square, squaresColor);

                // Recalculate size and position of squares for initial update
                requestAnimationFrame(() => {
                  recalulateSizeAndPosition(elem, boardElement, square);
                });

                // Watch for window resize events and resize squares accordingly
                const listener = () => {
                  recalulateSizeAndPosition(elem, boardElement, square);
                };
                window.addEventListener('resize', listener);
                resizeListeners.push(listener);
              }

              // Draw arrows if any
              if (arrows && arrows.length) {
                drawArrows(arrows, cg);
              }

              // Remove any cosmetics once animation is completed
              window.setTimeout(() => {
                removeCosmetics(boardElement, cg);
              }, TIMES.highlightingSquares - TIMES.fadingInOutSquare);

              const resizeTimeout = window.setTimeout(() => {
                resizeListeners.forEach((fn) => window.removeEventListener('resize', fn));
                resizeListeners = [];
                res();
              }, TIMES.highlightingSquares);
              sampleBoards.get(boardElement.id).timeouts.push(resizeTimeout);
            });
          }

          if (move && document.body.contains(boardElement)) {
            await new Promise((res) => {
              cg.move(move.slice(0, 2), move.slice(2, 4));
              const moveTimeout = window.setTimeout(res, TIMES.move);
              sampleBoards.get(boardElement.id).timeouts.push(moveTimeout);
            });
            sampleBoards.get(boardElement.id).timeouts.pop();
          }
        }
      }
    }
  };

  if (document.body.contains(boardElement)) {
    executeRounds(); // Start executing the rounds
  }
};

export const destroySampleBoard = (boardElement) => {
  if (!boardElement) return;
  const sampleBoard = sampleBoards.get(boardElement.id);
  sampleBoard.cg.cancelMove();
  sampleBoard.cg.stop();
  sampleBoard.cg.destroy();
  removeCosmetics(boardElement, sampleBoard.cg);

  for (const timeout of sampleBoard.timeouts) {
    window.clearTimeout(timeout);
  }

  sampleBoards.delete(boardElement.id);
};

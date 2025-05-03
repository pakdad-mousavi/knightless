import { getMovementInfoFromPiece } from '../../helpers/getMovementsForPiece.js';
import { Chessground } from '/chessground/dist/chessground.min.js';
import { ranks, files } from '/chessground/dist/types.js';

// Constants for timing different animations
const TIMES = {
  move: 800, // Time for a single move animation
  boardTransition: 1500, // Time for transitioning the board
  highlightingSquares: 2000, // Time for highlighting squares
};

// Function to transition the board element with a fade effect
const transitionBoardElement = (boardElement, cg, startingPosition) => {
  boardElement.classList.toggle('after:opacity-0'); // Toggle opacity for fade effect
  window.setTimeout(() => {
    cg.set({
      fen: startingPosition, // Reset the board to the starting position
      lastMove: [],
    });
  }, 500);
  window.setTimeout(() => {
    boardElement.classList.toggle('after:opacity-0'); // Toggle opacity back
  }, 1000);
};

// Function to create and append a highlight square to the board
const createAndAppendHighlight = (boardElement, width, square, left, top) => {
  const squareElement = document.createElement('div');
  squareElement.classList.add('bg-black', 'opacity-0', 'aspect-square', 'absolute', 'square-highlight');
  squareElement.setAttribute('data-square', square);
  squareElement.style.left = `${left}%`;
  squareElement.style.top = `${top}%`;
  squareElement.style.width = `${width}px`;
  squareElement.style.transitionDuration = '500ms';

  boardElement.appendChild(squareElement);

  // Trigger opacity change for fade-in effect
  requestAnimationFrame(() => {
    squareElement.style.opacity = '50%';
  });

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
const highlightSquare = (boardElement, square) => {
  const totalWidth = boardElement.offsetWidth;
  const squareWidth = totalWidth / 8;

  const { leftPercentage, topPercentage } = calculateHighlightPosition(boardElement, square);

  // Create and append the highlight square
  const appendedSquare = createAndAppendHighlight(boardElement, squareWidth, square, leftPercentage, topPercentage);
  return appendedSquare;
};

// Function to remove all highlighted squares from the board
const removeAllHighlightedSquares = () => {
  const highlightedSquares = document.querySelectorAll('.square-highlight');

  for (const square of highlightedSquares) {
    square.style.opacity = 0; // Fade out the square
    window.setTimeout(() => {
      square.remove(); // Remove the square after fade-out
    }, 500);
  }
};

// Main function to set up the sample chessboard and execute movement rounds
export const setUpSampleBoard = (boardElement) => {
  // Load the data for the respective piece
  const piece = boardElement.dataset.piece;
  const movementRounds = getMovementInfoFromPiece(piece);

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
    // drawable: {
    //   visible: true, // can view
    //   shapes: [
    //     {
    //       orig: 'd4',
    //       dest: 'e6',
    //       brush: 'yellow',
    //     },
    //     {
    //       orig: 'd6',
    //       dest: 'e6',
    //       brush: 'blue',
    //     },
    //   ],
    // },
  };

  const cg = Chessground(boardElement, config);

  let isFirstRound = true; // Flag to handle the first round

  // Function to execute all movement rounds
  let isRunning = false;
  let resizeListeners = [];

  const executeRounds = async () => {
    if (isRunning) return; // Prevent overlapping calls
    isRunning = true;

    while (isRunning) {
      for (const movementRound of movementRounds) {
        if (isFirstRound) {
          isFirstRound = false;
        } else {
          await new Promise((res) => {
            transitionBoardElement(boardElement, cg, movementRound.startingPosition);
            setTimeout(res, TIMES.boardTransition);
          });
        }

        for (let i = 0; i < movementRound.moves.length; i++) {
          const move = movementRound.moves[i];
          const squares = movementRound.squaresToHighlight[i] || [];

          if (squares.length) {
            await new Promise((res) => {
              removeAllHighlightedSquares();

              for (const square of squares) {
                const elem = highlightSquare(boardElement, square);

                const listener = () => {
                  recalulateSizeAndPosition(elem, boardElement, square);
                };
                window.addEventListener('resize', listener);
                resizeListeners.push(listener);
              }

              window.setTimeout(() => {
                removeAllHighlightedSquares();
              }, 1500);
              setTimeout(() => {
                resizeListeners.forEach((fn) => window.removeEventListener('resize', fn));
                resizeListeners = [];
                res();
              }, TIMES.highlightingSquares);
            });
          }

          await new Promise((res) => {
            cg.move(move.slice(0, 2), move.slice(2, 4));
            setTimeout(res, TIMES.move);
          });
        }
      }
    }
  };

  executeRounds(); // Start executing the rounds
};

import { Chess } from '/chessjs/chess.js';
import { createGameFen, checkForPieces, highlightSquare } from './chessUtils.mjs';
import { setUpPuzzleBoard } from './puzzleBoard.mjs';
import { watchFaqPanel } from './faq.mjs';
import { watchTimelineScroll } from './timeline.mjs';
import { resetFilters, watchActiveFilters, watchSliders } from './filters.mjs';

const setUpSampleBoards = (boardElements) => {
  if (!boardElements.length) return;

  boardElements.forEach((boardElement) => {
    // Get respective data from the webpage
    const boardName = boardElement.dataset['board-name'];
    const posFen = boardElement.dataset.fen;
    const gameFen = createGameFen(posFen);
    const maxMoves = Number(boardElement.dataset['max-moves']);

    // Get the game board's panel (all sampleBoards have a reset button and a move counter panel)
    const panel = document.querySelector(`.${boardName}`);
    const resetBtn = panel.children[0];
    const moveCounterPanel = panel.children[1];

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
    window.addEventListener('resize', () => {
      board.resize();
    });
  });
};

const setUpPositionBoards = (boardElements) => {
  if (!boardElements.length) return;

  boardElements.forEach((boardElement) => {
    // Get respective data from the webpage
    const posFen = boardElement.dataset.fen;
    let squaresToHighlight = boardElement.dataset['highlight-squares'];
    if (squaresToHighlight.length) squaresToHighlight = squaresToHighlight.split(',');

    const config = {
      position: posFen || 'start',
      pieceTheme: '/chesspieces/{piece}.svg',
    };

    const board = new Chessboard(boardElement, config);

    // Make a function so that it can be reused when the board is resized
    const highlightAllSquares = () => {
      if (squaresToHighlight && squaresToHighlight.length) {
        for (let square of squaresToHighlight) {
          highlightSquare(boardElement, square);
        }
      }
    };
    highlightAllSquares();

    // Handle dynamic board resizing
    window.addEventListener('resize', () => {
      board.resize();
      highlightAllSquares(); // Re-highlight the squares
    });
  });
};

const sliders = document.querySelectorAll('.slider > input');
const displayElement = document.querySelector('.rating-range-values');
if (sliders && displayElement) {
  watchSliders(sliders, displayElement);
}

const activeFiltersContainer = document.querySelector('.active-filters');
if (activeFiltersContainer) {
  watchActiveFilters(activeFiltersContainer);
}

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const ranges = document.querySelectorAll('input[type=range]');
const searchbar = document.querySelector('.searchbar > input[type=text]');
if (checkboxes.length && ranges.length && searchbar) {
  resetFilters(checkboxes, ranges, searchbar);
}

const sampleBoards = document.querySelectorAll('.sample-board');
setUpSampleBoards(sampleBoards);

const positionBoards = document.querySelectorAll('.position-board');
setUpPositionBoards(positionBoards);

const puzzleBoards = document.querySelector('.puzzle-board');
if (puzzleBoards) {
  setUpPuzzleBoard(puzzleBoards);
}

// Watch the faq panel (to open and close questions)
const faqPanel = document.querySelector('.faq-panel');
if (faqPanel) {
  watchFaqPanel(faqPanel);
}

const timeline = document.querySelector('.horizontal-timeline');
if (timeline) {
  watchTimelineScroll(timeline);
}

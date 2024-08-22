import { Chess, SQUARES } from '/chessjs/chess.js';
import { createGameFen, checkForPieces } from './chessUtils.mjs';

const getsliderValues = (sliders) => {
  let sliderLeft = Number(sliders[0].value);
  let sliderRight = Number(sliders[1].value);

  // Slider 1 must always be less than slider 2
  if (sliderLeft > sliderRight) {
    let tmp = sliderRight;
    sliderRight = sliderLeft;
    sliderLeft = tmp;
  }

  return { sliderLeft, sliderRight };
};

const watchSliders = (sliders, displayElement) => {
  if (!sliders || !displayElement) return;

  sliders.forEach((slider) => {
    slider.addEventListener('input', () => {
      // Get slider values and display them
      const { sliderLeft, sliderRight } = getsliderValues(sliders);
      displayElement.innerText = `${sliderLeft} - ${sliderRight}`;
    });
  });
};

const removeActiveFilter = (filterName) => {
  const filter = document.querySelector(`input[value="${filterName}"]`);
  const form = document.querySelector('form');
  filter.checked = false;

  form.submit();
};

const watchActiveFilters = (filterBox) => {
  if (!filterBox) return;

  filterBox.addEventListener('click', (e) => {
    const element = e.target;
    if (element.tagName === 'A') {
      const filterName = element.nextElementSibling.innerText;
      removeActiveFilter(filterName);
    }
  });
};

const resetFilters = (checkboxes, ranges) => {
  if (!checkboxes.length || !ranges.length) return;

  const resetBtn = document.querySelector('button[type=reset]');
  const form = document.querySelector('form');

  resetBtn.addEventListener('click', () => {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    ranges[0].value = 2500;
    ranges[1].value = 2900;

    form.submit();
  });
};

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
  });
};

const sliders = document.querySelectorAll('.slider > input');
const displayElement = document.querySelector('.rating-range-values');
watchSliders(sliders, displayElement);

const activeFiltersContainer = document.querySelector('.active-filters');
watchActiveFilters(activeFiltersContainer);

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const ranges = document.querySelectorAll('input[type=range]');
resetFilters(checkboxes, ranges);

const boardElements = document.querySelectorAll('.sample-board');
setUpSampleBoards(boardElements);

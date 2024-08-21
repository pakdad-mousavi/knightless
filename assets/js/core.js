import { Chess } from '/chessjs/chess.js';

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

const createGameFen = (fen, turn = 'w', castling = {}, enPassant = '-', halfmoves = '0', fullmoves = '0') => {
  //Handle castling notation
  let castlingNotation = '';
  
  if (Object.keys(castling).length === 0) {
    castlingNotation = '-';
  } else {
    const whiteKingSide = castling.white.kingSide ? 'K' : '';
    const whiteQueenSide = castling.white.queenSide ? 'Q' : '';
    const blackKingSide = castling.black.kingSide ? 'k' : '';
    const blackQueenSide = castling.black.queenSide ? 'q' : '';

    castlingNotation.concat(whiteKingSide, whiteQueenSide, blackKingSide, blackQueenSide);
  }

  return [fen, turn, castlingNotation, enPassant, halfmoves, fullmoves].join(' ');
};

const setUpSampleBoards = (boardElements) => {
  if (!boardElements.length) return;

  boardElements.forEach((boardElement) => {
    // Get respective data from the webpage
    const boardName = boardElement.dataset['board-name'];
    const posFen = boardElement.dataset.fen;
    const gameFen = createGameFen(posFen);
    const maxMoves = boardElement.dataset.maxMoves;

    // Get the game board's panel (all sampleBoards have a reset button and a move counter)
    const panel = document.querySelector(`.${boardName}`);
    const resetBtn = panel.children[0];
    const moveCounter = panel.children[1];

    // Create the game
    const game = new Chess();
    game.load(gameFen, { skipValidation: true });

    // Config event functions go here (onDrop, onChange, etc)
    const onDrop = (source, target, piece, newPosition) => {
      console.log(`From: ${source}`);
      console.log(`To: ${target}`);
    };

    // Create the config object for the gameboard
    const config = {
      draggable: true,
      position: gameFen,
      pieceTheme: '/chesspieces/{piece}.svg',
      onDrop: onDrop,
    };

    const board = new Chessboard(boardElement, config);

    // Handle the reset button
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      board.position(gameFen);
      game.load(gameFen, { skipValidation: true });
    });
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

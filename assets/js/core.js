import '../css/core.css';

import { highlightSquare, debounce } from './chessUtils.mjs';
import { setUpPuzzleBoard } from './puzzleBoard.mjs';
import { watchFaqPanel } from './faq.mjs';
import { watchTimelineScroll } from './timeline.mjs';
import { resetFilters, watchActiveFilters, watchFilterPanel, watchSliders } from './filters.mjs';
import { setUpSampleBoard } from './sampleBoard.mjs';

const setUpPositionBoards = (boardElements) => {
  if (!boardElements.length) return;

  boardElements.forEach((boardElement) => {
    // Get respective data from the webpage
    const posFen = boardElement.dataset.fen;
    let squaresToHighlight = boardElement.dataset.highlightSquares;
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
    const resizeBoard = () => {
      board.resize();
      highlightAllSquares(); // Re-highlight the squares
    };

    window.addEventListener('resize', debounce(resizeBoard));
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
for (const board of sampleBoards) {
  console.log(board)
  if (board) setUpSampleBoard(board);
}

const positionBoards = document.querySelectorAll('.position-board');
setUpPositionBoards(positionBoards);

const puzzleBoard = document.querySelector('.puzzle-board');
if (puzzleBoard) {
  setUpPuzzleBoard(puzzleBoard);
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

const filterPanels = document.querySelectorAll('.filter-panel');
for (const panel of filterPanels) {
  watchFilterPanel(panel);
}

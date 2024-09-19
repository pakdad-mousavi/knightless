import { setUpPuzzleBoard } from './puzzleBoard.mjs';
import { watchFaqPanel } from './faq.mjs';
import { watchTimelineScroll } from './timeline.mjs';
import { resetFilters, watchActiveFilters, watchFilterPanel, watchSliders } from './filters.mjs';
import { setUpSampleBoard } from './sampleBoard.mjs';
import { setUpPositionBoard } from './positionBoard.mjs';

// Keep track of slider values
const sliders = document.querySelectorAll('.slider > input');
const displayElement = document.querySelector('.rating-range-values');
if (sliders && displayElement) {
  watchSliders(sliders, displayElement);
}

// Watch filter panels (to open and close)
const filterPanels = document.querySelectorAll('.filter-panel');
for (const panel of filterPanels) {
  watchFilterPanel(panel);
}

// Watch active filters
const activeFiltersContainer = document.querySelector('.active-filters');
if (activeFiltersContainer) {
  watchActiveFilters(activeFiltersContainer);
}

// Reset all filters
const checkboxes = document.querySelectorAll('input[type=checkbox]');
const ranges = document.querySelectorAll('input[type=range]');
const searchbar = document.querySelector('.searchbar > input[type=text]');
if (checkboxes.length && ranges.length && searchbar) {
  resetFilters(checkboxes, ranges, searchbar);
}

// Set up all sample boards
const sampleBoards = document.querySelectorAll('.sample-board');
for (const board of sampleBoards) {
  setUpSampleBoard(board);
}

// Set up all position boards
const positionBoards = document.querySelectorAll('.position-board');
for (const board of positionBoards) {
  setUpPositionBoard(board);
}

// Set up puzzle board
const puzzleBoard = document.querySelector('.puzzle-board');
if (puzzleBoard) setUpPuzzleBoard(puzzleBoard);

// Watch the faq panel (to open and close questions)
const faqPanel = document.querySelector('.faq-panel');
if (faqPanel) watchFaqPanel(faqPanel);

// Watch the timeline (to update progress bar)
const timeline = document.querySelector('.horizontal-timeline');
if (timeline) watchTimelineScroll(timeline);

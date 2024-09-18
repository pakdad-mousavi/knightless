import '../css/core.css';

import { setUpPuzzleBoard } from './puzzleBoard.mjs';
import { watchFaqPanel } from './faq.mjs';
import { watchTimelineScroll } from './timeline.mjs';
import { resetFilters, watchActiveFilters, watchFilterPanel, watchSliders } from './filters.mjs';
import { setUpSampleBoard } from './sampleBoard.mjs';
import { setUpPositionBoard } from './positionBoard.mjs';

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
  setUpSampleBoard(board);
}

const positionBoards = document.querySelectorAll('.position-board');
for (const board of positionBoards) {
  setUpPositionBoard(board);
}

const puzzleBoard = document.querySelector('.puzzle-board');
if (puzzleBoard) setUpPuzzleBoard(puzzleBoard);

// Watch the faq panel (to open and close questions)
const faqPanel = document.querySelector('.faq-panel');
if (faqPanel) watchFaqPanel(faqPanel);

const timeline = document.querySelector('.horizontal-timeline');
if (timeline) watchTimelineScroll(timeline);

const filterPanels = document.querySelectorAll('.filter-panel');
for (const panel of filterPanels) {
  watchFilterPanel(panel);
}

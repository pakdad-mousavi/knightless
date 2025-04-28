import { setUpPuzzleBoard } from './puzzleBoard.mjs';
import { watchFaqPanel } from './faq.mjs';
import { watchTimelineScroll } from './timeline.mjs';
import { resetFilters, watchActiveFilters, watchSliders } from './filters.mjs';
import { setUpSampleBoard } from './sampleBoard.mjs';
import { setUpPositionBoard } from './positionBoard.mjs';
import { watchMegaMenus } from './megaMenu.mjs';
import { watchHomePageBanner } from './watchHomePageBanner.mjs';
import { watchTitleDividers } from './watchTitleDividers.mjs';
import { createMap } from './map.mjs';

// Watch mega menus in the header
const megaMenus = document.querySelectorAll('.mega-menu-panel');
watchMegaMenus(megaMenus);

// Watch homepage banner
const homePageVideo = document.querySelector('.banner-video');
const homePageTitle = document.querySelector('.banner-title');
if (homePageVideo && homePageTitle) {
  watchHomePageBanner(homePageVideo, homePageTitle);
}

// Watch the title dividers
const titleDividers = document.querySelectorAll('.title-divider');
for (const titleDivider of titleDividers) {
  watchTitleDividers(titleDivider);
}

// Keep track of slider values
const sliders = document.querySelectorAll('.slider > input');
const displayElement = document.querySelector('.rating-range-values');
if (sliders && displayElement) {
  watchSliders(sliders, displayElement);
}

// Watch active filters
const activeFiltersContainer = document.querySelector('.active-filters');
if (activeFiltersContainer) {
  watchActiveFilters(activeFiltersContainer);
}

// Reset all filters
const checkboxes = document.querySelectorAll('input[type=checkbox]');
const radios = document.querySelectorAll('input[type=radio]');
const searchbar = document.querySelector('.searchbar > input[type=text]');
if (checkboxes.length && radios.length && searchbar) {
  resetFilters(checkboxes, radios, searchbar);
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
const puzzleSection = document.querySelector('.puzzle-section');
const puzzleBoard = puzzleSection?.querySelector('.puzzle-board');
const feedbackMessage = puzzleSection?.querySelector('.feedback-message');
const nextPuzzleBtn = puzzleSection?.querySelector('.next-puzzle-btn');
if (puzzleSection && puzzleBoard) {
  document.documentElement.style.scrollBehavior = 'auto';
  // Scroll down to puzzle section
  const top = puzzleSection.getBoundingClientRect().top;
  if (window.top !== top + 20) {
    requestAnimationFrame(() => {
      window.scrollTo(0, top + 20);
    });
  }

  // Set up the board
  setUpPuzzleBoard(puzzleBoard, feedbackMessage, nextPuzzleBtn);
}

// Watch the faq panel (to open and close questions)
const faqPanel = document.querySelector('.faq-panel');
if (faqPanel) watchFaqPanel(faqPanel);

// Watch the timeline (to update progress bar)
const timeline = document.querySelector('.horizontal-timeline');
if (timeline) watchTimelineScroll(timeline);

const mapContainer = document.querySelector('.map-container');
if (mapContainer) createMap();

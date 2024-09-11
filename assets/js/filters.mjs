import { debounce } from "./chessUtils.mjs";

const DOWNARROWCLASS = 'icon-down-arrow';
const ROTATECLASS = '-rotate-180';
const HEADERHEIGHTCLASS = 'max-h-16';
const MINRANGEVALUE = 2500;
const MAXRANGEVALUE = 2900;

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

export const watchSliders = (sliders, displayElement) => {
  if (!sliders || !displayElement) return;

  sliders.forEach((slider) => {
    slider.addEventListener('input', () => {
      // Get slider values and display them
      const { sliderLeft, sliderRight } = getsliderValues(sliders);
      displayElement.innerText = `${sliderLeft} - ${sliderRight}`;
    });
  });
};

const removeActiveFilter = (filterName, isRange = false) => {
  const form = document.querySelector('form');

  // If it's the range, reset the range values
  if (isRange) {
    const sliders = form.querySelectorAll(`input[type="range"]`);
    sliders[0].value = MINRANGEVALUE;
    sliders[1].value = MAXRANGEVALUE;
  }
  // If not, then just uncheck the filter
  else {
    const filter = form.querySelector(`input[value="${filterName}"]`);
    filter.checked = false;
  }

  form.submit();
};

export const watchActiveFilters = (filterBox) => {
  // Remove filters on click
  filterBox.addEventListener('click', (e) => {
    const element = e.target;
    if (element.tagName === 'A' && !element.classList.contains(DOWNARROWCLASS)) {
      const filterName = element.nextElementSibling.innerText;
      const isRange = filterName.includes('rating');
      removeActiveFilter(filterName, isRange);
    }
  });

  // If there are no active filters, hide the arrow
  const items = filterBox.querySelectorAll('ul > li');
  const arrow = filterBox.querySelector('.icon-down-arrow');
  if (!items.length) {
    arrow.classList.add('hidden');
  }
  // If there are active filters, open the panel, rotate the arrow
  else {
    filterBox.classList.add('open');
    arrow.classList.add(ROTATECLASS);
  }
};

export const resetFilters = (checkboxes, ranges, searchbar) => {
  const resetBtn = document.querySelector('button[type=reset]');
  const form = document.querySelector('form');

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Uncheck all checkboxes and switches
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Reset ranges to original values
    ranges[0].value = MINRANGEVALUE;
    ranges[1].value = MAXRANGEVALUE;

    // Empty the searchbar
    searchbar.value = '';

    form.submit();
  });
};

export const watchFilterPanel = (panel) => {
  // Define variables
  let openHeight;
  let closed = !panel.classList.contains('open');

  // Used to update the panel height
  const updatePanelHeight = () => {
    openHeight = panel.scrollHeight;
    panel.style.maxHeight = closed ? null : `${openHeight}px`;
  };

  updatePanelHeight(); // Set initial panel height

  // Get new panel height if window is resized
  window.addEventListener('resize', debounce(updatePanelHeight));

  // Start off with completely minimized panels
  const arrow = panel.querySelector('a.icon-down-arrow');
  panel.classList.add(HEADERHEIGHTCLASS);

  // toggle the panel on click
  arrow.addEventListener('click', (e) => {
    e.preventDefault();
    panel.style.maxHeight = closed ? `${openHeight}px` : null;
    arrow.classList.toggle(ROTATECLASS);

    closed = closed ? false : true; // Update variable
  });
};

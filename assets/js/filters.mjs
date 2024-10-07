const MIN_RANGE_VALUE = 2500;
const MAX_RANGE_VALUE = 2900;
const ACTIVE_FILTER_CLASS = 'active-filter';
const FILTER_NAME_DATASET = 'filterName';
const PLAYER_QUERY_FORM = 'form.players-query-form';
const DEFAULT_RATING = 'input[type="radio"].default-value';

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

const removeActiveFilter = (filterName) => {
  const form = document.querySelector(PLAYER_QUERY_FORM);

  // If it's the range, reset the range values
  if (filterName === 'player-rating') {
    const defaultRadio = form.querySelector(DEFAULT_RATING);
    defaultRadio.checked = true;
  }
  // If not, then just uncheck the filter
  else {
    const filter = form.querySelector(`input[value="${filterName}"]`);
    filter.checked = false;
  }

  form.submit();
};

// Call the callback func when an active filter is clicked
const onClickActiveFilter = (activeFilterContainer, callback) => {
  activeFilterContainer.addEventListener('click', (e) => {
    e.preventDefault();
    const element = e.target.closest(`a.${ACTIVE_FILTER_CLASS}`); // Find the nearest 'a' tag with 'active-filter' class

    if (!element) return; // If no 'a.active-filter' was found, exit

    const isActiveFilter = element.classList.contains(ACTIVE_FILTER_CLASS);

    // If the element clicked is an active filter, then call callback with filterName param
    if (isActiveFilter) {
      const filterName = element.dataset[FILTER_NAME_DATASET];
      return callback(filterName);
    }
  });
};

const createEmptyFilterMessage = () => {
  const emptyFilterElement = document.createElement('div');
  emptyFilterElement.innerHTML = '<p>No active filters yet, maybe try adding some?</p>';
  emptyFilterElement.classList.add('text-birch');
  return emptyFilterElement;
};

const hasActiveFilters = (activeFilterContainer) => {
  return activeFilterContainer.children.length === 0;
};

const displayEmptyFilterMessageIfEmpty = (activeFilterContainer) => {
  const isEmpty = hasActiveFilters(activeFilterContainer);
  if (isEmpty) {
    const emptyFilterMessage = createEmptyFilterMessage();
    activeFilterContainer.insertAdjacentElement('beforebegin', emptyFilterMessage);
  }
};

// Watch active filters
export const watchActiveFilters = (activeFilterContainer) => {
  onClickActiveFilter(activeFilterContainer, removeActiveFilter);
  displayEmptyFilterMessageIfEmpty(activeFilterContainer);
};

export const resetFilters = (checkboxes, radios, searchbar) => {
  const resetBtn = document.querySelector('button[type=reset]');
  const form = document.querySelector(PLAYER_QUERY_FORM);

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Uncheck all checkboxes and switches
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    radios.forEach((radio) => {
      if (radio.classList.contains('default-value')) radio.checked = true;
    });

    // Empty the searchbar
    searchbar.value = '';

    form.submit();
  });
};

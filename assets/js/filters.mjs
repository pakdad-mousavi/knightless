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
    if (element.tagName === 'A') {
      const filterName = element.nextElementSibling.innerText;
      const isRange = filterName.includes('rating');
      removeActiveFilter(filterName, isRange);
    }
  });
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

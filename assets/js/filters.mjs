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

const removeActiveFilter = (filterName) => {
  const filter = document.querySelector(`input[value="${filterName}"]`);
  const form = document.querySelector('form');
  filter.checked = false;

  form.submit();
};

export const watchActiveFilters = (filterBox) => {
  // Remove filters on click
  filterBox.addEventListener('click', (e) => {
    const element = e.target;
    if (element.tagName === 'A' && !element.classList.contains(DOWNARROWCLASS)) {
      const filterName = element.nextElementSibling.innerText;
      removeActiveFilter(filterName);
    }
  });

  // If there are no active filters, hide the arrow
  const items = filterBox.querySelectorAll('ul > li');
  const arrow = filterBox.querySelector('.icon-down-arrow');
  if (!items.length) {
    arrow.classList.add('hidden');
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
  // Get the panel height 
  let openHeight = panel.scrollHeight;
  window.addEventListener('resize', () => {
    openHeight = panel.scrollHeight; // Get the new height if window is resized
  });

  let closed = true;

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

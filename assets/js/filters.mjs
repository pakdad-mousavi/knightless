const DOWNARROWCLASS = 'icon-down-arrow';
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
  filterBox.addEventListener('click', (e) => {
    const element = e.target;
    if (element.tagName === 'A' && !element.classList.contains(DOWNARROWCLASS)) {
      const filterName = element.nextElementSibling.innerText;
      removeActiveFilter(filterName);
    }
  });
};

export const resetFilters = (checkboxes, ranges) => {
  const resetBtn = document.querySelector('button[type=reset]');
  const form = document.querySelector('form');

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    ranges[0].value = MINRANGEVALUE;
    ranges[1].value = MAXRANGEVALUE;

    form.submit();
  });
};
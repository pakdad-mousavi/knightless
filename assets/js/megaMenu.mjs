const debounce = (func) => {
  let timeoutId;

  return function (...args) {
    // Clear the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, 200);
  };
};

export const watchMegaMenu = (menu, watchAll) => {
  // First menu child is always the button, second child is the menu itself
  const menuBtn = menu.querySelector('.mega-menu-btn');
  const megaMenu = menu.querySelector('.mega-menu-box');

  // Always have the menu items invisible at first
  megaMenu.style.display = 'none';
  megaMenu.style.opacity = 0;

  // Debounce the menu clicking
  const debouncedMenuHandler = debounce(handleMenuClick);
  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    debouncedMenuHandler(megaMenu, watchAll);
  });
};

const handleMenuClick = (megaMenu, watchAll) => {
  const menuIsClosed = megaMenu.style.display === 'grid' ? false : true;
  menuIsClosed ? fadeIn(megaMenu, watchAll) : fadeOut(megaMenu);
};

const fadeIn = (megaMenu, watchAll) => {
  if (watchAll) {
    // Get all the menus in the document
    const menus = document.querySelectorAll('.mega-menu-panel');
    for (const menu of menus) {
      const siblingMegaMenu = menu.querySelector('.mega-menu-box');
      const menuSiblingIsClosed = siblingMegaMenu.style.display === 'grid' ? false : true;
      // If any menus are currently open, close them
      if (!menuSiblingIsClosed) {
        fadeOut(siblingMegaMenu);
      }
    }
  }

  // Fade in animation
  megaMenu.style.display = 'grid';
  window.setTimeout(() => {
    megaMenu.style.opacity = megaMenu.style.opacity == 0 ? 1 : 0;
  }, 50);
};

const fadeOut = (megaMenu) => {
  // Fade out animation
  megaMenu.style.opacity = megaMenu.style.opacity == 0 ? 1 : 0;
  window.setTimeout(() => {
    megaMenu.style.display = 'none';
  }, 300);
};

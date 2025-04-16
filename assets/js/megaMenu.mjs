const fadeIn = (menu) => {
  menu.style.display = 'grid';
  window.setTimeout(() => {
    menu.style.opacity = '1';
    menu.style.top = '48px';
  }, 10);
};

const fadeOut = (menu) => {
  menu.style.opacity = '0';
  menu.style.top = '32px';
  window.setTimeout(() => {
    menu.style.display = 'none';
  }, 300);
};

export const watchMegaMenus = (megaMenuPanels) => {
  for (const panel of megaMenuPanels) {
    let isOpen = false;
    const button = panel.querySelector('.mega-menu-btn');
    const megaMenu = panel.querySelector('.mg-menu');

    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (isOpen) {
        fadeOut(megaMenu);
        isOpen = false;
      } else {
        fadeIn(megaMenu);
        isOpen = true;
      }
    });

    document.body.addEventListener('click', (e) => {
      const target = e.target.closest('.mega-menu-btn');
      if (target !== button) {
        fadeOut(megaMenu);
        isOpen = false;
      }
    });
  }
};

const OPENEDCLASS = 'opened';
const CONTENT_CLASS = 'content';
const ICONARROWCLASS = 'icon-down-arrow';
const ROTATECLASS = 'rotate-180';
const FAQQUESTIONCLASS = 'faq-question';

// Function to toggle a given panel
const togglePanel = (panel) => {
  const content = panel.querySelector(`.${CONTENT_CLASS}`);
  const isOpen = panel.classList.contains(OPENEDCLASS);
  panel.classList.toggle(OPENEDCLASS, !isOpen); // Toggle opened state
  content.style.maxHeight = isOpen ? null : `${content.scrollHeight}px`; // Show or hide content
  panel.querySelector(`.${ICONARROWCLASS}`).classList.toggle(ROTATECLASS, !isOpen); // Rotate arrow
};

const updateHeight = (openPanel) => {
  const content = openPanel.querySelector(`.${CONTENT_CLASS}`);
  content.style.maxHeight = `${content.scrollHeight}px`; // Update the max height
};

export const watchFaqPanel = (faqPanel) => {
  // If the window is resized, then update the max height of the open panel (if open)
  window.addEventListener('resize', () => {
    const openPanel = faqPanel.querySelector(`.${FAQQUESTIONCLASS}.${OPENEDCLASS}`);
    if (openPanel) {
      updateHeight(openPanel);
    }
  });

  faqPanel.addEventListener('click', (e) => {
    e.preventDefault();

    // Find the clicked FAQ question element
    const clickedQuestion = e.target.closest(`.${FAQQUESTIONCLASS}`);
    if (!clickedQuestion) return; // Exit if click is not on a FAQ question

    // Find the currently open FAQ question
    const openQuestion = faqPanel.querySelector(`.${FAQQUESTIONCLASS}.${OPENEDCLASS}`);

    // If there is an open question and it's not the one clicked, toggle it
    if (openQuestion && openQuestion !== clickedQuestion) {
      // closePanel(openQuestion);
      togglePanel(openQuestion);
      togglePanel(clickedQuestion);
    }
    // If there's no open question or it's the one clicked, toggle it
    else {
      togglePanel(clickedQuestion);
    }
  });
};

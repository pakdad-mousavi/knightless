const OPENEDCLASS = 'opened';
const ICONARROWCLASS = 'icon-arrow';
const ROTATECLASS = 'rotate-180';
const FAQQUESTIONCLASS = 'faq-question';

// Function to close a given panel
const closePanel = (panel) => {
  panel.classList.remove(OPENEDCLASS);
  panel.children[1].style.maxHeight = null; // Hide content
  panel.querySelector(`.${ICONARROWCLASS}`).classList.remove(ROTATECLASS); // Rotate arrow back
};

// Function to toggle a given panel
const togglePanel = (panel) => {
  const content = panel.children[1];
  const isOpen = panel.classList.contains(OPENEDCLASS);
  panel.classList.toggle(OPENEDCLASS, !isOpen); // Toggle opened state
  content.style.maxHeight = isOpen ? null : `${content.scrollHeight}px`; // Show or hide content
  panel.querySelector(`.${ICONARROWCLASS}`).classList.toggle(ROTATECLASS, !isOpen); // Rotate arrow
};

export const watchFaqPanel = (faqPanel) => {
  faqPanel.addEventListener('click', (e) => {
    e.preventDefault();

    // Find the clicked FAQ question element
    const clickedQuestion = e.target.closest(`.${FAQQUESTIONCLASS}`);
    if (!clickedQuestion) return; // Exit if click is not on a FAQ question

    // Find the currently open FAQ question
    const openQuestion = faqPanel.querySelector(`.${FAQQUESTIONCLASS}.${OPENEDCLASS}`);

    // If there is an open question and it's not the one clicked, close it
    if (openQuestion && openQuestion !== clickedQuestion) {
      closePanel(openQuestion);
    }

    // Toggle the clicked FAQ question
    togglePanel(clickedQuestion);
  });
};

import { setUpSampleBoard, destroySampleBoard } from './sampleBoard.mjs';

// Debounce utility
const debounce = (fn, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
};

export const handleTacticDisplays = (tacticBtnsContainer, tacticBoardsContainer, tacticInfoContainer) => {
  const boards = Array.from(tacticBoardsContainer.querySelectorAll('.sample-board'));
  const tacticTexts = Array.from(tacticInfoContainer.children);

  // Hide all non-active tactic boards and texts initially
  boards.forEach((board) => {
    if (!board.classList.contains('active-tactic-board')) {
      board.remove();
      board.style.display = 'none';
    }
  });

  tacticTexts.forEach((text) => {
    if (!text.classList.contains('active-tactic-text')) {
      text.style.display = 'none';
    }
  });

  const handleTacticClick = (e) => {
    const button = e.target.closest('button[data-tactic]');
    if (!button) return;

    const selectedTactic = button.dataset.tactic;
    if (button.classList.contains('active-tactic')) return;

    // Toggle buttons
    const activeBtn = tacticBtnsContainer.querySelector('.active-tactic');
    if (activeBtn) activeBtn.classList.remove('active-tactic');
    button.classList.add('active-tactic');

    // Toggle boards
    boards.forEach((board) => {
      if (board.dataset.tactic === selectedTactic) {
        tacticBoardsContainer.appendChild(board);
        board.style.display = '';
        setUpSampleBoard(board);
      } else {
        destroySampleBoard(board);
        board.remove();
        board.style.display = 'none';
      }
    });

    // Toggle texts
    tacticTexts.forEach((text) => {
      text.style.display = text.dataset.tactic === selectedTactic ? '' : 'none';
    });
  };

  tacticBtnsContainer.addEventListener('click', debounce(handleTacticClick, 100));
};

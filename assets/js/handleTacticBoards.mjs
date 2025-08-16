import { setUpSampleBoard, destroySampleBoard } from './sampleBoard.mjs';

export const handleTacticBoards = (tacticBtnsContainer, tacticBoardsContainer) => {
  const boards = tacticBoardsContainer.querySelectorAll('.sample-board');

  // Initially hide all none-active tactic boards
  for (const board of boards) {
    if (!board.classList.contains('active-tactic-board')) {
      board.remove();
      board.style.display = 'none';
    }
  }

  // Debounce utility
  const debounce = (fn, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const handleTacticClick = (e) => {
    // If a tactic is changed:
    const button = e.target;
    if (button.tagName === 'BUTTON') {
      const selectedTactic = button.dataset.tactic;
      const isButtonActive = button.classList.contains('active-tactic');

      if (isButtonActive) {
        return;
      }

      // Toggle buttons
      const activeTactic = tacticBtnsContainer.querySelector('.active-tactic');
      activeTactic.classList.toggle('active-tactic');
      button.classList.toggle('active-tactic');

      // Toggle off boards
      for (const board of boards) {
        if (board.dataset.tactic !== selectedTactic) {
          destroySampleBoard(board);
          board.remove();
          board.style.display = 'none';
        }
      }

      // Toggle active board
      const boardToSetup = [...boards].find((b) => b.dataset.tactic === selectedTactic);
      tacticBoardsContainer.appendChild(boardToSetup);
      boardToSetup.style.display = null;
      setUpSampleBoard(boardToSetup);
    }
  };

  tacticBtnsContainer.addEventListener('click', debounce(handleTacticClick, 100));
};

import { highlightSquare, debounce } from './chessUtils.mjs';

export const setUpPositionBoard = (boardElement) => {
  // Get respective data from the webpage
  const posFen = boardElement.dataset.fen;
  let squaresToHighlight = boardElement.dataset.highlightSquares;
  if (squaresToHighlight.length) squaresToHighlight = squaresToHighlight.split(',');

  const config = {
    position: posFen || 'start',
    pieceTheme: '/chesspieces/{piece}.svg',
  };

  const board = new Chessboard(boardElement, config);

  // Make a function so that it can be reused when the board is resized
  const highlightAllSquares = () => {
    if (squaresToHighlight && squaresToHighlight.length) {
      for (let square of squaresToHighlight) {
        highlightSquare(boardElement, square);
      }
    }
  };
  highlightAllSquares();

  // Handle dynamic board resizing
  const resizeBoard = () => {
    board.resize();
    highlightAllSquares(); // Re-highlight the squares
  };

  window.addEventListener('resize', debounce(resizeBoard));
};

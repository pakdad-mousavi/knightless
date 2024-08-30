import { SQUARES } from '/chessjs/chess.js';
const HIGHLIGHTCLASSES = ['in-check-black', 'in-check-white', 'highlighted-black', 'highlighted-white', 'move-highlight-black', 'move-highlight-white'];


export const createGameFen = (fen, turn = 'w', castling = {}, enPassant = '-', halfmoves = '0', fullmoves = '0') => {
  //Handle castling notation
  let castlingNotation = '';

  if (Object.keys(castling).length === 0) {
    castlingNotation = '-';
  } else {
    const whiteKingSide = castling.white.kingSide ? 'K' : '';
    const whiteQueenSide = castling.white.queenSide ? 'Q' : '';
    const blackKingSide = castling.black.kingSide ? 'k' : '';
    const blackQueenSide = castling.black.queenSide ? 'q' : '';

    castlingNotation.concat(whiteKingSide, whiteQueenSide, blackKingSide, blackQueenSide);
  }

  return [fen, turn, castlingNotation, enPassant, halfmoves, fullmoves].join(' ');
};

export const checkForPieces = (game, type, color) => {
  for (let square of SQUARES) {
    const item = game.get(square);

    if (item !== null && item.type === type && item.color === color) {
      return square;
    }
  }
  return false;
};

export const highlightSquare = (boardElement, square, cssClass = null) => {
  const box = boardElement.querySelector(`.square-${square}`);

  if (cssClass) {
    const highlightClass = box.classList.contains('white-1e1d7') ? `${cssClass}-white` : `${cssClass}-black`;
    box.classList.add(highlightClass);
    return box.classList.add(cssClass);
  }

  const highlightClass = box.classList.contains('white-1e1d7') ? 'highlighted-white' : 'highlighted-black';
  box.classList.add(highlightClass);
};

export const removeAllHighlights = (boardElement) => {
  const sqrs = boardElement.querySelectorAll('.square-55d63');
  sqrs.forEach((sqr) => {
    for (let highlight of HIGHLIGHTCLASSES) {
      sqr.classList.remove(highlight);
    }
  });
};

export const highlightChecks = (game, boardElement) => {
  if (game.inCheck()) {
    const square = checkForPieces(game, 'k', game.turn());
    highlightSquare(boardElement, square, 'in-check');
  }
};

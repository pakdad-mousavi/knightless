import { SQUARES } from '/chessjs/chess.js';

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
      return true;
    }
  }
  return false;
};

export const highlightSquare = (boardElement, square) => {
  const box = boardElement.querySelector(`.square-${square}`);
  // console.log(box);
  if (box.classList.contains('white-1e1d7')) {
    box.classList.add('highlighted-white');
  } else {
    box.classList.add('highlighted-black');
  }
};

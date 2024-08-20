const pieces = ['Pawn', 'Knight', 'Bishop', 'Rook', 'Queen', 'King'];

export const getOtherPieces = (excludedPiece) => {
  return pieces.filter((piece) => piece !== excludedPiece);
};

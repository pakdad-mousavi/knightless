const movements = Object.freeze({
  knight: [
    {
      startingPosition: '8/8/8/8/3N4/8/8/8',
      moves: ['d4e6', 'e6f4', 'f4g2', 'g2e3', 'e3f5', 'f5d4'],
      squaresToHighlight: [['d4', 'd5', 'd6', 'e6']],
    },
    {
      startingPosition: '8/8/8/2ppp3/2pNp3/2ppp3/8/8',
      moves: ['d4e6', 'e6f4', 'f4e2', 'e2d4', 'd4c6', 'c6b4', 'b4c2', 'c2d4'],
      squaresToHighlight: [['c6', 'e6', 'f5', 'f3', 'e2', 'c2', 'b3', 'b5']],
    },
  ],
});

export const getMovementInfoFromPiece = (piece) => {
  const validKeys = Object.keys(movements);
  if (!validKeys.includes(piece)) return null;
  return movements[piece];
};

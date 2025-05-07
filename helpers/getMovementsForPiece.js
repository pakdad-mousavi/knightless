const movements = Object.freeze({
  knight: [
    {
      startingPosition: '8/8/8/8/3N4/8/8/8',
      moves: ['', '', '', '', '', '', '', '', ''],
      squaresToHighlight: [
        {
          squares: ['d4', 'd5', 'd6', 'e6'],
          arrows: [{ orig: 'd4', dest: 'e6' }],
          color: 'gray',
        },
        {
          squares: ['d4', 'd5', 'd6', 'c6'],
          arrows: [{ orig: 'd4', dest: 'c6' }],
          color: 'gray',
        },
        {
          squares: ['d4', 'c4', 'b4', 'b5'],
          arrows: [{ orig: 'd4', dest: 'b5' }],
          color: 'gray',
        },
        {
          squares: ['d4', 'c4', 'b4', 'b3'],
          arrows: [{ orig: 'd4', dest: 'b3' }],
          color: 'gray',
        },
        {
          squares: ['d4', 'd3', 'd2', 'c2'],
          arrows: [{ orig: 'd4', dest: 'c2' }],
          color: 'gray',
        },
        {
          squares: ['d4', 'd3', 'd2', 'e2'],
          arrows: [{ orig: 'd4', dest: 'e2' }],
          color: 'gray',
        },
        {
          squares: ['d4', 'e4', 'f4', 'f3'],
          arrows: [{ orig: 'd4', dest: 'f3' }],
          color: 'gray',
        },
        {
          squares: ['d4', 'e4', 'f4', 'f5'],
          arrows: [{ orig: 'd4', dest: 'f5' }],
          color: 'gray',
        },
        {
          squares: ['c6', 'e6', 'f5', 'f3', 'e2', 'c2', 'b3', 'b5', 'd4'],
          arrows: [
            { orig: 'd4', dest: 'e6' },
            { orig: 'd4', dest: 'c6' },
            { orig: 'd4', dest: 'b5' },
            { orig: 'd4', dest: 'b3' },
            { orig: 'd4', dest: 'c2' },
            { orig: 'd4', dest: 'e2' },
            { orig: 'd4', dest: 'f3' },
            { orig: 'd4', dest: 'f5' },
          ],
          color: 'gray',
        },
      ],
    },
    {
      startingPosition: '8/8/8/2ppp3/2pNp3/2ppp3/8/8',
      moves: ['d4e6', 'e6f4', 'f4e2', 'e2d4', 'd4c6', 'c6b4', 'b4c2', 'c2d4'],
      squaresToHighlight: [
        {
          squares: ['c6', 'e6', 'f5', 'f3', 'e2', 'c2', 'b3', 'b5', 'd4'],
          arrows: [],
          color: 'gray',
        },
      ],
    },
  ],
});

export const getMovementInfoFromPiece = (piece) => {
  const validKeys = Object.keys(movements);
  if (!validKeys.includes(piece)) return null;
  return movements[piece];
};

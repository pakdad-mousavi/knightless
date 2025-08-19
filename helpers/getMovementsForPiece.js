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
  rook: [
    {
      startingPosition: '8/8/8/8/3R4/8/8/8',
      moves: ['d4f4', ''],
      squaresToHighlight: [
        {
          squares: ['d4', 'd3', 'd2', 'd1', 'c4', 'b4', 'a4', 'e4', 'f4', 'g4', 'h4', 'd5', 'd6', 'd7', 'd8'],
          arrows: [
            { orig: 'c4', dest: 'a4' },
            { orig: 'e4', dest: 'h4' },
            { orig: 'd3', dest: 'd1' },
            { orig: 'd5', dest: 'd8' },
          ],
          color: 'gray',
        },
        {
          squares: ['f5', 'f6', 'f7', 'f8', 'f3', 'f2', 'f1', 'e4', 'g4', 'h4', 'c4', 'b4', 'a4', 'f4'],
          arrows: [
            { orig: 'e4', dest: 'a4' },
            { orig: 'g4', dest: 'h4' },
            { orig: 'f3', dest: 'f1' },
            { orig: 'f5', dest: 'f8' },
          ],
          color: 'gray',
        },
      ],
    },
    {
      startingPosition: '8/8/p1p1p2p/8/8/p2R1p1p/8/5p2',
      moves: ['d3a3', 'a3a6', 'a6c6', 'c6e6', 'e6h6', 'h6h3', 'h3f3', 'f3f1'],
      squaresToHighlight: [],
    },
  ],
  queen: [
    {
      startingPosition: '8/8/8/8/3Q4/8/8/8',
      moves: ['d4e4', ''],
      squaresToHighlight: [
        {
          squares: ['c4', 'b4', 'a4', 'd3', 'd2', 'd1', 'e4', 'f4', 'g4', 'h4', 'd5', 'd6', 'd7', 'd8', 'c5', 'b6', 'a7', 'e3', 'f2', 'g1', 'c3', 'b2', 'a1', 'e5', 'f6', 'g7', 'h8', 'd4'],
          arrows: [
            { orig: 'd4', dest: 'd8' },
            { orig: 'd4', dest: 'h4' },
            { orig: 'd4', dest: 'd1' },
            { orig: 'd4', dest: 'a4' },
            { orig: 'd4', dest: 'g1' },
            { orig: 'd4', dest: 'a1' },
            { orig: 'd4', dest: 'a7' },
            { orig: 'd4', dest: 'h8' },
          ],
          color: 'gray',
        },
        {
          squares: ['f3', 'g2', 'h1', 'c2', 'b1', 'g6', 'h7', 'd4', 'c4', 'b4', 'a4', 'f4', 'g4', 'h4', 'e5', 'e6', 'e7', 'e8', 'e3', 'e2', 'e1', 'd3', 'f5', 'd5', 'c6', 'b7', 'a8'],
          arrows: [
            { orig: 'e4', dest: 'e8' },
            { orig: 'e4', dest: 'h4' },
            { orig: 'e4', dest: 'e1' },
            { orig: 'e4', dest: 'a4' },
            { orig: 'e4', dest: 'a8' },
            { orig: 'e4', dest: 'h7' },
            { orig: 'e4', dest: 'h1' },
            { orig: 'e4', dest: 'b1' },
          ],
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

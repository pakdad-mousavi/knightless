const tactics = Object.freeze({
  knight: {
    forks: [
      {
        startingPosition: 'rnbqkb1r/1p3ppp/p3pn2/1Npp4/3P1B2/5N2/PPP1PPPP/R2QKB1R',
        moves: ['b5c7', 'e8d7', 'c7a8'],
        squaresToHighlight: [
          {
            squares: ['b5', 'c7'],
            arrows: [{ orig: 'b5', dest: 'c7' }],
            color: 'gray',
          },
          {
            squares: ['c7', 'a8', 'e8'],
            arrows: [
              { orig: 'c7', dest: 'a8' },
              { orig: 'c7', dest: 'e8' },
            ],
            color: 'red',
          },
          {
            squares: ['c7', 'a8'],
            arrows: [{ orig: 'c7', dest: 'a8' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '8/2q5/1k6/1p4r1/pPpN4/P1P5/1K1R4/8',
        moves: ['d4e6', 'c7g3', 'e6g5'],
        squaresToHighlight: [
          {
            squares: ['d4', 'e6'],
            arrows: [{ orig: 'd4', dest: 'e6' }],
            color: 'gray',
          },
          {
            squares: ['e6', 'c7', 'g5'],
            arrows: [
              { orig: 'e6', dest: 'c7' },
              { orig: 'c7', dest: 'g5' },
            ],
            color: 'red',
          },
          {
            squares: ['e6', 'g5'],
            arrows: [{ orig: 'e6', dest: 'g5' }],
            color: 'red',
          },
        ],
      },
    ],
    smotheredMate: [
      {
        startingPosition: '3r2rk/pp4pp/1qp4N/8/8/4P3/PP3PPP/R4RK1',
        moves: ['h6f7', ''],
        squaresToHighlight: [
          {
            squares: ['h6', 'f7'],
            arrows: [{ orig: 'h6', dest: 'f7' }],
            color: 'gray',
          },
          {
            squares: ['f7', 'h8'],
            arrows: [{ orig: 'f7', dest: 'h8' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: 'r4rk1/p7/1q2b2p/3p1pp1/2P2p2/8/PPQN1nPP/R1B2RK1',
        moves: ['f2h3', 'g1h1', 'b6g1', 'f1g1', 'h3f2', ''],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['g1', 'h3', 'b6'],
            arrows: [
              { orig: 'h3', dest: 'g1' },
              { orig: 'b6', dest: 'g1' },
            ],
            color: 'red',
          },
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['g1', 'h1'],
            arrows: [{ orig: 'g1', dest: 'h1' }],
            color: 'red',
          },
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['f2', 'h1'],
            arrows: [{ orig: 'f2', dest: 'h1' }],
            color: 'red',
          },
        ],
      },
    ],
  },
});

export const getTacticInfoFromPieceAndTactic = (piece, tactic) => {
  // Make sure piece is valid
  const validKeys = Object.keys(tactics);
  if (!validKeys.includes(piece)) return null;

  // Make sure tactic is valid
  const pieceTactics = tactics[piece];
  const tacticKeys = Object.keys(pieceTactics);
  if (!tacticKeys.includes(tactic)) return null;

  // Return the tactic
  return pieceTactics[tactic];
};

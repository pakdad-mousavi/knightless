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
    smotheredMate: {},
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

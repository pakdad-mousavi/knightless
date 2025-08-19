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
  rook: {
    backrankMate: [
      {
        startingPosition: '6k1/5ppp/1r6/8/8/7P/5PP1/3R2K1',
        moves: ['d1d8', ''],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['d8', 'g8'],
            arrows: [{ orig: 'd8', dest: 'g8' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '1r4k1/p4pp1/1p1p1r1p/2p3q1/8/P2B3P/1PP1QPP1/4R1K1',
        moves: ['e2e8', 'b8e8', 'e1e8', ''],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['e8', 'g8', 'd3', 'h7'],
            arrows: [
              { orig: 'e8', dest: 'g8' },
              { orig: 'd3', dest: 'h7' },
            ],
            color: 'red',
          },
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['e8', 'g8'],
            arrows: [{ orig: 'e8', dest: 'g8' }],
            color: 'red',
          },
        ],
      },
    ],
    pins: [
      {
        startingPosition: '8/3K4/6R1/8/k2n4/8/8/8',
        moves: ['g6g4', 'a4b3', 'g4d4'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['g4', 'd4', 'a4'],
            arrows: [{ orig: 'g4', dest: 'a4' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '8/1q2k2p/p1p2pr1/1p1n3Q/4b3/P7/1P3PPP/R4RK1',
        moves: ['a1e1', 'e7f7', 'e1e4'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['e1', 'e4', 'e7'],
            arrows: [{ orig: 'e1', dest: 'e7' }],
            color: 'red',
          },
        ],
      },
    ],
    skewers: [
      {
        startingPosition: '8/8/3k3r/8/8/1R6/6K1/8',
        moves: ['b3b6', 'd6c5', 'b6h6'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['b6', 'd6', 'h6'],
            arrows: [{ orig: 'b6', dest: 'h6' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: 'r4rk1/p2np1bp/1p3pp1/2p5/2Pq4/1P3PP1/P1Q2RKP/8',
        moves: ['f2d2', 'd4e5', 'd2d7'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['d2', 'd4', 'd7'],
            arrows: [{ orig: 'd2', dest: 'd7' }],
            color: 'red',
          },
        ],
      },
    ],
    forks: [
      {
        startingPosition: '8/6k1/8/8/8/1PRR4/1KP5/6q1',
        moves: ['d3g3', 'g1g3', 'c3g3'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['g1', 'g3', 'g7'],
            arrows: [
              { orig: 'g3', dest: 'g1' },
              { orig: 'g3', dest: 'g7' },
            ],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '6k1/p4p1p/1pn2bp1/2p5/4P3/2P2PP1/PP1R1K1P/8',
        moves: ['d2d6', 'c6e5', 'd6f6'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['c6', 'd6', 'f6'],
            arrows: [
              { orig: 'd6', dest: 'c6' },
              { orig: 'd6', dest: 'f6' },
            ],
            color: 'red',
          },
        ],
      },
    ],
    batteries: [
      {
        startingPosition: '2r2r1k/pbqn1ppp/1p2p3/3p4/3P4/1Q2PNP1/PP1NKPPR/7R',
        moves: ['h2h7', 'h8g8', 'h7h8'],
        squaresToHighlight: [
          {
            squares: ['h1', 'h2', 'h7'],
            arrows: [{ orig: 'h1', dest: 'h7' }],
            color: 'red',
          },
          {
            squares: ['h1', 'h7', 'h8'],
            arrows: [{ orig: 'h1', dest: 'h8' }],
            color: 'red',
          },
        ],
      },
    ],
  },
  queen: {
    centralization: [
      {
        startingPosition: 'kr2qb1N/ppQ5/2b3p1/1N5p/6nP/1P4P1/P1P1BP2/R1BR2K1',
        moves: ['e8e5', ''],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['a1', 'h8', 'c7', 'b5', 'e2', 'g3'],
            arrows: [
              { orig: 'e5', dest: 'a1' },
              { orig: 'e5', dest: 'h8' },
              { orig: 'e5', dest: 'c7' },
              { orig: 'e5', dest: 'b5' },
              { orig: 'e5', dest: 'e2' },
              { orig: 'e5', dest: 'g3' },
            ],
            color: 'red',
          },
        ],
      },
    ],
    pins: [
      {
        startingPosition: '2k5/8/8/5r2/8/1K1Q4/8/8',
        moves: ['d3h3', 'c8c7', 'h3f5'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['h3', 'f5', 'c8'],
            arrows: [{ orig: 'h3', dest: 'c8' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '6k1/pppb1ppp/6q1/3p4/3P4/2P4P/PP2QPP1/3R1RK1',
        moves: ['d7h3', ''],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['g6', 'g2', 'g1'],
            arrows: [{ orig: 'g6', dest: 'g1' }],
            color: 'red',
          },
        ],
      },
    ],
    skewers: [
      {
        startingPosition: '5r2/4r3/8/2k5/8/7Q/3K4/8',
        moves: ['h3a3', 'c5c6', 'a3e7'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['a3', 'c5', 'e7', 'f8'],
            arrows: [{ orig: 'a3', dest: 'f8' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '7k/ppp2npp/2n2p1q/3r4/6Q1/P2NP1P1/1PP4P/K2R3R',
        moves: ['g4c4', 'c6e7', 'e3e4', 'd5d8', 'c4f7'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['c4', 'd5', 'f7'],
            arrows: [{ orig: 'c4', dest: 'f7' }],
            color: 'red',
          },
          {
            squares: ['e7', 'd5'],
            arrows: [{ orig: 'e7', dest: 'd5' }],
            color: 'red',
          },
          {
            squares: ['c4', 'e4', 'd5', 'f7'],
            arrows: [
              { orig: 'e4', dest: 'd5' },
              { orig: 'c4', dest: 'f7' },
            ],
            color: 'red',
          },
        ],
      },
    ],
    forks: [
      {
        startingPosition: '8/3r2k1/8/8/8/8/1K2Q3/8',
        moves: ['e2g4', 'g7f6', 'g4d7'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['g4', 'd7', 'g7'],
            arrows: [
              { orig: 'g4', dest: 'd7' },
              { orig: 'g4', dest: 'g7' },
            ],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '6R1/8/q7/8/8/1K2N2k/8/8',
        moves: ['a6e6', 'e3c4', 'e6g8'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['e6', 'b3', 'e3', 'g8'],
            arrows: [
              { orig: 'e6', dest: 'b3' },
              { orig: 'e6', dest: 'e3' },
              { orig: 'e6', dest: 'g8' },
            ],
            color: 'red',
          },
        ],
      },
    ],
    batteries: [
      {
        startingPosition: 'rr4k1/2pbqpb1/3p2pp/pp6/4PN2/PB1Q4/1PP2PPP/1K1R3R',
        moves: ['e7f6', 'f4e2', 'f6b2'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['g7', 'f6', 'b2', 'f4'],
            arrows: [
              { orig: 'g7', dest: 'b2' },
              { orig: 'f6', dest: 'f4' },
            ],
            color: 'red',
          },
        ],
      },
    ],
  },
  king: {
    castling: [
      {
        startingPosition: 'r2qr1k1/pppb1pp1/1bnp1n1p/4p3/2B1P3/2NPBN1P/PPPQ1PP1/R3K2R',
        moves: ['e1g1'],
        squaresToHighlight: [
          {
            squares: ['e1', 'h1'],
            arrows: [{ orig: 'e1', dest: 'h1' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: 'r2qr1k1/pppb1pp1/1bnp1n1p/4p3/2B1P3/2NPBN1P/PPPQ1PP1/R3K2R',
        moves: ['e1a1'],
        squaresToHighlight: [
          {
            squares: ['e1', 'a1'],
            arrows: [{ orig: 'e1', dest: 'a1' }],
            color: 'red',
          },
        ],
      },
    ],
    forks: [
      {
        startingPosition: '8/8/8/1k2nb2/8/6K1/8/8',
        moves: ['g3f4', 'f5b1', 'f4e5'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['e5', 'f5', 'f4'],
            arrows: [
              { orig: 'f4', dest: 'e5' },
              { orig: 'f4', dest: 'f5' },
            ],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '8/2R5/8/8/1rpr1k2/8/2K5/8',
        moves: ['c2c3', 'd4d3', 'c3b4'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['b4', 'd4', 'c3'],
            arrows: [
              { orig: 'c3', dest: 'b4' },
              { orig: 'c3', dest: 'd4' },
            ],
            color: 'red',
          },
        ],
      },
    ],
    opposition: [
      {
        startingPosition: '8/2k5/8/8/2PK4/8/8/8',
        moves: ['d4c5', 'c7d7', 'c5b6', 'd7c8', 'c4c5', 'c8d7', 'b6b7', ''],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['b6', 'c6', 'd6'],
            arrows: [
              { orig: 'c5', dest: 'b6' },
              { orig: 'c5', dest: 'c6' },
              { orig: 'c5', dest: 'd6' },
            ],
            color: 'red',
          },
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['c6', 'c7'],
            arrows: [
              { orig: 'b6', dest: 'c6' },
              { orig: 'b6', dest: 'c7' },
            ],
            color: 'red',
          },
          {
            squares: [],
            color: 'red',
          },
          {
            squares: [],
            color: 'red',
          },
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['c6', 'c7', 'c8'],
            arrows: [
              { orig: 'b7', dest: 'c8' },
              { orig: 'b7', dest: 'c7' },
              { orig: 'b7', dest: 'c6' },
            ],
            color: 'red',
          },
        ],
      },
    ],
  },
  pawn: {
    passedPawn: [
      {
        startingPosition: '5k2/p4ppp/1p6/2pPp3/2P1K3/1P6/P4PPP/8',
        moves: [''],
        squaresToHighlight: [
          {
            squares: ['c6', 'd6', 'e6'],
            arrows: [{ orig: 'd5', dest: 'd6' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '8/8/3pk3/pp6/2PP4/P1K5/8/8',
        moves: ['c4b5', ''],
        squaresToHighlight: [
          {
            squares: ['c4', 'b5'],
            arrows: [{ orig: 'c4', dest: 'b5' }],
            color: 'red',
          },
          {
            squares: ['b5', 'b6', 'b7', 'b8'],
            arrows: [{ orig: 'b5', dest: 'b8' }],
            color: 'red',
          },
        ],
      },
    ],
    forks: [
      {
        startingPosition: 'r1bqr1k1/ppp2pbp/2np1np1/4p3/3P4/2PBPNB1/PP1N1PPP/R2Q1RK1',
        moves: ['e5e4', 'd3c2', 'e4f3'],
        squaresToHighlight: [
          {
            squares: ['e5', 'e4'],
            arrows: [{ orig: 'e5', dest: 'e4' }],
            color: 'red',
          },
          {
            squares: ['e4', 'd3', 'f3'],
            arrows: [
              { orig: 'e4', dest: 'd3' },
              { orig: 'e4', dest: 'f3' },
            ],
            color: 'red',
          },
        ],
      },
    ],
    pawnPyramid: [
      {
        startingPosition: 'r1bq1rk1/p4ppp/1pnbpn2/2pp4/3P1B2/2PBPN2/PP1NQPPP/R4RK1',
        moves: [''],
        squaresToHighlight: [
          {
            squares: ['b2', 'c3', 'd4', 'e3', 'f2'],
            arrows: [],
            color: 'red',
          },
        ],
      },
    ],
  },
  bishop: {
    pins: [
      {
        startingPosition: '8/2K5/8/8/3r4/6B1/8/k7',
        moves: ['g3e5', 'a1b1', 'e5d4'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['e5', 'd4', 'a1'],
            arrows: [{ orig: 'e5', dest: 'a1' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: 'r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R',
        moves: ['c1g5', ''],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['g5', 'f6', 'e7', 'd8'],
            arrows: [{ orig: 'g5', dest: 'd8' }],
            color: 'red',
          },
        ],
      },
    ],
    skewers: [
      {
        startingPosition: '8/5q2/8/3k4/8/5N2/4K3/3B4',
        moves: ['d1b3', 'd5c5', 'b3f7'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['b3', 'd5', 'f7'],
            arrows: [{ orig: 'b3', dest: 'f7' }],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '6r1/p1k2q2/1pb3n1/5pB1/3R3P/P3P3/6P1/3QKB2',
        moves: ['f1c4', 'f7g7', 'c4g8'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['c4', 'g8', 'f7'],
            arrows: [{ orig: 'c4', dest: 'g8' }],
            color: 'red',
          },
        ],
      },
    ],
    forks: [
      {
        startingPosition: '8/8/5k2/8/8/4BK2/8/r7',
        moves: ['e3d4', 'f6f7', 'd4a1'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['a1', 'd4', 'f6'],
            arrows: [
              { orig: 'd4', dest: 'a1' },
              { orig: 'd4', dest: 'f6' },
            ],
            color: 'red',
          },
        ],
      },
      {
        startingPosition: '3q1rk1/p3ppb1/2B3p1/3PR2p/1r4nB/2N4P/PP4P1/R2Q2K1',
        moves: ['h4e7', 'd8b8', 'e7b4'],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['e7', 'd8', 'f8', 'b4'],
            arrows: [
              { orig: 'e7', dest: 'd8' },
              { orig: 'e7', dest: 'f8' },
              { orig: 'e7', dest: 'b4' },
            ],
            color: 'red',
          },
        ],
      },
    ],
    batteries: [
      {
        startingPosition: '2rq1rk1/1bpnbppp/p3p3/np6/3P1B2/P1N1PN2/1P3PPP/1BRQ1RK1',
        moves: ['d1d3', ''],
        squaresToHighlight: [
          {
            squares: [],
            color: 'red',
          },
          {
            squares: ['b1', 'd3', 'h7'],
            arrows: [{ orig: 'b1', dest: 'h7' }],
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

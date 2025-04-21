import { Puzzle } from '../models/puzzle.js';

export const getDailyPuzzle = async (req, res) => {
  const headers = {
    Authorization: 'Bearer ' + process.env.LICHESS_TOKEN,
  };

  const response = await fetch('https://lichess.org/api/puzzle/daily', { headers });
  const dailyPuzzle = await response.json();

  // const dailyPuzzle = {
  //   game: {
  //     clock: '3+0',
  //     id: 'AHGPPS44',
  //     perf: {
  //       key: 'blitz',
  //       name: 'Blitz',
  //     },
  //     pgn: 'd4 d5 Bf4 Bf5 Nf3 e6 c4 Nf6 Nc3 Bd6 Bg3 Nbd7 e3 O-O c5 Bxg3 hxg3 h6 Bd3 Ne4 Qc2 Ndf6 Nd2 Nxc3 Bxf5 exf5 bxc3 Ne4 Nxe4 fxe4 Rb1 b6 Rh5 bxc5 Rb5 cxd4 cxd4 c6 Qxc6 Rc8 Qxd5 Qf6 Qxe4 Rc1+ Ke2 Qa6 Qd5 Rc2+ Kf3 g6 Rxh6 Qf6+ Ke4',
  //     // pgnArray: ['d4', 'd5', 'Bf4', 'Bf5', 'Nf3', 'e6', 'c4', 'Nf6', 'Nc3', 'Bd6', 'Bg3', 'Nbd7', 'e3', 'O-O', 'c5', 'Bxg3', 'hxg3', 'h6', 'Bd3', 'Ne4', 'Qc2', 'Ndf6', 'Nd2', 'Nxc3', 'Bxf5', 'exf5', 'bxc3', 'Ne4', 'Nxe4', 'fxe4', 'Rb1', 'b6', 'Rh5', 'bxc5', 'Rb5', 'cxd4', 'cxd4', 'c6', 'Qxc6', 'Rc8', 'Qxd5', 'Qf6', 'Qxe4', 'Rc1+', 'Ke2', 'Qa6', 'Qd5', 'Rc2+', 'Kf3', 'g6', 'Rxh6', 'Qf6+', 'Ke4'],
  //     pgnArray: ['a4', 'h5', 'b4', 'h4', 'c4', 'h3', 'd4', 'hxg2', 'e4', 'd5', 'a5', 'c5', 'a6', 'e5', 'axb7', 'f5'],
  //     // pgnArray: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5'],
  //     players: [
  //       {
  //         color: 'white',
  //         flair: 'travel-places.ambulance',
  //         id: 'ericrosen',
  //         name: 'EricRosen',
  //         patron: true,
  //         rating: 2642,
  //         title: 'IM',
  //       },
  //       {
  //         color: 'black',
  //         id: 'anton_volovikov',
  //         name: 'Anton_Volovikov',
  //         rating: 2619,
  //         title: 'FM',
  //       },
  //     ],
  //     rated: true,
  //   },
  //   puzzle: {
  //     id: 'PSjmf',
  //     initialPly: 52,
  //     plays: 566,
  //     rating: 2705,
  //     // solution: ['g8g7', 'd5e5', 'f6e5'],
  //     solution: ['b7a8b'],
  //     // solution: ['g5f7', 'Qd8e7', 'f7g8q', 'e7h4'],
  //     themes: ['endgame', 'master', 'short', 'masterVsMaster', 'crushing'],
  //   },
  // };

  dailyPuzzle.game.pgnArray = dailyPuzzle.game.pgn.split(' ');

  const model = {
    title: 'Daily Puzzle',
    dailyPuzzle,
    isHomePage: false,
    user: req.session.passport ? req.session.passport.user : null,
  };

  res.render('daily-puzzle', model);
};

export const getRandomPuzzle = async (req, res) => {
  // Get the current cookie from the browser
  const cookiePuzzle = req.signedCookies?.currentPuzzle || null;

  if (cookiePuzzle) {
    return res.redirect(`/puzzle-forge/${cookiePuzzle}`);
  } else {
    try {
      // If puzzle cookie doesn't exist, get a random puzzle
      const puzzleCount = await Puzzle.countDocuments();
      const randomId = Math.round(Math.random() * puzzleCount);

      // Assign the random puzzle's id to the cookie for client
      res.cookie('currentPuzzle', randomId, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        signed: true,
        path: '/puzzle-forge',
      });

      return res.redirect(`/puzzle-forge/${randomId}`);
    } catch (e) {
      console.log(e);
    }
  }
};

export const getPuzzleById = async (req, res) => {
  const { id } = req.params;
  const escapedId = Number(encodeURIComponent(id).trim());

  try {
    const puzzle = await Puzzle.findOne({ id: escapedId }).lean();

    const model = {
      title: 'Puzzle Forge',
      currentPuzzle: puzzle,
      isHomePage: false,
      user: req.session.passport ? req.session.passport.user : null,
    };

    return res.render('puzzle-forge', model);
  } catch (e) {
    console.log(e);
  }
};

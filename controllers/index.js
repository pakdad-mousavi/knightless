import { Puzzle } from '../models/puzzle.js';

export const index = async (req, res) => {
  const puzzles = await Puzzle.aggregate([{ $sample: { size: 6 } }]);
  const formattedPuzzles = puzzles.map((x) => {
    x.moves = x.moves.split(' ')[0];
    return x;
  });

  const model = {
    title: '',
    pageCategory: 'home',
    puzzles: formattedPuzzles,
    user: req.user ? req.user : null,
  };
  res.render('index', model);
};

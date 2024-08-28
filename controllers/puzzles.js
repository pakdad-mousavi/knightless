export const getDailyPuzzle = (req, res) => {
  const model = {
    title: 'Daily Puzzle',
    isHomePage: false,
  };

  res.render('daily-puzzle', model);
};

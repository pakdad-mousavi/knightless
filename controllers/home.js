export const index = (req, res) => {
  const model = {
    title: 'Chessless',
    isHomePage: true,
  };
  res.render('home', model);
};

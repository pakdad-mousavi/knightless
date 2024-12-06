export const index = (req, res) => {
  const model = {
    title: 'Chessless',
    pageCategory: 'home',
  };
  res.render('home', model);
};

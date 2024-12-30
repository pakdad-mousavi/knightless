export const index = (req, res) => {
  const model = {
    title: 'Chessless',
    pageCategory: 'authentication',
  };
  res.render('map', model);
};

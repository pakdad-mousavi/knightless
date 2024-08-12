export const index = (req, res) => {
  const dto = {
    title: 'Chessless',
    isHomePage: true,
  };
  res.render('home', dto);
};

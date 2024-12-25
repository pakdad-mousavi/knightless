export const index = async (req, res) => {
  const model = {
    title: 'Chessless',
    pageCategory: 'home',
    user: req.session.passport.user,
  };
  res.render('home', model);
};

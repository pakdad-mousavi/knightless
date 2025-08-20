export const index = (req, res) => {
  const model = {
    title: 'Attributions',
    isHomePage: false,
    user: req.session.passport ? req.session.passport.user : null,
  };

  res.render('attributions', model);
};

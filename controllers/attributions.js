export const index = (req, res) => {
  const model = {
    title: 'Attributions',
    isHomePage: false,
    user: req.user ? req.user : null,
  };

  res.render('attributions', model);
};

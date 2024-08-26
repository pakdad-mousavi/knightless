export const index = (req, res) => {
  const model = {
    title: 'Attributions',
    isHomePage: false,
  };

  res.render('attributions', model);
};

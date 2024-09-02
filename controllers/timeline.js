export const index = (req, res) => {
  const model = {
    title: 'Chess Timeline',
    isHomePage: false,
  };

  res.render('timeline', model);
};

export const index = (req, res) => {
  // Response model
  const model = {
    title: `Chess Notation`,
    isHomePage: false,
  };

  res.render('notation', model);
};

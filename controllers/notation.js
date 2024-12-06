export const index = (req, res) => {
  // Response model
  const model = {
    title: 'Chess Notation',
    pageCategory: 'learn',
  };

  res.render('notation', model);
};

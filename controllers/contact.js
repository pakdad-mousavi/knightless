export const index = (req, res) => {
  const model = {
    title: 'Contact Us',
    isHomepage: false,
    user: req.user ? req.user : null,
  };

  res.render('contact', model);
};

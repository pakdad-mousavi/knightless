export const index = (req, res) => {
  const model = {
    title: 'Contact Us',
    isHomepage: false,
    user: req.session.passport ? req.session.passport.user : null,
  };

  res.render('contact', model);
};

export const getFaqPage = async (req, res) => {
  const model = {
    title: 'Frequently Asked Questions',
    user: req.session.passport ? req.session.passport.user : null,
  };

  res.render('faq', model);
};

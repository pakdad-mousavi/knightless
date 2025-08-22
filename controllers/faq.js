export const getFaqPage = async (req, res) => {
  const model = {
    title: 'Frequently Asked Questions',
    user: req.user ? req.user : null,
  };

  res.render('faq', model);
};

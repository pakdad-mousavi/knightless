export const index = (req, res) => {
  const model = {
    title: 'Contact Us',
    isHomepage: false,
  };

  res.render('contact', model);
};

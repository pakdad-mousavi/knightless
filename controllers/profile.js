export const getProfilePage = async (req, res) => {
  const model = {
    title: 'Profile',
    user: req.session.passport ? req.session.passport.user : null,
  };

  res.render('profile', model);
};

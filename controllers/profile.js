export const getProfilePage = async (req, res) => {
  const model = {
    title: 'Profile',
    user: req.user ? req.user : null,
  };

  res.render('profile', model);
};

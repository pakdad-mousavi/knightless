export const index = (req, res) => {
  const model = {
    title: '',
    pageCategory: 'authentication',
  };
  res.render('auth/login', model);
};

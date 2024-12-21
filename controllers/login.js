export const index = (req, res) => {
  const model = {
    title: 'Chessless',
    pageCategory: 'authentication',
  }
  res.render('auth/login', model);
}
export const getPieceById = (req, res) => {
  const model = {
    title: "Fancy Piece",
    isHomePage: false,
  }

  res.render('pieces/piece', model);
};

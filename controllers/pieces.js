import { Piece } from '../models/piece.js';

export const getPieceById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the piece
    const piece = await Piece.findOne({ id }).lean();

    // Find the other pieces and get only their names
    const otherPieces = (
      await Piece.find({ id: { $ne: id } })
        .select('name -_id')
        .lean()
    ).map((piece) => piece.name);

    // Response model
    const model = {
      title: `The ${piece.name}`,
      piece,
      otherPieces,
      isHomePage: false,
    };

    res.render('pieces/piece', model);
  } catch (e) {
    console.log(e);
    res.send(`Cannot find ${id}`);
  }
};
